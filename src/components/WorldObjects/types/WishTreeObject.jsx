// WishTreeObject.jsx — World object: a magical glowing wish tree
import React from 'react';

export const WishTreeObject = ({ el, isTarget }) => {
  const w = 180;
  const h = 315;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        width: `${w}px`,
        height: `${h}px`,
        pointerEvents: 'none',
        transition: 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
        filter: isTarget 
          ? 'drop-shadow(0 0 30px rgba(196, 150, 255, 0.95))' 
          : 'drop-shadow(0 0 12px rgba(180, 130, 255, 0.4))',
        animation: isTarget ? 'floatBob 3.2s ease-in-out infinite' : 'none',
      }}
    >
      <svg width={w} height={h} viewBox={`0 0 160 280`} style={{ overflow: 'visible' }}>
        {/* Trunk */}
        <path
          d="M 72 182 C 64 140 67.2 106.4 80 70"
          stroke="#5c4538"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        {/* Secondary trunk */}
        <path
          d="M 80 238 C 80 196 80 182 72 182"
          stroke="#5c4538"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        {/* Branches */}
        <path d="M 72 140 Q 32 84 24 28"
          stroke="#5c4538" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 80 106.4 Q 112 56 128 22.4"
          stroke="#5c4538" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M 76.8 123.2 Q 88 70 96 28"
          stroke="#5c4538" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Glowing foliage */}
        <ellipse cx="80" cy="84" rx="67.2" ry="61.6" fill="#3d2a6b" opacity="0.85" />
        <ellipse cx="80" cy="61.6" rx="56" ry="50.4" fill="#4a2e80" opacity="0.9" />
        <ellipse cx="80" cy="39.2" rx="38.4" ry="36.4" fill="#5a3594" />

        {/* Magical sparkle dots */}
        {[
          [40, 42], [112, 28], [64, 78.4],
          [104, 70], [48, 98], [88, 50.4],
          [72, 22.4], [96, 106.4], [35.2, 78.4],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={1.5 + (i % 3) * 0.8}
            fill="#e9d5ff"
            opacity="0.9"
            style={{ animation: `starPulse ${1.5 + (i * 0.3)}s ease-in-out infinite`, animationDelay: `${i * 0.18}s` }}
          />
        ))}

        {/* Wish ribbons hanging from branches */}
        {[[44.8, 89.6], [92.8, 78.4], [67.2, 100.8]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={x + ((i % 2 === 0) ? -6 : 6)} y2={y + 20}
              stroke={['#f687b3','#9f7aea','#68d391'][i]} strokeWidth="1.5" opacity="0.8" />
            <rect x={x + ((i % 2 === 0) ? -12 : 2)} y={y + 18} width="12" height="7" rx="2"
              fill={['#f687b3','#9f7aea','#68d391'][i]} opacity="0.7" />
          </g>
        ))}
      </svg>
    </div>
  );
};
