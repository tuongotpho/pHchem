import path from 'node:path';
import fs from 'node:fs';
import { postVideo } from './fanpage-manager.mjs';

export const PROMO_POST = {
  title: 'HÓA HỌC KHÔNG HỀ KHÓ NẾU BẠN BIẾT ĐẾN BỘ CÔNG CỤ NÀY! 🧪✨',
  caption: `Bạn đang "đau đầu" vì không nhớ nổi công thức cấu tạo dài ngoằng, hay loay hoay mãi không cân bằng được một phương trình oxi hóa - khử phức tạp? 🤯

Đừng để môn Hóa làm bạn nản lòng! Hãy khám phá ngay pH-Chem — nền tảng hóa học chuyên nghiệp, giao diện Dark Mode hiện đại, chạy trực tiếp trên trình duyệt điện thoại và máy tính:

🌟 ĐIỂM NỔI BẬT KHÔNG THỂ BỎ QUA TẠI pH-Chem:
🔹 Thư viện hơn 340+ hợp chất vô cơ, hữu cơ với 274 cấu trúc 2D chuẩn quốc tế IUPAC sắc nét.
🔹 Bộ máy tính tự động cân bằng phản ứng hóa học chỉ trong 1 tích tắc.
🔹 Tính nhanh khối lượng mol, % khối lượng từng nguyên tố, nồng độ và pH dung dịch.
🔹 Bảng tuần hoàn 118 nguyên tố tương tác kèm ma trận độ tan chuẩn xác.
🔹 Phòng luyện đề trắc nghiệm thông minh kèm đồng hồ bấm giờ 30s và phiếu điểm chi tiết!

📱 ĐẶC BIỆT:
Cài đặt trực tiếp như một ứng dụng (PWA) trên màn hình chính và hoạt động mượt mà ngay cả khi không có kết nối Internet!

👉 Trải nghiệm ngay hôm nay tại: https://ph-chem.web.app/
(Lưu lại bài viết hoặc tag ngay "cạ cứng" vào để cùng bứt phá điểm Hóa nhé! ❤️)

---
#pHChem #HoaHoc #HocHoaOnline #CongCuHocTap #BangTuanHoan #CauTrucHoaHoc #IUPAC #OnThiHoa #HoaHoc10 #HoaHoc11 #HoaHoc12`
};

async function main() {
  const videoPath = path.resolve('promo/phchem_promo_video.mp4');
  if (!fs.existsSync(videoPath)) {
    console.error('❌ Không tìm thấy file video:', videoPath);
    console.log('👉 Hãy chạy `npm run gen:video` trước để tạo video.');
    process.exit(1);
  }

  console.log('🎬 Chuẩn bị đăng video lên Fanpage pH-Chem...');
  console.log(`📁 File video: ${videoPath}`);
  console.log(`📝 Tiêu đề: ${PROMO_POST.title}\n`);

  try {
    const res = await postVideo({
      title: PROMO_POST.title,
      description: PROMO_POST.caption,
      videoPath,
      published: true
    });

    console.log('🎉 ĐĂNG VIDEO LÊN FANPAGE THÀNH CÔNG!');
    console.log(`🆔 Video ID: ${res.id}`);
    console.log(`🔗 Link xem: https://www.facebook.com/${res.id}`);
  } catch (err) {
    console.error('❌ Lỗi khi đăng video:', err.message);
    process.exit(1);
  }
}

if (process.argv[1]?.endsWith('post-promo-video.mjs')) {
  main();
}
