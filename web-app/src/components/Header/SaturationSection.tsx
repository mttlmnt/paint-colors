import { SaturationRange, FilterState } from "@/FilterOptions"
import TriStateButton from "./TriStateButton"

const SATURATION_RANGES: {
  value: SaturationRange
  label: string
  description: string
}[] = [
  { value: "neutral", label: "Neutral/Grey", description: "0-15" },
  { value: "muted", label: "Muted", description: "16-40" },
  { value: "moderate", label: "Moderate", description: "41-70" },
  { value: "vibrant", label: "Vibrant", description: "71-100" },
]

interface SaturationSectionProps {
  onToggleRange: (range: SaturationRange) => void
  getRangeState: (range: SaturationRange) => FilterState
}

export default function SaturationSection({
  onToggleRange,
  getRangeState,
}: SaturationSectionProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SATURATION_RANGES.map(range => (
        <TriStateButton
          key={range.value}
          label={range.label}
          state={getRangeState(range.value)}
          onClick={() => onToggleRange(range.value)}
          description={range.description}
        />
      ))}
    </div>
  )
}
