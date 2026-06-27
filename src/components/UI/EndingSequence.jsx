// EndingSequence.jsx
// Triggered when isEnding is true in the game store.
// Fades the environment, keeps only stars, then shows "The Universe Waited."
// Fades to black. No credits. No "The End". No buttons.

import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../stores/gameStore';

export const EndingSequence = () => {
  const isEnding = useGameStore((s) => s.isEnding);
  const [phase, setPhase] = useState('idle'); // idle → fadeWorld → stars → showText → fadeBlack

  useEffect(() => {
    if (!isEnding) return;

    // Phase timeline:
    // 0ms    — begin fade of world
    // 1500ms — only stars remain, begin showing text
    // 3000ms — "The Universe Waited." fades in fully
    // 6500ms — fade to black begins
    setPhase('fadeWorld');
    const t1 = setTimeout(() => setPhase('stars'),    1500);
    const t2 = setTimeout(() => setPhase('showText'), 3000);
    const t3 = setTimeout(() => setPhase('fadeBlack'),6500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isEnding]);

  if (!isEnding) return null;

  return (
    <>
      {/* World fade-out overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          background: 'rgba(5, 5, 20, 0)',
          opacity: phase === 'fadeWorld' ? 1 : 0,
          transition: phase === 'fadeWorld' ? 'opacity 1.5s ease' : 'none',
          zIndex: 200,
        }}
      />

      {/* Black final overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          background: '#000',
          opacity: phase === 'fadeBlack' ? 1 : 0,
          transition: phase === 'fadeBlack' ? 'opacity 4s ease' : 'none',
          zIndex: 300,
        }}
      />

      {/* Stars canvas layer */}
      {(phase === 'stars' || phase === 'showText' || phase === 'fadeBlack') && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, #050a18 0%, #020610 100%)',
            opacity: phase === 'fadeBlack' ? 0 : 1,
            transition: phase === 'fadeBlack' ? 'opacity 4s ease' : 'opacity 1.5s ease',
            zIndex: 201,
            overflow: 'hidden',
          }}
        >
          {/* SVG star field */}
          <StarField />
        </div>
      )}

      {/* The text */}
      {(phase === 'showText' || phase === 'fadeBlack') && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 202,
            opacity: phase === 'fadeBlack' ? 0 : 1,
            transition: phase === 'fadeBlack' ? 'opacity 4s ease' : 'opacity 2.5s ease',
          }}
        >
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.92)',
              fontFamily: 'Georgia, "Playfair Display", serif',
              fontSize: 'clamp(24px, 5vw, 48px)',
              fontWeight: '400',
              letterSpacing: '0.05em',
              textAlign: 'center',
              lineHeight: '1.5',
              margin: 0,
              padding: '0 40px',
              textShadow: '0 0 40px rgba(180, 150, 255, 0.4)',
            }}
          >
            The Universe Waited.
          </p>
        </div>
      )}
    </>
  );
};

// Deterministic star positions — no RNG on every render
const STARS = Array.from({ length: 180 }, (_, i) => ({
  cx: ((i * 137.508) % 100).toFixed(2),
  cy: ((i * 79.37) % 100).toFixed(2),
  r: (0.8 + (i % 4) * 0.4).toFixed(1),
  opacity: (0.3 + (i % 5) * 0.14).toFixed(2),
  delay: ((i % 8) * 0.3).toFixed(1),
  duration: (3 + (i % 4)).toFixed(0),
}));

const StarField = () => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid slice"
  >
    {STARS.map((s, i) => (
      <circle
        key={i}
        cx={s.cx}
        cy={s.cy}
        r={s.r}
        fill="white"
        opacity={s.opacity}
        style={{
          animation: `starPulse ${s.duration}s ease-in-out ${s.delay}s infinite`,
        }}
      />
    ))}
  </svg>
);
