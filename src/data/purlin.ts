// Xà gồ C — Z: dữ liệu cho cụm trang /xa-go/<size>/ (16 quy cách).
//
// GIÁ: chỉ chủ doanh nghiệp cung cấp. Khi có bảng giá mới, điền số vào
// `purlinPrices` và đặt `purlinPricesUpdated` (DD/MM/YYYY) — ngày này được
// nội suy vào <title> và sitemap lastmod. Giá thiếu → hiển thị "Liên hệ".
// Automation KHÔNG được sửa file này.

export const purlinPricesUpdated: string | null = null;

export interface PurlinSize {
  slug: string; // 'c200'
  label: string; // 'C200'
  section: 'C' | 'Z';
  height: number; // chiều cao tiết diện, mm
  flange: string; // cạnh hiển thị
  /** bề rộng khai triển (mm), đã trừ hao gấp mép — dùng tính barem lý thuyết */
  devWidth: number;
  /** đoạn mô tả ứng dụng riêng từng quy cách (viết tay, tránh trùng lặp) */
  use: string;
}

/** các độ dày sản xuất phổ biến (mm) */
export const purlinThicknesses = [1.4, 1.5, 1.8, 2.0, 2.3, 2.5, 3.0];

/** barem lý thuyết kg/m = khai triển (mm) × dày (mm) × 7.85 g/cm³, làm tròn 2 số lẻ */
export const baremKgm = (devWidth: number, t: number) =>
  Math.round((devWidth * t * 7.85) / 10) / 100;

/**
 * Đơn giá đ/m theo độ dày — CHỦ DOANH NGHIỆP cung cấp, để trống = "Liên hệ".
 * Ví dụ khi có số: c200: { black: { '2.0': 91800 }, galv: { '2.0': 92600 } }
 */
export const purlinPrices: Record<
  string,
  { black?: Record<string, number>; galv?: Record<string, number> }
> = {};

export const purlinPriceOf = (
  slug: string,
  coat: 'black' | 'galv',
  t: number
): number | null => purlinPrices[slug]?.[coat]?.[String(t)] ?? null;

export const purlinSizes: PurlinSize[] = [
  {
    slug: 'c60',
    label: 'C60',
    section: 'C',
    height: 60,
    flange: '30 mm',
    devWidth: 134,
    use: 'Xà gồ C60 là quy cách nhỏ nhất, hay dùng làm đòn tay mái tôn nhà cấp 4, mái hiên, mái che sân và chuồng trại — nơi khoảng cách vì kèo ngắn. Cây nhẹ, dễ vận chuyển lên mái, thay thế tốt cho đòn tay gỗ vì không mối mọt, không cong vênh.',
  },
  {
    slug: 'c80',
    label: 'C80',
    section: 'C',
    height: 80,
    flange: '40 mm',
    devWidth: 184,
    use: 'Xà gồ C80 dùng phổ biến làm đòn tay mái nhà dân dụng nhỏ, gara, mái che sân phơi. So với C60, tiết diện cao hơn cho phép thưa bước kèo hơn một chút mà mái vẫn phẳng, không võng giữa nhịp.',
  },
  {
    slug: 'c100',
    label: 'C100',
    section: 'C',
    height: 100,
    flange: '40 — 50 mm',
    devWidth: 234,
    use: 'Xà gồ C100 là quy cách thông dụng nhất cho mái nhà ở dân dụng: đòn tay mái tôn nhà phố, nhà cấp 4 xây mới, khung mái hiên lớn. Cân đối giữa trọng lượng và khả năng chịu lực nên hầu như công trình nhà ở nào cũng dùng được.',
  },
  {
    slug: 'c125',
    label: 'C125',
    section: 'C',
    height: 125,
    flange: '47 — 50 mm',
    devWidth: 259,
    use: 'Xà gồ C125 phù hợp mái nhà ở khẩu độ nhỉnh hơn, dãy nhà trọ, quán xưởng nhỏ — khi C100 phải đi bước kèo quá dày thì lên C125 để thưa bước kèo, giảm tổng số cây và công lắp dựng.',
  },
  {
    slug: 'c150',
    label: 'C150',
    section: 'C',
    height: 150,
    flange: '50 — 65 mm',
    devWidth: 284,
    use: 'Xà gồ C150 là cỡ vào sân nhà xưởng: xưởng nhỏ và vừa, kho chứa, kèo thép nhà phố có nhịp lớn. Đây cũng là quy cách hay được hỏi giá nhất nhóm giữa vì vừa đủ cứng cho khẩu độ 4 — 6 m với bước xà gồ hợp lý.',
  },
  {
    slug: 'c180',
    label: 'C180',
    section: 'C',
    height: 180,
    flange: '50 — 65 mm',
    devWidth: 314,
    use: 'Xà gồ C180 nằm giữa C150 và C200 — chọn khi C150 hơi non tải mà C200 lại dư, ví dụ xưởng vừa có bước cột 5 — 6 m, mái tôn cách nhiệt nặng hơn tôn thường. Tối ưu chi phí trên từng kg thép cho thiết kế sát tải.',
  },
  {
    slug: 'c200',
    label: 'C200',
    section: 'C',
    height: 200,
    flange: '50 — 65 mm',
    devWidth: 334,
    use: 'Xà gồ C200 là quy cách phổ biến nhất trong nhà xưởng công nghiệp: tiết diện cao 200 mm cho phép vượt bước cột 6 m thông dụng mà không cần giằng dày. Hầu hết bản vẽ nhà xưởng tiền chế khu vực phía Nam đều gọi C200 cho mái và vách.',
  },
  {
    slug: 'c250',
    label: 'C250',
    section: 'C',
    height: 250,
    flange: '65 mm',
    devWidth: 414,
    use: 'Xà gồ C250 dùng cho nhà xưởng lớn, khẩu độ rộng, bước cột 7 — 8 m hoặc mái mang tải nặng (tôn PU, pin mặt trời). Tiết diện cao giúp giảm số hàng xà gồ trên mái, bù lại cây nặng hơn — nên tính khối lượng kỹ trước khi chốt.',
  },
  {
    slug: 'c300',
    label: 'C300',
    section: 'C',
    height: 300,
    flange: '65 mm',
    devWidth: 464,
    use: 'Xà gồ C300 là quy cách C lớn nhất chúng tôi cán — dùng cho công trình công nghiệp nặng, dầm phụ đỡ sàn, khung kèo vượt nhịp lớn. Thường sản xuất theo đơn hàng với chiều dài và lỗ đột đúng bản vẽ, ít khi có sẵn kho.',
  },
  {
    slug: 'z100',
    label: 'Z100',
    section: 'Z',
    height: 100,
    flange: 'theo bản vẽ (~50 mm)',
    devWidth: 240,
    use: 'Xà gồ Z100 dùng cho mái khẩu độ vừa cần ưu thế riêng của tiết diện Z: hai cánh lệch nhau cho phép nối chồng hai cây qua gối đỡ, mái chạy liên tục nhiều nhịp cứng hơn hẳn so với nối đối đầu của xà gồ C cùng cỡ.',
  },
  {
    slug: 'z125',
    label: 'Z125',
    section: 'Z',
    height: 125,
    flange: 'theo bản vẽ (~50 mm)',
    devWidth: 265,
    use: 'Xà gồ Z125 phù hợp mái nhà xưởng nhỏ chạy dài nhiều gian — tận dụng kiểu nối chồng liên tục của tiết diện Z để giảm độ võng giữa nhịp mà không phải tăng chiều cao tiết diện.',
  },
  {
    slug: 'z150',
    label: 'Z150',
    section: 'Z',
    height: 150,
    flange: '62 × 68 mm',
    devWidth: 314,
    use: 'Xà gồ Z150 (cánh 62/68) là quy cách Z được dùng nhiều nhất cho mái nhà xưởng khẩu độ lớn: nối chồng qua gối trung gian làm mái làm việc như dầm liên tục, chịu tải tốt hơn xà gồ đơn giản cùng tiết diện.',
  },
  {
    slug: 'z180',
    label: 'Z180',
    section: 'Z',
    height: 180,
    flange: '62 × 68 mm',
    devWidth: 344,
    use: 'Xà gồ Z180 dùng cho xưởng công nghiệp có bước cột và tải mái lớn hơn mức Z150 đáp ứng được — giữ nguyên lợi thế nối chồng liên tục, thêm chiều cao tiết diện để vượt bước cột 6 — 7 m.',
  },
  {
    slug: 'z200',
    label: 'Z200',
    section: 'Z',
    height: 200,
    flange: '62 × 68 / 72 × 78 mm',
    devWidth: 364,
    use: 'Xà gồ Z200 có hai cỡ cánh (62×68 và 72×78) cho kỹ sư chọn theo tải: mái xưởng công nghiệp bước cột lớn, hệ mái cần độ cứng cao. Cùng chiều cao 200 mm nhưng lắp liên tục nên thường vượt nhịp tốt hơn C200.',
  },
  {
    slug: 'z250',
    label: 'Z250',
    section: 'Z',
    height: 250,
    flange: '62 × 68 / 72 × 78 mm',
    devWidth: 414,
    use: 'Xà gồ Z250 dành cho nhà xưởng lớn, khẩu độ rộng và mái tải nặng — hai cỡ cánh 62×68 hoặc 72×78 theo bản vẽ. Ở cỡ này chênh lệch trọng lượng giữa các độ dày khá lớn, nên báo đúng độ dày để tính giá chính xác.',
  },
  {
    slug: 'z300',
    label: 'Z300',
    section: 'Z',
    height: 300,
    flange: '72 × 78 mm',
    devWidth: 484,
    use: 'Xà gồ Z300 (cánh 72/78) là quy cách Z lớn nhất — công trình công nghiệp khẩu độ rất lớn, hệ mái nặng, dầm phụ. Sản xuất theo đơn hàng, chiều dài và vị trí lỗ đột đúng bản vẽ thiết kế.',
  },
];

export const purlinBySlug = new Map(purlinSizes.map((s) => [s.slug, s]));
