# Shared Scripture API

The reusable browser client lives at `/assets/scripture-api.js`. The Cloudflare Worker lives in `/scripture-api`; its private `.dev.vars` file is ignored by Git.

Load a small public configuration before the shared client:

```html
<script>
  window.ESMRSKY_SCRIPTURE_CONFIG = {
    apiBaseUrl: 'https://esmrsky-scripture-api.esmrsky.workers.dev'
  };
</script>
<script src="/assets/scripture-api.js"></script>
```

Then request the available translations and a passage:

```js
const versions = await window.ESMRSKY_SCRIPTURE_API.getVersions();
const passage = await window.ESMRSKY_SCRIPTURE_API.getPassage(111, 'JHN.3.16');
```

`getPassage` expects a YouVersion Bible ID and a USFM reference. The public client never contains the YouVersion app key. Add any new production or preview origins to `ALLOWED_ORIGINS` in `/scripture-api/wrangler.jsonc` before deploying.

## Live passages on a page

A page that wants its scripture to follow the translation picker marks each
passage with `data-verse` and lets the shared layer fill it:

```html
<q class="lv esv-skip" data-verse="Romans 5:8">…NIV, written out…</q>
```

Three rules hold across the estate:

1. **The markup holds the NIV, the estate's default.** What ships in the file is
   the NIV, so a first-time reader gets it without JavaScript and without a
   fetch. When a reader picks another translation and it can't be reached, the
   NIV stands in and the page says so — a caption reading `NIV, NASB unavailable`,
   or an `NIV` mark on an inline quotation. It is never passed off as the
   translation the reader chose. A page that quotes NIV carries Biblica's
   permission notice (copy it from `/the-word/`).
2. **`esv-skip` on the slot.** Scripture text is not somewhere the reference
   auto-linker should go hunting; the reference beside the passage is what gets
   linked.
3. **Fetch when it is about to be seen.** `/salvation/` carries over two hundred
   slots across some seventy chapters. Painting them all on load is a burst of
   requests for text most readers never scroll to, so slots are observed and
   filled as they come into view, and re-filled only when the picker changes.

To bake the markup — `/the-word/`, `/ecclesia/`, `/salvation/` and `/faith/` all
ship NIV — run the generator from a machine that can reach bolls.life and read
the diff before committing. (`/faith/` and `/salvation/` were baked from what their
own scripts render, so the baked text and the live text are identical; the
generator does not strip bolls's section headings or add `/faith/`'s quote marks.)

```sh
node tools/bake-verses.mjs salvation/index.html                 # dry run, NIV
node tools/bake-verses.mjs salvation/index.html --write
node tools/bake-verses.mjs salvation/index.html --version NASB --write
```

## Pop-ups hold the page still

While the context dialog is open, or a verse pop-up is pinned, the document is
frozen and the scrolling happens inside the viewer. The mechanism lives in
`/assets/scripture-popover.js` (and its `faith/scripture.js` fork), so every page
that loads the layer gets it: the body is pinned with `position: fixed` at the
scroll offset it froze at, `overscroll-behavior: contain` stops the viewer's own
scrolling chaining out to the page, and a pinned pop-up is capped to the room it
actually has so nothing of it — its buttons included — can end up below a fold
the reader can no longer scroll to.
