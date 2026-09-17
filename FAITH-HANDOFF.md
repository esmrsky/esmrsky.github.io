# FAITH — handoff

Working notes for `/faith/`, written to be picked up on a local machine. **State** is
below; the *how* for the one open task is under [NIV in the running text](#the-open-task-niv-in-the-running-text).
Companion docs: `SCRIPTURE_API.md` (the shared verse layer), `TRANSLATION-ROUTINE.md` (RU pass, unrelated).

All paths are relative to the repo root.

---

## Where it stands

| | |
|---|---|
| Live | `https://esmrsky.github.io/faith/` |
| Published SHA | `2b9ea2c` on `main` |
| Branch | `claude/logos-rhema-miracles-xaenuf` (identical to `main`) |
| Pages build | run #248, success |
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

## The open task: NIV in the running text

**The ask:** every verse on the page reads in the translation picked in the nav, which
opens on NIV. **Status: half done, and the half that is missing cannot be done from a
cloud session.**

### What already works

`faith/scripture.js` sets `ACTIVE_VERSION = 'NIV'`. The 39 set-piece slots carrying
`data-verse` are observed by `initLiveVerses()` and filled from bolls.life as they scroll
into view, so they honour the picker today.

### What does not

About 124 verses are quoted *inside sentences* as King James baked into the markup. They
stay King James whatever the reader picks. This is the same defect `/salvation/` had
before `1af076f`; read that commit message first, it is the spec for this job.

| section | picker-following slots | inline, still KJV |
|---|---|---|
| `#ground` | 6 | 10 |
| `#word` | 6 | 2 |
| `#greek` | 2 | 16 |
| `#fear` | 4 | 28 |
| `#mechanics` | 1 | 12 |
| `#jesus` | 3 | 18 |
| `#cases` | 1 | 11 |
| `#notyet` | 1 | 10 |
| `#science` | 3 | 6 |
| `#mechanism` | 3 | 1 |
| `#miracles` | 0 | 0 |
| `#authority` | 5 | 5 |
| `#walk` | 2 | 5 |
| **total** | **37** | **~124** |

Counts are reproducible with the inventory script under **Verifying**. The two remaining
`data-verse` slots (39 in total) sit in the `.grand` pull-quotes outside these sections. The
inline column is an estimate: it counts curly-quoted runs of 25+ characters that have a
scripture reference within ~160 characters, so it catches a little prose and misses a
quotation whose reference is further away.

### Why it is blocked in the cloud

The egress gateway 403s `bolls.life` on CONNECT. That kills both halves:

- `tools/bake-verses.mjs` needs it, and `SCRIPTURE_API.md` says to run it "from a machine
  that can reach bolls.life."
- The real fix needs whole-verse text per reference, because — as `1af076f` puts it — *a
  clause quoted mid-sentence can't be swapped between translations: only a whole verse can
  be fetched.* Of 183 distinct references cited inline, **38** have verified verse text
  somewhere in this repo and **145** do not. Writing 145 verses from memory onto a
  scripture site is not acceptable, so it was left.

### Procedure, locally

```sh
# 0. confirm you can reach the API at all
curl -s "https://bolls.life/get-text/NIV/45/10/" | head -c 200

# 1. cheap win first — bake the 39 existing slots, read the diff, commit separately
node tools/bake-verses.mjs faith/index.html            # dry run, NIV
node tools/bake-verses.mjs faith/index.html --write
git diff faith/index.html                              # the point of baking is that the
                                                       # text is right when JS is not there
```

Then the inline pass, section by section from the table above (`#fear` and `#jesus` are the
big ones). For each quotation:

1. Decide whether a **whole verse** can stand where the clause stands. Usually it cannot —
   rewrite the lead-in to introduce the verse rather than run into it. `1af076f` rewrote
   about thirty lead-ins for 165 quotes; expect a similar ratio.
2. Wrap it: `<span data-verse="Book C:V">“…KJV whole verse…”</span>`.
   **Quote marks go inside the element.** `swapVerse()` sets
   `el.innerHTML = '“' + text + '”'`, so the fallback must match that shape or the page
   flickers from quoted to unquoted.
3. Leave KJV in the markup as the fallback. That is deliberate estate policy — public
   domain, and it is what a reader without JS gets.
4. When a section is done, re-run the inventory script in **Verifying** below and watch
   the inline count drop.

Finally, revert the footer hedge in `faith/index.html` (the sentence beginning "Verses
quoted inside a sentence are the King James") once the running text honours the picker.
It exists only to stop the page claiming something it does not do.

---

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
stripped = re.sub(r'<(blockquote|q|span|p)[^>]*data-verse="[^"]*"[^>]*>.*?</\1>', '', s, flags=re.S)
print('picker-following slots:', len(re.findall(r'data-verse="', s)))
print('quoted runs in prose  :', len(re.findall(r'“([^”]{25,})”', stripped)))
PY
```

Before pushing, check all four: HTML tag balance and duplicate `id`s; no dangling
`href="#…"`; the nav on one row with no horizontal page scroll at 1600/1220/1100/900/390px;
and every section rendering in both themes with no console errors. Playwright is the quick
way — `chromium` is fine, force `.reveal` open first per landmine 4.

---

*Last updated 2026-09-17 against `2b9ea2c`.*
