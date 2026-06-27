// letterLoader.js
// Loads all .md files from src/data/letters/ using Vite's import.meta.glob.
// Parses YAML frontmatter and body automatically.
// Drop a new .md file into that folder — it appears without any code changes.

/**
 * Very lightweight frontmatter parser.
 * Handles string and null values only (sufficient for our schema).
 * @param {string} raw — raw file content
 * @returns {{ meta: object, body: string }}
 */
const parseFrontmatter = (raw) => {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) return { meta: {}, body: raw.trim() };

  const fmLines = fmMatch[1].split('\n');
  const meta = {};
  for (const line of fmLines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    meta[key] = val === 'null' ? null : val;
  }

  return { meta, body: fmMatch[2].trim() };
};

// Eagerly import all letter markdown files as raw text using Vite's ?raw query
const rawFiles = import.meta.glob('../data/letters/*.md', { query: '?raw', import: 'default', eager: true });

// Build a map of id → letter object
const letterMap = {};
for (const [, rawContent] of Object.entries(rawFiles)) {
  const { meta, body } = parseFrontmatter(rawContent);
  if (meta.id) {
    letterMap[meta.id] = { ...meta, body };
  }
}

/**
 * Returns a letter by its interaction ID, or null if not found.
 * @param {string} id
 * @returns {{ id, title, paperStyle, music, illustration, body } | null}
 */
export const getLetter = (id) => letterMap[id] ?? null;

/**
 * Returns all loaded letters.
 */
export const getAllLetters = () => Object.values(letterMap);
