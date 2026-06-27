export const chapterMusic = {
  birth: '/audio/music/birth.mp3',
  growing_up: '/audio/music/growing-up.mp3',
  school: '/audio/music/school.mp3',
  college: '/audio/music/college.mp3',
  meeting: '/audio/music/when-we-met.mp3',
  letters: '/audio/music/letters.mp3',
  wish_tree: '/audio/music/wish-tree.mp3',
  future: '/audio/music/ending.mp3',
};

export const getChapterMusic = (chapterId) => chapterMusic[chapterId] ?? null;
