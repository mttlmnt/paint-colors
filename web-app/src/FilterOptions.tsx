export type ColorCategory = 'all' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'brown' | 'gray' | 'black' | 'white';

export interface FilterOptions {
  searchText?: string;
  colorCategory?: ColorCategory;
  coolColorsOnly?: boolean;
}
