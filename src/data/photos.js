// photos.js
// Configuration for all photo interactions.
// Add entries here — no code changes needed anywhere else.
// src field: path relative to /public/photos/
//
// FIELDS:
//   id        — must match the interactionId on the world object
//   src       — path to image (relative to /public/photos/)
//   caption   — text shown beneath the photo
//   date      — optional date string
//   song      — optional audio path relative to /public/audio/

export const photos = [
  {
    id: 'photo_childhood_01',
    src: null, // Replace with: '/photos/childhood_01.jpg'
    caption: 'A moment from the early days.',
    date: null,
    song: null,
  },
  {
    id: 'photo_college_01',
    src: null, // Replace with: '/photos/college_01.jpg'
    caption: 'College days — finding your place in the world.',
    date: null,
    song: null,
  },
];

/**
 * Returns a photo config by its ID, or null if not found.
 * @param {string} id
 */
export const getPhoto = (id) => photos.find((p) => p.id === id) ?? null;
