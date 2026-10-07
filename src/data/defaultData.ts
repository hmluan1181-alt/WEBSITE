import { AppState, TeacherProfile, SourceDocument, CloudSaveItem } from '../types';
import { 
  music6LessonPlan, 
  music6Slides, 
  music6Exam,
  math12LessonPlan,
  math12Slides,
  generateTableOfContentsForBook
} from '../utils/curriculumGenerator';

export const defaultTeacherProfile: TeacherProfile = {
  fullName: 'Nguyễn Thị Duyên Thanh',
  subject: 'Âm Nhạc',
  schoolName: 'Trường THCS Long Hồ',
  departmentName: 'Tổ Nghệ Thuật (Âm Nhạc - Mỹ Thuật)',
  defaultGrade: 'LỚP 6',
  defaultTextbook: 'Kết Nối Tri Thức',
  academicYear: '2024 - 2025',
  email: 'duyenthanh.thcslongho@edu.vn',
  phoneNumber: '0988.668.789',
  notes: 'Giáo viên bộ môn Âm Nhạc bậc THCS. Giảng dạy theo chương trình GDPT 2018 định hướng phát triển phẩm chất và năng lực thẩm mỹ âm nhạc cho học sinh.'
};

export const defaultSourceDocuments: SourceDocument[] = [
  {
    id: 'doc-sgk-music-6',
    title: 'Sách Giáo Khoa Âm Nhạc 6 (Tập 1)',
    category: 'SGK',
    fileName: 'SGK_AmNhac_6_KetNoiTriThuc.pdf',
    fileSize: '14.8 MB',
    uploadedAt: '2025-09-05 08:30',
    subject: 'Âm Nhạc',
    grade: 'LỚP 6',
    textbook: 'Kết Nối Tri Thức',
    lessonOrChapter: 'Chủ đề 1: Con đường học trò (Tiết 1 - Học hát & Nhạc cụ gõ)',
    extractedText: 'CHỦ ĐỀ 1: CON ĐƯỜNG HỌC TRÒ\n- Bài hát: Con đường học trò (Nhạc và lời: Nguyễn Mộng Lân).\n- Tính chất âm nhạc: Vừa phải, trong sáng, tha thiết.\n- Giọng Đô trưởng, nhịp 2/4. Các nốt nhạc chính: Đô, Rê, Mi, Son, La.\n- Luyện thanh: Mẫu âm Mi - Ma theo thang âm 5 bậc.\n- Nhạc cụ tiết tấu: Sử dụng thanh phách và trống con đệm theo phách và phách mạnh.\n- Câu hỏi thảo luận: Bài hát gợi cho em cảm xúc gì về mái trường và thầy cô?',
    extractedObjectives: [
      'Hát đúng cao độ, trường độ bài hát Con đường học trò.',
      'Biết hát kết hợp gõ đệm theo nhịp và phách bằng thanh phách hoặc nhạc cụ tự tạo.',
      'Cảm nhận được giai điệu tươi vui, bồi dưỡng tình cảm gắn bó với mái trường, thầy cô.'
    ],
    extractedKeyKnowledge: [
      'Kiến thức bài hát: Nhịp 2/4, sắc thái vừa phải, trong sáng.',
      'Kỹ thuật xướng âm: Đô - Rê - Mi - Son - La.',
      'Kỹ năng gõ đệm tiết tấu: Phách mạnh, phách nhẹ.'
    ],
    extractedExercises: [
      '1. Hát kết hợp gõ đệm theo hình tiết tấu (Đơn - Đơn - Đen).',
      '2. Biểu diễn bài hát theo hình thức đơn ca, song ca kết hợp động tác phụ họa.',
      '3. Tìm các hình ảnh đẹp về mái trường trong lời ca bài hát.'
    ],
    tableOfContents: generateTableOfContentsForBook('Âm Nhạc', 'LỚP 6', 'Kết Nối Tri Thức'),
    selectedLessonId: 'music6-les-1',
    cloudSynced: true
  },
  {
    id: 'doc-sgv-music-6',
    title: 'Sách Giáo Viên Âm Nhạc 6 - Hướng Dẫn Sư Phạm',
    category: 'SGV',
    fileName: 'SGV_AmNhac_6_KetNoiTriThuc.docx',
    fileSize: '8.4 MB',
    uploadedAt: '2025-09-05 08:45',
    subject: 'Âm Nhạc',
    grade: 'LỚP 6',
    textbook: 'Kết Nối Tri Thức',
    lessonOrChapter: 'Chủ đề 1: Con đường học trò - Tiết 1: Học hát bài Con đường học trò',
    extractedText: 'HƯỚNG DẪN SƯ PHẠM THEO CÔNG VĂN 5512/BGDĐT-GDTrH\n1. Hoạt động Khởi động: Cho học sinh nghe đoạn trích âm thanh tiếng trống trường và một đoạn nhạc vui tươi để tạo tâm thế hứng khởi.\n2. Hoạt động Hình thành kiến thức: Hướng dẫn học sinh đọc lời ca theo tiết tấu; tập hát từng câu theo lối móc xích; giáo viên đàn giai điệu mẫu.\n3. Hoạt động Luyện tập: Chia nhóm luyện tập hát đồng ca, gõ đệm thanh phách, kiểm tra cao độ nốt nhạc.\n4. Hoạt động Vận dụng: Khuyến khích học sinh sáng tạo động tác vận động cơ thể (body percussion) đệm cho bài hát.',
    extractedObjectives: [
      'Phát triển năng lực thể hiện âm nhạc qua giọng hát và nhạc cụ gõ.',
      'Phát triển năng lực cảm thụ và hiểu biết âm nhạc qua giai điệu và ca từ.',
      'Phát triển năng lực ứng dụng và sáng tạo âm nhạc qua vận động cơ thể.'
    ],
    extractedKeyKnowledge: [
      'Phương pháp dạy hát móc xích từng câu kết hợp đàn phím điện tử.',
      'Kỹ thuật gõ đệm tiết tấu cơ bản bằng thanh phách và song loan.',
      'Tiêu chuẩn đánh giá năng lực âm nhạc theo Thông tư 22/BGDĐT.'
    ],
    tableOfContents: generateTableOfContentsForBook('Âm Nhạc', 'LỚP 6', 'Kết Nối Tri Thức'),
    selectedLessonId: 'music6-les-1',
    cloudSynced: true
  },
  {
    id: 'doc-sbt-music-6',
    title: 'Sách Bài Tập Âm Nhạc 6 (Bài Tập Thực Hành & Trắc Nghiệm)',
    category: 'SBT',
    fileName: 'SBT_AmNhac_6_KetNoiTriThuc.pdf',
    fileSize: '5.2 MB',
    uploadedAt: '2025-09-06 14:10',
    subject: 'Âm Nhạc',
    grade: 'LỚP 6',
    textbook: 'Kết Nối Tri Thức',
    lessonOrChapter: 'Chủ đề 1: Con đường học trò - Tiết 1: Học hát bài Con đường học trò',
    extractedText: 'BÀI TẬP THỰC HÀNH VÀ ĐÁNH GIÁ NĂNG LỰC ÂM NHẠC 6\n- Câu hỏi trắc nghiệm nhiều lựa chọn về tác giả, tính chất nhịp 2/4.\n- Bài tập Đúng/Sai về kỹ thuật lấy hơi và tư thế khi hát.\n- Bài tập trả lời ngắn về tên các nốt nhạc trên khuông nhạc khóa Sol.\n- Bài tập tự luận cảm thụ vẻ đẹp giai điệu âm nhạc.',
    extractedExercises: [
      'Bài 1: Chọn đáp án đúng: Bài hát Con đường học trò được viết ở nhịp nào? (A. Nhịp 2/4; B. Nhịp 3/4; C. Nhịp 4/4; D. Nhịp 6/8).',
      'Bài 2: Đúng hay Sai: Tư thế hát chuẩn là ngồi thẳng lưng, thả lỏng vai, lấy hơi bằng bụng.',
      'Bài 3: Điền tên nốt nhạc còn thiếu vào chỗ trống trên khuông nhạc.',
      'Bài 4: Viết đoạn văn ngắn 3-5 câu nêu cảm nhận của em sau khi học xong bài hát.'
    ],
    tableOfContents: generateTableOfContentsForBook('Âm Nhạc', 'LỚP 6', 'Kết Nối Tri Thức'),
    selectedLessonId: 'music6-les-1',
    cloudSynced: true
  },
  {
    id: 'doc-sgk-music-7',
    title: 'Sách Giáo Khoa Âm Nhạc 7 (Trọn bộ 8 Chủ đề)',
    category: 'SGK',
    fileName: 'SGK_AmNhac_7_KetNoiTriThuc.pdf',
    fileSize: '16.2 MB',
    uploadedAt: '2025-09-05 09:00',
    subject: 'Âm Nhạc',
    grade: 'LỚP 7',
    textbook: 'Kết Nối Tri Thức',
    lessonOrChapter: 'Chủ đề 1: Vui bước đến trường - Tiết 1: Học hát bài Khai trường',
    extractedText: 'CHỦ ĐỀ 1: VUI BƯỚC ĐẾN TRƯỜNG\n- Bài hát: Khai trường (Nhạc và lời: Phan Trần Bảng).\n- Nhịp 2/4 rộn rã, náo nức ngày tựu trường.\n- Luyện thanh theo thang âm Đô trưởng.\n- Đọc nhạc Bài số 1 kết hợp gõ đệm tiết tấu.\n- Nhạc cụ giai điệu: Thực hành thổi kèn Recorder / bấm phím đàn Keyboard.',
    extractedObjectives: [
      'Hát đúng giai điệu, lời ca bài Khai trường (Phan Trần Bảng), nhịp 2/4 rộn rã.',
      'Cảm nhận không khí tươi vui, náo nức ngày tựu trường của học sinh THCS.',
      'Thực hành gõ đệm thanh phách và thổi kèn Recorder đúng kỹ thuật.'
    ],
    extractedKeyKnowledge: [
      'Nhịp 2/4, dấu lặng đơn, sắc thái náo nức ngày tựu trường.',
      'Kỹ thuật hát nảy âm và lấy hơi chuẩn xác.',
      'Thế bấm nốt Si, La, Son trên kèn Recorder.'
    ],
    extractedExercises: [
      'Hát kết hợp gõ đệm nhạc cụ gõ tam âm / triangle.',
      'Biểu diễn tốp ca nam nữ giao duyên.',
      'Thổi giai điệu câu nhạc 1 bằng Recorder.'
    ],
    tableOfContents: generateTableOfContentsForBook('Âm Nhạc', 'LỚP 7', 'Kết Nối Tri Thức'),
    selectedLessonId: 'music7-cd1-les1',
    cloudSynced: true
  },
  {
    id: 'doc-sgk-music-8',
    title: 'Sách Giáo Khoa Âm Nhạc 8 (Trọn bộ 8 Chủ đề)',
    category: 'SGK',
    fileName: 'SGK_AmNhac_8_KetNoiTriThuc.pdf',
    fileSize: '17.5 MB',
    uploadedAt: '2025-09-05 09:15',
    subject: 'Âm Nhạc',
    grade: 'LỚP 8',
    textbook: 'Kết Nối Tri Thức',
    lessonOrChapter: 'Chủ đề 1: Chào năm học mới - Tiết 1: Học hát bài Mùa thu ngày khai trường',
    extractedText: 'CHỦ ĐỀ 1: CHÀO NĂM HỌC MỚI\n- Bài hát: Mùa thu ngày khai trường (Nhạc và lời: Vũ Trọng Tường).\n- Nhịp 2/4, tính chất tươi vui, rộn ràng.\n- Nhạc lý: Gam trưởng, Giọng Đô trưởng & Hợp âm ba Đô trưởng (C - E - G).\n- Nhạc cụ giai điệu kèn Recorder / Kèn phím & Đọc nhạc Bài số 1.',
    extractedObjectives: [
      'Hát chính xác bài Mùa thu ngày khai trường (Vũ Trọng Tường).',
      'Thể hiện sắc thái tươi vui rộn ràng đón năm học mới của học sinh lớp 8.',
      'Nắm vững cấu tạo Gam trưởng và hợp âm ba chủ Đô trưởng.'
    ],
    extractedKeyKnowledge: [
      'Nhịp 2/4, dấu luyến âm phức tạp, sắc thái rộn rã.',
      'Gam Đô trưởng (C-dur), trục âm ba Đô - Mi - Son.',
      'Tư thế thổi kèn Recorder chuẩn và điều hòa luồng hơi.'
    ],
    extractedExercises: [
      'Hát lĩnh xướng và đồng ca kết hợp gõ đệm.',
      'Thực hành câu nhạc kèn Recorder 8 ô nhịp.',
      'Bấm hợp âm C trên kèn phím hoặc phím đàn.'
    ],
    tableOfContents: generateTableOfContentsForBook('Âm Nhạc', 'LỚP 8', 'Kết Nối Tri Thức'),
    selectedLessonId: 'music8-cd1-les1',
    cloudSynced: true
  },
  {
    id: 'doc-sgk-music-9',
    title: 'Sách Giáo Khoa Âm Nhạc 9 (Trọn bộ 8 Chủ đề)',
    category: 'SGK',
    fileName: 'SGK_AmNhac_9_KetNoiTriThuc.pdf',
    fileSize: '18.1 MB',
    uploadedAt: '2025-09-05 09:30',
    subject: 'Âm Nhạc',
    grade: 'LỚP 9',
    textbook: 'Kết Nối Tri Thức',
    lessonOrChapter: 'Chủ đề 1: Khúc ca mùa thu - Tiết 1: Học hát bài Bóng dáng một ngôi trường',
    extractedText: 'CHỦ ĐỀ 1: KHÚC CA MÙA THU\n- Bài hát: Bóng dáng một ngôi trường (Nhạc và lời: Hoàng Kỷ).\n- Tính chất hành khúc thanh niên, niềm tự hào học sinh lớp 9 cuối cấp THCS.\n- Nhạc lý: Quãng và hợp âm ba chính (Bậc I, IV, V); Giọng Son trưởng (G-dur có 1 dấu #).\n- Đọc nhạc Bài số 1 giọng Son trưởng.',
    extractedObjectives: [
      'Hát hào hùng bài hát Bóng dáng một ngôi trường (Hoàng Kỷ), thể hiện niềm tự hào học sinh lớp 9.',
      'Khắc ghi hình ảnh mái trường thân yêu nơi nuôi dưỡng ước mơ.',
      'Nắm vững hệ thống hợp âm ba chính và đọc nhạc Bài số 1 giọng Son trưởng.'
    ],
    extractedKeyKnowledge: [
      'Nhịp 2/4, sắc thái hành khúc thanh niên, kỹ thuật mở rộng âm vực.',
      'Gam Son trưởng có âm chủ là Son, hóa biểu có nốt Pha thăng (F#).',
      'Ba hợp âm chính trong giọng Son trưởng: G (I), C (IV), D (V).'
    ],
    extractedExercises: [
      'Hát kết hợp vận động đội hình hành tiến.',
      'Bấm hợp âm G, C, D trên phím đàn Keyboard.',
      'Đọc Bài đọc nhạc số 1 đúng cao độ F#.'
    ],
    tableOfContents: generateTableOfContentsForBook('Âm Nhạc', 'LỚP 9', 'Kết Nối Tri Thức'),
    selectedLessonId: 'music9-cd1-les1',
    cloudSynced: true
  },
  {
    id: 'doc-sgk-math-12',
    title: 'Sách Giáo Khoa Toán 12 (Tập 1) - Giải Tích',
    category: 'SGK',
    fileName: 'SGK_Toan_12_Tap1_KetNoiTriThuc.pdf',
    fileSize: '22.5 MB',
    uploadedAt: '2025-09-01 10:00',
    subject: 'Toán Học',
    grade: 'LỚP 12',
    textbook: 'Kết Nối Tri Thức',
    lessonOrChapter: 'Bài 3: Khảo sát và vẽ đồ thị của hàm số (Tiết 1 & 2)',
    extractedText: 'BÀI 3: KHẢO SÁT VÀ VẼ ĐỒ THỊ CỦA HÀM SỐ\n1. Sơ đồ khảo sát hàm số bậc ba y = ax³ + bx² + cx + d (a ≠ 0).\n2. Điểm uốn I(-b/3a; f(-b/3a)) là tâm đối xứng của đồ thị hàm số bậc ba.\n3. Các bài toán ứng dụng khảo sát hàm số trong tối ưu hóa kinh tế doanh nghiệp.',
    extractedObjectives: [
      'Nắm vững sơ đồ khảo sát 3 bước của hàm số bậc ba.',
      'Xác định điểm uốn, cực trị và bảng biến thiên.',
      'Vận dụng vào bài toán thực tiễn tối ưu hóa chi phí sản xuất.'
    ],
    extractedKeyKnowledge: [
      'Đạo hàm bậc nhất y\' = 3ax² + 2bx + c.',
      'Tọa độ điểm uốn I(-b/3a; y(-b/3a)).',
      'Phương pháp nhận dạng đồ thị đa thức bậc ba.'
    ],
    extractedExercises: [
      'Bài 1: Khảo sát và vẽ đồ thị hàm số y = x³ - 3x² + 2.',
      'Bài 2: Lập bảng biến thiên và tìm cực trị.',
      'Bài 3: Bài toán tối ưu hóa hộp không nắp.'
    ],
    tableOfContents: generateTableOfContentsForBook('Toán Học', 'LỚP 12', 'Kết Nối Tri Thức'),
    selectedLessonId: 'math12-les-3',
    cloudSynced: true
  }
];

export const defaultCloudSaves: CloudSaveItem[] = [
  {
    id: 'cloud-save-1',
    title: 'KHBD 5512 - Âm Nhạc 6: Bài hát Con đường học trò',
    subject: 'Âm Nhạc',
    grade: 'LỚP 6',
    teacherName: 'Nguyễn Thị Duyên Thanh',
    schoolName: 'Trường THCS Long Hồ',
    savedAt: '2025-09-10 15:30',
    itemType: 'KHBD',
    hasWordDoc: true,
    hasPptSlide: true,
    hasPdf: true
  },
  {
    id: 'cloud-save-2',
    title: 'Slide Bài Giảng 16:9 - Chủ đề 1: Con đường học trò',
    subject: 'Âm Nhạc',
    grade: 'LỚP 6',
    teacherName: 'Nguyễn Thị Duyên Thanh',
    schoolName: 'Trường THCS Long Hồ',
    savedAt: '2025-09-10 16:15',
    itemType: 'SLIDE',
    hasWordDoc: false,
    hasPptSlide: true,
    hasPdf: true
  },
  {
    id: 'cloud-save-3',
    title: 'Đề Kiểm Tra Định Kỳ 7991 - Âm Nhạc 6 (Giữa Kỳ I)',
    subject: 'Âm Nhạc',
    grade: 'LỚP 6',
    teacherName: 'Nguyễn Thị Duyên Thanh',
    schoolName: 'Trường THCS Long Hồ',
    savedAt: '2025-09-11 09:20',
    itemType: 'EXAM',
    hasWordDoc: true,
    hasPptSlide: false,
    hasPdf: true
  },
  {
    id: 'cloud-save-4',
    title: 'KHBD 5512 - Toán 12: Khảo sát và vẽ đồ thị hàm số',
    subject: 'Toán Học',
    grade: 'LỚP 12',
    teacherName: 'ThS. Nguyễn Văn Cường',
    schoolName: 'Trường THPT Chuyên Hà Nội - Amsterdam',
    savedAt: '2025-09-08 11:00',
    itemType: 'FULL_PACKAGE',
    hasWordDoc: true,
    hasPptSlide: true,
    hasPdf: true
  }
];

export const initialAppState: AppState = {
  version: '2025.1.0-cv7991',
  lastUpdated: new Date().toISOString(),
  currentSubsystem: 'khbd', // Mở trực tiếp màn hình KHBD để người dùng thấy ngay nội dung Âm Nhạc 6 chuẩn
  teacherProfile: defaultTeacherProfile,
  sourceDocuments: defaultSourceDocuments,
  activeDocumentId: 'doc-sgk-music-6',
  cloudSaves: defaultCloudSaves,
  khbd: music6LessonPlan,
  slides: music6Slides,
  exam: music6Exam
};

export { 
  music6LessonPlan, 
  music6Slides, 
  music6Exam, 
  math12LessonPlan, 
  math12Slides 
};
