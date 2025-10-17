import { LuminanceRange, FilterState } from "@/FilterOptions"
import TriStateButton from "./TriStateButton"

const LUMINANCE_RANGES: {
  value: LuminanceRange
  label: string
  description: string
}[] = [
  { value: "very-dark", label: "Very Dark", description: "0-20" },
  { value: "dark", label: "Dark", description: "21-40" },
  { value: "medium", label: "Medium", description: "41-60" },
  { value: "light", label: "Light", description: "61-80" },
  { value: "very-light", label: "Very Light", description: "81-100" },
]

interface LuminanceSectionProps {
  onToggleRange: (range: LuminanceRange) => void
  getRangeState: (range: LuminanceRange) => FilterState
}

export default function LuminanceSection({
  onToggleRange,
  getRangeState,
}: LuminanceSectionProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {LUMINANCE_RANGES.map(range => (
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
