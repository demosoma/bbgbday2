// Flower.jsx — Animated SVG flower with gentle sway
import React from 'react';

export const FlowerObject = ({ el }) => {
  const color = el.color ?? '#f687b3';
  const delay = `${(el.x % 5) * 0.4}s`;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        pointerEvents: 'none',
        transformOrigin: 'bottom center',
        animation: `flowerSway 3s ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      <svg width="24" height="36" viewBox="0 0 24 36">
        {/* Stem */}
        <line x1="12" y1="14" x2="12" y2="36" stroke="#48bb78" strokeWidth="2" />
        {/* Petals */}
        <circle cx="12" cy="7"  r="5" fill={color} opacity="0.9" />
        <circle cx="7"  cy="12" r="5" fill={color} opacity="0.9" />
        <circle cx="17" cy="12" r="5" fill={color} opacity="0.9" />
        <circle cx="12" cy="17" r="5" fill={color} opacity="0.9" />
        {/* Center */}
        <circle cx="12" cy="12" r="4" fill="#faf089" />
      </svg>
    </div>
  );
};
