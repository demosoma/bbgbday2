// World.jsx
// Main scene compositor. Orchestrates all systems:
//   - Sky (SkyManager)
//   - Midground hills
//   - Foreground world objects (WorldObjectRenderer)
//   - Player character (CharacterSprite)
//   - Ambient tint + particles (FX)
//   - Interaction prompt + overlay (UI)
//   - Chapter title overlay (UI)
// All game logic lives in hooks — this file is layout only.

import React, { useRef, useState, useEffect } from 'react';
import { useGameStore }         from '../../stores/gameStore';
import { useCameraFollow }      from '../../hooks/useCameraFollow';
import { usePlayerControls }    from '../../hooks/usePlayerControls';
import { useChapterDetector }   from '../../hooks/useChapterDetector';
import { useProximityDetector } from '../../hooks/useProximityDetector';
import { useMusicManager }      from '../../hooks/useMusicManager';
import { CharacterSprite }      from '../Character/CharacterSprite';
import { SkyManager }           from '../Sky/SkyManager';
import { WorldObjectRenderer }  from '../WorldObjects/WorldObjectRenderer';
import { InteractionPrompt }    from '../UI/InteractionPrompt';
import { InteractionOverlay }   from '../UI/InteractionOverlay';
import { ChapterTitle }         from '../UI/ChapterTitle';
import { Particles }            from '../FX/Particles';
import { AmbientTint }          from '../FX/AmbientTint';
import { worldData }            from '../../data/world';

export const World = () => {
  const containerRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── Hooks (order matters) ─────────────────────────────────────────────
  usePlayerControls();
  useCameraFollow(viewportWidth);
  useChapterDetector();
  useProximityDetector();
  useMusicManager();

  // ── Store (primitives only → no object reference churn) ──────────────
  const playerX       = useGameStore((s) => s.player.x);
  const playerY       = useGameStore((s) => s.player.y);
  const cameraX       = useGameStore((s) => s.camera.x);
  const worldWidth    = useGameStore((s) => s.worldWidth);
  const worldHeight   = useGameStore((s) => s.worldHeight);
  const pathMinY      = useGameStore((s) => s.pathMinY);
  const pathMaxY      = useGameStore((s) => s.pathMaxY);
  const isInteracting = useGameStore((s) => s.isInteracting);

  // ── Parallax transforms ────────────────────────────────────────────────
  const bgTransform  = `translateX(${-cameraX * 0.15}px)`;
  const midTransform = `translateX(${-cameraX * 0.5}px)`;
  const fgTransform  = `translateX(${-cameraX}px)`;

  return (
    // Viewport container
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${worldHeight}px`,
        overflow: 'hidden',
        background: '#050b1a', // fallback while SkyManager loads
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        borderRadius: '12px',
      }}
    >
      {/* ── CAMERA ZOOM CONTAINER ────────────────────────────────────── */}
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: isInteracting ? 'scale(1.24)' : 'scale(1.18)',
          transformOrigin: 'center bottom',
          position: 'absolute',
          inset: 0,
          filter: isInteracting ? 'blur(6px) brightness(0.65)' : 'none',
          transition: 'transform 0.5s ease-in-out, filter 0.5s ease-in-out',
        }}
      >
        {/* ── 1. SKY LAYER ─────────────────────────────────────────────── */}
        <SkyManager worldWidth={worldWidth} bgTransform={bgTransform} />

        {/* ── 2. DISTANT SILHOUETTE LAYER (Scroll Factor: 0.3) ───────────── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${worldWidth * 0.5}px`,
            height: '100%',
            transform: `translateX(${-cameraX * 0.3}px)`,
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        >
          <svg
            style={{
              position: 'absolute',
              left: 0,
              bottom: '100px',
              width: '100%',
              height: '240px',
              overflow: 'visible',
            }}
          >
            {/* Distant treeline silhouettes */}
            {Array.from({ length: 50 }).map((_, i) => {
              const x = i * 105 + (i % 3) * 12;
              const h = 75 + (i % 4) * 18;
              const w = 45 + (i % 2) * 12;
              return (
                <polygon
                  key={i}
                  points={`${x},240 ${x + w/2},${240 - h} ${x + w},240`}
                  fill="#121829"
                  opacity="0.55"
                />
              );
            })}
            {/* Overlapping back hills */}
            <path
              d={`M 0 240 Q 350 110 700 240 T 1400 240 T 2100 240 T 2800 240 T 3500 240 T 4200 240 T 4900 240 T 5600 240 Z`}
              fill="#0b0e1a"
              opacity="0.65"
            />
            {/* Overlapping front hills/bushes */}
            <path
              d={`M 100 240 Q 400 130 700 240 T 1300 240 T 1900 240 T 2500 240 T 3100 240 T 3700 240 T 4300 240 T 4900 240 T 5500 240 Z`}
              fill="#101426"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* ── 3. MIDGROUND HILLS LAYER (Scroll Factor: 0.5) ─────────────── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${worldWidth * 0.6}px`,
            height: '100%',
            transform: midTransform,
            willChange: 'transform',
            pointerEvents: 'none',
          }}
        >
          {worldData.midgroundElements.map((hill) => (
            <svg
              key={hill.id}
              style={{
                position: 'absolute',
                left: `${hill.x}px`,
                bottom: '100px',
                width: `${hill.width}px`,
                height: `${hill.height}px`,
                overflow: 'visible',
              }}
            >
              <path
                d={`M 0 ${hill.height} Q ${hill.width / 2} 0 ${hill.width} ${hill.height} Z`}
                fill={hill.color}
                opacity="0.85"
              />
            </svg>
          ))}
        </div>

        {/* ── 4. FOREGROUND LAYER (walkable world) ─────────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${worldWidth}px`,
            height: '100%',
            transform: fgTransform,
            willChange: 'transform',
          }}
        >
          {/* Ground */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              height: '240px',
              background: 'linear-gradient(to bottom, #192716 0%, #10190e 100%)',
              borderTop: '4px solid #2d4527',
            }}
          />

          {/* Walkable path indicator (subtle) */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: `${pathMinY}px`,
              width: '100%',
              height: `${pathMaxY - pathMinY + 60}px`,
              background: 'rgba(57, 85, 48, 0.25)',
              borderTop: '1px dashed rgba(255,255,255,0.05)',
              borderBottom: '1px dashed rgba(255,255,255,0.05)',
              pointerEvents: 'none',
            }}
          />

          {/* All world objects from config */}
          <WorldObjectRenderer />

          {/* Player character */}
          <div
            style={{
              position: 'absolute',
              left: `${playerX}px`,
              top: `${playerY}px`,
              transform: 'translate(-50%, -85%)',
              zIndex: 10,
            }}
          >
            <CharacterSprite />
          </div>
        </div>
      </div>

      {/* ── 5. FX OVERLAY LAYER (1:1 fullscreen, unzoomed) ───────────── */}
      <AmbientTint />
      <Particles />

      {/* ── 6. UI LAYER ──────────────────────────────────────────────── */}
      {/* Interaction proximity prompt (world-space — moves with camera) */}
      <InteractionPrompt cameraX={cameraX} />

      {/* Chapter title card */}
      <ChapterTitle />

      {/* Interaction modal overlay */}
      <InteractionOverlay />
    </div>
  );
};
