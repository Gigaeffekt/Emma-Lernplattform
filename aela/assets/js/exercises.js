/**
 * AELA'S DEUTSCHKURS - EXERCISE SYSTEM
 * Basis-Klasse für alle Aufgaben-Typen
 */

class AelaExercise {
  constructor(taskData) {
    this.data = taskData;
    this.userAnswer = null;
    this.isCorrect = false;
    this.score = 0;
    this.startTime = null;
    this.endTime = null;
  }

  /**
   * Calculate score based on correctness
   */
  calculateScore(isCorrect, basePoints = 10) {
    if (isCorrect) {
      const timeTaken = (this.endTime - this.startTime) / 1000; // seconds
      let multiplier = 1;

      // Bonus for fast answers
      if (timeTaken < 30) {
        multiplier = 1.5;
      } else if (timeTaken < 60) {
        multiplier = 1.2;
      }

      this.score = Math.round(basePoints * multiplier);
      this.isCorrect = true;
    } else {
      this.score = 0;
      this.isCorrect = false;
    }

    return this.score;
  }

  /**
   * Start timer
   */
  startTimer() {
    this.startTime = Date.now();
  }

  /**
   * End timer
   */
  endTimer() {
    this.endTime = Date.now();
  }

  /**
   * Get time taken in seconds
   */
  getTimeTaken() {
    if (!this.startTime || !this.endTime) return 0;
    return (this.endTime - this.startTime) / 1000;
  }

  /**
   * Show result feedback
   */
  showFeedback(container) {
    const feedbackEl = document.createElement('div');
    feedbackEl.className = this.isCorrect ? 'success' : 'error';
    
    if (this.isCorrect) {
      feedbackEl.innerHTML = `
        <p>✅ Sehr gut!</p>
        <p>+${this.score} Punkte</p>
      `;
    } else {
      feedbackEl.innerHTML = `
        <p>❌ Das ist leider nicht richtig.</p>
        <p>Versuch es nochmal!</p>
      `;
    }

    container.appendChild(feedbackEl);
  }
}

/**
 * MULTIPLE CHOICE EXERCISE
 */
class MultipleChoiceExercise extends AelaExercise {
  constructor(taskData) {
    super(taskData);
    // taskData should have: question, options, correctAnswer
  }

  /**
   * Check answer
   */
  checkAnswer(selectedIndex) {
    this.endTimer();
    this.userAnswer = selectedIndex;
    this.isCorrect = selectedIndex === this.data.correctAnswer;
    this.calculateScore(this.isCorrect, 20);
    return this.isCorrect;
  }

  /**
   * Render exercise HTML
   */
  render() {
    let html = `
      <div class="task-container">
        <h2>${this.data.question}</h2>
        <div class="exercise-content">
    `;

    this.data.options.forEach((option, idx) => {
      html += `
        <label class="option-label">
          <input type="radio" name="answer" value="${idx}" 
                 onchange="currentExercise.checkAnswer(${idx}); showExerciseFeedback()">
          <span class="option-text">${option}</span>
        </label>
      `;
    });

    html += `
        </div>
        <div id="feedback-container"></div>
        ${this.data.explanation ? `<div class="explanation"><strong>ℹ️</strong> ${this.data.explanation}</div>` : ''}
      </div>
    `;

    return html;
  }
}

/**
 * DRAG AND DROP / MATCHING EXERCISE
 */
class MatchingExercise extends AelaExercise {
  constructor(taskData) {
    super(taskData);
    // taskData should have: pairs (array of {left, right})
    this.userMatches = {};
  }

  /**
   * Check if all pairs match correctly
   */
  checkMatches() {
    this.endTimer();
    let correctCount = 0;

    this.data.pairs.forEach((pair, idx) => {
      if (this.userMatches[idx] === pair.correctIndex) {
        correctCount++;
      }
    });

    this.isCorrect = correctCount === this.data.pairs.length;
    this.calculateScore(this.isCorrect, 15 * this.data.pairs.length);
    return this.isCorrect;
  }

  /**
   * Record a match
   */
  recordMatch(pairIndex, rightIndex) {
    this.userMatches[pairIndex] = rightIndex;
  }

  /**
   * Render exercise HTML
   */
  render() {
    let html = `
      <div class="task-container">
        <h2>${this.data.title}</h2>
        <div class="matching-exercise">
          <div class="matching-left">
    `;

    this.data.pairs.forEach((pair, idx) => {
      html += `
        <div class="match-item" data-pair="${idx}">
          <div class="word">${pair.left}</div>
        </div>
      `;
    });

    html += `
          </div>
          <div class="matching-right">
    `;

    this.data.rightItems.forEach((item, idx) => {
      html += `
        <div class="match-item" data-right="${idx}">
          <div class="word">${item}</div>
        </div>
      `;
    });

    html += `
          </div>
        </div>
        <button class="btn btn-primary" onclick="currentExercise.checkMatches(); showExerciseFeedback()">
          ✔️ Überprüfen
        </button>
        <div id="feedback-container"></div>
      </div>
    `;

    return html;
  }
}

/**
 * TEXT INPUT EXERCISE
 */
class TextInputExercise extends AelaExercise {
  constructor(taskData) {
    super(taskData);
    // taskData should have: question, expectedAnswers (array for flexibility)
  }

  /**
   * Check text answer (fuzzy match for typos)
   */
  checkAnswer(userText) {
    this.endTimer();
    this.userAnswer = userText.toLowerCase().trim();

    // Check if user answer matches any expected answer (with typo tolerance)
    this.isCorrect = this.data.expectedAnswers.some(expected => {
      return this.fuzzyMatch(this.userAnswer, expected.toLowerCase());
    });

    this.calculateScore(this.isCorrect, 25);
    return this.isCorrect;
  }

  /**
   * Fuzzy string matching (simple Levenshtein)
   */
  fuzzyMatch(str1, str2, threshold = 0.8) {
    const maxLen = Math.max(str1.length, str2.length);
    const diff = this.levenshteinDistance(str1, str2);
    return (1 - diff / maxLen) >= threshold;
  }

  /**
   * Levenshtein distance algorithm
   */
  levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  /**
   * Render exercise HTML
   */
  render() {
    return `
      <div class="task-container">
        <h2>${this.data.question}</h2>
        <textarea id="answer-input" placeholder="Schreibe deine Antwort hier..." 
                  style="font-size: 44px; padding: 20px; min-height: 150px;"></textarea>
        <button class="btn btn-primary" onclick="currentExercise.checkAnswer(document.getElementById('answer-input').value); showExerciseFeedback()">
          ✔️ Überprüfen
        </button>
        <div id="feedback-container"></div>
        ${this.data.hint ? `<p class="hint"><strong>💡 Tipp:</strong> ${this.data.hint}</p>` : ''}
      </div>
    `;
  }
}

/**
 * HIGHLIGHT EXERCISE
 */
class HighlightExercise extends AelaExercise {
  constructor(taskData) {
    super(taskData);
    // taskData should have: text (with word-tokens), question, correctWords (indices)
    this.selectedWords = [];
  }

  /**
   * Toggle word selection
   */
  toggleWord(wordIndex) {
    if (this.selectedWords.includes(wordIndex)) {
      this.selectedWords = this.selectedWords.filter(i => i !== wordIndex);
    } else {
      this.selectedWords.push(wordIndex);
    }
  }

  /**
   * Check answer
   */
  checkAnswer() {
    this.endTimer();
    this.isCorrect = this.arrayEquals(
      this.selectedWords.sort((a, b) => a - b),
      this.data.correctWords.sort((a, b) => a - b)
    );
    this.calculateScore(this.isCorrect, 20);
    return this.isCorrect;
  }

  /**
   * Compare arrays
   */
  arrayEquals(a, b) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => v === b[i]);
  }

  /**
   * Render exercise HTML
   */
  render() {
    let html = `
      <div class="task-container">
        <h2>${this.data.question}</h2>
        <div class="highlight-text">
    `;

    this.data.words.forEach((word, idx) => {
      const isSelected = this.selectedWords.includes(idx);
      html += `
        <div class="word ${isSelected ? 'selected' : ''}" 
             onclick="currentExercise.toggleWord(${idx})"
             data-word-index="${idx}">
          ${word}
        </div>
      `;
    });

    html += `
        </div>
        <button class="btn btn-primary" onclick="currentExercise.checkAnswer(); showExerciseFeedback()">
          ✔️ Überprüfen
        </button>
        <div id="feedback-container"></div>
      </div>
    `;

    return html;
  }
}

// Global current exercise
let currentExercise = null;

/**
 * Show exercise feedback
 */
function showExerciseFeedback() {
  if (!currentExercise) return;

  const container = document.getElementById('feedback-container');
  container.innerHTML = '';
  currentExercise.showFeedback(container);

  // Add next button
  const nextBtn = document.createElement('button');
  nextBtn.className = 'btn btn-primary mt-lg';
  nextBtn.textContent = '➡️ Nächste Aufgabe';
  nextBtn.onclick = () => loadNextExercise();
  container.appendChild(nextBtn);
}

/**
 * Load next exercise (stub - implement in module)
 */
function loadNextExercise() {
  console.log('Nächste Aufgabe wird geladen...');
}
