import { useState } from 'react'
import { FilterOptions, ColorCategory, SortBy } from '@/FilterOptions'
import SectionLabel from './SectionLabel'
import SearchSection from './SearchSection'
import BrowseSection from './BrowseSection'
import SortSection from './SortSection'

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
    if (categoryValue === 'all') {
      updateFilters({ colorCategories: [] })
    } else {
      const currentCategories = filterOptions.colorCategories || []
      const newCategories = currentCategories.includes(categoryValue)
        ? currentCategories.filter((c) => c !== categoryValue)
        : [...currentCategories, categoryValue]
      updateFilters({ colorCategories: newCategories })
    }
  }

  const isCategoryActive = (categoryValue: ColorCategory) => {
    if (categoryValue === 'all') {
      return (
        !filterOptions.colorCategories ||
        filterOptions.colorCategories.length === 0
      )
    }
    return filterOptions.colorCategories?.includes(categoryValue) || false
  }

  const handleToggleSort = (sortBy: SortBy) => {
    if (filterOptions.sortBy === sortBy) {
      if (filterOptions.sortOrder === 'asc') {
        updateFilters({ sortOrder: 'desc' })
      } else {
        updateFilters({ sortBy: undefined, sortOrder: undefined })
      }
    } else {
      updateFilters({ sortBy, sortOrder: 'asc' })
    }
  }

  return (
    <div className="p-4 bg-app border-b border-app">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex gap-4">
          <SectionLabel>Search</SectionLabel>
          <div className="flex-1 space-y-4">
            <SearchSection
              searchText={filterOptions.searchText || ''}
              onSearchChange={(text) => updateFilters({ searchText: text })}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <SectionLabel>Browse</SectionLabel>
          <div className="flex-1">
            <BrowseSection
              toggleCategory={toggleCategory}
              isCategoryActive={isCategoryActive}
            />
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
