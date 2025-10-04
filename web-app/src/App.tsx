import { useState, useMemo, useRef, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ColorCardList from '@/components/ColorCardList'
import { ColorStore } from '@/ColorStore'
import Stage from '@/components/Stage'
import { Header } from '@/components/Header'
import { FilterOptions } from '@/FilterOptions'

export default function App() {
  const [colorStore] = useState<ColorStore>(new ColorStore())
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    colorCategories: [],
  })
  const [stageWidth, setStageWidth] = useState(384) // 96 * 4 (w-96 in pixels)
  const containerRef = useRef<HTMLDivElement>(null)
  const isResizingRef = useRef(false)

  const filteredColors = useMemo(() => {
    return colorStore.colors(filterOptions)
  }, [colorStore, filterOptions])

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault()
    isResizingRef.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizingRef.current || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newWidth = containerRect.right - e.clientX
      setStageWidth(Math.max(256, Math.min(newWidth, containerRect.width - 256)))
    }

    const handleMouseUp = () => {
      isResizingRef.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Header onFilterOptionsChanged={setFilterOptions} colorCount={filteredColors.length}></Header>
      <div ref={containerRef} className="flex flex-col lg:flex-row h-screen overflow-hidden">
        <div className="flex-1 overflow-auto">
          <ColorCardList colors={filteredColors} />
        </div>
        <div
          className="hidden lg:block border-l border-gray-200 overflow-auto relative"
          style={{ width: stageWidth }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 transition-colors"
            onMouseDown={startResizing}
          />
          <Stage />
        </div>
        <div className="lg:hidden border-t border-gray-200 overflow-auto">
          <Stage />
        </div>
      </div>
    </DndProvider>
  )
}
