// House.jsx — Cosy storybook house SVG
import React from 'react';

export const HouseObject = ({ el }) => {
  const w = el.width ?? 300;
  const h = el.height ?? 200;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        width: `${w}px`,
        height: `${h}px`,
        pointerEvents: 'none',
      }}
    >
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}>
        {/* Main walls */}
        <rect x={w * 0.1} y={h * 0.4} width={w * 0.8} height={h * 0.6} fill="#d4a574" />

        {/* Roof */}
        <polygon
          points={`${w * 0.05},${h * 0.42} ${w / 2},${h * 0.05} ${w * 0.95},${h * 0.42}`}
          fill="#8b4513"
        />
        {/* Roof shading */}
        <polygon
          points={`${w * 0.05},${h * 0.42} ${w / 2},${h * 0.05} ${w * 0.55},${h * 0.05} ${w * 0.1},${h * 0.42}`}
          fill="rgba(0,0,0,0.08)"
        />

        {/* Window (left) */}
        <rect x={w * 0.18} y={h * 0.48} width={w * 0.2} height={h * 0.2} fill="#87ceeb" rx="3" />
        <rect x={w * 0.27} y={h * 0.48} width="2" height={h * 0.2} fill="rgba(255,255,255,0.5)" />
        <rect x={w * 0.18} y={h * 0.57} width={w * 0.2} height="2" fill="rgba(255,255,255,0.5)" />

        {/* Window (right) */}
        <rect x={w * 0.62} y={h * 0.48} width={w * 0.2} height={h * 0.2} fill="#87ceeb" rx="3" />
        <rect x={w * 0.71} y={h * 0.48} width="2" height={h * 0.2} fill="rgba(255,255,255,0.5)" />
        <rect x={w * 0.62} y={h * 0.57} width={w * 0.2} height="2" fill="rgba(255,255,255,0.5)" />

        {/* Door */}
        <rect x={w * 0.41} y={h * 0.65} width={w * 0.18} height={h * 0.35} fill="#8b5e3c" rx="3" />
        <circle cx={w * 0.56} cy={h * 0.83} r="3" fill="#d4a017" />

        {/* Warm window glow */}
        <rect x={w * 0.18} y={h * 0.48} width={w * 0.2} height={h * 0.2} fill="rgba(255,220,100,0.25)" rx="3" />
        <rect x={w * 0.62} y={h * 0.48} width={w * 0.2} height={h * 0.2} fill="rgba(255,220,100,0.2)" rx="3" />

        {/* Chimney */}
        <rect x={w * 0.62} y={h * 0.02} width={w * 0.08} height={h * 0.25} fill="#8b4513" />

        {/* Label */}
        {el.title && (
          <text
            x={w / 2}
            y={h * 0.38}
            textAnchor="middle"
            fill="rgba(255,255,255,0.6)"
            fontSize="11"
            fontFamily="serif"
          >
            {el.title}
          </text>
        )}
      </svg>
    </div>
  );
};
