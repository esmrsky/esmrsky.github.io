# ESMR Sky Scripture API

This shared Cloudflare Worker keeps the YouVersion app key out of every public ESMR Sky site. It exposes the licensed versions available to the app key and returns passages by YouVersion Bible ID and USFM reference.

## Local setup

1. Put the app key after `YVP_APP_KEY=` in `.dev.vars`.
2. Run `npx wrangler dev` from this directory.

`.dev.vars` is ignored by Git and must never be committed.

## Production setup

1. Run `npx wrangler secret put YVP_APP_KEY` and paste the key at Wrangler's private prompt.
2. Run `npx wrangler deploy`.
3. Put the resulting Worker URL in each site's public configuration file. Twelve uses `../twelve/scripture-config.js`.

The Worker checks NIV, NASB 2020, and TPT with the supplied YouVersion app key.

`GET /passage?version=111&passage=COL.3` returns plain text. Add `&format=html` to keep YouVersion's verse markers (`<span class="yv-v" v="23">`): that is how the estate's clients split a chapter into numbered verses, one request per chapter, cached at the edge for a day. The estate reads NIV (111) from here.

YouVersion drops its footnote markers without keeping the space beside them, so words run together ("inChrist", "the Lordfrom your mouth"). The Worker always fetches HTML, repairs those joins in `src/unjoin.js`, and flattens the result for plain-text requests, which reproduces YouVersion's own plain text. The edge cache key carries `_repair`: bump it whenever the repair changes, or the edge keeps serving copies made before it for up to a day. Sites can use the public-domain WEB as their final local fallback.

See `../SCRIPTURE_API.md` for the browser client and integration example.
