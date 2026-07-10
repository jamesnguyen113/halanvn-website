# halanvn.com — website mới

Website tĩnh (Astro + Tailwind) thay cho site vnTRUST CMS cũ (PHP 5.3, 2014).

## Chạy thử trên máy

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # xuất site tĩnh vào dist/
```

## Cấu trúc nội dung — sửa ở đâu?

| Muốn sửa | File |
| --- | --- |
| Số điện thoại, địa chỉ, nhà máy | `src/data/site.ts` |
| **Bảng giá** (⚠️ đang là giá 19/03/2019 từ site cũ) | `src/data/prices.ts` |
| Tên/mô tả sản phẩm | `src/data/products.json` + `src/data/products.ts` |
| Bài giới thiệu, nhà máy, dự án | `src/pages/*.astro` |
| Ảnh | `public/img/` |

## Trước khi công bố (checklist)

1. **Cập nhật bảng giá** trong `src/data/prices.ts` (giá hiện tại là giá 2019 lấy từ site cũ) và đổi `priceListUpdated`.
2. **Form liên hệ**: đăng ký key miễn phí tại <https://web3forms.com> (dùng email công ty), thay `YOUR_WEB3FORMS_KEY` trong `src/pages/lien-he.astro`.
3. **Google Analytics**: tạo property GA4 tại <https://analytics.google.com>, bỏ comment khối GA4 trong `src/layouts/Base.astro` và điền Measurement ID (site cũ dùng Universal Analytics đã ngừng hoạt động từ 2023).
4. Kiểm tra lại email `halanvn@yahoo.com` còn dùng không — đổi trong `src/data/site.ts` nếu cần.

## Đưa lên mạng (Cloudflare Pages — miễn phí)

1. Đẩy code lên GitHub (repo riêng, ví dụ `halanvn-website`).
2. Vào <https://dash.cloudflare.com> → Workers & Pages → Create → Pages → Connect to Git.
3. Chọn repo, cấu hình build: framework **Astro**, build command `npm run build`, output `dist`.
4. Deploy xong sẽ có địa chỉ tạm `*.pages.dev` — gửi cả nhà xem thử trên điện thoại.

## Trỏ tên miền halanvn.com (sau khi duyệt bản thử)

1. Tìm nơi quản lý tên miền (hỏi TRUST.vn hoặc xem hóa đơn gia hạn tên miền — thường là PA Vietnam, Mắt Bão, Nhân Hòa…). Lấy quyền quản trị DNS.
2. Trong Cloudflare Pages → Custom domains → thêm `halanvn.com` và `www.halanvn.com`, làm theo hướng dẫn trỏ DNS.
3. File `public/_redirects` đã chuyển hướng 301 toàn bộ đường dẫn cũ (`/vn/ton-ma-kem.html` → `/san-pham/ton-ma-kem/`…) để giữ thứ hạng Google.
4. Vào Google Search Console (<https://search.google.com/search-console>) xác minh tên miền và gửi sitemap `https://halanvn.com/sitemap-index.xml`.
5. Giữ hosting cũ thêm 1–2 tuần cho chắc rồi mới hủy.

## Lưu trữ site cũ

`content-archive/` chứa toàn bộ HTML, chữ và ảnh tải về từ site cũ (10/07/2026) — nguồn đối chiếu nội dung.
