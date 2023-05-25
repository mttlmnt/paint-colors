import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ColorCardList from '@/components/ColorCardList';
import { ColorStore } from '@/ColorStore'
import Stage from '@/components/Stage';
import { Header } from '@/components/Header';
import { FilterOptions } from "@/FilterOptions";

export default function Home() {
  const [colorStore, _] = useState<ColorStore>(new ColorStore())
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({} as FilterOptions);

  return (
    <DndProvider backend={ HTML5Backend }>
      <Header onFilterOptionsChanged={ setFilterOptions }></Header>
      <div className='flex flex-col h-screen'>
        <ColorCardList colors={ colorStore.colors(filterOptions) } />
        <Stage/>
      </div>
    </DndProvider>
  )
}
