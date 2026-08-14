/**
 * Publishes new posts to dev.to and Hashnode with the portfolio page as the
 * canonical URL, so search ranking accrues to the site rather than the mirrors.
 *
 * Idempotent by design: .crosspost.json records every article ID ever created,
 * and a post whose slug is already present is skipped — re-running the workflow
 * can never double-publish. Each platform also fails independently, so a dev.to
 * outage does not block Hashnode, and a missing secret just skips that target.
 *
 * Env: DEVTO_API_KEY, HASHNODE_TOKEN, HASHNODE_PUBLICATION_ID (all optional).
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.join(import.meta.dirname, '..');
const POSTS_DIR = path.join(ROOT, 'posts');
const STATE_FILE = path.join(ROOT, '.crosspost.json');
const SITE = 'https://mohitparmarcoder.github.io/Personal-Portfolio-Mohit-Parmar/';

const { DEVTO_API_KEY, HASHNODE_TOKEN, HASHNODE_PUBLICATION_ID } = process.env;

let state = { posts: {} };
try {
  state = JSON.parse(await readFile(STATE_FILE, 'utf8'));
} catch {
  // First run: no state yet.
}

const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith('.md')).sort();
let published = 0;
let failed = 0;

for (const file of files) {
  const raw = await readFile(path.join(POSTS_DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const slug = data.slug ?? file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
  const canonical = `${SITE}writing/${slug}/`;
  const record = (state.posts[slug] ??= {});

  // The mirror closes with an explicit pointer home — also makes the canonical
  // relationship visible to readers, not only to crawlers.
  const body = `${content.trim()}\n\n---\n\n*Originally published on [my portfolio](${canonical}).*\n`;

  if (DEVTO_API_KEY && !record.devto) {
    try {
      const res = await fetch('https://dev.to/api/articles', {
        method: 'POST',
        headers: { 'api-key': DEVTO_API_KEY, 'content-type': 'application/json' },
        body: JSON.stringify({
          article: {
            title: data.title,
            published: true,
            body_markdown: body,
            canonical_url: canonical,
            description: data.summary,
            // dev.to caps tags at four and rejects hyphens.
            tags: (data.tags ?? []).slice(0, 4).map((t) => String(t).replaceAll('-', '')),
          },
        }),
      });
      if (!res.ok) throw new Error(`devto ${res.status}: ${(await res.text()).slice(0, 300)}`);
      record.devto = (await res.json()).id;
      published++;
      console.log(`devto: published ${slug} (id ${record.devto})`);
    } catch (err) {
      failed++;
      console.error(`devto: FAILED ${slug} — ${err.message}`);
    }
  }

  if (HASHNODE_TOKEN && HASHNODE_PUBLICATION_ID && !record.hashnode) {
    try {
      const res = await fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: { Authorization: HASHNODE_TOKEN, 'content-type': 'application/json' },
        body: JSON.stringify({
          query: `mutation Publish($input: PublishPostInput!) {
            publishPost(input: $input) { post { id url } }
          }`,
          variables: {
            input: {
              title: data.title,
              publicationId: HASHNODE_PUBLICATION_ID,
              contentMarkdown: body,
              originalArticleURL: canonical,
              subtitle: String(data.summary).slice(0, 250),
              tags: [],
            },
          },
        }),
      });
      const json = await res.json();
      if (!res.ok || json.errors) {
        throw new Error(`hashnode: ${JSON.stringify(json.errors ?? json).slice(0, 300)}`);
      }
      record.hashnode = json.data.publishPost.post.id;
      published++;
      console.log(`hashnode: published ${slug} (id ${record.hashnode})`);
    } catch (err) {
      failed++;
      console.error(`hashnode: FAILED ${slug} — ${err.message}`);
    }
  }
}

await writeFile(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`);

if (!DEVTO_API_KEY) console.log('devto: skipped — DEVTO_API_KEY not set');
if (!HASHNODE_TOKEN || !HASHNODE_PUBLICATION_ID) {
  console.log('hashnode: skipped — HASHNODE_TOKEN / HASHNODE_PUBLICATION_ID not set');
}
console.log(`crosspost: ${published} published, ${failed} failed`);

// A partial failure must not fail the job: successes are already recorded in
// the state file, and failing here would block the commit that saves them.
