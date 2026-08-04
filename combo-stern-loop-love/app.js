// ============================================================
// APP ENTRY POINT & STATE MANAGEMENT
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initGlobalNavigation();
  initStages();
  initAxisMap();
  initLeakFinder();
  initLoopVisualizer();
  initArchetypes();
  initDopamineSimulator();
  initCathexisDiagnostic();
  initCounterfeitsMatrix();
  initQuickPlanner();
  initFeelingsDirectory();
  initWorkbook();
  initGlossary();
});

// Toast notification helper
function showToast(message, type = "info") {
  const wrap = document.getElementById("toast-wrap");
  if (!wrap) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = "ℹ️";
  if (type === "success") icon = "✅";
  if (type === "error") icon = "⚠️";
  
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span>${message}</span>`;
  wrap.appendChild(toast);
  
  setTimeout(() => toast.classList.add("show"), 50);
  
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ============================================================
// GLOBAL THEME SWITCHER
// ============================================================
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
  
  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme === "dark" ? "Dark Slate-Emerald" : "Light Paper Cream"} Mode`, "success");
    
    // Redraw simulator chart if active
    if (document.getElementById("tab-mechanics").classList.contains("active")) {
      drawSimulatorChart();
    }
  });
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  
  const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
  const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
  
  toggleBtn.innerHTML = theme === "dark" ? sunIcon : moonIcon;
}

// ============================================================
// GLOBAL MULTI-LEVEL NAVIGATION & SCROLLSPY
// ============================================================
function initGlobalNavigation() {
  const bottomButtons = document.querySelectorAll(".bottom-nav-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const subNavBtns = document.querySelectorAll(".sub-nav-btn");
  
  // Floating bottom navigation triggers
  bottomButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;
      
      // Update bottom nav active classes
      document.querySelectorAll(".bottom-nav-item").forEach(item => item.classList.remove("active"));
      btn.parentElement.classList.add("active");
      
      // Switch active tab panel
      tabPanels.forEach(panel => {
        panel.classList.remove("active");
        if (panel.id === `tab-${targetTab}`) {
          panel.classList.add("active");
        }
      });
      
      // Canvas sizing in simulator
      if (targetTab === "mechanics") {
        setTimeout(resizeSimulatorCanvas, 50);
      }
      
      window.scrollTo({ top: 0, behavior: "instant" });
      showToast(`Navigated to: ${btn.querySelector(".bottom-nav-lbl").innerText}`, "info");
    });
  });
  
  // Subsection sub-nav anchor triggers
  subNavBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Adjust for header + subnav height (68px + 48px = 116px approx)
        const offset = 120;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    });
  });
  
  // ScrollSpy listener
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + 140; // anchor threshold
    const activePanel = document.querySelector(".tab-panel.active");
    if (!activePanel) return;
    
    const sections = activePanel.querySelectorAll("section[id]");
    let currentSectionId = "";
    
    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
        currentSectionId = sec.getAttribute("id");
      }
    });
    
    if (currentSectionId) {
      activePanel.querySelectorAll(".sub-nav-btn").forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.target === currentSectionId) {
          btn.classList.add("active");
        }
      });
    }
  });
}

// ============================================================
// TAB 1: THIRST - 7 STAGES ACCORDION
// ============================================================
let currentStageIndex = 0;

function initStages() {
  const slides = document.querySelectorAll(".stage-slide");
  const prevBtn = document.getElementById("stage-btn-prev");
  const nextBtn = document.getElementById("stage-btn-next");
  const progressFill = document.getElementById("stage-progress-fill");
  
  if (slides.length === 0) return;
  
  function showStageSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === index) {
        slide.classList.add("active");
      }
    });
    
    // Update buttons
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) {
      if (index === slides.length - 1) {
        nextBtn.innerText = "Restart Tour";
      } else {
        nextBtn.innerText = "Next Stage";
      }
    }
    
    // Update progress bar
    if (progressFill) {
      const percent = ((index + 1) / slides.length) * 100;
      progressFill.style.width = `${percent}%`;
    }
  }
  
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentStageIndex > 0) {
        currentStageIndex--;
        showStageSlide(currentStageIndex);
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentStageIndex < slides.length - 1) {
        currentStageIndex++;
      } else {
        currentStageIndex = 0;
      }
      showStageSlide(currentStageIndex);
    });
  }
  
  // Initialize
  showStageSlide(currentStageIndex);
}

// ============================================================
// TAB 1: THIRST - EXISTENTIAL AXIS MAP
// ============================================================
function initAxisMap() {
  const points = document.querySelectorAll(".axis-point");
  if (points.length === 0) return;
  
  points.forEach(pt => {
    pt.addEventListener("click", () => {
      points.forEach(p => p.classList.remove("active"));
      pt.classList.add("active");
      
      const axisKey = pt.dataset.axis;
      const data = AXES_DATA[axisKey];
      if (data) {
        document.getElementById("axis-detail-title").innerText = data.title;
        document.getElementById("axis-detail-hunger").innerText = data.hunger;
        document.getElementById("axis-detail-cue").innerText = data.cue;
        document.getElementById("axis-detail-counterfeit").innerText = data.counterfeit;
        document.getElementById("axis-detail-leak").innerText = data.leak;
        document.getElementById("axis-detail-shame").innerText = data.shame;
        document.getElementById("axis-detail-exit").innerText = data.exit;
        
        showToast(`Selected Axis: ${data.title}`, "info");
      }
    });
  });
  
  // Trigger click on first point to initialize details
  if (points[0]) points[0].dispatchEvent(new Event("click"));
}

// ============================================================
// TAB 2: LEAKS - BROKEN CISTERN DIAGNOSTIC (LEAK FINDER WIZARD)
// ============================================================
const DIAG_STATE = {
  surface: [],
  cue: null,
  promise: null
};

let currentDiagStep = 0;

function initLeakFinder() {
  const choices = document.querySelectorAll(".diagnostic-form .choice-btn");
  const prevBtn = document.getElementById("diag-btn-prev");
  const nextBtn = document.getElementById("diag-btn-next");
  const slides = document.querySelectorAll(".diagnostic-form .diag-slide");
  const dots = document.querySelectorAll(".diagnostic-form .diag-dot");
  const resetBtn = document.getElementById("diag-reset");
  
  if (choices.length === 0) return;
  
  function showDiagStep(step) {
    currentDiagStep = step;
    
    // Toggle active slide
    slides.forEach((slide, idx) => {
      slide.classList.remove("active");
      if (idx === step) {
        slide.classList.add("active");
      }
    });
    
    // Toggle dots
    dots.forEach((dot, idx) => {
      dot.classList.remove("active");
      if (idx === step) {
        dot.classList.add("active");
      }
    });
    
    // Update navigation buttons
    if (prevBtn) prevBtn.disabled = step === 0;
    
    updateNextButtonState();
  }
  
  function updateNextButtonState() {
    if (!nextBtn) return;
    
    let isStepValid = false;
    if (currentDiagStep === 0) {
      isStepValid = DIAG_STATE.surface.length > 0;
    } else if (currentDiagStep === 1) {
      isStepValid = DIAG_STATE.cue !== null;
    } else if (currentDiagStep === 2) {
      isStepValid = DIAG_STATE.promise !== null;
    }
    
    nextBtn.disabled = !isStepValid;
    
    if (currentDiagStep === 2) {
      nextBtn.innerText = "Submit";
    } else {
      nextBtn.innerText = "Next";
    }
  }
  
  choices.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      const choiceId = btn.dataset.choice;
      
      if (type === "surface") {
        const idx = DIAG_STATE.surface.indexOf(choiceId);
        if (idx > -1) {
          DIAG_STATE.surface.splice(idx, 1);
          btn.classList.remove("selected");
          btn.removeAttribute("aria-pressed");
        } else {
          if (DIAG_STATE.surface.length >= 3) {
            showToast("Please select at most 3 surface behaviors.", "error");
            return;
          }
          DIAG_STATE.surface.push(choiceId);
          btn.classList.add("selected");
          btn.setAttribute("aria-pressed", "true");
        }
        updateNextButtonState();
      } else {
        // Single select
        document.querySelectorAll(`.diagnostic-form .choice-btn[data-type="${type}"]`).forEach(b => {
          b.classList.remove("selected");
          b.removeAttribute("aria-pressed");
        });
        
        DIAG_STATE[type] = choiceId;
        btn.classList.add("selected");
        btn.setAttribute("aria-pressed", "true");
        updateNextButtonState();
        
        // Auto-advance to next slide after selection with a 400ms delay
        setTimeout(() => {
          if (currentDiagStep < 2) {
            showDiagStep(currentDiagStep + 1);
          }
        }, 400);
      }
    });
  });
  
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentDiagStep > 0) {
        showDiagStep(currentDiagStep - 1);
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentDiagStep < 2) {
        showDiagStep(currentDiagStep + 1);
      } else {
        calculateDiagnosticResults();
      }
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener("click", resetDiagnosticForm);
  }
  
  // Set initial
  showDiagStep(0);
}

function calculateDiagnosticResults() {
  // Calculation weighting variables
  const scores = { acceptance: 0, control: 0, significance: 0, comfort: 0, righteousness: 0 };
  
  // 1. Process surface behaviors
  DIAG_STATE.surface.forEach(choiceId => {
    const choiceObj = DIAG_GROUPS.surface.choices.find(c => c.id === choiceId);
    if (choiceObj && choiceObj.w) {
      Object.keys(choiceObj.w).forEach(k => {
        scores[k] += choiceObj.w[k];
      });
    }
  });
  
  // 2. Process cue
  const cueObj = DIAG_GROUPS.cue.choices.find(c => c.id === DIAG_STATE.cue);
  if (cueObj && cueObj.w) {
    Object.keys(cueObj.w).forEach(k => {
      scores[k] += cueObj.w[k] * 1.5; // weight multiplier
    });
  }
  
  // 3. Process promise
  const promiseObj = DIAG_GROUPS.promise.choices.find(c => c.id === DIAG_STATE.promise);
  if (promiseObj && promiseObj.w) {
    Object.keys(promiseObj.w).forEach(k => {
      scores[k] += promiseObj.w[k] * 1.5;
    });
  }
  
  // Find highest scoring leak
  let primaryLeak = "acceptance";
  let maxScore = 0;
  Object.keys(scores).forEach(k => {
    if (scores[k] > maxScore) {
      maxScore = scores[k];
      primaryLeak = k;
    }
  });
  
  // Render results panel
  document.getElementById("diag-result-empty").style.display = "none";
  const content = document.getElementById("diag-result-content");
  content.style.display = "flex";
  
  const leakData = ROOTS[primaryLeak];
  document.getElementById("diag-res-icon").innerText = leakData.i;
  document.getElementById("diag-res-title").innerText = leakData.t;
  document.getElementById("diag-res-subtitle").innerText = leakData.sub;
  document.getElementById("diag-res-thirst").innerText = leakData.thirst;
  document.getElementById("diag-res-counterfeit").innerText = leakData.counterfeit;
  document.getElementById("diag-res-loop").innerText = leakData.loop;
  
  // Auto fill plan exit card
  document.getElementById("diag-res-receive").innerText = leakData.receive;
  document.getElementById("diag-res-ifthen").innerText = leakData.ifThen;
  
  // Update score bars
  const totalWeight = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
  Object.keys(scores).forEach(k => {
    const percentage = Math.round((scores[k] / totalWeight) * 100);
    const fillEl = document.getElementById(`score-fill-${k}`);
    const numEl = document.getElementById(`score-val-${k}`);
    if (fillEl && numEl) {
      fillEl.style.width = `${percentage}%`;
      numEl.innerText = `${percentage}%`;
    }
  });
  
  // Enable workbook link button
  const sendBtn = document.getElementById("diag-btn-send-workbook");
  sendBtn.onclick = () => {
    prefillWorkbookFromDiagnostic(primaryLeak);
  };
  
  showToast("Diagnostic completed!", "success");
  content.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function resetDiagnosticForm() {
  DIAG_STATE.surface = [];
  DIAG_STATE.cue = null;
  DIAG_STATE.promise = null;
  
  document.querySelectorAll(".diagnostic-form .choice-btn").forEach(btn => {
    btn.classList.remove("selected");
    btn.removeAttribute("aria-pressed");
  });
  
  document.getElementById("diag-result-content").style.display = "none";
  document.getElementById("diag-result-empty").style.display = "block";
  
  // Reset wizard steps
  const slides = document.querySelectorAll(".diagnostic-form .diag-slide");
  const dots = document.querySelectorAll(".diagnostic-form .diag-dot");
  
  currentDiagStep = 0;
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    if (idx === 0) slide.classList.add("active");
  });
  dots.forEach((dot, idx) => {
    dot.classList.remove("active");
    if (idx === 0) dot.classList.add("active");
  });
  
  const prevBtn = document.getElementById("diag-btn-prev");
  const nextBtn = document.getElementById("diag-btn-next");
  if (prevBtn) prevBtn.disabled = true;
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.innerText = "Next";
  }
  
  showToast("Diagnostic reset", "info");
}

function prefillWorkbookFromDiagnostic(leakKey) {
  const leak = ROOTS[leakKey];
  if (!leak) return;
  
  // Populate workbook form fields
  document.getElementById("arch-in-cistern").value = leak.t;
  document.getElementById("arch-in-counterfeit").value = leak.counterfeit;
  document.getElementById("arch-in-habit").value = leak.loop;
  document.getElementById("arch-in-shame").value = `Shame rules if the leak runs dry: ${leak.sub}`;
  document.getElementById("arch-in-grace").value = `${leak.receive} (Move: ${leak.ifThen})`;
  
  // Trigger tab switch to Healing section
  document.querySelector('.bottom-nav-btn[data-tab="healing"]').dispatchEvent(new Event("click"));
  
  // Scroll to Personal Architect section
  setTimeout(() => {
    const targetElement = document.getElementById("sec-workbook");
    if (targetElement) {
      const offset = 120;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  }, 100);
  
  // Regenerate blueprint text
  updateWorkbookBlueprint();
  showToast(`Workbook pre-filled with ${leak.t} plan!`, "success");
}

// ============================================================
// TAB 2: LEAKS - INTERACTIVE STRIVING VS GRACE LOOP SVG
// ============================================================
function initLoopVisualizer() {
  const worksBtn = document.getElementById("loop-btn-works");
  const graceBtn = document.getElementById("loop-btn-grace");
  const noteEl = document.getElementById("loop-note-text");
  
  if (!worksBtn) return;
  
  worksBtn.addEventListener("click", () => {
    worksBtn.classList.add("active");
    graceBtn.classList.remove("active");
    
    // Modify SVG styles
    document.getElementById("ring").setAttribute("stroke", "var(--rust)");
    document.getElementById("ringAura").setAttribute("stroke", "var(--rust)");
    document.getElementById("ringAura").setAttribute("opacity", "0.2");
    
    const flowPath = document.getElementById("graceTrace");
    flowPath.style.opacity = "1";
    flowPath.setAttribute("stroke", "var(--rust)");
    flowPath.classList.add("gflow");
    
    noteEl.innerHTML = `<strong>The Closed Striving Loop:</strong> Under anxiety, your willpower draws from its own bucket. You perform a counterfeit routine to get quick relief. The relief leaks away, leaving shame and stress higher, forcing you to run the treadmill again.`;
    showToast("Switched loop to Striving Mode", "info");
  });
  
  graceBtn.addEventListener("click", () => {
    graceBtn.classList.add("active");
    worksBtn.classList.remove("active");
    
    // Modify SVG styles
    document.getElementById("ring").setAttribute("stroke", "var(--gold)");
    document.getElementById("ringAura").setAttribute("stroke", "var(--jade)");
    document.getElementById("ringAura").setAttribute("opacity", "0.4");
    
    const flowPath = document.getElementById("graceTrace");
    flowPath.style.opacity = "1";
    flowPath.setAttribute("stroke", "var(--jade)");
    flowPath.classList.add("gflow");
    
    noteEl.innerHTML = `<strong>The Received Grace Loop:</strong> Worth is pre-established. The stress alarm sounds, but instead of white-knuckling a performance score, you receive your status as a gift. The counterfeit looks empty; you choose a proper means, breaking the compulsion cycle.`;
    showToast("Switched loop to Received Grace Mode", "success");
  });
  
  // Set default
  worksBtn.dispatchEvent(new Event("click"));
}

// ============================================================
// TAB 2: LEAKS - ANCESTRAL ARCHETYPES
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
        <h3 style="font-family:var(--font-serif); font-size:var(--step-1); font-weight:600;">${data.name}</h3>
      </div>
      <div class="ap-full-body" style="display:flex; flex-direction:column; gap:12px; margin-top:12px;">
        <div class="ap-full-block calling" style="border-left:3px solid var(--gold); background:var(--bg); padding:12px; border-radius:var(--radius-sm); font-size:var(--step--1);">
          <span class="ap-full-lbl" style="color:var(--gold); font-family:var(--font-mono); font-size:var(--step--2); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:4px;">Spiritual Calling</span>
          <p class="ap-full-val" style="color:var(--text);">${data.calling}</p>
        </div>
        <div class="ap-full-block inverse" style="border-left:3px solid var(--gold-soft); background:var(--bg); padding:12px; border-radius:var(--radius-sm); font-size:var(--step--1);">
          <span class="ap-full-lbl" style="color:var(--gold-soft); font-family:var(--font-mono); font-size:var(--step--2); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:4px;">Inverse Frequency</span>
          <p class="ap-full-val" style="color:var(--text-muted);">${data.inverse}</p>
        </div>
        <div class="ap-full-block failure" style="border-left:3px solid var(--rust); background:var(--bg); padding:12px; border-radius:var(--radius-sm); font-size:var(--step--1);">
          <span class="ap-full-lbl" style="color:var(--rust-soft); font-family:var(--font-mono); font-size:var(--step--2); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:4px;">Point of Attack / Failure</span>
          <p class="ap-full-val" style="color:var(--text-muted);">${data.failure}</p>
        </div>
        <div class="ap-full-block legacy" style="border-left:3px solid var(--purple); background:var(--bg); padding:12px; border-radius:var(--radius-sm); font-size:var(--step--1);">
          <span class="ap-full-lbl" style="color:var(--purple-soft); font-family:var(--font-mono); font-size:var(--step--2); text-transform:uppercase; letter-spacing:0.05em; display:block; margin-bottom:4px;">Generational Script (Legacy)</span>
          <p class="ap-full-val" style="color:var(--text-muted);">${data.legacy}</p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ============================================================
// TAB 3: MECHANICS - DOPAMINE & ANXIETY SIMULATOR
// ============================================================
let simCanvas, simCtx;
let simInterval = null;
let simRunning = false;
let simParadigm = "works"; // works or grace
let simWillpower = 85;
let simStress = 30;
let simShame = 10;
let simDataPoints = [];
const simMaxDataPoints = 30;

let k_leak = 1.0;
let F_shame = 1.0;
let g_grace = 1.0;

function initDopamineSimulator() {
  simCanvas = document.getElementById("sim-chart");
  if (!simCanvas) return;
  simCtx = simCanvas.getContext("2d");
  
  const profileSelect = document.getElementById("sim-loop-profile");
  profileSelect.addEventListener("change", () => {
    loadSimulatorProfile(profileSelect.value);
  });
  
  // Sliders input sync
  document.getElementById("param-leak").addEventListener("input", syncSimParameters);
  document.getElementById("param-shame").addEventListener("input", syncSimParameters);
  document.getElementById("param-grace").addEventListener("input", syncSimParameters);
  
  // Controls
  document.getElementById("sim-btn-start").addEventListener("click", startSimulator);
  document.getElementById("sim-btn-pause").addEventListener("click", pauseSimulator);
  document.getElementById("sim-btn-reset").addEventListener("click", resetSimulator);
  
  document.getElementById("sim-par-works").addEventListener("click", () => setSimulatorParadigm("works"));
  document.getElementById("sim-par-grace").addEventListener("click", () => setSimulatorParadigm("grace"));
  
  // Striving Actions
  document.getElementById("btn-inject-striving").addEventListener("click", () => {
    if (!simRunning) {
      showToast("Start the simulator engine first to inject striving.", "error");
      return;
    }
    const profile = SIM_LOOPS_DATA[profileSelect.value];
    if (!profile) return;
    
    simWillpower = Math.max(0, Math.min(100, simWillpower + profile.strivingDelta.W));
    simStress = Math.max(0, Math.min(100, simStress + profile.strivingDelta.S));
    simShame = Math.max(0, Math.min(100, simShame + profile.strivingDelta.SH));
    
    logSimulatorTerminal(`⚡ [Striving Action] ${profile.strivingMsg}`, "color: var(--rust-soft)");
    updateSimulatorUI();
    drawSimulatorChart();
  });
  
  document.getElementById("btn-apply-exit").addEventListener("click", () => {
    if (!simRunning) {
      showToast("Start the simulator engine first to apply a Grace exit.", "error");
      return;
    }
    const profile = SIM_LOOPS_DATA[profileSelect.value];
    if (!profile) return;
    
    simWillpower = Math.max(0, Math.min(100, simWillpower + profile.exitDelta.W));
    simStress = Math.max(0, Math.min(100, simStress + profile.exitDelta.S));
    simShame = Math.max(0, Math.min(100, simShame + profile.exitDelta.SH));
    
    setSimulatorParadigm("grace");
    logSimulatorTerminal(`🌱 [Grace Exit] ${profile.exitMsg}`, "color: var(--jade-soft); font-weight: bold;");
    updateSimulatorUI();
    drawSimulatorChart();
  });
  
  window.addEventListener("resize", resizeSimulatorCanvas);
  
  // Load initial profile
  loadSimulatorProfile(profileSelect.value);
}

function loadSimulatorProfile(profileKey) {
  const profile = SIM_LOOPS_DATA[profileKey];
  if (!profile) return;
  
  simWillpower = profile.initial.W;
  simStress = profile.initial.S;
  simShame = profile.initial.SH;
  
  document.getElementById("sim-profile-desc").innerHTML = `<strong>Metrics:</strong> Willpower: ${simWillpower}, Stress: ${simStress}, Shame: ${simShame}.`;
  
  // sliders
  document.getElementById("param-leak").value = profile.params.leak;
  document.getElementById("param-shame").value = profile.params.shame;
  document.getElementById("param-grace").value = profile.params.grace;
  
  syncSimParameters();
  updateSimulatorUI();
  
  const term = document.getElementById("sim-terminal-logs");
  term.innerHTML = `<div class="mono" style="font-size:0.75rem; color: var(--text-faint)">[System] Selected profile: ${profile.title}. Ready.</div>`;
  setSimulatorParadigm("works");
  
  simDataPoints = [];
  resizeSimulatorCanvas();
}

function syncSimParameters() {
  k_leak = parseFloat(document.getElementById("param-leak").value);
  F_shame = parseFloat(document.getElementById("param-shame").value);
  g_grace = parseFloat(document.getElementById("param-grace").value);
  
  document.getElementById("lbl-leak").innerText = k_leak.toFixed(1);
  document.getElementById("lbl-shame").innerText = F_shame.toFixed(1);
  document.getElementById("lbl-grace").innerText = g_grace.toFixed(1);
}

function resizeSimulatorCanvas() {
  if (!simCanvas) return;
  const rect = simCanvas.parentNode.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  simCanvas.width = rect.width * dpr;
  simCanvas.height = rect.height * dpr;
  simCtx.resetTransform();
  simCtx.scale(dpr, dpr);
  drawSimulatorChart();
}

function logSimulatorTerminal(msg, style = "") {
  const term = document.getElementById("sim-terminal-logs");
  const log = document.createElement("div");
  log.className = "mono";
  log.style.fontSize = "0.74rem";
  log.style.marginBottom = "4px";
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  log.innerHTML = `<span style="color:var(--text-faint)">[${time}]</span> <span style="${style}">${msg}</span>`;
  term.appendChild(log);
  term.scrollTop = term.scrollHeight;
}

function setSimulatorParadigm(paradigm) {
  simParadigm = paradigm;
  const worksBtn = document.getElementById("sim-par-works");
  const graceBtn = document.getElementById("sim-par-grace");
  
  worksBtn.classList.remove("active");
  graceBtn.classList.remove("active");
  
  if (paradigm === "works") {
    worksBtn.classList.add("active");
    logSimulatorTerminal("Mode switched to closed Performance Striving.", "color: var(--rust)");
  } else {
    graceBtn.classList.add("active");
    logSimulatorTerminal("Mode switched to Received Grace/Sabbath rest.", "color: var(--jade)");
  }
}

function startSimulator() {
  if (simRunning) return;
  simRunning = true;
  document.getElementById("sim-btn-start").disabled = true;
  document.getElementById("sim-btn-pause").disabled = false;
  
  logSimulatorTerminal("🚀 Engine running.", "color: var(--text)");
  
  simInterval = setInterval(() => {
    if (simParadigm === "works") {
      let loss = 0.4 + (simStress * 0.04 * k_leak);
      simWillpower = Math.max(0, simWillpower - loss);
      simStress = Math.min(100, simStress + 0.2 * k_leak);
      
      if (simWillpower < 30) {
        simShame = Math.min(100, simShame + 1.1 * F_shame);
        simStress = Math.min(100, simStress + 0.8 * F_shame);
        if (Math.random() < 0.15) {
          logSimulatorTerminal("💥 Willpower critically low. Self-condemnation alarm.", "color: var(--rust-soft); font-weight: bold;");
        }
      }
    } else {
      simWillpower = Math.min(100, simWillpower + 1.4 * g_grace);
      simStress = Math.max(0, simStress - 1.5 * g_grace);
      simShame = Math.max(0, simShame - 2.0 * g_grace);
    }
    
    simDataPoints.push({ w: simWillpower, s: simStress, sh: simShame });
    if (simDataPoints.length > simMaxDataPoints) {
      simDataPoints.shift();
    }
    
    updateSimulatorUI();
    drawSimulatorChart();
  }, 400);
}

function pauseSimulator() {
  if (!simRunning) return;
  simRunning = false;
  clearInterval(simInterval);
  document.getElementById("sim-btn-start").disabled = false;
  document.getElementById("sim-btn-pause").disabled = true;
  logSimulatorTerminal("⏸️ Engine paused.", "color: var(--text-faint)");
}

function resetSimulator() {
  pauseSimulator();
  const profileKey = document.getElementById("sim-loop-profile").value;
  loadSimulatorProfile(profileKey);
}

function updateSimulatorUI() {
  document.getElementById("sim-val-willpower").innerText = Math.round(simWillpower);
  document.getElementById("sim-val-stress").innerText = Math.round(simStress);
  document.getElementById("sim-val-shame").innerText = Math.round(simShame);
  
  document.getElementById("sim-bar-willpower").style.width = `${simWillpower}%`;
  document.getElementById("sim-bar-stress").style.width = `${simStress}%`;
  document.getElementById("sim-bar-shame").style.width = `${simShame}%`;
}

function drawSimulatorChart() {
  if (!simCanvas || !simCtx) return;
  const rect = simCanvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;
  
  simCtx.clearRect(0, 0, w, h);
  if (simDataPoints.length === 0) return;
  
  const dx = w / (simMaxDataPoints - 1);
  const dy = h / 100;
  
  // draw grid
  const theme = document.documentElement.getAttribute("data-theme");
  simCtx.strokeStyle = theme === "dark" ? "rgba(244, 237, 217, 0.04)" : "rgba(28, 27, 25, 0.04)";
  simCtx.lineWidth = 1;
  for (let i = 25; i <= 75; i += 25) {
    simCtx.beginPath();
    simCtx.moveTo(0, h - i * dy);
    simCtx.lineTo(w, h - i * dy);
    simCtx.stroke();
  }
  
  // Create gradient fills
  const willpowerColor = simParadigm === "works" ? "#d66853" : "#4cdbb3"; // var(--rust) or var(--jade)
  const stressColor = "#f09484"; // var(--rust-soft)
  const shameColor = "#ab7fd1"; // var(--purple)
  
  const wGrad = simCtx.createLinearGradient(0, 0, 0, h);
  if (simParadigm === "works") {
    wGrad.addColorStop(0, "rgba(214, 104, 83, 0.18)");
    wGrad.addColorStop(1, "rgba(214, 104, 83, 0)");
  } else {
    wGrad.addColorStop(0, "rgba(76, 219, 179, 0.18)");
    wGrad.addColorStop(1, "rgba(76, 219, 179, 0)");
  }
  
  const sGrad = simCtx.createLinearGradient(0, 0, 0, h);
  sGrad.addColorStop(0, "rgba(240, 148, 132, 0.08)");
  sGrad.addColorStop(1, "rgba(240, 148, 132, 0)");
  
  const shGrad = simCtx.createLinearGradient(0, 0, 0, h);
  shGrad.addColorStop(0, "rgba(171, 127, 209, 0.05)");
  shGrad.addColorStop(1, "rgba(171, 127, 209, 0)");
  
  // Curve rendering function
  function drawTelemetryCurve(key, color, isDashed = false, fillGradient = null) {
    // 1. Draw gradient fill first
    if (fillGradient) {
      simCtx.beginPath();
      simDataPoints.forEach((pt, idx) => {
        const val = pt[key];
        const x = idx * dx;
        const y = h - val * dy;
        if (idx === 0) simCtx.moveTo(x, y);
        else simCtx.lineTo(x, y);
      });
      simCtx.lineTo((simDataPoints.length - 1) * dx, h);
      simCtx.lineTo(0, h);
      simCtx.closePath();
      simCtx.fillStyle = fillGradient;
      simCtx.fill();
    }
    
    // 2. Draw curve line with glow shadow
    simCtx.beginPath();
    simCtx.lineWidth = 2.5;
    simCtx.strokeStyle = color;
    if (isDashed) simCtx.setLineDash([4, 4]);
    else simCtx.setLineDash([]);
    
    simCtx.shadowBlur = 10;
    simCtx.shadowColor = color;
    
    simDataPoints.forEach((pt, idx) => {
      const val = pt[key];
      const x = idx * dx;
      const y = h - val * dy;
      if (idx === 0) simCtx.moveTo(x, y);
      else simCtx.lineTo(x, y);
    });
    simCtx.stroke();
    
    // Reset shadow
    simCtx.shadowBlur = 0;
  }
  
  // Draw order (Shame background, then Stress dashed, then main Willpower solid)
  drawTelemetryCurve("sh", shameColor, false, shGrad);
  drawTelemetryCurve("s", stressColor, true, sGrad);
  drawTelemetryCurve("w", willpowerColor, false, wGrad);
}

// ============================================================
// TAB 3: MECHANICS - CATHEXIS RELATIONAL DIAGNOSTIC (FAKE LOVE)
// ============================================================
let currentCathStep = 0;
const CATH_ANSWERS = [null, null, null];

function initCathexisDiagnostic() {
  const options = document.querySelectorAll("#cathexis-shell .cath-option-btn");
  const prevBtn = document.getElementById("cath-btn-prev");
  const nextBtn = document.getElementById("cath-btn-next");
  const slides = document.querySelectorAll("#cathexis-shell .cath-slide");
  const dots = document.querySelectorAll("#cathexis-shell .diag-dot");
  const resetBtn = document.getElementById("cath-btn-reset");
  
  if (options.length === 0) return;
  
  function showCathStep(step) {
    currentCathStep = step;
    
    slides.forEach((slide, idx) => {
      slide.style.display = idx === step ? "block" : "none";
      slide.classList.toggle("active", idx === step);
    });
    
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === step);
    });
    
    if (prevBtn) prevBtn.disabled = step === 0;
    
    updateNextButtonState();
  }
  
  function updateNextButtonState() {
    if (!nextBtn) return;
    const hasAnswer = CATH_ANSWERS[currentCathStep] !== null;
    nextBtn.disabled = !hasAnswer;
    
    if (currentCathStep === 2) {
      nextBtn.innerText = "Evaluate";
    } else {
      nextBtn.innerText = "Next";
    }
  }
  
  options.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle selection styling
      btn.parentNode.parentNode.querySelectorAll(".cath-option-btn").forEach(b => {
        b.classList.remove("selected");
      });
      btn.classList.add("selected");
      
      const val = btn.dataset.val;
      CATH_ANSWERS[currentCathStep] = val;
      updateNextButtonState();
      
      // Auto advance with 400ms delay
      setTimeout(() => {
        if (currentCathStep < 2) {
          showCathStep(currentCathStep + 1);
        }
      }, 400);
    });
  });
  
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentCathStep > 0) {
        showCathStep(currentCathStep - 1);
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentCathStep < 2) {
        showCathStep(currentCathStep + 1);
      } else {
        calculateCathexisResult();
      }
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener("click", resetCathexisTest);
  }
  
  showCathStep(0);
}

function calculateCathexisResult() {
  const [q0, q1, q2] = CATH_ANSWERS;
  const panel = document.getElementById("cath-result-panel");
  const emptyPlaceholder = document.getElementById("cath-result-empty");
  const title = document.getElementById("cath-res-title");
  const text = document.getElementById("cath-res-text");
  const sendBtn = document.getElementById("cath-btn-send-workbook");
  
  if (q0 === null || q1 === null || q2 === null) {
    if (panel) panel.style.display = "none";
    if (emptyPlaceholder) emptyPlaceholder.style.display = "block";
    return;
  }
  
  if (emptyPlaceholder) emptyPlaceholder.style.display = "none";
  if (panel) {
    panel.style.display = "flex";
    panel.style.flexDirection = "column";
  }
  
  const isVerb = q0 === "verb";
  const isThem = q1 === "them";
  const isFree = q2 === "free";
  
  let profileType = "";
  
  if (isVerb && isThem && isFree) {
    title.innerText = "True Care (Healthy Posture)";
    title.style.color = "var(--jade)";
    text.innerHTML = `Your profile shows mature love. According to **M. Scott Peck** (*The Road Less Traveled*), love is an active choice to nurture another's separate growth. You do not borrow their validation to regulate your peace.`;
    profileType = "true_care";
  } else if (!isVerb && !isThem && !isFree) {
    title.innerText = "Compulsive Cathexis (Extraction)";
    title.style.color = "var(--rust)";
    text.innerHTML = `Your profile maps to a high-extraction loop. According to **Dorothy Tennov** (*Limerence*) and **Erich Fromm** (*The Art of Loving*), you are using the other as an emotional stabilizer, sacrificing their freedom for your comfort.`;
    profileType = "cathexis";
  } else {
    title.innerText = "Mixed Attachment Striving";
    title.style.color = "var(--gold)";
    text.innerHTML = `Your relationship exhibits conflicting patterns. Gift-love is starting to curdle into Need-love. **C.S. Lewis** (*The Four Loves*) warns against demanding to remain needed, turning the other into your savior platform.`;
    profileType = "mixed";
  }
  
  if (sendBtn) {
    sendBtn.style.display = "inline-flex";
    sendBtn.onclick = () => {
      prefillWorkbookFromCathexis(profileType);
    };
  }
  
  showToast("Evaluation completed!", "success");
  if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function prefillWorkbookFromCathexis(profileType) {
  let cistern = "";
  let counterfeit = "";
  let loop = "";
  let shame = "";
  let grace = "";
  
  if (profileType === "cathexis") {
    cistern = "Compulsive Cathexis (Extraction Loop)";
    counterfeit = "Relational dependency / borrowing validation";
    loop = "Feel empty or unsafe ➔ seek partner reassurance/pleasing ➔ temporary relief ➔ hypervigilance ➔ feel empty again";
    shame = "If I am separate, I will be abandoned or exposed as unlovable.";
    grace = "Secure attachment. Worth is pre-established. Give partner separate breathing space today without demands.";
  } else if (profileType === "mixed") {
    cistern = "Mixed Attachment Striving (Need-Love)";
    counterfeit = "Worrying, fixing, saving the other to remain needed";
    loop = "Feel anxious or insignificant ➔ assume savior/fixer role ➔ feel temporarily valuable ➔ burnout or resentment ➔ repeat";
    shame = "If I am not needed, I have no value or purpose in this relationship.";
    grace = "Gift-love sourced in grace. Support the other without trying to rescue them or control their choices.";
  } else {
    cistern = "Healthy Posture (True Care)";
    counterfeit = "No active counterfeit loop identified";
    loop = "Conscious commitment ➔ supporting separate growth ➔ mutual safety";
    shame = "No heavy attachment shame Voice active.";
    grace = "Continue walking in received worth, honoring boundaries, and choosing true care daily.";
  }
  
  // Fill workbook form fields
  document.getElementById("arch-in-cistern").value = cistern;
  document.getElementById("arch-in-counterfeit").value = counterfeit;
  document.getElementById("arch-in-habit").value = loop;
  document.getElementById("arch-in-shame").value = shame;
  document.getElementById("arch-in-grace").value = grace;
  
  // Trigger tab switch to Healing section
  document.querySelector('.bottom-nav-btn[data-tab="healing"]').dispatchEvent(new Event("click"));
  
  // Scroll to Personal Architect section
  setTimeout(() => {
    const targetElement = document.getElementById("sec-workbook");
    if (targetElement) {
      const offset = 120;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  }, 100);
  
  updateWorkbookBlueprint();
  showToast("Cathexis diagnostic plan sent to Personal Architect!", "success");
}

function resetCathexisTest() {
  CATH_ANSWERS.fill(null);
  
  document.querySelectorAll("#cathexis-shell .cath-option-btn").forEach(btn => {
    btn.classList.remove("selected");
  });
  
  const panel = document.getElementById("cath-result-panel");
  const emptyPlaceholder = document.getElementById("cath-result-empty");
  const sendBtn = document.getElementById("cath-btn-send-workbook");
  
  if (panel) panel.style.display = "none";
  if (emptyPlaceholder) emptyPlaceholder.style.display = "block";
  if (sendBtn) sendBtn.style.display = "none";
  
  // Reset step
  currentCathStep = 0;
  const slides = document.querySelectorAll("#cathexis-shell .cath-slide");
  const dots = document.querySelectorAll("#cathexis-shell .diag-dot");
  
  slides.forEach((slide, idx) => {
    slide.style.display = idx === 0 ? "block" : "none";
    slide.classList.toggle("active", idx === 0);
  });
  
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === 0);
  });
  
  const prevBtn = document.getElementById("cath-btn-prev");
  const nextBtn = document.getElementById("cath-btn-next");
  if (prevBtn) prevBtn.disabled = true;
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.innerText = "Next";
  }
  
  showToast("Cathexis test reset", "info");
}

// ============================================================
// TAB 3: MECHANICS - UNIFIED COUNTERFEITS MATRIX DIRECTORY
// ============================================================
function initCounterfeitsMatrix() {
  const search = document.getElementById("matrix-search");
  const filter = document.getElementById("matrix-filter");
  
  if (!search) return;
  
  search.addEventListener("input", renderCounterfeitsMatrix);
  filter.addEventListener("change", renderCounterfeitsMatrix);
  
  renderCounterfeitsMatrix();
}

function renderCounterfeitsMatrix() {
  const container = document.getElementById("matrix-grid");
  if (!container) return;
  
  const query = document.getElementById("matrix-search").value.toLowerCase().trim();
  const cat = document.getElementById("matrix-filter").value;
  
  container.innerHTML = "";
  
  const rows = DATA_COUNTERFEITS.filter(item => {
    const matchesCat = !cat || item.type === cat;
    const matchesQuery = !query || 
      item.name.toLowerCase().includes(query) ||
      item.need.toLowerCase().includes(query) ||
      item.counterfeit.toLowerCase().includes(query) ||
      item.signal.toLowerCase().includes(query) ||
      item.realMeal.toLowerCase().includes(query);
    
    return matchesCat && matchesQuery;
  });
  
  document.getElementById("matrix-count").innerText = `${rows.length} / ${DATA_COUNTERFEITS.length} directories`;
  
  rows.forEach(item => {
    const card = document.createElement("article");
    card.className = "card matrix-card";
    const tagClass = item.type.toLowerCase();
    
    card.innerHTML = `
      <span class="matrix-tag ${tagClass}">${item.type}</span>
      <h3>${item.name}</h3>
      <dl class="matrix-dl">
        <div>
          <dt>Underlying Need</dt>
          <dd>${item.need}</dd>
        </div>
        <div>
          <dt>Counterfeit / Loop</dt>
          <dd>${item.counterfeit}</dd>
        </div>
        <div>
          <dt>Warning Signal</dt>
          <dd><i>${item.signal}</i></dd>
        </div>
        <div>
          <dt>Grace Turning Point</dt>
          <dd><b>${item.healthy}</b></dd>
        </div>
        <div>
          <dt>Real Meal / Means</dt>
          <dd>${item.realMeal}</dd>
        </div>
      </dl>
    `;
    
    container.appendChild(card);
  });
  
  if (container.children.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-faint);font-family:var(--font-mono);font-size:var(--step--1);">✕ No matching counterfeits found.</div>`;
  }
}

// ============================================================
// TAB 4: HEALING - QUICK RE-SOURCE PLANNER (FEELINGS DROP-DOWN)
// ============================================================
function initQuickPlanner() {
  const select = document.getElementById("quick-feeling-select");
  const behaviorInput = document.getElementById("quick-behavior-input");
  const contextInput = document.getElementById("quick-context-input");
  
  if (!select) return;
  
  // Render feelings dropdown options
  select.innerHTML = DATA_FEELINGS.map((feel, idx) => `<option value="${idx}">${feel.feel}</option>`).join("");
  
  select.addEventListener("change", generateQuickPlanText);
  behaviorInput.addEventListener("input", generateQuickPlanText);
  contextInput.addEventListener("input", generateQuickPlanText);
  
  document.getElementById("btn-quick-copy").addEventListener("click", () => {
    const text = document.getElementById("quick-output-text").textContent;
    navigator.clipboard.writeText(text)
      .then(() => showToast("Plan copied to clipboard!", "success"))
      .catch(() => showToast("Failed to copy", "error"));
  });
  
  document.getElementById("btn-quick-send-workbook").addEventListener("click", () => {
    const selectedIdx = parseInt(select.value);
    const feel = DATA_FEELINGS[selectedIdx];
    if (!feel) return;
    
    const contextVal = contextInput.value.trim();
    const behaviorVal = behaviorInput.value.trim();
    const customOld = behaviorVal || feel.old;
    
    // Fill workbook form fields
    document.getElementById("arch-in-cistern").value = `Feeling ${feel.feel} (${feel.category})`;
    document.getElementById("arch-in-counterfeit").value = customOld;
    document.getElementById("arch-in-habit").value = `Trigger signal: ${feel.signal}. I run to the counterfeit to soothe it.`;
    document.getElementById("arch-in-shame").value = contextVal ? `Trigger context: ${contextVal}` : "Running the empty loop when stress sounds.";
    document.getElementById("arch-in-grace").value = `Real Meal: ${feel.real}. First Move: ${feel.move}`;
    
    // Trigger tab switch to Healing section
    document.querySelector('.bottom-nav-btn[data-tab="healing"]').dispatchEvent(new Event("click"));
    
    // Scroll to Personal Architect section
    setTimeout(() => {
      const targetElement = document.getElementById("sec-workbook");
      if (targetElement) {
        const offset = 120;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }, 100);
    
    updateWorkbookBlueprint();
    showToast(`Planner plan sent to Personal Architect!`, "success");
  });
  
  generateQuickPlanText();
}

function generateQuickPlanText() {
  const select = document.getElementById("quick-feeling-select");
  const behaviorInput = document.getElementById("quick-behavior-input");
  const contextInput = document.getElementById("quick-context-input");
  const output = document.getElementById("quick-output-text");
  
  const feelIdx = parseInt(select.value || 0);
  const feel = DATA_FEELINGS[feelIdx];
  if (!feel) return;
  
  const behavior = behaviorInput.value.trim();
  const context = contextInput.value.trim();
  const oldPath = behavior || feel.old;
  const contextBlock = context ? `\nContext / What happened before:\n${context}\n` : "";
  
  output.textContent = 
`QUICK RE-SOURCE PLAN

Feeling:
${feel.feel} (${feel.category})

Felt Signal:
${feel.signal}

What my body is asking for:
${feel.need}
${contextBlock}
Old Pathway / Counterfeit:
${oldPath}

Real Meal / Proper Means:
${feel.real}

First Faithful Move:
${feel.move}

Short Prayer:
Father, I bring the real need of my heart to You instead of demanding life from a broken cistern. Help me choose the next faithful move without shame. Amen.`;
}

// ============================================================
// TAB 4: HEALING - 25 FEELINGS DIRECTORY
// ============================================================
function initFeelingsDirectory() {
  const search = document.getElementById("feelings-search");
  const select = document.getElementById("feelings-category");
  
  if (!search) return;
  
  // Fill category selector options
  const cats = [...new Set(DATA_FEELINGS.map(item => item.category))].sort();
  select.innerHTML = '<option value="">All Categories</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join("");
  
  search.addEventListener("input", renderFeelingsDirectory);
  select.addEventListener("change", renderFeelingsDirectory);
  
  renderFeelingsDirectory();
}

function renderFeelingsDirectory() {
  const container = document.getElementById("feelings-list");
  if (!container) return;
  
  const query = document.getElementById("feelings-search").value.toLowerCase().trim();
  const cat = document.getElementById("feelings-category").value;
  
  container.innerHTML = "";
  
  const rows = DATA_FEELINGS.filter(item => {
    const matchesCat = !cat || item.category === cat;
    const matchesQuery = !query ||
      item.feel.toLowerCase().includes(query) ||
      item.signal.toLowerCase().includes(query) ||
      item.need.toLowerCase().includes(query) ||
      item.old.toLowerCase().includes(query) ||
      item.real.toLowerCase().includes(query) ||
      item.move.toLowerCase().includes(query);
      
    return matchesCat && matchesQuery;
  });
  
  document.getElementById("feelings-count").innerText = `${rows.length} / ${DATA_FEELINGS.length} feelings`;
  
  rows.forEach(item => {
    const card = document.createElement("article");
    card.className = "feel-card";
    
    card.innerHTML = `
      <div class="feel-top-row">
        <div class="feel-title-cell">
          <h3>${item.feel}</h3>
          <p>${item.signal}</p>
        </div>
        <div class="feel-move-cell">
          <b>First Faithful Move</b>
          <span>${item.move}</span>
        </div>
      </div>
      <details>
        <summary>Diagnose this feeling more deeply</summary>
        <div class="feel-details-grid">
          <div class="feel-details-col">
            <b>Old Pathway / Counterfeit</b>
            <span>${item.old}</span>
          </div>
          <div class="feel-details-col">
            <b>Real Need</b>
            <span>${item.need}</span>
          </div>
          <div class="feel-details-col">
            <b>Real Meal / Proper Means</b>
            <span>${item.real}</span>
          </div>
        </div>
      </details>
    `;
    
    container.appendChild(card);
  });
  
  if (container.children.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:3rem;color:var(--text-faint);font-family:var(--font-mono);font-size:var(--step--1);">✕ No matching feelings found.</div>`;
  }
}

// ============================================================
// TAB 4: HEALING - PERSONAL ARCHITECT WORKBOOK
// ============================================================
function initWorkbook() {
  const fields = ["cistern", "counterfeit", "habit", "shame", "grace"];
  
  fields.forEach(f => {
    const inputEl = document.getElementById(`arch-in-${f}`);
    if (inputEl) {
      inputEl.addEventListener("input", updateWorkbookBlueprint);
    }
  });
  
  document.getElementById("btn-arch-reset").addEventListener("click", resetWorkbookForm);
  document.getElementById("btn-arch-copy").addEventListener("click", copyWorkbookBlueprint);
  document.getElementById("btn-arch-download").addEventListener("click", downloadWorkbookBlueprint);
}

function updateWorkbookBlueprint() {
  const cis = document.getElementById("arch-in-cistern").value.trim() || "—";
  const cnt = document.getElementById("arch-in-counterfeit").value.trim() || "—";
  const hab = document.getElementById("arch-in-habit").value.trim() || "—";
  const shm = document.getElementById("arch-in-shame").value.trim() || "—";
  const grc = document.getElementById("arch-in-grace").value.trim() || "—";
  
  const blueprintText = 
`📋 MY DE-ESCALATION BLUEPRINT

1. MY BROKEN CISTERN (THE VOID):
   ${cis}

2. MY COUNTERFEIT SOURCE (THE SALT WATER):
   ${cnt}

3. MY COMPULSION LOOP SEQUENCE:
   ${hab}

4. THE ACCUSATION / SHAME TRAP:
   ${shm}

5. MY GRACE ANCHOR (THE REAL MEAL):
   ${grc}

Constructed with the Loop Breaker & Way Back Portal.`;

  document.getElementById("blueprint-output-text").textContent = blueprintText;
}

function resetWorkbookForm() {
  const fields = ["cistern", "counterfeit", "habit", "shame", "grace"];
  fields.forEach(f => {
    document.getElementById(`arch-in-${f}`).value = "";
  });
  updateWorkbookBlueprint();
  showToast("Workbook form cleared.", "info");
}

function copyWorkbookBlueprint() {
  const text = document.getElementById("blueprint-output-text").textContent;
  navigator.clipboard.writeText(text)
    .then(() => showToast("Blueprint copied to clipboard!", "success"))
    .catch(() => showToast("Failed to copy", "error"));
}

function downloadWorkbookBlueprint() {
  const text = document.getElementById("blueprint-output-text").textContent;
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "my-loop-breaker-blueprint.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Blueprint file downloaded successfully!", "success");
}

// ============================================================
// TAB 4: HEALING - SCRIPTURAL GLOSSARY
// ============================================================
let activeGlossaryTag = "all";

function initGlossary() {
  const searchInput = document.getElementById("glossary-search");
  const tagBtns = document.querySelectorAll(".glossary-tag-btn");
  
  if (!searchInput) return;
  
  searchInput.addEventListener("input", renderGlossary);
  tagBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tagBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeGlossaryTag = btn.dataset.tag;
      renderGlossary();
    });
  });
  
  renderGlossary();
}

function renderGlossary() {
  const container = document.getElementById("glossary-grid");
  if (!container) return;
  
  const query = document.getElementById("glossary-search").value.toLowerCase().trim();
  container.innerHTML = "";
  
  const rows = GLOSSARY_DATA.filter(item => {
    const matchesTag = activeGlossaryTag === "all" || item.tags.includes(activeGlossaryTag);
    const matchesQuery = !query ||
      item.term.toLowerCase().includes(query) ||
      item.synonyms.some(s => s.toLowerCase().includes(query)) ||
      item.definition.toLowerCase().includes(query) ||
      item.theology.toLowerCase().includes(query) ||
      item.psychology.toLowerCase().includes(query) ||
      item.verses.some(v => v.toLowerCase().includes(query)) ||
      item.topics.some(t => t.toLowerCase().includes(query));
      
    return matchesTag && matchesQuery;
  });
  
  rows.forEach(item => {
    const card = document.createElement("article");
    card.className = "card glossary-card";
    
    const versesHTML = item.verses.length > 0 
      ? `<div class="glossary-verses-list">${item.verses.map(v => `<span class="verse-tag">${v}</span>`).join("")}</div>`
      : "";
      
    const synonymsHTML = item.synonyms.length > 0
      ? `<p class="glossary-synonyms"><strong>Synonyms:</strong> ${item.synonyms.join(", ")}</p>`
      : "";
      
    card.innerHTML = `
      <h3>${item.term} <span class="glossary-term-badge">${item.tags[0]}</span></h3>
      ${synonymsHTML}
      <div class="glossary-grid">
        <div class="glossary-block">
          <strong>Definition</strong>
          <p>${item.definition}</p>
        </div>
        <div class="glossary-block">
          <strong>Theological Context</strong>
          <p>${item.theology}</p>
        </div>
        <div class="glossary-block">
          <strong>Psychological Mapping</strong>
          <p>${item.psychology}</p>
        </div>
      </div>
      <div style="margin-top: 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border); padding-top: 12px; flex-wrap: wrap; gap: 8px;">
        <div style="font-size: var(--step--2); color: var(--text-faint);"><strong>Topics:</strong> ${item.topics.join(" · ")}</div>
        ${versesHTML}
      </div>
    `;
    
    container.appendChild(card);
  });
  
  if (container.children.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-faint);font-family:var(--font-mono);font-size:var(--step--1);">✕ No glossary matches found.</div>`;
  }
}

// ============================================================
// MASTER APP DATABASE EXTENSIONS
// ============================================================
const ROOTS = {
  acceptance: {
    i: "🤝", t: "Acceptance Leak",
    sub: "Approval is being asked to do the work of belonging.",
    thirst: "Secure love, honest belonging, and the freedom to disappoint people without losing yourself.",
    counterfeit: "Mood-management, people-pleasing, over-explaining, becoming whatever the room rewards.",
    loop: "Earned acceptance expires. The moment the room changes, you have to become acceptable all over again.",
    receive: "Start from beloved before useful. Let worth be received before anyone in the room votes on it.",
    ifThen: "When I feel the panic to manage reactions, then I will say one true sentence before I say yes."
  },
  control: {
    i: "🌪️", t: "Control Leak",
    sub: "Certainty is being asked to do the work of peace.",
    thirst: "Safety, steadiness, and trust that the world is held even when you are not holding it.",
    counterfeit: "Checking, micromanaging, information hoarding, rehearsing every possible failure.",
    loop: "Control lowers anxiety for a minute, then teaches your body that uncertainty is dangerous.",
    receive: "Begin with held, not omniscient. Peace is received by trust, not manufactured by total visibility.",
    ifThen: "When I start rehearsing every outcome, then I will name the controllable and release the rest."
  },
  significance: {
    i: "🌟", t: "Significance Leak",
    sub: "Achievement is being asked to do the work of worth.",
    thirst: "To matter before producing, winning, being exceptional, or being seen.",
    counterfeit: "Overwork, optimization, comparison, credentials, status, proving that your life counts.",
    loop: "The win becomes baseline. Worth tied to output has to be re-earned tomorrow.",
    receive: "Begin from named before notable. Your value is given before it is demonstrated.",
    ifThen: "When I feel behind and invisible, then I will do the next honest task and refuse the extra proving lap."
  },
  comfort: {
    i: "☕", t: "Comfort Leak",
    sub: "Numbing is being asked to do the work of consolation.",
    thirst: "Rest, comfort, relief, and the ability to feel pain without being swallowed by it.",
    counterfeit: "Scrolling, food, buying, fantasy, substances, procrastination, soft escape that keeps the ache unnamed.",
    loop: "The anesthetic fades, the pain is still there, and now shame becomes the next cue.",
    receive: "Begin with comfort that can tell the truth. The fountain meets pain; it does not require you to vanish.",
    ifThen: "When I reach to disappear, then I will name the feeling out loud and give my body one real comfort first."
  },
  righteousness: {
    i: "🛡️", t: "Righteousness Leak",
    sub: "Self-condemnation is being asked to do the work of repentance.",
    thirst: "A clean conscience, pardon, repair, and safety to be wrong without being annihilated.",
    counterfeit: "Scrupulosity, rule-stacking, moral comparison, confession without receiving forgiveness, self-punishment.",
    loop: "Self-scrutiny exposes more flaws, then shame demands more scrutiny. The court never adjourns.",
    receive: "Begin from no condemnation. Conviction leads to repair; accusation leads to hiding.",
    ifThen: "When accusation starts looping, then I will name the specific wrong, receive mercy, and make the next repair."
  }
};

const DIAG_GROUPS = {
  surface: {
    choices: [
      { id: "please", w: { acceptance: 3, significance: 1 } },
      { id: "check", w: { control: 3 } },
      { id: "prove", w: { significance: 3, control: 1 } },
      { id: "numb", w: { comfort: 3 } },
      { id: "scrub", w: { righteousness: 3 } },
      { id: "compare", w: { significance: 2, acceptance: 2 } },
      { id: "attack", w: { righteousness: 2, significance: 1, control: 1 } },
      { id: "hide", w: { comfort: 2, acceptance: 1, righteousness: 1 } }
    ]
  },
  cue: {
    choices: [
      { id: "cue-reject", w: { acceptance: 3 } },
      { id: "cue-unsafe", w: { control: 3 } },
      { id: "cue-small", w: { significance: 3 } },
      { id: "cue-pain", w: { comfort: 3 } },
      { id: "cue-guilt", w: { righteousness: 3 } }
    ]
  },
  promise: {
    choices: [
      { id: "prom-loved", w: { acceptance: 3 } },
      { id: "prom-safe", w: { control: 3 } },
      { id: "prom-matter", w: { significance: 3 } },
      { id: "prom-rest", w: { comfort: 3 } },
      { id: "prom-clean", w: { righteousness: 3 } }
    ]
  }
};

const DATA_FEELINGS = [
  { feel: "Lonely", signal: "Ache, checking your phone, wanting to be noticed", need: "Connection / belonging", old: "Scrolling, texting loops, parasocial content, checking views", real: "Embodied contact: one honest message, one call, one meal, one confession", move: "Text one safe person: “Can we talk this week? I’ve been feeling disconnected.”", category: "Belonging" },
  { feel: "Rejected", signal: "Scanning tone, panic after silence, wanting to fix tension", need: "Secure acceptance", old: "Fawning, over-apologizing, over-explaining, image management", real: "God’s acceptance plus truthful, non-panicked repair", move: "Pause before replying. Say: “I hear you. I want to respond honestly, not reactively.”", category: "Belonging" },
  { feel: "Powerless", signal: "Tension, urgency, clenched body, need to force movement", need: "Safety / agency", old: "Anger, micromanaging, ultimatums, frantic planning", real: "Boundaried action: control what is yours, release what is not", move: "Name one controllable action and one uncontrollable outcome. Act only on the first.", category: "Safety" },
  { feel: "Disrespected", signal: "Heat, defensiveness, urge to punish or prove dignity", need: "Worth / justice", old: "Sarcasm, contempt, shouting, withdrawal, revenge fantasy", real: "Truth with restraint: dignity that does not need rage to exist", move: "Say: “That felt disrespectful. I want to talk about it without attacking.”", category: "Justice" },
  { feel: "Worthless", signal: "Feeling behind, exposed, not enough, needing proof", need: "Worth / justification", old: "Overworking, perfectionism, achievements, credentials", real: "Worth received before performance; work becomes fruit, not source", move: "Do one faithful task imperfectly, then stop without adding another proof-task.", category: "Worth" },
  { feel: "Ashamed", signal: "Hiding, self-attack, dread of being seen clearly", need: "Forgiveness / restored dignity", old: "Numbing, secrecy, self-condemnation, religious striving", real: "Confession, mercy, repentance, repair; truth brought into light", move: "Confess the specific thing to God and, if needed, one safe person without dramatic self-hatred.", category: "Mercy" },
  { feel: "Anxious", signal: "Racing thoughts, threat scanning, needing more certainty", need: "Safety / peace", old: "Checking, doomscrolling, reassurance seeking, research spirals", real: "Limited wisdom plus embodied trust under uncertainty", move: "Set a 10-minute research limit, write the next action, then stop.", category: "Safety" },
  { feel: "Uncertain", signal: "Indecision, fear of choosing wrong, obsessive pros/cons", need: "Clarity / guidance", old: "Endless research, asking everyone, refreshing, avoiding decisions", real: "Wise counsel, prayer, enough information, then faithful movement", move: "Decide what “enough information” means, then choose the next reversible step.", category: "Agency" },
  { feel: "Exhausted", signal: "Heavy body, foggy mind, craving escape", need: "Rest / restoration", old: "Late-night scrolling, binge watching, gaming, caffeine loops", real: "Sleep, Sabbath, quiet, body care, low-stimulation recovery", move: "Put the phone across the room and choose 20 minutes of real rest.", category: "Rest" },
  { feel: "Emotionally numb", signal: "Flatness, avoidance, needing noise or stimulation", need: "Comfort / emotional presence", old: "Noise, busyness, substances, food, entertainment, compulsive work", real: "Gentle presence: name one feeling, include God, include the body", move: "Ask: “What am I avoiding feeling?” Name it in one sentence.", category: "Comfort" },
  { feel: "Grieved", signal: "Heaviness, loss, wanting to move on too fast", need: "Comfort / lament", old: "Forced positivity, numbing, work, shopping, food", real: "Lament, tears, companionship, hope without denial", move: "Pray or write: “This hurt because…” then tell one safe person.", category: "Comfort" },
  { feel: "Bored", signal: "Restlessness, flatness, craving novelty", need: "Joy / play / meaning / rest", old: "Scrolling, snacking, shopping, novelty chasing", real: "A slower good: music, walk, craft, reading, prayer, play", move: "Do one analog thing for 10 minutes before picking up the phone.", category: "Joy" },
  { feel: "Empty", signal: "Ache, craving intensity, wanting something to fill the hole", need: "Comfort / meaning / worship", old: "Shopping, porn, food, entertainment, fantasy, endless planning", real: "Name the ache and bring it to God plus one concrete proper means", move: "Say: “I feel empty, and I’m tempted to fill it with ___.” Then choose one real meal.", category: "Meaning" },
  { feel: "Invisible", signal: "Feeling overlooked, small, forgotten, needing proof you matter", need: "Significance / being seen", old: "Posting for validation, self-branding, comparison, name-dropping", real: "Being seen by God and loved locally; hidden faithfulness", move: "Do one useful act where credit is impossible.", category: "Worth" },
  { feel: "Intimacy-starved", signal: "Longing for closeness, tenderness, and being known", need: "Intimacy", old: "Porn, fantasy, emotional affairs, oversharing online", real: "Vulnerability, covenant love, confession, safe friendship, prayer", move: "Name the intimacy need without feeding fantasy; move toward honest connection.", category: "Intimacy" },
  { feel: "Behind", signal: "Comparison, panic, urge to catch up immediately", need: "Agency / worth", old: "Panic productivity, courses/tools, overplanning, comparison", real: "One faithful next step inside your actual assignment", move: "Pick one next task and remove one fake productivity input.", category: "Agency" },
  { feel: "Resentful", signal: "Feeling unseen, overburdened, silently demanding appreciation", need: "Validation / support / boundaries", old: "Martyrdom, passive aggression, over-serving, withdrawal", real: "Truthful request, boundary, receiving love before serving", move: "Say clearly: “I need help with ___ by ___.”", category: "Belonging" },
  { feel: "Angry", signal: "Heat, threat, wanting to force the situation", need: "Safety / justice / dignity", old: "Outburst, contempt, control, punishment, shutdown", real: "Firmness without rage; truth under God’s authority", move: "Lower volume, slow down, and state the boundary without threat.", category: "Safety" },
  { feel: "Tempted to compare", signal: "Self-rating, envy, pride, despair after seeing someone else", need: "Worth / significance", old: "Social media, status-checking, competitive striving", real: "Received worth and assigned faithfulness, not borrowed identity", move: "Bless the person you envy, then return to your next faithful task.", category: "Worth" },
  { feel: "Unsafe", signal: "Threat, fear, danger, appeasement or freezing", need: "Actual safety", old: "Denial, appeasement, rage, freezing, over-control", real: "God as refuge through wise protection: boundaries, help, distance, authorities if needed", move: "Move toward safety. Contact help. Leave danger when needed.", category: "Safety" },
  { feel: "Spiritually dry", signal: "Flat prayer, craving a spiritual high, self-condemnation", need: "Communion with God", need: "Communion with God", old: "Chasing experiences, endless sermons, aesthetic spirituality", real: "Ordinary means: prayer, Scripture, worship, silence, obedience, community", move: "Pray simply for five minutes without trying to manufacture a feeling.", category: "Transcendence" },
  { feel: "Tempted to quit", signal: "Flooded, trapped, desperate to escape", need: "Freedom / hope / rest", old: "Avoidance, impulsive quitting, fantasy life, sabotage", real: "Discerned boundaries, rest, counsel, wise change instead of escape", move: "Do not decide while flooded. Rest, then ask: “What needs to change, not just disappear?”", category: "Freedom" },
  { feel: "Guilty after failure", signal: "Despair, self-punishment, urge to keep spiraling", need: "Forgiveness / repair", old: "Bingeing, hiding, doubling down, despair, self-punishment", real: "No condemnation, confession, repair, restart immediately", move: "Stop the spiral within one step. Say what happened plainly and repair the next thing.", category: "Mercy" },
  { feel: "Overwhelmed", signal: "Too many open loops, scattered thoughts, shutdown", need: "Order / help / peace", old: "Shutdown, frantic multitasking, control, complaining, avoidance", real: "Small faithful order, asking for help, accepting creaturely limits", move: "Write every open loop down. Circle only the next one.", category: "Agency" }
];

const DATA_NEEDS = [
  { category: "Body / Provision", need: "Hunger / nourishment", signal: "Empty stomach, irritability, low energy, craving something fast", counterfeit: "Chips, sweets, grazing, caffeine instead of food", gives: "Taste, salt, crunch, stimulation, quick fullness", cannot: "Deep nourishment, stable energy, actual bodily care", hook: "It answers the mouth faster than a real meal answers the body.", cost: "Still hungry, unstable energy, more cravings, less body trust", real: "Protein, water, balanced meal, eating slowly, planning food", anchor: "God gives daily bread through ordinary embodied means.", move: "Drink water and eat real food before snack-stimulation." },
  { category: "Rest / Comfort", need: "Exhaustion / restoration", signal: "Heavy body, foggy mind, irritability, wanting escape", counterfeit: "Late-night scrolling, binge watching, gaming, caffeine loops", gives: "Distraction, passive escape, feeling off-duty", cannot: "Sleep, nervous-system repair, true Sabbath rest", hook: "It feels like rest because you are not working, but it still stimulates you.", cost: "Less sleep, lower resilience, more exhaustion tomorrow", real: "Sleep, nap, Sabbath, silence, low-stimulation recovery", anchor: "Rest is a gift, not a reward you earn after proving enough.", move: "Put the phone across the room and choose 20 minutes of real rest." },
  { category: "Connection", need: "Loneliness / connection", signal: "Ache, emptiness, checking phone, wanting to be noticed", counterfeit: "Social media, texting loops, parasocial content, checking views", gives: "Faces, novelty, updates, simulated presence", cannot: "Being known, heard, held, loved, and received", hook: "It gives the feeling of people without the vulnerability of relationship.", cost: "More comparison, more isolation, weaker courage for real connection", real: "Call a friend, confession, shared meal, church/community presence", anchor: "God receives the real you and teaches you to be known by others.", move: "Send one honest message to a safe person." },
  { category: "Connection", need: "Belonging / acceptance", signal: "Fear of disapproval, scanning tone, wanting to fix tension", counterfeit: "People-pleasing, fawning, over-explaining, image management", gives: "Temporary approval, reduced rejection fear, relational control", cannot: "Secure love, honest belonging, freedom to tell the truth", hook: "Approval feels like love when belonging feels uncertain.", cost: "Resentment, dishonesty, identity shaped by everyone’s mood", real: "Secure acceptance, honest no, vulnerable truth, safe friendship", anchor: "Belonging is received before you perform for the room.", move: "Pause before replying and tell one clean truth without over-explaining." },
  { category: "Identity", need: "Worth / justification", signal: "Feeling behind, exposed, not enough, needing proof", counterfeit: "Overworking, perfectionism, achievements, credentials", gives: "Proof, praise, measurable value, visible competence", cannot: "Secure identity, rest from proving, non-contingent worth", hook: "Metrics feel objective, so they seem safer than received worth.", cost: "Burnout, comparison, fragile identity, daily reset of the worth-meter", real: "Grace, adoption, Sabbath, secret service, faithful work from rest", anchor: "Worth is not the prize at the end of performance; it is the ground under obedience.", move: "Do one faithful task imperfectly, then stop without adding a proof-task." },
  { category: "Identity", need: "Significance / being seen", signal: "Feeling invisible, overlooked, small, forgotten", counterfeit: "Posting for validation, comparison, self-branding, name-dropping", gives: "Visibility, likes, recognition, measurable attention", cannot: "Being truly known, loved, and significant apart from the crowd", hook: "Attention feels like significance when hiddenness feels like death.", cost: "Dependence on audience response, performative living, envy", real: "Hidden faithfulness, local love, service without credit, being seen by God", anchor: "Your life is hidden with Christ before it is measured by the crowd.", move: "Do one useful act where credit is impossible." },
  { category: "Safety", need: "Fear / safety", signal: "Tension, urgency, racing thoughts, threat scanning", counterfeit: "Control, anger, checking, doomscrolling, micmanaging", gives: "Sense of power, certainty, preparedness, movement", cannot: "Deep safety, trust, peace under uncertainty", hook: "Control gives immediate body relief, even when it increases real chaos.", cost: "Hypervigilance, damaged trust, more anxiety, less surrender", real: "Prayer, wise plan, boundary, help, grounding, leaving danger if needed", anchor: "God is refuge; you are responsible, not sovereign.", move: "Name one controllable action and release one uncontrollable outcome." }
];

const DATA_COUNTERFEITS = [
  // Everyday Tech Traps
  { name: "Instagram / TikTok / Shorts", type: "Technology", subtype: "App", need: "Connection, joy, rest, significance", counterfeit: "Opening whenever a lull appears, chasing novelty or validation.", healthy: "Intentional inspiration, learning, posting without identity dependency.", signal: "You feel worse, lonelier, or more restless after closing it.", realMeal: "Call someone, go outside, make something, worship, sleep." },
  { name: "Reddit / X / News Feeds", type: "Technology", subtype: "App", need: "Clarity, belonging, control, justice", counterfeit: "Doomscrolling to feel informed or morally armed under uncertainty.", healthy: "Time-bounded research or structured community participation.", signal: "More information increases threat, anger, or contempt.", realMeal: "Limited research, prayer, wise action, embodied presence." },
  { name: "Slack / Teams / Email badges", type: "Technology", subtype: "Work Tool", need: "Belonging, worth, control, contribution", counterfeit: "Instant replies to prove value, late-night checks to quiet the alarm.", healthy: "Clear work communication within boundaries.", signal: "You feel guilty resting or not replying immediately.", realMeal: "Work blocks, offline boundaries, received worth, honest expectations." },
  { name: "Apple Rings / Whoop / fitness", type: "Technology", subtype: "Metric", need: "Health, agency, mastery", counterfeit: "Closing rings to feel morally okay; checking stats to feel secure.", healthy: "Feedback for wise body stewardship.", signal: "Rest feels like failure or laziness.", realMeal: "Movement for joy, sleep, recovery, body as gift." },
  { name: "Duolingo / Streaks systems", type: "Technology", subtype: "Learning App", need: "Mastery, growth, agency", counterfeit: "Protecting streaks while avoiding deep, difficult learning.", healthy: "Practice that serves real skill and humility.", signal: "The number matters more than the craft.", realMeal: "Slow skill-building, practice, failure tolerance." },
  { name: "Notion / Habit Planners", type: "Technology", subtype: "Productivity", need: "Order, agency, clarity", counterfeit: "Redesigning templates instead of doing the next faithful task.", healthy: "Simple structure that supports action.", signal: "Planning gives relief but produces no obedience.", realMeal: "One task, one boundary, one done thing." },
  
  // Everyday Habits
  { name: "Zillow / Redfin browsing", type: "Habits", subtype: "Housing App", need: "Security, hope, future, status", counterfeit: "Fantasy house hunting to escape actual life problems today.", healthy: "Practical research for a real move or financial plan.", signal: "You feel discontent with actual life afterward.", realMeal: "Gratitude, wise planning, stewardship, local faithfulness." },
  { name: "DoorDash / Uber Eats", type: "Habits", subtype: "Food Service", need: "Nourishment, comfort, convenience", counterfeit: "Using food delivery to numb stress or avoid self-care.", healthy: "Occasional practical help or hospitality.", signal: "You are full but not restored; physical lethargy.", realMeal: "Real meal, rest, shared table, emotional honesty." },
  { name: "Search spirals (Google/AI)", type: "Habits", subtype: "Search Habit", need: "Certainty, control, competence", counterfeit: "Researching past the point of actionable wisdom to kill risk.", healthy: "Finding enough information for the next faithful step.", signal: "Every answer creates three new anxieties.", realMeal: "Decision, counsel, prayer, action under uncertainty." },
  { name: "Amazon / Target carts", type: "Habits", subtype: "Shopping", need: "Comfort, agency, freshness, status", counterfeit: "Browsing or buying to feel new, powerful, or okay.", healthy: "Buying what is actually needed with gratitude.", signal: "The wanting feels better than the having.", realMeal: "Name the ache, budget, gratitude, beauty without bingeing." },
  
  // Relational Dynamics (Fake Love)
  { name: "Love as a Drug (Regulation)", type: "Relationships", subtype: "Dynamic", need: "Internal regulation, nervous-system peace", counterfeit: "Limerence and codependency. Your partner's mood dictates yours; you consume their presence to feel level.", healthy: "A self that can be held in God, self-soothing and resting in grace.", signal: "I need your emotional state to fix mine.", realMeal: "Therapy, nervous-system care, safe friendships, and clear boundaries." },
  { name: "Love as a Mirror (Validation)", type: "Relationships", subtype: "Dynamic", need: "Worth, self-image, justification", counterfeit: "Ego-mirroring: loving how they make you feel about yourself. Performance-based parenting.", healthy: "Worth received as a given belovedness, freeing you to actually see the other.", signal: "Love warms when they make me look good, cools when they don't.", realMeal: "Confession, received righteousness, goal-free Sabbath time." },
  { name: "Love as Control (Possession)", type: "Relationships", subtype: "Dynamic", need: "Safety, predictability, protection", counterfeit: "Jealousy, monitoring, engulfment. Closeness measured by how much the other will surrender.", healthy: "Security held elsewhere, letting you open your hand to bless their separate freedom.", signal: "The other's separateness feels like a threat.", realMeal: "Sovereign sanctuary trust, limits ritual, letting others go." },
  { name: "Love as Debt (Transaction)", type: "Relationships", subtype: "Dynamic", need: "Trust, justice, relational assurance", counterfeit: "Ledgers and scorekeeping. Love advanced to be owed. Sacrifice quietly weaponized into leverage.", healthy: "Grace received—unearned and free—dissolving the relational ledger.", signal: "There's an invisible ledger, and I'm always reading it.", realMeal: "Grace meditation, unprompted anonymous giving, boundaries." },
  { name: "Love as Rescue (The Project)", type: "Relationships", subtype: "Dynamic", need: "Significance, worth, avoiding own wound", counterfeit: "The fixer dynamic. Falling for potential; managing another's life to remain needed.", healthy: "Worth not contingent on being needed, allowing you to support without engulfing.", signal: "I need you to need me.", realMeal: "Hidden local service, vocational counseling, therapy." }
];
