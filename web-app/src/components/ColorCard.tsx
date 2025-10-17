import Swatch from "./Swatch"
import ColorPreview from "./ColorPreview"
import { colorToString } from "@/utils/colorHelpers"
import { ColorInfo } from "@/types/ColorInfo"

interface ColorCardProps {
  colorInfo: ColorInfo
}

export default function ColorCard({ colorInfo }: ColorCardProps) {
  const color = colorToString(colorInfo.rgb, colorInfo.lab)

  return (
    <div className="border rounded-md border-app bg-card p-4 flex flex-row items-center">
      <div className="pr-4">
        <h2 className="text-lg font-semibold w-28 text-primary">
          {colorInfo.name}
        </h2>
        <span className="text-sm font-extralight text-secondary">
          {colorInfo.code}
        </span>
      </div>
      <ColorPreview
        color={color}
        colorName={colorInfo.name}
        colorCode={colorInfo.code}
      >
        <Swatch colorRGB={colorInfo.rgb} colorLAB={colorInfo.lab} />
      </ColorPreview>
    </div>
  )
}
