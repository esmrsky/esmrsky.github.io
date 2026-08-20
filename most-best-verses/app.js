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
    storyTypographyStyles: [
      'story-style-swiss',
      'story-style-neobrutalism',
      'story-style-condensed',
      'story-style-dm-serif',
      'story-style-fraunces',
      'story-style-bricolage',
      'story-style-outfit',
      'story-style-kinetic',
      'story-style-sora',
      'story-style-anton',
      'story-style-lora',
      'story-style-newsreader',
      'story-style-spacemono',
      'story-style-epilogue',
      'story-style-merriweather',
      'story-style-instrument-serif'
    ],

    // Shuffle Mode State
    shuffledOrder: false,
    shuffledVerses: []
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
      mobileVersionSelect: document.getElementById('mobileVersionSelect'),
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
      storyContentWrapper: document.getElementById('storyContentWrapper'),
      storyPassageText: document.getElementById('storyPassageText'),
      storyCategoryMark: document.getElementById('storyCategoryMark'),
      storyPassageRef: document.getElementById('storyPassageRef'),
      storyActiveVerBadge: document.getElementById('storyActiveVerBadge'),
      storyCloseBtn: document.getElementById('storyCloseBtn'),
      storyTapToast: document.getElementById('storyTapToast'),
      btnStoryPrev: document.getElementById('btnStoryPrev'),
      btnStoryBookmark: document.getElementById('btnStoryBookmark'),
      storyBookmarkBtnText: document.getElementById('storyBookmarkBtnText'),
      storyBookmarkIcon: document.getElementById('storyBookmarkIcon'),

      // Shortcuts Modal & Toast Container
      shortcutsModal: document.getElementById('shortcutsModal'),
      shortcutsCloseBtn: document.getElementById('shortcutsCloseBtn'),
      toastContainer: document.getElementById('toastContainer')
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

    updateCategoryCounts();
    render();
    setupEventListeners();
    refreshIcons();

    // Deep Link Navigation
    handleHashNavigation();
    window.addEventListener('hashchange', handleHashNavigation);

    // Global resize handler for dynamic story auto-fitting
    window.addEventListener('resize', () => {
      if (state.isStoriesMode) {
        autoFitStoryText();
      }
    });
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
    showToast('Verses shuffled');
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

      // Header mobile select dropdown
      if (elements.mobileVersionSelect) {
        elements.mobileVersionSelect.value = ver;
      }

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
    showToast('Reset reading typography to defaults');
  }

  // ==========================================================================
  // UNIFIED READER LIGHTBOX (CONTEXT FLOW, 4 TRANSLATIONS, LEXICONS & STUDY)
  // ==========================================================================
  function openReaderLightbox(verseId) {
    const verse = BIBLE_VERSES.find(v => v.id === verseId);
    if (!verse) return;

    const wasOpen = elements.readerLightbox &&
      elements.readerLightbox.classList.contains('active');

    state.activeReaderVerseId = verseId;
    state.activeReaderVersion = state.version;

    // Header metadata
    if (elements.readerTitle) elements.readerTitle.textContent = verse.ref;
    if (elements.readerCategoryBadge) elements.readerCategoryBadge.textContent = verse.categoryLabel;

    // Render components
    renderReaderContext(verse, state.activeReaderVersion);
    renderReaderTranslations(verse);
    renderReaderGraceInsight(verse);
    renderReaderCaseStudies(verse);
    renderReaderLexicon(verse, state.activeReaderVersion);
    renderReaderTptNotes(verse);
    renderReaderCrossRefs(verse);

    // Update active version buttons in reader
    updateReaderVersionPickerButtons(state.activeReaderVersion);

    // Show Lightbox Modal
    if (elements.readerLightbox) elements.readerLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (!wasOpen) enterDialog(elements.readerLightbox);

    // Deep link hash
    history.replaceState(null, null, `#verse=${verseId}`);
    refreshIcons();
  }

  function closeReaderLightbox() {
    if (elements.readerLightbox) elements.readerLightbox.classList.remove('active');
    document.body.style.overflow = '';
    exitDialog(elements.readerLightbox);
    if (window.location.hash.startsWith('#verse=') || window.location.hash.startsWith('#study=')) {
      history.replaceState(null, null, ' ');
    }
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

    renderNextStorySlide(targetVerse, false);

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

  const POWER_WORDS = new Set([
    'joy','joyful','rejoice','presence','life','alive','grace','gracious','righteous',
    'righteousness','pleasures','glory','glorious','peace','shalom','abundance','abundant',
    'plenty','strength','strong','power','powerful','love','beloved','mercy','mercies',
    'favor','favour','blessing','blessed','bless','inheritance','heir','covenant',
    'everlasting','eternal','eternity','overcome','overcomes','victory','victorious',
    'triumphant','triumph','healed','healing','whole','wholeness','free','freedom',
    'rest','light','wisdom','hope','saviour','savior','redeem','redeemed','redemption',
    'counselor','majesty','sanctuary','shepherd','rock','shield','fortress','refuge',
    'faith','faithful','faithfulness','truth','holy','holiness','new','renewed','restore',
    'restored','forgiven','forgiveness','saved','salvation','chosen','adopted','child',
    'children','son','sons','daughter','daughters','kingdom','throne','name','word',
    'spirit','christ','jesus','lord','god','father','satisfied','satisfy','fullness',
    'overflow','increase','multiply','prosper','provide','provision','supply','never',
    'forever','always','courage','courageous','fear','afraid','strengthen','uphold',
    'delivered','deliver','rescue'
  ]);

  // Each typographic style gets a rotation of treatments rather than one flat
  // colour, so a long verse reads with rhythm instead of as a single block.
  const EFFECT_FAMILIES = {
    'story-style-spacemono':        ['fx-mono-glow', 'fx-caps', 'fx-accent'],
    'story-style-lora':             ['fx-italic', 'fx-scale', 'fx-caps'],
    'story-style-newsreader':       ['fx-italic', 'fx-caps', 'fx-scale'],
    'story-style-merriweather':     ['fx-italic', 'fx-scale', 'fx-accent'],
    'story-style-fraunces':         ['fx-italic', 'fx-caps', 'fx-gradient'],
    'story-style-dm-serif':         ['fx-italic', 'fx-gradient', 'fx-scale'],
    'story-style-instrument-serif': ['fx-italic', 'fx-caps', 'fx-scale'],
    'story-style-kinetic':          ['fx-gradient', 'fx-caps', 'fx-scale'],
    'story-style-anton':            ['fx-gradient', 'fx-accent', 'fx-caps'],
    'story-style-neobrutalism':     ['fx-accent', 'fx-caps', 'fx-scale'],
    'story-style-condensed':        ['fx-accent', 'fx-caps', 'fx-gradient'],
    'story-style-swiss':            ['fx-accent', 'fx-scale', 'fx-caps'],
    'story-style-bricolage':        ['fx-accent', 'fx-gradient', 'fx-scale'],
    'story-style-epilogue':         ['fx-accent', 'fx-caps', 'fx-scale'],
    'story-style-outfit':           ['fx-scale', 'fx-accent', 'fx-gradient'],
    'story-style-sora':             ['fx-scale', 'fx-gradient', 'fx-caps']
  };

  function formatStoryTextWithEffects(rawText, styleName, verse) {
    const family = EFFECT_FAMILIES[styleName] || ['fx-accent', 'fx-scale', 'fx-italic'];

    // The lexicon already curates the phrases that matter for THIS verse —
    // better emphasis targets than any global keyword list.
    const keyWords = new Set();
    const terms = verse && verse.lexicon && verse.lexicon.keyTerms;
    if (terms) {
      terms.forEach(t => {
        String(t.matchedEnglish || '').split(/[\/,;]/).forEach(phrase => {
          phrase.trim().split(/\s+/).forEach(w => {
            const c = w.toLowerCase().replace(/[^a-z]/g, '');
            if (c.length > 3 && !STOPWORDS.has(c)) keyWords.add(c);
          });
        });
      });
    }

    const words = rawText.split(/\s+/);
    const clean = w => w.toLowerCase().replace(/[^a-z]/g, '');

    // Space the emphasis out; three highlights in a row looks like a mistake.
    const marked = new Array(words.length).fill(null);
    let used = 0;
    let lastIdx = -99;

    words.forEach((w, i) => {
      const c = clean(w);
      if (!c || c.length < 4 || STOPWORDS.has(c)) return;
      if (i - lastIdx < 3) return;
      if (keyWords.has(c) || POWER_WORDS.has(c)) {
        marked[i] = family[used % family.length];
        used++;
        lastIdx = i;
      }
    });

    // A long verse with nothing marked is the "wall of one colour" case. Fall
    // back to its most substantial words so every long slide has some rhythm.
    const target = words.length > 45 ? 4 : (words.length > 24 ? 3 : (words.length > 12 ? 2 : 1));
    if (used < target) {
      const candidates = words
        .map((w, i) => ({ i, c: clean(w) }))
        .filter(o => o.c.length > 4 && !STOPWORDS.has(o.c) && !marked[o.i])
        .sort((a, b) => b.c.length - a.c.length);

      for (const cand of candidates) {
        if (used >= target) break;
        if (marked.some((m, i) => m && Math.abs(i - cand.i) < 3)) continue;
        marked[cand.i] = family[used % family.length];
        used++;
      }
    }

    const out = words.map((w, i) =>
      marked[i] ? `<span class="${marked[i]}">${escapeHtml(w)}</span>` : escapeHtml(w)
    );

    return `"${out.join(' ')}"`;
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

  function autoFitStoryText() {
    const passage = elements.storyPassageText;
    if (passage) {
      passage.style.fontSize = '';
      passage.style.lineHeight = '';
    }
  }

  function updateStoryBookmarkButton(verseId) {
    const isFav = state.favorites.has(verseId);
    if (elements.btnStoryBookmark) {
      elements.btnStoryBookmark.classList.toggle('favorite-active', isFav);
      if (elements.storyBookmarkBtnText) {
        elements.storyBookmarkBtnText.textContent = isFav ? 'SAVED' : 'SAVE';
      }
      // Re-query: createIcons() swaps the <i> placeholder for an <svg>, so the
      // reference cached in initElements() points at a detached node.
      const icon = document.getElementById('storyBookmarkIcon');
      if (icon) {
        icon.style.fill = isFav ? 'currentColor' : 'none';
      }
    }
  }

  function renderNextStorySlide(forcedVerse = null, addToHistory = true) {
    if (!state.storyShufflePool.length) {
      resetStoriesShufflePool();
    }

    if (!state.hasTappedStoryOnce) {
      state.hasTappedStoryOnce = true;
      if (elements.storyTapToast) elements.storyTapToast.classList.add('dismissed');
    }

    // Save previous to history
    if (addToHistory && state.storyCurrentVerse) {
      state.storyHistory.push({
        verse: state.storyCurrentVerse,
        ver: state.storyCurrentVer,
        style: state.storyCurrentStyle,
        isDark: state.storyCurrentIsDark || false
      });
    }

    const verse = forcedVerse || state.storyShufflePool.pop();
    state.storyCurrentVerse = verse;

    // Pick dynamic randomized version for endless storytelling
    const versions = ['NIV', 'AMP', 'NKJV', 'TPT', 'NLT', 'NASB'];
    const chosenVer = versions[Math.floor(Math.random() * versions.length)];
    state.storyCurrentVer = chosenVer;

    const textToDisplay = verse.translations[chosenVer] || verse.translations.NIV;

    // Pick a random style from the 16 unique styles
    const nextStyle = state.storyTypographyStyles[Math.floor(Math.random() * state.storyTypographyStyles.length)];
    state.storyCurrentStyle = nextStyle;

    // Dynamic dark bg + white text vs luminous light cards for rich visual rhythm
    const isDarkSlide = state.theme === 'dark' ? (Math.random() < 0.85) : (Math.random() < 0.45);
    state.storyCurrentIsDark = isDarkSlide;

    applyStorySlideVisuals(verse, chosenVer, nextStyle, textToDisplay, isDarkSlide);
  }

  function renderPreviousStorySlide() {
    if (!state.storyHistory.length) {
      showToast('At the beginning of story history');
      return;
    }

    const prevItem = state.storyHistory.pop();
    state.storyCurrentVerse = prevItem.verse;
    state.storyCurrentVer = prevItem.ver;
    state.storyCurrentStyle = prevItem.style;
    state.storyCurrentIsDark = prevItem.isDark || false;

    const textToDisplay = prevItem.verse.translations[prevItem.ver] || prevItem.verse.translations.NIV;
    applyStorySlideVisuals(prevItem.verse, prevItem.ver, prevItem.style, textToDisplay, prevItem.isDark);
  }

  function applyStorySlideVisuals(verse, ver, styleName, textToDisplay, isDark = false) {
    const sizeClass = calculateStoryFontSizeClass(textToDisplay.length);
    const darkThemeClass = isDark ? 'story-theme-dark' : 'story-theme-light';

    if (elements.storyContainer) {
      elements.storyContainer.className = `story-container ${styleName} ${sizeClass} ${darkThemeClass}`;
    }

    const categoryGradients = {
      'joy-presence': 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fce7f3 100%)',
      'provision-abundance': 'linear-gradient(135deg, #d1fae5 0%, #ecfccb 50%, #e0f2fe 100%)',
      'courage-protection': 'linear-gradient(135deg, #ffe4e6 0%, #ffedd5 50%, #fef3c7 100%)',
      'peace-rest': 'linear-gradient(135deg, #ccfbf1 0%, #e0e7ff 50%, #ede9fe 100%)',
      'identity-grace': 'linear-gradient(135deg, #ede9fe 0%, #fae8ff 50%, #e0e7ff 100%)',
      'wisdom-word': 'linear-gradient(135deg, #cffafe 0%, #e0f2fe 50%, #f1f5f9 100%)',
      'faith-prayer': 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 50%, #fce7f3 100%)',
      'healing-renewal': 'linear-gradient(135deg, #fce7f3 0%, #ffe4e6 50%, #fef3c7 100%)'
    };

    const darkCategoryGradients = {
      'joy-presence': 'linear-gradient(135deg, #1c1917 0%, #291807 50%, #17101a 100%)',
      'provision-abundance': 'linear-gradient(135deg, #062419 0%, #0c1f12 50%, #061924 100%)',
      'courage-protection': 'linear-gradient(135deg, #240c11 0%, #1f120c 50%, #17101a 100%)',
      'peace-rest': 'linear-gradient(135deg, #041f1e 0%, #0c1328 50%, #160c28 100%)',
      'identity-grace': 'linear-gradient(135deg, #160c28 0%, #200c28 50%, #0c1328 100%)',
      'wisdom-word': 'linear-gradient(135deg, #051c24 0%, #0c1824 50%, #0d1117 100%)',
      'faith-prayer': 'linear-gradient(135deg, #0c1328 0%, #160c28 50%, #240c1e 100%)',
      'healing-renewal': 'linear-gradient(135deg, #240c1e 0%, #240c11 50%, #1c1407 100%)'
    };

    const gradientMap = isDark ? darkCategoryGradients : categoryGradients;
    if (elements.storyBackdrop) elements.storyBackdrop.style.background = gradientMap[verse.category] || gradientMap['joy-presence'];

    if (elements.storyPassageText) elements.storyPassageText.innerHTML = formatStoryTextWithEffects(textToDisplay, styleName, verse);
    // A small category mark gives a plain slide something to look at without
    // decorating the scripture itself.
    if (elements.storyCategoryMark) {
      elements.storyCategoryMark.innerHTML =
        `<i data-lucide="${verse.icon || 'sparkles'}"></i><span>${escapeHtml(verse.categoryLabel || '')}</span>`;
    }
    if (elements.storyPassageRef) elements.storyPassageRef.textContent = verse.ref;
    if (elements.storyActiveVerBadge) elements.storyActiveVerBadge.textContent = ver;

    updateStoryBookmarkButton(verse.id);

    // Run dynamic auto-fitting to guarantee no cut-off/clipping
    autoFitStoryText();
    requestAnimationFrame(() => {
      autoFitStoryText();
    });

    if (elements.storyContentWrapper) {
      elements.storyContentWrapper.style.animation = 'none';
      elements.storyContentWrapper.offsetHeight;
      elements.storyContentWrapper.style.animation = 'storySlideEnter 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    }

    refreshIcons();
  }

  function showToast(message, isError = false) {
    if (!elements.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isError) toast.style.background = '#ef4444';
    toast.innerHTML = `
      <i data-lucide="${isError ? 'alert-circle' : 'check-circle-2'}" style="width: 15px; height: 15px;"></i>
      <span>${escapeHtml(message)}</span>
    `;

    elements.toastContainer.appendChild(toast);
    refreshIcons();

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
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

    // Mobile Bible Version Select Dropdown
    if (elements.mobileVersionSelect) {
      elements.mobileVersionSelect.addEventListener('change', (e) => {
        setBibleVersion(e.target.value);
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
      elements.storyOverlay.addEventListener('click', (e) => {
        if (e.target.closest('#storyCloseBtn') || e.target.closest('#btnStoryPrev') || e.target.closest('#btnStoryBookmark') || e.target.closest('#storyActiveVerBadge')) return;
        renderNextStorySlide();
      });
    }

    if (elements.storyCloseBtn) {
      elements.storyCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeStoriesMode();
      });
    }

    if (elements.btnStoryPrev) {
      elements.btnStoryPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        renderPreviousStorySlide();
      });
    }

    if (elements.btnStoryBookmark) {
      elements.btnStoryBookmark.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.storyCurrentVerse) {
          toggleFavorite(state.storyCurrentVerse.id);
        }
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
        if (state.storyCurrentVerse) {
          const textToDisplay = state.storyCurrentVerse.translations[nextVer] || state.storyCurrentVerse.translations.NIV;
          applyStorySlideVisuals(state.storyCurrentVerse, nextVer, state.storyCurrentStyle, textToDisplay, state.storyCurrentIsDark);
        }
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
      // Escape closes modals and drawers
      if (e.key === 'Escape') {
        if (elements.typeSettingsDrawer && elements.typeSettingsDrawer.classList.contains('active')) {
          closeTypeSettings();
          return;
        }
        if (state.isStoriesMode) {
          closeStoriesMode();
          return;
        }
        if (elements.readerLightbox && elements.readerLightbox.classList.contains('active')) {
          closeReaderLightbox();
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
      showToast(`Removed #${verseId} from bookmarks`);
    } else {
      state.favorites.add(verseId);
      showToast(`Saved #${verseId} to bookmarks`);
    }

    localStorage.setItem('agy_bible_favs', JSON.stringify([...state.favorites]));
    if (elements.favoritesCount) elements.favoritesCount.textContent = state.favorites.size;

    updateStoryBookmarkButton(verseId);
    render();
  }

  // --- Bootstrap on DOM Ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
