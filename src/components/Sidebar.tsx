import React, { useState } from 'react';
import { 
  BookOpen, 
  Presentation, 
  FileCheck2, 
  Download, 
  FileText, 
  Code2, 
  Printer, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  User,
  GraduationCap,
  Calendar,
  RotateCcw,
  Sliders,
  Play,
  Settings,
  FolderOpen,
  Cloud,
  Music,
  Volume2
} from 'lucide-react';
import { AppState, AppSubsystem } from '../types';
import { exportWordKhbd, exportWordExam, exportSingleFileHtml, exportPowerPointSlides } from '../utils/exporter';
import { playTone } from '../utils/audioSynthesizer';

interface SidebarProps {
  state: AppState;
  onSubsystemChange: (subsystem: AppSubsystem) => void;
  onUpdateHeader: (field: string, value: string) => void;
  onOpenSettings: () => void;
  onOpenJsonModal: () => void;
  onStartPresentation: () => void;
  onResetData: () => void;
  onOpenMusicToolbox?: () => void;
  onOpenGoogleDrive?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  state,
  onSubsystemChange,
  onUpdateHeader,
  onOpenSettings,
  onOpenJsonModal,
  onStartPresentation,
  onResetData,
  onOpenMusicToolbox,
  onOpenGoogleDrive,
}) => {
  const [showConfig, setShowConfig] = useState(false);
  const { currentSubsystem, khbd, exam, teacherProfile, sourceDocuments } = state;

  // Tính toán kiểm toán sư phạm
  const isExamTotalValid = Math.abs(exam.summary.totalPoints - 10.0) < 0.01;
  const isRatioValid = 
    Math.abs(exam.summary.ratio.nb - 4.0) < 0.01 && 
    Math.abs(exam.summary.ratio.th - 3.0) < 0.01 && 
    Math.abs(exam.summary.ratio.vd - 3.0) < 0.01;

  const totalPartI = exam.partI.reduce((sum, q) => sum + q.score, 0);
  const totalPartII = exam.partII.reduce((sum, q) => sum + q.score, 0);
  const totalPartIII = exam.partIII.reduce((sum, q) => sum + q.score, 0);
  const totalPartIV = exam.partIV.reduce((sum, q) => sum + q.totalScore, 0);

  return (
    <aside className="w-[380px] shrink-0 border-r border-slate-200 bg-white flex flex-col h-[calc(100vh-64px)] overflow-y-auto select-none no-print">
      {/* Header thương hiệu sư phạm môn Âm Nhạc */}
      <div className="p-3.5 border-b border-slate-800 bg-[#0B0F19] text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center font-black text-slate-950 text-lg shadow-md ring-1 ring-amber-400/40">
              𝄞
            </div>
            <div>
              <span className="text-[10px] font-black tracking-wider text-amber-400 uppercase block">Sư Phạm Âm Nhạc</span>
              <h2 className="text-xs font-bold text-white leading-tight">THCS Kết Nối Tri Thức</h2>
            </div>
          </div>
          <button
            onClick={onOpenSettings}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-bold border border-slate-700 shadow-xs"
            title="Cài đặt thông tin giáo viên và đơn vị trường học"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Cài Đặt</span>
          </button>
        </div>

        {/* Card hồ sơ giáo viên nổi bật */}
        <div className="mt-2.5 p-2.5 bg-slate-900/90 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
          <div className="truncate">
            <div className="text-[10px] text-amber-400 font-semibold uppercase flex items-center gap-1">
              <span>Giáo viên Âm Nhạc:</span>
              <span>♫</span>
            </div>
            <div className="font-bold text-white text-xs truncate">
              {teacherProfile?.fullName || 'Nguyễn Thị Duyên Thanh'}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              Tổ Nghệ Thuật · {teacherProfile?.schoolName || 'Trường THCS Long Hồ'}
            </div>
          </div>
          <button
            onClick={onOpenSettings}
            className="text-[10px] text-amber-400 hover:text-amber-300 underline font-semibold shrink-0 ml-2"
          >
            Sửa
          </button>
        </div>

        {/* NÚT MỞ PHÒNG NHẠC CỤ & LẤY GIỌNG NGAY TẠI SIDEBAR */}
        {onOpenMusicToolbox && (
          <button
            type="button"
            onClick={onOpenMusicToolbox}
            className="mt-2.5 w-full py-2 px-3 bg-gradient-to-r from-amber-500/20 via-amber-500/30 to-amber-500/10 hover:from-amber-500/30 hover:to-amber-500/20 border border-amber-500/40 rounded-xl text-amber-300 font-bold text-xs flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2">
              <span className="text-base group-hover:scale-110 transition-transform">🎹</span>
              <div className="text-left">
                <div className="font-bold text-white text-[11px]">Phòng Nhạc Cụ Trợ Giảng</div>
                <div className="text-[9px] text-amber-400/90">Lấy giọng (Tone) · Gõ nhịp · Kèn Recorder</div>
              </div>
            </div>
            <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
              MỞ
            </span>
          </button>
        )}

        {/* LẤY CAO ĐỘ NHANH 1-CHẠM (QUICK PITCH BOARD) */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1 text-[10px]">
          <span className="text-slate-400 font-medium">Bắt giọng:</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => playTone(261.63, 0.9)}
              className="px-2 py-0.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-amber-300 font-bold rounded border border-slate-700 transition-colors"
              title="Phát nốt Đô (C4 - 262Hz)"
            >
              Đô C4
            </button>
            <button
              type="button"
              onClick={() => playTone(392.00, 0.9)}
              className="px-2 py-0.5 bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-amber-300 font-bold rounded border border-slate-700 transition-colors"
              title="Phát nốt Son (G4 - 392Hz)"
            >
              Son G4
            </button>
            <button
              type="button"
              onClick={() => playTone(440.00, 1.0)}
              className="px-2 py-0.5 bg-blue-900/80 hover:bg-blue-500 hover:text-white text-blue-200 font-bold rounded border border-blue-600/50 transition-colors"
              title="Phát nốt La chuẩn quốc tế (A4 - 440Hz)"
            >
              La 440Hz
            </button>
          </div>
        </div>
      </div>

      {/* 5 MẠCH NỘI DUNG MÔN ÂM NHẠC GDPT 2018 */}
      <div className="p-3 border-b border-slate-100 bg-amber-50/40 text-xs">
        <div className="text-[11px] font-bold text-amber-950 uppercase tracking-wider mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <span>𝄞</span>
            <span>Đặc Thù Môn Âm Nhạc THCS</span>
          </span>
          <span className="text-[10px] text-amber-800 font-semibold">5 Mạch nội dung</span>
        </div>
        <div className="grid grid-cols-2 gap-1 text-[10px] font-medium text-slate-700">
          <div className="p-1.5 bg-white rounded border border-amber-200/80 flex items-center gap-1.5">
            <span>🎵</span>
            <span className="truncate">Hát (Thanh nhạc)</span>
          </div>
          <div className="p-1.5 bg-white rounded border border-amber-200/80 flex items-center gap-1.5">
            <span>🥁</span>
            <span className="truncate">Nhạc cụ (Gõ & Kèn)</span>
          </div>
          <div className="p-1.5 bg-white rounded border border-amber-200/80 flex items-center gap-1.5">
            <span>🎼</span>
            <span className="truncate">Đọc nhạc (Khóa Sol)</span>
          </div>
          <div className="p-1.5 bg-white rounded border border-amber-200/80 flex items-center gap-1.5">
            <span>📖</span>
            <span className="truncate">Lí thuyết âm nhạc</span>
          </div>
          <div className="col-span-2 p-1.5 bg-white rounded border border-amber-200/80 flex items-center justify-between">
            <span className="flex items-center gap-1.5 truncate">
              <span>🎭</span>
              <span>Thưởng thức âm nhạc & Body Percussion</span>
            </span>
            <span className="text-[9px] text-amber-700 font-bold">KNTT</span>
          </div>
        </div>
      </div>

      {/* 4 PHÂN HỆ CHÍNH */}
      <div className="p-3 border-b border-slate-100 bg-slate-50">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
          <span>Quy Trình Tác Nghiệp</span>
          <span className="text-[10px] text-blue-600 font-semibold">4 Phân hệ</span>
        </div>
        <div className="space-y-1.5">
          {/* Chế độ 0: Tủ Sách & Nạp Tài Liệu Nguồn (SGK, SGV, SBT) */}
          <button
            onClick={() => onSubsystemChange('upload')}
            className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between border ${
              currentSubsystem === 'upload'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <FolderOpen className={`w-4 h-4 mt-0.5 ${currentSubsystem === 'upload' ? 'text-white' : 'text-amber-500'}`} />
              <div>
                <div className="font-bold flex items-center gap-1.5">
                  <span>Tủ Sách & Nạp Tài Liệu</span>
                  <span className={`text-[9px] px-1 py-0.2 rounded font-black ${
                    currentSubsystem === 'upload' ? 'bg-amber-400 text-slate-950' : 'bg-amber-100 text-amber-800'
                  }`}>
                    GỐC
                  </span>
                </div>
                <div className={`text-[11px] mt-0.5 ${currentSubsystem === 'upload' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Nạp SGK, SGV, SBT & Chọn Lớp
                </div>
              </div>
            </div>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
              currentSubsystem === 'upload' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {sourceDocuments?.length || 0} tài liệu
            </span>
          </button>

          {/* Chế độ 1: Soạn KHBD 5512 */}
          <button
            onClick={() => onSubsystemChange('khbd')}
            className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between border ${
              currentSubsystem === 'khbd'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <BookOpen className={`w-4 h-4 mt-0.5 ${currentSubsystem === 'khbd' ? 'text-white' : 'text-blue-600'}`} />
              <div>
                <div className="font-bold">Soạn KHBD 5512</div>
                <div className={`text-[11px] mt-0.5 ${currentSubsystem === 'khbd' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Chuẩn 4 Hoạt Động (CV 5512)
                </div>
              </div>
            </div>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
              currentSubsystem === 'khbd' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              4 Hoạt động
            </span>
          </button>

          {/* Chế độ 2: Trình Chiếu Slide Bài Giảng */}
          <button
            onClick={() => onSubsystemChange('slide')}
            className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between border ${
              currentSubsystem === 'slide'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <Presentation className={`w-4 h-4 mt-0.5 ${currentSubsystem === 'slide' ? 'text-white' : 'text-blue-600'}`} />
              <div>
                <div className="font-bold">Trình Chiếu Slide Bài Giảng</div>
                <div className={`text-[11px] mt-0.5 ${currentSubsystem === 'slide' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Trình chiếu & Ghi chú sư phạm
                </div>
              </div>
            </div>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
              currentSubsystem === 'slide' ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
            }`}>
              {state.slides.length} Slide
            </span>
          </button>

          {/* Chế độ 3: Ngân Hàng Đề Thi 7991 */}
          <button
            onClick={() => onSubsystemChange('exam')}
            className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start justify-between border ${
              currentSubsystem === 'exam'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <FileCheck2 className={`w-4 h-4 mt-0.5 ${currentSubsystem === 'exam' ? 'text-white' : 'text-blue-600'}`} />
              <div>
                <div className="font-bold">Ngân Hàng Đề Thi 7991</div>
                <div className={`text-[11px] mt-0.5 ${currentSubsystem === 'exam' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Chuẩn 4 Phần - 10.0đ (CV 7991)
                </div>
              </div>
            </div>
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
              currentSubsystem === 'exam' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200'
            }`}>
              10.0 Điểm
            </span>
          </button>
        </div>
      </div>

      {/* PEDAGOGICAL COMPLIANCE AUDIT PANEL */}
      <div className="p-3 border-b border-slate-100 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Kiểm Toán Pháp Lý & Ma Trận
          </span>
          <span className="text-[10px] text-emerald-700 bg-emerald-50 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
            CV 7991: ĐẠT CHUẨN
          </span>
        </div>

        {/* 4 phần của đề thi */}
        <div className="space-y-1.5 text-[11px]">
          <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-600">Phần I: TN Nhiều lựa chọn</span>
            <span className="font-bold text-slate-900">{totalPartI.toFixed(2)}đ / 3.0đ (30%)</span>
          </div>

          <div className="p-2 rounded bg-blue-50/60 border border-blue-100 flex items-center justify-between">
            <span className="text-blue-900 font-medium">Phần II: Đúng / Sai (4 lệnh a-b-c-d)</span>
            <span className="font-bold text-blue-900">{totalPartII.toFixed(2)}đ / 2.0đ (20%)</span>
          </div>

          <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-600">Phần III: TN Trả lời ngắn</span>
            <span className="font-bold text-slate-900">{totalPartIII.toFixed(2)}đ / 2.0đ (20%)</span>
          </div>

          <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-600">Phần IV: Tự luận</span>
            <span className="font-bold text-slate-900">{totalPartIV.toFixed(2)}đ / 3.0đ (30%)</span>
          </div>
        </div>

        {/* Barem 40% NB - 30% TH - 30% VD */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-3 gap-1.5 text-center text-[10px]">
          <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
            <div className="text-slate-500">Nhận biết</div>
            <div className="font-bold text-slate-800 text-xs">40% (4.0đ)</div>
          </div>
          <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
            <div className="text-slate-500">Thông hiểu</div>
            <div className="font-bold text-slate-800 text-xs">30% (3.0đ)</div>
          </div>
          <div className="bg-slate-50 p-1.5 rounded border border-slate-200">
            <div className="text-slate-500">Vận dụng</div>
            <div className="font-bold text-slate-800 text-xs">30% (3.0đ)</div>
          </div>
        </div>
      </div>

      {/* THÔNG TIN HÀNH CHÍNH & CẤU HÌNH NHANH */}
      <div className="p-3 border-b border-slate-100 bg-white">
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="w-full flex items-center justify-between text-[11px] font-bold text-slate-700 uppercase tracking-wider py-1"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-blue-600" />
            Hồ Sơ Sư Phạm Đơn Vị
          </span>
          <span className="text-[10px] text-blue-600 normal-case font-normal">
            {showConfig ? 'Thu gọn' : 'Chỉnh sửa'}
          </span>
        </button>

        {showConfig && (
          <div className="mt-2 space-y-2 text-xs">
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Trường học</label>
              <input
                type="text"
                value={khbd.header.schoolName}
                onChange={(e) => onUpdateHeader('schoolName', e.target.value)}
                className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Tổ bộ môn & Giáo viên</label>
              <div className="grid grid-cols-2 gap-1.5">
                <input
                  type="text"
                  value={khbd.header.departmentName}
                  onChange={(e) => onUpdateHeader('departmentName', e.target.value)}
                  className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="Tổ chuyên môn"
                />
                <input
                  type="text"
                  value={khbd.header.teacherName}
                  onChange={(e) => onUpdateHeader('teacherName', e.target.value)}
                  className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                  placeholder="Họ tên GV"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Môn học</label>
                <input
                  type="text"
                  value={khbd.header.subjectName}
                  onChange={(e) => onUpdateHeader('subjectName', e.target.value)}
                  className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-0.5">Khối / Lớp</label>
                <input
                  type="text"
                  value={khbd.header.grade}
                  onChange={(e) => onUpdateHeader('grade', e.target.value)}
                  className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 block mb-0.5">Tên bài dạy (KHBD)</label>
              <input
                type="text"
                value={khbd.header.lessonTitle}
                onChange={(e) => onUpdateHeader('lessonTitle', e.target.value)}
                className="w-full px-2 py-1 border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* KHU VỰC XUẤT BẢN & CHIA SẺ (EXPORT ZONE) */}
      <div className="p-3 flex-1 flex flex-col justify-end space-y-2">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 px-1">
          Khu Vực Xuất File & Trình Chiếu
        </div>

        {/* Trình chiếu slide */}
        <button
          onClick={onStartPresentation}
          className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Trình Chiếu Slide Toàn Màn Hình</span>
        </button>

        {/* Xuất file Word KHBD 5512 */}
        <button
          onClick={() => exportWordKhbd(khbd)}
          className="w-full py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium text-xs rounded-lg transition-colors flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Xuất Word KHBD (CV 5512)</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">.DOC</span>
        </button>

        {/* Xuất file PowerPoint Slide */}
        <button
          onClick={() => exportPowerPointSlides(state.slides, khbd.header.lessonTitle)}
          className="w-full py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium text-xs rounded-lg transition-colors flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Presentation className="w-3.5 h-3.5 text-amber-600" />
            <span>Xuất Slide Bài Giảng (PowerPoint)</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">.PPT</span>
        </button>

        {/* Xuất file Word Đề thi 7991 */}
        <button
          onClick={() => exportWordExam(exam)}
          className="w-full py-2 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-medium text-xs rounded-lg transition-colors flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Xuất Đề Thi + Ma Trận (CV 7991)</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">.DOC</span>
        </button>

        {/* Tải Single-File HTML Offline độc lập */}
        <button
          onClick={() => exportSingleFileHtml(state)}
          className="w-full py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-medium text-xs rounded-lg transition-colors flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tải File HTML Độc Lập (Offline)</span>
          </span>
          <span className="text-[10px] text-emerald-700 font-mono">1-File</span>
        </button>

        {/* Mở Google Drive Modal */}
        {onOpenGoogleDrive && (
          <button
            onClick={onOpenGoogleDrive}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-900/40 via-blue-900/60 to-blue-900/40 hover:from-blue-900/60 hover:to-blue-900/80 text-blue-200 hover:text-white border border-blue-500/40 font-bold text-xs rounded-lg transition-all flex items-center justify-between shadow-xs"
          >
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 87.3 78" className="w-4 h-4">
                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
              </svg>
              <span>Lưu & Quản Lý Google Drive</span>
            </span>
            <span className="text-[10px] bg-blue-500/30 text-blue-200 px-1.5 py-0.5 rounded font-bold">DRIVE</span>
          </button>
        )}

        {/* In ấn trực tiếp */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            onClick={() => window.print()}
            className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium flex items-center justify-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>In / PDF</span>
          </button>
          <button
            onClick={onOpenJsonModal}
            className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium flex items-center justify-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5 text-slate-600" />
            <span>JSON State</span>
          </button>
        </div>

        {/* Reset dữ liệu gốc */}
        <button
          onClick={onResetData}
          className="w-full pt-1 text-[11px] text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Khôi phục dữ liệu mẫu gốc</span>
        </button>
      </div>
    </aside>
  );
};
