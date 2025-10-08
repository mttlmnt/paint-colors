import React from 'react'
import { useState } from 'react'
import {
  FilterOptions,
  ColorCategory,
  SortBy,
  SortOrder,
} from '@/FilterOptions'

type HeaderProps = {
  onFilterOptionsChanged: (filterOptions: FilterOptions) => void
  colorCount: number
}

const COLOR_CATEGORIES: {
  value: ColorCategory
  label: string
  color: string
}[] = [
  {
    value: 'all',
    label: 'All',
    color: 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500',
  },
  { value: 'red', label: 'Reds', color: 'bg-red-500' },
  { value: 'orange', label: 'Oranges', color: 'bg-orange-500' },
  { value: 'yellow', label: 'Yellows', color: 'bg-yellow-400' },
  { value: 'green', label: 'Greens', color: 'bg-green-500' },
  { value: 'blue', label: 'Blues', color: 'bg-blue-500' },
  { value: 'purple', label: 'Purples', color: 'bg-purple-500' },
  { value: 'pink', label: 'Pinks', color: 'bg-pink-400' },
  { value: 'brown', label: 'Browns', color: 'bg-amber-800' },
  { value: 'gray', label: 'Grays', color: 'bg-gray-500' },
  { value: 'black', label: 'Blacks', color: 'bg-black' },
  { value: 'white', label: 'Whites', color: 'bg-white border border-gray-300' },
]

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-base font-bold text-heading pt-2 w-20 text-right">
    {children}
  </div>
)

const SearchSection = ({
  searchText,
  onSearchChange,
}: {
  searchText: string
  onSearchChange: (text: string) => void
}) => (
  <div className="flex items-center gap-2">
    <input
      type="text"
      placeholder="by name or code..."
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
      className="flex-1 px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-card text-primary"
    />
  </div>
)

const BrowseSection = ({
  filterOptions,
  toggleCategory,
  isCategoryActive,
  onToggleCool,
}: {
  filterOptions: FilterOptions
  toggleCategory: (categoryValue: ColorCategory) => void
  isCategoryActive: (categoryValue: ColorCategory) => boolean
  onToggleCool: () => void
}) => (
  <div className="flex flex-wrap gap-2">
    {COLOR_CATEGORIES.map((category) => (
      <button
        key={category.value}
        onClick={() => toggleCategory(category.value)}
        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
          isCategoryActive(category.value)
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-card text-heading border border-input hover:border-blue-400 dark:hover:border-blue-500'
        }`}
      >
        <span className={`w-4 h-4 rounded-full ${category.color}`} />
        {category.label}
      </button>
    ))}
    <button
      onClick={onToggleCool}
      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
        filterOptions.coolColorsOnly
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-card text-heading border border-input hover:border-blue-400 dark:hover:border-blue-500'
      }`}
    >
      <span>🌤️</span>
      Cool
    </button>
  </div>
)

const SortSection = ({
  filterOptions,
  onToggleSort,
  colorCount,
}: {
  filterOptions: FilterOptions
  onToggleSort: (sortBy: SortBy) => void
  colorCount: number
}) => (
  <div className="flex-1 flex items-center justify-between gap-2">
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onToggleSort('name')}
        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
          filterOptions.sortBy === 'name'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-card text-heading border border-input hover:border-blue-400 dark:hover:border-blue-500'
        }`}
      >
        Name{' '}
        {filterOptions.sortBy === 'name' &&
          (filterOptions.sortOrder === 'asc' ? '↑' : '↓')}
      </button>
      <button
        onClick={() => onToggleSort('lrv')}
        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
          filterOptions.sortBy === 'lrv'
            ? 'bg-blue-600 text-white shadow-md'
            : 'bg-card text-heading border border-input hover:border-blue-400 dark:hover:border-blue-500'
        }`}
      >
        Lightness{' '}
        {filterOptions.sortBy === 'lrv' &&
          (filterOptions.sortOrder === 'asc' ? '↑' : '↓')}
      </button>
    </div>
    <span className="text-sm text-secondary whitespace-nowrap">
      {colorCount} {colorCount === 1 ? 'color' : 'colors'}
    </span>
  </div>
)

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
              filterOptions={filterOptions}
              toggleCategory={toggleCategory}
              isCategoryActive={isCategoryActive}
              onToggleCool={() =>
                updateFilters({ coolColorsOnly: !filterOptions.coolColorsOnly })
              }
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
