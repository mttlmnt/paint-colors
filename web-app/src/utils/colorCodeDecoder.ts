/**
 * Format: B63-084-258
 * - First letter(s): Color group
 * - First digits: Luminance (0-100, black to white)
 * - Second digits: Saturation/greyness (0-100)
 * - Last digits: Color wheel position (0-360 degrees)
 */

export type ColorGroup = "R" | "O" | "Y" | "G" | "B" | "V" | "N" | "BR" | "M"

export interface DecodedColorCode {
  group: ColorGroup
  luminance: number
  saturation: number
  wheelPosition: number
}

export const COLOR_GROUP_INFO = {
  R: { label: "Red", range: "357-39°", description: "Red" },
  O: { label: "Orange", range: "40-69°", description: "Orange" },
  Y: { label: "Yellow", range: "70-90°", description: "Yellow" },
  G: { label: "Green", range: "91-204°", description: "Green" },
  B: { label: "Blue", range: "205-284°", description: "Blue" },
  V: { label: "Violet", range: "285-356°", description: "Violet" },
  N: { label: "Neutral", range: "Saturation 0-8", description: "Neutral" },
  BR: {
    label: "Brown",
    range: "Lum 0-39, Sat 4-10 or Lum 40-80, Sat 4-25",
    description: "Brown",
  },
  M: { label: "Metallic", range: "Metallic tones", description: "Metallic" },
} as const

/**
 * Decode a Resene color code into its components
 */
export function decodeColorCode(code: string): DecodedColorCode | null {
  // Format: B63-084-258 or BR63-084-258
  const match = code.match(/^([A-Z]{1,2})(\d{1,3})-(\d{1,3})-(\d{1,3})$/)

  if (!match) {
    return null
  }

  const [, group, luminance, saturation, wheelPosition] = match

  return {
    group: group as ColorGroup,
    luminance: parseInt(luminance, 10),
    saturation: parseInt(saturation, 10),
    wheelPosition: parseInt(wheelPosition, 10),
  }
}

/**
 * Get the color group from a color code
 */
export function getColorGroup(code: string): ColorGroup | null {
  const decoded = decodeColorCode(code)
  return decoded ? decoded.group : null
}
