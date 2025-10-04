import { useDrag } from 'react-dnd'
import ColorCard from './ColorCard'

export default function ColorCardDraggable(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'color-card',
    item: props.colorInfo,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div ref={drag} style={{ cursor: 'move', opacity: isDragging ? 0.5 : 1 }}>
      <ColorCard colorInfo={props.colorInfo} />
    </div>
  )
}
