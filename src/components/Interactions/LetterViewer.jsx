// LetterViewer.jsx
// Renders a letter from the letter data store.
// Supports 'parchment' and 'modern' paper styles from frontmatter.
// Smooth unfold animation via Framer Motion. No modal libraries.

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { getLetter } from '../../utils/letterLoader';

// Converts plain markdown body to simple paragraph/italic/bold JSX
const renderBody = (body) => {
  return body.split('\n\n').map((block, i) => {
    // Italic lines (wrapped in *)
    const hasItalic = block.includes('*');
    const parsed = block
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
    return (
      <p
        key={i}
        dangerouslySetInnerHTML={{ __html: parsed }}
        style={{
          margin: '0 0 1.15em',
          lineHeight: '1.85',
          color: 'rgba(255,255,255,0.78)',
          fontStyle: hasItalic && block.startsWith('*') ? 'italic' : 'normal',
        }}
      />
    );
  });
};

const PAPER_STYLES = {
  parchment: {
    background: 'linear-gradient(160deg, rgba(45, 32, 18, 0.95) 0%, rgba(30, 20, 10, 0.98) 100%)',
    border: '1px solid rgba(200, 168, 122, 0.25)',
    titleColor: '#d4a574',
    accentColor: '#c8a87a',
    fontFamily: 'Georgia, "Times New Roman", serif',
  },
  modern: {
    background: 'linear-gradient(160deg, rgba(20, 14, 50, 0.97) 0%, rgba(12, 8, 35, 0.99) 100%)',
    border: '1px solid rgba(160, 130, 255, 0.2)',
    titleColor: '#c4b5fd',
    accentColor: '#9f7aea',
    fontFamily: '"Georgia", serif',
  },
};

export const LetterViewer = ({ target }) => {
  const letter = useMemo(() => getLetter(target?.interactionId), [target?.interactionId]);
  const style = PAPER_STYLES[letter?.paperStyle] ?? PAPER_STYLES.parchment;

  if (!letter) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontFamily: 'serif' }}>
        <p>Letter not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scaleY: 0.4, opacity: 0, originY: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{
        padding: '44px 48px 40px',
        background: style.background,
        borderRadius: '14px',
        fontFamily: style.fontFamily,
      }}
    >
      {/* Decorative top rule */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '28px',
      }}>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${style.accentColor}40)` }} />
        <div style={{ color: style.accentColor, fontSize: '16px' }}>✦</div>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${style.accentColor}40)` }} />
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '600',
        color: style.titleColor,
        marginBottom: '24px',
        letterSpacing: '0.01em',
        textAlign: 'center',
        fontFamily: style.fontFamily,
      }}>
        {letter.title}
      </h2>

      {/* Body */}
      <div style={{
        fontSize: '15px',
        lineHeight: '1.85',
        fontFamily: style.fontFamily,
      }}>
        {renderBody(letter.body)}
      </div>

      {/* Bottom rule */}
      <div style={{
        marginTop: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${style.accentColor}30)` }} />
        <div style={{ color: style.accentColor, fontSize: '12px', opacity: 0.6 }}>♥</div>
        <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${style.accentColor}30)` }} />
      </div>

      {/* ESC hint */}
      <p style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.25)',
        fontSize: '11px',
        marginTop: '20px',
        letterSpacing: '0.08em',
        fontFamily: 'sans-serif',
      }}>
        Press ESC to close
      </p>
    </motion.div>
  );
};
