// ===================================================
// LUNAS REITERHOF – cards.js
// Pferdekarten-Sammlung mit 20 echten Rassen
// Rarity: 0=Gewöhnlich ⬜ | 1=Selten ⭐ | 2=Episch 🌟 | 3=Legendär 💎
// ===================================================

const CARDS = {

  data: [
    // ── GEWÖHNLICH (⬜) ─────────────────────────────────
    {
      id: 'haflinger', name: 'Haflinger', rarity: 0,
      type: 'Pony / Kleinpferd', origin: '🇦🇹 Tirol, Österreich',
      bg: 'linear-gradient(135deg,#ffecd2,#fcb69f)', textColor: '#5c3d11',
      emoji: '🐴',
      trait: 'Goldenes Fuchs-Fell mit blonder Mähne',
      fact: 'Haflingers werden auch „Berggold Tirols" genannt – sanftmütig und ausdauernd!'
    },
    {
      id: 'shetlandpony', name: 'Shetlandpony', rarity: 0,
      type: 'Urpony', origin: '🇬🇧 Shetlandinseln, Schottland',
      bg: 'linear-gradient(135deg,#d7a67a,#a07050)', textColor: '#fff',
      emoji: '🐴',
      trait: 'Kleinstes europäisches Pony',
      fact: 'Trotz ihrer geringen Größe können Shetlands ihr eigenes Körpergewicht tragen!'
    },
    {
      id: 'islaender', name: 'Islandpferd', rarity: 0,
      type: 'Pony', origin: '🇮🇸 Island',
      bg: 'linear-gradient(135deg,#a8d8ea,#d4e8f5)', textColor: '#1a3a5c',
      emoji: '🐴',
      trait: 'Beherrscht den 5. Gang: Tölt',
      fact: 'Seit 982 n. Chr. wurden keine fremden Pferde nach Island eingeführt!'
    },
    {
      id: 'fjordpferd', name: 'Fjordpferd', rarity: 0,
      type: 'Urpony', origin: '🇳🇴 Norwegen',
      bg: 'linear-gradient(135deg,#fdf3cf,#e8d5a3)', textColor: '#4a3500',
      emoji: '🐴',
      trait: 'Schwarzer Aalstrich durch die Mähne',
      fact: 'Der Aalstrich – eine dunkle Linie vom Mähne bis zum Schweif – ist genetisch einzigartig!'
    },
    {
      id: 'appaloosa', name: 'Appaloosa', rarity: 0,
      type: 'Warmblut', origin: '🇺🇸 USA (Nez Percé Indianer)',
      bg: 'linear-gradient(135deg,#f5e8d8,#dfc5a8)', textColor: '#4a2c00',
      emoji: '🐴',
      trait: 'Tigerschecken-Fleckenmuster',
      fact: 'Das Appaloosa-Muster gibt es in 13 offiziell anerkannten Varianten!'
    },

    // ── SELTEN (⭐) ─────────────────────────────────────
    {
      id: 'hannoveraner', name: 'Hannoveraner', rarity: 1,
      type: 'Warmblut', origin: '🇩🇪 Hannover, Deutschland',
      bg: 'linear-gradient(135deg,#bee3f8,#90cdf4)', textColor: '#1a365d',
      emoji: '🐎',
      trait: 'Olympia-Pferd für Dressur & Springen',
      fact: 'Hannoveraner haben mehr Olympiamedaillen gewonnen als jede andere Warmblutrasse!'
    },
    {
      id: 'andalusier', name: 'Andalusier (PRE)', rarity: 1,
      type: 'Barockhengst', origin: '🇪🇸 Andalusien, Spanien',
      bg: 'linear-gradient(135deg,#e9d8fd,#d6bcfa)', textColor: '#44337a',
      emoji: '🐎',
      trait: 'Wallende Mähne, barocke Erscheinung',
      fact: 'PRE = Pura Raza Española – seit 500 Jahren nahezu unverändert gezüchtet!'
    },
    {
      id: 'trakehner', name: 'Trakehner', rarity: 1,
      type: 'Warmblut', origin: '🇩🇪 Ostpreußen / Trakehnen',
      bg: 'linear-gradient(135deg,#b7e4c7,#74c69d)', textColor: '#1a4731',
      emoji: '🐎',
      trait: 'Edelste ostp. Warmblutrasse',
      fact: 'Die Trakehner überlebten 1945 den dramatischen "Großen Treck" durch Eis und Schnee!'
    },
    {
      id: 'lusitano', name: 'Lusitano', rarity: 1,
      type: 'Barockhengst', origin: '🇵🇹 Portugal',
      bg: 'linear-gradient(135deg,#fbd38d,#f6ad55)', textColor: '#744210',
      emoji: '🐎',
      trait: 'Tapfer & wendig – Stierkampfpferd',
      fact: 'Lusitanos wurden für den Stierkampf gezüchtet – sie reagieren auf feinste Hilfen!'
    },
    {
      id: 'paint-horse', name: 'Paint Horse', rarity: 1,
      type: 'Quarter-Typ', origin: '🇺🇸 USA',
      bg: 'linear-gradient(135deg,#fed7aa,#fb923c)', textColor: '#7b341e',
      emoji: '🐎',
      trait: 'Zweifarbiges Pinto-Scheckmuster',
      fact: 'Kein zwei Paint Horses sehen gleich aus – jedes Muster ist ein Unikat!'
    },

    // ── EPISCH (🌟) ─────────────────────────────────────
    {
      id: 'friese', name: 'Friese', rarity: 2,
      type: 'Barockhengst', origin: '🇳🇱 Friesland, Niederlande',
      bg: 'linear-gradient(135deg,#2d2d2d,#1a1a1a)', textColor: '#ffd700',
      emoji: '🐎',
      trait: 'Tiefschwarz – kein einziges weißes Haar erlaubt',
      fact: 'Friesen dürfen ausschließlich schwarz sein – kein andersfarbiges Pferd kann zugelassen werden!'
    },
    {
      id: 'lipizzaner', name: 'Lipizzaner', rarity: 2,
      type: 'Barockhengst', origin: '🇸🇮 Lipica, Slowenien',
      bg: 'linear-gradient(135deg,#f0f0e8,#d4c98a)', textColor: '#2d1b00',
      emoji: '🐎',
      trait: 'Spanische Hofreitschule Wien',
      fact: 'Lipizzaner werden dunkelbraun geboren und werden erst mit 5–10 Jahren weiß!'
    },
    {
      id: 'knabstrupper', name: 'Knabstrupper', rarity: 2,
      type: 'Warmblut', origin: '🇩🇰 Dänemark',
      bg: 'linear-gradient(135deg,#fff0f0,#fedede)', textColor: '#c0392b',
      emoji: '🐎',
      trait: 'Weiß mit farbigen Tupfern – Tigerschecke',
      fact: 'Alle Knabstrupper gehen auf eine einzige gefleckte Stute zurück – 1812!'
    },
    {
      id: 'araber', name: 'Arabisches Vollblut', rarity: 2,
      type: 'Vollblut', origin: '🇸🇦 Arabische Halbinsel',
      bg: 'linear-gradient(135deg,#fffff0,#fefcbf)', textColor: '#744210',
      emoji: '🐎',
      trait: 'Eingesattelter Ramskopf – Dish-Face',
      fact: 'Araber haben anatomisch eine Rippe und einen Lendenwirbel weniger als andere Pferde!'
    },
    {
      id: 'schimmel', name: 'Schimmel (Araber-Typ)', rarity: 2,
      type: 'Vollblut', origin: '🌍 Nordafrika / Arabien',
      bg: 'linear-gradient(135deg,#f7fafc,#c8d6e5)', textColor: '#2d3748',
      emoji: '🐎',
      trait: 'Weißes Fell mit schwarzer Haut',
      fact: 'Schimmel werden nicht weiß geboren – sie verlieren ihre dunkle Farbe mit den Jahren!'
    },

    // ── LEGENDÄR (💎) ───────────────────────────────────
    {
      id: 'marwari', name: 'Marwari', rarity: 3,
      type: 'Orientalisches Vollblut', origin: '🇮🇳 Rajasthan, Indien',
      bg: 'linear-gradient(135deg,#faf3d0,#f6e05e)', textColor: '#744210',
      emoji: '🐎',
      trait: 'Ohrenspitzen biegen sich einwärts und berühren sich',
      fact: 'Marwari-Ohren können sich um 180 Grad drehen – das hören Reiterinnen und Reiter sogar Fliegen!'
    },
    {
      id: 'akhal-teke', name: 'Akhal-Teke', rarity: 3,
      type: 'Vollblut', origin: '🇹🇲 Turkmenistan',
      bg: 'linear-gradient(135deg,#ffd700,#ff8c00)', textColor: '#fff',
      emoji: '🐎',
      trait: 'Metallic-Glanz im Fell – wie flüssiges Gold',
      fact: 'Der Akhal-Teke gilt als schönstes Pferd der Welt und überquerte 1935 die Wüste Karakum!'
    },
    {
      id: 'camargue', name: 'Camargue-Pferd', rarity: 3,
      type: 'Urwildpferd', origin: '🇫🇷 Camargue, Südfrankreich',
      bg: 'linear-gradient(135deg,#e8f4f8,#5dade2)', textColor: '#fff',
      emoji: '🐎',
      trait: 'Halb wild – lebt in Salzsümpfen',
      fact: 'Camargue-Pferde fressen Wasserpflanzen und schwimmen regelmäßig im Mittelmeer!'
    },
    {
      id: 'shagya', name: 'Shagya-Araber', rarity: 3,
      type: 'Halbblut / Araber', origin: '🇭🇺 Babolna, Ungarn',
      bg: 'linear-gradient(135deg,#e9d8fd,#7b2ff7)', textColor: '#fff',
      emoji: '🐎',
      trait: 'Elegantester Araber-Typ Europas',
      fact: 'Alle Shagya-Araber stammen von einem einzigen Hengst ab – Shagya, 1836!'
    },
    {
      id: 'przewalski', name: 'Przewalski-Pferd', rarity: 3,
      type: 'Echtes Urwildpferd', origin: '🇲🇳 Mongolei',
      bg: 'linear-gradient(135deg,#feebc8,#c05621)', textColor: '#fff',
      emoji: '🐎',
      trait: 'Einziges wirkliches Wildpferd der Erde',
      fact: 'In der Wildnis ausgestorben – seit 1992 grasen wieder wilde Herden in der Mongolei!'
    }
  ],

  RARITY_NAMES:  ['Gewöhnlich', 'Selten', 'Episch', 'Legendär'],
  RARITY_EMOJIS: ['⬜', '⭐', '🌟', '💎'],
  RARITY_COLORS: ['#9ca3af', '#3b82f6', '#a855f7', '#f59e0b'],
  RARITY_GLOW:   ['none','0 0 18px #3b82f6','0 0 24px #a855f7','0 0 32px #f59e0b, 0 0 60px #f59e0b66'],

  // ── Sammlung ───────────────────────────────────────
  getCollection() {
    try { return JSON.parse(localStorage.getItem('reiterhof_cards') || '[]'); }
    catch { return []; }
  },
  saveCollection(col) { localStorage.setItem('reiterhof_cards', JSON.stringify(col)); },
  hasCard(id)  { return this.getCollection().includes(id); },
  addCard(id)  {
    const col = this.getCollection();
    const isNew = !col.includes(id);
    if (isNew) { col.push(id); this.saveCollection(col); }
    return isNew;
  },

  // ── Packs ──────────────────────────────────────────
  getPacks()    { return parseInt(localStorage.getItem('reiterhof_packs')  || '0'); },
  addPack(n=1)  { localStorage.setItem('reiterhof_packs',  this.getPacks()  + n); },
  usePack()     {
    const p = this.getPacks(); if (p <= 0) return false;
    localStorage.setItem('reiterhof_packs', p - 1); return true;
  },

  // ── Punkte ─────────────────────────────────────────
  getPoints()   { return parseInt(localStorage.getItem('reiterhof_points') || '0'); },
  addPoints(n)  {
    const p = this.getPoints() + n;
    localStorage.setItem('reiterhof_points', p); return p;
  },

  // ── Zufalls-Karten ────────────────────────────────
  randomByRarity(rarity) {
    const pool = this.data.filter(c => c.rarity === rarity);
    return pool[Math.floor(Math.random() * pool.length)];
  },
  randomCard() {
    const r = Math.random() * 100;
    const rarity = r < 3 ? 3 : r < 15 ? 2 : r < 45 ? 1 : 0;
    return this.randomByRarity(rarity);
  },
  openPack() {
    // Pack enthält immer mindestens 1 Selten-Karte
    const r = Math.random() * 100;
    const guaranteed = r < 5 ? 3 : r < 20 ? 2 : 1;
    return [
      this.randomByRarity(guaranteed),
      this.randomCard(),
      this.randomCard()
    ];
  },
  getCardById(id) { return this.data.find(c => c.id === id); }
};
