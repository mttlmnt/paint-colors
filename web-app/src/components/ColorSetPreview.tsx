interface ColorInfo {
  color: string
  name: string
  code: string
}

interface ColorSetPreviewProps {
  colorInfos: ColorInfo[]
  onClose: () => void
}

export default function ColorSetPreview({
  colorInfos,
  onClose,
}: ColorSetPreviewProps) {
  if (colorInfos.length === 0) return null

  return (
    <div className="modal-overlay p-8" onClick={onClose}>
      <div className="w-full h-full rounded-lg shadow-2xl flex gap-4">
        {colorInfos.map((colorInfo, index) => (
          <div
            key={index}
            className="flex-1 rounded-lg flex items-end p-8"
            style={{ backgroundColor: colorInfo.color }}
          >
            <div className="bg-black/70 backdrop-blur-md text-white px-6 py-4 rounded-lg">
              <div className="text-2xl font-semibold mb-1">
                {colorInfo.name}
              </div>
              <div className="text-sm font-extralight opacity-80">
                {colorInfo.code}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
