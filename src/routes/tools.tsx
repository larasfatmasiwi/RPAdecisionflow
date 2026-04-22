import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { mockCases, mockTools } from '@/data/mockData'
import { ReferenceCard } from '@/components/ui/ReferenceCard'
import { BookOpen, Search } from 'lucide-react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

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

const blendedFinanceIndicators = [
  'Barrier fit',
  'Mobilization potential',
  'Financial additionality',
  'Development additionality',
  'Concessionality discipline',
  'Implementation feasibility',
  'Results / impact measurability',
]

const blendedFinanceScoresByCountry: Record<string, number[]> = {
  Indonesia: [10, 8, 9, 8, 8, 8, 7],
  Japan: [10, 7, 8, 9, 8, 7, 10],
}

function ToolsPage() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('Indonesia')

  const filtered = mockTools.filter(
    (t) =>
      !search ||
      t.tool.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.bestWhen.toLowerCase().includes(search.toLowerCase())
  )

  const radarData = useMemo(
    () => ({
      labels: blendedFinanceIndicators,
      datasets: [
        {
          label: `${country} score (1-10)`,
          data: blendedFinanceScoresByCountry[country] ?? [6, 6, 6, 6, 6, 6, 6],
          backgroundColor: 'rgba(37, 99, 235, 0.2)',
          borderColor: 'rgba(37, 99, 235, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(37, 99, 235, 1)',
        },
      ],
    }),
    [country]
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Blended Finance Tool Recommendation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Recommendation snapshot and reference library of {mockTools.length} blended finance instruments. Click any card to expand details.
        </p>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
        <div className="flex flex-wrap gap-3 items-end">
          <label className="flex flex-col gap-1 min-w-[240px]">
            <span className="text-xs font-semibold text-gray-500">Country for deep analysis</span>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-10 rounded-lg border border-gray-200 px-3 text-sm text-gray-700 bg-white"
            >
              {mockCases.map((c) => (
                <option key={c.id} value={c.country}>{c.country}</option>
              ))}
            </select>
          </label>
        </div>

        <h2 className="text-sm font-semibold text-gray-700">Country Indicator Radar (1–10)</h2>
        <div className="h-[360px]">
          <Radar
            data={radarData}
            options={{
              maintainAspectRatio: false,
              scales: {
                r: {
                  min: 1,
                  max: 10,
                  ticks: { stepSize: 1 },
                },
              },
            }}
          />
        </div>
      </section>

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
