import { FilterOptions, SortBy } from '@/FilterOptions'

interface SortSectionProps {
  filterOptions: FilterOptions
  onToggleSort: (sortBy: SortBy) => void
  colorCount: number
}

export default function SortSection({
  filterOptions,
  onToggleSort,
  colorCount,
}: SortSectionProps) {
  return (
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
}
