import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import colorCatalog from '../../scraper/colors.json';
import ColorCardList from '../components/ColorCardList';
import Stage from '../components/Stage';

export default function Home(props) {
  return (
    <DndProvider backend={ HTML5Backend }>
      <div className='flex flex-col h-screen'>
        <ColorCardList colorCatalog={ props.colors } />
        <Stage/>
      </div>
    </DndProvider>
  )
}

export async function getStaticProps(context) {
  return {
    props: colorCatalog
  }
}
