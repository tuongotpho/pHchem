# Đăng TikTok cho pH-Chem — hồ sơ đăng ký và cách dùng

Cập nhật: 06/09/2026

Mục tiêu: xin quyền **Direct Post** (`video.publish`) để đăng thẳng video lên hồ sơ
TikTok của pH-Chem, không phải đẩy vào nháp rồi bấm tay từng cái.

---

## 1. Đã xây những gì

| Tệp | Việc |
|---|---|
| `scripts/tiktok-manager.mjs` | Lớp gọi API: OAuth PKCE, làm mới token, `creator_info`, khởi tạo đăng, đẩy file, tra trạng thái |
| `scripts/tiktok-bang.mjs` | Máy chủ nhỏ chạy tại `127.0.0.1:3721`, phục vụ bảng điều khiển |
| `scripts/tiktok-bang.html` | Bảng điều khiển — màn hình người vận hành thao tác |
| `public/tiktok-callback.html` | Trang trung gian trên tên miền đã xác minh, nhận mã rồi chuyển về máy |

Lệnh:

```bash
npm run tiktok:bang
```

```bash
npm run tiktok:ai
```

`tiktok:bang` mở bảng điều khiển. `tiktok:ai` xem đang nối vào tài khoản nào.
`npm run tiktok:kho` đếm video trong kho (hiện **281** video).

Token lưu ở `.tiktok-token.json` ngay trong thư mục dự án, **đã cho vào `.gitignore`**,
không lên GitHub.

---

## 2. Cần điền vào `.env.local`

```
TIKTOK_CLIENT_KEY=<Client key ở trang quản lý ứng dụng TikTok>
TIKTOK_CLIENT_SECRET=<Client secret>
TIKTOK_REDIRECT_URI=https://ph-chem.web.app/tiktok-callback.html
TIKTOK_SCOPE=user.info.basic,video.publish
TIKTOK_PORT=3721
```

Đường dẫn quay về phải khai **y hệt** trong mục *Redirect URI* của ứng dụng TikTok,
không thừa dấu `/`.

---

## 3. Các chốt chặn theo quy định của TikTok — đã làm và đã đo

TikTok bắt buộc màn hình đăng phải có đủ những thứ dưới. Cột cuối là kết quả tự đo
trên trình duyệt ngày 06/09/2026 (dùng dữ liệu `creator_info` giả lập để thử logic,
vì lúc đo chưa có Client key thật).

| Quy định | Cách làm | Đo được |
|---|---|---|
| Gọi `creator_info` trước khi hiện màn hình soạn | Bảng gọi ngay khi mở, chưa có kết quả thì chưa hiện bước 2–6 | ✅ |
| Hiện tên tài khoản sẽ đăng lên | Hiện avatar, nickname, `@username`, quyền đang có | ✅ |
| Chế độ hiển thị **không được chọn sẵn** | Ô đầu tiên là "— Chưa chọn —" | ✅ |
| Danh sách chế độ lấy từ `privacy_level_options` | Đổ đúng danh sách API trả về | ✅ |
| Nút Đăng khoá tới khi chọn xong | Chọn video + chọn chế độ mới mở khoá | ✅ |
| Tương tác bị tài khoản khoá thì không bật được | `duet_disabled=true` → ô Duet mờ, không tích được, có chú thích | ✅ |
| Công bố nội dung thương mại | Bật lên hiện 2 mục: thương hiệu của tôi / nội dung trả phí | ✅ |
| Bật công bố mà chưa chọn loại thì chặn | Hiện lỗi đỏ, khoá nút Đăng | ✅ |
| Nội dung trả phí không được để "Chỉ mình tôi" | Mục SELF_ONLY bị khoá, nếu đang chọn thì tự bỏ chọn | ✅ |
| Hiện nhãn sẽ gắn lên video | "Hợp tác trả phí" / "Nội dung quảng bá" | ✅ |
| Câu cam kết Music Usage Confirmation | Luôn hiện; có nội dung trả phí thì thêm Branded Content Policy | ✅ |
| Theo dõi kết quả sau khi đăng | Hỏi `status/fetch` 3 giây một lần tới khi `PUBLISH_COMPLETE` | ⚠ chưa chạy thật |

**Chỗ chưa kiểm được:** toàn bộ đường đi thật với TikTok (đăng nhập, đổi mã lấy token,
`creator_info` thật, đẩy file, đăng xong) **chưa chạy lần nào**, vì chưa có Client key.
Phải có key rồi chạy thử một lần mới dám nói là xong.

---

## 4. Nội dung điền vào ô "Explain how each product and scope works"

Chép nguyên khối dưới đây. Viết tiếng Anh vì người duyệt đọc tiếng Anh.

```
ABOUT pH-CHEM

pH-Chem (https://ph-chem.web.app) is a free, ad-free chemistry study tool for
Vietnamese high-school students and teachers. It provides an interactive periodic
table covering all 118 elements, a molar-mass and pH calculator, a chemical
equation balancer, a solubility table, an electrochemical series, 274 IUPAC
molecular structures, a chemistry glossary and a quiz bank. It runs entirely in
the browser, works offline as a Progressive Web App, requires no account, and
collects no personal data from its users.

Alongside the app we produce our own short vertical educational videos
(1080x1920, 40-60 seconds) on four series: element profiles, everyday chemistry
facts, household chemical-safety warnings, and the history of chemistry. We have
281 of these videos today. Every one is written, narrated and rendered by us from
our own data. They contain our own narration only and no third-party music.

WHY WE NEED THE CONTENT POSTING API

We already publish these videos to our own Facebook Page through the Facebook
Graph API. We want to publish the same self-produced videos to our own TikTok
account from the same internal tool, instead of uploading each file by hand.

We never post on behalf of any other TikTok user. Only the owner of our own
TikTok account authorizes this app, and video is only ever published to that
same account. The tool is internal: it runs on the operator's own computer at
127.0.0.1 and is not reachable from the internet.

HOW EACH SCOPE IS USED

1. user.info.basic
   After the account owner signs in with TikTok, this scope lets us confirm which
   TikTok account the tool is currently connected to. We show the nickname,
   username and avatar at the top of the tool so the operator can see, before
   doing anything else, that they are about to publish to the correct account. We
   store only the OAuth tokens on the operator's local machine; we do not share
   this data with anyone and we run no analysis on it.

2. video.publish (Direct Post)
   Used to publish one self-produced video at a time to the connected account's
   profile.

   Before the posting screen is shown, the tool calls
   /v2/post/publish/creator_info/query/ and builds the screen from the response:

   - The creator nickname and username are displayed.
   - The privacy-level dropdown is populated only from privacy_level_options, and
     nothing is preselected. Its first entry reads "not chosen yet". The Post
     button stays disabled until the operator actively picks a privacy level.
   - The Comment, Duet and Stitch checkboxes are rendered from comment_disabled,
     duet_disabled and stitch_disabled. When the account has one of these turned
     off, the matching checkbox is greyed out, cannot be enabled, and is labelled
     to explain why.
   - A "Disclose commercial content" switch reveals two options, "Your brand"
     (brand_organic_toggle) and "Branded content" (brand_content_toggle). If the
     switch is on and neither option is chosen, an error is shown and the Post
     button stays disabled.
   - When "Branded content" is selected, the SELF_ONLY privacy option is disabled,
     and if it was already selected it is cleared.
   - The tool displays which label will be applied to the video: "Promotional
     content" or "Paid partnership".
   - A consent line is always displayed above the Post button: by posting, the
     operator agrees to TikTok's Music Usage Confirmation. When "Branded content"
     is selected, the line also names TikTok's Branded Content Policy. Both are
     links to TikTok's own pages.

   Only after the operator has reviewed the video, written the caption, chosen the
   privacy level and confirmed these settings does the tool call
   /v2/post/publish/video/init/ with exactly those values, upload the MP4 to the
   returned upload_url, and then poll /v2/post/publish/status/fetch/ until the
   post reaches PUBLISH_COMPLETE. The result is shown to the operator. Nothing is
   posted automatically and there is no unattended or scheduled publishing.

OPERATOR FLOW

1. The operator starts the internal tool on their own machine (npm run tiktok:bang)
   and opens http://localhost:3721.
2. They click "Connect TikTok account" and complete TikTok's OAuth login as the
   owner of our TikTok account. TikTok returns to
   https://ph-chem.web.app/tiktok-callback.html, a page on our verified domain,
   which passes the authorization code back to the local tool.
3. The tool calls creator_info and shows the connected account.
4. The operator picks one video from our own library and plays it back to review it.
5. The operator writes the caption, picks the privacy level, adjusts the
   interaction settings, and sets the commercial-content disclosure if it applies.
6. The operator clicks "Post to TikTok". The tool uploads the file and reports the
   publish status.

DATA HANDLING

pH-Chem itself has no login, no user accounts and no server-side user data. The
only TikTok data we hold is the OAuth access and refresh token plus the account's
own open_id, nickname and username, stored in a single local file on the
operator's computer and never transmitted anywhere else.

Terms of Service:  https://ph-chem.web.app/dieu-khoan.html
Privacy Policy:    https://ph-chem.web.app/bao-mat.html

CHANGES IN THIS VERSION

This is our first submission for this app. There is no previous version to
compare against.
```

---

## 5. Còn phải làm

1. Bấm **Verify** cho tên miền `ph-chem.web.app` (hai tệp xác minh đã sống trên máy chủ).
2. Điền nốt phần thông tin cơ bản của ứng dụng: mô tả, đường dẫn Điều khoản, Chính sách bảo mật, chọn nền tảng Web.
3. Đổi tên ứng dụng từ `tuongotsieucay` sang `pH-Chem` — tên hiện tại không liên quan gì tới nội dung khai.
4. Lấy Client key / Client secret dán vào `.env.local`.
5. **Chạy thử thật một lần**: nối tài khoản → đăng một video ở chế độ "Chỉ mình tôi" → xem có lên hồ sơ không. Chưa chạy được bước này thì chưa nộp.
6. Quay màn hình đúng 6 bước ở mục "OPERATOR FLOW" để nộp kèm hồ sơ.
7. Sau khi xác minh tên miền xong, xoá tệp xác minh thừa (`tiktok-developers-site-verification.txt` hoặc `tiktokSRTkUodcAXPWeHero3VNP4LORUu3kGYo.txt`, giữ lại cái TikTok thật sự dùng).

---

## 6. Điểm cần lưu ý khi quay màn hình nộp duyệt

Người duyệt tìm đúng mấy thứ này, thiếu là trả hồ sơ:

- Quay được cảnh ô chế độ hiển thị đang ở trạng thái **chưa chọn** và nút Đăng đang **mờ**.
- Quay được cảnh chọn chế độ xong thì nút Đăng **sáng lên**.
- Quay được cảnh ô Duet (hoặc Comment/Stitch) bị **khoá** vì cài đặt tài khoản.
- Quay được **câu cam kết Music Usage Confirmation** nằm ngay trên nút Đăng.
- Quay được cảnh bật công bố nội dung thương mại → chọn "nội dung trả phí" → mục
  "Chỉ mình tôi" **biến thành không chọn được**.
- Quay tới lúc bài **lên hồ sơ TikTok thật**, mở app TikTok cho thấy bài đó.
