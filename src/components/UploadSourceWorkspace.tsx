import React, { useState, useRef, useMemo } from 'react';
import { 
  Upload, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Cloud, 
  ArrowRight, 
  Layers, 
  Presentation, 
  FileCheck2, 
  Download, 
  Trash2, 
  Sparkles, 
  Eye, 
  FolderPlus,
  HelpCircle,
  Library,
  GraduationCap,
  List,
  Check,
  ChevronRight,
  Bookmark,
  Calendar,
  Search,
  Plus,
  X,
  FileUp,
  SlidersHorizontal,
  CheckCircle
} from 'lucide-react';
import { SourceDocument, TeacherProfile, CloudSaveItem, DocumentLessonItem } from '../types';
import { 
  generateTableOfContentsForBook, 
  autoDetectBookMetadata, 
  extractLessonsFromRawText 
} from '../utils/curriculumGenerator';

interface UploadSourceWorkspaceProps {
  teacherProfile: TeacherProfile;
  sourceDocuments: SourceDocument[];
  activeDocumentId?: string;
  cloudSaves: CloudSaveItem[];
  onAddDocument: (doc: SourceDocument) => void;
  onDeleteDocument: (id: string) => void;
  onSelectDocument: (doc: SourceDocument) => void;
  onSelectLessonInDocument?: (doc: SourceDocument, lesson: DocumentLessonItem) => void;
  onUpdateDocumentGrade?: (docId: string, newGrade: string) => void;
  onLaunchGenerate: (doc: SourceDocument, targetSubsystem: 'khbd' | 'slide' | 'exam') => void;
  onOpenSettings: () => void;
  onOpenGoogleDrive?: () => void;
}

const GRADE_LIST = [
  'LỚP 6',
  'LỚP 7',
  'LỚP 8',
  'LỚP 9'
];

export const UploadSourceWorkspace: React.FC<UploadSourceWorkspaceProps> = ({
  teacherProfile,
  sourceDocuments,
  activeDocumentId,
  cloudSaves,
  onAddDocument,
  onDeleteDocument,
  onSelectDocument,
  onSelectLessonInDocument,
  onUpdateDocumentGrade,
  onLaunchGenerate,
  onOpenSettings,
  onOpenGoogleDrive
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form upload mới
  const [selectedCategory, setSelectedCategory] = useState<'SGK' | 'SGV' | 'SBT' | 'TAI_LIEU_KHAC'>('SGK');
  const [subject, setSubject] = useState<string>(teacherProfile.subject || 'Âm Nhạc');
  const [grade, setGrade] = useState<string>(teacherProfile.defaultGrade || 'LỚP 6');
  const [textbook, setTextbook] = useState<string>(teacherProfile.defaultTextbook || 'Kết Nối Tri Thức');
  const [lessonOrChapter, setLessonOrChapter] = useState<string>('Chủ đề 1: Con đường học trò - Tiết 1: Học hát bài Con đường học trò');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('music6-les-1');
  const [documentContent, setDocumentContent] = useState<string>('');
  const [customFileName, setCustomFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'cloudSaves'>('upload');

  // Tìm kiếm bài học & trích xuất bài từ tệp
  const [searchLessonQuery, setSearchLessonQuery] = useState<string>('');
  const [extractedLessonsFromFile, setExtractedLessonsFromFile] = useState<DocumentLessonItem[]>([]);
  const [activeLessonSourceTab, setActiveLessonSourceTab] = useState<'standard' | 'extracted'>('standard');
  const [autoDetectedNotice, setAutoDetectedNotice] = useState<string | null>(null);

  // Thêm bài học thủ công từ file sách
  const [showAddCustomModal, setShowAddCustomModal] = useState<boolean>(false);
  const [customLessonTitle, setCustomLessonTitle] = useState<string>('');
  const [customLessonChapter, setCustomLessonChapter] = useState<string>('');
  const [customLessonObjective, setCustomLessonObjective] = useState<string>('');

  // Modal chọn Khối Lớp & Bài Dạy cho bất kỳ cuốn sách nào trong thư viện
  const [modalDoc, setModalDoc] = useState<SourceDocument | null>(null);
  const [modalGrade, setModalGrade] = useState<string>('LỚP 6');
  const [modalSearchQuery, setModalSearchQuery] = useState<string>('');
  const [modalSelectedLessonId, setModalSelectedLessonId] = useState<string>('');

  // Tài liệu đang được chọn
  const activeDoc = sourceDocuments.find(d => d.id === activeDocumentId) || sourceDocuments[0];

  // Danh mục bài học gợi ý chuẩn GDPT 2018 theo môn, khối lớp và bộ sách hiện tại của Form
  const standardFormLessons = useMemo(() => {
    return generateTableOfContentsForBook(subject, grade, textbook);
  }, [subject, grade, textbook]);

  // Danh mục hiển thị trong Form upload: Có thể là bài trích xuất hoặc bài chuẩn
  const displayedFormLessons = useMemo(() => {
    const list = (activeLessonSourceTab === 'extracted' && extractedLessonsFromFile.length > 0)
      ? extractedLessonsFromFile
      : standardFormLessons;

    if (!searchLessonQuery.trim()) return list;

    const q = searchLessonQuery.toLowerCase();
    return list.filter(l => 
      l.title.toLowerCase().includes(q) || 
      l.chapterOrTopic.toLowerCase().includes(q) ||
      l.objectives.some(o => o.toLowerCase().includes(q))
    );
  }, [activeLessonSourceTab, extractedLessonsFromFile, standardFormLessons, searchLessonQuery]);

  // Danh mục bài học của tài liệu đang kích hoạt (activeDoc)
  const activeDocLessons = useMemo(() => {
    if (!activeDoc) return [];
    if (activeDoc.tableOfContents && activeDoc.tableOfContents.length > 0) {
      return activeDoc.tableOfContents;
    }
    return generateTableOfContentsForBook(activeDoc.subject, activeDoc.grade, activeDoc.textbook);
  }, [activeDoc]);

  // Danh mục bài học trong Modal chọn bài của Library
  const modalDocLessons = useMemo(() => {
    if (!modalDoc) return [];
    const baseLessons = generateTableOfContentsForBook(modalDoc.subject, modalGrade, modalDoc.textbook);
    if (!modalSearchQuery.trim()) return baseLessons;

    const q = modalSearchQuery.toLowerCase();
    return baseLessons.filter(l => 
      l.title.toLowerCase().includes(q) || 
      l.chapterOrTopic.toLowerCase().includes(q)
    );
  }, [modalDoc, modalGrade, modalSearchQuery]);

  // Xử lý khi chọn file từ máy tính
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCustomFileName(file.name);
    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || '';
      
      // 1. Tự động nhận diện Khối lớp, Môn học, Bộ sách từ tên tệp & nội dung
      const detected = autoDetectBookMetadata(file.name, text);
      setGrade(detected.detectedGrade);
      setSubject(detected.detectedSubject);
      setSelectedCategory(detected.detectedCategory);
      setTextbook(detected.detectedTextbook);

      // 2. Quét bài học trong nội dung text nếu có
      const extracted = extractLessonsFromRawText(text, detected.detectedSubject, detected.detectedGrade);
      setExtractedLessonsFromFile(extracted);

      if (extracted.length > 0) {
        setActiveLessonSourceTab('extracted');
        setSelectedLessonId(extracted[0].id);
        setLessonOrChapter(extracted[0].title);
      } else {
        setActiveLessonSourceTab('standard');
        const toc = generateTableOfContentsForBook(detected.detectedSubject, detected.detectedGrade, detected.detectedTextbook);
        if (toc.length > 0) {
          setSelectedLessonId(toc[0].id);
          setLessonOrChapter(toc[0].title);
        }
      }

      setAutoDetectedNotice(`Đã nhận diện tệp "${file.name}": Môn ${detected.detectedSubject} · ${detected.detectedGrade} · ${detected.detectedTextbook}. Vui lòng kiểm tra và chọn bài dạy ở Bước 2 & 3 bên dưới.`);
      setDocumentContent(text.slice(0, 4000));
      setIsUploading(false);
    };

    reader.onerror = () => {
      setIsUploading(false);
    };

    try {
      reader.readAsText(file);
    } catch (err) {
      const detected = autoDetectBookMetadata(file.name);
      setGrade(detected.detectedGrade);
      setSubject(detected.detectedSubject);
      setSelectedCategory(detected.detectedCategory);
      setTextbook(detected.detectedTextbook);
      setAutoDetectedNotice(`Đã nhận diện tệp ${file.name}: Môn ${detected.detectedSubject} · ${detected.detectedGrade}.`);
      setIsUploading(false);
    }
  };

  // Chọn Khối Lớp trong Form upload
  const handleSelectGrade = (newGrade: string) => {
    setGrade(newGrade);
    const newToc = generateTableOfContentsForBook(subject, newGrade, textbook);
    if (newToc.length > 0) {
      setSelectedLessonId(newToc[0].id);
      setLessonOrChapter(newToc[0].title);
    }
  };

  // Chọn bài học trong danh sách
  const handleSelectLessonInForm = (les: DocumentLessonItem) => {
    setLessonOrChapter(les.title);
    setSelectedLessonId(les.id);
  };

  // Thêm bài học tùy chỉnh từ file sách
  const handleAddCustomLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLessonTitle.trim()) return;

    const newLes: DocumentLessonItem = {
      id: 'custom-les-' + Date.now(),
      lessonNumber: standardFormLessons.length + 1,
      title: customLessonTitle.trim(),
      chapterOrTopic: customLessonChapter.trim() || 'Bài học bổ sung từ tệp sách tải lên',
      periodDuration: 1,
      page: 'Trang sách tải lên',
      objectives: [
        customLessonObjective.trim() || `Phát triển phẩm chất và năng lực học sinh qua bài học: ${customLessonTitle.trim()}.`,
        `Thực hiện hiệu quả yêu cầu cần đạt theo chương trình GDPT 2018.`
      ],
      keyKnowledge: [
        `Kiến thức trọng tâm bài học được trích xuất từ tệp sách tải lên.`,
        `Phương pháp tổ chức dạy học theo tiến trình 4 hoạt động CV 5512.`
      ],
      exercises: [
        'Bài tập 1: Khởi động và phát hiện kiến thức mới.',
        'Bài tập 2: Luyện tập và thực hành theo nhóm.',
        'Bài tập 3: Vận dụng thực tiễn.'
      ]
    };

    setExtractedLessonsFromFile(prev => [newLes, ...prev]);
    setActiveLessonSourceTab('extracted');
    setSelectedLessonId(newLes.id);
    setLessonOrChapter(newLes.title);
    setShowAddCustomModal(false);
    setCustomLessonTitle('');
    setCustomLessonChapter('');
    setCustomLessonObjective('');
  };

  // Xác nhận nạp tài liệu vào thư viện
  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const allAvailableLessons = [...extractedLessonsFromFile, ...standardFormLessons];
    const currentLesson = allAvailableLessons.find(l => l.id === selectedLessonId || l.title === lessonOrChapter) || allAvailableLessons[0];
    
    const newDoc: SourceDocument = {
      id: 'doc-' + Date.now(),
      title: `${selectedCategory === 'SGK' ? 'Sách Giáo Khoa' : selectedCategory === 'SGV' ? 'Sách Giáo Viên' : selectedCategory === 'SBT' ? 'Sách Bài Tập' : 'Tài Liệu'}: ${subject} ${grade} - ${textbook}`,
      category: selectedCategory,
      fileName: customFileName || `${selectedCategory}_${subject.replace(/\s+/g, '')}_${grade.replace(/\s+/g, '')}.pdf`,
      fileSize: (Math.random() * 8 + 3).toFixed(1) + ' MB',
      uploadedAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      subject,
      grade,
      textbook,
      lessonOrChapter: lessonOrChapter || currentLesson?.title || 'Bài dạy theo chương trình GDPT 2018',
      selectedLessonId: selectedLessonId || currentLesson?.id,
      tableOfContents: allAvailableLessons.length > 0 ? allAvailableLessons : standardFormLessons,
      extractedText: documentContent || `Nội dung tài liệu ${selectedCategory} môn ${subject} ${grade}, bài học: ${lessonOrChapter}. Bộ sách ${textbook}.`,
      extractedObjectives: currentLesson?.objectives || [
        `Phát triển năng lực cốt lõi môn ${subject} qua bài học ${lessonOrChapter}.`,
        `Thực hiện hiệu quả yêu cầu cần đạt theo Chương trình GDPT 2018.`,
        `Rèn luyện phẩm chất chăm chỉ, tự chủ và tinh thần hợp tác trong tiết học.`
      ],
      extractedKeyKnowledge: currentLesson?.keyKnowledge || [
        `Kiến thức trọng tâm bài học theo sách ${selectedCategory}.`,
        `Phương pháp tổ chức dạy học theo tiến trình 4 hoạt động Công văn 5512.`,
        `Các dạng câu hỏi trắc nghiệm và thực hành định hướng CV 7991.`
      ],
      extractedExercises: currentLesson?.exercises || [
        'Bài tập 1: Tìm hiểu và phân tích ngữ liệu / kiến thức khởi động.',
        'Bài tập 2: Luyện tập theo cặp / nhóm trên lớp.',
        'Bài tập 3: Vận dụng thực tế và bài tập mở rộng ở nhà.'
      ],
      cloudSynced: true
    };

    onAddDocument(newDoc);
    onSelectDocument(newDoc);
    setDocumentContent('');
    setCustomFileName('');
    setAutoDetectedNotice(null);
    setActiveTab('library');
  };

  // Mở modal chọn Khối Lớp & Bài Dạy cho một cuốn sách trong thư viện
  const handleOpenDocModal = (doc: SourceDocument) => {
    setModalDoc(doc);
    setModalGrade(doc.grade);
    setModalSelectedLessonId(doc.selectedLessonId || '');
    setModalSearchQuery('');
  };

  // Áp dụng bài dạy và khối lớp từ Modal cho cuốn sách
  const handleApplyModalLesson = (selectedLesson: DocumentLessonItem) => {
    if (!modalDoc) return;

    if (modalGrade !== modalDoc.grade && onUpdateDocumentGrade) {
      onUpdateDocumentGrade(modalDoc.id, modalGrade);
    }

    if (onSelectLessonInDocument) {
      onSelectLessonInDocument(modalDoc, selectedLesson);
    }

    onSelectDocument(modalDoc);
    setModalDoc(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* BANNER THÔNG TIN GIÁO VIÊN & HƯỚNG DẪN QUY TRÌNH 3 BƯỚC */}
      <div className="bg-gradient-to-r from-[#0F172A] via-slate-900 to-blue-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-400/30">
              <Cloud className="w-3.5 h-3.5 text-blue-400" />
              <span>HỆ THỐNG QUẢN LÝ TÀI LIỆU NGUỒN & ĐỒNG BỘ ĐÁM MÂY</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">
              Tủ Sách Sư Phạm: Nạp SGK, Chọn Khối Lớp & Bài Dạy
            </h1>
            <p className="text-xs text-slate-300">
              Quy trình chuẩn: Nạp tệp sách (PDF, DOCX, TXT) → Chọn Khối Lớp (Lớp 6 đến Lớp 12) → Chọn Bài Dạy trong Mục lục sách → Tự động trích xuất nội dung tạo KHBD 5512, Slide 16:9 và Đề thi 7991.
            </p>
          </div>

          {/* Card giáo viên hiện tại & nút Cài đặt */}
          <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/15 flex items-center justify-between gap-3 shrink-0">
            <div className="text-left text-xs">
              <div className="text-[10px] text-blue-300 uppercase tracking-wider font-semibold">Giáo viên phụ trách:</div>
              <div className="font-bold text-white text-sm">{teacherProfile.fullName}</div>
              <div className="text-[11px] text-slate-300">
                {teacherProfile.subject} · {teacherProfile.schoolName || 'THCS Long Hồ'}
              </div>
            </div>
            <button
              onClick={onOpenSettings}
              className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              Cài Đặt
            </button>
          </div>
        </div>

        {/* 3 BƯỚC THAO TÁC RÕ RÀNG */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-black flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <div>
              <div className="font-bold text-white">Bước 1: Nạp Tệp Sách</div>
              <div className="text-[11px] text-slate-300">Tải lên file SGK, SGV hoặc SBT (PDF, Word, TXT) từ máy tính.</div>
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-black flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <div>
              <div className="font-bold text-white">Bước 2: Chọn Khối Lớp</div>
              <div className="text-[11px] text-slate-300">Bấm chọn Khối lớp tương ứng (Lớp 6 đến Lớp 12).</div>
            </div>
          </div>

          <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-white font-black flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <div>
              <div className="font-bold text-white">Bước 3: Chọn Bài Dạy Trong Sách</div>
              <div className="text-[11px] text-slate-300">Chọn bài dạy cụ thể trong mục lục để tự động sinh toàn bộ giáo án & bài giảng.</div>
            </div>
          </div>
        </div>
      </div>

      {/* THANH TAB ĐIỀU HƯỚNG CHÍNH */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'upload'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Nạp & Chọn Khối Lớp / Bài Mới</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'library'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Library className="w-4 h-4 text-blue-600" />
          <span>Tủ Sách Đã Nạp ({sourceDocuments.length} cuốn)</span>
        </button>

        <button
          onClick={() => setActiveTab('cloudSaves')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
            activeTab === 'cloudSaves'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Cloud className="w-4 h-4 text-emerald-600" />
          <span>Bài Giảng & Đề Thi Lưu Trên Cloud ({cloudSaves.length} mục)</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* TAB 1: FORM TẢI LÊN TÀI LIỆU NGUỒN (SGK, SGV, SBT)                   */}
      {/* =================================================================== */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Cột trái: Form nhập & Upload (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-bold uppercase text-slate-900 flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-blue-600" />
                <span>Nạp Sách Mới & Chọn Nội Dung Bài Dạy</span>
              </h2>
              <span className="text-[11px] text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full font-semibold border border-blue-200">
                Đồng bộ Cloud
              </span>
            </div>

            <form onSubmit={handleCreateDocument} className="space-y-5">
              {/* ============================================================ */}
              {/* BƯỚC 1: TẢI FILE SÁCH LÊN (PDF, DOCX, TXT)                   */}
              {/* ============================================================ */}
              <div className="space-y-2">
                <label className="block font-bold text-slate-900 text-xs">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] mr-1.5">1</span>
                  Nạp tệp sách giáo khoa / giáo viên từ máy tính <span className="text-rose-500">*</span>
                </label>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden" 
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    customFileName
                      ? 'border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50'
                      : 'border-blue-300 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50/70'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      customFileName ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {customFileName ? <CheckCircle className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-slate-800 text-xs">
                        {customFileName ? customFileName : 'Bấm vào đây để chọn tệp sách (PDF, DOCX, TXT)'}
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {customFileName ? 'Bấm để đổi tệp khác' : 'Hệ thống tự động nhận diện Khối lớp, Môn học và Mục lục bài dạy'}
                      </div>
                    </div>
                  </div>
                  {isUploading && (
                    <div className="text-blue-600 font-semibold animate-pulse text-[11px] mt-2">
                      Đang xử lý đọc và phân tích tệp tin...
                    </div>
                  )}
                </div>

                {/* Thông báo tự động nhận diện từ tệp */}
                {autoDetectedNotice && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-[11px] flex items-start gap-2 animate-in fade-in">
                    <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <b>Nhận diện tự động:</b> {autoDetectedNotice}
                    </div>
                  </div>
                )}
              </div>

              {/* ============================================================ */}
              {/* BƯỚC 2: CHỌN KHỐI LỚP (BẮT BUỘC & RẤT DỄ CHỌN VỚI 7 NÚT BẤM) */}
              {/* ============================================================ */}
              <div className="space-y-2 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-900 text-xs">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] mr-1.5">2</span>
                    Chọn Khối Lớp của cuốn sách <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[11px] text-blue-700 font-bold bg-blue-100 px-2 py-0.5 rounded">
                    Đang chọn: {grade}
                  </span>
                </div>

                {/* 7 NÚT CHỌN KHỐI LỚP TO, RÕ RÀNG */}
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 pt-1">
                  {GRADE_LIST.map((grd) => {
                    const isSelected = grade === grd;
                    return (
                      <button
                        key={grd}
                        type="button"
                        onClick={() => handleSelectGrade(grd)}
                        className={`py-2 px-1 rounded-lg text-center font-black text-xs transition-all flex flex-col items-center justify-center gap-0.5 border ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600 text-white shadow-sm ring-2 ring-blue-300'
                            : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                        }`}
                      >
                        <span>{grd}</span>
                        {isSelected && <span className="text-[9px] opacity-90">✓ Đang chọn</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Môn học, Phân loại & Bộ sách */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200/80">
                  <div>
                    <label className="block text-slate-600 text-[11px] mb-1 font-semibold">Môn học:</label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Âm Nhạc, Toán..."
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 text-[11px] mb-1 font-semibold">Phân loại sách:</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-800"
                    >
                      <option value="SGK">SGK - Sách Giáo Khoa</option>
                      <option value="SGV">SGV - Sách Giáo Viên</option>
                      <option value="SBT">SBT - Sách Bài Tập</option>
                      <option value="TAI_LIEU_KHAC">Tài liệu khác</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 text-[11px] mb-1 font-semibold">Bộ sách chuẩn GDPT 2018:</label>
                    <div className="w-full px-2.5 py-1.5 bg-amber-50/80 border border-amber-300 rounded-lg text-amber-900 font-bold text-xs flex items-center gap-1.5 shadow-2xs">
                      <Library className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">Kết Nối Tri Thức với Cuộc Sống</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* BƯỚC 3: MỤC LỤC & CHỌN BÀI DẠY TRONG SÁCH                    */}
              {/* ============================================================ */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="font-bold text-blue-950 text-xs flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px]">3</span>
                    <span>Chọn bài dạy trong mục lục sách ({displayedFormLessons.length} bài sẵn sàng):</span>
                  </label>

                  <div className="flex items-center gap-2">
                    {extractedLessonsFromFile.length > 0 && (
                      <div className="inline-flex rounded-lg border border-blue-200 bg-white p-0.5 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setActiveLessonSourceTab('standard')}
                          className={`px-2 py-0.5 rounded font-bold transition-colors ${
                            activeLessonSourceTab === 'standard' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Chuẩn GDPT 2018 ({standardFormLessons.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveLessonSourceTab('extracted')}
                          className={`px-2 py-0.5 rounded font-bold transition-colors ${
                            activeLessonSourceTab === 'extracted' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Từ tệp sách ({extractedLessonsFromFile.length})
                        </button>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => setShowAddCustomModal(true)}
                      className="text-[11px] text-blue-700 bg-white hover:bg-blue-100 border border-blue-300 font-bold px-2 py-1 rounded-lg flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Thêm bài mới</span>
                    </button>
                  </div>
                </div>

                {/* Thanh tìm kiếm bài dạy */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchLessonQuery}
                    onChange={(e) => setSearchLessonQuery(e.target.value)}
                    placeholder="🔍 Gõ từ khóa để tìm kiếm bài dạy trong sách..."
                    className="w-full pl-8 pr-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchLessonQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchLessonQuery('')}
                      className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Danh sách bài dạy */}
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  {displayedFormLessons.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 bg-white rounded-lg border border-slate-200 text-xs">
                      Không tìm thấy bài học nào phù hợp với từ khóa "{searchLessonQuery}".
                    </div>
                  ) : (
                    displayedFormLessons.map((item) => {
                      const isSelected = selectedLessonId === item.id || lessonOrChapter === item.title;
                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelectLessonInForm(item)}
                          className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-white border-blue-600 shadow-xs ring-2 ring-blue-500'
                              : 'bg-white/80 hover:bg-white border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="font-bold text-slate-900 text-xs">
                              {item.title}
                            </div>
                            {isSelected ? (
                              <span className="shrink-0 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3 text-blue-600" />
                                Đang chọn
                              </span>
                            ) : (
                              <span className="shrink-0 text-[10px] text-slate-400">
                                {item.page || `Tiết ${item.lessonNumber}`}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                            <span>{item.chapterOrTopic}</span>
                            <span>·</span>
                            <span className="text-emerald-700 truncate max-w-sm">{item.objectives[0]}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Tên bài học / Tiêu đề bài dạy cụ thể */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tên bài dạy đã chọn (hoặc tự chỉnh sửa tên bài): <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={lessonOrChapter}
                  onChange={(e) => setLessonOrChapter(e.target.value)}
                  placeholder="Ví dụ: Chủ đề 1: Con đường học trò - Tiết 1: Học hát bài Con đường học trò..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold text-blue-900"
                />
              </div>

              {/* Nút gửi form */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Cloud className="w-4 h-4" />
                <span>Nạp Sách & Kích Hoạt Bài Dạy Đã Chọn</span>
              </button>
            </form>
          </div>

          {/* Cột phải: Tài liệu đang kích hoạt & Nút chuyển đổi nhanh (5 cols) */}
          <div className="lg:col-span-5 space-y-5 text-xs">
            {/* Box tài liệu đang chọn */}
            {activeDoc && (
              <div className="bg-white rounded-2xl p-5 border-2 border-blue-500 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      activeDoc.category === 'SGK' ? 'bg-blue-100 text-blue-800' :
                      activeDoc.category === 'SGV' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {activeDoc.category}
                    </span>
                    <span className="font-bold text-slate-900 text-xs">Tài Liệu Nguồn Kích Hoạt</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Đã Đồng Bộ Cloud
                  </span>
                </div>

                {/* Tiêu đề & Chọn lại Khối lớp trực tiếp trên Card */}
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Môn: <b className="text-slate-800">{activeDoc.subject}</b></span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-slate-700">Đổi Khối:</span>
                      <select
                        value={activeDoc.grade}
                        onChange={(e) => onUpdateDocumentGrade && onUpdateDocumentGrade(activeDoc.id, e.target.value)}
                        className="bg-blue-50 border border-blue-300 font-bold text-blue-900 rounded px-1.5 py-0.5 text-[11px] outline-none cursor-pointer"
                      >
                        {GRADE_LIST.map(g => (
                          <option key={g} value={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200">
                    <div className="text-[10px] text-blue-600 uppercase font-bold tracking-wider">Bài dạy đang được chọn:</div>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-snug mt-1">
                      {activeDoc.lessonOrChapter}
                    </h3>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Bộ sách: <b>{activeDoc.textbook}</b> · Tệp: {activeDoc.fileName}
                    </div>
                  </div>
                </div>

                {/* MỤC LỤC CÁC BÀI DẠY TRONG CUỐN SÁCH NÀY (BẤM VÀO BÀI ĐỂ CHỌN NGAY) */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                      <List className="w-3.5 h-3.5 text-blue-600" />
                      <span>Mục Lục Các Bài Trong Sách ({activeDocLessons.length} bài):</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenDocModal(activeDoc)}
                      className="text-[10px] text-blue-700 bg-blue-100 hover:bg-blue-200 px-2 py-0.5 rounded font-bold"
                    >
                      Bảng chọn bài lớn
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {activeDocLessons.map((item) => {
                      const isCurrent = (activeDoc.selectedLessonId === item.id) || (activeDoc.lessonOrChapter === item.title);
                      return (
                        <div
                          key={item.id}
                          onClick={() => onSelectLessonInDocument && onSelectLessonInDocument(activeDoc, item)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            isCurrent 
                              ? 'bg-blue-50/90 border-blue-500 shadow-2xs ring-1 ring-blue-400' 
                              : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-semibold text-slate-800 text-[11px] leading-snug">
                              {item.title}
                            </div>
                            {isCurrent ? (
                              <span className="shrink-0 text-[10px] font-bold text-blue-700 bg-white px-1.5 py-0.5 rounded border border-blue-300 flex items-center gap-1">
                                <Check className="w-3 h-3 text-blue-600" />
                                Đang chọn
                              </span>
                            ) : (
                              <span className="shrink-0 text-[10px] text-slate-400">
                                {item.page || `Tiết ${item.lessonNumber}`}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Yêu cầu cần đạt trích xuất */}
                {activeDoc.extractedObjectives && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Yêu cầu cần đạt bài này:</span>
                    </div>
                    <ul className="space-y-0.5 list-disc pl-4 text-slate-600 text-[11px]">
                      {activeDoc.extractedObjectives.slice(0, 2).map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3 NÚT CHUYỂN TIẾP SANG KHBD, SLIDE, ĐỀ THI CHO CHÍNH BÀI NÀY */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    Chuyển sang màn hình tạo:
                  </div>

                  <button
                    onClick={() => onLaunchGenerate(activeDoc, 'khbd')}
                    className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-blue-200" />
                      <span>Tạo KHBD Chuẩn 5512 Từ Bài Này</span>
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onLaunchGenerate(activeDoc, 'slide')}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      <Presentation className="w-4 h-4 text-amber-400" />
                      <span>Sinh Slide Trình Chiếu 16:9 Từ Bài Này</span>
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onLaunchGenerate(activeDoc, 'exam')}
                    className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-all flex items-center justify-between group"
                  >
                    <span className="flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-emerald-200" />
                      <span>Thiết Kế Đề Thi 4 Phần CV 7991</span>
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 2: TỦ SÁCH SƯ PHẠM ĐÃ NẠP (DANH SÁCH TÀI LIỆU NGUỒN)            */}
      {/* =================================================================== */}
      {activeTab === 'library' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase">Danh Mục Sách & Tài Liệu Đã Nạp Trên Cloud</h2>
              <p className="text-slate-500 text-[11px]">Bấm vào cuốn sách hoặc bấm "Chọn Khối Lớp & Bài Dạy" để thay đổi bài giảng</p>
            </div>
            <button
              onClick={() => setActiveTab('upload')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Nạp Thêm Sách Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sourceDocuments.map((doc) => {
              const isSelected = doc.id === activeDocumentId;
              const docToc = doc.tableOfContents && doc.tableOfContents.length > 0 
                ? doc.tableOfContents 
                : generateTableOfContentsForBook(doc.subject, doc.grade, doc.textbook);

              return (
                <div
                  key={doc.id}
                  className={`bg-white rounded-2xl p-5 border-2 transition-all shadow-xs flex flex-col justify-between space-y-4 ${
                    isSelected ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        doc.category === 'SGK' ? 'bg-blue-100 text-blue-800' :
                        doc.category === 'SGV' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {doc.category === 'SGK' ? 'Sách Giáo Khoa' : doc.category === 'SGV' ? 'Sách Giáo Viên' : 'Sách Bài Tập'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{doc.fileSize}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span>Môn: <b className="text-slate-800">{doc.subject}</b></span>
                        <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {doc.grade}
                        </span>
                      </div>
                      <div>Bộ sách: <b className="text-slate-700">{doc.textbook}</b></div>
                      <div className="text-[10px] text-slate-400">Tệp: {doc.fileName}</div>
                    </div>

                    <div className="p-2.5 bg-blue-50/50 rounded-lg border border-blue-200">
                      <div className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Bài học đang chọn:</div>
                      <h4 className="font-bold text-slate-900 text-xs mt-0.5 leading-snug">
                        {doc.lessonOrChapter}
                      </h4>
                    </div>

                    {/* NÚT MỞ BẢNG CHỌN KHỐI LỚP & BÀI DẠY */}
                    <button
                      type="button"
                      onClick={() => handleOpenDocModal(doc)}
                      className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-800 font-bold rounded-xl text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <List className="w-3.5 h-3.5 text-blue-600" />
                      <span>Chọn Khối Lớp & Bài Dạy ({docToc.length} bài)</span>
                    </button>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectDocument(doc)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-colors ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ Đang Sử Dụng' : 'Chọn Cuốn Sách Này'}
                      </button>

                      {sourceDocuments.length > 1 && (
                        <button
                          onClick={() => onDeleteDocument(doc.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors"
                          title="Xóa tài liệu này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Nút sinh trực tiếp */}
                    <button
                      onClick={() => onLaunchGenerate(doc, 'khbd')}
                      className="w-full py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1"
                    >
                      <span>Tạo KHBD 5512 & Slide</span>
                      <ArrowRight className="w-3 h-3 text-blue-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* TAB 3: BÀI GIẢNG & ĐỀ THI ĐÃ LƯU TRÊN CLOUD                         */}
      {/* =================================================================== */}
      {activeTab === 'cloudSaves' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase">Kho Lưu Trữ Kết Quả Bài Dạy & Đề Thi Trên Đám Mây</h2>
              <p className="text-slate-500 text-[11px]">Bảo lưu an toàn, cho phép tải về dưới nhiều định dạng (Word, PowerPoint, PDF)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded border border-emerald-200 text-[11px]">
                Cloud Storage: An Toàn
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5">Loại Sản Phẩm</th>
                  <th className="p-3.5">Tên Bài Giảng / Kế Hoạch Bài Dạy</th>
                  <th className="p-3.5">Môn & Khối</th>
                  <th className="p-3.5">Thời Gian Lưu</th>
                  <th className="p-3.5 text-right">Tải Xuống Đám Mây</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cloudSaves.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        item.itemType === 'KHBD' ? 'bg-blue-100 text-blue-800' :
                        item.itemType === 'SLIDE' ? 'bg-amber-100 text-amber-800' :
                        item.itemType === 'EXAM' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {item.itemType}
                      </span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900 max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      {item.subject} - {item.grade}
                    </td>
                    <td className="p-3.5 text-slate-500 font-mono text-[11px]">
                      {item.savedAt}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.hasWordDoc && (
                          <button
                            onClick={() => alert(`Tải bản Word: ${item.title}`)}
                            className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[10px] rounded border border-blue-200"
                          >
                            Word
                          </button>
                        )}
                        {item.hasPptSlide && (
                          <button
                            onClick={() => alert(`Tải bản PowerPoint: ${item.title}`)}
                            className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold text-[10px] rounded border border-amber-200"
                          >
                            PPT
                          </button>
                        )}
                        {item.hasPdf && (
                          <button
                            onClick={() => alert(`Tải bản PDF: ${item.title}`)}
                            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[10px] rounded border border-rose-200"
                          >
                            PDF
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 1: CHỌN KHỐI LỚP & BÀI DẠY TRONG SÁCH (FULL INTERACTIVE DIALOG) */}
      {/* =================================================================== */}
      {modalDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 text-xs max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Chọn Khối Lớp & Bài Dạy: {modalDoc.title}
                  </h3>
                  <div className="text-[11px] text-slate-500">
                    Môn {modalDoc.subject} · Bộ sách {modalDoc.textbook}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setModalDoc(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* BỘ CHỌN KHỐI LỚP TRONG MODAL */}
            <div className="space-y-1.5 shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="font-bold text-slate-800 text-xs">
                1. Chọn Khối Lớp:
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                {GRADE_LIST.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setModalGrade(g)}
                    className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      modalGrade === g
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs ring-2 ring-blue-300'
                        : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* TÌM KIẾM BÀI DẠY TRONG MODAL */}
            <div className="relative shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={modalSearchQuery}
                onChange={(e) => setModalSearchQuery(e.target.value)}
                placeholder="🔍 Tìm bài dạy theo tên bài, chủ đề..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* DANH SÁCH BÀI DẠY TRONG MODAL */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px]">
              {modalDocLessons.map((les) => {
                const isCurrent = modalSelectedLessonId === les.id || modalDoc.lessonOrChapter === les.title;
                return (
                  <div
                    key={les.id}
                    onClick={() => setModalSelectedLessonId(les.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-blue-50 border-blue-500 shadow-xs ring-1 ring-blue-400'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-bold text-slate-900 text-xs">
                        {les.title}
                      </div>
                      {isCurrent ? (
                        <span className="shrink-0 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3 text-blue-600" />
                          Đã chọn
                        </span>
                      ) : (
                        <span className="shrink-0 text-[10px] text-slate-400">
                          {les.page || `Tiết ${les.lessonNumber}`}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                      <span>{les.chapterOrTopic}</span>
                      <span>·</span>
                      <span className="text-emerald-700">{les.objectives[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FOOTER MODAL */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500">
                Khối: <b>{modalGrade}</b> · Tổng <b>{modalDocLessons.length}</b> bài dạy
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setModalDoc(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const chosen = modalDocLessons.find(l => l.id === modalSelectedLessonId) || modalDocLessons[0];
                    if (chosen) handleApplyModalLesson(chosen);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Áp Dụng Bài Dạy Này</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 2: THÊM BÀI DẠY MỚI TÙY CHỈNH TỪ FILE SÁCH                    */}
      {/* =================================================================== */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Thêm Bài Dạy Mới Từ File Sách Của Thầy/Cô
                </h3>
              </div>
              <button
                onClick={() => setShowAddCustomModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomLesson} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Tên bài dạy trong file sách: <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customLessonTitle}
                  onChange={(e) => setCustomLessonTitle(e.target.value)}
                  placeholder="Ví dụ: Bài 5: Ôn tập chương và Vận dụng nâng cao..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Chủ đề / Chương (Tùy chọn):
                </label>
                <input
                  type="text"
                  value={customLessonChapter}
                  onChange={(e) => setCustomLessonChapter(e.target.value)}
                  placeholder="Ví dụ: Chương 2: Thực hành & Biểu diễn..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Yêu cầu cần đạt chính (Mục tiêu bài dạy):
                </label>
                <textarea
                  rows={3}
                  value={customLessonObjective}
                  onChange={(e) => setCustomLessonObjective(e.target.value)}
                  placeholder="Ví dụ: Học sinh nắm vững kỹ năng thực hành, tự giác làm việc nhóm và vận dụng vào thực tế..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lưu & Chọn Bài Này</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
