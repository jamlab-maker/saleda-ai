/* Saleda AI — shared interactions (no frameworks) */

function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return [...root.querySelectorAll(sel)]; }

/* ── NAV: aria-current by pathname ───────────────────────── */
(function setActiveNav() {
  const path = (location.pathname || '').split('/').pop() || 'index.html';
  const file = path === '' ? 'index.html' : path;
  $all('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').split('#')[0];
    const target = href.replace('./', '').replace('/', '') || 'index.html';
    if (target === file) a.setAttribute('aria-current', 'page');
  });
})();

/* ── REVEAL on scroll ────────────────────────────────────── */
(function revealOnScroll() {
  const els = $all('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  els.forEach(el => obs.observe(el));
})();

/* ── DEMO: tab switching (Chat/Voice) ────────────────────── */
function switchDemoTab(mode, tabsId, chatId, voiceId) {
  const tabs = $all('#' + tabsId + ' .demo-tab');
  tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed', 'false'); });
  const chat = document.getElementById(chatId);
  const voice = document.getElementById(voiceId);
  if (!chat || !voice || tabs.length < 2) return;

  if (mode === 'chat') {
    chat.classList.add('active');
    voice.classList.remove('active');
    chat.style.display = 'flex';
    voice.style.display = 'none';
    tabs[0].classList.add('active'); tabs[0].setAttribute('aria-pressed', 'true');
  } else {
    voice.classList.add('active');
    chat.classList.remove('active');
    voice.style.display = 'flex';
    chat.style.display = 'none';
    tabs[1].classList.add('active'); tabs[1].setAttribute('aria-pressed', 'true');
  }
}

/* ── DEMO: orb script ────────────────────────────────────── */
const orbStates = Object.create(null);
const orbScripts = {
  default: [
    { delay: 800, status: 'Connecting to Maya...', state: 'listening' },
    { delay: 2200, status: 'Maya is listening...', state: 'listening' },
    { delay: 4000, status: 'Maya is responding...', state: 'speaking' },
    { delay: 6500, status: 'Lead qualified — routing to specialist', state: 'listening' },
    { delay: 9200, status: 'Click orb to start', state: 'idle' }
  ]
};

function toggleOrb(key) {
  if (orbStates[key] && orbStates[key] !== 'idle') return;
  orbStates[key] = 'active';

  const orb = document.getElementById('orb' + key);
  const status = document.getElementById('orb' + key + 'Status');
  const script = orbScripts.default;

  script.forEach(step => {
    window.setTimeout(() => {
      if (status) {
        status.textContent = step.status;
        status.className = 'orb-status' + (step.state !== 'idle' ? ' active' : '');
      }
      if (orb) {
        orb.className = 'orb' + (step.state !== 'idle' ? ' ' + step.state : '');
      }
      if (step.state === 'idle') orbStates[key] = 'idle';
    }, step.delay);
  });
}

/* ── DEMO: chat simulator ────────────────────────────────── */
const aiReplies = [
  "Thank you! Based on your exposure dates, you may qualify under the Camp Lejeune Justice Act. Can I confirm your current health status?",
  "I understand. Your case looks viable — I'm logging your details and routing you to a specialist who will follow up within the hour.",
  "Great. I've captured everything. Our intake team will review your case and reach out. Is there a preferred time to call you back?"
];
let replyIndex = 0;

function handleChatKey(e, context) {
  if (e.key === 'Enter') sendChatMessage(context);
}

function sendChatMessage(context) {
  const input = document.getElementById(context + 'ChatInput');
  const panel = document.getElementById(context + 'Chat');
  if (!input || !panel || !input.value.trim()) return;
  const text = input.value.trim();
  input.value = '';

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg right';
  userMsg.innerHTML = `<div class="chat-avatar avatar-user" aria-hidden="true">U</div><div class="chat-bubble bubble-user"></div>`;
  userMsg.querySelector('.chat-bubble').textContent = text;
  panel.insertBefore(userMsg, panel.querySelector('.chat-input-bar'));

  window.setTimeout(() => {
    const reply = aiReplies[replyIndex % aiReplies.length];
    replyIndex++;
    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-msg';
    aiMsg.innerHTML = `<div class="chat-avatar avatar-ai" aria-hidden="true">M</div><div class="chat-bubble bubble-ai"></div>`;
    aiMsg.querySelector('.chat-bubble').textContent = reply;
    panel.insertBefore(aiMsg, panel.querySelector('.chat-input-bar'));
    panel.scrollTop = panel.scrollHeight;
  }, 900);

  panel.scrollTop = panel.scrollHeight;
}

/* ── MODAL demo (Talk to Maya) ───────────────────────────── */
function openDemoModal() {
  const overlay = $('#demoModal');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  const chat = $('#modalChat');
  if (chat && chat.children.length === 0) {
    chat.innerHTML = `
      <div class="demo-chat-panel active" id="modalChatInner" aria-label="Chat demo">
        <div class="chat-msg">
          <div class="chat-avatar avatar-ai" aria-hidden="true">M</div>
          <div class="chat-bubble bubble-ai">Hi! I'm Maya. What type of case are you calling about today?</div>
        </div>
        <div class="chat-input-bar">
          <input class="chat-input" type="text" placeholder="Type a message..." id="modalChatInput" aria-label="Chat input" onkeydown="handleChatKey(event,'modal')">
          <button class="chat-send-btn" onclick="sendChatMessage('modal')" aria-label="Send">↑</button>
        </div>
      </div>`;
  }
}

function closeDemoModal() {
  const overlay = $('#demoModal');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeDemoModalOutside(e) {
  if (e.target === $('#demoModal')) closeDemoModal();
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeDemoModal();
});

/* ── Accordion ───────────────────────────────────────────── */
function toggleAccordion(btn) {
  const item = btn.closest('.acc-item');
  const isOpen = item.classList.contains('open');
  $all('.acc-item').forEach(i => {
    i.classList.remove('open');
    const b = $('.acc-btn', i);
    if (b) b.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
  }
}

/* ── Integrations search ─────────────────────────────────── */
function wireIntegrationSearch() {
  const input = $('#integrationSearch');
  if (!input) return;
  const chips = $all('[data-integration]');
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    chips.forEach(c => {
      const name = (c.getAttribute('data-integration') || '').toLowerCase();
      c.classList.toggle('is-hidden', q && !name.includes(q));
    });
  });
}
wireIntegrationSearch();

/* ── Pricing toggle + calculator ─────────────────────────── */
function wirePricing() {
  const toggle = $('#billingToggle');
  const volume = $('#volume');
  const volumeOut = $('#volumeOut');
  if (!toggle && !volume) return;

  function updateBillingUI() {
    const annual = toggle ? toggle.getAttribute('data-on') === 'true' : false;
    $all('[data-price-monthly]').forEach(el => {
      const m = Number(el.getAttribute('data-price-monthly'));
      const a = Number(el.getAttribute('data-price-annual'));
      const price = annual ? a : m;
      const label = annual ? '/yr' : '/mo';
      el.textContent = '$' + price.toLocaleString();
      const unit = el.closest('.price-card')?.querySelector('[data-price-unit]');
      if (unit) unit.textContent = label;
    });
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      const on = toggle.getAttribute('data-on') === 'true';
      toggle.setAttribute('data-on', String(!on));
      toggle.setAttribute('aria-checked', String(!on));
      updateBillingUI();
    });
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });
  }

  function updateCalc() {
    if (!volume) return;
    const v = Number(volume.value);
    if (volumeOut) volumeOut.textContent = v.toLocaleString();
    const est = $('#estPrice');
    if (!est) return;
    // Simple estimator: base + per-minute (demo only)
    const base = 1200;
    const per = 0.18;
    const cost = Math.round(base + (v * per));
    est.textContent = '$' + cost.toLocaleString() + ' / mo (est.)';
  }

  if (volume) volume.addEventListener('input', updateCalc);
  updateBillingUI();
  updateCalc();
}
wirePricing();

/* ── Minimal nav scroll border change ─────────────────────── */
window.addEventListener('scroll', () => {
  const nav = $('.nav');
  if (!nav) return;
  nav.style.borderBottomColor = window.scrollY > 20 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.07)';
});

/* ── Landing: Maya feels alive on load ───────────────────── */
(function autoStartMayaOnLanding() {
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  // Only run where the hero orb exists
  const heroOrb = document.getElementById('orbHero');
  if (!heroOrb) return;

  // Let layout paint first so the animation feels intentional
  window.setTimeout(() => {
    // If user already clicked quickly, don't fight them
    if (orbStates.Hero && orbStates.Hero !== 'idle') return;
    toggleOrb('Hero');
  }, 650);
})();

