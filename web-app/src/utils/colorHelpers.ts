export function rgbToString(rgb: { r: number; g: number; b: number }): string {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}

export function labToString(lab: { l: number; a: number; b: number }): string {
  return `lab(${lab.l}% ${lab.a} ${lab.b})`
}

export function colorToString(
  rgb: { r: number; g: number; b: number },
  lab?: { l: number; a: number; b: number }
): string {
  // Use LAB if available for better color accuracy on wide-gamut displays
  // Falls back to RGB for browser compatibility
  if (lab) {
    return `lab(${lab.l}% ${lab.a} ${lab.b})`
  }
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}
