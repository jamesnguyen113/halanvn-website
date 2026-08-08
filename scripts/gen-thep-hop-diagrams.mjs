// Sinh ảnh cover 4:3 cho 4 sản phẩm thép hộp.
//
// Hà Lan chưa có ảnh chụp thép hộp thật. Thay vì dùng ảnh của đối thủ hoặc ảnh AI
// (khách B2B nhìn ra ngay và mất niềm tin), trang dùng hình cắt tiết diện dạng
// isometric — đúng kiểu catalogue thép, trung thực, và giúp phân biệt
// vuông/chữ nhật + đen/mạ kẽm ngay trên thẻ sản phẩm.
//
// Khi có ảnh chụp hàng thật: thêm ảnh vào đầu mảng `images` của sản phẩm trong
// src/data/products.json — hình vẽ này tự lùi xuống làm ảnh phụ trong gallery.
//
// Chạy lại: node scripts/gen-thep-hop-diagrams.mjs
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const W = 800;
const H = 600;
/** Độ sâu khối isometric: lùi về phía trên — bên phải (đủ dài để đọc ra "cây thép") */
const DX = 208;
const DY = -120;

// Mặt cắt trước là mặt sáng nhất: đó là thép vừa cắt, và cũng là chi tiết
// cần đọc được nhất trên thẻ sản phẩm — độ dày thành ống.
const finishes = {
  den: {
    front: '#78859a',
    top: '#414d5e',
    side: '#2c3644',
    bore: '#10151c',
    boreBottom: '#242c38',
    boreLeft: '#1a212b',
    edge: '#1f2b3a',
  },
  'ma-kem': {
    front: '#e3e9ef',
    top: '#a9b7c5',
    side: '#8593a3',
    bore: '#414d5b',
    boreBottom: '#6b7885',
    boreLeft: '#5a6674',
    edge: '#55616e',
  },
};

/** 4 sản phẩm: tiết diện vuông 200x200, chữ nhật 264x150 (tỷ lệ gần 40x80) */
const variants = [
  { file: 'thep-hop-vuong-den', finish: 'den', w: 200, h: 200, t: 17 },
  { file: 'thep-hop-vuong-ma-kem', finish: 'ma-kem', w: 200, h: 200, t: 17 },
  { file: 'thep-hop-chu-nhat-den', finish: 'den', w: 268, h: 148, t: 15 },
  { file: 'thep-hop-chu-nhat-ma-kem', finish: 'ma-kem', w: 268, h: 148, t: 15 },
];

const pt = (x, y) => `${Math.round(x * 100) / 100},${Math.round(y * 100) / 100}`;
const poly = (pts, fill, extra = '') =>
  `<polygon points="${pts.map(([x, y]) => pt(x, y)).join(' ')}" fill="${fill}"${extra}/>`;

function svgFor({ finish, w, h, t }) {
  const c = finishes[finish];
  // Căn khối (gồm cả phần lùi) vào giữa canvas
  const x0 = (W - (w + DX)) / 2;
  const y0 = (H - (h - DY)) / 2 - DY;

  const x1 = x0 + w;
  const y1 = y0 + h;
  // Lỗ rỗng (mặt trong ống)
  const hx = x0 + t;
  const hy = y0 + t;
  const hw = w - 2 * t;
  const hh = h - 2 * t;

  // Silhouette của lỗ khi đùn về sau — dùng làm clip cho phần lòng ống
  const boreHull = [
    [hx, hy + hh],
    [hx + hw, hy + hh],
    [hx + hw + DX, hy + hh + DY],
    [hx + hw + DX, hy + DY],
    [hx + DX, hy + DY],
    [hx, hy],
  ];

  const topFace = [
    [x0, y0],
    [x0 + DX, y0 + DY],
    [x1 + DX, y0 + DY],
    [x1, y0],
  ];
  const sideFace = [
    [x1, y0],
    [x1 + DX, y0 + DY],
    [x1 + DX, y1 + DY],
    [x1, y1],
  ];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f8fafc"/>
      <stop offset="1" stop-color="#dce5ee"/>
    </linearGradient>
    <radialGradient id="shadow" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#1f2b3a" stop-opacity=".26"/>
      <stop offset="1" stop-color="#1f2b3a" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="boreClip"><polygon points="${boreHull.map(([x, y]) => pt(x, y)).join(' ')}"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <ellipse cx="${x0 + (w + DX) / 2}" cy="${y1 + 26}" rx="${(w + DX) * 0.56}" ry="26" fill="url(#shadow)"/>

  <!-- vành đầu cây phía sau: lấp nền để không lộ khe sáng ở mép xa -->
  <rect x="${x0 + DX}" y="${y0 + DY}" width="${w}" height="${h}" fill="${c.boreLeft}"/>
  <!-- mặt hông phải -->
  ${poly(sideFace, c.side)}
  <!-- mặt trên -->
  ${poly(topFace, c.top)}

  <!-- lòng ống -->
  <g clip-path="url(#boreClip)">
    <rect x="${hx + DX}" y="${hy + DY}" width="${hw}" height="${hh}" fill="${c.bore}"/>
    ${poly(
      [
        [hx, hy + hh],
        [hx + hw, hy + hh],
        [hx + hw + DX, hy + hh + DY],
        [hx + DX, hy + hh + DY],
      ],
      c.boreBottom
    )}
    ${poly(
      [
        [hx, hy],
        [hx, hy + hh],
        [hx + DX, hy + hh + DY],
        [hx + DX, hy + DY],
      ],
      c.boreLeft
    )}
  </g>

  <!-- mặt cắt trước (thành ống) -->
  <path d="M${pt(x0, y0)} H${x1} V${y1} H${x0} Z M${pt(hx, hy)} V${hy + hh} H${hx + hw} V${hy} Z"
        fill="${c.front}" fill-rule="evenodd"/>

  <!-- viền cạnh -->
  <g fill="none" stroke="${c.edge}" stroke-width="2" stroke-linejoin="round" opacity=".85">
    <rect x="${x0}" y="${y0}" width="${w}" height="${h}"/>
    <rect x="${hx}" y="${hy}" width="${hw}" height="${hh}"/>
    <polygon points="${topFace.map(([x, y]) => pt(x, y)).join(' ')}"/>
    <polygon points="${sideFace.map(([x, y]) => pt(x, y)).join(' ')}"/>
    <polygon points="${boreHull.map(([x, y]) => pt(x, y)).join(' ')}"/>
  </g>
</svg>`;
}

const outDir = path.join('public', 'img', 'product', 'thep-hop');
fs.mkdirSync(outDir, { recursive: true });

for (const v of variants) {
  const svg = svgFor(v);
  const png = path.join(outDir, `${v.file}.png`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toFile(png);
  console.log(`wrote ${png}`);
}
