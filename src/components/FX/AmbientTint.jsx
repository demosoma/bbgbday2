// AmbientTint.jsx
// Full-screen overlay that blends the current chapter's ambient light colour.
// Driven entirely by store data — no hardcoded colours.

import React from 'react';
import { useGameStore } from '../../stores/gameStore';

export const AmbientTint = () => {
  const activeChapter = useGameStore((s) => s.activeChapter);
  const color = activeChapter?.ambientLight ?? 'rgba(0,0,0,0)';

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: color,
        pointerEvents: 'none',
        zIndex: 9,
        transition: 'background 3s ease',
      }}
    />
  );
};
