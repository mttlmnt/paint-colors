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
      <div className="flex flex-col h-screen">
        <ColorCardList colors={filteredColors} />
        <Stage />
      </div>
    </DndProvider>
  )
}
