// PhotoObject.jsx — World object: a polaroid photo resting in the world
import React from 'react';

export const PhotoObject = ({ el }) => (
  <div
    style={{
      position: 'absolute',
      left: `${el.x}px`,
      top: `${el.y}px`,
      pointerEvents: 'none',
      animation: 'floatBob 4s ease-in-out infinite',
      animationDelay: `${(el.x % 8) * 0.25}s`,
      transform: `rotate(${((el.x % 10) - 5) * 1.5}deg)`,
    }}
  >
    <svg width="44" height="52" viewBox="0 0 44 52">
      {/* Polaroid frame */}
      <rect x="0" y="0" width="44" height="52" rx="3" fill="#f9f5f0" />
      {/* Photo area */}
      <rect x="4" y="4" width="36" height="32" fill="#c4d4e8" rx="2" />
      {/* Tiny landscape in photo */}
      <rect x="4" y="28" width="36" height="8" fill="#4a7c4f" />
      <ellipse cx="14" cy="24" rx="8" ry="6" fill="#3a6b3f" />
      <ellipse cx="26" cy="22" rx="6" ry="5" fill="#2d5236" />
      {/* Caption area */}
      <rect x="6" y="40" width="32" height="8" rx="2" fill="#e8ddd0" />
      <line x1="9" y1="44" x2="35" y2="44" stroke="#c8b89a" strokeWidth="1.5" />
    </svg>
  </div>
);
