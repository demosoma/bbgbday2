// Configuration data for all decorative and interactive objects in the world.
// This allows the art team and designers to add/modify objects without touching code.

export const worldData = {
  // Elements in the midground layer (parallax factor: ~0.5)
  midgroundElements: [
    { id: 'mid-hill-1', x: 200, type: 'hill', color: '#1a202c', height: 250, width: 400 },
    { id: 'mid-hill-2', x: 800, type: 'hill', color: '#2d3748', height: 200, width: 350 },
    { id: 'mid-hill-3', x: 1500, type: 'hill', color: '#1a202c', height: 280, width: 500 },
    { id: 'mid-hill-4', x: 2200, type: 'hill', color: '#2d3748', height: 220, width: 400 },
    { id: 'mid-hill-5', x: 3000, type: 'hill', color: '#1a202c', height: 300, width: 600 },
    { id: 'mid-hill-6', x: 4200, type: 'hill', color: '#2d3748', height: 240, width: 450 },
  ],

  // Elements in the foreground / walkable layer (parallax factor: 1.0)
  foregroundElements: [
    // Houses / Starting Point
    { id: 'protagonist-house', x: 250, y: 220, type: 'house', width: 300, height: 200, title: 'Sleeping Room' },
    
    // Trees
    { id: 'tree-1', x: 700, y: 260, type: 'tree', height: 180, width: 80 },
    { id: 'tree-2', x: 950, y: 280, type: 'tree', height: 150, width: 70 },
    { id: 'tree-3', x: 1200, y: 250, type: 'tree', height: 200, width: 90 },
    
    // Flowers
    { id: 'flower-patch-1', x: 600, y: 420, type: 'flower', color: '#f687b3' },
    { id: 'flower-patch-2', x: 850, y: 440, type: 'flower', color: '#feb2b2' },
    { id: 'flower-patch-3', x: 1100, y: 410, type: 'flower', color: '#faf089' },

    // Fences
    { id: 'fence-1', x: 1350, y: 380, type: 'fence', count: 5 },
    { id: 'fence-2', x: 2800, y: 380, type: 'fence', count: 8 },

    // More Trees & Decorations along the route
    { id: 'tree-4', x: 1800, y: 260, type: 'tree', height: 170, width: 80 },
    { id: 'tree-5', x: 2500, y: 250, type: 'tree', height: 220, width: 100 },
    { id: 'tree-6', x: 3500, y: 270, type: 'tree', height: 190, width: 85 },
  ]
};
