import { ColorCategory } from '@/FilterOptions'
import { COLOR_GROUP_INFO } from '@/utils/colorCodeDecoder'

const COLOR_CATEGORIES: {
  value: ColorCategory
  label: string
  color?: string
  icon?: string
}[] = [
  {
    value: 'all',
    label: 'All',
    color:
      'bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500',
  },
  { value: 'R', label: COLOR_GROUP_INFO.R.label, color: 'bg-red-500' },
  { value: 'O', label: COLOR_GROUP_INFO.O.label, color: 'bg-orange-500' },
  { value: 'Y', label: COLOR_GROUP_INFO.Y.label, color: 'bg-yellow-400' },
  { value: 'G', label: COLOR_GROUP_INFO.G.label, color: 'bg-green-500' },
  { value: 'B', label: COLOR_GROUP_INFO.B.label, color: 'bg-blue-500' },
  { value: 'V', label: COLOR_GROUP_INFO.V.label, color: 'bg-purple-500' },
  { value: 'N', label: COLOR_GROUP_INFO.N.label, color: 'bg-gray-400' },
  { value: 'BR', label: COLOR_GROUP_INFO.BR.label, color: 'bg-amber-800' },
  {
    value: 'M',
    label: COLOR_GROUP_INFO.M.label,
    color: 'bg-gradient-to-r from-gray-400 to-gray-600',
  },
  { value: 'cool', label: 'Cool', icon: '🌤️' },
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
