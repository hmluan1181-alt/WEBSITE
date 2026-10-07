import { AppState, LessonPlan5512, Exam7991, SlideItem } from '../types';

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportPowerPointSlidesString(slides: SlideItem[], lessonTitle: string): string {
  return `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:p='urn:schemas-microsoft-com:office:powerpoint'
          xmlns:v='urn:schemas-microsoft-com:vml'>
    <head>
      <meta http-equiv=Content-Type content="text/html; charset=utf-8">
      <meta name=ProgId content=PowerPoint.Slide>
      <meta name=Generator content="EdTech Studio CV 5512">
      <title>${lessonTitle} - Slide Trình Chiếu 16:9</title>
      <style>
        @page { size: 16in 9in landscape; margin: 0.8in; }
        body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0f172a; color: #ffffff; margin: 0; padding: 0; }
        .slide { page-break-after: always; width: 100%; min-height: 90vh; box-sizing: border-box; padding: 36pt 48pt; background: #0f172a; color: #ffffff; display: flex; flex-direction: column; justify-content: space-between; border-bottom: 2pt solid #1e293b; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2pt solid #334155; padding-bottom: 12pt; margin-bottom: 24pt; }
        .phase { font-size: 13pt; color: #60a5fa; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5pt; }
        .slide-num { font-size: 12pt; color: #94a3b8; font-weight: bold; }
        h1 { font-size: 26pt; color: #ffffff; margin: 0 0 20pt 0; font-weight: 800; line-height: 1.25; }
        ul { font-size: 18pt; line-height: 1.6; color: #f1f5f9; padding-left: 24pt; margin: 16pt 0; }
        li { margin-bottom: 12pt; }
        .highlight { margin-top: 24pt; padding: 16pt; background: #1e293b; border-left: 6pt solid #3b82f6; border-radius: 8pt; }
        .highlight-title { font-size: 13pt; color: #60a5fa; font-weight: bold; text-transform: uppercase; margin-bottom: 4pt; }
        .highlight-content { font-size: 16pt; color: #e2e8f0; font-weight: 500; }
        .notes-footer { margin-top: 24pt; padding-top: 12pt; border-top: 1pt dashed #475569; font-size: 11pt; color: #fbbf24; font-style: italic; }
      </style>
    </head>
    <body>
      ${slides.map((s, idx) => `
        <div class="slide">
          <div class="header">
            <span class="phase">${s.phase} · TIẾN TRÌNH CV 5512</span>
            <span class="slide-num">SLIDE ${s.slideNumber || (idx + 1)} / ${slides.length}</span>
          </div>
          <h1>${s.title}</h1>
          <ul>
            ${s.bulletPoints.map(b => `<li>${b}</li>`).join('')}
          </ul>
          ${s.highlightBox ? `
            <div class="highlight">
              <div class="highlight-title">${s.highlightBox.title}</div>
              <div class="highlight-content">${s.highlightBox.content}</div>
            </div>
          ` : ''}
          ${s.teacherNotes ? `
            <div class="notes-footer">
              <b>Ghi chú sư phạm dành cho Giáo viên:</b> ${s.teacherNotes} (Thời gian dự kiến: ${s.timerMinutes || 3} phút)
            </div>
          ` : ''}
        </div>
      `).join('')}
    </body>
    </html>
  `;
}

export function exportPowerPointSlidesBlob(slides: SlideItem[], lessonTitle: string): Blob {
  const content = exportPowerPointSlidesString(slides, lessonTitle);
  return new Blob([content], { type: 'application/vnd.ms-powerpoint' });
}

export function exportPowerPointSlides(slides: SlideItem[], lessonTitle: string) {
  const content = exportPowerPointSlidesString(slides, lessonTitle);
  downloadFile(content, `Slide_TrinhChieu_5512_${lessonTitle.replace(/[^a-zA-Z0-9_\u00C0-\u024F\u1EA0-\u1EF9]/g, '_')}.ppt`, 'application/vnd.ms-powerpoint');
}

export function exportWordKhbdString(khbd: LessonPlan5512): string {
  const { header, generalObjectives, teachingEquipment, activities, notes } = khbd;
  
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${header.lessonTitle}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.4; color: #000; margin: 20mm; }
        h1, h2, h3, h4 { margin: 8pt 0 4pt 0; font-family: 'Times New Roman', serif; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .bold { font-weight: bold; }
        .italic { font-style: italic; }
        .uppercase { text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin: 8pt 0; }
        table, th, td { border: 1px solid #000; }
        th, td { padding: 6pt; vertical-align: top; font-size: 12pt; }
        th { background-color: #f2f2f2; text-align: center; font-weight: bold; }
        .header-table { width: 100%; border: none; margin-bottom: 12pt; }
        .header-table td { border: none; padding: 2pt; }
        .activity-box { margin-bottom: 14pt; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td style="width: 50%;" class="text-center">
            <div class="uppercase bold">${header.schoolName}</div>
            <div class="bold">${header.departmentName}</div>
            <div>Họ và tên GV: ${header.teacherName}</div>
          </td>
          <td style="width: 50%;" class="text-center">
            <div class="bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="bold">Độc lập - Tự do - Hạnh phúc</div>
            <div class="italic">Năm học: ${header.academicYear}</div>
          </td>
        </tr>
      </table>

      <div class="text-center" style="margin: 16pt 0;">
        <h2 class="uppercase bold" style="margin-bottom: 2pt;">KẾ HOẠCH BÀI DẠY (GIÁO ÁN)</h2>
        <div class="italic">Theo tinh thần chuẩn Công văn số 5512/BGDĐT-GDTrH</div>
        <h3 class="uppercase bold" style="color: #1e3a8a; margin-top: 6pt;">${header.lessonTitle}</h3>
        <div>Môn học: <b>${header.subjectName}</b> | Lớp: <b>${header.grade} (${header.className})</b> | Thời lượng: <b>${header.durationPeriods} tiết</b></div>
      </div>

      <hr style="border: 0; border-top: 1px solid #000; margin-bottom: 12pt;" />

      <h3 class="bold">I. MỤC TIÊU</h3>
      <div><b>1. Kiến thức:</b></div>
      <ul>
        ${generalObjectives.knowledge.map(k => `<li>${k}</li>`).join('')}
      </ul>

      <div><b>2. Năng lực:</b></div>
      <div><i>a) Năng lực chung:</i></div>
      <ul>
        ${generalObjectives.coreCompetencies.map(c => `<li>${c}</li>`).join('')}
      </ul>
      <div><i>b) Năng lực đặc thù môn học:</i></div>
      <ul>
        ${generalObjectives.subjectCompetencies.map(c => `<li>${c}</li>`).join('')}
      </ul>

      <div><b>3. Phẩm chất:</b></div>
      <ul>
        ${generalObjectives.qualities.map(q => `<li>${q}</li>`).join('')}
      </ul>

      <h3 class="bold">II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU</h3>
      <div><b>1. Giáo viên:</b> ${teachingEquipment.teacher.join('; ')}.</div>
      <div><b>2. Học sinh:</b> ${teachingEquipment.students.join('; ')}.</div>
      <div><b>3. Học liệu số:</b> ${teachingEquipment.digitalAssets.join('; ')}.</div>

      <h3 class="bold">III. TIẾN TRÌNH DẠY HỌC (4 HOẠT ĐỘNG THEO CV 5512)</h3>
      ${activities.map(act => `
        <div class="activity-box">
          <h4 class="bold uppercase" style="color: #0f172a; background: #e2e8f0; padding: 4pt 6pt;">
            ${act.title} (${act.timeEstimate})
          </h4>
          <p><b>a) Mục tiêu:</b> ${act.objectives}</p>
          <p><b>b) Nội dung:</b> ${act.content}</p>
          <p><b>c) Sản phẩm:</b> ${act.product}</p>
          <p><b>d) Tổ chức thực hiện:</b></p>
          <table>
            <thead>
              <tr>
                <th style="width: 25%;">Tiến trình các bước</th>
                <th style="width: 40%;">Hoạt động của Giáo viên</th>
                <th style="width: 35%;">Hoạt động của Học sinh</th>
              </tr>
            </thead>
            <tbody>
              ${act.steps.map(step => `
                <tr>
                  <td class="bold">${step.name}</td>
                  <td>${step.teacherAction}</td>
                  <td>${step.studentAction}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}

      <h3 class="bold">IV. HỒ SƠ DẠY HỌC VÀ GHI CHÚ SƯ PHẠM</h3>
      <p>${notes}</p>

      <table class="header-table" style="margin-top: 24pt;">
        <tr>
          <td style="width: 50%;" class="text-center">
            <div class="bold">DUYỆT CỦA TỔ CHUYÊN MÔN</div>
            <div class="italic">(Ký và ghi rõ họ tên)</div>
          </td>
          <td style="width: 50%;" class="text-center">
            <div class="italic">Ngày ..... tháng ..... năm 20....</div>
            <div class="bold">GIÁO VIÊN SOẠN BÀI</div>
            <div class="italic">(Ký và ghi rõ họ tên)</div>
            <br><br><br>
            <div class="bold">${header.teacherName}</div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return content;
}

export function exportWordKhbdBlob(khbd: LessonPlan5512): Blob {
  const content = exportWordKhbdString(khbd);
  return new Blob([content], { type: 'application/msword' });
}

export function exportWordKhbd(khbd: LessonPlan5512) {
  const content = exportWordKhbdString(khbd);
  downloadFile(content, `KHBD_5512_${khbd.header.subjectName}_${khbd.header.grade}.doc`, 'application/msword');
}

export function exportWordExamString(exam: Exam7991): string {
  const { header, summary, partI, partII, partIII, partIV, matrix, specifications } = exam;

  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${header.examTitle}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.35; color: #000; margin: 20mm; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .bold { font-weight: bold; }
        .italic { font-style: italic; }
        .uppercase { text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin: 8pt 0; }
        table, th, td { border: 1px solid #000; }
        th, td { padding: 5pt; vertical-align: top; font-size: 11pt; }
        th { background-color: #f1f5f9; text-align: center; font-weight: bold; }
        .header-table { width: 100%; border: none; margin-bottom: 10pt; }
        .header-table td { border: none; padding: 2pt; }
        .page-break { page-break-before: always; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td style="width: 50%;" class="text-center">
            <div class="uppercase bold">${header.schoolName}</div>
            <div class="bold">${header.departmentName}</div>
            <div>Mã đề: <b>101</b></div>
          </td>
          <td style="width: 50%;" class="text-center">
            <div class="bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="bold">Độc lập - Tự do - Hạnh phúc</div>
            <div class="italic">Thời gian làm bài: ${header.examDurationMinutes} phút</div>
          </td>
        </tr>
      </table>

      <div class="text-center" style="margin: 12pt 0;">
        <h2 class="uppercase bold" style="margin-bottom: 2pt;">${header.examTitle}</h2>
        <div class="italic">Cấu trúc 4 phần chuẩn Công văn 7991/BGDĐT-GDTrH (17/12/2024)</div>
        <div>Môn: <b>${header.subjectName}</b> - Khối <b>${header.grade}</b> - Barem: <b>${summary.totalPoints.toFixed(1)} điểm</b></div>
      </div>

      <!-- PHẦN I -->
      <h3 class="bold">PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (${summary.partIPoints.toFixed(1)} điểm)</h3>
      <p class="italic">Thí sinh trả lời từ câu 1 đến câu ${partI.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.</p>
      ${partI.map(q => `
        <div style="margin-bottom: 8pt;">
          <div><b>Câu ${q.number}:</b> ${q.content}</div>
          <table style="border: none; margin: 3pt 0;">
            <tr style="border: none;">
              ${q.options.map(opt => `<td style="border: none; width: 25%;"><b>${opt.key}.</b> ${opt.text}</td>`).join('')}
            </tr>
          </table>
        </div>
      `).join('')}

      <!-- PHẦN II -->
      <h3 class="bold page-break">PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG SAI (${summary.partIIPoints.toFixed(1)} điểm)</h3>
      <p class="italic">Thí sinh trả lời từ câu 1 đến câu ${partII.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.</p>
      <p class="italic" style="font-size: 11pt; color: #334155;">
        * Quy định chấm điểm Bộ GD&ĐT: Đúng 1 ý được 0.1 điểm; Đúng 2 ý được 0.25 điểm; Đúng 3 ý được 0.5 điểm; Đúng cả 4 ý được 1.0 điểm.
      </p>
      ${partII.map(q => `
        <div style="margin-bottom: 12pt;">
          <div><b>Câu ${q.number} (1.0 điểm):</b> ${q.stem}</div>
          <table>
            <thead>
              <tr>
                <th style="width: 10%;">Lệnh</th>
                <th style="width: 70%;">Phát biểu / Mệnh đề</th>
                <th style="width: 10%;">Đúng</th>
                <th style="width: 10%;">Sai</th>
              </tr>
            </thead>
            <tbody>
              ${q.statements.map(stmt => `
                <tr>
                  <td class="text-center bold">${stmt.key})</td>
                  <td>${stmt.text}</td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}

      <!-- PHẦN III -->
      <h3 class="bold">PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (${summary.partIIIPoints.toFixed(1)} điểm)</h3>
      <p class="italic">Thí sinh trả lời từ câu 1 đến câu ${partIII.length}. Thí sinh điền kết quả tính toán vào phiếu trả lời.</p>
      ${partIII.map(q => `
        <div style="margin-bottom: 8pt;">
          <div><b>Câu ${q.number} (${q.score} điểm):</b> ${q.content} ${q.unit ? `<i>(Đơn vị: ${q.unit})</i>` : ''}</div>
          <div style="margin: 4pt 0 4pt 20pt; border-bottom: 1px dotted #666; width: 200px;">Đáp số: ............................</div>
        </div>
      `).join('')}

      <!-- PHẦN IV -->
      <h3 class="bold">PHẦN IV. TỰ LUẬN (${summary.partIVPoints.toFixed(1)} điểm)</h3>
      <p class="italic">Thí sinh trình bày chi tiết lời giải các bài toán sau vào giấy làm bài.</p>
      ${partIV.map(q => `
        <div style="margin-bottom: 12pt;">
          <div><b>Câu ${q.number} (${q.totalScore} điểm):</b> ${q.content.replace(/\n/g, '<br/>')}</div>
        </div>
      `).join('')}

      <div class="text-center bold italic" style="margin-top: 16pt;">------------- HẾT -------------</div>

      <!-- PHỤ LỤC: MA TRẬN & ĐẶC TẢ THEO CV 7991 -->
      <div class="page-break"></div>
      <div class="text-center">
        <h3 class="bold uppercase">PHỤ LỤC 1: MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ</h3>
        <div class="italic">(Kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ GDĐT)</div>
        <div class="bold">Tỉ lệ điểm: Nhận biết 40% (4.0đ) - Thông hiểu 30% (3.0đ) - Vận dụng 30% (3.0đ)</div>
      </div>

      <table>
        <thead>
          <tr>
            <th rowspan="3">TT</th>
            <th rowspan="3">Chủ đề / Chương</th>
            <th rowspan="3">Nội dung / đơn vị kiến thức</th>
            <th colspan="12">Mức độ đánh giá</th>
            <th rowspan="3">Tổng điểm</th>
            <th rowspan="3">Tỉ lệ %</th>
          </tr>
          <tr>
            <th colspan="3">Phần I: TN nhiều LC</th>
            <th colspan="3">Phần II: Đúng / Sai</th>
            <th colspan="3">Phần III: Trả lời ngắn</th>
            <th colspan="3">Phần IV: Tự luận</th>
          </tr>
          <tr>
            <th>Biết</th><th>Hiểu</th><th>VD</th>
            <th>Biết</th><th>Hiểu</th><th>VD</th>
            <th>Biết</th><th>Hiểu</th><th>VD</th>
            <th>Biết</th><th>Hiểu</th><th>VD</th>
          </tr>
        </thead>
        <tbody>
          ${matrix.map((row, idx) => `
            <tr>
              <td class="text-center">${idx + 1}</td>
              <td>${row.topic}</td>
              <td>${row.content}</td>
              <td class="text-center">${row.partI.nb || ''}</td>
              <td class="text-center">${row.partI.th || ''}</td>
              <td class="text-center">${row.partI.vd || ''}</td>
              <td class="text-center">${row.partII.nb || ''}</td>
              <td class="text-center">${row.partII.th || ''}</td>
              <td class="text-center">${row.partII.vd || ''}</td>
              <td class="text-center">${row.partIII.nb || ''}</td>
              <td class="text-center">${row.partIII.th || ''}</td>
              <td class="text-center">${row.partIII.vd || ''}</td>
              <td class="text-center">${row.partIV.nb || ''}</td>
              <td class="text-center">${row.partIV.th || ''}</td>
              <td class="text-center">${row.partIV.vd || ''}</td>
              <td class="text-center bold">${row.totalScore.toFixed(2)}</td>
              <td class="text-center">${row.percentage}%</td>
            </tr>
          `).join('')}
          <tr style="background: #f8fafc; font-weight: bold;">
            <td colspan="3" class="text-center">Tổng số điểm theo dạng thức</td>
            <td colspan="3" class="text-center">${summary.partIPoints.toFixed(1)} điểm</td>
            <td colspan="3" class="text-center">${summary.partIIPoints.toFixed(1)} điểm</td>
            <td colspan="3" class="text-center">${summary.partIIIPoints.toFixed(1)} điểm</td>
            <td colspan="3" class="text-center">${summary.partIVPoints.toFixed(1)} điểm</td>
            <td class="text-center">${summary.totalPoints.toFixed(1)}</td>
            <td class="text-center">100%</td>
          </tr>
        </tbody>
      </table>

      <!-- HƯỚNG DẪN CHẤM & ĐÁP ÁN -->
      <div class="page-break"></div>
      <div class="text-center">
        <h3 class="bold uppercase">HƯỚNG DẪN CHẤM VÀ THANG ĐIỂM CHI TIẾT</h3>
        <div class="italic">Thực hiện theo định hướng đánh giá năng lực của Bộ GD&ĐT</div>
      </div>

      <h4 class="bold">1. ĐÁP ÁN PHẦN I (3.0 điểm - Mỗi câu 0.25 điểm)</h4>
      <table>
        <tr>
          ${partI.map(q => `<th>C${q.number}</th>`).join('')}
        </tr>
        <tr>
          ${partI.map(q => `<td class="text-center bold">${q.correctAnswer}</td>`).join('')}
        </tr>
      </table>

      <h4 class="bold">2. ĐÁP ÁN PHẦN II (2.0 điểm - Tối đa 1.0 điểm/câu)</h4>
      <table>
        <thead>
          <tr>
            <th>Câu</th>
            <th>Lệnh a)</th>
            <th>Lệnh b)</th>
            <th>Lệnh c)</th>
            <th>Lệnh d)</th>
            <th>Quy tắc tính điểm</th>
          </tr>
        </thead>
        <tbody>
          ${partII.map(q => `
            <tr>
              <td class="text-center bold">Câu ${q.number}</td>
              <td class="text-center bold">${q.statements[0].isCorrect ? 'ĐÚNG' : 'SAI'}</td>
              <td class="text-center bold">${q.statements[1].isCorrect ? 'ĐÚNG' : 'SAI'}</td>
              <td class="text-center bold">${q.statements[2].isCorrect ? 'ĐÚNG' : 'SAI'}</td>
              <td class="text-center bold">${q.statements[3].isCorrect ? 'ĐÚNG' : 'SAI'}</td>
              <td>1 ý: 0.1đ | 2 ý: 0.25đ | 3 ý: 0.5đ | 4 ý: 1.0đ</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h4 class="bold">3. ĐÁP ÁN PHẦN III (2.0 điểm - Mỗi câu 0.5 điểm)</h4>
      <table>
        <thead>
          <tr><th>Câu</th><th>Đáp số chuẩn</th><th>Giải thích vắn tắt</th></tr>
        </thead>
        <tbody>
          ${partIII.map(q => `
            <tr>
              <td class="text-center bold">Câu ${q.number}</td>
              <td class="text-center bold" style="color: #2563eb;">${q.correctAnswer} ${q.unit || ''}</td>
              <td>${q.explanation}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h4 class="bold">4. BAREM CHẤM PHẦN IV TỰ LUẬN (3.0 điểm)</h4>
      ${partIV.map(q => `
        <div style="margin-bottom: 8pt;">
          <div class="bold">Câu ${q.number} (${q.totalScore} điểm):</div>
          <table>
            <thead>
              <tr><th style="width: 85%;">Các bước giải & yêu cầu</th><th style="width: 15%;">Điểm</th></tr>
            </thead>
            <tbody>
              ${q.criteria.map(c => `
                <tr><td>${c.step}</td><td class="text-center bold">${c.score.toFixed(2)}</td></tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}
    </body>
    </html>
  `;

  return content;
}

export function exportWordExamBlob(exam: Exam7991): Blob {
  const content = exportWordExamString(exam);
  return new Blob([content], { type: 'application/msword' });
}

export function exportWordExam(exam: Exam7991) {
  const content = exportWordExamString(exam);
  downloadFile(content, `DeKiemTra_Va_MaTran_7991_${exam.header.subjectName}_${exam.header.grade}.doc`, 'application/msword');
}

export function exportWordExamPaperOnly(exam: Exam7991) {
  const { header, summary, partI, partII, partIII, partIV } = exam;

  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${header.examTitle} - Đề Thi Chuẩn Bộ GD&ĐT</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.35; color: #000; margin: 20mm; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .bold { font-weight: bold; }
        .italic { font-style: italic; }
        .uppercase { text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin: 8pt 0; }
        table, th, td { border: 1px solid #000; }
        th, td { padding: 5pt; vertical-align: top; font-size: 11pt; }
        th { background-color: #f1f5f9; text-align: center; font-weight: bold; }
        .header-table { width: 100%; border: none; margin-bottom: 10pt; }
        .header-table td { border: none; padding: 2pt; }
        .page-break { page-break-before: always; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td style="width: 50%;" class="text-center">
            <div class="uppercase bold">${header.schoolName}</div>
            <div class="bold">${header.departmentName}</div>
            <div>Mã đề thi: <b>101</b></div>
          </td>
          <td style="width: 50%;" class="text-center">
            <div class="bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="bold">Độc lập - Tự do - Hạnh phúc</div>
            <div class="italic">Thời gian làm bài: ${header.examDurationMinutes} phút</div>
          </td>
        </tr>
      </table>

      <div class="text-center" style="margin: 12pt 0;">
        <h2 class="uppercase bold" style="margin-bottom: 2pt;">${header.examTitle}</h2>
        <div class="italic">Cấu trúc 4 phần chuẩn Công văn 7991/BGDĐT-GDTrH (17/12/2024)</div>
        <div>Môn: <b>${header.subjectName}</b> - Khối <b>${header.grade}</b> - Barem tổng: <b>${summary.totalPoints.toFixed(1)} điểm</b></div>
      </div>

      <!-- PHẦN I -->
      <h3 class="bold">PHẦN I. CÂU TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (${summary.partIPoints.toFixed(1)} điểm)</h3>
      <p class="italic">Thí sinh trả lời từ câu 1 đến câu ${partI.length}. Mỗi câu hỏi thí sinh chỉ chọn một phương án.</p>
      ${partI.map(q => `
        <div style="margin-bottom: 8pt;">
          <div><b>Câu ${q.number}:</b> ${q.content}</div>
          <table style="border: none; margin: 3pt 0;">
            <tr style="border: none;">
              ${q.options.map(opt => `<td style="border: none; width: 25%;"><b>${opt.key}.</b> ${opt.text}</td>`).join('')}
            </tr>
          </table>
        </div>
      `).join('')}

      <!-- PHẦN II -->
      <h3 class="bold page-break">PHẦN II. CÂU TRẮC NGHIỆM ĐÚNG SAI (${summary.partIIPoints.toFixed(1)} điểm)</h3>
      <p class="italic">Thí sinh trả lời từ câu 1 đến câu ${partII.length}. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn đúng hoặc sai.</p>
      <p class="italic" style="font-size: 11pt; color: #334155;">
        * Thang điểm Bộ GD&ĐT: Đúng 1 ý được 0.1 điểm; Đúng 2 ý được 0.25 điểm; Đúng 3 ý được 0.5 điểm; Đúng cả 4 ý được 1.0 điểm.
      </p>
      ${partII.map(q => `
        <div style="margin-bottom: 12pt;">
          <div><b>Câu ${q.number} (1.0 điểm):</b> ${q.stem}</div>
          <table>
            <thead>
              <tr>
                <th style="width: 10%;">Lệnh</th>
                <th style="width: 70%;">Phát biểu / Mệnh đề</th>
                <th style="width: 10%;">Đúng</th>
                <th style="width: 10%;">Sai</th>
              </tr>
            </thead>
            <tbody>
              ${q.statements.map(stmt => `
                <tr>
                  <td class="text-center bold">${stmt.key})</td>
                  <td>${stmt.text}</td>
                  <td class="text-center"></td>
                  <td class="text-center"></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}

      <!-- PHẦN III -->
      <h3 class="bold">PHẦN III. CÂU TRẮC NGHIỆM TRẢ LỜI NGẮN (${summary.partIIIPoints.toFixed(1)} điểm)</h3>
      <p class="italic">Thí sinh trả lời từ câu 1 đến câu ${partIII.length}. Thí sinh điền kết quả tính toán vào phiếu trả lời.</p>
      ${partIII.map(q => `
        <div style="margin-bottom: 8pt;">
          <div><b>Câu ${q.number} (${q.score} điểm):</b> ${q.content} ${q.unit ? `<i>(Đơn vị: ${q.unit})</i>` : ''}</div>
          <div style="margin: 4pt 0 4pt 20pt; border-bottom: 1px dotted #666; width: 220px;">Đáp số: ............................</div>
        </div>
      `).join('')}

      <!-- PHẦN IV -->
      <h3 class="bold">PHẦN IV. TỰ LUẬN (${summary.partIVPoints.toFixed(1)} điểm)</h3>
      <p class="italic">Thí sinh trình bày chi tiết lời giải các bài toán sau vào giấy làm bài.</p>
      ${partIV.map(q => `
        <div style="margin-bottom: 12pt;">
          <div><b>Câu ${q.number} (${q.totalScore} điểm):</b> ${q.content.replace(/\n/g, '<br/>')}</div>
        </div>
      `).join('')}

      <div class="text-center bold italic" style="margin-top: 16pt;">------------- HẾT ĐỀ THI -------------</div>

      <!-- HƯỚNG DẪN CHẤM & ĐÁP ÁN BAREM -->
      <div class="page-break"></div>
      <div class="text-center">
        <h3 class="bold uppercase">HƯỚNG DẪN CHẤM VÀ THANG ĐIỂM CHI TIẾT</h3>
        <div class="italic">Áp dụng cho đề thi chuẩn Công văn số 7991/BGDĐT-GDTrH</div>
      </div>

      <h4 class="bold">1. ĐÁP ÁN PHẦN I (3.0 điểm - Mỗi câu 0.25 điểm)</h4>
      <table>
        <tr>
          ${partI.map(q => `<th>C${q.number}</th>`).join('')}
        </tr>
        <tr>
          ${partI.map(q => `<td class="text-center bold">${q.correctAnswer}</td>`).join('')}
        </tr>
      </table>

      <h4 class="bold">2. ĐÁP ÁN PHẦN II (2.0 điểm - Tối đa 1.0 điểm/câu)</h4>
      <table>
        <thead>
          <tr>
            <th>Câu</th>
            <th>Lệnh a)</th>
            <th>Lệnh b)</th>
            <th>Lệnh c)</th>
            <th>Lệnh d)</th>
            <th>Quy tắc tính điểm</th>
          </tr>
        </thead>
        <tbody>
          ${partII.map(q => `
            <tr>
              <td class="text-center bold">Câu ${q.number}</td>
              <td class="text-center bold">${q.statements[0].isCorrect ? 'ĐÚNG' : 'SAI'}</td>
              <td class="text-center bold">${q.statements[1].isCorrect ? 'ĐÚNG' : 'SAI'}</td>
              <td class="text-center bold">${q.statements[2].isCorrect ? 'ĐÚNG' : 'SAI'}</td>
              <td class="text-center bold">${q.statements[3].isCorrect ? 'ĐÚNG' : 'SAI'}</td>
              <td>1 ý: 0.1đ | 2 ý: 0.25đ | 3 ý: 0.5đ | 4 ý: 1.0đ</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h4 class="bold">3. ĐÁP ÁN PHẦN III (2.0 điểm - Mỗi câu 0.5 điểm)</h4>
      <table>
        <thead>
          <tr><th>Câu</th><th>Đáp số chuẩn</th><th>Giải thích vắn tắt</th></tr>
        </thead>
        <tbody>
          ${partIII.map(q => `
            <tr>
              <td class="text-center bold">Câu ${q.number}</td>
              <td class="text-center bold" style="color: #2563eb;">${q.correctAnswer} ${q.unit || ''}</td>
              <td>${q.explanation}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h4 class="bold">4. BAREM CHẤM PHẦN IV TỰ LUẬN (3.0 điểm)</h4>
      ${partIV.map(q => `
        <div style="margin-bottom: 8pt;">
          <div class="bold">Câu ${q.number} (${q.totalScore} điểm):</div>
          <table>
            <thead>
              <tr><th style="width: 85%;">Các bước giải & yêu cầu</th><th style="width: 15%;">Điểm</th></tr>
            </thead>
            <tbody>
              ${q.criteria.map(c => `
                <tr><td>${c.step}</td><td class="text-center bold">${c.score.toFixed(2)}</td></tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}
    </body>
    </html>
  `;

  downloadFile(content, `DeKiemTra_Chuan_BGD_${header.subjectName}_${header.grade}.doc`, 'application/msword');
}

export function exportWordMatrixAndSpecOnly(exam: Exam7991) {
  const { header, summary, matrix, specifications } = exam;

  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>Ma Trận & Bản Đặc Tả Đề Kiểm Tra CV 7991 - ${header.subjectName}</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.35; color: #000; margin: 15mm; }
        .text-center { text-align: center; }
        .bold { font-weight: bold; }
        .italic { font-style: italic; }
        .uppercase { text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin: 8pt 0; }
        table, th, td { border: 1px solid #000; }
        th, td { padding: 4.5pt; vertical-align: top; font-size: 10.5pt; }
        th { background-color: #f1f5f9; text-align: center; font-weight: bold; }
        .header-table { width: 100%; border: none; margin-bottom: 10pt; }
        .header-table td { border: none; padding: 2pt; }
        .page-break { page-break-before: always; }
      </style>
    </head>
    <body>
      <table class="header-table">
        <tr>
          <td style="width: 50%;" class="text-center">
            <div class="uppercase bold">${header.schoolName}</div>
            <div class="bold">${header.departmentName}</div>
          </td>
          <td style="width: 50%;" class="text-center">
            <div class="bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="bold">Độc lập - Tự do - Hạnh phúc</div>
          </td>
        </tr>
      </table>

      <!-- PHỤ LỤC 1: MA TRẬN ĐỀ -->
      <div class="text-center" style="margin: 12pt 0;">
        <h3 class="bold uppercase" style="margin-bottom: 2pt;">PHỤ LỤC 1: MA TRẬN ĐỀ KIỂM TRA ĐỊNH KỲ</h3>
        <div class="italic">(Kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ GDĐT)</div>
        <div class="bold">Môn: ${header.subjectName} - ${header.grade} | Năm học: ${header.academicYear}</div>
        <div>Tỉ lệ điểm: <b>Nhận biết 40% (4.0đ) - Thông hiểu 30% (3.0đ) - Vận dụng 30% (3.0đ)</b></div>
      </div>

      <table>
        <thead>
          <tr>
            <th rowspan="3">TT</th>
            <th rowspan="3">Chủ đề / Chương</th>
            <th rowspan="3">Nội dung / đơn vị kiến thức</th>
            <th colspan="12">Mức độ đánh giá</th>
            <th rowspan="3">Tổng điểm</th>
            <th rowspan="3">Tỉ lệ %</th>
          </tr>
          <tr>
            <th colspan="3">Phần I: TN nhiều LC</th>
            <th colspan="3">Phần II: Đúng / Sai</th>
            <th colspan="3">Phần III: Trả lời ngắn</th>
            <th colspan="3">Phần IV: Tự luận</th>
          </tr>
          <tr>
            <th>Biết</th><th>Hiểu</th><th>VD</th>
            <th>Biết</th><th>Hiểu</th><th>VD</th>
            <th>Biết</th><th>Hiểu</th><th>VD</th>
            <th>Biết</th><th>Hiểu</th><th>VD</th>
          </tr>
        </thead>
        <tbody>
          ${matrix.map((row, idx) => `
            <tr>
              <td class="text-center">${idx + 1}</td>
              <td>${row.topic}</td>
              <td>${row.content}</td>
              <td class="text-center">${row.partI.nb || ''}</td>
              <td class="text-center">${row.partI.th || ''}</td>
              <td class="text-center">${row.partI.vd || ''}</td>
              <td class="text-center">${row.partII.nb || ''}</td>
              <td class="text-center">${row.partII.th || ''}</td>
              <td class="text-center">${row.partII.vd || ''}</td>
              <td class="text-center">${row.partIII.nb || ''}</td>
              <td class="text-center">${row.partIII.th || ''}</td>
              <td class="text-center">${row.partIII.vd || ''}</td>
              <td class="text-center">${row.partIV.nb || ''}</td>
              <td class="text-center">${row.partIV.th || ''}</td>
              <td class="text-center">${row.partIV.vd || ''}</td>
              <td class="text-center bold">${row.totalScore.toFixed(2)}</td>
              <td class="text-center">${row.percentage}%</td>
            </tr>
          `).join('')}
          <tr style="background: #f8fafc; font-weight: bold;">
            <td colspan="3" class="text-center">Tổng số điểm theo dạng thức</td>
            <td colspan="3" class="text-center">${summary.partIPoints.toFixed(1)} điểm</td>
            <td colspan="3" class="text-center">${summary.partIIPoints.toFixed(1)} điểm</td>
            <td colspan="3" class="text-center">${summary.partIIIPoints.toFixed(1)} điểm</td>
            <td colspan="3" class="text-center">${summary.partIVPoints.toFixed(1)} điểm</td>
            <td class="text-center">${summary.totalPoints.toFixed(1)}</td>
            <td class="text-center">100%</td>
          </tr>
        </tbody>
      </table>

      <!-- PHỤ LỤC 2: BẢN ĐẶC TẢ ĐỀ -->
      <div class="page-break"></div>
      <div class="text-center" style="margin: 12pt 0;">
        <h3 class="bold uppercase" style="margin-bottom: 2pt;">PHỤ LỤC 2: BẢN ĐẶC TẢ ĐỀ KIỂM TRA ĐỊNH KỲ</h3>
        <div class="italic">(Kèm theo Công văn số 7991/BGDĐT-GDTrH ngày 17/12/2024 của Bộ GDĐT)</div>
        <div class="bold">Môn: ${header.subjectName} - ${header.grade}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th style="width: 5%;">TT</th>
            <th style="width: 20%;">Chủ đề / Chương</th>
            <th style="width: 25%;">Yêu cầu cần đạt</th>
            <th style="width: 35%;">Mức độ đánh giá</th>
            <th style="width: 15%;">Số câu / Phân bố</th>
          </tr>
        </thead>
        <tbody>
          ${specifications.map((spec, idx) => `
            <tr>
              <td class="text-center bold">${idx + 1}</td>
              <td><b>${spec.topic}</b><br/>${spec.content}</td>
              <td>${spec.competencyRequired}</td>
              <td>
                <div><b>Nhận biết:</b> ${spec.levels.nb}</div>
                <div style="margin-top: 3pt;"><b>Thông hiểu:</b> ${spec.levels.th}</div>
                <div style="margin-top: 3pt;"><b>Vận dụng:</b> ${spec.levels.vd}</div>
              </td>
              <td class="text-center">${spec.questionDistribution}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  downloadFile(content, `MaTran_Va_BanDacTa_7991_${header.subjectName}_${header.grade}.doc`, 'application/msword');
}

export function exportSingleFileHtmlString(state: AppState): string {
  const jsonEncoded = JSON.stringify(state).replace(/<\/script>/g, '<\\/script>');

  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>EdTech Studio (Offline Standalone) - KHBD 5512 & Đề thi 7991</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <style>
    body { font-family: 'Be Vietnam Pro', sans-serif; }
    @media print {
      .no-print { display: none !important; }
      .print-only { display: block !important; }
      body { background: white !important; color: black !important; }
    }
  </style>
</head>
<body class="bg-[#F8FAFC] text-[#0F172A] antialiased flex flex-col h-screen overflow-hidden" x-data="edtechApp()">

  <!-- TOPBAR CHUẨN SCOPE 1: MÔN HỌC, KHỐI LỚP, BỘ SÁCH, TÊN BÀI HỌC -->
  <header class="h-16 bg-[#0F172A] text-white border-b border-slate-800 px-4 md:px-6 flex items-center justify-between gap-3 shrink-0 z-20 shadow-md no-print">
    <div class="flex items-center gap-2.5 shrink-0">
      <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-sm">
        ED
      </div>
      <div>
        <div class="text-[10px] uppercase font-bold tracking-wider text-blue-400">EdTech Architect</div>
        <div class="text-xs font-bold text-white">Nền Tảng Sư Phạm GDPT</div>
      </div>
    </div>

    <!-- Quick Selectors: Môn học, Khối lớp, Bộ sách, Tên bài học -->
    <div class="flex-1 max-w-4xl flex items-center gap-2 overflow-x-auto py-1 text-xs">
      <div class="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 shrink-0">
        <span class="text-slate-400 text-[11px]">Môn:</span>
        <select x-model="data.khbd.header.subjectName" class="bg-transparent text-white font-semibold text-xs outline-none cursor-pointer">
          <option value="ÂM NHẠC" class="bg-slate-900">ÂM NHẠC</option>
          <option value="TOÁN HỌC" class="bg-slate-900">TOÁN HỌC</option>
          <option value="NGỮ VĂN" class="bg-slate-900">NGỮ VĂN</option>
          <option value="TIẾNG ANH" class="bg-slate-900">TIẾNG ANH</option>
          <option value="VẬT LÍ" class="bg-slate-900">VẬT LÍ</option>
          <option value="HÓA HỌC" class="bg-slate-900">HÓA HỌC</option>
          <option value="SINH HỌC" class="bg-slate-900">SINH HỌC</option>
          <option value="LỊCH SỬ" class="bg-slate-900">LỊCH SỬ</option>
          <option value="ĐỊA LÍ" class="bg-slate-900">ĐỊA LÍ</option>
          <option value="TIN HỌC" class="bg-slate-900">TIN HỌC</option>
        </select>
      </div>

      <div class="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 shrink-0">
        <span class="text-slate-400 text-[11px]">Khối:</span>
        <select x-model="data.khbd.header.grade" class="bg-transparent text-white font-semibold text-xs outline-none cursor-pointer">
          <option value="LỚP 6" class="bg-slate-900">LỚP 6</option>
          <option value="LỚP 7" class="bg-slate-900">LỚP 7</option>
          <option value="LỚP 8" class="bg-slate-900">LỚP 8</option>
          <option value="LỚP 9" class="bg-slate-900">LỚP 9</option>
          <option value="LỚP 10" class="bg-slate-900">LỚP 10</option>
          <option value="LỚP 11" class="bg-slate-900">LỚP 11</option>
          <option value="LỚP 12" class="bg-slate-900">LỚP 12</option>
        </select>
      </div>

      <div class="flex items-center gap-1.5 bg-slate-900/90 border border-amber-500/40 rounded-lg px-2.5 py-1 shrink-0" title="Bộ sách chuẩn GDPT 2018 duy nhất: Kết Nối Tri Thức với Cuộc Sống">
        <span class="text-amber-300 font-bold text-[11px]">Kết Nối Tri Thức</span>
      </div>

      <div class="flex-1 min-w-[200px] flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 shrink-0">
        <input type="text" x-model="data.khbd.header.lessonTitle" placeholder="Tên bài học..." class="bg-transparent text-white font-medium text-xs outline-none w-full truncate">
      </div>
    </div>

    <!-- Quick action -->
    <div class="flex items-center gap-2 shrink-0">
      <button @click="isSettingsOpen = true" class="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold flex items-center gap-1">
        <span>⚙ Cài Đặt</span>
      </button>
      <button onclick="window.print()" class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold">
        In ấn / PDF
      </button>
      <button @click="copyJson()" class="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs font-semibold">
        JSON
      </button>
    </div>
  </header>

  <!-- SPLIT-PANE CONTAINER Ở GIỮA -->
  <div class="flex flex-1 h-[calc(100vh-64px)] overflow-hidden">
    <!-- LEFT PANEL 380px: 4 CHẾ ĐỘ ĐIỀU HƯỚNG -->
    <aside class="w-[380px] shrink-0 border-r border-slate-200 bg-white flex flex-col h-full no-print">
      <!-- Profile Box -->
      <div class="p-3 border-b border-slate-100 bg-[#0F172A] text-white flex items-center justify-between text-xs">
        <div>
          <div class="text-[10px] text-blue-300 font-bold uppercase">Giáo viên phụ trách:</div>
          <div class="font-bold text-white text-xs" x-text="data.teacherProfile?.fullName || 'Nguyễn Thị Duyên Thanh'"></div>
          <div class="text-[10px] text-slate-300" x-text="(data.teacherProfile?.subject || 'Âm Nhạc') + ' · ' + (data.teacherProfile?.schoolName || 'Trường THCS Long Hồ')"></div>
        </div>
        <button @click="isSettingsOpen = true" class="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold">
          Cài Đặt
        </button>
      </div>

      <!-- Navigation Modes -->
      <div class="p-3 border-b border-slate-100 bg-slate-50 space-y-1.5">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 px-1">
          4 Chế Độ Tác Nghiệp
        </div>

        <!-- Chế độ 0: Tủ sách & Nạp tài liệu nguồn -->
        <button @click="currentSubsystem = 'upload'" :class="currentSubsystem === 'upload' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-100'" class="w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-all">
          <div>
            <div class="font-bold flex items-center gap-1.5">
              <span>Tủ Sách & Nạp Tài Liệu</span>
              <span class="text-[9px] bg-amber-400 text-black px-1 rounded font-black">GỐC</span>
            </div>
            <div class="text-[11px] opacity-80">Nạp SGK, SGV, SBT & Chọn Lớp</div>
          </div>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-black/10">Bước 1</span>
        </button>

        <button @click="currentSubsystem = 'khbd'" :class="currentSubsystem === 'khbd' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-100'" class="w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-all">
          <div>
            <div class="font-bold">Soạn KHBD 5512</div>
            <div class="text-[11px] opacity-80">Tiến trình 4 hoạt động chuẩn Bộ</div>
          </div>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-black/10">4 HĐ</span>
        </button>

        <button @click="currentSubsystem = 'slide'" :class="currentSubsystem === 'slide' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-100'" class="w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-all">
          <div>
            <div class="font-bold">Trình Chiếu Slide Bài Giảng</div>
            <div class="text-[11px] opacity-80">Slide tương tác & Ghi chú GV</div>
          </div>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-black/10" x-text="data.slides.length + ' Slide'"></span>
        </button>

        <button @click="currentSubsystem = 'exam'" :class="currentSubsystem === 'exam' ? 'bg-blue-600 text-white font-medium shadow-sm' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-100'" class="w-full text-left p-2.5 rounded-lg text-xs flex items-center justify-between transition-all">
          <div>
            <div class="font-bold">Ngân Hàng Đề Thi 7991</div>
            <div class="text-[11px] opacity-80">4 Phần độc lập - Barem 10.0đ</div>
          </div>
          <span class="text-[10px] px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold">10.0đ</span>
        </button>
      </div>

      <!-- Compliance Matrix Status -->
      <div class="p-3 border-b border-slate-100 bg-blue-50/50">
        <div class="text-xs font-semibold text-slate-700 mb-1">Kiểm toán sư phạm CV 7991:</div>
        <div class="grid grid-cols-3 gap-1 text-[11px] text-center">
          <div class="bg-white p-1.5 rounded border border-slate-200">
            <span class="text-slate-400 block text-[10px]">Nhận biết</span>
            <span class="font-bold text-slate-800">40% (4.0đ)</span>
          </div>
          <div class="bg-white p-1.5 rounded border border-slate-200">
            <span class="text-slate-400 block text-[10px]">Thông hiểu</span>
            <span class="font-bold text-slate-800">30% (3.0đ)</span>
          </div>
          <div class="bg-white p-1.5 rounded border border-slate-200">
            <span class="text-slate-400 block text-[10px]">Vận dụng</span>
            <span class="font-bold text-slate-800">30% (3.0đ)</span>
          </div>
        </div>
        <div class="mt-2 text-[11px] text-emerald-700 font-medium">
          ✓ Đủ 4 phần: I (TN 3.0đ), II (Đ/S 2.0đ), III (Ngắn 2.0đ), IV (TL 3.0đ)
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="p-3 overflow-y-auto flex-1 space-y-2 text-xs">
        <div class="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">Khu vực xuất bản</div>
        <button onclick="window.print()" class="w-full py-2 px-3 bg-slate-900 text-white rounded font-medium flex items-center justify-center gap-2 hover:bg-slate-800">
          In / Lưu PDF trực tiếp
        </button>
        <button @click="copyJson()" class="w-full py-2 px-3 bg-slate-100 text-slate-800 rounded font-medium border border-slate-300 hover:bg-slate-200 flex items-center justify-center gap-2">
          Sao chép JSON State
        </button>
      </div>
    </aside>

    <!-- RIGHT VISUAL WORKSPACE (SẴN SÀNG NẠP CÁC MODULE CON) -->
    <main class="flex-1 h-full overflow-y-auto p-6 bg-[#F8FAFC]">
      <!-- BƯỚC 1: TỦ SÁCH SƯ PHẠM & NẠP TÀI LIỆU NGUỒN (SGK, SGV, SBT) -->
      <template x-if="currentSubsystem === 'upload'">
        <div class="max-w-5xl mx-auto space-y-6">
          <div class="bg-[#0F172A] text-white p-6 rounded-2xl border border-slate-800 space-y-3 shadow-md">
            <div class="flex items-center justify-between">
              <span class="text-xs bg-blue-500/20 text-blue-300 font-bold px-3 py-1 rounded-full border border-blue-400/30">
                BƯỚC 1: NẠP TÀI LIỆU NGUỒN (SGK - SGV - SBT)
              </span>
              <button @click="isSettingsOpen = true" class="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg font-bold">
                Cài Đặt Hồ Sơ GV
              </button>
            </div>
            <h1 class="text-xl md:text-2xl font-black">
              Tủ Sách Sư Phạm: Nạp Tài Liệu & Khởi Tạo Bài Giảng
            </h1>
            <p class="text-xs text-slate-300">
              Người dùng nạp sách giáo khoa (SGK), sách giáo viên (SGV), sách bài tập (SBT) lên, chọn khối lớp rồi chuyển qua màn hình tạo KHBD 5512, Slide 16:9 và Đề thi 7991.
            </p>
          </div>

          <!-- Danh sách sách mẫu có sẵn -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <template x-for="doc in (data.sourceDocuments || [])" :key="doc.id">
              <div class="bg-white p-5 rounded-2xl border-2 border-slate-200 shadow-xs flex flex-col justify-between space-y-3">
                <div class="space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800" x-text="doc.category"></span>
                    <span class="text-[10px] text-slate-400 font-mono" x-text="doc.fileSize"></span>
                  </div>
                  <h3 class="font-bold text-xs text-slate-900" x-text="doc.lessonOrChapter"></h3>
                  <div class="text-[11px] text-slate-500" x-text="doc.subject + ' - ' + doc.grade + ' (' + doc.textbook + ')'"></div>
                </div>

                <div class="space-y-1.5 pt-2 border-t border-slate-100">
                  <button 
                    @click="data.khbd.header.lessonTitle = doc.lessonOrChapter; data.khbd.header.subjectName = doc.subject; data.khbd.header.grade = doc.grade; currentSubsystem = 'khbd'" 
                    class="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    Tạo KHBD 5512 Từ Sách Này →
                  </button>
                  <button 
                    @click="data.khbd.header.lessonTitle = doc.lessonOrChapter; convertToSlides()" 
                    class="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all"
                  >
                    Sinh Slide 16:9 Từ Sách Này →
                  </button>
                </div>
              </div>
            </template>
          </div>
        </div>
      </template>

      <!-- KHBD VIEW (CV 5512 - SCOPE 3 INLINE EDITABLE & CONVERT) -->
      <template x-if="currentSubsystem === 'khbd'">
        <div class="max-w-5xl mx-auto space-y-6">
          <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <h1 class="text-xl md:text-2xl font-bold uppercase text-slate-900" x-text="data.khbd.header.lessonTitle"></h1>
                <div class="text-xs text-blue-600 font-semibold mt-1">KẾ HOẠCH BÀI DẠY THEO CÔNG VĂN 5512/BGDĐT-GDTrH (PHỤ LỤC IV)</div>
                <div class="text-xs text-slate-500 mt-1" x-text="data.khbd.header.schoolName + ' | ' + data.khbd.header.subjectName + ' ' + data.khbd.header.grade + ' | ' + data.khbd.header.textbook"></div>
              </div>

              <!-- Nút Chuyển Đổi Nhanh KHBD Thành Slide -->
              <button 
                @click="convertToSlides()" 
                class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0"
              >
                <span>Chuyển Đổi Nhanh KHBD Thành Slide</span>
                <span>→</span>
              </button>
            </div>

            <!-- Bảng tiến trình 4 hoạt động Inline Editable -->
            <div class="space-y-5">
              <template x-for="act in data.khbd.activities" :key="act.id">
                <div class="border-2 border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                  <div class="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-bold text-xs text-slate-900 flex justify-between items-center">
                    <span x-text="act.title + ' (' + act.timeEstimate + ')'"></span>
                    <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px]" x-text="'HĐ ' + act.number + '/4'"></span>
                  </div>

                  <div class="p-4 text-xs space-y-3">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      <div class="p-2.5 bg-blue-50/50 rounded-lg border border-blue-100">
                        <div class="font-bold text-blue-900 mb-1">a) Mục tiêu:</div>
                        <textarea rows="3" x-model="act.objectives" class="w-full bg-white p-1.5 rounded border border-blue-200 text-xs outline-none focus:ring-1 focus:ring-blue-500 resize-none"></textarea>
                      </div>
                      <div class="p-2.5 bg-amber-50/50 rounded-lg border border-amber-100">
                        <div class="font-bold text-amber-900 mb-1">b) Nội dung:</div>
                        <textarea rows="3" x-model="act.content" class="w-full bg-white p-1.5 rounded border border-amber-200 text-xs outline-none focus:ring-1 focus:ring-amber-500 resize-none"></textarea>
                      </div>
                      <div class="p-2.5 bg-emerald-50/50 rounded-lg border border-emerald-100">
                        <div class="font-bold text-emerald-900 mb-1">c) Sản phẩm:</div>
                        <textarea rows="3" x-model="act.product" class="w-full bg-white p-1.5 rounded border border-emerald-200 text-xs outline-none focus:ring-1 focus:ring-emerald-500 resize-none"></textarea>
                      </div>
                    </div>

                    <!-- Bảng 4 bước tổ chức thực hiện -->
                    <div class="mt-3">
                      <div class="font-bold text-slate-800 mb-1.5">d) Tổ chức thực hiện (Bảng 4 bước sư phạm):</div>
                      <table class="w-full border-collapse border border-slate-200">
                        <thead>
                          <tr class="bg-slate-100 text-slate-700">
                            <th class="p-2 w-1/4 border text-left">Tiến trình các bước</th>
                            <th class="p-2 w-[38%] border text-left">Hoạt động Giáo viên</th>
                            <th class="p-2 w-[37%] border text-left">Hoạt động Học sinh</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template x-for="(step, sIdx) in act.steps" :key="step.name">
                            <tr class="hover:bg-slate-50">
                              <td class="p-2 border font-bold text-slate-800 bg-slate-50/60" x-text="step.name"></td>
                              <td class="p-2 border">
                                <textarea rows="2" x-model="step.teacherAction" class="w-full bg-white p-1 rounded border border-slate-200 text-xs outline-none focus:ring-1 focus:ring-blue-500 resize-y"></textarea>
                              </td>
                              <td class="p-2 border">
                                <textarea rows="2" x-model="step.studentAction" class="w-full bg-white p-1 rounded border border-slate-200 text-xs outline-none focus:ring-1 focus:ring-blue-500 resize-y"></textarea>
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>

      <!-- SLIDE VIEW (SCOPE 3 - SLIDE DECK 16:9, NEXT/PREV, FULLSCREEN) -->
      <template x-if="currentSubsystem === 'slide'">
        <div class="max-w-5xl mx-auto space-y-4">
          <!-- Slide Toolbar -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div>
              <h2 class="text-base font-bold text-slate-900 uppercase">Slide Trình Chiếu Sư Phạm 16:9</h2>
              <div class="text-xs text-slate-500">Đồng bộ trực tiếp từ tiến trình KHBD 5512</div>
            </div>
            <div class="flex items-center gap-2">
              <button 
                @click="convertToSlides()" 
                class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all"
              >
                Chuyển Đổi Nhanh KHBD Thành Slide
              </button>
              <button 
                @click="isFullscreen = true" 
                class="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
              >
                Toàn Màn Hình (F5)
              </button>
            </div>
          </div>

          <!-- Navigation Next / Prev & Slide Counter -->
          <div class="flex items-center justify-between bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-xs">
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900" x-text="'Slide ' + (currentSlideIdx + 1) + ' / ' + data.slides.length"></span>
              <span class="text-[10px] bg-blue-50 text-blue-800 px-2 py-0.5 rounded font-bold" x-text="data.slides[currentSlideIdx]?.phase"></span>
            </div>
            <div class="flex items-center gap-2">
              <button 
                @click="currentSlideIdx = Math.max(0, currentSlideIdx - 1)" 
                :disabled="currentSlideIdx === 0" 
                class="px-3 py-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-40 font-bold"
              >
                ← Trước
              </button>
              <button 
                @click="currentSlideIdx = Math.min(data.slides.length - 1, currentSlideIdx + 1)" 
                :disabled="currentSlideIdx === data.slides.length - 1" 
                class="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold"
              >
                Tiếp theo →
              </button>
            </div>
          </div>

          <!-- SLIDE DECK 16:9 CARD CANVAS -->
          <div class="bg-slate-900 rounded-2xl border-4 border-slate-800 shadow-2xl aspect-[16/9] flex flex-col justify-between p-8 md:p-12 text-white relative overflow-hidden select-none">
            <div class="flex items-center justify-between border-b border-slate-800 pb-3">
              <span class="text-xs font-bold uppercase tracking-wider text-blue-400" x-text="data.slides[currentSlideIdx]?.phase + ' · TIẾN TRÌNH CV 5512'"></span>
              <span class="text-xs font-mono bg-slate-800 px-2.5 py-1 rounded" x-text="'#' + (currentSlideIdx + 1)"></span>
            </div>

            <div class="my-auto py-4 space-y-4">
              <h1 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight" x-text="data.slides[currentSlideIdx]?.title"></h1>
              <ul class="space-y-2 text-sm md:text-base text-slate-200">
                <template x-for="b in data.slides[currentSlideIdx]?.bulletPoints" :key="b">
                  <li class="flex items-start gap-2">
                    <span class="text-blue-500 font-bold">•</span>
                    <span x-text="b"></span>
                  </li>
                </template>
              </ul>
            </div>

            <template x-if="data.slides[currentSlideIdx]?.highlightBox">
              <div class="p-3.5 bg-slate-800/90 rounded-xl border-l-4 border-blue-500 text-xs">
                <div class="font-bold text-blue-400 uppercase tracking-wider" x-text="data.slides[currentSlideIdx]?.highlightBox.title"></div>
                <div class="text-slate-300 mt-0.5" x-text="data.slides[currentSlideIdx]?.highlightBox.content"></div>
              </div>
            </template>
          </div>

          <!-- Ghi chú giáo viên -->
          <div class="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
            <b>Ghi chú sư phạm dành riêng cho GV:</b>
            <span class="ml-1" x-text="data.slides[currentSlideIdx]?.teacherNotes || 'Khích lệ học sinh chủ động thảo luận và hoàn thiện nội dung.'"></span>
          </div>
        </div>
      </template>

      <!-- EXAM VIEW (CV 7991) - SCOPE 2 ENHANCED -->
      <template x-if="currentSubsystem === 'exam'">
        <div class="max-w-6xl mx-auto space-y-6">
          <!-- Top bar with export buttons -->
          <div class="bg-white p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-sm">
            <div>
              <h2 class="text-base font-bold text-slate-900 uppercase">Đề Kiểm Tra Định Kỳ Chuẩn Công Văn 7991</h2>
              <div class="text-xs text-slate-500">Barem khóa chặt 10.0 điểm · Tỉ lệ vàng 40% NB - 30% TH - 30% VD</div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="window.print()" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold">
                Tải file Word chuẩn Bộ GD&ĐT (In / PDF)
              </button>
              <button @click="showMatrix = !showMatrix" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold">
                <span x-text="showMatrix ? 'Xem Tờ Đề Thi' : 'Tải / Xem Ma Trận Đặc Tả'"></span>
              </button>
            </div>
          </div>

          <!-- 2 Columns: Left Matrix Sliders & Counters, Right Live Document -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <!-- Left Matrix Sliders & Counters -->
            <div class="lg:col-span-4 space-y-4">
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-xs uppercase text-slate-800">
                  <span>Thiết Lập Tỉ Lệ Ma Trận</span>
                  <span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px]">Khóa 10.0đ</span>
                </div>

                <div class="space-y-1 text-xs">
                  <div class="flex justify-between">
                    <span class="font-medium">1. Nhận biết:</span>
                    <span class="font-bold text-blue-700" x-text="data.exam.summary.ratio.nb + ' điểm (40%)'"></span>
                  </div>
                  <input type="range" min="1" max="7" step="0.5" x-model="data.exam.summary.ratio.nb" @input="data.exam.summary.ratio.vd = Math.max(0.5, 10 - data.exam.summary.ratio.nb - data.exam.summary.ratio.th)" class="w-full accent-blue-600">
                </div>

                <div class="space-y-1 text-xs">
                  <div class="flex justify-between">
                    <span class="font-medium">2. Thông hiểu:</span>
                    <span class="font-bold text-amber-700" x-text="data.exam.summary.ratio.th + ' điểm (30%)'"></span>
                  </div>
                  <input type="range" min="0.5" max="5" step="0.5" x-model="data.exam.summary.ratio.th" @input="data.exam.summary.ratio.vd = Math.max(0.5, 10 - data.exam.summary.ratio.nb - data.exam.summary.ratio.th)" class="w-full accent-amber-500">
                </div>

                <div class="p-2 bg-purple-50 rounded border border-purple-100 text-xs flex justify-between">
                  <span class="font-medium text-purple-900">3. Vận dụng:</span>
                  <span class="font-bold text-purple-700" x-text="data.exam.summary.ratio.vd + ' điểm (30%)'"></span>
                </div>
              </div>

              <!-- Question counters -->
              <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2 text-xs">
                <div class="font-bold text-xs uppercase text-slate-800 pb-2 border-b border-slate-100">
                  Bộ Đếm Số Lượng Câu Hỏi
                </div>
                <div class="flex justify-between p-2 bg-slate-50 rounded">
                  <span>Phần I (Nhiều LC):</span>
                  <b class="text-blue-700" x-text="data.exam.partI.length + ' câu (3.0đ)'"></b>
                </div>
                <div class="flex justify-between p-2 bg-emerald-50 rounded">
                  <span class="text-emerald-950 font-medium">Phần II (Đúng / Sai 4 ý):</span>
                  <b class="text-emerald-800" x-text="data.exam.partII.length + ' câu (2.0đ)'"></b>
                </div>
                <div class="flex justify-between p-2 bg-slate-50 rounded">
                  <span>Phần III (Trả lời ngắn):</span>
                  <b class="text-indigo-700" x-text="data.exam.partIII.length + ' câu (2.0đ)'"></b>
                </div>
                <div class="flex justify-between p-2 bg-slate-50 rounded">
                  <span>Phần IV (Tự luận):</span>
                  <b class="text-purple-700" x-text="data.exam.partIV.length + ' câu (3.0đ)'"></b>
                </div>
              </div>
            </div>

            <!-- Right Live Document -->
            <div class="lg:col-span-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div class="text-center pb-4 border-b border-slate-200">
                <div class="text-xs font-bold uppercase text-slate-800" x-text="data.exam.header.schoolName"></div>
                <h2 class="text-lg font-extrabold uppercase text-slate-900 mt-1" x-text="data.exam.header.examTitle"></h2>
                <div class="text-xs text-slate-500 mt-0.5">Thời gian làm bài: 90 phút | Barem tổng: 10.0 điểm</div>
              </div>

              <!-- PHẦN I -->
              <div>
                <h3 class="font-bold text-xs text-slate-900 uppercase">PHẦN I. TRẮC NGHIỆM NHIỀU PHƯƠNG ÁN LỰA CHỌN (3.0 Điểm)</h3>
                <div class="mt-2 space-y-3">
                  <template x-for="q in data.exam.partI" :key="q.id">
                    <div class="p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                      <div class="font-semibold text-slate-900" x-text="'Câu ' + q.number + ': ' + q.content"></div>
                      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                        <template x-for="opt in q.options" :key="opt.key">
                          <div class="p-1.5 rounded border border-slate-200 bg-white" :class="opt.key === q.correctAnswer ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-900' : ''">
                            <span x-text="opt.key + '. ' + opt.text"></span>
                          </div>
                        </template>
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <!-- PHẦN II (ĐÚNG / SAI 4 LỆNH a-b-c-d) -->
              <div>
                <h3 class="font-bold text-xs text-slate-900 uppercase">PHẦN II. TRẮC NGHIỆM ĐÚNG SAI (2.0 Điểm - 4 Lệnh a, b, c, d)</h3>
                <div class="mt-2 space-y-4">
                  <template x-for="q in data.exam.partII" :key="q.id">
                    <div class="border border-slate-200 rounded-xl overflow-hidden text-xs">
                      <div class="bg-slate-50 p-3 font-semibold text-slate-900 border-b border-slate-200" x-text="'Câu ' + q.number + ' (1.0đ): ' + q.stem"></div>
                      <table class="w-full border-collapse">
                        <thead class="bg-slate-100 text-slate-700">
                          <tr>
                            <th class="p-2 w-12 text-center border">Lệnh</th>
                            <th class="p-2 text-left border">Mệnh đề khẳng định</th>
                            <th class="p-2 w-28 text-center border">Badge Đ/S</th>
                          </tr>
                        </thead>
                        <tbody>
                          <template x-for="stmt in q.statements" :key="stmt.key">
                            <tr class="border-b">
                              <td class="p-2 text-center font-bold border" x-text="stmt.key + ')'"></td>
                              <td class="p-2 border" x-text="stmt.text"></td>
                              <td class="p-2 text-center border">
                                <span class="px-2 py-0.5 rounded text-white font-bold text-[10px]" :class="stmt.isCorrect ? 'bg-emerald-600' : 'bg-rose-600'" x-text="stmt.isCorrect ? 'ĐÚNG' : 'SAI'"></span>
                              </td>
                            </tr>
                          </template>
                        </tbody>
                      </table>
                    </div>
                  </template>
                </div>
              </div>

              <!-- PHẦN III -->
              <div>
                <h3 class="font-bold text-xs text-slate-900 uppercase">PHẦN III. TRẢ LỜI NGẮN (2.0 Điểm)</h3>
                <div class="mt-2 space-y-2">
                  <template x-for="q in data.exam.partIII" :key="q.id">
                    <div class="p-3 bg-slate-50 rounded border border-slate-200 text-xs flex justify-between items-center">
                      <div>
                        <span class="font-bold text-slate-900" x-text="'Câu ' + q.number + ': '"></span>
                        <span x-text="q.content"></span>
                      </div>
                      <span class="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded shrink-0 ml-4" x-text="'Đáp số: ' + q.correctAnswer + (q.unit ? ' ' + q.unit : '')"></span>
                    </div>
                  </template>
                </div>
              </div>

              <!-- PHẦN IV -->
              <div>
                <h3 class="font-bold text-xs text-slate-900 uppercase">PHẦN IV. TỰ LUẬN (3.0 Điểm KÈM BAREM CHẤM TỪNG BƯỚC)</h3>
                <div class="mt-2 space-y-3">
                  <template x-for="q in data.exam.partIV" :key="q.id">
                    <div class="border border-slate-200 rounded p-3 text-xs bg-slate-50">
                      <div class="font-bold text-slate-900 mb-1" x-text="'Câu ' + q.number + ' (' + q.totalScore + 'đ)'"></div>
                      <div class="whitespace-pre-line text-slate-700" x-text="q.content"></div>
                      <div class="mt-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                        <b>Barem phân bước:</b> Bước 1 (+0.5đ) · Bước 2 (+0.5đ) · Bước 3 (+0.25đ) · Kết luận (+0.25đ)
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>

  <!-- FULLSCREEN PRESENTATION MODAL THEO YÊU CẦU SCOPE 3 -->
  <template x-if="isFullscreen">
    <div 
      class="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col justify-between p-6 select-none"
      @keydown.window.escape="isFullscreen = false"
      @keydown.window.arrow-right="currentSlideIdx = Math.min(data.slides.length - 1, currentSlideIdx + 1)"
      @keydown.window.arrow-left="currentSlideIdx = Math.max(0, currentSlideIdx - 1)"
    >
      <!-- Top presentation bar -->
      <div class="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
        <div class="flex items-center gap-3">
          <span class="bg-blue-600 text-white font-bold px-3 py-1 rounded text-sm" x-text="'Slide ' + (currentSlideIdx + 1) + ' / ' + data.slides.length"></span>
          <span class="bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold" x-text="data.slides[currentSlideIdx]?.phase"></span>
          <span class="text-slate-400 text-xs truncate max-w-md" x-text="data.khbd.header.lessonTitle"></span>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-xs text-slate-400">Điều hướng: Phím <b>← / →</b> | Thoát: <b>Esc</b></span>
          <button @click="isFullscreen = false" class="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg text-xs">
            ✕ Thoát Toàn Màn Hình
          </button>
        </div>
      </div>

      <!-- Slide Main 16:9 Presentation Canvas -->
      <div class="max-w-5xl w-full mx-auto my-auto p-10 bg-slate-900/90 rounded-2xl border-2 border-slate-800 shadow-2xl space-y-6">
        <div class="flex items-center justify-between border-b border-slate-800 pb-4">
          <span class="text-sm font-bold uppercase tracking-wider text-blue-400" x-text="data.slides[currentSlideIdx]?.phase + ' · CHUẨN SƯ PHẠM 5512'"></span>
          <span class="text-xs font-mono bg-slate-800 px-3 py-1 rounded text-slate-300" x-text="'Thời gian: ' + (data.slides[currentSlideIdx]?.timerMinutes || 3) + ' phút'"></span>
        </div>

        <h1 class="text-3xl md:text-4xl font-extrabold text-white tracking-tight" x-text="data.slides[currentSlideIdx]?.title"></h1>

        <ul class="space-y-4 text-lg md:text-xl text-slate-200 pl-2">
          <template x-for="b in data.slides[currentSlideIdx]?.bulletPoints" :key="b">
            <li class="flex items-start gap-3">
              <span class="text-blue-500 font-bold shrink-0">•</span>
              <span x-text="b"></span>
            </li>
          </template>
        </ul>

        <template x-if="data.slides[currentSlideIdx]?.highlightBox">
          <div class="p-4 bg-slate-800 rounded-xl border-l-4 border-blue-500">
            <div class="font-bold text-blue-400 text-sm uppercase tracking-wider" x-text="data.slides[currentSlideIdx]?.highlightBox.title"></div>
            <div class="text-slate-200 mt-1 text-base font-medium" x-text="data.slides[currentSlideIdx]?.highlightBox.content"></div>
          </div>
        </template>
      </div>

      <!-- Bottom controls -->
      <div class="flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
        <button 
          @click="currentSlideIdx = Math.max(0, currentSlideIdx - 1)" 
          :disabled="currentSlideIdx === 0" 
          class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white font-bold"
        >
          ← Slide Trước
        </button>

        <div class="text-slate-400 text-xs italic" x-text="'Ghi chú GV: ' + (data.slides[currentSlideIdx]?.teacherNotes || 'GV hướng dẫn và quan sát học sinh tích cực tham gia.')"></div>

        <button 
          @click="currentSlideIdx = Math.min(data.slides.length - 1, currentSlideIdx + 1)" 
          :disabled="currentSlideIdx === data.slides.length - 1" 
          class="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white font-bold"
        >
          Slide Tiếp Theo →
        </button>
      </div>
    </div>
  </template>

  <!-- SETTINGS MODAL TRONG SINGLE FILE HTML -->
  <template x-if="isSettingsOpen">
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div class="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 text-xs">
        <div class="flex items-center justify-between border-b pb-3">
          <h2 class="font-bold text-sm text-slate-900 uppercase">Cài Đặt Hồ Sơ Giáo Viên & Đơn Vị</h2>
          <button @click="isSettingsOpen = false" class="text-slate-400 hover:text-slate-700 font-bold">✕</button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="block font-semibold mb-1 text-slate-700">Họ và tên Giáo viên:</label>
            <input type="text" x-model="data.teacherProfile.fullName" class="w-full p-2 bg-slate-50 border rounded font-medium">
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-700">Môn học:</label>
            <input type="text" x-model="data.teacherProfile.subject" class="w-full p-2 bg-slate-50 border rounded font-medium">
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-700">Trường học / Đơn vị:</label>
            <input type="text" x-model="data.teacherProfile.schoolName" class="w-full p-2 bg-slate-50 border rounded font-medium">
          </div>
          <div>
            <label class="block font-semibold mb-1 text-slate-700">Tổ chuyên môn:</label>
            <input type="text" x-model="data.teacherProfile.departmentName" class="w-full p-2 bg-slate-50 border rounded font-medium">
          </div>
        </div>
        <div class="pt-3 border-t flex justify-end gap-2">
          <button @click="isSettingsOpen = false" class="px-4 py-2 bg-slate-100 text-slate-700 rounded font-semibold">Đóng</button>
          <button @click="data.khbd.header.teacherName = data.teacherProfile.fullName; data.khbd.header.schoolName = data.teacherProfile.schoolName; data.khbd.header.departmentName = data.teacherProfile.departmentName; data.khbd.header.subjectName = data.teacherProfile.subject; isSettingsOpen = false; alert('Đã lưu cài đặt hồ sơ!')" class="px-4 py-2 bg-blue-600 text-white rounded font-bold">Lưu Cài Đặt</button>
        </div>
      </div>
    </div>
  </template>

  <script>
    function edtechApp() {
      return {
        currentSubsystem: 'upload',
        currentSlideIdx: 0,
        isFullscreen: false,
        isSettingsOpen: false,
        showMatrix: false,
        data: ${jsonEncoded},
        convertToSlides() {
          const newSlides = [
            {
              id: 'slide-cover',
              slideNumber: 1,
              title: this.data.khbd.header.lessonTitle,
              phase: 'Khởi động',
              bulletPoints: [
                'Môn học: ' + this.data.khbd.header.subjectName + ' - ' + this.data.khbd.header.grade,
                'Bộ sách: ' + (this.data.khbd.header.textbook || 'Kết Nối Tri Thức'),
                'Thời lượng: ' + this.data.khbd.header.durationPeriods + ' tiết · Giáo viên: ' + this.data.khbd.header.teacherName
              ],
              highlightBox: {
                type: 'definition',
                title: 'Mục tiêu trọng tâm',
                content: (this.data.khbd.generalObjectives && this.data.khbd.generalObjectives.knowledge && this.data.khbd.generalObjectives.knowledge[0]) ? this.data.khbd.generalObjectives.knowledge[0] : 'Nắm vững kiến thức trọng tâm của bài học.'
              },
              teacherNotes: 'Chiếu slide mở đầu và giới thiệu mục tiêu bài học trong 2 phút.',
              timerMinutes: 2
            },
            ...this.data.khbd.activities.map((act, idx) => ({
              id: 'slide-act-' + act.id,
              slideNumber: idx + 2,
              title: act.title,
              phase: act.number === 1 ? 'Khởi động' : act.number === 2 ? 'Kiến thức mới' : act.number === 3 ? 'Luyện tập' : 'Vận dụng',
              bulletPoints: [
                'Mục tiêu: ' + act.objectives,
                'Nội dung: ' + act.content,
                'Sản phẩm: ' + act.product
              ],
              highlightBox: {
                type: act.number === 2 ? 'formula' : act.number === 3 ? 'task' : 'definition',
                title: act.number === 2 ? 'Khắc sâu kiến thức trọng tâm' : act.number === 3 ? 'Thử thách luyện tập' : 'Nhiệm vụ hoạt động',
                content: (act.steps && act.steps[0] && act.steps[0].teacherAction) ? act.steps[0].teacherAction : act.content
              },
              teacherNotes: 'Hoạt động ' + act.number + ': ' + ((act.steps && act.steps[0] && act.steps[0].teacherAction) ? act.steps[0].teacherAction : '') + '. GV hỗ trợ HS thảo luận.',
              timerMinutes: parseInt(act.timeEstimate) || 5
            }))
          ];
          this.data.slides = newSlides;
          this.currentSlideIdx = 0;
          this.currentSubsystem = 'slide';
        },
        copyJson() {
          navigator.clipboard.writeText(JSON.stringify(this.data, null, 2));
          alert('Đã sao chép toàn bộ JSON State vào bộ nhớ tạm!');
        }
      }
    }
  </script>
</body>
</html>`;
}

export function exportSingleFileHtml(state: AppState) {
  const html = exportSingleFileHtmlString(state);
  downloadFile(html, `EdTech_Offline_SingleFile_${state.khbd.header.subjectName}.html`, 'text/html;charset=utf-8');
}
