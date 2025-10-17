import { decodeColorCode, COLOR_GROUP_INFO } from "@/utils/colorCodeDecoder"
import ColorWheel from "./ColorWheel"

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
        {colorInfos.map((colorInfo, index) => {
          const decoded = decodeColorCode(colorInfo.code)

          return (
            <div
              key={index}
              className="flex-1 rounded-lg flex items-end p-8"
              style={{ backgroundColor: colorInfo.color }}
            >
              <div className="bg-black/70 backdrop-blur-md text-white px-6 py-4 rounded-lg">
                <div className="text-2xl font-semibold mb-4 text-center">
                  {colorInfo.name}
                </div>
                {decoded && (
                  <div className="flex gap-4 items-start">
                    <ColorWheel
                      wheelPosition={decoded.wheelPosition}
                      saturation={decoded.saturation}
                      luminance={decoded.luminance}
                      size={100}
                    />
                    <div className="text-xs space-y-1 opacity-90">
                      <div>
                        <span className="opacity-60">Code: </span>
                        {colorInfo.code}
                      </div>
                      <div>
                        <span className="opacity-60">Hue: </span>
                        {decoded.wheelPosition}°
                      </div>
                      <div>
                        <span className="opacity-60">Saturation: </span>
                        {decoded.saturation}
                      </div>
                      <div>
                        <span className="opacity-60">Luminance: </span>
                        {decoded.luminance}
                      </div>
                      <div>
                        <span className="opacity-60">Group: </span>
                        {COLOR_GROUP_INFO[decoded.group].label}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
