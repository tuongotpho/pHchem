# Hướng Dẫn & Quy Định Dự Án (pH-Chem)

## 🚀 Quy Trình Triển Khai (Deployment Workflow)

Dự án sử dụng **GitHub Actions CI/CD** ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) để tự động hóa toàn bộ quá trình kiểm thử, đóng gói và triển khai.

### Quy tắc triển khai chuẩn:
1. **Kiểm tra trước khi commit**:
   - `npm run lint` (oxlint)
   - `npm test` (vitest)
2. **Push mã nguồn lên Git**:
   - `git add <các tệp thay đổi>`
   - `git commit -m "<nội dung thay đổi>"`
   - `git push origin main`
3. **Tự động hóa CI/CD**:
   - Khi có push lên nhánh `main`, GitHub Actions sẽ tự động:
     - Chạy lint & test gác cửa.
     - Build song song 2 bản:
       - Bản GitHub Pages (`base: /pHchem/`) -> deploy lên `https://tuongotpho.github.io/pHchem/`
       - Bản Firebase Hosting (`base: /` -> `dist-firebase`) -> deploy lên `https://ph-chem.web.app/`
4. **Lưu ý**:
   - **KHÔNG** chạy lệnh deploy thủ công từ máy local (`firebase deploy`) trừ khi có yêu cầu đặc biệt hoặc khắc phục sự cố.
