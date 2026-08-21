/**
 * Renders a 1200x630 cover image for a post: `node scripts/make-cover.mjs <slug>`
 * (no slug renders every post that is missing one).
 *
 * Runs at AUTHORING time, not build time, and the PNG is committed. Generating
 * these in CI would mean downloading Chromium on every deploy — minutes added to
 * a job that currently takes fifteen seconds, for an image that never changes
 * once written.
 *
 * The card is drawn from the site's own tokens so a feed of them reads as one
 * brand. Type is a system sans: this environment has no Space Grotesk and cannot
 * reach Google Fonts, so matching the site exactly would mean committing the
 * .woff2 files and embedding them here as base64.
 */

import { mkdir, readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { chromium } from 'playwright';

const ROOT = path.join(import.meta.dirname, '..');
const POSTS = path.join(ROOT, 'posts');
const OUT = path.join(ROOT, 'public', 'covers');

const KIND_LABEL = {
  trending: 'Trending',
  'ai-vs-human': 'AI vs Human',
  challenge: 'Problem solved',
  learnings: 'What I learned',
};

const esc = (s) =>
  String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/** Long titles need to step down a size or they overflow the card. */
const titleSize = (t) => (t.length > 78 ? 52 : t.length > 55 ? 60 : 70);

function card({ title, kind, tags }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;overflow:hidden;
  font-family:'DejaVu Sans','Liberation Sans',sans-serif;
  background:#070a16;color:#eef1fb;position:relative}
/* Same indigo glow the site uses behind the hero. */
.glow{position:absolute;width:900px;height:900px;border-radius:50%;
  background:radial-gradient(circle,rgba(99,102,241,.30),transparent 62%);
  top:-380px;right:-260px}
.glow2{position:absolute;width:760px;height:760px;border-radius:50%;
  background:radial-gradient(circle,rgba(34,211,238,.16),transparent 62%);
  bottom:-420px;left:-200px}
.grid{position:absolute;inset:0;
  background-image:linear-gradient(rgba(255,255,255,.032) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,.032) 1px,transparent 1px);
  background-size:64px 64px}
.rule{position:absolute;top:0;left:0;right:0;height:8px;
  background:linear-gradient(110deg,#6366f1,#8b5cf6 45%,#22d3ee)}
.wrap{position:relative;height:100%;display:flex;flex-direction:column;
  justify-content:space-between;padding:74px 76px 64px}
.eyebrow{font-size:20px;letter-spacing:3.5px;text-transform:uppercase;
  color:#a5b4fc;font-weight:700}
h1{font-size:${titleSize(title)}px;line-height:1.14;letter-spacing:-1px;
  font-weight:700;max-width:1010px}
.tags{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap}
.tag{font-size:19px;color:#a3abc7;border:1px solid rgba(255,255,255,.16);
  border-radius:999px;padding:7px 18px}
.foot{display:flex;align-items:center;justify-content:space-between;
  border-top:1px solid rgba(255,255,255,.12);padding-top:26px}
.who{font-size:25px;font-weight:700}
.role{font-size:19px;color:#a3abc7;margin-top:4px}
.site{font-size:19px;color:#a5b4fc}
</style></head><body>
<div class="glow"></div><div class="glow2"></div><div class="grid"></div>
<div class="rule"></div>
<div class="wrap">
  <div>
    <p class="eyebrow">${esc(KIND_LABEL[kind] ?? 'Notes from production')}</p>
    <h1 style="margin-top:22px">${esc(title)}</h1>
    <div class="tags">${tags.slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
  </div>
  <div class="foot">
    <div>
      <div class="who">Mohit Parmar</div>
      <div class="role">Senior Full Stack Developer</div>
    </div>
    <div class="site">mohitparmarcoder.github.io</div>
  </div>
</div></body></html>`;
}

const exists = (p) => access(p).then(() => true, () => false);

const wanted = process.argv[2];
const files = (await readdir(POSTS)).filter((f) => f.endsWith('.md')).sort();
await mkdir(OUT, { recursive: true });

// This sandbox ships a Chromium at a fixed path; a GitHub runner does not, and
// there `npx playwright install chromium` puts one where Playwright can find it
// on its own. Use the pinned binary only when it is actually there.
const PINNED = '/opt/pw-browsers/chromium';
const launchOptions = (await access(PINNED).then(() => true, () => false))
  ? { executablePath: PINNED }
  : {};
const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
let made = 0;

for (const file of files) {
  const { data } = matter(await readFile(path.join(POSTS, file), 'utf8'));
  const slug = data.slug ?? file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  if (wanted && slug !== wanted) continue;

  const out = path.join(OUT, `${slug}.png`);
  if (!wanted && (await exists(out))) continue; // never redo an existing cover

  await page.setContent(
    card({
      title: String(data.title),
      kind: data.kind,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    }),
    { waitUntil: 'load' },
  );
  await page.screenshot({ path: out });
  console.log(`cover: ${slug}.png`);
  made++;
}

await browser.close();
console.log(`covers: ${made} written`);
if (wanted && made === 0) {
  console.error(`no post found with slug "${wanted}"`);
  process.exit(1);
}
