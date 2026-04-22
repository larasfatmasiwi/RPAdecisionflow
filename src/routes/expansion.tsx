import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { mockExpansionOptions } from '@/data/mockData'
import { ReferenceCard } from '@/components/ui/ReferenceCard'
import { Map, Search } from 'lucide-react'

export const Route = createFileRoute('/expansion')({
  component: ExpansionPage,
})

function ExpansionPage() {
  const [search, setSearch] = useState('')

  const filtered = mockExpansionOptions.filter(
    (e) =>
      !search ||
      e.model.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.bestWhen.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Global Expansion Options Reference</h1>
        <p className="text-sm text-gray-500 mt-1">
          Reference library of {mockExpansionOptions.length} global scale strategies. Click any card to expand details.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search expansion models…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Map className="w-12 h-12 text-gray-200 mb-3" />
          <p className="text-sm text-gray-500">No models match your search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((option) => (
            <ReferenceCard key={option.model} expansion={option} />
          ))}
        </div>
      )}
    </div>
  )
}
