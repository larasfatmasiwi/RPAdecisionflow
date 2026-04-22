import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { mockExpansionOptions } from '@/data/mockData'
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

const expansionScores: Record<string, number> = {
  'Deepen Local': 7,
  'Local Repurposing': 6,
  'New Build': 8,
  'Local Hybrid': 9,
  Hybrid: 8,
}

function ExpansionPage() {
  const [search, setSearch] = useState('')

  const filtered = mockExpansionOptions.filter(
    (e) =>
      !search ||
      e.model.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.bestWhen.toLowerCase().includes(search.toLowerCase())
  )

  const radarData = useMemo(
    () => ({
      labels: mockExpansionOptions.map((option) => option.model),
      datasets: [
        {
          label: 'Score (1-10)',
          data: mockExpansionOptions.map((option) => expansionScores[option.model] ?? 5),
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgba(16, 185, 129, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        },
      ],
    }),
    []
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Global Expansion Option Recommendation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Reference library of {mockExpansionOptions.length} global scale strategies. Click any card to expand details.
        </p>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Expansion Model Scoring Radar (1–10)</h2>
        <div className="h-[340px]">
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
