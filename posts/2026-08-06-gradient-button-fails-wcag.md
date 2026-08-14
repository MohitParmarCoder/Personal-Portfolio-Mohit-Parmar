---
title: 'Your gradient button probably fails WCAG — mine hit 1.81:1'
date: '2026-08-06'
summary: >-
  Contrast checkers test one colour pair. A gradient is an infinite number of
  pairs, and my indigo-to-cyan button passed at one end while failing badly at
  the other. The fix was a second gradient reserved for filled surfaces.
tags: [accessibility, css, wcag, design-systems]
kind: challenge
---

My portfolio uses an indigo → violet → cyan gradient on headline words and primary
buttons. It looks sharp. It also quietly failed accessibility, and no tool told me.

## Why checkers miss it

WCAG AA wants 4.5:1 contrast between text and its background. Every contrast checker
takes **one** foreground and **one** background colour. But white text on a gradient
does not have one background — it has every colour along the ramp.

So I computed the ratio at each gradient stop instead of eyeballing it:

| Gradient stop | White text contrast | AA (4.5:1) |
| --- | --- | --- |
| Indigo `#6366f1` | 4.6:1 | pass |
| Violet `#8b5cf6` | 3.9:1 | fail |
| Cyan `#22d3ee` | **1.81:1** | fail badly |

At the cyan end, white-on-cyan is nearly invisible to low-vision users — and this was
the *call-to-action button*. Worse, the hover state shifted the gradient toward cyan, so
the button got less readable exactly when someone showed intent to click it.

## The fix: two gradients with different jobs

The display gradient is a brand asset; the button background is a legibility surface.
Those are different jobs, so they got different ramps:

```css
:root {
  /* Headline words only — never carries text on top of it. */
  --gradient: linear-gradient(110deg, #6366f1, #8b5cf6 45%, #22d3ee);

  /* Filled surfaces carrying white text. Every stop clears 4.5:1. */
  --gradient-solid: linear-gradient(110deg, #4f46e5, #7c3aed);
}
```

The display gradient survives untouched where it is safe — clipped *into* text with
`background-clip: text`, where the text is the gradient rather than sitting on it. The
solid ramp goes everywhere white text sits on a fill. Visually the two read as the same
brand; mathematically only one of them ever carries text.

## The habit worth keeping

If a design uses gradients under text, check the ratio **at every stop, in every
state** — including hover — with a script, not a screenshot. It is ten lines of
relative-luminance maths, and it catches the failure the single-pair checkers are
structurally unable to see.
