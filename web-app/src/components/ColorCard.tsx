import Swatch from './Swatch'
import ColorPreview from './ColorPreview'
import { colorToString } from '@/utils/colorHelpers'

export default function ColorCard(props) {
  const color = colorToString(props.colorInfo.rgb, props.colorInfo.lab)

  return (
    <div className="border rounded-md border-app bg-card p-4 flex flex-row items-center">
      <div className="pr-4">
        <h2 className="text-lg font-semibold w-28 text-primary">
          {props.colorInfo.name}
        </h2>
        <span className="text-sm font-extralight text-secondary">
          {props.colorInfo.code}
        </span>
      </div>
      <ColorPreview color={color} colorName={props.colorInfo.name} colorCode={props.colorInfo.code}>
        <Swatch colorRGB={props.colorInfo.rgb} colorLAB={props.colorInfo.lab} />
      </ColorPreview>
    </div>
  )
}
