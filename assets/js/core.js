// ===================================================
// LERNPLATTFORM – core.js
// Fortschrittsverwaltung via localStorage
// ===================================================

const LP = {
  NS: 'lernplattform_',

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
    const cur = this.getStars(moduleId);
    const best = Math.max(cur, Math.min(3, stars));
    this.set('stars_' + moduleId, best);
    return best;
  },

  isCompleted(moduleId) { return this.getStars(moduleId) >= 1; },

  getTotalStars() {
    const ids = ['pronomen','reg-verben','unreg-verben','karteikarten',
                 'konjugations-quiz','fallende-woerter','lueckentext',
                 'schreibhilfe','cuanto-quiz',
                 'leseabenteuer-s36','leseabenteuer-s42',
                 'pronomen-level2','pronomen-level3',
                 'uebersetzung','verben-endungen'];
    return ids.reduce((sum, id) => sum + this.getStars(id), 0);
  },

  // Sterne-HTML (filled / empty)
  starsHTML(n, max = 3) {
    let h = '<span class="stars">';
    for (let i = 1; i <= max; i++)
      h += `<span class="star ${i<=n?'on':''}">\u2605</span>`;
    return h + '</span>';
  },

  // Sterne auf Score-Basis berechnen (0-100)
  scoreToStars(pct) {
    if (pct >= 90) return 3;
    if (pct >= 60) return 2;
    if (pct >= 30) return 1;
    return 0;
  }
};

// Zurück-Navigation
function goBack(fallback = '/Lernplattform/') {
  if (document.referrer && document.referrer !== window.location.href) window.history.back();
  else window.location.href = fallback;
}

// Sterne im Header aktualisieren
function refreshHeaderStars() {
  const el = document.querySelector('.header-stars');
  if (el) el.textContent = '\u2605 ' + LP.getTotalStars();
}

// Ergebnisscreen anzeigen – ruft LP.setStars auf
function showResult(containerId, moduleId, correct, total) {
  const pct   = Math.round((correct / total) * 100);
  const stars  = LP.setStars(moduleId, LP.scoreToStars(pct));
  const badges = ['\uD83D\uDE22', '\uD83D\uDE42', '\uD83D\uDE0A', '\uD83C\uDF89'];
  const msgs   = [
    'Noch mal versuchen – du schaffst das!',
    'Gut angefangen! Noch etwas üben.',
    'Super gemacht! Fast perfekt.',
    'Fantastisch! Perfektes Ergebnis!'
  ];
  const idx = stars;
  const div = document.getElementById(containerId);
  if (!div) return;
  div.innerHTML = `
    <div class="result-screen">
      <div class="big-stars">${badges[idx]}</div>
      <h2>${correct} von ${total} richtig (${pct}%)</h2>
      <div style="font-size:72px;margin-bottom:16px">${LP.starsHTML(stars)}</div>
      <p>${msgs[idx]}</p>
      <div class="flex-center">
        <button class="btn btn-secondary" onclick="location.reload()">🔄 Nochmal</button>
        <a class="btn btn-primary" href="/Lernplattform/">🏠 Dashboard</a>
      </div>
    </div>`;
  refreshHeaderStars();
}

document.addEventListener('DOMContentLoaded', refreshHeaderStars);
