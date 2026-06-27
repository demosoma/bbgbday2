import { useEffect } from 'react';
import { useGameStore } from '../stores/gameStore';

export const useCameraFollow = (viewportWidth) => {
  useEffect(() => {
    let animationFrameId;

    const updateCamera = () => {
      const state = useGameStore.getState();
      const targetCamX = state.player.x - viewportWidth / 2;
      // Clamp camera within world boundaries
      const clampedTargetX = Math.max(0, Math.min(state.worldWidth - viewportWidth, targetCamX));

      // Smooth interpolation (lerp)
      const currentX = state.camera.x;
      const lerpSpeed = state.camera.lerpSpeed;
      const newX = currentX + (clampedTargetX - currentX) * lerpSpeed;

      // Update store only if change is visible (avoid micro-ticks)
      if (Math.abs(newX - currentX) > 0.05) {
        state.setCameraX(newX);
      }

      animationFrameId = requestAnimationFrame(updateCamera);
    };

    animationFrameId = requestAnimationFrame(updateCamera);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [viewportWidth]);
};
