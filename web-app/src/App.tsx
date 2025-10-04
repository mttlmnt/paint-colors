import { useState, useMemo } from 'react'
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

  const filteredColors = useMemo(() => {
    return colorStore.colors(filterOptions)
  }, [colorStore, filterOptions])

  return (
    <DndProvider backend={HTML5Backend}>
      <Header onFilterOptionsChanged={setFilterOptions}></Header>
      <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
        <div className="flex-1 overflow-auto">
          <ColorCardList colors={filteredColors} />
        </div>
        <div className="lg:w-96 border-t lg:border-t-0 lg:border-l border-gray-200 overflow-auto">
          <Stage />
        </div>
      </div>
    </DndProvider>
  )
}
