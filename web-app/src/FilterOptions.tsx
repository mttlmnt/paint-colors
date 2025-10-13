export type ColorCategory =
  | 'all'
  | 'cool'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'brown'
  | 'gray'
  | 'black'
  | 'white'

export type SortBy = 'name' | 'lrv'
export type SortOrder = 'asc' | 'desc'

export interface FilterOptions {
  searchText?: string
  colorCategories?: ColorCategory[]
  sortBy?: SortBy
  sortOrder?: SortOrder
}
