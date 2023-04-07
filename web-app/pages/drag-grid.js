import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd'

let boxes = [];

for (let i = 1; i < 17; i++) {
  boxes.push({ idx: i, object: null });
}

boxes[1].object = { name: 'foo', color: '#f8ffef' };

export default function Home(props) {
  let grid = boxes.map((box, i) =>
    <Box
      key={i}
      idx={box.idx}
      object={box.object}
    />
  );

  return (
    <DndProvider backend={ HTML5Backend }>
      <div className="container mx-auto grid justify-items-center grid-cols-4 grid-rows-4 gap-4">
        {grid}
      </div>
    </DndProvider>
  )
}

function Box(props) {
  const [collected, drag] = useDrag(() => ({
    type: "color-card",
    item: props.colorInfo
  }))

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <div
      ref={drop}
      className='flex items-center justify-center border rounded border-gray-20 w-32 h-32 p-2'
      style={{ background: backgroundColor(props.object) }}
      >
      {props.idx}
    </div>
  )
}

function backgroundColor(object) {
  return object === null ? '#F0F9FF' : object.color;
}
