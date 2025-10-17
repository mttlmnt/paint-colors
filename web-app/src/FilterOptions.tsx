import { ColorGroup } from "@/utils/colorCodeDecoder"

export type ColorCategory = "all" | "cool" | ColorGroup

export type SortBy = "name" | "lrv" | "saturation" | "luminance" | "hue"
export type SortOrder = "asc" | "desc"

export type LuminanceRange =
  | "very-dark"
  | "dark"
  | "medium"
  | "light"
  | "very-light"
export type SaturationRange = "neutral" | "muted" | "moderate" | "vibrant"
export type CompoundFilter =
  | "pastels"
  | "earth-tones"
  | "deep-colors"
  | "near-neutrals"

export type FilterState = "include" | "exclude" | "inactive"

export interface FilterOptions {
  searchText?: string
  colorCategories?: ColorCategory[]
  excludedColorCategories?: ColorCategory[]
  luminanceRanges?: LuminanceRange[]
  excludedLuminanceRanges?: LuminanceRange[]
  saturationRanges?: SaturationRange[]
  excludedSaturationRanges?: SaturationRange[]
  compoundFilters?: CompoundFilter[]
  excludedCompoundFilters?: CompoundFilter[]
  sortBy?: SortBy
  sortOrder?: SortOrder
}
