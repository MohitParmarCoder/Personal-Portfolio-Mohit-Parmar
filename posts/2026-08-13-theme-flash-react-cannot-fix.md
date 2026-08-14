---
title: 'The flash of wrong theme, and why React alone cannot fix it'
date: '2026-08-13'
summary: >-
  I made my portfolio default to dark on laptops and light on phones. Deciding
  the theme inside React guarantees a flash of the wrong one — the fix is a
  blocking inline script, and a MutationObserver to prove the flash is gone.
tags: [react, javascript, css, dark-mode, performance]
kind: challenge
---

I wanted my portfolio to open dark on a laptop and light on a phone — phones are mostly
read in daylight, where a light theme works harder. The logic is one line. Putting that
line in the right *place* is the entire problem.

## Why the React version is wrong before it runs

The obvious implementation decides in a hook:

```tsx
const [theme] = useState(() =>
  window.matchMedia('(max-width: 900px)').matches ? 'light' : 'dark',
);
```

By the time any of this executes, the browser has already parsed the HTML, applied the
default theme's CSS and **painted it**. React then mounts, decides differently, and the
page visibly snaps from dark to light. Every phone visit, every time. This is not a React
flaw — it is the order of operations: first paint happens before hydration, so any
decision made in a component is a decision made too late.

## The fix: decide before the first paint

A small blocking `<script>` in `<head>` runs before the browser paints anything:

```html
<script>
  (function () {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (e) {}
    var theme =
      saved === 'light' || saved === 'dark'
        ? saved
        : matchMedia('(max-width: 900px)').matches ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
  })();
</script>
```

Then the React hook **reads the result back** instead of deciding again:

```tsx
const [theme, setTheme] = useState<Theme>(() => {
  const applied = document.documentElement.dataset.theme;
  return applied === 'light' || applied === 'dark' ? applied : 'dark';
});
```

One decision, one place; the component is a consumer of it.

Three details that matter more than they look:

- **Pick the breakpoint your layout already uses.** Mine flips at 900px because that is
  where the nav collapses — theme and layout change together, not at two arbitrary widths.
- **Do not persist the default.** My first version saved the resolved theme on mount,
  which froze whatever the first visit happened to be — a laptop that once loaded in a
  narrow window stayed light forever. Only an explicit toggle should be saved.
- **Update `<meta name="theme-color">` too**, or a light page sits under a navy browser
  status bar on the phone.

## Proving the flash is actually gone

"Looks fine to me" is not evidence — a flash can be a single frame. I attached a
`MutationObserver` to `data-theme` in Playwright before loading the page, on a laptop
viewport and on Pixel and iPhone profiles. The assertion: the attribute never holds the
wrong value at any point, not merely ends up correct. Thirteen checks across device
profiles, saved-preference overrides and the toggle — all green before it shipped.

The pattern generalises: anything the user must never see wrongly — theme, language,
authentication state — has to be decided in blocking code before first paint, with the
framework reading the answer rather than computing its own.
