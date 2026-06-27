// Particles.jsx
// Lightweight floating particle system — petals / spores drifting upward.
// Purely CSS animation, ~28 particles, no canvas, no GPU shaders.

import React, { useRef } from 'react';

const PARTICLE_COUNT = 28;
const COLORS = ['#f687b3', '#c084fc', '#a78bfa', '#faf089', '#6ee7b7', '#f9a8d4'];

const generateParticles = () =>
  Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,         // vw %
    size: Math.random() * 5 + 3,    // px
    duration: Math.random() * 8 + 6, // s
    delay: Math.random() * 10,       // s
    color: COLORS[i % COLORS.length],
    drift: (Math.random() - 0.5) * 60, // px horizontal drift
    opacity: Math.random() * 0.4 + 0.2,
    shape: Math.random() > 0.5 ? '50%' : '20% 80% 60% 40%', // circle or petal
  }));

export const Particles = () => {
  const particles = useRef(generateParticles()).current;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 8,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: '-12px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            borderRadius: p.shape,
            opacity: p.opacity,
            animation: `particleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
};
