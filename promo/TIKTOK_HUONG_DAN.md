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
trên trình duyệt ngày 06/09/2026 (dùng dữ liệu `creator_info` giả lập để thử logic),
và chạy thật với TikTok ngày 07/09/2026.

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
| Theo dõi kết quả sau khi đăng | Hỏi `status/fetch` 3 giây một lần tới khi `PUBLISH_COMPLETE` | ✅ |

### Đã chạy thật — 07/09/2026

Nối tài khoản **Lê Thanh (@thanh8787)** qua sandbox, quyền cấp về đủ
`user.info.basic,video.publish`. `creator_info` thật trả về:

```
chế độ cho phép : PUBLIC_TO_EVERYONE, MUTUAL_FOLLOW_FRIENDS, SELF_ONLY
bình luận/duet/stitch : không khoá cái nào
dài tối đa      : 3600 giây
```

Đăng thử `element_03_vang.mp4` (6,28 MB) ở chế độ "Chỉ mình tôi":

```
publish_id : v_pub_file~v2-1.7682471349650540564
trạng thái : PUBLISH_COMPLETE  (trong vòng 4 giây)
```

Toàn bộ đường đi đã chạy một lượt: đăng nhập → đổi mã lấy token →
`creator_info` → `video/init` → đẩy file → `status/fetch` → đăng xong.

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

The TikTok account we publish to is @thanh8787, operated by the person who
builds and maintains pH-Chem. We never post on behalf of any other TikTok user.
Only the owner of that account authorizes this app, and video is only ever
published to that same account. The tool is internal: it runs on the operator's
own computer at 127.0.0.1 and is not reachable from the internet.

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

### 4b. Bản rút gọn — dùng khi ô đếm ký tự

Bản đầy đủ ở trên dài **830 từ / 5.495 ký tự**. Ô "Explain how each product and
scope works" giới hạn 1000 — nếu nó đếm **từ** thì bản đầy đủ vừa khít, dùng luôn.
Nếu đếm **ký tự** thì dùng bản dưới, **996 ký tự**, còn dư 4.

Cách phân biệt: dán bản đầy đủ vào rồi nhìn con số đếm. Nhảy lên ~830 là đếm từ,
nhảy lên ~5.500 là đếm ký tự.

```
pH-Chem (ph-chem.web.app) is a free chemistry study tool: periodic table, calculators, quizzes. No accounts, no user data.

We make our own educational videos (281 so far: elements, facts, chemical safety, history), our own narration, no third-party music, published to our own account @thanh8787 from an internal tool. We never post for other users.

user.info.basic: shows which account is connected, so the operator confirms the target before posting. Tokens stay local.

video.publish (Direct Post): the posting screen is built from creator_info. Privacy options come only from privacy_level_options, nothing preselected, and Post stays disabled until one is picked. Comment/Duet/Stitch follow the disabled flags. A disclosure switch sets brand_organic_toggle or brand_content_toggle; branded content disables SELF_ONLY. The Music Usage Confirmation line, plus Branded Content Policy when applicable, sits above Post. The operator confirms every post; nothing is automated.

First submission.
```

---

## 5. Những chỗ đã vấp và cách gỡ

Ghi lại để lần sau khỏi mò:

| Triệu chứng | Nguyên nhân thật | Cách gỡ |
|---|---|---|
| `client_key` sai, dù key dán đúng | Thay đổi trong sandbox còn ở dạng nháp | Bấm **Apply changes** ở từng khối trong trang sandbox, tải lại trang kiểm xem còn nguyên không |
| `sai_state` khi quay về | Công cụ chỉ giữ một mã phiên, bấm lần hai đè lần đầu | Đã sửa: giữ 5 mã gần nhất, mỗi mã sống 15 phút |
| `unaudited_client_can_only_post_to_private_accounts` | App chưa qua kiểm duyệt thì chỉ đăng được vào **tài khoản** đang để riêng tư (không phải bài đăng riêng tư) | Bật *Tài khoản riêng tư* trong app TikTok, duyệt xong thì tắt lại |

Lưu ý: sandbox có **client key, client secret và mã xác minh tên miền riêng**,
khác hoàn toàn với app production. Key sandbox bắt đầu bằng `sbaw`, key production bắt đầu bằng `aw`.

---

## 5c. Đổi giữa key sandbox và key production

Token do client nào cấp thì phải làm mới bằng đúng client đó. Đổi key mà giữ token cũ
thì **gọi API vẫn chạy** (TikTok chỉ xét token), nhưng tới lúc token hết hạn, bước làm
mới sẽ hỏng vì key không khớp.

Nên: trong lúc chờ duyệt cứ để **key sandbox**. Được duyệt rồi mới dán key production,
và nhớ **nối lại tài khoản một lần** để lấy token mới do client production cấp.

---

## 5b. Còn phải làm

1. Điền nốt thông tin cơ bản của ứng dụng: mô tả, đường dẫn Điều khoản, Chính sách bảo mật, nền tảng Web.
2. Dán nội dung mục 4 vào ô "Explain how each product and scope works".
3. Quay màn hình đúng 6 bước ở mục "OPERATOR FLOW" để nộp kèm hồ sơ.
4. Nộp duyệt. Duyệt xong thì **tắt chế độ tài khoản riêng tư** của @thanh8787.
5. Xoá tệp xác minh thừa `public/tiktok-developers-site-verification.txt` (tạo theo phỏng đoán, giờ đã rõ TikTok dùng kiểu tên `tiktok<mã>.txt`).
6. Đăng thủ công vài video hoá học lên @thanh8787 trước khi nộp, để người duyệt mở hồ sơ ra thấy đúng loại nội dung đã khai.

---

## 6. Điểm cần lưu ý khi quay màn hình nộp duyệt

Người duyệt tìm đúng mấy thứ này, thiếu là trả hồ sơ:

Quay một mạch, không cắt, theo đúng thứ tự này:

1. Bảng lúc mới mở: hiện **avatar và tên @thanh8787** lấy từ `creator_info`.
2. Chọn một video trong kho, **bấm phát cho chạy vài giây** để thấy là xem lại được.
3. Gõ chú thích vào ô, cho thấy **bộ đếm ký tự** chạy.
4. Dừng lại ở cảnh ô chế độ hiển thị đang là **"— Chưa chọn —"** và nút Đăng đang **mờ**.
   Rê chuột xuống dòng "Còn thiếu: chọn ai xem được" cho rõ.
5. Mở ô chế độ ra: danh sách **đúng ba mục** TikTok cho phép. Chọn "Công khai".
   Nút Đăng **sáng lên** — đây là cảnh quan trọng nhất.
6. Bật **Công bố nội dung thương mại**: nút Đăng **khoá lại**, hiện lỗi đỏ.
7. Tích **"Nội dung được trả phí"**: mục "Chỉ mình tôi" **chuyển thành không chọn được**,
   nhãn "Hợp tác trả phí" hiện ra, câu cam kết đổi thành có thêm **Branded Content Policy**.
8. Tắt công bố đi. Câu cam kết quay về chỉ còn **Music Usage Confirmation**.
   Quay cận dòng chữ này, nó nằm ngay trên nút Đăng.
9. Bấm **Đăng lên TikTok**. Quay cả phần tiến trình chạy tới `PUBLISH_COMPLETE`.
10. **Mở app TikTok**, vào hồ sơ @thanh8787, chỉ vào video vừa lên.

**Về cảnh ô tương tác bị khoá:** phụ thuộc tài khoản đang công khai hay riêng tư.
Đo trên @thanh8787 ngày 07/09:

| | Tài khoản công khai | Tài khoản riêng tư |
|---|---|---|
| `privacy_level_options` | PUBLIC_TO_EVERYONE, MUTUAL_FOLLOW_FRIENDS, SELF_ONLY | FOLLOWER_OF_CREATOR, MUTUAL_FOLLOW_FRIENDS, SELF_ONLY |
| `duet_disabled` | false | **true** |
| `stitch_disabled` | false | **true** |

Vì phải bật tài khoản riêng tư mới đăng được khi app chưa duyệt, nên lúc quay màn hình
ô **Duet và Stitch sẽ tự động hiện mờ** — đúng cảnh người duyệt muốn thấy, không phải
dàn dựng gì. Tuyệt đối không dựng giả cảnh này khi tài khoản đang công khai.

**Nhớ nói trong hồ sơ:** app chạy trong sandbox nên bài đăng ra vẫn ở chế độ riêng tư
dù màn hình chọn "Công khai". Đó là TikTok cố ý, không phải công cụ sai.
