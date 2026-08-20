/**
 * Renders posts/*.md into static pages under dist/writing/ and an RSS feed.
 *
 * Runs after `vite build`, so dist/ already exists. The pages are plain HTML
 * with their own inline CSS on the site's design tokens — they must not
 * reference the hashed Vite bundle, whose filename changes every build.
 *
 * Frontmatter contract (crosspost.yml and the daily writer rely on it):
 *   title    required
 *   date     required, YYYY-MM-DD
 *   summary  required — becomes the RSS description and the index blurb
 *   tags     optional string list
 *   kind     optional: trending | ai-vs-human | challenge | learnings
 *   slug     optional, defaults to the filename without its date prefix
 *   cover    optional; defaults to covers/<slug>.png when that file exists.
 *            Generate one with `node scripts/make-cover.mjs <slug>`.
 */

import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

const BASE = process.env.BASE_PATH ?? '/Personal-Portfolio-Mohit-Parmar/';
const ORIGIN = 'https://mohitparmarcoder.github.io';
const SITE = `${ORIGIN}${BASE}`;

const ROOT = path.join(import.meta.dirname, '..');
const POSTS_DIR = path.join(ROOT, 'posts');
const OUT = path.join(ROOT, 'dist');

const esc = (s) =>
  String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

const rfc822 = (d) => new Date(`${d}T09:00:00+05:30`).toUTCString();

const human = (d) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

async function loadPosts() {
  let files;
  try {
    files = await readdir(POSTS_DIR);
  } catch {
    return []; // No posts yet — still emit an empty index and feed.
  }

  const posts = [];
  for (const file of files.filter((f) => f.endsWith('.md')).sort()) {
    const raw = await readFile(path.join(POSTS_DIR, file), 'utf8');
    const { data, content } = matter(raw);

    for (const key of ['title', 'date', 'summary']) {
      if (!data[key]) throw new Error(`${file}: missing required frontmatter "${key}"`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) {
      throw new Error(`${file}: date must be YYYY-MM-DD`);
    }

    const slug =
      data.slug ??
      file
        .replace(/\.md$/, '')
        .replace(/^\d{4}-\d{2}-\d{2}-/, '');
    if (!/^[a-z0-9-]+$/.test(slug)) throw new Error(`${file}: slug "${slug}" is not url-safe`);

    // A committed cover wins; otherwise fall back to the shared site card so
    // social previews are never blank.
    const coverFile = data.cover ?? `covers/${slug}.png`;
    const hasCover = await access(path.join(ROOT, 'public', coverFile)).then(
      () => true,
      () => false,
    );

    posts.push({
      cover: hasCover ? coverFile : null,
      slug,
      title: String(data.title),
      date: String(data.date),
      summary: String(data.summary),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      // Tables need their own scroll container so long rows never widen the page.
      html: marked
        .parse(content, { async: false })
        .replaceAll('<table>', '<div class="table-wrap"><table>')
        .replaceAll('</table>', '</table></div>'),
      url: `${SITE}writing/${slug}/`,
    });
  }

  const seen = new Set();
  for (const p of posts) {
    if (seen.has(p.slug)) throw new Error(`duplicate slug "${p.slug}"`);
    seen.add(p.slug);
  }

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/* The shell shares the site's tokens. Dark is the default to match the main
   page; a saved toggle choice from the SPA is honoured via localStorage so
   the two halves of the site never disagree. */
const SHELL_CSS = `
:root{--font-display:'Space Grotesk','Inter',-apple-system,sans-serif;--font-sans:'Inter',-apple-system,'Segoe UI',Roboto,sans-serif;--indigo:#6366f1;--violet:#8b5cf6;--cyan:#22d3ee;--gradient:linear-gradient(110deg,var(--indigo),var(--violet) 45%,var(--cyan))}
:root,:root[data-theme='dark']{--bg:#070a16;--panel:rgba(255,255,255,.035);--border:rgba(255,255,255,.1);--text:#eef1fb;--text-muted:#a3abc7;--accent-text:#a5b4fc;--code-bg:rgba(255,255,255,.07)}
:root[data-theme='light']{--bg:#f7f8fd;--panel:rgba(255,255,255,.8);--border:rgba(28,32,68,.12);--text:#10132b;--text-muted:#4d5474;--accent-text:#4338ca;--code-bg:rgba(28,32,68,.07)}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--text);font-family:var(--font-sans);line-height:1.7;font-size:17px;-webkit-font-smoothing:antialiased}
.wrap{max-width:760px;margin:0 auto;padding:2.2rem 1.4rem 5rem}
.top{display:flex;justify-content:space-between;align-items:center;gap:1rem;margin-bottom:3rem}
.top a{color:var(--text-muted);text-decoration:none;font-size:.95rem}
.top a:hover,.top a:focus-visible{color:var(--text)}
.top a:focus-visible{outline:2px solid var(--indigo);outline-offset:3px;border-radius:4px}
.brand{font-family:var(--font-display);font-weight:600;color:var(--text)!important}
h1{font-family:var(--font-display);font-size:clamp(1.7rem,5vw,2.4rem);line-height:1.2;letter-spacing:-.01em;margin:0 0 .6rem;text-wrap:balance}
h2{font-family:var(--font-display);font-size:1.35rem;margin:2.2rem 0 .7rem}
h3{font-size:1.05rem;margin:1.8rem 0 .5rem}
.meta{color:var(--text-muted);font-size:.92rem;margin:0 0 2.4rem}
article p{margin:0 0 1.1rem}
article a{color:var(--accent-text)}
article ul,article ol{padding-left:1.3rem;margin:0 0 1.1rem}
article li{margin-bottom:.35rem}
article img{max-width:100%;height:auto;border-radius:10px}
article blockquote{margin:0 0 1.1rem;padding:.2rem 0 .2rem 1.1rem;border-left:3px solid var(--indigo);color:var(--text-muted)}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:.88em;background:var(--code-bg);padding:.12em .38em;border-radius:5px}
pre{background:var(--code-bg);border:1px solid var(--border);border-radius:10px;padding:1rem 1.2rem;overflow-x:auto;margin:0 0 1.1rem}
pre code{background:none;padding:0;font-size:.85rem;line-height:1.65}
.table-wrap{overflow-x:auto;margin:0 0 1.1rem}
article table{border-collapse:collapse;font-size:.92rem;min-width:100%}
article th,article td{text-align:left;padding:.5rem .8rem;border-bottom:1px solid var(--border)}
article th{color:var(--text-muted);font-weight:600;white-space:nowrap}
.hero{width:100%;height:auto;border-radius:14px;border:1px solid var(--border);margin:0 0 2rem;display:block}
.thumb{width:100%;height:auto;aspect-ratio:1200/630;object-fit:cover;border-radius:10px;border:1px solid var(--border);display:block}
.tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:2.5rem}
.tag{font-size:.78rem;color:var(--text-muted);border:1px solid var(--border);border-radius:999px;padding:.25rem .7rem}
.card{display:grid;grid-template-columns:210px 1fr;gap:1.2rem;align-items:start;border:1px solid var(--border);background:var(--panel);border-radius:14px;padding:1.3rem 1.4rem;margin-bottom:1rem;text-decoration:none;color:var(--text)}
.card--plain{grid-template-columns:1fr}
@media(max-width:620px){.card{grid-template-columns:1fr;gap:.9rem}}
.card:hover{border-color:var(--indigo)}
.card:focus-visible{outline:2px solid var(--indigo);outline-offset:3px}
.card h2{margin:0 0 .35rem;font-size:1.2rem}
.card .meta{margin:0 0 .5rem}
.card p{margin:0;color:var(--text-muted);font-size:.95rem}
.grad{background:var(--gradient);-webkit-background-clip:text;background-clip:text;color:transparent}
footer{margin-top:4rem;padding-top:1.4rem;border-top:1px solid var(--border);color:var(--text-muted);font-size:.9rem}
footer a{color:var(--accent-text)}
`;

const THEME_SCRIPT = `
(function(){try{var t=localStorage.getItem('mp-portfolio-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}})();
`;

function shell({ title, description, canonical, body, image }) {
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="dark light">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="author" content="Mohit Parmar">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/png" href="${BASE}favicon.png">
<link rel="alternate" type="application/rss+xml" title="Mohit Parmar — Writing" href="${SITE}rss.xml">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image ?? `${SITE}og-image.jpg`}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${image ?? `${SITE}og-image.jpg`}">
<script>${THEME_SCRIPT}</script>
<style>${SHELL_CSS}</style>
</head>
<body>
<div class="wrap">
<nav class="top" aria-label="Site">
<a class="brand" href="${BASE}">Mohit Parmar</a>
<span><a href="${BASE}writing/">Writing</a> · <a href="${BASE}#contact">Contact</a></span>
</nav>
${body}
<footer>
<p>Mohit Parmar — Senior Full Stack Developer, Ahmedabad.
<a href="${BASE}">Portfolio</a> · <a href="https://github.com/MohitParmarCoder">GitHub</a> ·
<a href="https://www.linkedin.com/in/mohitparmar9868">LinkedIn</a> ·
<a href="${SITE}rss.xml">RSS</a></p>
</footer>
</div>
</body>
</html>
`;
}

function postPage(post) {
  return shell({
    title: `${post.title} — Mohit Parmar`,
    description: post.summary,
    canonical: post.url,
    image: post.cover ? `${SITE}${post.cover}` : undefined,
    body: `
<article>
${post.cover ? `<img class="hero" src="${BASE}${post.cover}" alt="" width="1200" height="630">` : ''}
<h1>${esc(post.title)}</h1>
<p class="meta">${human(post.date)} · Mohit Parmar</p>
${post.html}
${post.tags.length ? `<div class="tags">${post.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
</article>`,
  });
}

function indexPage(posts) {
  const cards = posts
    .map(
      (p) => `
<a class="card${p.cover ? '' : ' card--plain'}" href="${BASE}writing/${p.slug}/">
${p.cover ? `<img class="thumb" src="${BASE}${p.cover}" alt="" width="1200" height="630" loading="lazy">` : ''}
<div>
<h2>${esc(p.title)}</h2>
<p class="meta">${human(p.date)}</p>
<p>${esc(p.summary)}</p>
</div>
</a>`,
    )
    .join('\n');

  return shell({
    title: 'Writing — Mohit Parmar',
    description:
      'Notes from production: React, Node.js, TypeScript, AWS, and AI-assisted development.',
    canonical: `${SITE}writing/`,
    body: `
<h1><span class="grad">Writing</span></h1>
<p class="meta">Notes from real work — what broke, what fixed it, and what it taught me.</p>
${cards || '<p>First post coming soon.</p>'}`,
  });
}

function rss(posts) {
  const items = posts
    .slice(0, 25)
    .map(
      (p) => `
  <item>
    <title>${esc(p.title)}</title>
    <link>${p.url}</link>
    <guid isPermaLink="true">${p.url}</guid>
    <pubDate>${rfc822(p.date)}</pubDate>
    <description>${esc(p.summary)}</description>
  </item>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Mohit Parmar — Writing</title>
  <link>${SITE}writing/</link>
  <atom:link href="${SITE}rss.xml" rel="self" type="application/rss+xml"/>
  <description>Notes from production by Mohit Parmar — full stack development, React, Node.js and AI-assisted workflows.</description>
  <language>en</language>
  <lastBuildDate>${posts[0] ? rfc822(posts[0].date) : new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>
`;
}

const posts = await loadPosts();

await mkdir(path.join(OUT, 'writing'), { recursive: true });
await writeFile(path.join(OUT, 'writing', 'index.html'), indexPage(posts));
await writeFile(path.join(OUT, 'rss.xml'), rss(posts));

for (const post of posts) {
  const dir = path.join(OUT, 'writing', post.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), postPage(post));
}

console.log(`blog: ${posts.length} post(s) → writing/, rss.xml`);
