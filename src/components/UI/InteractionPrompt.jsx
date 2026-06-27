// InteractionPrompt.jsx
// Shows a "Press E" bubble above the nearest interactable object in proximity.
// Animated in/out with Framer Motion. Reads from the game store reactively.

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

export const InteractionPrompt = ({ cameraX }) => {
  const target       = useGameStore((s) => s.interactionTarget);
  const isInteracting = useGameStore((s) => s.isInteracting);

  // Convert world X to screen X
  const screenX = target ? target.x - cameraX : 0;
  const screenY = target ? target.y - 70 : 0;

  return (
    <AnimatePresence>
      {target && !isInteracting && (
        <motion.div
          key={target.id}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            left: `${screenX}px`,
            top: `${screenY}px`,
            transform: 'translateX(-50%)',
            zIndex: 50,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          {/* Label */}
          {target.label && (
            <div style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '11px',
              fontFamily: 'serif',
              fontStyle: 'italic',
              letterSpacing: '0.04em',
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            }}>
              {target.label}
            </div>
          )}

          {/* Press E bubble */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(255,255,255,0.25)',
              borderRadius: '8px',
              padding: '4px 12px',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600',
              fontFamily: 'sans-serif',
              letterSpacing: '0.08em',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap',
            }}
          >
            Press <span style={{ color: '#fde68a' }}>E</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
