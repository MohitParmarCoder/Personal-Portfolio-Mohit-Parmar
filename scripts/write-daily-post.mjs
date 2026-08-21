/**
 * Writes one post per day, unattended.
 *
 * The rules that matter live in content/calendar.md and content/voice.md, so
 * this script reads them at run time rather than restating them — editing those
 * files changes the output without touching code.
 *
 * Two invariants are enforced here in code rather than left to the prompt,
 * because a prompt can be talked out of them and a conditional cannot:
 *
 *   1. The honesty guardrail. Experience formats (challenge / learnings /
 *      ai-vs-human) require real source material — a note in content/notes.md or
 *      recent GitHub activity. With neither, the format is forced to `trending`
 *      before the model is ever asked. It cannot invent a war story it was never
 *      offered the option to invent.
 *   2. Frontmatter. The model returns content and metadata as JSON; this script
 *      assembles the frontmatter block itself, so malformed YAML is impossible
 *      by construction.
 *
 * Idempotent: a post already dated today means the job exits 0 having done
 * nothing, so re-runs and retries can never double-post.
 *
 * Env: GEMINI_API_KEY (or ANTHROPIC_API_KEY) required; GEMINI_MODEL,
 *      ANTHROPIC_MODEL, GITHUB_TOKEN, GITHUB_ACTOR, POST_TZ (IANA zone,
 *      default UTC), and for the work log either GOOGLE_SA_JSON + SHEET_ID
 *      (+ SHEET_RANGE) or SHEET_CSV_URL.
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createSign } from 'node:crypto';
import matter from 'gray-matter';

const ROOT = path.join(import.meta.dirname, '..');
const POSTS_DIR = path.join(ROOT, 'posts');
const CONTENT_DIR = path.join(ROOT, 'content');
const NOTES_FILE = path.join(CONTENT_DIR, 'notes.md');

const {
  GEMINI_API_KEY,
  GEMINI_MODEL = 'gemini-2.0-flash',
  ANTHROPIC_API_KEY,
  ANTHROPIC_MODEL = 'claude-opus-5',
  GITHUB_TOKEN,
  GITHUB_ACTOR = 'MohitParmarCoder',
  GOOGLE_SA_JSON,
  SHEET_ID,
  SHEET_RANGE = 'A:Z',
  SHEET_CSV_URL,
  POST_TZ = 'UTC',
} = process.env;

// Gemini first: its free tier covers one post a day many times over, which is
// what lets this pipeline run at no cost. Anthropic stays as an opt-in fallback
// for anyone who would rather pay for a different model.
const PROVIDER = GEMINI_API_KEY ? 'gemini' : ANTHROPIC_API_KEY ? 'anthropic' : null;

if (!PROVIDER) {
  console.error(
    'fatal: no model provider configured. Set GEMINI_API_KEY (free tier at ' +
      'aistudio.google.com) or ANTHROPIC_API_KEY.',
  );
  process.exit(1);
}

// Banned by content/voice.md. Checked mechanically so a draft that slips one
// through is rejected and rewritten rather than published.
const BANNED = [
  'in today\'s fast-paced world',
  'fast-paced world',
  'game-changer',
  'game changer',
  'delve',
  'unlock',
  'seamless',
  'leverage',
];

const KIND_BY_WEEKDAY = {
  Monday: 'trending',
  Tuesday: 'ai-vs-human',
  Wednesday: 'challenge',
  Thursday: 'trending',
  Friday: 'ai-vs-human',
  Saturday: 'learnings',
  Sunday: 'challenge',
};

const EXPERIENCE_KINDS = new Set(['challenge', 'learnings', 'ai-vs-human']);

/** Today in the configured zone, as YYYY-MM-DD plus a weekday name. */
function today() {
  const now = new Date();
  const date = new Intl.DateTimeFormat('en-CA', {
    timeZone: POST_TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
  const weekday = new Intl.DateTimeFormat('en-US', {
    timeZone: POST_TZ,
    weekday: 'long',
  }).format(now);
  return { date, weekday };
}

/**
 * Real material in the notes inbox, or ''. Everything above the `---` separator
 * is the file's own instructions, and HTML comments are the worked example —
 * neither is something Mohit actually wrote about his week.
 */
function extractNotes(raw) {
  const afterSeparator = raw.split(/^---$/m).slice(1).join('---');
  return (afterSeparator || '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();
}

async function recentGitHubActivity() {
  if (!GITHUB_TOKEN) return '';
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_ACTOR}/events/public?per_page=100`,
      {
        headers: {
          authorization: `Bearer ${GITHUB_TOKEN}`,
          accept: 'application/vnd.github+json',
          'user-agent': 'daily-post-writer',
        },
      },
    );
    if (!res.ok) throw new Error(`github ${res.status}`);
    const events = await res.json();

    // A fortnight is long enough to cover a quiet week without dredging up work
    // old enough that "recently" would be a lie.
    const cutoff = Date.now() - 14 * 24 * 60 * 60 * 1000;
    const lines = [];
    for (const event of events) {
      if (new Date(event.created_at).getTime() < cutoff) continue;
      const repo = event.repo?.name ?? 'unknown';
      if (event.type === 'PushEvent') {
        for (const commit of event.payload?.commits ?? []) {
          lines.push(`commit in ${repo}: ${commit.message.split('\n')[0]}`);
        }
      } else if (event.type === 'PullRequestEvent') {
        lines.push(
          `PR ${event.payload.action} in ${repo}: ${event.payload.pull_request?.title ?? ''}`,
        );
      } else if (event.type === 'IssuesEvent') {
        lines.push(`issue ${event.payload.action} in ${repo}: ${event.payload.issue?.title ?? ''}`);
      }
    }
    return [...new Set(lines)].slice(0, 60).join('\n');
  } catch (err) {
    // Thin activity is a normal outcome, not a failure — it just means the
    // guardrail falls back to a trending post.
    console.warn(`github activity unavailable: ${err.message}`);
    return '';
  }
}

/** Last 20 non-empty lines, so an old log cannot crowd out this week. */
function tidyRows(text) {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(-20)
    .join('\n');
}

/**
 * Mohit's work log. Two ways in, deliberately:
 *
 *   GOOGLE_SA_JSON + SHEET_ID  a service-account key. Nothing is public.
 *                              Preferred, because the log describes client work.
 *   SHEET_CSV_URL              File > Share > Publish to web > CSV. No auth at
 *                              all, but then anyone with the link can read it.
 *
 * An unreachable sheet is never fatal: it just means one less source of real
 * material, and the guardrail falls back to a trending post.
 */
async function workLogRows() {
  try {
    if (SHEET_CSV_URL) {
      const res = await fetch(SHEET_CSV_URL);
      if (!res.ok) throw new Error(`sheet csv ${res.status}`);
      return tidyRows(await res.text());
    }
    if (!GOOGLE_SA_JSON || !SHEET_ID) return '';

    // Service-account auth by hand rather than pulling in googleapis: it is a
    // signed JWT exchanged for an access token, and the whole dance is shorter
    // than the dependency's install footprint.
    const sa = JSON.parse(GOOGLE_SA_JSON);
    const now = Math.floor(Date.now() / 1000);
    const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
    const unsigned = `${b64({ alg: 'RS256', typ: 'JWT' })}.${b64({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })}`;
    const assertion = `${unsigned}.${createSign('RSA-SHA256')
      .update(unsigned)
      .sign(sa.private_key, 'base64url')}`;

    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }),
    });
    if (!tokenRes.ok) throw new Error(`google token ${tokenRes.status}`);
    const { access_token: token } = await tokenRes.json();

    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_RANGE)}`,
      { headers: { authorization: `Bearer ${token}` } },
    );
    if (!res.ok) throw new Error(`sheets ${res.status}`);
    const { values = [] } = await res.json();
    return tidyRows(values.map((row) => row.join(', ')).join('\n'));
  } catch (err) {
    console.warn(`work log unavailable: ${err.message}`);
    return '';
  }
}

/** Front-page Hacker News plus dev.to's top articles, as candidate topics. */
async function trendingCandidates() {
  const out = [];
  const sources = [];

  try {
    const res = await fetch('https://hn.algolia.com/api/v1/search?tags=front_page');
    if (!res.ok) throw new Error(`hn ${res.status}`);
    const json = await res.json();
    for (const hit of json.hits ?? []) {
      if (!hit.title) continue;
      out.push(`HN (${hit.points ?? 0} points): ${hit.title} — ${hit.url ?? 'no link'}`);
    }
    sources.push('https://hn.algolia.com/api/v1/search?tags=front_page');
  } catch (err) {
    console.warn(`hn unavailable: ${err.message}`);
  }

  try {
    const res = await fetch('https://dev.to/api/articles?top=1&per_page=30');
    if (!res.ok) throw new Error(`devto ${res.status}`);
    const json = await res.json();
    for (const article of json ?? []) {
      out.push(
        `dev.to (${article.positive_reactions_count ?? 0} reactions): ${article.title} — ${article.url} [${(article.tag_list ?? []).join(', ')}]`,
      );
    }
    sources.push('https://dev.to/api/articles?top=1&per_page=30');
  } catch (err) {
    console.warn(`dev.to unavailable: ${err.message}`);
  }

  return { candidates: out.join('\n'), sources };
}

/** The two most recent posts, so the model can avoid repeating itself. */
async function recentPosts() {
  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith('.md')).sort();
  const recent = files.slice(-2);
  const slugs = files.map((f) => f.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''));
  const summaries = [];
  for (const file of recent) {
    const { data, content } = matter(await readFile(path.join(POSTS_DIR, file), 'utf8'));
    summaries.push(
      `--- ${file}\ntitle: ${data.title}\nkind: ${data.kind}\nsummary: ${data.summary}\n\n${content.trim().slice(0, 1200)}`,
    );
  }
  return { summaries: summaries.join('\n\n'), slugs, files };
}

function buildPrompt({ kind, date, weekday, voice, calendar, notes, activity, workLog, candidates, recent }) {
  const material =
    kind === 'trending'
      ? `## Candidate topics from public feeds\n\nPick exactly ONE that genuinely matters to a React / Node / TypeScript / AWS full-stack developer. Write Mohit's practical take on it — never a summary of someone else's article. Link the sources you actually used. Never copy their wording.\n\n${candidates || '(feeds unavailable — write about a technology development you can state accurately and verifiably from your own knowledge, and link only to primary sources such as official release notes or repositories)'}`
      : `## Mohit's real material — the ONLY permissible basis for this post\n\n### Notes inbox\n${notes || '(empty)'}\n\n### Recent GitHub activity\n${activity || '(none found)'}\n\n### Daily work log\n${workLog || '(empty)'}\n\nEvery specific in the post must trace to the material above. Do not add a bug, client, project, colleague, or measurement that does not appear there. If the material will not support 700 words honestly, say so by returning kind "trending" and writing a trending post instead.`;

  return `You write the daily blog post for Mohit Parmar's developer portfolio. You are writing AS Mohit, in first person.

Today is ${weekday}, ${date}. The format for today is: ${kind}

# The voice guide — match this exactly
${voice}

# The posting calendar and its honesty guardrail
${calendar}

# The two most recent posts — do not repeat these topics, and do not reuse their slugs
${recent.summaries}

Slugs already taken: ${recent.slugs.join(', ')}

${material}

# Hard requirements

- Body between 500 and 900 words, markdown, no H1 (the site renders the title).
- Every technical claim must be verifiable and accurate. If you are unsure of a fact, leave it out. Invented benchmarks, invented error messages and invented version numbers are worse than a shorter post.
- Never use these words or phrases: ${BANNED.join(', ')}. No emoji. No hashtag blocks. No rhetorical-question opener. No "Conclusion" heading.
- Do not mention AI, language models, assistants, or how this post was produced — unless the format is ai-vs-human, which is explicitly about that comparison and should discuss it as a tool Mohit used.
- End with two or three plain sentences of takeaway, no heading.

# Output format

Return ONLY a single JSON object, no prose around it and no code fence:

{
  "kind": "trending | challenge | learnings | ai-vs-human — the format you actually wrote",
  "title": "specific and concrete, ideally with the real number or error in it",
  "slug": "lowercase-hyphenated, matches [a-z0-9-]+, unique against the taken list",
  "summary": "one or two sentences for the index page and RSS",
  "tags": ["three", "or-four", "lowercase-hyphen"],
  "sources": ["https://... every URL you referenced"],
  "usedNote": "the exact text of the note from the notes inbox you built this post on, or null if you used none",
  "body": "the full markdown body, no frontmatter, no H1"
}`;
}

/** Pulls the first JSON object out of a model's reply. */
function extractJson(text) {
  // Tolerate a stray code fence or a sentence of preamble rather than failing
  // the whole run over punctuation.
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1) {
    throw new Error(`no JSON object in response: ${text.slice(0, 300)}`);
  }
  return JSON.parse(text.slice(start, end + 1));
}

// The key goes in a header rather than the query string throughout, so it
// cannot leak into a redirect or into an error message that quotes the URL.
const geminiHeaders = { 'content-type': 'application/json', 'x-goog-api-key': GEMINI_API_KEY };

function geminiGenerate(model, prompt) {
  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: geminiHeaders,
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 8000,
        temperature: 0.7,
        responseMimeType: 'application/json',
      },
    }),
  });
}

/** Model names this key can actually call, newest-looking first. */
async function geminiModels() {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200', {
    headers: geminiHeaders,
  });
  if (!res.ok) {
    throw new Error(`gemini list-models ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  const json = await res.json();
  return (json.models ?? [])
    .filter((model) => (model.supportedGenerationMethods ?? []).includes('generateContent'))
    .map((model) => String(model.name ?? '').replace(/^models\//, ''))
    .filter(Boolean);
}

/**
 * Pick a stand-in for a model name the API no longer serves. Prefers the
 * highest-numbered plain `flash` — fast, cheapest on the free tier, and ample
 * for a thousand-word post — and prefers the short name over its dated preview
 * siblings, which are the ones that get retired.
 */
function pickGeminiModel(names) {
  const version = (name) => Number((name.match(/(\d+(?:\.\d+)?)/) ?? [0, 0])[1]);
  const general = names.filter(
    (name) => !/embedding|aqa|image|tts|live|vision|audio|thinking/.test(name),
  );
  const flash = general.filter((name) => name.includes('flash') && !name.includes('lite'));
  const pool = flash.length ? flash : general;
  return pool.sort((a, b) => version(b) - version(a) || a.length - b.length)[0] ?? null;
}

// Resolved once per process: the fallback costs an extra round trip, and the
// second and third calls of a run should not each pay it.
let geminiModel = null;

async function callGemini(prompt) {
  const wanted = geminiModel ?? GEMINI_MODEL;
  let res = await geminiGenerate(wanted, prompt);

  // Google retires free-tier model names on its own schedule, so a default that
  // worked last quarter 404s with the key perfectly valid. Ask the API what it
  // will serve rather than losing the day's post to a stale string.
  if (res.status === 404 && geminiModel === null) {
    const available = await geminiModels();
    const fallback = pickGeminiModel(available);
    if (!fallback) {
      throw new Error(
        `gemini has no usable model for this key (wanted "${wanted}"); ` +
          `it offers: ${available.join(', ') || 'nothing'}`,
      );
    }
    console.log(`model "${wanted}" is unavailable — falling back to "${fallback}"`);
    geminiModel = fallback;
    res = await geminiGenerate(fallback, prompt);
  }

  if (!res.ok) throw new Error(`gemini ${res.status}: ${(await res.text()).slice(0, 500)}`);
  geminiModel ??= wanted;

  const json = await res.json();
  const text = (json.candidates?.[0]?.content?.parts ?? []).map((part) => part.text ?? '').join('');
  if (!text) throw new Error(`gemini returned no text: ${JSON.stringify(json).slice(0, 300)}`);
  return extractJson(text);
}

async function callAnthropic(prompt) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`anthropic ${res.status}: ${(await res.text()).slice(0, 500)}`);
  const json = await res.json();
  const text = (json.content ?? [])
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('');
  return extractJson(text);
}

const generate = (prompt) => (PROVIDER === 'gemini' ? callGemini(prompt) : callAnthropic(prompt));

/** Returns a list of human-readable problems; empty means the draft is publishable. */
function validate(draft, { date, takenSlugs }) {
  const problems = [];
  for (const field of ['title', 'slug', 'summary', 'body', 'kind']) {
    if (!draft?.[field] || typeof draft[field] !== 'string') problems.push(`missing field "${field}"`);
  }
  if (problems.length) return problems;

  if (!/^[a-z0-9-]+$/.test(draft.slug)) problems.push(`slug "${draft.slug}" is not url-safe`);
  if (takenSlugs.includes(draft.slug)) problems.push(`slug "${draft.slug}" is already used`);

  const words = draft.body.trim().split(/\s+/).length;
  if (words < 700 || words > 1100) problems.push(`body is ${words} words, must be 700-1100`);

  if (/^#\s/m.test(draft.body)) problems.push('body contains an H1; the site renders the title');

  const haystack = `${draft.title} ${draft.summary} ${draft.body}`.toLowerCase();
  for (const word of BANNED) {
    if (haystack.includes(word)) problems.push(`uses banned word/phrase "${word}"`);
  }

  if (!Array.isArray(draft.tags) || draft.tags.length < 3 || draft.tags.length > 4) {
    problems.push('tags must be a list of 3 or 4');
  } else if (!draft.tags.every((t) => /^[a-z0-9-]+$/.test(t))) {
    problems.push('tags must be lowercase-hyphen');
  }

  if (!['trending', 'challenge', 'learnings', 'ai-vs-human'].includes(draft.kind)) {
    problems.push(`kind "${draft.kind}" is not a known format`);
  }

  if (draft.body.includes(`date: '${date}'`) || draft.body.trimStart().startsWith('---')) {
    problems.push('body must not contain frontmatter');
  }

  return problems;
}

/** YAML-safe single-quoted scalar. */
const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;

async function main() {
  const { date, weekday } = today();

  const existing = (await readdir(POSTS_DIR)).filter((f) => f.endsWith('.md'));
  if (existing.some((f) => f.startsWith(`${date}-`))) {
    console.log(`daily-post: a post for ${date} already exists — nothing to do`);
    return;
  }

  const [voice, calendar, notesRaw] = await Promise.all([
    readFile(path.join(CONTENT_DIR, 'voice.md'), 'utf8'),
    readFile(path.join(CONTENT_DIR, 'calendar.md'), 'utf8'),
    readFile(NOTES_FILE, 'utf8').catch(() => ''),
  ]);

  const notes = extractNotes(notesRaw);
  const scheduledKind = KIND_BY_WEEKDAY[weekday] ?? 'trending';

  // The guardrail, applied before the model is consulted.
  let kind = scheduledKind;
  let activity = '';
  let workLog = '';
  if (EXPERIENCE_KINDS.has(scheduledKind)) {
    [activity, workLog] = await Promise.all([recentGitHubActivity(), workLogRows()]);
    if (!notes && !activity && !workLog) {
      console.log(
        `daily-post: ${weekday} calls for "${scheduledKind}" but there is no real material — falling back to trending`,
      );
      kind = 'trending';
    }
  }

  const { candidates, sources: feedSources } =
    kind === 'trending' ? await trendingCandidates() : { candidates: '', sources: [] };
  const recent = await recentPosts();

  const basePrompt = buildPrompt({
    kind,
    date,
    weekday,
    voice,
    calendar,
    notes,
    activity,
    workLog,
    candidates,
    recent,
  });

  let draft;
  let problems = [];
  for (let attempt = 1; attempt <= 2; attempt++) {
    const prompt =
      attempt === 1
        ? basePrompt
        : `${basePrompt}\n\n# Your previous draft was rejected\n\nFix every one of these and return the corrected JSON object:\n${problems.map((p) => `- ${p}`).join('\n')}`;

    draft = await generate(prompt);
    problems = validate(draft, { date, takenSlugs: recent.slugs });
    if (!problems.length) break;
    console.warn(`daily-post: draft ${attempt} rejected —\n${problems.map((p) => `  - ${p}`).join('\n')}`);
  }

  if (problems.length) {
    console.error('daily-post: draft still invalid after a retry, publishing nothing');
    process.exit(1);
  }

  // The guardrail again, after the fact: the model may downgrade an experience
  // post to trending, but it may never upgrade its way into one.
  if (EXPERIENCE_KINDS.has(draft.kind) && !notes && !activity && !workLog) {
    console.error('daily-post: draft claims an experience format with no source material, refusing');
    process.exit(1);
  }

  const frontmatter = [
    '---',
    `title: ${quote(draft.title)}`,
    `date: ${quote(date)}`,
    `summary: ${quote(draft.summary)}`,
    `tags: [${draft.tags.join(', ')}]`,
    `kind: ${draft.kind}`,
    '---',
    '',
    '',
  ].join('\n');

  const file = path.join(POSTS_DIR, `${date}-${draft.slug}.md`);
  await writeFile(file, `${frontmatter}${draft.body.trim()}\n`);
  console.log(`daily-post: wrote posts/${date}-${draft.slug}.md (${draft.kind})`);

  // A used note is consumed in the same commit, so the inbox only ever holds
  // material that has not been written about yet.
  if (draft.usedNote && notes.includes(draft.usedNote.trim())) {
    const trimmed = notesRaw.replace(draft.usedNote.trim(), '').replace(/\n{3,}/g, '\n\n');
    await writeFile(NOTES_FILE, trimmed);
    console.log('daily-post: consumed the note it used from content/notes.md');
  }

  const allSources = [...new Set([...(draft.sources ?? []), ...feedSources])];
  console.log(`daily-post: sources — ${allSources.join(', ') || 'none'}`);
}

await main();