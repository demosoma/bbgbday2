// SkyManager.jsx
// Renders the entire sky, moon, sun, stars and clouds.
// Interpolates between chapter sky themes based on skyBlend from the store.
// All rendering is driven purely by data — no hardcoded colours.

import React, { useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { skyThemes, interpolateSky } from '../../data/skyThemes';

// Static star positions generated once
const generateStars = (count, worldWidth) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      id: i,
      x: Math.random() * worldWidth,
      y: Math.random() * 260,
      size: Math.random() * 2.2 + 0.6,
      opacity: Math.random() * 0.6 + 0.35,
      delay: Math.random() * 3,
    });
  }
  return stars;
};

export const SkyManager = ({ worldWidth, bgTransform }) => {
  const activeChapter  = useGameStore((s) => s.activeChapter);
  const prevChapterId  = useGameStore((s) => s.prevChapterId);
  const skyBlend       = useGameStore((s) => s.skyBlend);

  const starsRef = useRef(null);
  if (!starsRef.current) {
    starsRef.current = generateStars(250, worldWidth * 0.35);
  }

  // Determine which two themes to blend
  const currentThemeId = activeChapter?.skyTheme ?? 'dreamy_night';
  const prevThemeId    = prevChapterId
    ? (skyThemes[activeChapter?.skyTheme] ? prevChapterId : currentThemeId)
    : currentThemeId;

  const sky = interpolateSky(prevThemeId ?? currentThemeId, currentThemeId, skyBlend);

  const gradient = `linear-gradient(to bottom, ${sky.skyTop} 0%, ${sky.skyMid} 55%, ${sky.skyBottom} 100%)`;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: `${worldWidth * 0.35}px`,
        height: '100%',
        transform: bgTransform,
        willChange: 'transform',
        pointerEvents: 'none',
        background: gradient,
        transition: 'background 1.5s ease',
      }}
    >
      {/* Stars */}
      {starsRef.current.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: '#ffffff',
            borderRadius: '50%',
            opacity: star.opacity * sky.starOpacity,
            boxShadow: star.size > 2 ? '0 0 5px #fff' : 'none',
            animation: `starPulse ${2 + star.delay}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Moon */}
      <div
        style={{
          position: 'absolute',
          left: '280px',
          top: `${sky.moonY}px`,
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 32% 32%, ${sky.moonColor} 0%, #ffd066 100%)`,
          boxShadow: `0 0 30px ${sky.moonGlow}, inset -8px -8px 16px rgba(0,0,0,0.06)`,
          opacity: sky.moonOpacity,
          transition: 'opacity 2s ease, top 3s ease',
        }}
      />

      {/* Sun */}
      <div
        style={{
          position: 'absolute',
          left: '440px',
          top: `${sky.sunY}px`,
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: `radial-gradient(circle at 50% 50%, #fff8d6 0%, ${sky.sunColor} 70%)`,
          boxShadow: `0 0 50px ${sky.sunGlow}, 0 0 100px ${sky.sunGlow}`,
          opacity: sky.sunOpacity,
          transition: 'opacity 2s ease, top 3s ease',
        }}
      />

      {/* Clouds */}
      {[
        { left: 700, top: 90, width: 240, height: 40 },
        { left: 1600, top: 65, width: 320, height: 50 },
        { left: 2600, top: 100, width: 200, height: 35 },
      ].map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${c.left}px`,
            top: `${c.top}px`,
            width: `${c.width}px`,
            height: `${c.height}px`,
            background: 'rgba(255,255,255,1)',
            borderRadius: '20px',
            filter: 'blur(10px)',
            opacity: sky.cloudOpacity,
            transition: 'opacity 2s ease',
          }}
        />
      ))}
    </div>
  );
};
