export const site = {
  name: 'Công ty Cổ phần Hà Lan',
  legalName: 'CÔNG TY CP SX-TM-DV HÀ LAN',
  shortName: 'Hà Lan',
  founded: 2002,
  domain: 'https://halanvn.com',
  email: 'halanvn@yahoo.com',
  tagline: 'Tôn lợp · Xà gồ C, Z · Sắt hộp · Thép xây dựng',
  description:
    'Công ty Cổ phần Hà Lan — sản xuất và cung cấp tôn lợp, xà gồ C/Z, sắt hộp, thép xây dựng từ năm 2002. Bốn nhà máy tại TP.HCM, Bình Dương và Tây Ninh. Giao hàng tận nơi.',
  hotline: { tel: '0963199313', display: '0963 199 313' },
  zaloUrl: 'https://zalo.me/0963199313',
  phones: [
    { label: 'Văn phòng Tân Bình', tel: '02837271662', display: '(028) 3727 1662' },
    { label: 'Hotline', tel: '0963199313', display: '0963 199 313' },
    { label: 'Hotline 2', tel: '0934063768', display: '0934 063 768' },
    { label: 'Bình Dương', tel: '02743617808', display: '(0274) 361 7808' },
  ],
  bank: 'STK 0461.0004.77816 — Vietcombank CN Bình Dương',
};

export interface Location {
  name: string;
  nameEn: string;
  kind: 'office' | 'factory';
  address: string;
  phones: { tel: string; display: string }[];
  mapQuery: string;
}

export const locations: Location[] = [
  {
    name: 'Trụ sở chính — Tân Bình',
    nameEn: 'Head office — Tan Binh',
    kind: 'office',
    address: '358 Cộng Hòa, Phường 13, Quận Tân Bình, TP. Hồ Chí Minh',
    phones: [
      { tel: '02837271662', display: '(028) 3727 1662' },
      { tel: '0963199313', display: '0963 199 313' },
    ],
    mapQuery: '358 Cộng Hòa, Phường 13, Tân Bình, Hồ Chí Minh',
  },
  {
    name: 'Nhà máy Thủ Đức',
    nameEn: 'Thu Duc factory',
    kind: 'factory',
    address: '80 Quốc lộ 1A, P. Hiệp Bình Phước, TP. Thủ Đức, TP. Hồ Chí Minh',
    phones: [
      { tel: '02837271662', display: '(028) 3727 1662' },
      { tel: '0963199313', display: '0963 199 313' },
    ],
    mapQuery: '80 Quốc lộ 1A, Hiệp Bình Phước, Thủ Đức',
  },
  {
    name: 'Nhà máy Thuận An — Bình Dương',
    nameEn: 'Thuan An factory — Binh Duong',
    kind: 'factory',
    address: '327 Quốc lộ 13, Dốc AB, P. An Thạnh, TP. Thuận An, Bình Dương',
    phones: [
      { tel: '02743617808', display: '(0274) 361 7808' },
      { tel: '0963199313', display: '0963 199 313' },
    ],
    mapQuery: '327 Quốc lộ 13, An Thạnh, Thuận An, Bình Dương',
  },
  {
    name: 'Nhà máy Bình Chánh',
    nameEn: 'Binh Chanh factory',
    kind: 'factory',
    address: '2A/110 Tỉnh lộ 10, Phạm Văn Hai, H. Bình Chánh, TP. Hồ Chí Minh',
    phones: [
      { tel: '02862702335', display: '(028) 6270 2335' },
      { tel: '0934063768', display: '0934 063 768' },
    ],
    mapQuery: '2A/110 Tỉnh lộ 10, Phạm Văn Hai, Bình Chánh',
  },
  {
    name: 'Nhà máy Tây Ninh',
    nameEn: 'Tay Ninh factory',
    kind: 'factory',
    address: 'Số 1, Cụm công nghiệp Thanh Điền, Tây Ninh',
    phones: [
      { tel: '0909730731', display: '0909 730 731 (A. Thắng)' },
      { tel: '0917953865', display: '0917 953 865' },
    ],
    mapQuery: 'Cụm công nghiệp Thanh Điền, Tây Ninh',
  },
];

export const nav = [
  { href: '/', label: 'Trang chủ' },
  { href: '/gioi-thieu/', label: 'Giới thiệu' },
  { href: '/san-pham/', label: 'Sản phẩm' },
  { href: '/bang-gia/', label: 'Bảng giá' },
  { href: '/nha-may/', label: 'Nhà máy' },
  { href: '/lien-he/', label: 'Liên hệ' },
];
