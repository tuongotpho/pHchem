import path from 'node:path';
import fs from 'node:fs';
import { postVideo } from './fanpage-manager.mjs';

export const TABLE_POST = {
  title: '118 NGUYÊN TỐ HÓA HỌC — BẠN ĐÃ THỰC SỰ HIỂU HẾT CHƯA? 🔬⚡',
  caption: `Bạn vẫn đang phải học vẹt từng thông số trong bảng tuần hoàn giấy truyền thống? 🤯

Đã đến lúc nâng cấp phương pháp học Hóa với Bảng Tuần Hoàn Tương Tác 4.0 tại pH-Chem:

🌟 TẠI SAO BẠN NÊN TRẢI NGHIỆM BẢNG TUẦN HOÀN TẠI pH-Chem?
🔹 118 nguyên tố đầy đủ, bố cục trực quan với chế độ Dark Mode hiện đại bảo vệ mắt.
🔹 Phân loại màu sắc thông minh theo từng nhóm: Kim loại kiềm, kiềm thổ, kim loại chuyển tiếp, phi kim, halogen và khí hiếm.
🔹 Dữ liệu chuẩn xác tuyệt đối từ IUPAC & PubChem: Nhiệt độ nóng chảy, nhiệt độ sôi, độ âm điện Pauling, cấu hình electron, năm phát hiện và trạng thái ở 25°C.
🔹 Khám phá 208 sự thật hóa học kỳ thú gắn liền với các nguyên tố quen thuộc trong đời sống.

📱 Chạy trực tiếp trên trình duyệt điện thoại và máy tính, cài đặt được như ứng dụng và hoạt động mượt mà ngay cả khi Offline!

👉 Trải nghiệm ngay tại website chính thức:
🌐 https://ph-chem.web.app/table
(Trang chủ: https://ph-chem.web.app/)

---
#pHChem #BangTuanHoan #PeriodicTable #NguyenToHoaHoc #HoaHoc10 #IUPAC #PubChem #HocHoaOnline #CongCuHocTap`
};

async function main() {
  const videoPath = path.resolve('promo/phchem_periodic_table_video.mp4');
  if (!fs.existsSync(videoPath)) {
    console.error('❌ Không tìm thấy file video:', videoPath);
    console.log('👉 Hãy chạy `npm run gen:table-video` trước.');
    process.exit(1);
  }

  console.log('🎬 Chuẩn bị đăng video Bảng tuần hoàn lên Fanpage pH-Chem...');
  console.log(`📁 File video: ${videoPath}`);
  console.log(`📝 Tiêu đề: ${TABLE_POST.title}\n`);

  try {
    const res = await postVideo({
      title: TABLE_POST.title,
      description: TABLE_POST.caption,
      videoPath,
      published: true
    });

    console.log('🎉 ĐĂNG VIDEO BẢNG TUẦN HOÀN THÀNH CÔNG!');
    console.log(`🆔 Video ID: ${res.id}`);
    console.log(`🔗 Link xem: https://www.facebook.com/${res.id}`);
  } catch (err) {
    console.error('❌ Lỗi khi đăng video:', err.message);
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith('post-table-video.mjs')) {
  main();
}
