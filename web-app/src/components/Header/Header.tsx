import { useState } from "react"
import {
  FilterOptions,
  ColorCategory,
  SortBy,
  LuminanceRange,
  SaturationRange,
  CompoundFilter,
  FilterState,
} from "@/FilterOptions"
import SectionLabel from "./SectionLabel"
import SearchSection from "./SearchSection"
import BrowseSection from "./BrowseSection"
import SortSection from "./SortSection"
import LuminanceSection from "./LuminanceSection"
import SaturationSection from "./SaturationSection"
import SpecialFiltersSection from "./SpecialFiltersSection"

type HeaderProps = {
  onFilterOptionsChanged: (filterOptions: FilterOptions) => void
  colorCount: number
}

function Header({ onFilterOptionsChanged, colorCount }: HeaderProps) {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    colorCategories: [],
  })

  const updateFilters = (updates: Partial<FilterOptions>) => {
    const newFilterOptions = { ...filterOptions, ...updates }
    setFilterOptions(newFilterOptions)
    onFilterOptionsChanged(newFilterOptions)
  }

  const toggleCategory = (categoryValue: ColorCategory) => {
    if (categoryValue === "all") {
      updateFilters({ colorCategories: [], excludedColorCategories: [] })
      return
    }

    const included = filterOptions.colorCategories || []
    const excluded = filterOptions.excludedColorCategories || []

    if (included.includes(categoryValue)) {
      // Move from include to exclude
      updateFilters({
        colorCategories: included.filter(c => c !== categoryValue),
        excludedColorCategories: [...excluded, categoryValue],
      })
    } else if (excluded.includes(categoryValue)) {
      // Move from exclude to inactive
      updateFilters({
        excludedColorCategories: excluded.filter(c => c !== categoryValue),
      })
    } else {
      // Move from inactive to include
      updateFilters({
        colorCategories: [...included, categoryValue],
      })
    }
  }

  const getCategoryState = (categoryValue: ColorCategory): FilterState => {
    if (categoryValue === "all") {
      const hasFilters =
        (filterOptions.colorCategories &&
          filterOptions.colorCategories.length > 0) ||
        (filterOptions.excludedColorCategories &&
          filterOptions.excludedColorCategories.length > 0)
      return hasFilters ? "inactive" : "include"
    }
    if (filterOptions.colorCategories?.includes(categoryValue)) return "include"
    if (filterOptions.excludedColorCategories?.includes(categoryValue))
      return "exclude"
    return "inactive"
  }

  const handleToggleSort = (sortBy: SortBy) => {
    if (filterOptions.sortBy === sortBy) {
      if (filterOptions.sortOrder === "asc") {
        updateFilters({ sortOrder: "desc" })
      } else {
        updateFilters({ sortBy: undefined, sortOrder: undefined })
      }
    } else {
      updateFilters({ sortBy, sortOrder: "asc" })
    }
  }

  const toggleLuminanceRange = (range: LuminanceRange) => {
    const included = filterOptions.luminanceRanges || []
    const excluded = filterOptions.excludedLuminanceRanges || []

    if (included.includes(range)) {
      updateFilters({
        luminanceRanges: included.filter(r => r !== range),
        excludedLuminanceRanges: [...excluded, range],
      })
    } else if (excluded.includes(range)) {
      updateFilters({
        excludedLuminanceRanges: excluded.filter(r => r !== range),
      })
    } else {
      updateFilters({
        luminanceRanges: [...included, range],
      })
    }
  }

  const getLuminanceState = (range: LuminanceRange): FilterState => {
    if (filterOptions.luminanceRanges?.includes(range)) return "include"
    if (filterOptions.excludedLuminanceRanges?.includes(range)) return "exclude"
    return "inactive"
  }

  const toggleSaturationRange = (range: SaturationRange) => {
    const included = filterOptions.saturationRanges || []
    const excluded = filterOptions.excludedSaturationRanges || []

    if (included.includes(range)) {
      updateFilters({
        saturationRanges: included.filter(r => r !== range),
        excludedSaturationRanges: [...excluded, range],
      })
    } else if (excluded.includes(range)) {
      updateFilters({
        excludedSaturationRanges: excluded.filter(r => r !== range),
      })
    } else {
      updateFilters({
        saturationRanges: [...included, range],
      })
    }
  }

  const getSaturationState = (range: SaturationRange): FilterState => {
    if (filterOptions.saturationRanges?.includes(range)) return "include"
    if (filterOptions.excludedSaturationRanges?.includes(range))
      return "exclude"
    return "inactive"
  }

  const toggleSpecialFilter = (filter: CompoundFilter | ColorCategory) => {
    // Handle ColorCategory types (cool, M)
    if (filter === "cool" || filter === "M") {
      toggleCategory(filter)
      return
    }

    // Handle CompoundFilter types
    const included = filterOptions.compoundFilters || []
    const excluded = filterOptions.excludedCompoundFilters || []

    if (included.includes(filter as CompoundFilter)) {
      updateFilters({
        compoundFilters: included.filter(f => f !== filter),
        excludedCompoundFilters: [...excluded, filter as CompoundFilter],
      })
    } else if (excluded.includes(filter as CompoundFilter)) {
      updateFilters({
        excludedCompoundFilters: excluded.filter(f => f !== filter),
      })
    } else {
      updateFilters({
        compoundFilters: [...included, filter as CompoundFilter],
      })
    }
  }

  const getSpecialFilterState = (
    filter: CompoundFilter | ColorCategory
  ): FilterState => {
    // Handle ColorCategory types (cool, M)
    if (filter === "cool" || filter === "M") {
      return getCategoryState(filter)
    }

    // Handle CompoundFilter types
    if (filterOptions.compoundFilters?.includes(filter as CompoundFilter))
      return "include"
    if (
      filterOptions.excludedCompoundFilters?.includes(filter as CompoundFilter)
    )
      return "exclude"
    return "inactive"
  }

  return (
    <div className="p-4 bg-app border-b border-app">
      <div className="space-y-4">
        <div className="flex gap-4">
          <SectionLabel>Search</SectionLabel>
          <div className="flex-1 space-y-4">
            <SearchSection
              searchText={filterOptions.searchText || ""}
              onSearchChange={text => updateFilters({ searchText: text })}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <SectionLabel>Browse</SectionLabel>
          <div className="flex-1 space-y-4">
            <div className="flex gap-4 pl-4">
              <SectionLabel subdued>Color</SectionLabel>
              <div className="flex-1">
                <BrowseSection
                  toggleCategory={toggleCategory}
                  getCategoryState={getCategoryState}
                />
              </div>
            </div>

            <div className="flex gap-4 pl-4">
              <SectionLabel subdued>Lightness</SectionLabel>
              <div className="flex-1">
                <LuminanceSection
                  onToggleRange={toggleLuminanceRange}
                  getRangeState={getLuminanceState}
                />
              </div>
            </div>

            <div className="flex gap-4 pl-4">
              <SectionLabel subdued>Saturation</SectionLabel>
              <div className="flex-1">
                <SaturationSection
                  onToggleRange={toggleSaturationRange}
                  getRangeState={getSaturationState}
                />
              </div>
            </div>

            <div className="flex gap-4 pl-4">
              <SectionLabel subdued>Special</SectionLabel>
              <div className="flex-1">
                <SpecialFiltersSection
                  onToggleFilter={toggleSpecialFilter}
                  getFilterState={getSpecialFilterState}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <SectionLabel>Sort</SectionLabel>
          <SortSection
            filterOptions={filterOptions}
            onToggleSort={handleToggleSort}
            colorCount={colorCount}
          />
        </div>
      </div>
    </div>
  )
}

export { Header }
