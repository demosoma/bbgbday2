// GalleryObject.jsx — World object representing the interactive Gallery of Moments board
import React from 'react';

export const GalleryObject = ({ el, isTarget }) => {
  const w = 90;
  const h = 110;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${el.x}px`,
        top: `${el.y}px`,
        pointerEvents: 'none',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        filter: isTarget ? 'drop-shadow(0 0 16px rgba(253, 230, 138, 0.9))' : 'none',
        animation: isTarget ? 'floatBob 3s ease-in-out infinite' : 'none',
      }}
    >
      <svg width={w} height={h} viewBox="0 0 90 110" style={{ display: 'block', overflow: 'visible' }}>
        {/* Frame Stand (Wooden post) */}
        <rect x="41" y="60" width="8" height="50" fill="#4d3222" rx="2" />
        <rect x="36" y="105" width="18" height="5" fill="#3a2519" rx="1.5" />

        {/* Polaroid Board Frame */}
        <rect x="10" y="5" width="70" height="60" fill="#5c4033" stroke="#2c1a11" strokeWidth="2.5" rx="4" />
        
        {/* Board Background */}
        <rect x="14" y="9" width="62" height="52" fill="#faf6f0" rx="2" />

        {/* Small hanging line inside frame */}
        <line x1="20" y1="20" x2="70" y2="20" stroke="#8a7a6a" strokeWidth="1" strokeDasharray="2,2" />

        {/* Mini polaroid 1 */}
        <g transform="translate(22, 16) rotate(-8)">
          <rect x="0" y="0" width="16" height="20" fill="#ffffff" stroke="#c8c0b8" strokeWidth="0.5" rx="1" />
          <rect x="1.5" y="1.5" width="13" height="12" fill="#a8c4dc" />
        </g>

        {/* Mini polaroid 2 */}
        <g transform="translate(48, 18) rotate(6)">
          <rect x="0" y="0" width="16" height="20" fill="#ffffff" stroke="#c8c0b8" strokeWidth="0.5" rx="1" />
          <rect x="1.5" y="1.5" width="13" height="12" fill="#fbcfe8" />
        </g>

        {/* Board Title Label */}
        <rect x="22" y="46" width="46" height="10" fill="#e8e2d8" rx="2" />
        <text x="45" y="53" textAnchor="middle" fontSize="6.5" fill="#5a4a3a" fontFamily="serif" fontWeight="bold">
          OUR ALBUM
        </text>

        {/* Sparkles */}
        <text x="76" y="12" fontSize="12" fill="#fbbf24" style={{ animation: 'starPulse 2s infinite' }}>✨</text>
      </svg>
    </div>
  );
};
