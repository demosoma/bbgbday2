// Fence.jsx — Wooden fence SVG
import React from 'react';

export const FenceObject = ({ el }) => {
  const postCount = el.count ?? 5;
  const postWidth = 8;
  const postHeight = 40;
  const spacing = 6;
  const svgWidth = postCount * (postWidth + spacing);

  return (
    <svg
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        pointerEvents: 'none',
      }}
      width={svgWidth}
      height={postHeight}
      viewBox={`0 0 ${svgWidth} ${postHeight}`}
    >
      {Array.from({ length: postCount }).map((_, i) => (
        <rect
          key={i}
          x={i * (postWidth + spacing)}
          y={0}
          width={postWidth}
          height={postHeight}
          fill="#5c4538"
          stroke="#2a1e17"
          strokeWidth="1.5"
          rx="2"
        />
      ))}
      <rect x="0" y="8"  width={svgWidth} height="5" fill="#5c4538" stroke="#2a1e17" strokeWidth="1" />
      <rect x="0" y="24" width={svgWidth} height="5" fill="#5c4538" stroke="#2a1e17" strokeWidth="1" />
    </svg>
  );
};
