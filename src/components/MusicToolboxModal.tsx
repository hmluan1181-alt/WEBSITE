import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Volume2, 
  Play, 
  Square, 
  Music, 
  Disc, 
  Radio, 
  Sparkles, 
  Check, 
  Sliders,
  HelpCircle,
  Activity,
  Layers,
  Repeat
} from 'lucide-react';
import { 
  playTone, 
  playMetronomeTick, 
  playSchoolPercussion, 
  playVocalWarmupSequence, 
  NOTE_FREQUENCIES 
} from '../utils/audioSynthesizer';

interface MusicToolboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade?: string;
  currentLesson?: string;
}

// Thế bấm kèn Recorder cơ bản theo SGK Kết Nối Tri Thức (Hệ bấm German)
// Lỗ 0: Ngón cái tay trái ở mặt sau; Lỗ 1, 2, 3: Tay trái; Lỗ 4, 5, 6, 7: Tay phải
const RECORDER_NOTES: Record<string, { note: string; name: string; freq: number; holes: boolean[]; noteKey: string; tip: string }> = {
  'B': { 
    note: 'Si (B4)', 
    name: 'Nốt Si', 
    freq: 493.88, 
    holes: [true, true, false, false, false, false, false, false], 
    noteKey: 'B4',
    tip: 'Bịt lỗ ngón cái (sau) và lỗ 1 (ngón trỏ tay trái).'
  },
  'A': { 
    note: 'La (A4)', 
    name: 'Nốt La', 
    freq: 440.00, 
    holes: [true, true, true, false, false, false, false, false], 
    noteKey: 'A4',
    tip: 'Bịt lỗ ngón cái (sau), lỗ 1 và lỗ 2 tay trái.'
  },
  'G': { 
    note: 'Son (G4)', 
    name: 'Nốt Son', 
    freq: 392.00, 
    holes: [true, true, true, true, false, false, false, false], 
    noteKey: 'G4',
    tip: 'Bịt ngón cái, lỗ 1, 2, 3 tay trái (toàn bộ 3 ngón tay trái).'
  },
  'F': { 
    note: 'Pha (F4)', 
    name: 'Nốt Pha', 
    freq: 349.23, 
    holes: [true, true, true, true, true, false, true, true], 
    noteKey: 'F4',
    tip: 'Hệ bấm German: Bịt ngón cái, 1, 2, 3, 4, 6, 7 (mở ngón giữa tay phải).'
  },
  'E': { 
    note: 'Mi (E4)', 
    name: 'Nốt Mi', 
    freq: 329.63, 
    holes: [true, true, true, true, true, true, false, false], 
    noteKey: 'E4',
    tip: 'Bịt ngón cái và lỗ 1, 2, 3, 4, 5 (thổi nhẹ nhàng, thả lỏng môi).'
  },
  'D': { 
    note: 'Rê (D4)', 
    name: 'Nốt Rê', 
    freq: 293.66, 
    holes: [true, true, true, true, true, true, true, false], 
    noteKey: 'D4',
    tip: 'Bịt ngón cái và lỗ 1, 2, 3, 4, 5, 6 (thổi hơi rất ấm, không tì mạnh).'
  },
  'C': { 
    note: 'Đô (C4)', 
    name: 'Nốt Đô', 
    freq: 261.63, 
    holes: [true, true, true, true, true, true, true, true], 
    noteKey: 'C4',
    tip: 'Bịt kín toàn bộ tất cả các lỗ (lỗ ngón cái và 7 lỗ ngón tay).'
  }
};

export const MusicToolboxModal: React.FC<MusicToolboxModalProps> = ({
  isOpen,
  onClose,
  currentGrade = 'LỚP 6',
  currentLesson = ''
}) => {
  const [activeTab, setActiveTab] = useState<'pitch' | 'metronome' | 'percussion' | 'recorder' | 'handsigns'>('pitch');
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);

  const handleCopySymbol = (sym: string) => {
    navigator.clipboard.writeText(sym);
    setCopiedSymbol(sym);
    setTimeout(() => setCopiedSymbol(null), 1500);
  };
  
  // State Bộ Lấy Cao Độ (Tone / Pitch)
  const [activePlayingNote, setActivePlayingNote] = useState<string | null>(null);
  const [isVocalWarmupActive, setIsVocalWarmupActive] = useState(false);
  const [warmupStepNote, setWarmupStepNote] = useState<string | null>(null);
  const cancelWarmupRef = useRef<(() => void) | null>(null);

  // State Máy Gõ Nhịp (Metronome)
  const [bpm, setBpm] = useState<number>(80);
  const [timeSignature, setTimeSignature] = useState<'2/4' | '3/4' | '4/4'>('2/4');
  const [isMetronomePlaying, setIsMetronomePlaying] = useState<boolean>(false);
  const [currentBeat, setCurrentBeat] = useState<number>(0);
  const metronomeIntervalRef = useRef<number | null>(null);

  // State Kèn Recorder
  const [selectedRecorderNote, setSelectedRecorderNote] = useState<string>('B');

  // Metronome Loop
  const beatsPerMeasure = timeSignature === '2/4' ? 2 : timeSignature === '3/4' ? 3 : 4;

  useEffect(() => {
    if (isMetronomePlaying) {
      const intervalMs = (60 / bpm) * 1000;
      let beat = 0;

      // First tick immediate
      playMetronomeTick(true);
      setCurrentBeat(1);

      metronomeIntervalRef.current = window.setInterval(() => {
        beat = (beat + 1) % beatsPerMeasure;
        const isAccent = beat === 0;
        playMetronomeTick(isAccent);
        setCurrentBeat(beat + 1);
      }, intervalMs);
    } else {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
        metronomeIntervalRef.current = null;
      }
      setCurrentBeat(0);
    }

    return () => {
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    };
  }, [isMetronomePlaying, bpm, beatsPerMeasure]);

  // Clean up warmup on unmount or close
  useEffect(() => {
    return () => {
      if (cancelWarmupRef.current) {
        cancelWarmupRef.current();
      }
      if (metronomeIntervalRef.current) {
        clearInterval(metronomeIntervalRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  const handlePlaySingleNote = (key: string, freq: number) => {
    setActivePlayingNote(key);
    playTone(freq, 1.2);
    setTimeout(() => {
      setActivePlayingNote(prev => (prev === key ? null : prev));
    }, 600);
  };

  const handleStartVocalWarmup = () => {
    if (isVocalWarmupActive) {
      if (cancelWarmupRef.current) {
        cancelWarmupRef.current();
        cancelWarmupRef.current = null;
      }
      setIsVocalWarmupActive(false);
      setWarmupStepNote(null);
      return;
    }

    setIsVocalWarmupActive(true);
    cancelWarmupRef.current = playVocalWarmupSequence(
      (noteKey) => {
        setWarmupStepNote(noteKey);
      },
      () => {
        setIsVocalWarmupActive(false);
        setWarmupStepNote(null);
        cancelWarmupRef.current = null;
      }
    );
  };

  const currentRecorder = RECORDER_NOTES[selectedRecorderNote] || RECORDER_NOTES['B'];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 select-none animate-in fade-in">
      <div className="bg-[#0B0F19] text-white rounded-2xl max-w-3xl w-full border border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* MODAL HEADER - PHONG CÁCH ÂM NHẠC SANG TRỌNG */}
        <div className="p-4 md:p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-[#131B2E] to-slate-900 flex items-center justify-between relative overflow-hidden">
          {/* Họa tiết khuông nhạc mờ nghệ thuật */}
          <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none opacity-10 flex flex-col justify-around py-2">
            <div className="h-[1px] bg-white w-full"></div>
            <div className="h-[1px] bg-white w-full"></div>
            <div className="h-[1px] bg-white w-full"></div>
            <div className="h-[1px] bg-white w-full"></div>
            <div className="h-[1px] bg-white w-full"></div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg ring-2 ring-amber-400/40">
              𝄞
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                  Phòng Nhạc Cụ & Trợ Giảng Sư Phạm
                </span>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60 font-semibold">
                  Web Audio Live
                </span>
              </div>
              <h2 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                <span>Hộp Công Cụ Âm Nhạc Trực Tiếp</span>
                <span className="text-xs font-normal text-slate-400">({currentGrade} - Kết Nối Tri Thức)</span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              if (cancelWarmupRef.current) cancelWarmupRef.current();
              if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
              setIsMetronomePlaying(false);
              onClose();
            }}
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 TAB TÁC NGHIỆP ĐẶC THÙ MÔN ÂM NHẠC */}
        <div className="grid grid-cols-2 sm:grid-cols-5 bg-slate-900/90 border-b border-slate-800 text-xs font-bold text-center">
          <button
            onClick={() => setActiveTab('pitch')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'pitch'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">🎹</span>
            <span className="truncate">Lấy Cao Độ (Tone)</span>
          </button>

          <button
            onClick={() => setActiveTab('metronome')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'metronome'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">⏱️</span>
            <span className="truncate">Máy Gõ Nhịp</span>
          </button>

          <button
            onClick={() => setActiveTab('percussion')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'percussion'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">🥁</span>
            <span className="truncate">Nhạc Cụ Gõ</span>
          </button>

          <button
            onClick={() => setActiveTab('recorder')}
            className={`py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'recorder'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">🎺</span>
            <span className="truncate">Thế Bấm Recorder</span>
          </button>

          <button
            onClick={() => setActiveTab('handsigns')}
            className={`col-span-2 sm:col-span-1 py-3 px-2 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'handsigns'
                ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">🎼</span>
            <span className="truncate">Kí Hiệu Tay & Kí Tự</span>
          </button>
        </div>

        {/* NỘI DUNG TỪNG TAB */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {/* ================================================================ */}
          {/* TAB 1: LẤY CAO ĐỘ CHUẨN (TONE / PITCH) & LUYỆN THANH MẪU ÂM     */}
          {/* ================================================================ */}
          {activeTab === 'pitch' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <Music className="w-4 h-4 text-amber-400" />
                    <span>Bàn Phím Lấy Giọng Sư Phạm (Pitch Pipe 440Hz)</span>
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Bấm vào từng phím để phát cao độ chuẩn giúp học sinh bắt giọng (Tone) trước khi vào bài hát.
                  </p>
                </div>

                {/* Nút tự động phát chuỗi luyện thanh Mi - Ma */}
                <button
                  type="button"
                  onClick={handleStartVocalWarmup}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shrink-0 ${
                    isVocalWarmupActive
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg animate-pulse'
                      : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md font-black'
                  }`}
                >
                  {isVocalWarmupActive ? (
                    <>
                      <Square className="w-4 h-4 fill-white" />
                      <span>Dừng Luyện Thanh</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>Phát Chuỗi Luyện Thanh (Mi - Ma)</span>
                    </>
                  )}
                </button>
              </div>

              {/* BÀN PHÍM ĐÀN VIRTUAL PIANO STRIP (C4 - C5) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
                  <span>Thang âm tự nhiên (Khóa Sol): Đô - Rê - Mi - Pha - Son - La - Si - Đô</span>
                  <span>Nhấn phím để nghe âm thanh</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {Object.entries(NOTE_FREQUENCIES).map(([key, info]) => {
                    const isPlaying = activePlayingNote === key || warmupStepNote === key;
                    const isLaChuan = key === 'A4';

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handlePlaySingleNote(key, info.freq)}
                        className={`py-4 px-2 rounded-xl flex flex-col items-center justify-between gap-2 border transition-all text-center group ${
                          isPlaying
                            ? 'bg-amber-400 text-slate-950 border-amber-300 ring-4 ring-amber-400/30 scale-105 shadow-xl font-black'
                            : isLaChuan
                            ? 'bg-blue-950/70 border-blue-500/60 hover:bg-blue-900 text-blue-200 hover:border-blue-400'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700/80 text-white hover:border-slate-500'
                        }`}
                      >
                        <span className={`text-[10px] uppercase font-bold tracking-wider ${
                          isPlaying ? 'text-slate-950' : 'text-slate-400'
                        }`}>
                          {info.solfege}
                        </span>
                        <span className="text-base font-black tracking-tight">{info.label.split(' ')[0]}</span>
                        <span className={`text-[9px] font-mono ${
                          isPlaying ? 'text-slate-900 font-bold' : isLaChuan ? 'text-blue-300' : 'text-slate-500'
                        }`}>
                          {Math.round(info.freq)}Hz
                        </span>
                        {isLaChuan && (
                          <span className={`text-[8px] font-bold px-1 rounded ${
                            isPlaying ? 'bg-slate-950 text-amber-300' : 'bg-blue-800 text-white'
                          }`}>
                            Chuẩn 440
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* HƯỚNG DẪN SƯ PHẠM LUYỆN THANH KHỞI ĐỘNG GIỌNG */}
              <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/80 space-y-2">
                <div className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                  <span>🎵</span>
                  <span>Quy Trình Khởi Động Giọng Môn Âm Nhạc THCS (Chuẩn CV 5512):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
                  <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                    <div className="font-bold text-white mb-1">1. Tư thế & Khẩu hình</div>
                    <div className="text-slate-400">Lưng thẳng, ngực mở tự nhiên, hai vai thả lỏng. Miệng mở theo chiều dọc hình quả trứng gà.</div>
                  </div>
                  <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                    <div className="font-bold text-white mb-1">2. Hơi thở hoành cách mô</div>
                    <div className="text-slate-400">Hít vào nhẹ nhàng bằng mũi và miệng, bụng phình ra. Giữ hơi và nhả hơi đều đặn theo câu hát.</div>
                  </div>
                  <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                    <div className="font-bold text-white mb-1">3. Mẫu âm Mi - Ma</div>
                    <div className="text-slate-400">Phát âm "Mi" sáng, vang ở vị trí đầu; chuyển sang "Ma" tròn vành, rõ chữ, hạ thấp cằm mềm mại.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: MÁY GÕ NHỊP SƯ PHẠM (METRONOME)                            */}
          {/* ================================================================ */}
          {activeTab === 'metronome' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 text-center space-y-5">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xs uppercase font-bold tracking-widest text-slate-400">Số phách / nhịp:</span>
                  <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                    {(['2/4', '3/4', '4/4'] as const).map(sig => (
                      <button
                        key={sig}
                        type="button"
                        onClick={() => setTimeSignature(sig)}
                        className={`px-3 py-1 rounded-md font-bold text-xs transition-all ${
                          timeSignature === sig
                            ? 'bg-amber-500 text-slate-950 shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Nhịp {sig}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CON LẮC VÀ HIỂN THỊ PHÁCH TRỰC QUAN */}
                <div className="flex items-center justify-center gap-3 py-2">
                  {Array.from({ length: beatsPerMeasure }).map((_, i) => {
                    const beatNumber = i + 1;
                    const isCurrent = currentBeat === beatNumber;
                    const isFirst = i === 0;

                    return (
                      <div
                        key={i}
                        className={`w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all border ${
                          isCurrent
                            ? isFirst
                              ? 'bg-rose-500 border-rose-300 ring-4 ring-rose-500/40 scale-110 shadow-lg text-white font-black'
                              : 'bg-amber-400 border-amber-200 ring-4 ring-amber-400/40 scale-105 shadow-md text-slate-950 font-black'
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}
                      >
                        <span className="text-sm">{beatNumber}</span>
                        <span className="text-[8px] uppercase">{isFirst ? 'Mạnh' : 'Nhẹ'}</span>
                      </div>
                    );
                  })}
                </div>

                {/* TEMPO DISPLAY TO RÕ RÀNG */}
                <div>
                  <div className="text-5xl font-black font-mono tracking-tight text-amber-400 tabular-nums">
                    {bpm} <span className="text-lg font-normal text-slate-400">BPM</span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">
                    {bpm < 70 ? 'Lento (Thong thả, chậm rãi)' : 
                     bpm < 95 ? 'Andante (Vừa phải, tha thiết)' : 
                     bpm < 115 ? 'Moderato (Hơi nhanh, nhịp nhàng)' : 
                     'Allegro (Nhanh, vui tươi, rộn rã)'}
                  </div>
                </div>

                {/* SLIDER ĐIỀU CHỈNH TEMPO */}
                <div className="max-w-md mx-auto space-y-2">
                  <input
                    type="range"
                    min="50"
                    max="160"
                    value={bpm}
                    onChange={(e) => setBpm(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>50 (Chậm)</span>
                    <span>80 (Chuẩn hát thiếu nhi)</span>
                    <span>120 (Hành khúc)</span>
                    <span>160 (Nhanh)</span>
                  </div>
                </div>

                {/* CÁC MỐC TEMPO NHANH */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {[60, 72, 80, 90, 100, 108, 120].map(val => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setBpm(val)}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-colors ${
                        bpm === val
                          ? 'bg-amber-400 text-slate-950 border-amber-300'
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>

                {/* NÚT BẮT ĐẦU / DỪNG */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsMetronomePlaying(!isMetronomePlaying)}
                    className={`px-8 py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 mx-auto shadow-xl transition-all ${
                      isMetronomePlaying
                        ? 'bg-rose-600 hover:bg-rose-500 text-white ring-4 ring-rose-500/30'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 ring-4 ring-emerald-500/30'
                    }`}
                  >
                    {isMetronomePlaying ? (
                      <>
                        <Square className="w-5 h-5 fill-white" />
                        <span>DỪNG GÕ NHỊP</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-slate-950" />
                        <span>BẮT ĐẦU GÕ NHỊP</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: NHẠC CỤ GÕ TIẾT TẤU HỌC ĐƯỜNG                             */}
          {/* ================================================================ */}
          {activeTab === 'percussion' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <span>🥁</span>
                  <span>Mô Phỏng 4 Nhạc Cụ Gõ Tiết Tấu THCS (Gõ Đệm Trực Tiếp)</span>
                </h3>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Bấm vào từng nhạc cụ để nghe âm thanh gõ đệm thực tế phục vụ luyện tập tiết tấu bài hát.
                </p>
              </div>

              {/* 4 NÚT NHẠC CỤ GÕ LỚN */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => playSchoolPercussion('thanh-phach')}
                  className="p-5 bg-gradient-to-b from-amber-900/30 to-amber-950/60 hover:from-amber-900/50 hover:to-amber-950/80 border border-amber-600/40 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🥢
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Thanh Phách</div>
                    <div className="text-[10px] text-amber-300">Gõ giòn, dứt khoát</div>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">
                    Gõ Phách
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => playSchoolPercussion('trong-con')}
                  className="p-5 bg-gradient-to-b from-red-900/30 to-red-950/60 hover:from-red-900/50 hover:to-red-950/80 border border-red-600/40 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-red-500/20 border border-red-400/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🥁
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Trống Con</div>
                    <div className="text-[10px] text-red-300">Âm trầm, ngân vang</div>
                  </div>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-2 py-0.5 rounded font-bold">
                    Gõ Phách Mạnh
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => playSchoolPercussion('song-loan')}
                  className="p-5 bg-gradient-to-b from-emerald-900/30 to-emerald-950/60 hover:from-emerald-900/50 hover:to-emerald-950/80 border border-emerald-600/40 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🪵
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Song Loan</div>
                    <div className="text-[10px] text-emerald-300">Đanh gọn, cổ truyền</div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                    Dân Ca / Hát Xoan
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => playSchoolPercussion('triangle')}
                  className="p-5 bg-gradient-to-b from-cyan-900/30 to-cyan-950/60 hover:from-cyan-900/50 hover:to-cyan-950/80 border border-cyan-600/40 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all active:scale-95 group text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    🔔
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Tam Âm (Triangle)</div>
                    <div className="text-[10px] text-cyan-300">Âm kim loại ngân dài</div>
                  </div>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-bold">
                    Hòa Tấu Phương Tây
                  </span>
                </button>
              </div>

              {/* MẪU TIẾT TẤU GÕ ĐỆM TIÊU BIỂU */}
              <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800 space-y-2">
                <div className="font-bold text-white text-xs">Mẫu Tiết Tấu Gõ Đệm Tham Khảo:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-amber-300">Mẫu 1: Gõ theo phách nhịp 2/4</div>
                      <div className="text-slate-400 mt-0.5">Phách 1 (Mạnh) - Phách 2 (Nhẹ)</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSchoolPercussion('trong-con');
                        setTimeout(() => playSchoolPercussion('thanh-phach'), 400);
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded"
                    >
                      Nghe Mẫu
                    </button>
                  </div>

                  <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-amber-300">Mẫu 2: Tiết tấu Đơn - Đơn - Đen</div>
                      <div className="text-slate-400 mt-0.5">Tùng (đơn) - Cắc (đơn) - Tùng (đen)</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        playSchoolPercussion('trong-con');
                        setTimeout(() => playSchoolPercussion('thanh-phach'), 250);
                        setTimeout(() => playSchoolPercussion('trong-con'), 500);
                      }}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded"
                    >
                      Nghe Mẫu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 5: KÍ HIỆU BÀN TAY (CURWEN) & BỘ KÝ HIỆU ÂM NHẠC NHANH       */}
          {/* ================================================================ */}
          {activeTab === 'handsigns' && (
            <div className="space-y-6 animate-in fade-in">
              {/* PHẦN 1: KÍ HIỆU BÀN TAY (CURWEN / KODÁLY) */}
              <div className="space-y-3">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <span>🖐️</span>
                      <span>Kí Hiệu Bàn Tay Đọc Nhạc (Phương Pháp Curwen / Kodály)</span>
                    </h3>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Đặc thù trọng tâm trong mạch Đọc Nhạc SGK Âm Nhạc 6, 7, 8, 9 Kết Nối Tri Thức. Bấm vào từng nốt để nghe cao độ.
                    </p>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-full border border-amber-400/30 shrink-0">
                    Thang âm 7 bậc
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                  {[
                    { note: 'Đô (Do)', key: 'C4', freq: 261.63, sign: '✊', pos: 'Ngang thắt lưng', desc: 'Nắm bàn tay lại, mu bàn tay hướng ra ngoài', color: 'from-red-600/30 to-red-950/60 border-red-500/50 text-red-200' },
                    { note: 'Rê (Re)', key: 'D4', freq: 293.66, sign: '🖐️↗️', pos: 'Dưới ngực', desc: 'Bàn tay mở nghiêng xéo 45° hướng chếch lên', color: 'from-orange-600/30 to-orange-950/60 border-orange-500/50 text-orange-200' },
                    { note: 'Mi (Mi)', key: 'E4', freq: 329.63, sign: '🫱', pos: 'Ngang ngực', desc: 'Bàn tay duỗi thẳng nằm ngang, lòng bàn tay úp', color: 'from-amber-600/30 to-amber-950/60 border-amber-500/50 text-amber-200' },
                    { note: 'Pha (Fa)', key: 'F4', freq: 349.23, sign: '👎', pos: 'Trước ngực', desc: 'Bàn tay nắm lại, ngón tay cái chỉ xuống dưới', color: 'from-emerald-600/30 to-emerald-950/60 border-emerald-500/50 text-emerald-200' },
                    { note: 'Son (Sol)', key: 'G4', freq: 392.00, sign: '✋', pos: 'Ngang vai', desc: 'Bàn tay dựng đứng mở rộng, lòng bàn tay hướng vào mặt', color: 'from-cyan-600/30 to-cyan-950/60 border-cyan-500/50 text-cyan-200' },
                    { note: 'La (La)', key: 'A4', freq: 440.00, sign: '🛖', pos: 'Ngang cằm', desc: 'Bàn tay khum tròn uốn cong như mái nhà rủ xuống', color: 'from-blue-600/30 to-blue-950/60 border-blue-500/50 text-blue-200' },
                    { note: 'Si (Ti)', key: 'B4', freq: 493.88, sign: '☝️', pos: 'Ngang trán', desc: 'Ngón tay trỏ chỉ thẳng chếch lên phía nốt Đô cao', color: 'from-purple-600/30 to-purple-950/60 border-purple-500/50 text-purple-200' },
                    { note: 'Đô cao', key: 'C5', freq: 523.25, sign: '✊⬆️', pos: 'Trên đỉnh đầu', desc: 'Nắm bàn tay lại ở vị trí cao trên trán/đầu', color: 'from-rose-600/30 to-rose-950/60 border-rose-500/50 text-rose-200' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => handlePlaySingleNote(item.key, item.freq)}
                      className={`p-3 rounded-xl border bg-gradient-to-b ${item.color} flex flex-col items-center justify-between text-center gap-1.5 transition-all hover:scale-105 active:scale-95 group`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform">{item.sign}</span>
                      <div className="font-black text-white text-xs mt-1">{item.note}</div>
                      <div className="text-[10px] text-amber-300/90 font-medium">{item.pos}</div>
                      <div className="text-[9px] text-slate-400 leading-tight line-clamp-2 mt-1">{item.desc}</div>
                      <span className="text-[9px] mt-1 bg-slate-950/70 px-1.5 py-0.5 rounded font-mono text-slate-300">
                        {Math.round(item.freq)} Hz
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PHẦN 2: BỘ KÝ HIỆU ÂM NHẠC NHANH (BẤM ĐỂ COPY VÀO GIÁO ÁN / SLIDE) */}
              <div className="space-y-3">
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm flex items-center gap-2">
                      <span>🎼</span>
                      <span>Bộ Ký Hiệu Âm Nhạc Chuyên Dụng (Bấm Để Sao Chép Nhanh)</span>
                    </h3>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Bấm vào ký hiệu bất kỳ để sao chép vào bộ nhớ đệm, dán trực tiếp vào KHBD 5512, Slide trình chiếu hoặc Đề kiểm tra.
                    </p>
                  </div>
                  {copiedSymbol && (
                    <span className="text-xs bg-emerald-500 text-slate-950 font-black px-3 py-1 rounded-full animate-bounce">
                      Đã sao chép: {copiedSymbol}
                    </span>
                  )}
                </div>

                {/* CÁC NHÓM KÝ HIỆU */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  {/* Nhóm 1: Khóa nhạc & Dấu hóa */}
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-amber-300 text-[11px]">Khóa nhạc & Dấu hóa</div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { sym: '𝄞', label: 'Khóa Sol' },
                        { sym: '𝄢', label: 'Khóa Fa' },
                        { sym: '𝄡', label: 'Khóa Đô' },
                        { sym: '♯', label: 'Dấu Thăng' },
                        { sym: '♭', label: 'Dấu Giáng' },
                        { sym: '♮', label: 'Dấu Hoàn' },
                        { sym: '𝄐', label: 'Dấu Lưu không' },
                      ].map(item => (
                        <button
                          key={item.sym}
                          type="button"
                          onClick={() => handleCopySymbol(item.sym)}
                          className="px-2.5 py-1.5 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-white rounded-lg border border-slate-700 font-bold transition-all text-sm flex items-center gap-1"
                          title={`Sao chép ${item.label}`}
                        >
                          <span>{item.sym}</span>
                          <span className="text-[9px] text-slate-400 group-hover:text-slate-900">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nhóm 2: Trường độ & Nốt nhạc */}
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-amber-300 text-[11px]">Nốt nhạc & Trường độ</div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { sym: '♩', label: 'Nốt đen' },
                        { sym: '♪', label: 'Móc đơn' },
                        { sym: '♫', label: 'Cặp đơn' },
                        { sym: '♬', label: 'Móc kép' },
                        { sym: '𝅗𝅥', label: 'Nốt trắng' },
                        { sym: '𝅝', label: 'Nốt tròn' },
                      ].map(item => (
                        <button
                          key={item.sym}
                          type="button"
                          onClick={() => handleCopySymbol(item.sym)}
                          className="px-2.5 py-1.5 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-white rounded-lg border border-slate-700 font-bold transition-all text-sm flex items-center gap-1"
                          title={`Sao chép ${item.label}`}
                        >
                          <span>{item.sym}</span>
                          <span className="text-[9px] text-slate-400">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nhóm 3: Dấu lặng & Nhắc lại */}
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-amber-300 text-[11px]">Dấu lặng & Nhắc lại</div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { sym: '𝄽', label: 'Lặng đen' },
                        { sym: '𝄾', label: 'Lặng đơn' },
                        { sym: '𝄼', label: 'Lặng trắng' },
                        { sym: '𝄻', label: 'Lặng tròn' },
                        { sym: '𝄆', label: 'Bắt đầu nhắc' },
                        { sym: '𝄇', label: 'Hết nhắc' },
                        { sym: '𝄋', label: 'Dấu Segno' },
                        { sym: '𝄌', label: 'Dấu Coda' },
                      ].map(item => (
                        <button
                          key={item.sym}
                          type="button"
                          onClick={() => handleCopySymbol(item.sym)}
                          className="px-2.5 py-1.5 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-white rounded-lg border border-slate-700 font-bold transition-all text-sm flex items-center gap-1"
                          title={`Sao chép ${item.label}`}
                        >
                          <span>{item.sym}</span>
                          <span className="text-[9px] text-slate-400">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nhóm 4: Số chỉ nhịp & Thuật ngữ sắc thái */}
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                    <div className="font-bold text-amber-300 text-[11px]">Số chỉ nhịp & Sắc thái</div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { sym: '2/4', label: 'Nhịp 2/4' },
                        { sym: '3/4', label: 'Nhịp 3/4' },
                        { sym: '4/4', label: 'Nhịp 4/4' },
                        { sym: '6/8', label: 'Nhịp 6/8' },
                        { sym: 'p (nhẹ)', label: 'Piano' },
                        { sym: 'f (mạnh)', label: 'Forte' },
                        { sym: 'mf (hơi mạnh)', label: 'Mezzo-forte' },
                        { sym: 'cresc. (mạnh dần)', label: 'Crescendo' },
                      ].map(item => (
                        <button
                          key={item.sym}
                          type="button"
                          onClick={() => handleCopySymbol(item.sym)}
                          className="px-2 py-1 bg-slate-950 hover:bg-amber-400 hover:text-slate-950 text-white rounded-lg border border-slate-700 font-mono text-[11px] font-bold transition-all flex items-center gap-1"
                          title={`Sao chép ${item.label}`}
                        >
                          <span>{item.sym}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'recorder' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <span>🎺</span>
                    <span>Bảng Tra Cứu Thế Bấm Kèn Recorder (Hệ German)</span>
                  </h3>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Chuẩn chương trình SGK Âm Nhạc Kết Nối Tri Thức với Cuộc Sống (Khối 6, 7, 8, 9).
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => playTone(currentRecorder.freq, 1.2)}
                  className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg flex items-center gap-1.5 shrink-0"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Nghe Âm Nốt {selectedRecorderNote}</span>
                </button>
              </div>

              {/* CHỌN NỐT ĐỂ XEM THẾ BẤM */}
              <div className="grid grid-cols-7 gap-1.5">
                {Object.keys(RECORDER_NOTES).map(k => {
                  const item = RECORDER_NOTES[k];
                  const isSel = selectedRecorderNote === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => {
                        setSelectedRecorderNote(k);
                        playTone(item.freq, 0.8);
                      }}
                      className={`py-2 px-1 rounded-xl text-center font-black text-xs transition-all border ${
                        isSel
                          ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/40 shadow-md'
                          : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-800'
                      }`}
                    >
                      <div>{item.name}</div>
                      <div className={`text-[9px] ${isSel ? 'text-slate-900' : 'text-slate-500'}`}>
                        ({k})
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* SƠ ĐỒ LỖ KÈN TRỰC QUAN */}
              <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6">
                {/* ỐNG KÈN RECORDER MÔ PHỎNG */}
                <div className="flex items-center gap-6">
                  {/* Lỗ 0 ở mặt sau */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">Mặt Sau</span>
                    <div className="w-12 h-20 rounded-2xl bg-slate-950 border border-slate-700 flex flex-col items-center justify-center p-2">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-black ${
                        currentRecorder.holes[0]
                          ? 'bg-amber-400 border-amber-300 text-slate-950'
                          : 'bg-transparent border-slate-500 text-slate-500'
                      }`}>
                        0
                      </div>
                      <span className="text-[8px] text-slate-400 mt-1">Ngón cái</span>
                    </div>
                  </div>

                  {/* 7 Lỗ ở mặt trước */}
                  <div className="flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-amber-400 font-bold uppercase">Mặt Trước (7 Lỗ)</span>
                    <div className="w-16 py-3 px-2 rounded-2xl bg-slate-950 border border-slate-700 flex flex-col items-center gap-2">
                      {currentRecorder.holes.slice(1).map((isCovered, idx) => {
                        const holeNum = idx + 1;
                        const isHandLeft = holeNum <= 3;

                        return (
                          <div key={idx} className="flex items-center gap-2 w-full justify-center">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[9px] font-bold transition-colors ${
                              isCovered
                                ? 'bg-amber-400 border-amber-300 text-slate-950 font-black'
                                : 'bg-transparent border-slate-600 text-slate-500'
                            }`}>
                              {holeNum}
                            </div>
                            <span className="text-[8px] text-slate-400 w-12 text-left">
                              {isHandLeft ? `Trái (${holeNum})` : `Phải (${holeNum - 3})`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* THUYẾT MINH THẾ BẤM & HƯỚNG DẪN THỔI */}
                <div className="max-w-xs space-y-3 text-left">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">Đang chọn:</div>
                    <div className="text-lg font-black text-white">{currentRecorder.note}</div>
                    <div className="text-xs text-slate-400 mt-1 font-mono">Tần số: {currentRecorder.freq} Hz</div>
                  </div>

                  <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-[11px] text-amber-200">
                    <div className="font-bold mb-1">💡 Hướng dẫn kỹ thuật ngón:</div>
                    <div>{currentRecorder.tip}</div>
                  </div>

                  <div className="text-[10px] text-slate-400 leading-relaxed">
                    * Lưu ý sư phạm: Lỗ màu vàng biểu thị ngón tay <b>bịt kín</b> lỗ kèn; vòng tròn rỗng biểu thị ngón tay <b>mở</b> lỗ kèn.
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* MODAL FOOTER */}
        <div className="p-3 md:p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="text-slate-400 text-[11px] flex items-center gap-2">
            <span>🎵 Môn Âm Nhạc THCS</span>
            <span>·</span>
            <span>Bộ sách chuẩn Kết Nối Tri Thức</span>
          </div>

          <button
            onClick={() => {
              if (cancelWarmupRef.current) cancelWarmupRef.current();
              if (metronomeIntervalRef.current) clearInterval(metronomeIntervalRef.current);
              setIsMetronomePlaying(false);
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors"
          >
            Đóng Hộp Công Cụ
          </button>
        </div>

      </div>
    </div>
  );
};
