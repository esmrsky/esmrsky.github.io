# RU translation — progress

Translating esmrsky.github.io into Russian. English stays the default and the
source of truth; Russian is a **generated static page at its own URL**, same
markup, same layout, same design.

## The mechanism

Russian lives in `data-ru` / `data-ru-<attr>` attributes on the English markup.
`tools/build-ru.py` bakes those attributes into a real page:

    index.html            ->  ru/index.html            (/  ->  /ru/)
    ecclesia/index.html   ->  ecclesia/ru/index.html    (/ecclesia/ -> /ecclesia/ru/)

Run it with no arguments to rebuild everything, with a site name to rebuild one
(`python3 tools/build-ru.py ecclesia`), or `--check` to see drift without
writing. It is idempotent: a clean tree means the committed output matches the
English source.

What the generator does to each page:

1. Applies every `data-ru` to that element's inner HTML and every
   `data-ru-<attr>` to that attribute, then drops the `data-ru*` attributes.
   Nesting follows the browser: an outer `data-ru` wins over one inside it.
   Nodes in the SVG namespace are written as text, so diagram labels translate
   but markup characters stay escaped.
2. Drops the EN/RU toggle and both halves of the old i18n script, leaving a
   two-line stub that sets `window.esmrskyLang` and fires `esmrsky:lang`, so a
   page whose own JS renders strings still renders them in Russian.
3. Sets `<html lang="ru" data-lang="ru">`. `lang` is the real signal;
   `data-lang` stays because several pages hang CSS off it.
4. Rewrites internal links so Russian stays in Russian — `/` → `/ru/`,
   `/foo/` → `/foo/ru/` — but **only where a Russian page exists**. A link to a
   site not translated yet keeps pointing at the English one; a language switch
   beats a 404. A link the author spelled out by hand (`data-ru-href`) is left
   alone.
5. Rewrites *relative* asset paths to `../`, since the page moved down a level.
   This covers `href`/`src`/`srcset`/`poster`/… and `url()` inside `<style>`
   blocks and `style=""` attributes. Deliberately **not** `<base href>`: that
   would send every in-page `#anchor` to the base URL.
6. Adds the `<link rel="alternate" hreflang>` pair (plus `x-default`) to both
   sides, and points each generated page's `<link rel="canonical">` at itself.

The English page carries a plain text link — «Русский» — in that site's own nav
or footer; the Russian page carries the mirror, "English". Both are authored
once, in the English source, as

    <a class="lang-alt" href="/foo/ru/" lang="ru" hreflang="ru"
       data-ru="English" data-ru-href="/foo/" data-ru-lang="en"
       data-ru-hreflang="en">Русский</a>

so the generator produces the mirror for free. There is **no** redirect based on
`navigator.language`: the reader picks, and the URL remembers.

Rule of thumb: never put `data-ru` on an element whose content the page's own
JS rewrites — give the JS data object a parallel `ru` field instead.

## Translation approach

- Not literal. Register is warm, modern, accessible — the way a thoughtful
  Russian-speaking writer in their late 20s would actually phrase it, not a
  textbook and not a machine.
- Theological pages sit a little more measured than the psychology ones, but
  still contemporary, not archaic.
- **Quoted Bible verses are never translated by hand.** They come from a real
  published Russian translation, cited inline (`· СП`). See the decision below
  for why every quotation in this branch is Синодальный rather than НРП.

## Status

| Site | Status | Notes |
|---|---|---|
| `/` (hub `index.html`) | **done** | `/ru/`. 42 cards, filters, drawer. Titles localised (`Soundings` → «Промеры глубины», `Graded` → «Оценено», `Everything's Mid` → «Всё какое-то никакое», `Get Uncooked` → «Расклиниться»). Brand names left as-is. |
| `the-word` | **done** | `/the-word/ru/`. 8 quoted passages → Синодальный перевод. The NIV / NASB 2020 / TPT switcher has nothing to switch between in Russian, so on the RU side it collapses to a single «Синодальный» button (the other two are hidden by CSS) and the version note explains why. The five practice-lab scenarios are JS-rendered, so they got a parallel `scenariosRu` payload and re-render on `esmrsky:lang`. Psalm 119 → Пс. 118 and Psalm 77:11–12 → Пс. 76:12–13 for Synodal numbering. |
| `ecclesia` | **done** | `/ecclesia/ru/`. 10 quoted passages → Синодальный перевод (cited «· СП»). Ps 22:22 NIV = Пс. 21:23 SYNO — Russian citation and link use the Synodal reference. Ref chips are JS-rendered, so that JS now localises book abbreviations, renumbers the psalm, and switches Bible Gateway between NIV and SYNO. |
| `master-thread` | **done** | `/master-thread/ru/`. No scripture at all despite the hub card — the page is about epistemic restlessness. SVG diagram labels translate too (the shared script swaps `textContent` for SVG nodes). |
| `spirit-soul-body` | **done** | `/spirit-soul-body/ru/`. 510 translation units. ~20 quoted passages → Синодальный (cited «· СП»); Septuagint numbering throughout (Пс. 19→18, 46→45, 103→102, 127→126, 139→138) and 1 Kings → 3 Цар. Gal 5:22–23 and 5:19–21 use the Synodal word lists item for item. The hero layer-picker captions and the theme aria-label live in the page's JS, so that JS grew a parallel Russian payload keyed off `data-lang`. Relative font paths (`assets/fonts/*.woff2`, inside `url()` in a `<style>` block) are rewritten to `../` by the generator. |
| `fear-of-god-ii` | **done** | `/fear-of-god-ii/ru/`. 339 translation units. The English page offers NIV / NLT / NASB / TPT behind pills; Russian has one published translation in play, so the RU side collapses to a single «СП» pill (the other three hidden by CSS, as on `the-word`), the NIV slot carries the Синодальный text, and every footnote that discussed what NLT or TPT do with a word was rewritten to discuss what Синодальный does. The 47 scripture popovers are JS-rendered from a reference table keyed on English reference strings, so the RU side got a parallel `REFDATA_RU` with Russian abbreviations, Septuagint psalm numbering and Synodal text. Ис. 11:2 is a gift to this page: Синодальный follows the LXX and renders the first «страх Господень» as «благочестие» — the same word-swap the study is about, made by the translation itself. |
| `three-territories` | **done** | `/three-territories/ru/`. 336 translation units. Scripture is mostly referenced rather than quoted; the quoted phrases (1 Ин. 2:12–14, Евр. 5:14, Тит. 1:15, Еф. 4:14) are Синодальный, and Ps 51:6 becomes Пс. 50:8 in Synodal numbering. SVG map labels translate. The theme button writes its own label, so that JS follows `data-lang`. Two relative links to `.md` research reports are rewritten to `../` by the generator. |
| `soundings` | not started | **Read this before starting.** Only ~170 units live in the markup; the page renders almost everything from a ~76 KB JS data payload (`D` depths, `P` people, `J` journeys, `M` marshes, `MI`, `MAPS`, `ROWS`, `T`, `Q`, `READ`, plus label arrays `DL`, `FL`, `CV`, `VERD`, `SCALE`). Two `aria-label`s are built from template literals. So this one is mostly a JS job: give each array a parallel Russian payload selected by `data-lang`, per the rule of thumb above. Budget it like a page three times its markup size. |
| `where-are-you` | not started | Next in the queue after `soundings`. Not yet surveyed for JS-owned strings. |
| `atlas-v3` | not started | 90 scripture refs, ~105 KB. |
| `atlas-v2` | not started | 38 scripture refs, ~225 KB — largest page in the repo. |
| `one-shape` | not started | Multi-file (`js/`, `css/`, `data/`). |
| `anatomy-of-rest` | not started | 9 scripture refs. |
| `colour-of-middle-c` | **done** | `/colour-of-middle-c/ru/`. 219 markup units, 13 `data-nav` rail labels and 7 `aria-label`s. The page discusses Scripture's use of number but never quotes a verse — only references (Откр. 13:18, Ин. 21, 1 Пар.) — which is why it could be done while bolls was blocked. Its own JS writes a further ~25 strings that `data-ru` cannot reach: Newton's colour names, the two Fig. 01 captions, the transposition readout and its Гц/ТГц/нм units, the «✕ расходятся» column, the tuning-system row labels, and the canvas axis labels on Figs. 02 and 08. Those go through a `TR` table and an `L()` helper that is a no-op unless `data-lang="ru"`. Musical terms follow Russian convention (middle C → «до первой октавы», A=440 → «ля = 440»); researcher names and journal titles stay in Latin script, as Russian academic citation does. |
| `graded` | not started | |
| `measured` | **done** | `/measured/ru/`. Three Disguises. References scripture but never quotes it, so only the reference names needed localising (2 Cor 10:12, John 21:22, Eph 1:6, Prov 29:25, Zeph 3:17). SVG diagram labels translate. |
| `combo-stern` | not started | |
| `combo-stern-loop-love` | not started | Two HTML files + `app.js` + `glossary-data.js`. |
| `desire-master` | **done** | `/desire-master/ru/`. 84 translation units, all of them in the markup: the page's own JS only toggles classes and ARIA state, so nothing needed a parallel Russian payload. No scripture anywhere on the page, which is why it could be done while bolls was blocked. Register is the informal «ты» the essay's English second person asks for. Chalmers' phrase is given as «вытесняющая сила новой привязанности»; Chalmers and Keller keep their names. The mechanism switch, the five example tabs and all 35 scroll reveals were re-tested on the Russian page. |
| `architecture-of-desire` | not started | |
| `the-seeking-machine` | **done** | `/the-seeking-machine/ru/`. 187 markup units and 5 `aria-label`s. No scripture anywhere, so it was workable while bolls was blocked. Its four looping canvas figures draw ~16 labels from JS, which go through a `TR` table and a `TXT()` helper. **Named `TXT`, not `L`** — the figure-1 draw function already has a local `var L` (an animation phase), which shadowed a helper called `L` and threw «L is not a function» on both language sides. Worth remembering before adding an `L()` to any other page. Half those labels sit in object literals (`name:'…'`) and ternaries rather than direct call arguments, so grepping the call sites alone missed eight of them; the browser screenshot is what caught «RESOLVING…» still in English. Bibliographic citations keep their Latin-script author, journal and year. |
| `the-fixed-point` | **done** | `/the-fixed-point/ru/`. 87 markup units, 8 `aria-label`s, plus the 8 captions the interactive gauge writes through `say()` — those go in a `TR` table read by a `TXT()` helper wrapping `say()` itself, so the caption is translated at the point of display. The page reasons *about* Scripture (Екклесиаст, `hevel`, Павел, Августин) but quotes no verse: the one scriptural phrase, «глаз не насыщается тем, что видит» in unit 24, is unmarked and uncited in the English — the author's own clause, not a set-off quotation — so it is rendered as his sentence. **If you want it to match a published НРП wording of Еккл. 1:8, that is a one-line change and worth a look on the next run with bolls reachable.** |
| `predicting-mind` | **done** | `/predicting-mind/ru/`. 86 markup units, 7 `aria-label`s, 9 `data-nav` rail labels, and **77 strings owned by the page's JS** — the `EMO`, `RW` and `WEIRD` data arrays plus the stress-dial, trap-loop and default-mode captions. Those go through a `TR` table built by pairing the English keys re-extracted from the source, in a fixed order, against a Russian list by index, so a future edit to the string set trips the count assertion instead of silently mispairing. No scripture. **Note for the next page with an SVG diagram:** the generator writes SVG-namespace nodes as escaped *text*, so `data-ru` must go on each `<text>` element, never on a `<g>` wrapping it — the unit extractor now descends into SVG rather than treating a `<g>` as one unit. |
| `the-watches-of-the-night` | not started | |
| `the-weight-of-rest` | not started | |
| `two-hundred-milliseconds` | **done** | `/two-hundred-milliseconds/ru/`. 156 markup units, 2 `aria-label`s, and the 10 strings of the `readings` array that the delay meter writes (`TR` table + `TXT()`). No scripture. `200MS` stays as a brand name per the register rules; researcher names and journal titles stay Latin-script. Transcript lines keep their conversation-analysis notation — «A» / «Б» for the two speakers and `(0,2)` with a Russian decimal comma. |
| `bait-constellation` | not started | 37 glossary terms. |
| `everything-mid` | **done** | `/everything-mid/ru/`. Written entirely in lowercase, very online; the Russian keeps that register (lowercase headings, everyday internet Russian) — except the two quoted scriptures, which are Синодальный (Притчи 14:12, Ин. 4:14). Theme-button label localised to «ночь»/«день». |
| `coding-agents-guide` | not started | |
| `the-return` | **n/a** | Redirect stub: it bounces before paint, so a `/ru/` copy would be a URL nobody can reach. The generator skips it by name. Note its target `/the-return-new/` does not exist in this repo. |
| `the-return.html`, `index-old-return-backup.html` | **n/a** | Same as above — skipped. |

## Picking this up in a future session

1. Add `data-ru` to the English source — that file stays the source of truth —
   then run `python3 tools/build-ru.py <site>` to emit its `/ru` page. Commit
   both together.
2. The fastest safe way to edit a page is a small script that asserts each
   English source string exists exactly once before inserting its `data-ru`,
   so a silent miss is impossible. That is how every page here was done.
3. Test each page before committing: serve the repo (`python3 -m http.server`),
   load both the EN and the `/ru` URL, check the console is clean, check there
   is no horizontal overflow at 390px, and check that internal links from a
   `/ru` page land on other `/ru` pages. Test overflow by asking whether the
   page *can* be scrolled sideways, not by comparing `scrollWidth` —
   `three-territories` has a clipped marquee that inflates `scrollWidth` by
   32px while `body{overflow-x:hidden}` means nothing actually scrolls.
4. Rerun `python3 tools/build-ru.py` with no arguments at the end and check the
   tree is clean. Adding a new site changes the hub's Russian links, so a
   whole-repo rebuild is part of finishing.
5. Commit one page per commit and update the table above in the same commit.

## Decisions log

- **Russian has real URLs.** The floating EN/RU pill and its `localStorage`
  key are gone. Russian is `/<site>/ru/`, generated and committed, so it can be
  linked, shared, bookmarked and indexed. The pill also read as clutter on
  every page it floated over.
- **The link, not a pill.** One small text link in each site's existing nav or
  footer — «Русский» on the English side, "English" on the Russian side.
- **No `navigator.language` redirect.** A reader who asked for a URL gets that
  URL.
- **Links to untranslated sites stay English.** The generator only rewrites a
  link when the Russian target actually exists, so `/ru/` never links into a
  404. Those links start pointing at Russian automatically as each site lands.
- **Relative assets, not `<base href>`.** `<base>` would have been one line,
  but it retargets in-page `#anchor` links too, which every one of these pages
  depends on.
- **Brand/product names are not translated**: `esmrsky`, `Torac Champagne`,
  `Claude Code`, `Codex`, `APEST`, `NSDR`, `200MS`, `SoundLab`, `DAW`.
- **НРП still could not be used.** The task preferred Новый русский перевод.
  Every Bible host — biblegateway.com, bible.com, only.bible, bibleserver.com,
  bible.by, azbyka.ru, allbible.info — is blocked by this environment's egress
  proxy, so no НРП rendering could be verified against a primary source.
  Re-tested at the start of this session; still blocked, so quotations stay
  Синодальный.
  Rather than paraphrase scripture, quoted verses use the **Синодальный
  перевод**, which is public domain and was corroborated phrase-by-phrase
  via exact-phrase search corroboration before use. Citations read «· СП». If the owner
  wants НРП, the quotes are all in one place per page and easy to swap.
- **Psalm numbering.** Russian Bibles follow the Septuagint numbering, so
  NIV Psalm 22:22 is Пс. 21:23. Citations and links on the Russian side use
  the Russian numbering.
- **Register varies by page on purpose.** `everything-mid` is written entirely
  in lowercase, very online; its Russian matches that, including lowercase
  headings. `measured` is looser and more spoken. `ecclesia` and `the-word` are
  measured but still contemporary — not archaic, except inside the quotations.
- **Where a page's own JS owns a string**, the JS was changed rather than the
  markup: `ecclesia` localises its scripture-reference chips and swaps Bible
  Gateway between NIV and SYNO; `the-word` grew a parallel `scenariosRu`
  payload for the practice lab; theme-toggle labels on four pages now follow
  the language.
- **Pre-existing, untouched:** the hub links to 12 paths that have no folder in
  this repo (`/the-thread/`, `/the-loop/`, `/uncooked/`, `/broken-cistern/`,
  `/be-filled/`, `/the-atlas/`, `/loop-atlas/`, `/feedback-loops/`,
  `/how-to-teach/`, `/code-school/`, `/quick-faraday/`,
  `/happy-heisenberg/`, `/soundlab-mixing-academy/`, `/Fake-Love/`,
  `/the-return-new/`). Their cards are translated on the hub anyway, but the
  pages themselves aren't in the repo to translate. Also note `the-return.html`
  redirects to `/the-return-new/`, which doesn't exist — the folder present is
  `the-return/`. Flagging, not fixing: out of scope for this change.
