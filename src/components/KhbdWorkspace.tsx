import React, { useState } from 'react';
import { 
  LessonPlan5512, 
  TeachingActivity, 
  ActivityStep 
} from '../types';
import { 
  BookOpen, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3, 
  FileText, 
  Target, 
  Layers, 
  Laptop,
  CheckCircle2,
  Presentation,
  Sparkles,
  ArrowRight,
  Music,
  Volume2
} from 'lucide-react';
import { playTone, playVocalWarmupSequence } from '../utils/audioSynthesizer';

interface KhbdWorkspaceProps {
  khbd: LessonPlan5512;
  onUpdateKhbd: (updated: LessonPlan5512) => void;
  onConvertToSlides: () => void;
  onOpenMusicToolbox?: () => void;
}

export const KhbdWorkspace: React.FC<KhbdWorkspaceProps> = ({ 
  khbd, 
  onUpdateKhbd,
  onConvertToSlides,
  onOpenMusicToolbox 
}) => {
  const [activeActivityTab, setActiveActivityTab] = useState<string>('all');
  const [isVocalPlaying, setIsVocalPlaying] = useState<boolean>(false);

  const handleWarmup = () => {
    if (isVocalPlaying) return;
    setIsVocalPlaying(true);
    playVocalWarmupSequence(undefined, () => {
      setIsVocalPlaying(false);
    });
  };

  // Cập nhật thông tin từng hoạt động (Inline Editable)
  const handleActivityFieldChange = (
    actId: string, 
    field: 'title' | 'timeEstimate' | 'objectives' | 'content' | 'product', 
    value: string
  ) => {
    const updatedActivities = khbd.activities.map(act => 
      act.id === actId ? { ...act, [field]: value } : act
    );
    onUpdateKhbd({ ...khbd, activities: updatedActivities });
  };

  // Cập nhật từng bước trong Bảng tổ chức thực hiện 4 bước (Inline Editable)
  const handleStepChange = (
    actId: string, 
    stepIndex: number, 
    field: 'name' | 'teacherAction' | 'studentAction', 
    value: string
  ) => {
    const updatedActivities = khbd.activities.map(act => {
      if (act.id !== actId) return act;
      const newSteps = [...act.steps];
      newSteps[stepIndex] = { ...newSteps[stepIndex], [field]: value };
      return { ...act, steps: newSteps };
    });
    onUpdateKhbd({ ...khbd, activities: updatedActivities });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* BANNER ĐẶC THÙ SƯ PHẠM MÔN ÂM NHẠC (5 MẠCH NỘI DUNG GDPT 2018) */}
      <div className="bg-gradient-to-r from-[#0B0F19] via-slate-900 to-[#131B2E] text-white rounded-2xl p-5 border border-amber-500/30 shadow-lg relative overflow-hidden">
        {/* Họa tiết khuông nhạc */}
        <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none opacity-10 flex flex-col justify-around py-3">
          <div className="h-[1px] bg-white w-full"></div>
          <div className="h-[1px] bg-white w-full"></div>
          <div className="h-[1px] bg-white w-full"></div>
          <div className="h-[1px] bg-white w-full"></div>
          <div className="h-[1px] bg-white w-full"></div>
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-black text-xl">𝄞</span>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300">
                Kế Hoạch Bài Dạy Môn Âm Nhạc THCS (Công Văn 5512)
              </span>
              <span className="text-[10px] bg-amber-400/20 text-amber-200 px-2 py-0.5 rounded font-semibold border border-amber-400/30">
                Kết Nối Tri Thức
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold uppercase text-white mt-1">
              {khbd.header.lessonTitle}
            </h1>
            <div className="text-xs text-slate-300 flex flex-wrap items-center gap-3 pt-0.5">
              <span>Khối: <b>{khbd.header.grade}</b></span>
              <span>·</span>
              <span>Giáo viên: <b>{khbd.header.teacherName}</b></span>
              <span>·</span>
              <span>Thời lượng: <b>{khbd.header.durationPeriods} tiết</b></span>
              <span>·</span>
              <span>Đơn vị: <b>{khbd.header.schoolName}</b></span>
            </div>
          </div>

          {/* Quick Sound Buttons & Nút Chuyển Slide */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <div className="flex items-center gap-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
              {onOpenMusicToolbox && (
                <button
                  type="button"
                  onClick={onOpenMusicToolbox}
                  className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
                  title="Mở phòng nhạc cụ: Bàn phím lấy cao độ, Máy gõ nhịp & Kèn Recorder"
                >
                  <Music className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Phòng Nhạc Cụ</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => playTone(261.63, 1.0)}
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors border border-slate-700"
                title="Phát nốt Đô (C4) chuẩn để lấy giọng cho học sinh"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Lấy Giọng (C4)</span>
              </button>
              <button
                type="button"
                onClick={handleWarmup}
                disabled={isVocalPlaying}
                className="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
                title="Phát chuỗi thang âm 5 bậc Đô - Rê - Mi - Son - La"
              >
                <Music className="w-3.5 h-3.5 fill-slate-950" />
                <span>{isVocalPlaying ? 'Đang Luyện...' : 'Khởi Động Giọng'}</span>
              </button>
            </div>

            <button
              onClick={onConvertToSlides}
              className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 group"
            >
              <Presentation className="w-3.5 h-3.5 text-blue-200" />
              <span>Chuyển Sang Slide 16:9</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5 Hộp phân môn Âm nhạc đặc thù */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-3 border-t border-slate-800/80 mt-3 text-[11px] relative z-10">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
            <span className="text-base">🎵</span>
            <div>
              <div className="font-bold text-white text-[10px]">Học Hát</div>
              <div className="text-[9px] text-slate-400">Khẩu hình, lấy hơi, sắc thái</div>
            </div>
          </div>
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
            <span className="text-base">🥁</span>
            <div>
              <div className="font-bold text-white text-[10px]">Nhạc Cụ</div>
              <div className="text-[9px] text-slate-400">Gõ tiết tấu & Recorder</div>
            </div>
          </div>
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
            <span className="text-base">🎼</span>
            <div>
              <div className="font-bold text-white text-[10px]">Đọc Nhạc</div>
              <div className="text-[9px] text-slate-400">Khuông khóa Sol & Xướng âm</div>
            </div>
          </div>
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
            <span className="text-base">📖</span>
            <div>
              <div className="font-bold text-white text-[10px]">Lí Thuyết</div>
              <div className="text-[9px] text-slate-400">Nhịp 2/4, 3/4, Gam & Giọng</div>
            </div>
          </div>
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2 col-span-2 sm:col-span-1">
            <span className="text-base">👏</span>
            <div>
              <div className="font-bold text-white text-[10px]">Sáng Tạo</div>
              <div className="text-[9px] text-slate-400">Body Percussion & Biểu diễn</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
        <Edit3 className="w-4 h-4 text-blue-600 shrink-0" />
        <span><b>Chế độ Inline Editable:</b> Toàn bộ bảng tiến trình 4 hoạt động và các bước tổ chức có thể chỉnh sửa trực tiếp, tự động lưu trữ tức thì.</span>
      </div>

      {/* I. MỤC TIÊU BÀI DẠY (KIẾN THỨC, NĂNG LỰC, PHẨM CHẤT) */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold uppercase text-slate-900 flex items-center gap-2">
            <Target className="w-4 h-4 text-blue-600" />
            I. Mục Tiêu Phát Triển Phẩm Chất & Năng Lực (CT GDPT 2018)
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">Chuẩn năng lực 5512</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Kiến thức */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">1</span>
              Về Kiến Thức
            </div>
            <ul className="space-y-1.5 pl-2">
              {khbd.generalObjectives.knowledge.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="text-blue-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phẩm chất */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">2</span>
              Về Phẩm Chất Chủ Yếu
            </div>
            <ul className="space-y-1.5 pl-2">
              {khbd.generalObjectives.qualities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="text-emerald-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Năng lực chung */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
              Năng Lực Chung (Tự chủ, Giao tiếp, Giải quyết VĐ)
            </div>
            <ul className="space-y-1.5 pl-2">
              {khbd.generalObjectives.coreCompetencies.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="text-indigo-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Năng lực đặc thù */}
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">4</span>
              Năng Lực Đặc Thù Môn Học
            </div>
            <ul className="space-y-1.5 pl-2">
              {khbd.generalObjectives.subjectCompetencies.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-700">
                  <span className="text-purple-600 font-bold shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* II. THIẾT BỊ DẠY HỌC & HỌC LIỆU SỐ */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold uppercase text-slate-900 flex items-center gap-2">
            <Laptop className="w-4 h-4 text-blue-600" />
            II. Thiết Bị Dạy Học & Học Liệu Số
          </h2>
          <span className="text-[11px] text-slate-400 font-medium">Phương tiện 5512</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-800 mb-1.5">1. Chuẩn bị của Giáo viên:</div>
            <ul className="space-y-1 list-disc pl-4 text-slate-700">
              {khbd.teachingEquipment.teacher.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-800 mb-1.5">2. Chuẩn bị của Học sinh:</div>
            <ul className="space-y-1 list-disc pl-4 text-slate-700">
              {khbd.teachingEquipment.students.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="font-bold text-slate-800 mb-1.5">3. Học liệu kỹ thuật số:</div>
            <ul className="space-y-1 list-disc pl-4 text-slate-700">
              {khbd.teachingEquipment.digitalAssets.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* III. TIẾN TRÌNH DẠY HỌC: BẢNG 4 HOẠT ĐỘNG INLINE EDITABLE */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold uppercase text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              III. Tiến Trình Dạy Học (4 Hoạt Động Theo CV 5512)
            </h2>
            <div className="text-xs text-slate-500 mt-0.5">
              Cấu trúc chuẩn mực: Mục tiêu - Nội dung - Sản phẩm - Tổ chức thực hiện (Bảng 4 bước sư phạm)
            </div>
          </div>

          {/* Quick tab filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs shrink-0">
            <button
              onClick={() => setActiveActivityTab('all')}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                activeActivityTab === 'all' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả (4 HĐ)
            </button>
            {khbd.activities.map(act => (
              <button
                key={act.id}
                onClick={() => setActiveActivityTab(act.id)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  activeActivityTab === act.id ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                HĐ {act.number}
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách 4 Hoạt động Inline Editable */}
        <div className="space-y-6">
          {khbd.activities
            .filter(act => activeActivityTab === 'all' || activeActivityTab === act.id)
            .map(act => (
              <div 
                key={act.id} 
                className="border-2 border-slate-200 rounded-xl overflow-hidden shadow-xs hover:border-blue-300 transition-all bg-white"
              >
                {/* Header hoạt động */}
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 flex-1">
                    <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs shadow-xs shrink-0">
                      {act.number}
                    </span>
                    <input
                      type="text"
                      value={act.title}
                      onChange={(e) => handleActivityFieldChange(act.id, 'title', e.target.value)}
                      className="font-bold text-sm text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 outline-none w-full"
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-xs">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      value={act.timeEstimate}
                      onChange={(e) => handleActivityFieldChange(act.id, 'timeEstimate', e.target.value)}
                      className="w-20 px-2 py-0.5 bg-white border border-slate-200 rounded text-center text-xs font-bold text-slate-700 outline-none"
                    />
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                      HĐ {act.number}/4
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4 text-xs">
                  {/* a) Mục tiêu, b) Nội dung, c) Sản phẩm (Inline Editable) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-blue-50/40 rounded-lg border border-blue-100 flex flex-col justify-between">
                      <div className="font-bold text-blue-900 mb-1">a) Mục tiêu hoạt động:</div>
                      <textarea
                        rows={3}
                        value={act.objectives}
                        onChange={(e) => handleActivityFieldChange(act.id, 'objectives', e.target.value)}
                        className="w-full bg-white/80 p-2 rounded border border-blue-200 outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 resize-none"
                      />
                    </div>

                    <div className="p-3 bg-amber-50/40 rounded-lg border border-amber-100 flex flex-col justify-between">
                      <div className="font-bold text-amber-900 mb-1">b) Nội dung thực hiện:</div>
                      <textarea
                        rows={3}
                        value={act.content}
                        onChange={(e) => handleActivityFieldChange(act.id, 'content', e.target.value)}
                        className="w-full bg-white/80 p-2 rounded border border-amber-200 outline-none focus:ring-1 focus:ring-amber-500 text-slate-800 resize-none"
                      />
                    </div>

                    <div className="p-3 bg-emerald-50/40 rounded-lg border border-emerald-100 flex flex-col justify-between">
                      <div className="font-bold text-emerald-900 mb-1">c) Sản phẩm học tập:</div>
                      <textarea
                        rows={3}
                        value={act.product}
                        onChange={(e) => handleActivityFieldChange(act.id, 'product', e.target.value)}
                        className="w-full bg-white/80 p-2 rounded border border-emerald-200 outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 resize-none"
                      />
                    </div>
                  </div>

                  {/* BẢNG TỔ CHỨC THỰC HIỆN 4 BƯỚC (INLINE EDITABLE HOÀN TOÀN) */}
                  <div className="mt-4">
                    <div className="font-bold text-slate-800 mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>d) Tổ chức thực hiện (Bảng tiến trình 4 bước sư phạm chuẩn 5512):</span>
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                            <th className="py-2.5 px-3 w-1/4">Tiến trình các bước</th>
                            <th className="py-2.5 px-3 w-[38%]">Hoạt động của Giáo viên (Chỉ đạo)</th>
                            <th className="py-2.5 px-3 w-[37%]">Hoạt động của Học sinh (Chủ động)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {act.steps.map((step, sIdx) => (
                            <tr key={sIdx} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3 px-3 align-top font-semibold text-slate-900 bg-slate-50/50">
                                <input
                                  type="text"
                                  value={step.name}
                                  onChange={(e) => handleStepChange(act.id, sIdx, 'name', e.target.value)}
                                  className="w-full font-bold text-slate-800 bg-transparent border-b border-transparent focus:border-blue-400 outline-none"
                                />
                              </td>
                              <td className="py-2.5 px-3 align-top">
                                <textarea
                                  rows={3}
                                  value={step.teacherAction}
                                  onChange={(e) => handleStepChange(act.id, sIdx, 'teacherAction', e.target.value)}
                                  className="w-full p-2 bg-white border border-slate-200 rounded text-slate-700 focus:ring-1 focus:ring-blue-500 outline-none text-xs leading-relaxed resize-y"
                                />
                              </td>
                              <td className="py-2.5 px-3 align-top">
                                <textarea
                                  rows={3}
                                  value={step.studentAction}
                                  onChange={(e) => handleStepChange(act.id, sIdx, 'studentAction', e.target.value)}
                                  className="w-full p-2 bg-white border border-slate-200 rounded text-slate-700 focus:ring-1 focus:ring-blue-500 outline-none text-xs leading-relaxed resize-y"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* IV. HỒ SƠ PHÊ DUYỆT & GHI CHÚ */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm text-xs">
        <div className="font-bold text-sm text-slate-900 uppercase mb-2">IV. Ghi Chú Sư Phạm & Hồ Sơ Phê Duyệt</div>
        <p className="text-slate-600 italic mb-6 leading-relaxed">
          {khbd.notes}
        </p>

        <div className="grid grid-cols-2 gap-8 text-center pt-4 border-t border-slate-100">
          <div>
            <div className="font-bold uppercase text-slate-800">DUYỆT CỦA TỔ CHUYÊN MÔN</div>
            <div className="text-slate-500 italic mt-0.5">(Ký và ghi rõ họ tên)</div>
            <div className="h-14"></div>
            <div className="font-semibold text-slate-700">Tổ trưởng chuyên môn: Đã duyệt</div>
          </div>
          <div>
            <div className="text-slate-500 italic">Ngày ..... tháng ..... năm 20...</div>
            <div className="font-bold uppercase text-slate-800 mt-0.5">GIÁO VIÊN SOẠN BÀI</div>
            <div className="text-slate-500 italic mt-0.5">(Ký và ghi rõ họ tên)</div>
            <div className="h-14"></div>
            <div className="font-bold text-slate-900">{khbd.header.teacherName}</div>
          </div>
        </div>
      </section>
    </div>
  );
};
