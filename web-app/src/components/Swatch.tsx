import { rgbToString } from '@/utils/colorHelpers'

export default function Swatch(props: {
  colorRGB: { r: number; g: number; b: number }
}) {
  return (
    <div
      className="w-32 h-32 border rounded"
      style={{ backgroundColor: rgbToString(props.colorRGB) }}
    />
  )
}
