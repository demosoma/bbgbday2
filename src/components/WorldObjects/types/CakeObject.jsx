// CakeObject.jsx — World object: a birthday cake
import React from 'react';

export const CakeObject = ({ el, isTarget }) => {
  const w = 75;
  const h = 88;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        pointerEvents: 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        filter: isTarget ? 'drop-shadow(0 0 14px rgba(251, 191, 36, 0.95))' : 'none',
        animation: isTarget ? 'floatBob 2.2s ease-in-out infinite' : 'none',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 60 70" style={{ display: 'block', overflow: 'visible' }}>
        {/* Bottom tier */}
        <rect x="5" y="38" width="50" height="28" rx="5" fill="#f687b3" />
        <rect x="5" y="38" width="50" height="8"  rx="4" fill="#f9a8d4" />
        {/* Middle tier */}
        <rect x="12" y="20" width="36" height="20" rx="4" fill="#c084fc" />
        <rect x="12" y="20" width="36" height="6"  rx="3" fill="#d8b4fe" />
        {/* Top tier */}
        <rect x="18" y="8" width="24" height="14" rx="3" fill="#f0abfc" />
        <rect x="18" y="8" width="24" height="5"  rx="3" fill="#f5d0fe" />
        {/* Candles */}
        {[22, 30, 38].map((cx, i) => (
          <g key={i}>
            <rect x={cx - 2} y={-4} width="4" height="14" rx="2"
              fill={['#fcd34d', '#6ee7b7', '#f9a8d4'][i]} />
            {/* Flame */}
            <ellipse cx={cx} cy={-5} rx="2.5" ry="3.5" fill="#fbbf24" opacity="0.9"
              style={{ animation: `flameDance 0.8s ease-in-out infinite`, animationDelay: `${i * 0.12}s` }} />
            <ellipse cx={cx} cy={-5} rx="1.2" ry="2" fill="#fff" opacity="0.6" />
          </g>
        ))}
        {/* Decorative dots */}
        {[15, 25, 35, 45].map((x, i) => (
          <circle key={i} cx={x} cy={52} r="2.5" fill={['#fcd34d','#6ee7b7','#f9a8d4','#a5b4fc'][i]} />
        ))}
        {/* Stars */}
        <text x="30" y="32" textAnchor="middle" fontSize="9" fill="white" opacity="0.8">✨</text>
      </svg>
    </div>
  );
};
