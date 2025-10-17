import { CompoundFilter, ColorCategory, FilterState } from "@/FilterOptions"
import TriStateButton from "./TriStateButton"

const SPECIAL_FILTERS: {
  value: CompoundFilter | ColorCategory
  label: string
  icon: string
}[] = [
  { value: "cool", label: "Cool", icon: "🌤️" },
  { value: "M", label: "Metallic", icon: "✨" },
  { value: "pastels", label: "Pastels", icon: "🌸" },
  { value: "earth-tones", label: "Earth Tones", icon: "🌍" },
  { value: "deep-colors", label: "Deep Colors", icon: "💎" },
  { value: "near-neutrals", label: "Near Neutrals", icon: "🌫️" },
]

interface SpecialFiltersSectionProps {
  onToggleFilter: (filter: CompoundFilter | ColorCategory) => void
  getFilterState: (filter: CompoundFilter | ColorCategory) => FilterState
}

export default function SpecialFiltersSection({
  onToggleFilter,
  getFilterState,
}: SpecialFiltersSectionProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SPECIAL_FILTERS.map(filter => (
        <TriStateButton
          key={filter.value}
          label={filter.label}
          state={getFilterState(filter.value)}
          onClick={() => onToggleFilter(filter.value)}
          icon={filter.icon}
        />
      ))}
    </div>
  )
}
