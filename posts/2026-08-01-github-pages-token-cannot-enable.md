---
title: 'GITHUB_TOKEN cannot enable GitHub Pages — and neither error tells you that'
date: '2026-08-01'
summary: >-
  My Pages deploy failed twice with two different errors that both pointed
  nowhere. The real cause: the default Actions token is not allowed to create a
  Pages site, and the fix lives in a settings screen, not in the workflow.
tags: [github-actions, github-pages, ci-cd, devops]
kind: challenge
---

While deploying my portfolio to GitHub Pages with GitHub Actions, the very first run
failed at `actions/configure-pages@v5` with:

```
Get Pages site failed. Please verify that the repository has Pages enabled
and configured to build using GitHub Actions ... Error: Not Found
```

The message suggests a misconfigured workflow. It isn't. It means the Pages *site
itself* does not exist yet — nothing in the repository ever created it.

## The trap: `enablement: true`

The action has an input that sounds like the exact fix:

```yaml
- uses: actions/configure-pages@v5
  with:
    enablement: true
```

This fails too, with a different but equally unhelpful error:

```
Create Pages site failed. Error: Resource not accessible by integration
```

"Resource not accessible by integration" is GitHub's way of saying the token you are
using does not have the permission this API call needs. And here is the part that is
genuinely not obvious: **no permission you can grant in the workflow file fixes it.**
Creating a Pages site is a repository-administration operation, and the automatic
`GITHUB_TOKEN` can never administer the repository — by design, no matter what you put
under `permissions:`.

The `enablement` input only works with a personal access token or a GitHub App token.
For a personal project, wiring one up just for this is not worth it.

## The actual fix — thirty seconds, in a browser

**Settings → Pages → Build and deployment → Source → GitHub Actions.**

That is the entire fix. It creates the Pages site once, and from then on the standard
workflow — `configure-pages` → `upload-pages-artifact` → `deploy-pages` — works with the
default token forever.

Two extra details that cost me time:

- **A private repository on a free account cannot serve Pages at all.** Public repo, or
  a paid plan. The errors will not tell you this either.
- **The GitHub mobile app has no Settings screen.** If you are doing this from a phone,
  you need the browser, and probably "desktop site" mode.

## What I took from it

When a CI error says "Not Found" about a resource your workflow is supposed to *create*,
ask whether creating it is an admin operation. The default Actions token deliberately
cannot administer the repository that runs it — a good security boundary that produces
two of the most misleading error messages I have hit this year.
