// WishTreeViewer.jsx
// Lets the user type a wish and saves it to localStorage.
// Displays all wishes with a magical scroll list.

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'babygirl_wishes';

const loadWishes = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

const saveWishes = (wishes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
};

export const WishTreeViewer = () => {
  const [wishes, setWishes]       = useState(loadWishes);
  const [input, setInput]         = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const newWish = {
      id: Date.now(),
      text: trimmed,
      at: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    };
    const updated = [newWish, ...wishes];
    setWishes(updated);
    saveWishes(updated);
    setInput('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2200);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{ padding: '40px 40px 32px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌳</div>
        <h2 style={{
          color: '#e9d5ff',
          fontFamily: 'Georgia, serif',
          fontSize: '22px',
          marginBottom: '6px',
          fontWeight: '600',
        }}>
          The Wish Tree
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '13px',
          fontStyle: 'italic',
          fontFamily: 'serif',
        }}>
          Tie your wish to a branch. The stars will hear it.
        </p>
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Write your wish..."
          maxLength={140}
          autoFocus
          style={{
            flex: 1,
            background: 'rgba(255,255,255,0.06)',
            border: '1.5px solid rgba(200,170,255,0.25)',
            borderRadius: '10px',
            padding: '12px 16px',
            color: 'white',
            fontSize: '14px',
            fontFamily: 'Georgia, serif',
            outline: 'none',
            caretColor: '#c4b5fd',
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          style={{
            background: input.trim()
              ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
              : 'rgba(255,255,255,0.08)',
            border: 'none',
            borderRadius: '10px',
            padding: '12px 20px',
            color: 'white',
            fontSize: '13px',
            fontWeight: '600',
            cursor: input.trim() ? 'pointer' : 'default',
            opacity: input.trim() ? 1 : 0.45,
            transition: 'all 0.2s',
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
          }}
        >
          Tie Wish ✦
        </button>
      </div>

      {/* Submitted feedback */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              textAlign: 'center',
              color: '#a78bfa',
              fontSize: '13px',
              marginBottom: '16px',
              fontStyle: 'italic',
              fontFamily: 'serif',
            }}
          >
            ✦ Your wish has been tied to the tree ✦
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishes list */}
      {wishes.length > 0 && (
        <div style={{
          maxHeight: '220px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingRight: '4px',
        }}>
          {wishes.map((wish, i) => (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                background: 'rgba(124, 58, 237, 0.12)',
                border: '1px solid rgba(196, 181, 253, 0.15)',
                borderRadius: '10px',
                padding: '12px 16px',
              }}
            >
              <div style={{
                color: 'rgba(255,255,255,0.82)',
                fontSize: '14px',
                fontFamily: 'Georgia, serif',
                lineHeight: '1.5',
              }}>
                {wish.text}
              </div>
              {wish.at && (
                <div style={{
                  color: 'rgba(196,181,253,0.5)',
                  fontSize: '11px',
                  marginTop: '6px',
                  fontFamily: 'sans-serif',
                  letterSpacing: '0.03em',
                }}>
                  {wish.at}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {wishes.length === 0 && (
        <p style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '13px',
          fontStyle: 'italic',
          fontFamily: 'serif',
        }}>
          No wishes yet — be the first to tie one.
        </p>
      )}

      <p style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.2)',
        fontSize: '11px',
        marginTop: '20px',
        letterSpacing: '0.08em',
        fontFamily: 'sans-serif',
      }}>
        Press ESC to leave
      </p>
    </div>
  );
};
