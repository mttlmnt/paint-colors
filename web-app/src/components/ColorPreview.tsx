import { useState, useEffect, useRef, ReactNode } from 'react'

interface ColorPreviewProps {
  color: string
  colorName?: string
  colorCode?: string
  children: ReactNode
  hoverDelay?: number
}

export default function ColorPreview({ color, colorName, colorCode, children, hoverDelay = 1000 }: ColorPreviewProps) {
  const [showPreview, setShowPreview] = useState(false)
  const hoverTimerRef = useRef<number | null>(null)

  const handleMouseEnter = () => {
    hoverTimerRef.current = window.setTimeout(() => {
      setShowPreview(true)
    }, hoverDelay)
  }

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    setShowPreview(false)
  }

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      <div
        className="cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/50 backdrop-blur-sm p-8">
          <div className="w-full h-full rounded-lg shadow-2xl relative" style={{ backgroundColor: color }}>
            {(colorName || colorCode) && (
              <div className="absolute bottom-8 left-8 bg-black/70 backdrop-blur-md text-white px-6 py-4 rounded-lg">
                {colorName && <div className="text-2xl font-semibold mb-1">{colorName}</div>}
                {colorCode && <div className="text-sm font-extralight opacity-80">{colorCode}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
