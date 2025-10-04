import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import ColorCardDraggable from "./ColorCardDraggable";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import SwatchIcon from "@heroicons/react/24/outline/SwatchIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";

export default function ColorSet({
  id,
  name,
  colors,
  onUpdateColors,
  onDelete,
  onRename,
  canDelete,
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(name);

  const addColorSlot = useCallback(() => {
    onUpdateColors([...colors, null]);
  }, [colors, onUpdateColors]);

  const removeColorSlot = useCallback(
    (index) => {
      onUpdateColors(colors.filter((_, i) => i !== index));
    },
    [colors, onUpdateColors],
  );

  const updateColor = useCallback(
    (index, colorInfo) => {
      // If colors array is empty, initialize with 3 slots
      const workingColors =
        colors.length === 0 ? [null, null, null] : [...colors];
      workingColors[index] = colorInfo;
      onUpdateColors(workingColors);
    },
    [colors, onUpdateColors, id],
  );

  const handleNameSave = () => {
    if (editedName.trim()) {
      onRename(editedName.trim());
    } else {
      setEditedName(name);
    }
    setIsEditingName(false);
  };

  // Start with 3 empty slots if no colors yet
  const displayColors = colors.length === 0 ? [null, null, null] : colors;

  return (
    <div className="flex-none bg-white rounded-lg shadow-md border border-gray-200 p-4 min-w-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
        {isEditingName ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={handleNameSave}
            onKeyDown={(e) => e.key === "Enter" && handleNameSave()}
            className="text-sm font-semibold text-gray-800 border border-blue-400 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-800">{name}</h3>
            <button
              onClick={() => setIsEditingName(true)}
              className="text-gray-400 hover:text-blue-600 transition-colors"
              title="Rename set"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
          </div>
        )}
        {canDelete && (
          <button
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600 transition-colors"
            title="Delete set"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Color Slots */}
      <div className="space-y-2">
        {displayColors.map((color, index) => (
          <ColorSlot
            key={`slot-${id}-${index}`}
            colorInfo={color}
            onDrop={(item) => updateColor(index, item)}
            onRemove={
              colors.length > 0 && color ? () => removeColorSlot(index) : null
            }
          />
        ))}
      </div>

      {/* Add Slot Button */}
      <button
        onClick={addColorSlot}
        className="w-full mt-2 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <PlusIcon className="h-4 w-4" />
        <span className="text-sm font-medium">Add Color</span>
      </button>
    </div>
  );
}

function ColorSlot({ colorInfo, onDrop, onRemove }) {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "color-card",
      drop: (item, monitor) => {
        onDrop(item);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop],
  );

  return (
    <div className="relative group">
      <div
        ref={drop}
        className={`border-2 rounded-lg transition-all ${
          isOver
            ? "border-blue-400 bg-blue-50"
            : canDrop
              ? "border-gray-300 bg-white"
              : "border-gray-300 bg-white"
        }`}
      >
        {colorInfo ? (
          <div className="p-1">
            <ColorCardDraggable colorInfo={colorInfo} />
          </div>
        ) : (
          <Placeholder isOver={isOver} />
        )}
      </div>
      {onRemove && colorInfo && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
          title="Remove this slot"
        >
          <TrashIcon className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

function Placeholder({ isOver }) {
  return (
    <div className="flex items-center justify-center h-24 m-2">
      {isOver ? (
        <SwatchIcon className="h-12 w-12 text-blue-400" />
      ) : (
        <PlusIcon className="h-12 w-12 text-gray-300" />
      )}
    </div>
  );
}
