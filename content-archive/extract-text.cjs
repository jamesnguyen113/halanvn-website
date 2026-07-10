// Strip each archived HTML page to readable text for content migration reference
const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'html');
const outDir = path.join(__dirname, 'text');
fs.mkdirSync(outDir, { recursive: true });

for (const f of fs.readdirSync(htmlDir)) {
  let html = fs.readFileSync(path.join(htmlDir, f), 'utf8');
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const desc = (html.match(/<meta name="description" CONTENT="([^"]*)"/i) || [])[1] || '';
  // isolate central content column if present (CMS wraps page content in .box-content / colInfo blocks)
  let body = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  // keep img refs so we know which image belongs to which section
  body = body.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, ' [IMG: $1] ');
  body = body
    .replace(/<(br|\/p|\/div|\/td|\/tr|\/h[1-6]|\/li)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
  const lines = body
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  const out = `TITLE: ${title}\nDESC: ${desc}\n---\n${lines.join('\n')}\n`;
  fs.writeFileSync(path.join(outDir, f.replace(/\.html$/, '') + '.txt'), out);
  console.log(`${f} -> ${lines.length} lines`);
}
