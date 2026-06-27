// useMusicManager.js
// React hook that bridges the chapter store and the musicManager singleton.
// Subscribes to activeChapter and fires crossfades when the chapter changes.

import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';
import { musicManager } from '../utils/musicManager';

export const useMusicManager = () => {
  const activeChapter = useGameStore((s) => s.activeChapter);
  const lastChapterId = useRef(null);

  useEffect(() => {
    if (!activeChapter) return;
    if (activeChapter.id === lastChapterId.current) return;

    lastChapterId.current = activeChapter.id;

    // Crossfade chapter music
    if (activeChapter.music) {
      musicManager.playChapter(activeChapter.music);
    } else {
      musicManager.playChapter(null); // Stop chapter track if none defined
    }
  }, [activeChapter]);
};
