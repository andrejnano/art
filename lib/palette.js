/**
 * Color theory utilities for generative art.
 * Works with p5.js color mode or standalone.
 */

/** Convert HSL to hex string. h: 0-360, s: 0-100, l: 0-100 */
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** Generate a palette of N colors with harmonic relationships */
function harmonicPalette(rng, count = 5, options = {}) {
  const {
    saturation = [40, 80],
    lightness = [30, 70],
    hueSpread = 360,
  } = options;

  const baseHue = rng.range(0, 360);
  const colors = [];

  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const hue = (baseHue + t * hueSpread) % 360;
    const sat = rng.range(saturation[0], saturation[1]);
    const lit = rng.range(lightness[0], lightness[1]);
    colors.push(hslToHex(hue, sat, lit));
  }

  return colors;
}

/** Analogous palette — colors close together on the wheel */
function analogousPalette(rng, count = 5) {
  return harmonicPalette(rng, count, { hueSpread: 60 });
}

/** Complementary palette — opposing colors */
function complementaryPalette(rng, count = 4) {
  const baseHue = rng.range(0, 360);
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (baseHue + (i % 2 === 0 ? 0 : 180) + rng.range(-15, 15)) % 360;
    const sat = rng.range(40, 80);
    const lit = rng.range(30, 70);
    colors.push(hslToHex(hue, sat, lit));
  }
  return colors;
}

/** Triadic palette — three evenly spaced hues */
function triadicPalette(rng, count = 6) {
  return harmonicPalette(rng, count, { hueSpread: 240 });
}

/** Monochromatic palette — single hue, varied lightness */
function monoPalette(rng, count = 5) {
  const hue = rng.range(0, 360);
  const sat = rng.range(20, 60);
  const colors = [];
  for (let i = 0; i < count; i++) {
    const lit = 20 + (60 * i) / (count - 1 || 1);
    colors.push(hslToHex(hue, sat, lit));
  }
  return colors;
}

/** Dark background + bright accents — common generative art pattern */
function darkAccentPalette(rng, accentCount = 3) {
  const bg = hslToHex(rng.range(0, 360), rng.range(5, 15), rng.range(5, 12));
  const accents = harmonicPalette(rng, accentCount, {
    saturation: [60, 90],
    lightness: [50, 80],
    hueSpread: rng.range(60, 200),
  });
  return { bg, accents, all: [bg, ...accents] };
}

/** Lerp between two hex colors. t in [0, 1] */
function lerpColor(hex1, hex2, t) {
  const parse = (h) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(hex1);
  const [r2, g2, b2] = parse(hex2);
  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
