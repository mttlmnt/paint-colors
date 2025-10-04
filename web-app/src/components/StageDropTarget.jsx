import { useState } from 'react'
import { useDrop } from 'react-dnd'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import SwatchIcon from '@heroicons/react/24/outline/SwatchIcon'
import ColorCardDraggable from './ColorCardDraggable'

export default function StageDropTarget(props) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'color-card',
    drop: (item, monitor) => {
      setColorInfo(item)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const [colorInfo, setColorInfo] = useState()

  return (
    <div
      ref={drop}
      className={
        'border rounded border-gray-20 ' + (isOver ? 'bg-gray-100' : 'bg-white')
      }
    >
      {isOver || !colorInfo ? (
        <Placeholder accept={isOver} />
      ) : (
        <ColorCardDraggable colorInfo={colorInfo} />
      )}
    </div>
  )
}

function Placeholder(props) {
  return (
    <div className="m-4 flex flex-row items-center justify-center h-32 w-64">
      {placeholderIcon(props.accept)}
    </div>
  )
}

function placeholderIcon(accept) {
  return accept ? (
    <SwatchIcon className="h-16 w-16 text-blue-200" />
  ) : (
    <PlusIcon className="h-16 w-16 text-blue-200" />
  )
}
