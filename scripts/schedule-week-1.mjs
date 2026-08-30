import { postMessage } from './fanpage-manager.mjs';

const POSTS = [
  // 1. Thứ Hai: Bảng tuần hoàn 118 nguyên tố
  {
    day: 'Thứ Hai (31/08/2026 19:45)',
    time: Math.floor(new Date('2026-08-31T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/table',
    message: `🔬 [TÍNH NĂNG 1] — BẢNG TUẦN HOÀN 118 NGUYÊN TỐ TƯƠNG TÁC CHUẨN QUỐC TẾ ⚗️

Bạn muốn tra cứu nhanh thông số của một nguyên tố mà không cần lật từng trang sách giáo khoa?

✨ Bảng tuần hoàn trên pH-Chem mang đến trải nghiệm tra cứu trực quan và đầy đủ nhất:
1️⃣ Đầy đủ 118 nguyên tố: Phân loại theo kim loại kiềm, kiềm thổ, halogen, khí hiếm, phi kim, kim loại chuyển tiếp...
2️⃣ Thông số nhiệt động chuẩn xác: Nhiệt độ nóng chảy, nhiệt độ sôi, khối lượng riêng, độ âm điện được đối chiếu với IUPAC & PubChem.
3️⃣ Chi tiết từng nguyên tố: Cấu hình electron, số oxi hóa, năm phát hiện, ứng dụng đời sống và các mẩu sự thật thú vị liên quan.
4️⃣ Chạy 100% Offline: Mất mạng vẫn mở tra cứu mượt mà ngay trên điện thoại hoặc máy tính!

👉 Trải nghiệm Bảng tuần hoàn tương tác ngay tại:
🔗 https://ph-chem.web.app/table

#pHChem #BangTuanHoan #NguyenToHoaHoc #HoaHoc10 #HocHoaOnline #KienThucHoaHoc #Chemistry`,
  },

  // 2. Thứ Ba: Máy tính Hóa học & Giải toán theo phương trình
  {
    day: 'Thứ Ba (01/09/2026 11:45)',
    time: Math.floor(new Date('2026-09-01T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `⚡ [TÍNH NĂNG 2] — MÁY TÍNH HÓA HỌC: CÂN BẰNG & TÍNH CHẤT HẾT / CHẤT DƯ TRONG 3 GIÂY 🤯

Gặp bài toán tính theo phương trình phản ứng, bạn mất bao lâu để lập bảng và bấm máy tính?

📱 Với Máy tính Hóa học của pH-Chem, mọi phép toán trở nên đơn giản hơn bao giờ hết:
1️⃣ Cân bằng phương trình tự động: Giải bằng thuật toán đại số phân số chính xác tuyệt đối, không sai số làm tròn.
2️⃣ Tính theo phương trình phản ứng: Nhập lượng của các chất tham gia ➔ Máy tự động phát hiện chất nào hết trước, chất nào dư bao nhiêu mol/gam, và tính chính xác lượng sản phẩm tạo thành.
3️⃣ Đổi đơn vị đa năng: Chuyển đổi qua lại giữa mol ↔ khối lượng (gam) ↔ thể tích khí (lít) ↔ nồng độ.
4️⃣ Pha loãng dung dịch: Tính toán nhanh theo công thức C₁V₁ = C₂V₂.

👉 Dùng thử ngay công cụ giải toán hóa học thông minh:
🔗 https://ph-chem.web.app/calculator

#pHChem #MayTinhHoaHoc #CanBangPhuongTrinh #GiaiToanHoa #HoaHoc #HocHoaMoiNgay #HoaHoc10 #HoaHoc11`,
  },

  // 3. Thứ Tư: Máy tính pH & Nồng độ dung dịch
  {
    day: 'Thứ Tư (02/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-02T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `🧪 [TÍNH NĂNG 3] — MÁY TÍNH pH CHUẨN XÁC DÀNH CHO DUNG DỊCH AXIT & BAZƠ 💧

Tính pH của dung dịch axit mạnh thì dễ, nhưng khi gặp axit yếu với hằng số phân ly Ka hoặc dung dịch nồng độ cực loãng thì làm sao để không bị nhầm lẫn?

🎯 Tab "Tính pH" trên pH-Chem được lập trình để giải quyết triệt để:
1️⃣ Đầy đủ các nồng độ: Tính toán chuẩn xác cho axit mạnh (HCl, HNO₃, H₂SO₄...), bazơ mạnh (NaOH, Ba(OH)₂...) và các axit/bazơ yếu.
2️⃣ Hiển thị toàn diện: Trả về đồng thời pH, pOH, nồng độ [H⁺] và [OH⁻].
3️⃣ Giải đúng phương trình cân bằng: Áp dụng phương pháp giải tích chính xác ngay cả ở nồng độ cực loãng ($10^{-7}$ M) mà không bị "lừa" thành môi trường bazơ!

👉 Tính nhanh pH của mọi dung dịch tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #TinhpH #AxitBazo #NongDoDungDich #HoaHoc11 #LuyenThiTHPTQG #HocHoaOnline`,
  },

  // 4. Thứ Năm: Dãy điện hóa kim loại
  {
    day: 'Thứ Năm (03/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-03T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/electro',
    message: `🔋 [TÍNH NĂNG 4] — DÃY ĐIỆN HÓA KIM LOẠI: TRA CỨU NHANH QUY TẮC ALPHA (α) ⚡

"Kim loại này có đẩy được kim loại kia ra khỏi muối không?" — Câu hỏi kinh điển xuất hiện trong mọi đề thi Hóa học!

🛡️ Không cần ngồi thuộc lòng bảng chữ dài dằng dặc, công cụ Dãy điện hóa trên pH-Chem giúp bạn:
1️⃣ Tra cứu 21 cặp oxi hóa - khử chuẩn: Xếp theo thứ tự tính oxi hóa tăng dần và tính khử giảm dần.
2️⃣ Thế điện cực chuẩn $E^0$: Hiển thị rõ giá trị Volt của từng cặp.
3️⃣ Bộ kiểm tra tương tác tự động: Bạn chỉ cần chọn kim loại A và muối B ➔ Hệ thống tự động phân tích theo quy tắc Alpha và báo ngay phản ứng có xảy ra hay không!

👉 Tra cứu Dãy điện hóa chuẩn xác ngay tại:
🔗 https://ph-chem.web.app/electro

#pHChem #DayDienHoa #OxiHoaKhu #LuyenThiTHPTQG #HoaHoc12 #OnThiDaiHoc #KimLoai`,
  },

  // 5. Thứ Sáu: Ma trận độ tan & Phản ứng có hiện tượng
  {
    day: 'Thứ Sáu (04/09/2026 11:45)',
    time: Math.floor(new Date('2026-09-04T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/solubility',
    message: `💧 [TÍNH NĂNG 5] — BẢNG TÍNH TAN & KHO 224+ PHẢN ỨNG CÓ HIỆN TƯỢNG RÕ RÀNG 🔍

Nhận biết chất và viết phương trình ion rút gọn là nỗi ám ảnh của không ít bạn học sinh.

✨ Hãy để pH-Chem hỗ trợ bạn với 2 công cụ trực quan:
1️⃣ Ma trận độ tan thông minh: 14 Cation × 8 Anion. Bấm vào bất kỳ ô nào để xem công thức chất tạo thành ghép đúng quy tắc hóa trị và trạng thái tan / không tan / ít tan / bị thủy phân.
2️⃣ Kho 224+ phản ứng có mô tả hiện tượng: Tra cứu phản ứng kèm điều kiện nhiệt độ/xúc tác, hiện tượng thực tế (kết tủa xanh lam, kết tủa trắng keo tan trong kiềm dư, khí mùi hắc...) và phương trình ion rút gọn.

👉 Khám phá Bảng độ tan và Phản ứng hóa học tại:
🔗 https://ph-chem.web.app/solubility

#pHChem #BangTinhTan #DoTanHoaHoc #NhanBietChat #PhanUngHoaHoc #HoaHocTHCS #HoaHoc11`,
  },

  // 6. Thứ Bảy: Thư viện 340+ chất & 274 cấu trúc 2D IUPAC
  {
    day: 'Thứ Bảy (05/09/2026 14:30)',
    time: Math.floor(new Date('2026-09-05T14:30:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/formulas',
    message: `🧬 [TÍNH NĂNG 6] — THƯ VIỆN 340+ HỢP CHẤT & 274 HÌNH CẤU TRÚC 2D CHUẨN IUPAC 🎨

Bạn đang tìm kiếm hình công thức cấu tạo phân tử Hóa hữu cơ chuẩn mực, sắc nét để học tập và giảng dạy?

🌟 Thư viện công thức của pH-Chem có gì đặc biệt:
1️⃣ 274 hình cấu tạo phân tử 2D chuẩn IUPAC 2008: Được sinh bằng thuật toán RDKit chuyên dụng, chuẩn từng góc liên kết và đồng phân lập thể.
2️⃣ Phân loại khoa học: Chia rõ theo Ankan, Anken, Ankin, Ancol, Phenol, Anđehit, Axit cacboxylic, Este, Amino Axit, Polime...
3️⃣ Tra cứu song ngữ: Đầy đủ tên tiếng Việt, tên IUPAC quốc tế, khối lượng mol và công thức phân tử.

👉 Chiêm ngưỡng thư viện cấu trúc phân tử 2D tại:
🔗 https://ph-chem.web.app/formulas

#pHChem #HoaHocHuuCo #CongThucCauTao #DanhPhapIUPAC #HoaHoc12 #CauTrucPhanTu #RDKit`,
  },

  // 7. Chủ Nhật: Luyện tập & Ngân hàng đề giáo viên
  {
    day: 'Chủ Nhật (06/09/2026 20:00)',
    time: Math.floor(new Date('2026-09-06T20:00:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/quiz',
    message: `🎯 [TÍNH NĂNG 7] — PHÒNG LUYỆN ĐỀ TRẮC NGHIỆM & XUẤT PHIẾU ĐIỂM XỊN SÒ 🏆

Ôn thi Hóa học hiệu quả nhất chính là làm bài tập thực chiến mỗi ngày!

🚀 Phòng Luyện tập trên pH-Chem mang đến trải nghiệm làm bài trọn vẹn:
1️⃣ Hai nguồn đề phong phú: Đề tự tạo thông minh theo 6 dạng bài (cân bằng, đoán sản phẩm, phân lớp chất, đọc tên IUPAC...) và Ngân hàng đề thi chuẩn của Giáo viên.
2️⃣ Đồng hồ áp lực 30 giây/câu: Rèn luyện phản xạ tính toán nhanh như khi thi thật.
3️⃣ Xuất Phiếu kết quả PNG: Làm bài xong hệ thống chấm điểm tức thì, tạo ảnh phiếu điểm đẹp mắt để bạn lưu về thư viện ảnh hoặc chia sẻ khoe bạn bè qua Zalo/Facebook!

👉 Vào thử sức ngay một bài test 10 câu tại:
🔗 https://ph-chem.web.app/quiz

#pHChem #TracNghiemHoa #LuyenThiTHPT #DeThiHoa #KiemTraHoa #GiaoVienHoa #OnThiDaiHoc`,
  },
];

async function scheduleAll() {
  console.log('🚀 BẮT ĐẦU LÊN LỊCH TOÀN BỘ 7 BÀI VIẾT TÍNH NĂNG CHO TUẦN 1...\n');

  for (let i = 0; i < POSTS.length; i++) {
    const p = POSTS[i];
    console.log(`⏳ Đang lên lịch Bài ${i + 1} (${p.day})...`);
    const res = await postMessage({
      message: p.message,
      link: p.link,
      published: false,
      scheduledPublishTime: p.time,
    });
    console.log(`✅ Thành công Bài ${i + 1}! ID: ${res.id}\n`);
  }

  console.log('🎉 TẤT CẢ 7 BÀI VIẾT ĐÃ ĐƯỢC LÊN LỊCH THÀNH CÔNG TRÊN FANPAGE PH-CHEM!');
}

scheduleAll().catch((err) => {
  console.error('❌ Lỗi:', err.message);
  process.exit(1);
});
