// ===================================================
// LERNPLATTFORM – speech.js
// Text-to-Speech via Web Speech API (kein Server!)
// Funktioniert offline in Chrome/Edge/Firefox
// ===================================================

const Speech = {
  _synth: window.speechSynthesis,
  _esVoice: null,
  _deVoice: null,

  _findVoice(lang) {
    const voices = this._synth.getVoices();
    return voices.find(v => v.lang === lang)
        || voices.find(v => v.lang.startsWith(lang.split('-')[0]))
        || null;
  },

  speak(text, lang = 'es-ES', rate = 0.82) {
    this._synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang  = lang;
    utt.rate  = rate;
    utt.pitch = 1;
    const voice = lang.startsWith('es') ? this._esVoice : this._deVoice;
    if (voice) utt.voice = voice;
    this._synth.speak(utt);
  },

  speakES(text) { this.speak(text, 'es-ES', 0.80); },
  speakDE(text) { this.speak(text, 'de-DE', 0.90); },

  init() {
    const load = () => {
      this._esVoice = this._findVoice('es-ES');
      this._deVoice = this._findVoice('de-DE');
    };
    load();
    this._synth.onvoiceschanged = load;
  },

  // Alle Elemente mit [data-speak] automatisch verdrahten
  bindAll() {
    document.querySelectorAll('[data-speak]').forEach(el => {
      el.addEventListener('click', () => {
        const text = el.getAttribute('data-speak');
        const lang = el.getAttribute('data-lang') || 'es-ES';
        this.speak(text, lang);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Speech.init();
  Speech.bindAll();
});
