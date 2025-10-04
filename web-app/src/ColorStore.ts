import colorData from '../../scraper/colors.json'
import { FilterOptions } from '@/FilterOptions'
import { categorizeColor } from '@/utils/colorCategories'

class ColorStore {
  private colorList = colorData.colors

  public colors(filterOptions: FilterOptions) {
    return this.colorList.filter((item) => {
      // Filter by cool colors
      if (filterOptions.coolColorsOnly && !item.is_cool) {
        return false
      }

      // Filter by search text
      if (filterOptions.searchText) {
        const searchLower = filterOptions.searchText.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(searchLower)
        const matchesCode = item.code.toLowerCase().includes(searchLower)
        if (!matchesName && !matchesCode) {
          return false
        }
      }

      // Filter by color categories
      if (
        filterOptions.colorCategories &&
        filterOptions.colorCategories.length > 0
      ) {
        const colorCategory = categorizeColor(item.rgb)
        if (!filterOptions.colorCategories.includes(colorCategory)) {
          return false
        }
      }

      return true
    })
  }
}

export { ColorStore }
