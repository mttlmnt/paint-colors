import { FilterOptions, SortBy } from "@/FilterOptions"

interface SortSectionProps {
  filterOptions: FilterOptions
  onToggleSort: (sortBy: SortBy) => void
  colorCount: number
}

const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "lrv", label: "Reflectance" },
  { value: "saturation", label: "Saturation" },
  { value: "luminance", label: "Luminance" },
  { value: "hue", label: "Hue" },
]

export default function SortSection({
  filterOptions,
  onToggleSort,
  colorCount,
}: SortSectionProps) {
  return (
    <div className="flex-1 flex items-center justify-between gap-2">
      <div className="flex flex-wrap gap-2">
        {SORT_OPTIONS.map(option => (
          <button
            key={option.value}
            onClick={() => onToggleSort(option.value)}
            className={`px-2 py-1 rounded text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              filterOptions.sortBy === option.value
                ? "bg-blue-600 text-white shadow-md border border-transparent"
                : "bg-card text-heading border border-input hover:border-blue-400 dark:hover:border-blue-500"
            }`}
          >
            {option.label}{" "}
            {filterOptions.sortBy === option.value &&
              (filterOptions.sortOrder === "asc" ? "↑" : "↓")}
          </button>
        ))}
      </div>
      <span className="text-sm text-secondary whitespace-nowrap">
        {colorCount} {colorCount === 1 ? "color" : "colors"}
      </span>
    </div>
  )
}
