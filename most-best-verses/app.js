/**
 * The Most Best Verses — Fullscreen Stories, Dynamic Typography & Deep Grace Concordance
 * 
 * Features:
 * 1. Pure Verse-First Bento Cards with category tints.
 * 2. Mobile & Desktop Typography Settings Flyout Drawer with Live Translation, Font Family, Font Size & Line Height controls (Transparent live site preview, elevated container per theme).
 * 3. Conditional TPT Revelatory Notes (only visible when notes exist for the passage).
 * 4. Dynamic Multi-Translation Context Flow with inline highlighted target verse.
 * 5. Interlinear Greek & Hebrew Lexicon with Strong's concordance cards.
 * 6. Fullscreen Edge-to-Edge Stories Mode with 16 modern styles, Dynamic Auto-Fit (zero cut-off/clipping), left-aligned long verses, previous history navigation, and direct heart bookmarking.
 * 7. Resilient event delegation on sticky header, drawers, and modal overlays.
 */

(() => {
  'use strict';

  // The drawer offers concrete typeface names; earlier builds stored generic
  // aliases. Map the old values forward so the drawer can show a selection.
  const FONT_ALIASES = {
    serif: 'lora', sans: 'jakarta', editorial: 'newsreader',
    display: 'dm-serif', mono: 'inter'
  };
  const FONT_CHOICES = [
    'lora', 'newsreader', 'source-serif', 'merriweather',
    'jakarta', 'outfit', 'sora', 'bricolage', 'epilogue'
  ];

  function normalizeFontStyle(value) {
    const v = FONT_ALIASES[value] || value;
    return FONT_CHOICES.includes(v) ? v : 'lora';
  }

  // --- Global Application State ---
  const state = {
    version: localStorage.getItem('agy_bible_version') || 'NIV',
    /* The same answer the inline script in the head gives. It read `prefers-color-scheme` when
       nothing was stored and stamped `data-theme` before first paint; this defaulted to 'light'
       regardless, and `applyTheme` then overwrote the head's choice a moment later — so a reader
       whose system is dark got a white flash and then a light page anyway. */
    theme: localStorage.getItem('agy_bible_theme') ||
           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    fontStyle: normalizeFontStyle(localStorage.getItem('agy_font_style')),
    lineHeight: localStorage.getItem('agy_line_height') || '1.7',
    fontSize: parseFloat(localStorage.getItem('agy_font_size')) || 1.22,
    viewMode: localStorage.getItem('agy_view_mode') || 'bento',
    category: 'all',
    favoritesOnly: false,
    favorites: new Set(JSON.parse(localStorage.getItem('agy_bible_favs') || '[]')),
    
    // Unified Reader Lightbox
    activeReaderVerseId: 1,
    activeReaderVersion: localStorage.getItem('agy_bible_version') || 'NIV',

    // Fullscreen Endless Stories Mode
    isStoriesMode: false,
    hasTappedStoryOnce: false,
    storyShufflePool: [],
    storyHistory: [],
    storyCurrentVerse: null,
    /* One translation for the session, the reader's own, cycled from the pill in the bar. It
       used to be drawn at random per verse, which meant the same passage read differently every
       time it came round and no two verses in a row were in the same voice. */
    storyCurrentVer: localStorage.getItem('agy_bible_version') || 'NIV',

    storyHasRendered: false
  };


  // Readers who ask the OS to reduce motion get instant jumps rather than
  // smooth scrolling; the CSS half of this lives in styles.css.
  const reducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const scrollBehavior = () => (reducedMotion() ? 'auto' : 'smooth');

  // --- Modal focus management ---
  // The dialogs are plain divs toggled by a class, so nothing moved focus into
  // them, nothing gave it back on close, and Tab walked straight out into the
  // page behind. Marking the page regions `inert` handles both the focus trap
  // and the accessibility tree in one step.
  let lastFocusedBeforeDialog = null;

  function pageRegions() {
    return [
      document.getElementById('stickyHeader'),
      document.querySelector('main.app-container'),
      document.querySelector('footer.site-footer')
    ].filter(Boolean);
  }

  function enterDialog(dialog) {
    if (!dialog) return;
    lastFocusedBeforeDialog = document.activeElement;
    pageRegions().forEach(el => { el.inert = true; });
    dialog.removeAttribute('aria-hidden');
    dialog.setAttribute('tabindex', '-1');
    // The drawer transitions `visibility`, so it stays `hidden` — and
    // therefore unfocusable — until the transition has actually advanced.
    // Retry across frames until focus lands or the transition is long past.
    const claimFocus = (frame) => {
      dialog.focus({ preventScroll: true });
      if (document.activeElement === dialog) return;
      if (frame < 40) requestAnimationFrame(() => claimFocus(frame + 1));
    };
    claimFocus(0);
  }

  function exitDialog(dialog) {
    if (!dialog) return;
    // Drop focus before hiding, so it is never left on a hidden element.
    if (dialog.contains(document.activeElement)) document.activeElement.blur();
    dialog.setAttribute('aria-hidden', 'true');
    if (document.querySelectorAll('[role="dialog"]:not([aria-hidden="true"])').length === 0) {
      pageRegions().forEach(el => { el.inert = false; });
    }
    if (lastFocusedBeforeDialog && document.contains(lastFocusedBeforeDialog)) {
      lastFocusedBeforeDialog.focus({ preventScroll: true });
    }
    lastFocusedBeforeDialog = null;
  }

  // --- DOM References ---
  let elements = {};

  function initElements() {
    elements = {
      html: document.documentElement,
      stickyHeader: document.getElementById('stickyHeader'),
      btnHeroOpenStories: document.getElementById('btnHeroOpenStories'),
      bentoContainer: document.getElementById('bentoContainer'),
      categoryChips: document.getElementById('categoryChips'),
      favoritesFilterBtn: document.getElementById('favoritesFilterBtn'),
      favoritesCount: document.getElementById('favoritesCount'),
      noResults: document.getElementById('noResults'),
      resetFiltersBtn: document.getElementById('resetFiltersBtn'),
      scrollToTopBtn: document.getElementById('scrollToTopBtn'),
      btnOpenTypeSettings: document.getElementById('btnOpenTypeSettings'),
      btnShuffleVerses: document.getElementById('btnShuffleVerses'),
      mobileVersionPicker: document.getElementById('mobileVersionPicker'),
      mobileVersionTrigger: document.getElementById('mobileVersionTrigger'),
      mobileVersionValue: document.getElementById('mobileVersionValue'),
      mobileVersionMenu: document.getElementById('mobileVersionMenu'),
      chipScrollPrev: document.getElementById('chipScrollPrev'),
      chipScrollNext: document.getElementById('chipScrollNext'),

      // Typography & Reading Settings Flyout Drawer DOM
      typeSettingsDrawer: document.getElementById('typeSettingsDrawer'),
      btnCloseTypeSettings: document.getElementById('btnCloseTypeSettings'),
      settingsActiveFontBadge: document.getElementById('settingsActiveFontBadge'),
      drawerFontCards: document.getElementById('drawerFontCards'),
      settingsFontSizeBadge: document.getElementById('settingsFontSizeBadge'),
      drawerFontSizePresets: document.getElementById('drawerFontSizePresets'),
      btnCustomFontSize: document.getElementById('btnCustomFontSize'),
      customFontSizeWrapper: document.getElementById('customFontSizeWrapper'),
      drawerFontSizeSlider: document.getElementById('drawerFontSizeSlider'),
      settingsLineHeightBadge: document.getElementById('settingsLineHeightBadge'),
      drawerLineHeightPresets: document.getElementById('drawerLineHeightPresets'),
      btnCustomLineHeight: document.getElementById('btnCustomLineHeight'),
      customLineHeightWrapper: document.getElementById('customLineHeightWrapper'),
      drawerLineHeightSlider: document.getElementById('drawerLineHeightSlider'),
      drawerThemePicker: document.getElementById('drawerThemePicker'),
      drawerVersionPicker: document.getElementById('drawerVersionPicker'),
      btnResetTypeSettings: document.getElementById('btnResetTypeSettings'),

      // Unified Reader Lightbox DOM
      readerLightbox: document.getElementById('readerLightbox'),
      readerTitle: document.getElementById('readerTitle'),
      readerCategoryBadge: document.getElementById('readerCategoryBadge'),
      readerChapterTitle: document.getElementById('readerChapterTitle'),
      readerChapterSummary: document.getElementById('readerChapterSummary'),
      readerInlinePassage: document.getElementById('readerInlinePassage'),
      readerTranslationsGrid: document.getElementById('readerTranslationsGrid'),
      readerGraceTheme: document.getElementById('readerGraceTheme'),
      readerGraceQuote: document.getElementById('readerGraceQuote'),
      readerGraceTakeaway: document.getElementById('readerGraceTakeaway'),
      readerCaseStudiesGrid: document.getElementById('readerCaseStudiesGrid'),
      readerLexiconLang: document.getElementById('readerLexiconLang'),
      readerInterlinearText: document.getElementById('readerInterlinearText'),
      readerLexiconGrid: document.getElementById('readerLexiconGrid'),
      readerLexiconSummary: document.getElementById('readerLexiconSummary'),
      secTptNotes: document.getElementById('sec-tpt-notes'),
      readerTptFootnotes: document.getElementById('readerTptFootnotes'),
      readerCrossRefsGrid: document.getElementById('readerCrossRefsGrid'),
      readerCloseBtn: document.getElementById('readerCloseBtn'),
      btnReaderTypeSettings: document.getElementById('btnReaderTypeSettings'),

      // Story Overlay DOM
      storyOverlay: document.getElementById('storyOverlay'),
      storyBackdrop: document.getElementById('storyBackdrop'),
      storyContainer: document.getElementById('storyContainer'),
      storyReel: document.getElementById('storyReel'),
      verseScroll: document.getElementById('verseScroll'),
      verseColumn: document.getElementById('verseColumn'),
      storyTicks: document.getElementById('storyTicks'),
      storyMotionMenu: document.getElementById('storyMotionMenu'),
      storyStage: document.getElementById('storyStage'),
      storyCube: document.getElementById('storyCube'),
      storyReader: document.getElementById('storyReader'),
      readerFaceTitle: document.getElementById('readerFaceTitle'),
      readerFaceSub: document.getElementById('readerFaceSub'),
      readerFaceBody: document.getElementById('readerFaceBody'),
      readerFaceVer: document.getElementById('readerFaceVer'),
      btnReaderClose: document.getElementById('btnReaderClose'),
      btnReaderMore: document.getElementById('btnReaderMore'),
      storyPassageRef: document.getElementById('storyPassageRef'),
      storyActiveVerBadge: document.getElementById('storyActiveVerBadge'),
      storyDeepPanel: document.getElementById('storyDeepPanel'),
      storyTapToast: document.getElementById('storyTapToast'),
      btnStoryDeeper: document.getElementById('btnStoryDeeper'),

      // Appearance lock (light / dark / shuffle)
      storyMode: document.getElementById('storyMode'),
      storyModeBtn: document.getElementById('storyModeBtn'),
      storyModeMenu: document.getElementById('storyModeMenu'),

      // Shortcuts Modal
      shortcutsModal: document.getElementById('shortcutsModal'),
      shortcutsCloseBtn: document.getElementById('shortcutsCloseBtn')
    };
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
    initElements();
    applyTheme(state.theme);
    applyFontStyle(state.fontStyle);
    applyLineHeight(state.lineHeight);
    applyFontSize(state.fontSize);
    applyViewMode(state.viewMode);
    setBibleVersion(state.version);
    syncSlideModeUI();

    updateCategoryCounts();
    render();
    setupEventListeners();
    refreshIcons();

    /* There is no landing page to arrive on — the site is the verses. Anything the hash asks
       for happens inside that, not instead of it. */
    openStoriesMode();
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);

    /* All that is left to do on a resize is re-measure the bar and put the reading line back.
       There used to be four of these — one on resize, one on `fonts.ready`, one on every
       `loadingdone`, and a preload of eighteen faces to provoke them — because the passage was
       measured and shrunk to fit, and every one of the twenty-two typefaces it might be drawn
       in changed that measurement by up to 1.9x. Nothing is fitted any more. The column simply
       runs on, in the one face the reader chose. */
    window.addEventListener('resize', () => {
      if (!state.isStoriesMode) return;
      syncFurnitureHeight();
      placeReading(stage.steps.length > 1 ? 'reading' : 'centre', false);
    });

    /* Nineteen faces, asked for once the page is up. Until one has answered, `drawItem` will
       not choose it — which is what stops a passage being set in the fallback and then re-set
       in the real face a moment later. */
    preloadPassageFaces();
    /* `styleIsReady` will not choose a face the browser does not have, but on a cold load it
       has none of them — the pool falls back to all seventeen and the first passage or two are
       set in whatever arrives. When the real face lands the paragraph re-wraps, and a passage
       that re-wraps under an anchored scroll position leaves that anchor pointing at the wrong
       line: measured on a cold load, the reading line landed 22px and once 150px low, and only
       on the first verses of a session. Both events put it back. Cheap now — there is nothing
       to re-fit, only a scroll offset to recompute. */
    const replace = () => {
      if (state.isStoriesMode) placeReading(stage.steps.length > 1 ? 'reading' : 'centre', false);
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(replace);
    if (document.fonts && document.fonts.addEventListener) {
      document.fonts.addEventListener('loadingdone', replace);
    }
  }

  function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash.startsWith('#story')) {
      openStoriesMode();
    } else if (hash === '#settings' || hash.startsWith('#settings')) {
      openTypeSettings();
    } else if (hash.startsWith('#verse=') || hash.startsWith('#study=') || hash.startsWith('#compare=')) {
      const match = hash.match(/id=(\d+)/) || hash.match(/=(\d+)/);
      const id = match ? parseInt(match[1], 10) : 1;
      openReaderLightbox(id);

      if (hash.includes('sec=')) {
        const secName = hash.split('sec=')[1].split('&')[0];
        setTimeout(() => {
          const el = document.getElementById(`sec-${secName}`);
          if (el) el.scrollIntoView({ behavior: scrollBehavior() });
        }, 150);
      }
    } else if (hash === '#bento' || hash === '' || hash === '#') {
      applyViewMode('bento');
    } else if (hash.startsWith('#theme=')) {
      const themeVal = hash.replace('#theme=', '').trim();
      if (['light', 'mud', 'dark'].includes(themeVal)) applyTheme(themeVal);
    }
  }

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // ==========================================================================
  // FILTERING & RENDERING (BENTO GRID)
  // ==========================================================================
  function updateCategoryCounts() {
    const counts = {
      all: BIBLE_VERSES.length,
      'joy-presence': 0,
      'provision-abundance': 0,
      'courage-protection': 0,
      'peace-rest': 0,
      'identity-grace': 0,
      'wisdom-word': 0,
      'faith-prayer': 0,
      'healing-renewal': 0
    };

    BIBLE_VERSES.forEach(v => {
      if (counts[v.category] !== undefined) counts[v.category]++;
    });

    Object.keys(counts).forEach(cat => {
      const el = document.getElementById(`count-${cat}`);
      if (el) el.textContent = counts[cat];
    });

    if (elements.favoritesCount) elements.favoritesCount.textContent = state.favorites.size;
  }

  function getFilteredVerses() {
    const source = state.shuffledOrder ? state.shuffledVerses : BIBLE_VERSES;
    return source.filter(verse => {
      if (state.category !== 'all' && verse.category !== state.category) return false;
      if (state.favoritesOnly && !state.favorites.has(verse.id)) return false;
      return true;
    });
  }

  function shuffleVerses() {
    state.shuffledOrder = true;
    const pool = [...BIBLE_VERSES];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    state.shuffledVerses = pool;
    render();
  }

  // --- Render Bento Grid (Vibrant Tints & Pure Scripture Focus) ---
  function render() {
    const filtered = getFilteredVerses();

    if (elements.favoritesCount) elements.favoritesCount.textContent = state.favorites.size;

    if (filtered.length === 0) {
      if (elements.bentoContainer) elements.bentoContainer.style.display = 'none';
      if (elements.noResults) elements.noResults.style.display = 'flex';
      refreshIcons();
      return;
    } else {
      if (elements.bentoContainer) elements.bentoContainer.style.display = '';
      if (elements.noResults) elements.noResults.style.display = 'none';
    }

    if (elements.bentoContainer) {
      elements.bentoContainer.innerHTML = filtered.map(verse => {
        const isFav = state.favorites.has(verse.id);
        const currentText = verse.translations[state.version] || verse.translations.NIV;
        const catClass = `cat-${verse.themeColor || 'amber'}`;

        return `
          <article class="bento-card ${catClass}" id="verse-card-${verse.id}" data-id="${verse.id}" data-category="${verse.category}">

            <!-- Stretched hit area: gives the card a single keyboard stop and an
                 accessible name without nesting the meta-row buttons inside it. -->
            <button class="card-open-btn" type="button" tabindex="0"
                    aria-label="Open ${escapeHtml(verse.ref)} — chapter context, translations and word study"></button>

            <!-- Pure Main Scripture Text -->
            <div class="card-verse-first">
              <blockquote class="scripture-text" id="verse-text-${verse.id}">
                "${escapeHtml(currentText)}"
              </blockquote>
            </div>

            <!-- Bottom Meta Row: Left = Category + Bookmark, Right = Unnumbered Reference -->
            <div class="card-meta-bottom">
              <div class="meta-bottom-left">
                <button class="category-tag" type="button" aria-label="Filter by ${escapeHtml(verse.categoryLabel)}">
                  <i data-lucide="${verse.icon || 'bookmark'}" style="width: 11px; height: 11px;"></i>
                  ${verse.categoryLabel}
                </button>
                <button class="card-action-btn btn-favorite ${isFav ? 'favorite-active' : ''}" data-id="${verse.id}" title="${isFav ? 'Remove Bookmark' : 'Bookmark Verse'}">
                  <i data-lucide="bookmark" style="width: 13px; height: 13px; ${isFav ? 'fill: currentColor;' : ''}"></i>
                </button>
              </div>

              <div class="meta-bottom-right">
                <span class="card-ref-badge">${escapeHtml(verse.ref)}</span>
              </div>
            </div>

          </article>
        `;
      }).join('');
    }

    refreshIcons();
  }

  // Escape a user-facing string for safe interpolation into a RegExp. Called by
  // the lexicon highlighter; its absence threw a ReferenceError that aborted
  // openReaderLightbox() before the modal was ever shown.
  function escapeRegExp(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // THEMES, FONTS & DISPLAY SETTINGS
  // ==========================================================================
  function applyTheme(theme) {
    if (theme === 'mud') theme = 'warm';
    state.theme = theme;
    elements.html.setAttribute('data-theme', theme);
    localStorage.setItem('agy_bible_theme', theme);

    // Header buttons
    document.querySelectorAll('.theme-picker .segmented-btn').forEach(btn => {
      const val = btn.getAttribute('data-theme-val');
      btn.classList.toggle('active', val === theme || (theme === 'warm' && val === 'mud'));
    });

    // Drawer buttons
    document.querySelectorAll('#drawerThemePicker .segmented-btn').forEach(btn => {
      const val = btn.getAttribute('data-theme-val');
      btn.classList.toggle('active', val === theme || (theme === 'warm' && val === 'mud'));
    });
  }

  function applyFontStyle(style) {
    style = normalizeFontStyle(style);
    state.fontStyle = style;
    
    // Remove old font-* classes
    elements.html.className = elements.html.className
      .replace(/font-\S+/g, '')
      .trim();
    elements.html.classList.add(`font-${style}`);
    localStorage.setItem('agy_font_style', style);

    // Drawer font buttons
    document.querySelectorAll('#drawerFontCards .font-pill-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-font') === style);
    });
  }

  function applyLineHeight(lh, isPreset = false) {
    const num = parseFloat(lh);
    state.lineHeight = lh.toString();
    document.documentElement.style.setProperty('--verse-line-height', state.lineHeight);
    localStorage.setItem('agy_line_height', state.lineHeight);

    if (elements.settingsLineHeightBadge) {
      elements.settingsLineHeightBadge.textContent = num.toFixed(2);
    }
    if (elements.drawerLineHeightSlider) {
      elements.drawerLineHeightSlider.value = num;
    }

    // Sync presets buttons
    let matchedPreset = false;
    document.querySelectorAll('#drawerLineHeightPresets .segmented-btn').forEach(btn => {
      const presetVal = parseFloat(btn.getAttribute('data-lh-val'));
      if (!isNaN(presetVal) && Math.abs(presetVal - num) < 0.04) {
        btn.classList.add('active');
        matchedPreset = true;
      } else if (btn.id !== 'btnCustomLineHeight') {
        btn.classList.remove('active');
      }
    });

    if (elements.btnCustomLineHeight) {
      if (!matchedPreset) {
        elements.btnCustomLineHeight.classList.add('active');
        if (elements.customLineHeightWrapper) elements.customLineHeightWrapper.style.display = 'block';
        if (elements.settingsLineHeightBadge) elements.settingsLineHeightBadge.style.display = 'inline-block';
      } else if (isPreset) {
        elements.btnCustomLineHeight.classList.remove('active');
        if (elements.customLineHeightWrapper) elements.customLineHeightWrapper.style.display = 'none';
        if (elements.settingsLineHeightBadge) elements.settingsLineHeightBadge.style.display = 'none';
      }
    }
  }

  function applyFontSize(size, isPreset = false) {
    const num = Math.min(1.85, Math.max(0.95, parseFloat(size)));
    state.fontSize = num;
    document.documentElement.style.setProperty('--verse-font-size', `${num}rem`);
    localStorage.setItem('agy_font_size', num.toString());

    if (elements.settingsFontSizeBadge) {
      elements.settingsFontSizeBadge.textContent = `${num.toFixed(2)}rem`;
    }
    if (elements.drawerFontSizeSlider) {
      elements.drawerFontSizeSlider.value = num;
    }

    // Sync presets buttons
    let matchedPreset = false;
    document.querySelectorAll('#drawerFontSizePresets .segmented-btn').forEach(btn => {
      const presetVal = parseFloat(btn.getAttribute('data-size-val'));
      if (!isNaN(presetVal) && Math.abs(presetVal - num) < 0.04) {
        btn.classList.add('active');
        matchedPreset = true;
      } else if (btn.id !== 'btnCustomFontSize') {
        btn.classList.remove('active');
      }
    });

    if (elements.btnCustomFontSize) {
      if (!matchedPreset) {
        elements.btnCustomFontSize.classList.add('active');
        if (elements.customFontSizeWrapper) elements.customFontSizeWrapper.style.display = 'block';
        if (elements.settingsFontSizeBadge) elements.settingsFontSizeBadge.style.display = 'inline-block';
      } else if (isPreset) {
        elements.btnCustomFontSize.classList.remove('active');
        if (elements.customFontSizeWrapper) elements.customFontSizeWrapper.style.display = 'none';
        if (elements.settingsFontSizeBadge) elements.settingsFontSizeBadge.style.display = 'none';
      }
    }
  }

  function applyViewMode(mode) {
    state.viewMode = mode;
    localStorage.setItem('agy_view_mode', mode);

    if (elements.heroOverview) elements.heroOverview.style.display = 'flex';
    if (elements.bentoContainer) elements.bentoContainer.style.display = 'block';
    document.body.classList.toggle('view-list', mode === 'list');
  }

  function setBibleVersion(ver) {
    const allowed = ['NIV', 'AMP', 'NKJV', 'TPT', 'NLT', 'NASB'];
    if (allowed.includes(ver)) {
      state.version = ver;
      localStorage.setItem('agy_bible_version', ver);

      // Header desktop buttons
      document.querySelectorAll('.version-picker .segmented-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-version') === ver);
      });

      // Header mobile dropdown — the site's own, not the OS picker
      if (elements.mobileVersionValue) elements.mobileVersionValue.textContent = ver;
      document.querySelectorAll('#mobileVersionMenu .mobile-version-opt').forEach(opt => {
        const on = opt.getAttribute('data-version') === ver;
        opt.classList.toggle('active', on);
        opt.setAttribute('aria-selected', String(on));
      });

      // Drawer buttons
      document.querySelectorAll('#drawerVersionPicker .segmented-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-version') === ver);
      });

      // Changing translation does not change *which* cards are on screen, so
      // rebuilding all 96 (and re-running createIcons over them) made the swap
      // look like a hard jump. Cross-fade the text in place instead.
      swapVerseTexts();
    }
  }

  function swapVerseTexts() {
    const grid = elements.bentoContainer;
    if (!grid) return;

    const paint = () => {
      grid.querySelectorAll('.bento-card').forEach(card => {
        const verse = BIBLE_VERSES.find(v => v.id === parseInt(card.dataset.id, 10));
        const target = card.querySelector('.scripture-text');
        if (verse && target) {
          target.textContent = `"${verse.translations[state.version] || verse.translations.NIV}"`;
        }
      });
    };

    if (reducedMotion()) { paint(); return; }

    grid.classList.add('is-swapping');
    window.setTimeout(() => {
      paint();
      requestAnimationFrame(() => grid.classList.remove('is-swapping'));
    }, 150);
  }

  // ==========================================================================
  // TYPOGRAPHY SETTINGS FLYOUT DRAWER (TRANSPARENT NO-BLUR LIVE PREVIEW)
  // ==========================================================================
  function openTypeSettings() {
    if (elements.typeSettingsDrawer) elements.typeSettingsDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    enterDialog(elements.typeSettingsDrawer);
    refreshIcons();
  }

  function closeTypeSettings() {
    if (elements.typeSettingsDrawer) elements.typeSettingsDrawer.classList.remove('active');
    document.body.style.overflow = '';
    exitDialog(elements.typeSettingsDrawer);
  }

  function resetTypeSettingsToDefault() {
    applyFontStyle('lora');
    applyFontSize(1.22, true);
    applyLineHeight('1.7', true);
    applyTheme('light');
    setBibleVersion('NIV');
  }

  // ==========================================================================
  // UNIFIED READER LIGHTBOX (CONTEXT FLOW, 4 TRANSLATIONS, LEXICONS & STUDY)
  // ==========================================================================
  /* One place that fills the study, so the panel cannot drift from what opened it — a verse
     changed underneath it by PREV or by the translation pill goes through here too. */
  function renderStudyFor(verse, ver) {
    state.activeReaderVerseId = verse.id;
    state.activeReaderVersion = ver;
    renderReaderContext(verse, ver);
    renderReaderTranslations(verse);
    renderReaderGraceInsight(verse);
    renderReaderCaseStudies(verse);
    renderReaderLexicon(verse, ver);
    renderReaderTptNotes(verse);
    renderReaderCrossRefs(verse);
    updateReaderVersionPickerButtons(ver);
    refreshIcons();
  }

  function openReaderLightbox(verseId) {
    const verse = BIBLE_VERSES.find(v => v.id === verseId);
    if (!verse) return;
    renderStudyFor(verse, state.storyCurrentVer || state.version);
    showDeepPanel();
    history.replaceState(null, null, `#verse=${verseId}`);
  }

  /* ---------- the study, in place of the verse ----------
     Go Deeper does not open anything. It swaps what is inside the same frame — the verse goes,
     the study of that verse arrives, and the button becomes the way back. Tapping is suspended
     for as long as it is open, because in here a tap is a scroll or a link. */
  function setSlideModeMenuOpen(open) {
    if (!elements.storyModeMenu || !elements.storyModeBtn) return;
    elements.storyModeMenu.hidden = !open;
    elements.storyModeBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (elements.storyMode) elements.storyMode.classList.toggle('is-open', !!open);
  }

  /* Shuffle wears a sun rather than the two crossed arrows. The arrows are the icon for
     reordering a list, which is not what this does — it alternates the light and dark slide —
     and next to Light's sun and Dark's moon they read as belonging to a different control.
     `sun-moon` is a sun with the crescent taken out of it, so it sits in the same family as
     its two neighbours without being mistaken for Light's plain sun. */
  const SLIDE_MODE_ICON = { light: 'sun', warm: 'coffee', dark: 'moon' };

  function syncSlideModeUI() {
    if (elements.storyModeMenu) {
      elements.storyModeMenu.querySelectorAll('.story-mode-opt').forEach(btn => {
        const on = btn.getAttribute('data-mode') === state.theme;
        btn.setAttribute('aria-checked', on ? 'true' : 'false');
        btn.classList.toggle('is-active', on);
      });
    }
    if (elements.storyModeBtn) {
      const name = SLIDE_MODE_ICON[state.theme] || 'sun';
      elements.storyModeBtn.title = 'Appearance: ' + state.theme;
      elements.storyModeBtn.setAttribute('aria-label', 'Appearance: ' + state.theme);
      /* createIcons() replaces the <i> with an <svg>, so the live node is whatever is in
         there now — set the attribute on it and let refreshIcons() redraw. */
      const icon = elements.storyModeBtn.querySelector('svg, i');
      if (icon && icon.getAttribute('data-lucide') !== name) {
        const fresh = document.createElement('i');
        fresh.setAttribute('data-lucide', name);
        fresh.id = 'storyModeIcon';
        fresh.style.width = '16px';
        fresh.style.height = '16px';
        icon.replaceWith(fresh);
        refreshIcons();
      }
    }
  }

  /* There is no per-slide appearance any more, so this is the site's own theme. One control,
     one answer, and the verse, the chapter and the study all agree with each other — which they
     could not while the slide picked light or dark for itself on every tap. */
  function setSlideMode(mode) {
    if (!['light', 'warm', 'dark'].includes(mode)) return;
    applyTheme(mode);
    syncSlideModeUI();
    if (state.storyCurrentVerse) { syncFurniture(state.storyCurrentVerse); syncDeepTheme(); }
  }

  function isDeepOpen() {
    return !!elements.storyDeepPanel && !elements.storyDeepPanel.hidden;
  }

  function setDeeperButton(deep) {
    const label = document.getElementById('storyDeeperBtnText');
    const btn = elements.btnStoryDeeper;
    if (label) label.textContent = deep ? 'BACK' : 'GO DEEPER';
    if (btn) {
      btn.title = deep ? 'Back to the verse' : 'Study this verse';
      btn.classList.toggle('is-back', deep);
      const icon = btn.querySelector('svg, i');
      if (icon) icon.setAttribute('data-lucide', deep ? 'chevron-left' : 'book-open');
    }
    refreshIcons();
  }

  /* The study used to scope its own `data-theme` onto the container, because the slide behind
     it had picked light or dark for itself and the study had to match THAT rather than the app.
     There is one appearance now and the document already carries it, so this only has to make
     sure nothing is left overriding it. */
  function syncDeepTheme() {
    if (elements.storyContainer) elements.storyContainer.removeAttribute('data-theme');
  }

  function showDeepPanel() {
    if (!elements.storyDeepPanel) return;
    elements.storyDeepPanel.hidden = false;
    elements.storyDeepPanel.scrollTop = 0;
    if (elements.storyReel) elements.storyReel.hidden = true;
    if (elements.storyOverlay) elements.storyOverlay.classList.add('is-deep');
    if (elements.storyContainer) elements.storyContainer.classList.add('is-deep');
    syncDeepTheme();
    setDeeperButton(true);
  }

  function hideDeepPanel() {
    if (elements.storyDeepPanel) elements.storyDeepPanel.hidden = true;
    if (elements.storyReel) elements.storyReel.hidden = false;
    if (elements.storyOverlay) elements.storyOverlay.classList.remove('is-deep');
    if (elements.storyContainer) elements.storyContainer.classList.remove('is-deep');
    syncDeepTheme();
    setDeeperButton(false);
    /* The well had no height while the study was up, so any scroll position taken while it was
       open was measured against a box of nothing. Put the reading line back now that there is
       something to measure. */
    placeReading(stage.steps.length > 1 ? 'reading' : 'centre', false);
    if (window.location.hash.startsWith('#verse=')) history.replaceState(null, null, ' ');
  }

  function closeReaderLightbox() {
    hideDeepPanel();
  }

  function updateReaderVersionPickerButtons(ver) {
    document.querySelectorAll('#readerVersionPicker .segmented-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-ver') === ver);
    });
    if (elements.readerActiveVerBadge) elements.readerActiveVerBadge.textContent = ver;
  }

  function switchReaderVersion(ver) {
    const verse = BIBLE_VERSES.find(v => v.id === state.activeReaderVerseId);
    if (!verse) return;

    state.activeReaderVersion = ver;
    updateReaderVersionPickerButtons(ver);

    // 1. Update Context Flow
    renderReaderContext(verse, ver);

    // 2. Update Interlinear Highlighted Verse
    renderReaderLexicon(verse, ver);

    refreshIcons();
  }

  function renderReaderContext(verse, ver = 'NIV') {
    const ctx = verse.dynamicContext;
    if (!ctx) return;

    if (elements.readerChapterTitle) elements.readerChapterTitle.textContent = ctx.chapterTitle;
    if (elements.readerChapterSummary) elements.readerChapterSummary.textContent = ctx.chapterSummary;

    const verData = ctx.versions[ver] || ctx.versions['NIV'];
    let html = '';

    // Verses Before
    if (verData.before && verData.before.length) {
      verData.before.forEach(v => {
        html += `<span class="ctx-verse ctx-surrounding"><sup class="ctx-num">${v.num}</sup>${escapeHtml(v.text)}</span> `;
      });
    }

    // Target Verse (Inline Underlined & Glowing)
    html += `<span class="ctx-verse ctx-target" title="Target Promise (${verse.ref} - ${ver})"><sup class="ctx-num">${verData.target.num}</sup>${escapeHtml(verData.target.text)}</span> `;

    // Verses After
    if (verData.after && verData.after.length) {
      verData.after.forEach(v => {
        html += `<span class="ctx-verse ctx-surrounding"><sup class="ctx-num">${v.num}</sup>${escapeHtml(v.text)}</span> `;
      });
    }

    if (elements.readerInlinePassage) elements.readerInlinePassage.innerHTML = html;
  }

  function renderReaderTranslations(verse) {
    const trans = ['NIV', 'AMP', 'NKJV', 'TPT', 'NLT', 'NASB'];
    const names = {
      NIV: 'New International Version',
      AMP: 'Amplified Bible',
      NKJV: 'New King James Version',
      TPT: 'The Passion Translation',
      NLT: 'New Living Translation',
      NASB: 'New American Standard Bible'
    };

    if (elements.readerTranslationsGrid) {
      elements.readerTranslationsGrid.innerHTML = trans.map(t => {
        const text = verse.translations[t] || '';
        return `
          <div class="trans-card" data-ver="${t}">
            <div class="trans-card-header">
              <span class="trans-card-name">${t}</span>
              <span class="trans-card-fullname">${names[t]}</span>
            </div>
            <p class="trans-card-text">"${escapeHtml(text)}"</p>
          </div>
        `;
      }).join('');
    }
  }

  function renderReaderGraceInsight(verse) {
    if (verse.paulEllisInsight) {
      if (elements.readerGraceTheme) elements.readerGraceTheme.textContent = verse.paulEllisInsight.theme;
      if (elements.readerGraceQuote) elements.readerGraceQuote.textContent = verse.paulEllisInsight.quote;
      if (elements.readerGraceTakeaway) elements.readerGraceTakeaway.textContent = verse.paulEllisInsight.graceTakeaway;
    }
  }

  function renderReaderCaseStudies(verse) {
    if (verse.caseStudiesList && verse.caseStudiesList.length && elements.readerCaseStudiesGrid) {
      elements.readerCaseStudiesGrid.innerHTML = verse.caseStudiesList.map(cs => `
        <div class="case-study-card">
          <div class="case-study-era">${escapeHtml(cs.era)}</div>
          <div class="case-study-title">${escapeHtml(cs.title)}</div>
          <div style="font-size: 0.78rem; font-weight: 700; color: var(--cat-indigo);">
            ${escapeHtml(cs.character)} (${escapeHtml(cs.ref)})
          </div>
          <p class="case-study-narrative">${escapeHtml(cs.story)}</p>
        </div>
      `).join('');
    }
  }

  // Helper: Extract clean readable transliteration without parentheses or archaic dots
  function cleanTransliteration(raw) {
    if (!raw) return '';
    let str = String(raw).trim();
    // If it has parentheses, check if inside is an alternative transliteration (like (chesed) or (sova simchot))
    const parenMatch = str.match(/\(([^)]+)\)/);
    let candidate = '';
    if (parenMatch) {
      const inside = parenMatch[1].trim();
      const before = str.split('(')[0].trim();
      // If inside is transliteration (e.g. chesed, sova simchot, orach chayyim, ne'imot)
      if (/^[a-zA-Z\s'-]+$/.test(inside) && !inside.includes('/') && inside.split(' ').length <= 3 && !['grace', 'power', 'love', 'peace', 'righteousness', 'spirit', 'faith', 'ability'].includes(inside.toLowerCase())) {
        candidate = inside;
      } else {
        candidate = before;
      }
    } else {
      candidate = str;
    }
    // Clean diacritics and special unicode characters
    let cleaned = candidate
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘ʻʿʾ`]/g, "'")
      .trim();
    // Map specific words for clean readability (Dunamis, not Dynamis per user request)
    cleaned = cleaned.replace(/^ḥesed/i, 'Chesed')
                     .replace(/^hesed/i, 'Chesed')
                     .replace(/^dynamis/i, 'Dunamis')
                     .replace(/^dyn/i, 'Dun');
    // Capitalize words
    cleaned = cleaned.split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    return cleaned;
  }

  function cleanPronunciation(raw) {
    if (!raw) return '';
    let text = String(raw).trim();
    text = text.replace(/^\/+|\/+$/g, '').trim();
    return text;
  }

  function speakLexiconWord(word) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(word);
      u.rate = 0.85;
      u.pitch = 1.0;
      window.speechSynthesis.speak(u);
    }
  }

  function renderReaderLexicon(verse, ver = 'NIV') {
    const lex = verse.lexicon;
    if (!lex) return;

    if (elements.readerLexiconLang) {
      elements.readerLexiconLang.innerHTML = `
        <i data-lucide="book-marked" style="width: 13px; height: 13px;"></i>
        ${escapeHtml(lex.originalLanguage)}
      `;
    }

    // 1. Render Actual Verse with Highlighted Key Terms
    const rawVerseText = verse.translations[ver] || verse.translations.NIV || '';
    let interlinearHtml = '';

    const template = lex.highlightedVerseTemplates?.[ver] || lex.highlightedVerseTemplates?.['NIV'] || '';
    const isPlaceholderTemplate = /^(reveals|unveils|declares|proclaims)\s+god'?s/i.test((template || '').trim());

    if (template && !isPlaceholderTemplate) {
      let tIdx = 0;
      interlinearHtml = template.replace(/\[(.*?)\]\{.*?\}/g, (match, phrase) => {
        const curIdx = tIdx++;
        return `<mark class="lexicon-word-tag" data-term-idx="${curIdx}" title="Click to view root definition">${escapeHtml(phrase)}</mark>`;
      });
    } else {
      // Intelligently highlight key theological words in the actual verse text
      let highlighted = escapeHtml(rawVerseText);
      if (lex.keyTerms && lex.keyTerms.length) {
        lex.keyTerms.forEach((term, idx) => {
          const cleanName = cleanTransliteration(term.transliteration);
          const candidates = [];
          if (term.matchedEnglish) {
            term.matchedEnglish.split(/[\/,;]/).forEach(c => {
              const cleaned = c.trim().replace(/^["']|["']$/g, '');
              if (cleaned.length > 2) candidates.push(cleaned);
            });
          }
          candidates.sort((a, b) => b.length - a.length);

          candidates.forEach(cand => {
            if (!cand) return;
            const regex = new RegExp(`\\b(${escapeRegExp(cand)})\\b`, 'gi');
            highlighted = highlighted.replace(regex, `<mark class="lexicon-word-tag" data-term-idx="${idx}" title="${escapeHtml(cleanName)} — Click to view root definition">$1</mark>`);
          });
        });
      }
      interlinearHtml = highlighted;
    }

    if (elements.readerInterlinearText) {
      elements.readerInterlinearText.innerHTML = `"${interlinearHtml}"`;
    }

    // 2. Render Clean Key Term Cards with Icons, Bolder Labels & Audio Pronunciation (No Strong's Numbers)
    if (lex.keyTerms && lex.keyTerms.length && elements.readerLexiconGrid) {
      elements.readerLexiconGrid.innerHTML = lex.keyTerms.map((term, idx) => {
        const cleanName = cleanTransliteration(term.transliteration);
        const cleanPron = cleanPronunciation(term.pronunciation);
        return `
          <div class="lexicon-term-card" id="lex-term-card-${idx}">
            <div class="lexicon-term-header">
              <span class="lexicon-original-word">${escapeHtml(term.word)}</span>
              <span class="lexicon-matched-pill">${escapeHtml(term.matchedEnglish || '')}</span>
            </div>
            
            <div class="lexicon-translit-row">
              <span class="lexicon-clean-name">${escapeHtml(cleanName)}</span>
              <span class="lexicon-dot">•</span>
              <span class="lexicon-phonetic">/${escapeHtml(cleanPron)}/</span>
              <button class="lexicon-audio-btn" data-speak="${escapeHtml(cleanName)}" title="Listen to pronunciation of ${escapeHtml(cleanName)}">
                <i data-lucide="volume-2" style="width: 14px; height: 14px;"></i>
              </button>
            </div>
            
            <div class="lexicon-part-of-speech">${escapeHtml(term.partOfSpeech || '')}</div>
            
            <div class="lexicon-field">
              <i data-lucide="git-branch" class="lex-icon"></i>
              <strong class="lex-label">Root:</strong>
              <span>${escapeHtml(term.root)}</span>
            </div>
            
            <div class="lexicon-field">
              <i data-lucide="book-open" class="lex-icon"></i>
              <strong class="lex-label">Definition:</strong>
              <span>${escapeHtml(term.definition)}</span>
            </div>
            
            <div class="lexicon-usage-field">
              <i data-lucide="sparkles" class="lex-icon"></i>
              <strong class="lex-label">In this verse:</strong>
              <span>${escapeHtml(term.usageInPassage)}</span>
            </div>
          </div>
        `;
      }).join('');

      if (window.lucide) lucide.createIcons();
    }

    // 3. Theological Summary
    if (elements.readerLexiconSummary) elements.readerLexiconSummary.textContent = lex.theologicalSummary || '';
  }

  // --- 6. Conditional TPT Revelatory Notes (Hide if not available) ---
  function renderReaderTptNotes(verse) {
    if (!elements.secTptNotes || !elements.readerTptFootnotes) return;

    const notes = verse.tptFootnotes || verse.tptNotes || verse.tptRevelatoryNotes;
    if (notes && (typeof notes === 'string' ? notes.trim().length > 0 : notes.length > 0)) {
      elements.secTptNotes.style.display = 'flex';
      if (Array.isArray(notes)) {
        elements.readerTptFootnotes.innerHTML = notes.map(n => `<div style="margin-bottom: 0.65rem;">${escapeHtml(n)}</div>`).join('');
      } else {
        elements.readerTptFootnotes.innerHTML = escapeHtml(notes);
      }
    } else {
      elements.secTptNotes.style.display = 'none';
    }
  }

  function renderReaderCrossRefs(verse) {
    if (verse.crossReferencesList && verse.crossReferencesList.length && elements.readerCrossRefsGrid) {
      // Only passages that are themselves in the collection can be opened; the
      // rest are citations, and must not look like buttons that do nothing.
      elements.readerCrossRefsGrid.innerHTML = verse.crossReferencesList.map(cr => {
        const linkable = Number.isInteger(cr.linkedVerseId);
        return `
        <div class="cross-ref-card${linkable ? ' is-linkable' : ''}"${linkable ? ` data-linked-id="${cr.linkedVerseId}" role="button" tabindex="0"` : ''}>
          <div class="cross-ref-title">
            <i data-lucide="${linkable ? 'link-2' : 'book-open'}" style="width: 13px; height: 13px;"></i>
            ${escapeHtml(cr.ref)}
          </div>
          <p class="cross-ref-text">${escapeHtml(cr.text)}</p>
        </div>
      `;}).join('');
    }
  }

  // ==========================================================================
  // FULLSCREEN ENDLESS STORIES MODE (16 DYNAMIC STYLES & DYNAMIC AUTO-FIT)
  // ==========================================================================
  function resetStoriesShufflePool() {
    state.storyShufflePool = [...BIBLE_VERSES].sort(() => Math.random() - 0.5);
  }

  function openStoriesMode(specificVerseId = null) {
    state.isStoriesMode = true;
    state.hasTappedStoryOnce = false;
    state.storyHistory = [];
    storyForward.length = 0;
    resetStoriesShufflePool();

    let targetVerse = null;
    if (specificVerseId) {
      targetVerse = BIBLE_VERSES.find(v => v.id === specificVerseId);
    }
    
    if (elements.storyTapToast) elements.storyTapToast.classList.remove('dismissed');
    if (elements.storyOverlay) elements.storyOverlay.classList.add('active');
    enterDialog(elements.storyOverlay);
    document.body.style.overflow = 'hidden';

    syncFurnitureHeight();
    renderNextStorySlide(targetVerse);

    // Auto dismiss tap toast after 3 seconds
    setTimeout(() => {
      if (elements.storyTapToast) elements.storyTapToast.classList.add('dismissed');
    }, 3000);
  }

  function closeStoriesMode() {
    state.isStoriesMode = false;
    if (elements.storyOverlay) elements.storyOverlay.classList.remove('active');
    exitDialog(elements.storyOverlay);
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#story')) history.replaceState(null, null, ' ');
  }

  // Cool Text Effects Generator
  // Words that should never carry emphasis, however often they appear.
  const STOPWORDS = new Set([
    'the','and','for','you','your','with','that','this','from','have','has','had',
    'will','shall','unto','they','them','their','there','then','than','when','who',
    'whom','which','what','was','were','are','not','but','all','any','can','may',
    'his','her','him','she','its','our','out','into','upon','over','under','also',
    'him','one','two','let','yet','say','said','says','been','be','is','of','in',
    'to','a','an','it','as','at','by','on','or','so','if','do','does','did','my',
    'me','we','us','no','nor','off','up','down','out','about','because','while'
  ]);

  /* One emphasis form per style — never a family of three. Colour is not part of the form:
     every non-gradient form paints in --story-hl, which the slide sets from the verse's own
     theme colour, so a slide carries exactly two colours, its text and its highlight. The
     gradient forms *are* the highlight, and get no second colour beside them. */
  /* The highlight, per category, for each kind of slide: dark and saturated on a pale one,
     bright on a dark one. The second tone is only ever used by the gradient forms and stays in
     the same family, so a gradient is still one colour's worth of emphasis rather than three. */
  const STORY_HIGHLIGHTS = {
    light: {
      amber:   ['#b45309', '#9a3412'], emerald: ['#047857', '#0f766e'],
      rose:    ['#be123c', '#9d174d'], teal:    ['#0f766e', '#115e59'],
      violet:  ['#6d28d9', '#7e22ce'], cyan:    ['#0369a1', '#0e7490'],
      indigo:  ['#4338ca', '#5b21b6'], purple:  ['#7e22ce', '#a21caf']
    },
    dark: {
      amber:   ['#fbbf24', '#fb923c'], emerald: ['#34d399', '#a3e635'],
      rose:    ['#fb7185', '#f472b6'], teal:    ['#2dd4bf', '#38bdf8'],
      violet:  ['#a78bfa', '#c084fc'], cyan:    ['#22d3ee', '#38bdf8'],
      indigo:  ['#818cf8', '#a78bfa'], purple:  ['#c084fc', '#f0abfc']
    }
  };

  const STEM_SUFFIXES = ['ness', 'ing', 'ed', 'es', 's'];
  function stemWord(w) {
    for (const suf of STEM_SUFFIXES) {
      if (w.length - suf.length >= 4 && w.endsWith(suf)) return w.slice(0, -suf.length);
    }
    return w;
  }
  const cleanWord = w => w.toLowerCase().replace(/[^a-z]/g, '');

  /* What this verse is actually about. `keyPhrase` is curated per verse — it is the line the
     verse is remembered by — and the lexicon's matched English is the word the original turns
     on. Between them there is no need to guess, which is what the old global keyword list and
     its "longest word" fallback were doing. */
  function emphasisKeys(verse) {
    const keys = new Set();
    const add = txt => String(txt || '').split(/\s+/).forEach(w => {
      const c = cleanWord(w);
      if (c.length >= 4 && !STOPWORDS.has(c)) { keys.add(c); keys.add(stemWord(c)); }
    });
    add(verse && verse.keyPhrase);
    const terms = verse && verse.lexicon && verse.lexicon.keyTerms;
    if (terms) terms.forEach(t => String(t.matchedEnglish || '').split(/[\/,;]/).forEach(add));
    return keys;
  }

  /* The densest run of those words, taken as a phrase rather than a word — one word lifted out
     of a curated phrase is exactly what read as arbitrary. Both ends of the window must be
     hits, so it never trails off into "and the". */
  function bestPhraseWindow(words, hit, avoid) {
    let best = null, bestVal = 0;
    for (let i = 0; i < words.length; i++) {
      if (!hit[i]) continue;
      for (let len = 1; len <= 5 && i + len <= words.length; len++) {
        const j = i + len;
        if (!hit[j - 1]) continue;
        if (avoid && j > avoid[0] - 3 && i < avoid[1] + 3) continue;
        let score = 0;
        for (let k = i; k < j; k++) if (hit[k]) score++;
        const val = score * 10 + len;   /* most key words first, then the longer phrase */
        if (val > bestVal) { bestVal = val; best = [i, j]; }
      }
    }
    return best;
  }

  /* Returns the passage cut into parts, as HTML — one string per tap. The caller appends them
     one at a time, which is what makes the column grow rather than being repainted.

     One emphasis form, not seventeen. There used to be a form per typeface, because there was a
     typeface per verse; with one face the shape of the emphasis is a decision to make once. */
  function splitPassage(rawText, verse, form) {
    form = form || 'fx-accent';
    const words = rawText.split(/\s+/);
    const keys = emphasisKeys(verse);
    const hit = words.map(w => {
      const c = cleanWord(w);
      return !!c && (keys.has(c) || keys.has(stemWord(c)));
    });

    const spans = [];
    const first = bestPhraseWindow(words, hit, null);
    if (first) spans.push(first);
    /* A second spot only on a long slide, and only well clear of the first — two marks in one
       breath is the "wall of colour" the emphasis was meant to break up. */
    if (first && words.length > 32) {
      const second = bestPhraseWindow(words, hit, first);
      if (second) spans.push(second);
    }
    if (!spans.length) {
      /* A paraphrase loose enough that none of the curated phrase survived. One focal word,
         so the slide is not a flat wall — but it is the last resort, not the rule. */
      let bi = -1, bl = 0;
      words.forEach((w, i) => {
        const c = cleanWord(w);
        if (c.length > bl && !STOPWORDS.has(c)) { bl = c.length; bi = i; }
      });
      if (bi >= 0) spans.push([bi, bi + 1]);
    }

    spans.sort((a, b) => a[0] - b[0]);

    /* Every unit of the slide is wrapped so the enter animation can bring them in one after
       another. The unit is deliberately INLINE and only ever animates opacity — the gesture
       (the rise, the focus pull, the wipe) belongs to the block above it. Two reasons:
       an inline-block word would forbid a line break inside an emphasised phrase, and it
       would also cut `.fx-accent`'s underline and `.fx-gradient`'s clipped background,
       neither of which paints across an atomic inline. An emphasised phrase is therefore one
       unit rather than several, which is also how it reads — the phrase lands as one gesture. */
    const esc = words.map(escapeHtml);
    if (esc.length) {
      esc[0] = '"' + esc[0];
      esc[esc.length - 1] = esc[esc.length - 1] + '"';
    }
    /* ---------- the unit of arrival is a CLAUSE, and the unit of a TAP is a STEP ----------
       Word by word, a passage arrives as ninety separate events, and ninety things asking for
       attention one after another is not reading, it is a ticker. Scripture is already written
       in clauses — the commas and the colons are where the sense turns — so those are the
       joints to move at. Every word inside a clause shares one index and therefore lands
       together.

       A clause is punctuation OR six words, whichever comes first, because an unpunctuated
       stretch has to break somewhere and six is about as much as lands as one thought.

       Clauses are then gathered into STEPS, and a step is what one tap brings. Six words a tap
       is a ticker with a thumb attached; a whole verse a tap is the wall this is here to fix.
       Around fifteen words is a line of reading — so fifteen is the target, the cut is taken at
       a full stop whenever one is close enough to it, and a passage never asks for more than
       five taps however long it runs. Under twenty words there are no steps at all: a short
       verse is already one breath, which is exactly why the short ones read cleanly. */
    const CHUNK_MAX_WORDS = 6;
    const STEP_WHOLE_UNDER = 26;   /* shorter than this and the verse arrives entire */
    const STEP_TARGET_WORDS = 15;
    const STEP_MAX = 5;
    const closesClause = w => /[,;:.!?—–]["'”’)]?$/.test(w);
    const endsSentence = w => /[.!?]["'”’)]?$/.test(w);

    /* One pass to lay the words out as cells, so the grouping below can look at the whole
       passage instead of deciding as it goes. An emphasised phrase is already one unit and
       stays one: it reads as a single gesture and must not be broken across two arrivals. */
    const cells = [];
    let i = 0;
    spans.forEach(span => {
      while (i < span[0]) { cells.push({ html: esc[i], raw: words[i], n: 1 }); i++; }
      cells.push({
        html: '<span class="' + form + '">' + esc.slice(span[0], span[1]).join(' ') + '</span>',
        raw: words[span[1] - 1],
        n: span[1] - span[0]
      });
      i = span[1];
    });
    while (i < words.length) { cells.push({ html: esc[i], raw: words[i], n: 1 }); i++; }

    const clauses = [];
    let open = null;
    cells.forEach(c => {
      if (!open) { open = { cells: [], words: 0, stop: false }; clauses.push(open); }
      open.cells.push(c);
      open.words += c.n;
      const punct = closesClause(c.raw);
      if (punct || open.words >= CHUNK_MAX_WORDS) {
        open.stop = punct && endsSentence(c.raw);
        open = null;
      }
    });

    const totalWords = clauses.reduce((a, c) => a + c.words, 0);
    let nSteps = 1;
    if (totalWords > STEP_WHOLE_UNDER && clauses.length > 1) {
      nSteps = Math.max(2, Math.min(STEP_MAX, Math.round(totalWords / STEP_TARGET_WORDS)));
      nSteps = Math.min(nSteps, clauses.length);
    }
    const target = totalWords / nSteps;

    let step = 0, acc = 0;
    clauses.forEach((cl, idx) => {
      cl.step = step;
      acc += cl.words;
      const stepsLeft = nSteps - step - 1;
      const clausesLeft = clauses.length - idx - 1;
      if (stepsLeft <= 0) return;
      /* Never strand a step with nothing in it: once there are exactly as many clauses left as
         there are steps left, every one of them has to start a step of its own. */
      if (clausesLeft <= stepsLeft) { step++; acc = 0; return; }
      /* Otherwise cut at the target — or early, at a full stop, since a sentence boundary is
         worth two or three words of the budget. */
      if (acc >= target || (cl.stop && acc >= target * 0.55)) { step++; acc = 0; }
    });

    /* Gathered back into one HTML string per step. The words inside a step are not wrapped in
       anything: a step arrives as one piece, so there is nothing for a per-word wrapper to do
       but multiply the node count of a ninety-word passage by ninety. */
    const out = [];
    clauses.forEach(cl => {
      out[cl.step] = (out[cl.step] ? out[cl.step] + ' ' : '') +
                     cl.cells.map(c => c.html).join(' ');
    });
    return out.filter(x => x);
  }

  // 6-Tier Adaptive Base Font Sizing based on character length
  /* ==========================================================================
     THE STAGE — one column of scripture, read a few words at a tap
     ==========================================================================
     What stood here was a pair of slides that traded places under a finger, six entrance
     animations, three drag "feels", six font-size tiers and a binary search that measured the
     passage and shrank it until it fitted. Every one of those existed to serve a single
     constraint: a verse had to fit a screen it could never leave.

     It can leave now. The passage is a column in a scroller. The first few words arrive large
     and centred; each tap adds the next few and the column travels up to meet them; the reader
     can scroll back through what they have been given. Nothing is ever replaced, so nothing has
     to be cross-faded, and length is no longer something the type has to pay for.

     What else went, and why: the typeface, the translation, the light-or-dark and the entrance
     were all re-rolled at random on EVERY TAP. Five independent decisions re-made under the
     reader every time they moved, which is why the page could never settle into being one
     thing. The face is the reader's own now, the translation is theirs, the appearance is the
     site's, and the only thing that still changes with the verse is the colour of the ground —
     which is the one that should. */
  const TAP_BACK_FRACTION = 1 / 3;   /* the left third goes back; the rest reads on */
  const DRAG_SLOP_PX = 6;            /* how far a finger travels before it stops being a tap */
  const DRAG_COMMIT_VELOCITY = 0.45;

  /* ---------- the reading line ----------
     Where the first line of a newly arrived part comes to rest, as a fraction of the well. The
     number matters less than the fact that there is only ONE of it.

     The first part used to be CENTRED and every part after it anchored here, which put the
     first line of a passage at y=337 and the second at y=262 — measured. So the second tap
     moved the reader's eye 83px up the screen and every tap after it moved nothing, which is
     exactly the "you have to read from a slightly higher zone" of it: not a drift, a single
     lurch on the second tap. Every part of a multi-part passage now starts on the same line,
     including the first, so the eye can stay where it is and just keep tapping.

     0.38 rather than the old 0.34 because the first part now has to look right sitting alone
     there: three lines starting at 38% of the well are centred on it to within thirty pixels,
     which is the "big in the middle" the passage opens on. */
  const READING_LINE = 0.38;


  /* ==========================================================================
     THE CUBE — the verse, and the chapter it lives in
     ==========================================================================
     Vertical moves through the verses; horizontal turns to the one on screen and shows it
     where it sits. The rotation follows the thumb rather than firing on release, because a
     canned rotation is what makes this read as an effect instead of a place.

     The context itself comes from `assets/scripture-popover.js` — the same fetch, clean and
     reference parser five other pages use. Only the presentation is ours. */
  const READER_RADIUS_START = 6;
  const READER_RADIUS_STEP = 8;

  const cube = { open: false, turning: false, radius: READER_RADIUS_START, ref: null, ver: null, seq: 0 };

  function cubeHalf() {
    const w = (elements.storyStage && elements.storyStage.clientWidth) || window.innerWidth;
    return w / 2;
  }

  function syncCubeHalf() {
    if (elements.storyStage) {
      elements.storyStage.style.setProperty('--cube-half', cubeHalf() + 'px');
    }
  }

  /* Drives the turn. 3D goes on for the duration and comes off the moment it settles, because
     a face left inside a preserve-3d subtree cannot be tapped. */
  const CUBE_TURN_MS = 420;
  let cubeLandTimer = null;

  function setCubeAngle(deg, animated) {
    if (!elements.storyCube) return;
    const el = elements.storyCube;
    if (cubeLandTimer) { clearTimeout(cubeLandTimer); cubeLandTimer = null; }
    el.classList.add('is-3d');
    el.classList.toggle('is-turning', !!animated);
    el.style.setProperty('--cube-deg', deg + 'deg');
    if (!animated) return;

    cube.turning = true;
    cubeLandTimer = window.setTimeout(() => {
      cubeLandTimer = null;
      cube.turning = false;
      landCube();
    }, CUBE_TURN_MS);
  }

  /* Swaps the quarter turn for the 2D translate it ended on. Same picture, live element. */
  function landCube() {
    const el = elements.storyCube;
    if (!el) return;
    el.classList.add('no-transition');
    el.classList.remove('is-3d', 'is-turning');
    el.style.setProperty('--cube-x', cube.open ? '-100%' : '0%');
    el.style.removeProperty('--cube-deg');
    void el.offsetWidth;                 /* land the swap before transitions come back */
    el.classList.remove('no-transition');
  }

  function readerAvailable() {
    return !!(window.EsmrskyScripture && typeof window.EsmrskyScripture.loadContext === 'function');
  }

  /* Opens the chapter for whatever verse is on screen. The reference the dataset carries is
     already the human-readable form the shared parser accepts, so nothing is translated. */
  function openCube(animated) {
    if (cube.open || !elements.storyCube || !state.storyCurrentVerse) return;
    cube.open = true;
    cube.radius = READER_RADIUS_START;
    if (elements.storyStage) elements.storyStage.classList.add('is-reader');
    if (elements.storyOverlay) elements.storyOverlay.classList.add('is-reader');
    if (elements.storyReader) elements.storyReader.removeAttribute('aria-hidden');
    setCubeAngle(-90, animated !== false);
    loadReaderFace();
  }

  function closeCube(animated) {
    if (!cube.open || !elements.storyCube) return;
    cube.open = false;
    if (elements.storyStage) elements.storyStage.classList.remove('is-reader');
    if (elements.storyOverlay) elements.storyOverlay.classList.remove('is-reader');
    if (elements.storyReader) elements.storyReader.setAttribute('aria-hidden', 'true');
    setCubeAngle(0, animated !== false);
  }

  function loadReaderFace() {
    const verse = state.storyCurrentVerse;
    if (!verse || !elements.readerFaceBody) return;
    const ver = cube.ver || readerVersionFor(state.storyCurrentVer);
    cube.ver = ver;
    cube.ref = verse.ref;

    if (elements.readerFaceTitle) {
      elements.readerFaceTitle.textContent =
        (window.EsmrskyScripture && window.EsmrskyScripture.fullTitle)
          ? window.EsmrskyScripture.fullTitle(verse.ref) : verse.ref;
    }
    if (elements.readerFaceSub) {
      elements.readerFaceSub.textContent = (verse.dynamicContext && verse.dynamicContext.chapterTitle)
        ? verse.dynamicContext.chapterTitle : 'The passage in its chapter';
    }
    if (elements.readerFaceVer) elements.readerFaceVer.textContent = ver;

    if (!readerAvailable()) {
      elements.readerFaceBody.innerHTML =
        '<p class="reader-face-state">The chapter needs the shared scripture client, which did not load.</p>';
      return;
    }

    /* Every request carries a sequence number and only the newest one is allowed to paint.
       Turning the cube, tapping MORE CONTEXT and cycling the translation can all be in flight
       at once, and the slowest answer must not be the one that lands. */
    const mine = ++cube.seq;
    elements.readerFaceBody.innerHTML = '<p class="reader-face-state">Loading the chapter…</p>';
    window.EsmrskyScripture.loadContext(verse.ref, ver, cube.radius)
      .then(html => {
        if (mine !== cube.seq) return;
        elements.readerFaceBody.innerHTML = html;
        const sel = elements.readerFaceBody.querySelector('.is-selected');
        if (sel && sel.scrollIntoView) sel.scrollIntoView({ block: 'center' });
      })
      .catch(() => {
        if (mine !== cube.seq) return;
        elements.readerFaceBody.innerHTML =
          '<p class="reader-face-state">That chapter could not be fetched just now.</p>';
      });
  }

  /* The slide's translation is not always one the shared client can fetch — it carries NKJV,
     which bolls does not serve through this layer. Fall back rather than fail. */
  function readerVersionFor(ver) {
    const ok = (window.EsmrskyScripture && window.EsmrskyScripture.versions)
      ? window.EsmrskyScripture.versions().map(v => v.code) : ['NIV'];
    return ok.includes(ver) ? ver : 'NIV';
  }

  /* The category grounds. Only the ground reads these now — the passage sits on the
     page's own paper — so what they are is a palette per theme rather than a gradient per
     slide, and the first and last stops are all that is taken from each. */
  const SLIDE_GRADIENTS = {
    light: {
      'joy-presence': 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fce7f3 100%)',
      'provision-abundance': 'linear-gradient(135deg, #d1fae5 0%, #ecfccb 50%, #e0f2fe 100%)',
      'courage-protection': 'linear-gradient(135deg, #ffe4e6 0%, #ffedd5 50%, #fef3c7 100%)',
      'peace-rest': 'linear-gradient(135deg, #ccfbf1 0%, #e0e7ff 50%, #ede9fe 100%)',
      'identity-grace': 'linear-gradient(135deg, #ede9fe 0%, #fae8ff 50%, #e0e7ff 100%)',
      'wisdom-word': 'linear-gradient(135deg, #cffafe 0%, #e0f2fe 50%, #f1f5f9 100%)',
      'faith-prayer': 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 50%, #fce7f3 100%)',
      'healing-renewal': 'linear-gradient(135deg, #fce7f3 0%, #ffe4e6 50%, #fef3c7 100%)'
    },
    dark: {
      'joy-presence': 'linear-gradient(135deg, #1c1917 0%, #291807 50%, #17101a 100%)',
      'provision-abundance': 'linear-gradient(135deg, #062419 0%, #0c1f12 50%, #061924 100%)',
      'courage-protection': 'linear-gradient(135deg, #240c11 0%, #1f120c 50%, #17101a 100%)',
      'peace-rest': 'linear-gradient(135deg, #041f1e 0%, #0c1328 50%, #160c28 100%)',
      'identity-grace': 'linear-gradient(135deg, #160c28 0%, #200c28 50%, #0c1328 100%)',
      'wisdom-word': 'linear-gradient(135deg, #051c24 0%, #0c1824 50%, #0d1117 100%)',
      'faith-prayer': 'linear-gradient(135deg, #0c1328 0%, #160c28 50%, #240c1e 100%)',
      'healing-renewal': 'linear-gradient(135deg, #240c1e 0%, #240c11 50%, #1c1407 100%)'
    }
  };

  /* ==========================================================================
     THE GROUND'S COLOURS
     ==========================================================================
     One field behind everything, three blurred blobs on three long clocks, never swapped. A
     verse changes only four colours, and those are registered `<color>` properties on the
     overlay — that registration is the only reason they can be interpolated at all, and it is
     what makes a tap a glide rather than a cut.

     Light or dark is the SITE's now, not the slide's, so the field never has to cross from one
     polarity to the other in the middle of a gesture. That crossing is what the slide veils
     were sized against, and with it gone the passage simply sits on the page's own paper. */
  const GROUND_VARS = ['--bg-base', '--bg-a', '--bg-b', '--bg-c'];

  function stageIsDark() { return state.theme === 'dark'; }

  function groundPalette(verse) {
    if (!verse) return null;
    const dark = stageIsDark();
    const table = SLIDE_GRADIENTS[dark ? 'dark' : 'light'];
    const g = table[verse.category] || table['joy-presence'];
    const stops = g.match(/#[0-9a-fA-F]{6}/g) || ['#12100e'];
    const hi = STORY_HIGHLIGHTS[dark ? 'dark' : 'light'];
    const hl = hi[verse.themeColor] || hi.amber;
    const s = i => stops[i] || stops[0];
    /* Base from the category's gradient, colour from the highlight pair. It has to be the
       highlights: the category gradients are pastel on the light side, and three pastels under
       the page's own paper composite to a screen that is very nearly white — which is precisely
       the "nothing is happening" the field exists to answer. */
    return [s(0), hl[0], hl[1], s(2)];
  }

  function setGround(verse) {
    const pal = groundPalette(verse);
    const o = elements.storyOverlay;
    if (!pal || !o) return;
    GROUND_VARS.forEach((v, i) => o.style.setProperty(v, pal[i]));
  }

  /* ==========================================================================
     THE COLUMN
     ========================================================================== */
  /* `steps` is the passage cut into parts; `shown` is how many of them are on the screen. That
     is the entire state of the stage. There is no second slide, no forward stack of half-drawn
     items, no entrance to be mid-way through — which is most of what used to be able to go
     wrong here. */
  const stage = { item: null, steps: [], shown: 0 };

  /* Verses already read, and verses walked back past. Both come back whole: the steps are a
     reading pace, not a lock, and re-earning a passage on the way back would be a tax. */
  const storyForward = [];

  /* ==========================================================================
     THE FACES, AND THE VOICE
     ==========================================================================
     A verse is set in one of seventeen typefaces, in one of six translations. Both are drawn
     when the verse is drawn — ONCE, and then carried with it — which is the whole difference
     from what this used to be. Before, they were re-rolled on every tap, so a passage changed
     face halfway through being read and the same verse came back a different way every time.
     Now the face belongs to the passage: it is chosen when the passage is, it stays for as long
     as the reader is on it, and it goes into the history with it, so walking back gives you the
     page you actually read. */
  const STORY_VERSIONS = ['NIV', 'AMP', 'NKJV', 'TPT', 'NLT', 'NASB'];

  const STORY_STYLES = [
    'story-style-swiss', 'story-style-neobrutalism', 'story-style-bricolage',
    'story-style-outfit', 'story-style-sora', 'story-style-epilogue',
    'story-style-gabarito', 'story-style-jakarta', 'story-style-dm-serif',
    'story-style-fraunces', 'story-style-playfair', 'story-style-spectral',
    'story-style-alegreya', 'story-style-lora', 'story-style-newsreader',
    'story-style-source', 'story-style-merriweather'
  ];

  /* Serif takes its emphasis in an italic sans and sans takes it in an italic serif — the
     oldest pairing there is, and the one that reads as emphasis rather than as highlighting.
     A handful of the sans faces take one of the other shapes instead so the set is not one
     idea repeated seventeen times. */
  const EFFECT_FORM = {
    'story-style-swiss':        'fx-italic',
    'story-style-neobrutalism': 'fx-accent',
    'story-style-bricolage':    'fx-italic',
    'story-style-outfit':       'fx-gradient',
    'story-style-sora':         'fx-gradient',
    'story-style-epilogue':     'fx-caps',
    'story-style-gabarito':     'fx-italic',
    'story-style-jakarta':      'fx-scale',
    'story-style-dm-serif':     'fx-sans-italic',
    'story-style-fraunces':     'fx-sans-italic',
    'story-style-playfair':     'fx-sans-italic',
    'story-style-spectral':     'fx-sans-italic',
    'story-style-alegreya':     'fx-sans-italic',
    'story-style-lora':         'fx-sans-italic',
    'story-style-newsreader':   'fx-sans-italic',
    'story-style-source':       'fx-sans-italic',
    'story-style-merriweather': 'fx-accent'
  };

  /* ---------- a face is never chosen before the browser has it ----------
     Each family is fetched on first use, so a draw could land on one that had not arrived.
     `font-display: swap` then sets the passage in the fallback, the real face turns up a moment
     later, and the words re-set themselves underneath the reader — a paragraph visibly
     reflowing a beat after the tap. Both halves are fixed here: ask for every face once the
     page is up, and until one has answered, do not choose it. */
  const STYLE_FONT = {
    'story-style-swiss':        '700 24px "Instrument Sans"',
    'story-style-neobrutalism': '700 24px "Space Grotesk"',
    'story-style-bricolage':    '800 24px "Bricolage Grotesque"',
    'story-style-outfit':       '700 24px "Outfit"',
    'story-style-sora':         '700 24px "Sora"',
    'story-style-epilogue':     '800 24px "Epilogue"',
    'story-style-gabarito':     '700 24px "Gabarito"',
    'story-style-jakarta':      '700 24px "Plus Jakarta Sans"',
    'story-style-dm-serif':     '400 24px "DM Serif Display"',
    'story-style-fraunces':     '600 24px "Fraunces"',
    'story-style-playfair':     '700 24px "Playfair Display"',
    'story-style-spectral':     '600 24px "Spectral"',
    'story-style-alegreya':     '700 24px "Alegreya"',
    'story-style-lora':         '500 24px "Lora"',
    'story-style-newsreader':   '500 24px "Newsreader"',
    'story-style-source':       '600 24px "Source Serif 4"',
    'story-style-merriweather': '700 24px "Merriweather"'
  };

  /* The emphasis is set in a face of its own — an italic the passage's family may not even
     have — so it is a seventeenth and eighteenth request that the per-style gate cannot see,
     since it belongs to the emphasis rather than to the style. Left out, it arrives on its own
     schedule and re-wraps the line it is on. */
  const EMPHASIS_FONTS = ['700 italic 24px "Instrument Sans"', '600 italic 24px "Lora"'];

  function styleIsReady(style) {
    const face = STYLE_FONT[style];
    if (!face || !document.fonts || !document.fonts.check) return true;
    try { return document.fonts.check(face); } catch (e) { return true; }
  }

  /* After first paint, not during it: these are nineteen requests and the verse on screen is
     worth more than the one after it. */
  function preloadPassageFaces() {
    if (!document.fonts || !document.fonts.load) return;
    const ask = () => Object.keys(STYLE_FONT).map(k => STYLE_FONT[k]).concat(EMPHASIS_FONTS)
      .forEach(f => { try { document.fonts.load(f); } catch (e) {} });
    if (window.requestIdleCallback) window.requestIdleCallback(ask, { timeout: 1200 });
    else window.setTimeout(ask, 400);
  }

  /* One item is everything a passage is: which verse, in which translation, in which face.
     Drawn once and kept. */
  function drawItem(verse) {
    if (!verse) {
      if (!state.storyShufflePool.length) resetStoriesShufflePool();
      verse = state.storyShufflePool.pop();
    }
    /* Cold, this is a short list and the first few passages repeat a face. That is the right
       trade: a face the reader has already seen beats one that changes shape under them. */
    const ready = STORY_STYLES.filter(styleIsReady);
    const pool = ready.length ? ready : STORY_STYLES;
    return {
      verse: verse,
      ver: STORY_VERSIONS[Math.floor(Math.random() * STORY_VERSIONS.length)],
      style: pool[Math.floor(Math.random() * pool.length)]
    };
  }

  function syncFurnitureHeight() {
    if (!elements.storyOverlay) return;
    const ref = document.querySelector('.story-ref-row'), bar = document.querySelector('.story-bottom-bar');
    const h = (ref ? ref.getBoundingClientRect().height : 0) +
              (bar ? bar.getBoundingClientRect().height : 0) + 40;
    elements.storyOverlay.style.setProperty('--furniture-h', Math.round(h) + 'px');
  }

  /* The scroller is the full height of the screen so the cube's two faces stay the same box,
     but the bottom of it is under the furniture. Everything that positions the reading line
     measures against what is actually VISIBLE, which is that height less the bar. */
  function wellHeight(box) {
    const furniture = parseFloat(
      getComputedStyle(elements.storyOverlay).getPropertyValue('--furniture-h')) || 112;
    return Math.max(160, box.clientHeight - furniture);
  }

  /* ---------- one part of the passage ----------
     Appended, not revealed: the column genuinely grows, which is what lets it be scrolled. The
     span goes in already transparent, one forced reflow settles that as its starting value, and
     taking the class off runs the transition. No rAF, so it cannot be left half-done by a
     frame that never came. */
  function addStep(animate) {
    const col = elements.verseColumn;
    if (!col || stage.shown >= stage.steps.length) return false;
    const span = document.createElement('span');
    span.className = animate ? 'vs is-fresh' : 'vs';
    span.dataset.step = String(stage.shown);
    span.innerHTML = stage.steps[stage.shown];
    if (col.childNodes.length) col.appendChild(document.createTextNode(' '));
    col.appendChild(span);
    stage.shown++;
    if (animate) { void span.offsetWidth; span.classList.remove('is-fresh'); }
    syncTicks();
    return true;
  }

  /* Rects rather than `offsetTop`: the parts are INLINE, so the thing to line up is the first
     line box of the new run, and only `getClientRects()` knows where that is. */
  function placeReading(mode, smooth) {
    const box = elements.verseScroll, col = elements.verseColumn;
    if (!box || !col) return;
    const behave = (smooth && !reducedMotion()) ? 'smooth' : 'auto';
    const boxTop = box.getBoundingClientRect().top;
    const well = wellHeight(box);
    let delta;
    if (mode === 'centre') {
      const r = col.getBoundingClientRect();
      delta = (r.top + r.height / 2) - (boxTop + well / 2);
    } else if (mode === 'start') {
      delta = col.getBoundingClientRect().top - (boxTop + well * 0.22);
    } else {
      const last = col.querySelector('.vs:last-of-type');
      const r = last ? (last.getClientRects()[0] || last.getBoundingClientRect())
                     : col.getBoundingClientRect();
      delta = r.top - (boxTop + well * READING_LINE);
    }
    box.scrollTo({ top: Math.max(0, box.scrollTop + delta), behavior: behave });
  }

  /* One tick per part, filled as far as the reader has come. With the ghosted preview gone this
     is the whole of the affordance that said "there is more of this verse" — so a passage that
     arrives entire draws none at all, because there is nothing for it to say. */
  function syncTicks() {
    const el = elements.storyTicks;
    if (!el) return;
    const n = stage.steps.length;
    if (n <= 1) { el.textContent = ''; return; }
    if (el.childElementCount !== n) el.innerHTML = new Array(n).fill('<i></i>').join('');
    Array.from(el.children).forEach((t, i) => {
      t.classList.toggle('is-read', i < stage.shown - 1);
      t.classList.toggle('is-here', i === stage.shown - 1);
    });
  }

  /* The furniture follows the verse: its reference, its translation, its colour, and the
     ground's palette. The light-or-dark class on the frame is the SITE's theme now, so it
     changes when the reader changes it and at no other time. */
  function syncFurniture(item) {
    const verse = item.verse;
    stage.item = item;
    state.storyCurrentVerse = verse;
    state.storyCurrentVer = item.ver;
    if (elements.storyPassageRef) elements.storyPassageRef.textContent = verse.ref;
    if (elements.storyActiveVerBadge) elements.storyActiveVerBadge.textContent = item.ver;

    const dark = stageIsDark();
    const hi = STORY_HIGHLIGHTS[dark ? 'dark' : 'light'];
    const hl = hi[verse.themeColor] || hi.amber;
    const cont = elements.storyContainer;
    if (cont) {
      cont.classList.toggle('story-theme-dark', dark);
      cont.classList.toggle('story-theme-light', !dark);
      cont.style.setProperty('--story-hl', hl[0]);
      cont.style.setProperty('--story-hl-2', hl[1]);
    }
    if (elements.storyOverlay) {
      elements.storyOverlay.style.setProperty('--story-hl', hl[0]);
      elements.storyOverlay.style.setProperty('--story-hl-2', hl[1]);
    }
    setGround(verse);
    if (isDeepOpen()) { renderStudyFor(verse, state.storyCurrentVer); syncDeepTheme(); }
    if (cube.open) { cube.radius = READER_RADIUS_START; loadReaderFace(); }
  }

  /* Draws a verse from nothing. `whole` is for a passage the reader has already been through —
     it comes back complete and positioned at its beginning, ready to be re-read. */
  function showVerse(item, opts) {
    opts = opts || {};
    const col = elements.verseColumn;
    if (!item || !item.verse || !col) return;
    const verse = item.verse;
    const text = verse.translations[item.ver] || verse.translations.NIV;
    stage.steps = splitPassage(text, verse, EFFECT_FORM[item.style] || 'fx-accent');
    stage.shown = 0;
    col.textContent = '';
    /* The face rides on the column itself, so one class swap re-sets the passage and nothing
       else on the page has to know which typeface it is in. */
    col.className = 'story-passage-text ' + item.style;
    syncFurniture(item);
    if (opts.whole) {
      while (addStep(false)) {}
      placeReading('start', false);
    } else {
      addStep(opts.animate !== false);
      /* A verse that arrives entire is centred, because nothing will ever be added to it and
         there is no reading line to keep faith with. One that comes in parts opens on the line
         its later parts will land on. */
      placeReading(stage.steps.length > 1 ? 'reading' : 'centre', false);
    }
    state.storyHasRendered = true;
  }

  /* The forward tap, in order: read on if there is more of this verse, and only turn to the
     next one when there is not. */
  function readOn() {
    if (stage.shown >= stage.steps.length) return false;
    addStep(true);
    placeReading('reading', true);
    return true;
  }

  function nextVerse() {
    const cur = stage.item;
    const back = storyForward.length ? storyForward.pop() : null;
    if (cur) state.storyHistory.push(cur);
    showVerse(back || drawItem(), { whole: !!back });
  }

  function prevVerse() {
    if (!state.storyHistory.length) return;
    if (stage.item) storyForward.push(stage.item);
    showVerse(state.storyHistory.pop(), { whole: true });
  }

  /* Re-cuts the passage on the spot — for a change of translation, or of appearance. Whatever
     the reader had uncovered is kept, clamped to what the new text actually has, so changing
     the translation mid-verse does not hand them the rest of it or take back what they read. */
  function repaintVerse() {
    const item = stage.item, col = elements.verseColumn;
    if (!item || !col) return;
    const was = stage.shown;
    const text = item.verse.translations[item.ver] || item.verse.translations.NIV;
    stage.steps = splitPassage(text, item.verse, EFFECT_FORM[item.style] || 'fx-accent');
    stage.shown = 0;
    col.textContent = '';
    col.className = 'story-passage-text ' + item.style;
    syncFurniture(item);
    const want = Math.max(1, Math.min(stage.steps.length, was));
    while (stage.shown < want) addStep(false);
    placeReading(stage.steps.length > 1 ? 'reading' : 'centre', false);
  }

  /* The hint goes on the reader's first tap, whether that tap turned the page or only read on
     into the verse they are already on. */
  function dismissTapToast() {
    if (state.hasTappedStoryOnce) return;
    state.hasTappedStoryOnce = true;
    if (elements.storyTapToast) elements.storyTapToast.classList.add('dismissed');
  }

  /* Kept so the rest of the app — the hash router, the grid, the keyboard — can still ask for a
     verse without knowing any of the above. */
  function renderNextStorySlide(forcedVerse = null) {
    if (forcedVerse) {
      if (stage.item) state.storyHistory.push(stage.item);
      showVerse(drawItem(forcedVerse), {});
      return;
    }
    nextVerse();
  }
  function renderPreviousStorySlide() { prevVerse(); }

  // ==========================================================================
  // EVENT LISTENERS SETUP
  // ==========================================================================
  function setupEventListeners() {

    // 1. Resilient Header Event Delegation
    if (elements.stickyHeader) {
      elements.stickyHeader.addEventListener('click', (e) => {
        // Translation Picker
        const verBtn = e.target.closest('.version-picker .segmented-btn');
        if (verBtn) {
          const ver = verBtn.getAttribute('data-version');
          if (ver) setBibleVersion(ver);
          return;
        }

        // Shuffle Button
        if (e.target.closest('#btnShuffleVerses')) {
          shuffleVerses();
          return;
        }

        // Open Type Settings Drawer
        if (e.target.closest('#btnOpenTypeSettings')) {
          openTypeSettings();
          return;
        }
      });
    }

    // Mobile Bible Version Dropdown — the site's own menu
    if (elements.mobileVersionTrigger && elements.mobileVersionMenu) {
      const menu = elements.mobileVersionMenu;
      const trigger = elements.mobileVersionTrigger;
      /* The header and its top bar both clip their overflow — for the chip scroller — so a menu
         hanging off the trigger is cut off at the header's edge no matter what it is positioned
         against. While it is open it lives on <body> and is placed from the trigger's own rect;
         it goes back into the wrapper on close so nothing is left stranded there. */
      const closeMenu = () => {
        menu.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (menu.parentElement === document.body && elements.mobileVersionPicker) {
          elements.mobileVersionPicker.appendChild(menu);
        }
      };
      const openMenu = () => {
        const r = trigger.getBoundingClientRect();
        document.body.appendChild(menu);
        menu.style.top = (r.bottom + 6) + 'px';
        menu.style.left = r.left + 'px';
        menu.style.minWidth = r.width + 'px';
        menu.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
      };
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (menu.hidden) openMenu(); else closeMenu();
      });
      /* Placed from a rect, so it has to go once that rect moves. */
      window.addEventListener('scroll', () => { if (!menu.hidden) closeMenu(); }, { passive: true });
      window.addEventListener('resize', () => { if (!menu.hidden) closeMenu(); });
      menu.addEventListener('click', (e) => {
        e.stopPropagation();
        const opt = e.target.closest('.mobile-version-opt');
        if (!opt) return;
        setBibleVersion(opt.getAttribute('data-version'));
        closeMenu();
      });
      document.addEventListener('click', (e) => {
        if (menu.hidden) return;
        if (menu.contains(e.target)) return;
        if (elements.mobileVersionPicker && elements.mobileVersionPicker.contains(e.target)) return;
        closeMenu();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !menu.hidden) { closeMenu(); trigger.focus(); }
      });
    }

    // 2. Hero Story Launch Button
    if (elements.btnHeroOpenStories) {
      elements.btnHeroOpenStories.addEventListener('click', () => {
        openStoriesMode();
      });
    }

    // 3. Typography Settings Drawer Event Listeners
    if (elements.btnCloseTypeSettings) {
      elements.btnCloseTypeSettings.addEventListener('click', closeTypeSettings);
    }
    if (elements.typeSettingsDrawer) {
      elements.typeSettingsDrawer.addEventListener('click', (e) => {
        if (e.target === elements.typeSettingsDrawer) closeTypeSettings();
      });
    }

    // Drawer Translation Version Picker (First in list)
    if (elements.drawerVersionPicker) {
      elements.drawerVersionPicker.addEventListener('click', (e) => {
        const btn = e.target.closest('.segmented-btn');
        if (btn) {
          const ver = btn.getAttribute('data-version');
          if (ver) setBibleVersion(ver);
        }
      });
    }

    // Drawer Font Aesthetic Inline Buttons
    if (elements.drawerFontCards) {
      elements.drawerFontCards.addEventListener('click', (e) => {
        const btn = e.target.closest('.font-pill-btn') || e.target.closest('.font-card-btn');
        if (btn) {
          const font = btn.getAttribute('data-font');
          if (font) applyFontStyle(font);
        }
      });
    }

    // Drawer Text Size Presets & Custom Toggle
    if (elements.drawerFontSizePresets) {
      elements.drawerFontSizePresets.addEventListener('click', (e) => {
        const btn = e.target.closest('.segmented-btn');
        if (!btn) return;

        if (btn.id === 'btnCustomFontSize') {
          const isHidden = elements.customFontSizeWrapper.style.display === 'none';
          elements.customFontSizeWrapper.style.display = isHidden ? 'block' : 'none';
          if (elements.settingsFontSizeBadge) elements.settingsFontSizeBadge.style.display = isHidden ? 'inline-block' : 'none';
          document.querySelectorAll('#drawerFontSizePresets .segmented-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        } else {
          const val = btn.getAttribute('data-size-val');
          if (val) applyFontSize(parseFloat(val), true);
        }
      });
    }

    // Drawer Text Size Slider
    if (elements.drawerFontSizeSlider) {
      elements.drawerFontSizeSlider.addEventListener('input', (e) => {
        applyFontSize(parseFloat(e.target.value));
      });
    }

    // Drawer Line Height Presets & Custom Toggle
    if (elements.drawerLineHeightPresets) {
      elements.drawerLineHeightPresets.addEventListener('click', (e) => {
        const btn = e.target.closest('.segmented-btn');
        if (!btn) return;

        if (btn.id === 'btnCustomLineHeight') {
          const isHidden = elements.customLineHeightWrapper.style.display === 'none';
          elements.customLineHeightWrapper.style.display = isHidden ? 'block' : 'none';
          if (elements.settingsLineHeightBadge) elements.settingsLineHeightBadge.style.display = isHidden ? 'inline-block' : 'none';
          document.querySelectorAll('#drawerLineHeightPresets .segmented-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        } else {
          const val = btn.getAttribute('data-lh-val');
          if (val) applyLineHeight(parseFloat(val), true);
        }
      });
    }

    // Drawer Line Height Slider
    if (elements.drawerLineHeightSlider) {
      elements.drawerLineHeightSlider.addEventListener('input', (e) => {
        applyLineHeight(parseFloat(e.target.value));
      });
    }

    // Drawer Theme Picker
    if (elements.drawerThemePicker) {
      elements.drawerThemePicker.addEventListener('click', (e) => {
        const btn = e.target.closest('.segmented-btn');
        if (btn) {
          const themeVal = btn.getAttribute('data-theme-val');
          if (themeVal) applyTheme(themeVal);
        }
      });
    }

    // Reset Typography Settings Button
    if (elements.btnResetTypeSettings) {
      elements.btnResetTypeSettings.addEventListener('click', resetTypeSettingsToDefault);
    }

    // 4. Category Filter Chips (Event Delegation)
    if (elements.categoryChips) {
      elements.categoryChips.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip-btn');
        if (!btn) return;

        if (btn.id === 'favoritesFilterBtn') {
          state.favoritesOnly = !state.favoritesOnly;
          btn.classList.toggle('active', state.favoritesOnly);
          if (state.favoritesOnly) {
            document.querySelectorAll('#categoryChips .chip-btn').forEach(b => {
              if (b.id !== 'favoritesFilterBtn') b.classList.remove('active');
            });
          } else {
            const allBtn = document.querySelector('#categoryChips .chip-btn[data-category="all"]');
            if (allBtn) allBtn.classList.add('active');
            state.category = 'all';
          }
        } else {
          const cat = btn.getAttribute('data-category');
          if (!cat) return;

          // Toggle logic: If clicking the active category filter, toggle it off and show all!
          if (state.category === cat && cat !== 'all') {
            state.category = 'all';
            state.favoritesOnly = false;
            if (elements.favoritesFilterBtn) elements.favoritesFilterBtn.classList.remove('active');
            document.querySelectorAll('#categoryChips .chip-btn').forEach(b => {
              b.classList.toggle('active', b.getAttribute('data-category') === 'all');
            });
          } else {
            state.category = cat;
            state.favoritesOnly = false;
            if (elements.favoritesFilterBtn) elements.favoritesFilterBtn.classList.remove('active');
            document.querySelectorAll('#categoryChips .chip-btn').forEach(b => {
              b.classList.toggle('active', b === btn);
            });
          }
        }

        render();
      });
    }

    // 4b. Filter strip: make the overflow reachable without Shift+wheel.
    setupChipScroller();

    // 5. Reset Filters Button
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener('click', () => {
        state.category = 'all';
        state.favoritesOnly = false;
        state.shuffledOrder = false;

        document.querySelectorAll('#categoryChips .chip-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-category') === 'all');
        });

        render();
      });
    }

    // 6. Bento Card Clicks (Open Reader Lightbox, Favorite, Category Filter)
    if (elements.bentoContainer) {
      elements.bentoContainer.addEventListener('click', (e) => {
        const card = e.target.closest('.bento-card');
        if (!card) return;

        // Click on category tag on individual card filters by that category!
        if (e.target.closest('.category-tag')) {
          e.stopPropagation();
          const cat = card.getAttribute('data-category');
          if (cat) {
            if (state.category === cat) {
              state.category = 'all';
            } else {
              state.category = cat;
            }
            state.favoritesOnly = false;
            if (elements.favoritesFilterBtn) elements.favoritesFilterBtn.classList.remove('active');
            document.querySelectorAll('#categoryChips .chip-btn').forEach(b => {
              b.classList.toggle('active', b.getAttribute('data-category') === state.category);
            });
            render();
            if (elements.stickyHeader) elements.stickyHeader.scrollIntoView({ behavior: scrollBehavior() });
          }
          return;
        }

        const favBtn = e.target.closest('.btn-favorite');
        if (favBtn) {
          e.stopPropagation();
          const id = parseInt(favBtn.getAttribute('data-id'), 10);
          toggleFavorite(id);
          return;
        }

        const storyBtn = e.target.closest('.btn-story-single');
        if (storyBtn) {
          e.stopPropagation();
          const id = parseInt(storyBtn.getAttribute('data-id'), 10);
          openStoriesMode(id);
          return;
        }

        const id = parseInt(card.getAttribute('data-id'), 10);
        openReaderLightbox(id);
      });
    }

    // 7. Fullscreen Endless Stories Mode Listeners
    if (elements.storyOverlay) {
      /* ---------- the tap ----------
         The left third goes back and the rest reads on. Stories and Reels both put back on the
         left and both make it a minority of the width rather than half: reading on is the
         common act and a correction is the rare one, so the target sized for a thumb resting
         mid-screen has to be the one that goes forward.

         There are no zone elements. An element over the passage would have to take the pointer,
         and taking the pointer is what stops a scroll reaching the thing underneath, so the
         side is read off the coordinate instead. A browser does not fire `click` after a
         scroll gesture, so this only ever sees real taps. */
      elements.storyOverlay.addEventListener('click', (e) => {
        if (isDeepOpen()) return;   /* in here a tap is a scroll or a link, not a page turn */
        if (e.target.closest('#storyMode') || e.target.closest('#storyActiveVerBadge') ||
            e.target.closest('#btnStoryDeeper') || e.target.closest('.story-bottom-bar')) return;
        if (turn.moved) return;     /* the click that follows a horizontal drag is not a tap */
        if (cube.open) return;      /* in the chapter a tap is a scroll or a link, not a turn */
        const w = elements.storyOverlay.clientWidth || window.innerWidth;
        dismissTapToast();
        if (e.clientX < w * TAP_BACK_FRACTION) prevVerse();
        else if (!readOn()) nextVerse();
      });
    }

    /* ---------- the gestures ----------
       Vertical is not ours. The column is a real scroller with `touch-action: pan-y`, so the
       browser scrolls it — at the frame rate the browser scrolls things, with its own
       momentum, its own rubber-banding and none of our arithmetic in the way. Everything that
       used to be here was a physics model for moving two slides under a thumb, and every
       stutter anyone ever saw on this page was somewhere inside it.

       What is left is the one gesture the browser cannot do for us: horizontal, which turns
       the box to the chapter and back. It is finger-tracked rather than fired on release,
       because a canned rotation is what makes this read as an effect instead of a place. */
    const turn = { on: false, id: null, x0: 0, y0: 0, dx: 0, vx: 0, lastX: 0, lastT: 0,
                   axis: null, moved: false };

    if (elements.storyStage) {
      const gestureEl = elements.storyStage;

      gestureEl.addEventListener('pointerdown', (e) => {
        if (isDeepOpen() || cube.turning) return;
        if (e.target.closest('.story-bottom-bar') || e.target.closest('#storyMode')) return;
        turn.on = true; turn.moved = false; turn.axis = null; turn.id = e.pointerId;
        turn.x0 = turn.lastX = e.clientX; turn.y0 = e.clientY;
        turn.dx = 0; turn.vx = 0; turn.lastT = e.timeStamp || Date.now();
      });

      gestureEl.addEventListener('pointermove', (e) => {
        if (!turn.on || e.pointerId !== turn.id) return;
        const dx = e.clientX - turn.x0, dy = e.clientY - turn.y0;
        const t = e.timeStamp || Date.now();
        turn.vx = (e.clientX - turn.lastX) / Math.max(1, t - turn.lastT);
        turn.lastX = e.clientX; turn.lastT = t;
        if (!turn.moved && (Math.abs(dx) > DRAG_SLOP_PX || Math.abs(dy) > DRAG_SLOP_PX)) {
          turn.moved = true;
          /* One axis per gesture, decided once and never revisited. A diagonal thumb that could
             switch mid-drag would scroll the passage AND turn the box, which is two things
             nobody asked for. Vertical is handed straight back to the browser. */
          turn.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
          if (turn.axis === 'x') { try { gestureEl.setPointerCapture(turn.id); } catch (err) {} }
        }
        if (turn.axis !== 'x') return;

        const W = gestureEl.clientWidth || window.innerWidth;
        const raw = (dx - Math.sign(dx) * DRAG_SLOP_PX) / W;
        const wants = cube.open ? Math.max(0, Math.min(1, raw)) : Math.max(0, Math.min(1, -raw));
        const over = cube.open ? (raw < 0) : (raw > 0);
        const p = over ? Math.abs(raw) * 0.18 : wants;   /* resists at either end rather than refusing */
        turn.dx = dx;
        setCubeAngle(cube.open ? -90 + p * 90 : -p * 90, false);
      });

      const endTurn = (e) => {
        if (!turn.on || (e && e.pointerId !== turn.id)) return;
        turn.on = false;
        try { gestureEl.releasePointerCapture(turn.id); } catch (err) {}
        if (turn.axis === 'x') {
          const W = gestureEl.clientWidth || window.innerWidth;
          const past = Math.abs(turn.dx) > W * 0.28;
          const flick = Math.abs(turn.vx) > DRAG_COMMIT_VELOCITY;
          const towardReader = turn.dx < 0;
          if ((past || flick) && towardReader !== cube.open) {
            if (cube.open) closeCube(true); else openCube(true);
          } else {
            setCubeAngle(cube.open ? -90 : 0, true);
          }
          turn.dx = 0;
        }
        /* The click that follows a drag has to be swallowed, or the gesture also turns a page. */
        window.setTimeout(() => { turn.moved = false; }, 0);
      };
      gestureEl.addEventListener('pointerup', endTurn);
      gestureEl.addEventListener('pointercancel', endTurn);
    }
    /* ---------- the reader face ---------- */
    if (elements.btnReaderClose) {
      elements.btnReaderClose.addEventListener('click', (e) => { e.stopPropagation(); closeCube(true); });
    }

    if (elements.btnReaderMore) {
      elements.btnReaderMore.addEventListener('click', (e) => {
        e.stopPropagation();
        cube.radius += READER_RADIUS_STEP;
        loadReaderFace();
      });
    }

    if (elements.readerFaceVer) {
      elements.readerFaceVer.addEventListener('click', (e) => {
        e.stopPropagation();
        const codes = (window.EsmrskyScripture && window.EsmrskyScripture.versions)
          ? window.EsmrskyScripture.versions().map(v => v.code) : ['NIV'];
        const i = codes.indexOf(cube.ver);
        cube.ver = codes[(i + 1) % codes.length];
        loadReaderFace();
      });
    }

    /* The reference names the passage, so it is also the way to go and read it. A reader who
       never tries the gesture still finds the chapter. */
    if (elements.storyPassageRef) {
      elements.storyPassageRef.style.cursor = 'pointer';
      elements.storyPassageRef.setAttribute('role', 'button');
      elements.storyPassageRef.setAttribute('tabindex', '0');
      elements.storyPassageRef.setAttribute('title', 'Read this passage in its chapter');
      elements.storyPassageRef.addEventListener('click', (e) => { e.stopPropagation(); openCube(true); });
      elements.storyPassageRef.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); openCube(true); }
      });
    }

    /* A cube whose faces are pushed out by half of the wrong width does not meet at the
       corner, so the half has to follow the viewport. */
    syncCubeHalf();
    window.addEventListener('resize', syncCubeHalf);

    /* Appearance lock. The menu lives inside the overlay, so every click in here has to be
       stopped from reaching the tap-to-advance handler on the overlay itself. */
    if (elements.storyModeBtn && elements.storyModeMenu) {
      elements.storyModeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setSlideModeMenuOpen(elements.storyModeMenu.hidden);
      });

      elements.storyModeMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        const opt = e.target.closest('.story-mode-opt');
        if (!opt) return;
        setSlideMode(opt.getAttribute('data-mode'));
        setSlideModeMenuOpen(false);
        elements.storyModeBtn.focus();
      });

      document.addEventListener('click', () => setSlideModeMenuOpen(false));
    }

    /* Full screen is for reading one verse at a time; this is the way out of it into the whole
       apparatus for the verse currently on screen. The overlay is closed first — two stacked
       dialogs would trap focus between them. */
    if (elements.btnStoryDeeper) {
      elements.btnStoryDeeper.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isDeepOpen()) { hideDeepPanel(); return; }
        const verse = state.storyCurrentVerse;
        if (verse) openReaderLightbox(verse.id);
      });
    }

    // Clicking Story Version Pill Cycles Translation in Place
    if (elements.storyActiveVerBadge) {
      elements.storyActiveVerBadge.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!stage.item) return;
        const i = (STORY_VERSIONS.indexOf(stage.item.ver) + 1) % STORY_VERSIONS.length;
        stage.item.ver = STORY_VERSIONS[i];
        repaintVerse();
      });
    }

    // 8. Reader Lightbox Listeners
    if (elements.readerCloseBtn) elements.readerCloseBtn.addEventListener('click', closeReaderLightbox);
    if (elements.readerLightbox) {
      elements.readerLightbox.addEventListener('click', (e) => {
        if (e.target === elements.readerLightbox) closeReaderLightbox();
      });
    }

    // Translation switcher inside Reader Lightbox
    const readerVersionPicker = document.getElementById('readerVersionPicker');
    if (readerVersionPicker) {
      readerVersionPicker.addEventListener('click', (e) => {
        const btn = e.target.closest('.segmented-btn');
        if (btn) {
          const ver = btn.getAttribute('data-ver');
          if (ver) switchReaderVersion(ver);
        }
      });
    }

    // Interlinear Word Tag Click (Scrolls and Highlights Lexicon Card)
    if (elements.readerInterlinearText) {
      elements.readerInterlinearText.addEventListener('click', (e) => {
        const mark = e.target.closest('.lexicon-word-tag');
        if (mark) {
          const idx = mark.getAttribute('data-term-idx');
          const card = document.getElementById(`lex-term-card-${idx}`);
          if (card) {
            card.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
            card.classList.add('highlight-lex');
            setTimeout(() => card.classList.remove('highlight-lex'), 2200);
          }
        }
      });
    }

    // Lexicon Pronunciation Audio Button Click
    if (elements.readerLexiconGrid) {
      elements.readerLexiconGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.lexicon-audio-btn');
        if (btn) {
          e.stopPropagation();
          const word = btn.getAttribute('data-speak');
          if (word) speakLexiconWord(word);
        }
      });
    }

    // Cross-References Click (Jump to linked verse in reader)
    if (elements.readerCrossRefsGrid) {
      const jump = (card) => {
        const linkedId = parseInt(card.getAttribute('data-linked-id'), 10);
        if (linkedId) openReaderLightbox(linkedId);
      };
      elements.readerCrossRefsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.cross-ref-card.is-linkable');
        if (card) jump(card);
      });
      elements.readerCrossRefsGrid.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.cross-ref-card.is-linkable');
        if (card) { e.preventDefault(); jump(card); }
      });
    }

    // Typography settings, opened from inside the reader
    if (elements.btnReaderTypeSettings) {
      elements.btnReaderTypeSettings.addEventListener('click', openTypeSettings);
    }

    // 9. Scroll to top
    if (elements.scrollToTopBtn) {
      elements.scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
      });
    }

    // 10. Shortcuts Modal
    if (elements.shortcutsCloseBtn) {
      elements.shortcutsCloseBtn.addEventListener('click', () => {
        if (elements.shortcutsModal) elements.shortcutsModal.classList.remove('active');
      });
    }

    if (elements.shortcutsModal) {
      elements.shortcutsModal.addEventListener('click', (e) => {
        if (e.target === elements.shortcutsModal) elements.shortcutsModal.classList.remove('active');
      });
    }

    // 11. Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      /* Escape backs out one layer at a time and stops at the verses — there is nothing behind
         them to escape to. */
      if (e.key === 'Escape') {
        if (elements.typeSettingsDrawer && elements.typeSettingsDrawer.classList.contains('active')) {
          closeTypeSettings();
          return;
        }
        if (isDeepOpen()) {
          hideDeepPanel();
          return;
        }
        if (elements.shortcutsModal && elements.shortcutsModal.classList.contains('active')) {
          elements.shortcutsModal.classList.remove('active');
          return;
        }
      }

      // Stories Navigation
      if (state.isStoriesMode) {
        if (e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          /* Same rule as the tap: read on first, turn to the next verse after. */
          dismissTapToast();
          if (!readOn()) nextVerse();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          renderPreviousStorySlide();
        }
        return;
      }

      // Reader Navigation (the shortcuts panel advertises these)
      if (elements.readerLightbox && elements.readerLightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          let nextId = state.activeReaderVerseId + 1;
          if (nextId > BIBLE_VERSES.length) nextId = 1;
          openReaderLightbox(nextId);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          let prevId = state.activeReaderVerseId - 1;
          if (prevId < 1) prevId = BIBLE_VERSES.length;
          openReaderLightbox(prevId);
        }
      }

      // Main Shortcuts. Skip them when the key is part of a browser chord
      // (Cmd+V must paste, not cycle translations), when the reader is typing
      // into a control, or when a dialog already owns the keyboard.
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const focused = document.activeElement;
      if (focused && (focused.matches('input, select, textarea') || focused.isContentEditable)) return;

      if (elements.typeSettingsDrawer && elements.typeSettingsDrawer.classList.contains('active')) return;
      if (elements.readerLightbox && elements.readerLightbox.classList.contains('active')) return;

      if (typeof e.key !== 'string') return;

      if (e.key.toLowerCase() === 's') openStoriesMode();
      else if (e.key.toLowerCase() === 't') {
        const nextTheme = state.theme === 'light' ? 'warm' : (state.theme === 'warm' ? 'dark' : 'light');
        applyTheme(nextTheme);
      }
      else if (e.key.toLowerCase() === 'v') {
        const versions = ['NIV', 'AMP', 'NKJV', 'TPT', 'NLT', 'NASB'];
        const nextVer = versions[(versions.indexOf(state.version) + 1) % versions.length];
        setBibleVersion(nextVer);
      }
      else if (e.key === '?') {
        if (elements.shortcutsModal) elements.shortcutsModal.classList.toggle('active');
      }
    });
  }

  // The filter strip scrolls horizontally but hid its scrollbar, so on desktop
  // the only way to reach the far chips was Shift+wheel. Give it arrows, plain
  // wheel scrolling, drag-to-pan, and edge fades that show only when there is
  // actually more in that direction.
  function setupChipScroller() {
    const strip = elements.categoryChips;
    if (!strip) return;

    const prev = elements.chipScrollPrev;
    const next = elements.chipScrollNext;

    const sync = () => {
      const max = strip.scrollWidth - strip.clientWidth;
      const atStart = strip.scrollLeft <= 1;
      const atEnd = strip.scrollLeft >= max - 1;
      const scrollable = max > 2;

      strip.classList.toggle('can-scroll-left', scrollable && !atStart);
      strip.classList.toggle('can-scroll-right', scrollable && !atEnd);
      if (prev) prev.hidden = !scrollable || atStart;
      if (next) next.hidden = !scrollable || atEnd;
    };

    const page = (dir) => {
      strip.scrollBy({ left: dir * strip.clientWidth * 0.7, behavior: scrollBehavior() });
    };

    if (prev) prev.addEventListener('click', () => page(-1));
    if (next) next.addEventListener('click', () => page(1));

    strip.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);

    // A vertical wheel over the strip should move it sideways — otherwise the
    // page scrolls away underneath and the chips never move.
    strip.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = strip.scrollWidth - strip.clientWidth;
      if (max <= 2) return;
      const next_ = strip.scrollLeft + e.deltaY;
      // Only swallow the page scroll while there is somewhere left to go.
      if (next_ > 0 && next_ < max) e.preventDefault();
      strip.scrollLeft = next_;
    }, { passive: false });

    // Drag to pan. The click is suppressed only if the pointer actually moved,
    // so tapping a chip still filters.
    let dragging = false, startX = 0, startScroll = 0, moved = false;

    strip.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return; // native touch scrolling is fine
      dragging = true; moved = false;
      startX = e.clientX;
      startScroll = strip.scrollLeft;
    });

    strip.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) {
        moved = true;
        strip.classList.add('is-dragging');
        strip.setPointerCapture(e.pointerId);
      }
      if (moved) strip.scrollLeft = startScroll - dx;
    });

    const endDrag = () => {
      dragging = false;
      strip.classList.remove('is-dragging');
    };
    strip.addEventListener('pointerup', endDrag);
    strip.addEventListener('pointercancel', endDrag);

    strip.addEventListener('click', (e) => {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);

    sync();
    // Chip widths depend on webfonts; re-measure once they land.
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
  }

  function toggleFavorite(verseId) {
    if (state.favorites.has(verseId)) {
      state.favorites.delete(verseId);
    } else {
      state.favorites.add(verseId);
    }

    localStorage.setItem('agy_bible_favs', JSON.stringify([...state.favorites]));
    if (elements.favoritesCount) elements.favoritesCount.textContent = state.favorites.size;

    render();
  }

  // --- Bootstrap on DOM Ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
