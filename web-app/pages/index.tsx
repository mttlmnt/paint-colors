import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ColorCardList from '@/components/ColorCardList';
import { ColorStore } from '@/ColorStore'
import Stage from '@/components/Stage';

export default function Home() {
  const [colorStore, _] = useState(new ColorStore())

  return (
    <DndProvider backend={ HTML5Backend }>
      <div className='flex flex-col h-screen'>
        <ColorCardList colorCatalog={ colorStore.colors } />
        <Stage/>
      </div>
    </DndProvider>
  )
}
