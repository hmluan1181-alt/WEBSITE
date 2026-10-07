import { 
  LessonPlan5512, 
  SlideItem, 
  Exam7991, 
  SourceDocument, 
  TeacherProfile,
  PedagogicalHeader,
  DocumentLessonItem
} from '../types';

// ============================================================================
// 1. DỮ LIỆU CHUẨN: ÂM NHẠC 6 (CÔ NGUYỄN THỊ DUYÊN THANH - THCS LONG HỒ)
// Sách Kết Nối Tri Thức - Chủ đề 1: Con đường học trò (Tiết 1: Học hát & Nhạc cụ gõ)
// ============================================================================

export const music6LessonPlan: LessonPlan5512 = {
  header: {
    schoolName: 'TRƯỜNG THCS LONG HỒ',
    departmentName: 'TỔ NGHỆ THUẬT (ÂM NHẠC - MỸ THUẬT)',
    teacherName: 'NGUYỄN THỊ DUYÊN THANH',
    subjectName: 'ÂM NHẠC',
    grade: 'LỚP 6',
    className: '6A1',
    academicYear: '2024 - 2025',
    textbook: 'Kết Nối Tri Thức',
    lessonTitle: 'CHỦ ĐỀ 1: CON ĐƯỜNG HỌC TRÒ - TIẾT 1: HỌC HÁT BÀI CON ĐƯỜNG HỌC TRÒ (KẾT HỢP NHẠC CỤ GÕ THANH PHÁCH)',
    durationPeriods: 1,
    examTitle: 'ĐỀ KIỂM TRA ĐỊNH KỲ GIỮA KỲ I - MÔN ÂM NHẠC 6 (CHUẨN CV 7991/BGDĐT)',
    examDurationMinutes: 45,
  },
  generalObjectives: {
    knowledge: [
      'Hát đúng cao độ, trường độ bài hát "Con đường học trò" (Nhạc và lời: Nguyễn Mộng Lân); thể hiện đúng sắc thái tình cảm trong sáng, tha thiết và tự hào.',
      'Nhận biết và vận dụng đúng nhịp 2/4, các nốt nhạc chính thuộc thang âm 5 bậc Đô - Rê - Mi - Son - La trên khuông nhạc khóa Sol.',
      'Biết sử dụng thanh phách, song loan và trống con gõ đệm theo nhịp, theo phách (phách mạnh - phách nhẹ) và theo hình tiết tấu bài hát.'
    ],
    coreCompetencies: [
      'Năng lực tự chủ và tự học: Tự giác khởi động giọng theo mẫu âm Mi - Ma, chủ động đọc lời ca theo tiết tấu và tập hát các câu khó.',
      'Năng lực giao tiếp và hợp tác: Biết chia sẻ, hòa giọng ăn ý với các bạn khi hát tốp ca, biết lắng nghe và tôn trọng phần trình diễn của nhóm bạn.',
      'Năng lực giải quyết vấn đề và sáng tạo: Sáng tạo các động tác vận động cơ thể (Body Percussion: vỗ tay, vỗ đùi, dậm chân) đệm cho bài hát.'
    ],
    subjectCompetencies: [
      'Năng lực thể hiện âm nhạc: Biết lấy hơi đúng chỗ ngắt câu, tư thế hát chuẩn, hát tròn vành rõ chữ và gõ đệm tiết tấu chuẩn xác.',
      'Năng lực cảm thụ và hiểu biết âm nhạc: Cảm nhận được nét giai điệu vui tươi, trong trẻo; hiểu được tình cảm bạn bè, thầy cô và mái trường qua ca từ.',
      'Năng lực ứng dụng và sáng tạo âm nhạc: Vận dụng bộ gõ cơ thể kết hợp thanh phách tự làm để biểu diễn bài hát trước tập thể.'
    ],
    qualities: [
      'Yêu nước & Nhân ái: Bồi dưỡng tình yêu quê hương, mái trường, trân trọng công ơn dạy dỗ của thầy cô giáo.',
      'Chăm chỉ: Tích cực luyện thanh, rèn luyện kỹ năng gõ tiết tấu kiên trì, tập trung.',
      'Trách nhiệm: Có ý thức bảo quản nhạc cụ của nhà trường, phối hợp chặt chẽ cùng tổ/nhóm trong tiết học.'
    ]
  },
  teachingEquipment: {
    teacher: [
      'Đàn phím điện tử (Organ/Keyboard Yamaha), thanh phách gỗ lim, song loan, trống con.',
      'Máy chiếu Projector / Màn hình tương tác hiển thị Slide bài giảng 16:9, video bài hát mẫu.',
      'File nhạc đệm (Beat) bài hát "Con đường học trò", file âm thanh luyện thanh mẫu âm.'
    ],
    students: [
      'Sách giáo khoa Âm Nhạc 6 (bộ sách Kết Nối Tri Thức với cuộc sống), vở ghi bài chép nhạc.',
      'Thanh phách gõ tiết tấu (hoặc nhạc cụ tự chế từ tre, gỗ, vỏ lon) do học sinh tự chuẩn bị.'
    ],
    digitalAssets: [
      'Bản nhạc điện tử số hóa hiển thị nốt nhạc chạy theo nhịp trên nền tảng EdTech.',
      'Clip ngắn mô phỏng động tác gõ đệm Body Percussion 3 động tác: Vỗ tay - Vỗ đùi - Dậm chân.'
    ]
  },
  activities: [
    {
      id: 'act-1',
      number: 1,
      title: 'Hoạt động 1: Mở đầu / Khởi động (Trò chơi âm nhạc & Luyện thanh)',
      timeEstimate: '7 phút',
      objectives: 'Tạo không khí học tập vui tươi, hào hứng; khởi động giọng hát và làm quen với cao độ các nốt nhạc Đô - Rê - Mi - Son - La.',
      content: '1. Tham gia trò chơi "Lắng nghe giai điệu - Đoán tiếng trống trường". 2. Khởi động giọng theo mẫu âm Mi - Ma trên thang âm 5 bậc.',
      product: 'Học sinh phản xạ nhanh đoán đúng giai điệu và thực hiện luyện thanh đồng thanh đúng cao độ, tư thế ngồi ngay ngắn, thả lỏng vai.',
      steps: [
        {
          name: 'Bước 1: Chuyển giao nhiệm vụ',
          teacherAction: 'Giáo viên mở đoạn trích âm thanh tiếng trống khai trường rộn rã và đàn một nét giai điệu ngắn vui tươi. Đặt câu hỏi: "Âm thanh vừa rồi gợi cho các em nhớ đến khoảnh khắc nào dưới mái trường?" Sau đó hướng dẫn tư thế ngồi hát chuẩn và làm mẫu khởi động giọng: Đô - Rê - Mi - Son - La bằng âm Mi - Ma.',
          studentAction: 'Học sinh chú ý lắng nghe, chuẩn bị tinh thần và điều chỉnh tư thế ngồi thẳng lưng, hai chân chạm sàn thả lỏng.'
        },
        {
          name: 'Bước 2: Thực hiện nhiệm vụ',
          teacherAction: 'Giáo viên đàn từng bậc âm từ thấp lên cao (C-D-E-G-A) và ngược lại, bắt nhịp và làm khẩu hình mẫu tròn vành.',
          studentAction: 'Học sinh đồng thanh luyện giọng theo tiếng đàn của cô giáo: "Mi... Ma... Mi... Ma...", giữ hơi thở sâu ở phần bụng.'
        },
        {
          name: 'Bước 3: Báo cáo, thảo luận',
          teacherAction: 'Cô giáo nhận xét độ vang của giọng hát từng dãy bàn; mời 1 học sinh nhận xét cảm giác luồng hơi khi phát âm.',
          studentAction: 'Đại diện học sinh trả lời: Âm thanh vang, sáng, cổ họng thả lỏng tự nhiên.'
        },
        {
          name: 'Bước 4: Kết luận, nhận định',
          teacherAction: 'Giáo viên khen ngợi cả lớp, dẫn dắt: "Mỗi ngày đến trường là một niềm vui trên con đường học trò. Hôm nay cô trò ta cùng bước vào bài hát tuyệt đẹp của nhạc sĩ Nguyễn Mộng Lân".',
          studentAction: 'Học sinh mở SGK trang 6, ghi đề bài vào vở và sẵn sàng học hát.'
        }
      ]
    },
    {
      id: 'act-2',
      number: 2,
      title: 'Hoạt động 2: Hình thành kiến thức mới (Khám phá bài hát & Học hát từng câu)',
      timeEstimate: '20 phút',
      objectives: 'Học sinh nắm được thông tin tác giả, cấu trúc nhịp 2/4; đọc đúng lời ca theo tiết tấu; hát đúng giai điệu và lời ca từng câu theo lối móc xích.',
      content: '1. Tìm hiểu xuất xứ bài hát Con đường học trò của nhạc sĩ Nguyễn Mộng Lân; 2. Đọc lời ca theo tiết tấu; 3. Tập hát 4 câu bài hát theo lối móc xích kết hợp tiếng đàn mẫu.',
      product: 'Học sinh hát thuộc lời ca 4 câu đầu của bài hát, phát âm chuẩn xác, lấy hơi đúng chỗ, thể hiện được tính chất trong sáng.',
      steps: [
        {
          name: 'Bước 1: Chuyển giao nhiệm vụ',
          teacherAction: 'Chiếu Slide chân dung nhạc sĩ Nguyễn Mộng Lân. Giới thiệu: Nhạc sĩ có rất nhiều ca khúc thiếu nhi nổi tiếng (Em là mầm non của Đảng, Con đường học trò...). Hướng dẫn quan sát bản nhạc: Xác định nhịp 2/4 (mỗi ô nhịp có 2 phách, mỗi phách bằng 1 nốt đen). Yêu cầu cả lớp đọc lời ca câu 1 và 2 theo hình tiết tấu Đơn - Đơn - Đen.',
          studentAction: 'Học sinh quan sát bản nhạc trên slide và SGK, gõ nhẹ tay theo hướng dẫn đọc lời ca của cô.'
        },
        {
          name: 'Bước 2: Thực hiện nhiệm vụ',
          teacherAction: 'Giáo viên hát mẫu câu 1 cùng đàn phím: "Đường em đi tới trường...". Sau đó đàn giai điệu 2 lần cho học sinh nghe ngấm giai điệu, bắt nhịp (1 - 2) cho cả lớp hát lại. Tiến hành tương tự với câu 2, rồi ghép móc xích câu 1 + 2. Tiếp tục với câu 3 và 4.',
          studentAction: 'Học sinh lắng nghe tiếng đàn mẫu, nhẩm theo cao độ, sau đó đồng thanh hát theo nhịp bắt tay của giáo viên. Chú ý lấy hơi ở cuối mỗi câu hát.'
        },
        {
          name: 'Bước 3: Báo cáo, thảo luận',
          teacherAction: 'Gọi từng tổ (Tổ 1 hát câu 1-2, Tổ 2 hát câu 3-4), sau đó đổi lượt. Nhắc nhở những chỗ ngân dài đủ 2 phách.',
          studentAction: 'Các tổ đứng dậy thể hiện phần hát của tổ mình, các bạn tổ khác lắng nghe để nhận xét cao độ.'
        },
        {
          name: 'Bước 4: Kết luận, nhận định',
          teacherAction: 'Cô giáo sửa lỗi cao độ ở nốt La cao và nốt luyến, khen ngợi tinh thần học tập nghiêm túc, tròn vành rõ chữ của học sinh.',
          studentAction: 'Cả lớp cùng hát lại trọn vẹn cả 4 câu hát với sắc thái vui tươi, tự tin.'
        }
      ]
    },
    {
      id: 'act-3',
      number: 3,
      title: 'Hoạt động 3: Luyện tập (Hát hòa giọng kết hợp gõ đệm thanh phách)',
      timeEstimate: '12 phút',
      objectives: 'Học sinh hát nhuần nhuyễn kết hợp gõ đệm chính xác theo phách và theo tiết tấu bằng thanh phách gỗ hoặc song loan.',
      content: '1. Luyện tập gõ đệm theo phách (Phách 1 mạnh, Phách 2 nhẹ); 2. Luyện tập gõ đệm theo hình tiết tấu lời ca; 3. Thi đua biểu diễn theo nhóm.',
      product: 'Các nhóm học sinh vừa hát vừa gõ đệm thanh phách nhịp nhàng, đúng tiết tấu, tiếng gõ giòn giã ăn khớp với lời ca.',
      steps: [
        {
          name: 'Bước 1: Chuyển giao nhiệm vụ',
          teacherAction: 'Giáo viên cầm cặp thanh phách làm mẫu 2 cách gõ: Cách 1: Gõ theo phách (gõ đều đặn vào phách 1 và phách 2 của mỗi ô nhịp); Cách 2: Gõ theo tiết tấu lời ca (hát từ nào gõ phách từ đó). Yêu cầu chia 4 nhóm thi đua.',
          studentAction: 'Học sinh lấy thanh phách, cầm đúng tư thế (tay trái giữ thanh phách ngửa, tay phải cầm thanh gõ xuống).'
        },
        {
          name: 'Bước 2: Thực hiện nhiệm vụ',
          teacherAction: 'Giáo viên bật nhạc đệm beat, vừa đệm đàn vừa điều khiển: Nhóm 1 & 2 hát chính; Nhóm 3 & 4 gõ đệm thanh phách và trống con.',
          studentAction: 'Học sinh phối hợp nhịp nhàng giữa hát và gõ đệm, giữ vững nhịp độ không bị nhanh dần hay chậm dần.'
        },
        {
          name: 'Bước 3: Báo cáo, thảo luận',
          teacherAction: 'Mời đại diện Nhóm 1 và Nhóm 2 lên bục giảng trình diễn bài hát kết hợp thanh phách.',
          studentAction: 'Đại diện nhóm biểu diễn tự tin. Học sinh dưới lớp vỗ tay theo nhịp và nhận xét sự ăn khớp giữa tiếng gõ và tiếng hát.'
        },
        {
          name: 'Bước 4: Kết luận, nhận định',
          teacherAction: 'Giáo viên đánh giá, cho điểm động viên nhóm biểu diễn tốt; phân tích tác dụng của việc gõ đệm giúp giữ chắc nhịp bài hát.',
          studentAction: 'Học sinh tiếp thu ý kiến đóng góp, hoàn thiện kỹ năng gõ đệm cá nhân.'
        }
      ]
    },
    {
      id: 'act-4',
      number: 4,
      title: 'Hoạt động 4: Vận dụng - Trải nghiệm (Sáng tạo Body Percussion & Cảm thụ)',
      timeEstimate: '6 phút',
      objectives: 'Phát huy năng lực sáng tạo âm nhạc qua vận động cơ thể (Body Percussion: vỗ tay, vỗ đùi, dậm chân); cảm thụ vẻ đẹp mái trường qua lời ca.',
      content: '1. Thực hành chuỗi động tác Body Percussion 3 bước: Vỗ đùi (phách 1) - Vỗ tay (phách 2); 2. Nêu cảm nhận ngắn về tình cảm với trường lớp.',
      product: 'Đoạn clip hoặc phần trình diễn trực tiếp của học sinh kết hợp hát và động tác cơ thể sinh động; lời chia sẻ chân thành về thầy cô, bạn bè.',
      steps: [
        {
          name: 'Bước 1: Chuyển giao nhiệm vụ',
          teacherAction: 'Cô giáo thị phạm chuỗi vận động cơ thể Body Percussion đơn giản: Phách 1 vỗ hai tay vào đùi, Phách 2 vỗ hai bàn tay vào nhau. Đặt câu hỏi cảm thụ: "Lời bài hát nhắc em nhớ nhất điều gì trên con đường đến trường mỗi sáng?"',
          studentAction: 'Học sinh chăm chú theo dõi động tác cơ thể của cô giáo và thử làm theo.'
        },
        {
          name: 'Bước 2: Thực hiện nhiệm vụ',
          teacherAction: 'Cô giáo bật beat nhạc nền vui nhộn, bắt nhịp cho cả lớp đứng dậy cùng hát và vận động nhún nhảy theo phách.',
          studentAction: 'Cả lớp đứng tại chỗ, vừa tươi cười hát vang bài hát vừa thực hiện động tác vỗ đùi - vỗ tay hào hứng.'
        },
        {
          name: 'Bước 3: Báo cáo, thảo luận',
          teacherAction: 'Mời 1 bạn học sinh chia sẻ cảm xúc sau khi học xong tiết học.',
          studentAction: 'Học sinh phát biểu: "Em thấy bài hát rất vui tươi, gợi cho em tình yêu mái trường THCS Long Hồ và tình bạn bè thân thiết."'
        },
        {
          name: 'Bước 4: Kết luận, nhận định',
          teacherAction: 'Giáo viên chốt lại tiết học: Dặn dò học sinh về nhà luyện tập hát thuộc lời, chuẩn bị thanh phách tự làm cho tiết sau. Tuyên dương tinh thần học tập sôi nổi của lớp 6A1.',
          studentAction: 'Học sinh vỗ tay kết thúc tiết học và chào cô giáo.'
        }
      ]
    }
  ],
  notes: 'Kế hoạch bài dạy môn Âm Nhạc 6 được xây dựng theo định hướng phát triển phẩm chất và năng lực âm nhạc của Chương trình GDPT 2018 (Công văn 5512/BGDĐT). Tích hợp phương pháp dạy học tích cực, gõ đệm thanh phách và vận động cơ thể Body Percussion.'
};

export const music6Slides: SlideItem[] = [
  {
    id: 'slide-music-1',
    slideNumber: 1,
    title: 'CHỦ ĐỀ 1: CON ĐƯỜNG HỌC TRÒ - TIẾT 1',
    phase: 'Khởi động',
    bulletPoints: [
      'Môn học: Âm Nhạc 6 - Chương trình Giáo dục phổ thông 2018',
      'Bộ sách: Kết Nối Tri Thức Với Cuộc Sống',
      'Giáo viên: Nguyễn Thị Duyên Thanh · Đơn vị: Trường THCS Long Hồ',
      'Nội dung trọng tâm: Học hát bài "Con đường học trò" & Gõ đệm thanh phách'
    ],
    highlightBox: {
      type: 'definition',
      title: 'Mục tiêu bài dạy',
      content: 'Hát đúng cao độ, trường độ bài hát "Con đường học trò"; nắm vững số chỉ nhịp 2/4; biết gõ đệm thanh phách nhịp nhàng và cảm nhận vẻ đẹp mái trường.'
    },
    teacherNotes: 'Chiếu slide mở đầu tiết học, ổn định lớp, giới thiệu khái quát mục tiêu và tạo tâm thế hứng khởi cho học sinh lớp 6.',
    timerMinutes: 2
  },
  {
    id: 'slide-music-2',
    slideNumber: 2,
    title: 'KHỞI ĐỘNG: TRÒ CHƠI ÂM NHẠC & LUYỆN THANH',
    phase: 'Khởi động',
    bulletPoints: [
      '1. Trò chơi: "Lắng nghe giai điệu - Đoán tiếng trống trường rộn rã"',
      '2. Tư thế hát chuẩn: Ngồi thẳng lưng, thả lỏng vai, hai chân chạm sàn',
      '3. Kỹ thuật lấy hơi: Hít sâu bằng mũi và miệng, giữ hơi ở cơ hoành bụng',
      '4. Mẫu âm khởi động: Mi - Ma theo thang âm 5 bậc (Đô - Rê - Mi - Son - La)'
    ],
    highlightBox: {
      type: 'task',
      title: 'Mẫu âm luyện giọng 5 bậc',
      content: 'C - D - E - G - A (Đô - Rê - Mi - Son - La)  ==> Phát âm "Mi... Ma..." tròn vành, âm thanh vang sáng và đều đặn.'
    },
    teacherNotes: 'Đàn từng bậc âm từ thấp lên cao (khoảng giọng C4 - A4). Hướng dẫn học sinh mở rộng khẩu hình và không gằn giọng.',
    timerMinutes: 5
  },
  {
    id: 'slide-music-3',
    slideNumber: 3,
    title: 'KHÁM PHÁ BÀI HÁT "CON ĐƯỜNG HỌC TRÒ"',
    phase: 'Kiến thức mới',
    bulletPoints: [
      'Tác giả: Nhạc và lời của Nhạc sĩ Nguyễn Mộng Lân',
      'Tính chất âm nhạc: Nhịp nhàng, trong sáng, tươi vui, tràn đầy niềm tin',
      'Cấu trúc số chỉ nhịp: Nhịp 2/4 (mỗi ô nhịp có 2 phách, mỗi phách bằng 1 nốt đen)',
      'Phách 1: Phách mạnh (nhấn rõ) · Phách 2: Phách nhẹ'
    ],
    highlightBox: {
      type: 'formula',
      title: 'Quy tắc nhịp 2/4',
      content: 'Nhịp 2/4 = [ Phách 1 (MẠNH) ] + [ Phách 2 (NHẸ) ] | Giá trị trường độ mỗi phách tương đương 1 nốt đen (♩).'
    },
    teacherNotes: 'Cho học sinh gõ tay 2 phách lên bàn: Mạnh (gõ xuống) - Nhẹ (nhấc tay). Giúp học sinh khắc sâu cảm giác về nhịp điệu.',
    timerMinutes: 6
  },
  {
    id: 'slide-music-4',
    slideNumber: 4,
    title: 'TẬP HÁT TỪNG CÂU THEO LỐI MÓC XÍCH',
    phase: 'Kiến thức mới',
    bulletPoints: [
      'Câu 1: "Con đường rợp bóng cây xanh, đưa em đến lớp mỗi ngày..." (Đàn mẫu 2 lần)',
      'Câu 2: "Tiếng chim ca líu lo trên cành, hòa cùng tiếng hát rộn ràng..." (Luyện hát ghép câu 1 + 2)',
      'Câu 3: "Trang sách mới mở ra chân trời, thầy cô dạy bao điều hay..." (Chú ý ngân dài cuối câu)',
      'Câu 4: "Yêu sao mái trường thân thương, con đường rực rỡ tương lai..." (Hát ghép toàn bài)'
    ],
    highlightBox: {
      type: 'question',
      title: 'Lưu ý sư phạm khi hát',
      content: 'Lấy hơi ở cuối mỗi vế câu; ngân đủ 2 phách ở các nốt ngân dài; phát âm rõ chữ "xanh", "trường", "tương lai".'
    },
    teacherNotes: 'Đàn giai điệu mẫu rõ ràng, bắt nhịp dứt khoát. Gọi các tổ luân phiên hát để sửa lỗi chênh phô kịp thời.',
    timerMinutes: 10
  },
  {
    id: 'slide-music-5',
    slideNumber: 5,
    title: 'LUYỆN TẬP: HÁT HÒA GIỌNG KẾT HỢP GÕ ĐỆM',
    phase: 'Luyện tập',
    bulletPoints: [
      'Cách 1: Gõ đệm theo phách (Phách 1 gõ mạnh, Phách 2 gõ nhẹ)',
      'Cách 2: Gõ đệm theo hình tiết tấu lời ca (Đơn - Đơn - Đen)',
      'Nhạc cụ sử dụng: Thanh phách gỗ lim, song loan, trống con',
      'Tổ chức thi đua: Nhóm 1 hát hòa âm - Nhóm 2 gõ đệm nhạc cụ'
    ],
    highlightBox: {
      type: 'task',
      title: 'Hình tiết tấu gõ đệm chuẩn',
      content: '♫ ♩ | ♫ ♩ (Đơn - Đơn - Đen | Đơn - Đơn - Đen)  ==> Gõ dứt khoát, âm thanh giòn giã, giữ đều nhịp cùng tiếng đàn.'
    },
    teacherNotes: 'Chia lớp làm 2 nửa: Nửa bên trái hát, nửa bên phải gõ thanh phách, sau đó đổi vai. Khuyến khích HS giữ vững nhịp.',
    timerMinutes: 8
  },
  {
    id: 'slide-music-6',
    slideNumber: 6,
    title: 'VẬN DỤNG & SÁNG TẠO: BODY PERCUSSION',
    phase: 'Vận dụng',
    bulletPoints: [
      'Bộ gõ cơ thể (Body Percussion): Sử dụng âm thanh từ chính cơ thể người',
      'Động tác 1: Vỗ đùi (vào phách mạnh thứ nhất)',
      'Động tác 2: Vỗ tay (vào phách nhẹ thứ hai)',
      'Động tác 3: Dậm chân giữ nhịp cơ bản',
      'Thông điệp bài học: Trân trọng những năm tháng học trò tươi đẹp dưới mái trường THCS Long Hồ'
    ],
    highlightBox: {
      type: 'definition',
      title: 'Hoạt động trải nghiệm về nhà',
      content: '1. Tự quay video hát và gõ đệm thanh phách nộp nhóm lớp. 2. Sưu tầm thêm 1 bài hát cùng chủ đề Mái trường và Thầy cô.'
    },
    teacherNotes: 'Cả lớp đứng dậy cùng hát và vận động theo beat nhạc. Khen ngợi và tuyên dương các học sinh tích cực trong giờ học.',
    timerMinutes: 4
  }
];

export const music6Exam: Exam7991 = {
  header: {
    schoolName: 'TRƯỜNG THCS LONG HỒ',
    departmentName: 'TỔ NGHỆ THUẬT (ÂM NHẠC - MỸ THUẬT)',
    teacherName: 'NGUYỄN THỊ DUYÊN THANH',
    subjectName: 'ÂM NHẠC',
    grade: 'LỚP 6',
    className: 'KHỐI 6 (TOÀN TRƯỜNG)',
    academicYear: '2024 - 2025',
    textbook: 'Kết Nối Tri Thức',
    lessonTitle: 'ĐỀ KIỂM TRA ĐỊNH KỲ GIỮA KỲ I - MÔN ÂM NHẠC 6',
    durationPeriods: 1,
    examTitle: 'ĐỀ KIỂM TRA ĐỊNH KỲ MÔN ÂM NHẠC 6 (CHUẨN CÔNG VĂN 7991/BGDĐT)',
    examDurationMinutes: 45,
  },
  summary: {
    totalPoints: 10.0,
    partIPoints: 3.0,
    partIIPoints: 2.0,
    partIIIPoints: 2.0,
    partIVPoints: 3.0,
    ratio: {
      nb: 4.0, // 40% Nhận biết
      th: 3.0, // 30% Thông hiểu
      vd: 3.0  // 30% Vận dụng
    }
  },
  partI: [
    {
      id: 'm6-p1-q1',
      number: 1,
      content: 'Bài hát "Con đường học trò" trong Chủ đề 1 môn Âm Nhạc 6 là sáng tác của nhạc sĩ nào dưới đây?',
      options: [
        { key: 'A', text: 'Nhạc sĩ Phong Nhã' },
        { key: 'B', text: 'Nhạc sĩ Nguyễn Mộng Lân' },
        { key: 'C', text: 'Nhạc sĩ Hoàng Vân' },
        { key: 'D', text: 'Nhạc sĩ Phạm Tuyên' }
      ],
      correctAnswer: 'B',
      score: 0.25,
      level: 'NB',
      topic: 'Tác giả & Tác phẩm âm nhạc',
      explanation: 'Bài hát "Con đường học trò" do nhạc sĩ Nguyễn Mộng Lân sáng tác cả phần nhạc và lời.'
    },
    {
      id: 'm6-p1-q2',
      number: 2,
      content: 'Số chỉ nhịp 2/4 ở đầu bản nhạc cho ta biết điều gì về cấu trúc ô nhịp?',
      options: [
        { key: 'A', text: 'Mỗi ô nhịp có 2 phách, giá trị mỗi phách bằng một nốt đen' },
        { key: 'B', text: 'Mỗi ô nhịp có 4 phách, giá trị mỗi phách bằng một nốt móc đơn' },
        { key: 'C', text: 'Mỗi ô nhịp có 3 phách, giá trị mỗi phách bằng một nốt trắng' },
        { key: 'D', text: 'Mỗi ô nhịp có 2 phách, giá trị mỗi phách bằng một nốt tròn' }
      ],
      correctAnswer: 'A',
      score: 0.25,
      level: 'NB',
      topic: 'Lý thuyết âm nhạc cơ bản',
      explanation: 'Trong số chỉ nhịp 2/4: Số 2 chỉ số lượng phách trong ô nhịp (2 phách); Số 4 chỉ độ dài mỗi phách bằng 1 nốt đen (1/4 nốt tròn).'
    },
    {
      id: 'm6-p1-q3',
      number: 3,
      content: 'Trong nhịp 2/4, tính chất phách của từng ô nhịp diễn ra theo quy luật nào?',
      options: [
        { key: 'A', text: 'Phách 1 nhẹ, phách 2 mạnh' },
        { key: 'B', text: 'Cả hai phách đều mạnh như nhau' },
        { key: 'C', text: 'Phách 1 mạnh, phách 2 nhẹ' },
        { key: 'D', text: 'Cả hai phách đều nhẹ như nhau' }
      ],
      correctAnswer: 'C',
      score: 0.25,
      level: 'NB',
      topic: 'Quy luật phách trong nhịp 2/4',
      explanation: 'Nhịp 2/4 có cấu trúc nhịp điệu gồm 1 phách mạnh (phách 1) và 1 phách nhẹ (phách 2).'
    },
    {
      id: 'm6-p1-q4',
      number: 4,
      content: 'Nhạc cụ "Thanh phách" trong trường học thuộc nhóm nhạc cụ nào?',
      options: [
        { key: 'A', text: 'Nhạc cụ gõ định âm' },
        { key: 'B', text: 'Nhạc cụ gõ không định âm (tự thân vang)' },
        { key: 'C', text: 'Nhạc cụ dây gảy' },
        { key: 'D', text: 'Nhạc cụ hơi thổi' }
      ],
      correctAnswer: 'B',
      score: 0.25,
      level: 'NB',
      topic: 'Nhạc cụ gõ tiết tấu',
      explanation: 'Thanh phách là nhạc cụ gõ tự thân vang không có cao độ xác định (không định âm), dùng để giữ nhịp và tiết tấu.'
    },
    {
      id: 'm6-p1-q5',
      number: 5,
      content: 'Nốt nhạc nằm ở dòng kẻ thứ 2 trên khuông nhạc có khóa Sol là nốt nhạc nào?',
      options: [
        { key: 'A', text: 'Nốt Đô (C)' },
        { key: 'B', text: 'Nốt Mi (E)' },
        { key: 'C', text: 'Nốt Son (G)' },
        { key: 'D', text: 'Nốt La (A)' }
      ],
      correctAnswer: 'C',
      score: 0.25,
      level: 'NB',
      topic: 'Đọc nốt nhạc trên khuông',
      explanation: 'Khóa Sol bắt đầu từ dòng kẻ thứ 2 của khuông nhạc, vì vậy nốt nằm trên dòng kẻ thứ 2 chính là nốt Son.'
    },
    {
      id: 'm6-p1-q6',
      number: 6,
      content: 'Khi thực hiện kỹ thuật hát, tư thế ngồi nào dưới đây là ĐÚNG tiêu chuẩn sư phạm?',
      options: [
        { key: 'A', text: 'Ngồi tựa sát lưng vào ghế, co hai chân lên bậc thang' },
        { key: 'B', text: 'Ngồi thẳng lưng, hai vai thả lỏng, hai bàn chân tiếp xúc thoải mái với mặt sàn' },
        { key: 'C', text: 'Cúi gập đầu sát mặt bàn để nhìn rõ lời ca' },
        { key: 'D', text: 'Khoanh tay trước ngực và ngửa cổ ra sau' }
      ],
      correctAnswer: 'B',
      score: 0.25,
      level: 'NB',
      topic: 'Kỹ năng ca hát học sinh',
      explanation: 'Tư thế chuẩn khi ngồi hát: Thẳng lưng, thả lỏng vai và cổ, mở rộng lồng ngực giúp luồng hơi lưu thông tự nhiên.'
    },
    {
      id: 'm6-p1-q7',
      number: 7,
      content: 'Giá trị trường độ của một nốt Trắng ( trắng ) bằng bao nhiêu nốt Đen ( ♩ )?',
      options: [
        { key: 'A', text: 'Bằng 2 nốt đen' },
        { key: 'B', text: 'Bằng 3 nốt đen' },
        { key: 'C', text: 'Bằng 4 nốt đen' },
        { key: 'D', text: 'Bằng 1 nốt đen' }
      ],
      correctAnswer: 'A',
      score: 0.25,
      level: 'TH',
      topic: 'Trường độ âm nhạc',
      explanation: 'Một nốt trắng có độ dài bằng 2 nốt đen (tương đương 2 phách trong nhịp 2/4).'
    },
    {
      id: 'm6-p1-q8',
      number: 8,
      content: 'Sắc thái tình cảm chủ đạo của bài hát "Con đường học trò" là gì?',
      options: [
        { key: 'A', text: 'Hùng tráng, uy nghiêm, mạnh mẽ' },
        { key: 'B', text: 'Vừa phải, trong sáng, tươi vui, tha thiết' },
        { key: 'C', text: 'U buồn, trầm lắng, chậm rãi' },
        { key: 'D', text: 'Hồi hộp, bí ẩn, dồn dập' }
      ],
      correctAnswer: 'B',
      score: 0.25,
      level: 'TH',
      topic: 'Cảm thụ âm nhạc',
      explanation: 'Giai điệu bài hát thể hiện tâm trạng hân hoan, niềm vui tươi trong sáng của tuổi học trò trên con đường đến trường.'
    },
    {
      id: 'm6-p1-q9',
      number: 9,
      content: 'Trong kỹ thuật gõ đệm theo hình tiết tấu của bài hát, ta cần gõ như thế nào?',
      options: [
        { key: 'A', text: 'Chỉ gõ vào các nốt ngân dài ở cuối câu' },
        { key: 'B', text: 'Gõ ăn khớp theo từng tiếng hát / lời ca của bài hát' },
        { key: 'C', text: 'Gõ ngẫu nhiên không cần theo nhịp điệu' },
        { key: 'D', text: 'Chỉ gõ duy nhất vào phách đầu tiên của bài hát' }
      ],
      correctAnswer: 'B',
      score: 0.25,
      level: 'TH',
      topic: 'Thực hành nhạc cụ tiết tấu',
      explanation: 'Gõ theo hình tiết tấu lời ca là lối gõ mà mỗi âm tiết của ca từ phát ra tương ứng với một lần gõ nhạc cụ.'
    },
    {
      id: 'm6-p1-q10',
      number: 10,
      content: 'Phương pháp tập hát từng câu nối tiếp từ câu trước sang câu sau trong dạy học âm nhạc gọi là phương pháp gì?',
      options: [
        { key: 'A', text: 'Phương pháp phân tích tác phẩm' },
        { key: 'B', text: 'Phương pháp móc xích' },
        { key: 'C', text: 'Phương pháp đọc thầm' },
        { key: 'D', text: 'Phương pháp độc tấu' }
      ],
      correctAnswer: 'B',
      score: 0.25,
      level: 'TH',
      topic: 'Phương pháp học hát',
      explanation: 'Học hát từng câu rồi ghép lại (câu 1, câu 2 -> câu 1+2; câu 3, câu 4 -> câu 3+4) là phương pháp dạy hát móc xích kinh điển.'
    },
    {
      id: 'm6-p1-q11',
      number: 11,
      content: 'Khi biểu diễn bài hát theo hình thức "Hát hòa giọng" (đồng ca/tốp ca), yếu tố nào dưới đây là QUAN TRỌNG NHẤT?',
      options: [
        { key: 'A', text: 'Mỗi bạn cố gắng hát thật to để lấn át tiếng hát của bạn khác' },
        { key: 'B', text: 'Lắng nghe lẫn nhau để giữ đúng cao độ, đồng đều về âm lượng và nhịp điệu' },
        { key: 'C', text: 'Hát thật nhanh hơn nhạc đệm để về đích trước' },
        { key: 'D', text: 'Không cần nhìn cử chỉ bắt nhịp của chỉ huy' }
      ],
      correctAnswer: 'B',
      score: 0.25,
      level: 'VD',
      topic: 'Kỹ năng biểu diễn tập thể',
      explanation: 'Hát tập thể đòi hỏi sự hòa quyện âm thanh, học sinh phải biết lắng nghe bè bạn để kiểm soát âm lượng và nhịp độ hài hòa.'
    },
    {
      id: 'm6-p1-q12',
      number: 12,
      content: 'Trong nghệ thuật "Body Percussion" (bộ gõ cơ thể), nguồn âm thanh được tạo ra từ đâu?',
      options: [
        { key: 'A', text: 'Từ đàn Organ và loa điện tử' },
        { key: 'B', text: 'Từ các động tác vỗ tay, vỗ đùi, dậm chân... trên chính cơ thể người' },
        { key: 'C', text: 'Từ tiếng gió thổi qua ống sáo tre' },
        { key: 'D', text: 'Từ tiếng va đập của kim loại' }
      ],
      correctAnswer: 'B',
      score: 0.25,
      level: 'VD',
      topic: 'Sáng tạo âm nhạc - Body Percussion',
      explanation: 'Body Percussion là nghệ thuật dùng các bộ phận cơ thể (tay, chân, đùi, ngực...) tạo ra tiết tấu âm nhạc sinh động.'
    }
  ],
  partII: [
    {
      id: 'm6-p2-q1',
      number: 1,
      stem: 'Xét các nhận định dưới đây về kiến thức Nhịp 2/4 và Kỹ thuật học hát bài "Con đường học trò":',
      statements: [
        {
          key: 'a',
          text: 'Trong nhịp 2/4, phách thứ nhất luôn là phách nhẹ và phách thứ hai luôn là phách mạnh.',
          isCorrect: false,
          explanation: 'Sai. Quy luật nhịp 2/4 là Phách 1 MẠNH, Phách 2 NHẸ.'
        },
        {
          key: 'b',
          text: 'Khi lấy hơi để hát, học sinh nên hít một hơi sâu nhẹ nhàng, cơ hoành mở rộng và không nhấc bổng hai vai.',
          isCorrect: true,
          explanation: 'Đúng. Kỹ thuật lấy hơi bằng cơ hoành giúp giữ cột hơi ổn định mà cơ thể không bị căng cứng.'
        },
        {
          key: 'c',
          text: 'Thanh phách là nhạc cụ phát ra âm thanh có cao độ chuẩn nốt Đô - Rê - Mi xác định rõ ràng.',
          isCorrect: false,
          explanation: 'Sai. Thanh phách là nhạc cụ gõ không định âm (chỉ tạo tiết tấu, không có cao độ nốt nhạc).'
        },
        {
          key: 'd',
          text: 'Khi gõ đệm theo phách của nhịp 2/4 cho bài hát, trong mỗi ô nhịp học sinh sẽ thực hiện gõ 2 tiếng đều đặn.',
          isCorrect: true,
          explanation: 'Đúng. Mỗi ô nhịp 2/4 có 2 phách nên gõ 2 lần tương ứng với từng phách.'
        }
      ],
      score: 1.0,
      level: 'TH',
      topic: 'Kiến thức nhịp & Kỹ thuật thanh nhạc'
    },
    {
      id: 'm6-p2-q2',
      number: 2,
      stem: 'Xét các nhận định về Năng lực cảm thụ và Sáng tạo biểu diễn âm nhạc:',
      statements: [
        {
          key: 'a',
          text: 'Hình thức vận động cơ thể (Body Percussion) chỉ có thể áp dụng với các nhạc cụ dân tộc chứ không thể kết hợp bài hát thiếu nhi.',
          isCorrect: false,
          explanation: 'Sai. Body Percussion rất phổ biến và phù hợp để kết hợp với mọi ca khúc thiếu nhi tạo sự sinh động.'
        },
        {
          key: 'b',
          text: 'Bài hát "Con đường học trò" giúp bồi dưỡng cho học sinh tình cảm yêu quý mái trường, kính trọng thầy cô và gắn bó với bạn bè.',
          isCorrect: true,
          explanation: 'Đúng. Đây là giá trị phẩm chất nhân văn cốt lõi của ca khúc.'
        },
        {
          key: 'c',
          text: 'Khởi động giọng bằng mẫu âm trước khi hát giúp làm ấm dây thanh quản, chống khản tiếng và hát cao độ chuẩn xác hơn.',
          isCorrect: true,
          explanation: 'Đúng. Khởi động giọng là khâu bắt buộc trong sư phạm thanh nhạc.'
        },
        {
          key: 'd',
          text: 'Khi biểu diễn đơn ca, học sinh bắt buộc phải đứng im một vị trí và không được phép thể hiện nét mặt biểu cảm.',
          isCorrect: false,
          explanation: 'Sai. Biểu diễn đơn ca cần nét mặt tươi tắn, ánh mắt giao lưu và động tác phụ họa tự nhiên.'
        }
      ],
      score: 1.0,
      level: 'VD',
      topic: 'Cảm thụ & Biểu diễn âm nhạc'
    }
  ],
  partIII: [
    {
      id: 'm6-p3-q1',
      number: 1,
      content: 'Trong số chỉ nhịp 2/4, mỗi ô nhịp có tổng cộng bao nhiêu phách?',
      correctAnswer: '2',
      unit: 'phách',
      score: 0.5,
      level: 'NB',
      topic: 'Nhịp 2/4',
      explanation: 'Số chỉ trên của số chỉ nhịp cho biết số lượng phách trong 1 ô nhịp, tức là 2 phách.'
    },
    {
      id: 'm6-p3-q2',
      number: 2,
      content: 'Một nốt Trắng có giá trị trường độ ngân vang tương đương với bao nhiêu nốt Đen?',
      correctAnswer: '2',
      unit: 'nốt đen',
      score: 0.5,
      level: 'NB',
      topic: 'Trường độ nốt nhạc',
      explanation: '1 nốt trắng = 2 nốt đen.'
    },
    {
      id: 'm6-p3-q3',
      number: 3,
      content: 'Khóa nhạc thường được đặt ở đầu mỗi khuông nhạc dùng cho giọng hát học sinh THCS có tên gọi là khóa gì?',
      correctAnswer: 'Khóa Sol',
      score: 0.5,
      level: 'TH',
      topic: 'Ký hiệu âm nhạc',
      explanation: 'Khóa Sol (Treble clef) là khóa nhạc cơ bản dùng để ghi âm thanh dải trung và cao cho thiếu nhi.'
    },
    {
      id: 'm6-p3-q4',
      number: 4,
      content: 'Kể tên 2 bộ phận cơ thể đơn giản nhất thường dùng trong bài tập Body Percussion đệm cho bài hát?',
      correctAnswer: 'Tay và đùi',
      score: 0.5,
      level: 'VD',
      topic: 'Bộ gõ cơ thể',
      explanation: 'Động tác vỗ tay và vỗ đùi là hai động tác phổ biến và dễ thực hiện nhất trong tiết tấu cơ thể.'
    }
  ],
  partIV: [
    {
      id: 'm6-p4-q1',
      number: 1,
      content: 'Em hãy viết một đoạn văn ngắn (từ 4 đến 6 câu) nêu cảm nhận của em về bài hát "Con đường học trò" (Nhạc và lời: Nguyễn Mộng Lân). Qua bài hát, em thấy con đường đến trường và mái trường có ý nghĩa như thế nào đối với bản thân?',
      criteria: [
        { step: 'Giới thiệu được tên bài hát, tên nhạc sĩ sáng tác và tính chất âm nhạc vui tươi, trong sáng của ca khúc.', score: 0.5 },
        { step: 'Nêu được những hình ảnh đẹp trong lời ca (cây xanh, tiếng chim, trang sách mới, thầy cô, bạn bè...).', score: 0.5 },
        { step: 'Bày tỏ cảm xúc yêu thương mái trường, lòng biết ơn thầy cô và ý thức học tập chăm chỉ mỗi ngày đến trường.', score: 0.5 }
      ],
      totalScore: 1.5,
      level: 'VD',
      topic: 'Cảm thụ âm nhạc & Bồi dưỡng nhân cách'
    },
    {
      id: 'm6-p4-q2',
      number: 2,
      content: 'Em hãy mô tả quy trình thực hành gõ đệm thanh phách cho một câu hát trong nhịp 2/4: Nêu rõ tư thế cầm thanh phách và cách phân biệt gõ phách 1 (mạnh) với phách 2 (nhẹ).',
      criteria: [
        { step: 'Mô tả đúng cách cầm thanh phách: Tay trái giữ một thanh phách ngửa, tay phải cầm thanh gõ thả lỏng cổ tay.', score: 0.5 },
        { step: 'Phân biệt rõ: Phách 1 gõ dứt khoát với lực mạnh vừa phải; Phách 2 gõ nhẹ hơn để tạo độ nảy của nhịp.', score: 0.5 },
        { step: 'Nêu được tác dụng của việc gõ đệm thanh phách trong việc giữ chắc nhịp và tạo sự hào hứng khi hát tập thể.', score: 0.5 }
      ],
      totalScore: 1.5,
      level: 'VD',
      topic: 'Kỹ năng thực hành nhạc cụ sư phạm'
    }
  ],
  matrix: [
    {
      topic: 'Hát & Biểu diễn',
      content: 'Bài hát Con đường học trò (Nhạc & lời: Nguyễn Mộng Lân)',
      partI: { nb: 4, th: 3, vd: 2 },
      partII: { nb: 0, th: 1, vd: 1 },
      partIII: { nb: 2, th: 1, vd: 1 },
      partIV: { nb: 0, th: 0, vd: 2 },
      totalScore: 7.0,
      percentage: 70
    },
    {
      topic: 'Nhạc lý & Nhạc cụ gõ',
      content: 'Số chỉ nhịp 2/4 & Gõ đệm thanh phách, body percussion',
      partI: { nb: 2, th: 1, vd: 0 },
      partII: { nb: 0, th: 0, vd: 0 },
      partIII: { nb: 0, th: 0, vd: 0 },
      partIV: { nb: 0, th: 0, vd: 0 },
      totalScore: 3.0,
      percentage: 30
    }
  ],
  specifications: [
    {
      topic: 'Hát & Biểu diễn',
      content: 'Bài hát Con đường học trò',
      competencyRequired: 'Năng lực thể hiện âm nhạc (NL-TH); Năng lực cảm thụ và hiểu biết âm nhạc (NL-CT)',
      levels: {
        nb: 'Nhận biết tác giả, xuất xứ, tính chất bài hát, tư thế hát chuẩn (Câu 1, 6).',
        th: 'Hiểu phương pháp học hát móc xích, quy tắc lấy hơi và giữ nhịp (Câu 8, 10).',
        vd: 'Hát hòa bè, kết hợp gõ đệm thanh phách và sáng tạo bộ gõ cơ thể (Câu 11, 12, Tự luận 1, 2).'
      },
      questionDistribution: 'Phần I: 8 câu | Phần II: 2 câu | Phần III: 2 câu | Phần IV: 2 câu'
    },
    {
      topic: 'Nhạc lý & Nhạc cụ gõ',
      content: 'Nhịp 2/4 & Đọc nốt',
      competencyRequired: 'Năng lực hiểu biết lý thuyết âm nhạc và thực hành nhạc cụ',
      levels: {
        nb: 'Nhận biết số lượng phách trong nhịp 2/4, nốt Son trên khuông nhạc (Câu 2, 3, 5).',
        th: 'Quy đổi trường độ nốt trắng, nốt đen (Câu 7).',
        vd: 'Ứng dụng gõ đệm giữ vững nhịp độ cùng dàn nhạc.'
      },
      questionDistribution: 'Phần I: 4 câu | Phần II: 0 câu | Phần III: 2 câu | Phần IV: 0 câu'
    }
  ]
};

// ============================================================================
// 2. DỮ LIỆU TOÁN 12 (KHI CHỌN SGK TOÁN 12 HOẶC MÔN TOÁN)
// ============================================================================

export const math12LessonPlan: LessonPlan5512 = {
  header: {
    schoolName: 'TRƯỜNG THPT CHUYÊN HÀ NỘI - AMSTERDAM',
    departmentName: 'TỔ TOÁN - TIN HỌC',
    teacherName: 'ThS. NGUYỄN VĂN CƯỜNG',
    subjectName: 'TOÁN HỌC',
    grade: 'LỚP 12',
    className: '12A1',
    academicYear: '2024 - 2025',
    textbook: 'Kết Nối Tri Thức',
    lessonTitle: 'BÀI 3: KHẢO SÁT VÀ VẼ ĐỒ THỊ CỦA HÀM SỐ (TIẾT 1 & 2)',
    durationPeriods: 2,
    examTitle: 'ĐỀ KIỂM TRA ĐỊNH KỲ GIỮA KỲ II - TOÁN 12 (CHUẨN CV 7991/BGDĐT)',
    examDurationMinutes: 90,
  },
  generalObjectives: {
    knowledge: [
      'Nhận biết và trình bày được sơ đồ tổng quát khảo sát sự biến thiên và vẽ đồ thị của hàm số đa thức bậc ba và hàm phân thức.',
      'Vận dụng thành thạo đạo hàm bậc nhất để tìm tập xác định, các khoảng đơn điệu, cực trị, giới hạn tại vô cực và tiệm cận của đồ thị hàm số.',
      'Nhận dạng tâm đối xứng, trục đối xứng và các điểm đặc biệt của đồ thị hàm số để vẽ đồ thị chính xác.'
    ],
    coreCompetencies: [
      'Năng lực tự chủ và tự học: Tự giác nghiên cứu tài liệu SGK, thực hiện nhiệm vụ cá nhân qua phiếu học tập.',
      'Năng lực giao tiếp và hợp tác: Chủ động thảo luận cặp đôi, phản biện kết quả khảo sát đồ thị của nhóm bạn.',
      'Năng lực giải quyết vấn đề và sáng tạo: Thiết lập mô hình toán học giải quyết bài toán tối ưu hóa chi phí sản xuất thực tế.'
    ],
    subjectCompetencies: [
      'Năng lực tư duy và lập luận toán học: Suy luận tính đơn điệu từ dấu đạo hàm bậc nhất y\'.',
      'Năng lực mô hình hoá toán học: Chuyển đổi ngôn ngữ thực tiễn về cực trị hàm số để xác định lợi nhuận cực đại.',
      'Năng lực sử dụng công cụ, phương tiện học toán: Ứng dụng phần mềm GeoGebra để trực quan hóa đồ thị động.'
    ],
    qualities: [
      'Chăm chỉ: Tích cực hoàn thành các bước lập bảng biến thiên và vẽ hình cẩn thận.',
      'Trung thực: Khách quan trong việc tự đánh giá và chấm chéo sản phẩm học tập.',
      'Trách nhiệm: Có trách nhiệm với nhiệm vụ chung của nhóm trong hoạt động thực hành.'
    ]
  },
  teachingEquipment: {
    teacher: [
      'Kế hoạch bài dạy (KHBD), Phiếu học tập số 1, 2, 3 in trên giấy A4.',
      'Máy chiếu (Projector) hoặc Màn hình tương tác thông minh.',
      'File trình chiếu PowerPoint/GeoGebra minh họa đồ thị hàm số y = ax³ + bx² + cx + d động.'
    ],
    students: [
      'Sách giáo khoa Toán 12, vở ghi bài, bút chì, thước kẻ Parabol.',
      'Máy tính cầm tay bỏ túi (Casio fx-580VN X hoặc tương đương).'
    ],
    digitalAssets: [
      'Mô hình 3D quỹ đạo chuyển động thực tế tương ứng với hàm số bậc ba.',
      'Applet GeoGebra khảo sát tham số a, b, c, d tương tác trực tiếp.'
    ]
  },
  activities: [
    {
      id: 'act-1',
      number: 1,
      title: 'Hoạt động 1: Mở đầu / Khởi động (Kích hoạt tư duy qua tình huống thực tế)',
      timeEstimate: '7 phút',
      objectives: 'Tạo tâm thế hứng thú, gợi nhu cầu tìm hiểu các điểm đặc trưng của đồ thị hàm số từ bài toán quỹ đạo trượt ván uốn lượn thực tế.',
      content: 'Học sinh quan sát hình ảnh đường trượt Skateboard và trả lời câu hỏi: Làm thế nào xác định chính xác điểm thấp nhất, điểm cao nhất và độ dốc tại từng vị trí?',
      product: 'Câu trả lời nhanh của học sinh về sự liên hệ giữa độ dốc với đạo hàm và điểm uốn của cung đường.',
      steps: [
        {
          name: 'Bước 1: Chuyển giao nhiệm vụ',
          teacherAction: 'Giáo viên trình chiếu video ngắn về vận động viên trượt máng và đặt câu hỏi định hướng: "Tại vị trí nào vận động viên đạt vận tốc đổi hướng lớn nhất? Đường cong đó có dạng toán học nào?"',
          studentAction: 'Học sinh quan sát, lắng nghe câu hỏi và suy nghĩ cá nhân trong 1 phút.'
        },
        {
          name: 'Bước 2: Thực hiện nhiệm vụ',
          teacherAction: 'Giáo viên quan sát các bàn, khích lệ học sinh kết nối với kiến thức đạo hàm đã học ở các bài trước.',
          studentAction: 'Học sinh trao đổi nhanh cặp đôi, ghi nhận định ban đầu vào vở nháp.'
        },
        {
          name: 'Bước 3: Báo cáo, thảo luận',
          teacherAction: 'Mời đại diện 2 học sinh đưa ra dự đoán và giải thích tại sao cần một quy trình toán học chặt chẽ để vẽ đồ thị hàm số.',
          studentAction: 'Học sinh đại diện trả lời: Cần tìm tập xác định, tính đạo hàm để biết chỗ lên dốc (đồng biến), xuống dốc (nghịch biến) và đỉnh cực trị.'
        },
        {
          name: 'Bước 4: Kết luận, nhận định',
          teacherAction: 'Giáo viên chuẩn hóa kiến thức, tuyên dương câu trả lời và dẫn dắt vào bài mới: "Để vẽ chính xác bất kỳ đồ thị hàm số nào, chúng ta cần một sơ đồ khảo sát 3 bước chuẩn mực".',
          studentAction: 'Học sinh ghi tựa bài mới vào vở và sẵn sàng bước vào Hoạt động hình thành kiến thức.'
        }
      ]
    },
    {
      id: 'act-2',
      number: 2,
      title: 'Hoạt động 2: Hình thành kiến thức mới (Sơ đồ tổng quát & Khảo sát hàm số bậc ba)',
      timeEstimate: '23 phút',
      objectives: 'Học sinh phát biểu và ghi nhớ sơ đồ khảo sát hàm số 3 bước; thực hiện thành thạo khảo sát hàm số y = x³ - 3x² + 2.',
      content: 'Nghiên cứu SGK mục I & II, hoàn thành Phiếu học tập số 1 về các bước: 1. Tìm TXĐ, tính đạo hàm, giới hạn; 2. Lập BBT; 3. Tìm giao điểm và vẽ đồ thị.',
      product: 'Bảng phụ của 4 nhóm chứa đầy đủ quy trình khảo sát hoàn chỉnh của hàm số y = x³ - 3x² + 2 và hình vẽ đồ thị chính xác.',
      steps: [
        {
          name: 'Bước 1: Chuyển giao nhiệm vụ',
          teacherAction: 'Chia lớp thành 4 nhóm. Phát Phiếu học tập số 1 yêu cầu các nhóm xây dựng sơ đồ khảo sát tổng quát và áp dụng cho hàm số y = x³ - 3x² + 2.',
          studentAction: 'Các nhóm nhận phiếu, bầu nhóm trưởng, thư ký và phân công nhiệm vụ cụ thể.'
        },
        {
          name: 'Bước 2: Thực hiện nhiệm vụ',
          teacherAction: 'Giáo viên đi luân phiên hỗ trợ các nhóm, nhắc nhở cách lấy điểm đối xứng qua tâm I(1; 0) và giao điểm với trục tung (0; 2).',
          studentAction: 'Học sinh thực hiện tính y\' = 3x² - 6x = 0 <=> x = 0 hoặc x = 2; lập BBT và vẽ hệ trục tọa độ Oxy.'
        },
        {
          name: 'Bước 3: Báo cáo, thảo luận',
          teacherAction: 'Gọi nhóm 1 treo bảng phụ báo cáo; yêu cầu nhóm 3 nhận xét phản biện về tính đối xứng và bảng giá trị đặc biệt.',
          studentAction: 'Nhóm 1 thuyết trình các bước giải; nhóm 3 đặt câu hỏi về cách xác định nhanh dấu của tam thức bậc hai y\'.'
        },
        {
          name: 'Bước 4: Kết luận, nhận định',
          teacherAction: 'Giáo viên nhận xét bài làm trên màn hình chiếu GeoGebra, chốt lại quy trình 3 bước chuẩn mực và lưu ý tâm đối xứng là điểm uốn đồ thị.',
          studentAction: 'Học sinh đối chiếu kết quả, ghi sơ đồ khảo sát chuẩn mực vào vở lý thuyết.'
        }
      ]
    },
    {
      id: 'act-3',
      number: 3,
      title: 'Hoạt động 3: Luyện tập (Rèn luyện kỹ năng nhận dạng bảng biến thiên và đồ thị)',
      timeEstimate: '10 phút',
      objectives: 'Rèn luyện phản xạ đọc bảng biến thiên, xác định hệ số a, c, d của hàm số đa thức và giải các bài tập trắc nghiệm nhiều phương án.',
      content: 'Học sinh giải quyết 4 bài tập trắc nghiệm nhận dạng đồ thị và tìm giá trị lớn nhất/nhỏ nhất trên đoạn cho trước.',
      product: 'Đáp án đúng và lời giải ngắn gọn của học sinh trên bảng con hoặc phần mềm trắc nghiệm.',
      steps: [
        {
          name: 'Bước 1: Chuyển giao nhiệm vụ',
          teacherAction: 'Trình chiếu 4 câu hỏi trắc nghiệm rèn luyện tương ứng với dạng đề kiểm tra chuẩn Bộ GD&ĐT.',
          studentAction: 'Học sinh nhận diện câu hỏi, độc lập suy nghĩ tính toán trong 5 phút.'
        },
        {
          name: 'Bước 2: Thực hiện nhiệm vụ',
          teacherAction: 'Quan sát tốc độ làm bài của học sinh, nhắc nhở mẹo nhìn nhánh ngoài cùng bên phải để xác định dấu hệ số a.',
          studentAction: 'Học sinh khoanh đáp án và giải thích nhanh trên giấy nháp.'
        },
        {
          name: 'Bước 3: Báo cáo, thảo luận',
          teacherAction: 'Giơ thẻ trắc nghiệm (A, B, C, D) hoặc gọi ngẫu nhiên học sinh báo cáo kết quả và trình bày căn cứ chọn đáp án.',
          studentAction: 'Học sinh đồng loạt chọn đáp án A, giải thích: Nhánh phải đi lên => a > 0; cắt Oy tại (0; 2) => d = 2.'
        },
        {
          name: 'Bước 4: Kết luận, nhận định',
          teacherAction: 'Giáo viên tổng kết các bẫy thường gặp khi đọc BBT (quên kiểm tra điểm cực trị, nhầm lẫn giữa x cực trị và y cực trị).',
          studentAction: 'Học sinh sửa sai (nếu có) và ghi nhớ các quy tắc nhận dạng đồ thị nhanh.'
        }
      ]
    },
    {
      id: 'act-4',
      number: 4,
      title: 'Hoạt động 4: Vận dụng (Tối ưu hóa hộp chứa hàng trong sản xuất bao bì)',
      timeEstimate: '5 phút',
      objectives: 'Vận dụng khảo sát hàm số để giải quyết bài toán cực trị hình học không gian trong kinh tế - kỹ thuật.',
      content: 'Bài toán: Từ một tấm bìa hình vuông cạnh 60 cm, người ta cắt bỏ 4 hình vuông ở 4 góc rồi gập lại thành chiếc hộp không nắp. Tìm cạnh hình vuông bị cắt để thể tích hộp lớn nhất.',
      product: 'Mô hình hóa hàm thể tích V(x) = x(60 - 2x)², lập BBT và kết luận x = 10 cm cho thể tích cực đại 16.000 cm³.',
      steps: [
        {
          name: 'Bước 1: Chuyển giao nhiệm vụ',
          teacherAction: 'Giáo viên giao nhiệm vụ học tập mở rộng về nhà và hướng dẫn học sinh lập mô hình hàm thể tích V theo ẩn x.',
          studentAction: 'Học sinh ghi chép đề bài và các gợi ý mô hình hóa vào vở bài tập.'
        },
        {
          name: 'Bước 2: Thực hiện nhiệm vụ',
          teacherAction: 'Gợi ý điều kiện của biến x: 0 < x < 30 cm.',
          studentAction: 'Học sinh phác thảo hình vẽ gấp hộp và biểu thức thể tích V = chiều cao x diện tích đáy.'
        },
        {
          name: 'Bước 3: Báo cáo, thảo luận',
          teacherAction: 'Yêu cầu học sinh nộp sản phẩm qua nhóm học tập hoặc trình bày vào đầu tiết sau.',
          studentAction: 'Đại diện học sinh trả lời nhanh định hướng: Tìm đạo hàm V\'(x) = 0 để tìm điểm cực đại.'
        },
        {
          name: 'Bước 4: Kết luận, nhận định',
          teacherAction: 'Dặn dò chuẩn bị bài tiếp theo: Khảo sát hàm phân thức hữu tỉ y = (ax + b)/(cx + d).',
          studentAction: 'Học sinh ghi nhớ nhiệm vụ về nhà và hoàn thiện bài học.'
        }
      ]
    }
  ],
  notes: 'Kế hoạch bài dạy được biên soạn nghiêm ngặt theo đúng cấu trúc 4 hoạt động của Công văn 5512/BGDĐT-GDTrH. Tích hợp năng lực tự chủ và công cụ kỹ thuật số GeoGebra.'
};

export const math12Slides: SlideItem[] = [
  {
    id: 'slide-math-1',
    slideNumber: 1,
    title: 'BÀI 3: KHẢO SÁT VÀ VẼ ĐỒ THỊ HÀM SỐ',
    phase: 'Khởi động',
    bulletPoints: [
      'Môn học: Toán 12 - Chương I: Ứng dụng đạo hàm để khảo sát hàm số',
      'Bộ sách: Kết nối tri thức với cuộc sống / Cánh diều / Chân trời sáng tạo',
      'Mục tiêu trọng tâm: Nắm vững sơ đồ 3 bước chuẩn và nhận diện đồ thị đa thức bậc 3'
    ],
    highlightBox: {
      type: 'question',
      title: 'Tình huống khởi động',
      content: 'Vận động viên trượt máng: Điểm nào đạt vận tốc đổi hướng lớn nhất? Làm sao toán học mô tả chính xác đường cong này?'
    },
    teacherNotes: 'Chiếu hình ảnh đường trượt parabol/bậc ba. Đặt câu hỏi trong 60 giây để khơi gợi tính liên hệ thực tế.',
    timerMinutes: 2
  },
  {
    id: 'slide-math-2',
    slideNumber: 2,
    title: 'SƠ ĐỒ TỔNG QUÁT KHẢO SÁT HÀM SỐ (3 BƯỚC)',
    phase: 'Kiến thức mới',
    bulletPoints: [
      'Bước 1: Tìm tập xác định D của hàm số y = f(x)',
      'Bước 2: Khảo sát sự biến thiên (Tính y\', giải y\' = 0, xét dấu, giới hạn lim, lập Bảng biến thiên)',
      'Bước 3: Vẽ đồ thị (Tìm giao điểm với Ox, Oy, điểm uốn tâm đối xứng, vẽ đường cong trơn mềm)'
    ],
    highlightBox: {
      type: 'formula',
      title: 'Công thức đạo hàm bậc ba',
      content: 'y = ax³ + bx² + cx + d (a ≠ 0)  ==>  y\' = 3ax² + 2bx + c (Phương trình bậc 2 có tối đa 2 nghiệm)'
    },
    teacherNotes: 'Nhấn mạnh: Nếu Δ\' = b² - 3ac ≤ 0 thì hàm số đơn điệu trên R (không có cực trị). Nếu Δ\' > 0 thì có 2 cực trị.',
    timerMinutes: 5
  },
  {
    id: 'slide-math-3',
    slideNumber: 3,
    title: 'VÍ DỤ MẪU: KHẢO SÁT y = x³ - 3x² + 2',
    phase: 'Kiến thức mới',
    bulletPoints: [
      'TXĐ: D = R',
      'Sự biến thiên: y\' = 3x² - 6x = 3x(x - 2). Cho y\' = 0 <=> x = 0 hoặc x = 2',
      'Khoảng đồng biến: (-∞; 0) và (2; +∞); Khoảng nghịch biến: (0; 2)',
      'Điểm cực trị: Cực đại tại (0; 2); Cực tiểu tại (2; -2)',
      'Tâm đối xứng: Điểm uốn I(1; 0) là nghiệm của y\'\' = 6x - 6 = 0'
    ],
    highlightBox: {
      type: 'definition',
      title: 'Tọa độ giao điểm đặc biệt',
      content: 'Giao Oy: (0; 2). Giao Ox: Cho y = 0 <=> (x - 1)(x² - 2x - 2) = 0 <=> x = 1 hoặc x = 1 ± √3'
    },
    teacherNotes: 'Cho học sinh lên bảng vẽ hệ trục Oxy và chấm các điểm đặc biệt trước khi uốn đường cong.',
    timerMinutes: 8
  },
  {
    id: 'slide-math-4',
    slideNumber: 4,
    title: 'LUYỆN TẬP NHẬN DIỆN ĐỒ THỊ NHANH',
    phase: 'Luyện tập',
    bulletPoints: [
      'Quy tắc 1: Nhìn nhánh vô cực bên phải: Đi lên => a > 0; Đi xuống => a < 0',
      'Quy tắc 2: Nhìn giao điểm với trục tung Oy: Điểm cắt là (0; d)',
      'Quy tắc 3: Nhìn số lượng điểm cực trị: 2 cực trị (b² - 3ac > 0), không cực trị (b² - 3ac ≤ 0)',
      'Quy tắc 4: Tọa độ điểm uốn x_uon = -b / (3a)'
    ],
    highlightBox: {
      type: 'task',
      title: 'Thử thách 60 giây',
      content: 'Đồ thị có nét cuối đi xuống, cắt Oy tại điểm có tung độ âm. Hãy xác định dấu của hệ số a và hệ số d?'
    },
    teacherNotes: 'Cho cả lớp giơ bảng A/B/C/D hoặc trả lời đồng thanh. Đáp án: a < 0 và d < 0.',
    timerMinutes: 3
  },
  {
    id: 'slide-math-5',
    slideNumber: 5,
    title: 'VẬN DỤNG THỰC TẾ & TỐI ƯU HÓA HÌNH HỌC',
    phase: 'Vận dụng',
    bulletPoints: [
      'Bài toán sản xuất: Tấm bìa cạnh 60 cm gập thành hộp không nắp có thể tích V(x) lớn nhất',
      'Hàm số: V(x) = x(60 - 2x)² với 0 < x < 30',
      'Đạo hàm: V\'(x) = (60 - 2x)(60 - 6x) = 0 <=> x = 10 (thỏa mãn) hoặc x = 30 (loại)',
      'Kết luận thực tiễn: Cắt cạnh hình vuông góc 10 cm thì thể tích đạt cực đại 16.000 cm³'
    ],
    highlightBox: {
      type: 'definition',
      title: 'Ý nghĩa kinh tế - kỹ thuật',
      content: 'Toán học giúp các nhà thiết kế bao bì tiết kiệm nguyên liệu mà vẫn tối đa hóa dung tích chứa đựng hàng hóa.'
    },
    teacherNotes: 'Gợi mở liên hệ sang các bài toán kinh tế vi mô: Doanh thu, chi phí biên và lợi nhuận cận biên.',
    timerMinutes: 4
  }
];

// ============================================================================
// 3. BỘ SINH NỘI DUNG TỔNG QUÁT THEO BẤT KỲ TÀI LIỆU NÀO ĐƯỢC CHỌN HOẶC NẠP LÊN
// ============================================================================

export function buildDynamicCurriculum(
  docOrHeader: {
    subject?: string;
    grade?: string;
    textbook?: string;
    lessonTitle?: string;
    lessonOrChapter?: string;
    extractedText?: string;
    extractedObjectives?: string[];
    extractedKeyKnowledge?: string[];
    extractedExercises?: string[];
  },
  teacherProfile?: TeacherProfile
): { khbd: LessonPlan5512; slides: SlideItem[]; exam: Exam7991 } {
  const subject = docOrHeader.subject || teacherProfile?.subject || 'Âm Nhạc';
  const grade = docOrHeader.grade || teacherProfile?.defaultGrade || 'LỚP 6';
  const textbook = docOrHeader.textbook || teacherProfile?.defaultTextbook || 'Kết Nối Tri Thức';
  const lessonTitle = docOrHeader.lessonTitle || docOrHeader.lessonOrChapter || 'Bài dạy theo chương trình GDPT 2018';
  const teacherName = teacherProfile?.fullName || 'Nguyễn Thị Duyên Thanh';
  const schoolName = teacherProfile?.schoolName || 'Trường THCS Long Hồ';
  const departmentName = teacherProfile?.departmentName || 'Tổ Chuyên Môn';

  // Nếu là Âm Nhạc hoặc bài hát / chủ đề âm nhạc -> Dùng template sư phạm Âm Nhạc chuyên sâu
  const isMusic = subject.toLowerCase().includes('âm nhạc') || 
                  lessonTitle.toLowerCase().includes('hát') || 
                  lessonTitle.toLowerCase().includes('con đường học trò');

  if (isMusic) {
    const isConDuongHocTro = lessonTitle.toLowerCase().includes('con đường học trò') && grade.includes('6');

    if (isConDuongHocTro && (!docOrHeader.extractedObjectives || docOrHeader.extractedObjectives.length === 0)) {
      return {
        khbd: {
          ...music6LessonPlan,
          header: {
            ...music6LessonPlan.header,
            subjectName: 'ÂM NHẠC',
            grade: grade,
            textbook: textbook,
            lessonTitle: lessonTitle.toUpperCase(),
            teacherName: teacherName.toUpperCase(),
            schoolName: schoolName.toUpperCase(),
            departmentName: departmentName.toUpperCase(),
          }
        },
        slides: music6Slides.map((s, idx) => idx === 0 ? {
          ...s,
          title: lessonTitle.toUpperCase(),
          bulletPoints: [
            `Môn học: Âm Nhạc - ${grade}`,
            `Bộ sách: ${textbook}`,
            `Giáo viên: ${teacherName} · Đơn vị: ${schoolName}`,
            `Nội dung trọng tâm: Thực hành ca hát, gõ đệm tiết tấu và cảm thụ âm nhạc`
          ]
        } : s),
        exam: {
          ...music6Exam,
          header: {
            ...music6Exam.header,
            subjectName: 'ÂM NHẠC',
            grade: grade,
            textbook: textbook,
            lessonTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ - MÔN ÂM NHẠC ${grade.replace(/\D+/g, '') || '6'}`,
            teacherName: teacherName.toUpperCase(),
            schoolName: schoolName.toUpperCase(),
            departmentName: departmentName.toUpperCase()
          }
        }
      };
    }

    // Tự động tìm bài học khớp trong mục lục SGK Kết Nối Tri Thức của khối lớp này
    const toc = generateTableOfContentsForBook('Âm Nhạc', grade, 'Kết Nối Tri Thức');
    const matchedLesson = toc.find(l => 
      l.title.toLowerCase() === lessonTitle.toLowerCase() || 
      lessonTitle.toLowerCase().includes(l.title.toLowerCase()) ||
      l.title.toLowerCase().includes(lessonTitle.toLowerCase())
    );

    const objectives = (docOrHeader.extractedObjectives && docOrHeader.extractedObjectives.length > 0)
      ? docOrHeader.extractedObjectives
      : (matchedLesson ? matchedLesson.objectives : [
          `Hát đúng giai điệu, lời ca, cao độ và trường độ bài: ${lessonTitle}.`,
          `Nắm vững kiến thức nhạc lý, thực hành gõ đệm tiết tấu hoặc nhạc cụ học đường môn Âm Nhạc ${grade}.`,
          `Cảm nhận vẻ đẹp giai điệu, bồi dưỡng phẩm chất thẩm mỹ âm nhạc và tự tin biểu diễn.`
        ]);

    const keyKnowledge = (docOrHeader.extractedKeyKnowledge && docOrHeader.extractedKeyKnowledge.length > 0)
      ? docOrHeader.extractedKeyKnowledge
      : (matchedLesson ? matchedLesson.keyKnowledge : [
          `Kiến thức cốt lõi và kỹ thuật thể hiện của bài học ${lessonTitle}.`,
          `Quy chuẩn lý thuyết âm nhạc theo bộ sách Kết Nối Tri Thức với Cuộc Sống.`,
          `Kỹ năng thực hành bộ gõ cơ thể (Body Percussion) và nhạc cụ học đường.`
        ]);

    const exercises = (docOrHeader.extractedExercises && docOrHeader.extractedExercises.length > 0)
      ? docOrHeader.extractedExercises
      : (matchedLesson ? matchedLesson.exercises : [
          `Thực hành hát / đọc nhạc kết hợp gõ đệm nhạc cụ tiết tấu.`,
          `Trình diễn theo nhóm / tốp ca / đơn ca trước tập thể lớp.`,
          `Sáng tạo động tác vận động phụ họa phù hợp tính chất bài học.`
        ]);

    const dynamicMusicKhbd: LessonPlan5512 = {
      header: {
        schoolName: schoolName.toUpperCase(),
        departmentName: departmentName.toUpperCase(),
        teacherName: teacherName.toUpperCase(),
        subjectName: 'ÂM NHẠC',
        grade: grade,
        className: grade.includes('6') ? '6A1' : grade.includes('7') ? '7A1' : grade.includes('8') ? '8A1' : '9A1',
        academicYear: '2024 - 2025',
        textbook: 'Kết Nối Tri Thức',
        lessonTitle: lessonTitle.toUpperCase(),
        durationPeriods: 1,
        examTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ - MÔN ÂM NHẠC ${grade} (CHUẨN CV 7991/BGDĐT)`,
        examDurationMinutes: 45,
      },
      generalObjectives: {
        knowledge: objectives,
        coreCompetencies: [
          'Năng lực tự chủ và tự học: Tự giác khởi động giọng theo thang âm, chủ động đọc lời ca theo tiết tấu và tập các câu khó.',
          'Năng lực giao tiếp và hợp tác: Biết chia sẻ, hòa giọng ăn ý với các bạn khi hát tốp ca, hòa tấu nhạc cụ và lắng nghe nhóm bạn.',
          'Năng lực giải quyết vấn đề và sáng tạo: Sáng tạo các động tác vận động cơ thể (Body Percussion) hoặc phụ họa cho bài học.'
        ],
        subjectCompetencies: [
          `Năng lực thể hiện âm nhạc: Hát đúng cao độ, lấy hơi chuẩn xác, thể hiện sắc thái biểu cảm và gõ đệm nhịp nhàng bài ${lessonTitle}.`,
          `Năng lực cảm thụ và hiểu biết âm nhạc: Cảm nhận được nét giai điệu và thông điệp nhân văn trong chương trình Âm Nhạc ${grade} - Kết Nối Tri Thức.`,
          `Năng lực ứng dụng và sáng tạo âm nhạc: Vận dụng bộ gõ cơ thể, thanh phách, trống con, kèn recorder hoặc kèn phím để biểu diễn.`
        ],
        qualities: [
          'Yêu nước & Nhân ái: Bồi dưỡng tình yêu quê hương, gia đình, mái trường và niềm tự hào truyền thống văn hóa dân tộc.',
          'Chăm chỉ: Tích cực luyện thanh, kiên trì tập luyện nhạc cụ và kỹ năng đọc nhạc.',
          'Trách nhiệm: Có ý thức bảo quản nhạc cụ của nhà trường, phối hợp chặt chẽ cùng nhóm học tập.'
        ]
      },
      teachingEquipment: {
        teacher: [
          'Đàn phím điện tử (Keyboard/Organ), thanh phách, trống con, kèn recorder / kèn phím.',
          `Sách giáo khoa, sách giáo viên Âm Nhạc ${grade} (Bộ sách Kết Nối Tri Thức với Cuộc Sống).`,
          `Slide bài giảng điện tử 16:9, video clip bài học và file âm thanh beat nhạc ${lessonTitle}.`
        ],
        students: [
          `Sách giáo khoa Âm Nhạc ${grade} (Kết Nối Tri Thức), vở ghi bài chép nhạc.`,
          'Nhạc cụ gõ thanh phách (hoặc nhạc cụ tự làm) và kèn recorder / kèn phím theo hướng dẫn.'
        ],
        digitalAssets: [
          'Bản nhạc điện tử số hóa hiển thị nốt nhạc chạy theo nhịp trên nền tảng EdTech.',
          'Clip ngắn mô phỏng động tác gõ đệm Body Percussion và hòa tấu nhạc cụ.'
        ]
      },
      activities: [
        {
          id: 'act-1',
          number: 1,
          title: `Hoạt động 1: Mở đầu / Khởi động (Trò chơi âm nhạc & Luyện thanh cho bài ${lessonTitle})`,
          timeEstimate: '7 phút',
          objectives: `Tạo không khí học tập hào hứng, kết nối cảm xúc với bài ${lessonTitle} và khởi động giọng hát chuẩn xác.`,
          content: '1. Khởi động giọng theo mẫu âm Mi - Ma trên thang âm phù hợp. 2. Trò chơi âm nhạc hoặc nghe giai điệu dẫn dắt vào bài.',
          product: 'Học sinh luyện thanh đồng thanh đúng cao độ, tư thế ngồi thẳng lưng, thả lỏng cổ họng.',
          steps: [
            {
              name: 'Bước 1: Chuyển giao nhiệm vụ',
              teacherAction: `Giáo viên đàn thang âm và hướng dẫn khẩu hình mẫu tròn vành, rõ chữ cho bài: ${lessonTitle}.`,
              studentAction: 'Học sinh chú ý lắng nghe, chuẩn bị tư thế ngồi hát ngay ngắn và điều chỉnh nhịp thở.'
            },
            {
              name: 'Bước 2: Thực hiện nhiệm vụ',
              teacherAction: 'Giáo viên đàn từng bậc âm từ thấp lên cao và ngược lại, bắt nhịp cho học sinh khởi động giọng.',
              studentAction: 'Học sinh đồng thanh luyện giọng theo tiếng đàn của cô giáo: "Mi... Ma... Mi... Ma...".'
            },
            {
              name: 'Bước 3: Báo cáo, thảo luận',
              teacherAction: 'Giáo viên nhận xét độ vang và tư thế lấy hơi của các dãy bàn.',
              studentAction: 'Học sinh tự điều chỉnh luồng hơi ở bụng để âm thanh vang sáng tự nhiên.'
            },
            {
              name: 'Bước 4: Kết luận, nhận định',
              teacherAction: `Giáo viên khen ngợi cả lớp và dẫn dắt giới thiệu vào nội dung trọng tâm bài học: ${lessonTitle}.`,
              studentAction: 'Học sinh ghi tên bài học vào vở và mở SGK Kết Nối Tri Thức để bắt đầu tiết học.'
            }
          ]
        },
        {
          id: 'act-2',
          number: 2,
          title: `Hoạt động 2: Hình thành kiến thức mới (Khám phá nội dung bài ${lessonTitle})`,
          timeEstimate: '15 phút',
          objectives: `Học sinh nắm vững kiến thức cốt lõi: ${keyKnowledge[0] || 'giai điệu, lời ca, nhạc lý và cấu trúc bài học'}.`,
          content: `Khám phá các yếu tố âm nhạc trong bài ${lessonTitle}: nhịp điệu, cao độ, hình nốt, tác giả và ý nghĩa tác phẩm.`,
          product: 'Học sinh trả lời đúng câu hỏi tìm hiểu bài và hát/đọc mẫu đúng câu nhạc đầu tiên.',
          steps: [
            {
              name: 'Bước 1: Chuyển giao nhiệm vụ',
              teacherAction: `Giáo viên trình bày bài mẫu (hoặc mở file âm thanh chất lượng cao), hướng dẫn học sinh quan sát bản nhạc ${lessonTitle}.`,
              studentAction: 'Học sinh lắng nghe giai điệu, cảm nhận tính chất âm nhạc và quan sát các ký hiệu trong SGK.'
            },
            {
              name: 'Bước 2: Thực hiện nhiệm vụ',
              teacherAction: 'Giáo viên chia câu ngắn, phân tích chỗ lấy hơi và hướng dẫn đọc lời ca theo hình tiết tấu.',
              studentAction: 'Học sinh đọc lời ca đồng thanh kết hợp vỗ tay theo phách.'
            },
            {
              name: 'Bước 3: Báo cáo, thảo luận',
              teacherAction: 'Giáo viên mời đại diện nhóm nêu nhận xét về tính chất giai điệu và ý nghĩa ca từ bài học.',
              studentAction: 'Đại diện nhóm phát biểu cảm nhận về bài hát/nội dung nhạc lý.'
            },
            {
              name: 'Bước 4: Kết luận, nhận định',
              teacherAction: 'Giáo viên chốt lại kiến thức trọng tâm, khen ngợi tinh thần phát biểu của học sinh.',
              studentAction: 'Học sinh ghi nhớ điểm lưu ý khi hát/thực hành bài học.'
            }
          ]
        },
        {
          id: 'act-3',
          number: 3,
          title: `Hoạt động 3: Luyện tập (Thực hành ca hát / Nhạc cụ / Đọc nhạc bài ${lessonTitle})`,
          timeEstimate: '15 phút',
          objectives: `Học sinh thực hành thành thạo: ${exercises[0] || 'hát móc xích từng câu kết hợp gõ đệm thanh phách'}.`,
          content: 'Luyện tập theo các hình thức: Hát đồng ca, tốp ca, luân phiên nam nữ và gõ đệm nhạc cụ.',
          product: 'Tập thể lớp và các nhóm thể hiện trọn vẹn bài học với sắc thái biểu cảm tươi vui, nhịp nhàng.',
          steps: [
            {
              name: 'Bước 1: Chuyển giao nhiệm vụ',
              teacherAction: 'Giáo viên đàn từng câu ngắn theo lối móc xích và bắt nhịp cho học sinh hát nối tiếp.',
              studentAction: 'Học sinh hát theo tiếng đàn từng câu cho đến hết toàn bộ bài học.'
            },
            {
              name: 'Bước 2: Thực hiện nhiệm vụ',
              teacherAction: 'Giáo viên chia lớp thành 2 nhóm: Nhóm 1 hát giai điệu, Nhóm 2 gõ đệm thanh phách theo phách.',
              studentAction: 'Hai nhóm thực hiện phối hợp nhịp nhàng, sau đó đổi vai trò cho nhau.'
            },
            {
              name: 'Bước 3: Báo cáo, thảo luận',
              teacherAction: 'Giáo viên gọi 1 nhóm lên bảng biểu diễn, hướng dẫn các bạn dưới lớp lắng nghe và nhận xét.',
              studentAction: 'Nhóm lên bảng tự tin trình bày; các nhóm còn lại nhận xét về cao độ, nhịp phách.'
            },
            {
              name: 'Bước 4: Kết luận, nhận định',
              teacherAction: 'Giáo viên sửa các chỗ học sinh hát chưa chuẩn cao độ (nốt luyến, nốt ngân dài), động viên khích lệ.',
              studentAction: 'Cả lớp cùng hát lại một lần trọn vẹn với sắc thái biểu cảm nhất.'
            }
          ]
        },
        {
          id: 'act-4',
          number: 4,
          title: `Hoạt động 4: Vận dụng & Mở rộng (Sáng tạo Body Percussion / Biểu diễn nghệ thuật)`,
          timeEstimate: '8 phút',
          objectives: 'Phát triển năng lực sáng tạo âm nhạc, tự tin biểu diễn trước tập thể và gắn kết tình bạn bè.',
          content: `Sáng tạo động tác vận động cơ thể (vỗ tay, vỗ đùi, dậm chân) hoặc hòa tấu kèn recorder đệm cho bài: ${lessonTitle}.`,
          product: 'Phần trình diễn sinh động, sáng tạo của các nhóm học sinh.',
          steps: [
            {
              name: 'Bước 1: Chuyển giao nhiệm vụ',
              teacherAction: 'Giáo viên gợi ý chuỗi vận động cơ thể 3 động tác: Vỗ tay - Vỗ đùi - Dậm chân theo nhịp phách.',
              studentAction: 'Các tổ hội ý nhanh trong 2 phút để thống nhất động tác phụ họa cho nhóm mình.'
            },
            {
              name: 'Bước 2: Thực hiện nhiệm vụ',
              teacherAction: 'Giáo viên bật nhạc đệm beat, đi quan sát và hỗ trợ các nhóm ghép động tác.',
              studentAction: 'Các nhóm hăng hái tập luyện kết hợp hát và vận động cơ thể.'
            },
            {
              name: 'Bước 3: Báo cáo, thảo luận',
              teacherAction: 'Mời đại diện các tổ thi đua biểu diễn xem tổ nào đều và đẹp nhất.',
              studentAction: 'Các tổ lần lượt biểu diễn trước tràng pháo tay cổ vũ của cả lớp.'
            },
            {
              name: 'Bước 4: Kết luận, nhận định',
              teacherAction: `Giáo viên tổng kết tiết học, dặn dò học sinh luyện tập thêm ở nhà và chuẩn bị cho tiết học tiếp theo.`,
              studentAction: 'Học sinh ghi nhớ dặn dò và kết thúc tiết học trong không khí hân hoan.'
            }
          ]
        }
      ],
      notes: `Kế hoạch bài dạy môn Âm Nhạc ${grade} theo định hướng phát triển năng lực và phẩm chất học sinh (Chuẩn Công văn 5512/BGDĐT-GDTrH). Tích hợp đổi mới phương pháp giảng dạy theo bộ sách Kết Nối Tri Thức với Cuộc Sống.`
    };

    const dynamicMusicSlides: SlideItem[] = [
      {
        id: 'mslide-1',
        slideNumber: 1,
        title: lessonTitle.toUpperCase(),
        phase: 'Khởi động',
        bulletPoints: [
          `Môn học: Âm Nhạc ${grade} - Bộ sách Kết Nối Tri Thức với Cuộc Sống`,
          `Giáo viên giảng dạy: ${teacherName}`,
          `Đơn vị công tác: ${schoolName} - ${departmentName}`,
          `Kế hoạch bài dạy chuẩn Công văn 5512/BGDĐT-GDTrH`,
          `Nội dung: Thực hành ca hát, nhạc cụ, đọc nhạc và phát triển năng lực âm nhạc`
        ],
        highlightBox: {
          type: 'task',
          title: 'Yêu cầu tiết học',
          content: 'Tích cực tương tác, luyện thanh đúng tư thế, chủ động sáng tạo động tác gõ đệm.'
        },
        teacherNotes: `Chào mừng các em học sinh đến với tiết học Âm Nhạc ${grade}. Hôm nay cô trò ta cùng học bài: ${lessonTitle}.`,
        timerMinutes: 2
      },
      {
        id: 'mslide-2',
        slideNumber: 2,
        title: 'MỤC TIÊU CẦN ĐẠT CỦA BÀI HỌC',
        phase: 'Khởi động',
        bulletPoints: [
          `Về kiến thức: ${objectives[0] || 'Hát đúng giai điệu và lời ca bài học'}`,
          `Về kỹ năng: ${objectives[1] || 'Gõ đệm tiết tấu và đọc nhạc chuẩn xác'}`,
          `Về năng lực: Tự chủ, hợp tác nhóm, cảm thụ và sáng tạo âm nhạc`,
          `Về phẩm chất: ${objectives[2] || 'Bồi dưỡng tình yêu quê hương, mái trường và nét đẹp nghệ thuật'}`
        ],
        highlightBox: {
          type: 'definition',
          title: 'Chuẩn GDPT 2018',
          content: 'Phát triển 3 năng lực đặc thù: Thể hiện âm nhạc, Cảm thụ âm nhạc, Ứng dụng sáng tạo.'
        },
        teacherNotes: 'Giáo viên nhấn mạnh các yêu cầu cần đạt trọng tâm của tiết học để học sinh chủ động nắm bắt.',
        timerMinutes: 3
      },
      {
        id: 'mslide-3',
        slideNumber: 3,
        title: 'HOẠT ĐỘNG 1: KHỞI ĐỘNG & LUYỆN THANH',
        phase: 'Khởi động',
        bulletPoints: [
          'Tư thế ngồi hát: Lưng thẳng, hai vai thả lỏng, hai chân chạm sàn',
          'Khẩu hình: Mở rộng vòm họng theo chiều dọc, thả lỏng quai hàm',
          'Hơi thở: Lấy hơi sâu bằng bụng, giữ hơi và nhả hơi đều đặn',
          'Thực hành mẫu âm: Mi... Ma... theo thang âm từ thấp lên cao'
        ],
        highlightBox: {
          type: 'formula',
          title: 'Mẫu âm luyện thanh',
          content: 'Đô - Rê - Mi - Son - La (Mi... Ma... Mi... Ma...)'
        },
        teacherNotes: 'Giáo viên đàn thang âm và hướng dẫn cả lớp khởi động giọng 2-3 lần để chuẩn bị giọng hát tốt nhất.',
        timerMinutes: 5
      },
      {
        id: 'mslide-4',
        slideNumber: 4,
        title: 'HOẠT ĐỘNG 2: HÌNH THÀNH KIẾN THỨC MỚI',
        phase: 'Kiến thức mới',
        bulletPoints: [
          `Kiến thức trọng tâm: ${keyKnowledge[0] || 'Giai điệu mượt mà, cấu trúc khúc chiết'}`,
          `Đặc trưng nhạc lý: ${keyKnowledge[1] || 'Nhịp điệu nhịp nhàng, sắc thái vui tươi'}`,
          `Kỹ thuật thể hiện: ${keyKnowledge[2] || 'Lấy hơi đúng chỗ ngắt câu, hát liền giọng'}`,
          'Lắng nghe giai điệu mẫu và cảm nhận thông điệp ý nghĩa của tác phẩm'
        ],
        highlightBox: {
          type: 'question',
          title: 'Câu hỏi khám phá',
          content: 'Giai điệu bài hát gợi cho em cảm xúc và hình ảnh gì nổi bật nhất?'
        },
        teacherNotes: 'Giáo viên mở file nhạc mẫu và phân tích cấu trúc bài hát cho học sinh theo dõi trong SGK.',
        timerMinutes: 15
      },
      {
        id: 'mslide-5',
        slideNumber: 5,
        title: 'HOẠT ĐỘNG 3: THỰC HÀNH & LUYỆN TẬP',
        phase: 'Luyện tập',
        bulletPoints: [
          `Hình thức 1: ${exercises[0] || 'Tập hát từng câu theo lối móc xích theo tiếng đàn'}`,
          `Hình thức 2: ${exercises[1] || 'Hát hòa giọng tốp ca nam nữ luân phiên'}`,
          `Hình thức 3: ${exercises[2] || 'Gõ đệm thanh phách theo hình tiết tấu nhịp nhàng'}`,
          'Sửa lỗi cao độ ở các nốt luyến, nốt ngân dài và giữ vững nhịp độ'
        ],
        highlightBox: {
          type: 'task',
          title: 'Nhiệm vụ nhóm',
          content: 'Nhóm 1 hát giai điệu, Nhóm 2 gõ đệm thanh phách theo nhịp 2/4.'
        },
        teacherNotes: 'Chia lớp làm 2 nhóm thực hành phối hợp giữa nhóm hát và nhóm gõ đệm tiết tấu.',
        timerMinutes: 15
      },
      {
        id: 'mslide-6',
        slideNumber: 6,
        title: 'HOẠT ĐỘNG 4: VẬN DỤNG & SÁNG TẠO',
        phase: 'Vận dụng',
        bulletPoints: [
          'Sáng tạo chuỗi vận động cơ thể: Vỗ tay 👏 - Vỗ đùi 🦵 - Dậm chân 🦶',
          'Biểu diễn giao lưu giữa các tổ / nhóm học tập',
          'Đánh giá chéo và bình chọn tiết mục biểu diễn ấn tượng nhất',
          'Dặn dò: Luyện tập hát và gõ đệm ở nhà, chuẩn bị cho bài học sau'
        ],
        highlightBox: {
          type: 'task',
          title: 'Thử thách sáng tạo',
          content: 'Tự chọn 1 nhạc cụ tự tạo (hoặc vỗ tay) để hòa âm cùng nhóm bạn.'
        },
        teacherNotes: 'Khuyến khích học sinh tự do sáng tạo động tác vận động cơ thể để tiết học thêm sôi nổi.',
        timerMinutes: 5
      }
    ];

    const dynamicMusicExam: Exam7991 = {
      header: {
        schoolName: schoolName.toUpperCase(),
        departmentName: departmentName.toUpperCase(),
        teacherName: teacherName.toUpperCase(),
        subjectName: 'ÂM NHẠC',
        grade: grade,
        className: grade.includes('6') ? '6A1' : grade.includes('7') ? '7A1' : grade.includes('8') ? '8A1' : '9A1',
        academicYear: '2024 - 2025',
        textbook: 'Kết Nối Tri Thức',
        lessonTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ - MÔN ÂM NHẠC ${grade} (CHUẨN CV 7991/BGDĐT)`,
        durationPeriods: 1,
        examTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ ÂM NHẠC ${grade} (CHUẨN CV 7991/BGDĐT)`,
        examDurationMinutes: 45,
      },
      summary: {
        totalPoints: 10.0,
        partIPoints: 3.0,
        partIIPoints: 2.0,
        partIIIPoints: 2.0,
        partIVPoints: 3.0,
        ratio: { nb: 4.0, th: 3.0, vd: 3.0 }
      },
      partI: [
        {
          id: 'mus-p1-q1',
          number: 1,
          content: `Bài học "${lessonTitle}" thuộc chương trình Âm Nhạc ${grade} - Bộ sách Kết Nối Tri Thức được viết với sắc thái và tính chất âm nhạc như thế nào?`,
          options: [
            { key: 'A', text: 'Vui tươi, trong sáng, mang đậm tính giáo dục thẩm mỹ' },
            { key: 'B', text: 'U buồn, trầm lắng, nhịp điệu tự do' },
            { key: 'C', text: 'Hỗn loạn, không có nhịp điệu xác định' },
            { key: 'D', text: 'Chỉ dành cho biểu diễn độc tấu chuyên nghiệp' }
          ],
          correctAnswer: 'A',
          score: 0.25,
          level: 'NB',
          topic: 'Kiến thức tác phẩm',
          explanation: 'Căn cứ vào phần giới thiệu bài học trong SGK Âm Nhạc Kết Nối Tri Thức.'
        },
        {
          id: 'mus-p1-q2',
          number: 2,
          content: 'Khi thực hiện hát, tư thế nào sau đây là ĐÚNG theo chuẩn sư phạm thanh nhạc?',
          options: [
            { key: 'A', text: 'Ngồi tựa lưng ra sau, cúi gằm mặt xuống bàn' },
            { key: 'B', text: 'Ngồi thẳng lưng, thả lỏng vai, ngực mở tự nhiên, hai chân chạm sàn' },
            { key: 'C', text: 'Đứng vặn người sang một bên, hóp ngực lại' },
            { key: 'D', text: 'Nằm dài trên bàn để lấy hơi cho sâu' }
          ],
          correctAnswer: 'B',
          score: 0.25,
          level: 'NB',
          topic: 'Kỹ thuật hát',
          explanation: 'Tư thế ngồi thẳng lưng và thả lỏng giúp luồng hơi lưu thông tốt nhất.'
        },
        {
          id: 'mus-p1-q3',
          number: 3,
          content: 'Nhạc cụ nào sau đây là nhạc cụ gõ tiết tấu thường được sử dụng trong trường học?',
          options: [
            { key: 'A', text: 'Thanh phách, song loan, trống con' },
            { key: 'B', text: 'Đàn piano đại dương cầm' },
            { key: 'C', text: 'Kèn tuba' },
            { key: 'D', text: 'Đàn hạc Harp' }
          ],
          correctAnswer: 'A',
          score: 0.25,
          level: 'NB',
          topic: 'Nhạc cụ học đường',
          explanation: 'Thanh phách, song loan, trống con là bộ gõ tiết tấu cơ bản trong môn Âm nhạc THCS.'
        },
        {
          id: 'mus-p1-q4',
          number: 4,
          content: 'Trong ký hiệu âm nhạc, khoảng cách cao độ giữa hai âm thanh vang lên được gọi là gì?',
          options: [
            { key: 'A', text: 'Quãng âm nhạc' },
            { key: 'B', text: 'Trường độ' },
            { key: 'C', text: 'Cường độ' },
            { key: 'D', text: 'Âm sắc' }
          ],
          correctAnswer: 'A',
          score: 0.25,
          level: 'NB',
          topic: 'Nhạc lý cơ bản',
          explanation: 'Quãng là khoảng cách về cao độ giữa hai âm thanh trong âm nhạc.'
        }
      ],
      partII: [
        {
          id: 'mus-p2-q1',
          number: 1,
          stem: `Cho các nhận định về phương pháp học tập và biểu diễn bài "${lessonTitle}":`,
          statements: [
            { key: 'a', text: 'Cần lấy hơi ở cuối mỗi câu hát để giữ cho câu hát liền mạch, tròn vành.', isCorrect: true, explanation: 'Đúng theo kỹ thuật ngắt câu lấy hơi trong thanh nhạc.' },
            { key: 'b', text: 'Chỉ cần hát to hết mức có thể, không cần chú ý đến cao độ và nhịp phách.', isCorrect: false, explanation: 'Sai, hát phải đúng cao độ, trường độ và sắc thái vừa phải.' },
            { key: 'c', text: 'Có thể sáng tạo vận động cơ thể (Body Percussion) để làm phong phú phần biểu diễn.', isCorrect: true, explanation: 'Đúng, đây là năng lực ứng dụng và sáng tạo âm nhạc theo GDPT 2018.' },
            { key: 'd', text: 'Khi gõ đệm thanh phách, phách mạnh gõ dứt khoát, phách nhẹ gõ êm hơn.', isCorrect: true, explanation: 'Đúng theo nguyên lý gõ đệm tiết tấu.' }
          ],
          score: 1.0,
          level: 'TH',
          topic: 'Kỹ năng thực hành'
        }
      ],
      partIII: [
        {
          id: 'mus-p3-q1',
          number: 1,
          content: 'Trong nhịp 2/4, mỗi ô nhịp có mấy phách? (Chỉ điền số)',
          correctAnswer: '2',
          unit: 'phách',
          score: 0.5,
          level: 'TH',
          topic: 'Nhạc lý',
          explanation: 'Nhịp 2/4 gồm có 2 phách trong một ô nhịp, mỗi phách có giá trị bằng một nốt đen.'
        }
      ],
      partIV: [
        {
          id: 'mus-p4-q1',
          number: 1,
          content: `Vận dụng thực hành: Trình diễn bài hát hoặc bài đọc nhạc trong bài "${lessonTitle}" kết hợp gõ đệm thanh phách theo hình tiết tấu (hoặc vận động cơ thể).`,
          criteria: [
            { step: 'Hát đúng cao độ, trường độ, thuộc lời ca và rõ lời.', score: 1.0 },
            { step: 'Gõ đệm tiết tấu hoặc động tác vận động cơ thể nhịp nhàng, đúng phách.', score: 1.0 },
            { step: 'Tư thế biểu diễn tự tin, sắc thái tình cảm phù hợp với tác phẩm.', score: 1.0 }
          ],
          totalScore: 3.0,
          level: 'VD',
          topic: 'Thực hành biểu diễn'
        }
      ],
      matrix: [
        {
          topic: 'Lý thuyết âm nhạc & Đọc nhạc',
          content: 'Nhạc lý, ký hiệu nốt và bài đọc nhạc',
          partI: { nb: 2, th: 0, vd: 0 },
          partII: { nb: 0, th: 1, vd: 0 },
          partIII: { nb: 0, th: 1, vd: 0 },
          partIV: { nb: 0, th: 0, vd: 0 },
          totalScore: 3.0,
          percentage: 30
        },
        {
          topic: 'Học hát & Nhạc cụ thực hành',
          content: lessonTitle,
          partI: { nb: 2, th: 0, vd: 0 },
          partII: { nb: 0, th: 0, vd: 0 },
          partIII: { nb: 0, th: 0, vd: 0 },
          partIV: { nb: 0, th: 0, vd: 1 },
          totalScore: 7.0,
          percentage: 70
        }
      ],
      specifications: [
        {
          topic: 'Âm Nhạc',
          content: lessonTitle,
          competencyRequired: 'Năng lực thể hiện âm nhạc; Năng lực cảm thụ và hiểu biết âm nhạc; Năng lực ứng dụng và sáng tạo âm nhạc',
          levels: {
            nb: 'Nhận biết cao độ, trường độ, tác giả và nội dung cơ bản của bài học.',
            th: 'Hiểu tính chất nhịp điệu, phân biệt được phách mạnh - phách nhẹ và cách gõ đệm.',
            vd: 'Trình diễn tự tin ca khúc kết hợp gõ đệm nhạc cụ hoặc vận động cơ thể sáng tạo.'
          },
          questionDistribution: 'Phần I: 4 câu | Phần II: 1 câu | Phần III: 1 câu | Phần IV: 1 câu thực hành'
        }
      ]
    };

    return {
      khbd: dynamicMusicKhbd,
      slides: dynamicMusicSlides,
      exam: dynamicMusicExam
    };
  }

  // Nếu là Toán học -> Dùng template Toán 12 chuyên sâu
  const isMath = subject.toLowerCase().includes('toán') || 
                 lessonTitle.toLowerCase().includes('hàm số') || 
                 lessonTitle.toLowerCase().includes('đồ thị');

  if (isMath) {
    return {
      khbd: {
        ...math12LessonPlan,
        header: {
          ...math12LessonPlan.header,
          subjectName: 'TOÁN HỌC',
          grade: grade,
          textbook: textbook,
          lessonTitle: lessonTitle.toUpperCase(),
          teacherName: teacherName.toUpperCase(),
          schoolName: schoolName.toUpperCase(),
          departmentName: departmentName.toUpperCase(),
        }
      },
      slides: math12Slides.map((s, idx) => idx === 0 ? {
        ...s,
        title: lessonTitle.toUpperCase(),
        bulletPoints: [
          `Môn học: Toán Học - ${grade}`,
          `Bộ sách: ${textbook}`,
          `Giáo viên: ${teacherName} · Đơn vị: ${schoolName}`,
          `Mục tiêu: Nắm vững phương pháp và giải quyết các bài toán ứng dụng`
        ]
      } : s),
      exam: {
        header: {
          schoolName: schoolName.toUpperCase(),
          departmentName: departmentName.toUpperCase(),
          teacherName: teacherName.toUpperCase(),
          subjectName: 'TOÁN HỌC',
          grade: grade,
          className: grade,
          academicYear: '2024 - 2025',
          textbook: textbook,
          lessonTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ - MÔN TOÁN HỌC ${grade}`,
          durationPeriods: 2,
          examTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ TOÁN ${grade} (CHUẨN CV 7991/BGDĐT)`,
          examDurationMinutes: 90,
        },
        summary: {
          totalPoints: 10.0,
          partIPoints: 3.0,
          partIIPoints: 2.0,
          partIIIPoints: 2.0,
          partIVPoints: 3.0,
          ratio: { nb: 4.0, th: 3.0, vd: 3.0 }
        },
        partI: [
          {
            id: 'm-p1-q1',
            number: 1,
            content: `Cho bài toán thuộc chương trình Toán ${grade}. Khẳng định nào sau đây là ĐÚNG?`,
            options: [
              { key: 'A', text: 'Mệnh đề cơ bản theo định nghĩa sách giáo khoa' },
              { key: 'B', text: 'Khẳng định chưa đủ điều kiện cần và đủ' },
              { key: 'C', text: 'Khẳng định trái với tiên đề toán học' },
              { key: 'D', text: 'Kết quả chỉ đúng trong trường hợp đặc biệt' }
            ],
            correctAnswer: 'A',
            score: 0.25,
            level: 'NB',
            topic: 'Khái niệm và định nghĩa',
            explanation: 'Căn cứ vào định lý và tính chất nêu trong sách giáo khoa.'
          },
          {
            id: 'm-p1-q2',
            number: 2,
            content: `Cho biểu thức f(x) thỏa mãn điều kiện bài toán ${lessonTitle}. Giá trị của f(0) bằng:`,
            options: [
              { key: 'A', text: '1' },
              { key: 'B', text: '0' },
              { key: 'C', text: '-1' },
              { key: 'D', text: '2' }
            ],
            correctAnswer: 'B',
            score: 0.25,
            level: 'NB',
            topic: 'Tính toán giá trị hàm',
            explanation: 'Thay x = 0 vào biểu thức ta thu được kết quả trực tiếp.'
          }
        ],
        partII: [
          {
            id: 'm-p2-q1',
            number: 1,
            stem: `Cho các mệnh đề về phương pháp giải bài toán trong bài ${lessonTitle}:`,
            statements: [
              { key: 'a', text: 'Cần xác định tập xác định trước khi biến đổi.', isCorrect: true, explanation: 'Đúng theo quy tắc giải.' },
              { key: 'b', text: 'Mọi phương trình đều có nghiệm thực duy nhất.', isCorrect: false, explanation: 'Sai, phương trình có thể vô nghiệm hoặc vô số nghiệm.' },
              { key: 'c', text: 'Có thể sử dụng đạo hàm để xét chiều biến thiên.', isCorrect: true, explanation: 'Đúng với hàm số khả vi.' },
              { key: 'd', text: 'Kết quả phụ thuộc vào đơn vị đo lường.', isCorrect: false, explanation: 'Sai trong trường hợp đại số thuần túy.' }
            ],
            score: 1.0,
            level: 'TH',
            topic: 'Phương pháp suy luận'
          }
        ],
        partIII: [
          {
            id: 'm-p3-q1',
            number: 1,
            content: 'Tìm giá trị cực trị lớn nhất của hàm số trên miền xác định?',
            correctAnswer: '5',
            unit: '',
            score: 0.5,
            level: 'TH',
            topic: 'Tính toán cực trị',
            explanation: 'Sử dụng đạo hàm tìm điểm dừng và lập bảng biến thiên.'
          }
        ],
        partIV: [
          {
            id: 'm-p4-q1',
            number: 1,
            content: `Vận dụng kiến thức của bài ${lessonTitle} để giải quyết bài toán thực tiễn tối ưu hóa chi phí hoặc tính toán đo đạc.`,
            criteria: [
              { step: 'Thiết lập mô hình hàm số hoặc phương trình tương ứng.', score: 0.5 },
              { step: 'Giải toán và tìm nghiệm tối ưu.', score: 0.5 },
              { step: 'Kết luận ý nghĩa thực tiễn của bài toán.', score: 0.5 }
            ],
            totalScore: 1.5,
            level: 'VD',
            topic: 'Ứng dụng thực tiễn'
          }
        ],
        matrix: [
          {
            topic: 'Khái niệm & Đạo hàm',
            content: lessonTitle,
            partI: { nb: 2, th: 0, vd: 0 },
            partII: { nb: 0, th: 1, vd: 0 },
            partIII: { nb: 0, th: 1, vd: 0 },
            partIV: { nb: 0, th: 0, vd: 1 },
            totalScore: 4.0,
            percentage: 40
          },
          {
            topic: 'Khảo sát & Đồ thị',
            content: 'Bài toán cực trị và ứng dụng',
            partI: { nb: 0, th: 0, vd: 0 },
            partII: { nb: 0, th: 0, vd: 0 },
            partIII: { nb: 0, th: 0, vd: 0 },
            partIV: { nb: 0, th: 0, vd: 0 },
            totalScore: 6.0,
            percentage: 60
          }
        ],
        specifications: [
          {
            topic: 'Toán học',
            content: lessonTitle,
            competencyRequired: 'Năng lực tư duy và lập luận toán học; Năng lực giải quyết vấn đề',
            levels: {
              nb: 'Nhận biết khái niệm, công thức cơ bản trong bài học.',
              th: 'Hiểu và vận dụng phương pháp giải bài toán.',
              vd: 'Vận dụng giải bài toán thực tế tối ưu hóa.'
            },
            questionDistribution: 'Phần I: 2 câu | Phần II: 1 câu | Phần III: 1 câu | Phần IV: 1 câu'
          }
        ]
      }
    };
  }

  // Bất kỳ môn học hoặc tài liệu nào khác được tải lên (Ngữ Văn, Tiếng Anh, KHTN, Lịch Sử, Địa Lí...):
  const rawObjectives = docOrHeader.extractedObjectives || [];
  const rawKeyKnowledge = docOrHeader.extractedKeyKnowledge || [];
  const rawExercises = docOrHeader.extractedExercises || [];

  const objectives = rawObjectives.length > 0 ? rawObjectives : [
    `Học sinh nhận biết và nắm vững các kiến thức trọng tâm của bài: ${lessonTitle}.`,
    `Vận dụng thành thạo kỹ năng môn ${subject} để giải quyết các bài tập và tình huống học tập.`,
    `Phát triển năng lực tự học, tư duy logic, hợp tác nhóm và sáng tạo theo chuẩn GDPT 2018.`
  ];

  const keyKnowledge = rawKeyKnowledge.length > 0 ? rawKeyKnowledge : [
    `Khái niệm, định lý và nguyên lý cốt lõi trong bài học ${lessonTitle}.`,
    `Phương pháp giải quyết các dạng bài tập điển hình trong SGK/SBT ${textbook}.`,
    `Quy trình thực hành 4 bước theo định hướng Công văn 5512/BGDĐT.`
  ];

  const exercises = rawExercises.length > 0 ? rawExercises : [
    `Bài tập 1: Khởi động và phân tích ngữ liệu cơ bản trong bài học.`,
    `Bài tập 2: Luyện tập củng cố kiến thức theo nhóm trên lớp.`,
    `Bài tập 3: Vận dụng thực tế và mở rộng kiến thức ở nhà.`
  ];

  const dynamicKhbd: LessonPlan5512 = {
    header: {
      schoolName: schoolName.toUpperCase(),
      departmentName: departmentName.toUpperCase(),
      teacherName: teacherName.toUpperCase(),
      subjectName: subject.toUpperCase(),
      grade: grade,
      className: grade,
      academicYear: '2024 - 2025',
      textbook: textbook,
      lessonTitle: lessonTitle.toUpperCase(),
      durationPeriods: 1,
      examTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ - MÔN ${subject.toUpperCase()} ${grade} (CV 7991)`,
      examDurationMinutes: 45,
    },
    generalObjectives: {
      knowledge: objectives,
      coreCompetencies: [
        'Năng lực tự chủ và tự học: Chủ động nghiên cứu tài liệu sách giáo khoa, ghi chép và thực hiện nhiệm vụ được giao.',
        'Năng lực giao tiếp và hợp tác: Tích cực trao đổi, phản biện và hoàn thành sản phẩm học tập cùng nhóm bạn.',
        'Năng lực giải quyết vấn đề và sáng tạo: Đề xuất các phương án giải quyết mới cho các bài toán thực tiễn.'
      ],
      subjectCompetencies: [
        `Năng lực đặc thù môn ${subject}: Nắm vững phương pháp bộ môn, nhận diện và xử lý thông tin chuyên sâu.`,
        `Năng lực thực hành môn ${subject}: Áp dụng đúng công thức, phương pháp và quy trình kỹ thuật.`,
        `Năng lực vận dụng tri thức môn ${subject} vào đời sống thực tiễn.`
      ],
      qualities: [
        'Chăm chỉ: Tích cực học tập, chủ động khám phá tri thức mới.',
        'Trung thực: Khách quan trong học tập, tự giác làm bài tập.',
        'Trách nhiệm: Có trách nhiệm với bản thân, gia đình và tập thể lớp.'
      ]
    },
    teachingEquipment: {
      teacher: [
        `Kế hoạch bài dạy (KHBD), slide trình chiếu bài giảng môn ${subject}.`,
        `Bộ thiết bị, tranh ảnh, đồ dùng trực quan hoặc phiếu học tập in sẵn.`,
        `Máy chiếu tương tác hoặc bảng thông minh hỗ trợ giảng dạy.`
      ],
      students: [
        `Sách giáo khoa, sách bài tập môn ${subject} (${textbook}).`,
        `Vở ghi bài, đồ dùng học tập theo yêu cầu của giáo viên bộ môn.`
      ],
      digitalAssets: [
        `Tư liệu số, video clip minh họa bài giảng tương tác.`,
        `Hệ thống câu hỏi trắc nghiệm tương tác trên nền tảng EdTech.`
      ]
    },
    activities: [
      {
        id: 'act-1',
        number: 1,
        title: `Hoạt động 1: Mở đầu / Khởi động (Gợi mở vấn đề bài học ${lessonTitle})`,
        timeEstimate: '7 phút',
        objectives: 'Tạo tâm thế học tập tích cực, kích hoạt kiến thức nền và gợi nhu cầu tìm hiểu kiến thức mới.',
        content: `Giáo viên đưa ra tình huống thực tế hoặc câu hỏi gợi mở liên quan đến bài: ${lessonTitle}.`,
        product: 'Câu trả lời nhanh hoặc ý kiến dự đoán ban đầu của học sinh.',
        steps: [
          {
            name: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherAction: `Giáo viên nêu câu hỏi tình huống xuất phát từ thực tế liên quan đến ${lessonTitle} để học sinh suy nghĩ.`,
            studentAction: 'Học sinh tiếp nhận nhiệm vụ, quan sát dữ liệu và suy nghĩ cá nhân trong 1 phút.'
          },
          {
            name: 'Bước 2: Thực hiện nhiệm vụ',
            teacherAction: 'Giáo viên theo dõi phản ứng của học sinh, khuyến khích các em tự do bộc lộ suy nghĩ ban đầu.',
            studentAction: 'Học sinh thảo luận nhanh với bạn cùng bàn để thống nhất ý kiến.'
          },
          {
            name: 'Bước 3: Báo cáo, thảo luận',
            teacherAction: 'Mời đại diện 2 học sinh phát biểu câu trả lời trước lớp.',
            studentAction: 'Học sinh đứng dậy trả lời rõ ràng, các bạn khác lắng nghe và bổ sung.'
          },
          {
            name: 'Bước 4: Kết luận, nhận định',
            teacherAction: 'Giáo viên nhận xét, dẫn dắt vào bài mới và ghi tựa bài lên bảng.',
            studentAction: 'Học sinh mở vở ghi bài và sẵn sàng khám phá kiến thức.'
          }
        ]
      },
      {
        id: 'act-2',
        number: 2,
        title: `Hoạt động 2: Hình thành kiến thức mới (Khám phá nội dung trọng tâm)`,
        timeEstimate: '20 phút',
        objectives: `Học sinh tiếp thu và hiểu rõ các kiến thức cốt lõi: ${keyKnowledge[0] || 'Nội dung bài học'}.`,
        content: `Đọc hiểu SGK, hoàn thành phiếu học tập về: ${keyKnowledge.join('; ')}.`,
        product: 'Sản phẩm phiếu học tập hoặc bài ghi chép hoàn chỉnh của học sinh.',
        steps: [
          {
            name: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherAction: `Chia lớp thành các nhóm, giao Phiếu học tập tìm hiểu các nội dung trọng tâm của ${lessonTitle}.`,
            studentAction: 'Các nhóm nhận nhiệm vụ, phân công nhóm trưởng, thư ký và các thành viên thực hiện.'
          },
          {
            name: 'Bước 2: Thực hiện nhiệm vụ',
            teacherAction: 'Giáo viên luân chuyển giữa các nhóm để hỗ trợ, giải đáp thắc mắc và định hướng thảo luận.',
            studentAction: 'Học sinh nghiên cứu SGK, thảo luận sôi nổi và ghi chép câu trả lời vào phiếu.'
          },
          {
            name: 'Bước 3: Báo cáo, thảo luận',
            teacherAction: 'Gọi đại diện nhóm trình bày sản phẩm, mời nhóm khác nhận xét và đặt câu hỏi phản biện.',
            studentAction: 'Đại diện nhóm thuyết trình tự tin, giải trình các thắc mắc của bạn học.'
          },
          {
            name: 'Bước 4: Kết luận, nhận định',
            teacherAction: 'Giáo viên chuẩn hóa kiến thức trên slide, chốt các kết luận quan trọng cần ghi nhớ.',
            studentAction: 'Học sinh đối chiếu bài làm, sửa chữa sai sót và ghi kiến thức chuẩn mực vào vở.'
          }
        ]
      },
      {
        id: 'act-3',
        number: 3,
        title: `Hoạt động 3: Luyện tập (Củng cố và rèn luyện kỹ năng)`,
        timeEstimate: '12 phút',
        objectives: 'Khắc sâu kiến thức đã học, rèn luyện kỹ năng phân tích và giải quyết các câu hỏi, bài tập.',
        content: `Giải quyết các bài tập: ${exercises.slice(0, 2).join('; ')}.`,
        product: 'Lời giải chính xác của học sinh trên bảng lớp và vở bài tập.',
        steps: [
          {
            name: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherAction: 'Giáo viên trình chiếu hệ thống bài tập luyện tập củng cố kiến thức theo mức độ nhận biết và thông hiểu.',
            studentAction: 'Học sinh đọc đề bài, xác định yêu cầu và phương pháp giải quyết.'
          },
          {
            name: 'Bước 2: Thực hiện nhiệm vụ',
            teacherAction: 'Giáo viên quan sát học sinh làm bài độc lập, kịp thời nhắc nhở các lỗi sai thường gặp.',
            studentAction: 'Học sinh làm bài cẩn thận vào vở, một số em lên bảng trình bày.'
          },
          {
            name: 'Bước 3: Báo cáo, thảo luận',
            teacherAction: 'Tổ chức cho học sinh nhận xét chéo bài làm trên bảng của các bạn.',
            studentAction: 'Học sinh nhận xét, phân tích đúng sai và đưa ra phương án tối ưu hơn.'
          },
          {
            name: 'Bước 4: Kết luận, nhận định',
            teacherAction: 'Giáo viên chấm điểm, đánh giá mức độ tiếp thu và biểu dương học sinh làm bài tốt.',
            studentAction: 'Học sinh hoàn thiện lời giải chuẩn xác vào vở.'
          }
        ]
      },
      {
        id: 'act-4',
        number: 4,
        title: `Hoạt động 4: Vận dụng - Mở rộng (Ứng dụng thực tiễn & Nhiệm vụ về nhà)`,
        timeEstimate: '6 phút',
        objectives: `Vận dụng kiến thức bài học ${lessonTitle} vào giải quyết vấn đề thực tế trong đời sống.`,
        content: `Nhiệm vụ học tập thực hành: ${exercises[2] || 'Liên hệ thực tế đời sống và mở rộng kiến thức.'}`,
        product: 'Bản báo cáo kết quả thực hiện nhiệm vụ ở nhà hoặc sản phẩm sáng tạo của học sinh.',
        steps: [
          {
            name: 'Bước 1: Chuyển giao nhiệm vụ',
            teacherAction: `Giáo viên giao câu hỏi vận dụng thực tiễn và hướng dẫn học sinh cách tìm tài liệu tra cứu thêm.`,
            studentAction: 'Học sinh ghi chép yêu cầu và thời hạn nộp sản phẩm vào sổ tay.'
          },
          {
            name: 'Bước 2: Thực hiện nhiệm vụ',
            teacherAction: 'Gợi ý các nguồn tài liệu tin cậy (SGK, Internet, thư viện nhà trường).',
            studentAction: 'Học sinh trao đổi nhanh định hướng thực hiện trước khi kết thúc tiết học.'
          },
          {
            name: 'Bước 3: Báo cáo, thảo luận',
            teacherAction: 'Quy định hình thức nộp báo cáo (vở bài tập hoặc nhóm học tập trực tuyến).',
            studentAction: 'Học sinh cam kết hoàn thành đúng hạn.'
          },
          {
            name: 'Bước 4: Kết luận, nhận định',
            teacherAction: 'Giáo viên tổng kết tiết học, dặn dò chuẩn bị bài tiếp theo.',
            studentAction: 'Học sinh lắng nghe và kết thúc tiết học.'
          }
        ]
      }
    ],
    notes: `Kế hoạch bài dạy môn ${subject} ${grade} được thiết kế theo đúng cấu trúc 4 hoạt động của Công văn 5512/BGDĐT. Tích hợp định hướng phát triển phẩm chất, năng lực và chuyển đổi số sư phạm.`
  };

  const dynamicSlides: SlideItem[] = [
    {
      id: 'slide-dyn-1',
      slideNumber: 1,
      title: lessonTitle.toUpperCase(),
      phase: 'Khởi động',
      bulletPoints: [
        `Môn học: ${subject} - ${grade}`,
        `Bộ sách: ${textbook}`,
        `Giáo viên: ${teacherName} · Đơn vị: ${schoolName}`,
        `Mục tiêu trọng tâm: Tiếp thu kiến thức cốt lõi và rèn luyện kỹ năng thực hành`
      ],
      highlightBox: {
        type: 'definition',
        title: 'Mục tiêu bài học',
        content: objectives[0] || 'Nắm vững kiến thức trọng tâm của bài dạy theo chương trình GDPT 2018.'
      },
      teacherNotes: 'Chiếu slide mở đầu, ổn định lớp, giới thiệu chủ đề và tạo không khí học tập tích cực.',
      timerMinutes: 2
    },
    {
      id: 'slide-dyn-2',
      slideNumber: 2,
      title: 'KHỞI ĐỘNG: KÍCH HOẠT TƯ DUY & TÌNH HUỐNG MỞ ĐẦU',
      phase: 'Khởi động',
      bulletPoints: [
        `Tình huống mở đầu: Đặt ra câu hỏi thực tiễn gợi mở vấn đề bài học`,
        `Liên hệ kiến thức nền: Kết nối với các bài học trước đó của môn ${subject}`,
        `Khơi gợi hứng thú: Kích thích sự tò mò và tinh thần khám phá của học sinh`
      ],
      highlightBox: {
        type: 'question',
        title: 'Câu hỏi gợi mở',
        content: `Làm thế nào để ứng dụng kiến thức môn ${subject} giải quyết tình huống bài học ${lessonTitle}?`
      },
      teacherNotes: 'Dành 2 phút cho học sinh suy nghĩ tự do và thảo luận cặp đôi trước khi bắt đầu bài mới.',
      timerMinutes: 5
    },
    {
      id: 'slide-dyn-3',
      slideNumber: 3,
      title: 'KIẾN THỨC MỚI: NỘI DUNG TRỌNG TÂM',
      phase: 'Kiến thức mới',
      bulletPoints: [
        keyKnowledge[0] || `Khái niệm và nguyên lý cốt lõi của bài học ${lessonTitle}`,
        keyKnowledge[1] || `Quy trình phân tích và phương pháp giải quyết vấn đề chuẩn mực`,
        keyKnowledge[2] || `Những lưu ý và sai lầm học sinh thường mắc phải cần tránh`
      ],
      highlightBox: {
        type: 'formula',
        title: 'Khắc sâu kiến thức',
        content: keyKnowledge[0] || `Nắm vững các định nghĩa và công thức then chốt trong sách giáo khoa ${textbook}.`
      },
      teacherNotes: 'Giảng giải kết hợp đặt câu hỏi phát vấn. Cho học sinh ghi chép các ý cốt lõi vào vở lý thuyết.',
      timerMinutes: 10
    },
    {
      id: 'slide-dyn-4',
      slideNumber: 4,
      title: 'LUYỆN TẬP & THỰC HÀNH CỦNG CỐ',
      phase: 'Luyện tập',
      bulletPoints: [
        exercises[0] || 'Dạng 1: Bài tập nhận biết và củng cố kiến thức trực tiếp',
        exercises[1] || 'Dạng 2: Bài tập rèn luyện kỹ năng phân tích và tổng hợp',
        'Hình thức tổ chức: Làm việc cá nhân và chia nhóm thi đua tính điểm'
      ],
      highlightBox: {
        type: 'task',
        title: 'Thử thách luyện tập',
        content: `Vận dụng quy tắc vừa học để giải quyết bài tập luyện tập trong thời gian 5 phút.`
      },
      teacherNotes: 'Bấm giờ đếm ngược 5 phút. Quan sát và hỗ trợ các học sinh còn chậm để bảo đảm tiến độ chung.',
      timerMinutes: 8
    },
    {
      id: 'slide-dyn-5',
      slideNumber: 5,
      title: 'VẬN DỤNG THỰC TẾ & TỔNG KẾT BÀI HỌC',
      phase: 'Vận dụng',
      bulletPoints: [
        'Ý nghĩa thực tiễn: Ứng dụng tri thức môn học vào cuộc sống hàng ngày',
        'Tổng kết: Hệ thống hóa lại các từ khóa và nội dung chính của tiết học',
        'Dặn dò về nhà: Hoàn thành bài tập trong SBT và chuẩn bị bài mới'
      ],
      highlightBox: {
        type: 'definition',
        title: 'Nhiệm vụ về nhà',
        content: exercises[2] || 'Hoàn thành các câu hỏi mở rộng và tìm hiểu ứng dụng thực tiễn của bài học.'
      },
      teacherNotes: 'Khen ngợi các cá nhân và nhóm học tập tích cực. Giao nhiệm vụ chuẩn bị cho tiết học tiếp theo.',
      timerMinutes: 4
    }
  ];

  const dynamicExam: Exam7991 = {
    header: {
      schoolName: schoolName.toUpperCase(),
      departmentName: departmentName.toUpperCase(),
      teacherName: teacherName.toUpperCase(),
      subjectName: subject.toUpperCase(),
      grade: grade,
      className: grade,
      academicYear: '2024 - 2025',
      textbook: textbook,
      lessonTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ - MÔN ${subject.toUpperCase()} ${grade}`,
      durationPeriods: 1,
      examTitle: `ĐỀ KIỂM TRA ĐỊNH KỲ MÔN ${subject.toUpperCase()} (CHUẨN CV 7991/BGDĐT)`,
      examDurationMinutes: 45,
    },
    summary: {
      totalPoints: 10.0,
      partIPoints: 3.0,
      partIIPoints: 2.0,
      partIIIPoints: 2.0,
      partIVPoints: 3.0,
      ratio: { nb: 4.0, th: 3.0, vd: 3.0 }
    },
    partI: [
      {
        id: 'dyn-p1-q1',
        number: 1,
        content: `Kiến thức trọng tâm nào dưới đây là ĐÚNG khi nói về bài học "${lessonTitle}"?`,
        options: [
          { key: 'A', text: keyKnowledge[0] || 'Nội dung cốt lõi theo sách giáo khoa ban hành' },
          { key: 'B', text: 'Khái niệm chưa được kiểm chứng khoa học' },
          { key: 'C', text: 'Nội dung không thuộc phạm vi bài học' },
          { key: 'D', text: 'Kết quả chỉ mang tính tham khảo' }
        ],
        correctAnswer: 'A',
        score: 0.25,
        level: 'NB',
        topic: 'Nhận biết kiến thức cốt lõi',
        explanation: 'Căn cứ vào nội dung kiến thức chuẩn trong sách giáo khoa.'
      },
      {
        id: 'dyn-p1-q2',
        number: 2,
        content: `Theo chương trình GDPT 2018, mục tiêu quan trọng nhất khi học bài "${lessonTitle}" là:`,
        options: [
          { key: 'A', text: 'Học thuộc lòng từ ngữ máy móc' },
          { key: 'B', text: 'Phát triển phẩm chất và năng lực thực hành giải quyết vấn đề' },
          { key: 'C', text: 'Chỉ phục vụ mục đích kiểm tra điểm số' },
          { key: 'D', text: 'Ghi chép nhiều nhất có thể' }
        ],
        correctAnswer: 'B',
        score: 0.25,
        level: 'NB',
        topic: 'Mục tiêu năng lực môn học',
        explanation: 'Chương trình GDPT 2018 chuyển đổi căn bản sang phát triển năng lực và phẩm chất người học.'
      }
    ],
    partII: [
      {
        id: 'dyn-p2-q1',
        number: 1,
        stem: `Xét tính Đúng / Sai của các nhận định dưới đây về bài học "${lessonTitle}":`,
        statements: [
          { key: 'a', text: 'Nắm vững kiến thức nền tảng là điều kiện bắt buộc trước khi thực hành vận dụng.', isCorrect: true, explanation: 'Đúng theo quy luật sư phạm.' },
          { key: 'b', text: 'Học sinh chỉ cần nghe giáo viên giảng mà không cần tham gia thảo luận nhóm.', isCorrect: false, explanation: 'Sai, phương pháp dạy học tích cực đòi hỏi học sinh chủ động.' },
          { key: 'c', text: 'Việc vận dụng tri thức vào thực tiễn đời sống giúp ghi nhớ lâu bền hơn.', isCorrect: true, explanation: 'Đúng, nâng cao tính trực quan sinh động.' },
          { key: 'd', text: 'Không cần chuẩn bị đồ dùng học tập trước khi vào giờ học.', isCorrect: false, explanation: 'Sai, sự chuẩn bị chu đáo quyết định hiệu quả học tập.' }
        ],
        score: 1.0,
        level: 'TH',
        topic: 'Đánh giá nhận thức toàn diện'
      }
    ],
    partIII: [
      {
        id: 'dyn-p3-q1',
        number: 1,
        content: `Nêu ngắn gọn từ khóa quan trọng nhất biểu đạt bản chất của bài học "${lessonTitle}"?`,
        correctAnswer: subject,
        score: 0.5,
        level: 'NB',
        topic: 'Từ khóa bài học',
        explanation: 'Khái niệm trung tâm của bài học.'
      }
    ],
    partIV: [
      {
        id: 'dyn-p4-q1',
        number: 1,
        content: `Em hãy trình bày một ví dụ cụ thể trong cuộc sống thực tế ứng dụng kiến thức của bài học "${lessonTitle}" và nêu cảm nghĩ của em.`,
        criteria: [
          { step: 'Nêu được tình huống hoặc ví dụ thực tế chính xác, phù hợp bài học.', score: 0.5 },
          { step: 'Giải thích cơ sở khoa học gắn liền với kiến thức môn học.', score: 0.5 },
          { step: 'Rút ra bài học kinh nghiệm và ý thức vận dụng trong đời sống.', score: 0.5 }
        ],
        totalScore: 1.5,
        level: 'VD',
        topic: 'Vận dụng thực tiễn'
      }
    ],
    matrix: [
      {
        topic: subject,
        content: lessonTitle,
        partI: { nb: 2, th: 0, vd: 0 },
        partII: { nb: 0, th: 1, vd: 0 },
        partIII: { nb: 1, th: 0, vd: 0 },
        partIV: { nb: 0, th: 0, vd: 1 },
        totalScore: 4.5,
        percentage: 45
      },
      {
        topic: `${subject} - Vận dụng`,
        content: 'Thực hành và giải quyết vấn đề',
        partI: { nb: 0, th: 0, vd: 0 },
        partII: { nb: 0, th: 0, vd: 0 },
        partIII: { nb: 0, th: 0, vd: 0 },
        partIV: { nb: 0, th: 0, vd: 0 },
        totalScore: 5.5,
        percentage: 55
      }
    ],
    specifications: [
      {
        topic: subject,
        content: lessonTitle,
        competencyRequired: `Năng lực đặc thù môn ${subject}; Năng lực giải quyết vấn đề và sáng tạo`,
        levels: {
          nb: 'Nhận biết các khái niệm, quy tắc cơ bản trong bài học.',
          th: 'Thông hiểu và phân tích nội dung, giải thích các hiện tượng.',
          vd: 'Vận dụng kiến thức vào thực tiễn đời sống và sáng tạo sản phẩm.'
        },
        questionDistribution: 'Phần I: 2 câu | Phần II: 1 câu | Phần III: 1 câu | Phần IV: 1 câu'
      }
    ]
  };

  return {
    khbd: dynamicKhbd,
    slides: dynamicSlides,
    exam: dynamicExam
  };
}

/**
 * Trả về trọn bộ KHBD, Slides và Exam dựa trên SourceDocument
 */
export function getCurriculumForDocument(
  doc: SourceDocument,
  teacherProfile?: TeacherProfile
): { khbd: LessonPlan5512; slides: SlideItem[]; exam: Exam7991 } {
  return buildDynamicCurriculum({
    subject: doc.subject,
    grade: doc.grade,
    textbook: doc.textbook,
    lessonTitle: doc.lessonOrChapter,
    lessonOrChapter: doc.lessonOrChapter,
    extractedText: doc.extractedText,
    extractedObjectives: doc.extractedObjectives,
    extractedKeyKnowledge: doc.extractedKeyKnowledge,
    extractedExercises: doc.extractedExercises
  }, teacherProfile);
}

/**
 * Trả về trọn bộ KHBD, Slides và Exam dựa trên thông tin bài dạy hoặc Topbar
 */
export function getCurriculumForLesson(
  subject: string,
  grade: string,
  lessonTitle: string,
  textbook: string,
  teacherProfile?: TeacherProfile
): { khbd: LessonPlan5512; slides: SlideItem[]; exam: Exam7991 } {
  return buildDynamicCurriculum({
    subject,
    grade,
    lessonTitle,
    textbook
  }, teacherProfile);
}

/**
 * Tự động tạo danh mục mục lục các bài dạy trong sách theo Môn học và Khối lớp
 */
export function generateTableOfContentsForBook(
  subject: string,
  grade: string,
  textbook: string = 'Kết Nối Tri Thức'
): DocumentLessonItem[] {
  const normSubject = (subject || '').toLowerCase();
  const normGrade = (grade || '').toLowerCase();

  // 1. ÂM NHẠC - BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG (ĐẦY ĐỦ 8 CHỦ ĐỀ CHO 4 KHỐI 6, 7, 8, 9)
  if (normSubject.includes('âm nhạc')) {
    // KHỐI 6 - ĐẦY ĐỦ 8 CHỦ ĐỀ
    if (normGrade.includes('6')) {
      return [
        // CHỦ ĐỀ 1: CON ĐƯỜNG HỌC TRÒ
        {
          id: 'music6-cd1-les1',
          lessonNumber: 1,
          title: 'Chủ đề 1: Con đường học trò - Tiết 1: Học hát bài Con đường học trò',
          chapterOrTopic: 'Chủ đề 1: Con đường học trò',
          periodDuration: 1,
          page: 'Trang 6 - 9',
          objectives: [
            'Hát đúng cao độ, trường độ bài hát Con đường học trò (Nhạc & lời: Nguyễn Mộng Lân).',
            'Nhận biết số chỉ nhịp 2/4 và sắc thái trong sáng, tha thiết.',
            'Luyện thanh theo thang âm 5 bậc Đô - Rê - Mi - Son - La.'
          ],
          keyKnowledge: [
            'Tác giả Nguyễn Mộng Lân, nhịp 2/4 (2 phách/ô nhịp, phách 1 mạnh, phách 2 nhẹ).',
            'Kỹ thuật hát từng câu theo lối móc xích và lấy hơi cuối câu.',
            'Thang âm 5 bậc không bán âm.'
          ],
          exercises: [
            'Hát kết hợp gõ đệm thanh phách theo hình tiết tấu Đơn - Đơn - Đen.',
            'Biểu diễn đơn ca hoặc song ca bài hát Con đường học trò.'
          ]
        },
        {
          id: 'music6-cd1-les2',
          lessonNumber: 2,
          title: 'Chủ đề 1: Con đường học trò - Tiết 2: Nhạc cụ gõ thanh phách & Trống con',
          chapterOrTopic: 'Chủ đề 1: Con đường học trò',
          periodDuration: 1,
          page: 'Trang 10 - 12',
          objectives: [
            'Thực hiện thành thạo kỹ thuật gõ đệm thanh phách và trống con.',
            'Gõ đệm hòa tấu theo mẫu tiết tấu cho bài hát Con đường học trò.',
            'Phối hợp nhịp nhàng giữa nhóm hát và nhóm gõ đệm.'
          ],
          keyKnowledge: [
            'Cách cầm thanh phách chuẩn, phân biệt phách mạnh gõ dứt khoát, phách nhẹ thả lỏng.',
            'Kỹ thuật gõ mặt trống và vành trống con.',
            'Mẫu gõ hòa tấu 2 bè tiết tấu.'
          ],
          exercises: [
            'Gõ đệm mẫu tiết tấu 1 bằng thanh phách.',
            'Hòa tấu nhóm: Thanh phách gõ phách, Trống con gõ phách mạnh.'
          ]
        },
        {
          id: 'music6-cd1-les3',
          lessonNumber: 3,
          title: 'Chủ đề 1: Con đường học trò - Tiết 3: Đọc nhạc Bài số 1 & Thang âm 5 bậc',
          chapterOrTopic: 'Chủ đề 1: Con đường học trò',
          periodDuration: 1,
          page: 'Trang 13 - 15',
          objectives: [
            'Đọc đúng tên nốt, cao độ và trường độ Bài đọc nhạc số 1.',
            'Nhận biết vị trí các nốt Đô - Rê - Mi - Son - La trên khuông nhạc khóa Sol.',
            'Đọc nhạc kết hợp gõ phách hoặc đánh nhịp 2/4.'
          ],
          keyKnowledge: [
            'Ký hiệu khóa Sol và vị trí nốt nhạc trên dòng kẻ, khe nhạc.',
            'Hình nốt đen, nốt trắng, nốt móc đơn.',
            'Động tác tay khi chỉ huy nhịp 2/4.'
          ],
          exercises: [
            'Đọc thang âm C - D - E - G - A đi lên và đi xuống.',
            'Ghép lời ca vào Bài đọc nhạc số 1.'
          ]
        },
        {
          id: 'music6-cd1-les4',
          lessonNumber: 4,
          title: 'Chủ đề 1: Con đường học trò - Tiết 4: Lý thuyết âm nhạc & Thưởng thức âm nhạc',
          chapterOrTopic: 'Chủ đề 1: Con đường học trò',
          periodDuration: 1,
          page: 'Trang 15 - 17',
          objectives: [
            'Nhận biết 4 thuộc tính cơ bản của âm thanh có tính nhạc: Cao độ, Trường độ, Cường độ, Âm sắc.',
            'Cảm thụ vẻ đẹp giai điệu và phát triển tai nghe âm nhạc.'
          ],
          keyKnowledge: [
            'Bốn thuộc tính của âm thanh có tính nhạc trong đời sống.',
            'Phân biệt âm thanh nhạc cụ và giọng người.'
          ],
          exercises: [
            'Lắng nghe và nhận diện các nhạc cụ qua âm sắc đặc trưng.',
            'Vận dụng vỗ tay theo cường độ mạnh - nhẹ.'
          ]
        },

        // CHỦ ĐỀ 2: MẶT TRỜI NON TRẺ
        {
          id: 'music6-cd2-les1',
          lessonNumber: 5,
          title: 'Chủ đề 2: Mặt trời non trẻ - Tiết 1: Học hát bài Mặt trời non trẻ',
          chapterOrTopic: 'Chủ đề 2: Mặt trời non trẻ',
          periodDuration: 1,
          page: 'Trang 18 - 21',
          objectives: [
            'Hát đúng giai điệu và lời ca bài hát Mặt trời non trẻ (Nhạc & lời: Trần Đức).',
            'Thể hiện sắc thái rộn rã, lạc quan của tuổi thơ.',
            'Biết sáng tạo động tác vận động phụ họa.'
          ],
          keyKnowledge: [
            'Ca khúc thiếu nhi đương đại, cấu trúc 2 đoạn đơn.',
            'Kỹ thuật luyến âm và ngắt câu linh hoạt.'
          ],
          exercises: [
            'Tập hát từng đoạn và hát nối tiếp hai nhóm nam - nữ.',
            'Trình diễn tốp ca kết hợp múa phụ họa.'
          ]
        },
        {
          id: 'music6-cd2-les2',
          lessonNumber: 6,
          title: 'Chủ đề 2: Mặt trời non trẻ - Tiết 2: Nhạc cụ gõ hòa tấu & Đọc nhạc Bài số 2',
          chapterOrTopic: 'Chủ đề 2: Mặt trời non trẻ',
          periodDuration: 1,
          page: 'Trang 22 - 25',
          objectives: [
            'Gõ đệm hòa tấu nhạc cụ cho bài hát Mặt trời non trẻ.',
            'Đọc đúng cao độ và trường độ Bài đọc nhạc số 2 giọng Đô trưởng.'
          ],
          keyKnowledge: [
            'Hình tiết tấu móc đơn kết hợp nốt đen.',
            'Nốt Si và Đô cao trên khuông nhạc.'
          ],
          exercises: [
            'Hòa tấu thanh phách, trống con và xúc xắc.',
            'Đọc nhạc theo nhóm kết hợp gõ phách.'
          ]
        },
        {
          id: 'music6-cd2-les3',
          lessonNumber: 7,
          title: 'Chủ đề 2: Mặt trời non trẻ - Tiết 3: Thưởng thức âm nhạc: Nhạc sĩ Văn Cao và bài Tiến quân ca',
          chapterOrTopic: 'Chủ đề 2: Mặt trời non trẻ',
          periodDuration: 1,
          page: 'Trang 26 - 28',
          objectives: [
            'Hiểu biết về cuộc đời, sự nghiệp của Nhạc sĩ Văn Cao.',
            'Cảm nhận tính chất hào hùng, thiêng liêng của bài hát Quốc ca Việt Nam (Tiến quân ca).'
          ],
          keyKnowledge: [
            'Nhạc sĩ Văn Cao (1923 - 1995), Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật.',
            'Hoàn cảnh ra đời bài Tiến quân ca mùa đông năm 1944.'
          ],
          exercises: [
            'Hát bài Tiến quân ca với tư thế trang nghiêm đúng nghi thức.',
            'Kể tên 2 tác phẩm nổi tiếng khác của nhạc sĩ Văn Cao.'
          ]
        },

        // CHỦ ĐỀ 3: BIẾT ƠN THẦY CÔ
        {
          id: 'music6-cd3-les1',
          lessonNumber: 8,
          title: 'Chủ đề 3: Biết ơn thầy cô - Tiết 1: Học hát bài Thầy cô là tất cả',
          chapterOrTopic: 'Chủ đề 3: Biết ơn thầy cô',
          periodDuration: 1,
          page: 'Trang 29 - 32',
          objectives: [
            'Hát đúng cao độ, trường độ bài hát Thầy cô là tất cả (Nhạc & lời: Bùi Anh Tú).',
            'Bồi dưỡng lòng biết ơn, tri ân thầy cô giáo.',
            'Hát kết hợp gõ đệm song loan.'
          ],
          keyKnowledge: [
            'Giai điệu tha thiết, đằm thắm, cấu trúc 2 đoạn.',
            'Ý nghĩa nhân văn của ca từ hướng về ngày Nhà giáo Việt Nam 20/11.'
          ],
          exercises: [
            'Luyện thanh mẫu âm nguyên âm đôi (Mi - Ma).',
            'Biểu diễn bài hát chào mừng ngày 20/11.'
          ]
        },
        {
          id: 'music6-cd3-les2',
          lessonNumber: 9,
          title: 'Chủ đề 3: Biết ơn thầy cô - Tiết 2: Lý thuyết âm nhạc: Ký hiệu nốt nhạc & Nhịp 2/4',
          chapterOrTopic: 'Chủ đề 3: Biết ơn thầy cô',
          periodDuration: 1,
          page: 'Trang 33 - 35',
          objectives: [
            'Nắm vững khái niệm nhịp 2/4, giá trị các hình nốt trắng, đen, móc đơn, dấu lặng đen.',
            'Đọc nhạc Bài đọc nhạc số 3 chuẩn xác cao độ.'
          ],
          keyKnowledge: [
            'Số chỉ nhịp 2/4, cách đánh nhịp 2/4 (tay xuống phách 1, tay lên phách 2).',
            'Mối quan hệ trường độ giữa nốt trắng, đen và móc đơn.'
          ],
          exercises: [
            'Vẽ sơ đồ đánh nhịp 2/4 và thực hành đánh nhịp theo câu nhạc.',
            'Đọc Bài đọc nhạc số 3 kết hợp gõ nhịp.'
          ]
        },

        // CHỦ ĐỀ 4: ƯỚC MƠ HÒA BÌNH
        {
          id: 'music6-cd4-les1',
          lessonNumber: 10,
          title: 'Chủ đề 4: Ước mơ hòa bình - Tiết 1: Học hát bài Bài ca hòa bình',
          chapterOrTopic: 'Chủ đề 4: Ước mơ hòa bình',
          periodDuration: 1,
          page: 'Trang 36 - 39',
          objectives: [
            'Hát đúng giai điệu và tính chất trong sáng bài hát Bài ca hòa bình.',
            'Bồi dưỡng tình yêu hòa bình và tình hữu nghị bạn bè quốc tế.'
          ],
          keyKnowledge: [
            'Nhịp điệu vừa phải, tha thiết, ca từ giàu hình ảnh chim bồ câu trắng.',
            'Kỹ thuật ngắt câu và lấy hơi sau mỗi vế câu.'
          ],
          exercises: [
            'Hát lĩnh xướng câu 1 và đồng ca toàn bài.',
            'Gõ đệm hình tiết tấu theo nhịp 2/4.'
          ]
        },
        {
          id: 'music6-cd4-les2',
          lessonNumber: 11,
          title: 'Chủ đề 4: Ước mơ hòa bình - Tiết 2: Nhạc lý: Dấu nối, dấu luyến & Đàn bầu Việt Nam',
          chapterOrTopic: 'Chủ đề 4: Ước mơ hòa bình',
          periodDuration: 1,
          page: 'Trang 40 - 43',
          objectives: [
            'Phân biệt dấu nối (nối các nốt cùng cao độ) và dấu luyến (luyến các nốt khác cao độ).',
            'Hiểu biết về đàn bầu - nhạc cụ độc đáo một dây của dân tộc Việt Nam.'
          ],
          keyKnowledge: [
            'Quy tắc thể hiện dấu nối và dấu luyến khi hát.',
            'Cấu tạo đàn bầu: cần đàn, quả bầu, dây đàn và kỹ thuật gảy bồi âm.'
          ],
          exercises: [
            'Tìm các dấu nối và dấu luyến trong bài hát đã học.',
            'Lắng nghe đoạn độc tấu đàn bầu và nhận xét âm sắc.'
          ]
        },

        // CHỦ ĐỀ 5: GIAI ĐIỆU QUÊ HƯƠNG
        {
          id: 'music6-cd5-les1',
          lessonNumber: 12,
          title: 'Chủ đề 5: Giai điệu quê hương - Tiết 1: Dân ca Nam Bộ - Học hát bài Lý cây bông',
          chapterOrTopic: 'Chủ đề 5: Giai điệu quê hương',
          periodDuration: 1,
          page: 'Trang 44 - 47',
          objectives: [
            'Hát đúng chất giọng dân ca Nam Bộ bài Lý cây bông.',
            'Cảm nhận nét duyên dáng, mộc mạc của làn điệu dân ca quê hương.',
            'Biết gõ đệm theo nhịp đưa đẩy đặc trưng.'
          ],
          keyKnowledge: [
            'Khái niệm dân ca và thể loại điệu Lý Nam Bộ.',
            'Cách phát âm đặc trưng Nam Bộ: bông, huê, bôn...'
          ],
          exercises: [
            'Hát đối đáp nam - nữ bài Lý cây bông.',
            'Kể tên 3 điệu Lý Nam Bộ khác mà em biết.'
          ]
        },
        {
          id: 'music6-cd5-les2',
          lessonNumber: 13,
          title: 'Chủ đề 5: Giai điệu quê hương - Tiết 2: Đọc nhạc Bài số 5 & Hát ru ba miền',
          chapterOrTopic: 'Chủ đề 5: Giai điệu quê hương',
          periodDuration: 1,
          page: 'Trang 48 - 51',
          objectives: [
            'Đọc đúng cao độ và tiết tấu Bài đọc nhạc số 5 mang âm hưởng dân ca.',
            'Cảm nhận vẻ đẹp êm dịu, ngọt ngào của các điệu hát ru ba miền Bắc - Trung - Nam.'
          ],
          keyKnowledge: [
            'Đặc trưng điệu hát ru: nhịp điệu đung đưa, âm hưởng êm dịu, ca từ giàu tình mẹ.',
            'Thang âm ngũ cung dân gian.'
          ],
          exercises: [
            'Hát trích đoạn một bài hát ru em biết.',
            'Đọc nhạc kết hợp gõ đệm song loan.'
          ]
        },

        // CHỦ ĐỀ 6: MÙA XUÂN TUỔI THƠ
        {
          id: 'music6-cd6-les1',
          lessonNumber: 14,
          title: 'Chủ đề 6: Mùa xuân tuổi thơ - Tiết 1: Học hát bài Mùa xuân em tới trường',
          chapterOrTopic: 'Chủ đề 6: Mùa xuân tuổi thơ',
          periodDuration: 1,
          page: 'Trang 52 - 55',
          objectives: [
            'Hát chuẩn xác bài hát Mùa xuân em tới trường với sắc thái tươi vui, rộn ràng.',
            'Thể hiện niềm hứng khởi đón chào mùa xuân và năm mới.'
          ],
          keyKnowledge: [
            'Nhịp 3/4 rộn rã (1 phách mạnh, 2 phách nhẹ).',
            'Kỹ thuật hát liền giọng và hát nảy âm sinh động.'
          ],
          exercises: [
            'Hát kết hợp nhún nhảy vận động theo nhịp 3/4.',
            'Tốp ca biểu diễn văn nghệ chào xuân.'
          ]
        },
        {
          id: 'music6-cd6-les2',
          lessonNumber: 15,
          title: 'Chủ đề 6: Mùa xuân tuổi thơ - Tiết 2: Nhạc lý: Nhịp 3/4 & Đọc nhạc Bài số 6',
          chapterOrTopic: 'Chủ đề 6: Mùa xuân tuổi thơ',
          periodDuration: 1,
          page: 'Trang 56 - 59',
          objectives: [
            'Nắm vững lý thuyết nhịp 3/4 và sơ đồ động tác tay chỉ huy nhịp 3/4.',
            'Đọc nhạc Bài số 6 đúng cao độ và nhịp điệu nhịp 3/4.'
          ],
          keyKnowledge: [
            'Ý nghĩa số chỉ nhịp 3/4, nốt trắng chấm dôi có giá trị bằng 3 phách.',
            'Sơ đồ đánh nhịp 3/4 hình tam giác (Xuống - Sang phải - Lên).'
          ],
          exercises: [
            'Thực hành đánh nhịp 3/4 bằng hai tay theo bài đọc nhạc.',
            'Hòa tấu nhạc cụ tam âm (Triangle) gõ phách mạnh.'
          ]
        },

        // CHỦ ĐỀ 7: GIA ĐÌNH YÊU THƯƠNG
        {
          id: 'music6-cd7-les1',
          lessonNumber: 16,
          title: 'Chủ đề 7: Gia đình yêu thương - Tiết 1: Học hát bài Chỉ có một trên đời',
          chapterOrTopic: 'Chủ đề 7: Gia đình yêu thương',
          periodDuration: 1,
          page: 'Trang 60 - 63',
          objectives: [
            'Hát đúng giai điệu và ca từ bài hát Chỉ có một trên đời (Nhạc: Trương Quang Lục).',
            'Bồi dưỡng tình cảm yêu thương, kính trọng mẹ và mái ấm gia đình.'
          ],
          keyKnowledge: [
            'Ca khúc thiếu nhi kinh điển về tình mẫu tử, giai điệu da diết, ấm áp.',
            'Cấu trúc bài hát 2 lời ca.'
          ],
          exercises: [
            'Hát đơn ca hoặc song ca truyền cảm bài hát Chỉ có một trên đời.',
            'Chia sẻ cảm xúc của em về công ơn sinh thành của mẹ.'
          ]
        },
        {
          id: 'music6-cd7-les2',
          lessonNumber: 17,
          title: 'Chủ đề 7: Gia đình yêu thương - Tiết 2: Thưởng thức âm nhạc: Nhạc sĩ Lưu Hữu Phước & Đọc nhạc Bài số 7',
          chapterOrTopic: 'Chủ đề 7: Gia đình yêu thương',
          periodDuration: 1,
          page: 'Trang 64 - 67',
          objectives: [
            'Tìm hiểu cuộc đời sự nghiệp Nhạc sĩ Lưu Hữu Phước và bài hát Lên đàng.',
            'Đọc nhạc Bài số 7 kết hợp gõ đệm thanh phách.'
          ],
          keyKnowledge: [
            'Nhạc sĩ Lưu Hữu Phước (1921 - 1989), người tiên phong thể loại hành khúc thanh niên.',
            'Tinh thần yêu nước và nhiệt huyết thanh niên trong bài hát Lên đàng.'
          ],
          exercises: [
            'Hát vang điệp khúc bài hát Lên đàng.',
            'Đọc nhạc Bài số 7 theo tiết tấu hành tiến.'
          ]
        },

        // CHỦ ĐỀ 8: KHÚC CA BÈ BẠN
        {
          id: 'music6-cd8-les1',
          lessonNumber: 18,
          title: 'Chủ đề 8: Khúc ca bè bạn - Tiết 1: Học hát bài Khúc ca bè bạn',
          chapterOrTopic: 'Chủ đề 8: Khúc ca bè bạn',
          periodDuration: 1,
          page: 'Trang 68 - 71',
          objectives: [
            'Hát chuẩn xác giai điệu bài Khúc ca bè bạn (Nhạc nước ngoài).',
            'Thể hiện tinh thần đoàn kết, gắn bó giữa bạn bè năm châu.'
          ],
          keyKnowledge: [
            'Nhịp điệu vui tươi, nhộn nhịp, phong cách âm nhạc thiếu nhi quốc tế.',
            'Kỹ thuật hát đuổi bè đơn giản.'
          ],
          exercises: [
            'Hát hòa giọng 2 nhóm nối tiếp nhau.',
            'Vỗ tay đệm theo nhịp phách.'
          ]
        },
        {
          id: 'music6-cd8-les2',
          lessonNumber: 19,
          title: 'Chủ đề 8: Khúc ca bè bạn - Tiết 2: Đọc nhạc Bài số 8 & Vận động cơ thể (Body Percussion)',
          chapterOrTopic: 'Chủ đề 8: Khúc ca bè bạn',
          periodDuration: 1,
          page: 'Trang 72 - 75',
          objectives: [
            'Đọc thành thạo Bài đọc nhạc số 8 kết hợp đánh nhịp.',
            'Thực hiện chuỗi động tác vận động cơ thể (Body Percussion) đệm cho bài hát.'
          ],
          keyKnowledge: [
            'Kỹ thuật gõ đệm cơ thể 4 động tác: Dậm chân, Vỗ đùi, Vỗ tay, Búng ngón.',
            'Khái niệm dàn nhạc giao hưởng (Bộ dây, Bộ gỗ, Bộ đồng, Bộ gõ).'
          ],
          exercises: [
            'Thực hiện chuỗi Body Percussion 4 phách theo nhóm.',
            'Báo cáo sản phẩm âm nhạc biểu diễn tổng kết cuối năm học.'
          ]
        }
      ];
    }

    // KHỐI 7 - ĐẦY ĐỦ 8 CHỦ ĐỀ
    if (normGrade.includes('7')) {
      return [
        // CHỦ ĐỀ 1: VUI BƯỚC ĐẾN TRƯỜNG
        {
          id: 'music7-cd1-les1',
          lessonNumber: 1,
          title: 'Chủ đề 1: Vui bước đến trường - Tiết 1: Học hát bài Khai trường',
          chapterOrTopic: 'Chủ đề 1: Vui bước đến trường',
          periodDuration: 1,
          page: 'Trang 6 - 9',
          objectives: [
            'Hát đúng giai điệu, lời ca bài Khai trường (Phan Trần Bảng), nhịp 2/4 rộn rã.',
            'Cảm nhận không khí tươi vui, náo nức ngày tựu trường của học sinh THCS.'
          ],
          keyKnowledge: [
            'Nhịp 2/4, dấu lặng đơn, sắc thái náo nức ngày tựu trường.',
            'Kỹ thuật hát nảy âm và lấy hơi chuẩn xác.'
          ],
          exercises: [
            'Hát kết hợp gõ đệm nhạc cụ gõ tam âm / triangle.',
            'Biểu diễn tốp ca nam nữ giao duyên.'
          ]
        },
        {
          id: 'music7-cd1-les2',
          lessonNumber: 2,
          title: 'Chủ đề 1: Vui bước đến trường - Tiết 2: Nhạc cụ tiết tấu & Đọc nhạc Bài số 1',
          chapterOrTopic: 'Chủ đề 1: Vui bước đến trường',
          periodDuration: 1,
          page: 'Trang 10 - 13',
          objectives: [
            'Đọc nhạc Bài số 1 chính xác cao độ C-D-E-F-G, gõ đệm tiết tấu.',
            'Thực hành gõ đệm thanh phách và trống con theo bè hòa tấu.'
          ],
          keyKnowledge: [
            'Nốt Pha (F) trên khuông nhạc khóa Sol, mẫu tiết tấu đảo phách.',
            'Quy tắc đọc cao độ liền bậc.'
          ],
          exercises: [
            'Đọc nhạc kết hợp đánh nhịp 2/4.',
            'Gõ đệm hòa tấu 2 nhạc cụ gõ theo nhóm.'
          ]
        },
        {
          id: 'music7-cd1-les3',
          lessonNumber: 3,
          title: 'Chủ đề 1: Vui bước đến trường - Tiết 3: Nhạc lý: Nhịp lấy đà & Nhạc sĩ Hoàng Việt',
          chapterOrTopic: 'Chủ đề 1: Vui bước đến trường',
          periodDuration: 1,
          page: 'Trang 14 - 16',
          objectives: [
            'Hiểu khái niệm nhịp lấy đà (ô nhịp thiếu ở đầu bản nhạc).',
            'Tìm hiểu về Nhạc sĩ Hoàng Việt và ca khúc Nhạc rừng.'
          ],
          keyKnowledge: [
            'Nhịp lấy đà bắt đầu bằng phách nhẹ, ô nhịp cuối cùng sẽ bù đủ phách.',
            'Nhạc sĩ Hoàng Việt và hình ảnh bộ đội kháng chiến trong ca khúc Nhạc rừng.'
          ],
          exercises: [
            'Tìm các bài hát có nhịp lấy đà trong sách âm nhạc.',
            'Lắng nghe ca khúc Nhạc rừng và cảm nhận tiếng chim rừng ríu rít.'
          ]
        },

        // CHỦ ĐỀ 2: KHÚC CA TÌNH BẠN
        {
          id: 'music7-cd2-les1',
          lessonNumber: 4,
          title: 'Chủ đề 2: Khúc ca tình bạn - Tiết 1: Học hát bài Tia nắng hạt mưa',
          chapterOrTopic: 'Chủ đề 2: Khúc ca tình bạn',
          periodDuration: 1,
          page: 'Trang 17 - 20',
          objectives: [
            'Hát biểu cảm bài hát Tia nắng hạt mưa (Khánh Vinh - Lệ Bình).',
            'Thể hiện hình ảnh ngộ nghĩnh, hồn nhiên của tuổi học trò.'
          ],
          keyKnowledge: [
            'Cấu trúc bài hát 2 đoạn, đảo phách và dấu chấm dôi.',
            'Kỹ thuật hát giọng trong sáng, tươi tắn.'
          ],
          exercises: [
            'Hát hòa giọng tốp ca nam nữ.',
            'Vỗ tay đệm theo hình tiết tấu đảo phách.'
          ]
        },
        {
          id: 'music7-cd2-les2',
          lessonNumber: 5,
          title: 'Chủ đề 2: Khúc ca tình bạn - Tiết 2: Nhạc cụ giai điệu Recorder / Kèn phím & Đọc nhạc Bài số 2',
          chapterOrTopic: 'Chủ đề 2: Khúc ca tình bạn',
          periodDuration: 1,
          page: 'Trang 21 - 24',
          objectives: [
            'Thực hành bấm nốt Si, La, Son trên kèn Recorder hoặc phím đàn Keyboard.',
            'Đọc nhạc Bài số 2 đúng cao độ và nhịp điệu.'
          ],
          keyKnowledge: [
            'Thế bấm nốt B, A, G trên Recorder, cách thổi hơi nhẹ nhàng không bị rè.',
            'Thực hành câu nhạc 4 ô nhịp.'
          ],
          exercises: [
            'Thổi giai điệu câu nhạc 1 bằng Recorder.',
            'Đọc nhạc Bài số 2 kết hợp gõ phách.'
          ]
        },
        {
          id: 'music7-cd2-les3',
          lessonNumber: 6,
          title: 'Chủ đề 2: Khúc ca tình bạn - Tiết 3: Thưởng thức âm nhạc: Dân ca Quan họ Bắc Ninh',
          chapterOrTopic: 'Chủ đề 2: Khúc ca tình bạn',
          periodDuration: 1,
          page: 'Trang 25 - 28',
          objectives: [
            'Tìm hiểu Dân ca Quan họ Bắc Ninh - Di sản văn hóa phi vật thể của nhân loại.',
            'Nhận biết lề lối hát quan họ, trang phục áo tứ thân, khăn xếp nón quai thao.'
          ],
          keyKnowledge: [
            'Vùng đất Kinh Bắc, phong tục hát đối đáp giao duyên liền anh, liền chị.',
            'Kỹ thuật hát vang, rền, nền, nảy của nghệ nhân quan họ.'
          ],
          exercises: [
            'Nghe bài hát Khách đến chơi nhà hoặc Người ơi người ở đừng về.',
            'Nhận diện các đặc trưng của làn điệu quan họ.'
          ]
        },

        // CHỦ ĐỀ 3: THẦY CÔ VÀ MÁI TRƯỜNG
        {
          id: 'music7-cd3-les1',
          lessonNumber: 7,
          title: 'Chủ đề 3: Thầy cô và mái trường - Tiết 1: Học hát bài Nhớ ơn thầy cô',
          chapterOrTopic: 'Chủ đề 3: Thầy cô và mái trường',
          periodDuration: 1,
          page: 'Trang 29 - 32',
          objectives: [
            'Hát đúng sắc thái tri ân bài hát Nhớ ơn thầy cô (Nguyễn Ngọc Thiện).',
            'Thể hiện tình cảm gắn bó sâu nặng với mái trường và thầy cô.'
          ],
          keyKnowledge: [
            'Nhịp 4/4 và lấy hơi đúng câu hát trữ tình.',
            'Cấu trúc ca khúc 2 đoạn đơn tương phản.'
          ],
          exercises: [
            'Hát bè đuổi đơn giản 2 nhóm.',
            'Biểu diễn ca khúc dâng tặng thầy cô nhân ngày 20/11.'
          ]
        },
        {
          id: 'music7-cd3-les2',
          lessonNumber: 8,
          title: 'Chủ đề 3: Thầy cô và mái trường - Tiết 2: Nhạc lý: Nhịp 4/4 (Nhịp C) & Đọc nhạc Bài số 3',
          chapterOrTopic: 'Chủ đề 3: Thầy cô và mái trường',
          periodDuration: 1,
          page: 'Trang 33 - 36',
          objectives: [
            'Hiểu khái niệm nhịp 4/4 (ký hiệu là chữ C), sơ đồ đánh nhịp 4/4.',
            'Đọc nhạc Bài đọc nhạc số 3 giọng Đô trưởng.'
          ],
          keyKnowledge: [
            'Nhịp 4/4 có 4 phách/ô nhịp: Phách 1 mạnh, phách 2 nhẹ, phách 3 mạnh vừa, phách 4 nhẹ.',
            'Động tác đánh nhịp 4/4 hình chữ thập.'
          ],
          exercises: [
            'Thực hành đánh nhịp 4/4 theo câu nhạc.',
            'Đọc Bài đọc nhạc số 3 kết hợp gõ đệm.'
          ]
        },

        // CHỦ ĐỀ 4: ƯỚC MƠ MÙA THU
        {
          id: 'music7-cd4-les1',
          lessonNumber: 9,
          title: 'Chủ đề 4: Ước mơ mùa thu - Tiết 1: Học hát bài Ước mơ mùa thu',
          chapterOrTopic: 'Chủ đề 4: Ước mơ mùa thu',
          periodDuration: 1,
          page: 'Trang 37 - 40',
          objectives: [
            'Hát bài Ước mơ mùa thu với tính chất êm dịu, lắng đọng.',
            'Cảm thụ vẻ đẹp thiên nhiên mùa thu và ước mơ tuổi trẻ.'
          ],
          keyKnowledge: [
            'Giai điệu uyển chuyển nhịp nhàng, sắc thái đằm thắm.',
            'Kỹ thuật ngân dài đủ phách cuối câu.'
          ],
          exercises: [
            'Hát lĩnh xướng kết hợp đồng ca.',
            'Vận động nhẹ nhàng theo nhịp điệu.'
          ]
        },
        {
          id: 'music7-cd4-les2',
          lessonNumber: 10,
          title: 'Chủ đề 4: Ước mơ mùa thu - Tiết 2: Đọc nhạc Bài số 4 & Thưởng thức âm nhạc: Hát Xoan Phú Thọ',
          chapterOrTopic: 'Chủ đề 4: Ước mơ mùa thu',
          periodDuration: 1,
          page: 'Trang 41 - 44',
          objectives: [
            'Đọc chuẩn xác Bài đọc nhạc số 4.',
            'Hiểu biết về nghệ thuật Hát Xoan Phú Thọ - Di sản văn hóa phi vật thể của nhân loại.'
          ],
          keyKnowledge: [
            'Hát Xoan là hình thức dân ca nghi lễ thờ cúng Hùng Vương vùng đất Tổ Phú Thọ.',
            'Các chặng hát Xoan: Hát nghi lễ, Hát quả cách, Hát hội.'
          ],
          exercises: [
            'Lắng nghe một chặng hát Xoan cổ truyền.',
            'Ôn tập và kiểm tra đánh giá cuối học kỳ I.'
          ]
        },

        // CHỦ ĐỀ 5: KHÚC CA QUÊ HƯƠNG
        {
          id: 'music7-cd5-les1',
          lessonNumber: 11,
          title: 'Chủ đề 5: Khúc ca quê hương - Tiết 1: Dân ca Đồng bằng Bắc Bộ - Học hát bài Cò lả',
          chapterOrTopic: 'Chủ đề 5: Khúc ca quê hương',
          periodDuration: 1,
          page: 'Trang 45 - 48',
          objectives: [
            'Hát đúng chất giọng dân ca Bắc Bộ mượt mà, sâu lắng bài Cò lả.',
            'Cảm nhận vẻ đẹp đồng quê thanh bình của đất nước.'
          ],
          keyKnowledge: [
            'Điệu Cò lả, thể thơ lục bát biến thể trong dân ca.',
            'Các từ đệm lót dân gian: tình tính tang, í o...'
          ],
          exercises: [
            'Hát đối đáp tốp nam và tốp nữ.',
            'Gõ đệm thanh phách theo nhịp 2/4.'
          ]
        },
        {
          id: 'music7-cd5-les2',
          lessonNumber: 12,
          title: 'Chủ đề 5: Khúc ca quê hương - Tiết 2: Đọc nhạc Bài số 5 & Đờn ca tài tử Nam Bộ',
          chapterOrTopic: 'Chủ đề 5: Khúc ca quê hương',
          periodDuration: 1,
          page: 'Trang 49 - 52',
          objectives: [
            'Đọc nhạc Bài số 5 đúng cao độ và trường độ.',
            'Tìm hiểu về Đờn ca tài tử Nam Bộ - Di sản văn hóa phi vật thể đại diện của nhân loại.'
          ],
          keyKnowledge: [
            'Dàn nhạc đờn ca tài tử: Đàn kìm (đàn nguyệt), đàn tranh, đàn cò, đàn bầu, guitar phím lõm.',
            'Bản Dạ cổ hoài lang của nhạc sĩ Cao Văn Lầu.'
          ],
          exercises: [
            'Nhận biết tiếng đàn kìm và đàn tranh trong hòa tấu tài tử.',
            'Đọc nhạc Bài số 5 kết hợp gõ phách.'
          ]
        },

        // CHỦ ĐỀ 6: ÂM NHẠC BỐN PHƯƠNG
        {
          id: 'music7-cd6-les1',
          lessonNumber: 13,
          title: 'Chủ đề 6: Âm nhạc bốn phương - Tiết 1: Học hát bài Hát cùng bè bạn bốn phương',
          chapterOrTopic: 'Chủ đề 6: Âm nhạc bốn phương',
          periodDuration: 1,
          page: 'Trang 53 - 56',
          objectives: [
            'Hát chuẩn xác ca khúc quốc tế với giai điệu trẻ trung, năng động.',
            'Giao lưu và mở rộng hiểu biết về âm nhạc thế giới.'
          ],
          keyKnowledge: [
            'Phong cách nhạc đồng quê phương Tây, tiết tấu rộn rã.',
            'Kỹ thuật hát điệp khúc cao trào.'
          ],
          exercises: [
            'Hát kết hợp vỗ tay theo tiết tấu nảy sinh động.',
            'Trình diễn nhóm kết hợp động tác múa phụ họa.'
          ]
        },
        {
          id: 'music7-cd6-les2',
          lessonNumber: 14,
          title: 'Chủ đề 6: Âm nhạc bốn phương - Tiết 2: Nhạc lý: Quãng âm nhạc & Đọc nhạc Bài số 6',
          chapterOrTopic: 'Chủ đề 6: Âm nhạc bốn phương',
          periodDuration: 1,
          page: 'Trang 57 - 60',
          objectives: [
            'Nắm vững định nghĩa Quãng trong âm nhạc (khoảng cách cao độ giữa hai âm).',
            'Phân biệt quãng 2, quãng 3, quãng 4, quãng 5, quãng 8.'
          ],
          keyKnowledge: [
            'Quãng giai điệu (hai âm vang lên lần lượt) và quãng hòa thanh (hai âm vang lên cùng lúc).',
            'Số lượng cung và nửa cung trong các quãng cơ bản.'
          ],
          exercises: [
            'Xác định tên và độ lớn của quãng trên khuông nhạc.',
            'Đọc Bài đọc nhạc số 6 chính xác quãng nhảy.'
          ]
        },

        // CHỦ ĐỀ 7: ĐẤT NƯỚC MẾN YÊU
        {
          id: 'music7-cd7-les1',
          lessonNumber: 15,
          title: 'Chủ đề 7: Đất nước mến yêu - Tiết 1: Học hát bài Ca ngợi Tổ quốc',
          chapterOrTopic: 'Chủ đề 7: Đất nước mến yêu',
          periodDuration: 1,
          page: 'Trang 61 - 64',
          objectives: [
            'Hát hào hùng, tự hào bài hát Ca ngợi Tổ quốc (Hoàng Vân).',
            'Bồi dưỡng lòng yêu nước, ý thức tự hào dân tộc.'
          ],
          keyKnowledge: [
            'Thể loại tráng ca, nhịp 2/4 dứt khoát, âm vực rộng mở.',
            'Kỹ thuật lấy hơi sâu và đẩy âm thanh vang sáng.'
          ],
          exercises: [
            'Hát đồng ca kết hợp tư thế đứng trang nghiêm.',
            'Gõ đệm trống hành khúc theo phách mạnh.'
          ]
        },
        {
          id: 'music7-cd7-les2',
          lessonNumber: 16,
          title: 'Chủ đề 7: Đất nước mến yêu - Tiết 2: Thưởng thức âm nhạc: Nhạc sĩ Đỗ Nhuận & Đọc nhạc Bài số 7',
          chapterOrTopic: 'Chủ đề 7: Đất nước mến yêu',
          periodDuration: 1,
          page: 'Trang 65 - 68',
          objectives: [
            'Tìm hiểu về Nhạc sĩ Đỗ Nhuận - tác giả ca khúc Hành quân xa và nhạc kịch Cô Sao.',
            'Đọc nhạc Bài số 7 đúng tính chất hành khúc tự hào.'
          ],
          keyKnowledge: [
            'Nhạc sĩ Đỗ Nhuận (1922 - 1991), Tổng thư ký đầu tiên của Hội Nhạc sĩ Việt Nam.',
            'Ca khúc Hành quân xa và chiến thắng Điện Biên Phủ lịch sử.'
          ],
          exercises: [
            'Hát vang câu khẩu hiệu âm nhạc: Đời chúng ta đâu có giặc là ta cứ đi.',
            'Đọc nhạc Bài số 7 kết hợp gõ đệm.'
          ]
        },

        // CHỦ ĐỀ 8: KHÁT VỌNG TUỔI TRẺ
        {
          id: 'music7-cd8-les1',
          lessonNumber: 17,
          title: 'Chủ đề 8: Khát vọng tuổi trẻ - Tiết 1: Học hát bài Khát vọng tuổi trẻ',
          chapterOrTopic: 'Chủ đề 8: Khát vọng tuổi trẻ',
          periodDuration: 1,
          page: 'Trang 69 - 72',
          objectives: [
            'Hát nhiệt huyết, sôi nổi bài hát Khát vọng tuổi trẻ (Vũ Hoàng).',
            'Nuôi dưỡng hoài bão, ước mơ cống hiến cho quê hương đất nước.'
          ],
          keyKnowledge: [
            'Phong cách nhạc trẻ trung, tiết tấu sôi động, ca từ giàu chất lý tưởng.',
            'Kỹ thuật hát cao trào và luyến láy phóng khoáng.'
          ],
          exercises: [
            'Hát hòa giọng tốp ca nam nữ.',
            'Vận động cơ thể đệm theo nhịp điệu bài hát.'
          ]
        },
        {
          id: 'music7-cd8-les2',
          lessonNumber: 18,
          title: 'Chủ đề 8: Khát vọng tuổi trẻ - Tiết 2: Thưởng thức âm nhạc: Nhạc sĩ thiên tài W. A. Mozart & Báo cáo cuối năm',
          chapterOrTopic: 'Chủ đề 8: Khát vọng tuổi trẻ',
          periodDuration: 1,
          page: 'Trang 73 - 76',
          objectives: [
            'Tìm hiểu về cuộc đời và tài năng xuất chúng của Nhạc sĩ thiên tài nước Áo W. A. Mozart.',
            'Báo cáo dự án biểu diễn âm nhạc tổng kết năm học lớp 7.'
          ],
          keyKnowledge: [
            'W. A. Mozart (1756 - 1791), thần đồng âm nhạc, trường phái cổ điển Viên.',
            'Các kiệt tác: Bản giao hưởng số 40, Hành khúc Thổ Nhĩ Kỳ, vở opera Cây sáo thần.'
          ],
          exercises: [
            'Lắng nghe trích đoạn Giao hưởng số 40 (Son thứ) và nhận diện giai điệu.',
            'Biểu diễn tổng kết báo cáo sản phẩm âm nhạc lớp 7.'
          ]
        }
      ];
    }

    // KHỐI 8 - ĐẦY ĐỦ 8 CHỦ ĐỀ
    if (normGrade.includes('8')) {
      return [
        // CHỦ ĐỀ 1: CHÀO NĂM HỌC MỚI
        {
          id: 'music8-cd1-les1',
          lessonNumber: 1,
          title: 'Chủ đề 1: Chào năm học mới - Tiết 1: Học hát bài Mùa thu ngày khai trường',
          chapterOrTopic: 'Chủ đề 1: Chào năm học mới',
          periodDuration: 1,
          page: 'Trang 6 - 9',
          objectives: [
            'Hát chính xác bài Mùa thu ngày khai trường (Vũ Trọng Tường).',
            'Thể hiện sắc thái tươi vui rộn ràng đón năm học mới của học sinh lớp 8.'
          ],
          keyKnowledge: [
            'Nhịp 2/4, dấu luyến âm phức tạp, sắc thái rộn rã.',
            'Kỹ thuật hát lĩnh xướng và đồng ca hào hứng.'
          ],
          exercises: [
            'Hát lĩnh xướng và đồng ca kết hợp gõ đệm.',
            'Tập động tác phụ họa chào mừng ngày khai giảng.'
          ]
        },
        {
          id: 'music8-cd1-les2',
          lessonNumber: 2,
          title: 'Chủ đề 1: Chào năm học mới - Tiết 2: Nhạc cụ giai điệu kèn Recorder / Kèn phím & Đọc nhạc Bài số 1',
          chapterOrTopic: 'Chủ đề 1: Chào năm học mới',
          periodDuration: 1,
          page: 'Trang 10 - 13',
          objectives: [
            'Thổi đúng thế bấm nốt B, A, G, C, D trên kèn Recorder hoặc đàn Keyboard.',
            'Đọc chuẩn xác Bài đọc nhạc số 1 giọng Đô trưởng.'
          ],
          keyKnowledge: [
            'Gam Đô trưởng (C-dur), trục âm ba Đô - Mi - Son.',
            'Tư thế cầm kèn chuẩn và điều hòa luồng hơi êm dịu.'
          ],
          exercises: [
            'Thực hành câu nhạc kèn Recorder 8 ô nhịp.',
            'Đọc nhạc Bài số 1 kết hợp đánh nhịp 2/4.'
          ]
        },
        {
          id: 'music8-cd1-les3',
          lessonNumber: 3,
          title: 'Chủ đề 1: Chào năm học mới - Tiết 3: Nhạc lý: Gam trưởng, Giọng Đô trưởng & Hợp âm ba Đô trưởng',
          chapterOrTopic: 'Chủ đề 1: Chào năm học mới',
          periodDuration: 1,
          page: 'Trang 14 - 16',
          objectives: [
            'Nắm vững cấu tạo Gam trưởng (1-1-1/2-1-1-1-1/2 cung).',
            'Xác định giọng Đô trưởng và hợp âm ba chủ C (Đô - Mi - Son).'
          ],
          keyKnowledge: [
            'Hệ thống 7 bậc âm trong gam trưởng.',
            'Hợp âm ba Đô trưởng gồm âm 1 (Đô), âm 3 (Mi), âm 5 (Son).'
          ],
          exercises: [
            'Xây dựng gam Đô trưởng trên khuông nhạc.',
            'Bấm hợp âm C trên kèn phím hoặc phím đàn.'
          ]
        },

        // CHỦ ĐỀ 2: TÌNH BẠN TUỔI THƠ
        {
          id: 'music8-cd2-les1',
          lessonNumber: 4,
          title: 'Chủ đề 2: Tình bạn tuổi thơ - Tiết 1: Học hát bài Tuổi đời mênh mông',
          chapterOrTopic: 'Chủ đề 2: Tình bạn tuổi thơ',
          periodDuration: 1,
          page: 'Trang 17 - 20',
          objectives: [
            'Hát cảm xúc ca khúc Tuổi đời mênh mông của nhạc sĩ Trịnh Công Sơn.',
            'Cảm nhận chất thơ và chiều sâu triết lý hồn nhiên của bài hát.'
          ],
          keyKnowledge: [
            'Phong cách âm nhạc Trịnh Công Sơn, nhịp điệu thong thả, sâu lắng.',
            'Kỹ thuật phát âm tròn vành rõ chữ ca từ Trịnh.'
          ],
          exercises: [
            'Thảo luận về ca từ và ý nghĩa triết lý của bài hát.',
            'Hát đơn ca hoặc song ca truyền cảm.'
          ]
        },
        {
          id: 'music8-cd2-les2',
          lessonNumber: 5,
          title: 'Chủ đề 2: Tình bạn tuổi thơ - Tiết 2: Hòa tấu nhạc cụ & Thưởng thức âm nhạc: Hát bè trong hợp xướng',
          chapterOrTopic: 'Chủ đề 2: Tình bạn tuổi thơ',
          periodDuration: 1,
          page: 'Trang 21 - 24',
          objectives: [
            'Hòa tấu giai điệu bài Tuổi đời mênh mông bằng Recorder và kèn phím.',
            'Hiểu về nghệ thuật hát bè hợp xướng (Bè nữ cao Soprano, nữ trầm Alto, nam cao Tenor, nam trầm Bass).'
          ],
          keyKnowledge: [
            'Kỹ thuật bè hòa âm và bè phức điệu đuổi bắt.',
            'Vẻ đẹp âm vang, hoành tráng của dàn hợp xướng 4 bè.'
          ],
          exercises: [
            'Luyện tập hát bè đôi đơn giản (quãng 3) theo nhóm.',
            'Lắng nghe một tác phẩm hợp xướng nổi tiếng thế giới.'
          ]
        },

        // CHỦ ĐỀ 3: ÂM VANG TRUYỀN THỐNG
        {
          id: 'music8-cd3-les1',
          lessonNumber: 6,
          title: 'Chủ đề 3: Âm vang truyền thống - Tiết 1: Học hát bài Hò kéo pháo',
          chapterOrTopic: 'Chủ đề 3: Âm vang truyền thống',
          periodDuration: 1,
          page: 'Trang 25 - 28',
          objectives: [
            'Hát đúng nhịp điệu khỏe khoắn bài Hò kéo pháo (Hoàng Vân).',
            'Tái hiện tinh thần bất khuất của bộ đội ta trong chiến dịch Điện Biên Phủ.'
          ],
          keyKnowledge: [
            'Điệu Hò lao động kết hợp hành khúc kháng chiến.',
            'Âm thanh hô xướng: Hò dô ta nào... Kéo pháo ta lên.'
          ],
          exercises: [
            'Hát xướng và hò đồng thanh dứt khoát.',
            'Vỗ tay đệm theo nhịp kéo pháo mạnh mẽ.'
          ]
        },
        {
          id: 'music8-cd3-les2',
          lessonNumber: 7,
          title: 'Chủ đề 3: Âm vang truyền thống - Tiết 2: Nhạc lý: Đảo phách, nghịch phách & Đọc nhạc Bài số 3',
          chapterOrTopic: 'Chủ đề 3: Âm vang truyền thống',
          periodDuration: 1,
          page: 'Trang 29 - 32',
          objectives: [
            'Nắm vững khái niệm hiện tượng đảo phách và nghịch phách trong tiết tấu.',
            'Đọc chuẩn xác Bài đọc nhạc số 3 có chứa đảo phách.'
          ],
          keyKnowledge: [
            'Đảo phách: nốt nhạc bắt đầu ở phách nhẹ hoặc nửa phách nhẹ ngân sang phách mạnh tiếp theo.',
            'Nghịch phách: phách mạnh rơi vào dấu lặng, âm thanh vang ở phách nhẹ.'
          ],
          exercises: [
            'Gõ đệm hình tiết tấu đảo phách bằng thanh phách.',
            'Đọc Bài đọc nhạc số 3 kết hợp đánh nhịp.'
          ]
        },

        // CHỦ ĐỀ 4: ƯỚC MƠ TƯƠNG LAI
        {
          id: 'music8-cd4-les1',
          lessonNumber: 8,
          title: 'Chủ đề 4: Ước mơ tương lai - Tiết 1: Học hát bài Bay cao tiếng hát ước mơ',
          chapterOrTopic: 'Chủ đề 4: Ước mơ tương lai',
          periodDuration: 1,
          page: 'Trang 33 - 36',
          objectives: [
            'Hát chuẩn xác bài hát Bay cao tiếng hát ước mơ (Nguyễn Nam).',
            'Thể hiện sắc thái bay bổng, khát vọng tuổi trẻ vươn tới tương lai.'
          ],
          keyKnowledge: [
            'Nhịp điệu uyển chuyển, giai điệu phóng khoáng.',
            'Kỹ thuật luyến âm mượt mà ở các nốt cao.'
          ],
          exercises: [
            'Hát tốp ca kết hợp động tác múa phụ họa.',
            'Gõ đệm trống con theo mẫu tiết tấu nảy.'
          ]
        },
        {
          id: 'music8-cd4-les2',
          lessonNumber: 9,
          title: 'Chủ đề 4: Ước mơ tương lai - Tiết 2: Thưởng thức âm nhạc: Cồng chiêng Tây Nguyên & Kiểm tra học kỳ I',
          chapterOrTopic: 'Chủ đề 4: Ước mơ tương lai',
          periodDuration: 1,
          page: 'Trang 37 - 40',
          objectives: [
            'Hiểu biết về Không gian văn hóa Cồng chiêng Tây Nguyên - Kiệt tác truyền khẩu và phi vật thể của nhân loại.',
            'Hoàn thành bài kiểm tra đánh giá cuối học kỳ I môn Âm nhạc 8.'
          ],
          keyKnowledge: [
            'Cồng (có núm) và Chiêng (không có núm), dàn chiêng Ê Đê, Ba Na, Gia Rai.',
            'Ý nghĩa tâm linh của tiếng cồng chiêng trong lễ mừng lúa mới, lễ bỏ mả.'
          ],
          exercises: [
            'Lắng nghe một bài chiêng Tây Nguyên và cảm nhận tiết tấu đa bè.',
            'Ôn tập và kiểm tra định kỳ học kỳ I.'
          ]
        },

        // CHỦ ĐỀ 5: TÌNH CA QUÊ HƯƠNG
        {
          id: 'music8-cd5-les1',
          lessonNumber: 10,
          title: 'Chủ đề 5: Tình ca quê hương - Tiết 1: Dân ca Nam Trung Bộ - Học hát bài Lý kéo chài',
          chapterOrTopic: 'Chủ đề 5: Tình ca quê hương',
          periodDuration: 1,
          page: 'Trang 41 - 44',
          objectives: [
            'Hát đúng tính chất khỏe khoắn, vui tươi bài Lý kéo chài dân ca miền biển.',
            'Cảm nhận tinh thần lạc quan, yêu lao động của bà con ngư dân.'
          ],
          keyKnowledge: [
            'Thể loại hò lý miền biển, câu hát xướng - xô đặc sắc.',
            'Từ đệm lót: Khoan hỡi khoan hò...'
          ],
          exercises: [
            'Phân vai hát xướng (1 bạn) và hát xô (cả lớp đồng thanh).',
            'Gõ đệm phách kép dứt khoát.'
          ]
        },
        {
          id: 'music8-cd5-les2',
          lessonNumber: 11,
          title: 'Chủ đề 5: Tình ca quê hương - Tiết 2: Nhạc lý: Gam thứ, Giọng La thứ & Đọc nhạc Bài số 5',
          chapterOrTopic: 'Chủ đề 5: Tình ca quê hương',
          periodDuration: 1,
          page: 'Trang 45 - 48',
          objectives: [
            'Nắm vững cấu tạo Gam thứ tự nhiên (1-1/2-1-1-1/2-1-1 cung).',
            'Đọc nhạc Bài số 5 giọng La thứ (a-moll) đúng sắc thái trữ tình.'
          ],
          keyKnowledge: [
            'Cấu tạo gam La thứ không có dấu thăng giáng ở hóa biểu.',
            'Hợp âm ba La thứ: La - Đô - Mi (Am).'
          ],
          exercises: [
            'Xây dựng gam La thứ trên khuông nhạc.',
            'Đọc Bài đọc nhạc số 5 kết hợp gõ phách.'
          ]
        },

        // CHỦ ĐỀ 6: TUỔI HỒNG KHÁM PHÁ
        {
          id: 'music8-cd6-les1',
          lessonNumber: 12,
          title: 'Chủ đề 6: Tuổi hồng khám phá - Tiết 1: Học hát bài Ngôi sao của em',
          chapterOrTopic: 'Chủ đề 6: Tuổi hồng khám phá',
          periodDuration: 1,
          page: 'Trang 49 - 52',
          objectives: [
            'Hát chuẩn xác ca khúc Ngôi sao của em với giai điệu trẻ trung, trong trẻo.',
            'Thắp sáng niềm tin và tinh thần khám phá thế giới xung quanh.'
          ],
          keyKnowledge: [
            'Nhịp 4/4 rộn rã, ca từ giàu chất tưởng tượng khoa học tuổi thơ.',
            'Kỹ thuật lấy hơi giữa câu linh hoạt.'
          ],
          exercises: [
            'Hát tốp ca kết hợp múa phụ họa đội hình.',
            'Đệm hòa tấu nhạc cụ giai điệu kèn Recorder.'
          ]
        },
        {
          id: 'music8-cd6-les2',
          lessonNumber: 13,
          title: 'Chủ đề 6: Tuổi hồng khám phá - Tiết 2: Thưởng thức âm nhạc: L. V. Beethoven & Giao hưởng số 5',
          chapterOrTopic: 'Chủ đề 6: Tuổi hồng khám phá',
          periodDuration: 1,
          page: 'Trang 53 - 56',
          objectives: [
            'Tìm hiểu về Nhạc thánh L. V. Beethoven - biểu tượng ý chí vượt lên số phận nghiệt ngã.',
            'Cảm nhận mô-típ định mệnh gõ cửa trong Bản Giao hưởng số 5 (Đô thứ).'
          ],
          keyKnowledge: [
            'L. V. Beethoven (1770 - 1827), nhà soạn nhạc vĩ đại người Đức.',
            'Chủ đề định mệnh 4 nốt nhạc bất hủ: Mi giáng - Mi giáng - Mi giáng - Đô.'
          ],
          exercises: [
            'Lắng nghe chương I Bản Giao hưởng số 5 và nhận diện mô-típ định mệnh.',
            'Chia sẻ bài học về nghị lực phi thường của Beethoven.'
          ]
        },

        // CHỦ ĐỀ 7: HÁT VỀ THẦY CÔ
        {
          id: 'music8-cd7-les1',
          lessonNumber: 14,
          title: 'Chủ đề 7: Hát về thầy cô - Tiết 1: Học hát bài Bụi phấn',
          chapterOrTopic: 'Chủ đề 7: Hát về thầy cô',
          periodDuration: 1,
          page: 'Trang 57 - 60',
          objectives: [
            'Hát tha thiết, xúc động bài hát Bụi phấn (Vũ Hoàng - Lê Văn Lộc).',
            'Khắc sâu công ơn dạy dỗ ân tình của người thầy.'
          ],
          keyKnowledge: [
            'Ca khúc kinh điển của nền âm nhạc học đường Việt Nam.',
            'Giai điệu êm dịu nhịp 3/4, hình ảnh tóc thầy bạc trắng vì bụi phấn.'
          ],
          exercises: [
            'Hát đồng ca kết hợp đánh nhịp 3/4.',
            'Viết đoạn văn ngắn cảm nhận về ca từ bài hát Bụi phấn.'
          ]
        },
        {
          id: 'music8-cd7-les2',
          lessonNumber: 15,
          title: 'Chủ đề 7: Hát về thầy cô - Tiết 2: Thưởng thức âm nhạc: Nghệ thuật Hát Chèo truyền thống',
          chapterOrTopic: 'Chủ đề 7: Hát về thầy cô',
          periodDuration: 1,
          page: 'Trang 61 - 64',
          objectives: [
            'Tìm hiểu nghệ thuật Sân khấu Chèo truyền thống vùng Đồng bằng Bắc Bộ.',
            'Nhận biết các nhân vật điển hình: Đào, Kép, Hề chèo.'
          ],
          keyKnowledge: [
            'Hát Chèo kết hợp hát, múa, diễn kịch dân gian trên chiếu chèo sân đình.',
            'Nhạc cụ đệm chèo: Trống đế, nhị, nguyệt, sáo trúc.'
          ],
          exercises: [
            'Lắng nghe một điệu chèo cổ: Đào liễu hoặc Luyện năm cung.',
            'Nhận diện tiếng trống đế đệm trong hát Chèo.'
          ]
        },

        // CHỦ ĐỀ 8: GIAI ĐIỆU HÒA BÌNH
        {
          id: 'music8-cd8-les1',
          lessonNumber: 16,
          title: 'Chủ đề 8: Giai điệu hòa bình - Tiết 1: Học hát bài Chúng em cần hòa bình',
          chapterOrTopic: 'Chủ đề 8: Giai điệu hòa bình',
          periodDuration: 1,
          page: 'Trang 65 - 68',
          objectives: [
            'Hát đúng giai điệu và tính chất sôi nổi bài Chúng em cần hòa bình (Nhạc Nga).',
            'Gửi thông điệp khát khao hòa bình cho trẻ em trên toàn thế giới.'
          ],
          keyKnowledge: [
            'Nhịp điệu dứt khoát, ca từ thiết tha, nhịp 2/4.',
            'Kỹ thuật hát lĩnh xướng lời 1 và hòa giọng điệp khúc.'
          ],
          exercises: [
            'Hát hòa giọng tốp ca kết hợp vỗ tay.',
            'Biểu diễn ca khúc quốc tế thiếu nhi.'
          ]
        },
        {
          id: 'music8-cd8-les2',
          lessonNumber: 17,
          title: 'Chủ đề 8: Giai điệu hòa bình - Tiết 2: Dàn nhạc dân tộc Việt Nam & Báo cáo tổng kết năm học',
          chapterOrTopic: 'Chủ đề 8: Giai điệu hòa bình',
          periodDuration: 1,
          page: 'Trang 69 - 72',
          objectives: [
            'Tìm hiểu các bộ nhạc cụ trong Dàn nhạc cụ truyền thống dân tộc Việt Nam.',
            'Báo cáo dự án âm nhạc biểu diễn tổng kết chương trình Âm nhạc lớp 8.'
          ],
          keyKnowledge: [
            'Phân loại nhạc cụ truyền thống: Bộ dây gảy (Tranh, Bầu, Nguyệt), Bộ kéo (Nhị, Gáo), Bộ hơi (Sáo, Tiêu), Bộ gõ (Trống, Mõ, Chiêng).',
            'Sự phong phú và bản sắc độc đáo của âm nhạc dân tộc Việt Nam.'
          ],
          exercises: [
            'Nhận diện các nhạc cụ dân tộc qua hình ảnh và âm thanh.',
            'Trình diễn tiết mục âm nhạc báo cáo kết thúc năm học lớp 8.'
          ]
        }
      ];
    }

    // KHỐI 9 - ĐẦY ĐỦ 8 CHỦ ĐỀ
    if (normGrade.includes('9')) {
      return [
        // CHỦ ĐỀ 1: KHÚC CA MÙA THU
        {
          id: 'music9-cd1-les1',
          lessonNumber: 1,
          title: 'Chủ đề 1: Khúc ca mùa thu - Tiết 1: Học hát bài Bóng dáng một ngôi trường',
          chapterOrTopic: 'Chủ đề 1: Khúc ca mùa thu',
          periodDuration: 1,
          page: 'Trang 6 - 9',
          objectives: [
            'Hát hào hùng bài hát Bóng dáng một ngôi trường (Hoàng Kỷ), thể hiện niềm tự hào học sinh lớp 9.',
            'Khắc ghi hình ảnh mái trường thân yêu nơi nuôi dưỡng ước mơ.'
          ],
          keyKnowledge: [
            'Nhịp 2/4, sắc thái hành khúc thanh niên, kỹ thuật mở rộng âm vực.',
            'Cấu trúc ca khúc 2 đoạn đơn tương phản.'
          ],
          exercises: [
            'Hát kết hợp vận động đội hình hành tiến.',
            'Tốp ca biểu diễn chào mừng năm học mới.'
          ]
        },
        {
          id: 'music9-cd1-les2',
          lessonNumber: 2,
          title: 'Chủ đề 1: Khúc ca mùa thu - Tiết 2: Nhạc lý: Quãng & Hợp âm ba chính; Đọc nhạc Bài số 1',
          chapterOrTopic: 'Chủ đề 1: Khúc ca mùa thu',
          periodDuration: 1,
          page: 'Trang 10 - 13',
          objectives: [
            'Nắm vững hệ thống hợp âm ba chính (Bậc I: Chủ, Bậc IV: Hạ át, Bậc V: Át).',
            'Đọc nhạc Bài số 1 giọng Son trưởng (G-dur) có 1 dấu thăng ở hóa biểu.'
          ],
          keyKnowledge: [
            'Gam Son trưởng có âm chủ là Son, hóa biểu có nốt Pha thăng (F#).',
            'Ba hợp âm chính trong giọng Son trưởng: G (I), C (IV), D (V).'
          ],
          exercises: [
            'Bấm hợp âm G, C, D trên phím đàn Keyboard.',
            'Đọc Bài đọc nhạc số 1 đúng cao độ F#.'
          ]
        },

        // CHỦ ĐỀ 2: TÌNH BẠN BỐN PHƯƠNG
        {
          id: 'music9-cd2-les1',
          lessonNumber: 3,
          title: 'Chủ đề 2: Tình bạn bốn phương - Tiết 1: Học hát bài Nụ cười (Nhạc Nga)',
          chapterOrTopic: 'Chủ đề 2: Tình bạn bốn phương',
          periodDuration: 1,
          page: 'Trang 14 - 17',
          objectives: [
            'Hát chuẩn xác bài Nụ cười (V. Shainsky - Lời Việt: Phạm Tuyên).',
            'Lan tỏa thông điệp vui tươi, lạc quan và tình bạn bè quốc tế.'
          ],
          keyKnowledge: [
            'Âm hưởng dân ca Nga tươi vui, nhịp nhàng, đảo phách sinh động.',
            'Kỹ thuật ngân dài và lấy hơi đúng câu.'
          ],
          exercises: [
            'Hát song ca hoặc tốp ca kèm múa phụ họa.',
            'Vỗ tay đệm theo phách nảy của bài hát.'
          ]
        },
        {
          id: 'music9-cd2-les2',
          lessonNumber: 4,
          title: 'Chủ đề 2: Tình bạn bốn phương - Tiết 2: Nhạc cụ đệm bè & Thưởng thức âm nhạc: Ca kịch (Opera) và Nhạc kịch (Musical)',
          chapterOrTopic: 'Chủ đề 2: Tình bạn bốn phương',
          periodDuration: 1,
          page: 'Trang 18 - 21',
          objectives: [
            'Thực hành mẫu đệm bè cho bài hát Nụ cười bằng Recorder hoặc đàn phím.',
            'Phân biệt hai thể loại sân khấu đỉnh cao của thế giới: Opera và Musical.'
          ],
          keyKnowledge: [
            'Opera: Diễn viên hát thính phòng cổ điển (Aria, Recitative) với dàn nhạc giao hưởng.',
            'Musical: Kết hợp kịch nói, ca hát đương đại (Pop, Rock, Jazz) và vũ đạo hiện đại.'
          ],
          exercises: [
            'Lắng nghe một trích đoạn Aria trong vở opera Carmen hoặc nhạc kịch The Phantom of the Opera.',
            'Nêu cảm nhận về sự lôi cuốn của nghệ thuật nhạc kịch.'
          ]
        },

        // CHỦ ĐỀ 3: TRI ÂN NGƯỜI KHAI SÁNG
        {
          id: 'music9-cd3-les1',
          lessonNumber: 5,
          title: 'Chủ đề 3: Tri ân người khai sáng - Tiết 1: Học hát bài Thầy cô cho em mùa xuân',
          chapterOrTopic: 'Chủ đề 3: Tri ân người khai sáng',
          periodDuration: 1,
          page: 'Trang 22 - 25',
          objectives: [
            'Hát thiết tha, trang trọng bài Thầy cô cho em mùa xuân (Vũ Hoàng).',
            'Bày tỏ lòng biết ơn vô hạn với những người thầy đã chắp cánh ước mơ.'
          ],
          keyKnowledge: [
            'Giai điệu ấm áp, cấu trúc 2 đoạn, sắc thái trìu mến.',
            'Kỹ thuật phát âm tròn chữ và luyến âm mềm mại.'
          ],
          exercises: [
            'Hát hòa giọng tốp ca nam nữ.',
            'Gõ đệm nhạc cụ tiết tấu theo hình tiết tấu nhịp 2/4.'
          ]
        },
        {
          id: 'music9-cd3-les2',
          lessonNumber: 6,
          title: 'Chủ đề 3: Tri ân người khai sáng - Tiết 2: Nhạc lý: Giọng Mi thứ & Đọc nhạc Bài số 3',
          chapterOrTopic: 'Chủ đề 3: Tri ân người khai sáng',
          periodDuration: 1,
          page: 'Trang 26 - 29',
          objectives: [
            'Hiểu về giọng Mi thứ (e-moll) có hóa biểu 1 dấu thăng (F#), song song với Son trưởng.',
            'Đọc nhạc Bài số 3 giọng Mi thứ đúng tính chất trầm lắng, sâu sắc.'
          ],
          keyKnowledge: [
            'Cặp giọng song song Son trưởng - Mi thứ có cùng hóa biểu 1 dấu thăng.',
            'Hợp âm ba chủ giọng Mi thứ: Mi - Son - Si (Em).'
          ],
          exercises: [
            'Xây dựng gam Mi thứ tự nhiên trên khuông nhạc.',
            'Đọc Bài đọc nhạc số 3 kết hợp gõ phách.'
          ]
        },

        // CHỦ ĐỀ 4: KHÚC HÁT HÒA BÌNH
        {
          id: 'music9-cd4-les1',
          lessonNumber: 7,
          title: 'Chủ đề 4: Khúc hát hòa bình - Tiết 1: Học hát bài Tiếng chuông và ngọn cờ',
          chapterOrTopic: 'Chủ đề 4: Khúc hát hòa bình',
          periodDuration: 1,
          page: 'Trang 30 - 33',
          objectives: [
            'Hát hào sảng, vang dội bài Tiếng chuông và ngọn cờ (Phạm Tuyên).',
            'Thể hiện khát vọng thế giới hòa bình, không còn chiến tranh khói lửa.'
          ],
          keyKnowledge: [
            'Ca khúc kinh điển thiếu nhi của nhạc sĩ Phạm Tuyên, nhịp 2/4 dồn dập, thôi thúc.',
            'Hình ảnh biểu tượng: Tiếng chuông ngân nga - Ngọn cờ hòa bình bay phấp phới.'
          ],
          exercises: [
            'Hát đối đáp hai bè và đồng ca điệp khúc.',
            'Gõ đệm tiết tấu hành khúc hào hùng.'
          ]
        },
        {
          id: 'music9-cd4-les2',
          lessonNumber: 8,
          title: 'Chủ đề 4: Khúc hát hòa bình - Tiết 2: Thưởng thức âm nhạc: Ca trù Việt Nam & Kiểm tra học kỳ I',
          chapterOrTopic: 'Chủ đề 4: Khúc hát hòa bình',
          periodDuration: 1,
          page: 'Trang 34 - 37',
          objectives: [
            'Tìm hiểu về Nghệ thuật Hát Ca trù - Di sản văn hóa phi vật thể cần được bảo vệ khẩn cấp của nhân loại.',
            'Hoàn thành bài kiểm tra đánh giá cuối học kỳ I môn Âm nhạc 9.'
          ],
          keyKnowledge: [
            'Bộ ba biểu diễn Ca trù: Đào nương (vừa hát vừa gõ phách), Kép đàn (đàn đáy), Quan viên (cầm chầu gõ trống chầu).',
            'Kỹ thuật hát ngân rung, đổ hột đặc thù của đào nương ca trù.'
          ],
          exercises: [
            'Lắng nghe một điệu ca trù cổ truyền: Hát nói hoặc Tỳ bà hành.',
            'Ôn tập và kiểm tra định kỳ học kỳ I.'
          ]
        },

        // CHỦ ĐỀ 5: ĐẤT NƯỚC GẤM HOA
        {
          id: 'music9-cd5-les1',
          lessonNumber: 9,
          title: 'Chủ đề 5: Đất nước gấm hoa - Tiết 1: Dân ca Huế - Học hát bài Lý mười thương',
          chapterOrTopic: 'Chủ đề 5: Đất nước gấm hoa',
          periodDuration: 1,
          page: 'Trang 38 - 41',
          objectives: [
            'Hát đúng chất giọng mượt mà, sâu lắng của Dân ca xứ Huế bài Lý mười thương.',
            'Cảm nhận nét duyên dáng, e ấp của người con gái sông Hương núi Ngự.'
          ],
          keyKnowledge: [
            'Điệu Lý mười thương với hệ thống thang âm điệu Nam xứ Huế.',
            'Cách luyến láy và phát âm đặc trưng miền Trung: thương, nón, tóc...'
          ],
          exercises: [
            'Hát truyền cảm điệu Lý mười thương kết hợp vỗ tay.',
            'Kể tên các điệu hò, lý nổi tiếng khác của xứ Huế.'
          ]
        },
        {
          id: 'music9-cd5-les2',
          lessonNumber: 10,
          title: 'Chủ đề 5: Đất nước gấm hoa - Tiết 2: Nhạc lý: Giọng Pha trưởng & Đọc nhạc Bài số 5',
          chapterOrTopic: 'Chủ đề 5: Đất nước gấm hoa',
          periodDuration: 1,
          page: 'Trang 42 - 45',
          objectives: [
            'Nắm vững Giọng Pha trưởng (F-dur) có 1 dấu giáng ở hóa biểu (Si giáng - Bb).',
            'Đọc đúng cao độ và trường độ Bài đọc nhạc số 5 giọng Pha trưởng.'
          ],
          keyKnowledge: [
            'Âm chủ Pha (F), hóa biểu 1 dấu Si giáng.',
            'Hợp âm ba chủ Pha trưởng: F - A - C.'
          ],
          exercises: [
            'Viết gam Pha trưởng trên khuông nhạc có hóa biểu Bb.',
            'Đọc Bài đọc nhạc số 5 kết hợp gõ nhịp 2/4.'
          ]
        },

        // CHỦ ĐỀ 6: KHÚC CA NGÀY MỚI
        {
          id: 'music9-cd6-les1',
          lessonNumber: 11,
          title: 'Chủ đề 6: Khúc ca ngày mới - Tiết 1: Học hát bài Khúc ca mùa xuân',
          chapterOrTopic: 'Chủ đề 6: Khúc ca ngày mới',
          periodDuration: 1,
          page: 'Trang 46 - 49',
          objectives: [
            'Hát chuẩn xác ca khúc Khúc ca mùa xuân với giai điệu rộn ràng, tươi mới.',
            'Cảm thụ sức sống mãnh liệt của thiên nhiên đất trời vào xuân.'
          ],
          keyKnowledge: [
            'Nhịp 3/4 nhịp nhàng, đảo phách tinh tế.',
            'Kỹ thuật hát chuyển giọng ngọt ngào.'
          ],
          exercises: [
            'Hát kết hợp nhún chân đánh nhịp 3/4.',
            'Trình diễn tốp ca văn nghệ mừng xuân mới.'
          ]
        },
        {
          id: 'music9-cd6-les2',
          lessonNumber: 12,
          title: 'Chủ đề 6: Khúc ca ngày mới - Tiết 2: Thưởng thức âm nhạc: P. I. Tchaikovsky & Vở ballet Hồ thiên nga',
          chapterOrTopic: 'Chủ đề 6: Khúc ca ngày mới',
          periodDuration: 1,
          page: 'Trang 50 - 53',
          objectives: [
            'Tìm hiểu về Nhạc sĩ thiên tài nước Nga P. I. Tchaikovsky.',
            'Cảm nhận vẻ đẹp lộng lẫy, huyền thoại của vở kịch múa ballet Hồ thiên nga (Swan Lake).'
          ],
          keyKnowledge: [
            'P. I. Tchaikovsky (1840 - 1893), đỉnh cao âm nhạc lãng mạn Nga.',
            'Giai điệu chủ đề nàng thiên nga Odette da diết trên tiếng kèn Oboe.'
          ],
          exercises: [
            'Lắng nghe trích đoạn Điệu nhảy của bầy thiên nga nhỏ.',
            'Nêu cảm nhận về vẻ đẹp kết hợp giữa âm nhạc và vũ đạo ballet.'
          ]
        },

        // CHỦ ĐỀ 7: KỶ NIỆM MÁI TRƯỜNG
        {
          id: 'music9-cd7-les1',
          lessonNumber: 13,
          title: 'Chủ đề 7: Kỷ niệm mái trường - Tiết 1: Học hát bài Mùa hoa phượng nở',
          chapterOrTopic: 'Chủ đề 7: Kỷ niệm mái trường',
          periodDuration: 1,
          page: 'Trang 54 - 57',
          objectives: [
            'Hát lắng đọng, xúc động bài hát Mùa hoa phượng nở trước thời khắc chia tay THCS.',
            'Gìn giữ những kỷ niệm trong sáng, tươi đẹp của tuổi học trò 4 năm dưới mái trường.'
          ],
          keyKnowledge: [
            'Giai điệu da diết, hình ảnh hoa phượng đỏ, tiếng ve kêu báo hiệu mùa thi.',
            'Kỹ thuật luyến âm và nốt ngân dài cuối câu.'
          ],
          exercises: [
            'Hát đơn ca hoặc song ca truyền cảm.',
            'Viết lưu bút hoặc chia sẻ lời chúc gửi đến bạn bè, thầy cô.'
          ]
        },
        {
          id: 'music9-cd7-les2',
          lessonNumber: 14,
          title: 'Chủ đề 7: Kỷ niệm mái trường - Tiết 2: Thưởng thức âm nhạc: Nhạc sĩ Chu Minh & Đọc nhạc Bài số 7',
          chapterOrTopic: 'Chủ đề 7: Kỷ niệm mái trường',
          periodDuration: 1,
          page: 'Trang 58 - 61',
          objectives: [
            'Tìm hiểu về Nhạc sĩ Chu Minh và ca khúc bất hủ Người là niềm tin tất thắng.',
            'Đọc nhạc Bài số 7 đúng cao độ và trường độ.'
          ],
          keyKnowledge: [
            'Nhạc sĩ Chu Minh (1931 - 2020), Giải thưởng Hồ Chí Minh về Văn học - Nghệ thuật.',
            'Ca khúc dâng lên Bác Hồ với giai điệu ngợi ca, thành kính sâu xa.'
          ],
          exercises: [
            'Lắng nghe ca khúc Người là niềm tin tất thắng do NSND Quang Thọ trình bày.',
            'Đọc nhạc Bài số 7 kết hợp gõ đệm thanh phách.'
          ]
        },

        // CHỦ ĐỀ 8: KHÁT VỌNG TƯƠNG LAI
        {
          id: 'music9-cd8-les1',
          lessonNumber: 15,
          title: 'Chủ đề 8: Khát vọng tương lai - Tiết 1: Học hát bài Tạm biệt mái trường',
          chapterOrTopic: 'Chủ đề 8: Khát vọng tương lai',
          periodDuration: 1,
          page: 'Trang 62 - 65',
          objectives: [
            'Hát thiết tha, lưu luyến ca khúc Tạm biệt mái trường.',
            'Chuẩn bị tâm thế vững vàng bước vào kỳ thi tuyển sinh lớp 10 THPT.'
          ],
          keyKnowledge: [
            'Giai điệu vừa lưu luyến vừa mở ra niềm tin vào tương lai rộng mở.',
            'Kỹ thuật hát cao trào hợp ca hào hứng.'
          ],
          exercises: [
            'Cả lớp cùng hát hòa giọng khúc ca tốt nghiệp THCS.',
            'Gõ đệm nhạc cụ kết hợp vận động chia tay.'
          ]
        },
        {
          id: 'music9-cd8-les2',
          lessonNumber: 16,
          title: 'Chủ đề 8: Khát vọng tương lai - Tiết 2: Thưởng thức âm nhạc đương đại & Báo cáo tổng kết THCS',
          chapterOrTopic: 'Chủ đề 8: Khát vọng tương lai',
          periodDuration: 1,
          page: 'Trang 66 - 70',
          objectives: [
            'Tìm hiểu các thể loại âm nhạc đương đại: Pop, Rock, Jazz, R&B, Electronic Dance Music (EDM).',
            'Báo cáo dự án biểu diễn âm nhạc tổng kết toàn bộ 4 năm cấp Trung học cơ sở.'
          ],
          keyKnowledge: [
            'Đặc trưng từng thể loại: Pop bắt tai, Rock mạnh mẽ, Jazz ngẫu hứng, EDM điện tử sôi động.',
            'Định hướng thẩm mỹ âm nhạc lành mạnh cho thanh thiếu niên.'
          ],
          exercises: [
            'Nhận diện các thể loại âm nhạc qua các trích đoạn ca khúc tiêu biểu.',
            'Biểu diễn chương trình nghệ thuật báo cáo tốt nghiệp môn Âm nhạc THCS.'
          ]
        }
      ];
    }

    // Khối 10, 11, 12 THPT (Dự phòng)
    return [
      {
        id: 'music-hs-1',
        lessonNumber: 1,
        title: `Chủ đề 1: Thanh nhạc và Biểu diễn - Bài học môn Âm Nhạc ${grade}`,
        chapterOrTopic: 'Chương trình Âm Nhạc THPT GDPT 2018',
        periodDuration: 2,
        page: 'Trang 6 - 12',
        objectives: ['Phát triển kỹ năng thanh nhạc, hơi thở hoành cách mô, xử lý tác phẩm ca khúc nghệ thuật.'],
        keyKnowledge: ['Cấu tạo thanh quản, kỹ thuật legato và staccato, các giọng trưởng thứ tự nhiên.'],
        exercises: ['Luyện thanh âm vực rộng và trình diễn một ca khúc nghệ thuật.']
      },
      {
        id: 'music-hs-2',
        lessonNumber: 2,
        title: `Chủ đề 2: Nhạc cụ hòa tấu & Hòa thanh cơ bản - Môn Âm Nhạc ${grade}`,
        chapterOrTopic: 'Chương trình Âm Nhạc THPT GDPT 2018',
        periodDuration: 2,
        page: 'Trang 13 - 20',
        objectives: ['Ứng dụng đệm đàn Keyboard / Guitar cho ca khúc học đường.'],
        keyKnowledge: ['Các hợp âm cơ bản bậc I, IV, V và vòng hòa âm phổ biến.'],
        exercises: ['Đệm hát theo vòng hợp âm C - Am - F - G.']
      }
    ];
  }

  // 2. TOÁN HỌC
  if (normSubject.includes('toán')) {
    if (normGrade.includes('6')) {
      return [
        {
          id: 'math6-les-1',
          lessonNumber: 1,
          title: 'Bài 1: Tập hợp các số tự nhiên & Phép tính cộng, trừ, nhân, chia',
          chapterOrTopic: 'Chương I: Tập hợp các số tự nhiên',
          periodDuration: 2,
          page: 'Trang 6 - 12',
          objectives: ['Nhận biết phần tử thuộc tập hợp, thực hiện thành thạo 4 phép tính.'],
          keyKnowledge: ['Tập hợp N, N*, tính chất giao hoán, kết hợp, phân phối.'],
          exercises: ['Thực hiện phép tính nhanh và tính giá trị biểu thức.']
        },
        {
          id: 'math6-les-2',
          lessonNumber: 2,
          title: 'Bài 2: Tính chia hết trong tập hợp số tự nhiên & Số nguyên tố',
          chapterOrTopic: 'Chương I: Tập hợp các số tự nhiên',
          periodDuration: 2,
          page: 'Trang 13 - 19',
          objectives: ['Dấu hiệu chia hết cho 2, 3, 5, 9; phân biệt số nguyên tố và hợp số.'],
          keyKnowledge: ['Ước và bội, quy tắc phân tích một số ra thừa số nguyên tố.'],
          exercises: ['Tìm ƯCLN và BCNN của hai số tự nhiên.']
        },
        {
          id: 'math6-les-3',
          lessonNumber: 3,
          title: 'Bài 3: Hình tam giác đều, hình vuông, hình lục giác đều',
          chapterOrTopic: 'Chương III: Hình học trực quan',
          periodDuration: 2,
          page: 'Trang 35 - 42',
          objectives: ['Nhận biết cạnh bằng nhau, góc bằng nhau của các hình đa giác đều.'],
          keyKnowledge: ['Đặc điểm hình tam giác đều, hình vuông, lục giác đều trong thực tế.'],
          exercises: ['Gấp và cắt hình lục giác đều từ giấy thủ công.']
        }
      ];
    }

    if (normGrade.includes('7')) {
      return [
        {
          id: 'math7-les-1',
          lessonNumber: 1,
          title: 'Bài 1: Tập hợp các số hữu tỉ và các phép tính trong Q',
          chapterOrTopic: 'Chương I: Số hữu tỉ',
          periodDuration: 2,
          page: 'Trang 6 - 13',
          objectives: ['Thực hiện thành thạo các phép tính cộng, trừ, nhân, chia số hữu tỉ.'],
          keyKnowledge: ['Biểu diễn số hữu tỉ trên trục số, số đối, quy tắc chuyển vế.'],
          exercises: ['Tìm x trong biểu thức chứa phân số và số thập phân.']
        },
        {
          id: 'math7-les-2',
          lessonNumber: 2,
          title: 'Bài 2: Số vô tỉ và căn bậc hai số học - Số thực R',
          chapterOrTopic: 'Chương II: Số thực',
          periodDuration: 2,
          page: 'Trang 25 - 32',
          objectives: ['Hiểu khái niệm số vô tỉ, tính căn bậc hai số học của số không âm.'],
          keyKnowledge: ['Tập hợp số thực R, trục số thực, giá trị tuyệt đối.'],
          exercises: ['So sánh các số thực và tính giá trị căn bậc hai.']
        },
        {
          id: 'math7-les-3',
          lessonNumber: 3,
          title: 'Bài 3: Góc ở vị trí đặc biệt - Hai góc đối đỉnh và kề bù',
          chapterOrTopic: 'Chương III: Góc và đường thẳng song song',
          periodDuration: 2,
          page: 'Trang 40 - 47',
          objectives: ['Chứng minh tính chất hai góc đối đỉnh bằng nhau, tính số đo góc.'],
          keyKnowledge: ['Hai góc đối đỉnh, hai góc so le trong, đồng vị khi hai đường thẳng song song.'],
          exercises: ['Tính các góc còn lại trên hình vẽ giao nhau của hai đường thẳng.']
        }
      ];
    }

    if (normGrade.includes('8')) {
      return [
        {
          id: 'math8-les-1',
          lessonNumber: 1,
          title: 'Bài 1: Đơn thức và đa thức nhiều biến',
          chapterOrTopic: 'Chương I: Đa thức',
          periodDuration: 2,
          page: 'Trang 6 - 12',
          objectives: ['Nhận biết đơn thức, bậc của đa thức, cộng trừ đa thức nhiều biến.'],
          keyKnowledge: ['Đơn thức đồng dạng, thu gọn đa thức nhiều biến.'],
          exercises: ['Thu gọn và tính giá trị của đa thức tại x = 1, y = -2.']
        },
        {
          id: 'math8-les-2',
          lessonNumber: 2,
          title: 'Bài 2: Bảy hằng đẳng thức đáng nhớ & Ứng dụng',
          chapterOrTopic: 'Chương I: Đa thức',
          periodDuration: 2,
          page: 'Trang 13 - 22',
          objectives: ['Vận dụng thành thạo bình phương của tổng, hiệu và hiệu hai bình phương.'],
          keyKnowledge: ['(a+b)², (a-b)², a²-b², (a+b)³, (a-b)³, a³+b³, a³-b³.'],
          exercises: ['Phân tích đa thức thành nhân tử bằng hằng đẳng thức.']
        },
        {
          id: 'math8-les-3',
          lessonNumber: 3,
          title: 'Bài 3: Định lý Thalès trong tam giác',
          chapterOrTopic: 'Chương IV: Định lý Thalès',
          periodDuration: 2,
          page: 'Trang 50 - 58',
          objectives: ['Vận dụng định lý Thalès tính độ dài đoạn thẳng trong tam giác.'],
          keyKnowledge: ['Tỉ số của hai đoạn thẳng, đoạn thẳng tỉ lệ, định lý thuận và đảo.'],
          exercises: ['Tính chiều cao cây hoặc tòa nhà bằng bóng nắng và cọc tiêu.']
        }
      ];
    }

    if (normGrade.includes('9')) {
      return [
        {
          id: 'math9-les-1',
          lessonNumber: 1,
          title: 'Bài 1: Căn bậc hai và căn thức bậc hai',
          chapterOrTopic: 'Chương I: Căn bậc hai, căn bậc ba',
          periodDuration: 2,
          page: 'Trang 4 - 11',
          objectives: ['Tìm điều kiện xác định của căn thức √(A), hằng đẳng thức √(A²) = |A|.'],
          keyKnowledge: ['Điều kiện A ≥ 0, quy tắc khai phương một tích và một thương.'],
          exercises: ['Rút gọn biểu thức chứa căn bậc hai.']
        },
        {
          id: 'math9-les-2',
          lessonNumber: 2,
          title: 'Bài 2: Phương trình bậc nhất hai ẩn và hệ hai phương trình bậc nhất hai ẩn',
          chapterOrTopic: 'Chương II: Hệ hai phương trình bậc nhất hai ẩn',
          periodDuration: 2,
          page: 'Trang 25 - 34',
          objectives: ['Giải hệ phương trình bằng phương pháp thế và cộng đại số.'],
          keyKnowledge: ['Quy tắc thế, quy tắc cộng đại số, giải bài toán bằng cách lập hệ phương trình.'],
          exercises: ['Giải bài toán chuyển động hoặc năng suất lao động bằng hệ phương trình.']
        },
        {
          id: 'math9-les-3',
          lessonNumber: 3,
          title: 'Bài 3: Hàm số y = ax² (a ≠ 0) và Phương trình bậc hai một ẩn',
          chapterOrTopic: 'Chương III: Hàm số y = ax² - Phương trình bậc hai',
          periodDuration: 2,
          page: 'Trang 45 - 55',
          objectives: ['Vẽ đồ thị parabol, tính nghiệm phương trình bậc hai bằng công thức nghiệm biệt thức Delta.'],
          keyKnowledge: ['Biệt thức Δ = b² - 4ac, định lý Vi-ét về tổng và tích hai nghiệm.'],
          exercises: ['Tìm m để phương trình có 2 nghiệm phân biệt thỏa mãn điều kiện đối xứng.']
        }
      ];
    }

    if (normGrade.includes('10')) {
      return [
        {
          id: 'math10-les-1',
          lessonNumber: 1,
          title: 'Bài 1: Mệnh đề và Tập hợp - Các phép toán trên tập hợp',
          chapterOrTopic: 'Chương I: Mệnh đề và Tập hợp',
          periodDuration: 2,
          page: 'Trang 6 - 15',
          objectives: ['Phát biểu mệnh đề phủ định, mệnh đề kéo theo; thực hiện giao, hợp, hiệu của hai tập hợp.'],
          keyKnowledge: ['Ký hiệu ∀, ∃, giao ∩, hợp ∪, hiệu \\ và phần bù.'],
          exercises: ['Xác định các khoảng, đoạn nghiệm trên trục số.']
        },
        {
          id: 'math10-les-2',
          lessonNumber: 2,
          title: 'Bài 2: Bất phương trình và Hệ bất phương trình bậc nhất hai ẩn',
          chapterOrTopic: 'Chương II: Bất phương trình bậc nhất hai ẩn',
          periodDuration: 2,
          page: 'Trang 18 - 26',
          objectives: ['Biểu diễn miền nghiệm của hệ bất phương trình bậc nhất hai ẩn trên mặt phẳng Oxy.'],
          keyKnowledge: ['Quy tắc xác định nửa mặt phẳng bờ d, giải bài toán tối ưu hóa quy hoạch tuyến tính.'],
          exercises: ['Tìm giá trị lớn nhất của hàm mục tiêu F(x, y) trên đa giác miền nghiệm.']
        },
        {
          id: 'math10-les-3',
          lessonNumber: 3,
          title: 'Bài 3: Vectơ và các phép toán vectơ (Cộng, Trừ, Nhân với một số)',
          chapterOrTopic: 'Chương IV: Vectơ',
          periodDuration: 2,
          page: 'Trang 45 - 58',
          objectives: ['Nắm vững quy tắc 3 điểm, quy tắc hình bình hành, tính tích vô hướng của hai vectơ.'],
          keyKnowledge: ['Vectơ cùng phương, cùng hướng, tích vô hướng u.v = |u|.|v|.cos(u, v).'],
          exercises: ['Chứng minh hai đường thẳng vuông góc hoặc 3 điểm thẳng hàng bằng vectơ.']
        }
      ];
    }

    if (normGrade.includes('11')) {
      return [
        {
          id: 'math11-les-1',
          lessonNumber: 1,
          title: 'Bài 1: Hàm số lượng giác và Phương trình lượng giác cơ bản',
          chapterOrTopic: 'Chương I: Hàm số lượng giác',
          periodDuration: 2,
          page: 'Trang 6 - 18',
          objectives: ['Xác định tập xác định, chu kỳ và vẽ đồ thị hàm số sin, cos, tan; giải phương trình sin x = a, cos x = a.'],
          keyKnowledge: ['Công thức nghiệm lượng giác, góc radian trên đường tròn lượng giác.'],
          exercises: ['Giải phương trình lượng giác cơ bản và tìm nghiệm trong đoạn [0; 2π].']
        },
        {
          id: 'math11-les-2',
          lessonNumber: 2,
          title: 'Bài 2: Cấp số cộng và Cấp số nhân',
          chapterOrTopic: 'Chương II: Dãy số - Cấp số cộng, cấp số nhân',
          periodDuration: 2,
          page: 'Trang 28 - 38',
          objectives: ['Tính công sai d, công bội q, số hạng tổng quát un và tổng Sn của n số hạng đầu.'],
          keyKnowledge: ['un = u1 + (n-1)d, un = u1.q^(n-1), công thức tổng Sn.'],
          exercises: ['Giải bài toán kinh tế tính lãi kép ngân hàng theo cấp số nhân.']
        },
        {
          id: 'math11-les-3',
          lessonNumber: 3,
          title: 'Bài 3: Đạo hàm và Quy tắc tính đạo hàm',
          chapterOrTopic: 'Chương V: Đạo hàm',
          periodDuration: 2,
          page: 'Trang 85 - 96',
          objectives: ['Tính đạo hàm bằng định nghĩa và công thức; viết phương trình tiếp tuyến của đồ thị hàm số.'],
          keyKnowledge: ['(x^n)\', (u/v)\', (uv)\', đạo hàm hàm hợp, ý nghĩa hình học hệ số góc k = f\'(x0).'],
          exercises: ['Viết phương trình tiếp tuyến tại điểm M0(x0; y0) thuộc đường cong.']
        }
      ];
    }

    // LỚP 12
    return [
      {
        id: 'math12-les-1',
        lessonNumber: 1,
        title: 'Bài 1: Tính đơn điệu và cực trị của hàm số (Tiết 1 & 2)',
        chapterOrTopic: 'Chương I: Ứng dụng đạo hàm khảo sát hàm số',
        periodDuration: 2,
        page: 'Trang 5 - 12',
        objectives: [
          'Nắm vững mối liên hệ giữa dấu đạo hàm y\' và tính đồng biến, nghịch biến.',
          'Tìm cực đại, cực tiểu của hàm số bằng quy tắc dấu đạo hàm.',
          'Ứng dụng giải các bài toán thực tiễn.'
        ],
        keyKnowledge: ['Định lý Lagrange, dấu y\', điều kiện đủ của cực trị.'],
        exercises: ['Lập bảng biến thiên và xác định cực trị của đa thức bậc ba.']
      },
      {
        id: 'math12-les-2',
        lessonNumber: 2,
        title: 'Bài 2: Giá trị lớn nhất và giá trị nhỏ nhất của hàm số trên đoạn',
        chapterOrTopic: 'Chương I: Ứng dụng đạo hàm khảo sát hàm số',
        periodDuration: 1,
        page: 'Trang 13 - 18',
        objectives: [
          'Tìm GTLN và GTNN của hàm số liên tục trên một đoạn [a; b].',
          'Giải bài toán tối ưu hóa kinh tế doanh nghiệp.'
        ],
        keyKnowledge: ['Quy tắc tính đạo hàm, tính giá trị tại các điểm dừng và mút đoạn.'],
        exercises: ['Bài toán cắt góc tấm bìa để thể tích hộp lớn nhất.']
      },
      {
        id: 'math12-les-3',
        lessonNumber: 3,
        title: 'Bài 3: Khảo sát và vẽ đồ thị của hàm số đa thức bậc ba (Tiết 1 & 2)',
        chapterOrTopic: 'Chương I: Ứng dụng đạo hàm khảo sát hàm số',
        periodDuration: 2,
        page: 'Trang 19 - 26',
        objectives: [
          'Thực hiện thành thạo sơ đồ khảo sát 3 bước của hàm số y = ax³ + bx² + cx + d.',
          'Xác định điểm uốn, tâm đối xứng và giao điểm với các trục tọa độ.',
          'Vẽ đồ thị chính xác và trực quan bằng GeoGebra.'
        ],
        keyKnowledge: [
          'Quy trình 3 bước khảo sát hàm số.',
          'Điểm uốn I(-b/3a; f(-b/3a)) là tâm đối xứng.',
          'Nhận dạng dấu hệ số a, d từ hình dáng đồ thị.'
        ],
        exercises: [
          'Khảo sát và vẽ đồ thị hàm số y = x³ - 3x² + 2.',
          'Bài tập trắc nghiệm nhận dạng đồ thị.'
        ]
      },
      {
        id: 'math12-les-4',
        lessonNumber: 4,
        title: 'Bài 4: Khảo sát hàm phân thức hữu tỉ bậc nhất trên bậc nhất',
        chapterOrTopic: 'Chương I: Ứng dụng đạo hàm khảo sát hàm số',
        periodDuration: 2,
        page: 'Trang 27 - 34',
        objectives: [
          'Tìm tiệm cận đứng x = -d/c và tiệm cận ngang y = a/c của đồ thị hàm số y = (ax+b)/(cx+d).',
          'Lập bảng biến thiên và vẽ đồ thị hàm số phân thức.'
        ],
        keyKnowledge: ['Giới hạn tại vô cực, tiệm cận đứng, tiệm cận ngang, tâm đối xứng I(-d/c; a/c).'],
        exercises: ['Khảo sát hàm số y = (2x - 1)/(x + 1).']
      }
    ];
  }

  // 3. NGỮ VĂN
  if (normSubject.includes('văn')) {
    return [
      {
        id: 'lit-les-1',
        lessonNumber: 1,
        title: `Bài 1: Khám phá vẻ đẹp ngôn từ & Văn bản đọc hiểu - Ngữ Văn ${grade}`,
        chapterOrTopic: 'Chủ đề 1: Cội nguồn yêu thương',
        periodDuration: 2,
        page: 'Trang 10 - 18',
        objectives: ['Phân tích nhân vật, đặc trưng thể loại và thông điệp tư tưởng của tác phẩm.'],
        keyKnowledge: ['Ngữ liệu đọc hiểu, biện pháp tu từ, đặc trưng phong cách tác giả.'],
        exercises: ['Viết đoạn văn ngắn 150 chữ chia sẻ cảm nhận về nhân vật chính.']
      },
      {
        id: 'lit-les-2',
        lessonNumber: 2,
        title: `Bài 2: Thực hành tiếng Việt & Rèn luyện kỹ năng viết - Ngữ Văn ${grade}`,
        chapterOrTopic: 'Chủ đề 2: Kỹ năng viết nghị luận',
        periodDuration: 2,
        page: 'Trang 22 - 30',
        objectives: ['Nắm vững cấu trúc bài văn nghị luận xã hội hoặc văn học, liên kết câu và đoạn.'],
        keyKnowledge: ['Mở bài trực tiếp/gián tiếp, luận điểm, luận cứ, dẫn chứng thực tế xác thực.'],
        exercises: ['Lập dàn ý chi tiết cho đề văn nghị luận về lòng biết ơn.']
      },
      {
        id: 'lit-les-3',
        lessonNumber: 3,
        title: `Bài 3: Nói và Nghe - Thuyết trình một vấn đề đời sống - Ngữ Văn ${grade}`,
        chapterOrTopic: 'Chủ đề 3: Kỹ năng giao tiếp và thuyết trình',
        periodDuration: 1,
        page: 'Trang 35 - 40',
        objectives: ['Tự tin trình bày quan điểm cá nhân trước tập thể, lắng nghe và phản biện tích cực.'],
        keyKnowledge: ['Ngôn ngữ hình thể, ngữ điệu giọng nói, tương tác với người nghe.'],
        exercises: ['Thực hành thuyết trình 3 phút về một cuốn sách em yêu thích.']
      }
    ];
  }

  // 4. TIẾNG ANH
  if (normSubject.includes('tiếng anh') || normSubject.includes('english')) {
    return [
      {
        id: 'eng-les-1',
        lessonNumber: 1,
        title: `Unit 1: Life and Learning - Lesson 1: Getting Started (${grade})`,
        chapterOrTopic: 'Unit 1: Life and Learning',
        periodDuration: 1,
        page: 'Pages 6 - 8',
        objectives: ['Listen and read for specific information, learn target vocabulary and grammar.'],
        keyKnowledge: ['Core vocabulary in context, grammar structures for communication.'],
        exercises: ['Practice dialogue in pairs, vocabulary matching tasks.']
      },
      {
        id: 'eng-les-2',
        lessonNumber: 2,
        title: `Unit 1: Life and Learning - Lesson 2: A Closer Look (Language Focus)`,
        chapterOrTopic: 'Unit 1: Life and Learning',
        periodDuration: 1,
        page: 'Pages 9 - 12',
        objectives: ['Master pronunciation of target phonemes and practice grammatical structures.'],
        keyKnowledge: ['Phonetics, collocations and sentence transformation exercises.'],
        exercises: ['Sentence completion and communicative role-play.']
      },
      {
        id: 'eng-les-3',
        lessonNumber: 3,
        title: `Unit 1: Life and Learning - Lesson 3: Skills 1 (Reading & Speaking)`,
        chapterOrTopic: 'Unit 1: Life and Learning',
        periodDuration: 1,
        page: 'Pages 13 - 16',
        objectives: ['Skim and scan authentic texts, discuss topics in groups.'],
        keyKnowledge: ['Reading comprehension strategies, speaking prompts and transitional phrases.'],
        exercises: ['True/False questions and group discussion summary.']
      }
    ];
  }

  // 5. KHOA HỌC TỰ NHIÊN / VẬT LÝ / HÓA HỌC / SINH HỌC
  if (normSubject.includes('khoa học') || normSubject.includes('khtn') || normSubject.includes('vật lý') || normSubject.includes('hóa') || normSubject.includes('sinh')) {
    return [
      {
        id: 'sci-les-1',
        lessonNumber: 1,
        title: `Bài 1: Khái niệm khoa học cốt lõi & Phương pháp thực nghiệm - ${subject} ${grade}`,
        chapterOrTopic: 'Chủ đề 1: Bản chất của khoa học',
        periodDuration: 2,
        page: 'Trang 6 - 14',
        objectives: ['Nắm vững định luật tự nhiên, tiến hành quan sát và thu thập số liệu thực nghiệm an toàn.'],
        keyKnowledge: ['Quy tắc an toàn phòng thí nghiệm, công thức và đơn vị đo lường chuẩn SI.'],
        exercises: ['Thực hiện thí nghiệm kiểm chứng và lập bảng ghi nhận kết quả.']
      },
      {
        id: 'sci-les-2',
        lessonNumber: 2,
        title: `Bài 2: Phân tích hiện tượng và Giải bài tập định lượng - ${subject} ${grade}`,
        chapterOrTopic: 'Chủ đề 2: Vận dụng quy luật tự nhiên',
        periodDuration: 2,
        page: 'Trang 15 - 24',
        objectives: ['Vận dụng định luật khoa học vào giải các bài toán thực tiễn đời sống.'],
        keyKnowledge: ['Phương pháp giải bài tập khoa học nhiều bước, phân tích biểu đồ.'],
        exercises: ['Giải bài tập trắc nghiệm và bài tập định lượng tình huống thực tế.']
      }
    ];
  }

  // 6. MÔN HỌC KHÁC MẶC ĐỊNH
  return [
    {
      id: 'gen-les-1',
      lessonNumber: 1,
      title: `Bài 1: Kiến thức nền tảng và khởi động - Môn ${subject} ${grade}`,
      chapterOrTopic: 'Chương 1: Tổng quan bài học',
      periodDuration: 1,
      page: 'Trang 6 - 11',
      objectives: [`Nắm vững các khái niệm căn bản của môn ${subject} ${grade}.`],
      keyKnowledge: [`Quy chuẩn lý thuyết theo bộ sách ${textbook}.`],
      exercises: ['Bài tập 1: Phân tích kiến thức lý thuyết cơ bản.']
    },
    {
      id: 'gen-les-2',
      lessonNumber: 2,
      title: `Bài 2: Thực hành và rèn luyện kỹ năng trọng tâm - Môn ${subject} ${grade}`,
      chapterOrTopic: 'Chương 1: Tổng quan bài học',
      periodDuration: 1,
      page: 'Trang 12 - 18',
      objectives: [`Vận dụng kỹ năng vào giải quyết các bài tập thực hành.`],
      keyKnowledge: ['Quy trình thực hành 4 bước chuẩn GDPT 2018.'],
      exercises: ['Bài tập 2: Thảo luận nhóm và báo cáo sản phẩm.']
    },
    {
      id: 'gen-les-3',
      lessonNumber: 3,
      title: `Bài 3: Vận dụng thực tế và dự án học tập - Môn ${subject} ${grade}`,
      chapterOrTopic: 'Chương 2: Ứng dụng thực tiễn',
      periodDuration: 2,
      page: 'Trang 19 - 25',
      objectives: ['Thiết kế sản phẩm thực tế kết nối tri thức với cuộc sống.'],
      keyKnowledge: ['Phương pháp tích hợp liên môn và giải quyết vấn đề.'],
      exercises: ['Bài tập 3: Thực hiện dự án học tập tại nhà.']
    }
  ];
}

/**
 * Tự động nhận diện Khối lớp, Môn học và Bộ sách từ tên tệp hoặc nội dung file tải lên
 */
export function autoDetectBookMetadata(fileName: string, content?: string): {
  detectedGrade: string;
  detectedSubject: string;
  detectedCategory: 'SGK' | 'SGV' | 'SBT' | 'TAI_LIEU_KHAC';
  detectedTextbook: string;
} {
  const combined = `${fileName} ${content ? content.slice(0, 500) : ''}`.toLowerCase();

  // Nhận diện khối lớp
  let detectedGrade = 'LỚP 6';
  if (combined.includes('lớp 12') || combined.includes('lop 12') || combined.includes('k12') || combined.includes('grade 12') || /[\s_\-\.](12)[\s_\-\.]/.test(fileName)) {
    detectedGrade = 'LỚP 12';
  } else if (combined.includes('lớp 11') || combined.includes('lop 11') || combined.includes('k11') || /[\s_\-\.](11)[\s_\-\.]/.test(fileName)) {
    detectedGrade = 'LỚP 11';
  } else if (combined.includes('lớp 10') || combined.includes('lop 10') || combined.includes('k10') || /[\s_\-\.](10)[\s_\-\.]/.test(fileName)) {
    detectedGrade = 'LỚP 10';
  } else if (combined.includes('lớp 9') || combined.includes('lop 9') || combined.includes('k9') || /[\s_\-\.](9)[\s_\-\.]/.test(fileName)) {
    detectedGrade = 'LỚP 9';
  } else if (combined.includes('lớp 8') || combined.includes('lop 8') || combined.includes('k8') || /[\s_\-\.](8)[\s_\-\.]/.test(fileName)) {
    detectedGrade = 'LỚP 8';
  } else if (combined.includes('lớp 7') || combined.includes('lop 7') || combined.includes('k7') || /[\s_\-\.](7)[\s_\-\.]/.test(fileName)) {
    detectedGrade = 'LỚP 7';
  } else if (combined.includes('lớp 6') || combined.includes('lop 6') || combined.includes('k6') || /[\s_\-\.](6)[\s_\-\.]/.test(fileName)) {
    detectedGrade = 'LỚP 6';
  }

  // Nhận diện môn học
  let detectedSubject = 'Âm Nhạc';
  if (combined.includes('toán') || combined.includes('toan') || combined.includes('math') || combined.includes('hình học') || combined.includes('đại số') || combined.includes('giải tích')) {
    detectedSubject = 'Toán Học';
  } else if (combined.includes('âm nhạc') || combined.includes('am nhac') || combined.includes('music') || combined.includes('hát') || combined.includes('đọc nhạc')) {
    detectedSubject = 'Âm Nhạc';
  } else if (combined.includes('ngữ văn') || combined.includes('văn') || combined.includes('literature') || combined.includes('tiếng việt')) {
    detectedSubject = 'Ngữ Văn';
  } else if (combined.includes('tiếng anh') || combined.includes('tieng anh') || combined.includes('english')) {
    detectedSubject = 'Tiếng Anh';
  } else if (combined.includes('khtn') || combined.includes('khoa học tự nhiên')) {
    detectedSubject = 'Khoa Học Tự Nhiên';
  } else if (combined.includes('lịch sử') || combined.includes('địa lý')) {
    detectedSubject = 'Lịch Sử & Địa Lý';
  }

  // Nhận diện loại tài liệu
  let detectedCategory: 'SGK' | 'SGV' | 'SBT' | 'TAI_LIEU_KHAC' = 'SGK';
  if (combined.includes('sgv') || combined.includes('giáo viên') || combined.includes('giao vien') || combined.includes('teacher')) {
    detectedCategory = 'SGV';
  } else if (combined.includes('sbt') || combined.includes('bài tập') || combined.includes('bai tap') || combined.includes('workbook')) {
    detectedCategory = 'SBT';
  } else if (combined.includes('sgk') || combined.includes('giáo khoa') || combined.includes('giao khoa') || combined.includes('textbook')) {
    detectedCategory = 'SGK';
  }

  // Bộ sách chuẩn GDPT 2018 duy nhất
  const detectedTextbook = 'Kết Nối Tri Thức';

  return {
    detectedGrade,
    detectedSubject,
    detectedCategory,
    detectedTextbook
  };
}

/**
 * Quét nội dung văn bản trích xuất từ file tải lên để nhận diện danh sách bài dạy thực tế
 */
export function extractLessonsFromRawText(rawText: string, fallbackSubject: string, fallbackGrade: string): DocumentLessonItem[] {
  if (!rawText || rawText.trim().length < 20) {
    return [];
  }

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const matchedLessons: DocumentLessonItem[] = [];
  
  // Regex nhận diện các dòng tiêu đề bài học phổ biến trong SGK tiếng Việt
  const lessonRegex = /^(bài\s*\d+|tiết\s*\d+|chủ\s*đề\s*\d+|chương\s*[ivxldcm\d]+|unit\s*\d+|lesson\s*\d+)[:\.\-\s]+(.+)/i;

  let currentLessonIndex = 1;
  for (const line of lines) {
    const match = line.match(lessonRegex);
    if (match && match[2] && match[2].length > 3 && match[2].length < 120) {
      const title = line.length > 100 ? line.slice(0, 100) + '...' : line;
      // Tránh trùng lặp
      if (!matchedLessons.some(l => l.title.toLowerCase() === title.toLowerCase())) {
        matchedLessons.push({
          id: `extracted-les-${currentLessonIndex}`,
          lessonNumber: currentLessonIndex,
          title: title,
          chapterOrTopic: `Trích xuất từ tệp sách tải lên`,
          periodDuration: 1,
          page: `Trang tài liệu`,
          objectives: [
            `Phát triển năng lực học tập môn ${fallbackSubject} ${fallbackGrade} thông qua nội dung: ${title}.`,
            `Thực hiện yêu cầu cần đạt được trích xuất từ file sách số hóa.`
          ],
          keyKnowledge: [
            `Kiến thức trọng tâm nhận diện trực tiếp từ file sách tải lên.`,
            `Nội dung kiến thức sư phạm bám sát chương trình.`
          ],
          exercises: [
            `Bài tập luyện tập nhận biết và thông hiểu từ file sách.`,
            `Vận dụng thực tiễn theo nội dung bài học.`
          ]
        });
        currentLessonIndex++;
      }
    }
  }

  return matchedLessons;
}
