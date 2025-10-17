import ColorCardDraggable from "./ColorCardDraggable"
import { ColorInfo } from "@/types/ColorInfo"

interface ColorCardListProps {
  colors: ColorInfo[]
}

export default function ColorCardList({ colors }: ColorCardListProps) {
  return (
    <div className="flex flex-row flex-wrap justify-center p-1 overflow-scroll bg-app">
      {colors.map(item => (
        <div className="flex-none m-1" key={item.code}>
          <ColorCardDraggable key={item.code} colorInfo={item} />
        </div>
      ))}
    </div>
  )
}
