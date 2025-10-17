interface ColorWheelProps {
  wheelPosition: number // 0-360 degrees
  saturation: number // 0-100
  luminance: number // 0-100
  size?: number
}

export default function ColorWheel({
  wheelPosition,
  saturation,
  luminance,
  size = 120,
}: ColorWheelProps) {
  const markerRadius = 6
  const strokeWidth = 2

  const center = size / 2
  const wheelRadius = center

  // Convert wheel position to radians (0° is at top, clockwise)
  const angleRad = ((wheelPosition - 90) * Math.PI) / 180

  // Outer white circle has radius markerRadius+1 with strokeWidth 2
  // So it extends (markerRadius + 1) + (strokeWidth / 2) from center
  // = 6 + 1 + 1 = 8px
  const markerExtent = markerRadius + 1 + strokeWidth / 2
  const maxDistance = wheelRadius - markerExtent
  const distance = (saturation / 100) * maxDistance
  const markerX = center + distance * Math.cos(angleRad)
  const markerY = center + distance * Math.sin(angleRad)

  return (
    <div
      className="relative overflow-visible"
      style={{ width: size, height: size }}
    >
      {/* Color wheel background */}
      <svg
        width={size}
        height={size}
        className="absolute inset-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Radial gradient for desaturation toward center */}
          <radialGradient id="saturation-gradient">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>

          {/* Conic gradient for smooth color wheel */}
          <linearGradient id="hue-gradient" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="red" />
            <stop offset="16.67%" stopColor="yellow" />
            <stop offset="33.33%" stopColor="lime" />
            <stop offset="50%" stopColor="cyan" />
            <stop offset="66.67%" stopColor="blue" />
            <stop offset="83.33%" stopColor="magenta" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>

        {/* Use foreignObject to render CSS conic gradient (much smoother) */}
        <foreignObject x="0" y="0" width={size} height={size}>
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: "50%",
              background: `conic-gradient(
                from 0deg,
                hsl(0, 100%, 50%),
                hsl(60, 100%, 50%),
                hsl(120, 100%, 50%),
                hsl(180, 100%, 50%),
                hsl(240, 100%, 50%),
                hsl(300, 100%, 50%),
                hsl(360, 100%, 50%)
              )`,
            }}
          />
        </foreignObject>

        {/* Overlay to show desaturation toward center */}
        <circle
          cx={center}
          cy={center}
          r={wheelRadius}
          fill="url(#saturation-gradient)"
        />

        {/* Position marker with double ring for visibility in all modes */}
        {/* Outer white ring */}
        <circle
          cx={markerX}
          cy={markerY}
          r={markerRadius + 1}
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
        {/* Inner black ring */}
        <circle
          cx={markerX}
          cy={markerY}
          r={markerRadius}
          fill="none"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}
