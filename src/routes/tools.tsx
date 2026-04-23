import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useState } from 'react'
import { mockTools } from '@/data/mockData'
import { projectScenarios, toolScoringByProject, type ToolScoreRow } from '@/data/decisionFlowDataset'
import { ReferenceCard } from '@/components/ui/ReferenceCard'
import { toolCriteria, type ToolOption } from '@/utils/decisionFlowConfig'
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

const criterionAccessors = [
  { label: 'Barrier fit', key: 'barrierFit' },
  { label: 'Mobilization potential', key: 'mobilizationPotential' },
  { label: 'Financial additionality', key: 'financialAdditionality' },
  { label: 'Development additionality', key: 'developmentAdditionality' },
  { label: 'Concessionality discipline', key: 'concessionalityDiscipline' },
  { label: 'Implementation feasibility', key: 'implementationFeasibility' },
  { label: 'Results / impact measurability', key: 'impactMeasurability' },
] as const satisfies Array<{ label: (typeof toolCriteria)[number]; key: keyof ToolScoreRow }>

const chartPalette = [
  {
    borderColor: 'rgba(37, 99, 235, 1)',
    backgroundColor: 'rgba(37, 99, 235, 0.18)',
    pointBackgroundColor: 'rgba(37, 99, 235, 1)',
  },
  {
    borderColor: 'rgba(16, 185, 129, 1)',
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
    pointBackgroundColor: 'rgba(16, 185, 129, 1)',
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
  {
    borderColor: 'rgba(20, 184, 166, 1)',
    backgroundColor: 'rgba(20, 184, 166, 0.18)',
    pointBackgroundColor: 'rgba(20, 184, 166, 1)',
  },
] as const

function getHeatmapCellClass(score: number) {
  if (score >= 9) return 'bg-emerald-600 text-white'
  if (score >= 7) return 'bg-emerald-500/85 text-white'
  if (score >= 5) return 'bg-amber-200 text-amber-950'
  if (score >= 3) return 'bg-orange-200 text-orange-950'
  return 'bg-rose-200 text-rose-950'
}

function ToolsPage() {
  const [search, setSearch] = useState('')
  const [country, setCountry] = useState('Indonesia')
  const [selectedTools, setSelectedTools] = useState<ToolOption[]>([])

  const scenario = useMemo(
    () => projectScenarios.find((item) => item.country === country) ?? projectScenarios[0],
    [country]
  )

  const toolRows = useMemo(() => toolScoringByProject[scenario.id] ?? [], [scenario.id])
  const availableTools = useMemo(() => toolRows.map((row) => row.tool), [toolRows])

  const filtered = mockTools.filter(
    (t) =>
      !search ||
      t.tool.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.bestWhen.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    setSelectedTools((current) => {
      const next = current.filter((tool) => availableTools.includes(tool))
      if (next.length > 0) return next

      return availableTools
    })
  }, [availableTools])

  const selectedRows = useMemo(
    () => selectedTools
      .map((tool) => toolRows.find((row) => row.tool === tool))
      .filter((row): row is ToolScoreRow => Boolean(row)),
    [selectedTools, toolRows]
  )

  const scoreCards = useMemo(
    () => criterionAccessors.map((criterion) => {
      const scores = selectedRows.map((row) => row[criterion.key] as number)
      const average = scores.length > 0
        ? scores.reduce((sum, value) => sum + value, 0) / scores.length
        : 0

      return {
        label: criterion.label,
        score: average,
      }
    }),
    [selectedRows]
  )

  const radarData = useMemo(
    () => ({
      labels: toolCriteria,
      datasets: selectedRows.map((row, index) => ({
        label: row.tool,
        data: criterionAccessors.map((criterion) => row[criterion.key] as number),
        borderWidth: 2,
        ...chartPalette[index % chartPalette.length],
      })),
    }),
    [selectedRows]
  )

  const handleToolToggle = (tool: ToolOption) => {
    setSelectedTools((current) => {
      if (current.includes(tool)) {
        if (current.length === 1) return current
        return current.filter((item) => item !== tool)
      }

      return [...current, tool]
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Blended Finance Description</h1>
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
              {projectScenarios.map((item) => (
                <option key={item.id} value={item.country}>{item.country}</option>
              ))}
            </select>
          </label>

          <div className="flex min-w-[320px] flex-col gap-1">
            <span className="text-xs font-semibold text-gray-500">Tools to compare on the radar chart</span>
            <div className="flex flex-wrap gap-2">
              {availableTools.map((tool) => {
                const checked = selectedTools.includes(tool)

                return (
                  <label
                    key={tool}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-sm transition ${
                      checked
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-600'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleToolToggle(tool)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{tool}</span>
                  </label>
                )
              })}
            </div>
            <p className="text-xs text-gray-500">Select any number of tools to compare on the same radar chart.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-gray-700">Project Tool Comparison Radar (1–10)</h2>
            <p className="text-xs text-gray-500 mt-1">{scenario.projectName}</p>
          </div>
          {selectedRows.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedRows.map((row) => (
                <span key={row.tool} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
                  {row.tool} · Avg {row.averageScore.toFixed(1)}
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
              <p className="text-xs text-slate-500 mt-1">Same underlying `toolScoringByProject` values, shown as a quick scan table.</p>
            </div>
            <p className="text-xs text-slate-500">Higher scores are greener.</p>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-2 text-sm">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Tool</th>
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
                  <tr key={row.tool}>
                    <th className="rounded-xl bg-white px-3 py-3 text-left font-medium text-slate-700 shadow-sm">
                      {row.tool}
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

      {/* <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        {scoreCards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-700">{card.label}</p>
            <p className="text-4xl font-bold text-slate-900 mt-2">{card.score.toFixed(1)} / 10</p>
            <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full rounded-full bg-blue-500" style={{ width: `${card.score * 10}%` }} />
            </div>
          </article>
        ))}
      </section> */}

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
