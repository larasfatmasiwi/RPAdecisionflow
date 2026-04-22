import { Search, Filter } from 'lucide-react'

interface FilterOption {
  value: string
  label: string
}

interface FilterBarProps {
  searchValue: string
  onSearchChange: (v: string) => void
  filters: {
    key: string
    label: string
    value: string
    options: FilterOption[]
    onChange: (v: string) => void
  }[]
  resultCount?: number
}

export function FilterBar({ searchValue, onSearchChange, filters, resultCount }: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cases, countries, projects…"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Dynamic filters */}
        {filters.map((f) => (
          <div key={f.key} className="relative min-w-[160px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <select
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">{f.label}</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        ))}

        {resultCount !== undefined && (
          <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
            {resultCount} result{resultCount !== 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  )
}
