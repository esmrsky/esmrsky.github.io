# Learn mode — plan

A graduation-cap switch in every page's top bar. When it's on, a page stops being
something you read once and starts asking you things. This file is the plan for
taking it site-wide. Nothing here is built yet except the pilot.

**Status (2026-10-13):** piloted on `/feels-like-learning/`. Not on any other page.

## Why

The hub already argues that retrieval beats rereading. Throughline says "clean
transmission is a trap"; The Whole's Learning & Making door says "retrieval and
correction actually change the learner." But almost every page is a read-once
explanation. Learn mode makes the format do what the pages say.

The model is Matuschak & Nielsen's mnemonic medium (Quantum Country): an essay
with its questions built in, and those questions coming back days and weeks later.

## What the reader gets

1. **Checkpoints.** Three to five questions at the ends of sections. You answer
   (typing is optional), then reveal. *Built in the pilot.*
2. **Close it and explain it.** At the end of the page: a recall box, the page's
   own key ideas to tick off, and a copyable prompt for an AI to grade the summary
   against the page. *Built in the pilot.*
3. **Review queue.** Checkpoints you miss, or flag, come back on a schedule
   (1, 3, 7, 14, 30, 60 days). They surface as a "Due for review" card on the
   homepage and on a `/review/` page that mixes questions from every page.
   *Not built.*

When the switch is off, checkpoints and the review prompts disappear and the page
reads straight through.

## How the pilot works (reuse this)

- Switch: `button#learnToggle.tog.learn` in `.topbar`, `aria-pressed`, cap icon
  from an inline `<symbol id="i-cap">`.
- State: `localStorage['esmrsky-learn']` = `'on' | 'off'`, read in a tiny inline
  `<head>` script that sets `html[data-learn="off"]` before first paint. Same
  pattern and site-wide scope as `esmrsky-theme`.
- CSS: `html[data-learn="off"] .checkpoint { display: none; }`
- Markup: `aside.checkpoint[data-cp]` holds `.cp-q`, an optional `textarea.cp-a`,
  a `[data-cp-reveal]` button, and a hidden `.cp-ans`.
- Every storage call is wrapped in try/catch; the page works fully without storage.

## Architecture for site-wide

- **Shared files**, like `assets/scripture-popover.js`:
  `assets/learn-mode.js` and `assets/learn-mode.css`. The script adds the cap
  button to `.topbar`, wires checkpoints, and writes the review queue. Pages
  without a `.topbar` get a small fixed button instead.
- **Per-page data**, so most pages need no markup surgery: an inline
  `<script type="application/json" id="learn-data">`:

  ```json
  {
    "page": "how-not-eating-works",
    "title": "How Not Eating Works",
    "checkpoints": [
      { "id": "hnew-1", "after": "#mech", "q": "…", "a": "…" }
    ],
    "keyIdeas": ["…", "…"]
  }
  ```

  The script inserts each checkpoint after the element `after` points to. Pages
  that hand-write `.checkpoint` markup, like the pilot, keep working.
- **Review queue:** `localStorage['esmrsky-review']`, keyed by checkpoint id:
  `{ page, q, a, due, step, lapses }`. "Got it" moves to the next interval;
  "Missed" goes back to day 1. Fixed expanding intervals are enough for a few dozen
  cards. Revisit FSRS only if the queue grows into the hundreds.
- **No backend.** The queue lives in one browser. Offer export/import as JSON so
  it can move between devices.

## Rollout

| Phase | What | Size |
|---|---|---|
| 0 | Pilot on Feels Like Learning: switch, key, checkpoints, close-it | **done** |
| 1 | Move the pilot code into `assets/learn-mode.{js,css}` and switch the pilot page over to it, which proves the shared version | small |
| 2 | Write checkpoints and key ideas for five pages: Throughline, How Not Eating Works, The curves under the stages, Salvation, The Word | mostly writing |
| 3 | Review queue, homepage "Due for review" card, `/review/` page | medium |
| 4 | Remaining pages in grid order; a small cap badge on homepage cards that have learn mode | ongoing |

## Writing the questions

- Ask for production: "why does…", "what would happen if…", "say X in one
  sentence". Avoid "which of these" questions.
- One idea per question; the answer fits in one to three sentences.
- Ask about the argument, not trivia. No dates or names unless the page is about them.
- Answers come from the page's own text, so grading against the page is fair.
- The closing questions mix sections (interleaving) instead of following page order.
- Scripture pages ask about the reading and the reasoning. A verse-memory mode
  (Most Best Verses is the obvious candidate) is a separate feature.

## Open decisions

1. **Default for first-time visitors.** The pilot defaults to on, with a note under
   the masthead saying how to turn it off. Recommendation: on for pages that have
   checkpoints.
2. **Russian.** English-only at first, or translate checkpoints with each page?
   `build-ru.py` would need to learn the `learn-data` JSON (a parallel `ru` field
   per question).
3. **Pages with no checkpoints yet.** Hide the cap, or show it disabled? Recommendation: hide.
