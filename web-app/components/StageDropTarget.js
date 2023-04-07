import { useDrop } from 'react-dnd'
import PlusIcon from '@heroicons/react/24/outline/PlusIcon'
import SwatchIcon from '@heroicons/react/24/outline/SwatchIcon'

export default function StageDropTarget(props) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'color-card',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div
      ref={drop}
      className={'border rounded border-gray-20 ' + (isOver ? "bg-gray-100" : "bg-white")}
    >
      <Placeholder accept={isOver}/>
    </div>
  )
}

function Placeholder(props) {
  return (
    <div className='m-4 flex flex-row items-center justify-center h-32 w-64'>
      {placeholderIcon(props.accept)}
    </div>
  )
}

function placeholderIcon(accept) {
  return accept
    ? <SwatchIcon className="h-16 w-16 text-blue-200"/>
    : <PlusIcon className="h-16 w-16 text-blue-200"/>
}
