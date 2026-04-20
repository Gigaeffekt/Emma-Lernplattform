# 🎯 Emma Lernplattform – Setup Anleitung

**Deine Email bei GitHub:** Jennifergiga@gigaeffekt.de

---

## SCHRITT 1: GitHub Desktop installieren

> ⏱️ **5 Minuten** | Auf deinem PC

1. Gehe auf **github.com/apps/desktop**
2. Klick auf **„Download for Windows"**
3. Installiere die Datei (einfach durchklicken)
4. Starte **GitHub Desktop**
5. Melde dich an mit: **Jennifergiga@gigaeffekt.de**

**Fertig!** GitHub Desktop lädt jetzt.

---

## SCHRITT 2: GitHub Repository erstellen

> ⏱️ **2 Minuten** | Auf github.com

1. Gehe auf **github.com**
2. Melde dich an (mit Jennifergiga@gigaeffekt.de)
3. Oben rechts: **+** Menü → **„New repository"**
4. Füll aus:
   - **Repository name:** `emma-lernplattform`
   - **Description:** Emma – Spanisch Lernplattform
   - **Public** (damit Netlify zugreifen kann)
   - Klick **„Create repository"**

**Fertig!** Das Repository existiert jetzt online.

---

## SCHRITT 3: Dein lokales Projekt zu GitHub verbinden

> ⏱️ **5 Minuten** | In GitHub Desktop

1. Öffne **GitHub Desktop**
2. Klick auf **„File"** → **„Add Local Repository"**
3. Wähle den Ordner: **C:\wamp64\www\Lernplattform**
4. Klick **„Add Repository"**
5. Oben: **„Publish repository"**
6. Wähle: **emma-lernplattform**
7. Stelle sicher: **Public** ist ausgewählt
8. Klick **„Publish"**

🎉 **Fertig!** Dein lokaler Ordner ist jetzt mit GitHub verbunden!

---

## SCHRITT 4: Erste Datei hochladen (Sync)

> ⏱️ **2 Minuten** | In GitHub Desktop

Das machst du jedes Mal, wenn du neue Inhalte bauen lässt:

1. In GitHub Desktop unten links: **Summary schreiben** (z.B. "PWA und neue Inhalte")
2. Klick **„Commit to main"**
3. Oben: Klick **„Sync"** oder **„Push"**
4. Fertig! Nach 30 Sekunden sind die Dateien online

---

## SCHRITT 5: Netlify verbinden (Online Hosting)

> ⏱️ **5 Minuten** | Auf netlify.com

1. Gehe auf **netlify.com**
2. Klick **„Sign up"**
3. Wähle: **„Continue with GitHub"**
4. Melde dich mit Jennifergiga@gigaeffekt.de an
5. Erlaube Netlify den Zugriff auf GitHub
6. Klick **„Import an existing project"**
7. Wähle **„GitHub"**
8. Suche: **emma-lernplattform**
9. Klick drauf
10. Bestätige die Einstellungen (alle Defaults okay)
11. Klick **„Deploy"**

⏳ **Warten Sie 2-3 Minuten...**

🎉 **Fertig!** Du bekommst eine URL wie: **emma-lernplattform.netlify.app**

---

## SCHRITT 6: Domain mit Netlify verbinden (GoDaddy)

> ⏱️ **10 Minuten** | GoDaddy + Netlify

### Bei Netlify:

1. Gehe auf **netlify.com** → Dein Dashboard
2. Öffne das Projekt **emma-lernplattform**
3. Klick auf **„Domain settings"** oder **„Site settings"**
4. Klick **„Add custom domain"**
5. Gib ein: **emma-lernt.de**
6. Klick **„Verify"**
7. Unter **„Nameserver settings"** kopiere die 2 Netlify Nameserver (dney….)

### Bei GoDaddy:

1. Gehe auf **godaddy.com**
2. Klick **„Meine Produkte"**
3. Klick **„Domains"**
4. Wähle **emma-lernt.de**
5. Klick **„DNS verwalten"** oder einfach **„Nameserver"**
6. Klick **„Nameserver ändern"**
7. Ersetze die GoDaddy Nameserver mit den **Netlify Nameservern** (aus Schritt 7 oben)
8. Speichern

⏳ **Warten Sie 24-48 Stunden...** (DNS braucht Zeit)

🎉 **Fertig!** Nach 24h funktioniert **emma-lernt.de** !

---

## SCHRITT 7: Emma's App speichern (Schulipad)

> ⏱️ **1 Minute** | Auf dem Schulipad

1. Safari öffnen
2. Geh auf **emma-lernt.de**
3. Unten drücken: **„Teilen"** (Share-Icon)
4. Scroll down → **„Zum Home-Bildschirm"**
5. Im Popup: **„Hinzufügen"**
6. Fertig!

Ein App-Icon erscheint auf dem Homescreen. Emma kann es jetzt wie eine echte App verwenden.

---

## 🔄 Das wiederholst du jedes Mal, wenn ich neue Inhalte baue:

1. Ich baue neue Dateien (z.B. neue Übungen)
2. Du machst einen **Sync** in GitHub Desktop (1 Klick)
3. Nach 30 Sekunden: neue Inhalte sind online
4. Emma und alle anderen sehen die Updates

---

## 🆘 Problems?

| Problem | Lösung |
|---|---|
| GitHub Desktop findet den Ordner nicht | Versuche: `C:\wamp64\www\Lernplattform` (mit Backslash) |
| Netlify sagt „Forbidden" | Prüfe: Repository ist **Public** bei GitHub |
| emma-lernt.de geht nicht | Warten Sie 24h, dann prüfen Sie GoDaddy DNS nochmal |
| App auf iPad wird nicht angeboten | Prüfe: Safari öffnet emma-lernt.de (mit https), nicht localhost |

---

## ✅ Checkliste

- [ ] GitHub Desktop installiert
- [ ] GitHub-Konto erstellt
- [ ] Repository `emma-lernplattform` erstellt
- [ ] Lokal Projekt zu GitHub verbunden
- [ ] Erster Sync gemacht
- [ ] Netlify-Projekt erstellt
- [ ] Domain **emma-lernt.de** in GoDaddy gekauft
- [ ] Netlify Nameserver in GoDaddy eingegeben
- [ ] 24h gewartet
- [ ] emma-lernt.de funktioniert
- [ ] App auf iPad gespeichert

