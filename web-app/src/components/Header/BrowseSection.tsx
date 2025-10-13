import { FilterOptions, ColorCategory } from '@/FilterOptions'

const COLOR_CATEGORIES: {
  value: ColorCategory
  label: string
  color: string | undefined
  icon: string | undefined
}[] = [
  {
    value: 'all',
    label: 'All',
    color: 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500',
    icon: undefined,
  },
  { value: 'cool', label: 'Cool', color: undefined, icon: '🌤️' },
  { value: 'red', label: 'Reds', color: 'bg-red-500', icon: undefined },
  { value: 'orange', label: 'Oranges', color: 'bg-orange-500', icon: undefined },
  { value: 'yellow', label: 'Yellows', color: 'bg-yellow-400', icon: undefined },
  { value: 'green', label: 'Greens', color: 'bg-green-500', icon: undefined },
  { value: 'blue', label: 'Blues', color: 'bg-blue-500', icon: undefined },
  { value: 'purple', label: 'Purples', color: 'bg-purple-500', icon: undefined },
  { value: 'pink', label: 'Pinks', color: 'bg-pink-400', icon: undefined },
  { value: 'brown', label: 'Browns', color: 'bg-amber-800', icon: undefined },
  { value: 'gray', label: 'Grays', color: 'bg-gray-500', icon: undefined },
  { value: 'black', label: 'Blacks', color: 'bg-black', icon: undefined },
  { value: 'white', label: 'Whites', color: 'bg-white border border-gray-300', icon: undefined },
]

interface BrowseSectionProps {
  toggleCategory: (categoryValue: ColorCategory) => void
  isCategoryActive: (categoryValue: ColorCategory) => boolean
}

export default function BrowseSection({
  toggleCategory,
  isCategoryActive,
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
          {category.color && (
            <span className={`w-4 h-4 rounded-full ${category.color}`} />
          )}
          {category.icon && <span>{category.icon}</span>}
          {category.label}
        </button>
      ))}
    </div>
  )
}
