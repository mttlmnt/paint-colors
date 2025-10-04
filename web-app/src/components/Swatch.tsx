export default function Swatch(props: {
  colorRGB: { r: Number; g: Number; b: Number }
}) {
  let color = `rgb(${props.colorRGB.r}, ${props.colorRGB.g}, ${props.colorRGB.b})`
  return (
    <div
      className="w-32 h-32 border rounded"
      style={{ backgroundColor: color }}
    />
  )
}
