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
| `the-word` | **done** | `/the-word/ru/`. 8 quoted passages → **НРП** (retrofitted 2026-08-19). The NIV / NASB 2020 / TPT switcher has nothing to switch between in Russian, so on the RU side it collapses to a single «НРП» button (the other two are hidden by CSS) and the version note explains why. The five practice-lab scenarios are JS-rendered, so they got a parallel `scenariosRu` payload and re-render on `esmrsky:lang`. Psalm 119 → Пс. 118 and Psalm 77:11–12 → Пс. 76:12–13 for Synodal numbering. |
| `ecclesia` | **done** | `/ecclesia/ru/`. 10 quoted passages → **НРП** (cited «· НРП»), retrofitted from Синодальный 2026-08-19. Ps 22:22 NIV = Пс. 21:23 — НРП keeps Septuagint psalm numbering on both bolls and Bible Gateway, so the renumbering already in place stayed correct. Ref chips are JS-rendered, so that JS localises book abbreviations, renumbers the psalm, and switches Bible Gateway between NIV and **NRT**. The licensing prose had to change with the text: Синодальный is public domain, НРП is Biblica's, so both sides now cite under the same permission. |
| `master-thread` | **done** | `/master-thread/ru/`. No scripture at all despite the hub card — the page is about epistemic restlessness. SVG diagram labels translate too (the shared script swaps `textContent` for SVG nodes). |
| `spirit-soul-body` | **done** | `/spirit-soul-body/ru/`. 510 translation units. 23 quoted passages → **НРП** (cited «· НРП», retrofitted 2026-08-19); Septuagint numbering throughout (Пс. 19→18, 46→45, 103→102, 127→126, 139→138) and 1 Kings → 3 Цар. Gal 5:22–23 and 5:19–21 use the Synodal word lists item for item. The hero layer-picker captions and the theme aria-label live in the page's JS, so that JS grew a parallel Russian payload keyed off `data-lang`. Relative font paths (`assets/fonts/*.woff2`, inside `url()` in a `<style>` block) are rewritten to `../` by the generator. |
| `fear-of-god-ii` | **done** | `/fear-of-god-ii/ru/`. 339 translation units. **Stays on Синодальный on purpose** — see the decision log; its footnotes argue about Синодальный's own word choices. The English page offers NIV / NLT / NASB / TPT behind pills; Russian has one published translation in play, so the RU side collapses to a single «СП» pill (the other three hidden by CSS, as on `the-word`), the NIV slot carries the Синодальный text, and every footnote that discussed what NLT or TPT do with a word was rewritten to discuss what Синодальный does. The 47 scripture popovers are JS-rendered from a reference table keyed on English reference strings, so the RU side got a parallel `REFDATA_RU` with Russian abbreviations, Septuagint psalm numbering and Synodal text. Ис. 11:2 is a gift to this page: Синодальный follows the LXX and renders the first «страх Господень» as «благочестие» — the same word-swap the study is about, made by the translation itself. |
| `three-territories` | **done** | `/three-territories/ru/`. 336 translation units. Scripture is mostly referenced rather than quoted; the quoted phrases (1 Ин. 2:12–14, Евр. 5:14, Тит. 1:15, Еф. 4:14) are **НРП** (retrofitted 2026-08-19), and Ps 51:6 becomes Пс. 50:8 — НРП keeps the Septuagint numbering, so the reference was already right. Two of the four phrases are word-for-word identical in both translations and were left untouched. SVG map labels translate. The theme button writes its own label, so that JS follows `data-lang`. Two relative links to `.md` research reports are rewritten to `../` by the generator. |
| `soundings` | **done** | `/soundings/ru/`, November 5, 2026. 141 markup units (12 SVG `<text>` labels among them). Every JS-rendered string is Russian in `soundings/ru-data.js` (`window.SoundingsRU`, inert `text/x-ru` on the English page): the page script calls `RU.put(name, target)` right after each const (D, P, VERD, DL, FL, J, M, KIND, MAPS, COLS, ROWS, T, Q, SCALE, READ, DRAG), which merges by index and key and throws on any length, key or number mismatch, and a final `RU.done()` throws if a block went unused. About 35 inline UI strings (both template-literal `aria-label`s, band labels, the chart focus lines, advisories) moved into a `U` table; the chart's `/WALL/` test became `/WALL|СТЕНА/`. Scripture is **НРП** from bolls: Иез. 47:11, every verse fragment in the traces and marsh quotes, Ps 42:5 → Пс. 41:6, Psalm 51 → Псалом 50. The quiz's boundary rule was walked in Russian. Book titles on the source cards stay Latin-script. |
| `where-are-you` | **done** | `/where-are-you/ru/`, November 5, 2026. 121 markup units. All JS-rendered text is in `where-are-you/ru-data.js` (`window.WhereAreYouRU`, inert `text/x-ru`): `RU.put` after U, POS, FW, SRC, KINDS, Q, SAY, then `RU.done()`; ~20 inline strings moved into a `U` table. Scripture is НРП, 18 quotations; the three blocked words from 1 Ин. 2:12–14 are НРП «дети / юноши / отцы»; Ps 34/88/127 → Пс. 33/87/126. Source titles stay Latin-script. Below 480px the header's color dots step aside for the switch (English too). The Barna link is still wrong, as on the English page. |
| `atlas-v3` | **done** | `/atlas-v3/ru/`, November 5, 2026. 82 markup units; everything the page renders from JS (MIRRORS, FRUIT, WORKS, COR13, DOORS, DOOR_NOTES, TRINITY, CREED, badge names, web nodes and edges, renderer UI words) is Russian in `atlas-v3/ru-data.js`, loaded on the English page as an inert `text/x-ru` script that the generator turns on, and it throws on any id or length mismatch. 189 quotes from 120 passages are **НРП**, each checked against the bolls verse by script; «· KJV» becomes «· НРП», and the Text/Mirror/Map badges and every edge's tier are unchanged. Psalms are LXX-numbered (16:11→15:11, 23:6→22:6, 34:8→33:9, 115:8→113:16, 37:11→36:11, Psalm 91→90). НРП drops «adultery» and «murders» from Gal 5:19–21 (15 works, not 17); the Russian keeps «семнадцать» and says so. Eph 5:9 is «плод света» in НРП, so the «same fruit word» claim gets a note on the Russian side. The Russian footer adds the НРП/Biblica permission line. Greek transliterations and Strong's numbers stay Latin. EN · RU switch beside the theme button. |
| `atlas-v2` | **done** | `/atlas-v2/ru/`, November 5, 2026. Almost all of it is JS-rendered, so the markup carries only the title, brand, «Движок v9» and aria labels. Everything else lives in `atlas-v2/ru-data.js` (194 KB, inert `text/x-ru` on the English page): 1,181 `atlasData` strings swapped in walk order, each guarded by an FNV-1a hash of its English (a mismatch keeps the English and logs a warning); 214 string pairs and 6 regex pairs through `tr()` on every rendered chunk (app, drawer, wheel, diagnostic result, APEST detail, legend, badges, footer); Russian NAV_ITEMS, DRAWER_TABS and APEST role labels. Tribe names become Russian keys; friction partners are read from the English first. The local matcher tokenizes Cyrillic with Russian stopwords. Quotes are **НРП** from bolls (Быт. 49, Втор. 33:8, Пс. 71:8 for Ps 72:8, the APEST verses); the English names no version, so neither does the Russian. Gen 49:21's KJV «goodly words» has no НРП match (НРП has «детенышей»), so that allusion is unquoted. The dead Gemini prompt stays English. Source TSVs and the payload builder live in the C1 tools folder (`work-atlas-v2/`). |
| `one-shape` | **done** | `/one-shape/ru/`, November 5, 2026. Russian data in `data/ru.js` (RU only); four English-keyed lookups now work by key or position. Verses from НРП. |
| `anatomy-of-rest` | **done** | `/anatomy-of-rest/ru/`, November 5, 2026. About 210 markup units. Quotes are **НРП** from bolls: Мф. 11:28–29, Чис. 6:24–26, Пс. 4:9 (Hebrew 4:8); the page's own «шалом» discussion stays in the prose. Reference lists use Septuagint psalm numbers (Пс. 22, 126). `NSDR` stays a brand; the N/S/D/R acronym tiles carry Russian glosses. On RU the evidence-grade chips (`.grade`) wrap, because one long Russian grade pushed the page 15px wide at 390px. EN · RU switch sits with the fixed theme toggle. |
| `broken-cistern` | **done** | `/broken-cistern/ru/`, November 5, 2026. About 110 markup units plus a Russian payload for the strings its JS writes into the panels, the loop note and the cases. Иер. 2:13 (the anchor verse) and Ин. 4:14 are **НРП**, cited «· НРП». EN · RU switch in the header. |
| `how-to-teach` | **done** | `/how-to-teach/ru/`, November 5, 2026. About 407 markup units; the 14 gate buttons carry `data-ru-data-label`/`data-ru-data-lock`, so the JS needed no payload. Quoted phrases are **НРП**: Лк. 5:8, 2 Цар. 12:7, Лк. 10:37, Мк. 8:29, Мк. 4:12. Researcher names and journal titles stay in Latin. The English says "seventy-two" for Лк. 10:1–20 while НРП reads «семьдесят»; kept the page's number. Bricolage and Hanken have no Cyrillic, so RU falls back to system faces. On RU `.esv-ref::after` widens 3px each side so short refs reach 44px. EN · RU switch beside the brand in the sticky bar. |
| `feedback-loops` | **done** | `/feedback-loops/ru/`, November 5, 2026. `index.html` only; `feedback-loops.html` is a byte copy and is not linked. About 10 markup units; the page is almost all JS-rendered, so about 450 strings (12 models, 4 categories, cross-links, UI through `TXT()`) are a Russian payload swapped in place with length checks. No scripture. Book titles "Hooked" and "Tiny Habits" stay in Latin. The page has no meta description or og tags. EN · RU switch shares the fixed bottom-right wrapper with the theme toggle (the page has no header). |
| `Fake-Love` | **done** | `/Fake-Love/ru/`, November 5, 2026. `index.html` only; `counterfeit-love.html` is a byte copy and is not linked. About 62 markup units plus about 160 JS-written strings (5 feelings, 7 acts, loop steps, card, matrix and diagnostic text) swapped by index with length and key checks. No scripture. Author names and book titles stay in Latin. The view buttons are short in Russian («Гид», «Цикл», «Матрица»); at 360px and below the lens label wraps above its buttons, and the diagnostic answers use `minmax(0,1fr)` with hyphenation so long Russian words cannot widen the page. EN · RU switch in a hero top row (the page has no header). |
| `the-loop` | **done** | `/the-loop/ru/`, November 5, 2026. About 123 markup units plus about 110 JS strings: `js/ru-data.js` (a no-op on EN) fills the names and UI tables `content.js`/`main.js` now read, and throws on any key or length mismatch. Quotes are **НРП**: Рим. 7:15, 7:24, 8:1, 8:32, 12:2, Ин. 15:4–5, Мф. 16:24–25, Иак. 5:16, Гал. 5:22–23. The English Mt 16:25, Jn 15 and Jas 5:16 lines are not NIV wording and Rom 7:15 is near-NIV (flagged, not changed). `incurvatus in se` stays Latin; Greek words in Greek script. Bricolage and Instrument Sans have no Cyrillic. EN · RU switch in the hero top row. |
| `loop-atlas` | **done** | `/loop-atlas/ru/`, November 5, 2026. One page. 145 markup units, including the SVG `<text>` labels, plus a Russian payload in `script.js` for 14 models, 8 scenarios, 6 integration entries and the node and group labels, swapped in place with length checks; hinge text, slider strings and detail fallbacks go through `TXT()`. No scripture; the Augustine prayer is the page's own text. Book titles, *pondus*, *Deus ludens*, *examen* and abbreviations (SEEKING, BDNF, DMN, COM-B) stay Latin. The English Ignatius entry says "spiritual consolidation" (RU reads «утешения», consolation). EN · RU switch in the sticky header. |
| `never-done` | **done** | `/never-done/ru/`, November 5, 2026. One page, about 14,400 words: 630 markup units plus SVG and nav aria-labels and the title, meta and og descriptions; no JS strings. No scripture. About 250 citation URLs untouched; paper, book and journal titles stay Latin. A dozen Russian SVG labels shortened to fit their boxes; `:lang(ru)` heading fixes for phones. Flagged in the English, not changed: hero "Updated October 22, 2026" and "Updates, October 2026" against a footer saying "August 2026"; the error-budget panel says "budget spent: ship freely" beside a 70%-full bar. EN · RU switch in the hero top row. |
| `the-return-new` | **done** | `/the-return-new/ru/`, November 5, 2026. One page. 266 markup units plus about 70 JS strings through `TR`/`TXT()` (the demos' button, cue and status text; elements the JS rewrites get their Russian first state at init). Quotes are **НРП**: Ис. 30:15, Пс. 45:11, Пс. 12:2 and 12:6 (Septuagint numbering), Лк. 22:42, Лк. 4:4. Author names, journal titles, TIP and RFCBT stay Latin. The 988 line is a US service and stays as written. Verse links now have a 44px-wide hit area on both languages. EN · RU switch shares one fixed wrapper with the mode toggle. `/the-return/` stays a redirect stub; `quiet-return/` untouched. |
| `code-school` | **done** | `/code-school/ru/` (index, skills, glossary, landscape, timeline), November 5, 2026. About 85 markup units and 29 SVG labels, plus a Russian payload appended to each `data/*-data.js` (runs only when `data-lang="ru"`, throws on key drift) for about 130 entries; `js/main.js` switches the nav and footer labels and moves each page's `<template id="lang-switch">` into the nav. No scripture. Code samples, commands, file, API and tool names stay English. Flagged: `landscape-data.js` is dated June 2026 and the timeline ends "2026 — now" (dates unchanged; RU shows «июнь 2026»). `.grid-2` and the nowrap badges also overflowed the English page at 320px; both now wrap. |
| `uncooked` | **done** | `/uncooked/ru/` (index, quiz, pattern, why, help, crisis), November 5, 2026. 91 markup units plus titles and metas on all six pages; `data-ru.js` (inert unless `data-lang="ru"`, `data.js` untouched) merges 265 strings into PATTERNS and QUIZ with length and key checks; about 45 UI strings through `TXT()` in `app.js`, which also renders the EN · RU switch in the nav and the RU footer (НРП notice, home link to `/ru/`). Quotes are **НРП** (Мф. 6:16, 6:33, 16:25, Флп. 4:6, 4:8, 1 Фес. 5:18, Деян. 2:42–47, Мк. 2:27, Пс. 45:11, Пс. 113:16, Еф. 2:10 and the pattern pages' verses); the site has no reader. Help and crisis list **US services only** (988, 741741, Trevor, SAMHSA, Open Path $40–80): every number and name is unchanged, glossed «(США)», no other countries' lines added. НРП Мф. 18:22 reads «семьдесят раз по семь» where the English says seventy-seven; Пс. 113:16 НРП is a wish where NIV states a fact. The nav now wraps at 479px and below, which also fixes the English page's old 320px overflow. |
| `specimens` | **done** | `/specimens/ru/`, November 5, 2026. One page. About 1,290 markup units plus JS strings through `TXT(en, ru)` (toasts, search count with Russian plurals, pager, badges, type-scale names, contrast grade, a length-checked country list). No scripture. Specimen sample content stays English where it is the exhibit: code and CSS tokens, fake brands, sample names, swatch names, stat values, "aka" aliases, and the `data-terms` search keywords. The specimens' own small controls are exhibits and exempt from the 44px floor. A `max-width:400px` block keeps the header row inside 320px with the EN · RU switch beside the theme button. |
| `colour-of-middle-c` | **done** | `/colour-of-middle-c/ru/`. 219 markup units, 13 `data-nav` rail labels and 7 `aria-label`s. The page discusses Scripture's use of number but never quotes a verse — only references (Откр. 13:18, Ин. 21, 1 Пар.) — which is why it could be done while bolls was blocked. Its own JS writes a further ~25 strings that `data-ru` cannot reach: Newton's colour names, the two Fig. 01 captions, the transposition readout and its Гц/ТГц/нм units, the «✕ расходятся» column, the tuning-system row labels, and the canvas axis labels on Figs. 02 and 08. Those go through a `TR` table and an `L()` helper that is a no-op unless `data-lang="ru"`. Musical terms follow Russian convention (middle C → «до первой октавы», A=440 → «ля = 440»); researcher names and journal titles stay in Latin script, as Russian academic citation does. |
| `graded` | **done** | `/graded/ru/`, November 5, 2026. Втор. 29:29 from НРП. Archivo and Space Mono have no Cyrillic, so RU falls back to system fonts. |
| `measured` | **done** | `/measured/ru/`. Three Disguises. References scripture but never quotes it, so only the reference names needed localising (2 Cor 10:12, John 21:22, Eph 1:6, Prov 29:25, Zeph 3:17). SVG diagram labels translate. EN · RU switch beside the theme toggle in the header (November 5, 2026). |
| `combo-stern` | **done** | `/combo-stern/ru/`, November 5, 2026. About 175 markup units plus `ru-data.js` (loaded on both pages, a no-op on EN), which swaps the five data tables, slots and architect presets in place with length checks; `app.js` reads about 50 UI strings through `TXT()`. Quotes are **НРП**: Иер. 2:13, Еккл. 1:8, Быт. 2:15, Ин. 4:14, plus verbatim fragments of Мф. 26:33, Еккл. 1:14, Лк. 10:41–42, Рим. 8:1, 8:15; Пс. 26:10 and Иона 2:9 renumbered. The English stages 5–7 show literal `**` markdown; RU renders them as bold/italic. MathJax was not seen rendered headless. EN · RU switch beside the theme toggle. |
| `combo-stern-loop-love` | **done** | `/combo-stern-loop-love/ru/`, November 5, 2026. `index.html` only; `the-way-back-v3-polished-audited.html` is not linked from it and stays English. 297 markup units; `ru-data.js` (a no-op on EN) swaps the ROOTS, feelings and counterfeits tables by index with English-key checks, and reuses `combo-stern/ru-data.js` wording for the shared glossary, axes, profiles and archetypes; about 105 UI strings through `TXT()`. Quotes are **НРП**: Иер. 2:13, Еккл. 1:8, Быт. 2:15, Ин. 4:14. The page says "25 feelings" but the table has 24. Below 420px the brand wraps so it, the theme toggle and the EN · RU switch share the header row. |
| `desire-master` | **done** | `/desire-master/ru/`. 84 translation units, all of them in the markup: the page's own JS only toggles classes and ARIA state, so nothing needed a parallel Russian payload. No scripture anywhere on the page, which is why it could be done while bolls was blocked. Register is the informal «ты» the essay's English second person asks for. Chalmers' phrase is given as «вытесняющая сила новой привязанности»; Chalmers and Keller keep their names. The mechanism switch, the five example tabs and all 35 scroll reveals were re-tested on the Russian page. |
| `architecture-of-desire` | **done** | `/architecture-of-desire/ru/`. 167 markup units (title and meta description included) plus the largest JS payload so far: ~150 strings across ten data arrays (`SDT`, `FUN`, `SAVOUR`, `MATRIX` 18×4, `PATHWAY`, `SCENARIOS`, `OBJECTIONS`, `SCRIPTURE`, `MARKS`, `QUESTIONS`, `STATES`) and a `UI` dict for every string the chart/render functions write inline — radar axes, RPE labels, flow-map zone names, matrix count and `data-label`s, the pathway stage label, verdict bands, and a Russian plural for «Осталось N вопросов». Arrays are swapped in place by index with length assertions. **The RU payload block must sit after the last `const` it mutates** — `AXES`/`REWARD`/`STATES` are declared mid-file, and `const` TDZ threw `Cannot access 'AXES' before initialization` when the block ran earlier in the file; it now sits just before RENDERERS, which is safe because nothing calls a renderer until INIT at the bottom. 6 quoted passages → **НРП** from bolls (Ин. 4:13, Иер. 31:33, Мф. 11:28, Ин. 10:10, Мф. 7:16, Мф. 6:21), cited «· НРП» on each card's ref chip. НРП renders the «treasure» of Мф. 6:21 as «богатство», and the card's prose follows the quote's word. |
| `the-seeking-machine` | **done** | `/the-seeking-machine/ru/`. 187 markup units and 5 `aria-label`s. No scripture anywhere, so it was workable while bolls was blocked. Its four looping canvas figures draw ~16 labels from JS, which go through a `TR` table and a `TXT()` helper. **Named `TXT`, not `L`** — the figure-1 draw function already has a local `var L` (an animation phase), which shadowed a helper called `L` and threw «L is not a function» on both language sides. Worth remembering before adding an `L()` to any other page. Half those labels sit in object literals (`name:'…'`) and ternaries rather than direct call arguments, so grepping the call sites alone missed eight of them; the browser screenshot is what caught «RESOLVING…» still in English. Bibliographic citations keep their Latin-script author, journal and year. |
| `the-fixed-point` | **done** | `/the-fixed-point/ru/`. 87 markup units, 8 `aria-label`s, plus the 8 captions the interactive gauge writes through `say()` — those go in a `TR` table read by a `TXT()` helper wrapping `say()` itself, so the caption is translated at the point of display. The page reasons *about* Scripture (Екклесиаст, `hevel`, Павел, Августин) but quotes no verse: the one scriptural phrase, «глаз не насыщается тем, что видит» in unit 24, is unmarked and uncited in the English — the author's own clause, not a set-off quotation — so it is rendered as his sentence. **If you want it to match a published НРП wording of Еккл. 1:8, that is a one-line change and worth a look on the next run with bolls reachable.** |
| `predicting-mind` | **done** | `/predicting-mind/ru/`. 86 markup units, 7 `aria-label`s, 9 `data-nav` rail labels, and **77 strings owned by the page's JS** — the `EMO`, `RW` and `WEIRD` data arrays plus the stress-dial, trap-loop and default-mode captions. Those go through a `TR` table built by pairing the English keys re-extracted from the source, in a fixed order, against a Russian list by index, so a future edit to the string set trips the count assertion instead of silently mispairing. No scripture. **Note for the next page with an SVG diagram:** the generator writes SVG-namespace nodes as escaped *text*, so `data-ru` must go on each `<text>` element, never on a `<g>` wrapping it — the unit extractor now descends into SVG rather than treating a `<g>` as one unit. |
| `the-watches-of-the-night` | **done** | `/the-watches-of-the-night/ru/`, November 5, 2026. Six-passage `.verse-grid` from НРП. |
| `the-weight-of-rest` | **done** | `/the-weight-of-rest/ru/`, November 5, 2026. Verses from НРП (Быт. 2:2–3, Пс. 4:9, 126:2, Мф. 11:28, Ин. 14:27). |
| `two-hundred-milliseconds` | **done** | `/two-hundred-milliseconds/ru/`. 156 markup units, 2 `aria-label`s, and the 10 strings of the `readings` array that the delay meter writes (`TR` table + `TXT()`). No scripture. `200MS` stays as a brand name per the register rules; researcher names and journal titles stay Latin-script. Transcript lines keep their conversation-analysis notation — «A» / «Б» for the two speakers and `(0,2)` with a Russian decimal comma. |
| `bait-constellation` | **done** | `/bait-constellation/ru/`, November 5, 2026. 37-term glossary in `ru-data.js`. No meta description in either language. |
| `everything-mid` | **done** | `/everything-mid/ru/`. Written entirely in lowercase, very online; the Russian keeps that register (lowercase headings, everyday internet Russian) — except the two quoted scriptures, which are **НРП** (Притчи 14:12, Ин. 4:14) — retrofitted from Синодальный 2026-08-19 once bolls was reachable. Theme-button label localised to «ночь»/«день». EN · RU switch sits with the theme toggle in one fixed top-right group (November 5, 2026). |
| `coding-agents-guide` | **done** | `/coding-agents-guide/ru/`, November 5, 2026. Commands, file names and code stay English; tables scroll in their own boxes. |
| `judgment` | **done** | `/judgment/ru/`, November 5, 2026. «Суд». 551 units: 517 translated; 34 are transliterations and Latin roots that read the same in both. Picker attribute renamed to `data-ruref` first (699f648). JS localizes the apple demo, all 7 quiz verdicts (Greek kept, quotes in НРП), picker labels and `quote()` («»). On RU the 57 lexicon verses load one every 200ms with two retries, because bolls answered the burst with 429s; the hero keeps its baked НРП if a fetch fails. Quotes are **НРП**; Пс. 95:11–13 for Psalm 96 (`data-ru-data-verse` on its slot). Рим. 14:13 is quoted from the Синодальный, because НРП drops the second «судите»; Деян. 17:11 gives НРП «более открытыми» with the Greek "more noble" glossed. The "English" rows in Luke's key stay English (`lang="en"`, labeled «Англ.»). The `.ruvb` Синодальный/НРП column is unchanged and works; on Лк. 12:57 it repeats the НРП line the main column now shows. Register «ты». Footer adds the НРП/Biblica line. EN · RU switch before the theme button. |
| `the-return` | **n/a** | Redirect stub: it bounces before paint, so a `/ru/` copy would be a URL nobody can reach. The generator skips it by name. Note its target `/the-return-new/` does not exist in this repo. |
| `the-return.html`, `index-old-return-backup.html` | **n/a** | Same as above — skipped. |
| `twelve` | **done** | `/twelve/ru/`, November 5, 2026. «Двенадцать». 99 markup units: 94 translated, 5 JS-owned (version label, theme label, results line, Expand all, popover loading line). The data is a Russian payload in `twelve/data-ru.js`: inert `text/x-ru` on the English page, merged by id and index into TWELVE_DATA, the axes and TWELVE_DIAGNOSTIC; it throws on any mismatch. `tribe` stays English as the scoring key; the display name is `tribeRu`. The app.js examples and extra witnesses arrive as `TWELVE_RU_APP`. UI strings are `RU ?` in app.js (136 sites). Scripture is **НРП**: the 84 vault passages and 12 anchor verses are baked, so the Russian picker is НРП only, with no YouVersion call and nothing saved. Popovers and witness passages come from bolls NRT, one every 200ms with two retries. Psalms in Russian numbering (Пс. 22, 50, 41, 71). Where НРП parts from the English argument: John Mark "useful" (2 Тим. 4:11 «хорошо помогает») and 1 Пар. 12:33 «единодушно» for "not of double heart". The method note and the profile credit carry the НРП/Biblica line. Register «ты». EN · RU switch before the theme button; Russian-only phone header CSS. |
| `most-best-verses` | **blocked: design decision** | Not a translation job as built. `verses-data.js` holds 94 verses in six English translations plus about 250K characters of prose (theological summary, story, chapter summary, cross-refs, lexicon). `app.js` builds a six-translation comparison grid, TPT footnotes, and a lexicon keyed to the English word each Greek or Hebrew term matched (`matchedEnglish`). In Russian the grid collapses to one translation (НРП; Синодальный would need its own licensing check), the TPT footnotes mean nothing, and the lexicon's English keys need re-matching against НРП wording. Needs a decision first: (a) a Russian page with НРП only, no comparison grid and no TPT notes, the lexicon re-keyed to НРП words, about 250K characters of prose; or (b) leave it English-only. Group C1, November 5, 2026. |
| `draw-near` | **done** | `/draw-near/ru/`, November 5, 2026. «Приблизься». 660 units: 657 translated; 3 source items are names and English titles only. 23 `data-short` labels added (the arc beats, plus short section names for the phone header). JS localizes the arc axis and heart label, the quiz nav, count, messages and result names, the picker labels and the verses switch. On RU the verse switch loads one passage every 200ms (cache hits skip the gap), with two retries. Quotes are **НРП**; psalms renumbered (101, 138, 26, 24, 89:5, 113:24, 146); Откр. 13:8 quoted in НРП, with the 17:8 reading noted; Лк. 10:1 keeps «семьдесят два», as how-to-teach does. Register «ты». Footer adds the НРП/Biblica line. EN · RU switch before the theme button; below 520px it shows only the other language, and the brand truncates with an ellipsis instead of running under the verses button. `ru-fit` CSS: smaller Russian hero title, even rail columns. The Lesson 2 link goes to `/father-inside-time/lesson-2/ru/#four`. |
| `faith` | **done** | `/faith/ru/` + `ru/miracles.html`, November 5, 2026. 775 units on the main page, 25 on miracles. The page's own reader speaks Russian: `scripture.js` keeps a separate RU version list (НРП default, СП) under its own storage key, parses Russian references (Psalms by the LXX count) and writes its tooltip and context dialog in Russian; all 151 slots are baked НРП from bolls (`RU_SLOT_MAP` covers Пс. 106:20, Чис. 13:31, 13:34). Miracle data in `faith/miracles-ru.js` (196 entries, inert `text/x-ru` on the English page). `switcher.js` names the directions in Russian. Newsreader has no Cyrillic, so RU text runs in Literata. The EN · RU switch moved the nav's wrap point from 1100px to 1240px (English too). `old/` and `new/` untouched. |
| `father-inside-time` | **done** | November 5, 2026. «Отец внутри времени», register «вы»; the lesson switcher reads the same on every page. **`/ru/`**: 703 of 704 units (`#covtag` is JS-owned); JS localizes the swap counter (with plurals), the five covenant panels (a `dataRu` merge that throws on a missing field) and the picker. 234 refs, all НРП, psalms in Septuagint numbering (Ps 115:16→Пс. 113:24, 90:4→89:5, 102:25–27→101:26–28). Notes where НРП differs: Быт. 1:1 singular «небо», Откр. 13:8 (Синодальный cited), Ос. 2:16 «баал». **`lesson-2/ru/`** «Неизменный, но не безучастный»: 383 units; Иуд. 25 НРП «до начала времени», with the units adapted so the argument holds; Откр. 10:6 keeps the KJV plus the Синодальный; footer adds the НРП/Biblica line. **`lesson-3/ru/`** «Главный, но не всё контролирует», where "sovereign" is «суверенный»: 342 units; Дан. 4:32 for Dan 4:35. The Pharaoh ledger uses Синодальный wording, labeled, because НРП's «упрямое сердце» erases who does the hardening. End-times and original sin are left out, as in English. Lesson links carry `data-ru-href`, because build-ru rewrites only one-segment paths. **`cross-examination/ru/`** «Перекрестный допрос»: 1,236 units, 0 skipped; the JS localizes only the picker. All 31 cases quote **НРП**, with Septuagint psalm numbers (Ps 139→Пс. 138, 33→32, 89:30–34→88:31–35, 105:14–15→104:14–15). Verdicts: Выдерживает / Выдерживает с поправкой / Открытый вопрос / Преувеличено / Не выдерживает в этой формулировке; the short `.vt` forms fit 375px. Jude 25 and Rev 13:8 are handled as on the lesson pages. The Pharaoh hardening and Исх. 8:19 «перст Божий» use the Синодальный, labeled. For Jer 7:22 the Hebrew is quoted through the Синодальный, because НРП adds «просто» as the NIV adds "just". The Ps 139:16 KJV/JPS readings are rendered from English, labeled. Jonah 2:1–2 is cited as Иона 2:2–3. A Russian-only h1 size keeps «Перекрестный» inside the header column. Cross-examination links on all three lesson pages carry `data-ru-href` to `/cross-examination/ru/#cNN`. The reader does not link prose references in oblique case («в Исходе 19:5»). |
| `father-inside-time/lesson-5` | not started | Added November 7, 2026, English only. The page carries no `data-ru` on purpose, so `build-ru.py` emits no half-English `/ru` copy. To translate it: add `data-ru` to every unit, link it from the other pages' lesson switchers with `data-ru-href`, and do cases 32–37 on `cross-examination` in the same run. Those cases sit in `#lesson5-block`, whose single `data-ru` is a Russian placeholder that says the section is not translated and links the English; remove it when translating the cases one by one. The lesson-switcher pill, board rows 32–37 and nav links are already Russian (they link to the English anchors). |
| `inner-room` | **done** | `/inner-room/ru/`, November 5, 2026. «Внутренняя комната». All 638 markup units; register «ты». The `window.ROOM_DATA` data (bands, 8 maps, acts, loops, practice, the 10-item check) is a Russian payload in `inner-room/ru-data.js`: inert `text/x-ru`, shape-checked, throws on mismatch; its map links go to `/ru/`. Page-script labels via `RU ?`; `data-ru-data-short` on sections; `data-ru-data-ref` on the two psalm passages. Quotes are **НРП**, psalms in Russian numbering (Пс. 22, 138, 15:11, 90:1). Where НРП parts from the English argument (Лк. 15:29 «как слуга», Рим. 1:1 «слуги», Лк. 15:19 «батраков», 1 Ин. 3:9 «не может любить грех», Лк. 17:21 «среди вас») the text says so; the Синодальный section keeps its Синодальный quotes. Anchors `harp` and `rut-performing` are kept. Quotes from older authors (Дорофей, Лествичник, Гюйон and others) are translated from the English sources and the footer says so; the standard Russian wording of Дорофей and the Лествица could replace them later. Footer adds the НРП/Biblica line. |
| `one-accord` | **done** | `/one-accord/ru/`, November 5, 2026. «Единодушие». All 421 markup units; register «ты». The `window.OA` data (12 tiles, 25 cards, 12 eras, the 12-question check) is a Russian payload in `one-accord/ru-data.js`: inert `text/x-ru` on the English page, shape-checked against the English data, and it throws on any mismatch. Learn mode via `#learn-data-ru`. Page-script labels via `RU ?`; baked slots say НРП. Quotes are **НРП**, psalms in Russian numbering (Пс. 21:4, 132, 8:3). Where the Russian Bibles part from the English argument (Деян. 2:1 «единодушно» is Синодальный, НРП «вместе»; 1 Кор. 14:33 "author of confusion"; Пс. 21:4; Еф. 4:3) the text says so. Footer adds the НРП/Biblica line. JS-data links to `/inner-room/#harp` and `#rut-performing` stay English until inner-room has a Russian page. EN · RU switch after the theme button; small phone-bar gap CSS. |
| `salvation` | **done** | `/salvation/ru/`, November 5, 2026. «Спасение»; «ты». All 1,111 markup units translated. JS localizes the picker labels and the unavailable/could-not-load strings; `BAKED = RU ? "НРП" : "NIV"`, so the Russian page never fetches; a RU `nest()` steps «» down to „“; "Reading…" becomes «Загрузка…». 265 verse slots (220 refs) baked as **НРП** and read by meaning; psalm slots carry `data-ru-data-verse` (Пс. 5:6, 102:12, 31:8). Arguments resting on NIV wording are restated against НРП (the Eph 1 count «в НРП их семь (в английском NIV — девять)», Tit 3:5, Gal 5:4, 1 Cor 11:27–32 with the King James/Синодальный word order, 1 Jn 3:9, Mt 27:3, Jn 15:2 «срезает», Lk 15:29 «как слуга»). The suicide, relapse, Savchuk, inherit-list, Judas and Rom 6:1 sections are translated exactly; the 988 and findahelpline crisis text stays US-specific, as in English. The footer describes НРП and adds the НРП/Biblica notice. Below 520px the phone header shows only the other language. |
| `same-fire` | **done** | `/same-fire/ru/`, November 5, 2026. «Тот же огонь». All 693 markup units; register «ты». The `window.SF` data (7 moves, runway, 5 pairs, 4 states, 10 Elijah steps, Kadesh, Psalm lenses, breath pacer, 12-question check) is a Russian payload in `same-fire/ru-data.js`: inert `text/x-ru` on the English page, shape-checked against the English data; it throws on any mismatch. Page-script labels via `RU ?`; baked slots say НРП; `data-ru-data-short` on every section; Psalm 23 slots carry `Пс. 22:N`. Quotes are **НРП** in Russian numbering (Num 13 +1, Dan 4 −3, 1 Sam 24 +1, psalms −1). Where НРП parts from the English argument (Лк. 2:52 and 1 Цар. 2:26 «любили», Иак. 4:6 «благодать» twice, Притч. 11:1 «угоден», Пс. 22:2 «покоит», Пс. 22:6 radaph, Притч. 19:19 «отпустишь») the text says so. Augustine and Origen are translated from the English editions, and the text says so. The 988 crisis line stays US-only. Footer adds the НРП/Biblica line. Libre Caslon Display has no Cyrillic, so headings fall back to Crimson Pro. EN · RU switch before the theme button; below 520px only the other language shows. |
| `something-in-the-air` | **done** | `/something-in-the-air/ru/`, November 5, 2026. «Что-то витает в воздухе». All 550 markup units, «ты». The page JS localizes the theme button, the picker labels and the 16-word vocabulary grid (`WORDS_RU`). Where an English entry makes a claim about an English word (*close*, *off*, *eerie*), the Russian entry names that English word rather than inventing a Russian etymology. The ledger's CSS-generated mobile labels get `:root[lang="ru"]` overrides. About 28 passages are quoted in **НРП** wording, with references in Russian numbering (Ps 82→Пс. 81, Ps 74:14→Пс. 73:14, Num 13:32→Чис. 13:33, Job 41:34→Иов 41:26); НРП's Еф. 2:2 keeps «в воздухе», so the hero's hook survives. The Deut 32:8 fork note no longer tells the reader to switch translations (the Russian reader offers only НРП); it says НРП follows the Masoretic text and glosses the NLT reading. The Haunt result and the three verdicts keep their exact hedging. Footer adds the НРП/Biblica line. Instrument Serif has no Cyrillic, so headings set in Literata. There is no header bar, so the EN · RU switch sits at the top edge of the hero, left of the fixed theme button. |
| `word-in-season` | **done** | `/word-in-season/ru/`, November 5, 2026. «Слово ко времени» (as in the talk deck; Притч. 15:23 НРП). All 274 markup units. JS localizes the 7 lies, the 7-day practice (days, prompts, genitive-month dates, confirm), the sources (citations stay Latin), the strings instrument (до…ре′, verdicts, readouts), picker labels and `data-short`; new `learn-data-ru` block. Written-out KJV verses replaced with **НРП** (Ис. 50:4 hero, Лк. 24:32, Ин. 21:22, Ин. 4:42, Ис. 50:5); Пс. 45:11 and Пс. 77:4–7 numbering. Where the argument leaned on KJV words НРП lacks (Ин. 4:42, 1 Ин. 2:1 "advocate", Рим. 14:22, Мк. 4:28 "ear"), the text follows НРП. The footer's "KJV, public domain" note is now the НРП/Biblica line. EN · RU switch after the theme toggle; below 480px only the other language shows. `word-in-season-talk/ru/` still links to the English page until it is rebuilt. |
| `word-in-season-talk` | **done** | `/word-in-season-talk/ru/`, November 5, 2026. 163 markup units, including 30 speaker notes and 10 image alts; the slide aria-label is the only JS string. Every slide quote is **НРП**, each fragment checked against the bolls verse (Ис. 50:4–5, Пс. 45:11, Откр. 10:10, Ин. 21:22, Лк. 24:19, Зах. 3:2, 3:4, Иов 42:7, Быт. 3:11, Ин. 4:7, 4:42, Нав. 4:6); the credits slide carries the НРП/Biblica line. Still no pop-up reader, on purpose. Slide 2 keeps the King James phrase it discusses. All 30 slides stepped to their last build at 1280×720: no overflow or overlap; slides 1 and 29 have `:lang(ru)` size rules. Russian-layout keys (щ, т, а) mirror O, N, F; the switch keeps the slide number. |
| `tuned` | **done** | `/tuned/ru/`, November 5, 2026. About 300 markup units, including all 44 chip glossary tips (`data-ru-data-tip`) and the SVG ring labels (on each `<tspan>`). The JS-drawn strings (ring captions, pendulum states, «Look for» swatches, dials) live in `tuned/ru-data.js`, inert `text/x-ru` on the English page, throwing on any mismatch. 28 passages are **НРП** through the shared reader (51 references link); psalms LXX-numbered and checked verse by verse (4:8→4:9, 46:10→45:11, 16:11→15:11, 37:4→36:4, 86:11→85:11, 119:18→118:18, 23→22). The footer's KJV Matthew 6:22 becomes Мф. 6:22 НРП, with the KJV «single» against NIV «good» explained; the Russian footer credits НРП/Biblica. The Huygens anti-phase correction, the amber-contrast note and all nine downgraded claims keep their hedging. Bricolage Grotesque and Newsreader have no Cyrillic, so the Russian page sets in system faces. The page has no theme control; the EN · RU switch sits in the hero's top row. |
| `focus` | **done** | `/focus/ru/`, November 5, 2026. ~253 markup units plus `#learn-data-ru` (8 checkpoints, 8 key ideas). JS strings (review queue, pretest, canvas labels, drifting words) in `focus/ru-data.js` (`window.FocusRU`, inert `text/x-ru`; `RU.put` throws on mismatch, `RU.done()` on an unused block). Scripture is НРП from bolls, nine passages, Ps 115:8 → Пс. 113:16. НРП reads Prov 23:7 as calculating, so the box quotes НРП 23:6–7 and the prose cites the Синодальный «каковы мысли в душе его, таков и он» as the popular line. Archivo and Newsreader have no Cyrillic: RU runs in Sofia Sans (three widths) and Literata, loaded only on `/ru/`. To fit the switch, the section links now show from 901px and the learn toggle is icon-only at 480px and below (English too). |
| `app-playbook` | **done** | `/app-playbook/ru/`, November 5, 2026. Script strings in `app-playbook/data.ru.js`; decimal commas and «тыс.»/«млн». |
| `feels-like-learning` | **done** | `/feels-like-learning/ru/`, November 5, 2026. ~190 script strings; the Swahili test grades Russian meanings and saves its own run (`fll-swahili-v1-ru`). Bibliography stays English. |
| `how-not-eating-works` | **done** | `/how-not-eating-works/ru/`, November 5, 2026. No scripture. |
| `huberman` | **done** | `/huberman/ru/`, November 5, 2026. No scripture. |
| `sleep-rest-peace` | **done** | `/sleep-rest-peace/ru/`, November 5, 2026. All 14 «Go deeper» summaries; verses from НРП (Быт. 2:2, Пс. 4:9, 22:2, 126:2, Ин. 14:27) with the Biblica line; the Psalm 23 point is adapted to «Он покоит меня». |
| `still-awake` | **done** | `/still-awake/ru/`, November 5, 2026. One SVG label shortened to fit. REM, N2, N3, NSDR stay English. |
| `the-curves-under-the-stages` | **done** | `/the-curves-under-the-stages/ru/`, November 5, 2026. Readouts, SVG labels and gradient names via the page's own `T(en, ru)`. |
| `the-gap` | **done** | `/the-gap/ru/`, November 5, 2026. About 150 markup units, including the eight SVG `<text>` labels, plus a Russian payload (`TXT`, never `L`) for the lens objects, verdict lines, matrix output and play button. No quoted scripture; references convert to Russian abbreviations (1 Цар. 16:7, 1 Кор. 4:3–5, 13:12, Притч. 18:13, 18:17, Деян. 10, Иов 4–37). Bricolage Grotesque and Newsreader have no Cyrillic, so RU falls back to system faces; `:lang(ru)` widens the hero lede and `h2.beat`. EN · RU switch in the hero top row. |
| `the-whole` | not started | Project map — its card titles should follow the hub's Russian titles. |
| `throughline` | **done** | `/throughline/ru/`, November 5, 2026. Claim names match `assets/hub-views.js`; ~16 project names stay English until their hub cards get Russian titles. |
| `best-verses-v0` | not started | Probably **n/a** — an earlier draft of `most-best-verses`. Confirm with the owner before spending a run on it. |
| `given` | **done** | `/given/ru/`, November 5, 2026. 602 markup units (601 translated; `#mapHint` is JS-owned). JS localizes picker labels, the map hints in both modes, and the notes save/copy/clear messages and confirm; NIV slots baked as НРП (`dataset.shown`). Gift-list table header and footer say НРП. Quotes are **НРП** (1 Кор. 4:7 and Еф. 2:10 slots; Рим. 12:3 «судите о себе здраво» for "sober judgment"; Еф. 4:12–13, 1 Кор. 13–14, Кол. 3:23…); no psalms. Register «ты»; scholars in Cyrillic in prose, Latin in the source list. Footer adds the НРП/Biblica line. EN · RU switch at the end of the sticky bar, beside the translation picker. |
| `the-thread` | **done** | `/the-thread/ru/`, 2026-10-27. Lives in its own repo (`esmrsky/the-thread`), built by that repo's `build.sh` from `src/ru/` (1,333 data strings, 224 UI strings, 31 shell strings); `tools/check-ru.js` there fails the build on drift. НРП quotes from bolls, СП as the second option. Listed in `EXTERNAL_RU` in `tools/build-ru.py` so its hub card stays on the Russian grid. |

Rows above this line were added on 2026-10-27: 25 sites built since the August runs had no
row at all. As of that date 15 sites and the hub are translated, and about 38 are not.

**bolls.life is reachable from the cloud sandbox as of 2026-10-27** (the routine's probe,
`curl -s https://bolls.life/get-text/NRT/43/3/`, returned John 3 in НРП). Scripture-quoting
pages are no longer blocked on egress.

## Where the 2026-08-19 cloud run left things

Phase 0 (mechanism) is **done**: the two drifted hub cards carry `data-ru`,
the `.lang-alt` anchor is gone from all nine English sources and therefore
from both sides, and `tools/build-ru.py` now filters the Russian grid.

Six pages landed: `desire-master`, `colour-of-middle-c`,
`the-seeking-machine`, `the-fixed-point`, `predicting-mind`,
`two-hundred-milliseconds`. Fourteen cards now show on `/ru/`.

Two things a future run should know (historical — both resolved):

- ~~The work is on `claude/jolly-goodall-o7vr82`, not `main`.~~ **Merged and
  live since 2026-08-21**; the branch has no unmerged commits left.
- **Live URLs could not be verified from the sandbox.** `esmrsky.github.io`
  is blocked by the same egress proxy as bolls. Instead every generated page
  was verified by comparing its pushed git blob SHA against the local one —
  all matched. `.nojekyll` is present at the root and untouched.

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
- **НРП blocked again, 2026-08-19 (cloud run).** bolls.life was probed three
  times from the cloud sandbox — at the start of the run, mid-run, and once
  more on request — and failed identically every time:

      $ curl -s --max-time 25 https://bolls.life/get-text/NRT/43/3/
      curl: (56) CONNECT tunnel failed, response 403

  The proxy's own log records it as `connect_rejected · gateway answered 403
  to CONNECT`, i.e. a policy denial, not a transient failure.
  `https://bolls.life/get-books/NRT/` fails the same way, and so does
  `https://esmrsky.github.io/` itself. bolls is reachable from the owner's
  Mac, so **Phase 1 and every scripture-quoting page are waiting on a run
  executed somewhere with egress to bolls** — not on any further design work.
  No verse was fetched, and none was written from memory.

- **Which pages are blocked on НРП, established this run.** Surveyed properly
  so the next run does not have to re-derive it. A page counts as blocked if
  it quotes verse *text*; pages that only cite references are fine.
  - Blocked: `twelve` (42 KB `scripture-data.js`), `atlas-v3`, `atlas-v2`,
    `most-best-verses` (the whole page), `architecture-of-desire` (a
    `SCRIPTURE` array with a `q:` field), `one-shape`
    (`<div class="scripture">`), `anatomy-of-rest`, `soundings` (one verse,
    Иез. 47:11, in a `<q>`), `graded` (Втор. 29:29), `combo-stern` and
    `combo-stern-loop-love` (Иер. 2:13), `the-watches-of-the-night` (a
    `.verse-grid` of six KJV passages), `the-weight-of-rest`
    (`class="scripture"`).
  - `where-are-you` was blocked on three words from 1 Ин. 2:12–14; done
    November 5, 2026 with НРП from bolls.
  - Still clear and unblocked: **`bait-constellation`** (22 markup units plus
    a 37-term JS glossary) and **`coding-agents-guide`** (322 markup units).
    These are the two obvious next targets for a run without bolls.

- **Detecting quoted scripture.** Grepping for `<q>`, `<blockquote>`,
  `<cite>` and `class="scripture"` is **not** sufficient — it missed
  `the-watches-of-the-night`, which marks verses with `class="verse"` and
  `class="ref"`. Screen for a book-and-chapter reference sitting within a few
  hundred characters of a long quoted run, and read the hits.

- **НРП is now in use — from the Mac only, 2026-08-19.** bolls.life serves
  `NRT` and is reachable from the owner's machine, so five of the six
  scripture-quoting pages were retrofitted from Синодальный to the Новый
  русский перевод: `everything-mid`, `three-territories`, `ecclesia`,
  `spirit-soul-body`, `the-word`. Two findings that save a future run time:
  - **НРП uses Septuagint psalm numbering**, on bolls *and* on Bible Gateway
    (`NRT/19/22` and `?search=Psalm+22&version=NRT` both return the shepherd
    psalm). Every Russian reference already in place was therefore correct, and
    no citation number changed. Bible Gateway links just move `SYNO` → `NRT`.
  - **НРП is Biblica's, not public domain.** Синодальный is, and `ecclesia`
    and `the-word` both said so in prose. That had to change with the text.
  Formatting quirks in the bolls payload, all handled in the fetcher: a leading
  space on most verses; `<i>` around translator-supplied words; `<b>` around
  psalm superscriptions; and — the one that bites — dialogue set on its own
  line in НРП arrives with the break *removed*, giving `сказал:— Не бойтесь`.

- **`fear-of-god-ii` stays on Синодальный, deliberately.** It is a study of how
  translations render one word, and three of its footnotes are arguments about
  choices only Синодальный makes. Ис. 11:2 is the clearest: following the
  Septuagint it renders the first «страх Господень» as «благочестие» and leaves
  the second as fear — the exact swap the study is about. НРП reads «Дух знания
  и страха Господня» and makes no swap, so the argument would have nothing to
  point at. Пс. 129:4 («да благоговеют» → НРП «пусть боятся») and 2 Тим. 1:7
  («боязнь» → НРП «страх») break the same way. The page now says on its face
  why it differs from its siblings. **Don't "fix" this for consistency.**

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
