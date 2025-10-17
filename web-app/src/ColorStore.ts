import colorData from '../../scraper/colors.json'
import { FilterOptions } from '@/FilterOptions'
import { getColorGroup } from '@/utils/colorCodeDecoder'

class ColorStore {
  private colorList = colorData.colors

  public colors(filterOptions: FilterOptions) {
    return this.colorList.filter((item) => {
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
        filterOptions.colorCategories.length > 0 &&
        !filterOptions.colorCategories.includes('all')
      ) {
        // Check if cool filter is active
        const hasCoolFilter = filterOptions.colorCategories.includes('cool')
        const hasGroupFilters = filterOptions.colorCategories.some(cat => cat !== 'cool')

        // If cool filter is active and color is not cool, exclude it
        if (hasCoolFilter && !item.is_cool) {
          return false
        }

        // If there are group filters, check if color matches any of them
        if (hasGroupFilters) {
          const colorGroup = getColorGroup(item.code)
          if (!colorGroup || !filterOptions.colorCategories.includes(colorGroup)) {
            return false
          }
        }
      }

      return true
    })
  }
}

export { ColorStore }
