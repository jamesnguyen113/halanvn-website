// Bảng giá — cập nhật số liệu tại đây rồi đổi `updated`.
// Giá null = "Liên hệ". Đơn giá VND, hiển thị theo định dạng vi-VN (57.000 đ).
export const priceListUpdated = '19/03/2019'; // ⚠️ giá cũ từ website trước — cần cập nhật trước khi công bố

export interface PriceRow {
  spec: string; // độ dày / quy cách
  weight?: string; // tỷ trọng kg/md
  price: number | null; // VND per unit
}

export interface PriceGroup {
  name: string;
  note?: string;
  unit: string;
  rows: PriceRow[];
}

export const priceGroups: PriceGroup[] = [
  {
    name: 'Tôn mạ màu (xanh ngọc — nhập khẩu)',
    unit: 'đ/m',
    rows: [
      { spec: '0.30 mm', weight: '2.37 — 2.45', price: 57000 },
      { spec: '0.35 mm', weight: '2.75 — 2.85', price: 63000 },
      { spec: '0.40 mm', weight: '3.31 — 3.35', price: 71500 },
      { spec: '0.45 mm', weight: '3.80 — 3.84', price: 76500 },
      { spec: '0.50 mm', weight: '4.22 — 4.35', price: 88500 },
    ],
  },
  {
    name: 'Tôn lạnh trắng — Nam Kim',
    unit: 'đ/m',
    rows: [
      { spec: '0.30 mm', weight: '2.40 — 2.50', price: null },
      { spec: '0.35 mm', weight: '2.73 — 2.87', price: null },
      { spec: '0.40 mm', weight: '3.29 — 3.32', price: 74000 },
      { spec: '0.45 mm', weight: '3.78 — 3.97', price: 82000 },
      { spec: '0.50 mm', weight: '4.06 — 4.28', price: 90000 },
    ],
  },
  {
    name: 'Tôn Hoa Sen',
    note: '9 sóng, 5 sóng, 13 sóng, cliplock',
    unit: 'đ/m',
    rows: [
      { spec: '0.40 mm', weight: '3.49', price: 92000 },
      { spec: '0.45 mm', weight: '3.96', price: 100000 },
      { spec: '0.50 mm', weight: '4.45', price: 111000 },
    ],
  },
  {
    name: 'Tôn Đông Á',
    note: '9 sóng, 5 sóng, 13 sóng, cliplock',
    unit: 'đ/m',
    rows: [
      { spec: '0.40 mm', weight: '3.39', price: 85000 },
      { spec: '0.45 mm', weight: '3.87', price: 94500 },
      { spec: '0.50 mm', weight: '4.33', price: 104000 },
    ],
  },
  {
    name: 'PE cách nhiệt — cán theo sóng tôn',
    unit: 'đ/m',
    rows: [
      { spec: '3 ly — cán 5sv, 9sv', price: 15000 },
      { spec: '5 ly — cán 5sv', price: 17000 },
      { spec: '10 ly — dán phẳng', price: 25000 },
    ],
  },
  {
    name: 'Tôn nhựa sáng',
    note: '2 m, 2.4 m, 3 m hoặc cắt theo yêu cầu',
    unit: 'đ/m',
    rows: [
      { spec: '1 lớp (0.50 mm)', price: 38500 },
      { spec: '2 lớp (1.0 mm)', price: 73000 },
    ],
  },
  {
    name: 'Vít bắn tôn',
    unit: 'đ/hộp',
    rows: [
      { spec: '2.5 phân', price: 55000 },
      { spec: '4 phân', price: 60000 },
      { spec: '5 phân', price: 65000 },
    ],
  },
  {
    name: 'Gia công',
    unit: 'đ/m',
    rows: [
      { spec: 'Cán 5, 9, 13 sóng', price: 1000 },
      { spec: 'Cán sóng cliplock', price: 2500 },
      { spec: 'Gia công vòm', price: 3000 },
      { spec: 'Gia công máng xối', price: 1000 },
    ],
  },
];

export const priceNotes = [
  'Đơn giá đã bao gồm VAT 10%. Nhận hóa đơn VAT trong vòng 15 ngày.',
  'Giá có thể giảm theo số lượng đơn đặt hàng.',
  'Dung sai ±5%.',
  'Có xe giao hàng tận nơi.',
  'Xà gồ C — Z và thép hình báo giá theo quy cách từng công trình — gọi hotline.',
];

export const fmtVnd = (n: number) => n.toLocaleString('vi-VN');
