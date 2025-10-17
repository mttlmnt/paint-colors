import { ColorGroup } from "@/utils/colorCodeDecoder"

export type ColorCategory = "all" | "cool" | ColorGroup

export type SortBy = "name" | "lrv"
export type SortOrder = "asc" | "desc"

export interface FilterOptions {
  searchText?: string
  colorCategories?: ColorCategory[]
  sortBy?: SortBy
  sortOrder?: SortOrder
}
