/**
 * 96 Promises & Truths — Fullscreen Stories, Dynamic Typography & Deep Grace Concordance
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

  // --- Global Application State ---
  const state = {
    version: localStorage.getItem('agy_bible_version') || 'NIV',
    theme: localStorage.getItem('agy_bible_theme') || 'light',
    fontStyle: localStorage.getItem('agy_font_style') || 'serif',
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

  // --- DOM References ---
  let elements = {};

  function initElements() {
    elements = {
      html: document.documentElement,
      stickyHeader: document.getElementById('stickyHeader'),
      heroOverview: document.getElementById('heroOverview'),
      btnHeroOpenStories: document.getElementById('btnHeroOpenStories'),
      bentoContainer: document.getElementById('bentoContainer'),
      categoryChips: document.getElementById('categoryChips'),
      favoritesFilterBtn: document.getElementById('favoritesFilterBtn'),
      favoritesCount: document.getElementById('favoritesCount'),
      statDisplayedCount: document.getElementById('statDisplayedCount'),
      statBookmarksCount: document.getElementById('statBookmarksCount'),
      activeVersionLabel: document.getElementById('activeVersionLabel'),
      noResults: document.getElementById('noResults'),
      resetFiltersBtn: document.getElementById('resetFiltersBtn'),
      scrollToTopBtn: document.getElementById('scrollToTopBtn'),
      btnOpenTypeSettings: document.getElementById('btnOpenTypeSettings'),
      btnShuffleVerses: document.getElementById('btnShuffleVerses'),

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
      readerActiveVerBadge: document.getElementById('readerActiveVerBadge'),
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
      btnOpenStoryFromReader: document.getElementById('btnOpenStoryFromReader'),
      btnReaderPrev: document.getElementById('btnReaderPrev'),
      btnReaderNext: document.getElementById('btnReaderNext'),

      // Story Overlay DOM
      storyOverlay: document.getElementById('storyOverlay'),
      storyBackdrop: document.getElementById('storyBackdrop'),
      storyContainer: document.getElementById('storyContainer'),
      storyContentWrapper: document.getElementById('storyContentWrapper'),
      storyPassageText: document.getElementById('storyPassageText'),
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
          if (el) el.scrollIntoView({ behavior: 'smooth' });
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
    showToast('Verses shuffled into dynamic order');
  }

  // --- Render Bento Grid (Vibrant Tints & Pure Scripture Focus) ---
  function render() {
    const filtered = getFilteredVerses();

    if (elements.statDisplayedCount) elements.statDisplayedCount.textContent = filtered.length;
    if (elements.statBookmarksCount) elements.statBookmarksCount.textContent = state.favorites.size;
    if (elements.favoritesCount) elements.favoritesCount.textContent = state.favorites.size;
    if (elements.activeVersionLabel) elements.activeVersionLabel.textContent = state.version;

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
          <article class="bento-card ${catClass}" id="verse-card-${verse.id}" data-id="${verse.id}" data-category="${verse.category}" title="Click to open chapter context & deep grace study">
            
            <!-- Pure Main Scripture Text -->
            <div class="card-verse-first">
              <blockquote class="scripture-text" id="verse-text-${verse.id}">
                "${escapeHtml(currentText)}"
              </blockquote>
            </div>

            <!-- Bottom Meta Row: Left = Category + Bookmark, Right = Unnumbered Reference -->
            <div class="card-meta-bottom">
              <div class="meta-bottom-left">
                <span class="category-tag">
                  <i data-lucide="${verse.icon || 'bookmark'}" style="width: 11px; height: 11px;"></i>
                  ${verse.categoryLabel}
                </span>
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

      // Header buttons
      document.querySelectorAll('.version-picker .segmented-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-version') === ver);
      });

      // Drawer buttons
      document.querySelectorAll('#drawerVersionPicker .segmented-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-version') === ver);
      });

      render();
    }
  }

  // ==========================================================================
  // TYPOGRAPHY SETTINGS FLYOUT DRAWER (TRANSPARENT NO-BLUR LIVE PREVIEW)
  // ==========================================================================
  function openTypeSettings() {
    if (elements.typeSettingsDrawer) elements.typeSettingsDrawer.classList.add('active');
    refreshIcons();
  }

  function closeTypeSettings() {
    if (elements.typeSettingsDrawer) elements.typeSettingsDrawer.classList.remove('active');
  }

  function resetTypeSettingsToDefault() {
    applyFontStyle('lora');
    applyFontSize(1.22);
    applyLineHeight('1.7');
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

    state.activeReaderVerseId = verseId;
    state.activeReaderVersion = state.version;

    // Header metadata
    if (elements.readerTitle) elements.readerTitle.textContent = `${verse.id}. ${verse.ref}`;
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

    // Deep link hash
    history.replaceState(null, null, `#verse=${verseId}`);
    refreshIcons();
  }

  function closeReaderLightbox() {
    if (elements.readerLightbox) elements.readerLightbox.classList.remove('active');
    document.body.style.overflow = '';
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
      if (elements.readerGraceQuote) elements.readerGraceQuote.textContent = `"${verse.paulEllisInsight.quote}"`;
      if (elements.readerGraceTakeaway) elements.readerGraceTakeaway.textContent = verse.paulEllisInsight.graceTakeaway;
    }
  }

  function renderReaderCaseStudies(verse) {
    if (verse.caseStudiesList && verse.caseStudiesList.length && elements.readerCaseStudiesGrid) {
      elements.readerCaseStudiesGrid.innerHTML = verse.caseStudiesList.map(cs => `
        <div class="case-study-card">
          <div class="case-study-era">${escapeHtml(cs.era)}</div>
          <div class="case-study-title">${escapeHtml(cs.title)}</div>
          <div style="font-size: 0.78rem; font-weight: 700; color: #6366f1;">
            ${escapeHtml(cs.character)} (${escapeHtml(cs.ref)})
          </div>
          <p class="case-study-narrative">${escapeHtml(cs.story)}</p>
        </div>
      `).join('');
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

    // 1. Render Interlinear Highlighted Verse Template
    let interlinearHtml = '';
    const template = lex.highlightedVerseTemplates?.[ver] || lex.highlightedVerseTemplates?.['NIV'] || '';

    if (template) {
      interlinearHtml = template.replace(/\[(.*?)\]\{(.*?)\}/g, (match, phrase, strongs) => {
        return `<mark class="lexicon-word-tag" data-strongs="${escapeHtml(strongs)}" title="Strong's ${escapeHtml(strongs)} — Click to inspect root">${escapeHtml(phrase)}</mark>`;
      });
    } else {
      const rawText = verse.translations[ver] || verse.translations.NIV;
      interlinearHtml = `"${escapeHtml(rawText)}"`;
    }

    if (elements.readerInterlinearText) elements.readerInterlinearText.innerHTML = interlinearHtml;

    // 2. Render Key Term Cards
    if (lex.keyTerms && lex.keyTerms.length && elements.readerLexiconGrid) {
      elements.readerLexiconGrid.innerHTML = lex.keyTerms.map(term => `
        <div class="lexicon-term-card" id="lex-card-${term.strongs.replace(/[^a-zA-Z0-9]/g, '')}">
          <div class="lexicon-term-header">
            <span class="lexicon-original-word">${escapeHtml(term.word)}</span>
            <span class="lexicon-strongs-pill">${escapeHtml(term.strongs)}</span>
          </div>
          <div class="lexicon-translit">${escapeHtml(term.transliteration)} • /${escapeHtml(term.pronunciation)}/</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: 700; margin-bottom: 0.4rem;">
            ${escapeHtml(term.partOfSpeech)} • Matched: "${escapeHtml(term.matchedEnglish)}"
          </div>
          <p class="lexicon-def"><strong>Root:</strong> ${escapeHtml(term.root)}</p>
          <p class="lexicon-def"><strong>Definition:</strong> ${escapeHtml(term.definition)}</p>
          <div class="lexicon-usage"><strong>Covenant Context:</strong> ${escapeHtml(term.usageInPassage)}</div>
        </div>
      `).join('');
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
      elements.readerCrossRefsGrid.innerHTML = verse.crossReferencesList.map(cr => `
        <div class="cross-ref-card" data-linked-id="${cr.linkedVerseId}">
          <div class="cross-ref-title">
            <i data-lucide="link-2" style="width: 13px; height: 13px;"></i>
            ${escapeHtml(cr.ref)}
          </div>
          <p class="cross-ref-text">${escapeHtml(cr.text)}</p>
        </div>
      `).join('');
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
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#story')) history.replaceState(null, null, ' ');
  }

  // Cool Text Effects Generator
  function formatStoryTextWithEffects(rawText, styleName) {
    // Keywords for dynamic theological emphasis
    const powerWords = [
      'joy', 'presence', 'life', 'grace', 'righteous', 'righteousness', 
      'pleasures', 'glory', 'peace', 'shalom', 'abundance', 'plenty', 
      'strength', 'power', 'love', 'mercy', 'favor', 'blessing', 'blessed', 
      'inheritance', 'covenant', 'everlasting', 'eternal', 'overcome', 
      'victory', 'triumphant', 'healed', 'whole', 'free', 'freedom', 'rest', 
      'light', 'wisdom', 'hope', 'savior', 'redeem', 'redeemed', 'counselor', 
      'majesty', 'sanctuary', 'shepherd', 'rock', 'shield', 'fortress'
    ];

    let words = rawText.split(/\s+/);
    let formattedWords = words.map(w => {
      const cleanW = w.toLowerCase().replace(/[^a-z]/g, '');
      if (powerWords.includes(cleanW)) {
        if (styleName === 'story-style-spacemono') {
          return `<span class="fx-mono-glow">${escapeHtml(w)}</span>`;
        } else if (styleName === 'story-style-lora' || styleName === 'story-style-newsreader' || styleName === 'story-style-merriweather' || styleName === 'story-style-fraunces' || styleName === 'story-style-dm-serif' || styleName === 'story-style-instrument-serif') {
          return `<span class="fx-italic">${escapeHtml(w)}</span>`;
        } else if (styleName === 'story-style-kinetic') {
          return `<span class="fx-gradient">${escapeHtml(w)}</span>`;
        } else if (styleName === 'story-style-swiss' || styleName === 'story-style-neobrutalism' || styleName === 'story-style-bricolage' || styleName === 'story-style-epilogue' || styleName === 'story-style-condensed' || styleName === 'story-style-anton' || styleName === 'story-style-outfit' || styleName === 'story-style-sora') {
          return `<span class="fx-accent">${escapeHtml(w)}</span>`;
        } else {
          return `<span class="fx-scale">${escapeHtml(w)}</span>`;
        }
      }
      return escapeHtml(w);
    });

    return `"${formattedWords.join(' ')}"`;
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
        elements.storyBookmarkBtnText.textContent = isFav ? 'Bookmarked' : 'Bookmark';
      }
      if (elements.storyBookmarkIcon) {
        elements.storyBookmarkIcon.style.fill = isFav ? 'currentColor' : 'none';
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
        style: state.storyCurrentStyle
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

    applyStorySlideVisuals(verse, chosenVer, nextStyle, textToDisplay);
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

    const textToDisplay = prevItem.verse.translations[prevItem.ver] || prevItem.verse.translations.NIV;
    applyStorySlideVisuals(prevItem.verse, prevItem.ver, prevItem.style, textToDisplay);
  }

  function applyStorySlideVisuals(verse, ver, styleName, textToDisplay) {
    const sizeClass = calculateStoryFontSizeClass(textToDisplay.length);

    if (elements.storyContainer) {
      elements.storyContainer.className = `story-container ${styleName} ${sizeClass}`;
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

    const gradientMap = state.theme === 'dark' ? darkCategoryGradients : categoryGradients;
    if (elements.storyBackdrop) elements.storyBackdrop.style.background = gradientMap[verse.category] || gradientMap['joy-presence'];

    if (elements.storyPassageText) elements.storyPassageText.innerHTML = formatStoryTextWithEffects(textToDisplay, styleName);
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
            if (elements.stickyHeader) elements.stickyHeader.scrollIntoView({ behavior: 'smooth' });
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
          applyStorySlideVisuals(state.storyCurrentVerse, nextVer, state.storyCurrentStyle, textToDisplay);
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

    // Interlinear Word Tag Click (Scrolls and Highlights Strong's Lexicon Card)
    if (elements.readerInterlinearText) {
      elements.readerInterlinearText.addEventListener('click', (e) => {
        const mark = e.target.closest('.lexicon-word-tag');
        if (mark) {
          const strongs = mark.getAttribute('data-strongs');
          const cleanId = `lex-card-${strongs.replace(/[^a-zA-Z0-9]/g, '')}`;
          const card = document.getElementById(cleanId);
          if (card) {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('highlight-lex');
            setTimeout(() => card.classList.remove('highlight-lex'), 2000);
          }
        }
      });
    }

    // Cross-References Click (Jump to linked verse in reader)
    if (elements.readerCrossRefsGrid) {
      elements.readerCrossRefsGrid.addEventListener('click', (e) => {
        const card = e.target.closest('.cross-ref-card');
        if (card) {
          const linkedId = parseInt(card.getAttribute('data-linked-id'), 10);
          if (linkedId) openReaderLightbox(linkedId);
        }
      });
    }

    // Prev / Next Navigation in Reader
    if (elements.btnReaderPrev) {
      elements.btnReaderPrev.addEventListener('click', () => {
        let prevId = state.activeReaderVerseId - 1;
        if (prevId < 1) prevId = BIBLE_VERSES.length;
        openReaderLightbox(prevId);
      });
    }

    if (elements.btnReaderNext) {
      elements.btnReaderNext.addEventListener('click', () => {
        let nextId = state.activeReaderVerseId + 1;
        if (nextId > BIBLE_VERSES.length) nextId = 1;
        openReaderLightbox(nextId);
      });
    }

    // Launch Story from Reader
    if (elements.btnOpenStoryFromReader) {
      elements.btnOpenStoryFromReader.addEventListener('click', () => {
        const currId = state.activeReaderVerseId;
        closeReaderLightbox();
        openStoriesMode(currId);
      });
    }

    // 9. Scroll to top
    if (elements.scrollToTopBtn) {
      elements.scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

      // Reader Modal Navigation
      if (elements.readerLightbox && elements.readerLightbox.classList.contains('active')) {
        if (e.key === 'ArrowLeft' && elements.btnReaderPrev) elements.btnReaderPrev.click();
        else if (e.key === 'ArrowRight' && elements.btnReaderNext) elements.btnReaderNext.click();
        return;
      }

      // Main Shortcuts
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
    if (elements.statBookmarksCount) elements.statBookmarksCount.textContent = state.favorites.size;

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
