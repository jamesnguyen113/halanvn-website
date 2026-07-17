// Bảng giá — cập nhật số liệu tại đây rồi đổi `updated`.
// Giá null = "Liên hệ". Đơn giá VND, hiển thị theo định dạng vi-VN (57.000 đ).
export const priceListUpdated = '10/07/2026';

export interface PriceRow {
  spec: string; // độ dày / quy cách
  weight?: string; // tỷ trọng kg/md
  price: number | null; // VND per unit
}

export interface PriceGroup {
  id: string;
  name: string;
  note?: string;
  unit: string;
  /** 'ton' groups also appear on /bang-gia/ton-lop/ */
  tag?: 'ton';
  rows: PriceRow[];
}

export const priceGroups: PriceGroup[] = [
  {
    id: 'ton-ma-mau-nhap-khau',
    name: 'Tôn mạ màu — nhập khẩu',
    note: '9 sóng, 5 sóng, 13 sóng lafông, cliplock',
    unit: 'đ/m',
    tag: 'ton',
    rows: [
      { spec: '0.35 mm — TQ', weight: '2.75 — 2.85', price: 52000 },
      { spec: '0.40 mm — NH', weight: '3.31 — 3.35', price: 66000 },
      { spec: '0.45 mm — NH', weight: '3.80 — 3.84', price: 74000 },
      { spec: '0.50 mm — ECO', weight: '4.22 — 4.35', price: 78000 },
    ],
  },
  {
    id: 'ton-lanh-trang',
    name: 'Tôn lạnh trắng',
    note: '9 sóng, 5 sóng, lafông, cliplock',
    unit: 'đ/m',
    tag: 'ton',
    rows: [{ spec: '0.50 mm — Đông Á AZ100', price: 112000 }],
  },
  {
    id: 'ton-mau-dong-a',
    name: 'Tôn màu Đông Á',
    note: '9 sóng, 5 sóng, 13 sóng lafông, cliplock',
    unit: 'đ/m',
    tag: 'ton',
    rows: [
      { spec: '0.40 mm — ĐA-S', price: 95000 },
      { spec: '0.45 mm — ĐA-S', price: 105000 },
      { spec: '0.50 mm — ĐA-W', price: 120000 },
    ],
  },
  {
    id: 'ton-pomina',
    name: 'Tôn Pomina',
    note: '9 sóng, 5 sóng, 13 sóng lafông, cliplock',
    unit: 'đ/m',
    tag: 'ton',
    rows: [{ spec: 'Các độ dày — báo giá theo ngày', price: null }],
  },
  {
    id: 'pe-cach-nhiet',
    name: 'PE cách nhiệt — cán theo sóng tôn',
    unit: 'đ/m',
    rows: [
      { spec: '3 ly — cán 5sv, 9sv', price: 18000 },
      { spec: '5 ly — cán 5sv, 9sv', price: 21000 },
      { spec: '10 ly — dán phẳng', price: 27000 },
    ],
  },
  {
    id: 'ton-nhua-sang',
    name: 'Tôn nhựa sáng',
    note: '2 m, 2.4 m, 3 m hoặc cắt theo yêu cầu',
    unit: 'đ/m',
    rows: [{ spec: '2 lớp (1.0 mm)', price: 75000 }],
  },
  {
    id: 'song-cliplock',
    name: 'Sóng cliplock',
    unit: 'đ/m',
    rows: [
      { spec: 'Gia công', price: 2500 },
      { spec: 'Đai cliplock', price: 12000 },
    ],
  },
];

export const priceNotes = [
  'Đơn giá đã bao gồm VAT.',
  'Giá có thể giảm theo số lượng đơn đặt hàng.',
  'Dung sai ±5%.',
  'Có xe giao hàng tận nơi.',
  'Xà gồ C — Z và thép hình báo giá theo quy cách từng công trình — gọi hotline.',
];

export const fmtVnd = (n: number) => n.toLocaleString('vi-VN');
