// WishTreeViewer.jsx
// Displays three wishes to tie to the Wish Tree.
// Each wish has a Title, Textarea, and Submit button.
// Saves local state to localStorage and supports editing.

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const WishTreeViewer = () => {
  const getInitialWish = (key) => {
    try {
      return localStorage.getItem(key) ?? '';
    } catch {
      return '';
    }
  };

  const [wish1, setWish1] = useState(() => getInitialWish('babygirl_wish_1'));
  const [wish2, setWish2] = useState(() => getInitialWish('babygirl_wish_2'));
  const [wish3, setWish3] = useState(() => getInitialWish('babygirl_wish_3'));

  const [saved1, setSaved1] = useState(() => !!getInitialWish('babygirl_wish_1'));
  const [saved2, setSaved2] = useState(() => !!getInitialWish('babygirl_wish_2'));
  const [saved3, setSaved3] = useState(() => !!getInitialWish('babygirl_wish_3'));

  const handleSave = (key, val, setSaved) => {
    try {
      localStorage.setItem(key, val);
      setSaved(true);
      console.log(`Saved wish for ${key}: ${val}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleEdit = (setSaved) => {
    setSaved(false);
  };

  const WISHES_CONFIG = [
    {
      id: 1,
      key: 'babygirl_wish_1',
      title: 'Wish for Today',
      value: wish1,
      setValue: setWish1,
      saved: saved1,
      setSaved: setSaved1,
      placeholder: 'What is your deepest wish for today?',
    },
    {
      id: 2,
      key: 'babygirl_wish_2',
      title: 'Wish for Tomorrow',
      value: wish2,
      setValue: setWish2,
      saved: saved2,
      setSaved: setSaved2,
      placeholder: 'What do you hope for in our future?',
    },
    {
      id: 3,
      key: 'babygirl_wish_3',
      title: 'Wish for the Universe',
      value: wish3,
      setValue: setWish3,
      saved: saved3,
      setSaved: setSaved3,
      placeholder: 'Write a silent promise or dream...',
    },
  ];

  return (
    <div style={{ padding: '32px 24px' }}>
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
          Write three wishes to tie to the branches of the memory tree.
        </p>
      </div>

      {/* 3 Wishes forms side-by-side or stacked cleanly */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        maxWidth: '600px',
        margin: '0 auto',
      }}>
        {WISHES_CONFIG.map((w) => (
          <div
            key={w.id}
            style={{
              background: 'rgba(124, 58, 237, 0.08)',
              border: '1px solid rgba(196, 181, 253, 0.15)',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <h3 style={{
              color: '#d6bcfa',
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '12px',
            }}>
              {w.title}
            </h3>

            {w.saved ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '14px',
                  fontFamily: 'Georgia, serif',
                  fontStyle: 'italic',
                  lineHeight: '1.6',
                  whiteSpace: 'pre-wrap',
                }}>
                  "{w.value}"
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '4px',
                }}>
                  <span style={{
                    color: '#86efac',
                    fontSize: '12px',
                    fontFamily: 'sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    ✦ Tied to branch
                  </span>
                  <button
                    onClick={() => handleEdit(w.setSaved)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#a78bfa',
                      fontSize: '12px',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Edit Wish
                  </button>
                </div>
              </motion.div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea
                  value={w.value}
                  onChange={(e) => w.setValue(e.target.value)}
                  placeholder={w.placeholder}
                  maxLength={200}
                  rows={3}
                  style={{
                    background: 'rgba(0,0,0,0.2)',
                    border: '1.5px solid rgba(200,170,255,0.25)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    color: 'white',
                    fontSize: '13.5px',
                    fontFamily: 'Georgia, serif',
                    outline: 'none',
                    resize: 'none',
                    caretColor: '#c4b5fd',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => handleSave(w.key, w.value, w.setSaved)}
                    disabled={!w.value.trim()}
                    style={{
                      background: w.value.trim()
                        ? 'linear-gradient(135deg, #7c3aed, #a855f7)'
                        : 'rgba(255,255,255,0.06)',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: w.value.trim() ? 'pointer' : 'default',
                      opacity: w.value.trim() ? 1 : 0.45,
                      transition: 'all 0.2s',
                    }}
                  >
                    Tie Wish ✦
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p style={{
        textAlign: 'center',
        color: 'rgba(255,255,255,0.2)',
        fontSize: '11px',
        marginTop: '28px',
        letterSpacing: '0.08em',
        fontFamily: 'sans-serif',
      }}>
        Press ESC to leave
      </p>
    </div>
  );
};
