/* =========================================================
   MODULE 1 — Active Directory Fundamentals
   Premium Learning Platform  |  script.js
   ========================================================= */

'use strict';

/* ── 1. CONSTANTS ─────────────────────────────────────── */
const SECTIONS = [
  { id: 'hero',         label: 'Module Introduction',      icon: '🏠' },
  { id: 'what-is-ad',  label: 'What is Active Directory',  icon: '🌐' },
  { id: 'domain-ctrl', label: 'Domain Controller',         icon: '🖥️' },
  { id: 'ad-objects',  label: 'AD Objects',                icon: '📦' },
  { id: 'auth-flow',   label: 'Authentication',            icon: '🔐' },
  { id: 'login-proc',  label: 'How Login Works',           icon: '🔑' },
  { id: 'local-vs-dom',label: 'Local vs Domain User',      icon: '👤' },
  { id: 'gpo',         label: 'Group Policy (GPO)',         icon: '📋' },
  { id: 'ntds',        label: 'NTDS.dit Database',         icon: '🗄️' },
  { id: 'quiz',        label: 'Knowledge Check',           icon: '🧠' },
];

const QUIZ_DATA = [
  {
    q: "What is the primary role of Active Directory in a Windows enterprise environment?",
    opts: [
      "Hosting websites and web services",
      "Managing identities, authentication, and access control centrally",
      "Providing file storage for users",
      "Monitoring network traffic"
    ],
    correct: 1,
    explanation: "Active Directory is a directory service that centrally manages users, computers, groups, and policies — enabling authentication (who are you?) and authorization (what can you access?) across the enterprise."
  },
  {
    q: "Where does a Domain Controller store all Active Directory data?",
    opts: ["SAM database", "Registry", "NTDS.dit", "Active Directory cache"],
    correct: 2,
    explanation: "NTDS.dit (NT Directory Services Database) is the primary database on a Domain Controller that stores all AD objects — users, computers, groups, password hashes, and more."
  },
  {
    q: "Which protocol does Windows prefer for Kerberos authentication?",
    opts: ["NTLM", "LDAP", "Kerberos v5", "RADIUS"],
    correct: 2,
    explanation: "Kerberos v5 is the preferred authentication protocol in Active Directory environments since Windows 2000. NTLM is used as a fallback when Kerberos is not available."
  },
  {
    q: "What is a domain user different from a local user?",
    opts: [
      "Domain users can only log in at one computer",
      "Domain users are authenticated by the Domain Controller and can log into any domain-joined machine",
      "Domain users have no password",
      "Domain users exist only in workgroups"
    ],
    correct: 1,
    explanation: "Domain users are authenticated by the DC and stored in AD, so they can log into any domain-joined machine. Local users only exist in the local SAM database of a single computer."
  },
  {
    q: "An attacker performs an AS-REP Roasting attack. What AD misconfiguration are they exploiting?",
    opts: [
      "Weak Group Policy",
      "Users with 'Do not require Kerberos pre-authentication' enabled",
      "Open LDAP port 389",
      "Unrestricted RDP access"
    ],
    correct: 1,
    explanation: "AS-REP Roasting targets accounts with Kerberos pre-authentication disabled. The attacker requests an AS-REP ticket without credentials and then offline-cracks the encrypted portion using the user's password hash."
  },
  {
    q: "What does GPO stand for and what is it used for?",
    opts: [
      "General Policy Object — for firewall rules",
      "Group Policy Object — for centrally applying settings to users and computers",
      "Global Protocol Option — for routing",
      "Group Protocol Override — for bypassing auth"
    ],
    correct: 1,
    explanation: "Group Policy Objects (GPO) allow administrators to centrally enforce security settings, software installations, scripts, and configurations across users and computers in an AD environment."
  },
  {
    q: "In Kerberos authentication, what is a TGT?",
    opts: [
      "Token for Gateway Transfer",
      "Ticket Granting Ticket — issued by the KDC, used to request service tickets",
      "Trusted Group Token",
      "Transport Gateway Ticket"
    ],
    correct: 1,
    explanation: "A Ticket Granting Ticket (TGT) is issued by the KDC's Authentication Service after successful login. The client presents the TGT to the Ticket Granting Service to obtain service-specific tickets without re-entering credentials."
  },
  {
    q: "What process on Windows handles authentication before passing credentials to the DC?",
    opts: ["svchost.exe", "winlogon.exe", "LSASS (Local Security Authority Subsystem Service)", "csrss.exe"],
    correct: 2,
    explanation: "LSASS (lsass.exe) is the gatekeeper process that handles authentication on Windows. It receives credentials from Winlogon, negotiates Kerberos/NTLM, and stores cached credentials. It's a prime target for credential dumping attacks."
  }
];

/* ── 2. DOM HELPERS ───────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── 3. SIDEBAR NAV BUILD ─────────────────────────────── */
function buildNav() {
  const nav = $('#sidebar-nav');
  if (!nav) return;
  SECTIONS.forEach((s, i) => {
    const li = document.createElement('div');
    li.className = 'nav-item';
    li.dataset.target = s.id;
    li.innerHTML = `
      <span class="nav-num">${i + 1}</span>
      <span class="nav-label">${s.label}</span>
      <svg class="nav-check" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5"
           stroke-linecap="round" stroke-linejoin="round" style="color:var(--green-500)">
        <polyline points="4 10 8 14 16 6"/>
      </svg>`;
    li.addEventListener('click', () => {
      const target = document.getElementById(s.id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    nav.appendChild(li);
  });
}

/* ── 4. SCROLL TRACKING ───────────────────────────────── */
function initScrollTracking() {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progressBar = $('#progress-bar');
  const progressPct = $('#progress-pct');
  const navItems = $$('.nav-item');
  const completedSections = new Set();

  const sectionEls = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const pct = Math.min(100, Math.round((scrolled / totalHeight) * 100));
    if (progressBar) progressBar.style.width = pct + '%';
    if (progressPct) progressPct.textContent = pct + '%';

    // Determine active section
    let activeId = SECTIONS[0].id;
    sectionEls.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.45) activeId = el.id;
    });

    navItems.forEach(item => {
      const target = item.dataset.target;
      item.classList.toggle('active', target === activeId);

      // Mark as completed when scrolled past
      const el = document.getElementById(target);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < window.innerHeight * 0.2) {
          completedSections.add(target);
        }
      }
      item.classList.toggle('completed', completedSections.has(target));
    });

    // Back to top
    const btn = $('#back-top');
    if (btn) btn.classList.toggle('show', scrolled > 400);
  }, { passive: true });
}

/* ── 5. INTERSECTION OBSERVER — SECTION ANIMATIONS ───── */
function initAnimations() {
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.08 }
  );
  $$('.section-header, .content-block').forEach(el => io.observe(el));

  // Diagram animation observer
  const diagIO = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
        diagIO.unobserve(e.target);
      }
    }),
    { threshold: 0.15 }
  );
  $$('.diagram-wrap').forEach(el => diagIO.observe(el));
}

/* ── 6. ACCORDION ─────────────────────────────────────── */
function initAccordions() {
  $$('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const panel = item.querySelector('.accordion-panel');
      const isOpen = btn.classList.contains('open');

      // Close all in same accordion
      const accordion = btn.closest('.accordion');
      $$('.accordion-trigger', accordion).forEach(b => {
        b.classList.remove('open');
        b.closest('.accordion-item').querySelector('.accordion-panel')
          ?.classList.remove('open');
      });

      if (!isOpen) {
        btn.classList.add('open');
        panel?.classList.add('open');
      }
    });
  });
}

/* ── 7. FLIP CARDS ────────────────────────────────────── */
function initFlipCards() {
  $$('.flip-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('flipped'));
  });
}

/* ── 8. QUIZ ──────────────────────────────────────────── */
function initQuiz() {
  const container = $('#quiz-container');
  if (!container) return;

  let current = 0, score = 0, answered = false;

  function render() {
    if (current >= QUIZ_DATA.length) {
      showScore();
      return;
    }
    const q = QUIZ_DATA[current];
    const letters = ['A', 'B', 'C', 'D'];
    container.innerHTML = `
      <div class="quiz-progress-text">Question ${current + 1} of ${QUIZ_DATA.length}</div>
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${((current)/QUIZ_DATA.length)*100}%"></div>
      </div>
      <div class="quiz-question-text">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((opt, i) => `
          <button class="quiz-option" data-idx="${i}">
            <span class="quiz-opt-letter">${letters[i]}</span>
            <span>${opt}</span>
          </button>`).join('')}
      </div>
      <div class="quiz-feedback" id="qfb"></div>
      <div class="quiz-nav">
        <span class="muted" style="font-size:13px">Score: <strong>${score}/${QUIZ_DATA.length}</strong></span>
        <button class="quiz-btn quiz-btn-primary" id="quiz-next" style="display:none">
          ${current < QUIZ_DATA.length - 1 ? 'Next Question →' : 'See Results →'}
        </button>
      </div>`;

    answered = false;
    $$('.quiz-option', container).forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const idx = +btn.dataset.idx;
        const fb = $('#qfb', container);
        if (idx === q.correct) {
          btn.classList.add('correct');
          score++;
          fb.className = 'quiz-feedback correct-fb';
          fb.innerHTML = `<strong>✅ Correct!</strong> ${q.explanation}`;
        } else {
          btn.classList.add('incorrect');
          $$('.quiz-option', container)[q.correct].classList.add('correct');
          fb.className = 'quiz-feedback incorrect-fb';
          fb.innerHTML = `<strong>❌ Incorrect.</strong> ${q.explanation}`;
        }
        const nextBtn = $('#quiz-next', container);
        if (nextBtn) nextBtn.style.display = 'inline-flex';
      });
    });

    $('#quiz-next', container)?.addEventListener('click', () => {
      current++;
      render();
    });
  }

  function showScore() {
    const pct = Math.round((score / QUIZ_DATA.length) * 100);
    let emoji = pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '📚';
    let msg   = pct >= 80 ? 'Excellent! You have mastered the basics.' :
                pct >= 60 ? 'Good work! Review the missed questions.' :
                            'Keep studying — go back and review each section.';
    container.innerHTML = `
      <div class="quiz-score-display">
        <div style="font-size:56px;margin-bottom:8px">${emoji}</div>
        <div class="quiz-score-num">${score}/${QUIZ_DATA.length}</div>
        <div class="quiz-score-label">${pct}% — ${msg}</div>
        <div class="quiz-score-badges">
          ${score >= 6 ? '<span class="tag-pill pill-green">AD Fundamentals ✓</span>' : ''}
          ${score >= 4 ? '<span class="tag-pill pill-blue">Authentication ✓</span>' : ''}
          ${score >= 2 ? '<span class="tag-pill pill-indigo">Security Awareness ✓</span>' : ''}
        </div>
        <button class="quiz-btn quiz-btn-primary" style="margin-top:24px" id="quiz-restart">
          🔄 Restart Quiz
        </button>
      </div>`;
    $('#quiz-restart', container)?.addEventListener('click', () => {
      current = 0; score = 0; render();
    });
  }

  render();
}

/* ── 9. SEARCH ────────────────────────────────────────── */
function initSearch() {
  const input = $('#sidebar-search');
  if (!input) return;
  input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    $$('.nav-item').forEach(item => {
      const label = item.querySelector('.nav-label')?.textContent.toLowerCase() || '';
      item.style.display = (!q || label.includes(q)) ? '' : 'none';
    });
  });
}

/* ── 10. BACK TO TOP ──────────────────────────────────── */
function initBackTop() {
  const btn = $('#back-top');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── 11. AUTH FLOW ANIMATION ──────────────────────────── */
function initAuthFlowAnim() {
  const svg = document.getElementById('auth-flow-svg');
  if (!svg) return;

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        startAuthAnim();
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  io.observe(svg);
}

function startAuthAnim() {
  // Packets cycle through steps
  const packets = $$('.auth-packet');
  let step = 0;
  const total = packets.length;

  function showStep() {
    packets.forEach((p, i) => {
      p.style.opacity = i === step ? '1' : '0';
      if (i === step) {
        p.style.animation = 'none';
        p.offsetHeight; // reflow
        p.style.animation = 'movePacket 1.6s ease-in-out forwards';
      }
    });
    step = (step + 1) % total;
  }

  // Use CSS class-based approach instead
  let idx = 0;
  function cycleStep() {
    const arrows = $$('.flow-arrow');
    const nodes  = $$('.flow-node');
    arrows.forEach(a => a.classList.remove('active-arrow'));
    nodes.forEach(n  => n.classList.remove('active-node'));
    if (arrows[idx]) arrows[idx].classList.add('active-arrow');
    if (nodes[idx])  nodes[idx].classList.add('active-node');
    if (nodes[idx+1]) nodes[idx+1].classList.add('active-node');
    idx = (idx + 1) % (arrows.length || 1);
  }

  setInterval(cycleStep, 1400);
  cycleStep();
}

/* ── 12. KERBEROS SVG TICKER ──────────────────────────── */
function initKerberosTicker() {
  const svg = document.getElementById('kerberos-svg');
  if (!svg) return;
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      // Trigger draw animation
      $$('.kerb-line', svg).forEach((line, i) => {
        setTimeout(() => line.classList.add('drawn'), i * 300);
      });
      io.unobserve(svg);
    }
  }, { threshold: 0.2 });
  io.observe(svg);
}

/* ── 13. TYPING ANIMATION ─────────────────────────────── */
function initTypingAnims() {
  $$('.typing-anim').forEach(el => {
    const text = el.dataset.text || el.textContent;
    el.textContent = '';
    el.dataset.originalText = text;

    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        typeText(el, text);
        io.unobserve(el);
      }
    }, { threshold: 0.5 });
    io.observe(el);
  });
}

function typeText(el, text, speed = 35) {
  let i = 0;
  el.style.borderRight = '2px solid currentColor';
  const timer = setInterval(() => {
    if (i < text.length) {
      el.textContent += text[i++];
    } else {
      clearInterval(timer);
      setTimeout(() => { el.style.borderRight = 'none'; }, 600);
    }
  }, speed);
}

/* ── 14. HOVER 3D TILT ────────────────────────────────── */
function init3DTilt() {
  $$('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = ((e.clientX - left) / width  - 0.5) * 14;
      const y = ((e.clientY - top)  / height - 0.5) * -14;
      card.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .4s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .05s linear';
    });
  });
}

/* ── 15. HIGHLIGHT ACTIVE SECTION IN TOC ─────────────── */
function initHighlightObserver() {
  const config = { rootMargin: '-30% 0px -60% 0px' };
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        $$('.nav-item').forEach(item => {
          item.classList.toggle('active', item.dataset.target === id);
        });
      }
    });
  }, config);
  SECTIONS.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) io.observe(el);
  });
}

/* ── 16. OBJECTS DIAGRAM HOVER ────────────────────────── */
function initObjDiagramHover() {
  $$('[data-obj-node]').forEach(node => {
    node.addEventListener('mouseenter', () => {
      const id = node.dataset.objNode;
      const desc = document.getElementById('obj-desc-' + id);
      $$('.obj-desc-panel').forEach(p => p.style.display = 'none');
      if (desc) desc.style.display = 'block';
    });
  });
}

/* ── 17. COUNTER ANIMATION ────────────────────────────── */
function initCounters() {
  $$('[data-count]').forEach(el => {
    const io = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        const target = +el.dataset.count;
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          current = Math.min(current + step, target);
          el.textContent = el.dataset.suffix
            ? Math.floor(current) + el.dataset.suffix
            : Math.floor(current);
          if (current >= target) clearInterval(timer);
        }, 40);
        io.unobserve(el);
      }
    }, { threshold: 0.5 });
    io.observe(el);
  });
}

/* ── 18. AD TREE ANIMATION ────────────────────────────── */
function initADTree() {
  const svg = document.getElementById('ad-tree-svg');
  if (!svg) return;
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      $$('.tree-edge', svg).forEach((edge, i) => {
        setTimeout(() => edge.classList.add('drawn'), i * 180);
      });
      $$('.tree-node-g', svg).forEach((node, i) => {
        setTimeout(() => node.classList.add('shown'), i * 200);
      });
      io.unobserve(svg);
    }
  }, { threshold: 0.2 });
  io.observe(svg);
}

/* ── 19. CSS ADDITIONS FOR JS-DRIVEN STYLES ───────────── */
function injectDynamicCSS() {
  const style = document.createElement('style');
  style.textContent = `
    .flow-arrow { transition: stroke .3s, opacity .3s; }
    .flow-arrow.active-arrow { stroke: #2563EB !important; filter: drop-shadow(0 0 4px rgba(37,99,235,.5)); }
    .flow-node  { transition: all .3s; }
    .flow-node.active-node rect, .flow-node.active-node circle {
      stroke: #2563EB !important;
      filter: drop-shadow(0 0 6px rgba(37,99,235,.4));
    }
    .flow-node.active-node text { fill: #1E40AF !important; font-weight: 700; }
    .tree-edge  { stroke-dasharray: 300; stroke-dashoffset: 300; transition: stroke-dashoffset .6s ease; }
    .tree-edge.drawn { stroke-dashoffset: 0; }
    .tree-node-g { opacity: 0; transform: scale(0.8); transform-origin: center; transition: all .4s ease; }
    .tree-node-g.shown { opacity: 1; transform: scale(1); }
    .kerb-line { stroke-dasharray: 400; stroke-dashoffset: 400; transition: stroke-dashoffset .7s ease; }
    .kerb-line.drawn { stroke-dashoffset: 0; }
  `;
  document.head.appendChild(style);
}

/* ── 20. INIT ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectDynamicCSS();
  buildNav();
  buildMobileMenu();
  initScrollTracking();
  initAnimations();
  initAccordions();
  initFlipCards();
  initSearch();
  initBackTop();
  initAuthFlowAnim();
  initKerberosTicker();
  initTypingAnims();
  init3DTilt();
  initHighlightObserver();
  initObjDiagramHover();
  initCounters();
  initADTree();
  initSkillMeters();
  initChapterToast();
  initQuiz();
  initKeyboardNav();
});

/* ── 21. MOBILE SIDEBAR ────────────────────────────────── */
function buildMobileMenu() {
  // Create hamburger button
  const btn = document.createElement('button');
  btn.className = 'mobile-menu-btn';
  btn.id = 'mobile-menu-btn';
  btn.innerHTML = '<span></span><span></span><span></span>';
  btn.setAttribute('aria-label', 'Toggle navigation');
  document.body.appendChild(btn);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  overlay.id = 'sidebar-overlay';
  document.body.appendChild(overlay);

  const sidebar = document.querySelector('.sidebar');

  function openMenu() {
    sidebar?.classList.add('open');
    overlay.classList.add('show');
    btn.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    sidebar?.classList.remove('open');
    overlay.classList.remove('show');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }

  btn.addEventListener('click', () => {
    if (sidebar?.classList.contains('open')) closeMenu();
    else openMenu();
  });
  overlay.addEventListener('click', closeMenu);

  // Close on nav item click (mobile)
  $$('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeMenu();
    });
  });
}

/* ── 22. SKILL METERS ─────────────────────────────────── */
function initSkillMeters() {
  const tracks = $$('.skill-track');
  if (!tracks.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('animated');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  tracks.forEach(t => io.observe(t));
}

/* ── 23. CHAPTER TOAST ─────────────────────────────────── */
function initChapterToast() {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'chapter-toast';
  toast.id = 'chapter-toast';
  toast.innerHTML = '<span class="chapter-toast-icon">🎉</span><span id="chapter-toast-msg"></span>';
  document.body.appendChild(toast);

  const completedSet = new Set();
  const chapterMessages = {
    'domain-ctrl':  'Domain Controller mastered!',
    'ad-objects':   'AD Objects unlocked!',
    'auth-flow':    'Authentication understood!',
    'login-proc':   'Login flow internalized!',
    'local-vs-dom': 'Users compared!',
    'gpo':          'GPO concepts clear!',
    'ntds':         'NTDS.dit demystified!',
  };

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        if (!completedSet.has(id) && chapterMessages[id]) {
          completedSet.add(id);
          showToast(chapterMessages[id]);
        }
      }
    });
  }, { threshold: 0.9 });

  Object.keys(chapterMessages).forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
}

function showToast(msg) {
  const toast = $('#chapter-toast');
  const msgEl = $('#chapter-toast-msg');
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* ── 24. KEYBOARD NAVIGATION ──────────────────────────── */
function initKeyboardNav() {
  const sectionIds = SECTIONS.map(s => s.id);
  let currentIdx = 0;

  document.addEventListener('keydown', e => {
    // Only when not typing in input
    if (document.activeElement?.tagName === 'INPUT') return;

    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      currentIdx = Math.min(currentIdx + 1, sectionIds.length - 1);
      scrollToSection(sectionIds[currentIdx]);
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      currentIdx = Math.max(currentIdx - 1, 0);
      scrollToSection(sectionIds[currentIdx]);
    }
    if (e.key === 'Home') {
      e.preventDefault();
      currentIdx = 0;
      scrollToSection(sectionIds[0]);
    }
    if (e.key === 'End') {
      e.preventDefault();
      currentIdx = sectionIds.length - 1;
      scrollToSection(sectionIds[currentIdx]);
    }
    // Escape closes mobile menu
    if (e.key === 'Escape') {
      document.querySelector('.sidebar')?.classList.remove('open');
      $('#sidebar-overlay')?.classList.remove('show');
      $('#mobile-menu-btn')?.classList.remove('open');
    }
  });

  // Update currentIdx on scroll
  window.addEventListener('scroll', () => {
    let idx = 0;
    sectionIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) idx = i;
    });
    currentIdx = idx;
  }, { passive: true });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── 25. SMOOTH SECTION ENTRY EFFECTS ─────────────────── */
function initSectionEntryEffects() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
      }
    });
  }, { threshold: 0.05 });
  $$('.lesson-section').forEach(s => {
    s.style.transition = 'opacity .7s ease, transform .7s ease';
    io.observe(s);
  });
}

/* ── 26. HERO FLOATING NODES ──────────────────────────── */
(function initHeroNodes() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const nodes = [
    { size: 6, top: '15%', left: '12%', delay: '0s',  dur: '12s', color: 'rgba(99,102,241,.25)' },
    { size: 10, top: '65%', left: '8%',  delay: '2s',  dur: '16s', color: 'rgba(37,99,235,.20)' },
    { size: 5,  top: '30%', left: '85%', delay: '1s',  dur: '14s', color: 'rgba(168,85,247,.25)' },
    { size: 8,  top: '75%', left: '78%', delay: '3s',  dur: '10s', color: 'rgba(99,102,241,.18)' },
    { size: 4,  top: '20%', left: '55%', delay: '1.5s',dur: '18s', color: 'rgba(59,130,246,.22)' },
    { size: 7,  top: '50%', left: '92%', delay: '0.5s',dur: '13s', color: 'rgba(139,92,246,.20)' },
  ];
  nodes.forEach(n => {
    const el = document.createElement('div');
    el.className = 'hero-node';
    el.style.cssText = `
      width:${n.size * 2}px; height:${n.size * 2}px;
      top:${n.top}; left:${n.left};
      background:${n.color};
      animation-duration:${n.dur};
      animation-delay:${n.delay};
    `;
    hero.appendChild(el);
  });
})();
