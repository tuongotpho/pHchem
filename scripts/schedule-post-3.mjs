import { postMessage } from './fanpage-manager.mjs';

async function schedulePost3() {
  console.log('⏳ Đang tiến hành đặt lịch Bài 3 cho Fanpage Ph-Chem...\n');

  // Bài 3: Thứ Tư 02/09/2026 lúc 20:00 (+07:00)
  const timeThu4 = Math.floor(new Date('2026-09-02T20:00:00+07:00').getTime() / 1000);
  const msgThu4 = `🌌 [BẠN CÓ BIẾT?] — VÌ SAO NHIỆT ĐỘ NÓNG CHẢY CỦA RADIUM ĐẾN NAY VẪN GÂY TRANH CÃI?

Hầu hết chúng ta đều quen với việc mở Bảng tuần hoàn ra là thấy ngay các con số nhiệt độ nóng chảy, nhiệt độ sôi được ghi rành rọt. Nhưng bạn có biết:

🌡️ Radium (Ra - nguyên tố số 88) là một trong những trường hợp hiếm hoi mà giới khoa học quốc tế đến nay vẫn chưa ngã ngũ:
* Một số nghiên cứu uy tín đo được nhiệt độ nóng chảy là 700 °C.
* Nhưng tài liệu khác lại cho ra kết quả 960 °C.

🧪 Nguyên tắc dữ liệu tại pH-Chem:
Thay vì "chọn đại" một con số để điền cho đẹp bảng, pH-Chem chọn cách trung thực với khoa học:
* Số liệu nào chưa thống nhất sẽ được đánh dấu rõ "đang tranh cãi" ngay cạnh con số.
* Các nguyên tố siêu nặng chưa đo được sẽ để dấu gạch ngang, tuyệt đối không ghi số dự đoán.
* Toàn bộ 118 nguyên tố đều được đối chiếu chéo tự động với cơ sở dữ liệu IUPAC và PubChem (Viện Y tế Quốc gia Mỹ).

👉 Mở ngay Bảng tuần hoàn 118 nguyên tố chuẩn quốc tế để khám phá thêm lịch sử phát hiện, cấu hình electron và ứng dụng thực tế của từng nguyên tố:
🔗 https://ph-chem.web.app/table

---
#pHChem #BangTuanHoan #KienThucHoaHoc #Radium #HoaHoc10 #KhoaHocMoiNgay`;

  const res = await postMessage({
    message: msgThu4,
    link: 'https://ph-chem.web.app/table',
    published: false,
    scheduledPublishTime: timeThu4,
  });

  console.log('✅ ĐÃ LÊN LỊCH BÀI 3 THÀNH CÔNG!');
  console.log(`📌 Post ID: ${res.id}`);
  console.log(`⏰ Thời gian phát hành tự động: 20:00 — Thứ Tư (02/09/2026)`);
}

schedulePost3().catch((err) => {
  console.error('❌ Lỗi khi đặt lịch Bài 3:', err.message);
  process.exit(1);
});
