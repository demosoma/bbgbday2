// musicManager.js
// Singleton Howler-based music manager.
// Handles ambient, chapter, and letter tracks with crossfading.
// Volume is persisted to localStorage.
// Import and call functions directly — no React coupling.

import { Howl, Howler } from 'howler';

const STORAGE_KEY = 'babygirl_volume';
const DEFAULT_VOLUME = 0.65;
const FADE_DURATION = 1800; // ms

let currentAmbient = null;
let currentChapter = null;

const getSavedVolume = () => {
  try {
    const v = parseFloat(localStorage.getItem(STORAGE_KEY));
    return isNaN(v) ? DEFAULT_VOLUME : v;
  } catch {
    return DEFAULT_VOLUME;
  }
};

const saveVolume = (v) => {
  try { localStorage.setItem(STORAGE_KEY, String(v)); } catch {}
};

/**
 * Creates a looping Howl and starts playing it.
 * @param {string} src
 * @param {number} volume
 * @returns {Howl}
 */
const createTrack = (src, volume = getSavedVolume()) => {
  const howl = new Howl({
    src: [src],
    loop: true,
    volume: 0,
    html5: true, // streaming — avoids decode delay
  });
  howl.play();
  howl.fade(0, volume, FADE_DURATION);
  return howl;
};

/**
 * Fades out and stops a Howl instance.
 */
const fadeOut = (howl) => {
  if (!howl) return;
  howl.fade(howl.volume(), 0, FADE_DURATION);
  setTimeout(() => {
    try { howl.stop(); howl.unload(); } catch {}
  }, FADE_DURATION + 100);
};

export const musicManager = {
  /**
   * Plays ambient background music, replacing any existing ambient track.
   * Pass null to stop ambient.
   */
  playAmbient(src) {
    if (!src) { fadeOut(currentAmbient); currentAmbient = null; return; }
    if (currentAmbient?._src?.[0] === src) return;
    fadeOut(currentAmbient);
    currentAmbient = createTrack(src);
  },

  /**
   * Plays chapter-specific music, crossfading from any previous chapter track.
   * Pass null to stop chapter music.
   */
  playChapter(src) {
    if (!src) { fadeOut(currentChapter); currentChapter = null; return; }
    if (currentChapter?._src?.[0] === src) return;
    fadeOut(currentChapter);
    currentChapter = createTrack(src);
  },

  /**
   * Plays a one-shot SFX (non-looping).
   */
  playSfx(src) {
    if (!src) return;
    const sfx = new Howl({ src: [src], loop: false, volume: getSavedVolume() });
    sfx.play();
  },

  /**
   * Pauses all audio.
   */
  pause() {
    Howler.volume(0);
  },

  /**
   * Resumes all audio.
   */
  resume() {
    Howler.volume(getSavedVolume());
  },

  /**
   * Sets global volume (0–1) and persists it.
   */
  setVolume(v) {
    const clamped = Math.max(0, Math.min(1, v));
    Howler.volume(clamped);
    saveVolume(clamped);
  },

  getVolume() {
    return getSavedVolume();
  },
};
