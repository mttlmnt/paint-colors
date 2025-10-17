import { useDrag } from "react-dnd"
import ColorCard from "./ColorCard"
import { ColorInfo } from "@/types/ColorInfo"

interface ColorCardDraggableProps {
  colorInfo: ColorInfo
}

export default function ColorCardDraggable({ colorInfo }: ColorCardDraggableProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "color-card",
    item: colorInfo,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} style={{ cursor: "move", opacity: isDragging ? 0.5 : 1 }}>
      <ColorCard colorInfo={colorInfo} />
    </div>
  )
}
