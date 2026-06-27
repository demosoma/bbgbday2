// WishTreeObject.jsx — World object: a magical glowing wish tree
import React from 'react';

export const WishTreeObject = ({ el }) => {
  const w = el.width ?? 160;
  const h = el.height ?? 280;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        width: `${w}px`,
        height: `${h}px`,
        pointerEvents: 'none',
        filter: 'drop-shadow(0 0 20px rgba(180, 130, 255, 0.4))',
      }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {/* Trunk */}
        <path
          d={`M ${w * 0.45} ${h * 0.65} C ${w * 0.4} ${h * 0.5} ${w * 0.42} ${h * 0.38} ${w * 0.5} ${h * 0.25}`}
          stroke="#5c4538"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        {/* Secondary trunk */}
        <path
          d={`M ${w * 0.5} ${h * 0.85} C ${w * 0.5} ${h * 0.7} ${w * 0.5} ${h * 0.65} ${w * 0.45} ${h * 0.65}`}
          stroke="#5c4538"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
        />
        {/* Branches */}
        <path d={`M ${w * 0.45} ${h * 0.5} Q ${w * 0.2} ${h * 0.3} ${w * 0.15} ${h * 0.1}`}
          stroke="#5c4538" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d={`M ${w * 0.5} ${h * 0.38} Q ${w * 0.7} ${h * 0.2} ${w * 0.8} ${h * 0.08}`}
          stroke="#5c4538" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d={`M ${w * 0.48} ${h * 0.44} Q ${w * 0.55} ${h * 0.25} ${w * 0.6} ${h * 0.1}`}
          stroke="#5c4538" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* Glowing foliage */}
        <ellipse cx={w * 0.5} cy={h * 0.3} rx={w * 0.42} ry={h * 0.22} fill="#3d2a6b" opacity="0.85" />
        <ellipse cx={w * 0.5} cy={h * 0.22} rx={w * 0.35} ry={h * 0.18} fill="#4a2e80" opacity="0.9" />
        <ellipse cx={w * 0.5} cy={h * 0.14} rx={w * 0.24} ry={h * 0.13} fill="#5a3594" />

        {/* Magical sparkle dots */}
        {[
          [w * 0.25, h * 0.15], [w * 0.7,  h * 0.1 ], [w * 0.4, h * 0.28],
          [w * 0.65, h * 0.25], [w * 0.3,  h * 0.35], [w * 0.55, h * 0.18],
          [w * 0.45, h * 0.08], [w * 0.6,  h * 0.38], [w * 0.22, h * 0.28],
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
        {[[w * 0.28, h * 0.32], [w * 0.58, h * 0.28], [w * 0.42, h * 0.36]].map(([x, y], i) => (
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
