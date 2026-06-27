// Tree.jsx — Animated SVG tree with subtle sway
import React from 'react';

export const TreeObject = ({ el }) => {
  const w = el.width ?? 80;
  const h = el.height ?? 180;
  const animId = `tree-sway-${el.id}`;

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
        animation: `treeSway 4s ease-in-out infinite`,
        animationDelay: `${(el.x % 7) * 0.3}s`,
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
