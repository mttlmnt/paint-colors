import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon"

interface SearchSectionProps {
  searchText: string
  onSearchChange: (text: string) => void
}

export default function SearchSection({
  searchText,
  onSearchChange,
}: SearchSectionProps) {
  return (
    <div className="flex items-center gap-2 relative">
      <input
        type="text"
        placeholder="by name or code..."
        value={searchText}
        onChange={e => onSearchChange(e.target.value)}
        className="flex-1 px-4 py-2 pr-10 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-card text-primary"
      />
      {searchText && (
        <button
          onClick={() => onSearchChange("")}
          className="absolute right-3 text-icon hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          title="Clear search"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
