// ===================================================
// LUNAS REITERHOF – core.js
// Fortschrittsverwaltung via localStorage
// ===================================================

const LP = {
  NS: 'reiterhof_',

  get(key) {
    try { const v = localStorage.getItem(this.NS + key); return v ? JSON.parse(v) : null; }
    catch(e) { return null; }
  },

  set(key, value) {
    try { localStorage.setItem(this.NS + key, JSON.stringify(value)); }
    catch(e) {}
  },

  getStars(moduleId) { return this.get('stars_' + moduleId) || 0; },

  setStars(moduleId, stars) {
    const cur  = this.getStars(moduleId);
    const best = Math.max(cur, Math.min(3, stars));
    this.set('stars_' + moduleId, best);
    return best;
  },

  isCompleted(moduleId) { return this.getStars(moduleId) >= 1; },

  getTotalStars() {
    const ids = ['lunas-reiterhof', 'satz-spotlight'];
    return ids.reduce((sum, id) => sum + this.getStars(id), 0);
  },

  starsHTML(n, max = 3) {
    let h = '<span class="stars">';
    for (let i = 1; i <= max; i++)
      h += `<span class="star ${i<=n?'on':''}">\u2605</span>`;
    return h + '</span>';
  },

  scoreToStars(pct) {
    if (pct >= 90) return 3;
    if (pct >= 60) return 2;
    if (pct >= 30) return 1;
    return 0;
  }
};

function goBack(fallback = '/reiterhof/') {
  if (document.referrer && document.referrer !== window.location.href) window.history.back();
  else window.location.href = fallback;
}

function refreshHeaderStars() {
  const el = document.querySelector('.header-stars');
  if (el) el.textContent = '\u2605 ' + LP.getTotalStars();
}

function showResult(containerId, moduleId, correct, total) {
  const pct   = Math.round((correct / total) * 100);
  const stars = LP.setStars(moduleId, LP.scoreToStars(pct));
  const badges = ['😢', '🙂', '😊', '🎉'];
  const msgs   = [
    'Noch mal versuchen – du schaffst das!',
    'Gut angefangen! Etwas mehr üben.',
    'Super gemacht! Fast perfekt 🐴',
    'Fantastisch! Luna ist super stolz auf dich! 🏆'
  ];
  const div = document.getElementById(containerId);
  if (!div) return;
  div.innerHTML = `
    <div class="result-screen">
      <div class="result-emoji">${badges[stars]}</div>
      <div class="result-score">${correct} von ${total} richtig (${pct}%)</div>
      <div class="result-stars">${LP.starsHTML(stars)}</div>
      <div class="result-msg">${msgs[stars]}</div>
      <div class="flex-center">
        <button class="btn btn-primary" onclick="location.reload()">🔄 Nochmal</button>
        <a class="btn btn-secondary" href="/reiterhof/">🏠 Zum Reiterhof</a>
      </div>
    </div>`;
  refreshHeaderStars();
}
