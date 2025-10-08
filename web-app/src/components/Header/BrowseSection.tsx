import { FilterOptions, ColorCategory } from '@/FilterOptions'

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

interface BrowseSectionProps {
  filterOptions: FilterOptions
  toggleCategory: (categoryValue: ColorCategory) => void
  isCategoryActive: (categoryValue: ColorCategory) => boolean
  onToggleCool: () => void
}

export default function BrowseSection({
  filterOptions,
  toggleCategory,
  isCategoryActive,
  onToggleCool,
}: BrowseSectionProps) {
  return (
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
}
