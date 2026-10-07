import React, { useState } from 'react';
import { SlideItem } from '../types';
import { 
  Presentation, 
  Play, 
  Plus, 
  Trash2, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  Lightbulb, 
  RefreshCw,
  Layers,
  HelpCircle,
  FileText,
  Download,
  Music,
  Volume2
} from 'lucide-react';
import { exportPowerPointSlides } from '../utils/exporter';
import { playTone } from '../utils/audioSynthesizer';

interface SlideWorkspaceProps {
  slides: SlideItem[];
  onUpdateSlides: (updated: SlideItem[]) => void;
  onStartPresentation: () => void;
  onConvertToSlides: () => void;
  onOpenMusicToolbox?: () => void;
}

export const SlideWorkspace: React.FC<SlideWorkspaceProps> = ({
  slides,
  onUpdateSlides,
  onStartPresentation,
  onConvertToSlides,
  onOpenMusicToolbox,
}) => {
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const currentSlide = slides[activeSlideIndex] || slides[0];

  const handleUpdateCurrentSlide = (updated: SlideItem) => {
    const newSlides = [...slides];
    newSlides[activeSlideIndex] = updated;
    onUpdateSlides(newSlides);
  };

  const handleNextSlide = () => {
    if (activeSlideIndex < slides.length - 1) {
      setActiveSlideIndex(prev => prev + 1);
    }
  };

  const handlePrevSlide = () => {
    if (activeSlideIndex > 0) {
      setActiveSlideIndex(prev => prev - 1);
    }
  };

  const handleAddSlide = () => {
    const newSlide: SlideItem = {
      id: 'slide-' + Date.now(),
      slideNumber: slides.length + 1,
      title: 'SLIDE MỚI: KIẾN THỨC TRỌNG TÂM',
      phase: 'Kiến thức mới',
      bulletPoints: [
        'Ý chính 1: Nêu định nghĩa hoặc nguyên lý cốt lõi',
        'Ý chính 2: Phân tích ví dụ trực quan liên hệ thực tiễn',
        'Ý chính 3: Lưu ý sư phạm và sai lầm thường gặp'
      ],
      highlightBox: {
        type: 'definition',
        title: 'Khắc sâu kiến thức',
        content: 'Nội dung cốt lõi học sinh cần ghi nhớ.'
      },
      teacherNotes: 'Cho học sinh làm việc cặp đôi trong 3 phút trước khi chốt kiến thức.',
      timerMinutes: 3
    };
    onUpdateSlides([...slides, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const handleDeleteSlide = (idx: number) => {
    if (slides.length <= 1) return;
    const filtered = slides.filter((_, i) => i !== idx).map((s, i) => ({
      ...s,
      slideNumber: i + 1
    }));
    onUpdateSlides(filtered);
    setActiveSlideIndex(Math.max(0, idx - 1));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Top Banner Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
            <Presentation className="w-3.5 h-3.5" />
            PHÂN HỆ SLIDE BÀI GIẢNG SƯ PHẠM (16:9 DECK)
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1.5">
            Trình Chiếu Bài Giảng Khớp Tiến Trình CV 5512
          </h1>
          <p className="text-xs text-slate-500">
            Trực quan hóa kiến thức, thanh điều hướng Next/Prev và chế độ Toàn Màn Hình
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* NÚT MỞ PHÒNG NHẠC CỤ & LẤY GIỌNG TRỰC TIẾP TRÊN SLIDE */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {onOpenMusicToolbox && (
              <button
                type="button"
                onClick={onOpenMusicToolbox}
                className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-md shadow-xs transition-all flex items-center gap-1.5"
                title="Mở phòng nhạc cụ: Bàn phím lấy cao độ, Máy gõ nhịp & Kèn Recorder"
              >
                <Music className="w-3.5 h-3.5 fill-slate-950" />
                <span>Phòng Nhạc Cụ</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => playTone(440.00, 1.0)}
              className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 font-bold text-xs rounded-md border border-slate-700 flex items-center gap-1"
              title="Phát nốt La 440Hz chuẩn quốc tế"
            >
              <Volume2 className="w-3 h-3 text-blue-400" />
              <span>La 440Hz</span>
            </button>
          </div>

          {/* NÚT CHUYỂN ĐỔI NHANH KHBD THÀNH SLIDE (SCOPE 3) */}
          <button
            onClick={onConvertToSlides}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            title="Đồng bộ hóa các hoạt động KHBD 5512 thành các thẻ slide 16:9"
          >
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
            <span>Đồng Bộ KHBD</span>
          </button>

          {/* NÚT CHẾ ĐỘ TOÀN MÀN HÌNH (FULLSCREEN PRESENTATION) */}
          <button
            onClick={onStartPresentation}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-2"
            title="Bắt đầu trình chiếu toàn màn hình (F5)"
          >
            <Maximize2 className="w-4 h-4 text-white" />
            <span>Toàn Màn Hình (F5)</span>
          </button>

          {/* NÚT TẢI POWERPOINT (.PPT) */}
          <button
            onClick={() => exportPowerPointSlides(slides, 'BaiGiang_Slide_5512')}
            className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            title="Tải bài giảng về định dạng PowerPoint (.ppt)"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Tải PowerPoint (.PPT)</span>
          </button>
        </div>
      </div>

      {/* Main Slide Deck 16:9 Canvas */}
      <div className="space-y-4">
        {/* Navigation & Counter Bar */}
        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900 text-sm">
              Slide {activeSlideIndex + 1} / {slides.length}
            </span>
            <span className="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-bold border border-blue-200">
              Pha: {currentSlide.phase}
            </span>
          </div>

          {/* Next / Prev Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevSlide}
              disabled={activeSlideIndex === 0}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:pointer-events-none rounded-lg font-bold flex items-center gap-1 text-slate-700 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Trước</span>
            </button>
            <button
              onClick={handleNextSlide}
              disabled={activeSlideIndex === slides.length - 1}
              className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none rounded-lg font-bold flex items-center gap-1 text-white shadow-xs transition-colors"
            >
              <span>Tiếp Theo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleAddSlide}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg ml-2"
              title="Thêm slide mới"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 16:9 RATIO SLIDE DECK CARD CANVAS                                   */}
        {/* =================================================================== */}
        {currentSlide && (
          <div className="bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden aspect-[16/9] flex flex-col justify-between p-8 md:p-12 relative text-white select-none">
            {/* Background Glow & Musical Staff Watermark */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Họa tiết khuông nhạc & Khóa Sol trang trí đặc thù sư phạm Âm Nhạc */}
            <div className="absolute right-6 top-16 bottom-16 w-80 pointer-events-none opacity-5 flex flex-col justify-around py-4">
              <div className="h-[2px] bg-amber-300 w-full"></div>
              <div className="h-[2px] bg-amber-300 w-full"></div>
              <div className="h-[2px] bg-amber-300 w-full"></div>
              <div className="h-[2px] bg-amber-300 w-full"></div>
              <div className="h-[2px] bg-amber-300 w-full"></div>
            </div>
            <div className="absolute right-12 top-1/2 -translate-y-1/2 text-8xl text-amber-400/5 font-black pointer-events-none select-none">
              𝄞
            </div>

            {/* Top Phase Header */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 z-10">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-sm flex items-center justify-center shadow-sm">
                  {currentSlide.slideNumber}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block">
                    {currentSlide.phase} · Chuẩn Sư Phạm 5512
                  </span>
                  <input
                    type="text"
                    value={currentSlide.title}
                    onChange={(e) => handleUpdateCurrentSlide({ ...currentSlide, title: e.target.value })}
                    className="font-extrabold text-lg md:text-2xl text-white bg-transparent outline-none border-b border-transparent focus:border-blue-400 w-80 md:w-[600px] truncate"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={currentSlide.phase}
                  onChange={(e) => handleUpdateCurrentSlide({ ...currentSlide, phase: e.target.value as any })}
                  className="bg-slate-800 text-slate-300 text-xs px-2.5 py-1 rounded-lg border border-slate-700 outline-none cursor-pointer"
                >
                  <option value="Khởi động">Khởi động</option>
                  <option value="Kiến thức mới">Kiến thức mới</option>
                  <option value="Luyện tập">Luyện tập</option>
                  <option value="Vận dụng">Vận dụng</option>
                  <option value="Tổng kết">Tổng kết</option>
                </select>

                {slides.length > 1 && (
                  <button
                    onClick={() => handleDeleteSlide(activeSlideIndex)}
                    className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                    title="Xóa slide này"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Middle: Bullet Points Trực Quan Hóa */}
            <div className="my-auto py-4 space-y-3 z-10 max-h-[60%] overflow-y-auto pr-2">
              {currentSlide.bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-3 text-sm md:text-base text-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-2 shrink-0 shadow-xs shadow-blue-500/50"></span>
                  <input
                    type="text"
                    value={point}
                    onChange={(e) => {
                      const newPoints = [...currentSlide.bulletPoints];
                      newPoints[idx] = e.target.value;
                      handleUpdateCurrentSlide({ ...currentSlide, bulletPoints: newPoints });
                    }}
                    className="bg-transparent text-white border-b border-transparent hover:border-slate-700 focus:border-blue-400 outline-none flex-1"
                  />
                </div>
              ))}
            </div>

            {/* Bottom: Highlight Box */}
            {currentSlide.highlightBox && (
              <div className="p-4 rounded-xl border-l-4 border-blue-500 bg-slate-800/90 backdrop-blur-xs z-10 text-xs">
                <div className="font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>{currentSlide.highlightBox.title}</span>
                </div>
                <div className="text-slate-300 font-medium">
                  {currentSlide.highlightBox.content}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Speaker Notes & Timer Bar (Bên dưới Canvas 16:9) */}
        {currentSlide && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs space-y-2">
            <div className="flex items-center justify-between text-amber-900 font-bold">
              <span className="flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Ghi Chú Giảng Dạy Của Giáo Viên (Speaker Notes):</span>
              </span>
              <div className="flex items-center gap-1.5 text-amber-800 font-normal">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Thời gian dự kiến:</span>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={currentSlide.timerMinutes || 3}
                  onChange={(e) => handleUpdateCurrentSlide({
                    ...currentSlide,
                    timerMinutes: parseInt(e.target.value) || 3
                  })}
                  className="w-12 px-1.5 py-0.5 bg-white border border-amber-300 rounded text-center font-bold"
                />
                <span>phút</span>
              </div>
            </div>
            <textarea
              rows={2}
              value={currentSlide.teacherNotes}
              onChange={(e) => handleUpdateCurrentSlide({ ...currentSlide, teacherNotes: e.target.value })}
              className="w-full bg-white p-2 rounded-lg border border-amber-300 text-slate-800 outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Ghi chú hướng dẫn sư phạm, phương pháp điều hành..."
            />
          </div>
        )}

        {/* Thumbnails strip */}
        <div className="flex items-center gap-2 overflow-x-auto py-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setActiveSlideIndex(idx)}
              className={`px-3 py-2 rounded-lg text-xs shrink-0 border transition-all text-left ${
                activeSlideIndex === idx
                  ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="text-[10px] opacity-75">#{s.slideNumber} · {s.phase}</div>
              <div className="truncate max-w-[120px]">{s.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
