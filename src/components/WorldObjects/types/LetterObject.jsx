// LetterObject.jsx — World object: a sealed letter resting on the ground
import React from 'react';

export const LetterObject = ({ el, isTarget }) => {
  const w = 56;
  const h = 42;
  return (
    <div
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        pointerEvents: 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        filter: isTarget ? 'drop-shadow(0 0 12px rgba(255, 230, 150, 0.85))' : 'none',
        animation: isTarget ? 'floatBob 2s ease-in-out infinite' : 'none',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 40 30" style={{ display: 'block' }}>
        {/* Envelope body */}
        <rect x="0" y="0" width="40" height="30" rx="3" fill="#f5e6c8" stroke="#c8a87a" strokeWidth="1.5" />
        {/* Envelope flap lines */}
        <polyline points="0,0 20,18 40,0" fill="none" stroke="#c8a87a" strokeWidth="1.5" />
        <line x1="0" y1="30" x2="16" y2="15" stroke="#c8a87a" strokeWidth="1" />
        <line x1="40" y1="30" x2="24" y2="15" stroke="#c8a87a" strokeWidth="1" />
        {/* Wax seal */}
        <circle cx="20" cy="17" r="5" fill="#e53e3e" />
        <text x="20" y="20.5" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold">♥</text>
      </svg>
      {/* Glow beneath */}
      <div style={{
        position: 'absolute',
        bottom: '-4px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${w * 0.75}px`,
        height: '6px',
        background: isTarget ? 'rgba(255, 220, 150, 0.6)' : 'rgba(0, 0, 0, 0.1)',
        borderRadius: '50%',
        filter: 'blur(3px)',
        transition: 'all 0.4s ease',
      }} />
    </div>
  );
};
