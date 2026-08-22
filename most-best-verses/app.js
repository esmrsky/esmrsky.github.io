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
    theme: localStorage.getItem('agy_bible_theme') || 'light',
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
    storyCurrentVer: 'NIV',
    storyCurrentStyle: 'story-style-swiss',
    /* Every one of these has to carry eight to twelve lines of scripture at twenty to
       thirty pixels, on a phone, on a pale ground and a dark one. Seven faces could not:
       Anton and Oswald set the passage in condensed capitals, Bodoni Moda's hairlines
       disappear against a dark ground, Syne closes its counters at 800, Space Mono is
       monospace, Cormorant Garamond is drawn for display sizes and starves below about
       thirty, and `instrument-serif` was pointing at `--font-serif`, which is Lora — the
       same face as the Lora slide, one weight lighter. Source Serif and Plus Jakarta take
       two of those places; the page was already fetching both for its own chrome. */
    storyTypographyStyles: [
      'story-style-swiss',
      'story-style-neobrutalism',
      'story-style-jakarta',
      'story-style-dm-serif',
      'story-style-fraunces',
      'story-style-bricolage',
      'story-style-outfit',
      'story-style-sora',
      'story-style-lora',
      'story-style-newsreader',
      'story-style-source',
      'story-style-epilogue',
      'story-style-merriweather',
      'story-style-playfair',
      'story-style-spectral',
      'story-style-alegreya',
      'story-style-gabarito'
    ],

    // Shuffle Mode State
    shuffledOrder: false,
    shuffledVerses: [],

    /* Slides pick light or dark for themselves. A reader who prefers one of them can lock it,
       and that choice outlives the session. */
    slideMode: 'shuffle',
    storyHasRendered: false
  };

  const SLIDE_MODES = ['light', 'dark', 'shuffle'];
  try {
    const saved = localStorage.getItem('agy_slide_mode');
    if (SLIDE_MODES.includes(saved)) state.slideMode = saved;
  } catch (e) {}

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

    // Global resize handler for dynamic story auto-fitting
    window.addEventListener('resize', () => {
      if (state.isStoriesMode) {
        syncFurnitureHeight();
        reelSlides().forEach(autoFitStoryText);
      }
    });

    /* The first fit runs against whatever metrics are available at that moment, which for a
       cold visit is the fallback face — and the fallback is not the size the reader will see.
       Fit once more when the real faces land. */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => { if (state.isStoriesMode) reelSlides().forEach(autoFitStoryText); });
    }
    /* `fonts.ready` settles once. A typeface is only fetched the first time a slide uses it,
       so twenty of the twenty-two arrive well after that — each one measured as the fallback,
       fitted to the fallback, and then swapped for a face that is up to 1.9x as tall. Refit
       every time a batch lands. */
    preloadPassageFaces();
    if (document.fonts && document.fonts.addEventListener) {
      document.fonts.addEventListener('loadingdone', () => {
        if (state.isStoriesMode) reelSlides().forEach(autoFitStoryText);
      });
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
  const SLIDE_MODE_ICON = { light: 'sun', dark: 'moon', shuffle: 'sun-moon' };

  function syncSlideModeUI() {
    if (elements.storyModeMenu) {
      elements.storyModeMenu.querySelectorAll('.story-mode-opt').forEach(btn => {
        const on = btn.getAttribute('data-mode') === state.slideMode;
        btn.setAttribute('aria-checked', on ? 'true' : 'false');
        btn.classList.toggle('is-active', on);
      });
    }
    if (elements.storyModeBtn) {
      const name = SLIDE_MODE_ICON[state.slideMode] || 'sun-moon';
      elements.storyModeBtn.title = 'Appearance: ' + state.slideMode;
      elements.storyModeBtn.setAttribute('aria-label', 'Appearance: ' + state.slideMode);
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

  function setSlideMode(mode) {
    if (!SLIDE_MODES.includes(mode)) return;
    state.slideMode = mode;
    try { localStorage.setItem('agy_slide_mode', mode); } catch (e) {}
    syncSlideModeUI();

    /* Locking light or dark should be visible on the passage already on screen, not only on
       the next one. Shuffle leaves this slide as it is and takes effect from the next tap. */
    if (mode !== 'shuffle' && state.storyCurrentVerse) {
      state.storyCurrentIsDark = mode === 'dark';
      repaintCurrentSlide();
    }
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
      if (icon) icon.setAttribute('data-lucide', deep ? 'arrow-left' : 'book-open');
    }
    refreshIcons();
  }

  /* The study is full screen and takes its light or dark from the SLIDE, not from the app.
     Scoping `data-theme` onto the container is what does it: every token in the sheet is
     declared on a bare `[data-theme=...]` attribute selector, so the whole study — surfaces,
     borders, body copy, the cards — resolves against the slide the reader came in on. */
  function syncDeepTheme() {
    if (!elements.storyContainer) return;
    if (isDeepOpen()) {
      elements.storyContainer.setAttribute('data-theme', state.storyCurrentIsDark ? 'dark' : 'light');
    } else {
      elements.storyContainer.removeAttribute('data-theme');
    }
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
    /* The well had no height while the study was up, so the size on the passage is whatever it
       was fitted to before — refit now that there is a box to measure again. */
    autoFitStoryText();
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
  const EFFECT_FORM = {
    'story-style-lora':             'fx-italic',
    'story-style-newsreader':       'fx-italic',
    'story-style-merriweather':     'fx-italic',
    'story-style-fraunces':         'fx-gradient',
    'story-style-dm-serif':         'fx-gradient',
    'story-style-neobrutalism':     'fx-accent',
    'story-style-swiss':            'fx-accent',
    'story-style-bricolage':        'fx-gradient',
    'story-style-epilogue':         'fx-caps',
    'story-style-outfit':           'fx-scale',
    'story-style-sora':             'fx-gradient',
    'story-style-playfair':         'fx-italic',
    'story-style-spectral':         'fx-caps',
    'story-style-alegreya':         'fx-italic',
    'story-style-gabarito':         'fx-gradient',
    'story-style-source':           'fx-accent',
    'story-style-jakarta':          'fx-scale'
  };

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

  function formatStoryTextWithEffects(rawText, styleName, verse) {
    const form = EFFECT_FORM[styleName] || 'fx-accent';
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
    let unit = 0;
    const cell = inner => '<span class="sw" style="--i:' + (unit++) + '">' + inner + '</span>';

    const out = [];
    let i = 0;
    spans.forEach(span => {
      while (i < span[0]) out.push(cell(esc[i++]));
      out.push(cell('<span class="' + form + '">' + esc.slice(span[0], span[1]).join(' ') + '</span>'));
      i = span[1];
    });
    while (i < words.length) out.push(cell(esc[i++]));
    return out.join(' ');
  }

  // 6-Tier Adaptive Base Font Sizing based on character length
  function calculateStoryFontSizeClass(textLength) {
    if (textLength < 70) return 'story-size-hero';
    if (textLength < 140) return 'story-size-large';
    if (textLength < 240) return 'story-size-medium';
    if (textLength < 380) return 'story-size-compact';
    if (textLength < 520) return 'story-size-mini';
    return 'story-size-dense';
  }

  /* ---------- fitting the passage to the well ----------
     The six size tiers were keyed to character count and nothing else, which cannot be made
     to work: the same string set in Syne and in Cormorant differs by about 1.9x in rendered
     height at one font-size, and there are twenty-two faces sharing one ladder. A ladder tuned
     to clear the tall ones starves the short ones; tuned for the short ones it clips the tall.
     Measured on a 375x667 phone, six of the twenty-two overflowed the well on the longest
     passages — silently, because the container is `overflow: hidden`. And the function that
     used to live here, whose comment promised to "guarantee no cut-off", only cleared two
     inline properties. There was never any fitting.

     So stop predicting the height from the text and measure it: binary-search the largest size
     at which the block still fits. The tier classes keep line-height and alignment, which are
     per-length judgements worth keeping; only the size is decided here.

     `!important` on the inline size is not a flourish — the narrow-screen block declares these
     font sizes `!important`, and a normal inline declaration loses to that. */
  /* Where the fit gives up, not a size anything is meant to be read at. It used to be 15px,
     and 15px is a size the longest passage in the set actually reaches: at 320px wide, set in
     Oswald or in Anton, it overflowed the well by 59px — two whole lines gone, silently, into
     `overflow: hidden`. A floor that clips is worse than small type, so it sits well below
     anything the ninety-four verses ask for. */
  const FIT_MIN_PX = 12;

  /* The passage does not run to the edge of its well. The margin used to be 3% of the well,
     split by the centring into half of that above the first line — 15px on a 390x844 phone,
     11px on a 375x667 one, measured — and a verse that comes within 11px of the top of the
     screen reads as cut off whether or not it is. A proportion is the wrong shape of number
     here anyway: the same 3% is 7px in landscape, where the well is 240px tall. So the margin
     is a measure in pixels, and only scales through the middle of the range. */
  function fitGapFor(availH) {
    return Math.min(44, Math.max(18, availH * 0.052));
  }

  /* Fits one slide. There are two of them now and the offstage one has to be fitted before it
     comes on, so this takes the slide rather than reaching for a singleton. */
  function autoFitStoryText(slide) {
    const el = slide || currentSlide();
    if (!el) return;
    const passage = el.querySelector('.story-passage-text');
    const wrap = el.querySelector('.story-content-wrapper');
    if (!passage || !wrap) return;

    /* An offstage slide is `visibility: hidden`, which still lays out — so it can be measured
       and fitted before it is ever shown. Only a zero box is unmeasurable. */

    /* `clientHeight` counts the wrapper's own padding, which is nothing on a phone and 40px
       top and bottom inside the desktop card. Measuring against it there would let the passage
       fill its own margin. The content box is what the text actually gets. */
    const wcs = getComputedStyle(wrap);
    const availH = wrap.clientHeight - parseFloat(wcs.paddingTop) - parseFloat(wcs.paddingBottom);
    const availW = passage.clientWidth || wrap.clientWidth;
    if (availH < 40 || availW < 40) return;      /* laid out at zero — measure later */

    /* The ladder sets the size; this only ever takes it down. Growing the passage to whatever
       still fit was the thing that made every slide feel like a billboard — a hundred-character
       verse at four words to the line, filling the frame edge to edge. The six rungs are a
       judgement about how big a passage of that length wants to be, and a short one wanting to
       sit small in the middle of the screen with air above and below it is the point, not a gap
       to be filled. So: read what the rung asks for, and if it fits, leave it alone. */
    passage.style.removeProperty('font-size');
    const ladder = parseFloat(getComputedStyle(passage).fontSize) || 24;
    const target = availH - 2 * fitGapFor(availH);
    if (passage.scrollHeight <= target) return;

    /* It does not fit — which happens on the long passages, and happens at different lengths
       for each of the twenty-two faces, since they differ by about 1.9x in rendered height at
       one size. Come down to the largest size that does. */
    let lo = FIT_MIN_PX, hi = Math.floor(ladder), best = FIT_MIN_PX;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      passage.style.setProperty('font-size', mid + 'px', 'important');
      if (passage.scrollHeight <= target) { best = mid; lo = mid + 1; }
      else { hi = mid - 1; }
    }
    passage.style.setProperty('font-size', best + 'px', 'important');
  }

  /* ==========================================================================
     THE REEL
     ==========================================================================
     Two slides and a direction. Everything below is in service of one distinction: a TAP
     swaps them with nothing playing over it, and a DRAG moves them under the finger and lets
     the arriving one perform. Same content, same code path, two speeds — because those are
     two different things a reader is doing. Thumbing through, an animation is a toll. Having
     stopped on one verse, it is the point.

     There is never a third slide. Reels and Stories both settle one item per flick rather
     than free-scrolling a stack, so a pair is the whole requirement, and a pair needs no
     recycling scheme, no scroll-position compensation and no windowing. */

  const REEL_ENTERS = ['enter-rise', 'enter-focus', 'enter-cascade',
                       'enter-sweep', 'enter-lift', 'enter-veil'];
  const DRAG_COMMIT_PX = 64;      /* below this a drag springs back rather than turning the page */
  const DRAG_SLOP_PX = 6;         /* how far a finger travels before it counts as a drag */
  const DRAG_COMMIT_VELOCITY = 0.45;
  const SETTLE_MS = 340;
  const TAP_BACK_FRACTION = 1 / 3;

  const reel = {
    dragging: false, settling: false, moved: false, startY: 0, lastY: 0, lastT: 0, dy: 0, v: 0,
    dir: 0, pointerId: null, wheelAccum: 0, wheelLock: 0, armedItem: null
  };

  /* The forward stack is what makes a left tap and a right tap symmetrical: going back pushes
     onto it, going forward takes from it before drawing anything new, so a reader can walk
     the same few verses either way instead of the shuffle inventing a new one each time. */
  const reelForward = [];

  function syncFurnitureHeight() {
    if (!elements.storyContainer || !elements.storyOverlay) return;
    const ref = elements.storyPassageRef, bar = document.querySelector('.story-bottom-bar');
    const h = (ref ? ref.getBoundingClientRect().height : 0) +
              (bar ? bar.getBoundingClientRect().height : 0) + 44;
    elements.storyOverlay.style.setProperty('--furniture-h', Math.round(h) + 'px');
  }

  function reelSlides() {
    return elements.storyReel ? Array.from(elements.storyReel.querySelectorAll('.reel-slide')) : [];
  }
  function currentSlide() {
    return elements.storyReel ? elements.storyReel.querySelector('.reel-slide.is-current') : null;
  }
  function offstageSlide() {
    return reelSlides().find(el => !el.classList.contains('is-current')) || null;
  }

  /* One item is everything a slide is: which verse, in which translation, set which way, on
     which kind of ground. Drawn once and kept, so walking back gives the same slide back
     rather than a new reading of the same verse. */
  /* ---------- a slide is never set in a face the browser does not have yet ----------
     Each family is fetched on first use, so a tap could land on one that had not arrived.
     `font-display: swap` then drew the passage in the fallback, the real face turned up a
     moment later, and the words were re-set and re-fitted underneath the reader — the text
     visibly swapping for itself a beat after the tap. Both halves are fixed here: ask for
     every face once the page is up, and until one has answered, do not choose it. */
  const STYLE_FONT = {
    'story-style-swiss':        '700 24px "Instrument Sans"',
    'story-style-neobrutalism': '700 24px "Space Grotesk"',
    'story-style-jakarta':      '700 24px "Plus Jakarta Sans"',
    'story-style-dm-serif':     '400 24px "DM Serif Display"',
    'story-style-fraunces':     '600 24px "Fraunces"',
    'story-style-bricolage':    '800 24px "Bricolage Grotesque"',
    'story-style-outfit':       '700 24px "Outfit"',
    'story-style-sora':         '700 24px "Sora"',
    'story-style-lora':         '500 24px "Lora"',
    'story-style-newsreader':   '500 24px "Newsreader"',
    'story-style-source':       '600 24px "Source Serif 4"',
    'story-style-epilogue':     '800 24px "Epilogue"',
    'story-style-merriweather': '700 24px "Merriweather"',
    'story-style-playfair':     '700 24px "Playfair Display"',
    'story-style-spectral':     '600 24px "Spectral"',
    'story-style-alegreya':     '700 24px "Alegreya"',
    'story-style-gabarito':     '700 24px "Gabarito"'
  };

  function styleIsReady(style) {
    const face = STYLE_FONT[style];
    if (!face || !document.fonts || !document.fonts.check) return true;
    try { return document.fonts.check(face); } catch (e) { return true; }
  }

  /* `.fx-italic` sets its phrase in Lora italic whichever face the passage is in, so it is a
     seventeenth face on any of five slides — and one the per-style gate cannot see, since it
     belongs to the emphasis rather than to the style. Left out of the preload it arrived on
     its own schedule and re-wrapped the line it was on. */
  const EMPHASIS_FONTS = ['600 italic 24px "Lora"'];

  /* After first paint, not during it: these are eighteen requests and the verse on screen is
     worth more than the one after it. */
  function preloadPassageFaces() {
    if (!document.fonts || !document.fonts.load) return;
    const ask = () => Object.keys(STYLE_FONT).map(k => STYLE_FONT[k]).concat(EMPHASIS_FONTS)
      .forEach(f => { try { document.fonts.load(f); } catch (e) {} });
    if (window.requestIdleCallback) window.requestIdleCallback(ask, { timeout: 1200 });
    else window.setTimeout(ask, 400);
  }

  function drawItem(verse) {
    if (!verse) {
      if (!state.storyShufflePool.length) resetStoriesShufflePool();
      verse = state.storyShufflePool.pop();
    }
    const versions = ['NIV', 'AMP', 'NKJV', 'TPT', 'NLT', 'NASB'];
    const ver = versions[Math.floor(Math.random() * versions.length)];
    /* Cold, this is a short list and the first few slides repeat a face. That is the right
       trade: a face the reader has already seen beats one that changes shape under them. */
    const ready = state.storyTypographyStyles.filter(styleIsReady);
    const pool = ready.length ? ready : state.storyTypographyStyles;
    const style = pool[Math.floor(Math.random() * pool.length)];
    return { verse, ver, style, isDark: pickSlideDarkness() };
  }

  function takeNextItem() {
    return reelForward.length ? reelForward.pop() : drawItem();
  }

  function pickSlideDarkness() {
    if (state.slideMode === 'dark') return true;
    if (state.slideMode === 'light') return false;
    return state.theme === 'dark' ? (Math.random() < 0.85) : (Math.random() < 0.45);
  }

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

  /* Writes an item onto a slide. The style, size and theme classes go on the SLIDE now rather
     than on the frame, which is what lets two of them exist at once with different faces and
     different grounds — every selector in the sheet reads them from an ancestor, so none of
     them had to change. */
  function paintSlide(el, item) {
    if (!el || !item) return;
    const text = item.verse.translations[item.ver] || item.verse.translations.NIV;
    const sizeClass = calculateStoryFontSizeClass(text.length);
    const themeClass = item.isDark ? 'story-theme-dark' : 'story-theme-light';

    /* Where a slide IS belongs to the reel, not to what is written on it. Rebuilding the class
       list wholesale wiped that and left both slides claiming to be offstage — so the
       positional classes are carried across and only the content ones are rewritten. */
    const positional = ['is-current', 'is-offstage', 'is-settling', 'is-playing']
      .filter(c => el.classList.contains(c));
    el.className = ['reel-slide', item.style, sizeClass, themeClass].concat(positional).join(' ');

    const table = STORY_HIGHLIGHTS[item.isDark ? 'dark' : 'light'];
    const hl = table[item.verse.themeColor] || table.amber;
    el.style.setProperty('--story-hl', hl[0]);
    el.style.setProperty('--story-hl-2', hl[1]);
    el.style.setProperty('--slide-bg',
      SLIDE_GRADIENTS[item.isDark ? 'dark' : 'light'][item.verse.category] ||
      SLIDE_GRADIENTS[item.isDark ? 'dark' : 'light']['joy-presence']);

    const passage = el.querySelector('.story-passage-text');
    if (passage) {
      passage.innerHTML = formatStoryTextWithEffects(text, item.style, item.verse);
      /* The stagger has a fixed budget rather than a fixed step, so a ninety-word passage does
         not take four times as long to arrive as a twenty-word one. */
      const units = passage.querySelectorAll('.sw').length || 1;
      el.style.setProperty('--sw-step', Math.min(26, Math.round(430 / units)) + 'ms');
    }
    el.dataset.enter = REEL_ENTERS[Math.floor(Math.random() * REEL_ENTERS.length)];
    autoFitStoryText(el);
    /* No `refreshIcons()` here. A slide is a wrapper and a blockquote — it has never held an
       icon — and this ran a document-wide `[data-lucide]` query on every tap and again in the
       middle of every drag, at the one moment there is a frame budget to keep. */
  }

  /* The furniture is shared by both slides, so it follows whichever one is on screen: the
     reference, the translation pill, and the frame's own theme, which is what the bar's
     colours resolve against. */
  function syncFurniture(item) {
    state.storyCurrentVerse = item.verse;
    state.storyCurrentVer = item.ver;
    state.storyCurrentStyle = item.style;
    state.storyCurrentIsDark = item.isDark;

    if (elements.storyPassageRef) elements.storyPassageRef.textContent = item.verse.ref;
    if (elements.storyActiveVerBadge) elements.storyActiveVerBadge.textContent = item.ver;

    const cont = elements.storyContainer;
    if (cont) {
      cont.classList.toggle('story-theme-dark', !!item.isDark);
      cont.classList.toggle('story-theme-light', !item.isDark);
      const table = STORY_HIGHLIGHTS[item.isDark ? 'dark' : 'light'];
      const hl = table[item.verse.themeColor] || table.amber;
      cont.style.setProperty('--story-hl', hl[0]);
      cont.style.setProperty('--story-hl-2', hl[1]);
    }
    if (isDeepOpen()) { renderStudyFor(item.verse, item.ver); syncDeepTheme(); }
  }

  function playReelEntrance(el) {
    if (!el || reducedMotion()) return;
    const passage = el.querySelector('.story-passage-text');
    el.classList.remove('is-playing');
    if (passage) passage.classList.remove(...REEL_ENTERS);
    void el.offsetWidth;
    if (passage && el.dataset.enter) passage.classList.add(el.dataset.enter);
    el.classList.add('is-playing');
  }

  function clearEntrance(el) {
    if (!el) return;
    const passage = el.querySelector('.story-passage-text');
    el.classList.remove('is-playing');
    if (passage) passage.classList.remove(...REEL_ENTERS);
  }

  /* The one way a verse changes. `animated` is the whole difference between a tap and a flick:
     with it the pair travels and the arriving slide performs, without it they simply trade
     places on the next frame. */
  function reelAdvance(dir, animated, forcedVerse, preItem) {
    if (reel.settling) return;
    const cur = currentSlide(), off = offstageSlide();
    if (!cur || !off) return;

    if (!state.hasTappedStoryOnce) {
      state.hasTappedStoryOnce = true;
      if (elements.storyTapToast) elements.storyTapToast.classList.add('dismissed');
    }

    let item;
    if (forcedVerse) {
      item = drawItem(forcedVerse);
      if (state.storyCurrentVerse) state.storyHistory.push(currentItem());
    } else if (dir < 0) {
      if (!state.storyHistory.length) { if (animated) reelSpringBack(); return; }
      item = state.storyHistory.pop();
      if (state.storyCurrentVerse) reelForward.push(currentItem());
    } else {
      /* `preItem` is the one the drag already brought on screen. Drawing a fresh one here
         would land a different verse than the one under the reader's thumb. */
      item = preItem || takeNextItem();
      if (state.storyCurrentVerse) state.storyHistory.push(currentItem());
    }

    clearEntrance(off);
    off.classList.remove('is-offstage');
    paintSlide(off, item);
    syncFurniture(item);

    const H = elements.storyReel.clientHeight || window.innerHeight;

    if (!animated) {
      /* Nothing travels. The two trade classes on the spot, which is the instant swap the
         tap has always been and must stay. */
      cur.style.transform = '';
      off.style.transform = '';
      cur.classList.remove('is-current');
      cur.classList.add('is-offstage');
      off.classList.add('is-current');
      cur.setAttribute('aria-hidden', 'true');
      off.removeAttribute('aria-hidden');
      state.storyHasRendered = true;
      return;
    }

    reel.settling = true;
    const from = reel.dy;                      /* carry on from wherever the finger left it */
    off.style.transform = 'translate3d(0,' + (from + dir * H) + 'px,0)';
    void off.offsetWidth;
    cur.classList.add('is-settling');
    off.classList.add('is-settling');
    cur.style.transform = 'translate3d(0,' + (-dir * H) + 'px,0)';
    off.style.transform = 'translate3d(0,0,0)';
    playReelEntrance(off);

    window.setTimeout(() => {
      cur.classList.remove('is-settling', 'is-current');
      off.classList.remove('is-settling');
      cur.classList.add('is-offstage');
      off.classList.add('is-current');
      cur.setAttribute('aria-hidden', 'true');
      off.removeAttribute('aria-hidden');
      cur.style.transform = '';
      off.style.transform = '';
      reel.dy = 0;
      reel.settling = false;
      state.storyHasRendered = true;
    }, SETTLE_MS);
  }

  function currentItem() {
    return {
      verse: state.storyCurrentVerse,
      ver: state.storyCurrentVer,
      style: state.storyCurrentStyle,
      isDark: !!state.storyCurrentIsDark
    };
  }

  /* Abandoning a drag has to put the incoming slide back where it came from, and `transform:
     ''` is not that. It removes the inline offset while the slide is still on stage and still
     carrying a transform transition, so instead of staying parked a screen away the unwanted
     verse animated all the way down into view — measured at y=-535, -154, -25 over the next
     180ms, which is 97% of the screen — and was then snapped out of existence when the timeout
     put `is-offstage` back at 220ms, mid-flight. Whether the reader saw it came down to which
     slot was later in the DOM, since the pair have no stacking order between them: half the
     time it painted under the verse and half the time straight over it. That is the flash.

     So it animates back to its parked position rather than away from it, and the class lands
     when the motion has finished rather than a third of the way through. */
  const SPRING_MS = 220;

  function reelSpringBack() {
    const cur = currentSlide(), off = offstageSlide();
    const H = (elements.storyReel && elements.storyReel.clientHeight) || window.innerHeight;
    const dir = reel.dir || 1;
    reel.settling = true;
    [cur, off].forEach(el => { if (el) el.classList.add('is-springing'); });
    if (cur) cur.style.transform = 'translate3d(0,0,0)';
    if (off) off.style.transform = 'translate3d(0,' + (-dir * H) + 'px,0)';
    window.setTimeout(() => {
      if (off) off.classList.add('is-offstage');
      [cur, off].forEach(el => { if (el) { el.classList.remove('is-springing'); el.style.transform = ''; } });
      reel.dy = 0;
      reel.settling = false;
    }, SPRING_MS);
  }

  /* Kept so the rest of the app — the hash router, the keyboard, the study — can still ask
     for a verse without knowing any of the above. */
  function renderNextStorySlide(forcedVerse = null) {
    reelAdvance(1, false, forcedVerse);
  }
  function renderPreviousStorySlide() {
    reelAdvance(-1, false);
  }

  /* Repaints the slide on screen in place. The appearance lock needs this: locking light or
     dark should be visible on the passage already in front of the reader, not only on the
     next one. */
  function repaintCurrentSlide() {
    const cur = currentSlide();
    if (!cur || !state.storyCurrentVerse) return;
    const item = currentItem();
    item.isDark = state.slideMode === 'dark' ? true
                : state.slideMode === 'light' ? false
                : item.isDark;
    clearEntrance(cur);
    paintSlide(cur, item);
    syncFurniture(item);
  }

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
         The left third goes back and the rest goes on. Stories and Reels both put back on the
         left and both make it a minority of the width rather than half: a page-turn is the
         common act and a correction is the rare one, so the target sized for a thumb resting
         mid-screen has to be the one that goes forward. A third is the widest that still reads
         as an edge rather than a half.

         There are no zone elements. An element over the reel would have to take the pointer,
         and taking the pointer is exactly what stops a drag reaching the thing underneath, so
         the side is read off the coordinate instead. A browser does not fire `click` after a
         scroll or a drag gesture, so this only ever sees real taps. */
      elements.storyOverlay.addEventListener('click', (e) => {
        if (isDeepOpen()) return;   /* in here a tap is a scroll or a link, not a page turn */
        if (e.target.closest('#storyMode') || e.target.closest('#storyActiveVerBadge') ||
            e.target.closest('#btnStoryDeeper') || e.target.closest('.story-bottom-bar')) return;
        if (reel.dragging || reel.settling || reel.moved) return;
        const w = elements.storyOverlay.clientWidth || window.innerWidth;
        reelAdvance(e.clientX < w * TAP_BACK_FRACTION ? -1 : 1, false);
      });
    }

    /* ---------- the drag ----------
       This is the other half of the same idea. A tap is a page turn; a drag is the reader
       moving the page themselves, and what arrives performs. The pair travels under the
       finger, and past a distance or a flick it commits; short of both it springs back. */
    if (elements.storyReel) {
      const reelEl = elements.storyReel;

      reelEl.addEventListener('pointerdown', (e) => {
        if (isDeepOpen() || reel.settling) return;
        if (e.target.closest('.story-bottom-bar') || e.target.closest('#storyMode')) return;
        reel.dragging = true; reel.moved = false; reel.pointerId = e.pointerId;
        reel.startY = reel.lastY = e.clientY; reel.lastT = e.timeStamp || Date.now();
        reel.dy = 0; reel.v = 0; reel.dir = 0;
        try { reelEl.setPointerCapture(e.pointerId); } catch (err) {}
      });

      reelEl.addEventListener('pointermove', (e) => {
        if (!reel.dragging || e.pointerId !== reel.pointerId) return;
        const dy = e.clientY - reel.startY;
        const t = e.timeStamp || Date.now();
        const dt = Math.max(1, t - reel.lastT);
        reel.v = (e.clientY - reel.lastY) / dt;
        reel.lastY = e.clientY; reel.lastT = t;
        if (Math.abs(dy) > DRAG_SLOP_PX) reel.moved = true;
        if (!reel.moved) return;

        /* Dragging down means going back, and there may be nothing to go back to. Rather than
           refuse the gesture, let it move a little and resist — the standard way a surface
           says "this is the end" without stopping dead. */
        const wantsBack = dy > 0;
        const nextDir = wantsBack ? -1 : 1;
        if (reel.dir && nextDir !== reel.dir && reel.armedItem) {
          reelForward.push(reel.armedItem);
          reel.armedItem = null;
        }
        /* Subtract the slop the gesture spent deciding it was a drag, or the slide jumps that
           distance the instant it starts following the finger. */
        const eased = dy - Math.sign(dy) * DRAG_SLOP_PX;
        const blocked = wantsBack && !state.storyHistory.length;
        reel.dy = blocked ? eased * 0.28 : eased;
        reel.dir = wantsBack ? -1 : 1;

        const cur = currentSlide(), off = offstageSlide();
        const H = reelEl.clientHeight || window.innerHeight;
        if (cur) cur.style.transform = 'translate3d(0,' + reel.dy + 'px,0)';
        if (off && !blocked) {
          /* The incoming slide is only drawn once per gesture, and only once the direction is
             settled — redrawing it every frame would re-fit and re-format on every move. */
          if (off.dataset.armed !== String(reel.dir)) {
            const item = reel.dir < 0
              ? (state.storyHistory.length ? state.storyHistory[state.storyHistory.length - 1] : null)
              : (reel.armedItem || (reel.armedItem = takeNextItem()));
            if (item) {
              off.classList.remove('is-offstage');
              clearEntrance(off);
              paintSlide(off, item);
              off.dataset.armed = String(reel.dir);
            }
          }
          off.style.transform = 'translate3d(0,' + (reel.dy - reel.dir * H) + 'px,0)';
        }
      });

      const endDrag = (e) => {
        if (!reel.dragging || (e && e.pointerId !== reel.pointerId)) return;
        reel.dragging = false;
        try { reelEl.releasePointerCapture(reel.pointerId); } catch (err) {}
        const off = offstageSlide();
        if (off) delete off.dataset.armed;
        if (!reel.moved) { reel.dy = 0; return; }

        const past = Math.abs(reel.dy) > DRAG_COMMIT_PX;
        const flicked = Math.abs(reel.v) > DRAG_COMMIT_VELOCITY;
        const canGo = reel.dir > 0 || state.storyHistory.length;
        if ((past || flicked) && canGo) {
          reelAdvance(reel.dir, true, null, reel.armedItem);
        } else {
          if (reel.armedItem) reelForward.push(reel.armedItem);
          reelSpringBack();
        }
        reel.armedItem = null;
        /* The click that follows a drag has to be swallowed, or the gesture turns two pages. */
        window.setTimeout(() => { reel.moved = false; }, 0);
      };
      reelEl.addEventListener('pointerup', endDrag);
      reelEl.addEventListener('pointercancel', endDrag);

      /* A trackpad or a mouse wheel is the same gesture without a finger. Accumulate so one
         firm scroll turns one page rather than twenty. */
      reelEl.addEventListener('wheel', (e) => {
        if (isDeepOpen() || reel.settling) return;
        e.preventDefault();
        const now = e.timeStamp || Date.now();
        if (now < reel.wheelLock) return;
        reel.wheelAccum += e.deltaY;
        if (Math.abs(reel.wheelAccum) < 90) return;
        const dir = reel.wheelAccum > 0 ? 1 : -1;
        reel.wheelAccum = 0;
        reel.wheelLock = now + SETTLE_MS + 60;
        if (dir < 0 && !state.storyHistory.length) return;
        reel.dy = 0;
        reelAdvance(dir, true);
      }, { passive: false });
    }

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
        const versions = ['NIV', 'AMP', 'NKJV', 'TPT', 'NLT', 'NASB'];
        const nextIdx = (versions.indexOf(state.storyCurrentVer) + 1) % versions.length;
        const nextVer = versions[nextIdx];
        state.storyCurrentVer = nextVer;
        if (state.storyCurrentVerse) repaintCurrentSlide();
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
          renderNextStorySlide();
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
