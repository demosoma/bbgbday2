// useChapterDetector.js
// Runs inside rAF — reads playerX from getState(), determines the active chapter,
// and dispatches only when the chapter or progress changes enough to matter.
// No React subscriptions → zero re-renders caused by this hook.

import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { getChapterAtX } from '../data/chapters';

const PROGRESS_UPDATE_THRESHOLD = 0.005; // Only dispatch if progress changed by 0.5%

export const useChapterDetector = () => {
  useEffect(() => {
    let rafId;
    let lastChapterId = null;
    let lastProgress = -1;

    const tick = () => {
      const state = useGameStore.getState();
      const { chapter, progress } = getChapterAtX(state.player.x);

      const chapterChanged = chapter.id !== lastChapterId;
      const progressChanged = Math.abs(progress - lastProgress) > PROGRESS_UPDATE_THRESHOLD;

      if (chapterChanged || progressChanged) {
        state.setActiveChapter(chapter, progress);
        lastChapterId = chapter.id;
        lastProgress = progress;
      }

      // Advance sky blend every frame
      if (state.skyBlend < 1) {
        state.advanceSkyBlend(0.02);
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);
};
