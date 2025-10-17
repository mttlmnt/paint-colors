import { useState, useMemo, useRef, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import ColorCardList from "@/components/ColorCardList"
import { ColorStore } from "@/ColorStore"
import Stage from "@/components/Stage"
import { Header } from "@/components/Header"
import { FilterOptions } from "@/FilterOptions"
import { rgbToHsl } from "@/utils/colorHelpers"
import { decodeColorCode } from "@/utils/colorCodeDecoder"

export default function App() {
  const [colorStore] = useState<ColorStore>(new ColorStore())
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    colorCategories: [],
  })
  const [stageWidth, setStageWidth] = useState(384) // 96 * 4 (w-96 in pixels)
  const [stageHeight, setStageHeight] = useState(window.innerHeight * 0.4)
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024)
  const containerRef = useRef<HTMLDivElement>(null)
  const isResizingRef = useRef(false)

  const filteredColors = useMemo(() => {
    let colors = colorStore.colors(filterOptions)

    // Apply sorting
    if (filterOptions.sortBy) {
      colors = [...colors].sort((a, b) => {
        let comparison = 0

        if (filterOptions.sortBy === "name") {
          comparison = a.name.localeCompare(b.name)
        } else if (filterOptions.sortBy === "lrv") {
          // Calculate lightness from RGB for more reliable sorting
          const lightnessA = rgbToHsl(a.rgb).l
          const lightnessB = rgbToHsl(b.rgb).l
          comparison = lightnessA - lightnessB
        } else if (filterOptions.sortBy === "saturation") {
          const decodedA = decodeColorCode(a.code)
          const decodedB = decodeColorCode(b.code)
          const satA = decodedA?.saturation ?? 0
          const satB = decodedB?.saturation ?? 0
          comparison = satA - satB
        } else if (filterOptions.sortBy === "luminance") {
          const decodedA = decodeColorCode(a.code)
          const decodedB = decodeColorCode(b.code)
          const lumA = decodedA?.luminance ?? 0
          const lumB = decodedB?.luminance ?? 0
          comparison = lumA - lumB
        } else if (filterOptions.sortBy === "hue") {
          const decodedA = decodeColorCode(a.code)
          const decodedB = decodeColorCode(b.code)
          const hueA = decodedA?.wheelPosition ?? 0
          const hueB = decodedB?.wheelPosition ?? 0
          comparison = hueA - hueB
        }

        return filterOptions.sortOrder === "desc" ? -comparison : comparison
      })
    }

    return colors
  }, [colorStore, filterOptions])

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const createResizeHandler = (
    dimension: "horizontal" | "vertical",
    cursorStyle: string,
    setSizeFunction: (size: number) => void,
    calculateNewSize: (containerRect: DOMRect, mousePosition: number) => number,
    minSize: number
  ) => {
    return (e: React.MouseEvent) => {
      e.preventDefault()
      isResizingRef.current = true
      document.body.style.cursor = cursorStyle
      document.body.style.userSelect = "none"

      const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current || !containerRef.current) return

        const containerRect = containerRef.current.getBoundingClientRect()
        const mousePos = dimension === "horizontal" ? e.clientX : e.clientY
        const newSize = calculateNewSize(containerRect, mousePos)
        const maxSize = dimension === "horizontal"
          ? containerRect.width - minSize
          : containerRect.height - minSize
        setSizeFunction(Math.max(minSize, Math.min(newSize, maxSize)))
      }

      const handleMouseUp = () => {
        isResizingRef.current = false
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
  }

  const startResizingHorizontal = createResizeHandler(
    "horizontal",
    "col-resize",
    setStageWidth,
    (rect, mouseX) => rect.right - mouseX,
    256
  )

  const startResizingVertical = createResizeHandler(
    "vertical",
    "row-resize",
    setStageHeight,
    (rect, mouseY) => rect.bottom - mouseY,
    150
  )

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row h-screen overflow-hidden bg-app"
      >
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <Header
            onFilterOptionsChanged={setFilterOptions}
            colorCount={filteredColors.length}
          ></Header>
          <div className="flex-1 overflow-auto">
            <ColorCardList colors={filteredColors} />
          </div>
        </div>
        <div
          className="border-t lg:border-t-0 lg:border-l border-app overflow-auto relative"
          style={{
            width: isLargeScreen ? stageWidth : "100%",
            height: isLargeScreen ? "auto" : stageHeight,
          }}
        >
          {/* Horizontal resize handle (large screens) */}
          <div
            className="hidden lg:block absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-400 transition-colors z-10"
            onMouseDown={startResizingHorizontal}
          />
          {/* Vertical resize handle (narrow screens) */}
          <div
            className="lg:hidden absolute left-0 right-0 top-0 h-1 cursor-row-resize hover:bg-blue-400 transition-colors z-10"
            onMouseDown={startResizingVertical}
          />
          <Stage />
        </div>
      </div>
    </DndProvider>
  )
}
