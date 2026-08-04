// ============================================================
// APP ENTRY POINT & STATE MANAGEMENT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTheme();
  initStages();
  initSlots();
  initAxisMap();
  initCounterfeits();
  initSimulator();
  initArchetypes();
  initArchitect();
  initGlossary();
});

// Toast notification trigger helper
function showToast(message, type = "info") {
  const container = document.getElementById("toast-wrap");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "error") icon = "⚠️";
  
  toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => toast.classList.add("show"), 50);
  
  // Auto remove after 3.5s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ============================================================
// TAB NAVIGATION & MOBILE MENU
// ============================================================
function initNavigation() {
  const navButtons = document.querySelectorAll(".nav-item button");
  const tabContents = document.querySelectorAll(".tab-content");
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.querySelector(".sidebar");
 
  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;
      
      // Update nav buttons active states
      document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
      btn.parentElement.classList.add("active");
      
      // Update content panes
      tabContents.forEach(tab => {
        tab.classList.remove("active");
        if (tab.id === `tab-${targetTab}`) {
          tab.classList.add("active");
        }
      });
 
      // Special resize event for canvas in simulator
      if (targetTab === "simulator") {
        setTimeout(resizeCanvas, 50);
      }
 
      // Close mobile menu on click
      if (sidebar && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  });
 
  // Mobile menu button toggle
  if (menuBtn && sidebar) {
    menuBtn.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      const isOpen = sidebar.classList.contains("open");
      menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }
}

// ============================================================
// THEME SWITCHER LOGIC
// ============================================================
function initTheme() {
  const themeBtn = document.getElementById("theme-toggle");
  const currentTheme = localStorage.getItem("theme") || "dark";
  
  document.documentElement.setAttribute("data-theme", currentTheme);
  updateThemeIcon(currentTheme);

  themeBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = activeTheme === "dark" ? "light" : "dark";
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
    
    showToast(`Switched to ${newTheme} mode`, "success");
    
    // Refresh canvas colors on theme change if visible
    if (document.getElementById("tab-simulator").classList.contains("active")) {
      drawChart();
    }
  });
}

function updateThemeIcon(theme) {
  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>`;
  document.getElementById("theme-toggle").innerHTML = theme === "dark" ? sunIcon : moonIcon;
}

// ============================================================
// STAGE ACCORDION EXPANDERS
// ============================================================
function initStages() {
  const headers = document.querySelectorAll(".stage-header");
  
  headers.forEach(header => {
    header.addEventListener("click", () => {
      const card = header.parentElement;
      const body = card.querySelector(".stage-body");
      const isOpen = card.classList.contains("open");
      
      // Close other stages (optional, but clean)
      document.querySelectorAll(".stage-card").forEach(c => {
        if (c !== card && c.classList.contains("open")) {
          c.classList.remove("open");
          c.querySelector(".stage-body").style.maxHeight = "0";
        }
      });
      
      if (isOpen) {
        card.classList.remove("open");
        body.style.maxHeight = "0";
      } else {
        card.classList.add("open");
        body.style.maxHeight = `${body.scrollHeight}px`;
      }
    });
  });
  
  // Expand first stage by default
  const firstCard = document.querySelector(".stage-card");
  if (firstCard) {
    firstCard.classList.add("open");
    const body = firstCard.querySelector(".stage-body");
    body.style.maxHeight = `${body.scrollHeight}px`;
  }
}

// ============================================================
// SLOT CLICK INTERACTIVE LIST
// ============================================================
const SLOTS_DATA = {
  connection: {
    icon: "👥",
    title: "Connection",
    need: "To feel seen, valued, and integrated with a community of love.",
    counterfeit: "Scrolling social feeds, chasing vanity indexes, text message threads.",
    exit: "Vulnerability in community, shared meals, prayer, confession in person."
  },
  rest: {
    icon: "🕯️",
    title: "Rest",
    need: "To restore reserves, unload stress, disconnect from demands.",
    counterfeit: "Doomscrolling, endless gaming, binge eating.",
    exit: "Sabbath resting, walks in nature, silence, sleeping, receiving rest as gift."
  },
  intimacy: {
    icon: "💞",
    title: "Intimacy",
    need: "To love and be loved unconditionally, sharing hidden spaces without fear.",
    counterfeit: "Pornography, codependency, parasocial validation.",
    exit: "Truth disclosure, abiding in unconditional grace, covenant friendships."
  },
  meaning: {
    icon: "🧭",
    title: "Meaning",
    need: "To align actions with a lasting purpose that outlives you.",
    counterfeit: "Workaholism, productivity streaks, material collection.",
    exit: "Self-giving service, creation care, resting in received justification."
  },
  mastery: {
    icon: "🛠️",
    title: "Mastery",
    need: "To cultivate skills, express agency, and complete work.",
    counterfeit: "Duolingo/app streaks, virtual achievements, video game ranks.",
    exit: "Real craftsmanship, manual labor, slow-skills cultivation."
  },
  transcendence: {
    icon: "🌌",
    title: "Transcendence",
    need: "To touch the eternal, praise the beautiful, worship the ultimate.",
    counterfeit: "Substance consumption, political tribalism, screen addiction.",
    exit: "Contemplative prayer, choral/worship singing, structured liturgy, stargazing."
  }
};

function initSlots() {
  const slotItems = document.querySelectorAll(".slot-item");
  const displayTitle = document.getElementById("slot-display-title");
  const displayNeed = document.getElementById("slot-display-need");
  const displayCounterfeit = document.getElementById("slot-display-counterfeit");
  const displayExit = document.getElementById("slot-display-exit");

  slotItems.forEach(item => {
    item.addEventListener("click", () => {
      const key = item.dataset.slot;
      const data = SLOTS_DATA[key];

      slotItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      // Update detail display card
      displayTitle.innerHTML = `${data.icon} ${data.title}`;
      displayNeed.innerText = data.need;
      displayCounterfeit.innerText = data.counterfeit;
      displayExit.innerText = data.exit;
    });
  });

  // Activate first slot by default
  const firstSlot = document.querySelector(".slot-item");
  if (firstSlot) firstSlot.click();
}

// ============================================================
// TAB 2: EXISTENTIAL AXIS MAP LOGIC
// ============================================================
function initAxisMap() {
  const nodes = document.querySelectorAll(".axis-node");
  const grid = document.getElementById("axis-cards-grid");

  if (!grid) return;
  grid.innerHTML = "";

  // Render cards
  Object.keys(AXES_DATA).forEach(key => {
    const data = AXES_DATA[key];
    const card = document.createElement("div");
    card.className = "axis-card";
    card.id = `axis-card-${key}`;
    card.dataset.axis = key;
    card.innerHTML = `
      <div class="axis-card-header">
        <h3>${data.title}</h3>
        <span class="axis-card-hunger">${data.hunger}</span>
      </div>
      <div class="axis-card-body">
        <div class="axis-card-item">
          <span class="axis-card-lbl">The Cue</span>
          <p class="axis-card-val">${data.cue}</p>
        </div>
        <div class="axis-card-item">
          <span class="axis-card-lbl">Counterfeit Routine</span>
          <p class="axis-card-val">${data.counterfeit}</p>
        </div>
        <div class="axis-card-item">
          <span class="axis-card-lbl">Stagnant Leak</span>
          <p class="axis-card-val">${data.leak}</p>
        </div>
        <div class="axis-card-item">
          <span class="axis-card-lbl">Self-Accusation Shame</span>
          <p class="axis-card-val">${data.shame}</p>
        </div>
        <div class="axis-card-item exit">
          <span class="axis-card-lbl">The Grace Exit</span>
          <p class="axis-card-val highlight">${data.exit}</p>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  function highlightAxis(axisId) {
    // Highlight SVG node
    nodes.forEach(n => {
      n.classList.remove("active");
      if (n.dataset.axis === axisId) {
        n.classList.add("active");
      }
    });

    // Highlight card
    const cards = document.querySelectorAll(".axis-card");
    cards.forEach(c => {
      c.classList.remove("highlight");
      if (c.dataset.axis === axisId) {
        c.classList.add("highlight");
        // Scroll to card
        c.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // Hook up SVG node clicks
  nodes.forEach(node => {
    node.addEventListener("click", () => {
      highlightAxis(node.dataset.axis);
    });
  });
}

// ============================================================
// TAB 3: MODERN COUNTERFEITS & APP TRAPS DECK
// ============================================================
function initCounterfeits() {
  const container = document.getElementById("counterfeits-list");
  if (!container) return;

  const icons = {
    rings: "🏃‍♂️",
    slack: "💬",
    linkedin: "🔍",
    streaks: "🦉",
    scroll: "📱"
  };

  container.innerHTML = "";
  Object.keys(APP_TRAPS_DATA).forEach(key => {
    const trap = APP_TRAPS_DATA[key];
    const card = document.createElement("div");
    card.className = "counterfeit-card-full";
    card.id = `counterfeit-${key}`;
    card.innerHTML = `
      <div class="cf-full-header">
        <span class="cf-full-icon">${icons[key] || "📱"}</span>
        <div>
          <h3>${trap.title}</h3>
          <span class="cf-full-axis">${trap.axis}</span>
        </div>
      </div>
      <div class="cf-full-body">
        <div class="cf-full-block">
          <span class="cf-full-lbl">The Cue</span>
          <p class="cf-full-val">${trap.cue}</p>
        </div>
        <div class="cf-full-block">
          <span class="cf-full-lbl">Counterfeit Routine</span>
          <p class="cf-full-val">${trap.routine}</p>
        </div>
        <div class="cf-full-block">
          <span class="cf-full-lbl">Immediate Reward</span>
          <p class="cf-full-val">${trap.reward}</p>
        </div>
        <div class="cf-full-block warning">
          <span class="cf-full-lbl">How it Creates Dependence</span>
          <p class="cf-full-val highlight-stress">${trap.dependency}</p>
        </div>
        <div class="cf-full-block success">
          <span class="cf-full-lbl">Displacement Strategy (Grace Exit)</span>
          <p class="cf-full-val highlight-grace">${trap.displacement}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ============================================================
// TAB 4: COMPULSION LOOP SIMULATOR PHYSICS ENGINE
// ============================================================
let simInterval = null;
let W = 100; // Willpower
let S = 10;  // Stress
let SH = 0;  // Shame
let activeParadigm = 'works';
let isRunning = false;

// Physics coefficients
let k_leak = 0.8;
let F_shame = 1.5;
let g_grace = 1.5;

// Live canvas chart settings
let canvas = null;
let ctx = null;
let dataPoints = [];
const maxDataPoints = 40;

function initSimulator() {
  canvas = document.getElementById("sim-chart");
  if (canvas) ctx = canvas.getContext("2d");

  // Profile selection
  const profileSelect = document.getElementById("sim-loop-profile");
  profileSelect.addEventListener("change", () => {
    selectLoopProfile(profileSelect.value);
  });

  // Hook up event listeners for inputs
  document.getElementById("param-leak").addEventListener("input", syncSimParameters);
  document.getElementById("param-shame").addEventListener("input", syncSimParameters);
  document.getElementById("param-grace").addEventListener("input", syncSimParameters);

  // Hook up event listeners for simulation controls
  document.getElementById("sim-btn-start").addEventListener("click", startSimulation);
  document.getElementById("sim-btn-pause").addEventListener("click", pauseSimulation);
  document.getElementById("sim-btn-reset").addEventListener("click", resetSimulation);

  // Hook up event listeners for paradigms
  document.getElementById("sim-par-works").addEventListener("click", () => setSimParadigm("works"));
  document.getElementById("sim-par-grace").addEventListener("click", () => setSimParadigm("grace"));

  // Decoupler buttons
  document.getElementById("btn-inject-striving").addEventListener("click", () => {
    if (!isRunning) {
      showToast("Start the engine first to inject striving actions.", "error");
      return;
    }
    const profileKey = profileSelect.value;
    const profile = SIM_LOOPS_DATA[profileKey];
    if (!profile) return;

    // Apply deltas
    W = Math.max(0, Math.min(100, W + profile.strivingDelta.W));
    S = Math.max(0, Math.min(100, S + profile.strivingDelta.S));
    SH = Math.max(0, Math.min(100, SH + profile.strivingDelta.SH));

    logTerminal(`⚡ [Striving Action] ${profile.strivingMsg}`, "text-amber-500");
    updateSimUI();
    drawChart();
  });

  document.getElementById("btn-apply-exit").addEventListener("click", () => {
    if (!isRunning) {
      showToast("Start the engine first to apply a Grace exit.", "error");
      return;
    }
    const profileKey = profileSelect.value;
    const profile = SIM_LOOPS_DATA[profileKey];
    if (!profile) return;

    // Apply deltas
    W = Math.max(0, Math.min(100, W + profile.exitDelta.W));
    S = Math.max(0, Math.min(100, S + profile.exitDelta.S));
    SH = Math.max(0, Math.min(100, SH + profile.exitDelta.SH));

    // Switch active paradigm to Grace
    setSimParadigm("grace");

    logTerminal(`🌱 [Grace Exit] ${profile.exitMsg}`, "text-emerald-500");
    updateSimUI();
    drawChart();
  });

  // Initial load
  selectLoopProfile(profileSelect.value);
}

function selectLoopProfile(profileKey) {
  const profile = SIM_LOOPS_DATA[profileKey];
  if (!profile) return;

  W = profile.initial.W;
  S = profile.initial.S;
  SH = profile.initial.SH;

  document.getElementById("sim-profile-desc").innerHTML = `<strong>Starting metrics:</strong> Willpower: ${W}, Stress: ${S}, Shame: ${SH}.`;

  // Auto-fill sliders
  document.getElementById("param-leak").value = profile.params.leak;
  document.getElementById("param-shame").value = profile.params.shame;
  document.getElementById("param-grace").value = profile.params.grace;

  syncSimParameters();
  updateSimUI();
  
  // Reset logs
  document.getElementById("sim-terminal-logs").innerHTML = `<div class="mono text-stone-500" style="font-size:0.72rem;"><span style="color:var(--ink-faint)">[System]</span> Selected profile: ${profile.title}. Ready to run.</div>`;
  setSimParadigm("works");

  dataPoints = [];
  drawChart();
}

function syncSimParameters() {
  k_leak = parseFloat(document.getElementById("param-leak").value);
  F_shame = parseFloat(document.getElementById("param-shame").value);
  g_grace = parseFloat(document.getElementById("param-grace").value);

  document.getElementById("lbl-leak").innerText = k_leak.toFixed(1);
  document.getElementById("lbl-shame").innerText = F_shame.toFixed(1);
  document.getElementById("lbl-grace").innerText = g_grace.toFixed(1);
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const rect = canvas.parentNode.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.resetTransform();
  ctx.scale(dpr, dpr);
  drawChart();
}
 
window.addEventListener("resize", resizeCanvas);

function logTerminal(msg, color = "text-stone-400") {
  const terminal = document.getElementById("sim-terminal-logs");
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const logLine = document.createElement("div");
  logLine.className = `mono ${color}`;
  logLine.style.fontSize = "0.72rem";
  logLine.innerHTML = `<span style="color: var(--ink-faint)">[${time}]</span> ${msg}`;
  terminal.appendChild(logLine);
  terminal.scrollTop = terminal.scrollHeight;
}

function setSimParadigm(paradigm) {
  activeParadigm = paradigm;
  const btnWorks = document.getElementById("sim-par-works");
  const btnGrace = document.getElementById("sim-par-grace");
  const tglWrap = document.getElementById("sim-tgl-wrap");
  const desc = document.getElementById("sim-paradigm-desc");

  if (paradigm === "works") {
    btnWorks.classList.add("active");
    btnGrace.classList.remove("active");
    tglWrap.classList.remove("grace");
    desc.innerHTML = "<strong>Works Paradigm:</strong> Worth must be generated. Willpower drains dry under performance anxiety and shame.";
    logTerminal("⚠️ Loaded Works mode. Striving drain active.", "text-amber-500");
  } else {
    btnGrace.classList.add("active");
    btnWorks.classList.remove("active");
    tglWrap.classList.add("grace");
    desc.innerHTML = "<strong>Grace Paradigm:</strong> Worth is unconditional. Recovery begins as the self stops out-muscling the self.";
    logTerminal("🛡️ Loaded Grace mode. Recovery curves initialized.", "text-emerald-500");
  }
  updateSimUI();
}

function startSimulation() {
  if (isRunning) return;
  isRunning = true;
  document.getElementById("sim-btn-start").disabled = true;
  document.getElementById("sim-btn-pause").disabled = false;
  
  logTerminal("🚀 Simulator engine running.", "text-stone-200");

  simInterval = setInterval(() => {
    if (activeParadigm === "works") {
      // Striving depletion math
      let loss = 0.45 + (S * 0.05 * k_leak);
      W = Math.max(0, W - loss);
      S = Math.min(100, S + 0.25 * k_leak);

      // Willpower depletion triggers shame feedback
      if (W < 30) {
        SH = Math.min(100, SH + 1.2 * F_shame);
        S = Math.min(100, S + 0.9 * F_shame); // Shame raises stress
        if (Math.random() < 0.15) {
          logTerminal("💥 Willpower critical! Self-condemnation voice active.", "text-fuchsia-400");
        }
      }
    } else {
      // Grace recovery curves
      W = Math.min(100, W + 1.5 * g_grace);
      S = Math.max(0, S - 1.6 * g_grace);
      SH = Math.max(0, SH - 2.2 * g_grace);
    }

    dataPoints.push({ w: W, s: S, sh: SH });
    if (dataPoints.length > maxDataPoints) {
      dataPoints.shift();
    }

    drawChart();
    updateSimUI();
  }, 500);
}

function pauseSimulation() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(simInterval);
  document.getElementById("sim-btn-start").disabled = false;
  document.getElementById("sim-btn-pause").disabled = true;
  logTerminal("⏸️ Simulator engine paused.", "text-stone-500");
}

function resetSimulation() {
  pauseSimulation();
  const profileKey = document.getElementById("sim-loop-profile").value;
  selectLoopProfile(profileKey);
}

function updateSimUI() {
  document.getElementById("sim-val-willpower").innerText = Math.round(W);
  document.getElementById("sim-val-stress").innerText = Math.round(S);
  document.getElementById("sim-val-shame").innerText = Math.round(SH);

  document.getElementById("sim-bar-willpower").style.width = `${W}%`;
  document.getElementById("sim-bar-stress").style.width = `${S}%`;
  document.getElementById("sim-bar-shame").style.width = `${SH}%`;
}

function drawChart() {
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  ctx.clearRect(0, 0, w, h);

  if (dataPoints.length === 0) return;

  const dx = w / (maxDataPoints - 1);
  const dy = h / 100;

  // Grid lines
  const theme = document.documentElement.getAttribute("data-theme");
  ctx.strokeStyle = theme === "dark" ? "rgba(242, 235, 220, 0.04)" : "rgba(33, 25, 19, 0.04)";
  ctx.lineWidth = 1;
  for (let i = 25; i <= 75; i += 25) {
    ctx.beginPath();
    ctx.moveTo(0, h - i * dy);
    ctx.lineTo(w, h - i * dy);
    ctx.stroke();
  }

  // Plot curves
  function drawLine(key, color, dashed = false) {
    ctx.beginPath();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = color;
    if (dashed) ctx.setLineDash([4, 4]);
    else ctx.setLineDash([]);

    dataPoints.forEach((pt, idx) => {
      const val = pt[key];
      const x = idx * dx;
      const y = h - val * dy;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
  }

  drawLine("w", activeParadigm === "works" ? "#F3651C" : "#10B981");
  drawLine("s", "#EF4444", true);
  drawLine("sh", "#D946EF");
}

// ============================================================
// TAB 5: SPIRITUAL ARCHETYPES LOGIC
// ============================================================
function initArchetypes() {
  const container = document.getElementById("archetypes-grid");
  if (!container) return;

  container.innerHTML = "";
  Object.keys(ARCHETYPES_DATA).forEach(key => {
    const data = ARCHETYPES_DATA[key];
    const card = document.createElement("div");
    card.className = "archetype-card-full";
    card.id = `archetype-${key}`;
    card.innerHTML = `
      <div class="ap-full-header">
        <h3>${data.name}</h3>
      </div>
      <div class="ap-full-body">
        <div class="ap-full-block calling">
          <span class="ap-full-lbl">Spiritual Calling</span>
          <p class="ap-full-val">${data.calling}</p>
        </div>
        <div class="ap-full-block inverse">
          <span class="ap-full-lbl">Inverse Frequency</span>
          <p class="ap-full-val">${data.inverse}</p>
        </div>
        <div class="ap-full-block failure">
          <span class="ap-full-lbl">Point of Attack / Failure</span>
          <p class="ap-full-val">${data.failure}</p>
        </div>
        <div class="ap-full-block legacy">
          <span class="ap-full-lbl">Generational Script (Legacy)</span>
          <p class="ap-full-val">${data.legacy}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ============================================================
// TAB 6: PERSONAL ARCHITECT WORKBOOK
// ============================================================
const ARCHITECT_PRESETS = {
  peter: {
    cistern: "Placing ultimate status in personal devotion and moral bravery ('though all fall away, I won't').",
    counterfeit: "Proving courage under pressure to strangers to safeguard my heroic reputation.",
    habit: "Cue: Arrest/exposure threat ➔ Action: Denial of Christ with oaths ➔ Reward: Immediate relief from somatic threat.",
    shame: "'You failed the Savior. You are a coward and a complete fraud.'",
    grace: "Declaration: My secure acceptance is established by the King's death, not my court record. Relational recovery replaces straining resolve."
  },
  solomon: {
    cistern: "Seeking worth and defense against mortality through massive construction, pleasure assets, and wealth collection.",
    counterfeit: "More projects, gardens, palaces, gold indexes to patch existential deficit.",
    habit: "Cue: Existential dread / boredom ➔ Action: Building a massive new palace or garden ➔ Reward: Temporary control-high.",
    shame: "'Behold, all is vanity and striving after wind. I am still completely empty.'",
    grace: "Declaration: Satisfaction is a received gift from God. My value is not a total sum of palaces. I am free to sit in peace."
  },
  martha: {
    cistern: "Seeking relational validation by offering flawless performance and service.",
    counterfeit: "Over-managing domestic detail, cooking, cleanups to prove I am indispensable.",
    habit: "Cue: Relational obscurity / feeling ignored ➔ Action: Taking on chores, snapping at family ➔ Reward: Discharging tension.",
    shame: "'You are troubled about too many things. You have failed to sit at the feet of the Lord.'",
    grace: "Declaration: Only one thing is necessary. Worth is given prior to dinner being served. Limits are loved features."
  }
};

const RISK_WORDS = ["must", "always", "never", "fail", "lazy", "perfect", "worthless", "need to", "try harder", "discipline"];

function initArchitect() {
  const fields = ["cistern", "counterfeit", "habit", "shame", "grace"];
  
  // Attach listeners for linguistic checks
  fields.forEach(f => {
    const el = document.getElementById(`arch-in-${f}`);
    if (el) {
      el.addEventListener("input", () => {
        checkFieldLinguisticRisk(f);
        updateBlueprint();
      });
    }
  });

  // Attach button triggers
  document.getElementById("arch-preset-peter").addEventListener("click", () => loadArchitectPreset("peter"));
  document.getElementById("arch-preset-solomon").addEventListener("click", () => loadArchitectPreset("solomon"));
  document.getElementById("arch-preset-martha").addEventListener("click", () => loadArchitectPreset("martha"));
  
  document.getElementById("arch-btn-copy").addEventListener("click", copyBlueprintToClipboard);
  document.getElementById("arch-btn-reset").addEventListener("click", resetArchitect);
  
  updateBlueprint();
}

function checkFieldLinguisticRisk(field) {
  const val = document.getElementById(`arch-in-${field}`).value.toLowerCase();
  const warning = document.getElementById(`risk-warn-${field}`);
  
  let found = [];
  RISK_WORDS.forEach(word => {
    if (val.includes(word)) found.push(`"${word}"`);
  });

  if (found.length > 0) {
    warning.classList.remove("hidden");
    if (field === "grace") {
      warning.innerText = "Striving indicators in grace anchor";
      warning.className = "workbook-risk-badge grace-alert";
    } else {
      warning.innerText = `Striving indicators: ${found.join(", ")}`;
      warning.className = "workbook-risk-badge striving";
    }
  } else {
    warning.classList.add("hidden");
  }
}

function loadArchitectPreset(key) {
  const data = ARCHITECT_PRESETS[key];
  const fields = ["cistern", "counterfeit", "habit", "shame", "grace"];

  fields.forEach(f => {
    document.getElementById(`arch-in-${f}`).value = data[f];
    checkFieldLinguisticRisk(f);
  });

  updateBlueprint();
  showToast(`Loaded preset for ${key.toUpperCase()}`, "success");
}

function updateBlueprint() {
  const fields = ["cistern", "counterfeit", "habit", "shame", "grace"];
  fields.forEach(f => {
    const val = document.getElementById(`arch-in-${f}`).value.trim();
    const display = document.getElementById(`bp-txt-${f}`);
    
    if (display) {
      if (val) {
        display.innerText = val;
      } else {
        display.innerText = `Define your ${f}...`;
      }
    }
  });
}

function resetArchitect() {
  const fields = ["cistern", "counterfeit", "habit", "shame", "grace"];
  fields.forEach(f => {
    document.getElementById(`arch-in-${f}`).value = "";
    document.getElementById(`risk-warn-${f}`).classList.add("hidden");
  });
  updateBlueprint();
  showToast("Workbook cleared", "info");
}

function copyBlueprintToClipboard() {
  const cis = document.getElementById("bp-txt-cistern").innerText;
  const cnt = document.getElementById("bp-txt-counterfeit").innerText;
  const hab = document.getElementById("bp-txt-habit").innerText;
  const shm = document.getElementById("bp-txt-shame").innerText;
  const grc = document.getElementById("bp-txt-grace").innerText;

  const blueprintText = `📋 MY DE-ESCALATION COORDINATES\n\n` +
                        `1. MY BROKEN CISTERN:\n   ${cis}\n\n` +
                        `2. MY COUNTERFEIT NEED:\n   ${cnt}\n\n` +
                        `3. MY Compulsion LOOP SEQUENCE:\n   ${hab}\n\n` +
                        `4. MY SELF-CONDEMNATION VOICE:\n   ${shm}\n\n` +
                        `5. MY GRACE ANCHOR:\n   ${grc}\n\n` +
                        `Constructed with The Loop Breaker.`;

  navigator.clipboard.writeText(blueprintText)
    .then(() => showToast("Blueprint copied to clipboard!", "success"))
    .catch(() => showToast("Failed to copy clipboard", "error"));
}

// ============================================================
// TAB 7: BILINGUAL SCRIPTURAL GLOSSARY LOGIC
// ============================================================
let activeGlossaryTag = "all";

function initGlossary() {
  const searchInput = document.getElementById("glossary-search");
  const tagButtons = document.querySelectorAll(".glossary-tag-btn");

  searchInput.addEventListener("input", renderGlossary);
  
  tagButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tagButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeGlossaryTag = btn.dataset.tag;
      renderGlossary();
    });
  });

  renderGlossary();
}

function renderGlossary() {
  const container = document.getElementById("glossary-grid");
  const query = document.getElementById("glossary-search").value.toLowerCase().trim();
  
  container.innerHTML = "";

  GLOSSARY_DATA.forEach(item => {
    // Filter by tag
    if (activeGlossaryTag !== "all" && !item.tags.includes(activeGlossaryTag)) return;

    // Filter by search query (match term, synonyms, definition, theology, psychology, verses, topics)
    const matchesQuery = 
      item.term.toLowerCase().includes(query) ||
      item.synonyms.some(s => s.toLowerCase().includes(query)) ||
      item.definition.toLowerCase().includes(query) ||
      item.theology.toLowerCase().includes(query) ||
      item.psychology.toLowerCase().includes(query) ||
      (item.verses && item.verses.some(v => v.toLowerCase().includes(query))) ||
      (item.topics && item.topics.some(t => t.toLowerCase().includes(query)));

    if (query && !matchesQuery) return;

    const card = document.createElement("div");
    card.className = "glossary-card";

    // Setup visual components
    let versesHTML = "";
    if (item.verses && item.verses.length > 0) {
      versesHTML = `<div class="glossary-synonyms" style="margin-top: 0.5rem; background: var(--grace-soft); border-left: 2px solid var(--grace); padding: 4px 8px; border-radius: 4px; font-size: 0.82rem; color: var(--ink-dim);"><strong>Verses:</strong> ${item.verses.join(", ")}</div>`;
    }

    let topicsHTML = "";
    if (item.topics && item.topics.length > 0) {
      topicsHTML = `<div style="font-size: 0.8rem; color: var(--ink-faint); margin-top: 0.3rem;"><strong>Topics:</strong> ${item.topics.join(" · ")}</div>`;
    }

    card.innerHTML = `
      <div class="glossary-card-header">
        <div class="glossary-term-group">
          <h3>${item.term}</h3>
        </div>
      </div>
      <div class="glossary-synonyms"><strong>Synonyms:</strong> ${item.synonyms.join(", ")}</div>
      ${versesHTML}
      <div class="glossary-body-section">
        <div class="glossary-section-block">
          <span class="glossary-section-lbl">Definition</span>
          <span class="glossary-section-val">${item.definition}</span>
        </div>
        <div class="glossary-section-block">
          <span class="glossary-section-lbl">Theological Context</span>
          <span class="glossary-section-val">${item.theology}</span>
        </div>
        <div class="glossary-section-block">
          <span class="glossary-section-lbl">Psychological Mapping</span>
          <span class="glossary-section-val psych">${item.psychology}</span>
        </div>
      </div>
      ${topicsHTML}
      <div style="display:flex; gap:0.3rem; margin-top:auto; padding-top:1rem; border-top:1px dashed var(--border);">
        ${item.tags.map(t => `<span class="glossary-tag-btn active" style="padding: 2px 8px; font-size: 0.72rem; cursor:default; border-color: var(--accent); color: var(--accent);">${t}</span>`).join("")}
      </div>
    `;

    container.appendChild(card);
  });

  if (container.children.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--ink-faint); font-family: var(--mono); font-size: 0.88rem;">
        ✕ No matches found for "${query}"
      </div>
    `;
  }
}
