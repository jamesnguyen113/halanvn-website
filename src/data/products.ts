import raw from './products.json';

export interface Product {
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  short: string;
  detail: string[];
  specs: Record<string, string>;
  images: string[];
  cover: string;
}

export interface Category {
  slug: string;
  name: string;
  nameEn: string;
  blurb: string;
  productSlugs: string[];
}

export const categories: Category[] = [
  {
    slug: 'ton-lop',
    name: 'Tôn lợp',
    nameEn: 'Roofing sheets',
    blurb: 'Tôn mạ kẽm, mạ màu, tôn lạnh, tôn nhôm — cán sóng 5, 9, cliplock, sóng ngói, sóng vòm theo yêu cầu.',
    productSlugs: [
      'ton-ma-kem', 'ton-ma-mau', 'ton-lanh', 'ton-nhom',
      'ton-9-song-vuong', 'ton-9-song-doi-song-kep', 'ton-5-song-vuong',
      'ton-cliplock', 'ton-song-vom', 'ton-song-ngoi', 'ton-do-san',
    ],
  },
  {
    slug: 'ton-cach-nhiet',
    name: 'Tôn cách nhiệt',
    nameEn: 'Insulated sheets',
    blurb: 'Tôn PE, tôn PU và túi khí cách nhiệt — giảm nóng, giảm ồn cho nhà xưởng và nhà ở.',
    productSlugs: ['ton-cach-nhiet-pe', 'ton-pu', 'tui-khi-cach-nhiet'],
  },
  {
    slug: 'xa-go',
    name: 'Xà gồ C — Z',
    nameEn: 'C & Z purlins',
    blurb: 'Xà gồ thép chữ C và chữ Z, đen hoặc mạ kẽm, cắt theo quy cách công trình.',
    productSlugs: ['xa-go-thep-chu-c', 'xa-go-thep-chu-z'],
  },
  {
    slug: 'phoi-thep',
    name: 'Phôi xà gồ',
    nameEn: 'Purlin steel strips',
    blurb: 'Phôi thép đen và phôi mạ kẽm cho gia công xà gồ.',
    productSlugs: ['phoi-thep-ma-kem', 'phoi-thep-den'],
  },
  {
    slug: 'sat-thep-xay-dung',
    name: 'Sắt thép xây dựng',
    nameEn: 'Construction steel',
    blurb: 'Thép vằn D10–D40, sắt hộp, ống phi, thép hình H — U — I — V.',
    productSlugs: ['sat-thep-xay-dun'],
  },
];

const namesEn: Record<string, string> = {
  'ton-ma-kem': 'Galvanized steel sheet',
  'ton-ma-mau': 'Pre-painted steel sheet',
  'ton-lanh': 'Galvalume (zinc-alu) sheet',
  'ton-nhom': 'Aluminium sheet',
  'ton-9-song-vuong': '9-rib corrugated sheet',
  'ton-9-song-doi-song-kep': '9 double-rib corrugated sheet',
  'ton-5-song-vuong': '5-rib corrugated sheet',
  'ton-cliplock': 'Cliplock roofing sheet',
  'ton-song-vom': 'Curved corrugated sheet',
  'ton-song-ngoi': 'Tile-profile sheet',
  'ton-do-san': 'Floor decking sheet',
  'ton-cach-nhiet-pe': 'PE insulated sheet',
  'ton-pu': 'PU insulated panel',
  'tui-khi-cach-nhiet': 'Air-bubble insulation',
  'xa-go-thep-chu-c': 'C purlin',
  'xa-go-thep-chu-z': 'Z purlin',
  'phoi-thep-ma-kem': 'Galvanized steel strip',
  'phoi-thep-den': 'Black steel strip',
  'sat-thep-xay-dun': 'Construction steel & rebar',
};

// A few pages on the old site had empty or garbled short descriptions — patch them here.
const shortOverrides: Record<string, string> = {
  'phoi-thep-ma-kem':
    'Phôi thép mạ kẽm dạng cuộn xả băng, dùng gia công xà gồ C — Z mạ kẽm, quy cách theo yêu cầu.',
  'phoi-thep-den':
    'Phôi thép đen dạng cuộn xả băng, dùng gia công xà gồ C — Z đen, quy cách theo yêu cầu.',
  'ton-pu':
    'Tôn PU 3 lớp: tôn bề mặt, lõi PU cách nhiệt và lớp lót — chống nóng, cách âm cho nhà xưởng, kho lạnh.',
  'sat-thep-xay-dun':
    'Thép vằn D10 — D40 dài 11,7 m cùng sắt hộp, ống phi, thép hình H — U — I — V cho mọi công trình.',
};

const catOf: Record<string, string> = {};
for (const c of categories) for (const s of c.productSlugs) catOf[s] = c.slug;

export const products: Product[] = (raw as any[]).map((p) => {
  const images: string[] = (p.images as string[]).map((i: string) => i.replace('/vnt_upload', '/img'));
  return {
    slug: p.slug,
    name: p.name,
    nameEn: namesEn[p.slug] ?? p.name,
    category: catOf[p.slug] ?? 'ton-lop',
    short: shortOverrides[p.slug] ?? p.short,
    detail: (p.detail as string[]) ?? [],
    specs: Object.fromEntries(
      Object.entries(p.specs as Record<string, string>).filter(([k, v]) => k !== 'Mã số' && v !== 'Liên hệ')
    ),
    images,
    cover: images[0] ?? '/img/placeholder.jpg',
  };
});

export const bySlug = new Map(products.map((p) => [p.slug, p]));
export const byCategory = (slug: string) => products.filter((p) => p.category === slug);
