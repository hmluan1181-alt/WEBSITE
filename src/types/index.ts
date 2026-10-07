export type AppSubsystem = 'upload' | 'khbd' | 'slide' | 'exam';

export interface TeacherProfile {
  fullName: string;
  subject: string;
  schoolName: string;
  departmentName: string;
  defaultGrade: string;
  defaultTextbook: string;
  academicYear: string;
  email?: string;
  phoneNumber?: string;
  notes?: string;
}

export interface DocumentLessonItem {
  id: string;
  lessonNumber: number;
  title: string;
  chapterOrTopic: string;
  periodDuration?: number;
  page?: string;
  objectives: string[];
  keyKnowledge: string[];
  exercises: string[];
}

export interface SourceDocument {
  id: string;
  title: string;
  category: 'SGK' | 'SGV' | 'SBT' | 'TAI_LIEU_KHAC'; // Sách giáo khoa, Sách giáo viên, Sách bài tập, Khác
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  subject: string;
  grade: string;
  textbook: string;
  lessonOrChapter: string;
  extractedText: string;
  extractedObjectives?: string[];
  extractedKeyKnowledge?: string[];
  extractedExercises?: string[];
  tableOfContents?: DocumentLessonItem[]; // Danh mục/Mục lục các bài dạy trong sách
  selectedLessonId?: string; // ID bài học đang được chọn trong sách
  cloudSynced: boolean;
}

export interface CloudSaveItem {
  id: string;
  title: string;
  subject: string;
  grade: string;
  teacherName: string;
  schoolName: string;
  savedAt: string;
  itemType: 'KHBD' | 'SLIDE' | 'EXAM' | 'FULL_PACKAGE';
  hasWordDoc: boolean;
  hasPptSlide: boolean;
  hasPdf: boolean;
}

export interface PedagogicalHeader {
  schoolName: string;
  departmentName: string;
  teacherName: string;
  subjectName: string;
  grade: string;
  className: string;
  academicYear: string;
  textbook: 'Kết Nối Tri Thức' | string;
  lessonTitle: string;
  durationPeriods: number;
  examTitle: string;
  examDurationMinutes: number;
}

// KHBD (Công văn 5512)
export interface ActivityStep {
  name: string; // Bước 1: Chuyển giao nhiệm vụ, Bước 2: Thực hiện nhiệm vụ, Bước 3: Báo cáo thảo luận, Bước 4: Kết luận nhận định
  teacherAction: string;
  studentAction: string;
}

export interface TeachingActivity {
  id: string;
  number: 1 | 2 | 3 | 4;
  title: string; // 1. Khởi động / Mở đầu; 2. Hình thành kiến thức; 3. Luyện tập; 4. Vận dụng
  timeEstimate: string;
  objectives: string; // Mục tiêu
  content: string;    // Nội dung
  product: string;    // Sản phẩm
  steps: ActivityStep[]; // Tổ chức thực hiện (4 bước)
}

export interface LessonPlan5512 {
  header: PedagogicalHeader;
  generalObjectives: {
    knowledge: string[];
    coreCompetencies: string[]; // Năng lực chung (tự chủ, giao tiếp, sáng tạo)
    subjectCompetencies: string[]; // Năng lực đặc thù môn học
    qualities: string[]; // Phẩm chất (yêu nước, chăm chỉ, trung thực, trách nhiệm)
  };
  teachingEquipment: {
    teacher: string[];
    students: string[];
    digitalAssets: string[];
  };
  activities: TeachingActivity[];
  notes: string;
}

// Slide trình chiếu
export interface SlideItem {
  id: string;
  slideNumber: number;
  title: string;
  phase: 'Khởi động' | 'Kiến thức mới' | 'Luyện tập' | 'Vận dụng' | 'Tổng kết';
  bulletPoints: string[];
  highlightBox?: {
    type: 'definition' | 'formula' | 'question' | 'task';
    title: string;
    content: string;
  };
  teacherNotes: string;
  timerMinutes?: number;
}

// Đề kiểm tra (Công văn 7991)
export type CognitiveLevel = 'NB' | 'TH' | 'VD'; // Nhận biết (40%), Thông hiểu (30%), Vận dụng (30%)

export interface MultipleChoiceQuestion {
  id: string;
  number: number;
  content: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  score: number; // Thường là 0.25đ
  level: CognitiveLevel;
  topic: string;
  explanation: string;
}

export interface TrueFalseItem {
  id: string;
  number: number;
  stem: string; // Đoạn tư liệu / Bài toán dẫn đề
  statements: {
    key: 'a' | 'b' | 'c' | 'd';
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  score: number; // 1.0 điểm cho toàn câu (0.1 / 0.25 / 0.5 / 1.0)
  level: CognitiveLevel;
  topic: string;
}

export interface ShortAnswerQuestion {
  id: string;
  number: number;
  content: string;
  correctAnswer: string;
  unit?: string;
  score: number; // Thường là 0.5đ
  level: CognitiveLevel;
  topic: string;
  explanation: string;
}

export interface EssayQuestion {
  id: string;
  number: number;
  content: string;
  criteria: {
    step: string;
    score: number;
  }[];
  totalScore: number; // Thường là 1.0 - 1.5đ
  level: CognitiveLevel;
  topic: string;
}

export interface ExamMatrixRow {
  topic: string;
  content: string;
  partI: { nb: number; th: number; vd: number };   // Số câu TN 4 phương án
  partII: { nb: number; th: number; vd: number };  // Số ý hoặc câu Đúng/Sai
  partIII: { nb: number; th: number; vd: number }; // Số câu Trả lời ngắn
  partIV: { nb: number; th: number; vd: number };  // Số câu Tự luận
  totalScore: number;
  percentage: number;
}

export interface ExamSpecificationRow {
  topic: string;
  content: string;
  competencyRequired: string; // Yêu cầu cần đạt
  levels: {
    nb: string;
    th: string;
    vd: string;
  };
  questionDistribution: string; // Số câu hỏi & dạng thức
}

export interface Exam7991 {
  header: PedagogicalHeader;
  summary: {
    totalPoints: number; // Barem tổng 10.0
    partIPoints: number; // 3.0 điểm
    partIIPoints: number; // 2.0 điểm
    partIIIPoints: number; // 2.0 điểm
    partIVPoints: number; // 3.0 điểm
    ratio: {
      nb: number; // 40% (4.0 đ)
      th: number; // 30% (3.0 đ)
      vd: number; // 30% (3.0 đ)
    };
  };
  partI: MultipleChoiceQuestion[];
  partII: TrueFalseItem[];
  partIII: ShortAnswerQuestion[];
  partIV: EssayQuestion[];
  matrix: ExamMatrixRow[];
  specifications: ExamSpecificationRow[];
}

export interface AppState {
  version: string;
  lastUpdated: string;
  currentSubsystem: AppSubsystem;
  teacherProfile: TeacherProfile;
  sourceDocuments: SourceDocument[];
  activeDocumentId?: string;
  cloudSaves: CloudSaveItem[];
  khbd: LessonPlan5512;
  slides: SlideItem[];
  exam: Exam7991;
}
