import { ColorCategory } from '@/FilterOptions';

interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Convert RGB to HSL to determine hue-based color category
 */
function rgbToHsl(rgb: RGB): { h: number; s: number; l: number } {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / diff + 2) / 6;
        break;
      case b:
        h = ((r - g) / diff + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s, l };
}

/**
 * Categorize a color based on its RGB values
 */
export function categorizeColor(rgb: RGB): ColorCategory {
  const { h, s, l } = rgbToHsl(rgb);

  // Black
  if (l < 0.15) return 'black';

  // White
  if (l > 0.85 && s < 0.1) return 'white';

  // Gray (low saturation)
  if (s < 0.15) return 'gray';

  // Brown (low lightness, orange/red hue)
  if (l < 0.4 && h >= 10 && h < 50) return 'brown';

  // Hue-based categorization for saturated colors
  if (h >= 345 || h < 15) return 'red';
  if (h >= 15 && h < 45) return 'orange';
  if (h >= 45 && h < 70) return 'yellow';
  if (h >= 70 && h < 165) return 'green';
  if (h >= 165 && h < 250) return 'blue';
  if (h >= 250 && h < 315) return 'purple';
  if (h >= 315 && h < 345) return 'pink';

  return 'all';
}
