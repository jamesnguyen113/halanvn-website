// GitHub Pages has no server-side redirects, so emit a static meta-refresh +
// canonical page for every old CMS URL listed in public/_redirects.
// (On Cloudflare Pages the _redirects file takes precedence, so both hosts work.)
import fs from 'node:fs';
import path from 'node:path';

const rules = fs
  .readFileSync('public/_redirects', 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#') && !l.includes('*'))
  .map((l) => l.split(/\s+/));

let n = 0;
for (const [from, to] of rules) {
  const target = `https://halanvn.com${to}`;
  const rel = from.replace(/^\//, '') + (from.endsWith('/') ? 'index.html' : '');
  const out = path.join('public', rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(
    out,
    `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<title>Đã chuyển trang</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0;url=${target}">
<script>location.replace(${JSON.stringify(target)})</script>
</head><body><p>Trang đã chuyển tới <a href="${target}">${target}</a>.</p></body></html>\n`
  );
  n++;
}
console.log(`generated ${n} redirect pages under public/`);
