import { LuminanceRange, SaturationRange } from "@/FilterOptions"

export const LUMINANCE_RANGES: Record<LuminanceRange, { min: number; max: number; label: string }> = {
  "very-dark": { min: 0, max: 20, label: "Very Dark" },
  "dark": { min: 21, max: 40, label: "Dark" },
  "medium": { min: 41, max: 60, label: "Medium" },
  "light": { min: 61, max: 80, label: "Light" },
  "very-light": { min: 81, max: 100, label: "Very Light" },
}

export const SATURATION_RANGES: Record<SaturationRange, { min: number; max: number; label: string }> = {
  "neutral": { min: 0, max: 15, label: "Neutral" },
  "muted": { min: 16, max: 40, label: "Muted" },
  "moderate": { min: 41, max: 70, label: "Moderate" },
  "vibrant": { min: 71, max: 100, label: "Vibrant" },
}
