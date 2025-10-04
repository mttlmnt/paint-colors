import { useDrag } from 'react-dnd'
import ColorCard from './ColorCard'

export default function ColorCardDraggable(props) {
  const [collected, drag] = useDrag(() => ({
    type: "color-card",
    item: props.colorInfo
  }))

  return (
    <div ref={ drag } style={{ cursor: 'move' }}>
      <ColorCard colorInfo={props.colorInfo} />
    </div>
  )
}
