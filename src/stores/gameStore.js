import { create } from 'zustand';

export const useGameStore = create((set) => ({
  // Player State
  player: {
    x: 400, // Spawn x
    y: 350, // Spawn y (within path bounds)
    dir: 'front', // front, back, left, right
    isMoving: false,
    speed: 5, // Pixels per frame
  },
  
  // Camera State
  camera: {
    x: 400,
    lerpSpeed: 0.08, // Camera follow smoothing factor
  },

  // World Boundaries
  worldWidth: 6000, // Width of our scrollable canvas
  worldHeight: 600, // Height of the viewport
  pathMinY: 300,    // Top edge of the walkable path
  pathMaxY: 480,    // Bottom edge of the walkable path

  // Actions
  setPlayerPosition: (x, y) => set((state) => ({
    player: { ...state.player, x, y }
  })),

  updatePlayer: (updates) => set((state) => ({
    player: { ...state.player, ...updates }
  })),

  setCameraX: (x) => set((state) => ({
    camera: { ...state.camera, x }
  })),

  setWorldWidth: (width) => set({ worldWidth: width }),
}));
