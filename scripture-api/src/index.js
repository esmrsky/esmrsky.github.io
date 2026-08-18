const YOUVERSION_BASE_URL = 'https://api.youversion.com/v1';
const DEFAULT_ORIGINS = ['https://esmrsky.github.io'];
const TARGET_TRANSLATIONS = /^(NIV|TPT|NASB2020)$/i;
const REQUESTED_VERSION_IDS = [111, 2692, 1849];
const PASSAGE_PATTERN = /^(?:[1-3][A-Z]{2}|[A-Z]{3})\.[1-9]\d{0,2}(?:\.[1-9]\d{0,2}(?:-[1-9]\d{0,2})?)?$/;

function allowedOrigins(env) {
  return (env.ALLOWED_ORIGINS || DEFAULT_ORIGINS.join(','))
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean);
}

function corsHeaders(origin, env) {
  const allowed = allowedOrigins(env);
  return {
    'Access-Control-Allow-Origin': allowed.includes(origin) ? origin : allowed[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function json(payload, status, origin, env, extraHeaders = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders(origin, env),
      ...extraHeaders
    }
  });
}

function normalizeVersion(version) {
  return {
    id: version.id,
    abbreviation: version.localized_abbreviation || version.abbreviation,
    title: version.localized_title || version.title,
    copyright: version.copyright || '',
    publisherUrl: version.publisher_url || '',
    deepLink: version.youversion_deep_link || ''
  };
}

async function youVersionRequest(path, env) {
  if (!env.YVP_APP_KEY) {
    return new Response(JSON.stringify({ message: 'YouVersion is not configured.' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return fetch(`${YOUVERSION_BASE_URL}${path}`, {
    headers: {
      'Accept': 'application/json',
      'Accept-Language': 'en',
      'X-YVP-App-Key': env.YVP_APP_KEY
    }
  });
}

async function readUpstream(response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(body.message || 'The Scripture service could not complete this request.');
    error.status = response.status;
    throw error;
  }
  return body;
}

async function fetchVersions(env) {
  const versions = await Promise.all(REQUESTED_VERSION_IDS.map(async versionId => {
    const metadataResponse = await youVersionRequest(`/bibles/${versionId}`, env);
    if (!metadataResponse.ok) return null;
    const accessResponse = await youVersionRequest(`/bibles/${versionId}/passages/JHN.3.16?format=text`, env);
    if (!accessResponse.ok) return null;
    return metadataResponse.json();
  }));

  return versions
    .filter(Boolean)
    .filter(version => TARGET_TRANSLATIONS.test(version.localized_abbreviation || version.abbreviation || ''))
    .map(normalizeVersion)
    .sort((left, right) => {
      const order = ['NIV', 'NASB2020', 'TPT'];
      return order.indexOf(left.abbreviation.toUpperCase()) - order.indexOf(right.abbreviation.toUpperCase());
    });
}

async function handleVersions(request, env, ctx, origin) {
  const cache = caches.default;
  const cacheUrl = new URL(request.url);
  cacheUrl.searchParams.set('_origin', origin);
  const cacheKey = new Request(cacheUrl.toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const response = json(
    { data: await fetchVersions(env) },
    200,
    origin,
    env,
    { 'Cache-Control': 'public, max-age=900, s-maxage=3600' }
  );
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

async function handlePassage(request, env, ctx, origin) {
  const url = new URL(request.url);
  const versionId = url.searchParams.get('version') || '';
  const passage = (url.searchParams.get('passage') || '').toUpperCase();

  if (!/^\d{1,6}$/.test(versionId) || !PASSAGE_PATTERN.test(passage)) {
    return json({ message: 'A valid version and USFM passage are required.' }, 400, origin, env);
  }

  const cache = caches.default;
  const canonicalUrl = new URL(url.origin + url.pathname);
  canonicalUrl.searchParams.set('version', versionId);
  canonicalUrl.searchParams.set('passage', passage);
  canonicalUrl.searchParams.set('_origin', origin);
  const cacheKey = new Request(canonicalUrl.toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const upstream = await readUpstream(
    await youVersionRequest(`/bibles/${versionId}/passages/${encodeURIComponent(passage)}?format=text`, env)
  );
  const response = json(
    { id: upstream.id, content: upstream.content, reference: upstream.reference },
    200,
    origin,
    env,
    { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' }
  );
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const permitted = allowedOrigins(env);
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      if (!permitted.includes(origin)) return new Response(null, { status: 403 });
      return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    }

    if (request.method !== 'GET') {
      return json({ message: 'Method not allowed.' }, 405, origin, env, { 'Allow': 'GET, OPTIONS' });
    }

    if (url.pathname === '/health') {
      return json({ ok: true, configured: Boolean(env.YVP_APP_KEY) }, 200, origin, env);
    }

    if (!permitted.includes(origin)) {
      return json({ message: 'Origin not allowed.' }, 403, permitted[0], env);
    }

    try {
      if (url.pathname === '/versions') return await handleVersions(request, env, ctx, origin);
      if (url.pathname === '/passage') return await handlePassage(request, env, ctx, origin);
      return json({ message: 'Not found.' }, 404, origin, env);
    } catch (error) {
      const status = error.status >= 400 && error.status < 500 ? error.status : 502;
      return json({ message: error.message || 'The Scripture service is temporarily unavailable.' }, status, origin, env);
    }
  }
};
