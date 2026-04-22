# 📚 Neue Lernseite erstellen – Vollständige Anleitung

> **Lies diese Datei zuerst, bevor du eine neue Lernseite baust.**
> Sie erklärt alles: Struktur, Namespace-Regeln, Deployment und Sicherheit.

---

## 📋 Inhaltsverzeichnis

1. [Übersicht: Was gehört wohin?](#übersicht)
2. [Schritt-für-Schritt: Neue Seite erstellen](#schritt-für-schritt)
3. [Namespace-Regel (PFLICHT – verhindert Datenmischung)](#namespace-regel)
4. [Bereits vergebene Farben & Namen](#bereits-vergeben)
5. [Git-Workflow: Seite online stellen](#git-workflow)
6. [🔐 Sicherheitsregeln (KRITISCH lesen!)](#sicherheitsregeln)
7. [Checkliste für neue Seiten](#checkliste)

---

## Übersicht

### Wer hat welche Seite?

| Person | URL | Ordner (lokal) | localStorage-Prefix |
|--------|-----|----------------|---------------------|
| **Emma** | `emma-lernt.de/` | `Lernplattform/` (Root) | `lernplattform_` |
| **Alea** | `emma-lernt.de/reiterhof/` | `Lernplattform/reiterhof/` | `reiterhof_` |
| **Angel (Au Pair)** | `emma-lernt.de/aupair/` | `Lernplattform/aupair/` | `angel_` |
| **Nächste Person** | `emma-lernt.de/name/` | `Lernplattform/name/` | `name_` |

### Ordnerstruktur im Git-Repository

```
c:\wamp64\www\Lernplattform\          ← GIT-ROOT (nur DIESER Ordner ist online!)
│
├── index.html                        ← Emma's Startseite (emma-lernt.de/)
├── assets/                           ← Emma's CSS, JS, Bilder
├── subjects/                         ← Emma's Spanisch-Inhalte
│
├── reiterhof/                        ← Alea's Reiterhof (emma-lernt.de/reiterhof/)
│   ├── index.html
│   ├── assets/css/main.css
│   ├── assets/js/core.js             ← Namespace: reiterhof_
│   ├── tippen/
│   ├── lesen/
│   └── sammlung/
│
├── aupair/                           ← Angel's Deutschkurs (emma-lernt.de/aupair/)
│   ├── index.html
│   ├── assets/css/aupair.css
│   ├── assets/js/app.js              ← Namespace: angel_
│   ├── modules/                      ← Übungsseiten
│   └── data/                        ← JSON-Daten
│
├── .gitignore                        ← PDFs & Systemdateien ausgeschlossen
├── NEUE_LERNSEITE.md                 ← Diese Datei
└── manifest.json                     ← PWA für Emma
```

---

## Schritt-für-Schritt

### Schritt 1: Neuen Unterordner anlegen

```
c:\wamp64\www\Lernplattform\[name]\
```

Wähle einen **kurzen Kleinbuchstaben-Namen**, z.B. `mia`, `deutsch2`, `mathe`.

### Schritt 2: Minimale Dateistruktur erstellen

```
[name]/
├── index.html           ← Startseite der Person
├── assets/
│   ├── css/
│   │   └── main.css     ← Eigenes Farbschema (NICHT Emma's kopieren ohne Anpassung)
│   └── js/
│       └── core.js      ← Eigener Namespace (PFLICHT – siehe unten)
└── modules/             ← Übungsseiten
```

### Schritt 3: Namespace in core.js setzen (PFLICHT!)

Öffne `[name]/assets/js/core.js` (oder app.js) und setze einen **einzigartigen Prefix**:

```javascript
// FALSCH – wird sich mit anderen Seiten vermischen:
const XP_KEY = 'xp';

// RICHTIG – eindeutiger Prefix, nie doppelt vergeben:
const XP_KEY = 'mia_xp';
const DONE_KEY = 'mia_done';
const STREAK_KEY = 'mia_streak';
```

**Regel:** Der Prefix muss der Person / dem Thema entsprechen und darf nirgendwo sonst verwendet werden.

### Schritt 4: Farbschema wählen

Wähle **ein neues Farbschema** aus, das noch nicht vergeben ist (siehe Tabelle unten). Ändere die CSS-Variablen in `main.css`:

```css
:root {
  --primary:   #[neueFarbe];
  --dark:      #[dunkleFarbe];
  --light:     #[helleFarbe];
  --pale:      #[sehrHelleFarbe];
}
```

### Schritt 5: Alle Links relativ setzen

**WICHTIG:** Alle Links in deinen HTML-Dateien müssen **relativ** sein:

```html
<!-- RICHTIG (relativ): -->
<link rel="stylesheet" href="assets/css/main.css">
<a href="modules/lektion1.html">Lektion 1</a>
<a href="../">← Zurück</a>

<!-- FALSCH (absolut – bricht bei /aupair/ Unterseiten): -->
<link rel="stylesheet" href="/assets/css/main.css">
<a href="/Lernplattform/modules/lektion1.html">Lektion 1</a>
```

**Ausnahme:** Externe CDN-Links (z.B. `https://cdn.example.com/...`) sind natürlich absolut.

### Schritt 6: Lokal testen

Öffne im Browser: `http://localhost/Lernplattform/[name]/`

Prüfe:
- [ ] Startseite lädt
- [ ] Navigation funktioniert
- [ ] Keine 404-Fehler in der Browser-Konsole (F12)
- [ ] localStorage-Keys beginnen mit dem richtigen Prefix

### Schritt 7: Deployen (→ Git-Workflow unten)

---

## Namespace-Regel

### Warum ist das wichtig?

Alle Seiten laufen auf **derselben Domain** (`emma-lernt.de`). Browser speichern localStorage **pro Domain** — nicht pro Unterseite. Das bedeutet:

> Emma, Alea und Angel teilen sich denselben localStorage-Speicher der Domain.

Ohne Prefix würde z.B. `localStorage.getItem('xp')` bei Emma Emma's XP zurückgeben — und bei Angel... ebenfalls Emma's XP! Die Daten würden sich gegenseitig überschreiben.

**Mit eindeutigem Prefix ist jede Person isoliert:**

```
emma-lernt.de speichert:
├── lernplattform_stars_...    ← Emma's Fortschritt
├── reiterhof_cards            ← Alea's Karten
├── reiterhof_points           ← Alea's Punkte
├── angel_xp                   ← Angel's XP
├── angel_done                 ← Angel's erledigte Module
└── mia_xp                     ← Neue Person (Beispiel)
```

### Wie überprüft man die Isolation?

1. Im Browser: F12 → Application → Local Storage → `emma-lernt.de`
2. Alle Keys für eine Person sollten denselben Prefix haben
3. Kein Key sollte doppelt (ohne Prefix) vorhanden sein

---

## Bereits vergeben

| Farbschema | Person | Prefix | Primärfarbe |
|------------|--------|--------|-------------|
| 🟡 Warm Gelb / Blau | Emma | `lernplattform_` | Blau `#1565c0` |
| 💗 Pink / Lila | Alea (Reiterhof) | `reiterhof_` | Pink `#d81b60` |
| 🟦 Teal / Grün | Angel (Au Pair) | `angel_` | Teal `#00897b` |
| _(frei)_ | Nächste Person | `[name]_` | _Freie Wahl_ |

**Freie Farboptionen für neue Seiten:**
- Orange `#e65100` / `#ff8f00`
- Blaugrün `#0097a7`
- Rotviolett `#880e4f` (hellere Variante)
- Dunkelblau `#1a237e`
- Grün `#2e7d32`

---

## Git-Workflow

### Einmalig (schon erledigt): Git ist eingerichtet
```
Repo:    https://github.com/Gigaeffekt/Emma-Lernplattform
Netlify: https://transcendent-pavlova-1701f5.netlify.app
Domain:  emma-lernt.de → verbunden mit Netlify
```

### Neue Dateien online stellen

```powershell
# 1. In den richtigen Ordner wechseln (IMMER von hier aus!)
cd "c:\wamp64\www\Lernplattform"

# 2. Neue Dateien zum Staging hinzufügen
git add [name]/

# 3. Status prüfen (sieht man was hinzugefügt wird)
git status

# 4. Commit mit beschreibendem Text
git commit -m "Neue Seite für [Person]: [Beschreibung]"

# 5. Push zu GitHub → Netlify deployed automatisch in ~1-2 Min
git push
```

### Bestehende Datei ändern und aktualisieren

```powershell
cd "c:\wamp64\www\Lernplattform"
git add [geänderte-datei.html]
git commit -m "Änderung: [was wurde geändert]"
git push
```

### Nach dem Push: Deployment prüfen

Netlify baut meist in **1-2 Minuten**. Danach ist die Seite live unter:
`emma-lernt.de/[name]/`

---

## Sicherheitsregeln

> ### ⚠️ KRITISCH: Lies diesen Abschnitt vollständig!

### Was ist in Git (= was geht online)?

**Nur und ausschließlich** der Inhalt von `c:\wamp64\www\Lernplattform\`:

```
Online zugänglich (über emma-lernt.de):
✅ Lernplattform/index.html
✅ Lernplattform/reiterhof/...
✅ Lernplattform/aupair/...
✅ Lernplattform/subjects/...
```

### Was ist NIEMALS in Git (= privat, lokal)?

```
NIEMALS online:
🔒 c:\wamp64\www\KrankenAkten\       ← Medizinische Daten
🔒 c:\wamp64\www\BusinessDaten\      ← Geschäftsdaten
🔒 c:\wamp64\www\[andereOrdner]\     ← Alle anderen WWW-Ordner
🔒 *.pdf                             ← PDFs (durch .gitignore ausgeschlossen)
🔒 *.txt                             ← TXT-Dateien (durch .gitignore)
```

**Warum ist das sicher?**

Git kann physisch nur Dateien aufnehmen, die:
1. **Innerhalb** des Repository-Ordners (`c:\wamp64\www\Lernplattform\`) liegen UND
2. **Explizit** mit `git add` hinzugefügt wurden UND
3. **Nicht** in `.gitignore` ausgeschlossen sind

Es gibt keinen Befehl und keinen Weg, mit dem ein `git push` aus `Lernplattform/` heraus z.B. `c:\wamp64\www\KrankenAkten\` berühren könnte.

### Die drei Ebenen verstehen

```
[Internet / Netlify]                    [Nur Lernseiten sichtbar]
        ↕ nur GitHub-Repo Inhalt
[GitHub Repository]                     [Nur Lernplattform/]
        ↕ nur explizit gepushte Commits
[WAMP lokaler Server]                   [ALLE www/ Ordner lokal]
        |
        ├── Lernplattform/   → online (GitHub → Netlify)
        ├── KrankenAkten/    → NUR LOKAL, nie in Git
        └── BusinessDaten/   → NUR LOKAL, nie in Git
```

### ⚠️ Wichtiger Hinweis zum WAMP-Server

**WAMP dient alle Ordner unter `c:\wamp64\www\` lokal.**
Das bedeutet: `http://localhost/KrankenAkten/` ist vom **lokalen Rechner** aus erreichbar.

**Das ist nur dann ein Problem, wenn:**
- Der Router auf Port 80 forwarded (Portweiterleitung aktiv)
- WAMP als öffentlicher Webserver konfiguriert ist

**Empfehlung:**
1. Überprüfe deinen Router: Port 80 und 443 sollten **NICHT** weitergeleitet sein
2. Gehe zu WAMP → Icon rechtsklick → "Put Online" nur aktivieren wenn nötig
3. Medizinische und Geschäftsdaten **am besten außerhalb von `www/`** speichern, z.B. unter `c:\Privat\KrankenAkten\` — dann kann kein Webserver sie je ausliefern

### Goldene Regeln

```
✅ Tu das:
   - Immer von c:\wamp64\www\Lernplattform\ aus arbeiten
   - Vor git push: git status prüfen, nur erwartete Dateien sehen
   - Eindeutige Namespaces für jede neue Plattform

❌ Tue das NIE:
   - git init in c:\wamp64\www\ (übergeordneter Ordner!)
   - git add .. oder git add c:\wamp64\www\ (außerhalb des Repos)
   - Krankenakten / Businessdaten in den Lernplattform-Ordner kopieren
   - Port-Forwarding im Router für WAMP aktivieren
```

---

## Checkliste für neue Seiten

Bevor du eine neue Lernseite in Git aufnimmst:

- [ ] **Unterordner:** Liegt in `Lernplattform/[neue-seite]/`?
- [ ] **Name:** Nur Kleinbuchstaben, keine Leerzeichen, kein Großbuchstabe?
- [ ] **Namespace:** Eigener eindeutiger Prefix in core.js / app.js?
- [ ] **Namespace verglichen:** Prefix kommt nirgendwo sonst vor?
- [ ] **Links alle relativ:** Kein `/assets/...` am Anfang von Pfaden?
- [ ] **Lokales Testen:** `http://localhost/Lernplattform/[neue-seite]/` funktioniert?
- [ ] **F12 Console:** Keine Fehler, keine 404?
- [ ] **git status:** Nur die erwarteten neuen Dateien zu sehen?
- [ ] **Keine sensiblen Daten:** Kein PDF, kein TXT, keine privaten Dateien?
- [ ] **Commit-Nachricht:** Aussagekräftig auf Deutsch?

---

## Schnellreferenz

```powershell
# Neue Seite deployen
cd "c:\wamp64\www\Lernplattform"
git add [ordnername]/
git status
git commit -m "Neue Seite: [Person/Thema]"
git push

# Änderungen an bestehender Datei
git add [geänderte-datei]
git commit -m "[Was wurde geändert]"
git push

# Status anzeigen (was ist ungespeichert?)
git status

# Letzte Commits anzeigen
git log --oneline -10
```

---

*Letzte Aktualisierung: April 2026 — Diese Datei bitte aktuell halten wenn neue Seiten hinzukommen!*
