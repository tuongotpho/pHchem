import path from 'node:path';
import fs from 'node:fs';
import { postVideo } from './fanpage-manager.mjs';

// Kế hoạch đăng 7 ngày (mỗi ngày 1 clip vào khung giờ vàng 19:45)
// Tính mốc từ Thứ 6, 04/09/2026 đến Thứ 5, 10/09/2026
export const CAMPAIGN_VIDEOS = [
  {
    day: 1,
    dateStr: 'Thứ 6, 04/09/2026 - 14:17 (ĐÃ ĐĂNG TRỰC TIẾP)',
    videoFile: 'phchem_periodic_table_video.mp4',
    title: '118 NGUYÊN TỐ HÓA HỌC — BẠN ĐÃ THỰC SỰ HIỂU HẾT CHƯA? 🔬⚡',
    status: 'LIVE_DONE',
    fbId: '2006675583378400',
    link: 'https://www.facebook.com/2006675583378400'
  },
  {
    day: 2,
    dateStr: 'Thứ 7, 05/09/2026 - 19:45',
    scheduleIso: '2026-09-05T19:45:00+07:00',
    videoFile: 'phchem_calculator_video.mp4',
    title: 'SIÊU MÁY TÍNH HÓA HỌC: CÂN BẰNG PHƯƠNG TRÌNH & TÍNH pH SIÊU TỐC ⚡🧪',
    caption: `Cân bằng phương trình hóa học dài dằng dặc hay tính toán nồng độ, pH dung dịch làm bạn mất quá nhiều thời gian? 🤯

Đừng để bài tập Hóa làm bạn đau đầu! Đã có Siêu Máy Tính Hóa Học tại pH-Chem giải quyết chỉ trong 1 giây:

🌟 CÁC TÍNH NĂNG TÍNH TOÁN TOÀN NĂNG:
⚖️ Tự động cân bằng mọi phương trình vô cơ, hữu cơ và phản ứng oxi hóa - khử phức tạp.
📊 Tính khối lượng mol và phân tích phần trăm khối lượng (%m) từng nguyên tố.
💧 Tính pH dung dịch axit, bazo, chất đệm và tính thể tích nước cần pha loãng.
🔄 Chuyển đổi siêu tốc: Mol ↔ Khối lượng (gam) ↔ Thể tích khí ở đktc (lít) ↔ Nồng độ mol (CM, C%).

📱 Cài đặt trực tiếp như App PWA trên điện thoại & máy tính, sử dụng mượt mà không cần mạng Internet!

👉 Trải nghiệm ngay tại website chính thức:
🌐 https://ph-chem.web.app/calculator
(Trang chủ: https://ph-chem.web.app/)

---
#pHChem #MayTinhHoaHoc #CanBangPhuongTrinh #TinhpH #HoaHoc10 #HoaHoc11 #HoaHoc12 #HocHoaOnline #CongCuHocTap`
  },
  {
    day: 3,
    dateStr: 'Chủ Nhật, 06/09/2026 - 19:45',
    scheduleIso: '2026-09-06T19:45:00+07:00',
    videoFile: 'phchem_quiz_video.mp4',
    title: 'THỬ THÁCH 30 GIÂY: PHÒNG LUYỆN ĐỀ TRẮC NGHIỆM HÓA HỌC THỰC CHIẾN 🎯⏱️',
    caption: `Bạn muốn kiểm tra xem kiến thức Hóa của mình đang ở mức độ nào? Thử thách ngay tại Phòng Luyện Đề Thông Minh của pH-Chem!

🌟 TẠI SAO PHẢI LUYỆN ĐỀ TẠI pH-Chem?
⏱️ Đồng hồ đếm ngược 30 giây/câu: Rèn luyện áp lực phòng thi và phản xạ tư duy nhanh nhạy.
📚 Ngân hàng đề thi chuẩn từ Giáo viên: Đầy đủ chuyên đề Sự điện li, Cân bằng hóa học, Hợp chất Nitrogen...
🤖 Bộ đề sinh bởi AI: Xáo trộn câu hỏi thông minh, không bao giờ lo trùng đề.
📸 Xuất phiếu kết quả: Tự động tổng kết số câu đúng/sai, thang điểm 10 và lưu thành ảnh đẹp mắt để khoe bạn bè!

📱 Hoàn toàn miễn phí, không quảng cáo, học mọi lúc mọi nơi!

👉 Bấm giờ làm bài ngay tại website chính thức:
🌐 https://ph-chem.web.app/quiz
(Trang chủ: https://ph-chem.web.app/)

---
#pHChem #LuyenDeHoa #TracNghiemHoaHoc #DeThiHoa #OnThiTHPTQG #HoaHoc10 #HoaHoc11 #HoaHoc12`
  },
  {
    day: 4,
    dateStr: 'Thứ 2, 07/09/2026 - 19:45',
    scheduleIso: '2026-09-07T19:45:00+07:00',
    videoFile: 'phchem_electro_video.mp4',
    title: 'BÍ KÍP QUY TẮC ALPHA & DÃY ĐIỆN HÓA KIM LOẠI — KHÔNG BAO GIỜ NHẦM LẪN 🔋⚡',
    caption: `Làm sao để biết kim loại nào đẩy được kim loại nào ra khỏi dung dịch muối? Fe tác dụng với Cu²⁺ hay Ag⁺ trước? 🤯

Chỉ cần nắm vững Dãy Điện Hóa Kim Loại và Quy Tắc Alpha trực quan tại pH-Chem:

🌟 ĐIỂM SÁNG TRÊN CÔNG CỤ DÃY ĐIỆN HÓA pH-Chem:
⚡ Thứ tự thế điện cực chuẩn E°: Sắp xếp chuẩn xác từ kim loại kiềm có tính khử mạnh nhất đến ion kim loại quý có tính oxi hóa mạnh nhất.
🔄 Mô phỏng Quy tắc Alpha trực quan: Xác định chiều phản ứng oxi hóa - khử tự phát cực kỳ dễ nhớ.
💡 Giải quyết dứt điểm các bài toán kim loại tác dụng với hỗn hợp muối trong đề thi trắc nghiệm!

📱 Hoạt động mượt mà trên trình duyệt, không cần tải app nặng máy.

👉 Tra cứu ngay tại website chính thức:
🌐 https://ph-chem.web.app/electro
(Trang chủ: https://ph-chem.web.app/)

---
#pHChem #DayDienHoa #QuyTacAlpha #KimLoai #OxiHoaKhu #HoaHoc12 #OnThiDaiHoc #HocHoaOnline`
  },
  {
    day: 5,
    dateStr: 'Thứ 3, 08/09/2026 - 19:45',
    scheduleIso: '2026-09-08T19:45:00+07:00',
    videoFile: 'phchem_solubility_video.mp4',
    title: 'BẢNG ĐỘ TAN THÔNG MINH: NHẬN BIẾT MỌI KẾT TỦA CHỈ TRONG 1 CHẠM 💧🔍',
    caption: `BaSO₄, AgCl kết tủa màu gì? Muối nào tan, muối nào không tan? 🤯

Đừng mang theo bảng giấy rách mép nữa! Bảng Độ Tan Tương Tác 4.0 trên pH-Chem sẽ giúp bạn tra cứu siêu tốc:

🌟 ĐẶC ĐIỂM VƯỢT TRỘI CỦA BẢNG ĐỘ TAN pH-Chem:
🟢 Ma trận 14 cation × 8 anion trực quan: Phân biệt rõ ràng Chất Tan (T), Ít Tan (I), Không Tan (K) và Bị Phân Hủy (-).
🧪 Ghép công thức tự động: Chạm vào cation và anion để tự động tạo công thức đúng hóa trị và xem hiện tượng tạo thành.
🎨 Nhận biết màu sắc kết tủa thực tế: Hỗ trợ đắc lực cho các bài tập nhận biết hóa học vô cơ.

👉 Trải nghiệm ngay tại website chính thức:
🌐 https://ph-chem.web.app/solubility
(Trang chủ: https://ph-chem.web.app/)

---
#pHChem #BangDoTan #KetTua #NhanBietChat #HoaHocVoCo #HoaHoc11 #HoaHoc9 #HocHoaOnline`
  },
  {
    day: 6,
    dateStr: 'Thứ 4, 09/09/2026 - 19:45',
    scheduleIso: '2026-09-09T19:45:00+07:00',
    videoFile: 'phchem_formulas_video.mp4',
    title: '340+ HỢP CHẤT & THƯ VIỆN CẤU TRÚC 2D CHUẨN QUỐC TẾ IUPAC 🧬✨',
    caption: `Học Hóa hữu cơ mà không nhìn thấy cấu trúc liên kết không gian thì làm sao hiểu được bản chất phản ứng? 🤯

Khám phá ngay Thư Viện Công Thức Hóa Học Đỉnh Cao trên pH-Chem:

🌟 THƯ VIỆN HÓA HỌC TOÀN DIỆN:
🔹 340+ hợp chất vô cơ, hữu cơ và hóa lý phong phú.
🔹 274 cấu trúc 2D chuẩn quốc tế IUPAC được sinh bằng thuật toán RDKit cực kỳ sắc nét.
🔹 Đầy đủ công thức phân tử, danh pháp IUPAC, tên thông thường và mã SMILES chuẩn khoa học.
🔹 Đồ họa Vector SVG nhẹ nhàng, phóng to không vỡ nét trên mọi thiết bị.

👉 Khám phá kho cấu trúc tại website chính thức:
🌐 https://ph-chem.web.app/formulas
(Trang chủ: https://ph-chem.web.app/)

---
#pHChem #CauTruc2D #IUPAC #RDKit #HoaHuuCo #CongThucHoaHoc #HoaHoc11 #HoaHoc12`
  },
  {
    day: 7,
    dateStr: 'Thứ 5, 10/09/2026 - 19:45',
    scheduleIso: '2026-09-10T19:45:00+07:00',
    videoFile: 'phchem_reactions_video.mp4',
    title: 'KHO HIỆN TƯỢNG PHẢN ỨNG THỰC TẾ & 208 SỰ THẬT HÓA HỌC KỲ THÚ 🌈🔬',
    caption: `Hóa học không chỉ là những phương trình khô khan trên trang giấy, mà là cả một thế giới biến đổi kỳ diệu trong đời sống! ✨

Khám phá ngay Kho Phản Ứng & Sự Thật Khoa Học tại pH-Chem:

🌟 ĐIỂM KHÁC BIỆT TẠI pH-Chem:
🌈 Mô tả hiện tượng thực nghiệm chi tiết: Màu sắc dung dịch, hiện tượng kết tủa, khí thoát ra, điều kiện nhiệt độ và xúc tác.
✨ 208 sự thật hóa học kỳ thú: Khám phá tại sao ớt lại cay, tại sao máu có màu đỏ, hay bí mật về những nguyên tố đắt nhất hành tinh.
📖 Từ điển 211 thuật ngữ song ngữ Việt - Anh giúp bạn tự tin đọc tài liệu quốc tế.

👉 Trải nghiệm ngay tại website chính thức:
🌐 https://ph-chem.web.app/reactions
(Từ điển: https://ph-chem.web.app/dictionary | Sự thật: https://ph-chem.web.app/facts)

---
#pHChem #HienTuongHoaHoc #PhanUngHoaHoc #SuThatKyThu #TuDienHoaHoc #YeuHoaHoc #HocHoaOnline`
  }
];

async function main() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log('================================================================');
  console.log('📅 KẾ HOẠCH PHÁT HÀNH CHIẾN DỊCH VIDEO 7 NGÀY CHO FANPAGE pH-Chem');
  console.log('🌐 Tất cả video đều sử dụng domain chuẩn: https://ph-chem.web.app/');
  console.log('================================================================\n');

  for (const item of CAMPAIGN_VIDEOS) {
    console.log(`[Ngày ${item.day}] ${item.dateStr}`);
    console.log(`• Tiêu đề: ${item.title}`);
    console.log(`• File:    ${item.videoFile}`);

    if (item.status === 'LIVE_DONE') {
      console.log(`• Trạng thái: ✅ ĐÃ ĐĂNG TRỰC TIẾP (${item.link})\n`);
      continue;
    }

    const videoPath = path.resolve('promo', item.videoFile);
    if (!fs.existsSync(videoPath)) {
      console.log(`• Trạng thái: ⏳ Đang tạo file video...\n`);
      continue;
    }

    const publishTimestamp = Math.floor(new Date(item.scheduleIso).getTime() / 1000);
    console.log(`• Timestamp: ${publishTimestamp} (${item.scheduleIso})`);

    if (isDryRun) {
      console.log(`• Trạng thái: 🔍 [DRY-RUN] Sẵn sàng lên lịch đăng lúc 19:45\n`);
      continue;
    }

    try {
      console.log(`• Đang gửi yêu cầu lên lịch tới Facebook Graph API...`);
      const res = await postVideo({
        title: item.title,
        description: item.caption,
        videoPath,
        scheduledPublishTime: publishTimestamp
      });
      console.log(`• Kết quả: 🎉 LÊN LỊCH THÀNH CÔNG! Video ID: ${res.id}\n`);
    } catch (err) {
      console.error(`• Kết quả: ❌ Lỗi lên lịch: ${err.message}\n`);
    }
  }

  console.log('✨ Hoàn tất kiểm tra và điều phối kế hoạch phát hành!');
}

if (process.argv[1]?.endsWith('schedule-video-campaign.mjs')) {
  main();
}
