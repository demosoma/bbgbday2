// gameStore.js — Extended with chapter and interaction state

import { create } from 'zustand';

export const useGameStore = create((set) => ({
  // ─── Player ────────────────────────────────────────────────
  player: {
    x: 400,
    y: 350,
    dir: 'front',
    isMoving: false,
    speed: 5,
  },

  // ─── Camera ────────────────────────────────────────────────
  camera: {
    x: 400,
    lerpSpeed: 0.08,
  },

  // ─── World Boundaries ──────────────────────────────────────
  worldWidth: 10800,
  worldHeight: 600,
  pathMinY: 300,
  pathMaxY: 480,

  // ─── Chapter State ─────────────────────────────────────────
  activeChapter: null,       // current chapter object
  chapterProgress: 0,        // 0–1 within the current chapter
  prevChapterId: null,       // for sky interpolation (previous chapter's sky theme)
  skyBlend: 0,               // 0–1 blend between prevChapter sky and activeChapter sky

  // ─── Interaction State ─────────────────────────────────────
  interactionTarget: null,   // nearest interactable object in range { id, type, x, y, data }
  isInteracting: false,      // true while an interaction overlay is open
  finalLetterRead: false,    // true once the final letter has been closed
  isEnding: false,           // true when the end sequence is triggered

  // ─── Actions ───────────────────────────────────────────────
  updatePlayer: (updates) => set((state) => ({
    player: { ...state.player, ...updates },
  })),

  setCameraX: (x) => set((state) => ({
    camera: { ...state.camera, x },
  })),

  setActiveChapter: (chapter, progress) => set((state) => {
    // When chapter changes, record the previous sky theme for blending
    const prevId = state.activeChapter?.id ?? null;
    const chapterChanged = state.activeChapter?.id !== chapter.id;
    return {
      activeChapter: chapter,
      chapterProgress: progress,
      prevChapterId: chapterChanged ? (prevId ?? chapter.id) : state.prevChapterId,
      // Reset blend to 0 on chapter change so sky fades in from previous
      skyBlend: chapterChanged ? 0 : Math.min(1, state.skyBlend + 0.016),
    };
  }),

  advanceSkyBlend: (delta) => set((state) => ({
    skyBlend: Math.min(1, state.skyBlend + delta),
  })),

  setInteractionTarget: (target) => set({ interactionTarget: target }),

  openInteraction: () => set({ isInteracting: true }),

  closeInteraction: () => {
    set((state) => {
      const isFinalLetter = state.interactionTarget?.id === 'final-letter';
      return {
        isInteracting: false,
        interactionTarget: null,
        finalLetterRead: isFinalLetter ? true : state.finalLetterRead,
      };
    });
  },

  setEnding: (ending) => set({ isEnding: ending }),

  setWorldWidth: (width) => set({ worldWidth: width }),
}));
