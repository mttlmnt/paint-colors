import colorData from "../../scraper/colors.json"
import { FilterOptions } from "@/FilterOptions"
import { getColorGroup, decodeColorCode } from "@/utils/colorCodeDecoder"
import { matchesLuminanceRange, matchesSaturationRange, matchesCompoundFilter } from "@/utils/filterHelpers"

class ColorStore {
  private colorList = colorData.colors

  public colors(filterOptions: FilterOptions) {
    return this.colorList.filter(item => {
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
        !filterOptions.colorCategories.includes("all")
      ) {
        // Check if cool filter is active
        const hasCoolFilter = filterOptions.colorCategories.includes("cool")
        const hasGroupFilters = filterOptions.colorCategories.some(
          cat => cat !== "cool"
        )

        // If cool filter is active and color is not cool, exclude it
        if (hasCoolFilter && !item.is_cool) {
          return false
        }

        // If there are group filters, check if color matches any of them
        if (hasGroupFilters) {
          const colorGroup = getColorGroup(item.code)
          if (
            !colorGroup ||
            !filterOptions.colorCategories.includes(colorGroup)
          ) {
            return false
          }
        }
      }

      // Exclude color categories
      if (
        filterOptions.excludedColorCategories &&
        filterOptions.excludedColorCategories.length > 0
      ) {
        const hasCoolExclude =
          filterOptions.excludedColorCategories.includes("cool")
        const hasGroupExcludes = filterOptions.excludedColorCategories.some(
          cat => cat !== "cool" && cat !== "all"
        )

        if (hasCoolExclude && item.is_cool) {
          return false
        }

        if (hasGroupExcludes) {
          const colorGroup = getColorGroup(item.code)
          if (
            colorGroup &&
            filterOptions.excludedColorCategories.includes(colorGroup)
          ) {
            return false
          }
        }
      }

      // Decode color code once for all filters
      const decoded = decodeColorCode(item.code)
      if (!decoded) return true // If can't decode, include by default

      // Filter by luminance ranges
      if (
        filterOptions.luminanceRanges &&
        filterOptions.luminanceRanges.length > 0
      ) {
        const { luminance } = decoded
        const matchesRange = filterOptions.luminanceRanges.some(range =>
          matchesLuminanceRange(luminance, range)
        )
        if (!matchesRange) return false
      }

      // Exclude luminance ranges
      if (
        filterOptions.excludedLuminanceRanges &&
        filterOptions.excludedLuminanceRanges.length > 0
      ) {
        const { luminance } = decoded
        const matchesExcluded = filterOptions.excludedLuminanceRanges.some(range =>
          matchesLuminanceRange(luminance, range)
        )
        if (matchesExcluded) return false
      }

      // Filter by saturation ranges
      if (
        filterOptions.saturationRanges &&
        filterOptions.saturationRanges.length > 0
      ) {
        const { saturation } = decoded
        const matchesRange = filterOptions.saturationRanges.some(range =>
          matchesSaturationRange(saturation, range)
        )
        if (!matchesRange) return false
      }

      // Exclude saturation ranges
      if (
        filterOptions.excludedSaturationRanges &&
        filterOptions.excludedSaturationRanges.length > 0
      ) {
        const { saturation } = decoded
        const matchesExcluded = filterOptions.excludedSaturationRanges.some(range =>
          matchesSaturationRange(saturation, range)
        )
        if (matchesExcluded) return false
      }

      // Filter by compound filters
      if (
        filterOptions.compoundFilters &&
        filterOptions.compoundFilters.length > 0
      ) {
        const { luminance, saturation, group } = decoded
        const matchesCompound = filterOptions.compoundFilters.some(filter =>
          matchesCompoundFilter(filter, luminance, saturation, group)
        )
        if (!matchesCompound) return false
      }

      // Exclude compound filters
      if (
        filterOptions.excludedCompoundFilters &&
        filterOptions.excludedCompoundFilters.length > 0
      ) {
        const { luminance, saturation, group } = decoded
        const matchesExcluded = filterOptions.excludedCompoundFilters.some(filter =>
          matchesCompoundFilter(filter, luminance, saturation, group)
        )
        if (matchesExcluded) return false
      }

      return true
    })
  }
}

export { ColorStore }
