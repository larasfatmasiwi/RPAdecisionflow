import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { mockExpansionOptions } from '@/data/mockData'
import { expansionScoringByProject, projectScenarios, type ExpansionScoreRow } from '@/data/decisionFlowDataset'
import { ReferenceCard } from '@/components/ui/ReferenceCard'
import { expansionCriteria, type ExpansionOption } from '@/utils/decisionFlowConfig'
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

const criterionAccessors = [
  { label: 'Speed', key: 'speed' },
  { label: 'Cost', key: 'cost' },
  { label: 'Local ownership', key: 'localOwnership' },
  { label: 'Scalability', key: 'scalability' },
  { label: 'Capacity building', key: 'capacityBuilding' },
  { label: 'Regulatory feasibility', key: 'regulatoryFeasibility' },
] as const satisfies Array<{ label: (typeof expansionCriteria)[number]; key: keyof ExpansionScoreRow }>

const chartPalette = [
  {
    borderColor: 'rgba(16, 185, 129, 1)',
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
    pointBackgroundColor: 'rgba(16, 185, 129, 1)',
  },
  {
    borderColor: 'rgba(37, 99, 235, 1)',
    backgroundColor: 'rgba(37, 99, 235, 0.18)',
    pointBackgroundColor: 'rgba(37, 99, 235, 1)',
  },
  {
    borderColor: 'rgba(245, 158, 11, 1)',
    backgroundColor: 'rgba(245, 158, 11, 0.18)',
    pointBackgroundColor: 'rgba(245, 158, 11, 1)',
  },
  {
    borderColor: 'rgba(168, 85, 247, 1)',
    backgroundColor: 'rgba(168, 85, 247, 0.18)',
    pointBackgroundColor: 'rgba(168, 85, 247, 1)',
  },
  {
    borderColor: 'rgba(239, 68, 68, 1)',
    backgroundColor: 'rgba(239, 68, 68, 0.18)',
    pointBackgroundColor: 'rgba(239, 68, 68, 1)',
  },
] as const

function getHeatmapCellClass(score: number) {
  if (score >= 9) return 'bg-emerald-600 text-white'
  if (score >= 7) return 'bg-emerald-500/85 text-white'
  if (score >= 5) return 'bg-amber-200 text-amber-950'
  if (score >= 3) return 'bg-orange-200 text-orange-950'
  return 'bg-rose-200 text-rose-950'
}

function ExpansionPage() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('Indonesia')
  const [selectedModels, setSelectedModels] = useState<ExpansionOption[]>([])

  const scenario = useMemo(
    () => projectScenarios.find((item) => item.country === country) ?? projectScenarios[0],
    [country]
  )

  const expansionRows = useMemo(() => expansionScoringByProject[scenario.id] ?? [], [scenario.id])
  const availableModels = useMemo(() => expansionRows.map((row) => row.model), [expansionRows])

  const filtered = mockExpansionOptions.filter(
    (e) =>
      !search ||
      e.model.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.bestWhen.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    setSelectedModels((current) => {
      const next = current.filter((model) => availableModels.includes(model))
      if (next.length > 0) return next

      return availableModels
    })
  }, [availableModels])

  const selectedRows = useMemo(
    () =>
      selectedModels
        .map((model) => expansionRows.find((row) => row.model === model))
        .filter((row): row is ExpansionScoreRow => Boolean(row)),
    [selectedModels, expansionRows]
  )

  const scoreCards = useMemo(
    () =>
      criterionAccessors.map((criterion) => {
        const scores = selectedRows.map((row) => row[criterion.key] as number)
        const average = scores.length > 0 ? scores.reduce((sum, value) => sum + value, 0) / scores.length : 0

        return {
          label: criterion.label,
          score: average,
        }
      }),
    [selectedRows]
  )

  const radarData = useMemo(
    () => ({
      labels: expansionCriteria,
      datasets: selectedRows.map((row, index) => ({
        label: row.model,
        data: criterionAccessors.map((criterion) => row[criterion.key] as number),
        borderWidth: 2,
        ...chartPalette[index % chartPalette.length],
      })),
    }),
    [selectedRows]
  )

  const handleModelToggle = (model: ExpansionOption) => {
    setSelectedModels((current) => {
      if (current.includes(model)) {
        if (current.length === 1) return current
        return current.filter((item) => item !== model)
      }

      return [...current, model]
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Global Expansion Option Recommendation</h1>
        <p className="mt-1 text-sm text-gray-500">
          Reference library of {mockExpansionOptions.length} global scale strategies. Click any card to expand details.
        </p>
      </div>

      <section className="space-y-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-3 items-end">
          <label className="flex max-w-sm flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500">Country for deep analysis</span>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700"
            >
              {projectScenarios.map((item) => (
                <option key={item.id} value={item.country}>{item.country}</option>
              ))}
            </select>
          </label>

          <div className="flex min-w-[320px] flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500">Expansion models to compare on the radar chart</span>
            <div className="flex flex-wrap gap-2">
              {availableModels.map((model) => {
                const checked = selectedModels.includes(model)

                return (
                  <label
                    key={model}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                      checked ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleModelToggle(model)}
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>{model}</span>
                  </label>
                )
              })}
            </div>
            <p className="text-xs text-gray-500">Select any number of expansion models to compare on the same radar chart.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Project Expansion Comparison Radar (1–10)</h2>
            <p className="mt-1 text-xs text-gray-500">{scenario.projectName}</p>
          </div>
          {selectedRows.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedRows.map((row) => (
                <span key={row.model} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                  {row.model} · Avg {row.averageScore.toFixed(1)}
                </span>
              ))}
            </div>
          ) : null}
        </div>

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
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Indicator Heatmap</h3>
              <p className="mt-1 text-xs text-slate-500">Same underlying `expansionScoringByProject` values, shown as a quick scan table.</p>
            </div>
            <p className="text-xs text-slate-500">Higher scores are greener.</p>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-2 text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Model</th>
                  {criterionAccessors.map((criterion) => (
                    <th key={criterion.key} className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {criterion.label}
                    </th>
                  ))}
                  <th className="px-2 py-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">Avg</th>
                </tr>
              </thead>
              <tbody>
                {selectedRows.map((row) => (
                  <tr key={row.model}>
                    <th className="rounded-xl bg-white px-3 py-3 text-left font-medium text-slate-700 shadow-sm">
                      {row.model}
                    </th>
                    {criterionAccessors.map((criterion) => {
                      const score = row[criterion.key] as number

                      return (
                        <td key={criterion.key} className={`rounded-xl px-2 py-3 text-center font-semibold shadow-sm ${getHeatmapCellClass(score)}`}>
                          {score}
                        </td>
                      )
                    })}
                    <td className={`rounded-xl px-2 py-3 text-center font-semibold shadow-sm ${getHeatmapCellClass(row.averageScore)}`}>
                      {row.averageScore.toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {scoreCards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-700">{card.label}</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">{card.score.toFixed(1)} / 10</p>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${card.score * 10}%` }} />
            </div>
          </article>
        ))}
      </section> */}

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search expansion models…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-center">
          <Map className="mb-3 h-12 w-12 text-gray-200" />
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
