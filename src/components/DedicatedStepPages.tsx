import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ClipboardList, Network, ShieldAlert, CircleDollarSign, Globe2 } from 'lucide-react'
import { Radar } from 'react-chartjs-2'
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement, CategoryScale)

type Cell = string | number | boolean | null
type Rows = Cell[][]
const MANUAL_INPUT_STORAGE_KEY = 'rpaManualInputData'

type ManualRow = Record<string, string>
type ManualInputState = {
  projectName: string
  country: string
  tables: {
    step1: ManualRow[]
    step2: ManualRow[]
    step3: ManualRow[]
    financial: ManualRow[]
    tool: ManualRow[]
    regulatory: ManualRow[]
    expansion: ManualRow[]
  }
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
  data: ManualProjectData | ManualInputState['tables']
  savedSteps: Array<1 | 2 | 3 | 4 | 5>
}

type ManualProjectStore = {
  currentProjectId: string | null
  projects: ManualProject[]
  draft?: ManualInputState
}

const stepMeta = [
  { step: 1, sheet: 'Step 1', label: 'Development Challenge', path: '/decision-flow/step-1', icon: ClipboardList },
  { step: 2, sheet: 'Step 2', label: 'Intermediary Mapping', path: '/decision-flow/step-2', icon: Network },
  { step: 3, sheet: 'Step 3', label: 'Barrier Diagnosis', path: '/decision-flow/step-3', icon: ShieldAlert },
  { step: 4, sheet: 'Step 4', label: 'Blended Finance Tool', path: '/decision-flow/step-4', icon: CircleDollarSign },
  { step: 5, sheet: 'Step 5', label: 'Global Expansion Model', path: '/decision-flow/step-5', icon: Globe2 },
] as const

const step1Headers = [
  'SDG Goals/NDCs Target',
  'Country Challenges',
  'Background Information',
  'Existing Project',
  'Launch Year',
  'Size',
  'Project Description',
  'Development Rationale',
  'Expected Results',
  'Quality / Safeguards',
  'Sources',
]

const step2Headers = ['Intermediary', 'Intermediary Description', 'Intermediary Role', 'Sources']
const step3Headers = ['Project Stage', 'Barrier category', 'Description / Progress Evidence', 'Recommended Solutions / Diagnosis', 'Sources']

const financialHeaders = [
  'CAPEX/ Total Project Cost',
  'Committed Capital',
  'Funding Gap',
  'Revenue or Cost-Saving Source',
  'NPV',
  'IRR',
  'Payback Period',
  'DSCR',
  'Grant/Concessional Capital Required',
  'Capital Mobilization Ratio',
  'Financial Evidence Status',
]

const toolIndicators = [
  'Barrier fit',
  'Mobilization',
  'Financial additionality',
  'Development additionality',
  'Concessionality discipline',
  'Implementation feasibility',
  'Result/Impact measurability',
]

const toolHeaders = ['Tool', ...toolIndicators, 'Average score', 'Rank', 'Scoring notes']

const regulatoryHeaders = [
  'Regulatory assessment area',
  'Relevant regulation / authority',
  'Regulation No. / Year',
  'What RPA needs to check',
  'Why it matters for tool selection',
  'Tool implication',
  'Suggested RPA action',
  'Sources',
]

const expansionIndicators = ['Speed', 'Cost', 'Local Ownership', 'Scalability', 'Capacity Building', 'Regulatory Feasibility']
const expansionHeaders = ['Model', ...expansionIndicators, 'Average score', 'Rank', 'Scoring notes']

function Table({ rows }: { rows: Rows }) { return <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full min-w-[900px] border-collapse text-xs"><tbody>{rows.map((row, r) => <tr key={r} className={r === 0 || ['Country', 'Tool', 'Model', 'Project Stage'].includes(String(row[0])) ? 'bg-slate-100 font-bold text-slate-800' : 'border-t border-slate-200 align-top'}>{row.map((cell, c) => <td key={`${r}-${c}`} className="px-3 py-2 whitespace-pre-line text-slate-700">{String(cell ?? '')}</td>)}</tr>)}</tbody></table></div> }

function getManualInputData() {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(MANUAL_INPUT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ManualProjectStore & Partial<ManualInputState>
    if ('projects' in parsed) {
      const project = parsed.projects.find((item) => item.id === parsed.currentProjectId)
      if (!project) return null
      const tables = projectDataToTables(project.data)
      return {
        projectName: project.name,
        country: project.country,
        tables,
      } as ManualInputState
    }
    if ('tables' in parsed) return parsed as ManualInputState
    return null
  } catch {
    return null
  }
}

function projectDataToTables(data: ManualProjectData | ManualInputState['tables']): ManualInputState['tables'] {
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

function rowHasData(row: ManualRow, headers: readonly string[], ignoredHeaders: readonly string[] = []) {
  return headers.some((header) => !ignoredHeaders.includes(header) && String(row[header] ?? '').trim().length > 0)
}

function rowsFromManual(headers: readonly string[], rows: ManualRow[], ignoredHeaders: readonly string[] = []) {
  const populatedRows = rows.filter((row) => rowHasData(row, headers, ignoredHeaders))
  if (!populatedRows.length) return null
  return [headers, ...populatedRows.map((row) => headers.map((header) => row[header] ?? ''))] as Rows
}

function numericValue(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function averageScore(row: ManualRow, indicators: readonly string[]) {
  return indicators.reduce((sum, indicator) => sum + numericValue(row[indicator] ?? ''), 0) / indicators.length
}

function rankedManualRows(rows: ManualRow[], indicators: readonly string[]) {
  const rankMap = new Map<number, number>()
  rows
    .map((row, index) => ({ index, average: averageScore(row, indicators) }))
    .sort((a, b) => b.average - a.average)
    .forEach((item, rankIndex) => rankMap.set(item.index, rankIndex + 1))

  return rows.map((row, index) => ({
    ...row,
    'Average score': averageScore(row, indicators).toFixed(2),
    Rank: String(rankMap.get(index) ?? ''),
  }))
}

function scoreRowsHaveInput(rows: ManualRow[], indicators: readonly string[]) {
  return rows.some((row) => indicators.some((indicator) => String(row[indicator] ?? '').trim().length > 0))
}

function ManualScoreRadar({
  title,
  rows,
  nameColumn,
  indicators,
}: {
  title: string
  rows: ManualRow[]
  nameColumn: string
  indicators: readonly string[]
}) {
  const palettes = ['#2563eb', '#16a34a', '#f59e0b', '#ef4444', '#7c3aed', '#0891b2']
  const datasets = rows.map((row, index) => {
    const color = palettes[index % palettes.length]
    return {
      label: row[nameColumn] || `Row ${index + 1}`,
      data: indicators.map((indicator) => numericValue(row[indicator] ?? '')),
      borderColor: color,
      backgroundColor: `${color}33`,
    }
  })

  return <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5"><h3 className="text-sm font-bold text-slate-900">{title}</h3><div className="mt-4 h-[460px]"><Radar data={{ labels: indicators, datasets }} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { min: 0, max: 10 } } }} /></div></section>
}

function ManualHeatmapTable({
  rows,
  nameColumn,
  indicators,
}: {
  rows: ManualRow[]
  nameColumn: string
  indicators: readonly string[]
}) {
  const scoreClass = (value: number) => {
    if (value >= 9) return 'bg-emerald-700 text-white'
    if (value >= 7) return 'bg-emerald-500 text-white'
    if (value >= 5) return 'bg-amber-300 text-amber-950'
    if (value >= 4) return 'bg-orange-300 text-orange-950'
    if (value >= 2) return 'bg-rose-300 text-rose-950'
    return 'bg-rose-500 text-white'
  }

  return <div className="space-y-2"><p className="text-xs text-slate-600">0 = Not scored, 10 = High, 7+ = Best Fit.</p><div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[900px] text-xs"><thead><tr className="bg-slate-100"><th className="px-2 py-2 text-left">{nameColumn}</th>{indicators.map((indicator) => <th key={indicator} className="px-2 py-2 text-left">{indicator}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[nameColumn]} className="border-t"><td className="px-2 py-2 font-semibold">{row[nameColumn]}</td>{indicators.map((indicator) => { const value = numericValue(row[indicator] ?? ''); return <td key={indicator} className="px-2 py-2"><span className={`rounded px-2 py-1 ${scoreClass(value)}`}>{value}</span></td> })}</tr>)}</tbody></table></div></div>
}

function AssessmentTable({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly (readonly string[])[] }) {
 return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-bold text-slate-900">{title}</h2><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[1000px] text-xs"><thead><tr className="bg-slate-100">{headers.map((h)=><th key={h} className="px-3 py-2 text-left font-bold">{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i} className="border-t align-top">{r.map((c,j)=><td key={j} className="px-3 py-2 whitespace-pre-wrap">{c}</td>)}</tr>)}</tbody></table></div></section>
}

function EmptyStep() {
  return <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">No saved input data for this step yet.</section>
}

function DedicatedStepPage({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  const meta = stepMeta[step - 1]
  const manualInput = useMemo(() => getManualInputData(), [])
  const manualStepRows = step === 1 ? rowsFromManual(step1Headers, manualInput?.tables.step1 ?? []) : step === 2 ? rowsFromManual(step2Headers, manualInput?.tables.step2 ?? []) : step === 3 ? rowsFromManual(step3Headers, manualInput?.tables.step3 ?? []) : null

  const manualFinancialRows = rowsFromManual(financialHeaders, manualInput?.tables.financial ?? [])
  const manualRegulatoryRows = rowsFromManual(regulatoryHeaders, manualInput?.tables.regulatory ?? [])
  const manualToolRows = rankedManualRows(manualInput?.tables.tool ?? [], toolIndicators)
  const manualExpansionRows = rankedManualRows(manualInput?.tables.expansion ?? [], expansionIndicators)
  const hasManualToolScores = scoreRowsHaveInput(manualInput?.tables.tool ?? [], toolIndicators)
  const hasManualExpansionScores = scoreRowsHaveInput(manualInput?.tables.expansion ?? [], expansionIndicators)
  const manualToolTableRows = hasManualToolScores ? rowsFromManual(toolHeaders, manualToolRows, ['Tool']) : null
  const manualExpansionTableRows = hasManualExpansionScores ? rowsFromManual(expansionHeaders, manualExpansionRows, ['Model']) : null
  const finAssessment = manualFinancialRows ? { headers: financialHeaders, rows: manualFinancialRows.slice(1).map((row) => row.map((cell) => String(cell ?? ''))) } : null
  const regAssessment = manualRegulatoryRows ? { headers: regulatoryHeaders, rows: manualRegulatoryRows.slice(1).map((row) => row.map((cell) => String(cell ?? ''))) } : null
  const projectLabel = manualInput?.projectName?.trim() ? `${manualInput.country} : ${manualInput.projectName.trim()}` : 'No project selected'
  const countryLabel = manualInput?.country ?? '-'

  return <div className="space-y-5 pb-8"><header className="rounded-2xl bg-gradient-to-r from-[#06264a] via-[#0b3566] to-[#0f766e] p-5 text-white"><span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">Manual Input Data</span><h1 className="mt-2 text-2xl font-bold">{meta.sheet} — {meta.label}</h1><p className="text-sm text-blue-100">{projectLabel}</p><p className="text-sm text-blue-100">Selected country: {countryLabel}</p></header>{step === 4 && finAssessment ? <AssessmentTable title="Financial Feasibility Assessment" headers={finAssessment.headers} rows={finAssessment.rows} /> : null}{step === 5 && regAssessment ? <AssessmentTable title="Regulatory Assessment" headers={regAssessment.headers} rows={regAssessment.rows} /> : null}<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-bold text-slate-900">{step === 4 ? 'Blended Finance Tool' : step === 5 ? 'Global Expansion Model' : `${meta.sheet} Input Data`}</h2><div className="mt-3">{step === 4 ? (manualToolTableRows ? <><Table rows={manualToolTableRows} /><div className="mt-4"><ManualHeatmapTable rows={manualToolRows} nameColumn="Tool" indicators={toolIndicators} /></div></> : <EmptyStep />) : step === 5 ? (manualExpansionTableRows ? <><Table rows={manualExpansionTableRows} /><div className="mt-4"><ManualHeatmapTable rows={manualExpansionRows} nameColumn="Model" indicators={expansionIndicators} /></div></> : <EmptyStep />) : manualStepRows ? <Table rows={manualStepRows} /> : <EmptyStep />}</div></section>{step === 4 && hasManualToolScores ? <ManualScoreRadar title="Tool scoring radar" rows={manualToolRows} nameColumn="Tool" indicators={toolIndicators} /> : null}{step === 5 && hasManualExpansionScores ? <ManualScoreRadar title="Expansion model scoring radar" rows={manualExpansionRows} nameColumn="Model" indicators={expansionIndicators} /> : null}<div className="flex justify-between gap-3">{step > 1 ? <Link to={`/decision-flow/step-${step - 1}`} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">Previous step</Link> : <span />}{step < 5 ? <Link to={`/decision-flow/step-${step + 1}`} className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">Continue to Step {step + 1}<ArrowRight className="h-4 w-4" /></Link> : <Link to="/final-report" className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">View Final Report<ArrowRight className="h-4 w-4" /></Link>}</div></div>
}

export function DedicatedStep1Page() { return <DedicatedStepPage step={1} /> }
export function DedicatedStep2Page() { return <DedicatedStepPage step={2} /> }
export function DedicatedStep3Page() { return <DedicatedStepPage step={3} /> }
export function DedicatedStep4Page() { return <DedicatedStepPage step={4} /> }
export function DedicatedStep5Page() { return <DedicatedStepPage step={5} /> }
