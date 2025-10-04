import StageDropTarget from './StageDropTarget'

export default function StageCollection(props) {
  return (
    <div className="space-y-2 m-1">
      <StageDropTarget />
      <StageDropTarget />
      <StageDropTarget />
    </div>
  )
}
