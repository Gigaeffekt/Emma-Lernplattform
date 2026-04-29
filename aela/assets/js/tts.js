/**
 * AELA'S DEUTSCHKURS - TEXT-TO-SPEECH
 * Web Speech API (kostenlos, offline, Deutsch)
 */

class AelaTTS {
  constructor() {
    this.synth = window.speechSynthesis;
    this.currentUtterance = null;
    this.isPlaying = false;
    this.currentRate = 1.0;
    
    // Default settings for accessibility
    this.settings = {
      rate: 0.8,          // Slightly slower than normal
      pitch: 1.0,
      volume: 1.0,
      lang: 'de-DE'
    };
    
    this.loadSettings();
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    const saved = aelaCore.get('tts_settings');
    if (saved) {
      this.settings = { ...this.settings, ...saved };
    }
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    aelaCore.set('tts_settings', this.settings);
  }

  /**
   * Speak normal speed
   */
  speak(text, callback = null) {
    this.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.settings.rate;
    utterance.pitch = this.settings.pitch;
    utterance.volume = this.settings.volume;
    utterance.lang = this.settings.lang;

    utterance.onstart = () => {
      this.isPlaying = true;
      document.body.classList.add('tts-playing');
    };

    utterance.onend = () => {
      this.isPlaying = false;
      document.body.classList.remove('tts-playing');
      if (callback) callback();
    };

    utterance.onerror = (event) => {
      console.error('TTS Error:', event.error);
      this.isPlaying = false;
      document.body.classList.remove('tts-playing');
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  /**
   * Speak very slowly (for difficult words)
   */
  speakSlow(text, callback = null) {
    this.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.5;  // 50% of normal speed
    utterance.pitch = this.settings.pitch;
    utterance.volume = this.settings.volume;
    utterance.lang = this.settings.lang;

    utterance.onstart = () => {
      this.isPlaying = true;
      document.body.classList.add('tts-playing');
    };

    utterance.onend = () => {
      this.isPlaying = false;
      document.body.classList.remove('tts-playing');
      if (callback) callback();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  /**
   * Speak word by word with pauses
   */
  speakWordByWord(text, callback = null) {
    this.cancel();
    
    const words = text.split(/\s+/);
    let wordIndex = 0;

    const speakNextWord = () => {
      if (wordIndex < words.length) {
        const word = words[wordIndex];
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 0.6;
        utterance.pitch = this.settings.pitch;
        utterance.volume = this.settings.volume;
        utterance.lang = this.settings.lang;

        utterance.onstart = () => {
          this.isPlaying = true;
          document.body.classList.add('tts-playing');
          // Highlight current word
          this.highlightWord(wordIndex);
        };

        utterance.onend = () => {
          wordIndex++;
          // 800ms pause between words
          setTimeout(speakNextWord, 800);
        };

        this.currentUtterance = utterance;
        this.synth.speak(utterance);
      } else {
        this.isPlaying = false;
        document.body.classList.remove('tts-playing');
        this.clearHighlight();
        if (callback) callback();
      }
    };

    speakNextWord();
  }

  /**
   * Stop current speech
   */
  cancel() {
    this.synth.cancel();
    this.isPlaying = false;
    document.body.classList.remove('tts-playing');
    this.clearHighlight();
  }

  /**
   * Pause speech
   */
  pause() {
    this.synth.pause();
    this.isPlaying = false;
  }

  /**
   * Resume speech
   */
  resume() {
    this.synth.resume();
    this.isPlaying = true;
  }

  /**
   * Set speech rate
   */
  setRate(rate) {
    this.settings.rate = Math.max(0.1, Math.min(2.0, rate));
    this.saveSettings();
  }

  /**
   * Set language
   */
  setLanguage(lang) {
    this.settings.lang = lang;
    this.saveSettings();
  }

  /**
   * Highlight word during word-by-word reading
   */
  highlightWord(index) {
    this.clearHighlight();
    const words = document.querySelectorAll('[data-word-index]');
    if (words[index]) {
      words[index].classList.add('tts-highlight');
    }
  }

  /**
   * Clear highlight
   */
  clearHighlight() {
    document.querySelectorAll('.tts-highlight').forEach(el => {
      el.classList.remove('tts-highlight');
    });
  }

  /**
   * Check if TTS is available
   */
  isAvailable() {
    return !!window.speechSynthesis;
  }

  /**
   * Get available voices
   */
  getVoices() {
    return this.synth.getVoices();
  }

  /**
   * Get German voices
   */
  getGermanVoices() {
    return this.getVoices().filter(v => v.lang.startsWith('de'));
  }
}

// Initialize globally
const aelaTTS = new AelaTTS();

// TTS Highlight CSS (dynamic)
const style = document.createElement('style');
style.textContent = `
  .tts-highlight {
    background-color: #0066CC;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    animation: tts-pulse 0.5s ease-in-out;
  }

  @keyframes tts-pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  body.tts-playing {
    --tts-active: true;
  }
`;
document.head.appendChild(style);
