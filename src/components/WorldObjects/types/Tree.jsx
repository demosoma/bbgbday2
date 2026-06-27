// Tree.jsx — Animated SVG tree with subtle sway
import React from 'react';

const hash = (str) => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
};

export const TreeObject = ({ el }) => {
  const w = el.width ?? 80;
  const h = el.height ?? 180;

  // Generate deterministic scale (0.7x - 2.5x) and flip based on id/x
  const seed = hash(el.id || String(el.x));
  const scale = 0.7 + (seed % 181) / 100; // 0.7 to 2.5
  const mirror = (seed % 2 === 0) ? -1 : 1;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        width: `${w}px`,
        height: `${h}px`,
        pointerEvents: 'none',
        transformOrigin: 'bottom center',
        transform: `scale(${scale * mirror}, ${scale})`,
        animation: `treeSway 6s ease-in-out infinite`,
        animationDelay: `${(seed % 7) * 0.4}s`,
      }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {/* Trunk */}
        <rect
          x={w / 2 - 6}
          y={h * 0.6}
          width={12}
          height={h * 0.4}
          fill="#5c4538"
          rx="3"
        />
        {/* Foliage layers */}
        <ellipse cx={w / 2} cy={h * 0.55} rx={w * 0.44} ry={h * 0.2} fill="#2d5236" />
        <ellipse cx={w / 2} cy={h * 0.4}  rx={w * 0.36} ry={h * 0.18} fill="#355e3e" />
        <ellipse cx={w / 2} cy={h * 0.27} rx={w * 0.26} ry={h * 0.15} fill="#3e6b47" />
      </svg>
    </div>
  );
};
