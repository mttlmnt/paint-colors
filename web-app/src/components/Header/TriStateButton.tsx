import { FilterState } from "@/FilterOptions"

interface TriStateButtonProps {
  label: string
  state: FilterState
  onClick: () => void
  color?: string
  icon?: string
  description?: string
}

export default function TriStateButton({
  label,
  state,
  onClick,
  color,
  icon,
  description,
}: TriStateButtonProps) {
  const getButtonClass = () => {
    if (state === "include") {
      return "bg-blue-600 text-white shadow-md"
    } else if (state === "exclude") {
      return "bg-red-400 text-white shadow-md"
    }
    return "bg-card text-heading border border-input hover:border-blue-400 dark:hover:border-blue-500"
  }

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 whitespace-nowrap ${getButtonClass()}`}
    >
      {state === "exclude" && <span>🚫</span>}
      {color && <span className={`w-4 h-4 rounded-full ${color}`} />}
      {icon && <span>{icon}</span>}
      {label}
      {description && (
        <span className="text-xs opacity-70">({description})</span>
      )}
    </button>
  )
}
