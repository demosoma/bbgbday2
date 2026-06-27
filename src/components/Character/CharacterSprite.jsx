import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../../stores/gameStore';

// Dynamic character configurations
export const characterConfig = {
  width: 64,
  height: 96,
  frameRates: {
    idle: 5, // FPS
    walk: 10, // FPS
  },
  frames: {
    idle: 2,
    walk: 4,
  }
};

export const CharacterSprite = () => {
  const dir = useGameStore((state) => state.player.dir);
  const isMoving = useGameStore((state) => state.player.isMoving);
  const [frame, setFrame] = useState(0);
  const frameTimer = useRef(null);

  const currentAction = isMoving ? 'walk' : 'idle';
  const totalFrames = characterConfig.frames[currentAction];
  const fps = characterConfig.frameRates[currentAction];

  // Cycle through animation frames based on fps config
  useEffect(() => {
    if (frameTimer.current) clearInterval(frameTimer.current);
    
    setFrame(0); // Reset to first frame on action change
    
    frameTimer.current = setInterval(() => {
      setFrame((prev) => (prev + 1) % totalFrames);
    }, 1000 / fps);

    return () => {
      if (frameTimer.current) clearInterval(frameTimer.current);
    };
  }, [currentAction, totalFrames, fps]);

  // Render a detailed SVG placeholder representing the character
  // It changes posture, feet, and face details based on direction and animation frame.
  const renderPlaceholder = () => {
    const isOdd = frame % 2 === 0;
    
    // Simple bounce animation based on walk frame
    const bounceY = isMoving ? (frame % 2 === 0 ? -4 : 0) : (frame === 0 ? -1 : 0);
    
    // Feet positions based on walking frames (4 frames)
    let leftFootOffset = 0;
    let rightFootOffset = 0;
    if (isMoving) {
      if (frame === 0) { leftFootOffset = -6; rightFootOffset = 6; }
      else if (frame === 1) { leftFootOffset = 0; rightFootOffset = 0; }
      else if (frame === 2) { leftFootOffset = 6; rightFootOffset = -6; }
      else if (frame === 3) { leftFootOffset = 0; rightFootOffset = 0; }
    }

    return (
      <svg
        width={characterConfig.width}
        height={characterConfig.height}
        viewBox="0 0 64 96"
        style={{
          transform: `translateY(${bounceY}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {/* Shadow */}
        <ellipse cx="32" cy="88" rx={isMoving ? 16 : 18} ry="4" fill="rgba(0, 0, 0, 0.25)" />

        {/* Hair Back (only for Front/Left/Right) */}
        {dir !== 'back' && (
          <path d="M 16 32 C 16 10, 48 10, 48 32 C 48 42, 16 42, 16 32 Z" fill="#4a3728" />
        )}

        {/* Head / Face */}
        <circle cx="32" cy="28" r="16" fill="#fbd3b6" />

        {/* Eyes & Hair details based on direction */}
        {dir === 'front' && (
          <>
            {/* Eyes */}
            <circle cx="27" cy="28" r="2" fill="#2d3748" />
            <circle cx="37" cy="28" r="2" fill="#2d3748" />
            {/* Cheeks */}
            <circle cx="24" cy="32" r="2" fill="#fc8181" opacity="0.6" />
            <circle cx="40" cy="32" r="2" fill="#fc8181" opacity="0.6" />
            {/* Hair Front */}
            <path d="M 16 20 Q 32 10 48 20 Q 32 24 16 20 Z" fill="#5c4033" />
            <path d="M 16 20 Q 22 28 26 24" stroke="#5c4033" strokeWidth="2" fill="none" />
          </>
        )}

        {dir === 'back' && (
          <>
            {/* Back Hair covering face */}
            <path d="M 16 16 C 16 10, 48 10, 48 16 C 48 42, 16 42, 16 16 Z" fill="#5c4033" />
          </>
        )}

        {dir === 'left' && (
          <>
            {/* Left facing eye */}
            <circle cx="24" cy="28" r="2" fill="#2d3748" />
            <circle cx="21" cy="32" r="1.5" fill="#fc8181" opacity="0.6" />
            {/* Side Hair */}
            <path d="M 24 14 Q 38 12 44 26 Q 32 32 24 14 Z" fill="#5c4033" />
          </>
        )}

        {dir === 'right' && (
          <>
            {/* Right facing eye */}
            <circle cx="40" cy="28" r="2" fill="#2d3748" />
            <circle cx="43" cy="32" r="1.5" fill="#fc8181" opacity="0.6" />
            {/* Side Hair */}
            <path d="M 40 14 Q 26 12 20 26 Q 32 32 40 14 Z" fill="#5c4033" />
          </>
        )}

        {/* Body / Torso */}
        {/* Clothes: A cute colored coat/hoodie */}
        <path d="M 20 44 L 44 44 L 48 76 L 16 76 Z" fill="#667eea" />

        {/* Details on clothes */}
        {dir === 'front' && (
          <>
            {/* Cute star or emblem on shirt */}
            <polygon points="32,48 34,54 40,54 35,58 37,64 32,60 27,64 29,58 24,54 30,54" fill="#f6e05e" />
          </>
        )}

        {/* Feet / Shoes */}
        <rect x={20 + leftFootOffset} y="76" width="8" height="12" rx="4" fill="#2d3748" />
        <rect x={36 + rightFootOffset} y="76" width="8" height="12" rx="4" fill="#2d3748" />

        {/* Hands / Arms */}
        {dir !== 'back' && (
          <>
            {/* Left Arm */}
            <circle cx={14} cy={54 + (isMoving ? leftFootOffset / 2 : 0)} r="4" fill="#fbd3b6" />
            {/* Right Arm */}
            <circle cx={50} cy={54 + (isMoving ? rightFootOffset / 2 : 0)} r="4" fill="#fbd3b6" />
          </>
        )}
      </svg>
    );
  };

  return (
    <div
      style={{
        width: characterConfig.width,
        height: characterConfig.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {renderPlaceholder()}
    </div>
  );
};
