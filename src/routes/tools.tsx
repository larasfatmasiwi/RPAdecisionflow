import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { mockTools } from '@/data/mockData'
import { ReferenceCard } from '@/components/ui/ReferenceCard'
import { BookOpen, Search } from 'lucide-react'

export const Route = createFileRoute('/tools')({
  component: ToolsPage,
})

const scoreCards = [
  { label: 'Barrier Fit Score', score: '4.5 / 5', color: 'bg-emerald-500' },
  { label: 'Mobilization Potential', score: '3.8 / 5', color: 'bg-blue-500' },
  { label: 'Financial Additionality', score: '3.5 / 5', color: 'bg-violet-500' },
  { label: 'Implementation Feasibility', score: '4.2 / 5', color: 'bg-cyan-500' },
  { label: 'Scalability', score: '3.9 / 5', color: 'bg-amber-500' },
  { label: 'Regulatory Feasibility', score: '4.0 / 5', color: 'bg-emerald-500' },
]

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
        <h1 className="text-2xl font-bold text-gray-900">Blended Finance Tool Recommendation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Recommendation snapshot and reference library of {mockTools.length} blended finance instruments. Click any card to expand details.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
        {scoreCards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-700">{card.label}</p>
            <p className="text-4xl font-bold text-slate-900 mt-2">{card.score}</p>
            <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className={`h-full rounded-full ${card.color}`} style={{ width: `${Number(card.score[0]) * 20}%` }} />
            </div>
          </article>
        ))}
      </section>

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
