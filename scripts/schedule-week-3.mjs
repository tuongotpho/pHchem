import { postMessage } from './fanpage-manager.mjs';

const POSTS_WEEK_3 = [
  // 1. Thứ Hai (14/09/2026 19:45): Cân bằng phương trình đại số phân số
  {
    day: 'Thứ Hai (14/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-14T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `⚡ [MÁY TÍNH HÓA HỌC — BÀI 1] CÂN BẰNG PHƯƠNG TRÌNH PHỨC TẠP BẰNG ĐẠI SỐ PHÂN SỐ CHÍNH XÁC 100% ⚗️

Bạn từng mất hàng chục phút để "mò" hệ số cân bằng của các phản ứng oxi hóa - khử phức tạp như:
Fe3O4 + HNO3 -> Fe(NO3)3 + NO + H2O hay KMnO4 + HCl -> KCl + MnCl2 + Cl2 + H2O?

🧠 Tại sao Máy tính pH-Chem không bao giờ cân bằng sai?
* Khác với các công cụ dùng AI đoán mò hệ số (dễ bị sai số hoặc không bảo toàn nguyên tố), pH-Chem sử dụng thuật toán đại số phân số ma trận (Gaussian Elimination).
* Thiết lập hệ phương trình bảo toàn cho từng nguyên tố và giải ra hệ số nguyên tối giản chính xác tuyệt đối trong 0.01 giây!

👉 Thử nhập bất kỳ phương trình khó nào vào máy cân bằng tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #CanBangPhuongTrinh #MayTinhHoaHoc #OxiHoaKhu #GiaiToanHoa #HoaHoc10`,
  },

  // 2. Thứ Ba (15/09/2026 11:45): Bài toán Chất hết / Chất dư
  {
    day: 'Thứ Ba (15/09/2026 11:45)',
    time: Math.floor(new Date('2026-09-15T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `🤯 [MÁY TÍNH HÓA HỌC — BÀI 2] BÍ QUYẾT TÍNH CHẤT HẾT / CHẤT DƯ TRONG 3 GIÂY KHÔNG CẦN KẺ BẢNG 3 DÒNG 📝

Dạng bài toán: "Cho a gam chất A tác dụng với b mol chất B. Tính lượng chất C sinh ra và lượng chất dư sau phản ứng?"

❌ Cách truyền thống:
1. Đổi hết ra số mol.
2. Lập tỉ lệ n/hệ_số để so sánh xem chất nào nhỏ hơn (chất hết).
3. Lập bảng 3 dòng: Ban đầu - Phản ứng - Còn lại.

✨ Cách thông minh với pH-Chem:
1️⃣ Mở tab "Tính theo PT".
2️⃣ Gõ phương trình và điền số liệu người ta cho (chấp nhận cả gam, mol, lít khí).
3️⃣ Hệ thống tự động so sánh tỉ lượng, chỉ rõ chất hết trước, số mol chất dư và khối lượng sản phẩm kèm kiểm tra bảo toàn khối lượng tức thì!

👉 Trải nghiệm tính theo phương trình tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #ChatHetChatDu #GiaiNhanhHoaHoc #MayTinhHoa #HocHoaOnline #HoaHoc8 #HoaHoc9`,
  },

  // 3. Thứ Tư (16/09/2026 19:45): Chuyển đổi đơn vị vạn năng
  {
    day: 'Thứ Tư (16/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-16T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `🔄 [MÁY TÍNH HÓA HỌC — BÀI 3] "CẦU NỐI VẠN NĂNG" GIỮA MOL ↔ KHỐI LƯỢNG ↔ THỂ TÍCH KHÍ ↔ NỒNG ĐỘ 📊

Trong Hóa học, Mol (n) chính là "ngã tư trung tâm" kết nối mọi đại lượng vật lý:

📐 4 Công thức chuyển đổi cốt lõi:
1. n = m / M (Khối lượng ↔ Mol)
2. n = V / 22.4 (hoặc V / 24.79 theo chuẩn mới ở 25°C, 1 bar) (Thể tích khí ↔ Mol)
3. n = CM × Vdd (Nồng độ mol ↔ Mol)
4. C% = (mct / mdd) × 100% (Nồng độ phần trăm)

💡 Trên pH-Chem, bạn chỉ cần chọn đại lượng đã biết, máy sẽ tự động tính ra tất cả các đại lượng còn lại mà không cần nhớ công thức biến đổi!

👉 Dùng thử công cụ đổi đơn vị nhanh tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #ChuyenDoiDonVi #CongThucHoaHoc #TinhSoMol #NongDoMol #HoaHoc`,
  },

  // 4. Thứ Năm (17/09/2026 19:45): Pha loãng dung dịch C1V1 = C2V2
  {
    day: 'Thứ Năm (17/09/2026 19:45)',
    time: Math.floor(new Date('2026-09-17T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `💧 [MÁY TÍNH HÓA HỌC — BÀI 4] CÔNG THỨC PHA LOÃNG DUNG DỊCH C₁V₁ = C₂V₂ VÀ ỨNG DỤNG PHÒNG THÍ NGHIỆM 🧪

"Cần bao nhiêu ml dung dịch HCl 2M để pha thành 500 ml dung dịch HCl 0.5M?"

🎯 Nguyên tắc pha loãng:
Khi thêm nước cất vào một dung dịch, lượng dung môi tăng lên nhưng tổng số mol chất tan không đổi!
=> C1 × V1 = C2 × V2

🛠️ Hỗ trợ pha chế trong phòng thí nghiệm:
* Tab "Pha loãng" trên pH-Chem cho phép bạn nhập 3 thông số bất kỳ trong bộ (C1, V1, C2, V2) ➔ Máy sẽ tự động tính đại lượng còn lại và chỉ rõ lượng nước cất cần thêm vào (Vnuoc = V2 - V1).

👉 Tính toán pha chế dung dịch chuẩn xác tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #PhaLoangDungDich #ThiNghiemHoaHoc #HoaHoc8 #HoaHoc11 #PhongThiNghiem`,
  },

  // 5. Thứ Sáu (18/09/2026 11:45): Muối ngậm nước Hydrate
  {
    day: 'Thứ Sáu (18/09/2026 11:45)',
    time: Math.floor(new Date('2026-09-18T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `💎 [MÁY TÍNH HÓA HỌC — BÀI 5] MUỐI NGẬM NƯỚC (HYDRATE): TÍNH M VÀ % KHỐI LƯỢNG SAO CHO CHUẨN? 🧊

Khi gặp các công thức như phèn chua KAl(SO4)2.12H2O, thạch cao sống CaSO4.2H2O, hay đồng sunfat ngậm nước CuSO4.5H2O:

⚠️ Bẫy thường gặp của học sinh:
Nhiều bạn nhầm dấu chấm "." là dấu nhân nên nhân toàn bộ khối lượng với nhau!
Thực tế: Dấu chấm biểu thị phân tử chất ngậm các phân tử nước trong mạng tinh thể.
M(CuSO4.5H2O) = M(CuSO4) + 5 × M(H2O) = 159.6 + 90 = 249.6 g/mol.

✨ Máy tính pH-Chem hỗ trợ đọc trực tiếp cú pháp muối ngậm nước, tính đúng khối lượng mol và phân tích chi tiết % khối lượng từng nguyên tố!

👉 Tra cứu khối lượng mol chính xác tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #MuoiNgamNuoc #Hydrate #KhoiLuongMol #HoaHoc10 #MeoHocHoa`,
  },

  // 6. Thứ Bảy (19/09/2026 14:30): Hiệu suất phản ứng H%
  {
    day: 'Thứ Bảy (19/09/2026 14:30)',
    time: Math.floor(new Date('2026-09-19T14:30:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `📈 [MÁY TÍNH HÓA HỌC — BÀI 6] BÍ KÍP XỬ LÝ BÀI TOÁN HIỆU SUẤT PHẢN ỨNG (H%) KHÔNG BAO GIỜ BỊ NGƯỢC 🚀

Bài toán hiệu suất là câu hỏi phân loại quen thuộc trong các kỳ thi:
* Khi nào nhân hiệu suất (mtt = mlt × H%)?
* Khi nào chia hiệu suất (mtt = mlt / H%)?

🔑 Bí quyết nhớ mẹo 1 câu: "Tính Thuận thì Nhân — Tính Nghịch thì Chia"
* Đi từ Chất tham gia ➔ Sản phẩm (Tính thuận): NHÂN H% (Vì thực tế sản phẩm sinh ra luôn ít hơn lý thuyết!).
* Đi từ Sản phẩm ➔ Chất tham gia cần dùng (Tính nghịch): CHIA H% (Vì thực tế cần lấy nhiều nguyên liệu hơn để bù hao hụt!).

👉 Tính toán lý thuyết chuẩn xác cùng pH-Chem tại:
🔗 https://ph-chem.web.app/calculator

#pHChem #HieuSuatPhanUng #MeoGiaiHoa #ThiTHPTQG #HoaHoc11 #HoaHoc12`,
  },

  // 7. Chủ Nhật (20/09/2026 20:00): Thử thách giải phương trình cuối tuần
  {
    day: 'Chủ Nhật (20/09/2026 20:00)',
    time: Math.floor(new Date('2026-09-20T20:00:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/calculator',
    message: `🏆 [THỬ THÁCH CUỐI TUẦN] — BẠN CÂN BẰNG PHƯƠNG TRÌNH NÀY TRONG BAO LÂU? ⏱️

Cùng thử tài cân bằng một phản ứng oxi hóa - khử kinh điển của Hóa vô cơ:

❓ Hãy tìm các hệ số nguyên tối giản (a, b, c, d, e):
a Fe3O4 + b HNO3 -> c Fe(NO3)3 + d NO + e H2O

Tổng hệ số (a + b + c + d + e) bằng bao nhiêu?
A. 55
B. 46
C. 62
D. 38

👇 Comment ngay đáp án của bạn bên dưới!
💡 Muốn kiểm tra đáp án ngay lập tức? Nhập phương trình vào máy tính pH-Chem:
🔗 https://ph-chem.web.app/calculator

#pHChem #ThuThachCuoiTuan #CanBangHoaHoc #DoVuiHoaHoc #MayTinhHoa #HoaHoc10`,
  },
];

export async function scheduleWeek3() {
  console.log('🚀 ĐANG LÊN LỊCH TUẦN 3 (CHUYÊN SÂU MÁY TÍNH HÓA HỌC & PHƯƠNG TRÌNH)...\n');
  for (let i = 0; i < POSTS_WEEK_3.length; i++) {
    const p = POSTS_WEEK_3[i];
    console.log(`⏳ Đang lên lịch Bài ${i + 1} (${p.day})...`);
    const res = await postMessage({
      message: p.message,
      link: p.link,
      published: false,
      scheduledPublishTime: p.time,
    });
    console.log(`✅ Thành công Bài ${i + 1}! ID: ${res.id}\n`);
  }
  console.log('🎉 ĐÃ LÊN LỊCH THÀNH CÔNG TOÀN BỘ TUẦN 3!');
}

if (process.argv[1]?.endsWith('schedule-week-3.mjs')) {
  scheduleWeek3().catch(console.error);
}
