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

The Worker checks NIV, NASB 2020, and TPT with the supplied YouVersion app key. Sites can use the public-domain WEB as their final local fallback.

See `../SCRIPTURE_API.md` for the browser client and integration example.
