import { ReactNode } from "react"

interface SectionLabelProps {
  children: ReactNode
  subdued?: boolean
  topAlign?: boolean
}

export default function SectionLabel({
  children,
  subdued = false,
  topAlign = false,
}: SectionLabelProps) {
  return (
    <div
      className={`w-16 text-right flex justify-end ${
        subdued
          ? "text-sm font-normal text-secondary items-center"
          : topAlign
            ? "text-base font-bold text-heading pt-1"
            : "text-base font-bold text-heading items-center"
      }`}
    >
      {children}
    </div>
  )
}
