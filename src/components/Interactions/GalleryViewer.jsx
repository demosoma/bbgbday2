// GalleryViewer.jsx
// Displays a responsive grid of Polaroid photo moments.
// Clicking a photo opens an inner fullscreen preview card with caption.
// Escape keypress when preview is open closes the preview; otherwise, closes the modal.

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryPhotos } from '../../data/galleryPhotos';

export const GalleryViewer = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setSelectedPhoto(null);
      }
    };
    // Intercept escape key before it propagates to the main gameplay listener
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [selectedPhoto]);

  return (
    <div style={{ padding: '32px 24px', position: 'relative' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>🖼️</div>
        <h2 style={{
          color: '#fef3c7',
          fontFamily: 'Georgia, serif',
          fontSize: '24px',
          fontWeight: '600',
          marginBottom: '6px'
        }}>
          Gallery of Moments
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.5)',
          fontSize: '13px',
          fontStyle: 'italic',
          fontFamily: 'serif'
        }}>
          A beautiful collection of our memory snapshots. Click to view closely.
        </p>
      </div>

      {/* Grid of Polaroid Photos */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '20px',
        padding: '10px 0',
      }}>
        {galleryPhotos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.03, 0.6) }}
            whileHover={{ scale: 1.05, rotate: (i % 2 === 0 ? 2 : -2) }}
            onClick={() => setSelectedPhoto(photo)}
            style={{
              background: '#f9f5f0',
              padding: '8px 8px 20px',
              borderRadius: '4px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `rotate(${(i % 3 - 1) * 1.5}deg)`,
            }}
          >
            {/* Image Placeholder */}
            <div style={{
              width: '100%',
              aspectRatio: '1',
              background: 'linear-gradient(135deg, #c4d4e8 0%, #a8c4dc 100%)',
              borderRadius: '2px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '20px' }}>🌸</span>
            </div>
            {/* Caption (mini version) */}
            <div style={{
              marginTop: '8px',
              fontSize: '10px',
              color: '#5a4a3a',
              fontFamily: 'Georgia, serif',
              textAlign: 'center',
              lineHeight: '1.2',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              height: '24px',
            }}>
              {photo.caption}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Polaroid Preview Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <>
            {/* Inner Backdrop for Preview */}
            <motion.div
              key="preview-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(5, 5, 20, 0.85)',
                backdropFilter: 'blur(4px)',
                zIndex: 100,
                cursor: 'zoom-out',
              }}
            />

            {/* Inner Polaroid preview */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 101,
              pointerEvents: 'none',
            }}>
              <motion.div
                key="preview-card"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                style={{
                  pointerEvents: 'auto',
                  background: '#f9f5f0',
                  padding: '16px 16px 48px',
                  borderRadius: '6px',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                  maxWidth: '420px',
                  width: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Image Placeholder */}
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  background: 'linear-gradient(135deg, #c4d4e8 0%, #a8c4dc 50%, #4a7c4f 100%)',
                  borderRadius: '2px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                  <svg width="100%" height="100%" viewBox="0 0 320 240" style={{ position: 'absolute', inset: 0 }}>
                    <rect width="320" height="240" fill="#c4d4e8" />
                    <rect y="160" width="320" height="80" fill="#4a7c4f" />
                    <ellipse cx="80" cy="155" rx="55" ry="45" fill="#3a6b3f" />
                    <circle cx="255" cy="55" r="30" fill="#fffbf0" opacity="0.9" />
                  </svg>
                  <span style={{ fontSize: '36px', zIndex: 1 }}>✨</span>
                </div>

                {/* Caption */}
                <div style={{
                  marginTop: '16px',
                  fontFamily: 'Georgia, serif',
                  fontSize: '15px',
                  color: '#5a4a3a',
                  lineHeight: '1.4',
                  textAlign: 'center',
                }}>
                  {selectedPhoto.caption}
                </div>

                {/* Date */}
                {selectedPhoto.date && (
                  <div style={{
                    marginTop: '8px',
                    fontFamily: 'sans-serif',
                    fontSize: '12px',
                    color: '#8a7a6a',
                    letterSpacing: '0.04em',
                  }}>
                    {selectedPhoto.date}
                  </div>
                )}

                {/* Close Button Hint */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  style={{
                    marginTop: '20px',
                    background: '#5a4a3a',
                    color: '#f9f5f0',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px 16px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Close Preview
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
