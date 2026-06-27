// InteractionOverlay.jsx
// Master overlay that reads isInteracting + interactionTarget and renders
// the correct sub-viewer (LetterViewer, PhotoViewer, WishTreeViewer).
// ESC handling lives in usePlayerControls; this component is purely presentational.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';
import { LetterViewer }    from '../Interactions/LetterViewer';
import { PhotoViewer }     from '../Interactions/PhotoViewer';
import { WishTreeViewer }  from '../Interactions/WishTreeViewer';

const VIEWER_MAP = {
  letter:       LetterViewer,
  photo:        PhotoViewer,
  wishTree:     WishTreeViewer,
  cake:         null, // placeholder — will show a simple card
  memoryMarker: null,
};

const CakeViewer = ({ target }) => (
  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎂</div>
    <h2 style={{ color: 'white', fontFamily: 'Georgia, serif', fontSize: '26px', marginBottom: '8px' }}>
      Happy Birthday!
    </h2>
    <p style={{ color: 'rgba(255,255,255,0.65)', fontStyle: 'italic', fontFamily: 'serif' }}>
      {target?.label ?? 'Make a wish!'}
    </p>
  </div>
);

const MemoryMarkerViewer = ({ target }) => (
  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
    <div style={{ fontSize: '48px', marginBottom: '16px' }}>⭐</div>
    <h2 style={{ color: 'white', fontFamily: 'Georgia, serif', fontSize: '22px' }}>
      {target?.label ?? 'A Memory'}
    </h2>
    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginTop: '8px', fontStyle: 'italic', fontFamily: 'serif' }}>
      Press ESC to continue
    </p>
  </div>
);

export const InteractionOverlay = () => {
  const isInteracting = useGameStore((s) => s.isInteracting);
  const target        = useGameStore((s) => s.interactionTarget);
  const closeInteraction = useGameStore((s) => s.closeInteraction);

  const getViewer = () => {
    if (!target) return null;
    if (target.type === 'letter')       return <LetterViewer target={target} />;
    if (target.type === 'photo')        return <PhotoViewer target={target} />;
    if (target.type === 'wishTree')     return <WishTreeViewer target={target} />;
    if (target.type === 'cake')         return <CakeViewer target={target} />;
    if (target.type === 'memoryMarker') return <MemoryMarkerViewer target={target} />;
    return null;
  };

  return (
    <AnimatePresence>
      {isInteracting && target && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeInteraction}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 5, 20, 0.72)',
              backdropFilter: 'blur(6px)',
              zIndex: 100,
            }}
          />

          {/* Content panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 101,
              maxWidth: '640px',
              width: '90vw',
              maxHeight: '80vh',
              overflowY: 'auto',
              borderRadius: '16px',
              background: 'rgba(14, 10, 38, 0.96)',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            {/* Close button */}
            <button
              onClick={closeInteraction}
              style={{
                position: 'absolute',
                top: '14px',
                right: '16px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '12px',
                padding: '4px 10px',
                cursor: 'pointer',
                letterSpacing: '0.05em',
                fontFamily: 'sans-serif',
                zIndex: 10,
              }}
            >
              ESC
            </button>

            {getViewer()}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
