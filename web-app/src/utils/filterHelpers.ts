import { LuminanceRange, SaturationRange, CompoundFilter } from "@/FilterOptions"
import { LUMINANCE_RANGES, SATURATION_RANGES } from "./filterConstants"

export function matchesLuminanceRange(luminance: number, range: LuminanceRange): boolean {
  const { min, max } = LUMINANCE_RANGES[range]
  return luminance >= min && luminance <= max
}

export function matchesSaturationRange(saturation: number, range: SaturationRange): boolean {
  const { min, max } = SATURATION_RANGES[range]
  return saturation >= min && saturation <= max
}

export function matchesCompoundFilter(
  filter: CompoundFilter,
  luminance: number,
  saturation: number,
  group: string
): boolean {
  switch (filter) {
    case "pastels":
      return luminance >= 70 && saturation >= 30 && saturation <= 60
    case "earth-tones":
      return group === "BR"
    case "deep-colors":
      return luminance >= 0 && luminance <= 40 && saturation >= 60
    case "near-neutrals":
      return saturation >= 5 && saturation <= 20
    default:
      return false
  }
}
