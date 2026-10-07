import React from 'react';
import { 
  BookOpen, 
  Layers, 
  GraduationCap, 
  Library, 
  FileEdit, 
  Share2, 
  Download, 
  Sparkles,
  CheckCircle2,
  Settings,
  User,
  UploadCloud,
  FolderOpen,
  Music,
  Volume2
} from 'lucide-react';
import { PedagogicalHeader, AppSubsystem, TeacherProfile } from '../types';

interface TopbarProps {
  header: PedagogicalHeader;
  teacherProfile: TeacherProfile;
  currentSubsystem: AppSubsystem;
  onSubsystemChange: (sub: AppSubsystem) => void;
  onUpdateHeader: (field: string, value: string) => void;
  onOpenSettings: () => void;
  onOpenJsonModal: () => void;
  onDownloadOffline: () => void;
  onOpenMusicToolbox?: () => void;
  onOpenGoogleDrive?: () => void;
}

const SUBJECT_OPTIONS = [
  'ÂM NHẠC',
  'TOÁN HỌC',
  'NGỮ VĂN',
  'TIẾNG ANH',
  'MỸ THUẬT',
  'KHOA HỌC TỰ NHIÊN',
  'LỊCH SỬ & ĐỊA LÍ',
  'VẬT LÍ',
  'HÓA HỌC',
  'SINH HỌC',
  'TIN HỌC',
  'GD KINH TẾ & PHÁP LUẬT',
  'CÔNG NGHỆ'
];

const GRADE_OPTIONS = [
  'LỚP 6',
  'LỚP 7',
  'LỚP 8',
  'LỚP 9',
  'LỚP 10',
  'LỚP 11',
  'LỚP 12'
];

export const Topbar: React.FC<TopbarProps> = ({
  header,
  teacherProfile,
  currentSubsystem,
  onSubsystemChange,
  onUpdateHeader,
  onOpenSettings,
  onOpenJsonModal,
  onDownloadOffline,
  onOpenMusicToolbox,
  onOpenGoogleDrive,
}) => {
  return (
    <header className="h-16 bg-[#0B0F19] text-white border-b border-slate-800 px-4 md:px-6 flex items-center justify-between gap-3 shrink-0 z-20 shadow-md">
      {/* Brand logo & platform title: Đặc thù Sư Phạm Âm Nhạc THCS */}
      <div className="flex items-center gap-3 shrink-0">
        <div 
          onClick={() => onSubsystemChange('upload')}
          className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 cursor-pointer flex items-center justify-center font-black text-slate-950 text-xl shadow-md ring-2 ring-amber-400/30 transition-transform active:scale-95"
          title="Sư Phạm Âm Nhạc THCS - Về Tủ Sách & Nạp Tài Liệu Nguồn"
        >
          𝄞
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black tracking-wider uppercase text-amber-400 flex items-center gap-1">
              <span>Sư Phạm Âm Nhạc</span>
              <span className="text-[10px] text-slate-400 font-normal">THCS</span>
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
              {teacherProfile.schoolName || 'THCS Long Hồ'}
            </span>
          </div>
          <div className="text-xs font-semibold text-slate-300 leading-tight flex items-center gap-1">
            <span>Kết Nối Tri Thức với Cuộc Sống</span>
            <span className="text-[10px] text-amber-400">♫</span>
          </div>
        </div>
      </div>

      {/* Button Nạp Tài Liệu SGK/SGV/SBT Nổi Bật */}
      <button
        onClick={() => onSubsystemChange('upload')}
        className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
          currentSubsystem === 'upload'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
        }`}
        title="Nạp sách giáo khoa, sách giáo viên, sách bài tập"
      >
        <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
        <span>Tủ Sách (4 Khối)</span>
      </button>

      {/* Quick Selectors: Môn học, Khối lớp, Bộ sách, Tên bài học */}
      <div className="flex-1 max-w-3xl flex items-center gap-2 overflow-x-auto py-1 text-xs">
        {/* Bộ chọn Môn học */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 shrink-0">
          <Music className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-slate-400 text-[11px] hidden md:inline">Môn:</span>
          <select
            value={header.subjectName}
            onChange={(e) => onUpdateHeader('subjectName', e.target.value)}
            className="bg-transparent text-white font-semibold text-xs outline-none cursor-pointer pr-1"
          >
            {SUBJECT_OPTIONS.map(sub => (
              <option key={sub} value={sub} className="bg-slate-900 text-white">
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Bộ chọn Khối lớp */}
        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1.5 shrink-0">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-slate-400 text-[11px] hidden md:inline">Khối:</span>
          <select
            value={header.grade}
            onChange={(e) => onUpdateHeader('grade', e.target.value)}
            className="bg-transparent text-white font-semibold text-xs outline-none cursor-pointer pr-1"
          >
            {GRADE_OPTIONS.map(grd => (
              <option key={grd} value={grd} className="bg-slate-900 text-white">
                {grd}
              </option>
            ))}
          </select>
        </div>

        {/* Bộ sách chuẩn duy nhất Kết Nối Tri Thức */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-amber-500/40 rounded-lg px-2.5 py-1.5 shrink-0" title="Bộ sách chuẩn quốc gia duy nhất theo chương trình GDPT 2018">
          <Library className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-amber-300 font-bold text-[11px]">Kết Nối Tri Thức</span>
        </div>

        {/* Tên bài học */}
        <div className="flex-1 min-w-[170px] flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-lg px-2.5 py-1 shrink-0">
          <FileEdit className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={header.lessonTitle}
            onChange={(e) => onUpdateHeader('lessonTitle', e.target.value)}
            placeholder="Nhập tên bài học..."
            className="bg-transparent text-white font-medium text-xs outline-none w-full truncate"
          />
        </div>
      </div>

      {/* Right Actions: NÚT PHÒNG NHẠC CỤ + CÀI ĐẶT + TẢI VỀ */}
      <div className="flex items-center gap-2 shrink-0">
        {/* NÚT MỞ PHÒNG NHẠC CỤ & LẤY GIỌNG ĐẶC THÙ CHO GIÁO VIÊN ÂM NHẠC */}
        {onOpenMusicToolbox && (
          <button
            onClick={onOpenMusicToolbox}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-black rounded-lg shadow-sm transition-all"
            title="Mở hộp công cụ âm nhạc: Bàn phím lấy cao độ (Tone), Máy gõ nhịp (Metronome) và Thế bấm kèn Recorder"
          >
            <Music className="w-3.5 h-3.5 fill-slate-950" />
            <span className="hidden sm:inline">Phòng Nhạc Cụ</span>
            <span className="sm:hidden">Nhạc Cụ</span>
          </button>
        )}
        {/* NÚT GOOGLE DRIVE */}
        {onOpenGoogleDrive && (
          <button
            onClick={onOpenGoogleDrive}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-200 hover:text-white text-xs font-bold rounded-lg border border-blue-500/30 transition-all shadow-xs"
            title="Kết nối và quản lý tệp trên Google Drive"
          >
            <svg viewBox="0 0 87.3 78" className="w-3.5 h-3.5">
              <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
              <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
              <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
              <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
              <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
              <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
            </svg>
            <span className="hidden sm:inline">Google Drive</span>
          </button>
        )}

        {/* NÚT CÀI ĐẶT RÕ RÀNG (SETTINGS) THEO YÊU CẦU CỦA USER */}
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
          title="Cài đặt thông tin giáo viên, đơn vị trường học và tùy chọn hệ thống"
        >
          <Settings className="w-3.5 h-3.5 text-blue-100" />
          <span className="hidden sm:inline">Cài Đặt</span>
          <span className="text-[11px] bg-blue-700 px-1.5 py-0.5 rounded text-blue-200 hidden xl:inline">
            {teacherProfile.fullName.split(' ').pop()}
          </span>
        </button>

        <button
          onClick={onDownloadOffline}
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-all"
          title="Tải file HTML chạy offline độc lập không cần mạng"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>Tải 1-File HTML</span>
        </button>

        <button
          onClick={onOpenJsonModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg border border-slate-700 transition-all"
          title="Bàn giao dữ liệu phiên làm việc qua khối JSON State"
        >
          <Share2 className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">JSON</span>
        </button>
      </div>
    </header>
  );
};
