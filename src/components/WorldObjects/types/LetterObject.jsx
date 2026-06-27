// LetterObject.jsx — World object: a sealed letter resting on the ground
import React from 'react';

export const LetterObject = ({ el }) => (
  <div
    style={{
      position: 'absolute',
      left: `${el.x}px`,
      top: `${el.y}px`,
      pointerEvents: 'none',
      animation: 'floatBob 3s ease-in-out infinite',
      animationDelay: `${(el.x % 6) * 0.2}s`,
    }}
  >
    <svg width="40" height="30" viewBox="0 0 40 30">
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
      width: '30px',
      height: '6px',
      background: 'rgba(255, 220, 150, 0.35)',
      borderRadius: '50%',
      filter: 'blur(3px)',
    }} />
  </div>
);
