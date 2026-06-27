import { useEffect, useRef } from 'react';
import { useGameStore } from '../stores/gameStore';

export const usePlayerControls = () => {
  const activeKeys = useRef(new Set());

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        activeKeys.current.add(key);
      }

      // Open interaction with E
      if (key === 'e') {
        const state = useGameStore.getState();
        if (state.interactionTarget && !state.isInteracting) {
          state.openInteraction();
        }
      }

      // Close interaction with Escape
      if (key === 'escape') {
        const state = useGameStore.getState();
        if (state.isInteracting) {
          state.closeInteraction();
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
        activeKeys.current.delete(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationFrameId;

    const tick = () => {
      const state = useGameStore.getState();

      // Pause movement while an interaction overlay is open or ending is active
      if (state.isInteracting || state.isEnding) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      const keys = activeKeys.current;
      let dx = 0;
      let dy = 0;
      let dir = state.player.dir;

      const moveUp    = keys.has('w') || keys.has('arrowup');
      const moveDown  = keys.has('s') || keys.has('arrowdown');
      const moveLeft  = keys.has('a') || keys.has('arrowleft');
      const moveRight = keys.has('d') || keys.has('arrowright');

      if (moveUp)    { dy = -1; dir = 'back';  }
      if (moveDown)  { dy =  1; dir = 'front'; }
      if (moveLeft)  { dx = -1; dir = 'left';  }
      if (moveRight) { dx =  1; dir = 'right'; }

      const isMoving = dx !== 0 || dy !== 0;

      if (isMoving) {
        const length = Math.sqrt(dx * dx + dy * dy);
        const nx = dx / length;
        const ny = dy / length;

        let newX = state.player.x + nx * state.player.speed;
        let newY = state.player.y + ny * state.player.speed;

        newX = Math.max(50, Math.min(state.worldWidth - 50, newX));
        newY = Math.max(state.pathMinY, Math.min(state.pathMaxY, newY));

        state.updatePlayer({ x: newX, y: newY, dir, isMoving: true });
      } else {
        if (state.player.isMoving) {
          state.updatePlayer({ isMoving: false });
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
};
