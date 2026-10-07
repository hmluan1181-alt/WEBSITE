import React, { useState } from 'react';
import { 
  Exam7991, 
  MultipleChoiceQuestion, 
  TrueFalseItem, 
  ShortAnswerQuestion, 
  EssayQuestion,
  CognitiveLevel
} from '../types';
import { 
  FileCheck2, 
  Table, 
  ListChecks, 
  Sliders, 
  Download, 
  Check, 
  X, 
  Info, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Sparkles,
  Lock,
  Layers,
  FileText
} from 'lucide-react';
import { exportWordExamPaperOnly, exportWordMatrixAndSpecOnly } from '../utils/exporter';

interface ExamWorkspaceProps {
  exam: Exam7991;
  onUpdateExam: (updated: Exam7991) => void;
}

export const ExamWorkspace: React.FC<ExamWorkspaceProps> = ({ exam, onUpdateExam }) => {
  const [showAnswerKey, setShowAnswerKey] = useState(true);
  const [viewMode, setViewMode] = useState<'paper' | 'matrix_spec'>('paper');

  // Input câu trả lời tương tác thử nghiệm cho Phần III
  const [userAnswersPartIII, setUserAnswersPartIII] = useState<Record<string, string>>({});

  // Tính toán điểm số thực tế
  const totalPartI = exam.partI.reduce((sum, q) => sum + q.score, 0);
  const totalPartII = exam.partII.reduce((sum, q) => sum + q.score, 0);
  const totalPartIII = exam.partIII.reduce((sum, q) => sum + q.score, 0);
  const totalPartIV = exam.partIV.reduce((sum, q) => sum + q.totalScore, 0);
  const grandTotal = totalPartI + totalPartII + totalPartIII + totalPartIV;
  const totalQuestions = exam.partI.length + exam.partII.length + exam.partIII.length + exam.partIV.length;

  // Logic Slider tỉ lệ ma trận khóa chặt ở 10.0 điểm (40 - 30 - 30)
  const handleNbSliderChange = (newNb: number) => {
    // newNb từ 1.0 đến 8.0
    const clampedNb = Math.min(Math.max(newNb, 1.0), 8.0);
    const remaining = 10.0 - clampedNb;
    // Giữ tỉ lệ tương đối giữa TH và VD
    const currentTh = exam.summary.ratio.th;
    const currentVd = exam.summary.ratio.vd;
    const currentSum = (currentTh + currentVd) || 1;
    const newTh = Math.round((remaining * (currentTh / currentSum)) * 10) / 10;
    const newVd = Math.round((remaining - newTh) * 10) / 10;

    onUpdateExam({
      ...exam,
      summary: {
        ...exam.summary,
        ratio: { nb: clampedNb, th: newTh, vd: newVd }
      }
    });
  };

  const handleThSliderChange = (newTh: number) => {
    const currentNb = exam.summary.ratio.nb;
    const maxTh = Math.max(0.5, 10.0 - currentNb - 0.5);
    const clampedTh = Math.min(Math.max(newTh, 0.5), maxTh);
    const newVd = Math.round((10.0 - currentNb - clampedTh) * 10) / 10;

    onUpdateExam({
      ...exam,
      summary: {
        ...exam.summary,
        ratio: { nb: currentNb, th: clampedTh, vd: newVd }
      }
    });
  };

  const handleApplyPresetRatio = (nb: number, th: number, vd: number) => {
    onUpdateExam({
      ...exam,
      summary: {
        ...exam.summary,
        ratio: { nb, th, vd }
      }
    });
  };

  // Toggle Đúng / Sai cho từng mệnh đề Phần II
  const handleTogglePartIIStatement = (qIndex: number, stmtIndex: number) => {
    const newPartII = [...exam.partII];
    const targetQ = { ...newPartII[qIndex] };
    const newStmts = [...targetQ.statements];
    newStmts[stmtIndex] = {
      ...newStmts[stmtIndex],
      isCorrect: !newStmts[stmtIndex].isCorrect
    };
    targetQ.statements = newStmts;
    newPartII[qIndex] = targetQ;
    onUpdateExam({ ...exam, partII: newPartII });
  };

  // Chọn key đáp án Phần I
  const handleSelectPartICorrectAnswer = (qIndex: number, key: 'A' | 'B' | 'C' | 'D') => {
    const newPartI = [...exam.partI];
    newPartI[qIndex] = { ...newPartI[qIndex], correctAnswer: key };
    onUpdateExam({ ...exam, partI: newPartI });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Top Banner Tiêu chuẩn Công văn 7991 */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-900 text-xs font-semibold rounded-full border border-amber-300">
            <span className="text-amber-600 font-black">𝄞</span>
            <span>ĐỀ KIỂM TRA MÔN ÂM NHẠC THCS · CHUẨN CÔNG VĂN 7991/BGDĐT-GDTrH (17/12/2024)</span>
          </div>
          <h1 className="text-xl font-bold uppercase text-slate-900 mt-2 flex items-center gap-2">
            <span>Ngân Hàng Đề Thi & Ma Trận Đánh Giá Âm Nhạc</span>
            <span className="text-xs font-semibold px-2 py-0.5 bg-blue-50 text-blue-700 rounded border border-blue-200 normal-case">
              4 Phần Độc Lập · Barem 10.0đ
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Đặc thù môn Âm nhạc GDPT 2018: Kết hợp lí thuyết thẩm âm và đánh giá thực hành biểu diễn (Hát, Nhạc cụ, Đọc nhạc)
          </p>

          {/* 5 Mạch nội dung đánh giá */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-[10px] font-semibold text-slate-600">
            <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 flex items-center gap-1">
              <span>🎵</span>
              <span>Hát (Thanh nhạc)</span>
            </span>
            <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 flex items-center gap-1">
              <span>🥁</span>
              <span>Nhạc cụ (Gõ & Recorder)</span>
            </span>
            <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 flex items-center gap-1">
              <span>🎼</span>
              <span>Đọc nhạc (Solfege & Bàn tay)</span>
            </span>
            <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 flex items-center gap-1">
              <span>📖</span>
              <span>Lí thuyết âm nhạc</span>
            </span>
            <span className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200 flex items-center gap-1">
              <span>👏</span>
              <span>Thưởng thức âm nhạc</span>
            </span>
          </div>
        </div>

        {/* View Switcher & Answer Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAnswerKey(!showAnswerKey)}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              showAnswerKey
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-slate-50 text-slate-600 border-slate-200'
            }`}
          >
            {showAnswerKey ? <Eye className="w-3.5 h-3.5 text-blue-600" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{showAnswerKey ? 'Hiện Đáp Án GV' : 'Chế Độ Đề Thi HS'}</span>
          </button>

          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs">
            <button
              onClick={() => setViewMode('paper')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                viewMode === 'paper' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Live Document (4 Phần)
            </button>
            <button
              onClick={() => setViewMode('matrix_spec')}
              className={`px-3 py-1.5 rounded-md font-bold transition-all ${
                viewMode === 'matrix_spec' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ma Trận & Đặc Tả
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SCOPE 2 MAIN LAYOUT: BÊN TRÁI (THIẾT LẬP MA TRẬN) & BÊN PHẢI (LIVE DOCUMENT) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* ===================================================================== */}
        {/* CỘT BÊN TRÁI: BẢNG THIẾT LẬP MA TRẬN ĐỀ (WIDTH ~ 360-380px)           */}
        {/* ===================================================================== */}
        <div className="xl:col-span-4 space-y-4">
          
          {/* Card 1: Slider phân bổ tỉ lệ 40-30-30 khóa chặt ở 10.0 */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-xs uppercase text-slate-800">Thiết Lập Tỉ Lệ Ma Trận</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Tổng: 10.0 Điểm
              </span>
            </div>

            {/* Visual ratio bar */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5 font-medium">
                <span className="text-blue-700 font-bold">NB: {exam.summary.ratio.nb.toFixed(1)}đ ({Math.round(exam.summary.ratio.nb * 10)}%)</span>
                <span className="text-amber-700 font-bold">TH: {exam.summary.ratio.th.toFixed(1)}đ ({Math.round(exam.summary.ratio.th * 10)}%)</span>
                <span className="text-purple-700 font-bold">VD: {exam.summary.ratio.vd.toFixed(1)}đ ({Math.round(exam.summary.ratio.vd * 10)}%)</span>
              </div>
              <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden flex shadow-inner">
                <div style={{ width: `${exam.summary.ratio.nb * 10}%` }} className="bg-blue-600 transition-all duration-200"></div>
                <div style={{ width: `${exam.summary.ratio.th * 10}%` }} className="bg-amber-500 transition-all duration-200"></div>
                <div style={{ width: `${exam.summary.ratio.vd * 10}%` }} className="bg-purple-600 transition-all duration-200"></div>
              </div>
            </div>

            {/* Slider 1: Nhận biết */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">1. Mức Nhận Biết:</span>
                <span className="font-mono font-bold text-blue-700">{exam.summary.ratio.nb.toFixed(1)} điểm</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="7.0"
                step="0.5"
                value={exam.summary.ratio.nb}
                onChange={(e) => handleNbSliderChange(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Slider 2: Thông hiểu */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">2. Mức Thông Hiểu:</span>
                <span className="font-mono font-bold text-amber-700">{exam.summary.ratio.th.toFixed(1)} điểm</span>
              </div>
              <input
                type="range"
                min="0.5"
                max={Math.max(0.5, 10.0 - exam.summary.ratio.nb - 0.5)}
                step="0.5"
                value={exam.summary.ratio.th}
                onChange={(e) => handleThSliderChange(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Hiển thị tự động Vận dụng */}
            <div className="space-y-1 p-2 bg-purple-50/60 rounded-lg border border-purple-100">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-purple-900">3. Mức Vận Dụng (Tự Khóa):</span>
                <span className="font-mono font-bold text-purple-700">{exam.summary.ratio.vd.toFixed(1)} điểm</span>
              </div>
              <div className="text-[10px] text-purple-700 italic">
                = 10.0 - (NB + TH) đảm bảo barem luôn đạt tuyệt đối 10.0đ.
              </div>
            </div>

            {/* Quick Presets */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Mẫu Tỉ Lệ Khuyến Nghị:
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => handleApplyPresetRatio(4.0, 3.0, 3.0)}
                  className={`py-1 px-1.5 text-[10px] font-bold rounded border transition-all ${
                    exam.summary.ratio.nb === 4.0 && exam.summary.ratio.th === 3.0
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  40-30-30 (Chuẩn)
                </button>
                <button
                  onClick={() => handleApplyPresetRatio(5.0, 3.0, 2.0)}
                  className={`py-1 px-1.5 text-[10px] font-bold rounded border transition-all ${
                    exam.summary.ratio.nb === 5.0 && exam.summary.ratio.th === 3.0
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  50-30-20 (THCS)
                </button>
                <button
                  onClick={() => handleApplyPresetRatio(3.0, 3.0, 4.0)}
                  className={`py-1 px-1.5 text-[10px] font-bold rounded border transition-all ${
                    exam.summary.ratio.nb === 3.0 && exam.summary.ratio.th === 3.0
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  30-30-40 (Nâng cao)
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Bộ đếm số lượng câu hỏi từng phần */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-xs uppercase text-slate-800">Bộ Đếm Câu Hỏi 4 Phần</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-700">
                {totalQuestions} Câu hỏi
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {/* Phần I */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Phần I: TN Nhiều lựa chọn</div>
                  <div className="text-[10px] text-slate-500">Mỗi câu 0.25đ · Chuẩn 12 câu</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-700">{exam.partI.length} câu</div>
                  <div className="text-[10px] font-mono text-slate-500">{totalPartI.toFixed(2)}đ (30%)</div>
                </div>
              </div>

              {/* Phần II */}
              <div className="p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-emerald-950">Phần II: Đúng / Sai (a-b-c-d)</div>
                  <div className="text-[10px] text-emerald-700">2 câu (8 lệnh con) · Tối đa 1.0đ/câu</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-emerald-800">{exam.partII.length} câu (8 ý)</div>
                  <div className="text-[10px] font-mono text-emerald-700">{totalPartII.toFixed(2)}đ (20%)</div>
                </div>
              </div>

              {/* Phần III */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Phần III: Trả lời ngắn</div>
                  <div className="text-[10px] text-slate-500">Mỗi câu 0.5đ · Điền đáp số</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-indigo-700">{exam.partIII.length} câu</div>
                  <div className="text-[10px] font-mono text-slate-500">{totalPartIII.toFixed(2)}đ (20%)</div>
                </div>
              </div>

              {/* Phần IV */}
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Phần IV: Tự luận</div>
                  <div className="text-[10px] text-slate-500">Vận dụng thực tế · Barem phân bước</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-700">{exam.partIV.length} câu</div>
                  <div className="text-[10px] font-mono text-slate-500">{totalPartIV.toFixed(2)}đ (30%)</div>
                </div>
              </div>
            </div>

            {/* Barem tổng kết thực tế */}
            <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-900">Tổng điểm tích lũy:</span>
              <span className="font-mono font-extrabold text-sm text-emerald-800">{grandTotal.toFixed(1)} / 10.0đ</span>
            </div>
          </div>

          {/* Card 3: Nút tải file Word chuẩn Bộ GD&ĐT & Tải Ma Trận Đặc Tả */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-2.5">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-1">
              Khu Vực Xuất Bản File Word Chuẩn
            </div>

            {/* Nút 1: 'Tải file Word chuẩn Bộ GD&ĐT' */}
            <button
              onClick={() => exportWordExamPaperOnly(exam)}
              className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-between"
              title="Xuất đề thi 4 phần chuẩn Công văn 7991 kèm hướng dẫn chấm"
            >
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-white" />
                <span>Tải file Word chuẩn Bộ GD&ĐT</span>
              </div>
              <span className="text-[10px] font-mono bg-blue-700 px-1.5 py-0.5 rounded text-blue-100">.DOC</span>
            </button>

            {/* Nút 2: 'Tải Ma Trận Đặc Tả' */}
            <button
              onClick={() => exportWordMatrixAndSpecOnly(exam)}
              className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center justify-between"
              title="Xuất Phụ lục 1 Ma trận & Phụ lục 2 Bản đặc tả chuẩn CV 7991"
            >
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-emerald-400" />
                <span>Tải Ma Trận Đặc Tả (CV 7991)</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">.DOC</span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* CỘT BÊN PHẢI: LIVE DOCUMENT (TỜ ĐỀ THI 4 PHẦN CHUẨN CÔNG VĂN 7991)     */}
        {/* ===================================================================== */}
        <div className="xl:col-span-8">
          
          {viewMode === 'paper' ? (
            /* KHUNG TỜ ĐỀ KIỂM TRA LIVE DOCUMENT */
            <div className="bg-white rounded-xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-8">
              
              {/* Header Tờ đề kiểm tra chính quy */}
              <div className="border-b-2 border-slate-800 pb-5">
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="text-center border-r border-slate-200 pr-4">
                    <div className="font-bold uppercase text-slate-900">{exam.header.schoolName}</div>
                    <div className="font-semibold text-slate-700">{exam.header.departmentName}</div>
                    <div className="mt-2 text-slate-600">
                      Mã đề thi: <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">101</span>
                    </div>
                  </div>

                  <div className="text-center pl-4">
                    <div className="font-bold uppercase text-slate-900">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                    <div className="font-semibold text-slate-700">Độc lập - Tự do - Hạnh phúc</div>
                    <div className="mt-2 text-slate-500 italic">
                      Thời gian làm bài: <b>{exam.header.examDurationMinutes} phút</b> (Không kể phát đề)
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <h2 className="text-lg md:text-xl font-extrabold uppercase text-slate-900 tracking-tight">
                    {exam.header.examTitle}
                  </h2>
                  <div className="text-xs text-slate-600 mt-1 flex items-center justify-center gap-3">
                    <span>Môn: <b className="text-slate-900">{exam.header.subjectName}</b></span>
                    <span>·</span>
                    <span>Khối: <b className="text-slate-900">{exam.header.grade}</b></span>
                    <span>·</span>
                    <span>Năm học: <b className="text-slate-900">{exam.header.academicYear}</b></span>
                  </div>
                </div>

                {/* Khung điền thông tin thí sinh */}
                <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>Họ và tên thí sinh: .................................................</div>
                  <div>Số báo danh: ........................</div>
                  <div>Phòng thi: ........................</div>
                </div>
              </div>

              {/* =============================================================== */}
              {/* PHẦN I: TRẮC NGHIỆM 4 LỰA CHỌN (3.0 ĐIỂM) KÈM KEY ĐÁP ÁN          */}
              {/* =============================================================== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase text-slate-900">
                      PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 italic">
                      Thí sinh trả lời từ câu 1 đến câu {exam.partI.length}. Mỗi câu hỏi chỉ chọn một phương án.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-800 border border-blue-200 shrink-0">
                    3.0 Điểm (12 câu x 0.25đ)
                  </span>
                </div>

                <div className="space-y-4">
                  {exam.partI.map((q, idx) => (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-slate-900 font-medium leading-relaxed">
                          <span className="font-bold text-slate-900">Câu {q.number}: </span>
                          <span>{q.content}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 shrink-0">
                          {q.level}
                        </span>
                      </div>

                      {/* 4 Lựa chọn A, B, C, D */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                        {q.options.map(opt => {
                          const isCorrect = showAnswerKey && opt.key === q.correctAnswer;
                          return (
                            <div
                              key={opt.key}
                              onClick={() => handleSelectPartICorrectAnswer(idx, opt.key)}
                              className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                                isCorrect
                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-1 ring-emerald-400'
                                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                                  isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  {opt.key}
                                </span>
                                <span>{opt.text}</span>
                              </div>
                              {isCorrect && (
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Lời giải & Key đáp án nếu bật */}
                      {showAnswerKey && (
                        <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 italic flex items-center justify-between">
                          <span>
                            <b>Đáp án chuẩn:</b> <span className="font-bold text-emerald-600 font-mono text-xs">{q.correctAnswer}</span>
                            {' · '}<span>{q.explanation}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* =============================================================== */}
              {/* PHẦN II: TRẮC NGHIỆM ĐÚNG / SAI (2.0 ĐIỂM) - 4 MỆNH ĐỀ a, b, c, d */}
              {/* =============================================================== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase text-slate-900">
                      PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG SAI
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 italic">
                      Thí sinh trả lời từ câu 1 đến câu {exam.partII.length}. Trong mỗi ý a), b), c), d), thí sinh chọn Đúng hoặc Sai.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    2.0 Điểm (2 câu x 1.0đ)
                  </span>
                </div>

                {/* Hướng dẫn barem điểm Bộ GD&ĐT */}
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>Quy định tính điểm Phần II của Bộ Giáo dục và Đào tạo:</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center mt-1.5 font-medium">
                    <div className="bg-white p-1 rounded border border-amber-200">Đúng 1 ý: <b>0.1 điểm</b></div>
                    <div className="bg-white p-1 rounded border border-amber-200">Đúng 2 ý: <b>0.25 điểm</b></div>
                    <div className="bg-white p-1 rounded border border-amber-200">Đúng 3 ý: <b>0.5 điểm</b></div>
                    <div className="bg-white p-1 rounded border border-amber-200 text-emerald-800">Đúng 4 ý: <b>1.0 điểm</b></div>
                  </div>
                </div>

                {/* Các câu hỏi Phần II */}
                <div className="space-y-6">
                  {exam.partII.map((q, qIdx) => (
                    <div key={q.id} className="border-2 border-slate-200 rounded-xl overflow-hidden shadow-xs">
                      {/* Câu gốc dẫn đề */}
                      <div className="bg-slate-100 p-4 border-b border-slate-200 text-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-bold text-sm text-slate-900">
                            Câu {q.number} (1.0 điểm)
                          </span>
                          <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                            {q.level} · {q.topic}
                          </span>
                        </div>
                        <p className="font-medium text-slate-800 leading-relaxed">
                          {q.stem}
                        </p>
                      </div>

                      {/* Bảng 4 mệnh đề a, b, c, d với badge chọn Đúng / Sai trực quan */}
                      <div className="p-4 bg-white text-xs">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                              <th className="py-2 px-3 w-16 text-center">Lệnh</th>
                              <th className="py-2 px-3 text-left">Phát biểu / Mệnh đề</th>
                              <th className="py-2 px-3 w-44 text-center">Đánh Giá (Đúng / Sai)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {q.statements.map((stmt, sIdx) => (
                              <tr key={stmt.key} className="hover:bg-slate-50/70 transition-colors">
                                <td className="py-3 px-3 text-center font-bold text-slate-900 bg-slate-50/50">
                                  {stmt.key})
                                </td>
                                <td className="py-3 px-3 text-slate-800">
                                  <div className="font-medium">{stmt.text}</div>
                                  {showAnswerKey && (
                                    <div className="text-[11px] text-slate-400 mt-1 italic">
                                      {stmt.explanation}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3 px-3 text-center">
                                  {/* Badge Đúng / Sai trực quan */}
                                  <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
                                    <button
                                      onClick={() => handleTogglePartIIStatement(qIdx, sIdx)}
                                      className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1 ${
                                        stmt.isCorrect
                                          ? 'bg-emerald-600 text-white shadow-xs'
                                          : 'bg-white text-slate-500 hover:bg-slate-100'
                                      }`}
                                    >
                                      {stmt.isCorrect && <Check className="w-3 h-3 text-white" />}
                                      <span>ĐÚNG</span>
                                    </button>
                                    <button
                                      onClick={() => handleTogglePartIIStatement(qIdx, sIdx)}
                                      className={`px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1 ${
                                        !stmt.isCorrect
                                          ? 'bg-rose-600 text-white shadow-xs'
                                          : 'bg-white text-slate-500 hover:bg-slate-100'
                                      }`}
                                    >
                                      {!stmt.isCorrect && <X className="w-3 h-3 text-white" />}
                                      <span>SAI</span>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* =============================================================== */}
              {/* PHẦN III: TRẢ LỜI NGẮN (2.0 ĐIỂM) CÓ Ô ĐIỀN KẾT QUẢ NHANH         */}
              {/* =============================================================== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase text-slate-900">
                      PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 italic">
                      Thí sinh trả lời từ câu 1 đến câu {exam.partIII.length}. Điền kết quả tính toán vào ô bên dưới.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 shrink-0">
                    2.0 Điểm (4 câu x 0.5đ)
                  </span>
                </div>

                <div className="space-y-3">
                  {exam.partIII.map((q) => {
                    const studentInput = userAnswersPartIII[q.id] || '';
                    const isMatched = studentInput.trim() === q.correctAnswer.trim();

                    return (
                      <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="text-slate-900 font-medium">
                            <span className="font-bold text-slate-900">Câu {q.number} ({q.score}đ): </span>
                            <span>{q.content}</span>
                            {q.unit && <span className="italic text-slate-500 ml-1">(Đơn vị: {q.unit})</span>}
                          </div>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 shrink-0">
                            {q.level}
                          </span>
                        </div>

                        {/* Ô điền kết quả nhanh */}
                        <div className="flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="font-bold text-slate-700 shrink-0">Ô điền kết quả:</span>
                          <input
                            type="text"
                            value={studentInput}
                            onChange={(e) => setUserAnswersPartIII({ ...userAnswersPartIII, [q.id]: e.target.value })}
                            placeholder="Nhập đáp số..."
                            className="px-3 py-1 font-mono font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-blue-500 w-36 text-xs"
                          />
                          {q.unit && <span className="text-slate-500 font-medium">{q.unit}</span>}

                          {studentInput && (
                            <span className={`inline-flex items-center gap-1 font-bold text-[11px] px-2 py-0.5 rounded ${
                              isMatched ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {isMatched ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                              <span>{isMatched ? 'Chính xác!' : 'Chưa đúng'}</span>
                            </span>
                          )}

                          {showAnswerKey && (
                            <div className="ml-auto text-[11px] text-slate-500">
                              Đáp số chuẩn: <b className="text-blue-700 font-mono text-xs">{q.correctAnswer} {q.unit || ''}</b>
                            </div>
                          )}
                        </div>

                        {showAnswerKey && (
                          <div className="text-[11px] text-slate-500 italic pl-1">
                            <b>Hướng dẫn giải:</b> {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* =============================================================== */}
              {/* PHẦN IV: TỰ LUẬN (3.0 ĐIỂM) KÈM BAREM CHẤM TỪNG BƯỚC              */}
              {/* =============================================================== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="text-sm font-extrabold uppercase text-slate-900">
                      PHẦN IV. TỰ LUẬN (GIẢI QUYẾT VẤN ĐỀ THỰC TIỄN)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5 italic">
                      Thí sinh trình bày chi tiết lời giải các bài toán vào giấy làm bài.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded bg-purple-50 text-purple-800 border border-purple-200 shrink-0">
                    3.0 Điểm (2 câu tự luận)
                  </span>
                </div>

                <div className="space-y-5">
                  {exam.partIV.map((q) => (
                    <div key={q.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">
                          Câu {q.number} ({q.totalScore} điểm)
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                          {q.level} · {q.topic}
                        </span>
                      </div>

                      <div className="text-slate-800 leading-relaxed whitespace-pre-line font-medium bg-white p-3 rounded-lg border border-slate-200">
                        {q.content}
                      </div>

                      {/* Barem chấm từng bước chi tiết */}
                      {showAnswerKey && (
                        <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
                          <div className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                            <span>Barem Hướng Dẫn Chấm Điểm Chi Tiết:</span>
                          </div>
                          <div className="space-y-1.5">
                            {q.criteria.map((c, cIdx) => (
                              <div key={cIdx} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100 text-[11px]">
                                <span className="text-slate-700 leading-relaxed">{c.step}</span>
                                <span className="font-mono font-bold text-slate-900 ml-3 shrink-0 bg-white px-2 py-0.5 rounded border border-slate-200">
                                  +{c.score.toFixed(2)}đ
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Chân đề thi */}
              <div className="text-center pt-6 border-t border-slate-200">
                <div className="font-bold uppercase text-slate-400 tracking-widest text-xs">
                  ------------- HẾT ĐỀ KIỂM TRA ĐỊNH KỲ -------------
                </div>
                <div className="text-[11px] text-slate-400 italic mt-1">
                  Giám thị coi thi không giải thích gì thêm
                </div>
              </div>
            </div>
          ) : (
            /* TAB MA TRẬN & ĐẶC TẢ */
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-bold uppercase text-slate-900">
                    Phụ Lục 1: Ma Trận Đề Kiểm Tra Định Kỳ
                  </h3>
                  <div className="text-xs text-slate-500 italic mt-0.5">
                    (Ban hành kèm theo Công văn 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ GDĐT)
                  </div>
                </div>
                <button
                  onClick={() => exportWordMatrixAndSpecOnly(exam)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải Ma Trận Đặc Tả (.doc)</span>
                </button>
              </div>

              {/* Bảng ma trận */}
              <div className="overflow-x-auto text-xs">
                <table className="w-full border-collapse border border-slate-300">
                  <thead>
                    <tr className="bg-slate-100 text-slate-800">
                      <th rowSpan={3} className="border border-slate-300 p-2 text-center w-10">TT</th>
                      <th rowSpan={3} className="border border-slate-300 p-2 text-left min-w-[140px]">Chủ đề / Chương</th>
                      <th rowSpan={3} className="border border-slate-300 p-2 text-left min-w-[180px]">Nội dung / Đơn vị kiến thức</th>
                      <th colSpan={12} className="border border-slate-300 p-2 text-center bg-blue-50/80 text-blue-950 font-bold">
                        Mức độ đánh giá (Số câu & lệnh)
                      </th>
                      <th rowSpan={3} className="border border-slate-300 p-2 text-center w-20">Tổng điểm</th>
                      <th rowSpan={3} className="border border-slate-300 p-2 text-center w-16">Tỉ lệ %</th>
                    </tr>
                    <tr className="bg-slate-50 text-slate-700">
                      <th colSpan={3} className="border border-slate-300 p-1.5 text-center">Phần I (Nhiều LC)</th>
                      <th colSpan={3} className="border border-slate-300 p-1.5 text-center">Phần II (Đúng/Sai)</th>
                      <th colSpan={3} className="border border-slate-300 p-1.5 text-center">Phần III (Trả lời ngắn)</th>
                      <th colSpan={3} className="border border-slate-300 p-1.5 text-center">Phần IV (Tự luận)</th>
                    </tr>
                    <tr className="bg-slate-100 text-slate-600 text-[10px]">
                      <th className="border border-slate-300 p-1 text-center">Biết</th>
                      <th className="border border-slate-300 p-1 text-center">Hiểu</th>
                      <th className="border border-slate-300 p-1 text-center">VD</th>
                      <th className="border border-slate-300 p-1 text-center">Biết</th>
                      <th className="border border-slate-300 p-1 text-center">Hiểu</th>
                      <th className="border border-slate-300 p-1 text-center">VD</th>
                      <th className="border border-slate-300 p-1 text-center">Biết</th>
                      <th className="border border-slate-300 p-1 text-center">Hiểu</th>
                      <th className="border border-slate-300 p-1 text-center">VD</th>
                      <th className="border border-slate-300 p-1 text-center">Biết</th>
                      <th className="border border-slate-300 p-1 text-center">Hiểu</th>
                      <th className="border border-slate-300 p-1 text-center">VD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exam.matrix.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="border border-slate-300 p-2 text-center font-bold">{idx + 1}</td>
                        <td className="border border-slate-300 p-2 font-medium">{row.topic}</td>
                        <td className="border border-slate-300 p-2">{row.content}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partI.nb || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partI.th || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partI.vd || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partII.nb || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partII.th || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partII.vd || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partIII.nb || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partIII.th || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partIII.vd || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partIV.nb || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partIV.th || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center">{row.partIV.vd || '-'}</td>
                        <td className="border border-slate-300 p-2 text-center font-bold text-blue-700">{row.totalScore.toFixed(2)}</td>
                        <td className="border border-slate-300 p-2 text-center font-bold">{row.percentage}%</td>
                      </tr>
                    ))}
                    <tr className="bg-slate-100 font-bold text-slate-900">
                      <td colSpan={3} className="border border-slate-300 p-2.5 text-center uppercase">
                        Tổng điểm theo dạng thức
                      </td>
                      <td colSpan={3} className="border border-slate-300 p-2 text-center text-blue-700">3.0đ</td>
                      <td colSpan={3} className="border border-slate-300 p-2 text-center text-emerald-700">2.0đ</td>
                      <td colSpan={3} className="border border-slate-300 p-2 text-center text-indigo-700">2.0đ</td>
                      <td colSpan={3} className="border border-slate-300 p-2 text-center text-purple-700">3.0đ</td>
                      <td className="border border-slate-300 p-2 text-center text-emerald-700">10.0đ</td>
                      <td className="border border-slate-300 p-2 text-center">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
