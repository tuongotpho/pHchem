import { postMessage } from './fanpage-manager.mjs';

export const POSTS_WEEK_7 = [
  {
    day: 'Thứ Hai (12/10/2026 19:45)',
    time: Math.floor(new Date('2026-10-12T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/formulas',
    message: `🧬 [HÓA HỮU CƠ — BÀI 1] THƯ VIỆN 340+ CHẤT & TIÊU CHUẨN VẼ CẤU TRÚC 2D IUPAC 2008 TỪ RDKit 🎨

Hình công thức cấu tạo phân tử hữu cơ trên pH-Chem không phải là hình vẽ tay mờ nhạt hay ảnh chụp sách giáo khoa cũ:

✨ Công nghệ sinh hình RDKit CoordGen:
1️⃣ Vẽ tự động theo thuật toán CoordGen: Tối ưu góc liên kết 120°, 109.5° chuẩn xác theo hình học phân tử thực tế.
2️⃣ Chuẩn lập thể IUPAC 2008: Thể hiện rõ nét đứt/nét đậm cho các tâm bất đối xứng, đồng phân hình học cis-trans, E-Z.
3️⃣ Xuất SVG siêu nhẹ: Nạp tức thì trên mọi kích thước màn hình mà không làm nặng ứng dụng.

👉 Khám phá thư viện phân tử 2D sắc nét tại:
🔗 https://ph-chem.web.app/formulas

#pHChem #HoaHocHuuCo #CauTrucPhanTu #RDKit #IUPAC #HoaHoc11 #HoaHoc12`,
  },
  {
    day: 'Thứ Ba (13/10/2026 11:45)',
    time: Math.floor(new Date('2026-10-13T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/formulas',
    message: `⚡ [HÓA HỮU CƠ — BÀI 2] BÍ KÍP VIẾT ĐỒNG PHÂN & ĐỌC TÊN THAY THẾ IUPAC CỦA HIĐROCACBON 🎯

Quy tắc 3 bước đọc tên quốc tế (IUPAC) của Ankan, Anken, Ankin:

1. Chọn mạch chính: Mạch cacbon dài nhất và chứa nhiều liên kết bội / nhóm chức nhất.
2. Đánh số mạch chính: Đánh từ đầu gần liên kết bội / gần nhánh hơn sao cho tổng số chỉ vị trí là nhỏ nhất.
3. Ghép tên:
$$\\text{Số chỉ vị trí nhánh - Tên nhánh + Tên mạch chính + Số chỉ vị trí liên kết đôi/ba + Đuôi (an/en/in)}$$

✨ Ví dụ: ` + '`CH3-CH(CH3)-CH=CH2`' + ` ➔ 3-metylbut-1-en.

👉 Tra cứu tên IUPAC của hơn 340 chất tại:
🔗 https://ph-chem.web.app/formulas

#pHChem #DanhPhapIUPAC #DongPhanHuuCo #Hidrocacbon #Ankan #Anken #HoaHoc11`,
  },
  {
    day: 'Thứ Tư (14/10/2026 19:45)',
    time: Math.floor(new Date('2026-10-14T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/formulas',
    message: `🍷 [HÓA HỮU CƠ — BÀI 3] LIÊN KẾT HIĐRO CỦA ANCOL & PHENOL: VÌ SAO NHIỆT ĐỘ SÔI LẠI CAO VƯỢT TRỘI? 🌡️

Vì sao Ancol etylic ($C_2H_5OH, M=46$) là chất lỏng sôi ở 78.3°C, trong khi Đimetyl ete ($CH_3OCH_3, M=46$) lại là chất khí sôi ở -24°C?

🔑 Bí mật nằm ở LIÊN KẾT HIĐRO LIÊN PHÂN TỬ:
* Nhóm $-OH$ phân cực mạnh tạo liên kết hiđro giữa các phân tử ancol với nhau: $\\dots O-H \\dots O-H \\dots$
* Cần cung cấp nhiều nhiệt năng hơn để phá vỡ các liên kết này khi chuyển sang pha khí.
* Ancol cũng tạo liên kết hiđro với nước ➔ Tan vô hạn trong nước!

🧪 Phenol ($C_6H_5OH$): Do vòng benzen hút e mạnh, nguyên tử H trong nhóm -OH linh động hơn ancol ➔ Phenol có tính axit yếu (làm đục nước vôi, tác dụng với NaOH).

👉 Tra cứu cấu trúc Ancol và Phenol tại:
🔗 https://ph-chem.web.app/formulas

#pHChem #LienKetHidro #Ancol #Phenol #NhietDoSoi #HoaHoc11 #HoaHoc12`,
  },
  {
    day: 'Thứ Năm (15/10/2026 19:45)',
    time: Math.floor(new Date('2026-10-15T19:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/formulas',
    message: `🍎 [HÓA HỮU CƠ — BÀI 4] PHẢN ỨNG ESTE HÓA & HƯƠNG THƠM CỦA CÁC LOÀI HOA QUẢ 🍌

Bạn có biết mùi thơm quyến rũ của chuối chín, dứa, táo, hoa nhài... đều đến từ các hợp chất **Este**?

🍌 Hương thơm quen thuộc:
* Isoamyl axetat ($CH_3COOCH_2CH_2CH(CH_3)_2$): Mùi chuối chín.
* Etyl butirat ($C_3H_7COOC_2H_5$): Mùi dứa chín.
* Benzyl axetat ($CH_3COOCH_2C_6H_5$): Mùi hoa nhài.

⚗️ Phản ứng Este hóa (Fischer):
$$RCOOH + R'OH \\overset{H_2SO_4 \\text{ đ}, t^o}{\\rightleftharpoons} RCOOR' + H_2O$$
Phản ứng thuận nghịch hai chiều, dùng $H_2SO_4$ đặc làm chất xúc tác và hút nước để chuyển dịch cân bằng sang phải!

👉 Xem hình cấu trúc phân tử Este 2D tại:
🔗 https://ph-chem.web.app/formulas

#pHChem #PhanUngEsteHoa #Este #MuiHuongHoaQua #HoaHoc12 #OnThiDaiHoc`,
  },
  {
    day: 'Thứ Sáu (16/10/2026 11:45)',
    time: Math.floor(new Date('2026-10-16T11:45:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/formulas',
    message: `🧬 [HÓA HỮU CƠ — BÀI 5] AMINO AXIT, PEPTIT & PROTEIN: NỀN TẢNG CẤU THÀNH NÊN SỰ SỐNG 🌿

Amino axit là hợp chất hữu cơ tạp chức chứa đồng thời nhóm amino ($-NH_2$ tính bazơ) và nhóm cacboxyl ($-COOH$ tính axit):

✨ 5 Amino axit tiêu chuẩn cần nhớ trong SGK:
1. Glyxin (Gly): $H_2N-CH_2-COOH$ (M = 75)
2. Alanin (Ala): $CH_3-CH(NH_2)-COOH$ (M = 89)
3. Valin (Val): $(CH_3)_2CH-CH(NH_2)-COOH$ (M = 117)
4. Axit glutamic (Glu): Axit 2 nhóm -COOH (M = 147, làm đổi màu quỳ tím sang hồng)
5. Lysin (Lys): Bazơ 2 nhóm -NH₂ (M = 146, làm đổi màu quỳ tím sang xanh)

👉 Tra cứu công thức và tính chất amino axit tại:
🔗 https://ph-chem.web.app/formulas

#pHChem #AminoAxit #Peptit #Protein #HoaHoc12 #SinhHoa #LuyenThiTHPTQG`,
  },
  {
    day: 'Thứ Bảy (17/10/2026 14:30)',
    time: Math.floor(new Date('2026-10-17T14:30:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/formulas',
    message: `🍞 [HÓA HỮU CƠ — BÀI 6] VÌ SAO CON NGƯỜI TIÊU HÓA ĐƯỢC TINH BỘT NHƯNG KHÔNG ĂN ĐƯỢC GỖ (XENLULOZƠ)? 🌲

Cả Tinh bột và Xenlulozơ đều có cùng công thức phân tử $(C_6H_{10}O_5)_n$, nhưng vì sao một bên là lương thực nuôi sống nhân loại, một bên lại là thân cây gỗ cứng cáp?

🔑 Bí mật nằm ở LIÊN KẾT GLUCOZIT:
* 🍞 Tinh bột: Gồm các mắt xích $\\alpha$-glucopyranose liên kết với nhau bằng cầu nối $\\alpha-1,4$ và $\\alpha-1,6$-glicozit. Cơ thể người có enzym Amylase để cắt mạch này thành Glucozơ cung cấp năng lượng.
* 🌲 Xenlulozơ: Gồm các mắt xích $\\beta$-glucopyranose liên kết bằng cầu nối $\\beta-1,4$-glicozit tạo mạch thẳng kéo dài. Cơ thể người không có enzym Cellulase để thủy phân liên kết $\\beta$ này!

✨ pH-Chem đã tách biệt rõ ràng cấu trúc của Tinh bột và Xenlulozơ theo chuẩn mã InChI đối chứng!

👉 Xem chi tiết cấu trúc Polime tại:
🔗 https://ph-chem.web.app/formulas

#pHChem #TinhBot #Xenlulozo #Polime #Cacbohidrat #HoaHoc12 #KienThucKhoaHoc`,
  },
  {
    day: 'Chủ Nhật (18/10/2026 20:00)',
    time: Math.floor(new Date('2026-10-18T20:00:00+07:00').getTime() / 1000),
    link: 'https://ph-chem.web.app/quiz',
    message: `🏆 [THỬ THÁCH CUỐI TUẦN] — BẠN ĐOÁN ĐƯỢC TÊN ESTE NÀY KHÔNG? 🎯

Một bài toán xác định công thức este kinh điển:

❓ Este X có công thức phân tử $C_4H_8O_2$. Khi thủy phân X trong dung dịch NaOH, thu được muối Natri axetat ($CH_3COONa$) và ancol Y.
Tên gọi của X là gì?
A. Etyl fomat
B. Metyl propionat
C. Etyl axetat
D. Propyl fomat

👇 Comment ngay đáp án của bạn bên dưới nhé!
💡 Kiểm tra ngay kiến thức Hóa hữu cơ với 10 câu trắc nghiệm trên pH-Chem:
🔗 https://ph-chem.web.app/quiz

#pHChem #MinigameHoaHoc #Este #DongPhanEste #ThuThachCuoiTuan #HoaHoc12`,
  },
];

export async function scheduleWeek7() {
  console.log('🚀 ĐANG LÊN LỊCH TUẦN 7 (CHUYÊN SÂU HÓA HỮU CƠ & CẤU TRÚC 2D IUPAC)...\n');
  for (let i = 0; i < POSTS_WEEK_7.length; i++) {
    const p = POSTS_WEEK_7[i];
    console.log(`⏳ Đang lên lịch Bài ${i + 1} (${p.day})...`);
    const res = await postMessage({
      message: p.message,
      link: p.link,
      published: false,
      scheduledPublishTime: p.time,
    });
    console.log(`✅ Thành công Bài ${i + 1}! ID: ${res.id}\n`);
  }
  console.log('🎉 ĐÃ LÊN LỊCH THÀNH CÔNG TOÀN BỘ TUẦN 7!');
}

if (process.argv[1]?.endsWith('schedule-week-7.mjs')) {
  scheduleWeek7().catch(console.error);
}
