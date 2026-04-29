/**
 * AELA'S DEUTSCHKURS - CORE SYSTEM
 * XP, Streak, Progress Tracking
 * localStorage namespace: aela_*
 */

class AelaCore {
  constructor() {
    this.namespace = 'aela_';
    this.initData();
  }

  /**
   * Initialize or load user data
   */
  initData() {
    const existing = this.get('progress');
    
    if (!existing) {
      this.set('progress', {
        xp: 0,
        streak: 0,
        lastPlayDate: null,
        modules: {
          rechtschreibung: { completed: false, score: 0, date: null, attempts: 0 },
          wortarten: { completed: false, score: 0, date: null, attempts: 0 },
          satzglieder: { completed: false, score: 0, date: null, attempts: 0 },
          spielanleitung: { completed: false, score: 0, date: null, attempts: 0 }
        },
        totalExercises: 0,
        totalScore: 0
      });
    }
  }

  /**
   * Get data from localStorage
   */
  get(key) {
    const data = localStorage.getItem(this.namespace + key);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Set data to localStorage
   */
  set(key, value) {
    localStorage.setItem(this.namespace + key, JSON.stringify(value));
  }

  /**
   * Get current progress object
   */
  getProgress() {
    return this.get('progress') || { xp: 0, streak: 0 };
  }

  /**
   * Add XP points
   */
  addXP(points) {
    const progress = this.getProgress();
    progress.xp += points;
    this.set('progress', progress);
    return progress.xp;
  }

  /**
   * Update module completion
   */
  completeModule(moduleName, score) {
    const progress = this.getProgress();
    const today = new Date().toISOString().split('T')[0];

    if (progress.modules[moduleName]) {
      progress.modules[moduleName].completed = true;
      progress.modules[moduleName].score = Math.max(progress.modules[moduleName].score, score);
      progress.modules[moduleName].date = today;
      progress.modules[moduleName].attempts += 1;
      progress.totalExercises += 1;
    }

    // Update streak
    const lastPlay = progress.lastPlayDate;
    const today_obj = new Date(today);
    
    if (lastPlay) {
      const last_obj = new Date(lastPlay);
      const daysDiff = Math.floor((today_obj - last_obj) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 0) {
        // Same day, keep streak
      } else if (daysDiff === 1) {
        // Next day, increment streak
        progress.streak += 1;
      } else {
        // Gap, reset streak
        progress.streak = 1;
      }
    } else {
      progress.streak = 1;
    }

    progress.lastPlayDate = today;
    this.set('progress', progress);
    return progress;
  }

  /**
   * Get total score across all modules
   */
  getTotalScore() {
    const progress = this.getProgress();
    let total = 0;
    let count = 0;

    Object.values(progress.modules).forEach(m => {
      if (m.completed) {
        total += m.score;
        count += 1;
      }
    });

    return count > 0 ? Math.round(total / count) : 0;
  }

  /**
   * Get completion percentage
   */
  getCompletionPercent() {
    const progress = this.getProgress();
    const total = Object.keys(progress.modules).length;
    const completed = Object.values(progress.modules).filter(m => m.completed).length;
    return Math.round((completed / total) * 100);
  }

  /**
   * Generate result UUID for sharing
   */
  generateResultUUID(moduleName, score) {
    const uuid = this.generateUUID();
    
    const result = {
      uuid: uuid,
      date: new Date().toISOString(),
      student: 'Aela',
      module: moduleName,
      score: score,
      timestamp: Date.now()
    };

    this.set(`result_${uuid}`, result);
    return uuid;
  }

  /**
   * Get result by UUID
   */
  getResult(uuid) {
    return this.get(`result_${uuid}`);
  }

  /**
   * Generate UUID v4
   */
  generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  /**
   * Clear all data (for reset/debug)
   */
  clearAll() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.namespace)) {
        localStorage.removeItem(key);
      }
    });
    console.log('🗑️ All Aela data cleared');
  }

  /**
   * Export all data as JSON
   */
  exportData() {
    const keys = Object.keys(localStorage);
    const data = {};
    keys.forEach(key => {
      if (key.startsWith(this.namespace)) {
        data[key] = localStorage.getItem(key);
      }
    });
    return data;
  }
}

// Initialize globally
const aelaCore = new AelaCore();
