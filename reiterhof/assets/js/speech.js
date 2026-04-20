// ===================================================
// LUNAS REITERHOF – speech.js
// Text-to-Speech via Web Speech API (kein Server!)
// ===================================================

const Speech = {
  _synth: window.speechSynthesis,
  _deVoice: null,

  _findVoice(lang) {
    const voices = this._synth.getVoices();
    return voices.find(v => v.lang === lang)
        || voices.find(v => v.lang.startsWith(lang.split('-')[0]))
        || null;
  },

  speak(text, rate = 0.88) {
    this._synth.cancel();
    const utt   = new SpeechSynthesisUtterance(text);
    utt.lang    = 'de-DE';
    utt.rate    = rate;
    utt.pitch   = 1.1;
    if (this._deVoice) utt.voice = this._deVoice;
    this._synth.speak(utt);
    return utt;
  },

  speakDE(text, rate = 0.88) { return this.speak(text, rate); },

  // Wort für Wort vorlesen mit Callback pro Wort
  speakWithHighlight(text, onWord, onEnd, rate = 0.80) {
    this._synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang  = 'de-DE';
    utt.rate  = rate;
    utt.pitch = 1.1;
    if (this._deVoice) utt.voice = this._deVoice;
    utt.onboundary = (e) => {
      if (e.name === 'word' && onWord) onWord(e.charIndex, e.charLength);
    };
    utt.onend = () => { if (onEnd) onEnd(); };
    this._synth.speak(utt);
    return utt;
  },

  init() {
    const load = () => { this._deVoice = this._findVoice('de-DE'); };
    load();
    this._synth.onvoiceschanged = load;
  },

  bindAll() {
    document.querySelectorAll('[data-speak]').forEach(el => {
      el.addEventListener('click', () => {
        const text = el.getAttribute('data-speak');
        this.speak(text);
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Speech.init();
  Speech.bindAll();
});
