import React, { useState, useEffect } from 'react';
import { SlideItem } from '../types';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Clock, 
  Lightbulb, 
  Sparkles,
  HelpCircle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface PresentationModalProps {
  slides: SlideItem[];
  onClose: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({ slides, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState((slides[0]?.timerMinutes || 3) * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const currentSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    setSecondsLeft((currentSlide.timerMinutes || 3) * 60);
    setIsTimerRunning(false);
  }, [currentIndex, currentSlide]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length, onClose]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 select-none animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-sm bg-blue-600 px-2.5 py-1 rounded">
            Slide {currentIndex + 1} / {slides.length}
          </span>
          <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">
            Pha: {currentSlide.phase}
          </span>
        </div>

        {/* Timer Control */}
        <div className="flex items-center gap-3 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-mono text-sm font-bold text-white">
            {formatTime(secondsLeft)}
          </span>
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="p-1 hover:text-white transition-colors"
            title={isTimerRunning ? 'Tạm dừng' : 'Bắt đầu đếm ngược'}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              setSecondsLeft((currentSlide.timerMinutes || 3) * 60);
              setIsTimerRunning(false);
            }}
            className="p-1 hover:text-white transition-colors"
            title="Đặt lại thời gian"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1 rounded text-xs transition-colors flex items-center gap-1.5 ${
              showNotes ? 'bg-amber-600 text-white font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Ghi chú GV (N)</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
            title="Thoát trình chiếu (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Content Canvas */}
      <div className="flex-1 flex items-center justify-center my-6">
        <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-10 md:p-14 shadow-2xl min-h-[460px] flex flex-col justify-between relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div>
            <div className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">
              {currentSlide.phase} · Tiết dạy chuẩn CV 5512
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {currentSlide.title}
            </h1>

            <div className="mt-8 space-y-4">
              {currentSlide.bulletPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-4 text-base md:text-lg text-slate-200">
                  <span className="w-3 h-3 rounded-full bg-blue-500 mt-2 shrink-0 shadow-sm shadow-blue-500/50"></span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highlight Callout */}
          {currentSlide.highlightBox && (
            <div className="mt-8 p-5 rounded-xl border-l-4 border-blue-500 bg-slate-800/80 backdrop-blur-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>{currentSlide.highlightBox.title}</span>
              </div>
              <div className="text-sm md:text-base font-medium text-slate-200">
                {currentSlide.highlightBox.content}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Speaker Notes Overlay (if toggled) */}
      {showNotes && (
        <div className="max-w-4xl mx-auto w-full mb-4 bg-amber-950/90 border border-amber-600 text-amber-200 p-4 rounded-xl text-xs backdrop-blur-sm shadow-lg">
          <div className="font-bold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Chỉ đạo sư phạm dành riêng cho Giáo viên:</span>
          </div>
          <p className="leading-relaxed">{currentSlide.teacherNotes}</p>
        </div>
      )}

      {/* Bottom Navigation Controls */}
      <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
        <div>
          Phím tắt: <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">← / →</kbd> Chuyển slide · <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">N</kbd> Bật ghi chú · <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">Esc</kbd> Thoát
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:pointer-events-none rounded-lg text-white font-medium flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trước</span>
          </button>
          <button
            onClick={() => setCurrentIndex(prev => Math.min(prev + 1, slides.length - 1))}
            disabled={currentIndex === slides.length - 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:pointer-events-none rounded-lg text-white font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <span>Tiếp theo</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
