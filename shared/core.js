/* =================================================================
   CYBERACADEMY PRO — Shared Core JS  |  core.js  v2.0
   Reusable quiz engine, nav, animations, interactions
   ================================================================= */

'use strict';

/* ── UTILITY ──────────────────────────────────────────────────── */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ── SCROLL PROGRESS ──────────────────────────────────────────── */
function initScrollProgress() {
  const fill = $('.ac-scroll-progress-fill');
  const totalH = () => document.body.scrollHeight - window.innerHeight;
  window.addEventListener('scroll', () => {
    if (fill) fill.style.width = Math.min(100, (window.scrollY / totalH()) * 100) + '%';
    const btn = $('.ac-back-top');
    if (btn) btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });
}

/* ── SIDEBAR NAV BUILDER ──────────────────────────────────────── */
function buildNav(sections, navContainerId) {
  const nav = document.getElementById(navContainerId);
  if (!nav) return;
  sections.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'ac-nav-item';
    div.dataset.target = s.id;
    div.innerHTML = `
      <span class="ac-nav-num">${i + 1}</span>
      <span class="ac-nav-label">${s.label}</span>
      <svg class="ac-nav-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 10 8 14 16 6"/></svg>`;
    div.addEventListener('click', () => {
      document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    nav.appendChild(div);
  });
}

/* ── SCROLL TRACKING / NAV HIGHLIGHT ─────────────────────────── */
function initScrollTracking(sections, progressBarId, progressPctId) {
  const bar  = document.getElementById(progressBarId);
  const pct  = document.getElementById(progressPctId);
  const completed = new Set();

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.id;
      $$('.ac-nav-item').forEach(item => item.classList.toggle('active', item.dataset.target === id));
      // Mark completed when near bottom of section
      if (e.intersectionRatio > 0.8) completed.add(id);
      $$('.ac-nav-item').forEach(item => item.classList.toggle('completed', completed.has(item.dataset.target)));
    });
  }, { threshold: [0, 0.3, 0.8] });

  sections.forEach(s => { const el = document.getElementById(s.id); if (el) io.observe(el); });

  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    const p = Math.min(100, Math.round((window.scrollY / total) * 100));
    if (bar) bar.style.width = p + '%';
    if (pct) pct.textContent = p + '%';
  }, { passive: true });
}

/* ── INTERSECTION OBSERVER — FADE IN ─────────────────────────── */
function initAnimations() {
  const io = new IntersectionObserver(
    e => e.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); } }),
    { threshold: 0.07 }
  );
  $$('.ac-section-head, .ac-block').forEach(el => io.observe(el));

  // Diagram animate
  const dio = new IntersectionObserver(
    e => e.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('animated'); dio.unobserve(entry.target); } }),
    { threshold: 0.15 }
  );
  $$('.ac-diagram').forEach(el => dio.observe(el));

  // Skill meters
  const sio = new IntersectionObserver(
    e => e.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('animated'); sio.unobserve(entry.target); } }),
    { threshold: 0.5 }
  );
  $$('.ac-skill-track').forEach(el => sio.observe(el));
}

/* ── ACCORDION ────────────────────────────────────────────────── */
function initAccordions() {
  $$('.ac-acc-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.ac-acc-item');
      const panel = item?.querySelector('.ac-acc-panel');
      const isOpen = btn.classList.contains('open');
      const accordion = btn.closest('.ac-accordion');
      $$('.ac-acc-trigger', accordion).forEach(b => {
        b.classList.remove('open');
        b.closest('.ac-acc-item')?.querySelector('.ac-acc-panel')?.classList.remove('open');
      });
      if (!isOpen) { btn.classList.add('open'); panel?.classList.add('open'); }
    });
  });
}

/* ── FLIP CARDS ───────────────────────────────────────────────── */
function initFlipCards() {
  $$('.ac-flip').forEach(c => c.addEventListener('click', () => c.classList.toggle('flipped')));
}

/* ── 3D TILT ──────────────────────────────────────────────────── */
function init3DTilt() {
  $$('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = ((e.clientX - left) / width  - 0.5) * 12;
      const y = ((e.clientY - top)  / height - 0.5) * -12;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.transition = 'transform .4s ease'; });
    card.addEventListener('mouseenter', () => { card.style.transition = 'transform .05s linear'; });
  });
}

/* ── COPY BUTTONS ─────────────────────────────────────────────── */
function initCopyButtons() {
  $$('.ac-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.closest('.ac-code-wrap')?.querySelector('pre')?.textContent || '';
      navigator.clipboard?.writeText(code).then(() => {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
}

/* ── BACK TO TOP ──────────────────────────────────────────────── */
function initBackTop() {
  const btn = $('.ac-back-top');
  btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── MOBILE MENU ──────────────────────────────────────────────── */
function initMobileMenu() {
  const btn     = document.getElementById('ac-mobile-btn');
  const overlay = document.getElementById('ac-overlay');
  const sidebar = $('.ac-sidebar');
  function open()  { sidebar?.classList.add('open'); overlay?.classList.add('show'); btn?.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { sidebar?.classList.remove('open'); overlay?.classList.remove('show'); btn?.classList.remove('open'); document.body.style.overflow = ''; }
  btn?.addEventListener('click', () => sidebar?.classList.contains('open') ? close() : open());
  overlay?.addEventListener('click', close);
  $$('.ac-nav-item').forEach(item => item.addEventListener('click', () => { if (window.innerWidth <= 768) close(); }));
}

/* ── SEARCH ───────────────────────────────────────────────────── */
function initSearch(inputId) {
  const input = document.getElementById(inputId);
  input?.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    $$('.ac-nav-item').forEach(item => {
      const label = item.querySelector('.ac-nav-label')?.textContent.toLowerCase() || '';
      item.style.display = (!q || label.includes(q)) ? '' : 'none';
    });
  });
}

/* ── COUNTER ANIMATION ────────────────────────────────────────── */
function initCounters() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = +e.target.dataset.count;
      const suffix = e.target.dataset.suffix || '';
      let cur = 0;
      const step = target / 40;
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        e.target.textContent = Math.floor(cur) + suffix;
        if (cur >= target) clearInterval(t);
      }, 40);
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach(el => io.observe(el));
}

/* ── TOAST ────────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, icon = '🎉') {
  let toast = $('.ac-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'ac-toast';
    toast.innerHTML = `<span class="ac-toast-icon"></span><span class="ac-toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  toast.querySelector('.ac-toast-icon').textContent = icon;
  toast.querySelector('.ac-toast-msg').textContent  = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

/* ── KEYBOARD NAV ─────────────────────────────────────────────── */
function initKeyboardNav(sectionIds) {
  let idx = 0;
  document.addEventListener('keydown', e => {
    if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'SELECT') return;
    if (e.key === 'ArrowDown' && e.ctrlKey) { e.preventDefault(); idx = Math.min(idx + 1, sectionIds.length - 1); document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    if (e.key === 'ArrowUp'   && e.ctrlKey) { e.preventDefault(); idx = Math.max(idx - 1, 0); document.getElementById(sectionIds[idx])?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    if (e.key === 'Escape') { $('.ac-sidebar')?.classList.remove('open'); $('#ac-overlay')?.classList.remove('show'); document.getElementById('ac-mobile-btn')?.classList.remove('open'); document.body.style.overflow = ''; }
  });
}

/* ── QUIZ ENGINE ──────────────────────────────────────────────── */
function createQuiz(containerId, questions) {
  const container = document.getElementById(containerId);
  if (!container) return;
  let current = 0, score = 0, answered = false;
  const letters = ['A','B','C','D'];

  function render() {
    if (current >= questions.length) { showScore(); return; }
    const q = questions[current];
    container.innerHTML = `
      <div class="ac-quiz-prog-text">Question ${current+1} of ${questions.length}</div>
      <div class="ac-quiz-prog-track"><div class="ac-quiz-prog-fill" style="width:${(current/questions.length)*100}%"></div></div>
      <div class="ac-quiz-q">${q.q}</div>
      <div class="ac-quiz-opts">
        ${q.opts.map((o,i)=>`<button class="ac-quiz-opt" data-idx="${i}"><span class="ac-quiz-letter">${letters[i]}</span><span>${o}</span></button>`).join('')}
      </div>
      <div class="ac-quiz-fb" id="qfb"></div>
      <div class="ac-quiz-nav">
        <span style="font-size:12px;color:var(--text-3)">Score: <strong>${score}/${questions.length}</strong></span>
        <button class="ac-quiz-btn primary" id="quiz-next" style="display:none">${current<questions.length-1?'Next →':'Results →'}</button>
      </div>`;
    answered = false;
    $$('.ac-quiz-opt', container).forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const i = +btn.dataset.idx;
        const fb = document.getElementById('qfb');
        if (i === q.correct) { btn.classList.add('correct'); score++; fb.className='ac-quiz-fb correct-fb'; fb.innerHTML=`<strong>✅ Correct!</strong> ${q.explanation}`; }
        else { btn.classList.add('incorrect'); $$('.ac-quiz-opt',container)[q.correct]?.classList.add('correct'); fb.className='ac-quiz-fb incorrect-fb'; fb.innerHTML=`<strong>❌ Incorrect.</strong> ${q.explanation}`; }
        document.getElementById('quiz-next').style.display='inline-flex';
      });
    });
    document.getElementById('quiz-next')?.addEventListener('click', () => { current++; render(); });
  }

  function showScore() {
    const pct = Math.round((score/questions.length)*100);
    const emoji = pct>=80?'🏆':pct>=60?'⭐':'📚';
    const msg   = pct>=80?'Outstanding! Module mastered.':pct>=60?'Good work! Review missed topics.':'Keep studying — revisit each section.';
    container.innerHTML = `
      <div class="ac-score">
        <div class="ac-score-emoji">${emoji}</div>
        <div class="ac-score-num">${score}/${questions.length}</div>
        <div class="ac-score-label">${pct}% — ${msg}</div>
        <div class="ac-score-badges">
          ${score>=Math.ceil(questions.length*.8)?'<span class="ac-pill pill-accent">Module Complete ✓</span>':''}
          ${score>=Math.ceil(questions.length*.6)?'<span class="ac-pill pill-green">Good Understanding ✓</span>':''}
        </div>
        <button class="ac-quiz-btn primary" style="margin-top:22px" id="quiz-restart">🔄 Restart</button>
      </div>`;
    document.getElementById('quiz-restart')?.addEventListener('click', () => { current=0; score=0; render(); });
  }
  render();
}

/* ── CHAPTER TOAST TRACKER ────────────────────────────────────── */
function initChapterToasts(toastMap) {
  const completed = new Set();
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !completed.has(e.target.id) && toastMap[e.target.id]) {
        completed.add(e.target.id);
        showToast(toastMap[e.target.id]);
      }
    });
  }, { threshold: 0.9 });
  Object.keys(toastMap).forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
}

/* ── EXPORT (window) ─────────────────────────────────────────── */
window.AcademyCore = {
  buildNav, initScrollProgress, initScrollTracking, initAnimations,
  initAccordions, initFlipCards, init3DTilt, initCopyButtons,
  initBackTop, initMobileMenu, initSearch, initCounters,
  showToast, initKeyboardNav, createQuiz, initChapterToasts
};
