import React from 'react'
import { useState } from 'react'
import { FilterOptions, ColorCategory } from '@/FilterOptions'

type HeaderProps = {
  onFilterOptionsChanged: (filterOptions: FilterOptions) => void
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

function Header({ onFilterOptionsChanged }: HeaderProps) {
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

  return (
    <div className="p-4 bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Search Input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search colors by name or code..."
            value={filterOptions.searchText || ''}
            onChange={(e) => updateFilters({ searchText: e.target.value })}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Color Category Filters */}
        <div className="flex flex-wrap gap-2">
          {COLOR_CATEGORIES.map((category) => (
            <button
              key={category.value}
              onClick={() => toggleCategory(category.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                isCategoryActive(category.value)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
              }`}
            >
              <span className={`w-4 h-4 rounded-full ${category.color}`} />
              {category.label}
            </button>
          ))}

          {/* Cool colors Checkbox */}
          <button
            onClick={() =>
              updateFilters({ coolColorsOnly: !filterOptions.coolColorsOnly })
            }
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              filterOptions.coolColorsOnly
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-400'
            }`}
          >
            <span>🌤️</span>
            Cool
          </button>
        </div>
      </div>
    </div>
  )
}

export { Header }
