// Parse product detail pages into structured JSON for the new site's data layer
const fs = require('fs');
const path = require('path');

const slugs = [
  'ton-ma-kem', 'ton-ma-mau', 'ton-lanh', 'ton-nhom', 'ton-9-song-vuong',
  'ton-9-song-doi-song-kep', 'ton-5-song-vuong', 'ton-cliplock', 'ton-song-vom',
  'ton-song-ngoi', 'ton-do-san', 'ton-cach-nhiet-pe', 'ton-pu', 'tui-khi-cach-nhiet',
  'xa-go-thep-chu-c', 'xa-go-thep-chu-z', 'phoi-thep-ma-kem', 'phoi-thep-den', 'sat-thep-xay-dun',
];

const strip = (s) =>
  s.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();

const out = [];
for (const slug of slugs) {
  const f = path.join(__dirname, 'html', `vn_${slug}.html`);
  if (!fs.existsSync(f)) { console.log('MISSING', slug); continue; }
  const html = fs.readFileSync(f, 'utf8');
  const h1 = strip((html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [, ''])[1]);
  // spec rows: label before ":" pattern in colInfo blocks
  const specs = {};
  const specRe = /<td[^>]*class="colInfo1"[^>]*>([\s\S]*?)<\/td>\s*<td[^>]*class="colInfo2"[^>]*>\s*:\s*<\/td>\s*<td[^>]*class="colInfo2"[^>]*>([\s\S]*?)<\/td>/gi;
  let m;
  while ((m = specRe.exec(html))) {
    const k = strip(m[1]); const v = strip(m[2]);
    if (k && v && k !== 'Lượt xem') specs[k] = v;
  }
  // short description
  const shortM = html.match(/Mô tả ngắn<\/[^>]+>([\s\S]*?)(?:BẢNG GIÁ|Mô tả chi tiết|<div class="tab")/i);
  const short = shortM ? strip(shortM[1]).slice(0, 500) : '';
  // detail description block: <div id="Info" class="tab"> ... <div id="Option"
  const detailM = html.match(/<div id="Info" class="tab"[^>]*>([\s\S]*?)<div id="Option"/i);
  const detailHtml = detailM ? detailM[1] : '';
  const detail = detailHtml
    .split(/<\/p>|<br[^>]*>/i)
    .map((p) => strip(p))
    .filter((p) => p && p.length > 2)
    .slice(0, 30);
  // gallery images (product uploads, full-size not thumbs)
  const imgs = [...new Set(
    [...html.matchAll(/(?:src|href)="((?:https?:\/\/halanvn\.com)?\/vnt_upload\/product\/[^"]+\.(?:jpg|jpeg|png|gif))"/gi)]
      .map((x) => x[1].replace(/^https?:\/\/halanvn\.com/, ''))
      .filter((x) => !x.includes('/thumbs/'))
  )];
  out.push({ slug, name: h1, specs, short, detail, images: imgs });
  console.log(slug, '| detail paras:', detail.length, '| imgs:', imgs.length);
}
fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(out, null, 2));
