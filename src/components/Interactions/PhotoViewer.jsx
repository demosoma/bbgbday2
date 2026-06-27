// PhotoViewer.jsx
// Renders a polaroid-style photo with zoom animation.
// If no src is available yet, shows a placeholder illustration.
// Background darkens behind the photo (handled by InteractionOverlay's backdrop).

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getPhoto } from '../../data/photos';

export const PhotoViewer = ({ target }) => {
  const photo = useMemo(() => getPhoto(target?.interactionId), [target?.interactionId]);

  if (!photo) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'serif' }}>
        Photo not found.
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 40px 32px', textAlign: 'center' }}>
      {/* Polaroid frame */}
      <motion.div
        initial={{ scale: 0.75, opacity: 0, rotate: -3 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        style={{
          display: 'inline-block',
          background: '#f9f5f0',
          padding: '14px 14px 44px',
          borderRadius: '4px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          maxWidth: '360px',
          width: '100%',
        }}
      >
        {/* Photo area */}
        <div style={{
          width: '100%',
          aspectRatio: '4/3',
          background: photo.src
            ? `url(${photo.src}) center/cover no-repeat`
            : 'linear-gradient(135deg, #c4d4e8 0%, #a8c4dc 50%, #4a7c4f 100%)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {!photo.src && (
            <>
              {/* Placeholder landscape */}
              <svg width="100%" height="100%" viewBox="0 0 320 240" style={{ position: 'absolute', inset: 0 }}>
                <rect width="320" height="240" fill="#c4d4e8" />
                <rect y="160" width="320" height="80" fill="#4a7c4f" />
                <ellipse cx="80" cy="155" rx="55" ry="45" fill="#3a6b3f" />
                <ellipse cx="200" cy="148" rx="45" ry="38" fill="#2d5236" />
                <circle cx="255" cy="55" r="30" fill="#fffbf0" opacity="0.9" />
              </svg>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.65)',
                fontSize: '11px',
                fontFamily: 'serif',
                fontStyle: 'italic',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                whiteSpace: 'nowrap',
              }}>
                Photo coming soon...
              </div>
            </>
          )}
        </div>

        {/* Caption */}
        {photo.caption && (
          <div style={{
            marginTop: '12px',
            fontFamily: 'Georgia, serif',
            fontSize: '13px',
            color: '#5a4a3a',
            lineHeight: '1.5',
            textAlign: 'center',
          }}>
            {photo.caption}
          </div>
        )}

        {/* Date */}
        {photo.date && (
          <div style={{
            marginTop: '6px',
            fontFamily: 'sans-serif',
            fontSize: '11px',
            color: '#8a7a6a',
            textAlign: 'center',
            letterSpacing: '0.04em',
          }}>
            {photo.date}
          </div>
        )}
      </motion.div>

      {/* ESC hint */}
      <p style={{
        color: 'rgba(255,255,255,0.25)',
        fontSize: '11px',
        marginTop: '20px',
        letterSpacing: '0.08em',
        fontFamily: 'sans-serif',
      }}>
        Press ESC to close
      </p>
    </div>
  );
};
