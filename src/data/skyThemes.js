// skyThemes.js
// Defines the visual properties for each sky theme.
// The SkyManager interpolates between two themes based on chapter progress.
// Add new themes here without touching any component code.

export const skyThemes = {
  dreamy_night: {
    // Sky gradient (top to bottom)
    skyTop: '#050b1a',
    skyMid: '#0a1128',
    skyBottom: '#111830',
    // Ground gradient
    groundTop: '#192716',
    groundBottom: '#10190e',
    groundBorder: '#2d4527',
    // Celestial bodies
    moonOpacity: 1,
    moonY: 60,       // px from top
    moonColor: '#fffbf0',
    moonGlow: 'rgba(255,235,188,0.35)',
    sunOpacity: 0,
    sunY: 620,
    sunColor: '#ffcc44',
    sunGlow: 'rgba(255,200,80,0)',
    // Stars
    starOpacity: 1,
    starCount: 180,
    // Clouds
    cloudOpacity: 0.03,
    // Ambient tint overlay
    ambientColor: 'rgba(20, 10, 80, 0.18)',
    // Fog
    fogColor: 'rgba(30, 20, 80, 0)',
  },

  starry_night: {
    skyTop: '#020715',
    skyMid: '#060e22',
    skyBottom: '#0a1428',
    groundTop: '#111d10',
    groundBottom: '#080f07',
    groundBorder: '#1e3019',
    moonOpacity: 1,
    moonY: 40,
    moonColor: '#f0f8ff',
    moonGlow: 'rgba(220,240,255,0.5)',
    sunOpacity: 0,
    sunY: 620,
    sunColor: '#ffcc44',
    sunGlow: 'rgba(255,200,80,0)',
    starOpacity: 1,
    starCount: 250,
    cloudOpacity: 0.01,
    ambientColor: 'rgba(10, 5, 60, 0.25)',
    fogColor: 'rgba(20, 10, 60, 0.05)',
  },

  early_morning: {
    skyTop: '#1a1040',
    skyMid: '#4a2c6a',
    skyBottom: '#e8785a',
    groundTop: '#1e2f1a',
    groundBottom: '#111a0e',
    groundBorder: '#304824',
    moonOpacity: 0.4,
    moonY: 80,
    moonColor: '#fffbf0',
    moonGlow: 'rgba(255,235,188,0.1)',
    sunOpacity: 0.5,
    sunY: 320,
    sunColor: '#ff9944',
    sunGlow: 'rgba(255,150,80,0.3)',
    starOpacity: 0.25,
    starCount: 80,
    cloudOpacity: 0.08,
    ambientColor: 'rgba(180, 80, 60, 0.06)',
    fogColor: 'rgba(200, 120, 80, 0.04)',
  },

  golden_hour: {
    skyTop: '#1a2040',
    skyMid: '#7a3a20',
    skyBottom: '#ffb347',
    groundTop: '#2a3a18',
    groundBottom: '#18220f',
    groundBorder: '#3a5020',
    moonOpacity: 0,
    moonY: 100,
    moonColor: '#fffbf0',
    moonGlow: 'rgba(255,235,188,0)',
    sunOpacity: 0.9,
    sunY: 200,
    sunColor: '#ffcc44',
    sunGlow: 'rgba(255,200,80,0.5)',
    starOpacity: 0,
    starCount: 20,
    cloudOpacity: 0.15,
    ambientColor: 'rgba(255, 160, 60, 0.08)',
    fogColor: 'rgba(255, 180, 80, 0.03)',
  },

  afternoon: {
    skyTop: '#1a3a6e',
    skyMid: '#2e6fb5',
    skyBottom: '#87ceeb',
    groundTop: '#2e4820',
    groundBottom: '#1c2e14',
    groundBorder: '#3e6028',
    moonOpacity: 0,
    moonY: 120,
    moonColor: '#fffbf0',
    moonGlow: 'rgba(255,235,188,0)',
    sunOpacity: 1,
    sunY: 80,
    sunColor: '#fff4a0',
    sunGlow: 'rgba(255,240,150,0.4)',
    starOpacity: 0,
    starCount: 0,
    cloudOpacity: 0.2,
    ambientColor: 'rgba(100, 180, 255, 0.04)',
    fogColor: 'rgba(180, 220, 255, 0)',
  },

  sunrise: {
    skyTop: '#0d1a40',
    skyMid: '#c85a20',
    skyBottom: '#ffcc77',
    groundTop: '#253820',
    groundBottom: '#141f10',
    groundBorder: '#354e25',
    moonOpacity: 0.1,
    moonY: 100,
    moonColor: '#fffbf0',
    moonGlow: 'rgba(255,235,188,0)',
    sunOpacity: 0.75,
    sunY: 260,
    sunColor: '#ffaa44',
    sunGlow: 'rgba(255,170,80,0.4)',
    starOpacity: 0.05,
    starCount: 30,
    cloudOpacity: 0.12,
    ambientColor: 'rgba(255, 200, 100, 0.08)',
    fogColor: 'rgba(255, 220, 140, 0.04)',
  },
};

/**
 * Linearly interpolates between two numbers.
 */
const lerp = (a, b, t) => a + (b - a) * t;

/**
 * Parses "rgba(r,g,b,a)" into [r,g,b,a].
 */
const parseRgba = (rgba) => {
  const m = rgba.match(/[\d.]+/g).map(Number);
  return m;
};

/**
 * Linearly interpolates between two RGBA color strings.
 */
export const lerpColor = (colorA, colorB, t) => {
  const [r1, g1, b1, a1] = parseRgba(colorA);
  const [r2, g2, b2, a2] = parseRgba(colorB);
  return `rgba(${Math.round(lerp(r1, r2, t))},${Math.round(lerp(g1, g2, t))},${Math.round(lerp(b1, b2, t))},${(lerp(a1, a2, t)).toFixed(3)})`;
};

/**
 * Parses a hex color string (e.g. '#1a2238') into "rgba(r,g,b,1)".
 */
const hexToRgba = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},1)`;
};

/**
 * Interpolates all numeric / color properties between two sky themes.
 * @param {string} themeAId
 * @param {string} themeBId
 * @param {number} t  0=all A, 1=all B
 * @returns {object} interpolated theme
 */
export const interpolateSky = (themeAId, themeBId, t) => {
  const A = skyThemes[themeAId] || skyThemes.dreamy_night;
  const B = skyThemes[themeBId] || skyThemes.dreamy_night;

  const lerpHex = (a, b, t) => lerpColor(hexToRgba(a), hexToRgba(b), t);
  const lerpN = lerp;

  return {
    skyTop:        lerpHex(A.skyTop, B.skyTop, t),
    skyMid:        lerpHex(A.skyMid, B.skyMid, t),
    skyBottom:     lerpHex(A.skyBottom, B.skyBottom, t),
    groundTop:     lerpHex(A.groundTop, B.groundTop, t),
    groundBottom:  lerpHex(A.groundBottom, B.groundBottom, t),
    groundBorder:  lerpHex(A.groundBorder, B.groundBorder, t),
    moonOpacity:   lerpN(A.moonOpacity, B.moonOpacity, t),
    moonY:         lerpN(A.moonY, B.moonY, t),
    moonColor:     lerpHex(A.moonColor, B.moonColor, t),
    moonGlow:      lerpColor(A.moonGlow, B.moonGlow, t),
    sunOpacity:    lerpN(A.sunOpacity, B.sunOpacity, t),
    sunY:          lerpN(A.sunY, B.sunY, t),
    sunColor:      lerpHex(A.sunColor, B.sunColor, t),
    sunGlow:       lerpColor(A.sunGlow, B.sunGlow, t),
    starOpacity:   lerpN(A.starOpacity, B.starOpacity, t),
    starCount:     Math.round(lerpN(A.starCount, B.starCount, t)),
    cloudOpacity:  lerpN(A.cloudOpacity, B.cloudOpacity, t),
    ambientColor:  lerpColor(A.ambientColor, B.ambientColor, t),
    fogColor:      lerpColor(A.fogColor, B.fogColor, t),
  };
};
