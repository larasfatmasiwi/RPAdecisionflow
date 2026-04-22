import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Globe, Briefcase, Building2, AlertTriangle, Wrench, TrendingUp } from 'lucide-react'
import { KpiCard } from '@/components/ui/KpiCard'
import { ChartCard } from '@/components/ui/ChartCard'
import {
  mockCases,
  mockBarriers,
  mockIntermediaries,
  mockTools,
  mockExpansionOptions,
  mockExpansionRecommendations,
} from '@/data/mockData'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

export const Route = createFileRoute('/')({
  component: OverviewPage,
})

const CHART_COLORS = [
  'rgba(59,130,246,0.8)',
  'rgba(16,185,129,0.8)',
  'rgba(245,158,11,0.8)',
  'rgba(139,92,246,0.8)',
  'rgba(239,68,68,0.8)',
  'rgba(236,72,153,0.8)',
  'rgba(20,184,166,0.8)',
]

function countBy<T>(arr: T[], key: (item: T) => string): [string, number][] {
  const map: Record<string, number> = {}
  arr.forEach((item) => {
    const k = key(item)
    map[k] = (map[k] ?? 0) + 1
  })
  return Object.entries(map).sort((a, b) => b[1] - a[1])
}

function OverviewPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const barrierCounts = countBy(mockBarriers, (b) => b.primaryBarrier)
  const toolCounts = countBy(mockBarriers, (b) => b.recommendedTool)
  const stageCounts = countBy(mockBarriers, (b) => b.projectStage)
  const expansionCounts = countBy(mockExpansionRecommendations, (r) => r.recommendedModel)

  const barrierChart = {
    labels: barrierCounts.map(([k]) => k),
    datasets: [{
      label: 'Cases',
      data: barrierCounts.map(([, v]) => v),
      backgroundColor: CHART_COLORS,
      borderRadius: 6,
    }],
  }

  const toolChart = {
    labels: toolCounts.map(([k]) => k),
    datasets: [{
      data: toolCounts.map(([, v]) => v),
      backgroundColor: CHART_COLORS,
      borderWidth: 0,
    }],
  }

  const stageChart = {
    labels: stageCounts.map(([k]) => k),
    datasets: [{
      label: 'Cases',
      data: stageCounts.map(([, v]) => v),
      backgroundColor: 'rgba(59,130,246,0.7)',
      borderRadius: 6,
    }],
  }

  const expansionChart = {
    labels: expansionCounts.map(([k]) => k),
    datasets: [{
      data: expansionCounts.map(([, v]) => v),
      backgroundColor: CHART_COLORS.slice(2),
      borderWidth: 0,
    }],
  }

  const kpis = [
    {
      title: 'Countries Analyzed',
      value: mockCases.length,
      icon: <Globe className="w-5 h-5 text-white" />,
      color: 'bg-blue-600',
      subtitle: 'Across Africa, Asia & LatAm',
    },
    {
      title: 'Existing Projects',
      value: mockCases.length,
      icon: <Briefcase className="w-5 h-5 text-white" />,
      color: 'bg-emerald-600',
      subtitle: 'Active programs mapped',
    },
    {
      title: 'Intermediaries',
      value: mockIntermediaries.length,
      icon: <Building2 className="w-5 h-5 text-white" />,
      color: 'bg-violet-600',
      subtitle: `${mockIntermediaries.filter(i => i.relationshipStatus === 'Existing').length} existing relationships`,
    },
    {
      title: 'Barrier Categories',
      value: new Set(mockBarriers.map(b => b.primaryBarrier)).size,
      icon: <AlertTriangle className="w-5 h-5 text-white" />,
      color: 'bg-amber-500',
      subtitle: 'Unique barrier types diagnosed',
    },
    {
      title: 'Tool Recommendations',
      value: mockTools.length,
      icon: <Wrench className="w-5 h-5 text-white" />,
      color: 'bg-cyan-600',
      subtitle: 'Blended finance instruments',
    },
    {
      title: 'Expansion Models',
      value: mockExpansionOptions.length,
      icon: <TrendingUp className="w-5 h-5 text-white" />,
      color: 'bg-pink-600',
      subtitle: 'Global scale strategies',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Strategic Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Blended finance opportunity pipeline · {mockCases.length} active cases across{' '}
          {new Set(mockCases.map(c => c.country)).size} countries
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((k) => (
          <KpiCard key={k.title} {...k} />
        ))}
      </div>

      {/* Charts */}
      {mounted && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard title="Most Common Project Barriers" subtitle="Frequency across analyzed cases">
            <Bar
              data={barrierChart}
              options={{
                indexAxis: 'y',
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { x: { beginAtZero: true, ticks: { stepSize: 1 } } },
              }}
            />
          </ChartCard>

          <ChartCard title="Recommended Blended Finance Tools" subtitle="Distribution across diagnoses">
            <div className="max-w-sm mx-auto">
              <Doughnut
                data={toolChart}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                  },
                }}
              />
            </div>
          </ChartCard>

          <ChartCard title="Pipeline by Project Stage" subtitle="Cases by development readiness">
            <Bar
              data={stageChart}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
              }}
            />
          </ChartCard>

          <ChartCard title="Expansion Option Frequency" subtitle="Recommended global scale strategies">
            <div className="max-w-sm mx-auto">
              <Doughnut
                data={expansionChart}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 } } },
                  },
                }}
              />
            </div>
          </ChartCard>
        </div>
      )}

      {/* Top barriers summary */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-gray-900 mb-4">Most Common Barriers</h3>
        <div className="space-y-3">
          {barrierCounts.map(([barrier, count]) => (
            <div key={barrier} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700 font-medium">{barrier}</span>
                  <span className="text-xs text-gray-400">{count} case{count !== 1 ? 's' : ''}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(count / mockBarriers.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
