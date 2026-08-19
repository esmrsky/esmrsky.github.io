# RU translation routine

The operating procedure for the Russian translation pass. **State** lives in
`TRANSLATION-PROGRESS.md`; this file is the *how*. Kept in the repo so a cloud routine
can read it — it is the single source of truth, and the local `/translate-ru` skill just
points here.

Unattended-capable. Designed to be fired at ~3 AM and reviewed in the morning.

**Read `TRANSLATION-PROGRESS.md` first, every run** — it carries the generator mechanism,
the status table and the per-page notes.

All paths below are relative to this repo root. Nothing outside this repo is in scope.

## Standing decisions (set 2026-08-19, do not re-litigate)

1. **НРП, not Синодальный.** bolls.life carries `NRT` = Новый русский Перевод. The old
   egress block that forced СП does not apply to bolls. All quoted scripture is НРП,
   cited «· НРП».
2. **No language button.** The `.lang-alt` anchor is gone from both sides. Russian is
   reached by typing `/ru/`. No `navigator.language` redirect. Do not reintroduce a
   toggle, pill, or link — it was removed on purpose.
3. **The RU grid shows only translated sites.** A card whose Russian target does not
   exist is dropped from the Russian homepage, not linked to its English page.
4. **Hub only.** `live-linked/*` standalone repos (Convergence Atlas, The Loop, Loop
   Atlas) are out of scope until the consolidation question in `STATUS.md` is settled.
   If the queue reaches one, skip it and note why.
5. **Work the queue until it is done.** Do not stop after one page. Stop only on the
   conditions below.

## Priority queue

Work top to bottom. Skip anything already marked **done** in the progress table.

1. `twelve`
2. `atlas-v3` (The Mirror)
3. `atlas-v2` — largest page in the repo (~225 KB), budget accordingly
4. `desire-master`
5. `architecture-of-desire`
6. `most-best-verses`
7. everything else in the progress table, in table order

Already done: `/`, `the-word`, `ecclesia`, `master-thread`, `spirit-soul-body`,
`fear-of-god-ii`, `three-territories`, `measured`, `everything-mid`.

## Step 1 of every run — the bolls egress probe

Before any other work, test that scripture is actually fetchable from wherever this run is
executing:

    curl -s --max-time 25 https://bolls.life/get-text/NRT/43/3/

Expect JSON with John 3 verses; verse 16 should read «Ведь Бог так полюбил этот мир…».
This matters because the environment differs by runner. From the user's Mac, bolls is
reachable — verified 2026-08-19. From a cloud sandbox it may not be: the previous pass
recorded that *every* Bible host was blocked by an egress proxy, which is what forced
Синодальный in the first place.

**If the probe fails:** do not abort, and do not paraphrase scripture from memory under any
circumstances. Instead:

- Skip Phase 1 (the НРП retrofit) entirely.
- Skip every page in the queue that quotes scripture.
- Do Phase 0 and any scripture-free pages.
- State the block at the top of the final report, with the exact error, so the next run
  knows whether to retry.

Re-probe once mid-run if the first attempt failed — transient proxy failures happen.

## Phase 0 — mechanism, before any new page

Run once. If the tree already reflects these, say so and move on.

- **Fix the hub RU drift.** The Most Best Verses card in `index.html` has no `data-ru`
  at all; Twelve and atlas-v3 have theirs. Add the missing one, then rebuild.
- **Strip `.lang-alt`.** Remove the anchor from the 9 English sources. The generator
  produces the Russian mirror from it, so removing the source removes both sides.
  Rebuild and confirm no `lang-alt` survives anywhere.
- **Teach `tools/build-ru.py` to filter the grid.** On the Russian homepage only, drop
  every `.bento-card` whose href has no corresponding `/ru/` page, and update the
  filter-button set and any visible counts to match what is left. The grid is 4 columns
  with `span-2-1`, `span-2-2`, `span-1-2` and `span-3-1` cards, split between a main grid
  and an `#otherGrid` drawer. Dropping cards breaks the cell-count balance, so
  **rebalance the spans of what remains** rather than leaving holes. With fewer than ~12
  cards left, collapse the drawer entirely and put everything in the main grid.
  This filter must be derived at build time from which `/ru/` pages exist — never a
  hand-maintained list, or it goes stale the first time a page lands.

## Phase 1 — НРП retrofit

Six shipped pages quote Синодальный: `the-word` (8 passages), `ecclesia` (10),
`spirit-soul-body` (~20), `fear-of-god-ii` (47 popovers via `REFDATA_RU`),
`three-territories` (4), `everything-mid` (2).

For each: swap quoted text to НРП, change every «· СП» citation to «· НРП», and rework
any footnote that reasons about what Синодальный does with a word — several of those
observations are about СП specifically and become false under НРП.

**One known casualty:** `fear-of-god-ii` leans on Ис. 11:2, where Синодальный follows the
LXX and renders the first «страх Господень» as «благочестие» — the page treats that as
the translation making its own argument. Check what НРП does there. If НРП does not
reproduce the swap, that passage keeps СП with an inline note explaining why, rather than
silently losing the point. Do not delete the argument.

Also revisit the collapsed version pills on `the-word` and `fear-of-god-ii`. They collapse
to a single button because Russian had one translation in play; bolls carries SYNOD, NRT,
RBS2, BTI and Десницкий, so a real Russian switcher is now possible. Flag it as a follow-up —
do not build it inside a translation run.

## Bible rules

- Fetch from `https://bolls.life/get-text/NRT/<bookId>/<chapter>/`. Book IDs are standard
  1–66 (Psalms 19, John 43). Response is JSON per verse.
- **Strip the markup.** Verse text carries `<b>`, `<i>` and footnote markers. Clean them
  before insertion.
- **Psalm numbering: verify, never assume.** bolls indexes NRT with Septuagint numbering —
  `NRT/19/22/` returns «Господь — Пастырь мой», i.e. Hebrew Psalm 23. Existing pages
  already renumber (Пс. 19→18, 22→21, 46→45, 103→102, 127→126, 139→138). Confirm each
  reference by reading the verse you got back, not by arithmetic.
- Quoted scripture is **never** translated by hand. If bolls cannot serve a passage, leave
  the English page's reference untranslated and note it — do not paraphrase.

## Per-page protocol

1. Survey first. Count translation units in markup **and** find strings owned by the
   page's own JS. Never put `data-ru` on an element the page's JS rewrites — give the JS
   data object a parallel `ru` field instead. Pages like `soundings` are mostly a JS job.
2. Add `data-ru` / `data-ru-<attr>` to the **English** source. It stays the source of truth.
3. Edit via a script that asserts each English source string exists **exactly once**
   before inserting its `data-ru`. A silent miss must be impossible. This is how every
   page in the table was done.
4. `python3 tools/build-ru.py <site>`
5. Test: serve with `python3 -m http.server`, load EN and `/ru`, console clean, no
   horizontal overflow at 390px, internal links from `/ru` land on other `/ru` pages.
   Test overflow by asking whether the page *can* scroll sideways — not by comparing
   `scrollWidth`. `three-territories` has a clipped marquee that inflates `scrollWidth`
   by 32px while nothing actually scrolls.
6. Commit the English source and the generated page **together**, one page per commit,
   updating the progress table in the same commit.
7. Move to the next page.

## Register

Warm, modern, accessible — how a thoughtful Russian-speaking writer in their late 20s
would phrase it. Not literal, not a textbook, not machine output. Theological pages sit
a little more measured than the psychology ones; still contemporary, not archaic.
Match each page's own voice: `everything-mid` is all-lowercase and very online, and its
Russian stays that way. Brand names are never translated: `esmrsky`, `Torac Champagne`,
`Claude Code`, `Codex`, `APEST`, `NSDR`, `200MS`, `SoundLab`, `DAW`.

## Finishing a run

- `python3 tools/build-ru.py` with no arguments, confirm the tree is clean. Adding a site
  changes the hub's Russian links, so a whole-repo rebuild is part of finishing.
- Push, then **verify against the live URL, not the local file** — hub pushes publish in
  seconds. Hash the live bytes against local.
- Update the progress table so the next run picks up cleanly.

## Stop conditions

Stop, leave the tree clean, and write up what happened if:

- The same page fails twice. Do not run a third variation — note why and move on to the
  next page in the queue.
- bolls.life is unreachable or returns junk. Scripture-free pages can continue; anything
  quoting scripture waits.
- `build-ru.py --check` reports drift you did not cause.
- A page needs a design decision — a collapsed switcher, a layout that breaks in Russian,
  an argument that depends on an English wordplay with no Russian equivalent. Flag it,
  skip the page, keep going.

## Reporting

End every run with: pages completed, pages skipped and why, commits pushed, live URLs
verified, and anything left for a human. Say plainly if a run got less far than intended —
a short honest run is fine, a padded report is not.
