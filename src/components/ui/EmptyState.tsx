import type { ReactNode } from 'react'
import { Search } from 'lucide-react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-gray-300 mb-4">
        {icon ?? <Search className="w-12 h-12" />}
      </div>
      <h3 className="text-sm font-semibold text-gray-600">{title}</h3>
      {description && <p className="text-xs text-gray-400 mt-1 max-w-xs">{description}</p>}
    </div>
  )
}
