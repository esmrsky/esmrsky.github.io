'use strict';

const COLORS = {lime:'var(--lime)',mint:'var(--mint)',amber:'var(--amber)',lilac:'var(--lilac)',blue:'var(--blue)'};
const ICONS = {
  drop:'<path d="M12 3C10 7 5 11 5 15a7 7 0 0 0 14 0c0-4-5-8-7-12Z"/><path d="M8 15a4 4 0 0 0 4 4"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  strength:'<path d="M3 8v8m3-11v14M18 5v14m3-11v8M6 12h12"/>',
  focus:'<path d="M3 8V3h5m8 0h5v5M3 16v5h5m8 0h5v-5"/><circle cx="12" cy="12" r="3"/>',
  breath:'<path d="M3 8h12c5 0 5-6 1-6M3 12h16c5 0 5 7 1 7M3 16h9c4 0 4 6 1 6"/>',
  sunset:'<path d="M2 16h20M5 12a7 7 0 0 1 14 0M5 20h14M12 2v2M3 5l2 2m14 0 2-2"/>',
  food:'<path d="M5 3v5a3 3 0 0 0 6 0V3M8 3v18M18 21V3c-4 3-4 10 0 10"/>',
  lamp:'<path d="m8 3-4 9h16l-4-9ZM12 12v8m-4 1h8M2 16h2m16 0h2"/>',
  moon:'<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>',
  spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z"/>',
  walk:'<circle cx="14" cy="4" r="2"/><path d="m6 11 5-4 4 5 4 1M12 8l-2 7-5 6m5-6 6 6m0-14-2 4"/>',
  repeat:'<path d="M4 7h11a5 5 0 0 1 5 5M4 7l4-4M4 7l4 4m12 6H9a5 5 0 0 1-5-5m16 5-4-4m4 4-4 4"/>',
  circle:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 1v3m0 16v3M1 12h3m16 0h3"/>',
  warm:'<path d="M7 3c-5 5 5 5 0 10M12 3c-5 5 5 5 0 10m5-10c-5 5 5 5 0 10M3 16h18l-2 5H5Z"/>',
  cold:'<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M3 10l4-1-1-4m15 9-4 1 1 4M3 14l4 1-1 4m15-9-4-1 1-4"/>',
  steps:'<path d="M3 20h6v-6h6V8h6V3M3 15v5m6-6h6m0-6h6"/>',
  phone:'<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 18h4M3 3l18 18"/>'
};
const $ = (selector,root=document) => root.querySelector(selector);
const $$ = (selector,root=document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.circle}</svg>`;
const protocolById = new Map(PROTOCOLS.map(p=>[p.id,p]));

// The search includes full field notes, so mechanism and evidence terms are findable.
function matchingProtocols(query,category){
  const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return PROTOCOLS.filter(p=>{
    if(category!=='all' && p.category!==category) return false;
    const content=[p.title,p.summary,p.category,p.time,p.status,p.episode,...p.steps,p.why,p.evidence,p.caution||''].join(' ').toLowerCase();
    return words.every(word=>content.includes(word));
  });
}

let activeFilter='all';
const expandedProtocols=new Set();
function protocolDetail(p){
  return `<section class="detail-block"><h4>In the episode</h4><p>${escapeHtml(p.episode)}</p></section><section class="detail-block"><h4>Try this · practical synthesis</h4><ol>${p.steps.map(step=>`<li>${escapeHtml(step)}</li>`).join('')}</ol></section><section class="detail-block"><h4>Why it might help</h4><p>${escapeHtml(p.why)}</p></section><section class="detail-block"><h4>Evidence check</h4><p>${escapeHtml(p.evidence)}</p></section>${p.caution?`<section class="detail-block safety"><h4>Keep in mind</h4><p>${escapeHtml(p.caution)}</p></section>`:''}<div class="protocol-source"><strong>Trace the source</strong><p>${p.pages?`Research companion v2.1, pp. ${escapeHtml(p.pages)}. `:'Personal-development discussion; no dedicated PDF review. '}Transcript, non-empty lines ${escapeHtml(p.lines)}.</p>${p.link?`<p><a href="${escapeHtml(p.link)}" target="_blank" rel="noopener">${escapeHtml(p.linkLabel)} ↗</a></p>`:''}<p>Related: ${p.related.map(id=>`<a href="#p-${id}" data-protocol="${id}">${escapeHtml(protocolById.get(id).title)}</a>`).join(' · ')}</p></div>`;
}
function renderProtocols(){
  const matches=matchingProtocols($('#protocol-search').value,activeFilter);
  $('#protocol-grid').innerHTML=matches.map(p=>`<details class="protocol-card" id="p-${p.id}" data-protocol-id="${p.id}" style="--card-color:${COLORS[p.color]}"${expandedProtocols.has(p.id)?' open':''}><summary><div class="card-eyebrow"><span class="protocol-icon">${icon(p.icon)}</span><span>${p.number==='EXTENSION'?'PRACTICAL EXTENSION':`ANCHOR ${p.number}`}</span></div><h3>${escapeHtml(p.title)}</h3><p class="card-summary">${escapeHtml(p.summary)}</p><div class="card-bottom"><div><span class="pill ${p.tone}">${escapeHtml(p.status)}</span><div class="card-meta">${escapeHtml(p.time)}</div></div><span class="expand" aria-hidden="true">+</span></div><span class="card-action"><span class="when-closed">Explore protocol</span><span class="when-open">Close protocol</span></span></summary><div class="protocol-detail">${protocolDetail(p)}</div></details>`).join('');
  $$('.protocol-card').forEach(card=>card.addEventListener('toggle',()=>{
    if(!card.isConnected) return;
    const id=card.dataset.protocolId;
    if(card.open) expandedProtocols.add(id); else expandedProtocols.delete(id);
  }));
  $('#result-count').textContent=`${matches.length} of ${PROTOCOLS.length} field notes${activeFilter==='all'?'':` · ${activeFilter}`}`;
  $('#no-results').hidden=matches.length!==0;
}
// Capture open states before a search re-renders the library (toggle events are queued).
function refreshProtocols(){
  finishCardAnimations();
  $$('.protocol-card').forEach(card=>{if(card.open) expandedProtocols.add(card.dataset.protocolId);else expandedProtocols.delete(card.dataset.protocolId);});
  renderProtocols();
}
$('#protocol-search').addEventListener('input',refreshProtocols);
$$('.filter').forEach(button=>button.addEventListener('click',()=>{
  activeFilter=button.dataset.filter;
  $$('.filter').forEach(b=>{b.classList.toggle('selected',b===button);b.setAttribute('aria-pressed',String(b===button));});
  refreshProtocols();
}));
$('#clear-search').addEventListener('click',()=>{
  $('#protocol-search').value='';
  $('[data-filter="all"]').click();
  $('#protocol-search').focus();
});
function openProtocol(id,updateHistory=true){
  if(!protocolById.has(id)) return;
  if(!$(`#p-${id}`)){
    $('#protocol-search').value='';
    $('[data-filter="all"]').click();
  }
  const card=$(`#p-${id}`);
  expandedProtocols.add(id);
  card.open=true;
  if(updateHistory) history.pushState(null,'',`#p-${id}`);
  card.scrollIntoView({block:'start'});
  $('summary',card).focus({preventScroll:true});
}
document.addEventListener('click',event=>{
  const trigger=event.target.closest('[data-protocol]');
  if(!trigger || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openProtocol(trigger.dataset.protocol);
});
function syncProtocolHash(){
  const id=location.hash.startsWith('#p-')?location.hash.slice(3):null;
  if(protocolById.has(id)) openProtocol(id,false);
}
window.addEventListener('hashchange',syncProtocolHash);

function setTheme(theme){
  document.documentElement.dataset.theme=theme;
  const isLight=theme==='light';
  $('#theme-toggle').innerHTML=`<span aria-hidden="true">${isLight?'☾':'☼'}</span> ${isLight?'Dark mode':'Light mode'}`;
  $('#theme-toggle').setAttribute('aria-label',`Switch to ${isLight?'dark':'light'} mode`);
  $('meta[name="theme-color"]').setAttribute('content',isLight?'#f6f7ef':'#101715');
}
$('#theme-toggle').addEventListener('click',()=>{
  const theme=document.documentElement.dataset.theme==='light'?'dark':'light';
  setTheme(theme);
  try{localStorage.setItem('brain-body-theme',theme);}catch{}
});
setTheme(document.documentElement.dataset.theme==='light'?'light':'dark');

function selectPhase(key){
  const phase=PHASES[key];
  $$('.day-tab').forEach(button=>{const selected=button.dataset.phase===key;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));});
  $('#phase-marker').setAttribute('x1',phase.marker);
  $('#phase-marker').setAttribute('x2',phase.marker);
  $('#phase-content').innerHTML=`<p class="eyebrow" style="color:${COLORS[phase.color]}">${phase.label}</p><h3>${phase.title}</h3><p>${phase.description}</p><div class="phase-links">${phase.ids.map(id=>`<a href="#p-${id}" data-protocol="${id}" class="text-link">${escapeHtml(protocolById.get(id).title)} <span>↗</span></a>`).join('')}</div>`;
}
$$('.day-tab').forEach(button=>button.addEventListener('click',()=>selectPhase(button.dataset.phase)));

let motionPaused=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function setMotion(paused){
  motionPaused=paused;
  document.documentElement.classList.toggle('motion-paused',paused);
  $$('.motion-control').forEach(button=>{
    button.setAttribute('aria-pressed',String(paused));
    button.textContent=button.id==='motion-mobile'?(paused?'Motion off':'Motion on'):(paused?'Resume ambient motion  ▷':'Pause ambient motion  Ⅱ');
  });
}
$$('.motion-control').forEach(button=>button.addEventListener('click',()=>setMotion(!motionPaused)));
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>setMotion(event.matches));

// This is a short, user-started demonstration. Durations are cues, not dose claims.
const BREATH_PHASES=[{label:'Inhale gently',sub:'Through your nose',duration:3000,scale:1},{label:'A small top-up',sub:'One more gentle nasal inhale',duration:1000,scale:1.1},{label:'Exhale slowly',sub:'Let it leave through your mouth',duration:6000,scale:.72}];
let breathTimer=null;
let breathRunning=false;
let breathStep=0;
function stopBreathing(completed=false){
  clearTimeout(breathTimer);
  breathTimer=null;
  breathRunning=false;
  $('#breath-start').innerHTML=`${completed?'Try again':'Try 3 gentle cycles'} <span>↗</span>`;
  $('#breath-label').textContent=completed?'Let breathing be natural.':'Make a little space.';
  $('#breath-sub').textContent=completed?'Notice how you feel. No score to chase.':'A guided demonstration';
  $('#breath-orb').style.transform='scale(.82)';
  $('#breath-orb').style.transition='transform 1s ease';
  $$('.breath-steps span').forEach(step=>step.classList.remove('current'));
  $('#breath-status').textContent=completed?'Three cycles complete. Return to natural breathing.':'Breathing demonstration stopped.';
}
function nextBreathStep(){
  if(breathStep>=9){stopBreathing(true);return;}
  const phaseIndex=breathStep%3;
  const phase=BREATH_PHASES[phaseIndex];
  $('#breath-label').textContent=phase.label;
  $('#breath-sub').textContent=`${phase.sub} · ${Math.floor(breathStep/3)+1} of 3`;
  $('#breath-status').textContent=`${phase.label}. ${phase.sub}. Cycle ${Math.floor(breathStep/3)+1} of 3.`;
  const orb=$('#breath-orb');
  orb.style.transition=`transform ${phase.duration}ms ease-in-out`;
  orb.style.transform=`scale(${phase.scale})`;
  $$('.breath-steps span').forEach((step,index)=>step.classList.toggle('current',index===phaseIndex));
  breathStep++;
  breathTimer=setTimeout(nextBreathStep,phase.duration);
}
$('#breath-start').addEventListener('click',()=>{
  if(breathRunning){stopBreathing();return;}
  breathRunning=true;breathStep=0;
  $('#breath-start').textContent='Stop demonstration';
  nextBreathStep();
});
$('.breath-panel').addEventListener('toggle',()=>{if(!$('.breath-panel').open && breathRunning) stopBreathing();});
document.addEventListener('visibilitychange',()=>{if(document.hidden && breathRunning) stopBreathing();});
if('IntersectionObserver' in window){
  const breathingVisibility=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting && breathRunning) stopBreathing();},{threshold:.15});
  breathingVisibility.observe($('.breath-stage'));
}

function updateArousal(){
  const value=Number($('#arousal-slider').value);
  // Same cubic Bezier geometry as the drawn curve; this does not estimate physiology.
  const points=value<=50?[[35,182],[100,182],[110,47],[210,47]]:[[210,47],[310,47],[320,182],[385,182]];
  const t=value<=50?value/50:(value-50)/50;
  const bezier=axis=>((1-t)**3*points[0][axis]+3*(1-t)**2*t*points[1][axis]+3*(1-t)*t*t*points[2][axis]+t**3*points[3][axis]);
  $('#arousal-dot').setAttribute('cx',bezier(0).toFixed(2));
  $('#arousal-dot').setAttribute('cy',bezier(1).toFixed(2));
  const state=value<30?['Low','Not enough activation.','Try a brief movement break, daylight if appropriate for your schedule, or a smaller, clearer first step. If you are sleep-deprived, protect recovery.']:value>70?['High','More energy than the task can use.','Pause, try a comfortable long exhale, and reduce competing demands. An upsetting message may not need an immediate answer.']:['Balanced','Engaged, with room to think.','Choose one task. Make genuine attempts, notice errors, and keep going at a manageable level.'];
  $('#arousal-value').textContent=state[0];
  $('#arousal-title').textContent=state[1];
  $('#arousal-advice').textContent=state[2];
  $('#arousal-slider').setAttribute('aria-valuetext',`${state[0]} alertness in the illustrative model`);
}
$('#arousal-slider').addEventListener('input',updateArousal);

$('#training-week').innerHTML=TRAINING.map(day=>`<details class="training-day" style="--day-color:${COLORS[day.color]}"><summary><small>${day.day}</small><strong>${day.name}</strong><span>${day.meta}</span><span class="expand" aria-hidden="true">+</span></summary><div class="training-detail"><h3>${day.title}</h3><p>${day.description}</p></div></details>`).join('');

// Deep-note HTML is curated static source content, never user input.
$('#deeper-grid').innerHTML=DEEP_NOTES.map(note=>`<details class="deep-note${note.featured?' featured':''}" id="note-${note.id}"${note.featured?' open':''}><summary><span class="pill ${note.tone}">${note.label}</span><h3>${note.title}</h3><p class="deep-preview">${note.preview}</p><span class="expand" aria-hidden="true">+</span></summary><div class="deep-content">${note.body.map(paragraph=>paragraph.startsWith('<div')?paragraph:`<p>${paragraph}</p>`).join('')}<p class="source-line">${note.source}${note.links?'<br>'+note.links.map(([label,url])=>`<a href="${url}" target="_blank" rel="noopener">${label} ↗</a>`).join(' · '):''}</p></div></details>`).join('');
$('#episode-grid').innerHTML=RECENT_EPISODES.map(episode=>`<details class="episode-card" id="episode-${episode.id}" style="--episode-color:${COLORS[episode.color]};--card-color:${COLORS[episode.color]}"><summary><div class="episode-meta"><span class="pill">${escapeHtml(episode.format)}</span><time datetime="${episode.date}">${episode.displayDate}</time></div><p class="episode-guest">${escapeHtml(episode.guest)} · ${escapeHtml(episode.topic)}</p><h3>${escapeHtml(episode.title)}</h3><p>${escapeHtml(episode.summary)}</p><span class="expand" aria-hidden="true">+</span><span class="card-action"><span class="when-closed">Explore 3 takeaways</span><span class="when-open">Close takeaways</span></span></summary><div class="episode-body"><p class="eyebrow">TRY THIS · PRACTICAL SYNTHESIS</p><ol class="episode-steps">${episode.steps.map(([title,body],i)=>`<li><h4>0${i+1} / ${escapeHtml(title)}</h4><p>${escapeHtml(body)}</p></li>`).join('')}</ol><p class="episode-check"><strong>Evidence & context</strong>${escapeHtml(episode.check)}</p><p class="fine-print">${escapeHtml(episode.chapters)}. Chapter times can shift with inserted ads.</p><p class="episode-links">${episode.links.map(([label,url])=>`<a href="${escapeHtml(url)}" target="_blank" rel="noopener">${escapeHtml(label)} ↗</a>`).join('')}</p></div></details>`).join('');
function revealLinkedCard(id){
  let target=document.getElementById(id);
  while(target){
    if(target.tagName==='DETAILS') target.open=true;
    target=target.parentElement;
  }
}
function revealHashCard(){revealLinkedCard(location.hash.slice(1));}
window.addEventListener('hashchange',revealHashCard);
document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  if(link && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) revealLinkedCard(link.getAttribute('href').slice(1));
});
revealHashCard();
$('#source-links').innerHTML=SOURCES.map(source=>`<a href="${source.url}" target="_blank" rel="noopener">${source.title} ↗<small>${source.detail}</small></a>`).join('');

let questionIndex=0;
function renderQuestion(){
  const question=QUIZ[questionIndex];
  $('#quiz-container').innerHTML=`<p class="quiz-question">${escapeHtml(question.q)}</p><button class="button" id="reveal-answer" aria-expanded="false" aria-controls="quiz-answer">Reveal the answer <span>↓</span></button><div class="quiz-answer" id="quiz-answer" hidden><p>${escapeHtml(question.a)}</p></div>`;
  $('#quiz-count').textContent=`${questionIndex+1} / ${QUIZ.length}`;
  $('#quiz-prev').disabled=questionIndex===0;
  $('#quiz-next').disabled=questionIndex===QUIZ.length-1;
  $('#reveal-answer').addEventListener('click',event=>{
    const answer=$('#quiz-answer');
    answer.hidden=!answer.hidden;
    event.currentTarget.setAttribute('aria-expanded',String(!answer.hidden));
    event.currentTarget.innerHTML=answer.hidden?'Reveal the answer <span>↓</span>':'Hide the answer <span>↑</span>';
  });
}
$('#quiz-prev').addEventListener('click',()=>{if(questionIndex>0){questionIndex--;renderQuestion();}});
$('#quiz-next').addEventListener('click',()=>{if(questionIndex<QUIZ.length-1){questionIndex++;renderQuestion();}});
let starterBeforePrint=null;
window.addEventListener('beforeprint',()=>{finishCardAnimations();const plan=$('.starter-plan');starterBeforePrint=plan.open;plan.open=true;});
window.addEventListener('afterprint',()=>{if(starterBeforePrint!==null) $('.starter-plan').open=starterBeforePrint;starterBeforePrint=null;});
$('#print-guide').addEventListener('click',()=>window.print());

// Mark the current section without trapping normal anchor navigation.
if('IntersectionObserver' in window){
  const sectionObserver=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(entry.isIntersecting){
        $$('.nav-link').forEach(link=>{
          const active=link.getAttribute('href')===`#${entry.target.id}`;
          link.classList.toggle('active',active);
          if(active) link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
        });
      }
    }
  },{rootMargin:'-15% 0px -65% 0px',threshold:0});
  $$('.section').forEach(section=>sectionObserver.observe(section));
}

renderProtocols();
selectPhase('morning');

setMotion(motionPaused);
updateArousal();
renderQuestion();
syncProtocolHash();

// Animate the card's measured height in both directions, including quick reversals.
const cardAnimations=new WeakMap();
function animateCard(card){
  const previous=cardAnimations.get(card);
  const expanding=previous?!previous.expanding:!card.open;
  const from=card.getBoundingClientRect().height;
  previous?.animation.cancel();
  card.style.height='';
  card.open=expanding;
  const to=card.getBoundingClientRect().height;
  card.open=true;
  const summary=card.firstElementChild;
  summary.setAttribute('aria-expanded',String(expanding));
  card.classList.add('card-transitioning');
  const animation=card.animate([{height:`${from}px`},{height:`${to}px`}],{
    duration:Math.min(440,280+Math.abs(to-from)*.12),easing:'cubic-bezier(.22,1,.36,1)',fill:'both'
  });
  const state={animation,expanding,finish(){
    if(cardAnimations.get(card)!==state) return;
    card.open=expanding;
    animation.cancel();
    card.classList.remove('card-transitioning');
    summary.removeAttribute('aria-expanded');
    cardAnimations.delete(card);
  }};
  cardAnimations.set(card,state);
  animation.onfinish=state.finish;
}
document.addEventListener('click',event=>{
  const summary=event.target.closest('summary');
  const card=summary?.parentElement;
  if(!card || card.tagName!=='DETAILS' || event.defaultPrevented || event.target.closest('a,button,input')) return;
  if(!card.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('motion-paused')) return;
  event.preventDefault();
  animateCard(card);
});
function finishCardAnimations(){
  $$('details').forEach(card=>cardAnimations.get(card)?.finish());
}
window.addEventListener('resize',finishCardAnimations);
$$('.motion-control').forEach(button=>button.addEventListener('click',finishCardAnimations));
window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',finishCardAnimations);
