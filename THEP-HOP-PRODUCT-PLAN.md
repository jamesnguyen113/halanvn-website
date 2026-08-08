# Kế hoạch bổ sung sản phẩm thép hộp cho halanvn.com

**Ngày nghiên cứu:** 08/08/2026  
**Phạm vi:** Lập kế hoạch nội dung, cấu trúc sản phẩm, UX, SEO và triển khai. Không thay đổi code hay giá bán trong tài liệu này.

## 1. Quyết định đề xuất

Giữ **`/thep-hop/`** làm trang danh mục/SEO chính và bổ sung bốn sản phẩm con vào hệ thống sản phẩm hiện có:

1. **Thép hộp vuông đen** — `thep-hop-vuong-den`
2. **Thép hộp vuông mạ kẽm** — `thep-hop-vuong-ma-kem`
3. **Thép hộp chữ nhật đen** — `thep-hop-chu-nhat-den`
4. **Thép hộp chữ nhật mạ kẽm** — `thep-hop-chu-nhat-ma-kem`

Các trang sản phẩm dùng URL hiện hữu của website:

- `/san-pham/thep-hop-vuong-den/`
- `/san-pham/thep-hop-vuong-ma-kem/`
- `/san-pham/thep-hop-chu-nhat-den/`
- `/san-pham/thep-hop-chu-nhat-ma-kem/`

Không tạo thêm một trang index có thể được Google lập chỉ mục tại `/san-pham/thep-hop/`, vì nó sẽ cạnh tranh với `/thep-hop/` cho cùng từ khóa.

### Vì sao bắt đầu bằng bốn sản phẩm

- Khớp cách khách hàng chọn hàng: **vuông/chữ nhật** rồi **đen/mạ kẽm**.
- Đủ cụ thể để có thẻ sản phẩm, ảnh, trang chi tiết và CTA riêng.
- Không tạo hàng chục trang theo kích thước trước khi Hà Lan có dữ liệu hàng thật và nội dung riêng.
- Tận dụng gần như toàn bộ hệ thống sản phẩm Astro đang có, giảm rủi ro khi code.

**Release gate:** nếu Hà Lan không có dữ liệu, ảnh và nội dung đủ khác nhau cho cả bốn nhóm, phát hành hai trang mạnh hơn là **Thép hộp đen** và **Thép hộp mạ kẽm**, rồi cho người dùng chọn vuông/chữ nhật trong trang. Không tạo bốn trang gần như giống nhau chỉ để đủ số lượng.

## 2. Hiện trạng website

### Điểm đang làm tốt

- `src/pages/thep-hop.astro` đã có title/description tốt, FAQ schema, bảng quy cách tổng quát, ứng dụng, CTA gọi điện/Zalo và liên kết nội bộ.
- `src/pages/san-pham/[slug].astro` đã tự sinh trang chi tiết với gallery, thông số, CTA, sản phẩm liên quan, Product schema và Breadcrumb schema.
- `src/components/ProductCard.astro` đã có thiết kế thẻ 4:3, hai cột trên mobile và bốn cột trên desktop.
- `src/layouts/Base.astro` đã xử lý canonical, Open Graph, Twitter card, JSON-LD và GA4.
- Bài `src/content/tin-tuc/sat-hop-den-hay-ma-kem.md` đã hỗ trợ đúng ý định tìm kiếm “nên chọn loại nào”.
- Mobile đã có thanh CTA cố định: gọi, Zalo và bảng giá.

### Khoảng trống hiện tại

- `sat-thep-xay-dung.productSlugs` trong `src/data/products.ts` đang rỗng, nên mục **Sắt thép xây dựng** trên `/san-pham/` chỉ có một liên kết chữ, không có sản phẩm.
- `/thep-hop/` đang là trang chữ và một bảng hai cột; chưa có ảnh, thẻ sản phẩm hoặc đường đi tới từng loại hàng.
- `src/data/products.json` chưa có sản phẩm thép hộp.
- Trang chủ chưa có sản phẩm thép hộp trong nhóm “Hàng bán chạy”.
- Chưa có ảnh thép hộp rõ ràng trong `public/img/`. Fallback `/img/placeholder.jpg` cũng không tồn tại, nên không được xuất bản trước khi có ảnh thật.
- `src/data/prices.ts` chưa có giá thép hộp. Đây là đúng với mô hình báo giá qua điện thoại hiện tại và không nên tự ý thay đổi.

### Lưu ý kỹ thuật quan trọng

Một sản phẩm thêm vào `products.json` nhưng không thêm slug vào `productSlugs` của danh mục sẽ bị gán nhầm về `ton-lop`. Khi triển khai phải sửa `products.json` và `products.ts` trong cùng một thay đổi.

## 3. Website tham khảo

“Tốt nhất” ở đây nghĩa là **mẫu tham khảo phù hợp nhất cho kiến trúc sản phẩm và hành trình báo giá**, không phải khẳng định website có traffic cao nhất.

### Mẫu chính: Thép Bảo Tín

- [Danh mục thép hộp vuông](https://thepbaotin.com/product-tag/thep-hop-vuong/)
- [Danh mục thép hộp chữ nhật](https://thepbaotin.com/product-tag/thep-hop-chu-nhat/)
- [Ví dụ trang thép hộp 20×40](https://thepbaotin.com/thep-hop-20x40/)

Đây là mẫu tổng thể tốt nhất được tìm thấy vì có đường đi rõ ràng từ danh mục → hình dạng → kích thước cụ thể, bộ lọc thương hiệu/vật liệu/xuất xứ, thông số mua hàng và nhiều điểm báo giá.

**Nên học:**

- Phân cấp sản phẩm rõ ràng.
- Thông số mua hàng xuất hiện sớm.
- Bảng độ dày, khối lượng, số cây/bó và giá/cây.
- Khách được hướng dẫn cần gửi thông tin gì để nhận báo giá.
- Sản phẩm liên quan và liên kết theo kích thước.

**Không nên sao chép:**

- Bảng quá dài và lặp nhiều biểu mẫu/CTA.
- Giá, khối lượng hoặc tiêu chuẩn chưa được đối chiếu với catalogue nhà cung cấp của Hà Lan.
- Một số bảng của đối thủ ghi đơn vị `kg/m` nhưng số liệu trông giống `kg/cây 6 m`; đây là lỗi nghiêm trọng cần tránh.

### Mẫu bổ sung

| Website | Điểm nên học | Điểm cần tránh |
| --- | --- | --- |
| [Thép ND](https://thepnd.com.vn/thep-hop/) | So sánh thương hiệu, bề mặt, kg/cây, giá/kg và giá/cây; cụm trang theo size rất mạnh | Trang tổng quá dài; không dùng ngày “mới nhất” nếu dữ liệu chưa thực sự được xác minh |
| [Tôn Thép Sáng Chinh](https://tonthepsangchinh.vn/thep-hop/thep-hop-vuong/) | Lưới sản phẩm theo kích thước, nhìn giống catalog | Bảng khổng lồ, khó dùng trên điện thoại |
| [Thép Vinh Phú](https://www.thepvinhphu.com/thep-hop/) | Khối thông số kỹ thuật gọn ngay dưới H1 | Có lỗi/đơn vị chưa rõ trên một số trang; mọi số liệu phải được review |
| [Chang Kim](https://changkim.vn/danh-muc-san-pham/cac-loai-thep/thep-hop/thep-hop-den/) | Quy trình B2B từ yêu cầu → báo giá → hợp đồng → giao hàng → VAT/CO-CQ | CTA bị chôn dưới nội dung kỹ thuật quá dài |
| [Ống Thép Hoa Sen](https://ongthephoasen.vn/san-pham/thep-hop-den/) | Hình ảnh, catalogue, tiêu chuẩn, FAQ và tín hiệu tin cậy kiểu nhà sản xuất | Không có ma trận giá/tồn kho theo size; không phù hợp để sao chép nguyên cấu trúc |
| [Thép Đại Bàng](https://thepdaibang.com/product-category/thep-hop/) | Kết hợp lưới sản phẩm với bảng so sánh nhiều thương hiệu | Bảng quá nhiều cột, đặc biệt kém hiệu quả trên mobile |

### Cơ hội khác biệt cho Hà Lan

Không đối thủ nào kết hợp thật gọn cả ba yếu tố sau:

1. Chọn đúng loại trong vài giây.
2. Bảng thông số có đơn vị tuyệt đối rõ ràng.
3. Báo giá qua điện thoại/Zalo với thông tin được chuẩn bị sẵn.

Hà Lan nên làm trang ngắn hơn, dễ quét hơn và đặt sự minh bạch của dữ liệu lên trên số lượng nội dung.

## 4. Kiến trúc nội dung đề xuất

```text
/san-pham/
└── Sắt thép xây dựng
    ├── Thép hộp vuông đen
    ├── Thép hộp vuông mạ kẽm
    ├── Thép hộp chữ nhật đen
    └── Thép hộp chữ nhật mạ kẽm

/thep-hop/                         ← hub/canonical cho “thép hộp”, “sắt hộp”
├── liên kết tới 4 sản phẩm trên
├── bảng quy cách đã xác minh
├── hướng dẫn chọn đen hay mạ kẽm
├── ứng dụng
├── quy trình báo giá/giao hàng
└── FAQ
```

### Giai đoạn sau, chỉ khi có dữ liệu thật

Có thể mở cụm trang size như `/thep-hop/20x20/`, `/thep-hop/20x40/`, `/thep-hop/30x60/`, `/thep-hop/40x80/` nếu đáp ứng cả ba điều kiện:

- Đây là size Hà Lan thực sự bán thường xuyên.
- Có bảng độ dày/khối lượng/thương hiệu riêng đã được xác minh.
- Có nội dung, ảnh hoặc ứng dụng riêng đủ khác biệt; không chỉ thay số trong một mẫu chung.

Không phát hành hàng loạt 20–40 trang mỏng chỉ vì đối thủ đang làm như vậy.

## 5. Nội dung bốn sản phẩm

Các dải kích thước dưới đây lấy từ trang hiện tại và vẫn phải được chủ doanh nghiệp xác nhận trước khi xuất bản.

| Slug | H1 đề xuất | Quy cách đang có trên site, cần xác minh | Ý định mua chính |
| --- | --- | --- | --- |
| `thep-hop-vuong-den` | Thép hộp vuông đen | 20×20 đến 100×100 mm; dày 1,0–3,0 mm; cây 6 m | Khung trong nhà, công trình có sơn hoàn thiện |
| `thep-hop-vuong-ma-kem` | Thép hộp vuông mạ kẽm | 20×20 đến 100×100 mm; dày 1,0–3,0 mm; cây 6 m | Cổng, hàng rào, trụ/khung ngoài trời |
| `thep-hop-chu-nhat-den` | Thép hộp chữ nhật đen | 10×20 đến 60×120 mm; dày 1,0–3,0 mm; cây 6 m | Xà, dầm phụ, khung mái/kệ có sơn |
| `thep-hop-chu-nhat-ma-kem` | Thép hộp chữ nhật mạ kẽm | 10×20 đến 60×120 mm; dày 1,0–3,0 mm; cây 6 m | Khung mái, bảng hiệu, kết cấu tiếp xúc ẩm |

### Cấu trúc một trang sản phẩm

1. Breadcrumb.
2. Gallery ảnh thật.
3. Nhãn danh mục “Sắt thép xây dựng”.
4. H1 và mô tả 2–3 câu.
5. Khối thông số nhanh:
   - Hình dạng.
   - Bề mặt.
   - Kích thước có bán.
   - Độ dày có bán.
   - Chiều dài cây.
   - Thương hiệu/xuất xứ thực tế.
   - Tiêu chuẩn thực tế.
6. CTA “Gọi báo giá” và “Nhắn Zalo”.
7. Dòng hướng dẫn: **Gửi loại + kích thước + độ dày + số cây/khối lượng + địa điểm giao**.
8. Bảng quy cách/khối lượng đã xác minh.
9. “Phù hợp khi” và “Không nên tự chọn khi”.
10. Ứng dụng thực tế.
11. Cách nhận biết/kiểm hàng: nhãn cây, độ dày, CO/CQ nếu có.
12. Sản phẩm liên quan.

### Mẫu mô tả ngắn

Nội dung này là khung viết, không phải dữ liệu được phép xuất bản ngay:

- **Vuông đen:** “Thép hộp vuông đen dùng cho khung, trụ, kệ và kết cấu sẽ được sơn hoàn thiện. Có nhiều quy cách và độ dày theo nhu cầu công trình; gọi Hà Lan để kiểm tra hàng và nhận giá trong ngày.”
- **Vuông mạ kẽm:** “Thép hộp vuông mạ kẽm có bề mặt chống oxy hóa tốt hơn thép đen để trần, phù hợp cổng, hàng rào và khung ngoài trời. Gửi quy cách, độ dày, số cây và địa điểm giao để nhận báo giá.”
- **Chữ nhật đen:** “Thép hộp chữ nhật đen phù hợp xà, dầm phụ, khung mái và kệ thép có sơn bảo vệ. Hà Lan cung cấp theo quy cách thực tế của công trình, có hóa đơn VAT theo chính sách đã xác nhận.”
- **Chữ nhật mạ kẽm:** “Thép hộp chữ nhật mạ kẽm dùng cho khung mái, bảng hiệu và kết cấu thường xuyên tiếp xúc độ ẩm. Chọn đúng cạnh, độ dày và số lượng theo bản vẽ trước khi chốt đơn.”

## 6. Thiết kế lại `/thep-hop/`

Giữ hero, phần giới thiệu, FAQ và phong cách thép xám/đỏ hiện có. Sắp xếp lại nội dung theo thứ tự mua hàng:

### Thứ tự section

1. **Hero**
   - H1 hiện tại.
   - Một câu nêu đủ vuông/chữ nhật, đen/mạ kẽm.
   - CTA gọi/Zalo.

2. **Chọn loại thép hộp**
   - Lưới 2×2 gồm bốn `ProductCard`.
   - Hiển thị sớm, trước phần giải thích dài.

3. **Gửi gì để nhận báo giá**
   - Loại bề mặt.
   - Kích thước.
   - Độ dày.
   - Số cây hoặc kg.
   - Địa điểm giao.

4. **Bảng quy cách**
   - Tách tab/khối vuông và chữ nhật.
   - Bộ lọc nhẹ theo bề mặt, kích thước và độ dày nếu dữ liệu đủ lớn.
   - Có CTA ngay sau bảng.

5. **So sánh thép đen và mạ kẽm**
   - Dùng bản tóm tắt ngắn.
   - Liên kết tới `/tin-tuc/sat-hop-den-hay-ma-kem/` để đọc sâu.

6. **Ứng dụng theo hạng mục**
   - Khung nhà xưởng/khung mái.
   - Cổng, hàng rào, lan can.
   - Kệ hàng/kho.
   - Bảng hiệu.
   - Mỗi mục đi với ảnh thật nếu có.

7. **Mua chung một chuyến**
   - Liên kết tới tôn lợp và xà gồ C–Z.
   - Đây là lợi thế riêng của Hà Lan cần nhấn mạnh.

8. **Quy trình đặt hàng**
   - Gửi quy cách → xác nhận hàng/giá → chốt đơn → giao công trình → hóa đơn/chứng từ theo thỏa thuận.

9. **FAQ và liên kết liên quan**

### Quy tắc cho bảng trên mobile

- Không dùng bảng 12–15 cột như đối thủ.
- Cột tối thiểu: `Quy cách`, `Độ dày (mm)`, `Chiều dài (m)`, `Khối lượng (kg/cây 6 m)`, `Tình trạng/CTA`.
- Nếu có `kg/m`, phải là cột riêng; không dùng chung nhãn với `kg/cây`.
- Cho phép cuộn ngang và giữ cột quy cách dễ nhìn.
- Có chú thích nguồn dữ liệu, dung sai và ngày kiểm tra.
- Nếu chưa có giá được duyệt, hiển thị “Liên hệ”, không chèn giá đối thủ.

## 7. Dữ liệu cần chủ doanh nghiệp cung cấp

Đây là bước bắt buộc trước khi code nội dung chi tiết.

### Danh mục hàng thật

- [ ] Vuông đen có những size và độ dày nào?
- [ ] Vuông mạ kẽm có những size và độ dày nào?
- [ ] Chữ nhật đen có những size và độ dày nào?
- [ ] Chữ nhật mạ kẽm có những size và độ dày nào?
- [ ] Chiều dài chuẩn chỉ 6 m hay có 9 m/12 m/cắt theo yêu cầu?
- [ ] Thương hiệu nào thực sự có thể giao: Hòa Phát, Hoa Sen, Nam Kim, Đông Á hoặc hãng khác?
- [ ] Có bán **mạ kẽm nhúng nóng sau gia công** hay chỉ hộp làm từ tôn mạ kẽm? Hai loại không được gọi lẫn nhau.
- [ ] Khối lượng kg/cây và số cây/bó lấy từ catalogue nào?
- [ ] Tồn kho hay đặt hàng; thời gian giao dự kiến theo khu vực?

### Chính sách và tuyên bố cần xác minh

- [ ] Hà Lan sản xuất/cán thép hộp hay chỉ phân phối?
- [ ] CO/CQ có cho mọi lô hay chỉ theo thương hiệu/yêu cầu?
- [ ] Giá báo đã gồm VAT trong mọi trường hợp?
- [ ] Khu vực giao và điều kiện phí giao.
- [ ] Có cắt, hàn, mạ hoặc gia công theo yêu cầu không?
- [ ] Dung sai độ dày/khối lượng được công bố thế nào?

### Ảnh cần chụp

Lưu dưới `public/img/product/thep-hop/`, ưu tiên ảnh 4:3, cùng ánh sáng và nền:

- [ ] Bó thép hộp vuông đen, đầu cây hướng về camera.
- [ ] Bó thép hộp vuông mạ kẽm.
- [ ] Bó thép hộp chữ nhật đen.
- [ ] Bó thép hộp chữ nhật mạ kẽm.
- [ ] Cận cảnh bề mặt và đường hàn.
- [ ] Tem/in quy cách và thương hiệu trên thân cây.
- [ ] Ảnh kho/xếp hàng/giao hàng của Hà Lan.
- [ ] Ảnh ứng dụng thật nếu được khách hàng cho phép.

Không dùng ảnh tải từ đối thủ. Với sản phẩm B2B cần tạo niềm tin, ảnh hàng thật tốt hơn ảnh AI.

## 8. Mô hình dữ liệu

### Bản ghi sản phẩm

Thêm bốn bản ghi vào `src/data/products.json` theo cấu trúc hiện tại:

- `slug`
- `name`
- `specs`
- `short`
- `detail`
- `images`

Nên mở rộng `Product` với `family?: string` và đặt `family: 'thep-hop'` cho bốn bản ghi. `/thep-hop/` có thể lọc theo `family` thay vì hardcode danh sách slug; điều này an toàn hơn nếu sau này thêm sản phẩm thép hộp khác.

Thêm bốn slug vào `sat-thep-xay-dung.productSlugs` và tên tiếng Anh trong `src/data/products.ts`.

### Bảng quy cách, nếu đã có dữ liệu được duyệt

Tạo `src/data/thep-hop.ts` làm nguồn duy nhất cho dữ liệu hàng hóa dạng bảng:

```ts
interface ThepHopRow {
  shape: 'vuong' | 'chu-nhat';
  finish: 'den' | 'ma-kem';
  widthMm: number;
  heightMm: number;
  thicknessMm: number;
  lengthM: number;
  weightKgPerBar?: number;
  piecesPerBundle?: number;
  brands?: string[];
  availability?: 'co-san' | 'dat-hang' | 'lien-he';
}
```

Quy tắc dữ liệu:

- `weightKgPerBar` phải ghi rõ là cho chiều dài nào.
- Không tính lại barem bằng công thức chưa được kỹ thuật duyệt.
- Không lưu giá vào file này.
- Giá chỉ được đưa vào hệ thống giá sau khi chủ doanh nghiệp duyệt nguồn, đơn vị và ngày cập nhật.
- Một dòng thiếu dữ liệu thì để trống/“Liên hệ”, không đoán.

## 9. Danh sách thay đổi theo file

### Bắt buộc cho giai đoạn 1

| File | Thay đổi |
| --- | --- |
| `src/data/products.json` | Thêm bốn sản phẩm, thông số, mô tả và ảnh |
| `src/data/products.ts` | Thêm bốn slug vào `sat-thep-xay-dung`, thêm tên tiếng Anh; không để sản phẩm rơi về `ton-lop` |
| `src/pages/thep-hop.astro` | Import bốn sản phẩm, thêm lưới card, ItemList schema, hướng dẫn báo giá và liên kết bài so sánh |
| `src/pages/san-pham/[slug].astro` | Thêm SEO override riêng cho bốn sản phẩm |
| `src/pages/san-pham/sat-thep-xay-dung.astro` | Chỉnh copy để bốn card mới là trọng tâm, giữ liên kết ống thép/thép hình/thép vằn |
| `src/pages/index.astro` | Chỉ thêm một sản phẩm thép hộp vào “Hàng bán chạy” nếu đúng với dữ liệu bán hàng |
| `public/img/product/thep-hop/*` | Thêm ảnh thật đã tối ưu |

### Khi có bảng quy cách đầy đủ

| File | Thay đổi |
| --- | --- |
| `src/data/thep-hop.ts` | Dữ liệu chuẩn hóa về size, dày, dài, kg/cây, bó, thương hiệu và tình trạng |
| `src/components/ThepHopSpecTable.astro` | Bảng responsive, đơn vị rõ ràng, lọc theo hình dạng/bề mặt |
| `src/pages/san-pham/[slug].astro` | Hiển thị bảng đã lọc khi slug là sản phẩm thép hộp |

### Không tự ý sửa

- `src/data/prices.ts`: giá của chủ doanh nghiệp, chỉ cập nhật khi có phê duyệt.
- `src/data/purlin.ts`: không liên quan và có quy tắc riêng.
- `content-archive/`: kho lưu trữ cũ, không chỉnh sửa.

### Redirect cũ

Kho archive xác nhận menu website cũ từng dùng `/vn/sat-hop-ong-phi.html`. Thêm hai redirect **cụ thể** sau vào `public/_redirects`, rồi chạy `node gen-redirects.mjs`:

- `/vn/sat-hop-ong-phi.html` → `/thep-hop/`
- `/m/vn/sat-hop-ong-phi.html` → `/thep-hop/`

Wildcard trong `_redirects` không tạo được trang redirect tĩnh trên GitHub Pages; nếu không thêm rule cụ thể, URL cũ sẽ rơi về trang chủ và mất ý định tìm kiếm.

## 10. SEO và liên kết nội bộ

### Phân bổ từ khóa

| Trang | Từ khóa chính | Từ khóa hỗ trợ |
| --- | --- | --- |
| `/thep-hop/` | thép hộp, sắt hộp | quy cách thép hộp, báo giá thép hộp, vuông và chữ nhật |
| Vuông đen | thép hộp vuông đen | sắt hộp vuông đen, hộp vuông cây 6 m |
| Vuông mạ kẽm | thép hộp vuông mạ kẽm | sắt hộp vuông mạ kẽm, hộp vuông chống gỉ |
| Chữ nhật đen | thép hộp chữ nhật đen | sắt hộp chữ nhật đen |
| Chữ nhật mạ kẽm | thép hộp chữ nhật mạ kẽm | sắt hộp chữ nhật mạ kẽm |

### Quy tắc SEO

- Dùng “thép hộp” và “sắt hộp” tự nhiên; không lặp máy móc.
- Chỉ thêm tháng/năm vào title khi có người thật xác minh dữ liệu trong tháng đó.
- Hub dùng Breadcrumb + ItemList + FAQ schema.
- Trang con dùng Product + Breadcrumb schema.
- Không phát `Offer` nếu không có giá công khai, đúng như code hiện tại.
- Mỗi trang con phải có title, description, intro và ứng dụng khác nhau.
- Alt ảnh mô tả đúng loại, ví dụ `Thép hộp chữ nhật mạ kẽm 40x80 tại kho Hà Lan`; không nhồi từ khóa.
- Internal link từ:
  - `/san-pham/`
  - `/san-pham/sat-thep-xay-dung/`
  - `/thep-hop/`
  - `/tin-tuc/sat-hop-den-hay-ma-kem/`
  - các bài về xà gồ/mái tôn khi phù hợp
  - `/bang-gia/` dưới dạng “Liên hệ báo giá thép hộp”, không phải bảng giá giả

### Chỉnh SEO cho hub

- Đề xuất title ngắn và đúng nội dung hơn: **`Thép hộp vuông, chữ nhật đen & mạ kẽm | Hà Lan`**.
- Bỏ cụm “giá hôm nay” khỏi title nếu trang không hiển thị dữ liệu giá được xác minh trong ngày; dùng “báo giá theo quy cách” trong copy.
- Thêm breadcrumb nhìn thấy được: `Trang chủ → Sản phẩm → Sắt thép xây dựng → Thép hộp`.
- Truyền `ogImage` là ảnh thép hộp thật thay vì logo mặc định.

## 11. Rà soát tuyên bố hiện có

Trước khi phát hành, kiểm tra và thống nhất các câu sau:

| Vị trí | Vấn đề | Hành động |
| --- | --- | --- |
| `src/pages/thep-hop.astro` | Nói nguồn hàng nhà máy lớn, CO/CQ và VAT | Xác nhận phạm vi áp dụng; viết “theo lô/theo yêu cầu” nếu không áp dụng cho mọi hàng |
| `src/content/tin-tuc/sat-hop-den-hay-ma-kem.md` | Có câu nói thép hộp “cán tại các nhà máy” Hà Lan | Nếu Hà Lan chỉ phân phối, đổi thành “cung cấp/giao từ hệ thống Hà Lan” |
| Bài so sánh đen/mạ kẽm | Nói giá mạ kẽm chỉ cao hơn “vài phần trăm” | Bỏ mức chênh nếu không có bảng giá nội bộ có ngày xác minh |
| Bài so sánh đen/mạ kẽm | Nói hai loại chịu lực như nhau ở cùng tiết diện/độ dày | Chỉ đúng khi cùng mác thép, độ dày thực tế và tiêu chuẩn sản xuất; thêm điều kiện này |
| Nội dung về độ bền | Có thể được hiểu là mạ kẽm không cần bảo trì | Nêu rõ vết cắt và vùng hàn cần xử lý; phân biệt mạ từ cuộn với nhúng nóng sau gia công |
| Trang thép hộp hiện tại | Gợi ý độ dày theo hạng mục | Thêm lưu ý rằng cấu kiện chịu lực phải theo bản vẽ/kỹ sư; website chỉ tư vấn mua hàng |
| Nội dung mới | Tên thương hiệu, tiêu chuẩn, mác thép | Chỉ ghi hãng/tiêu chuẩn thực sự có trên chứng từ hàng Hà Lan bán |
| Nội dung mới | “Mạ kẽm” | Phân biệt mạ từ cuộn và nhúng nóng sau gia công nếu cả hai cùng tồn tại |

## 12. Đo lường chuyển đổi

Giữ các event GA4 hiện tại `click_hotline`, `click_factory_phone` và `click_zalo`.

Nên bổ sung metadata hoặc event riêng cho vị trí CTA nếu app code có thời gian:

- `thep_hop_hero`
- `thep_hop_after_products`
- `thep_hop_after_specs`
- `thep_hop_product_page`

Mục tiêu sau 30–60 ngày:

- Số click hotline/Zalo từ `/thep-hop/` và bốn trang con.
- Truy vấn Search Console theo vuông/chữ nhật, đen/mạ kẽm và size.
- Sản phẩm/size khách hỏi nhiều nhất qua điện thoại.
- Tỷ lệ người đi từ `/san-pham/` tới thép hộp.

Dữ liệu này quyết định size page nào đáng xây ở giai đoạn 2.

## 13. Trình tự triển khai

### P0 — Xác nhận dữ liệu

- [ ] Chủ doanh nghiệp duyệt bốn nhóm sản phẩm.
- [ ] Chốt size, độ dày, chiều dài, thương hiệu, tiêu chuẩn và tình trạng hàng.
- [ ] Chốt tuyên bố sản xuất hay phân phối.
- [ ] Thu ảnh thật.
- [ ] Duyệt chính sách giá/VAT/giao hàng/CO-CQ.

### P1 — Ra mắt catalog tối thiểu

- [ ] Thêm bốn records vào product data.
- [ ] Gắn đúng danh mục `sat-thep-xay-dung`.
- [ ] Thêm tên tiếng Anh.
- [ ] Thêm `family: 'thep-hop'` và bảo toàn field này trong mapper `products.ts`.
- [ ] Thêm ảnh 4:3 và gallery.
- [ ] Thêm SEO override.
- [ ] Đặt bốn card lên `/thep-hop/`.
- [ ] Cập nhật copy `/san-pham/sat-thep-xay-dung/`.
- [ ] Thêm ItemList schema.
- [ ] Build và QA.

### P2 — Bảng quy cách hữu dụng

- [ ] Chuẩn hóa dữ liệu trong `thep-hop.ts`.
- [ ] Tạo bảng responsive có đơn vị rõ ràng.
- [ ] Đặt bảng tổng trên hub và bảng lọc trên trang con.
- [ ] Thêm ngày xác minh và nguồn dữ liệu nội bộ.

### P3 — Tăng trưởng theo dữ liệu

- [ ] Sau 30–60 ngày, xem GA4, Search Console và câu hỏi bán hàng.
- [ ] Chọn 4–8 size có nhu cầu thật để tạo trang riêng.
- [ ] Bổ sung ảnh công trình/catalogue nhà cung cấp có quyền sử dụng.
- [ ] Chỉ thêm bảng giá nếu quy trình cập nhật và chủ sở hữu dữ liệu đã rõ.

## 14. Tiêu chí hoàn thành

- [ ] `npm run build` thành công.
- [ ] Bốn URL sản phẩm được tạo và có canonical đúng.
- [ ] Không tạo trang index trùng lặp `/san-pham/thep-hop/`.
- [ ] Bốn card xuất hiện trong danh mục Sắt thép xây dựng và trên `/thep-hop/`.
- [ ] Không sản phẩm nào bị gán nhầm vào Tôn lợp.
- [ ] Không còn ảnh placeholder/broken image.
- [ ] Ảnh cover đúng tỷ lệ 4:3; gallery dùng tốt trên mobile.
- [ ] Mọi bảng ghi rõ `mm`, `m`, `kg/m` hoặc `kg/cây 6 m`.
- [ ] Không có giá, thương hiệu, tiêu chuẩn hoặc barem lấy trực tiếp từ đối thủ.
- [ ] Product schema không có Offer giả.
- [ ] Breadcrumb và ItemList schema hợp lệ.
- [ ] Hotline và Zalo hoạt động ở hero, sau sản phẩm, sau bảng và mobile bar.
- [ ] Trang dùng tốt ở 360 px, 768 px và desktop.
- [ ] Sitemap có bốn URL mới.
- [ ] Hai URL CMS cũ về sắt hộp/ống phi chuyển tới `/thep-hop/`, không về trang chủ.
- [ ] Chủ doanh nghiệp duyệt toàn bộ tuyên bố về hàng hóa trước khi merge.

## 15. Brief ngắn để giao cho app code

> Implement Phase 1 of `THEP-HOP-PRODUCT-PLAN.md`. Keep `/thep-hop/` as the canonical hub. Add exactly four steel-box products under the existing `sat-thep-xay-dung` category, reuse the current ProductCard and generic product-page system, add real images and unique SEO overrides, then show the four cards near the top of `/thep-hop/` with ItemList schema. Do not invent prices, weights, standards, brands, stock, manufacturing claims, or CO/CQ coverage. Do not edit `prices.ts`, `purlin.ts`, or `content-archive/`. Verify the build, responsive layout, structured data, sitemap, image paths, call links and Zalo links.

## 16. Nguồn nghiên cứu

- [Hà Lan — danh mục sản phẩm hiện tại](https://halanvn.com/san-pham/)
- [Hà Lan — sắt thép xây dựng](https://halanvn.com/san-pham/sat-thep-xay-dung/)
- [Thép Bảo Tín — thép hộp](https://thepbaotin.com/san-pham/thep-hop/)
- [Thép Bảo Tín — thép hộp 20×40](https://thepbaotin.com/thep-hop-20x40/)
- [Thép ND — thép hộp](https://thepnd.com.vn/thep-hop/)
- [Thép ND — thép hộp 20×40](https://thepnd.com.vn/san-pham/thep-hop-20x40/)
- [Thép Đại Bàng — danh mục thép hộp](https://thepdaibang.com/product-category/thep-hop/)
- [Ống Thép Hoa Sen — thép hộp đen](https://ongthephoasen.vn/san-pham/thep-hop-den/)
- [Tôn Nam Kim — thép hộp mạ kẽm](https://tonnamkim.com/thep-hop-ma-kem/)

> Các website đối thủ chỉ được dùng để nghiên cứu cấu trúc và câu hỏi của người mua. Số liệu kỹ thuật, tồn kho và giá bán của Hà Lan phải đến từ tài liệu nhà cung cấp hoặc dữ liệu nội bộ đã được phê duyệt.
