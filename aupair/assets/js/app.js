// ============================================================
// ANGEL'S DEUTSCH A2 — Shared JS helpers
// XP system, Streak, LocalStorage, Toast, Confetti
// ============================================================

const XP_KEY     = 'angel_xp';
const STREAK_KEY = 'angel_streak';
const DATE_KEY   = 'angel_last_date';
const DONE_KEY   = 'angel_done';  // JSON object of completed module IDs

// ─── XP ───────────────────────────────────────────────────
function getXP()            { return parseInt(localStorage.getItem(XP_KEY) || '0'); }
function addXP(pts) {
  const n = getXP() + pts;
  localStorage.setItem(XP_KEY, n);
  showToast(`+${pts} XP 🎉`);
  refreshHeaderXP();
  return n;
}
function refreshHeaderXP() {
  const el = document.querySelector('.header-xp');
  if (el) el.textContent = `⭐ ${getXP()} XP`;
}

// ─── STREAK ───────────────────────────────────────────────
function checkStreak() {
  const today = new Date().toDateString();
  const last  = localStorage.getItem(DATE_KEY);
  let streak  = parseInt(localStorage.getItem(STREAK_KEY) || '0');
  if (last === today) return streak;
  const yesterday = new Date(); yesterday.setDate(yesterday.getDate()-1);
  if (last === yesterday.toDateString()) streak++;
  else streak = 1;
  localStorage.setItem(STREAK_KEY, streak);
  localStorage.setItem(DATE_KEY, today);
  refreshHeaderStreak();
  return streak;
}
function getStreak() { return parseInt(localStorage.getItem(STREAK_KEY) || '0'); }
function refreshHeaderStreak() {
  const el = document.querySelector('.header-streak');
  if (el) el.textContent = `🔥 ${getStreak()}d`;
}

// ─── DONE MODULES ─────────────────────────────────────────
function markDone(moduleId) {
  const d = getDone();
  d[moduleId] = true;
  localStorage.setItem(DONE_KEY, JSON.stringify(d));
}
function isDone(moduleId) { return !!getDone()[moduleId]; }
function getDone() {
  try { return JSON.parse(localStorage.getItem(DONE_KEY) || '{}'); } catch { return {}; }
}

// ─── TOAST ────────────────────────────────────────────────
function showToast(msg, type='correct') {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.borderColor = type === 'correct' ? 'var(--correct)' :
                             type === 'wrong'   ? 'var(--wrong)'   : 'var(--gold)';
  toast.style.color = type === 'correct' ? 'var(--correct)' :
                      type === 'wrong'   ? 'var(--wrong)'   : 'var(--gold)';
  toast.classList.add('show');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ─── CONFETTI (lightweight) ────────────────────────────────
function launchConfetti() {
  const c = document.createElement('canvas');
  c.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999';
  document.body.appendChild(c);
  const ctx = c.getContext('2d');
  c.width  = window.innerWidth;
  c.height = window.innerHeight;
  const parts = Array.from({length:120}, () => ({
    x: Math.random()*c.width, y: -20,
    vx: (Math.random()-0.5)*4,
    vy: Math.random()*3+2,
    color: ['#7c3aed','#06b6d4','#f59e0b','#10b981','#ef4444'][Math.floor(Math.random()*5)],
    r: Math.random()*6+3, rot: Math.random()*360, rv: (Math.random()-0.5)*5
  }));
  let alive = true;
  function draw() {
    if (!alive) return;
    ctx.clearRect(0,0,c.width,c.height);
    parts.forEach(p => {
      p.x+=p.vx; p.y+=p.vy; p.rot+=p.rv;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle=p.color;
      ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);
      ctx.restore();
    });
    if (parts[0].y < c.height+50) requestAnimationFrame(draw);
    else { alive=false; c.remove(); }
  }
  requestAnimationFrame(draw);
}

// ─── COUNTDOWN ────────────────────────────────────────────
function startCountdown(targetDateStr) {
  const el = document.getElementById('countdown-days');
  const sub = document.getElementById('countdown-sub');
  if (!el) return;
  function update() {
    const target = new Date(targetDateStr);
    const now    = new Date();
    const diff   = Math.ceil((target - now) / 86400000);
    if (diff <= 0) { el.textContent = 'TODAY! 💪'; return; }
    el.textContent = diff;
    if (sub) sub.textContent = `days until the telc A2 exam`;
  }
  update();
  setInterval(update, 60000);
}

// ─── SHUFFLE ──────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i=a.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

// ─── INIT ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  checkStreak();
  refreshHeaderXP();
  refreshHeaderStreak();

  // ── FLOATING AUDIO STOP BUTTON ─────────────────────────
  // Inject once; shown automatically whenever speechSynthesis is active
  const stopBtn = document.createElement('button');
  stopBtn.className = 'audio-stop-float';
  stopBtn.innerHTML = '🔇 Stop Audio';
  stopBtn.setAttribute('aria-label', 'Stop audio playback');
  document.body.appendChild(stopBtn);

  function showStopBtn() { stopBtn.classList.add('show'); }
  function hideStopBtn() { stopBtn.classList.remove('show'); }

  stopBtn.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    hideStopBtn();
  });

  // Monkey-patch speechSynthesis.speak so the button appears
  // automatically for every TTS call across all modules
  if (window.speechSynthesis) {
    const _origSpeak = window.speechSynthesis.speak.bind(window.speechSynthesis);
    window.speechSynthesis.speak = function(utterance) {
      showStopBtn();
      utterance.addEventListener('end',   hideStopBtn);
      utterance.addEventListener('error', hideStopBtn);
      _origSpeak(utterance);
    };
  }
});
