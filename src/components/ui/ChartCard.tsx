import type { ReactNode } from 'react'

interface ChartCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

export function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
