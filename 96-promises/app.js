/**
 * 96 Promises & Truths — Dynamic Context, Interlinear Lexicon & Dynamic Stories
 * 
 * Features:
 * 1. Pure Verse-First Bento Cards: Clean scripture text front-and-center.
 * 2. Dynamic 4-Translation Context Flow: Switching translation updates all surrounding verses in context with inline highlighted & underlined target verse.
 * 3. Interlinear Greek & Hebrew Lexicon with clickable highlighted phrase tags mapped to Strong's Concordance cards.
 * 4. Rich Interactive Cross-References with one-click jumping between linked passages.
 * 5. 6 Unique Story Design Styles (Swiss, Neo-Brutalism, Condensed Poster, Combo, Luxe, Kinetic) with bottom-corner metadata and auto-dismissing tap toast.
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
    searchQuery: '',
    favoritesOnly: false,
    favorites: new Set(JSON.parse(localStorage.getItem('agy_bible_favs') || '[]')),
    
    // Unified Reader Lightbox
    activeReaderVerseId: 1,
    activeReaderVersion: localStorage.getItem('agy_bible_version') || 'NIV',

    // Endless Stories Mode
    isStoriesMode: false,
    hasTappedStoryOnce: false,
    storyShufflePool: [],
    storyCurrentVerse: null,
    storyModeVersion: 'MIX',
    storyTypographyStyles: [
      'story-style-swiss',
      'story-style-neobrutalism',
      'story-style-condensed',
      'story-style-combo',
      'story-style-luxe',
      'story-style-kinetic'
    ],
    storyCurrentStyle: 'story-style-swiss'
  };

  // --- DOM References ---
  const elements = {
    html: document.documentElement,
    heroOverview: document.getElementById('heroOverview'),
    bentoContainer: document.getElementById('bentoContainer'),
    constellationWrapper: document.getElementById('constellationWrapper'),
    constellationCanvas: document.getElementById('constellationCanvas'),
    constellationTooltip: document.getElementById('constellationTooltip'),
    tooltipRef: document.getElementById('tooltipRef'),
    tooltipText: document.getElementById('tooltipText'),
    btnOpenConstellation: document.getElementById('btnOpenConstellation'),
    btnCloseConstellation: document.getElementById('btnCloseConstellation'),
    btnConstellationReset: document.getElementById('btnConstellationReset'),
    
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
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
    btnRandomVerse: document.getElementById('btnRandomVerse'),
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
    readerCopyAllBtn: document.getElementById('readerCopyAllBtn'),
    readerCloseBtn: document.getElementById('readerCloseBtn'),

    // Endless Stories Mode DOM
    storyOverlay: document.getElementById('storyOverlay'),
    storyContainer: document.getElementById('storyContainer'),
    storyBackdrop: document.getElementById('storyBackdrop'),
    storyContentWrapper: document.getElementById('storyContentWrapper'),
    storyPassageText: document.getElementById('storyPassageText'),
    storyPassageRef: document.getElementById('storyPassageRef'),
    storyActiveVerBadge: document.getElementById('storyActiveVerBadge'),
    storyCloseBtn: document.getElementById('storyCloseBtn'),
    storyTapToast: document.getElementById('storyTapToast'),
    storyOrb1: document.getElementById('storyOrb1'),
    storyOrb2: document.getElementById('storyOrb2'),
    storyOrb3: document.getElementById('storyOrb3'),

    toastContainer: document.getElementById('toastContainer')
  };

  // --- Initialize App ---
  function init() {
    applyTheme(state.theme);
    applyFontStyle(state.fontStyle);
    applyLineHeight(state.lineHeight);
    applyFontSize(state.fontSize);
    applyViewMode(state.viewMode);
    setupEventListeners();
    updateCategoryBadgeCounts();
    render();
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
    } else if (hash === '#constellation') {
      applyViewMode('constellation');
    } else if (hash === '#bento' || hash === '' || hash === '#') {
      applyViewMode('bento');
    } else if (hash.startsWith('#theme=')) {
      const themeVal = hash.replace('#theme=', '').trim();
      if (['light', 'mud', 'dark'].includes(themeVal)) applyTheme(themeVal);
    }
  }

  function refreshIcons() {
    try {
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    } catch (err) {
      console.warn('Lucide warning:', err);
    }
  }

  function updateCategoryBadgeCounts() {
    const counts = {};
    BIBLE_VERSES.forEach(v => {
      counts[v.category] = (counts[v.category] || 0) + 1;
    });

    Object.keys(counts).forEach(cat => {
      const el = document.getElementById(`count-${cat}`);
      if (el) el.textContent = counts[cat];
    });

    elements.favoritesCount.textContent = state.favorites.size;
  }

  function getFilteredVerses() {
    return BIBLE_VERSES.filter(verse => {
      if (state.category !== 'all' && verse.category !== state.category) return false;
      if (state.favoritesOnly && !state.favorites.has(verse.id)) return false;

      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase().trim();
        const refMatch = verse.ref.toLowerCase().includes(q);
        const catMatch = verse.categoryLabel.toLowerCase().includes(q);
        const idMatch = verse.id.toString() === q || `#${verse.id}` === q;
        const textMatch = Object.values(verse.translations).some(t => t.toLowerCase().includes(q));
        const lexiconMatch = verse.lexicon && verse.lexicon.keyTerms && verse.lexicon.keyTerms.some(t => 
          t.word.includes(q) || t.transliteration.toLowerCase().includes(q) || t.strongs.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
        );

        return refMatch || catMatch || idMatch || textMatch || lexiconMatch;
      }

      return true;
    });
  }

  // --- Render Bento Grid (Pure Verse-First Hierarchy) ---
  function render() {
    const filtered = getFilteredVerses();

    elements.statDisplayedCount.textContent = filtered.length;
    elements.statBookmarksCount.textContent = state.favorites.size;
    elements.favoritesCount.textContent = state.favorites.size;
    elements.activeVersionLabel.textContent = state.version;

    if (filtered.length === 0) {
      elements.bentoContainer.style.display = 'none';
      elements.noResults.style.display = 'flex';
      refreshIcons();
      return;
    } else {
      if (state.viewMode !== 'constellation') {
        elements.bentoContainer.style.display = 'grid';
      }
      elements.noResults.style.display = 'none';
    }

    elements.bentoContainer.innerHTML = filtered.map(verse => {
      const isFav = state.favorites.has(verse.id);
      const currentText = verse.translations[state.version] || verse.translations.NIV;
      const spanClass = `bento-${verse.bentoSpan || 'standard'}`;
      const catClass = `cat-${verse.themeColor || 'amber'}`;

      return `
        <article class="bento-card ${spanClass} ${catClass}" id="verse-card-${verse.id}" data-id="${verse.id}" title="Click to open chapter context & deep grace study">
          
          <!-- Pure Main Scripture Text -->
          <div class="card-verse-first">
            <blockquote class="scripture-text" id="verse-text-${verse.id}">
              "${escapeHtml(currentText)}"
            </blockquote>
          </div>

          <!-- Small Meta Row at Bottom: Reference, Category & Subtle Actions -->
          <div class="card-meta-bottom">
            <div class="meta-left">
              <span class="card-ref-badge">${verse.id}. ${verse.ref}</span>
              <span class="category-tag">
                <i data-lucide="${verse.icon || 'bookmark'}" style="width: 11px; height: 11px;"></i>
                ${verse.categoryLabel}
              </span>
            </div>

            <div class="card-actions-row">
              <button class="card-action-btn btn-story-single" data-id="${verse.id}" title="View in Endless Stories Mode">
                <i data-lucide="sparkles" style="width: 14px; height: 14px;"></i>
              </button>
              <button class="card-action-btn btn-copy" data-id="${verse.id}" title="Copy Scripture">
                <i data-lucide="copy" style="width: 14px; height: 14px;"></i>
              </button>
              <button class="card-action-btn btn-favorite ${isFav ? 'favorite-active' : ''}" data-id="${verse.id}" title="${isFav ? 'Remove Bookmark' : 'Bookmark Verse'}">
                <i data-lucide="heart" style="width: 14px; height: 14px; ${isFav ? 'fill: currentColor;' : ''}"></i>
              </button>
            </div>
          </div>

        </article>
      `;
    }).join('');

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

  // --- Typography & Theme Controls ---
  function applyTheme(theme) {
    state.theme = theme;
    elements.html.setAttribute('data-theme', theme);
    localStorage.setItem('agy_bible_theme', theme);

    document.querySelectorAll('.theme-picker .segmented-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-val') === theme);
    });

    if (constellation) constellation.render();
  }

  function applyFontStyle(style) {
    state.fontStyle = style;
    elements.html.classList.remove('font-serif', 'font-sans', 'font-display', 'font-cinzel', 'font-mono');
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

    document.querySelectorAll('.line-height-picker .segmented-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lh') === lh);
    });
  }

  function applyFontSize(size) {
    state.fontSize = size;
    document.documentElement.style.setProperty('--verse-font-size', `${size}rem`);
    localStorage.setItem('agy_font_size', size.toString());
  }

  function applyViewMode(mode) {
    state.viewMode = mode;
    localStorage.setItem('agy_view_mode', mode);

    if (mode === 'constellation') {
      elements.bentoContainer.style.display = 'none';
      elements.constellationWrapper.classList.add('active');
      elements.heroOverview.style.display = 'none';
      if (!constellation) initConstellation();
      setTimeout(() => constellation && constellation.resize(), 50);
    } else {
      elements.constellationWrapper.classList.remove('active');
      elements.heroOverview.style.display = 'flex';
      elements.bentoContainer.style.display = 'grid';
      document.body.classList.toggle('view-list', mode === 'list');
    }

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
      showToast(`Switched translation to ${ver}`);
    }
  }

  // ==========================================================================
  // UNIFIED SINGLE SCRIPTURE READER & DEEP STUDY LIGHTBOX
  // ==========================================================================
  function openReaderLightbox(verseId, specificVersion = null) {
    const verse = BIBLE_VERSES.find(v => v.id === verseId);
    if (!verse) return;

    state.activeReaderVerseId = verseId;
    state.activeReaderVersion = specificVersion || state.version;

    // 1. Header Information
    elements.readerTitle.textContent = `${verse.id}. ${verse.ref}`;
    elements.readerCategoryBadge.className = `category-tag cat-${verse.themeColor || 'amber'}`;
    elements.readerCategoryBadge.innerHTML = `
      <i data-lucide="${verse.icon || 'bookmark'}" style="width: 12px; height: 12px;"></i>
      ${verse.categoryLabel}
    `;

    // Sync Header Version Pills
    document.querySelectorAll('.reader-ver-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-ver') === state.activeReaderVersion);
    });

    // 2. Render Multi-Translation Inline Context Passage Block
    renderInlinePassage(verse, state.activeReaderVersion);

    // 3. Render 4 Translations Side-by-Side
    renderReaderTranslations(verse);

    // 4. Render Paul Ellis Grace Commentary
    renderReaderGraceCommentary(verse);

    // 5. Render Multiple Biblical Case Studies
    renderReaderCaseStudies(verse);

    // 6. Render Hebrew/Greek Word Lexicon with Interlinear Highlighting
    renderReaderLexicon(verse, state.activeReaderVersion);

    // 7. Render TPT Footnotes
    elements.readerTptFootnotes.textContent = verse.tptFootnotes || 'The Passion Translation unveils the unconditional love of God and divine inheritance in this passage.';

    // 8. Render Rich Interactive Cross-References
    renderReaderCrossRefs(verse);

    elements.readerLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    refreshIcons();
  }

  function renderInlinePassage(verse, ver) {
    const dyn = verse.dynamicContext;
    const vData = dyn?.versions[ver] || dyn?.versions['NIV'] || verse.context;

    elements.readerChapterTitle.textContent = dyn?.chapterTitle || `${verse.ref} — Context & Surrounding Flow`;
    elements.readerChapterSummary.textContent = dyn?.chapterSummary || 'Explore the surrounding biblical flow of this promise.';
    elements.readerActiveVerBadge.textContent = ver;

    const currentTargetText = verse.translations[ver] || verse.translations.NIV;

    let html = '';

    // Preceding Verses (Before) in Selected Version
    if (vData && vData.before && vData.before.length) {
      vData.before.forEach(b => {
        html += `<span class="inline-verse-num">${b.num}</span>${escapeHtml(b.text)} `;
      });
    }

    // Highlighted & Underlined Target Verse Inline in Selected Version
    const targetNum = vData?.target?.num || verse.ref.split(':').pop() || '•';
    html += `
      <span class="inline-target-verse">
        <span class="inline-verse-num">${targetNum}</span>"${escapeHtml(currentTargetText)}"
      </span>
    `;

    // Following Verses (After) in Selected Version
    if (vData && vData.after && vData.after.length) {
      vData.after.forEach(a => {
        html += ` <span class="inline-verse-num">${a.num}</span>${escapeHtml(a.text)}`;
      });
    }

    elements.readerInlinePassage.innerHTML = html;
  }

  function renderReaderTranslations(verse) {
    const versions = ['NIV', 'TPT', 'NLT', 'NASB'];
    const versionNames = {
      'NIV': 'New International Version',
      'TPT': 'The Passion Translation',
      'NLT': 'New Living Translation',
      'NASB': 'New American Standard Bible'
    };

    elements.readerTranslationsGrid.innerHTML = versions.map(ver => {
      const rawText = verse.translations[ver] || '';
      return `
        <div class="translation-card-item">
          <div class="item-header">
            <div>
              <span class="version-title">${ver}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 0.4rem;">${versionNames[ver]}</span>
            </div>
            <button class="item-copy-btn btn-reader-copy-single" data-ver="${ver}" title="Copy ${ver}">
              <i data-lucide="copy" style="width: 13px; height: 13px;"></i> Copy
            </button>
          </div>
          <p class="item-text">"${escapeHtml(rawText)}"</p>
        </div>
      `;
    }).join('');
  }

  function renderReaderGraceCommentary(verse) {
    if (verse.paulEllisInsight) {
      elements.readerGraceTheme.textContent = verse.paulEllisInsight.theme;
      elements.readerGraceQuote.textContent = `"${verse.paulEllisInsight.quote}"`;
      elements.readerGraceTakeaway.textContent = verse.paulEllisInsight.graceTakeaway;
    }
  }

  function renderReaderCaseStudies(verse) {
    if (verse.caseStudiesList && verse.caseStudiesList.length) {
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

    elements.readerLexiconLang.innerHTML = `
      <i data-lucide="book-marked" style="width: 13px; height: 13px;"></i>
      ${escapeHtml(lex.originalLanguage)}
    `;

    // 1. Render Interlinear Highlighted Verse Template
    let interlinearHtml = '';
    const template = lex.highlightedVerseTemplates?.[ver] || lex.highlightedVerseTemplates?.['NIV'] || '';

    if (template) {
      // Parse [highlighted text]{STRONGS_ID}
      interlinearHtml = template.replace(/\[(.*?)\]\{(.*?)\}/g, (match, phrase, strongs) => {
        return `<mark class="lexicon-word-tag" data-strongs="${escapeHtml(strongs)}" title="Strong's ${escapeHtml(strongs)} — Click to inspect root">${escapeHtml(phrase)}</mark>`;
      });
    } else {
      const rawText = verse.translations[ver] || verse.translations.NIV;
      interlinearHtml = `"${escapeHtml(rawText)}"`;
    }

    elements.readerInterlinearText.innerHTML = interlinearHtml;

    // 2. Render Key Term Cards
    if (lex.keyTerms && lex.keyTerms.length) {
      elements.readerLexiconGrid.innerHTML = lex.keyTerms.map(term => `
        <div class="lexicon-term-card" id="lex-card-${term.strongs.replace(/[^a-zA-Z0-9]/g, '')}">
          <div class="lexicon-term-header">
            <span class="lexicon-original-word">${escapeHtml(term.word)}</span>
            <span class="lexicon-strongs-pill">${escapeHtml(term.strongs)}</span>
          </div>
          <div class="lexicon-matched-pill">Translated as: "${escapeHtml(term.matchedEnglish || term.transliteration)}"</div>
          <div class="lexicon-translit">${escapeHtml(term.transliteration)} (${escapeHtml(term.pronunciation)})</div>
          <div class="lexicon-root"><em>${escapeHtml(term.partOfSpeech)}</em> • ${escapeHtml(term.root)}</div>
          <div class="lexicon-def"><strong>Definition:</strong> ${escapeHtml(term.definition)}</div>
          <div class="lexicon-def" style="color: #6366f1;"><strong>Contextual Usage:</strong> ${escapeHtml(term.usageInPassage)}</div>
        </div>
      `).join('');
    }

    elements.readerLexiconSummary.textContent = lex.theologicalSummary || 'Original root terms illuminate the unconditional nature of God\'s covenant promises.';

    // Wire Interactive Interlinear Tag Clicks & Hovers
    document.querySelectorAll('.lexicon-word-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const strongs = tag.getAttribute('data-strongs');
        const cleanId = strongs.replace(/[^a-zA-Z0-9]/g, '');
        const targetCard = document.getElementById(`lex-card-${cleanId}`) || document.querySelector('.lexicon-term-card');
        
        document.querySelectorAll('.lexicon-word-tag').forEach(t => t.classList.remove('active'));
        tag.classList.add('active');

        document.querySelectorAll('.lexicon-term-card').forEach(c => c.classList.remove('highlighted'));
        if (targetCard) {
          targetCard.classList.add('highlighted');
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }

  function renderReaderCrossRefs(verse) {
    if (verse.crossReferencesList && verse.crossReferencesList.length) {
      elements.readerCrossRefsGrid.innerHTML = verse.crossReferencesList.map(cr => `
        <div class="cross-ref-rich-item" data-linked-id="${cr.linkedVerseId || ''}" title="Click to view connected Scripture">
          <h5>
            <span>${escapeHtml(cr.ref)}</span>
            <i data-lucide="arrow-up-right" style="width: 14px; height: 14px; color: #06b6d4;"></i>
          </h5>
          <p>"${escapeHtml(cr.text)}"</p>
        </div>
      `).join('');
    }
  }

  function closeReaderLightbox() {
    elements.readerLightbox.classList.remove('active');
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#verse=') || window.location.hash.startsWith('#study=')) {
      history.replaceState(null, null, ' ');
    }
  }

  // ==========================================================================
  // INTERACTIVE CONSTELLATION GALAXY ENGINE (Canvas 2D)
  // ==========================================================================
  let constellation = null;

  function initConstellation() {
    const canvas = elements.constellationCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const THEME_COLORS = {
      'joy-presence': '#f59e0b',
      'provision-abundance': '#10b981',
      'courage-protection': '#ef4444',
      'peace-rest': '#14b8a6',
      'identity-grace': '#8b5cf6',
      'wisdom-word': '#06b6d4',
      'faith-prayer': '#6366f1',
      'healing-renewal': '#ec4899'
    };

    const nodes = BIBLE_VERSES.map((verse, index) => {
      const catIndex = [
        'joy-presence', 'provision-abundance', 'courage-protection',
        'peace-rest', 'identity-grace', 'wisdom-word', 'faith-prayer', 'healing-renewal'
      ].indexOf(verse.category);

      const nebulaAngle = (catIndex / 8) * Math.PI * 2;
      const distFromCenter = 160 + (index % 12) * 28;
      const angleOffset = ((index % 12) / 12) * 0.9 - 0.45;
      const finalAngle = nebulaAngle + angleOffset;

      return {
        id: verse.id,
        ref: verse.ref,
        category: verse.category,
        keyPhrase: verse.keyPhrase,
        color: THEME_COLORS[verse.category] || '#f59e0b',
        x: Math.cos(finalAngle) * distFromCenter,
        y: Math.sin(finalAngle) * distFromCenter,
        radius: 6 + (verse.bentoSpan === 'hero' ? 4 : verse.bentoSpan === 'wide' ? 2 : 0),
        pulse: Math.random() * Math.PI * 2,
        connectedIds: verse.connectedVerseIds || []
      };
    });

    let offsetX = 0;
    let offsetY = 0;
    let scale = 1;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let hoveredNode = null;

    function resize() {
      const rect = elements.constellationWrapper.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      renderGalaxy();
    }

    function renderGalaxy() {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w / 2 + offsetX, h / 2 + offsetY);
      ctx.scale(scale, scale);

      nodes.forEach(node => {
        node.connectedIds.forEach(targetId => {
          const target = nodes.find(n => n.id === targetId);
          if (target) {
            const isHighlighted = hoveredNode && (hoveredNode.id === node.id || hoveredNode.id === target.id);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = isHighlighted ? node.color : 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = isHighlighted ? 2 : 0.75;
            ctx.stroke();
          }
        });
      });

      nodes.forEach(node => {
        const isHovered = hoveredNode && hoveredNode.id === node.id;
        node.pulse += 0.03;
        const currentRadius = node.radius + (isHovered ? 4 : Math.sin(node.pulse) * 1.2);

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? node.color : node.color + '33';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        if (isHovered || node.radius > 8) {
          ctx.fillStyle = '#f8fafc';
          ctx.font = '600 11px Plus Jakarta Sans, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.ref, node.x, node.y + currentRadius + 14);
        }
      });

      ctx.restore();
    }

    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX - offsetX;
      startY = e.clientY - offsetY;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;
        renderGalaxy();
      } else {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const w = rect.width;
        const h = rect.height;

        const worldX = (mx - (w / 2 + offsetX)) / scale;
        const worldY = (my - (h / 2 + offsetY)) / scale;

        hoveredNode = nodes.find(n => {
          const dist = Math.hypot(n.x - worldX, n.y - worldY);
          return dist < n.radius + 8;
        });

        if (hoveredNode) {
          canvas.style.cursor = 'pointer';
          elements.constellationTooltip.style.display = 'block';
          elements.constellationTooltip.style.left = `${mx}px`;
          elements.constellationTooltip.style.top = `${my}px`;
          elements.tooltipRef.textContent = `${hoveredNode.id}. ${hoveredNode.ref}`;
          elements.tooltipText.textContent = `✦ ${hoveredNode.keyPhrase}`;
        } else {
          canvas.style.cursor = isDragging ? 'grabbing' : 'grab';
          elements.constellationTooltip.style.display = 'none';
        }
        renderGalaxy();
      }
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    canvas.addEventListener('click', () => {
      if (hoveredNode) {
        openReaderLightbox(hoveredNode.id);
      }
    });

    elements.btnConstellationReset.addEventListener('click', () => {
      offsetX = 0;
      offsetY = 0;
      scale = 1;
      renderGalaxy();
    });

    window.addEventListener('resize', resize);
    resize();

    constellation = { render: renderGalaxy, resize };
  }

  // ==========================================================================
  // ENDLESS STORIES IMMERSIVE MODE (6 UNIQUE STYLES & CORNER METADATA)
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
    elements.storyOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    renderNextStorySlide(targetVerse);

    // Auto dismiss tap toast after 3 seconds
    setTimeout(() => {
      if (elements.storyTapToast) elements.storyTapToast.classList.add('dismissed');
    }, 3200);
  }

  function closeStoriesMode() {
    state.isStoriesMode = false;
    elements.storyOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (window.location.hash.startsWith('#story')) history.replaceState(null, null, ' ');
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

    const versions = ['TPT', 'NIV', 'NLT', 'NASB'];
    let chosenVer = state.storyModeVersion;
    if (chosenVer === 'MIX') {
      chosenVer = versions[Math.floor(Math.random() * versions.length)];
    }

    const textToDisplay = verse.translations[chosenVer] || verse.translations.NIV;

    // Pick a new random style from the 6 unique styles
    const nextStyle = state.storyTypographyStyles[Math.floor(Math.random() * state.storyTypographyStyles.length)];
    state.storyCurrentStyle = nextStyle;

    elements.storyContainer.className = `story-container ${nextStyle}`;

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
    elements.storyBackdrop.style.background = gradientMap[verse.category] || gradientMap['joy-presence'];

    elements.storyPassageText.textContent = `"${textToDisplay}"`;
    elements.storyPassageRef.textContent = verse.ref;
    elements.storyActiveVerBadge.textContent = chosenVer;

    elements.storyContentWrapper.style.animation = 'none';
    elements.storyContentWrapper.offsetHeight;
    elements.storyContentWrapper.style.animation = 'storySlideEnter 0.42s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    refreshIcons();
  }

  // --- Copy Clipboard ---
  function copyVerseText(verseId, specificVersion = null) {
    const verse = BIBLE_VERSES.find(v => v.id === verseId);
    if (!verse) return;
    const ver = specificVersion || state.version;
    const text = verse.translations[ver] || verse.translations.NIV;
    const formatted = `"${text}"\n— ${verse.ref} (${ver})`;

    navigator.clipboard.writeText(formatted).then(() => {
      showToast(`Copied ${verse.ref} (${ver})!`);
    }).catch(() => showToast('Failed to copy', true));
  }

  function copyAllTranslationsAndStudy(verseId) {
    const verse = BIBLE_VERSES.find(v => v.id === verseId);
    if (!verse) return;

    let formatted = `${verse.ref} (${verse.categoryLabel})\n\n` +
      `[NIV]: "${verse.translations.NIV}"\n\n` +
      `[TPT]: "${verse.translations.TPT}"\n\n` +
      `[NLT]: "${verse.translations.NLT}"\n\n` +
      `[NASB]: "${verse.translations.NASB}"\n\n` +
      `[Grace Commentary — Paul Ellis]:\n"${verse.paulEllisInsight?.quote || ''}"\n${verse.paulEllisInsight?.graceTakeaway || ''}\n\n`;

    if (verse.lexicon && verse.lexicon.keyTerms) {
      formatted += `[Greek / Hebrew Lexicon (${verse.lexicon.originalLanguage})]:\n`;
      verse.lexicon.keyTerms.forEach(t => {
        formatted += `• ${t.word} [${t.strongs}] (${t.transliteration}): ${t.definition}\n`;
      });
    }

    navigator.clipboard.writeText(formatted).then(() => {
      showToast(`Copied all 4 translations & deep study of ${verse.ref}!`);
    });
  }

  function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isError) toast.style.background = '#ef4444';
    toast.innerHTML = `
      <i data-lucide="${isError ? 'alert-circle' : 'check-circle-2'}" style="width: 16px; height: 16px;"></i>
      <span>${escapeHtml(message)}</span>
    `;

    elements.toastContainer.appendChild(toast);
    refreshIcons();

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // ==========================================================================
  // EVENT LISTENERS SETUP
  // ==========================================================================
  function setupEventListeners() {

    // 1. Constellation Map Toggles
    elements.btnOpenConstellation.addEventListener('click', () => {
      window.location.hash = '#constellation';
    });
    elements.btnCloseConstellation.addEventListener('click', () => {
      window.location.hash = '#bento';
    });

    // 2. Endless Stories Mode Launch & Tap Anywhere
    elements.btnOpenStories.addEventListener('click', () => openStoriesMode());
    
    elements.storyOverlay.addEventListener('click', (e) => {
      if (e.target.closest('#storyTopBar')) return;
      renderNextStorySlide();
    });

    elements.storyCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeStoriesMode();
    });

    document.querySelectorAll('.story-ver-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const ver = btn.getAttribute('data-ver');
        state.storyModeVersion = ver;
        document.querySelectorAll('.story-ver-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-ver') === ver));
        renderNextStorySlide(state.storyCurrentVerse);
      });
    });

    // 3. Unified Reader Lightbox Actions
    elements.readerCloseBtn.addEventListener('click', closeReaderLightbox);
    elements.readerLightbox.addEventListener('click', (e) => {
      if (e.target === elements.readerLightbox) closeReaderLightbox();
    });

    // Translation switcher inside Reader Lightbox (Updates whole context + interlinear)
    document.querySelectorAll('.reader-ver-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ver = btn.getAttribute('data-ver');
        state.activeReaderVersion = ver;
        document.querySelectorAll('.reader-ver-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-ver') === ver));
        const verse = BIBLE_VERSES.find(v => v.id === state.activeReaderVerseId);
        if (verse) {
          renderInlinePassage(verse, ver);
          renderReaderLexicon(verse, ver);
        }
      });
    });

    // Copy All inside Reader Lightbox
    elements.readerCopyAllBtn.addEventListener('click', () => {
      if (state.activeReaderVerseId) copyAllTranslationsAndStudy(state.activeReaderVerseId);
    });

    // Delegate copy buttons inside 4-translations grid
    elements.readerTranslationsGrid.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('.btn-reader-copy-single');
      if (!copyBtn) return;
      const ver = copyBtn.getAttribute('data-ver');
      copyVerseText(state.activeReaderVerseId, ver);
    });

    // Cross reference card click -> jump to linked verse
    elements.readerCrossRefsGrid.addEventListener('click', (e) => {
      const card = e.target.closest('.cross-ref-rich-item');
      if (!card) return;
      const linkedId = card.getAttribute('data-linked-id');
      if (linkedId) {
        openReaderLightbox(parseInt(linkedId, 10));
      }
    });

    // 4. Version Pickers
    document.querySelectorAll('.version-picker .segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => setBibleVersion(btn.getAttribute('data-version')));
    });

    // 5. Theme Pickers
    document.querySelectorAll('.theme-picker .segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => applyTheme(btn.getAttribute('data-theme-val')));
    });

    // 6. Font Style Pickers
    document.querySelectorAll('.font-style-picker .segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => applyFontStyle(btn.getAttribute('data-font')));
    });

    // 7. Line Height Pickers
    document.querySelectorAll('.line-height-picker .segmented-btn').forEach(btn => {
      btn.addEventListener('click', () => applyLineHeight(btn.getAttribute('data-lh')));
    });

    // 8. Font Sizing
    elements.btnFontDecrease.addEventListener('click', () => {
      if (state.fontSize > 0.9) applyFontSize(Number((state.fontSize - 0.1).toFixed(2)));
    });
    elements.btnFontIncrease.addEventListener('click', () => {
      if (state.fontSize < 1.75) applyFontSize(Number((state.fontSize + 0.1).toFixed(2)));
    });

    // 9. View Toggle
    elements.btnViewToggle.addEventListener('click', () => {
      const nextMode = state.viewMode === 'bento' ? 'list' : 'bento';
      applyViewMode(nextMode);
    });

    // 10. Search Bar
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      elements.searchClearBtn.style.display = state.searchQuery ? 'block' : 'none';
      render();
    });

    elements.searchClearBtn.addEventListener('click', () => {
      elements.searchInput.value = '';
      state.searchQuery = '';
      elements.searchClearBtn.style.display = 'none';
      render();
      elements.searchInput.focus();
    });

    // 11. Category Chips
    elements.categoryChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip-btn');
      if (!chip) return;

      if (chip.id === 'favoritesFilterBtn') {
        state.favoritesOnly = !state.favoritesOnly;
        chip.classList.toggle('active', state.favoritesOnly);
        render();
        return;
      }

      const cat = chip.getAttribute('data-category');
      if (!cat) return;

      state.category = cat;
      document.querySelectorAll('.category-chips .chip-btn:not(#favoritesFilterBtn)').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-category') === cat);
      });
      render();
    });

    // 12. Bento Grid Delegate Actions (Click Card opens Unified Reader Lightbox)
    elements.bentoContainer.addEventListener('click', (e) => {
      const card = e.target.closest('.bento-card');
      if (!card) return;
      const id = parseInt(card.getAttribute('data-id'), 10);

      const storyBtn = e.target.closest('.btn-story-single');
      if (storyBtn) {
        e.stopPropagation();
        openStoriesMode(id);
        return;
      }

      const copyBtn = e.target.closest('.btn-copy');
      if (copyBtn) {
        e.stopPropagation();
        copyVerseText(id);
        return;
      }

      const favBtn = e.target.closest('.btn-favorite');
      if (favBtn) {
        e.stopPropagation();
        if (state.favorites.has(id)) {
          state.favorites.delete(id);
          showToast(`Removed from Bookmarks`);
        } else {
          state.favorites.add(id);
          showToast(`Added to Bookmarks`);
        }
        localStorage.setItem('agy_bible_favs', JSON.stringify(Array.from(state.favorites)));
        updateCategoryBadgeCounts();
        render();
        return;
      }

      // Open Unified Single Reader & Deep Study Lightbox
      openReaderLightbox(id);
    });

    // 13. Global Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (state.isStoriesMode) {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          renderNextStorySlide();
        } else if (e.key === 'Escape') {
          closeStoriesMode();
        }
        return;
      }

      if (elements.readerLightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeReaderLightbox();
        return;
      }

      if (document.activeElement === elements.searchInput && e.key !== 'Escape') return;

      if (e.key === '/') { e.preventDefault(); elements.searchInput.focus(); }
      else if (e.key === '1') setBibleVersion('NIV');
      else if (e.key === '2') setBibleVersion('TPT');
      else if (e.key === '3') setBibleVersion('NLT');
      else if (e.key === '4') setBibleVersion('NASB');
      else if (e.key.toLowerCase() === 's') openStoriesMode();
      else if (e.key.toLowerCase() === 'c') applyViewMode(state.viewMode === 'constellation' ? 'bento' : 'constellation');
      else if (e.key.toLowerCase() === 't') {
        const cycle = ['light', 'mud', 'dark'];
        const nextIdx = (cycle.indexOf(state.theme) + 1) % cycle.length;
        applyTheme(cycle[nextIdx]);
        showToast(`Theme: ${cycle[nextIdx].toUpperCase()}`);
      }
    });

    // Scroll to Top
    elements.scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Launch on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
