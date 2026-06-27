import test from 'node:test';
import assert from 'node:assert/strict';

import { chapters } from './chapters.js';

test('each chapter resolves to a placeholder soundtrack path', () => {
  assert.ok(chapters.length > 0, 'chapters should be defined');

  for (const chapter of chapters) {
    assert.equal(typeof chapter.music, 'string', `${chapter.id} should have a music path`);
    assert.match(chapter.music, /^\/audio\/music\//, `${chapter.id} should use the public music path`);
  }
});
