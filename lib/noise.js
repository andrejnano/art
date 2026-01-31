/**
 * Extended noise functions for generative art.
 * Built on top of p5.js noise() — these add layering and domain warping.
 */

/**
 * Fractal Brownian Motion (fBM) — layered noise with decreasing amplitude.
 * Requires p5.js noise() to be available globally.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} octaves - Number of noise layers (default 4)
 * @param {number} lacunarity - Frequency multiplier per octave (default 2.0)
 * @param {number} gain - Amplitude multiplier per octave (default 0.5)
 * @returns {number} Value in approximately [0, 1]
 */
function fbm(x, y, octaves = 4, lacunarity = 2.0, gain = 0.5) {
  let value = 0;
  let amplitude = 1.0;
  let frequency = 1.0;
  let maxValue = 0;

  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise(x * frequency, y * frequency);
    maxValue += amplitude;
    amplitude *= gain;
    frequency *= lacunarity;
  }

  return value / maxValue;
}

/**
 * Domain warping — distort noise coordinates with noise itself.
 * Creates organic, fluid-like patterns.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} scale - Base noise scale
 * @param {number} warpAmount - How much to warp (default 4.0)
 * @param {number} octaves - fBM octaves (default 4)
 * @returns {number} Value in approximately [0, 1]
 */
function warpedNoise(x, y, scale = 0.005, warpAmount = 4.0, octaves = 4) {
  const qx = fbm(x * scale, y * scale, octaves);
  const qy = fbm(x * scale + 5.2, y * scale + 1.3, octaves);

  return fbm(
    x * scale + warpAmount * qx,
    y * scale + warpAmount * qy,
    octaves
  );
}

/**
 * Curl noise — divergence-free 2D noise field.
 * Returns a direction vector [dx, dy] — good for particle movement.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} scale
 * @returns {number[]} [dx, dy] unit-ish direction vector
 */
function curlNoise(x, y, scale = 0.005) {
  const eps = 0.0001;
  const n1 = noise(x * scale, (y + eps) * scale);
  const n2 = noise(x * scale, (y - eps) * scale);
  const n3 = noise((x + eps) * scale, y * scale);
  const n4 = noise((x - eps) * scale, y * scale);

  const dx = (n1 - n2) / (2 * eps);
  const dy = -(n3 - n4) / (2 * eps);

  return [dx, dy];
}

/**
 * Ridge noise — inverted absolute value noise.
 * Creates sharp ridges and valleys.
 *
 * @param {number} x
 * @param {number} y
 * @param {number} octaves
 * @returns {number} Value in approximately [0, 1]
 */
function ridgeNoise(x, y, octaves = 4) {
  let value = 0;
  let amplitude = 1.0;
  let frequency = 1.0;
  let maxValue = 0;
  let prev = 1.0;

  for (let i = 0; i < octaves; i++) {
    let n = noise(x * frequency, y * frequency);
    n = 1.0 - Math.abs(n * 2 - 1);
    n = n * n;
    n *= prev;
    prev = n;
    value += amplitude * n;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }

  return value / maxValue;
}
