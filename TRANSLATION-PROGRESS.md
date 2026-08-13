# RU translation — progress

Adding a working EN/RU toggle to every page on esmrsky.github.io and translating
the human-readable content into Russian. English stays the default; RU is an
overlay on the same markup, same layout, same design.

## The mechanism (one pattern, used everywhere)

Every page gets, inlined and self-contained — no shared file, no CDN, matching
how these sites are already built:

1. `<html lang="en" data-lang="en">`
2. A tiny head script that reads `localStorage['esmrsky-lang']` before first
   paint (same shape as the existing `esmrsky-theme` script).
3. An `EN / RU` pill button (`#langToggle`), styled from each site's own tokens
   and parked next to that site's theme toggle if it has one.
4. A ~40-line foot script that swaps `innerHTML` on every `[data-ru]` element.
   The English original **stays in the markup** and is captured into `data-en`
   at load, so nothing is duplicated by hand and EN is always the source of
   truth. Attributes translate through `data-ru-title`, `data-ru-aria-label`,
   `data-ru-placeholder`, `data-ru-alt`, `data-ru-content`.
5. `<title>` and `<meta name="description">` are translated too.
6. The script fires a `esmrsky:lang` event on `document` and sets
   `window.esmrskyLang`, so a site whose own JS renders strings can re-render
   in the right language instead of being swapped behind its back.

Rule of thumb: never put `data-ru` on an element whose content the page's own
JS rewrites — give the JS data object a parallel `ru` field instead.

## Translation approach

- Not literal. Register is warm, modern, accessible — the way a thoughtful
  Russian-speaking writer in their late 20s would actually phrase it, not a
  textbook and not a machine.
- Theological pages sit a little more measured than the psychology ones, but
  still contemporary, not archaic.
- **Quoted Bible verses are never translated by hand.** They come from a real
  published Russian translation: НРП (Новый русский перевод) where available,
  Синодальный перевод as the fallback, cited inline as `(Ин. 1:1, НРП)` /
  `(Ин. 1:1, СП)`.

## Status

| Site | Status | Notes |
|---|---|---|
| `/` (hub `index.html`) | **done** | 42 cards, filters, drawer. Titles localised (`Soundings` → «Промеры глубины», `Graded` → «Оценено», `Everything's Mid` → «Всё какое-то никакое», `Get Uncooked` → «Расклиниться»). Brand names left as-is. |
| `the-word` | not started | 11 scripture refs. Site already switches verses between NIV / NASB 2020 / TPT — RU side needs НРП. |
| `ecclesia` | **done** | 10 quoted passages → Синодальный перевод (cited «· СП»). Ps 22:22 NIV = Пс. 21:23 SYNO — Russian citation and link use the Synodal reference. Ref chips are JS-rendered, so that JS now localises book abbreviations and switches Bible Gateway between NIV and SYNO. |
| `master-thread` | **done** | No scripture at all despite the hub card — the page is about epistemic restlessness. SVG diagram labels translate too (the shared script swaps `textContent` for SVG nodes). |
| `spirit-soul-body` | not started | 21 scripture refs. |
| `fear-of-god-ii` | not started | 79 scripture refs — longest study on the site. |
| `three-territories` | not started | 15 scripture refs. |
| `soundings` | not started | 15 scripture refs. |
| `where-are-you` | not started | 19 scripture refs. |
| `atlas-v3` | not started | 90 scripture refs, ~105 KB. |
| `atlas-v2` | not started | 38 scripture refs, ~225 KB — largest page in the repo. |
| `one-shape` | not started | Multi-file (`js/`, `css/`, `data/`). |
| `anatomy-of-rest` | not started | 9 scripture refs. |
| `colour-of-middle-c` | not started | |
| `graded` | not started | |
| `measured` | not started | Three Disguises. |
| `combo-stern` | not started | |
| `combo-stern-loop-love` | not started | Two HTML files + `app.js` + `glossary-data.js`. |
| `desire-master` | not started | |
| `architecture-of-desire` | not started | |
| `the-seeking-machine` | not started | |
| `the-fixed-point` | not started | |
| `predicting-mind` | not started | |
| `the-watches-of-the-night` | not started | |
| `the-weight-of-rest` | not started | |
| `two-hundred-milliseconds` | not started | |
| `bait-constellation` | not started | 37 glossary terms. |
| `everything-mid` | not started | |
| `coding-agents-guide` | not started | |
| `the-return` | not started | Redirect stub only, two sentences. |
| `the-return.html`, `index-old-return-backup.html` | not started | Root-level redirect stubs. |

## Decisions log

- **Toggle placement.** Left of the existing theme toggle where one exists, so
  the two read as one control cluster; otherwise top-right on its own.
- **Persistence** is shared across the whole domain (one `esmrsky-lang` key),
  so picking RU on the hub carries into every sub-site.
- **Brand/product names are not translated**: `esmrsky`, `Torac Champagne`,
  `Claude Code`, `Codex`, `APEST`, `NSDR`, `200MS`, `SoundLab`, `DAW`.
- **НРП could not be used.** The task preferred Новый русский перевод. Every
  Bible host — biblegateway.com, bible.com, only.bible, bibleserver.com,
  bible.by, azbyka.ru, allbible.info — is blocked by this environment's egress
  proxy, so no НРП rendering could be verified against a primary source.
  Rather than paraphrase scripture, quoted verses use the **Синодальный
  перевод**, which is public domain and was corroborated phrase-by-phrase
  through search результатов before use. Citations read «· СП». If the owner
  wants НРП, the quotes are all in one place per page and easy to swap.
- **Psalm numbering.** Russian Bibles follow the Septuagint numbering, so
  NIV Psalm 22:22 is Пс. 21:23. Citations and links on the Russian side use
  the Russian numbering.
- **Pre-existing, untouched:** the hub links to 12 paths that have no folder in
  this repo (`/the-thread/`, `/the-loop/`, `/uncooked/`, `/broken-cistern/`,
  `/be-filled/`, `/the-atlas/`, `/loop-atlas/`, `/feedback-loops/`,
  `/how-to-teach/`, `/code-school/`, `/quick-faraday/`,
  `/happy-heisenberg/`, `/soundlab-mixing-academy/`, `/Fake-Love/`,
  `/the-return-new/`). Their cards are translated on the hub anyway, but the
  pages themselves aren't in the repo to translate. Also note `the-return.html`
  redirects to `/the-return-new/`, which doesn't exist — the folder present is
  `the-return/`. Flagging, not fixing: out of scope for this change.
