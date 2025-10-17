import { colorToString, RGB, LAB } from "@/utils/colorHelpers"

export default function Swatch(props: {
  colorRGB: RGB
  colorLAB?: LAB
}) {
  return (
    <div
      className="w-32 h-32 border rounded"
      style={{ backgroundColor: colorToString(props.colorRGB, props.colorLAB) }}
    />
  )
}
