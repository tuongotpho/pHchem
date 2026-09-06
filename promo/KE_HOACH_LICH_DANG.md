# Kế hoạch lịch đăng fanpage pH-Chem

*Sinh tự động bằng `node scripts/fanpage-xep-lich.mjs` — cập nhật 6/9/2026.*
*Muốn đổi cách xếp thì sửa mảng `LAN` trong chính script đó rồi chạy lại.*

## Nguyên tắc

Mỗi khung giờ **luôn là một loạt nội dung cố định**, ngày nào cũng vậy, để người
xem quen nhịp như xem lịch phát sóng truyền hình.

**Nhịp mong muốn là 2-3 bài mỗi ngày.** Lý do bằng số: tính tới
6/9/2026, trang có **1 người theo dõi**, 19 bài đã đăng
được tổng cộng **22 lượt tim, 0 bình luận, 0 chia sẻ**, 8 video được **13 lượt xem**.
Kho có gần 300 video nhưng mỗi video chỉ đăng được một lần. Đăng dày là đốt sạch
kho trong hơn tháng rưỡi để đổi lấy vài trăm lượt xem; đăng thưa thì kho chạy
được hơn ba tháng, giữ nội dung lại cho lúc trang thật sự có người xem.

### Vì sao hiện tại vẫn là 4.14 bài/ngày

**Facebook không cho hẹn quá 30 ngày.** Mọi mốc xa hơn bị từ chối với lỗi
`(#100) The specified scheduled publish time is invalid`.

Tại thời điểm xếp lại, hàng chờ có **120 bài** tồn từ trước, mà cửa sổ chỉ
có 29 ngày. 120 chia 29 ra 4.14 — đó là nhịp **thấp nhất có thể**,
không phải nhịp được chọn. Muốn thưa hơn thì phải xoá bớt bài khỏi hàng chờ,
mà xoá là mất luôn video đã tải lên, tháng sau phải tải lại từ đầu.

**Quyết định ngày 6/9/2026: chấp nhận nhịp này, tháng sau tính tiếp.**

### Điều quan trọng cho lần sau

Giới hạn 30 ngày **chỉ gây khó khi phải xếp lại một đống tồn**. Với việc thêm
bài mới thì nó không cản gì cả: mỗi ngày cửa sổ trôi thêm một ngày, nên cứ
**thêm 2-3 bài vào rìa xa nhất của cửa sổ mỗi ngày** là giữ được nhịp mong muốn
mãi mãi.

Nói cách khác: đừng bao giờ đổ cả trăm bài vào hàng chờ một lúc nữa. Nhỏ giọt
theo ngày thì nhịp muốn bao nhiêu cũng được.

## Lịch phát sóng

| Khung giờ | Loạt nội dung | Ngày trong tuần |
|---|---|---|
| 11:45 | Chuyện lạ hoá học | CN, T2, T3, T4, T5, T6, T7 |
| 17:30 | Chuyện lạ (khung phụ) | CN, T2, T3, T4, T5, T6, T7 |
| 19:45 | Hồ sơ nguyên tố | CN, T2, T3, T4, T5, T6, T7 |
| 08:00 | Nguyên tố (khung phụ) | CN, T2, T3, T4, T5, T6, T7 |
| 20:45 | Bài giảng theo chuỗi | CN, T2, T3, T4, T5, T6, T7 |

Trung bình **4.14 bài/ngày**.

## Hiện trạng lịch

| Làn | Số bài đang có | Chạy hết vào |
|---|---:|---|
| Chuyện lạ hoá học | 29 | 5/10/2026 |
| Chuyện lạ (khung phụ) | 28 | 4/10/2026 |
| Hồ sơ nguyên tố | 29 | 5/10/2026 |
| Nguyên tố (khung phụ) | 12 | 18/9/2026 |
| Bài giảng theo chuỗi | 22 | 28/9/2026 |

Tổng 120 bài, trải 29 ngày kể từ 2026-09-07.

## Cách phân loại bài vào làn

Script đọc nội dung bài rồi tự xếp làn:

| Làn | Nhận ra bằng |
|---|---|
| Chuyện lạ hoá học | có thẻ `#BanCoBiet` hoặc `#DoVui` |
| Hồ sơ nguyên tố | mở đầu bằng `HỒ SƠ NGUYÊN TỐ #` |
| Bài giảng theo chuỗi | có `[BẢNG TUẦN HOÀN`, `[MÁY TÍNH HÓA HỌC`, `[MÁY TÍNH pH` hoặc `[TÍNH NĂNG` |

Bài không khớp làn nào thì rơi vào làn bài giảng. Thứ tự trong từng làn giữ
nguyên theo lịch cũ, nên các chuỗi đánh số **BÀI 1 → BÀI 5** không bị đảo.

## Lần sau muốn xếp lại thì làm gì

```bash
node scripts/fanpage-tinhhinh.mjs        # xem đang hẹn bao nhiêu bài, khung nào
node scripts/fanpage-xep-lich.mjs        # xem kế hoạch mới, chưa đụng gì
node scripts/fanpage-xep-lich.mjs lam    # thực hiện đổi giờ
node scripts/fanpage-hieu-qua.mjs        # đo tim, bình luận, chia sẻ, lượt xem
```

Muốn đổi khung giờ hay tần suất thì sửa mảng `LAN` ở đầu
`scripts/fanpage-xep-lich.mjs`, không cần sửa chỗ nào khác.

## Việc tháng sau

Hàng chờ cạn dần: làn nguyên tố phụ hết 18/9/2026,
làn bài giảng hết 28/9/2026,
hai làn còn lại hết đầu tháng 10. Từ đó trở đi lịch trống, và đó chính là lúc
chuyển sang nhịp 2-3 bài/ngày mà không phải xoá gì.

**Cách làm, theo đúng thứ tự:**

1. Chạy `node scripts/fanpage-tinhhinh.mjs` xem còn bao nhiêu bài trong hàng chờ.
2. Chạy `node scripts/fanpage-hieu-qua.mjs` xem tim, bình luận, chia sẻ. Lúc đó
   cỡ mẫu đã đủ lớn để biết khung giờ nào thật sự hiệu quả — hiện mỗi khung mới
   có 1-7 bài, chênh nhau 0-2 tim, chưa kết luận được gì.
3. Bỏ bớt làn phụ (`cl2` khung 17:30 và `nt2` khung 08:00) khỏi mảng `LAN`,
   giữ lại ba làn chính. Nhịp tự động về khoảng 2-3 bài/ngày.
4. Thêm video kiểu mới vào **nhỏ giọt theo ngày**, mỗi ngày 2-3 bài ở rìa cửa sổ,
   đừng đổ cả trăm bài một lúc như lần này.

**Kho chưa dùng: 151 video 1080p** — 58 hồ sơ nguyên tố, 56 chuyện lạ,
20 an toàn hoá chất, 17 lịch sử hoá học. Mỗi video cần một lời bài đăng riêng
trước khi tải lên; tải lên là thao tác nặng nên chia thành nhiều đợt.

Khi làn nào sắp cạn thì bổ sung đúng loạt tương ứng vào làn đó, đừng dồn hết
vào một khung — cả điểm mạnh của lịch phát sóng nằm ở chỗ người xem quen giờ.
