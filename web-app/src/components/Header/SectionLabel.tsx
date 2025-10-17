import { ReactNode } from "react"

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-base font-bold text-heading pt-2 w-20 text-right">
      {children}
    </div>
  )
}
