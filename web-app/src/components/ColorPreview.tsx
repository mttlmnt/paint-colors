import { useState, useEffect, useRef, ReactNode } from 'react'
import ColorSetPreview from './ColorSetPreview'

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
        <ColorSetPreview
          colorInfos={[{ color, name: colorName, code: colorCode }]}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  )
}
