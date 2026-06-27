// useProximityDetector.js
// Runs in rAF, reads player position and world objects from getState().
// Finds the nearest interactable object within INTERACTION_RADIUS pixels.
// Sets interactionTarget in the store. Zero React subscriptions.

import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';
import { worldData } from '../data/world';

const INTERACTION_RADIUS = 90; // px

// Filter to objects that have interaction capability
const interactableTypes = new Set(['letter', 'photo', 'wishTree', 'gallery', 'cake', 'memoryMarker']);

const interactableObjects = worldData.foregroundElements.filter(
  (el) => interactableTypes.has(el.type)
);

export const useProximityDetector = () => {
  useEffect(() => {
    let rafId;
    let lastTargetId = null;

    const tick = () => {
      const state = useGameStore.getState();

      // Don't run while an interaction is open
      if (state.isInteracting) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const px = state.player.x;
      const py = state.player.y;

      let nearest = null;
      let nearestDist = Infinity;

      for (const obj of interactableObjects) {
        const dx = obj.x - px;
        // Project tall objects (like wishTree) to the player's Y for proximity detection
        const targetY = obj.type === 'wishTree' ? py : obj.y;
        const dy = targetY - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < INTERACTION_RADIUS && dist < nearestDist) {
          nearestDist = dist;
          nearest = obj;
        }
      }

      const newId = nearest?.id ?? null;
      if (newId !== lastTargetId) {
        state.setInteractionTarget(nearest ? { ...nearest } : null);
        lastTargetId = newId;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);
};
