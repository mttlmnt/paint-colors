import Swatch from './Swatch';

export default function ColorCard(props) {
  return (
    <div className='border rounded border-gray-200 bg-white p-4 flex flex-row items-center'>
      <div className='pr-4'>
        <h2 className='text-lg font-semibold w-28'>
          { props.colorInfo.name }
        </h2>
        <span className='text-sm font-extralight'>{ props.colorInfo.code }</span>
      </div>
      <Swatch colorRGB={ props.colorInfo.rgb }/>
    </div>
  )
}
