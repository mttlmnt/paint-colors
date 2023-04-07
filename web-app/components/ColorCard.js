import Image from 'next/image';
import { useDrag } from 'react-dnd'

export default function ColorCard(props) {
  const [collected, drag] = useDrag(() => ({
    type: "color-card",
    item: props.colorInfo
  }))

  return (
    <div
      className='border rounded border-gray-200 bg-white p-4 flex flex-row items-center'
      ref={ drag }
      style={{ cursor: 'move' }}
    >
      <div className='pr-4'>
        <h2 className='text-lg font-semibold w-28'>
          { props.colorInfo.name }
        </h2>
        <span className='text-sm font-extralight'>{ props.colorInfo.code }</span>
      </div>
      <div className='w-32 h-32 relative'>
        <Image
          className='border rounded'
          src={ swatchURL(props.colorInfo.swatchName) }
          alt='{ props.colorInfo.name }'
          fill
          draggable='false'
        />
      </div>
    </div>
  )
}

function swatchTestPotURL(swatchName) {
  return `https://www.resene.co.nz/swatches/jpegs/testpotpics/preview/${swatchName}`
}

function swatchURL(swatchName) {
  return `https://www.resene.co.nz/swatches/jpegs/${swatchName}`
}
