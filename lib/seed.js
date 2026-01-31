/**
 * Seeded pseudo-random number generator.
 * Uses mulberry32 — fast, good distribution, 32-bit state.
 */

function createRNG(seed) {
  let s = seed | 0;

  function next() {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  return {
    /** Random float in [0, 1) */
    random: next,

    /** Random float in [min, max) */
    range(min, max) {
      return min + next() * (max - min);
    },

    /** Random integer in [min, max] inclusive */
    int(min, max) {
      return Math.floor(min + next() * (max - min + 1));
    },

    /** Pick random element from array */
    pick(arr) {
      return arr[Math.floor(next() * arr.length)];
    },

    /** Shuffle array (Fisher-Yates), returns new array */
    shuffle(arr) {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },

    /** Gaussian-distributed random (Box-Muller) */
    gaussian(mean = 0, stddev = 1) {
      const u1 = next();
      const u2 = next();
      const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      return mean + z * stddev;
    },

    /** Boolean with given probability */
    chance(p = 0.5) {
      return next() < p;
    },
  };
}
