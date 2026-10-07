import React, { useState, useEffect } from 'react';
import { 
  AppState, 
  AppSubsystem, 
  LessonPlan5512, 
  SlideItem, 
  Exam7991, 
  TeacherProfile, 
  SourceDocument,
  DocumentLessonItem
} from './types';
import { initialAppState } from './data/defaultData';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { KhbdWorkspace } from './components/KhbdWorkspace';
import { SlideWorkspace } from './components/SlideWorkspace';
import { ExamWorkspace } from './components/ExamWorkspace';
import { UploadSourceWorkspace } from './components/UploadSourceWorkspace';
import { SettingsModal } from './components/SettingsModal';
import { PresentationModal } from './components/PresentationModal';
import { JsonStateModal } from './components/JsonStateModal';
import { MusicToolboxModal } from './components/MusicToolboxModal';
import { 
  Menu, 
  X,
  Share2,
  FolderOpen,
  Sparkles,
  RefreshCw,
  BookOpen,
  Search,
  Check,
  Music,
  Volume2
} from 'lucide-react';
import { exportSingleFileHtml } from './utils/exporter';
import { getCurriculumForDocument, getCurriculumForLesson, generateTableOfContentsForBook } from './utils/curriculumGenerator';
import { playTone } from './utils/audioSynthesizer';

const STORAGE_KEY = 'edtech_cv5512_cv7991_state_v3';

export default function App() {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Kiểm tra xem dữ liệu có bị kẹt Toán khi môn học đang là Âm Nhạc hay không
        const isMusic = (parsed.teacherProfile?.subject || parsed.khbd?.header?.subjectName || '').toLowerCase().includes('âm nhạc');
        const hasMath = JSON.stringify(parsed.khbd?.generalObjectives || '').includes('hàm số') ||
                        JSON.stringify(parsed.khbd?.activities || '').includes('Skateboard') ||
                        JSON.stringify(parsed.khbd?.activities || '').includes('GeoGebra');

        if (isMusic && hasMath) {
          // Khôi phục nội dung Âm Nhạc 6 chuẩn
          return {
            ...initialAppState,
            teacherProfile: parsed.teacherProfile || initialAppState.teacherProfile,
            sourceDocuments: parsed.sourceDocuments || initialAppState.sourceDocuments,
            cloudSaves: parsed.cloudSaves || initialAppState.cloudSaves,
            currentSubsystem: parsed.currentSubsystem || 'khbd'
          };
        }

        return {
          ...initialAppState,
          ...parsed,
          teacherProfile: parsed.teacherProfile || initialAppState.teacherProfile,
          sourceDocuments: parsed.sourceDocuments || initialAppState.sourceDocuments,
          cloudSaves: parsed.cloudSaves || initialAppState.cloudSaves,
          currentSubsystem: parsed.currentSubsystem || 'khbd'
        };
      }
    } catch (e) {
      console.warn('Could not load cached state, using default:', e);
    }
    return initialAppState;
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isMusicToolboxOpen, setIsMusicToolboxOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isQuickLessonPickerOpen, setIsQuickLessonPickerOpen] = useState(false);
  const [quickPickerGrade, setQuickPickerGrade] = useState<string>('LỚP 6');
  const [quickPickerSearch, setQuickPickerSearch] = useState<string>('');

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save state to localStorage:', e);
    }
  }, [state]);

  const handleSubsystemChange = (subsystem: AppSubsystem) => {
    setState(prev => ({
      ...prev,
      currentSubsystem: subsystem,
      lastUpdated: new Date().toISOString()
    }));
    setIsMobileSidebarOpen(false);
  };

  const handleSaveTeacherProfile = (updatedProfile: TeacherProfile) => {
    setState(prev => {
      // Nếu giáo viên đổi môn học, sinh lại nội dung phù hợp với môn mới
      const subjectChanged = updatedProfile.subject !== prev.teacherProfile.subject;
      if (subjectChanged) {
        const { khbd, slides, exam } = getCurriculumForLesson(
          updatedProfile.subject,
          updatedProfile.defaultGrade,
          prev.khbd.header.lessonTitle,
          updatedProfile.defaultTextbook,
          updatedProfile
        );
        return {
          ...prev,
          teacherProfile: updatedProfile,
          khbd,
          slides,
          exam,
          lastUpdated: new Date().toISOString()
        };
      }

      return {
        ...prev,
        teacherProfile: updatedProfile,
        khbd: {
          ...prev.khbd,
          header: {
            ...prev.khbd.header,
            teacherName: updatedProfile.fullName,
            schoolName: updatedProfile.schoolName,
            departmentName: updatedProfile.departmentName,
            subjectName: updatedProfile.subject,
            grade: updatedProfile.defaultGrade,
            textbook: updatedProfile.defaultTextbook,
            academicYear: updatedProfile.academicYear
          }
        },
        exam: {
          ...prev.exam,
          header: {
            ...prev.exam.header,
            teacherName: updatedProfile.fullName,
            schoolName: updatedProfile.schoolName,
            departmentName: updatedProfile.departmentName,
            subjectName: updatedProfile.subject,
            grade: updatedProfile.defaultGrade,
            textbook: updatedProfile.defaultTextbook,
            academicYear: updatedProfile.academicYear
          }
        },
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const handleUpdateHeader = (field: string, value: string) => {
    setState(prev => {
      const newHeader = { ...prev.khbd.header, [field]: value };
      
      // Nếu thay đổi Môn học, Bài dạy hoặc Khối lớp -> Tái sinh nội dung sư phạm tương ứng
      if (field === 'subjectName' || field === 'lessonTitle' || field === 'grade') {
        const targetSubject = field === 'subjectName' ? value : newHeader.subjectName;
        const targetGrade = field === 'grade' ? value : newHeader.grade;
        let targetLesson = field === 'lessonTitle' ? value : newHeader.lessonTitle;
        const targetTextbook = 'Kết Nối Tri Thức';

        // Khi đổi Khối lớp, tự động chọn bài học đầu tiên của khối lớp mới đó
        if (field === 'grade') {
          const newToc = generateTableOfContentsForBook(targetSubject, targetGrade, targetTextbook);
          if (newToc.length > 0) {
            targetLesson = newToc[0].title;
          }
        }

        const { khbd, slides, exam } = getCurriculumForLesson(
          targetSubject,
          targetGrade,
          targetLesson,
          targetTextbook,
          prev.teacherProfile
        );

        // Tìm cuốn sách tương ứng trong tủ sách nếu có
        const matchedDoc = prev.sourceDocuments.find(d => 
          d.subject.toLowerCase() === targetSubject.toLowerCase() && 
          d.grade.toLowerCase() === targetGrade.toLowerCase()
        );

        return {
          ...prev,
          activeDocumentId: matchedDoc ? matchedDoc.id : prev.activeDocumentId,
          khbd,
          slides,
          exam,
          lastUpdated: new Date().toISOString()
        };
      }

      return {
        ...prev,
        khbd: {
          ...prev.khbd,
          header: newHeader
        },
        exam: {
          ...prev.exam,
          header: { ...prev.exam.header, [field]: value }
        },
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const handleUpdateKhbd = (updatedKhbd: LessonPlan5512) => {
    setState(prev => ({
      ...prev,
      khbd: updatedKhbd,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleUpdateSlides = (updatedSlides: SlideItem[]) => {
    setState(prev => ({
      ...prev,
      slides: updatedSlides,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleUpdateExam = (updatedExam: Exam7991) => {
    setState(prev => ({
      ...prev,
      exam: updatedExam,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleImportState = (newState: AppState) => {
    setState(newState);
  };

  // Quản lý tài liệu nguồn (SGK, SGV, SBT)
  const handleAddDocument = (newDoc: SourceDocument) => {
    // Khi thêm tài liệu mới, tự động tái tạo nội dung KHBD, Slide và Đề thi dựa trên tài liệu này
    const { khbd, slides, exam } = getCurriculumForDocument(newDoc, state.teacherProfile);
    setState(prev => ({
      ...prev,
      sourceDocuments: [newDoc, ...prev.sourceDocuments],
      activeDocumentId: newDoc.id,
      khbd,
      slides,
      exam,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleDeleteDocument = (id: string) => {
    setState(prev => ({
      ...prev,
      sourceDocuments: prev.sourceDocuments.filter(d => d.id !== id),
      activeDocumentId: prev.activeDocumentId === id ? prev.sourceDocuments[0]?.id : prev.activeDocumentId,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Chọn tài liệu -> ĐỒNG BỘ TOÀN BỘ KHBD, SLIDES, ĐỀ THI THEO TÀI LIỆU ĐÓ!
  const handleSelectDocument = (doc: SourceDocument) => {
    const { khbd, slides, exam } = getCurriculumForDocument(doc, state.teacherProfile);
    setState(prev => ({
      ...prev,
      activeDocumentId: doc.id,
      khbd,
      slides,
      exam,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Khởi tạo bài dạy / chuyển phân hệ từ tài liệu nguồn vừa nạp
  const handleLaunchGenerate = (doc: SourceDocument, targetSubsystem: 'khbd' | 'slide' | 'exam') => {
    const { khbd, slides, exam } = getCurriculumForDocument(doc, state.teacherProfile);
    setState(prev => ({
      ...prev,
      activeDocumentId: doc.id,
      khbd,
      slides,
      exam,
      currentSubsystem: targetSubsystem,
      lastUpdated: new Date().toISOString()
    }));
    setIsMobileSidebarOpen(false);
  };

  // Chọn bài dạy cụ thể trong file sách / mục lục
  const handleSelectLessonInDocument = (doc: SourceDocument, lesson: DocumentLessonItem) => {
    const updatedDoc: SourceDocument = {
      ...doc,
      lessonOrChapter: lesson.title,
      selectedLessonId: lesson.id,
      extractedObjectives: lesson.objectives,
      extractedKeyKnowledge: lesson.keyKnowledge,
      extractedExercises: lesson.exercises
    };

    const updatedDocs = state.sourceDocuments.map(d => d.id === doc.id ? updatedDoc : d);
    const { khbd, slides, exam } = getCurriculumForDocument(updatedDoc, state.teacherProfile);

    setState(prev => ({
      ...prev,
      sourceDocuments: updatedDocs,
      activeDocumentId: doc.id,
      khbd,
      slides,
      exam,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Điều chỉnh / chọn lại khối lớp cho cuốn sách
  const handleUpdateDocumentGrade = (docId: string, newGrade: string) => {
    const targetDoc = state.sourceDocuments.find(d => d.id === docId);
    if (!targetDoc) return;

    const newToc = generateTableOfContentsForBook(targetDoc.subject, newGrade, targetDoc.textbook);
    const firstLesson = newToc[0];

    const updatedDoc: SourceDocument = {
      ...targetDoc,
      grade: newGrade,
      tableOfContents: newToc,
      lessonOrChapter: firstLesson ? firstLesson.title : targetDoc.lessonOrChapter,
      selectedLessonId: firstLesson?.id,
      extractedObjectives: firstLesson?.objectives,
      extractedKeyKnowledge: firstLesson?.keyKnowledge,
      extractedExercises: firstLesson?.exercises
    };

    const updatedDocs = state.sourceDocuments.map(d => d.id === docId ? updatedDoc : d);
    const { khbd, slides, exam } = getCurriculumForDocument(updatedDoc, state.teacherProfile);

    setState(prev => ({
      ...prev,
      sourceDocuments: updatedDocs,
      activeDocumentId: docId,
      khbd,
      slides,
      exam,
      lastUpdated: new Date().toISOString()
    }));
  };

  // Tái tạo lại KHBD, Slide và Đề thi từ tài liệu nguồn đang kích hoạt
  const handleRegenerateFromActiveDoc = () => {
    const activeDoc = state.sourceDocuments.find(d => d.id === state.activeDocumentId) || state.sourceDocuments[0];
    if (activeDoc) {
      handleSelectDocument(activeDoc);
    } else {
      const { khbd, slides, exam } = getCurriculumForLesson(
        state.khbd.header.subjectName,
        state.khbd.header.grade,
        state.khbd.header.lessonTitle,
        state.khbd.header.textbook,
        state.teacherProfile
      );
      setState(prev => ({
        ...prev,
        khbd,
        slides,
        exam,
        lastUpdated: new Date().toISOString()
      }));
    }
  };

  const handleConvertKhbdToSlides = () => {
    const newSlides: SlideItem[] = [
      {
        id: 'slide-cover',
        slideNumber: 1,
        title: state.khbd.header.lessonTitle,
        phase: 'Khởi động',
        bulletPoints: [
          `Môn học: ${state.khbd.header.subjectName} - ${state.khbd.header.grade}`,
          `Bộ sách: ${state.khbd.header.textbook || 'Kết Nối Tri Thức'}`,
          `Thời lượng: ${state.khbd.header.durationPeriods} tiết · Giáo viên: ${state.khbd.header.teacherName}`,
        ],
        highlightBox: {
          type: 'definition',
          title: 'Mục tiêu trọng tâm',
          content: state.khbd.generalObjectives.knowledge[0] || 'Nắm vững kiến thức trọng tâm của bài học.'
        },
        teacherNotes: 'Chiếu slide mở đầu và giới thiệu mục tiêu bài học trong 2 phút.',
        timerMinutes: 2
      },
      ...state.khbd.activities.map((act, idx) => ({
        id: `slide-act-${act.id}`,
        slideNumber: idx + 2,
        title: act.title,
        phase: (act.number === 1 ? 'Khởi động' : act.number === 2 ? 'Kiến thức mới' : act.number === 3 ? 'Luyện tập' : 'Vận dụng') as any,
        bulletPoints: [
          `Mục tiêu: ${act.objectives}`,
          `Nội dung: ${act.content}`,
          `Sản phẩm: ${act.product}`,
        ],
        highlightBox: {
          type: (act.number === 1 ? 'question' : act.number === 2 ? 'formula' : act.number === 3 ? 'task' : 'definition') as any,
          title: act.number === 2 ? 'Khắc sâu kiến thức trọng tâm' : act.number === 3 ? 'Thử thách luyện tập' : 'Nhiệm vụ hoạt động',
          content: act.steps[0]?.teacherAction || act.content
        },
        teacherNotes: `Hoạt động ${act.number}: ${act.steps[0]?.teacherAction || ''}. GV hỗ trợ HS thảo luận.`,
        timerMinutes: parseInt(act.timeEstimate) || 5
      }))
    ];
    handleUpdateSlides(newSlides);
    handleSubsystemChange('slide');
  };

  const handleResetData = () => {
    if (window.confirm('Khôi phục toàn bộ dữ liệu mặc định hệ thống?')) {
      setState(initialAppState);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A] font-['Be_Vietnam_Pro',sans-serif]">
      {/* 1. TOPBAR CỐ ĐỊNH */}
      <Topbar
        header={state.khbd.header}
        teacherProfile={state.teacherProfile}
        currentSubsystem={state.currentSubsystem}
        onSubsystemChange={handleSubsystemChange}
        onUpdateHeader={handleUpdateHeader}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onDownloadOffline={() => exportSingleFileHtml(state)}
        onOpenMusicToolbox={() => setIsMusicToolboxOpen(true)}
      />

      {/* Mobile Drawer Toggle Sub-bar */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-2 flex items-center justify-between border-b border-slate-800 text-xs">
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="flex items-center gap-1.5 font-semibold text-blue-400"
        >
          {isMobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Chế độ: {
            state.currentSubsystem === 'upload' ? 'Tủ Sách & Nạp Tài Liệu' :
            state.currentSubsystem === 'khbd' ? 'Soạn KHBD 5512' :
            state.currentSubsystem === 'slide' ? 'Trình Chiếu Slide' : 'Ngân Hàng Đề Thi 7991'
          }</span>
        </button>
        <span className="text-[11px] text-slate-400">
          {state.khbd.header.subjectName} · {state.khbd.header.grade}
        </span>
      </div>

      {/* 2. KHUNG SPLIT-PANE Ở GIỮA */}
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
        {/* SIDEBAR BÊN TRÁI 380px: 4 CHẾ ĐỘ ĐIỀU HƯỚNG */}
        <div className={`
          fixed inset-y-0 left-0 top-16 z-30 transition-transform duration-300 md:relative md:top-0 md:translate-x-0
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <Sidebar
            state={state}
            onSubsystemChange={handleSubsystemChange}
            onUpdateHeader={handleUpdateHeader}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenJsonModal={() => setIsJsonModalOpen(true)}
            onStartPresentation={() => setIsPresentationOpen(true)}
            onResetData={handleResetData}
            onOpenMusicToolbox={() => setIsMusicToolboxOpen(true)}
          />
        </div>

        {/* Backdrop for mobile */}
        {isMobileSidebarOpen && (
          <div 
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 top-16 bg-black/50 z-20 md:hidden"
          />
        )}

        {/* VISUAL WORKSPACE BÊN PHẢI (CO GIÃN LINH HOẠT - SẴN SÀNG NẠP CÁC MODULE CON) */}
        <main className="flex-1 h-full overflow-y-auto p-4 md:p-8 bg-[#F8FAFC]">
          {/* Breadcrumb trạng thái & module con */}
          <div className="max-w-6xl mx-auto mb-4 flex flex-col md:flex-row md:items-center justify-between gap-3 no-print">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Quy trình:</span>
              <span>/</span>
              <span className="font-bold text-blue-600 uppercase">
                {state.currentSubsystem === 'upload' && 'BƯỚC 1: TỦ SÁCH SƯ PHẠM & NẠP TÀI LIỆU NGUỒN (SGK - SGV - SBT)'}
                {state.currentSubsystem === 'khbd' && 'BƯỚC 2: SOẠN KHBD 5512 (BẢNG TIẾN TRÌNH 4 HOẠT ĐỘNG)'}
                {state.currentSubsystem === 'slide' && 'BƯỚC 3: TRÌNH CHIẾU SLIDE BÀI GIẢNG SƯ PHẠM (16:9 DECK)'}
                {state.currentSubsystem === 'exam' && 'BƯỚC 4: NGÂN HÀNG ĐỀ THI ĐỊNH KỲ 7991 (4 PHẦN ĐỘC LẬP - 10.0Đ)'}
              </span>
              <span className="hidden md:inline text-slate-400">
                · [{state.khbd.header.subjectName} · {state.khbd.header.grade} · {state.khbd.header.textbook || 'Kết Nối Tri Thức'}]
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="text-xs bg-white hover:bg-slate-50 border border-slate-200 px-2.5 py-1 rounded text-slate-700 font-medium flex items-center gap-1 shadow-2xs"
              >
                <span>Hồ sơ: <b>{state.teacherProfile.fullName}</b></span>
              </button>
              <button
                onClick={() => setIsJsonModalOpen(true)}
                className="text-xs bg-white hover:bg-slate-50 border border-slate-200 px-2.5 py-1 rounded text-slate-700 font-medium flex items-center gap-1 shadow-2xs"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Bàn giao JSON</span>
              </button>
            </div>
          </div>

          {/* Banner thông báo tài liệu nguồn đang được dùng để sinh KHBD/Slide/Đề thi */}
          {state.currentSubsystem !== 'upload' && (
            <div className="max-w-6xl mx-auto mb-6 p-3 bg-white rounded-xl border border-blue-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 no-print">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-slate-500">Nội dung sinh dựa trên:</span>
                <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 max-w-md truncate">
                  {state.sourceDocuments.find(d => d.id === state.activeDocumentId)?.title || state.khbd.header.lessonTitle}
                </span>
                <span className="text-slate-500 hidden sm:inline">
                  (Môn <b>{state.khbd.header.subjectName}</b> - <b>{state.khbd.header.grade}</b>)
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setQuickPickerGrade(state.khbd.header.grade);
                    setQuickPickerSearch('');
                    setIsQuickLessonPickerOpen(true);
                  }}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                  title="Đổi nhanh khối lớp hoặc bài dạy trong sách"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Đổi Khối Lớp / Bài Dạy</span>
                </button>
                <button
                  onClick={handleRegenerateFromActiveDoc}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  title="Tái tạo lại nội dung bài dạy từ tài liệu nguồn đã chọn"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-blue-600" />
                  <span>Tái tạo theo sách này</span>
                </button>
                <button
                  onClick={() => handleSubsystemChange('upload')}
                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs rounded-lg border border-blue-200 transition-colors flex items-center gap-1.5"
                  title="Chọn cuốn sách khác hoặc tải sách mới lên"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Đổi sách khác</span>
                </button>
              </div>
            </div>
          )}

          {/* Module 0: Tủ Sách & Nạp Tài Liệu Nguồn (SGK, SGV, SBT) */}
          {state.currentSubsystem === 'upload' && (
            <div className="animate-in fade-in duration-150">
              <UploadSourceWorkspace
                teacherProfile={state.teacherProfile}
                sourceDocuments={state.sourceDocuments}
                activeDocumentId={state.activeDocumentId}
                cloudSaves={state.cloudSaves}
                onAddDocument={handleAddDocument}
                onDeleteDocument={handleDeleteDocument}
                onSelectDocument={handleSelectDocument}
                onSelectLessonInDocument={handleSelectLessonInDocument}
                onUpdateDocumentGrade={handleUpdateDocumentGrade}
                onLaunchGenerate={handleLaunchGenerate}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
            </div>
          )}

          {/* Module con 1: KHBD 5512 */}
          {state.currentSubsystem === 'khbd' && (
            <div className="animate-in fade-in duration-150">
              <KhbdWorkspace
                khbd={state.khbd}
                onUpdateKhbd={handleUpdateKhbd}
                onConvertToSlides={handleConvertKhbdToSlides}
                onOpenMusicToolbox={() => setIsMusicToolboxOpen(true)}
              />
            </div>
          )}

          {/* Module con 2: Slide Bài Giảng */}
          {state.currentSubsystem === 'slide' && (
            <div className="animate-in fade-in duration-150">
              <SlideWorkspace
                slides={state.slides}
                onUpdateSlides={handleUpdateSlides}
                onStartPresentation={() => setIsPresentationOpen(true)}
                onConvertToSlides={handleConvertKhbdToSlides}
                onOpenMusicToolbox={() => setIsMusicToolboxOpen(true)}
              />
            </div>
          )}

          {/* Module con 3: Đề Thi 7991 */}
          {state.currentSubsystem === 'exam' && (
            <div className="animate-in fade-in duration-150">
              <ExamWorkspace
                exam={state.exam}
                onUpdateExam={handleUpdateExam}
              />
            </div>
          )}
        </main>
      </div>

      {/* FLOATING MUSIC TEACHER ASSISTANT DOCK */}
      <aside aria-label="Music Assistant" className="fixed bottom-4 right-4 z-40 flex items-center gap-1.5 bg-[#0B0F19]/95 backdrop-blur-md text-white p-2 rounded-2xl border border-amber-500/40 shadow-2xl no-print">
        <button
          type="button"
          onClick={() => setIsMusicToolboxOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 group"
          title="Mở Phòng Nhạc Cụ: Đàn phím lấy cao độ, Máy gõ nhịp Metronome, Nhạc cụ gõ & Thế bấm Recorder"
        >
          <span className="text-base group-hover:scale-110 transition-transform">𝄞</span>
          <span className="hidden sm:inline">Phòng Nhạc Cụ</span>
          <span className="sm:hidden font-bold">Nhạc Cụ</span>
        </button>

        <div className="h-6 w-[1px] bg-slate-800 hidden sm:block"></div>

        {/* Quick Pitch Tone Buttons */}
        <div className="hidden sm:flex items-center gap-1">
          <button
            type="button"
            onClick={() => playTone(261.63, 0.9)}
            className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-white rounded-lg border border-slate-700 font-bold text-[11px] transition-colors"
            title="Lấy cao độ nốt Đô (C4 - 262Hz)"
          >
            Đô (C4)
          </button>
          <button
            type="button"
            onClick={() => playTone(392.00, 0.9)}
            className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-amber-300 hover:text-white rounded-lg border border-slate-700 font-bold text-[11px] transition-colors"
            title="Lấy cao độ nốt Son (G4 - 392Hz)"
          >
            Son (G4)
          </button>
          <button
            type="button"
            onClick={() => playTone(440.00, 1.0)}
            className="px-2.5 py-1 bg-blue-950 hover:bg-blue-900 text-blue-200 hover:text-white rounded-lg border border-blue-600/60 font-bold text-[11px] transition-colors"
            title="Lấy cao độ nốt La chuẩn quốc tế (A4 - 440Hz)"
          >
            La 440Hz
          </button>
        </div>
      </aside>

      {/* HỘP CÔNG CỤ ÂM NHẠC & PHÒNG NHẠC CỤ TRỰC TIẾP */}
      <MusicToolboxModal
        isOpen={isMusicToolboxOpen}
        onClose={() => setIsMusicToolboxOpen(false)}
        currentGrade={state.khbd.header.grade}
        currentLesson={state.khbd.header.lessonTitle}
      />

      {/* SETTINGS MODAL CHO GIÁO VIÊN */}
      <SettingsModal
        profile={state.teacherProfile}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSaveProfile={handleSaveTeacherProfile}
      />

      {/* FULLSCREEN PRESENTATION MODAL */}
      {isPresentationOpen && (
        <PresentationModal
          slides={state.slides}
          onClose={() => setIsPresentationOpen(false)}
        />
      )}

      {/* JSON STATE HANDOFF MODAL */}
      {isJsonModalOpen && (
        <JsonStateModal
          state={state}
          onClose={() => setIsJsonModalOpen(false)}
          onImportState={handleImportState}
        />
      )}

      {/* MODAL CHỌN NHANH KHỐI LỚP & BÀI DẠY TRONG SÁCH */}
      {isQuickLessonPickerOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 text-xs max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 shrink-0">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Đổi Nhanh Khối Lớp & Bài Dạy Trong Sách
                  </h3>
                  <div className="text-[11px] text-slate-500">
                    Môn <b>{state.khbd.header.subjectName}</b> · Bộ sách <b>{state.khbd.header.textbook || 'Kết Nối Tri Thức'}</b>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsQuickLessonPickerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. CHỌN KHỐI LỚP (LỚP 6 ĐẾN LỚP 12) */}
            <div className="space-y-1.5 shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between font-bold text-slate-800 text-xs">
                <span>1. Chọn Khối Lớp:</span>
                <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded text-[11px]">
                  Đang chọn: {quickPickerGrade}
                </span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 pt-1">
                {['LỚP 6', 'LỚP 7', 'LỚP 8', 'LỚP 9', 'LỚP 10', 'LỚP 11', 'LỚP 12'].map((g) => {
                  const isSel = quickPickerGrade === g;
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setQuickPickerGrade(g)}
                      className={`py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        isSel
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs ring-2 ring-blue-300'
                          : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. TÌM KIẾM BÀI DẠY */}
            <div className="relative shrink-0">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={quickPickerSearch}
                onChange={(e) => setQuickPickerSearch(e.target.value)}
                placeholder="🔍 Tìm kiếm bài dạy theo tên bài, chủ đề trong khối lớp này..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 3. DANH SÁCH BÀI DẠY */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px]">
              {(() => {
                const lessons = generateTableOfContentsForBook(
                  state.khbd.header.subjectName,
                  quickPickerGrade,
                  state.khbd.header.textbook
                );
                const filtered = quickPickerSearch.trim()
                  ? lessons.filter(l => 
                      l.title.toLowerCase().includes(quickPickerSearch.toLowerCase()) || 
                      l.chapterOrTopic.toLowerCase().includes(quickPickerSearch.toLowerCase())
                    )
                  : lessons;

                if (filtered.length === 0) {
                  return (
                    <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-xl">
                      Không tìm thấy bài học phù hợp.
                    </div>
                  );
                }

                return filtered.map((les) => {
                  const isCurrent = state.khbd.header.lessonTitle === les.title;
                  return (
                    <div
                      key={les.id}
                      onClick={() => {
                        const targetDoc = state.sourceDocuments.find(d => 
                          d.subject.toLowerCase() === state.khbd.header.subjectName.toLowerCase() && 
                          d.grade.toLowerCase() === quickPickerGrade.toLowerCase()
                        ) || state.sourceDocuments.find(d => d.id === state.activeDocumentId);

                        if (targetDoc) {
                          const docForGrade = targetDoc.grade === quickPickerGrade 
                            ? targetDoc 
                            : { ...targetDoc, grade: quickPickerGrade };
                          handleSelectLessonInDocument(docForGrade, les);
                        } else {
                          const { khbd, slides, exam } = getCurriculumForLesson(
                            state.khbd.header.subjectName,
                            quickPickerGrade,
                            les.title,
                            'Kết Nối Tri Thức',
                            state.teacherProfile
                          );
                          setState(prev => ({
                            ...prev,
                            khbd,
                            slides,
                            exam,
                            lastUpdated: new Date().toISOString()
                          }));
                        }
                        setIsQuickLessonPickerOpen(false);
                      }}
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
                            Đang mở
                          </span>
                        ) : (
                          <span className="shrink-0 text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-semibold hover:bg-blue-100">
                            Bấm để chọn
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                        <span>{les.chapterOrTopic}</span>
                        <span>·</span>
                        <span className="text-emerald-700 truncate">{les.objectives[0]}</span>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* FOOTER MODAL */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500">
                Bấm vào bất kỳ bài học nào để hệ thống tự động tái sinh toàn bộ KHBD 5512, Slide 16:9 và Đề thi 7991.
              </span>
              <button
                type="button"
                onClick={() => setIsQuickLessonPickerOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
