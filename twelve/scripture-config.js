// Public configuration only. Never put the YouVersion app key in this file.
const esmSkyIsLocalPreview = location.hostname === '127.0.0.1' || location.hostname === 'localhost';
window.ESMRSKY_SCRIPTURE_CONFIG = {
  apiBaseUrl: esmSkyIsLocalPreview
    ? 'http://127.0.0.1:8787'
    : 'https://esmrsky-scripture-api.esmrsky.workers.dev'
};
window.TWELVE_SCRIPTURE_CONFIG = window.ESMRSKY_SCRIPTURE_CONFIG;
