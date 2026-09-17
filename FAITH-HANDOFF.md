# FAITH — handoff

Working notes for `/faith/`, written to be picked up on a local machine. **State** is
below; how the NIV pass was done is under [NIV in the running text](#done-niv-in-the-running-text).
Companion docs: `SCRIPTURE_API.md` (the shared verse layer), `TRANSLATION-ROUTINE.md` (RU pass, unrelated).

All paths are relative to the repo root.

---

## Where it stands

| | |
|---|---|
| Live | `https://esmrsky.github.io/faith/` |
| Published SHA | see `git log -- faith/` on `main` |
| Page size | ~190 KB, 13 sections |

Pages serves `main` directly — no workflow file, `.nojekyll` at root. Publishing is
`git push origin <branch>:main`, and GitHub raises a `pages build and deployment` run itself.

### Section map

`#ground` I · The Ground — `#word` II — `#greek` III — `#fear` IV — `#mechanics` V —
`#jesus` VI — `#cases` VII · The Case Files — `#notyet` VIII · The Waiting —
`#science` IX — `#mechanism` X · The Hard Question — `#miracles` XI — `#authority` XII — `#walk` XIII

Roman numerals live in `<span class="num">` and are **hand-maintained**. Inserting a
section means renumbering every one after it, plus its HTML comment banner. Match on the
full `<span><span class="num">N</span> Label</span>` string — the labels are unique, the
numerals are not.

---

## Standing decisions — do not re-litigate

These were researched this pass and the page now argues them. Re-check the sources before
reversing one; several contradict what is commonly taught.

1. **No logos/rhēma wall.** The page had a drawer titled "Why the Greek says rhēma, not
   logos" teaching that logos is the dead written word. The NT does not keep that
   distinction: 1 Peter 1:23-25 uses both of the same word two verses apart, Hebrews 4:12
   calls the *logos* living, Ephesians 6:17 and Hebrews 4:12 both call it the sword,
   Acts 11:16 and Matthew 26:75 have a *remembered* rhēma, and Luke 1:37 is literally
   "no rhēma shall be impossible." The real distinction is Hebrews 4:2 — the same word,
   "mixed with faith" or not.
2. **Nazareth was access, not authority.** Mark 6:5 is quoted to the end of its own
   sentence: he healed a few sick folk there. Matthew 13:58 gives a count, not a capacity.
   The page does not teach that a bystander's unbelief can veto God, because the man born
   blind, the widow's son at Nain, Malchus and Lazarus all had no believing recipient.
3. **No text says God refused a healing.** The four usually cited do not: the thorn is
   *angelos*/*kolaphizō* plus an OT idiom for hostile people, with an explicit spoken
   answer in it; Hebrews 11:35-39 is martyrdom with no illness in the list and its
   unreceived promise is the Messiah (11:13, 11:40); Trophimus is a travel note; Timothy
   is advice about a drink. **The counter-case is on the page too** (Galatians 4:13-15) and
   must stay — the page's credibility rests on arguing against itself in public.
4. **The limit is eschatology, not reluctance.** Everyone Jesus raised died later.
   Firstfruits (Romans 8:23), death destroyed *last* (1 Corinthians 15:26). The page never
   tells a sick person their faith failed and never says God declined.
5. **Mechanics is a description, not a recipe.** The six steps are what believing looks
   like from outside. A drawer says why the recipe reading does damage. Do not renumber
   them into a procedure.
6. **No mechanism is claimed for miracles.** "Quantum" is rejected explicitly. The record
   gives before and after, never during. Scripture's account (Hebrews 1:3, Colossians 1:17)
   is labelled theology, not physics. Keep that label.

### Sources checked this pass

Meador, *Hex death*, South Med J 1992 (Sam Londe) · Eaker et al., Am J Epidemiol 1992
(Framingham) · Klopfer, J Projective Techniques 1957 (Mr. Wright/Krebiozen) · Romez,
Freedman, Zaritzky & Brown, EXPLORE 2020 (juvenile macular degeneration — this is the
Marolyn Ford case, and the catalog entry was corrected to match the published record
rather than the popular retelling) · Romez, Zaritzky & Brown, Complement Ther Med 2019 ·
Brown et al., South Med J 2010 (Mozambique) · autoresuscitation scoping review, Scand J
Trauma Resusc Emerg Med 2020 · Tegmark decoherence estimate.

---

## Done: NIV in the running text

Every verse quoted on the page now follows the picker. There are 151 `data-verse` slots, up
from 39. Each holds the **whole King James verse** as its fallback, because only a whole verse
can be fetched. About 150 lead-ins were rewritten to introduce a verse rather than run into a
clause, following `1af076f` on `/salvation/`. The footer hedge is gone.

How it was done, so later edits keep the shape:

- **Inline:** `(Ref): <em data-verse="Ref">“KJV whole verse.”</em>`. The reference comes
  before the verse, so the verse ends the sentence with its own punctuation.
  **Set pieces** (`.m-quote`, `.step-verse`) use `<span data-verse>`.
- **Short lists, tables and callbacks** (the brief lists, the fear/faith mirror, a verse
  already written out nearby) paraphrase with the reference and use **no quote marks**. The
  reference still pops up in the reader's translation.
- A King James verse that ends on `,` `;` or `:` ends on a full stop in the fallback.
  `swapVerse()` does the same for the fetched text, and its new `nestQuotes()` turns a
  verse's own speech marks into single quotes when a narrator leads in.

**Stays King James on purpose:** the `#greek` word study quotes the King James with the Greek
noun put back in ("the *logos* of God…"), and says so. Phrases worded the same in NIV
("great faith", "their faith", "And God said") and the footer motto stay as they are.

**Manuscript differences the prose now names.** Don't "fix" these back to the King James
wording. Each was checked against TR and Tischendorf on bolls.life:
Romans 4:19 (TR *ou katenoēsen* "considered not"; the older text omits *ou*, so NIV has
"faced the fact"). Mark 11:24 (TR *lambanete* "receive"; older *elabete* "have received",
which is what the page's past-tense point rests on). Mark 11:23 ("say" three times in TR,
twice in the shorter text). Matthew 17:20 (TR *apistia* "unbelief"; older *oligopistia*
"little faith").

**Not done, deliberately:** baking NIV into the markup (`tools/bake-verses.mjs --write`). The
fallback stays King James, as on `/salvation/`, because NIV is copyrighted. Also, that
tool's inline branch drops the curly quotes, which `swapVerse()` expects.

**Known limit:** bolls.life rate-limits (HTTP 429) a burst of chapter fetches. A slot whose
fetch fails keeps its King James text. A reader scrolling normally stays well under the limit.

## Landmines

1. **`[data-verse]` is element-agnostic.** `querySelectorAll('[data-verse]')` — any tag
   works. Use `<span>`, not `<q>`: browsers add their own quotes to `<q>` and you get
   doubles once the script fills it. `/salvation/` uses `<q class="lv esv-skip">` with its
   own page-local CSS; `faith/styles.css` has no `.lv` rules, so do not copy that pattern
   across without the styles.
2. **`esv-skip` is unnecessary here.** The autolinker already refuses to descend into
   `[data-verse]` (`faith/scripture.js` ~line 259).
3. **The nav's ceiling is `.nav-inner`'s `max-width: 1240px`, not the viewport.** A label
   added at 1600px can still wrap. The 13 links fit only because every label was shortened
   to one word this pass ("Jesus on Faith" → "Jesus"). Measure before adding another — the
   comment above the `@media (max-width: 1100px)` block in `faith/styles.css` records the
   method and the current figure (~1090px).
4. **`.reveal` hides content until scrolled.** Any screenshot or DOM check must first run
   `document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'))`, and
   `details` elements need `.open = true`.
5. **Two navs.** `faith/index.html` and `faith/miracles.html` carry separate copies. Change
   both. The footer link list in `index.html` is a third.
6. **Straight vs curly apostrophes are inconsistent** in the existing markup. Scripted
   find-and-replace fails silently on the wrong one — always assert the match count.

---

## Verifying

```sh
npx http-server -p 8099 -s        # serve the repo root
```

Inventory (drives the table above):

```sh
python3 - <<'PY'
import io, re
s = io.open('faith/index.html', encoding='utf-8').read()
stripped = re.sub(r'<(blockquote|q|span|p|em)[^>]*data-verse="[^"]*"[^>]*>.*?</\1>', '', s, flags=re.S)
print('picker-following slots:', len(re.findall(r'data-verse="', s)))
print('quoted runs in prose  :', len(re.findall(r'“([^”]{25,})”', stripped)))
PY
```

Before pushing, check all four: HTML tag balance and duplicate `id`s; no dangling
`href="#…"`; the nav on one row with no horizontal page scroll at 1600/1220/1100/900/390px;
and every section rendering in both themes with no console errors. Playwright is the quick
way — `chromium` is fine, force `.reveal` open first per landmine 4.

---

*Last updated September 17, 2026, after the NIV pass.*
