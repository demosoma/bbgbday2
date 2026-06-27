// galleryPhotos.js
// Photo configuration array for the Gallery of Moments.
// Every polaroid displays on the responsive CSS grid.
// Feel free to replace these placeholder values with actual image paths, captions, and dates.

export const galleryPhotos = Array.from({ length: 24 }, (_, i) => ({
  id: `gallery_photo_${i + 1}`,
  image: null,
  src: null, // support both
  caption: `Moment #${i + 1} — A beautiful chapter from our storybook journey.`,
  date: `${10 + (i % 12)} Nov 202${(i % 5) + 1}`,
  music: null,
  song: null, // support both
}));
