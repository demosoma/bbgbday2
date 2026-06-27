// chapters.js
// Configuration for all world chapters.
// Each chapter defines a world position range, sky theme, music, and ambient lighting.
// The player's X position determines the active chapter automatically.
// Add new chapters here — no code changes required elsewhere.

import { getChapterMusic } from './musicTracks.js';

export const chapters = [
  {
    id: 'birth',
    name: 'The Beginning',
    subtitle: 'Where it all started...',
    startX: 0,
    endX: 1100,
    skyTheme: 'dreamy_night',
    music: getChapterMusic('birth'),
    ambientLight: 'rgba(20, 10, 60, 0.25)',
    objects: [],
  },
  {
    id: 'growing_up',
    name: 'Growing Up',
    subtitle: 'Small hands, big dreams...',
    startX: 1100,
    endX: 2200,
    skyTheme: 'early_morning',
    music: getChapterMusic('growing_up'),
    ambientLight: 'rgba(255, 180, 80, 0.08)',
    objects: [],
  },
  {
    id: 'school',
    name: 'School Days',
    subtitle: 'Pencils, paper, and laughter...',
    startX: 2200,
    endX: 3300,
    skyTheme: 'golden_hour',
    music: getChapterMusic('school'),
    ambientLight: 'rgba(255, 200, 100, 0.1)',
    objects: [],
  },
  {
    id: 'college',
    name: 'College',
    subtitle: 'Finding yourself...',
    startX: 3300,
    endX: 4500,
    skyTheme: 'afternoon',
    music: getChapterMusic('college'),
    ambientLight: 'rgba(100, 180, 255, 0.05)',
    objects: [],
  },
  {
    id: 'meeting',
    name: 'When We Met',
    subtitle: 'The universe conspired...',
    startX: 4500,
    endX: 5700,
    skyTheme: 'golden_hour',
    music: getChapterMusic('meeting'),
    ambientLight: 'rgba(255, 160, 80, 0.12)',
    objects: [],
  },
  {
    id: 'letters',
    name: 'Letters',
    subtitle: 'Words that held us together...',
    startX: 5700,
    endX: 7000,
    skyTheme: 'dreamy_night',
    music: getChapterMusic('letters'),
    ambientLight: 'rgba(130, 80, 255, 0.1)',
    objects: [],
  },
  {
    id: 'wish_tree',
    name: 'The Wish Tree',
    subtitle: 'Make a wish...',
    startX: 7000,
    endX: 8200,
    skyTheme: 'starry_night',
    music: getChapterMusic('wish_tree'),
    ambientLight: 'rgba(60, 20, 120, 0.2)',
    objects: [],
  },
  {
    id: 'gallery',
    name: 'Gallery of Moments',
    subtitle: 'A stroll through our memories...',
    startX: 8200,
    endX: 9400,
    skyTheme: 'golden_hour',
    music: getChapterMusic('gallery') || null,
    ambientLight: 'rgba(255, 180, 80, 0.08)',
    objects: [],
  },
  {
    id: 'future',
    name: 'The Future',
    subtitle: 'Everything ahead of us...',
    startX: 9400,
    endX: 10800,
    skyTheme: 'sunrise',
    music: getChapterMusic('future'),
    ambientLight: 'rgba(255, 220, 150, 0.1)',
    objects: [],
  },
];

/**
 * Returns the chapter the player is currently in based on their X position.
 * @param {number} playerX
 * @returns {{ chapter: object, progress: number }}
 */
export const getChapterAtX = (playerX) => {
  for (const chapter of chapters) {
    if (playerX >= chapter.startX && playerX < chapter.endX) {
      const progress = (playerX - chapter.startX) / (chapter.endX - chapter.startX);
      return { chapter, progress: Math.max(0, Math.min(1, progress)) };
    }
  }
  const last = chapters[chapters.length - 1];
  return { chapter: last, progress: 1 };
};
