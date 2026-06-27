// MemoryMarker.jsx — World object: a glowing stone marker / milestone
import React from 'react';

export const MemoryMarkerObject = ({ el, isTarget }) => {
  const w = 65;
  const h = 91;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        pointerEvents: 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        filter: isTarget ? 'drop-shadow(0 0 12px rgba(180, 150, 255, 0.95))' : 'none',
        animation: isTarget ? 'floatBob 2.8s ease-in-out infinite' : 'none',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 50 70" style={{ display: 'block', overflow: 'visible' }}>
        {/* Stone post */}
        <rect x="18" y="30" width="14" height="38" rx="3" fill="#6b7280" />
        {/* Stone cap */}
        <ellipse cx="25" cy="32" rx="18" ry="22" fill="#9ca3af" />
        <ellipse cx="25" cy="28" rx="18" ry="20" fill="#d1d5db" />
        {/* Engraved symbol */}
        <text x="25" y="30" textAnchor="middle" fontSize="14" fill="#6b7280">★</text>
        {/* Label */}
        {el.label && (
          <text x="25" y="68" textAnchor="middle" fontSize="7"
            fill="rgba(255,255,255,0.7)" fontFamily="serif" fontStyle="italic">
            {el.label}
          </text>
        )}
        {/* Glow */}
        <ellipse cx="25" cy="68" rx="14" ry="4" fill="rgba(180,160,220,0.25)" />
      </svg>
      {/* Pulsing halo */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: isTarget ? 'rgba(200,180,255,0.3)' : 'rgba(200,180,255,0.08)',
        animation: 'haloPulse 2.5s ease-in-out infinite',
        transition: 'background 0.4s ease',
      }} />
    </div>
  );
};
