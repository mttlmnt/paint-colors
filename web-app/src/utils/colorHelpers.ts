interface RGB {
  r: number
  g: number
  b: number
}

export function rgbToString(rgb: RGB): string {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

export function labToString(lab: { l: number; a: number; b: number }): string {
  return `lab(${lab.l}% ${lab.a} ${lab.b})`
}

export function colorToString(
  rgb: RGB,
  lab?: { l: number; a: number; b: number }
): string {
  // Use LAB if available for better color accuracy on wide-gamut displays
  // Falls back to RGB for browser compatibility
  if (lab) {
    return `lab(${lab.l}% ${lab.a} ${lab.b})`
  }
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(rgb: RGB): { h: number; s: number; l: number } {
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (diff !== 0) {
    s = l > 0.5 ? diff / (2 - max - min) : diff / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / diff + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / diff + 2) / 6
        break
      case b:
        h = ((r - g) / diff + 4) / 6
        break
    }
  }

  return { h: h * 360, s, l }
}
