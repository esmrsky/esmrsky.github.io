(function () {
  const tribes = window.TWELVE_DATA || [];
  const ultimate = window.TWELVE_ULTIMATE || { axes: [], resonance: [] };
  const diagnostic = window.TWELVE_DIAGNOSTIC || null;
  const scriptureApi = window.ESMRSKY_SCRIPTURE_API || window.TWELVE_SCRIPTURE_API || { configured: false };

  const BOOK_USFM = {
    'Genesis': 'GEN', 'Numbers': 'NUM', 'Deuteronomy': 'DEU', 'Joshua': 'JOS',
    'Judges': 'JDG', '1 Samuel': '1SA', '2 Samuel': '2SA', '1 Kings': '1KI',
    '1 Chronicles': '1CH', 'Nehemiah': 'NEH', 'Psalm': 'PSA', 'Proverbs': 'PRO',
    'Ecclesiastes': 'ECC', 'Isaiah': 'ISA', 'Micah': 'MIC', 'Matthew': 'MAT',
    'Mark': 'MRK', 'Luke': 'LUK', 'John': 'JHN', 'Acts': 'ACT', 'Romans': 'ROM',
    '1 Corinthians': '1CO', '2 Corinthians': '2CO', 'Galatians': 'GAL',
    'Ephesians': 'EPH', 'Hebrews': 'HEB', 'James': 'JAS', '1 John': '1JN',
    'Revelation': 'REV'
  };

  const webVersion = {
    id: 'web',
    abbreviation: 'WEB',
    title: 'World English Bible',
    copyright: 'World English Bible (WEB). Public domain.',
    deepLink: ''
  };

  const preferredVersions = [
    { id: 111, abbreviation: 'NIV', title: 'New International Version', copyright: '', deepLink: 'https://www.bible.com/versions/111' },
    { id: 2692, abbreviation: 'NASB2020', title: 'New American Standard Bible 2020', copyright: '', deepLink: 'https://www.bible.com/versions/2692' },
    { id: 1849, abbreviation: 'TPT', title: 'The Passion Translation', copyright: '', deepLink: 'https://www.bible.com/versions/1849' }
  ];

  const ICONS = {
    host: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 21c2.5-7 17.5-7 20 0v4H6v-4Z"/><path d="M9 17c0-5 3-9 7-9s7 4 7 9"/><path d="M16 8V4M12.5 9 10 6M19.5 9 22 6"/></svg>`,
    shield: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 28S7 24 7 16V7l9-3 9 3v9c0 8-9 12-9 12Z"/><path d="m11 20 10-10M17 10h4v4"/></svg>`,
    crown: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m6 11 5 5 5-10 5 10 5-5-2 13H8L6 11Z"/><path d="M9 27h14"/><path d="M6 7c4 2 4-2 8 0s4-2 8 0 4-2 4-2" opacity=".65"/></svg>`,
    deer: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 13c0-4 2-7 5-7s5 3 5 7v6c0 4-2 8-5 9-3-1-5-5-5-9v-6Z"/><path d="M12 11 7 7V3M9 9 5 9M20 11l5-4V3M23 9h4"/><path d="M13.5 17h.01M18.5 17h.01M14 22h4"/></svg>`,
    lion: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3c7 0 12 5 12 12 0 8-6 14-12 14S4 23 4 15C4 8 9 3 16 3Z"/><path d="M10 8 7 5v7M22 8l3-3v7"/><path d="M10 15c0-4 2-7 6-7s6 3 6 7v5c0 4-3 7-6 7s-6-3-6-7v-5Z"/><path d="M13 16h.01M19 16h.01M14 21l2 1 2-1"/></svg>`,
    bull: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 11c-4 0-6-3-6-7 4 0 8 2 9 6M22 11c4 0 6-3 6-7-4 0-8 2-9 6"/><path d="M9 12c0-4 3-6 7-6s7 2 7 6v8c0 5-3 9-7 9s-7-4-7-9v-8Z"/><path d="M12.5 16h.01M19.5 16h.01M13 22c2 2 4 2 6 0"/></svg>`,
    wolf: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m6 4 7 5h6l7-5-2 11 3 4-5 9H10l-5-9 3-4L6 4Z"/><path d="m10 16 4 2M22 16l-4 2M13 23h6M16 19v4"/></svg>`,
    blade: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m23 3 5 5-15 15-6 2 2-6L23 3Z"/><path d="m20 6 5 5M7 25l-3 3M11 21l4 4"/><path d="M7 8c3 1 5 3 6 6" opacity=".65"/></svg>`,
    anchor: `<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="7" r="3"/><path d="M16 10v17M10 14h12M6 20c1 5 5 8 10 8s9-3 10-8M6 20l4 1M26 20l-4 1"/><path d="M4 8c3-2 5 2 8 0s5 2 8 0 5 2 8 0" opacity=".65"/></svg>`,
    lamp: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 14h10l2 12H9l2-12Z"/><path d="M13 14c0-4 3-5 3-9 3 3 4 6 3 9"/><path d="M7 26h18M12 29h8"/><path d="M16 4V2"/></svg>`,
    scroll: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M9 5h15c2 0 3 1 3 3s-1 3-3 3H11"/><path d="M24 11v13c0 2-1 3-3 3H8c-2 0-3-1-3-3s1-3 3-3h13"/><path d="M9 5v16M13 13h7M13 17h7"/><path d="m22 3 .5 1.5L24 5l-1.5.5L22 7l-.5-1.5L20 5l1.5-.5L22 3Z"/></svg>`,
    scales: `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4v23M10 28h12M8 8h16M16 5l-4-2"/><path d="m8 8-5 9h10L8 8ZM24 8l-5 9h10l-5-9Z"/><path d="M3 17c0 3 2 5 5 5s5-2 5-5M19 17c0 3 2 5 5 5s5-2 5-5"/></svg>`
  };

  const grid = document.getElementById('tribeGrid');
  const wheel = document.getElementById('twelveWheel');
  const search = document.getElementById('patternSearch');
  const resultsLine = document.getElementById('resultsLine');
  const emptyState = document.getElementById('emptyState');
  const viewButtons = Array.from(document.querySelectorAll('[data-view]'));
  const dialog = document.getElementById('profileDialog');
  const profileHeader = document.getElementById('profileHeader');
  const profileEmblem = document.getElementById('profileEmblem');
  const profileTribe = document.getElementById('profileTribe');
  const profileTitle = document.getElementById('profileTitle');
  const profileBody = document.getElementById('profileBody');
  const diagnosticBox = document.getElementById('diagnosticBox');
  const diagnosticResult = document.getElementById('diagnosticResult');
  let currentView = 'calling';
  let currentProfileId = null;
  let questionIndex = -1;
  let diagnosticAnswers = loadDiagnosticAnswers();
  let savedDiagnosticResult = loadDiagnosticResult();
  let bibleVersions = [...preferredVersions, webVersion];
  let selectedBibleVersionId = loadBibleVersionId() || '111';
  let bibleVersionsState = scriptureApi.configured ? 'loading' : 'local';
  let scriptureLoadToken = 0;

  function icon(name) {
    return ICONS[name] || ICONS.scroll;
  }

  function loadDiagnosticAnswers() {
    try {
      const saved = JSON.parse(localStorage.getItem('twelve-diagnostic-answers'));
      return saved && Array.isArray(saved.p1) && Array.isArray(saved.p2) && Array.isArray(saved.p3)
        ? saved
        : { p1: [], p2: [], p3: [] };
    } catch (error) {
      return { p1: [], p2: [], p3: [] };
    }
  }

  function saveDiagnosticAnswers() {
    try {
      localStorage.setItem('twelve-diagnostic-answers', JSON.stringify(diagnosticAnswers));
    } catch (error) {
      // The diagnostic still works when storage is unavailable.
    }
  }

  function loadDiagnosticResult() {
    try {
      return JSON.parse(localStorage.getItem('twelve-diagnostic-result'));
    } catch (error) {
      return null;
    }
  }

  function saveDiagnosticResult(result) {
    savedDiagnosticResult = result;
    try {
      if (result) localStorage.setItem('twelve-diagnostic-result', JSON.stringify(result));
      else localStorage.removeItem('twelve-diagnostic-result');
    } catch (error) {
      // The result remains available for the current page view.
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function referenceBadge(reference) {
    return `<span class="reference-badge">${escapeHtml(reference)}</span>`;
  }

  function inlineVerses(entry) {
    return entry.verses.map(verse => `<span class="inline-verse"><sup aria-hidden="true">${verse.number}</sup>${escapeHtml(verse.text)}</span>`).join(' ');
  }

  function loadBibleVersionId() {
    try {
      return localStorage.getItem('twelve-bible-version-id');
    } catch (error) {
      return null;
    }
  }

  function saveBibleVersionId(versionId) {
    try {
      localStorage.setItem('twelve-bible-version-id', String(versionId));
    } catch (error) {
      // Translation selection still applies for the current page view.
    }
  }

  function referenceToUsfm(reference) {
    const match = String(reference).match(/^(.+?) (\d+):(\d+)(?:[–-](\d+))?$/);
    if (!match || !BOOK_USFM[match[1]]) return '';
    return `${BOOK_USFM[match[1]]}.${match[2]}.${match[3]}${match[4] ? `-${match[4]}` : ''}`;
  }

  function selectedBibleVersion() {
    return bibleVersions.find(version => String(version.id) === String(selectedBibleVersionId)) || webVersion;
  }

  function shortVersionName(version) {
    return String(version.abbreviation).toUpperCase() === 'NASB2020' ? 'NASB' : version.abbreviation;
  }

  function bibleVersionButtons() {
    return bibleVersions.map(version => {
      const active = String(version.id) === String(selectedBibleVersionId);
      return `<button type="button" data-bible-version-id="${escapeHtml(version.id)}" class="${active ? 'active' : ''}" aria-pressed="${active}" title="${escapeHtml(version.title)}">${escapeHtml(shortVersionName(version))}</button>`;
    }).join('');
  }

  function syncBibleVersionControls() {
    const selected = selectedBibleVersion();
    document.querySelectorAll('[data-current-version]').forEach(label => {
      label.textContent = shortVersionName(selected);
    });
    document.querySelectorAll('[data-version-options]').forEach(container => {
      container.innerHTML = bibleVersionButtons();
    });
  }

  function bibleVersionStatus() {
    if (bibleVersionsState === 'loading') return 'Connecting to available translations…';
    if (bibleVersionsState === 'error') return 'Licensed translations are temporarily unavailable. WEB remains ready.';
    if (bibleVersionsState === 'local') return 'WEB is ready. Licensed translations will appear after the Cloudflare connection is published.';
    if (bibleVersionsState === 'empty') return 'WEB is ready. The requested licensed translations are not available to this YouVersion app yet.';
    return 'Choose a translation for every Scripture passage in this profile.';
  }

  function confidenceBadge(level, label) {
    const normalized = level === 'interpretive' ? 'inference' : level;
    return `<span class="confidence ${normalized}">${label || (normalized === 'inference' ? 'Interpretive' : normalized)}</span>`;
  }

  function searchText(tribe) {
    return [
      tribe.tribe,
      tribe.name,
      tribe.frequency,
      tribe.calling,
      tribe.strengths.join(' '),
      tribe.pressures.join(' '),
      tribe.attack,
      tribe.spiral,
      tribe.axis,
      ...(tribe.fivefold || []).map(item => item.name),
      tribe.gift && tribe.gift.name,
      tribe.secular && `${tribe.secular.label} ${tribe.secular.pearson}`,
      tribe.blueprint && tribe.blueprint.figure,
      tribe.burnout,
      tribe.isolation,
      ...(tribe.roles || []),
      tribe.search
    ].join(' ').toLowerCase();
  }

  function cardMarkup(tribe, index) {
    const pressureView = currentView === 'pressure';
    const title = pressureView ? tribe.pressures.join(' · ') : tribe.frequency;
    const copy = pressureView ? tribe.spiral : tribe.calling;
    const chips = pressureView ? tribe.pressures : tribe.strengths.slice(0, 3);
    return `
      <button class="tribe-card" type="button" data-tribe="${tribe.id}" style="--tribe-color:${tribe.color};--i:${index}" aria-label="Open ${tribe.tribe}, ${tribe.name} profile">
        <span class="card-topline">
          <span class="tribe-emblem">${icon(tribe.icon)}</span>
          <span class="card-index">${tribe.number} / 12</span>
        </span>
        <span class="card-heading">
          <p>${tribe.tribe}</p>
          <h3>${tribe.name}</h3>
        </span>
        <span class="card-mode">
          <span class="mode-label">${pressureView ? 'The repeated bend' : 'Core frequency'}</span>
          <span class="mode-title">${title}</span>
          <span class="mode-copy">${copy}</span>
        </span>
        <span class="card-chips">${chips.map(item => `<span class="card-chip">${item}</span>`).join('')}</span>
        <span class="card-open">Open field guide <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </button>`;
  }

  function renderCards() {
    const query = search.value.trim().toLowerCase();
    const filtered = query ? tribes.filter(tribe => searchText(tribe).includes(query)) : tribes;
    grid.innerHTML = filtered.map((tribe, index) => cardMarkup(tribe, index)).join('');
    resultsLine.textContent = filtered.length === 12
      ? 'Showing all twelve patterns'
      : `Showing ${filtered.length} of twelve patterns`;
    emptyState.hidden = filtered.length !== 0;
  }

  function witnessBadge(type) {
    const labels = {
      lineage: 'Lineage',
      association: 'Tribal association',
      parable: 'Parable',
      resonance: 'Pattern resonance'
    };
    return labels[type] || 'Pattern resonance';
  }

  function profileMarkup(tribe) {
    const journeyLabels = ['Bondage', 'Training', 'Fruit'];
    const scriptureVault = tribe.scriptureVault || [];
    const anchor = scriptureVault[0];
    return `
      <div class="profile-version-bar">
        <span>Translation</span>
        <div class="profile-version-pills" data-version-options role="group" aria-label="Bible translations">${bibleVersionButtons()}</div>
      </div>

      <div class="profile-intro">
        <article class="profile-block verse-block">
          <span class="evidence-badge" data-translation-badge>${escapeHtml(selectedBibleVersion().abbreviation)}</span>
          <blockquote data-scripture-anchor>${anchor ? inlineVerses(anchor) : `“${tribe.verse}”`}</blockquote>
          <cite>${referenceBadge(anchor ? anchor.ref : tribe.reference)}</cite>
        </article>
        <article class="profile-block frequency-block">
          <p class="section-kicker">Core frequency · interpretive map</p>
          <h3>${tribe.frequency}</h3>
          <p>${tribe.calling}</p>
        </article>
      </div>

      <details class="profile-drawer talent-drawer" open>
        <summary>
          <span><small>Capacity map</small>Talents and tradeoffs</span>
          <span class="drawer-prompt">Open profile layer</span>
        </summary>
        <div class="drawer-content talent-grid">
          <article class="talent-card strengths-card">
            <p class="section-kicker">Natural strengths</p>
            <h4>What this pattern tends to carry well</h4>
            <div class="talent-chips">${tribe.strengths.map(item => `<span>${item}</span>`).join('')}</div>
          </article>
          <article class="talent-card weakness-card">
            <p class="section-kicker">The weak side of the gift</p>
            <h4>What the same capacity can become under pressure</h4>
            <div class="talent-chips">${tribe.pressures.map(item => `<span>${item}</span>`).join('')}</div>
          </article>
          <article class="talent-card roles-card">
            <p class="section-kicker">Where it often shows up today</p>
            <h4>Familiar roles, not fixed job titles</h4>
            <div class="role-list">${tribe.roles.map(item => `<span>${item}</span>`).join('')}</div>
          </article>
        </div>
      </details>

      <details class="profile-drawer burnout-drawer">
        <summary>
          <span><small>Pressure diagnostic</small>Burnout vector</span>
          <span class="drawer-prompt">See the warning signals</span>
        </summary>
        <div class="drawer-content burnout-grid">
          <article class="burnout-card">
            <p class="section-kicker">Burnout vector</p>
            <p>${tribe.burnout}</p>
          </article>
          <article class="burnout-card">
            <p class="section-kicker">Isolation tactic</p>
            <p>${tribe.isolation}</p>
          </article>
          <article class="burnout-card lie-card">
            <p class="section-kicker">The lie underneath</p>
            <blockquote>“${tribe.lie}”</blockquote>
          </article>
        </div>
      </details>

      <details class="profile-drawer framework-drawer">
        <summary>
          <span><small>Cross-framework translation</small>How this connects to other maps</span>
          <span class="drawer-prompt">APEST, gifts, and modern roles</span>
        </summary>
        <div class="drawer-content framework-content">
          <p class="framework-note">These are correspondences, not claims that a tribe and a ministry gift or modern archetype are identical. Confidence labels show how tightly each layer can be supported.</p>
          <div class="framework-grid">
            <article class="framework-tile">
              <span>Fivefold / APEST</span>
              <strong>${tribe.fivefold.length ? tribe.fivefold.map(item => item.name).join(' + ') : 'No clean mapping'}</strong>
              <p>${tribe.fivefold.length ? tribe.fivefold.map(item => confidenceBadge(item.confidence, 'Partial')).join(' ') : confidenceBadge('none', 'No clean map')}</p>
            </article>
            <article class="framework-tile">
              <span>Romans 12 gift lens</span>
              <strong>${tribe.gift.name}</strong>
              <p>${confidenceBadge(tribe.gift.confidence, 'Interpretive')} The nearest redemptive-gift expression in this framework.</p>
            </article>
            <article class="framework-tile">
              <span>Core spiritual axis</span>
              <strong>${tribe.axis}</strong>
              <p>${confidenceBadge(tribe.axisConfidence, tribe.axisConfidence === 'strong' ? 'Strong' : 'Partial')} The tension this pattern repeatedly learns to hold in truth.</p>
            </article>
            <article class="framework-tile">
              <span>Modern archetype translation</span>
              <strong>${tribe.secular.label}</strong>
              <p>${confidenceBadge(tribe.secular.confidence, 'Interpretive')} ${tribe.secular.pearson}</p>
            </article>
            <article class="framework-tile framework-wide">
              <span>Primary blueprint case</span>
              <strong>${tribe.blueprint.figure}</strong>
              <p>${confidenceBadge(tribe.blueprint.evidence === 'genealogical' ? 'strong' : 'inference', tribe.blueprint.evidence === 'genealogical' ? 'Named lineage' : 'Story resonance')} ${tribe.blueprint.references.map(referenceBadge).join('')}</p>
            </article>
          </div>
        </div>
      </details>

      <details class="profile-drawer scripture-drawer">
        <summary>
          <span><small>Seven movements · full text</small>Read the pattern in Scripture</span>
          <span class="drawer-prompt" data-scripture-drawer-label>Read inline · ${escapeHtml(selectedBibleVersion().abbreviation)}</span>
        </summary>
        <div class="drawer-content">
          <div class="scripture-list">
            ${scriptureVault.map((entry, index) => `<article class="scripture-entry"><header><span>${entry.label}</span>${referenceBadge(entry.ref)}</header><blockquote data-scripture-index="${index}">${inlineVerses(entry)}</blockquote></article>`).join('')}
          </div>
          <div class="scripture-attribution">
            <div>
              <p class="translation-status" data-translation-status aria-live="polite">${bibleVersionStatus()}</p>
              <p class="scripture-credit" data-scripture-credit>${escapeHtml(webVersion.copyright)}</p>
            </div>
            <a class="scripture-deep-link" data-scripture-link href="#" target="_blank" rel="noopener" hidden>Open this version in YouVersion</a>
          </div>
        </div>
      </details>

      <details class="profile-drawer related-drawer">
        <summary>
          <span><small>Shared strengths and friction</small>Related patterns</span>
          <span class="drawer-prompt">See the productive tension</span>
        </summary>
        <div class="drawer-content relation-card">
          <div>
            <p class="section-kicker">Frequent friction pair</p>
            <p>${tribe.friction.note}</p>
          </div>
          <button type="button" class="relation-link" data-tribe="${tribe.friction.tribe}">Open ${tribes.find(item => item.id === tribe.friction.tribe).tribe} profile</button>
        </div>
      </details>

      <section class="profile-section">
        <div class="section-title-row">
          <div><p class="section-kicker">Where the pattern bends</p><h3>When pressure lands</h3></div>
          <span class="map-label">Map · test the resonance</span>
        </div>
        <div class="pressure-grid">
          <article class="profile-block pressure-card attack">
            <p class="section-kicker">The attack point</p>
            <p>${tribe.attack}</p>
          </article>
          <article class="profile-block pressure-card spiral">
            <p class="section-kicker">The familiar spiral</p>
            <p>${tribe.spiral}</p>
            <div class="pressure-tags">${tribe.pressures.map(item => `<span>${item}</span>`).join('')}</div>
          </article>
        </div>
      </section>

      <section class="profile-section">
        <div class="section-title-row">
          <div><p class="section-kicker">Interrupt and re-aim</p><h3>The practiced way through</h3></div>
        </div>
        <div class="action-grid">
          <article class="action-card immediate">
            <p class="section-kicker">In the first five minutes</p>
            <h4>Make the next move small and physical.</h4>
            <p>${tribe.firstMove}</p>
          </article>
          <article class="action-card">
            <p class="section-kicker">The longer practice</p>
            <h4>What breakthrough begins to look like</h4>
            <p>${tribe.breakthrough}</p>
          </article>
        </div>
      </section>

      <section class="profile-section">
        <div class="section-title-row">
          <div><p class="section-kicker">The testimony arc</p><h3>From bondage to fruit</h3></div>
        </div>
        <div class="journey-line">
          ${tribe.journey.map((item, index) => `
            <article class="journey-card">
              <p class="section-kicker">0${index + 1}</p>
              <h4>${journeyLabels[index]}</h4>
              <p>${item}</p>
            </article>`).join('')}
        </div>
      </section>

      <section class="profile-section">
        <div class="section-title-row">
          <div><p class="section-kicker">Biblical case files</p><h3>People who carried this strength—and its pressure.</h3></div>
          <span class="map-label">Evidence type is marked</span>
        </div>
        <p class="case-intro">Open a case to see the story, why it belongs here, where the pattern bent, and what changed. “Lineage” means the biblical text names the tribal connection; “resonance” means the person’s tribe is unknown or different, but the story clearly mirrors the pattern.</p>
        <div class="case-stack">
          ${tribe.cases.map(person => `
            <details class="case-file">
              <summary>
                <span class="case-summary-main">
                  <span class="case-title-line"><strong>${person.name}</strong>${referenceBadge(person.ref)}</span>
                  <span class="case-basis">${person.basis}</span>
                </span>
                <span class="witness-badge ${person.type}">${witnessBadge(person.type)}</span>
              </summary>
              <div class="case-content">
                <div class="case-story-grid">
                  <article>
                    <p class="section-kicker">What happened</p>
                    <p>${person.story}</p>
                  </article>
                  <article class="case-turn">
                    <p class="section-kicker">The turn—or the warning</p>
                    <p>${person.turn}</p>
                  </article>
                </div>
                <div class="case-trait-row">
                  <div><span>Strengths in the story</span>${person.strengths.map(item => `<b>${item}</b>`).join('')}</div>
                  ${person.shadows.length ? `<div class="shadow-traits"><span>Pressure patterns</span>${person.shadows.map(item => `<b>${item}</b>`).join('')}</div>` : ''}
                </div>
              </div>
            </details>`).join('')}
        </div>
      </section>`;
  }

  function setScriptureLoading(isLoading) {
    profileBody.querySelectorAll('[data-scripture-anchor], [data-scripture-index]').forEach(target => {
      target.classList.toggle('is-loading', isLoading);
      target.setAttribute('aria-busy', String(isLoading));
    });
  }

  function noteMixedAttribution(primaryVersion, fallbackVersion, includesWeb) {
    const credit = profileBody.querySelector('[data-scripture-credit]');
    if (!credit) return;
    const credits = [
      primaryVersion && (primaryVersion.copyright || `${primaryVersion.title}. Supplied by YouVersion.`),
      fallbackVersion && fallbackVersion.id !== primaryVersion.id && (fallbackVersion.copyright || `${fallbackVersion.title}. Supplied by YouVersion.`),
      includesWeb && webVersion.copyright
    ].filter(Boolean);
    credit.textContent = credits.join(' ');
  }

  function showWebFallback(message) {
    const selected = selectedBibleVersion();
    updateTranslationChrome(selected, message);
    const badge = profileBody.querySelector('[data-translation-badge]');
    const drawerLabel = profileBody.querySelector('[data-scripture-drawer-label]');
    const credit = profileBody.querySelector('[data-scripture-credit]');
    const link = profileBody.querySelector('[data-scripture-link]');
    if (badge) badge.textContent = 'WEB · fallback';
    if (drawerLabel) drawerLabel.textContent = 'Read inline · WEB fallback';
    if (credit) credit.textContent = webVersion.copyright;
    if (link) link.hidden = true;
  }

  function updateTranslationChrome(version, message) {
    const status = profileBody.querySelector('[data-translation-status]');
    const badge = profileBody.querySelector('[data-translation-badge]');
    const drawerLabel = profileBody.querySelector('[data-scripture-drawer-label]');
    const credit = profileBody.querySelector('[data-scripture-credit]');
    const link = profileBody.querySelector('[data-scripture-link]');

    syncBibleVersionControls();
    if (status) status.textContent = message || bibleVersionStatus();
    if (badge) badge.textContent = version.id === 'web' ? 'WEB · public domain' : `${version.abbreviation} · YouVersion`;
    if (drawerLabel) drawerLabel.textContent = `Read inline · ${version.abbreviation}`;
    if (credit) credit.textContent = version.copyright || `${version.title}. Supplied by YouVersion.`;
    if (link) {
      link.hidden = !version.deepLink;
      if (version.deepLink) link.href = version.deepLink;
    }
  }

  function restoreWebScripture(tribe) {
    const vault = tribe.scriptureVault || [];
    const anchor = profileBody.querySelector('[data-scripture-anchor]');
    if (anchor && vault[0]) anchor.innerHTML = inlineVerses(vault[0]);
    profileBody.querySelectorAll('[data-scripture-index]').forEach(target => {
      const entry = vault[Number(target.dataset.scriptureIndex)];
      if (entry) target.innerHTML = inlineVerses(entry);
    });
    setScriptureLoading(false);
  }

  async function hydrateProfileScripture(tribe) {
    const token = ++scriptureLoadToken;
    const version = selectedBibleVersion();
    restoreWebScripture(tribe);
    updateTranslationChrome(version);

    if (version.id === 'web') return;
    if (!scriptureApi.configured || typeof scriptureApi.getPassage !== 'function') {
      showWebFallback('This translation is not connected yet. Showing WEB.');
      return;
    }

    const vault = tribe.scriptureVault || [];
    setScriptureLoading(true);
    updateTranslationChrome(version, `Loading ${version.abbreviation} passages…`);
    const passages = await Promise.allSettled(vault.map(entry => {
      const usfm = referenceToUsfm(entry.ref);
      return usfm ? scriptureApi.getPassage(version.id, usfm) : Promise.reject(new Error('Unsupported reference.'));
    }));

    if (token !== scriptureLoadToken || currentProfileId !== tribe.id) return;
    let primaryLoaded = 0;
    const missingIndexes = [];
    passages.forEach((result, index) => {
      if (result.status !== 'fulfilled' || !result.value.content) {
        missingIndexes.push(index);
        return;
      }
      primaryLoaded += 1;
      const target = profileBody.querySelector(`[data-scripture-index="${index}"]`);
      if (target) target.textContent = result.value.content;
      if (index === 0) {
        const anchor = profileBody.querySelector('[data-scripture-anchor]');
        if (anchor) anchor.textContent = result.value.content;
      }
    });

    const niv = bibleVersions.find(item => String(item.abbreviation).toUpperCase() === 'NIV');
    let nivLoaded = 0;
    if (missingIndexes.length && niv && String(version.id) !== String(niv.id)) {
      updateTranslationChrome(version, `${version.abbreviation} is incomplete here. Loading NIV fallback…`);
      const nivPassages = await Promise.allSettled(missingIndexes.map(index => {
        const usfm = referenceToUsfm(vault[index].ref);
        return usfm ? scriptureApi.getPassage(niv.id, usfm) : Promise.reject(new Error('Unsupported reference.'));
      }));
      if (token !== scriptureLoadToken || currentProfileId !== tribe.id) return;
      nivPassages.forEach((result, resultIndex) => {
        if (result.status !== 'fulfilled' || !result.value.content) return;
        const index = missingIndexes[resultIndex];
        nivLoaded += 1;
        const target = profileBody.querySelector(`[data-scripture-index="${index}"]`);
        if (target) target.textContent = result.value.content;
        if (index === 0) {
          const anchor = profileBody.querySelector('[data-scripture-anchor]');
          if (anchor) anchor.textContent = result.value.content;
        }
      });
    }
    setScriptureLoading(false);

    const webCount = vault.length - primaryLoaded - nivLoaded;
    if (primaryLoaded === vault.length) {
      updateTranslationChrome(version, `${version.abbreviation} is shown throughout this profile.`);
    } else if (primaryLoaded > 0 || nivLoaded > 0) {
      const badge = profileBody.querySelector('[data-translation-badge]');
      const drawerLabel = profileBody.querySelector('[data-scripture-drawer-label]');
      const fallbackLabel = nivLoaded ? 'NIV fallback' : 'WEB fallback';
      updateTranslationChrome(primaryLoaded ? version : (niv || webVersion), `${version.abbreviation} supplied ${primaryLoaded} passage${primaryLoaded === 1 ? '' : 's'}${nivLoaded ? `; NIV supplied ${nivLoaded}` : ''}${webCount ? `; WEB supplied ${webCount}` : ''}.`);
      if (badge) badge.textContent = primaryLoaded ? `${version.abbreviation} · ${fallbackLabel}` : fallbackLabel;
      if (drawerLabel) drawerLabel.textContent = `Read inline · ${primaryLoaded ? version.abbreviation + ' + ' : ''}${nivLoaded ? 'NIV' : 'WEB'}`;
      noteMixedAttribution(primaryLoaded ? version : (niv || webVersion), nivLoaded ? niv : null, webCount > 0);
    } else {
      showWebFallback(`${version.abbreviation} could not be loaded. Showing WEB.`);
    }
  }

  async function initializeBibleVersions() {
    if (!scriptureApi.configured || typeof scriptureApi.getVersions !== 'function') return;
    try {
      const remoteVersions = await scriptureApi.getVersions();
      bibleVersions = [...remoteVersions, webVersion];
      bibleVersionsState = remoteVersions.length ? 'ready' : 'empty';
      if (!selectedBibleVersionId || !bibleVersions.some(version => String(version.id) === String(selectedBibleVersionId))) {
        const niv = remoteVersions.find(version => String(version.abbreviation).toUpperCase() === 'NIV');
        selectedBibleVersionId = niv ? String(niv.id) : 'web';
        saveBibleVersionId(selectedBibleVersionId);
      }
    } catch (error) {
      bibleVersionsState = 'error';
      selectedBibleVersionId = 'web';
    }

    if (currentProfileId) {
      const tribe = tribes.find(item => item.id === currentProfileId);
      if (tribe) hydrateProfileScripture(tribe);
    }
    syncBibleVersionControls();
  }

  function renderAxes() {
    const target = document.getElementById('axisGrid');
    if (!target) return;
    target.innerHTML = ultimate.axes.map((axis, index) => `
      <article class="axis-card axis-${axis.id}" style="--i:${index}">
        <div class="axis-topline"><span>Axis 0${axis.id}</span>${confidenceBadge('strong', 'Strong')}</div>
        <h4>${axis.name}</h4>
        <p>${axis.principle}</p>
        <div class="axis-tribes">
          ${axis.tribes.map(id => {
            const tribe = tribes.find(item => item.id === id);
            return `<button type="button" data-tribe="${id}">${tribe.tribe} · ${tribe.name}</button>`;
          }).join('')}
        </div>
        <div class="axis-scriptures">${axis.references.map(referenceBadge).join('')}</div>
      </article>`).join('');
  }

  function renderEvidenceMap() {
    const target = document.getElementById('evidenceMap');
    if (!target) return;
    target.innerHTML = tribes.map((tribe, index) => `
      <article class="evidence-card" style="--tribe-color:${tribe.color};--i:${index}">
        <button class="evidence-heading" type="button" data-tribe="${tribe.id}">
          <span class="tribe-emblem">${icon(tribe.icon)}</span>
          <span><small>${tribe.tribe}</small><strong>${tribe.name}</strong></span>
        </button>
        <dl>
          <div><dt>Axis</dt><dd>${tribe.axis}${confidenceBadge(tribe.axisConfidence, tribe.axisConfidence === 'strong' ? 'Strong' : 'Partial')}</dd></div>
          <div><dt>Fivefold / APEST</dt><dd>${tribe.fivefold.length ? tribe.fivefold.map(item => item.name).join(' + ') : 'No clean mapping'}${tribe.fivefold.length ? confidenceBadge('partial', 'Partial') : confidenceBadge('none', 'No clean map')}</dd></div>
          <div><dt>Romans 12 lens</dt><dd>${tribe.gift.name}${confidenceBadge('inference', 'Interpretive')}</dd></div>
          <div><dt>Modern translation</dt><dd>${tribe.secular.label} · ${tribe.secular.pearson}${confidenceBadge('inference', 'Interpretive')}</dd></div>
          <div><dt>Blueprint case</dt><dd>${tribe.blueprint.figure}${confidenceBadge(tribe.blueprint.evidence === 'genealogical' ? 'strong' : 'inference', tribe.blueprint.evidence === 'genealogical' ? 'Named lineage' : 'Story resonance')}${referenceBadge(tribe.blueprint.references[0])}</dd></div>
        </dl>
      </article>`).join('');
  }

  function renderGiftGroups() {
    const target = document.getElementById('giftGroups');
    if (!target) return;
    const groups = tribes.reduce((all, tribe) => {
      const key = tribe.gift.name;
      if (!all[key]) all[key] = [];
      all[key].push(tribe);
      return all;
    }, {});
    target.innerHTML = Object.entries(groups).map(([gift, members], index) => `
      <article class="gift-card" style="--gift-color:${members[0].color};--i:${index}">
        <span>${confidenceBadge('inference', 'Interpretive')}</span>
        <h4>${gift}</h4>
        <div>${members.map(tribe => `<button type="button" data-tribe="${tribe.id}" style="--tribe-color:${tribe.color}">${tribe.tribe}<small>${tribe.name}</small></button>`).join('')}</div>
      </article>`).join('');
  }

  function diagnosticSequence() {
    if (!diagnostic) return [];
    return [
      ...diagnostic.partI.map((item, index) => ({ kind: 'pressure', part: 1, index, item })),
      ...diagnostic.partII.map((item, index) => ({ kind: 'wiring', part: 2, index, item })),
      ...diagnostic.partIII.map((item, index) => ({ kind: 'forced', part: 3, index, item }))
    ];
  }

  function storedAnswer(step) {
    const key = `p${step.part}`;
    return diagnosticAnswers[key][step.index];
  }

  function firstUnansweredQuestion() {
    const sequence = diagnosticSequence();
    const index = sequence.findIndex(step => storedAnswer(step) == null);
    return index === -1 ? 0 : index;
  }

  function renderDiagnostic() {
    if (!diagnostic || !diagnosticBox) return;
    const sequence = diagnosticSequence();

    if (questionIndex === -2) {
      diagnosticBox.innerHTML = `
        <div class="diagnostic-complete">
          <p class="section-kicker">Diagnostic complete</p>
          <h3>Your result is a doorway into the atlas.</h3>
          <p>Open the suggested profile, compare its case files, and test both the calling and the pressure pattern—not only the flattering parts.</p>
          <button class="button secondary" type="button" data-diagnostic-action="restart">Take it again</button>
        </div>`;
      return;
    }

    if (questionIndex < 0) {
      const hasProgress = sequence.some(step => storedAnswer(step) != null);
      diagnosticBox.innerHTML = `
        <div class="diagnostic-start">
          <div>
            <p class="section-kicker">Structured discernment</p>
            <h3>Pressure. Wiring. Differentiation.</h3>
            <p>Answer for the pattern you return to across seasons, not only your best day or your hardest week. There are no virtuous answers.</p>
          </div>
          <div class="diagnostic-facts">
            <span><strong>12</strong> pressure prompts</span>
            <span><strong>12</strong> wiring prompts</span>
            <span><strong>3</strong> close-call prompts</span>
          </div>
          <div class="diagnostic-actions">
            <button class="button primary" type="button" data-diagnostic-action="${hasProgress ? 'resume' : 'start'}">${hasProgress ? 'Resume diagnostic' : 'Begin diagnostic'}</button>
            ${savedDiagnosticResult ? '<button class="button secondary" type="button" data-diagnostic-action="show-result">View saved result</button>' : ''}
          </div>
        </div>`;
      return;
    }

    const step = sequence[questionIndex];
    const partLabels = {
      1: ['Part I · pressure', 'How the gift bends under strain'],
      2: ['Part II · wiring', 'What feels native when you are healthy'],
      3: ['Part III · close calls', 'Distinguish patterns that share an axis']
    };
    const prompt = step.kind === 'forced' ? step.item.prompt : step.item.text;
    const options = step.kind === 'forced'
      ? [...step.item.options.map((option, index) => ({ value: index, label: option.text })), { value: -1, label: diagnostic.noneLabel }]
      : diagnostic.likert.map((label, index) => ({ value: index, label }));
    const current = storedAnswer(step);

    diagnosticBox.innerHTML = `
      <div class="diagnostic-progress"><span style="width:${((questionIndex + 1) / sequence.length) * 100}%"></span></div>
      <div class="diagnostic-question">
        <div class="question-meta"><span>${partLabels[step.part][0]}</span><span>${questionIndex + 1} / ${sequence.length}</span></div>
        <p class="question-context">${partLabels[step.part][1]}</p>
        <h3>${prompt}</h3>
        <div class="diagnostic-options ${step.kind === 'forced' ? 'forced-options' : ''}">
          ${options.map(option => `<button type="button" data-diagnostic-answer="${option.value}" class="${String(current) === String(option.value) ? 'selected' : ''}"><span>${option.label}</span></button>`).join('')}
        </div>
        <div class="question-actions">
          <button type="button" data-diagnostic-action="back" ${questionIndex === 0 ? 'disabled' : ''}>← Back</button>
          <button type="button" data-diagnostic-action="restart">Start over</button>
        </div>
      </div>`;
  }

  function scoreDiagnostic() {
    const scoring = diagnostic.scoring;
    const axisPressure = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
    diagnostic.partI.forEach((item, index) => {
      axisPressure[item.axis] += diagnosticAnswers.p1[index] ?? 0;
    });
    const wiring = {};
    diagnostic.partII.forEach((item, index) => {
      wiring[item.tribe] = diagnosticAnswers.p2[index] ?? 0;
    });
    const forced = {};
    diagnostic.partIII.forEach((item, index) => {
      const choice = diagnosticAnswers.p3[index];
      if (choice != null && choice >= 0) {
        const tribe = item.options[choice] && item.options[choice].tribe;
        if (tribe) forced[tribe] = (forced[tribe] || 0) + 1;
      }
    });

    const rows = tribes.map(tribe => {
      const relatedAxes = ultimate.resonance.filter(item => item.tribe === tribe.tribe);
      const resonance = relatedAxes.reduce((sum, item) => sum + scoring.resonanceFactor * axisPressure[item.axis], 0);
      const forcedScore = forced[tribe.tribe] ? scoring.forcedChoiceBonus : 0;
      const total = scoring.wiringWeight * (wiring[tribe.tribe] || 0) + axisPressure[tribe.axisId] + forcedScore + resonance;
      const hasForcedChoice = diagnostic.partIII.some(item => item.options.some(option => option.tribe === tribe.tribe));
      const max = scoring.wiringWeight * 3 + 6 + (hasForcedChoice ? scoring.forcedChoiceBonus : 0) + relatedAxes.length * scoring.resonanceFactor * 6;
      return { tribe: tribe.tribe, id: tribe.id, axisId: tribe.axisId, total, max, pct: total / max };
    }).sort((left, right) => right.pct - left.pct);

    const first = rows[0];
    const second = rows[1];
    let state = 'differentiated';
    if (first.pct < scoring.primaryFloor) state = 'null';
    else if (second && first.pct - second.pct < scoring.compositeGap && second.pct >= scoring.primaryFloor) state = 'composite';
    const secondary = state === 'differentiated' && second && second.pct >= scoring.secondaryRatio * first.pct && second.pct >= scoring.primaryFloor ? second.tribe : null;
    return {
      axisPressure,
      rows,
      state,
      primary: first.tribe,
      secondary,
      composite: state === 'composite'
        ? rows.filter(row => first.pct - row.pct < scoring.compositeGap && row.pct >= scoring.primaryFloor).slice(0, 3).map(row => row.tribe)
        : null
    };
  }

  function renderDiagnosticResult(result) {
    if (!diagnosticResult) return;
    if (!result) {
      diagnosticResult.innerHTML = '';
      return;
    }

    let headline;
    let copy;
    let suggested;
    if (result.state === 'null') {
      headline = 'The instrument did not differentiate.';
      copy = 'That is useful information, not a failed result. Your answers did not concentrate around one wiring strongly enough; explore the cards and notice which full story recognizes you.';
      suggested = result.rows.slice(0, 3).map(row => row.tribe);
    } else if (result.state === 'composite') {
      headline = 'You may be running a composite season.';
      copy = 'Several patterns landed within reach of one another. Read each complete profile and notice whether the calling, the pressure bend, and the practiced way through all fit.';
      suggested = result.composite;
    } else {
      const primary = tribes.find(tribe => tribe.tribe === result.primary);
      headline = `${primary.tribe} · ${primary.name}`;
      copy = `Your strongest starting hypothesis lives on the ${primary.axis} axis. Treat it as a profile to test, not an identity assigned by a score.`;
      suggested = [result.primary, result.secondary].filter(Boolean);
    }

    diagnosticResult.innerHTML = `
      <div class="result-shell">
        <div class="result-main">
          <p class="section-kicker">Your starting hypothesis</p>
          <h3>${headline}</h3>
          <p>${copy}</p>
          <div class="result-profiles">
            ${suggested.map(name => {
              const tribe = tribes.find(item => item.tribe === name);
              return `<button type="button" data-tribe="${tribe.id}" style="--tribe-color:${tribe.color}">${tribe.tribe}<small>${tribe.name}</small></button>`;
            }).join('')}
          </div>
        </div>
        <div class="result-axes">
          <p class="section-kicker">Pressure by axis</p>
          ${ultimate.axes.map(axis => {
            const value = result.axisPressure[axis.id] || 0;
            return `<div class="result-axis"><span>${axis.name}</span><i><b style="width:${(value / 6) * 100}%"></b></i><strong>${value}/6</strong></div>`;
          }).join('')}
        </div>
      </div>`;
  }

  function answerDiagnostic(value) {
    const sequence = diagnosticSequence();
    const step = sequence[questionIndex];
    if (!step) return;
    diagnosticAnswers[`p${step.part}`][step.index] = Number(value);
    saveDiagnosticAnswers();
    if (questionIndex === sequence.length - 1) {
      const result = scoreDiagnostic();
      saveDiagnosticResult(result);
      questionIndex = -2;
      renderDiagnostic();
      renderDiagnosticResult(result);
      diagnosticResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      questionIndex += 1;
      renderDiagnostic();
    }
  }

  function handleDiagnosticAction(action) {
    if (action === 'start') questionIndex = 0;
    if (action === 'resume') questionIndex = firstUnansweredQuestion();
    if (action === 'back') questionIndex = Math.max(0, questionIndex - 1);
    if (action === 'show-result') {
      renderDiagnosticResult(savedDiagnosticResult);
      diagnosticResult.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (action === 'restart') {
      if (!window.confirm('Start the diagnostic over and clear these answers?')) return;
      diagnosticAnswers = { p1: [], p2: [], p3: [] };
      saveDiagnosticAnswers();
      saveDiagnosticResult(null);
      renderDiagnosticResult(null);
      questionIndex = 0;
    }
    renderDiagnostic();
  }

  const detailAnimations = new WeakMap();
  let dialogCloseTimer = null;
  let dialogCloseHandler = null;

  function prefersReducedMotion() {
    return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function animateDetails(details) {
    const summary = details.querySelector(':scope > summary');
    if (!summary) return;
    const running = detailAnimations.get(details);
    const shouldOpen = running ? running.target !== 'open' : !details.open;

    if (prefersReducedMotion() || typeof details.animate !== 'function') {
      details.open = shouldOpen;
      return;
    }

    const startHeight = details.getBoundingClientRect().height;
    if (running) {
      running.animation.oncancel = null;
      running.animation.cancel();
    }
    if (shouldOpen) details.open = true;

    const borderHeight = parseFloat(getComputedStyle(details).borderTopWidth) + parseFloat(getComputedStyle(details).borderBottomWidth);
    const endHeight = shouldOpen ? details.scrollHeight + borderHeight : summary.getBoundingClientRect().height + borderHeight;
    details.classList.toggle('is-expanding', shouldOpen);
    details.classList.toggle('is-collapsing', !shouldOpen);
    details.style.height = `${startHeight}px`;
    details.style.overflow = 'clip';

    const animation = details.animate(
      { height: [`${startHeight}px`, `${endHeight}px`] },
      {
        duration: shouldOpen ? 380 : 280,
        easing: shouldOpen ? 'cubic-bezier(.2,.8,.2,1)' : 'cubic-bezier(.4,0,.2,1)'
      }
    );
    detailAnimations.set(details, { animation, target: shouldOpen ? 'open' : 'closed' });

    animation.onfinish = () => {
      details.open = shouldOpen;
      details.style.removeProperty('height');
      details.style.removeProperty('overflow');
      details.classList.remove('is-expanding', 'is-collapsing');
      detailAnimations.delete(details);
    };
  }

  function setupReveals() {
    const targets = Array.from(document.querySelectorAll('.section-heading, .study-block, .how-grid > article, .method-grid > article, .scripture-source-note'));
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach(target => target.classList.add('is-visible'));
      return;
    }
    const observer = new window.IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(target => {
      target.classList.add('reveal-ready');
      observer.observe(target);
    });
  }

  function openProfile(id) {
    const tribe = tribes.find(item => item.id === id);
    if (!tribe) return;
    currentProfileId = id;
    profileHeader.style.setProperty('--tribe-color', tribe.color);
    profileBody.style.setProperty('--tribe-color', tribe.color);
    profileEmblem.style.setProperty('--tribe-color', tribe.color);
    profileEmblem.innerHTML = icon(tribe.icon);
    profileTribe.textContent = `Tribe of ${tribe.tribe} · ${tribe.number} of 12`;
    profileTitle.textContent = tribe.name;
    profileBody.innerHTML = profileMarkup(tribe);
    hydrateProfileScripture(tribe);
    clearDialogCloseMotion();
    dialog.classList.remove('is-closing');
    if (!dialog.open) dialog.showModal();
    dialog.querySelector('.dialog-shell').scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  function clearDialogCloseMotion() {
    if (dialogCloseTimer) window.clearTimeout(dialogCloseTimer);
    if (dialogCloseHandler) dialog.removeEventListener('animationend', dialogCloseHandler);
    dialogCloseTimer = null;
    dialogCloseHandler = null;
  }

  function finishDialogClose() {
    clearDialogCloseMotion();
    if (dialog.open) dialog.close();
  }

  function closeProfile() {
    if (!dialog.open || dialog.classList.contains('is-closing')) return;
    if (prefersReducedMotion()) {
      dialog.close();
      return;
    }
    dialog.classList.add('is-closing');
    dialogCloseHandler = event => {
      if (event.target === dialog && event.animationName === 'profile-dialog-out') finishDialogClose();
    };
    dialog.addEventListener('animationend', dialogCloseHandler);
    dialogCloseTimer = window.setTimeout(finishDialogClose, 340);
  }

  function renderWheel() {
    tribes.forEach((tribe, index) => {
      const angle = (-90 + index * 30) * Math.PI / 180;
      const x = 50 + Math.cos(angle) * 43;
      const y = 50 + Math.sin(angle) * 43;
      const button = document.createElement('button');
      button.className = 'wheel-node';
      button.type = 'button';
      button.dataset.tribe = tribe.id;
      button.style.setProperty('--x', `${x}%`);
      button.style.setProperty('--y', `${y}%`);
      button.style.setProperty('--tribe-color', tribe.color);
      button.style.setProperty('--i', index);
      button.setAttribute('aria-label', `Open ${tribe.tribe}, ${tribe.name}`);
      button.title = `${tribe.tribe} · ${tribe.name}`;
      button.innerHTML = icon(tribe.icon);
      wheel.appendChild(button);
    });
  }

  function setView(view) {
    currentView = view;
    viewButtons.forEach(button => {
      const active = button.dataset.view === view;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    renderCards();
  }

  document.addEventListener('click', event => {
    const versionButton = event.target.closest('[data-bible-version-id]');
    if (versionButton) {
      selectedBibleVersionId = versionButton.dataset.bibleVersionId;
      saveBibleVersionId(selectedBibleVersionId);
      syncBibleVersionControls();
      document.getElementById('headerVersionMenu')?.removeAttribute('open');
      const tribe = tribes.find(item => item.id === currentProfileId);
      if (tribe) hydrateProfileScripture(tribe);
      return;
    }

    const summary = event.target.closest('summary');
    const interactiveChild = event.target.closest('a, button');
    if (summary && summary.parentElement && summary.parentElement.tagName === 'DETAILS' && !summary.parentElement.hasAttribute('data-native-details') && !interactiveChild) {
      event.preventDefault();
      animateDetails(summary.parentElement);
      return;
    }
    const tribeButton = event.target.closest('[data-tribe]');
    if (tribeButton) openProfile(tribeButton.dataset.tribe);
    const answerButton = event.target.closest('[data-diagnostic-answer]');
    if (answerButton) answerDiagnostic(answerButton.dataset.diagnosticAnswer);
    const actionButton = event.target.closest('[data-diagnostic-action]');
    if (actionButton) handleDiagnosticAction(actionButton.dataset.diagnosticAction);
    const versionMenu = document.getElementById('headerVersionMenu');
    if (versionMenu?.open && !versionMenu.contains(event.target)) versionMenu.removeAttribute('open');
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') document.getElementById('headerVersionMenu')?.removeAttribute('open');
  });

  const patternTools = document.querySelector('.pattern-tools');
  const patternsSection = document.getElementById('patterns');
  let stickyFrame = 0;

  function syncStickyPatternTools() {
    stickyFrame = 0;
    if (!patternTools || !patternsSection) return;
    const stickyTop = parseFloat(getComputedStyle(patternTools).top) || 0;
    const sectionRect = patternsSection.getBoundingClientRect();
    const toolsHeight = patternTools.getBoundingClientRect().height;
    const isStuck = sectionRect.top < stickyTop && sectionRect.bottom > stickyTop + toolsHeight + 24;
    patternTools.classList.toggle('is-stuck', isStuck);
  }

  function queueStickyPatternTools() {
    if (stickyFrame) return;
    stickyFrame = window.requestAnimationFrame(syncStickyPatternTools);
  }

  window.addEventListener('scroll', queueStickyPatternTools, { passive: true });
  window.addEventListener('resize', queueStickyPatternTools);

  search.addEventListener('input', renderCards);
  viewButtons.forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
  document.querySelectorAll('[data-example]').forEach(button => {
    button.addEventListener('click', () => {
      search.value = button.dataset.example;
      renderCards();
      search.focus();
    });
  });

  document.getElementById('dialogClose').addEventListener('click', closeProfile);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeProfile();
  });
  dialog.addEventListener('cancel', event => {
    event.preventDefault();
    closeProfile();
  });
  dialog.addEventListener('close', () => {
    clearDialogCloseMotion();
    dialog.classList.remove('is-closing');
    document.body.style.overflow = '';
    scriptureLoadToken += 1;
    currentProfileId = null;
  });

  const themeToggle = document.getElementById('themeToggle');
  function syncThemeLabel() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    const applyTheme = () => {
      document.documentElement.setAttribute('data-theme', next);
      syncThemeLabel();
    };
    if (document.startViewTransition && !prefersReducedMotion()) document.startViewTransition(applyTheme);
    else applyTheme();
    try {
      localStorage.setItem('twelve-theme', next);
    } catch (error) {
      // Theme preference still applies for this page view.
    }
  });

  renderWheel();
  renderCards();
  renderEvidenceMap();
  renderGiftGroups();
  renderDiagnostic();
  renderDiagnosticResult(savedDiagnosticResult);
  renderAxes();
  setupReveals();
  syncThemeLabel();
  syncBibleVersionControls();
  syncStickyPatternTools();
  initializeBibleVersions();
})();
