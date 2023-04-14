
import ColorCardDraggable from './ColorCardDraggable';

export default function ColorCardList(props) {
  return (
    <div className='flex flex-row flex-wrap justify-center p-1 overflow-scroll bg-gray-50'>
     {
       props.colorCatalog.map((item, i) =>
        <div className='flex-none m-1' key={i}>
          <ColorCardDraggable key={i} colorInfo={item} />
        </div>
       )
     }
    </div>
  )
}
