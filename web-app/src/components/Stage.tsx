import { useState, useCallback, useEffect } from "react"
import ColorSet from "./ColorSet"
import PlusIcon from "@heroicons/react/24/outline/PlusIcon"
import { loadFromLocalStorage, saveToLocalStorage } from "@/utils/localStorage"

const STORAGE_KEY = "paint-colors-sets"

export default function Stage() {
  const [colorSets, setColorSets] = useState(() => {
    return loadFromLocalStorage(STORAGE_KEY, [
      { id: 1, name: "Color Set 1", colors: [] },
    ])
  })

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEY, colorSets)
  }, [colorSets])

  const addColorSet = () => {
    setColorSets(prevSets => {
      const newId = Math.max(...prevSets.map(s => s.id), 0) + 1
      return [
        ...prevSets,
        {
          id: newId,
          name: `Color Set ${newId}`,
          colors: [],
        },
      ]
    })
  }

  const deleteColorSet = useCallback(id => {
    setColorSets(prevSets => {
      if (prevSets.length > 1) {
        return prevSets.filter(set => set.id !== id)
      }
      return prevSets
    })
  }, [])

  const updateColorSet = useCallback((id, colors) => {
    setColorSets(prevSets =>
      prevSets.map(set => (set.id === id ? { ...set, colors } : set))
    )
  }, [])

  const renameColorSet = useCallback((id, newName) => {
    setColorSets(prevSets =>
      prevSets.map(set => (set.id === id ? { ...set, name: newName } : set))
    )
  }, [])

  return (
    <div className="flex-none bg-app border-t border-gray-300 dark:border-gray-700">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-heading">Color Sets</h2>
            <p className="text-sm text-secondary">
              Drag colors here to create combinations
            </p>
          </div>
          <button
            onClick={addColorSet}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium whitespace-nowrap"
          >
            <PlusIcon className="h-5 w-5" />
            New Set
          </button>
        </div>

        <div className="flex flex-wrap gap-4 pb-4">
          {colorSets.map(set => (
            <ColorSet
              key={set.id}
              id={set.id}
              name={set.name}
              colors={set.colors}
              onUpdateColors={colors => updateColorSet(set.id, colors)}
              onDelete={() => deleteColorSet(set.id)}
              onRename={newName => renameColorSet(set.id, newName)}
              canDelete={colorSets.length > 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
