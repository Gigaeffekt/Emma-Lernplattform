/**
 * AELA'S DEUTSCHKURS - QR-CODE GENERATION & SHARING
 * Generiert QR-Codes für Ergebnis-Sharing mit Lehrer
 */

class AelaQRCode {
  constructor() {
    // QR Code Server (kostenlos, keine Registrierung nötig)
    this.qrServer = 'https://api.qrserver.com/v1/create-qr-code/';
    this.shareBaseURL = window.location.origin + '/aela/share/';
  }

  /**
   * Generate QR code for module result
   */
  generateResultQR(moduleName, score) {
    const uuid = aelaCore.generateResultUUID(moduleName, score);
    const shareURL = this.shareBaseURL + uuid;
    
    return {
      uuid: uuid,
      url: shareURL,
      qrImageURL: this.getQRImageURL(shareURL)
    };
  }

  /**
   * Get QR code image URL from qrserver.com
   */
  getQRImageURL(url, size = 300) {
    const params = new URLSearchParams({
      size: `${size}x${size}`,
      data: url,
      format: 'png'
    });
    return this.qrServer + '?' + params.toString();
  }

  /**
   * Download QR code as image
   */
  downloadQR(qrImageURL, filename = 'aela-result.png') {
    const link = document.createElement('a');
    link.href = qrImageURL;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Create shareable link
   */
  getShareLink(uuid) {
    return this.shareBaseURL + uuid;
  }

  /**
   * Create QR code element (img tag)
   */
  createQRElement(qrImageURL, alt = 'QR Code') {
    const img = document.createElement('img');
    img.src = qrImageURL;
    img.alt = alt;
    img.style.maxWidth = '300px';
    img.style.border = '3px solid black';
    img.style.padding = '10px';
    return img;
  }

  /**
   * Create full result card HTML
   */
  createResultCard(moduleName, score, uuid, qrImageURL) {
    const result = aelaCore.getResult(uuid);
    const date = new Date(result.date).toLocaleDateString('de-DE');
    
    return `
      <div class="result-card">
        <h2>✅ Modul abgeschlossen!</h2>
        
        <div class="result-content">
          <div class="result-info">
            <p><strong>Modul:</strong> ${moduleName}</p>
            <p><strong>Ergebnis:</strong> ${score}%</p>
            <p><strong>Datum:</strong> ${date}</p>
          </div>

          <div class="result-qr">
            <h3>🔍 QR-Code für Lehrer</h3>
            <img src="${qrImageURL}" alt="QR Code" class="qr-image">
            <p class="small-text">Mit Handy abscannen!</p>
          </div>

          <div class="result-actions">
            <button class="btn btn-primary" onclick="aelaqr.copyShareLink('${uuid}')">
              🔗 Link kopieren
            </button>
            <button class="btn btn-secondary" onclick="aelaqr.downloadQR('${qrImageURL}')">
              💾 QR downloaden
            </button>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Copy share link to clipboard
   */
  copyShareLink(uuid) {
    const url = this.getShareLink(uuid);
    navigator.clipboard.writeText(url).then(() => {
      alert('🔗 Link kopiert!');
    }).catch(err => {
      console.error('Fehler beim Kopieren:', err);
    });
  }

  /**
   * Get all results for summary
   */
  getAllResults() {
    const keys = Object.keys(localStorage);
    const results = [];
    
    keys.forEach(key => {
      if (key.startsWith('aela_result_')) {
        const uuid = key.replace('aela_result_', '');
        const result = aelaCore.getResult(uuid);
        if (result) {
          results.push(result);
        }
      }
    });

    return results.sort((a, b) => b.timestamp - a.timestamp);
  }

  /**
   * Generate summary report HTML
   */
  generateSummaryReport() {
    const progress = aelaCore.getProgress();
    const totalScore = aelaCore.getTotalScore();
    const completionPercent = aelaCore.getCompletionPercent();

    let modulesHTML = '';
    Object.entries(progress.modules).forEach(([name, data]) => {
      if (data.completed) {
        modulesHTML += `
          <div class="module-result">
            <strong>${this.formatModuleName(name)}</strong>: ${data.score}%
          </div>
        `;
      }
    });

    return `
      <div class="summary-report">
        <h1>📊 Aela's Fortschritt</h1>
        
        <div class="summary-stats">
          <p><strong>Gesamtergebnis:</strong> ${totalScore}%</p>
          <p><strong>Fertigstellung:</strong> ${completionPercent}%</p>
          <p><strong>Punkte (XP):</strong> ${progress.xp}</p>
          <p><strong>Streak (Tage):</strong> 🔥 ${progress.streak}</p>
        </div>

        <h3>Module:</h3>
        ${modulesHTML || '<p>Noch keine Module abgeschlossen</p>'}
      </div>
    `;
  }

  /**
   * Format module name for display
   */
  formatModuleName(name) {
    const names = {
      'rechtschreibung': 'Rechtschreibung-Strategien',
      'wortarten': 'Wortarten',
      'satzglieder': 'Satzglieder',
      'spielanleitung': 'Spielanleitung & Gedicht'
    };
    return names[name] || name;
  }
}

// Initialize globally
const aelaqr = new AelaQRCode();

// CSS for result cards
const style = document.createElement('style');
style.textContent = `
  .result-card {
    background-color: #f5f5f5;
    border: 3px solid black;
    border-radius: 10px;
    padding: 40px;
    max-width: 900px;
    margin: 40px auto;
    text-align: center;
  }

  .result-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }

  .result-info {
    background-color: #e6f2ff;
    padding: 30px;
    border-radius: 8px;
    font-size: 44px;
  }

  .result-info p {
    margin: 15px 0;
  }

  .result-qr {
    padding: 30px;
    background-color: white;
    border: 3px solid black;
    border-radius: 8px;
  }

  .qr-image {
    max-width: 300px;
    margin: 20px 0;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .small-text {
    font-size: 36px;
    margin: 20px 0;
  }

  .result-actions {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .result-actions button {
    min-width: 200px;
  }

  .summary-report {
    max-width: 900px;
    margin: 40px auto;
    padding: 40px;
    background-color: #f5f5f5;
    border: 3px solid black;
    border-radius: 10px;
  }

  .summary-stats {
    background-color: #ffffcc;
    padding: 30px;
    border-radius: 8px;
    margin: 20px 0;
  }

  .summary-stats p {
    font-size: 44px;
    margin: 15px 0;
  }

  .module-result {
    background-color: white;
    padding: 20px;
    margin: 15px 0;
    border: 2px solid #0066cc;
    border-radius: 8px;
    font-size: 40px;
  }
`;
document.head.appendChild(style);
