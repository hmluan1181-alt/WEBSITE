import React, { useState, useEffect } from 'react';
import { 
  X, 
  Cloud, 
  Upload, 
  Download, 
  Trash2, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  FolderPlus, 
  FileText, 
  Presentation, 
  FileCheck2, 
  RefreshCw,
  Share2,
  FolderOpen,
  Music,
  LogOut,
  User as UserIcon,
  HardDrive
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  googleSignIn, 
  googleSignOut, 
  initAuth, 
  listDriveFiles, 
  uploadFileToDrive, 
  findOrCreateAppFolder, 
  deleteDriveFile,
  downloadDriveFileContent,
  DriveFile 
} from '../services/googleDriveService';
import { AppState, SourceDocument } from '../types';
import { 
  exportWordKhbdBlob, 
  exportWordExamBlob, 
  exportPowerPointSlidesBlob, 
  exportSingleFileHtmlString 
} from '../utils/exporter';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: AppState;
  onAddDocumentFromDrive: (doc: SourceDocument) => void;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  state,
  onAddDocumentFromDrive
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'appFolder' | 'saveCurrent' | 'browseDrive'>('saveCurrent');

  // Drive state
  const [appFolder, setAppFolder] = useState<DriveFile | null>(null);
  const [appFolderFiles, setAppFolderFiles] = useState<DriveFile[]>([]);
  const [browseFiles, setBrowseFiles] = useState<DriveFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Saving states
  const [isSaving, setIsSaving] = useState(false);
  const [savedFileLink, setSavedFileLink] = useState<{ name: string; url: string } | null>(null);

  // Delete confirmation modal state
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Subscribe to auth state
  useEffect(() => {
    const unsubscribe = initAuth((user, token) => {
      setCurrentUser(user);
      setAccessToken(token);
      if (user && token) {
        loadAppFolderAndFiles(token);
      } else {
        setAppFolder(null);
        setAppFolderFiles([]);
        setBrowseFiles([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadAppFolderAndFiles = async (token?: string) => {
    try {
      setIsLoadingFiles(true);
      const folder = await findOrCreateAppFolder('Sư Phạm Âm Nhạc - Kết Nối Tri Thức');
      setAppFolder(folder);
      const files = await listDriveFiles({ folderId: folder.id, pageSize: 50 });
      setAppFolderFiles(files);
    } catch (err: any) {
      console.warn('Lỗi tải thư mục Google Drive:', err);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      setStatusMessage(null);
      const { user, accessToken: token } = await googleSignIn();
      setCurrentUser(user);
      setAccessToken(token);
      setStatusMessage({ type: 'success', text: `Đã kết nối thành công với tài khoản Google: ${user.email}` });
      await loadAppFolderAndFiles(token);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Đăng nhập Google thất bại. Vui lòng thử lại.' });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await googleSignOut();
      setCurrentUser(null);
      setAccessToken(null);
      setStatusMessage({ type: 'info', text: 'Đã ngắt kết nối Google Drive.' });
    } catch (err: any) {
      console.error('Sign out error:', err);
    }
  };

  const handleSearchDrive = async () => {
    if (!currentUser) return;
    try {
      setIsLoadingFiles(true);
      setStatusMessage(null);
      const files = await listDriveFiles({ query: searchQuery, pageSize: 40 });
      setBrowseFiles(files);
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Lỗi khi tìm kiếm tệp Google Drive.' });
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Upload actions
  const handleSaveKhbdToDrive = async () => {
    try {
      setIsSaving(true);
      setStatusMessage(null);
      setSavedFileLink(null);

      const folder = appFolder || await findOrCreateAppFolder('Sư Phạm Âm Nhạc - Kết Nối Tri Thức');
      const lessonSlug = state.khbd.header.lessonTitle.replace(/[\/\\]/g, '-');
      const grade = state.khbd.header.grade.replace(/\s+/g, '');
      const fileName = `KHBD_5512_AmNhac_${grade}_${lessonSlug}.doc`;

      const blob = exportWordKhbdBlob(state.khbd);
      const driveFile = await uploadFileToDrive(
        fileName,
        blob,
        'application/msword',
        folder.id,
        `Kế hoạch bài dạy môn Âm Nhạc ${state.khbd.header.grade} - ${state.khbd.header.lessonTitle} (Chuẩn CV 5512)`
      );

      setSavedFileLink({ name: driveFile.name, url: driveFile.webViewLink || '' });
      setStatusMessage({ type: 'success', text: `Đã lưu giáo án "${driveFile.name}" thành công lên Google Drive!` });
      await loadAppFolderAndFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Lỗi lưu giáo án lên Google Drive.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSlidesToDrive = async () => {
    try {
      setIsSaving(true);
      setStatusMessage(null);
      setSavedFileLink(null);

      const folder = appFolder || await findOrCreateAppFolder('Sư Phạm Âm Nhạc - Kết Nối Tri Thức');
      const lessonSlug = state.khbd.header.lessonTitle.replace(/[\/\\]/g, '-');
      const grade = state.khbd.header.grade.replace(/\s+/g, '');
      const fileName = `BaiGiang_Slide_16x9_AmNhac_${grade}_${lessonSlug}.ppt`;

      const blob = exportPowerPointSlidesBlob(state.slides, state.khbd.header.lessonTitle);
      const driveFile = await uploadFileToDrive(
        fileName,
        blob,
        'application/vnd.ms-powerpoint',
        folder.id,
        `Bộ slide bài giảng 16:9 môn Âm Nhạc ${state.khbd.header.grade} - ${state.khbd.header.lessonTitle}`
      );

      setSavedFileLink({ name: driveFile.name, url: driveFile.webViewLink || '' });
      setStatusMessage({ type: 'success', text: `Đã lưu slide bài giảng "${driveFile.name}" thành công lên Google Drive!` });
      await loadAppFolderAndFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Lỗi lưu slide lên Google Drive.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveExamToDrive = async () => {
    try {
      setIsSaving(true);
      setStatusMessage(null);
      setSavedFileLink(null);

      const folder = appFolder || await findOrCreateAppFolder('Sư Phạm Âm Nhạc - Kết Nối Tri Thức');
      const grade = state.khbd.header.grade.replace(/\s+/g, '');
      const fileName = `DeKiemTra_7991_AmNhac_${grade}_${state.exam.header.examName.replace(/[\/\\]/g, '-')}.doc`;

      const blob = exportWordExamBlob(state.exam);
      const driveFile = await uploadFileToDrive(
        fileName,
        blob,
        'application/msword',
        folder.id,
        `Đề kiểm tra 4 phần môn Âm Nhạc ${state.khbd.header.grade} (Chuẩn CV 7991/BGDĐT-GDTrH)`
      );

      setSavedFileLink({ name: driveFile.name, url: driveFile.webViewLink || '' });
      setStatusMessage({ type: 'success', text: `Đã lưu đề kiểm tra "${driveFile.name}" thành công lên Google Drive!` });
      await loadAppFolderAndFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Lỗi lưu đề thi lên Google Drive.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveBackupToDrive = async () => {
    try {
      setIsSaving(true);
      setStatusMessage(null);
      setSavedFileLink(null);

      const folder = appFolder || await findOrCreateAppFolder('Sư Phạm Âm Nhạc - Kết Nối Tri Thức');
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
      const fileName = `SaoLuu_ToanBo_GiaoAn_AmNhac_${timestamp}.json`;

      const jsonStr = JSON.stringify(state, null, 2);
      const driveFile = await uploadFileToDrive(
        fileName,
        jsonStr,
        'application/json',
        folder.id,
        'Sao lưu toàn bộ phiên làm việc EdTech Studio Âm Nhạc'
      );

      setSavedFileLink({ name: driveFile.name, url: driveFile.webViewLink || '' });
      setStatusMessage({ type: 'success', text: `Đã lưu file sao lưu "${driveFile.name}" thành công lên Google Drive!` });
      await loadAppFolderAndFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Lỗi lưu tệp sao lưu lên Google Drive.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Import file from drive into Tủ Sách
  const handleImportFileToLibrary = async (file: DriveFile) => {
    try {
      setIsLoadingFiles(true);
      setStatusMessage({ type: 'info', text: `Đang tải tệp "${file.name}" từ Google Drive...` });

      const { text, mimeType } = await downloadDriveFileContent(file.id);

      const newDoc: SourceDocument = {
        id: `drive-doc-${file.id}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        category: file.name.toLowerCase().includes('sgv') ? 'SGV' :
                  file.name.toLowerCase().includes('sbt') ? 'SBT' : 'SGK',
        fileName: file.name,
        fileSize: file.size ? `${(parseInt(file.size) / (1024 * 1024)).toFixed(1)} MB` : '1.5 MB',
        uploadedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
        subject: state.khbd.header.subjectName || 'Âm Nhạc',
        grade: state.khbd.header.grade || 'LỚP 6',
        textbook: 'Kết Nối Tri Thức',
        description: `Tài liệu nạp trực tiếp từ Google Drive cá nhân (${file.name})`,
        content: text || `[Nội dung tệp nạp từ Google Drive: ${file.name}]`,
        lessonsCount: 8,
        tableOfContents: []
      };

      onAddDocumentFromDrive(newDoc);
      setStatusMessage({ type: 'success', text: `Đã nhập thành công "${file.name}" vào Tủ Sách Sư Phạm!` });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Lỗi khi nhập tệp từ Google Drive.' });
    } finally {
      setIsLoadingFiles(false);
    }
  };

  // Delete file with confirmation dialog
  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;
    try {
      setIsDeleting(true);
      await deleteDriveFile(fileToDelete.id);
      setStatusMessage({ type: 'success', text: `Đã xóa tệp "${fileToDelete.name}" khỏi Google Drive.` });
      setFileToDelete(null);
      await loadAppFolderAndFiles();
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err?.message || 'Lỗi xóa tệp trên Google Drive.' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 select-none animate-in fade-in">
      <div className="bg-[#0B0F19] text-white rounded-2xl max-w-4xl w-full border border-blue-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* HEADER MODAL */}
        <div className="p-4 md:p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-[#131B2E] to-slate-900 flex items-center justify-between relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            {/* Google Drive Official Colors Icon */}
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg p-2">
              <svg viewBox="0 0 87.3 78" className="w-full h-full">
                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                  Google Workspace Integration
                </span>
                {currentUser ? (
                  <span className="text-[10px] text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Đã Kết Nối
                  </span>
                ) : (
                  <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/60 font-semibold">
                    Chưa Đăng Nhập
                  </span>
                )}
              </div>
              <h2 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <span>Google Drive Sư Phạm Âm Nhạc</span>
                <span className="text-xs font-normal text-slate-400">· Lưu trữ đám mây an toàn</span>
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AUTH STATUS / SIGN IN BANNER */}
        <div className="p-3.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {currentUser ? (
            <div className="flex items-center gap-3">
              {currentUser.photoURL ? (
                <img src={currentUser.photoURL} alt={currentUser.displayName || ''} className="w-8 h-8 rounded-full border border-blue-400/40" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white">
                  {currentUser.email?.[0].toUpperCase()}
                </div>
              )}
              <div>
                <div className="font-bold text-white flex items-center gap-2">
                  <span>{currentUser.displayName || 'Giáo viên'}</span>
                  <span className="text-[11px] text-slate-400 font-normal">({currentUser.email})</span>
                </div>
                <div className="text-[10px] text-blue-300">
                  Thư mục riêng: <b>Sư Phạm Âm Nhạc - Kết Nối Tri Thức</b>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-300">
              <Cloud className="w-4 h-4 text-amber-400" />
              <span>Đăng nhập tài khoản Google để lưu giáo án, slide, đề thi và duyệt tệp Drive trực tiếp.</span>
            </div>
          )}

          <div className="flex items-center gap-2 shrink-0">
            {currentUser ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="px-3 py-1.5 bg-slate-800 hover:bg-rose-900/60 hover:text-rose-200 text-slate-300 font-bold rounded-lg border border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Đăng Xuất</span>
              </button>
            ) : (
              /* Official Sign in with Google Button */
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl shadow-md flex items-center gap-2.5 transition-all active:scale-95 disabled:opacity-50"
              >
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>{isSigningIn ? 'Đang kết nối...' : 'Đăng nhập bằng Google'}</span>
              </button>
            )}
          </div>
        </div>

        {/* NOTIFICATION MESSAGES */}
        {statusMessage && (
          <div className={`px-4 py-2 text-xs flex items-center justify-between border-b ${
            statusMessage.type === 'success' ? 'bg-emerald-950/80 text-emerald-200 border-emerald-800' :
            statusMessage.type === 'error' ? 'bg-rose-950/80 text-rose-200 border-rose-800' :
            'bg-blue-950/80 text-blue-200 border-blue-800'
          }`}>
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4" />}
              <span>{statusMessage.text}</span>
            </div>
            {savedFileLink && (
              <a
                href={savedFileLink.url}
                target="_blank"
                rel="noreferrer"
                className="underline font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1"
              >
                <span>Mở trên Google Drive</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* TABS */}
        <div className="grid grid-cols-3 bg-slate-900/90 border-b border-slate-800 text-xs font-bold text-center">
          <button
            onClick={() => setActiveTab('saveCurrent')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'saveCurrent'
                ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span className="truncate">Lưu Lên Google Drive</span>
          </button>

          <button
            onClick={() => setActiveTab('appFolder')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'appFolder'
                ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderOpen className="w-4 h-4 text-amber-400" />
            <span className="truncate">Thư Mục Giáo Án ({appFolderFiles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('browseDrive')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'browseDrive'
                ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span className="truncate">Duyệt & Nhập Tệp Drive</span>
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          
          {/* TAB 1: LƯU NỘI DUNG HIỆN TẠI LÊN DRIVE */}
          {activeTab === 'saveCurrent' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-400" />
                  <span>Xuất & Lưu Trữ Đám Mây Một Chạm</span>
                </h3>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Tự động lưu các phân hệ bài dạy hiện tại vào thư mục <b>"Sư Phạm Âm Nhạc - Kết Nối Tri Thức"</b> trên Google Drive của Thầy/Cô.
                </p>
              </div>

              {!currentUser ? (
                <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-700 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-950 text-blue-400 flex items-center justify-center mx-auto text-xl">
                    ☁️
                  </div>
                  <div className="font-bold text-white text-sm">Chưa đăng nhập Google Drive</div>
                  <p className="text-slate-400 max-w-md mx-auto text-xs">
                    Vui lòng bấm nút <b>"Đăng nhập bằng Google"</b> ở trên để cho phép ứng dụng lưu giáo án và slide trực tiếp vào Drive của bạn.
                  </p>
                  <button
                    type="button"
                    onClick={handleSignIn}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all"
                  >
                    Kết Nối Ngay
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Card 1: KHBD 5512 */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col justify-between gap-3 hover:border-slate-700 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-700/50 flex items-center justify-center text-blue-300 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">Giáo Án KHBD 5512 (*.doc)</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{state.khbd.header.lessonTitle}</div>
                        <div className="text-[10px] text-amber-300/90 font-medium mt-1">Môn {state.khbd.header.subjectName} · {state.khbd.header.grade}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleSaveKhbdToDrive}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isSaving ? 'Đang lưu...' : 'Lưu KHBD Lên Drive'}</span>
                    </button>
                  </div>

                  {/* Card 2: Slide 16:9 */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col justify-between gap-3 hover:border-slate-700 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-700/50 flex items-center justify-center text-amber-300 shrink-0">
                        <Presentation className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">Slide Bài Giảng (*.ppt)</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{state.slides.length} slide chuẩn 16:9 khớp CV 5512</div>
                        <div className="text-[10px] text-amber-300/90 font-medium mt-1">Định dạng trình chiếu PowerPoint</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleSaveSlidesToDrive}
                      className="w-full py-2 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isSaving ? 'Đang lưu...' : 'Lưu Slide Lên Drive'}</span>
                    </button>
                  </div>

                  {/* Card 3: Đề thi 7991 */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col justify-between gap-3 hover:border-slate-700 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-emerald-300 shrink-0">
                        <FileCheck2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">Đề Kiểm Tra Định Kỳ 7991 (*.doc)</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Ma trận & Đề thi 4 phần độc lập (10.0đ)</div>
                        <div className="text-[10px] text-emerald-300/90 font-medium mt-1">Chuẩn BGDĐT 17/12/2024</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleSaveExamToDrive}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isSaving ? 'Đang lưu...' : 'Lưu Đề Thi Lên Drive'}</span>
                    </button>
                  </div>

                  {/* Card 4: Backup Toàn Bộ Session */}
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col justify-between gap-3 hover:border-slate-700 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-950 border border-purple-700/50 flex items-center justify-center text-purple-300 shrink-0">
                        <Share2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">Sao Lưu Toàn Bộ Dữ Liệu (*.json)</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">Tất cả bài học, slide, đề thi và sách nguồn</div>
                        <div className="text-[10px] text-purple-300/90 font-medium mt-1">Khôi phục nguyên trạng trên mọi thiết bị</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      disabled={isSaving}
                      onClick={handleSaveBackupToDrive}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isSaving ? 'Đang lưu...' : 'Lưu Sao Lưu Lên Drive'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: THƯ MỤC GIÁO ÁN TRÊN DRIVE */}
          {activeTab === 'appFolder' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-amber-400" />
                    <span>Thư Mục: Sư Phạm Âm Nhạc - Kết Nối Tri Thức</span>
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Tất cả tài liệu giáo án và đề thi được lưu trong thư mục riêng biệt này trên Drive của Thầy/Cô.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => loadAppFolderAndFiles()}
                    disabled={isLoadingFiles}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                    title="Làm mới danh sách tệp"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin text-blue-400' : ''}`} />
                  </button>
                  {appFolder?.webViewLink && (
                    <a
                      href={appFolder.webViewLink}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <span>Mở Thư Mục</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              {!currentUser ? (
                <div className="p-8 text-center text-slate-400">
                  Vui lòng đăng nhập Google để xem các tệp đã lưu trong thư mục.
                </div>
              ) : isLoadingFiles ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-400" />
                  <div>Đang tải danh sách tệp từ Google Drive...</div>
                </div>
              ) : appFolderFiles.length === 0 ? (
                <div className="p-10 text-center bg-slate-900/40 rounded-2xl border border-slate-800 space-y-2">
                  <div className="text-2xl">📂</div>
                  <div className="font-bold text-white">Thư mục hiện đang trống</div>
                  <div className="text-slate-400 text-xs">
                    Thầy/Cô hãy chuyển sang tab <b>"Lưu Lên Google Drive"</b> để lưu giáo án hoặc slide đầu tiên!
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
                  {appFolderFiles.map((file) => (
                    <div key={file.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                          {file.name.endsWith('.doc') ? <FileText className="w-4 h-4 text-blue-400" /> :
                           file.name.endsWith('.ppt') ? <Presentation className="w-4 h-4 text-amber-400" /> :
                           file.name.endsWith('.json') ? <Share2 className="w-4 h-4 text-purple-400" /> :
                           <FileText className="w-4 h-4 text-slate-400" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white truncate text-xs">{file.name}</div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{file.size ? `${(parseInt(file.size) / 1024).toFixed(0)} KB` : 'Tài liệu'}</span>
                            <span>·</span>
                            <span>{file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString('vi-VN') : ''}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg transition-colors"
                            title="Mở trên Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleImportFileToLibrary(file)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg font-bold text-[11px] flex items-center gap-1 transition-colors"
                          title="Nạp vào Tủ Sách Sư Phạm"
                        >
                          <FolderPlus className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Nạp Vào Tủ Sách</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setFileToDelete(file)}
                          className="p-1.5 bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-200 rounded-lg transition-colors"
                          title="Xóa tệp khỏi Google Drive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: DUYỆT & NHẬP TỆP DRIVE VÀO TỦ SÁCH */}
          {activeTab === 'browseDrive' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  <span>Duyệt Toàn Bộ Google Drive Cá Nhân</span>
                </h3>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Tìm kiếm file sách giáo khoa, sách giáo viên, file PDF hoặc tài liệu âm nhạc có sẵn trên Google Drive của Thầy/Cô để nhập vào Tủ Sách.
                </p>
              </div>

              {/* SEARCH INPUT */}
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchDrive()}
                    placeholder="Tìm theo tên tệp (ví dụ: Âm Nhạc, SGK, 5512, Đề thi...)"
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-400 text-xs"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchDrive}
                  disabled={isLoadingFiles || !currentUser}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors shrink-0"
                >
                  Tìm Kiếm
                </button>
              </div>

              {/* SEARCH RESULTS */}
              {!currentUser ? (
                <div className="p-8 text-center text-slate-400">
                  Vui lòng đăng nhập Google để tìm kiếm tệp trong Drive của bạn.
                </div>
              ) : isLoadingFiles ? (
                <div className="p-12 text-center text-slate-400 space-y-2">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto text-blue-400" />
                  <div>Đang tìm kiếm tệp trên Google Drive...</div>
                </div>
              ) : browseFiles.length === 0 ? (
                <div className="p-8 text-center text-slate-500 bg-slate-900/30 rounded-xl border border-slate-800">
                  Nhập từ khóa và bấm <b>"Tìm Kiếm"</b> để xem danh sách tệp trên Google Drive.
                </div>
              ) : (
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40 max-h-80 overflow-y-auto">
                  {browseFiles.map((file) => (
                    <div key={file.id} className="p-3 flex items-center justify-between gap-3 hover:bg-slate-800/40 transition-colors">
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate text-xs">{file.name}</div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{file.mimeType}</span>
                          <span>·</span>
                          <span>{file.size ? `${(parseInt(file.size) / (1024 * 1024)).toFixed(2)} MB` : 'Tệp Drive'}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg transition-colors"
                            title="Mở trên Google Drive"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => handleImportFileToLibrary(file)}
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-1 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Nạp Vào Tủ Sách</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-3.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-400 text-[11px] flex items-center gap-2">
            <span>Google Drive API v3</span>
            <span>·</span>
            <span>Bảo mật chuẩn Google Workspace OAuth 2.0</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>

      </div>

      {/* CONFIRMATION DIALOG FOR DESTRUCTIVE ACTION (MANDATORY REQUIREMENT) */}
      {fileToDelete && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl max-w-md w-full p-6 border border-rose-500/40 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-950 border border-rose-600/50 flex items-center justify-center text-rose-400 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Xác Nhận Xóa Tệp?</h3>
                <p className="text-slate-400 text-xs">Thao tác này sẽ xóa tệp trên Google Drive</p>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <div className="text-slate-400 text-[11px]">Tên tệp:</div>
              <div className="font-bold text-white mt-0.5 truncate">{fileToDelete.name}</div>
            </div>

            <p className="text-slate-300 text-xs leading-relaxed">
              Thầy/Cô có chắc chắn muốn xóa tệp này khỏi Google Drive không? Thao tác này không thể hoàn tác.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors text-xs"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-colors text-xs flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Đang xóa...' : 'Xóa Vĩnh Viễn'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
