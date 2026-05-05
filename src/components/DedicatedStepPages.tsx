import { Link } from '@tanstack/react-router'
import { ArrowRight, ClipboardList, Network, ShieldAlert, CircleDollarSign, Globe2 } from 'lucide-react'
import {
  countryProfiles,
  expansionScoringByProject,
  projectScenarios,
  toolScoringByProject,
} from '@/data/decisionFlowDataset'

type Cell = string | number | boolean | null
type Rows = Cell[][]
const STORAGE_KEY = 'rpaUploadedWorkbookSheets'

const scenario = projectScenarios[0]
const profile = countryProfiles.find((item) => item.country === scenario.country)
const toolRows = toolScoringByProject[scenario.id] ?? []
const expansionRows = expansionScoringByProject[scenario.id] ?? []

const stepMeta = [
  { step: 1, sheet: 'Step 1', label: 'Development Challenge', path: '/decision-flow/step-1', icon: ClipboardList },
  { step: 2, sheet: 'Step 2', label: 'Intermediary Mapping', path: '/decision-flow/step-2', icon: Network },
  { step: 3, sheet: 'Step 3', label: 'Barrier Diagnosis', path: '/decision-flow/step-3', icon: ShieldAlert },
  { step: 4, sheet: 'Step 4', label: 'Blended Finance Tool', path: '/decision-flow/step-4', icon: CircleDollarSign },
  { step: 5, sheet: 'Step 5', label: 'Global Expansion Model', path: '/decision-flow/step-5', icon: Globe2 },
] as const

const defaultStep2Rows: Rows = [
  ['Identify the organizations, institutions, and actors already working on the challenge in the target country. This step helps clarify the existing ecosystem, understand who is doing what, and assess which intermediaries may be relevant for partnership, learning, or future engagement by RPA.'],
  ['Worksheet for Step 2'],
  ['Country', 'Project Context', 'Intermediary', 'Intermediary Description', 'Intermediary Role', 'Sources'],
  ['Enter the country as in Step 1', 'List current project, policy, or initiative already responding to the issue', 'Name the organization or actor already involved', 'Briefly describe the intermediary and its type', 'Explain what the intermediary is currently doing', 'Provide credible references'],
  ['Japan', 'Toyota City Zutto Genki Project', 'Dream Incubator (DI)', 'Japanese strategy and business-investment firm that promoted Social Impact Bonds in Japan.', 'Helped structure the Toyota City SIB model and explain the care-prevention objective.', 'Dream Incubator SIB reports'],
  ['Japan', 'Toyota City Zutto Genki Project', 'Next Rise Social Impact Action LLC (NRS)', 'Operating entity contracted by Toyota City to operate and promote services.', 'Implementation intermediary and service-provider selector.', 'Dream Incubator SIB report'],
  ['Japan', 'Toyota City Zutto Genki Project', 'JAGES', 'Research and evaluation body used as part of evidence and impact measurement.', 'Evidence and evaluation intermediary.', 'Toyota City public materials'],
  ['Indonesia', 'Pandanduri Mini Hydro Power Plant', 'PT Sarana Multi Infrastruktur (PT SMI)', 'Indonesian state-owned development financing institution and anchor of SDG Indonesia One.', 'Primary platform intermediary for blended finance, project development, and financing facilities.', 'PT SMI disclosures and annual report'],
  ['Indonesia', 'Pandanduri Mini Hydro Power Plant', 'MENTARI', 'UK-funded clean-energy support programme in Indonesia.', 'Catalytic grant and de-risking intermediary for small renewable-energy bankability barriers.', 'MENTARI programme materials'],
  ['Indonesia', 'Pandanduri Mini Hydro Power Plant', 'EU support to SDG Indonesia One', 'EU support to PT SMI through grants and technical assistance for project preparation.', 'Project-preparation and bankability intermediary.', 'EU Delegation materials'],
]

function uploadedRows(sheet: string): Rows | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { sheets?: Record<string, Rows> }
    return parsed.sheets?.[sheet] ?? null
  } catch {
    return null
  }
}

function fallbackRows(step: number): Rows {
  if (step === 1) {
    return [
      ['Country', 'SDG Goals/NDCs Target', 'Country Challenges', 'Background Information', 'Existing Project', 'Development Rationale', 'Expected Results', 'Quality / Safeguards', 'Sources'],
      [scenario.country, profile?.sdgTarget ?? '', profile?.challenge ?? '', profile?.background.join('\n') ?? '', scenario.projectName, profile?.developmentRationale.join('\n') ?? '', profile?.expectedResults.join('\n') ?? '', profile?.safeguards.join('\n') ?? '', profile?.sources.join('\n') ?? ''],
    ]
  }
  if (step === 2) return defaultStep2Rows
  if (step === 3) {
    return [
      ['Project Stage', 'Barrier Category', 'Description / Evidence', 'Recommended Solution / Diagnosis', 'Sources'],
      [scenario.stageDiagnosis, scenario.primaryBarrier, scenario.projectSummary, scenario.diagnosisNarrative, scenario.secondaryRisks.join('\n')],
    ]
  }
  if (step === 4) {
    return [
      ['Tool', 'Barrier fit', 'Mobilization', 'Financial add.', 'Development add.', 'Concessionality', 'Implementation', 'Impact', 'Average', 'Rank', 'Scoring notes'],
      ...toolRows.map((item) => [item.tool, item.barrierFit, item.mobilizationPotential, item.financialAdditionality, item.developmentAdditionality, item.concessionalityDiscipline, item.implementationFeasibility, item.impactMeasurability, item.averageScore, item.rank, item.notes]),
    ]
  }
  return [
    ['Model', 'Speed', 'Cost', 'Local Ownership', 'Scalability', 'Capacity Building', 'Regulatory Feasibility', 'Average score', 'Rank', 'Scoring notes'],
    ...expansionRows.map((item) => [item.model, item.speed, item.cost, item.localOwnership, item.scalability, item.capacityBuilding, item.regulatoryFeasibility, item.averageScore, item.rank, item.notes]),
  ]
}

function Table({ rows }: { rows: Rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[900px] border-collapse text-xs">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex === 0 || row[0] === 'Country' || row[0] === 'Tool' || row[0] === 'Model' || row[0] === 'Project Stage' ? 'bg-slate-100 font-bold text-slate-800' : 'border-t border-slate-200 align-top'}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="px-3 py-2 whitespace-pre-line text-slate-700">{String(cell ?? '')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StepProgress({ activeStep }: { activeStep: number }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-2 lg:grid-cols-5">
        {stepMeta.map((item) => {
          const Icon = item.icon
          const active = item.step === activeStep
          return (
            <Link key={item.step} to={item.path} className={`rounded-xl border p-3 ${active ? 'border-blue-300 bg-blue-50 text-blue-900' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'}`}>
              <div className="flex items-center justify-between"><span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">{item.step}</span><Icon className="h-4 w-4" /></div>
              <p className="mt-2 text-xs font-semibold">{item.sheet}</p>
              <p className="text-sm font-bold">{item.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function DedicatedStepPage({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  const meta = stepMeta[step - 1]
  const rows = uploadedRows(meta.sheet) ?? fallbackRows(step)
  return (
    <div className="space-y-5 pb-8">
      <header className="space-y-2">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">Excel {meta.sheet}</span>
        <h1 className="text-2xl font-bold text-slate-950">{meta.sheet} — {meta.label}</h1>
        <p className="max-w-5xl text-sm leading-6 text-slate-600">This page is rendered by its own dedicated Step {step} component, so it will not display Step 1 content by mistake.</p>
      </header>
      <StepProgress activeStep={step} />
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold text-slate-900">Worksheet Content from {meta.sheet}</h2>
        <div className="mt-3"><Table rows={rows} /></div>
      </section>
      <div className="flex justify-between gap-3">
        {step > 1 ? <Link to={`/decision-flow/step-${step - 1}`} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">Previous step</Link> : <span />}
        {step < 5 ? <Link to={`/decision-flow/step-${step + 1}`} className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">Continue to Step {step + 1}<ArrowRight className="h-4 w-4" /></Link> : <Link to="/final-report" className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">View Final Report<ArrowRight className="h-4 w-4" /></Link>}
      </div>
    </div>
  )
}

export function DedicatedStep1Page() { return <DedicatedStepPage step={1} /> }
export function DedicatedStep2Page() { return <DedicatedStepPage step={2} /> }
export function DedicatedStep3Page() { return <DedicatedStepPage step={3} /> }
export function DedicatedStep4Page() { return <DedicatedStepPage step={4} /> }
export function DedicatedStep5Page() { return <DedicatedStepPage step={5} /> }
