import { ColorCategory, FilterState } from "@/FilterOptions"
import { COLOR_GROUP_INFO } from "@/utils/colorCodeDecoder"
import TriStateButton from "./TriStateButton"

const COLOR_CATEGORIES: {
  value: ColorCategory
  label: string
  color?: string
  icon?: string
}[] = [
  {
    value: "all",
    label: "All",
    color:
      "bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
  },
  { value: "R", label: COLOR_GROUP_INFO.R.label, color: "bg-red-500" },
  { value: "O", label: COLOR_GROUP_INFO.O.label, color: "bg-orange-500" },
  { value: "Y", label: COLOR_GROUP_INFO.Y.label, color: "bg-yellow-400" },
  { value: "G", label: COLOR_GROUP_INFO.G.label, color: "bg-green-500" },
  { value: "B", label: COLOR_GROUP_INFO.B.label, color: "bg-blue-500" },
  { value: "V", label: COLOR_GROUP_INFO.V.label, color: "bg-purple-500" },
  { value: "N", label: COLOR_GROUP_INFO.N.label, color: "bg-gray-400" },
  { value: "BR", label: COLOR_GROUP_INFO.BR.label, color: "bg-amber-800" },
]

interface BrowseSectionProps {
  toggleCategory: (categoryValue: ColorCategory) => void
  getCategoryState: (categoryValue: ColorCategory) => FilterState
}

export default function BrowseSection({
  toggleCategory,
  getCategoryState,
}: BrowseSectionProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLOR_CATEGORIES.map(category => (
        <TriStateButton
          key={category.value}
          label={category.label}
          state={getCategoryState(category.value)}
          onClick={() => toggleCategory(category.value)}
          color={category.color}
          icon={category.icon}
        />
      ))}
    </div>
  )
}
