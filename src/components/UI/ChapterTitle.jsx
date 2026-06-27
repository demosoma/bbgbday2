// ChapterTitle.jsx
// Shows the chapter name and subtitle when the player enters a new chapter.
// Auto-dismisses after 3.5 seconds. Reads activeChapter from the store.

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../stores/gameStore';

export const ChapterTitle = () => {
  const activeChapter = useGameStore((s) => s.activeChapter);
  const [visible, setVisible] = useState(false);
  const [displayedChapter, setDisplayedChapter] = useState(null);
  const timerRef = useRef(null);
  const lastIdRef = useRef(null);

  useEffect(() => {
    if (!activeChapter) return;
    if (activeChapter.id === lastIdRef.current) return;

    lastIdRef.current = activeChapter.id;
    setDisplayedChapter(activeChapter);
    setVisible(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, 3500);

    return () => clearTimeout(timerRef.current);
  }, [activeChapter]);

  return (
    <AnimatePresence>
      {visible && displayedChapter && (
        <motion.div
          key={displayedChapter.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 60,
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <div style={{
            background: 'rgba(10, 8, 30, 0.55)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '12px',
            padding: '10px 28px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}>
            <div style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '4px',
              fontFamily: 'sans-serif',
            }}>
              Chapter
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'white',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.02em',
            }}>
              {displayedChapter.name}
            </div>
            {displayedChapter.subtitle && (
              <div style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.55)',
                fontStyle: 'italic',
                fontFamily: 'Georgia, serif',
                marginTop: '3px',
              }}>
                {displayedChapter.subtitle}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
