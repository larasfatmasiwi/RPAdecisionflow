import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { mockTools } from '@/data/mockData'
import { ReferenceCard } from '@/components/ui/ReferenceCard'
import { BookOpen, Search } from 'lucide-react'

export const Route = createFileRoute('/tools')({
  component: ToolsPage,
})

function ToolsPage() {
  const [search, setSearch] = useState('')

  const filtered = mockTools.filter(
    (t) =>
      !search ||
      t.tool.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.bestWhen.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Blended Finance Tools Reference</h1>
        <p className="text-sm text-gray-500 mt-1">
          Reference library of {mockTools.length} blended finance instruments. Click any card to expand details.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search tools…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <BookOpen className="w-12 h-12 text-gray-200 mb-3" />
          <p className="text-sm text-gray-500">No tools match your search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((tool) => (
            <ReferenceCard key={tool.tool} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
