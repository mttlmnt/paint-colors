import { ReactNode } from "react"

interface SectionLabelProps {
  children: ReactNode
  subdued?: boolean
}

export default function SectionLabel({
  children,
  subdued = false,
}: SectionLabelProps) {
  return (
    <div
      className={`pt-2 w-16 text-right ${
        subdued
          ? "text-sm font-normal text-secondary"
          : "text-base font-bold text-heading"
      }`}
    >
      {children}
    </div>
  )
}
