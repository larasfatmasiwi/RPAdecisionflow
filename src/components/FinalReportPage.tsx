import { CircleDollarSign, FileText, Globe2, ShieldAlert, Sparkles } from 'lucide-react'

type ManualRow = Record<string, string>

type ManualTables = {
  step1: ManualRow[]
  step2: ManualRow[]
  step3: ManualRow[]
  financial: ManualRow[]
  tool: ManualRow[]
  regulatory: ManualRow[]
  expansion: ManualRow[]
}

type ManualProjectData = {
  step1: ManualRow[]
  step2: ManualRow[]
  step3: ManualRow[]
  step4: {
    financial: ManualRow[]
    tool: ManualRow[]
  }
  step5: {
    regulatory: ManualRow[]
    expansion: ManualRow[]
  }
}

type ManualProject = {
  id: string
  name: string
  country: string
  data: ManualProjectData | ManualTables
}

type ManualProjectStore = {
  currentProjectId: string | null
  projects: ManualProject[]
}

const STORAGE_KEY = 'rpaManualInputData'

const toolIndicators = [
  'Barrier fit',
  'Mobilization',
  'Financial additionality',
  'Development additionality',
  'Concessionality discipline',
  'Implementation feasibility',
  'Result/Impact measurability',
]

const expansionIndicators = ['Speed', 'Cost', 'Local Ownership', 'Scalability', 'Capacity Building', 'Regulatory Feasibility']

function projectDataToTables(data: ManualProjectData | ManualTables): ManualTables {
  if ('step4' in data && 'step5' in data) {
    return {
      step1: data.step1,
      step2: data.step2,
      step3: data.step3,
      financial: data.step4.financial,
      tool: data.step4.tool,
      regulatory: data.step5.regulatory,
      expansion: data.step5.expansion,
    }
  }
  return data
}

function getSelectedProject() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ManualProjectStore
    return parsed.projects.find((project) => project.id === parsed.currentProjectId) ?? null
  } catch {
    return null
  }
}

function numericValue(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function averageScore(row: ManualRow, indicators: readonly string[]) {
  return indicators.reduce((sum, indicator) => sum + numericValue(row[indicator] ?? ''), 0) / indicators.length
}

function topScoredRow(rows: ManualRow[], indicators: readonly string[], labelKey: string) {
  return rows
    .filter((row) => indicators.some((indicator) => String(row[indicator] ?? '').trim()))
    .map((row) => ({ label: row[labelKey] ?? '', average: averageScore(row, indicators), notes: row['Scoring notes'] ?? '' }))
    .sort((a, b) => b.average - a.average)[0]
}

function firstFilled(rows: ManualRow[], key: string) {
  return rows.map((row) => row[key]).find((value) => String(value ?? '').trim()) ?? ''
}

function hasAnyData(rows: ManualRow[]) {
  return rows.some((row) => Object.values(row).some((value) => String(value ?? '').trim()))
}

function MetricCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur">
      <Icon className="h-5 w-5 text-blue-100" />
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-blue-100">{label}</p>
      <p className="mt-1 text-lg font-bold leading-tight">{value || '-'}</p>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-sm">
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 whitespace-pre-line text-sm font-semibold text-slate-800">{value || '-'}</p>
    </div>
  )
}

function EmptyReport() {
  return (
    <div className="space-y-5 pb-8">
      <header className="space-y-2">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">Manual Input Data</span>
        <h1 className="text-2xl font-bold text-slate-950">Final Report</h1>
      </header>
      <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
        No saved project data yet.
      </section>
    </div>
  )
}

export function FinalReportPage() {
  const project = getSelectedProject()
  if (!project) return <EmptyReport />

  const tables = projectDataToTables(project.data)
  const topTool = topScoredRow(tables.tool, toolIndicators, 'Tool')
  const topExpansion = topScoredRow(tables.expansion, expansionIndicators, 'Model')
  const primaryBarrier = firstFilled(tables.step3, 'Barrier category')
  const executiveSummary = firstFilled(tables.step3, 'Description / Progress Evidence') || firstFilled(tables.step1, 'Background Information')
  const suggestedAction = firstFilled(tables.regulatory, 'Suggested RPA action') || firstFilled(tables.step3, 'Recommended Solutions / Diagnosis')
  const hasReportData = hasAnyData(tables.step1) || hasAnyData(tables.step2) || hasAnyData(tables.step3) || hasAnyData(tables.financial) || hasAnyData(tables.tool) || hasAnyData(tables.regulatory) || hasAnyData(tables.expansion)

  if (!hasReportData) return <EmptyReport />

  return (
    <div className="space-y-5 pb-8">
      <header className="space-y-2">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">Manual Input Data</span>
        <h1 className="text-2xl font-bold text-slate-950">Final Report</h1>
      </header>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#06264a] via-[#0b3566] to-[#0f766e] p-6 shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="max-w-4xl text-white">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Final recommendation memo</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight">{project.name}</h2>
            <p className="mt-3 text-sm leading-6 text-blue-50">{executiveSummary || 'No executive summary data entered yet.'}</p>
          </div>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-4">
          <MetricCard label="Country" value={project.country} icon={Globe2} />
          <MetricCard label="Primary barrier" value={primaryBarrier} icon={ShieldAlert} />
          <MetricCard label="Finance tool" value={topTool ? `${topTool.label} - ${topTool.average.toFixed(2)}` : ''} icon={CircleDollarSign} />
          <MetricCard label="Expansion model" value={topExpansion ? `${topExpansion.label} - ${topExpansion.average.toFixed(2)}` : ''} icon={Sparkles} />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card title="Executive Summary">
          <p>{executiveSummary || '-'}</p>
        </Card>
        <Card title="Data Source">
          <Field label="Project" value={`${project.country} : ${project.name}`} />
          <Field label="Source" value="Saved manual input data" />
        </Card>
      </section>

      <Card title="5-Step Summary Timeline">
        <div className="grid gap-3 lg:grid-cols-5">
          {[
            ['Step 1', 'Development Challenge', firstFilled(tables.step1, 'Country Challenges')],
            ['Step 2', 'Intermediary Mapping', firstFilled(tables.step2, 'Intermediary')],
            ['Step 3', 'Barrier Diagnosis', primaryBarrier],
            ['Step 4', 'Finance Tool', topTool?.label ?? ''],
            ['Step 5', 'Expansion Model', topExpansion?.label ?? ''],
          ].map(([step, title, summary]) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <FileText className="h-5 w-5 text-blue-700" />
              <p className="mt-3 text-xs font-bold uppercase text-slate-500">{step}</p>
              <h3 className="font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{summary || '-'}</p>
            </div>
          ))}
        </div>
      </Card>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card title="Evidence and Data Quality">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Financial evidence status" value={firstFilled(tables.financial, 'Financial Evidence Status')} />
            <Field label="Sources" value={firstFilled(tables.step1, 'Sources') || firstFilled(tables.regulatory, 'Sources')} />
          </div>
        </Card>
        <Card title="Suggested RPA Action">
          <Field label="Immediate next step" value={suggestedAction} />
        </Card>
      </section>
    </div>
  )
}
