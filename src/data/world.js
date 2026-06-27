// world.js
// Master configuration for all world objects.
// Add objects here — no component code changes required.
// Objects are rendered by WorldObjectRenderer using the type registry.

export const worldData = {
  // ─────────────────────────────────────────────────────────────────────
  // MIDGROUND HILLS  (rendered by World.jsx background layer)
  // ─────────────────────────────────────────────────────────────────────
  midgroundElements: [
    { id: 'mid-hill-1',  x: 200,  type: 'hill', color: '#1a202c', height: 250, width: 400 },
    { id: 'mid-hill-2',  x: 800,  type: 'hill', color: '#2d3748', height: 200, width: 350 },
    { id: 'mid-hill-3',  x: 1500, type: 'hill', color: '#1a202c', height: 280, width: 500 },
    { id: 'mid-hill-4',  x: 2200, type: 'hill', color: '#2d3748', height: 220, width: 400 },
    { id: 'mid-hill-5',  x: 3000, type: 'hill', color: '#1a202c', height: 300, width: 600 },
    { id: 'mid-hill-6',  x: 4200, type: 'hill', color: '#2d3748', height: 240, width: 450 },
    { id: 'mid-hill-7',  x: 5200, type: 'hill', color: '#1a202c', height: 260, width: 500 },
    { id: 'mid-hill-8',  x: 6400, type: 'hill', color: '#2d3748', height: 200, width: 400 },
    { id: 'mid-hill-9',  x: 7500, type: 'hill', color: '#1a202c', height: 280, width: 550 },
    { id: 'mid-hill-10', x: 8500, type: 'hill', color: '#2d3748', height: 240, width: 480 },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // FOREGROUND ELEMENTS  (interactive world layer, 1:1 scroll)
  // ─────────────────────────────────────────────────────────────────────
  foregroundElements: [
    // ── CHAPTER: birth (0–1100) ─────────────────────────────────────
    { id: 'protagonist-house', x: 250, y: 220, type: 'house', width: 300, height: 200,
      title: 'Trimurti', chapter: 'birth' },
    { id: 'tree-1',   x: 680,  y: 260, type: 'tree', height: 180, width: 80, chapter: 'birth' },
    { id: 'tree-2',   x: 720,  y: 280, type: 'tree', height: 150, width: 70, chapter: 'birth' },
    { id: 'flower-1', x: 660,  y: 410, type: 'flower', color: '#f687b3', chapter: 'birth' },
    { id: 'flower-2', x: 680,  y: 425, type: 'flower', color: '#feb2b2', chapter: 'birth' },
    { id: 'marker-birth', x: 950, y: 350, type: 'memoryMarker',
      label: 'Birth', chapter: 'birth' },

    // ── CHAPTER: growing_up (1100–2200) ─────────────────────────────
    { id: 'tree-3',    x: 1200, y: 250, type: 'tree',   height: 200, width: 90, chapter: 'growing_up' },
    { id: 'tree-4',    x: 1240, y: 270, type: 'tree',   height: 170, width: 80, chapter: 'growing_up' },
    { id: 'flower-3',  x: 1280, y: 410, type: 'flower', color: '#faf089', chapter: 'growing_up' },
    { id: 'flower-4',  x: 1300, y: 420, type: 'flower', color: '#9f7aea', chapter: 'growing_up' },
    { id: 'fence-1',   x: 1450, y: 385, type: 'fence',  count: 6,   chapter: 'growing_up' },
    { id: 'photo-1',   x: 1850, y: 380, type: 'photo',
      interactionId: 'photo_childhood_01', label: 'A memory', chapter: 'growing_up' },
    { id: 'tree-5',    x: 2020, y: 260, type: 'tree',   height: 160, width: 75, chapter: 'growing_up' },
    { id: 'marker-growing', x: 2150, y: 350, type: 'memoryMarker',
      label: 'Growing Up', chapter: 'growing_up' },

    // ── CHAPTER: school (2200–3300) ──────────────────────────────────
    { id: 'tree-6',    x: 2400, y: 260, type: 'tree',   height: 190, width: 85, chapter: 'school' },
    { id: 'tree-7',    x: 2450, y: 280, type: 'tree',   height: 210, width: 90, chapter: 'school' },
    { id: 'flower-5',  x: 2520, y: 420, type: 'flower', color: '#68d391', chapter: 'school' },
    { id: 'flower-6',  x: 2540, y: 435, type: 'flower', color: '#f6ad55', chapter: 'school' },
    { id: 'fence-2',   x: 2680, y: 380, type: 'fence',  count: 8,   chapter: 'school' },
    { id: 'letter-1',  x: 2950, y: 390, type: 'letter',
      interactionId: 'letter_001', label: 'A letter', chapter: 'school' },
    { id: 'marker-school', x: 3200, y: 350, type: 'memoryMarker',
      label: 'School', chapter: 'school' },

    // ── CHAPTER: college (3300–4500) ─────────────────────────────────
    { id: 'tree-8',    x: 3500, y: 270, type: 'tree',   height: 190, width: 85, chapter: 'college' },
    { id: 'tree-9',    x: 3560, y: 280, type: 'tree',   height: 220, width: 95, chapter: 'college' },
    { id: 'flower-7',  x: 3700, y: 420, type: 'flower', color: '#b794f4', chapter: 'college' },
    { id: 'photo-2',   x: 3900, y: 380, type: 'photo',
      interactionId: 'photo_college_01', label: 'College days', chapter: 'college' },
    { id: 'fence-3',   x: 4100, y: 380, type: 'fence',  count: 5,   chapter: 'college' },
    { id: 'marker-college', x: 4350, y: 350, type: 'memoryMarker',
      label: 'College', chapter: 'college' },

    // ── CHAPTER: meeting (4500–5700) ─────────────────────────────────
    { id: 'tree-10',   x: 4680, y: 260, type: 'tree',   height: 180, width: 80, chapter: 'meeting' },
    { id: 'tree-11',   x: 4730, y: 280, type: 'tree',   height: 200, width: 88, chapter: 'meeting' },
    { id: 'flower-8',  x: 4850, y: 430, type: 'flower', color: '#f687b3', chapter: 'meeting' },
    { id: 'flower-9',  x: 4880, y: 420, type: 'flower', color: '#faf089', chapter: 'meeting' },
    { id: 'letter-2',  x: 5200, y: 390, type: 'letter',
      interactionId: 'letter_002', label: 'When we met', chapter: 'meeting' },
    { id: 'marker-meeting', x: 5550, y: 350, type: 'memoryMarker',
      label: 'When We Met', chapter: 'meeting' },

    // ── CHAPTER: letters (5700–7000) ─────────────────────────────────
    { id: 'tree-12',   x: 5880, y: 260, type: 'tree',   height: 190, width: 82, chapter: 'letters' },
    { id: 'tree-13',   x: 5930, y: 280, type: 'tree',   height: 200, width: 90, chapter: 'letters' },
    { id: 'flower-10', x: 6050, y: 430, type: 'flower', color: '#9f7aea', chapter: 'letters' },
    { id: 'letter-3',  x: 6220, y: 390, type: 'letter',
      interactionId: 'letter_003', label: 'A note', chapter: 'letters' },
    { id: 'fence-4',   x: 6420, y: 380, type: 'fence',  count: 6,   chapter: 'letters' },
    { id: 'letter-4',  x: 6650, y: 390, type: 'letter',
      interactionId: 'letter_004', label: 'Another note', chapter: 'letters' },
    { id: 'marker-letters', x: 6900, y: 350, type: 'memoryMarker',
      label: 'Letters', chapter: 'letters' },

    // ── CHAPTER: wish_tree (7000–8200) ───────────────────────────────
    { id: 'tree-14',    x: 7100, y: 260, type: 'tree',  height: 180, width: 80, chapter: 'wish_tree' },
    { id: 'flower-11',  x: 7220, y: 430, type: 'flower', color: '#d6bcfa', chapter: 'wish_tree' },
    { id: 'flower-12',  x: 7250, y: 420, type: 'flower', color: '#f687b3', chapter: 'wish_tree' },
    { id: 'wish-tree-1', x: 7550, y: 140, type: 'wishTree', width: 180, height: 300,
      chapter: 'wish_tree', label: 'The Wish Tree' },
    { id: 'flower-13',  x: 7800, y: 440, type: 'flower', color: '#faf089', chapter: 'wish_tree' },
    { id: 'marker-wish', x: 8050, y: 350, type: 'memoryMarker',
      label: 'Wish Tree', chapter: 'wish_tree' },

    // ── CHAPTER: gallery (8200–9400) ─────────────────────────────────
    { id: 'tree-15',  x: 8350, y: 260, type: 'tree',   height: 200, width: 90, chapter: 'gallery' },
    { id: 'tree-16',  x: 8400, y: 280, type: 'tree',   height: 220, width: 95, chapter: 'gallery' },
    { id: 'flower-14',x: 8520, y: 430, type: 'flower', color: '#fcd34d', chapter: 'gallery' },
    { id: 'flower-15',x: 8555, y: 420, type: 'flower', color: '#f687b3', chapter: 'gallery' },
    // Gallery board — the interactive moment
    { id: 'gallery-board-1', x: 8760, y: 310, type: 'gallery',
      chapter: 'gallery', label: 'Gallery of Moments' },
    { id: 'flower-g1', x: 8900, y: 440, type: 'flower', color: '#a5b4fc', chapter: 'gallery' },
    { id: 'fence-6',   x: 9050, y: 380, type: 'fence',  count: 5,   chapter: 'gallery' },
    { id: 'tree-g1',   x: 9200, y: 260, type: 'tree',   height: 185, width: 85, chapter: 'gallery' },

    // ── CHAPTER: future / The Last Letter (9400–10800) ───────────────
    { id: 'tree-17',   x: 9500, y: 260, type: 'tree',   height: 200, width: 90, chapter: 'future' },
    { id: 'flower-16', x: 9620, y: 435, type: 'flower', color: '#a5b4fc', chapter: 'future' },
    { id: 'cake-1',    x: 9820, y: 370, type: 'cake',   chapter: 'future', label: 'Happy Birthday!' },
    { id: 'flower-17', x: 10020, y: 430, type: 'flower', color: '#f9a8d4', chapter: 'future' },
    { id: 'tree-18',   x: 10180, y: 265, type: 'tree',  height: 190, width: 88, chapter: 'future' },
    // The Last Letter — emotional ending trigger
    { id: 'final-letter', x: 10400, y: 385, type: 'letter',
      interactionId: 'letter_final', label: 'A Final Letter', chapter: 'future' },
    { id: 'flower-18', x: 10560, y: 435, type: 'flower', color: '#d6bcfa', chapter: 'future' },
  ],
};
