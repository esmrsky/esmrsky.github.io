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
