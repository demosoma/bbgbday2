// WorldObjectRenderer.jsx
// Renders all world objects from configuration.
// Add new types by registering them in TYPE_MAP — no other changes needed.

import React from 'react';
import { worldData } from '../../data/world';
import { TreeObject }          from './types/Tree';
import { FlowerObject }        from './types/Flower';
import { HouseObject }         from './types/House';
import { FenceObject }         from './types/Fence';
import { LetterObject }        from './types/LetterObject';
import { PhotoObject }         from './types/PhotoObject';
import { WishTreeObject }      from './types/WishTreeObject';
import { CakeObject }          from './types/CakeObject';
import { MemoryMarkerObject }  from './types/MemoryMarkerObject';

// Registry: map type string → component
const TYPE_MAP = {
  tree:         TreeObject,
  flower:       FlowerObject,
  house:        HouseObject,
  fence:        FenceObject,
  letter:       LetterObject,
  photo:        PhotoObject,
  wishTree:     WishTreeObject,
  cake:         CakeObject,
  memoryMarker: MemoryMarkerObject,
};

export const WorldObjectRenderer = () => (
  <>
    {worldData.foregroundElements.map((el) => {
      const Component = TYPE_MAP[el.type];
      if (!Component) return null;
      return <Component key={el.id} el={el} />;
    })}
  </>
);
