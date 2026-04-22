import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { mockCases, mockExpansionOptions } from '@/data/mockData'
import { ReferenceCard } from '@/components/ui/ReferenceCard'
import { Map, Search } from 'lucide-react'
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

export const Route = createFileRoute('/expansion')({
  component: ExpansionPage,
})

const expansionIndicators = [
  'Speed',
  'Cost',
  'Local Ownership',
  'Scalability',
  'Capacity Building',
  'Regulatory Feasibility',
]

const expansionScoresByCountry: Record<string, number[]> = {
  Indonesia: [8, 8, 6, 8, 6, 7],
  Japan: [7, 6, 9, 6, 8, 8],
}

function ExpansionPage() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('Indonesia')

  const filtered = mockExpansionOptions.filter(
    (e) =>
      !search ||
      e.model.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.bestWhen.toLowerCase().includes(search.toLowerCase())
  )

  const radarData = useMemo(
    () => ({
      labels: expansionIndicators,
      datasets: [
        {
          label: `${country} score (1-10)`,
          data: expansionScoresByCountry[country] ?? [6, 6, 6, 6, 6, 6],
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        },
      ],
    }),
    [country]
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Global Expansion Option Recommendation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Reference library of {mockExpansionOptions.length} global scale strategies. Click any card to expand details.
        </p>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
        <label className="flex flex-col gap-1 max-w-sm">
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
