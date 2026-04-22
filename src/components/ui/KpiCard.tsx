import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KpiCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendLabel?: string
  color?: string
}

export function KpiCard({ title, value, subtitle, icon, trend, trendLabel, color = 'bg-blue-600' }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className={`${color} p-3 rounded-lg`}>{icon}</div>
        {trend && (
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
            trend === 'up' ? 'bg-emerald-50 text-emerald-700' :
            trend === 'down' ? 'bg-red-50 text-red-600' :
            'bg-gray-50 text-gray-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
             trend === 'down' ? <TrendingDown className="w-3 h-3" /> :
             <Minus className="w-3 h-3" />}
            {trendLabel}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-700 mt-0.5">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  )
}
