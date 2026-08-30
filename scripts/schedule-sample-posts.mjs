import { postMessage } from './fanpage-manager.mjs';

async function schedulePosts() {
  console.log('📅 Bắt đầu đặt lịch 2 bài viết đầu tiên cho Fanpage Ph-Chem...\n');

  // Bài 1: Thứ Hai 31/08/2026 lúc 19:30 (+07:00)
  const timeThu2 = Math.floor(new Date('2026-08-31T19:30:00+07:00').getTime() / 1000);
  const msgThu2 = `⚗️ [KHỞI ĐỘNG ĐẦU TUẦN] — BẠN CÓ GIẢI ĐƯỢC CÂU NÀY TRONG 30 GIÂY?

❓ Cho mẩu Na vào dung dịch CuSO₄, hiện tượng quan sát được là gì?
A. Có kết tủa màu đỏ Cu xuất hiện.
B. Có khí thoát ra và xuất hiện kết tủa xanh lam Cu(OH)₂.
C. Dung dịch mất màu xanh và có kim loại bám vào.
D. Không có hiện tượng gì.

👇 Comment đáp án của bạn bên dưới xem ai nhanh nhất nhé!
💡 Muốn luyện thêm 500+ câu trắc nghiệm chia theo chuyên đề, có đồng hồ bấm giờ và xuất phiếu điểm PNG xịn sò?
👉 Vào ngay: https://ph-chem.web.app/quiz

#pHChem #KiemTraHoaHoc #TracNghiemHoa #ThuThachDauTuan`;

  console.log('⏳ Đang lên lịch Bài 1 (Thứ 2, 31/08/2026 19:30)...');
  const res1 = await postMessage({
    message: msgThu2,
    link: 'https://ph-chem.web.app/quiz',
    published: false,
    scheduledPublishTime: timeThu2,
  });
  console.log('✅ Đã lên lịch thành công Bài 1! ID:', res1.id);

  // Bài 2: Thứ Ba 01/09/2026 lúc 11:30 (+07:00)
  const timeThu3 = Math.floor(new Date('2026-09-01T11:30:00+07:00').getTime() / 1000);
  const msgThu3 = `🤯 MẤT BAO LÂU ĐỂ TÍNH CHẤT NÀO DƯ, CHẤT NÀO HẾT TRONG BÀI TOÁN HÓA?

Thầy cô vừa cho đề: "Cho 5,6 gam Fe tác dụng với 200 ml dung dịch HCl 1M. Tính thể tích khí H₂ thu được ở đktc?"

Thay vì phải lập bảng 3 dòng (ban đầu - phản ứng - sau phản ứng) bấm máy tính 5 lần:
1️⃣ Mở tab "Tính theo PT" trên pH-Chem.
2️⃣ Nhập phương trình: Fe + HCl -> FeCl2 + H2
3️⃣ Nhập 5.6 g cho Fe và 0.2 mol cho HCl.

⚡ Kết quả hiện ra tức thì: Máy tự phát hiện HCl hết trước, Fe dư 0,028 mol, và H₂ sinh ra là 2,479 lít (chuẩn mới) / 2,24 lít (chuẩn cũ) kèm bảo toàn khối lượng chính xác 100%!

👉 Thử ngay không cần cài đặt: https://ph-chem.web.app/calculator

#pHChem #MayTinhHoaHoc #GiaiNhanhHoaHoc #HocHoaOnline`;

  console.log('\n⏳ Đang lên lịch Bài 2 (Thứ 3, 01/09/2026 11:30)...');
  const res2 = await postMessage({
    message: msgThu3,
    link: 'https://ph-chem.web.app/calculator',
    published: false,
    scheduledPublishTime: timeThu3,
  });
  console.log('✅ Đã lên lịch thành công Bài 2! ID:', res2.id);

  console.log('\n🎉 TẤT CẢ 2 BÀI ĐÃ ĐƯỢC ĐẶT LỊCH THÀNH CÔNG TRÊN FACEBOOK!');
}

schedulePosts().catch((err) => {
  console.error('❌ Lỗi khi đặt lịch:', err.message);
  process.exit(1);
});
