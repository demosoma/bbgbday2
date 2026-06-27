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
let audioUnlocked = false;
let gestureHandlerBound = false;

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

const isAudioContextRunning = () => {
  try {
    const ctx = Howler.ctx;
    return !!ctx && (ctx.state === 'running' || Howler.state() === 'running');
  } catch {
    return false;
  }
};

const resumeAudioContext = async () => {
  if (audioUnlocked || isAudioContextRunning()) {
    audioUnlocked = true;
    return true;
  }

  try {
    if (Howler.ctx && typeof Howler.ctx.resume === 'function') {
      await Howler.ctx.resume();
    } else if (typeof Howler.resume === 'function') {
      Howler.resume();
    }
    audioUnlocked = true;
    return true;
  } catch {
    return false;
  }
};

const startHowl = (howl, volume = getSavedVolume()) => {
  if (!howl) return;

  try {
    if (!howl.playing()) {
      howl.volume(0);
      howl.play();
    }
    howl.fade(howl.volume(), volume, FADE_DURATION);
  } catch {}
};

const bindAudioUnlock = () => {
  if (gestureHandlerBound || typeof window === 'undefined') return;
  gestureHandlerBound = true;

  const unlockAudio = () => {
    window.removeEventListener('pointerdown', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('keydown', unlockAudio);
    window.removeEventListener('click', unlockAudio);

    resumeAudioContext().then(() => {
      if (currentAmbient && !currentAmbient.playing()) {
        startHowl(currentAmbient, getSavedVolume());
      }
      if (currentChapter && !currentChapter.playing()) {
        startHowl(currentChapter, getSavedVolume());
      }
    });
  };

  window.addEventListener('pointerdown', unlockAudio, { once: true, passive: true });
  window.addEventListener('touchstart', unlockAudio, { once: true, passive: true });
  window.addEventListener('keydown', unlockAudio, { once: true });
  window.addEventListener('click', unlockAudio, { once: true });
};

/**
 * Creates a looping Howl and starts playing it once audio is unlocked.
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

  if (isAudioContextRunning()) {
    startHowl(howl, volume);
  } else {
    bindAudioUnlock();
  }

  return howl;
};

/**
 * Fades out and stops a Howl instance.
 */
const fadeOut = (howl) => {
  if (!howl) return;
  try {
    howl.fade(howl.volume(), 0, FADE_DURATION);
    setTimeout(() => {
      try { howl.stop(); howl.unload(); } catch {}
    }, FADE_DURATION + 100);
  } catch {}
};

export const musicManager = {
  start() {
    return resumeAudioContext().then(() => {
      if (currentAmbient && !currentAmbient.playing()) {
        startHowl(currentAmbient, getSavedVolume());
      }
      if (currentChapter && !currentChapter.playing()) {
        startHowl(currentChapter, getSavedVolume());
      }
      Howler.volume(getSavedVolume());
    });
  },

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
    if (isAudioContextRunning()) {
      sfx.play();
    } else {
      bindAudioUnlock();
    }
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
    resumeAudioContext().then(() => {
      if (currentAmbient && !currentAmbient.playing()) {
        startHowl(currentAmbient, getSavedVolume());
      }
      if (currentChapter && !currentChapter.playing()) {
        startHowl(currentChapter, getSavedVolume());
      }
      Howler.volume(getSavedVolume());
    });
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
