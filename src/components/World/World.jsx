import React, { useRef, useState, useEffect } from 'react';
import { useGameStore } from '../../stores/gameStore';
import { useCameraFollow } from '../../hooks/useCameraFollow';
import { usePlayerControls } from '../../hooks/usePlayerControls';
import { CharacterSprite } from '../Character/CharacterSprite';
import { worldData } from '../../data/world';

export const World = () => {
  const containerRef = useRef(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Resize handler to update camera centering math
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize input listeners and camera lerp loop
  usePlayerControls();
  useCameraFollow(viewportWidth);

  // Retrieve state
  const playerX = useGameStore((state) => state.player.x);
  const playerY = useGameStore((state) => state.player.y);
  const cameraX = useGameStore((state) => state.camera.x);
  const worldWidth = useGameStore((state) => state.worldWidth);
  const worldHeight = useGameStore((state) => state.worldHeight);
  const pathMinY = useGameStore((state) => state.pathMinY);
  const pathMaxY = useGameStore((state) => state.pathMaxY);

  // Generate static star coordinates for background layer (so they don't regenerate on every render)
  const starsRef = useRef([]);
  if (starsRef.current.length === 0) {
    for (let i = 0; i < 150; i++) {
      starsRef.current.push({
        id: `star-${i}`,
        x: Math.random() * (worldWidth * 0.4), // Scale down since background scrolls slower
        y: Math.random() * 250,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
  }

  // Camera transforms for parallax scrolling
  // Background factor: 0.15
  const bgTransform = `translateX(${-cameraX * 0.15}px)`;
  // Midground factor: 0.5
  const midTransform = `translateX(${-cameraX * 0.5}px)`;
  // Foreground factor: 1.0
  const fgTransform = `translateX(${-cameraX}px)`;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${worldHeight}px`,
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, #070919 0%, #151a30 70%, #1a2238 100%)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        borderRadius: '12px',
      }}
    >
      {/* 1. BACKGROUND LAYER (Scroll Factor: 0.15) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${worldWidth * 0.4}px`,
          height: '100%',
          transform: bgTransform,
          willChange: 'transform',
          pointerEvents: 'none',
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
              opacity: star.opacity,
              boxShadow: star.size > 2 ? '0 0 6px #fff' : 'none',
            }}
          />
        ))}

        {/* Large Storybook Moon */}
        <div
          style={{
            position: 'absolute',
            left: '300px',
            top: '40px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fffbf0 0%, #ffebbc 70%, #ffd066 100%)',
            boxShadow: '0 0 35px rgba(255, 235, 188, 0.4), inset -10px -10px 20px rgba(0, 0, 0, 0.05)',
          }}
        />

        {/* Subtle clouds in background */}
        <div
          style={{
            position: 'absolute',
            left: '800px',
            top: '90px',
            width: '240px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.04)',
            borderRadius: '20px',
            filter: 'blur(8px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '1800px',
            top: '60px',
            width: '320px',
            height: '50px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '25px',
            filter: 'blur(10px)',
          }}
        />
      </div>

      {/* 2. MIDGROUND LAYER (Scroll Factor: 0.5) */}
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
        {/* Draw Hills from Configuration */}
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

      {/* 3. FOREGROUND LAYER (Scroll Factor: 1.0 - Walkable World) */}
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
        {/* Floor Ground base */}
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

        {/* Walkable Pathway details */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: `${pathMinY}px`,
            width: '100%',
            height: `${pathMaxY - pathMinY + 60}px`,
            background: 'rgba(57, 85, 48, 0.4)',
            borderTop: '2px dashed rgba(255, 255, 255, 0.08)',
            borderBottom: '2px dashed rgba(255, 255, 255, 0.08)',
            pointerEvents: 'none',
          }}
        />

        {/* Render Environmental Objects based on config */}
        {worldData.foregroundElements.map((el) => {
          if (el.type === 'house') {
            return (
              <div
                key={el.id}
                style={{
                  position: 'absolute',
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  width: `${el.width}px`,
                  height: `${el.height}px`,
                  pointerEvents: 'none',
                }}
              >
                <svg
                  viewBox={`0 0 ${el.width} ${el.height}`}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                >
                  {/* Roof */}
                  <polygon
                    points={`0,${el.height * 0.4} ${el.width / 2},0 ${el.width},${el.height * 0.4}`}
                    fill="#3b2b23"
                    style={{ stroke: '#211713', strokeWidth: 4 }}
                  />
                  {/* Cabin Walls */}
                  <rect
                    x={el.width * 0.1}
                    y={el.height * 0.4}
                    width={el.width * 0.8}
                    height={el.height * 0.6}
                    fill="#5c4538"
                    stroke="#211713"
                    strokeWidth={4}
                  />
                  {/* Glowing Window */}
                  <rect
                    x={el.width * 0.25}
                    y={el.height * 0.55}
                    width={el.width * 0.15}
                    height={el.width * 0.15}
                    fill="#feebc8"
                    rx="4"
                    stroke="#211713"
                    strokeWidth={3}
                  />
                  {/* Window Grid */}
                  <line x1={el.width * 0.325} y1={el.height * 0.55} x2={el.width * 0.325} y2={el.height * 0.55 + el.width * 0.15} stroke="#211713" strokeWidth="2" />
                  <line x1={el.width * 0.25} y1={el.height * 0.55 + el.width * 0.075} x2={el.width * 0.4} y2={el.height * 0.55 + el.width * 0.075} stroke="#211713" strokeWidth="2" />
                  {/* Wooden Door */}
                  <rect
                    x={el.width * 0.6}
                    y={el.height * 0.6}
                    width={el.width * 0.2}
                    height={el.height * 0.4}
                    fill="#2a1e17"
                    stroke="#211713"
                    strokeWidth={3}
                  />
                  {/* Door knob */}
                  <circle cx={el.width * 0.64} cy={el.height * 0.8} r="3" fill="#fbd38d" />
                </svg>
              </div>
            );
          }

          if (el.type === 'tree') {
            return (
              <div
                key={el.id}
                style={{
                  position: 'absolute',
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  width: `${el.width}px`,
                  height: `${el.height}px`,
                  pointerEvents: 'none',
                }}
              >
                <svg width="100%" height="100%" viewBox="0 0 100 200" preserveAspectRatio="none">
                  {/* Trunk */}
                  <rect x="42" y="120" width="16" height="80" fill="#4a3728" />
                  {/* Foliage (Stylized Paper Layers) */}
                  <circle cx="50" cy="70" r="50" fill="#2d5236" />
                  <circle cx="50" cy="70" r="40" fill="#355e3e" />
                  <circle cx="50" cy="70" r="28" fill="#3e6b47" />
                </svg>
              </div>
            );
          }

          if (el.type === 'flower') {
            return (
              <div
                key={el.id}
                style={{
                  position: 'absolute',
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  pointerEvents: 'none',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  {/* Stem */}
                  <line x1="12" y1="12" x2="12" y2="24" stroke="#48bb78" strokeWidth="2" />
                  {/* Petals */}
                  <circle cx="12" cy="7" r="5" fill={el.color} />
                  <circle cx="7" cy="12" r="5" fill={el.color} />
                  <circle cx="17" cy="12" r="5" fill={el.color} />
                  <circle cx="12" cy="17" r="5" fill={el.color} />
                  {/* Center */}
                  <circle cx="12" cy="12" r="4" fill="#faf089" />
                </svg>
              </div>
            );
          }

          if (el.type === 'fence') {
            // Compute fence geometry
            const postCount = el.count;
            const postWidth = 8;
            const postHeight = 40;
            const spacing = 6;
            const svgWidth = postCount * (postWidth + spacing);
            return (
              <svg
                key={el.id}
                style={{
                  position: 'absolute',
                  left: `${el.x}px`,
                  top: `${el.y}px`,
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
                {/* Horizontal rails */}
                <rect x="0" y="8" width={svgWidth} height="6" fill="#5c4538" stroke="#2a1e17" strokeWidth="1.5" />
                <rect x="0" y="24" width={svgWidth} height="6" fill="#5c4538" stroke="#2a1e17" strokeWidth="1.5" />
              </svg>
            );
          }

          return null;
        })}

        {/* Player Character */}
        <div
          style={{
            position: 'absolute',
            left: `${playerX}px`,
            top: `${playerY}px`,
            transform: 'translate(-50%, -85%)', // Centered horizontally, bottom-aligned
            zIndex: 10,
          }}
        >
          <CharacterSprite />
        </div>
      </div>
    </div>
  );
};
