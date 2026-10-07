import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Reuse existing app if already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// All Google Drive scopes requested
export const DRIVE_SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.appdata'
];

const provider = new GoogleAuthProvider();
DRIVE_SCOPES.forEach(scope => provider.addScope(scope));

// In-memory token caching (NEVER store in localStorage/sessionStorage)
let isSigningIn = false;
let cachedAccessToken: string | null = null;

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  parents?: string[];
}

/**
 * Initialize auth state listener.
 */
export const initAuth = (
  onAuthChange: (user: User | null, token: string | null) => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      onAuthChange(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
      }
      onAuthChange(user, cachedAccessToken);
    }
  });
};

/**
 * Sign in with Google using popup
 */
export const googleSignIn = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Không thể lấy được access token từ Firebase Auth');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Drive sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Sign out and clear in-memory token
 */
export const googleSignOut = async (): Promise<void> => {
  await firebaseSignOut(auth);
  cachedAccessToken = null;
};

/**
 * Get current in-memory access token
 */
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

/**
 * Helper to ensure valid access token
 */
const requireAccessToken = async (): Promise<string> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Chưa đăng nhập Google hoặc phiên làm việc đã hết hạn. Vui lòng kết nối lại Google Drive.');
  }
  return token;
};

/**
 * List files from Google Drive
 */
export const listDriveFiles = async (
  options: {
    query?: string;
    folderId?: string;
    pageSize?: number;
    mimeTypeFilter?: string;
  } = {}
): Promise<DriveFile[]> => {
  const token = await requireAccessToken();
  const { query, folderId, pageSize = 30, mimeTypeFilter } = options;

  let qParts: string[] = ['trashed = false'];

  if (folderId) {
    qParts.push(`'${folderId}' in parents`);
  }

  if (query && query.trim()) {
    qParts.push(`name contains '${query.replace(/'/g, "\\'")}'`);
  }

  if (mimeTypeFilter) {
    qParts.push(`mimeType = '${mimeTypeFilter}'`);
  }

  const q = qParts.join(' and ');
  const fields = 'files(id, name, mimeType, size, modifiedTime, webViewLink, thumbnailLink, iconLink, parents)';
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&pageSize=${pageSize}&fields=${encodeURIComponent(fields)}&orderBy=modifiedTime desc`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Lỗi tải danh sách tệp Google Drive (${res.status})`);
  }

  const data = await res.json();
  return data.files || [];
};

/**
 * Find or create a specific folder on Google Drive
 */
export const findOrCreateAppFolder = async (
  folderName: string = 'Sư Phạm Âm Nhạc - Kết Nối Tri Thức'
): Promise<DriveFile> => {
  const token = await requireAccessToken();

  // Search for existing folder
  const q = `mimeType = 'application/vnd.google-apps.folder' and name = '${folderName.replace(/'/g, "\\'")}' and trashed = false`;
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id, name, webViewLink)`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (searchRes.ok) {
    const data = await searchRes.json();
    if (data.files && data.files.length > 0) {
      return data.files[0];
    }
  }

  // Create folder if not found
  const createUrl = 'https://www.googleapis.com/drive/v3/files';
  const meta = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
    description: 'Thư mục lưu trữ Giáo án KHBD 5512, Slide bài giảng và Đề thi môn Âm Nhạc THCS Kết Nối Tri Thức'
  };

  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(meta)
  });

  if (!createRes.ok) {
    throw new Error('Không thể tạo thư mục trên Google Drive');
  }

  return await createRes.json();
};

/**
 * Upload a file directly to Google Drive (Multipart upload)
 */
export const uploadFileToDrive = async (
  name: string,
  content: string | Blob,
  mimeType: string,
  folderId?: string,
  description?: string
): Promise<DriveFile> => {
  const token = await requireAccessToken();

  const metadata: any = {
    name,
    mimeType: mimeType.split(';')[0],
    description: description || 'Tài liệu Sư Phạm Âm Nhạc THCS (Kết Nối Tri Thức)'
  };

  if (folderId) {
    metadata.parents = [folderId];
  }

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  let contentBlob: Blob;
  if (typeof content === 'string') {
    contentBlob = new Blob([content], { type: mimeType });
  } else {
    contentBlob = content;
  }

  // Build multipart body
  const metadataPart = delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    `Content-Type: ${mimeType}\r\n\r\n`;

  const metadataBlob = new Blob([metadataPart], { type: 'text/plain' });
  const closeBlob = new Blob([closeDelimiter], { type: 'text/plain' });

  const multipartBody = new Blob([metadataBlob, contentBlob, closeBlob]);

  const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,size,webViewLink,modifiedTime';

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartBody
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Lỗi khi lưu tệp lên Google Drive (${res.status})`);
  }

  return await res.json();
};

/**
 * Download file content from Google Drive
 */
export const downloadDriveFileContent = async (fileId: string): Promise<{ text?: string; blob: Blob; mimeType: string }> => {
  const token = await requireAccessToken();

  // Try direct alt=media download
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    // If it's a Google Doc or Google Slides, try export
    const metaUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=mimeType,name`;
    const metaRes = await fetch(metaUrl, { headers: { Authorization: `Bearer ${token}` } });
    const meta = await metaRes.json();

    if (meta.mimeType === 'application/vnd.google-apps.document') {
      const exportUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=text/plain`;
      const exportRes = await fetch(exportUrl, { headers: { Authorization: `Bearer ${token}` } });
      const text = await exportRes.text();
      const blob = new Blob([text], { type: 'text/plain' });
      return { text, blob, mimeType: 'text/plain' };
    }

    throw new Error(`Không thể tải tệp từ Google Drive (${res.status})`);
  }

  const blob = await res.blob();
  const mimeType = res.headers.get('content-type') || blob.type;

  let text: string | undefined;
  if (mimeType.includes('text') || mimeType.includes('json') || mimeType.includes('html')) {
    text = await blob.text();
  }

  return { blob, text, mimeType };
};

/**
 * Delete a file from Google Drive (Requires user confirmation)
 */
export const deleteDriveFile = async (fileId: string): Promise<void> => {
  const token = await requireAccessToken();
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok && res.status !== 204) {
    throw new Error(`Không thể xóa tệp từ Google Drive (${res.status})`);
  }
};
