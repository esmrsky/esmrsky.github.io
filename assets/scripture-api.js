(function () {
  const config = window.ESMRSKY_SCRIPTURE_CONFIG || window.TWELVE_SCRIPTURE_CONFIG || {};
  const apiBaseUrl = String(config.apiBaseUrl || '').replace(/\/$/, '');
  const passageCache = new Map();
  let versionsPromise = null;

  async function request(path) {
    const response = await fetch(`${apiBaseUrl}${path}`, {
      headers: { Accept: 'application/json' }
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(body.message || 'Scripture could not be loaded.');
    return body;
  }

  function getVersions() {
    if (!apiBaseUrl) return Promise.resolve([]);
    if (!versionsPromise) {
      versionsPromise = request('/versions')
        .then(body => body.data || [])
        .catch(error => {
          versionsPromise = null;
          throw error;
        });
    }
    return versionsPromise;
  }

  function getPassage(versionId, usfm) {
    if (!apiBaseUrl) return Promise.reject(new Error('Licensed translations are not connected yet.'));
    const key = `${versionId}:${usfm}`;
    if (!passageCache.has(key)) {
      passageCache.set(
        key,
        request(`/passage?version=${encodeURIComponent(versionId)}&passage=${encodeURIComponent(usfm)}`)
          .catch(error => {
            passageCache.delete(key);
            throw error;
          })
      );
    }
    return passageCache.get(key);
  }

  const api = {
    configured: Boolean(apiBaseUrl),
    getVersions,
    getPassage
  };
  window.ESMRSKY_SCRIPTURE_API = api;
  window.TWELVE_SCRIPTURE_API = api;
})();
