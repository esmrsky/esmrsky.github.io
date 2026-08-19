/**
 * 96 Promises & Truths — Fullscreen Stories, Dynamic Typography & Deep Grace Concordance
 * 
 * Features:
 * 1. Pure Verse-First Bento Cards with category tints (No copy buttons, clean bookmarks & story launcher).
 * 2. Slim, space-efficient responsive layout with robust auto-fitting.
 * 3. Dynamic Multi-Translation Context Flow with inline underlined & highlighted target verse.
 * 4. Interlinear Greek & Hebrew Lexicon with interactive highlighted phrase tags & Strong's concordance.
 * 5. Fullscreen Edge-to-Edge Stories Mode with 16 distinct typography styles, 6-tier adaptive text sizing, rich theological word effects, and corner metadata.
 * 6. Rich Historical Case Studies & Paul Ellis Gospel of Grace Commentaries for all 96 promises.
 * 7. Resilient event delegation on header and modals ensuring 100% click responsiveness.
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
    storyCurrentVerse: null,
    storyTypographyStyles: [
      'story-style-swiss',
      'story-style-neobrutalism',
      'story-style-condensed',
      'story-style-dm-serif',
      'story-style-fraunces',
      'story-style-bricolage',
      'story-style-unbounded',
      'story-style-kinetic',
      'story-style-cinzel',
      'story-style-anton',
      'story-style-playfair',
      'story-style-newsreader',
      'story-style-spacemono',
      'story-style-epilogue',
      'story-style-cormorant',
      'story-style-instrument-serif'
    ],
    storyCurrentStyle: 'story-style-swiss'
  };

  // --- DOM References ---
  const elements = {
    html: document.documentElement,
    stickyHeader: document.getElementById('stickyHeader'),
    heroOverview: document.getElementById('heroOverview'),
    bentoContainer: document.getElementById('bentoContainer'),
    categoryChips: document.getElementById('categoryChips'),
    favoritesFilterBtn: document.getElementById('favoritesFilterBtn'),
    favoritesCount: document.getElementById('favoritesCount'),
    totalCountBadge: document.getElementById('totalCountBadge'),
    statDisplayedCount: document.getElementById('statDisplayedCount'),
    statBookmarksCount: document.getElementById('statBookmarksCount'),
    activeVersionLabel: document.getElementById('activeVersionLabel'),
    noResults: document.getElementById('noResults'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),
    btnViewToggle: document.getElementById('btnViewToggle'),
    viewToggleIcon: document.getElementById('viewToggleIcon'),
    btnFontDecrease: document.getElementById('btnFontDecrease'),
    btnFontIncrease: document.getElementById('btnFontIncrease'),
    scrollToTopBtn: document.getElementById('scrollToTopBtn'),
    btnOpenStories: document.getElementById('btnOpenStories'),

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

    // Shortcuts Modal & Toast Container
    shortcutsModal: document.getElementById('shortcutsModal'),
    shortcutsCloseBtn: document.getElementById('shortcutsCloseBtn'),
    toastContainer: document.getElementById('toastContainer')
  };

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================
  function init() {
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
  }

  function handleHashNavigation() {
    const hash = window.location.hash;
    if (hash.startsWith('#story')) {
      openStoriesMode();
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
  // FILTERING & RENDERING (BENTO & LIST)
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
    return BIBLE_VERSES.filter(verse => {
      if (state.category !== 'all' && verse.category !== state.category) return false;
      if (state.favoritesOnly && !state.favorites.has(verse.id)) return false;
      return true;
    });
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
      if (elements.bentoContainer) elements.bentoContainer.style.display = 'grid';
      if (elements.noResults) elements.noResults.style.display = 'none';
    }

    if (elements.bentoContainer) {
      elements.bentoContainer.innerHTML = filtered.map(verse => {
        const isFav = state.favorites.has(verse.id);
        const currentText = verse.translations[state.version] || verse.translations.NIV;
        const spanClass = `bento-${verse.bentoSpan || 'standard'}`;
        const catClass = `cat-${verse.themeColor || 'amber'}`;

        return `
          <article class="bento-card ${spanClass} ${catClass}" id="verse-card-${verse.id}" data-id="${verse.id}" data-category="${verse.category}" title="Click to open chapter context & deep grace study">
            
            <!-- Pure Main Scripture Text -->
            <div class="card-verse-first">
              <blockquote class="scripture-text" id="verse-text-${verse.id}">
                "${escapeHtml(currentText)}"
              </blockquote>
            </div>

            <!-- Small Meta Row at Bottom: Reference, Category & Actions -->
            <div class="card-meta-bottom">
              <div class="meta-left">
                <span class="card-ref-badge">${verse.id}. ${verse.ref}</span>
                <span class="category-tag">
                  <i data-lucide="${verse.icon || 'bookmark'}" style="width: 11px; height: 11px;"></i>
                  ${verse.categoryLabel}
                </span>
              </div>

              <div class="card-actions-row">
                <button class="card-action-btn btn-story-single" data-id="${verse.id}" title="View in Fullscreen Stories Mode">
                  <i data-lucide="play" style="width: 13px; height: 13px;"></i>
                </button>
                <button class="card-action-btn btn-favorite ${isFav ? 'favorite-active' : ''}" data-id="${verse.id}" title="${isFav ? 'Remove Bookmark' : 'Bookmark Verse'}">
                  <i data-lucide="bookmark" style="width: 13px; height: 13px; ${isFav ? 'fill: currentColor;' : ''}"></i>
                </button>
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
    state.theme = theme;
    elements.html.setAttribute('data-theme', theme);
    localStorage.setItem('agy_bible_theme', theme);

    document.querySelectorAll('.theme-picker .segmented-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-val') === theme);
    });
  }

  function applyFontStyle(style) {
    state.fontStyle = style;
    elements.html.classList.remove('font-serif', 'font-sans', 'font-editorial', 'font-display', 'font-mono');
    elements.html.classList.add(`font-${style}`);
    localStorage.setItem('agy_font_style', style);

    document.querySelectorAll('.font-style-picker .segmented-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-font') === style);
    });
  }

  function applyLineHeight(lh) {
    state.lineHeight = lh;
    document.documentElement.style.setProperty('--verse-line-height', lh);
    localStorage.setItem('agy_line_height', lh);
  }

  function applyFontSize(size) {
    state.fontSize = size;
    document.documentElement.style.setProperty('--verse-font-size', `${size}rem`);
    localStorage.setItem('agy_font_size', size.toString());
  }

  function applyViewMode(mode) {
    state.viewMode = mode;
    localStorage.setItem('agy_view_mode', mode);

    if (elements.heroOverview) elements.heroOverview.style.display = 'flex';
    if (elements.bentoContainer) elements.bentoContainer.style.display = 'grid';
    document.body.classList.toggle('view-list', mode === 'list');

    if (elements.viewToggleIcon) {
      elements.viewToggleIcon.setAttribute('data-lucide', mode === 'list' ? 'layout-list' : 'layout-grid');
      refreshIcons();
    }
  }

  function setBibleVersion(ver) {
    if (['NIV', 'TPT', 'NLT', 'NASB'].includes(ver)) {
      state.version = ver;
      localStorage.setItem('agy_bible_version', ver);

      document.querySelectorAll('.version-picker .segmented-btn').forEach(btn => {
        const bVer = btn.getAttribute('data-version');
        btn.classList.toggle('active', bVer === ver);
      });

      render();
    }
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
    const trans = ['NIV', 'TPT', 'NLT', 'NASB'];
    const names = {
      NIV: 'New International Version',
      TPT: 'The Passion Translation',
      NLT: 'New Living Translation',
      NASB: 'New American Standard'
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
  // FULLSCREEN ENDLESS STORIES MODE (16 DYNAMIC STYLES & 6-TIER AUTO-FITTING)
  // ==========================================================================
  function resetStoriesShufflePool() {
    state.storyShufflePool = [...BIBLE_VERSES].sort(() => Math.random() - 0.5);
  }

  function openStoriesMode(specificVerseId = null) {
    state.isStoriesMode = true;
    state.hasTappedStoryOnce = false;
    resetStoriesShufflePool();

    let targetVerse = null;
    if (specificVerseId) {
      targetVerse = BIBLE_VERSES.find(v => v.id === specificVerseId);
    }
    
    if (elements.storyTapToast) elements.storyTapToast.classList.remove('dismissed');
    if (elements.storyOverlay) elements.storyOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    renderNextStorySlide(targetVerse);

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
        if (styleName === 'story-style-cinzel') {
          return `<span class="fx-roman">${escapeHtml(w)}</span>`;
        } else if (styleName === 'story-style-spacemono') {
          return `<span class="fx-mono-glow">${escapeHtml(w)}</span>`;
        } else if (styleName === 'story-style-playfair' || styleName === 'story-style-newsreader' || styleName === 'story-style-cormorant' || styleName === 'story-style-fraunces' || styleName === 'story-style-dm-serif' || styleName === 'story-style-instrument-serif') {
          return `<span class="fx-italic">${escapeHtml(w)}</span>`;
        } else if (styleName === 'story-style-unbounded' || styleName === 'story-style-kinetic') {
          return `<span class="fx-gradient">${escapeHtml(w)}</span>`;
        } else if (styleName === 'story-style-swiss' || styleName === 'story-style-neobrutalism' || styleName === 'story-style-bricolage' || styleName === 'story-style-epilogue' || styleName === 'story-style-condensed' || styleName === 'story-style-anton') {
          return `<span class="fx-accent">${escapeHtml(w)}</span>`;
        } else {
          return `<span class="fx-scale">${escapeHtml(w)}</span>`;
        }
      }
      return escapeHtml(w);
    });

    return `"${formattedWords.join(' ')}"`;
  }

  // 6-Tier Adaptive Font Sizing based on character length
  function calculateStoryFontSizeClass(textLength) {
    if (textLength < 70) return 'story-size-hero';
    if (textLength < 150) return 'story-size-large';
    if (textLength < 250) return 'story-size-medium';
    if (textLength < 400) return 'story-size-compact';
    if (textLength < 550) return 'story-size-mini';
    return 'story-size-dense';
  }

  function renderNextStorySlide(forcedVerse = null) {
    if (!state.storyShufflePool.length) {
      resetStoriesShufflePool();
    }

    if (!state.hasTappedStoryOnce) {
      state.hasTappedStoryOnce = true;
      if (elements.storyTapToast) elements.storyTapToast.classList.add('dismissed');
    }

    const verse = forcedVerse || state.storyShufflePool.pop();
    state.storyCurrentVerse = verse;

    // Pick dynamic randomized version for endless storytelling
    const versions = ['TPT', 'NIV', 'NLT', 'NASB'];
    const chosenVer = versions[Math.floor(Math.random() * versions.length)];
    const textToDisplay = verse.translations[chosenVer] || verse.translations.NIV;

    // Pick a random style from the 16 unique styles
    const nextStyle = state.storyTypographyStyles[Math.floor(Math.random() * state.storyTypographyStyles.length)];
    state.storyCurrentStyle = nextStyle;

    const sizeClass = calculateStoryFontSizeClass(textToDisplay.length);

    if (elements.storyContainer) {
      elements.storyContainer.className = `story-container ${nextStyle} ${sizeClass}`;
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

    if (elements.storyPassageText) elements.storyPassageText.innerHTML = formatStoryTextWithEffects(textToDisplay, nextStyle);
    if (elements.storyPassageRef) elements.storyPassageRef.textContent = verse.ref;
    if (elements.storyActiveVerBadge) elements.storyActiveVerBadge.textContent = chosenVer;

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

    // 1. Resilient Sticky Header Event Delegation (Version, Theme, Font, Size, Story, View Toggle)
    if (elements.stickyHeader) {
      elements.stickyHeader.addEventListener('click', (e) => {
        // Translation Picker
        const verBtn = e.target.closest('.version-picker .segmented-btn');
        if (verBtn) {
          const ver = verBtn.getAttribute('data-version');
          if (ver) setBibleVersion(ver);
          return;
        }

        // Theme Picker
        const themeBtn = e.target.closest('.theme-picker .segmented-btn');
        if (themeBtn) {
          const themeVal = themeBtn.getAttribute('data-theme-val');
          if (themeVal) applyTheme(themeVal);
          return;
        }

        // Font Style Picker
        const fontBtn = e.target.closest('.font-style-picker .segmented-btn');
        if (fontBtn) {
          const font = fontBtn.getAttribute('data-font');
          if (font) applyFontStyle(font);
          return;
        }

        // Font Size Adjusters
        if (e.target.closest('#btnFontDecrease')) {
          const newSize = Math.max(0.95, state.fontSize - 0.08);
          applyFontSize(newSize);
          return;
        }
        if (e.target.closest('#btnFontIncrease')) {
          const newSize = Math.min(1.85, state.fontSize + 0.08);
          applyFontSize(newSize);
          return;
        }

        // Stories Mode Button
        if (e.target.closest('#btnOpenStories')) {
          openStoriesMode();
          return;
        }

        // View Mode Toggle (Grid / List)
        if (e.target.closest('#btnViewToggle')) {
          applyViewMode(state.viewMode === 'bento' ? 'list' : 'bento');
          return;
        }
      });
    }

    // 2. Category Filter Chips (Event Delegation)
    if (elements.categoryChips) {
      elements.categoryChips.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip-btn');
        if (!btn) return;

        if (btn.id === 'favoritesFilterBtn') {
          state.favoritesOnly = !state.favoritesOnly;
          btn.classList.toggle('active', state.favoritesOnly);
        } else {
          const cat = btn.getAttribute('data-category');
          if (!cat) return;
          state.category = cat;

          document.querySelectorAll('#categoryChips .chip-btn').forEach(b => {
            if (b.id !== 'favoritesFilterBtn') b.classList.remove('active');
          });
          btn.classList.add('active');
        }

        render();
      });
    }

    // 3. Reset Filters Button
    if (elements.resetFiltersBtn) {
      elements.resetFiltersBtn.addEventListener('click', () => {
        state.category = 'all';
        state.favoritesOnly = false;

        document.querySelectorAll('#categoryChips .chip-btn').forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-category') === 'all');
        });

        render();
      });
    }

    // 4. Bento Card Clicks (Open Reader Lightbox, Favorite, Story)
    if (elements.bentoContainer) {
      elements.bentoContainer.addEventListener('click', (e) => {
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

        const card = e.target.closest('.bento-card');
        if (card) {
          const id = parseInt(card.getAttribute('data-id'), 10);
          openReaderLightbox(id);
        }
      });
    }

    // 5. Fullscreen Endless Stories Mode Listeners
    if (elements.storyOverlay) {
      elements.storyOverlay.addEventListener('click', (e) => {
        if (e.target.closest('#storyCloseBtn')) return;
        renderNextStorySlide();
      });
    }

    if (elements.storyCloseBtn) {
      elements.storyCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeStoriesMode();
      });
    }

    // 6. Reader Lightbox Listeners
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

    // 7. Scroll to top
    if (elements.scrollToTopBtn) {
      elements.scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 8. Shortcuts Modal
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

    // 9. Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      // Escape closes modals
      if (e.key === 'Escape') {
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
        const nextTheme = state.theme === 'light' ? 'mud' : (state.theme === 'mud' ? 'dark' : 'light');
        applyTheme(nextTheme);
      }
      else if (e.key.toLowerCase() === 'v') {
        const versions = ['NIV', 'TPT', 'NLT', 'NASB'];
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

    render();
  }

  // --- Bootstrap on DOM Ready ---
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
