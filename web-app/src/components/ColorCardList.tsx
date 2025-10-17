import ColorCardDraggable from "./ColorCardDraggable"

export default function ColorCardList(props) {
  return (
    <div className="flex flex-row flex-wrap justify-center p-1 overflow-scroll bg-app">
      {props.colors.map(item => (
        <div className="flex-none m-1" key={item.code}>
          <ColorCardDraggable key={item.code} colorInfo={item} />
        </div>
      ))}
    </div>
  )
}
