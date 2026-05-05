import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ClipboardList, Network, ShieldAlert, CircleDollarSign, Globe2 } from 'lucide-react'
import { Radar } from 'react-chartjs-2'
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js'
import { countryProfiles, expansionScoringByProject, projectScenarios, toolScoringByProject } from '@/data/decisionFlowDataset'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement, CategoryScale)

type Cell = string | number | boolean | null
type Rows = Cell[][]
const STORAGE_KEY = 'rpaUploadedWorkbookSheets'
const PROJECT_KEY = 'rpaSelectedProjectId'

const stepMeta = [
  { step: 1, sheet: 'Step 1', label: 'Development Challenge', path: '/decision-flow/step-1', icon: ClipboardList },
  { step: 2, sheet: 'Step 2', label: 'Intermediary Mapping', path: '/decision-flow/step-2', icon: Network },
  { step: 3, sheet: 'Step 3', label: 'Barrier Diagnosis', path: '/decision-flow/step-3', icon: ShieldAlert },
  { step: 4, sheet: 'Step 4', label: 'Blended Finance Tool', path: '/decision-flow/step-4', icon: CircleDollarSign },
  { step: 5, sheet: 'Step 5', label: 'Global Expansion Model', path: '/decision-flow/step-5', icon: Globe2 },
] as const

function getSelectedScenario() {
  if (typeof window === 'undefined') return projectScenarios[0]
  const selectedProjectId = localStorage.getItem(PROJECT_KEY)
  return projectScenarios.find((item) => item.id === selectedProjectId) ?? projectScenarios[0]
}

function uploadedRows(sheet: string): Rows | null { try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? (JSON.parse(raw) as { sheets?: Record<string, Rows> }).sheets?.[sheet] ?? null : null } catch { return null } }
function filterRowsByCountry(rows: Rows, country: string): Rows { const i = rows.findIndex((r) => String(r[0] ?? '').trim().toLowerCase() === 'country'); if (i < 0) return rows; const top = rows.slice(0, i + 1); const filtered = rows.slice(i + 1).filter((r) => String(r[0] ?? '').trim().toLowerCase() === country.toLowerCase()); return [...top, ...filtered] }

function Table({ rows }: { rows: Rows }) { return <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white"><table className="w-full min-w-[900px] border-collapse text-xs"><tbody>{rows.map((row, r) => <tr key={r} className={r === 0 || ['Country', 'Tool', 'Model', 'Project Stage'].includes(String(row[0])) ? 'bg-slate-100 font-bold text-slate-800' : 'border-t border-slate-200 align-top'}>{row.map((cell, c) => <td key={`${r}-${c}`} className="px-3 py-2 whitespace-pre-line text-slate-700">{String(cell ?? '')}</td>)}</tr>)}</tbody></table></div> }

function ScoreRadar({ step, scenarioId }: { step: 4 | 5; scenarioId: string }) {
  const rows = step === 4 ? toolScoringByProject[scenarioId] ?? [] : expansionScoringByProject[scenarioId] ?? []
  const labels = step === 4 ? ['Barrier fit', 'Mobilization', 'Financial add.', 'Development add.', 'Concessionality', 'Implementation', 'Impact'] : ['Speed', 'Cost', 'Local ownership', 'Scalability', 'Capacity', 'Regulatory']
  const names = rows.map((r) => step === 4 ? r.tool : r.model)
  const [selected, setSelected] = useState<string[]>(names)
  const palettes = ['#2563eb', '#16a34a', '#f59e0b', '#ef4444', '#7c3aed']
  const shown = rows.filter((r) => selected.includes(step === 4 ? r.tool : r.model))
  const datasets = shown.map((r, idx) => {
    const data = step === 4
      ? [r.barrierFit, r.mobilizationPotential, r.financialAdditionality, r.developmentAdditionality, r.concessionalityDiscipline, r.implementationFeasibility, r.impactMeasurability]
      : [r.speed, r.cost, r.localOwnership, r.scalability, r.capacityBuilding, r.regulatoryFeasibility]
    const color = palettes[idx % palettes.length]
    return { label: step === 4 ? r.tool : r.model, data, borderColor: color, backgroundColor: `${color}33` }
  })
  return <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5"><h3 className="text-sm font-bold text-slate-900">{step === 4 ? 'Tool scoring radar' : 'Expansion model scoring radar'}</h3><div className="mt-2 flex flex-wrap gap-3">{names.map((name) => <label key={name} className="text-xs"><input type="checkbox" checked={selected.includes(name)} onChange={() => setSelected((prev) => prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name])} className="mr-1" />{name}</label>)}</div><div className="mt-4 h-[340px]"><Radar data={{ labels, datasets }} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { min: 0, max: 5 } } }} /></div></section>
}

function DedicatedStepPage({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  const meta = stepMeta[step - 1]
  const selectedScenario = useMemo(() => getSelectedScenario(), [])
  const profile = countryProfiles.find((item) => item.country === selectedScenario.country)
  const toolRows = toolScoringByProject[selectedScenario.id] ?? []
  const expansionRows = expansionScoringByProject[selectedScenario.id] ?? []
  const fallback: Rows = step === 1 ? [['Country','SDG Goals/NDCs Target','Country Challenges'], [selectedScenario.country, profile?.sdgTarget ?? '', profile?.challenge ?? '']] : step === 2 ? [['Country','Project Context','Intermediary'], ['Japan','Toyota City','Dream Incubator'], ['Indonesia','Pandanduri','PT SMI']] : step === 3 ? [['Project Stage','Barrier Category','Description / Evidence'], [selectedScenario.stageDiagnosis, selectedScenario.primaryBarrier, selectedScenario.projectSummary]] : step === 4 ? [['Tool','Barrier fit','Mobilization','Financial add.','Development add.','Concessionality','Implementation','Impact'], ...toolRows.map((i)=>[i.tool,i.barrierFit,i.mobilizationPotential,i.financialAdditionality,i.developmentAdditionality,i.concessionalityDiscipline,i.implementationFeasibility,i.impactMeasurability])] : [['Model','Speed','Cost','Local Ownership','Scalability','Capacity Building','Regulatory Feasibility'], ...expansionRows.map((i)=>[i.model,i.speed,i.cost,i.localOwnership,i.scalability,i.capacityBuilding,i.regulatoryFeasibility])]
  const uploaded = uploadedRows(meta.sheet)
  const rows = uploaded ? filterRowsByCountry(uploaded, selectedScenario.country) : fallback

  return <div className="space-y-5 pb-8"><header className="rounded-2xl bg-gradient-to-r from-[#06264a] via-[#0b3566] to-[#0f766e] p-5 text-white"><span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">Excel {meta.sheet}</span><h1 className="mt-2 text-2xl font-bold">{meta.sheet} — {meta.label}</h1><p className="text-sm text-blue-100">Selected country: {selectedScenario.country}</p></header><section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-bold text-slate-900">Worksheet Content from {meta.sheet}</h2><div className="mt-3"><Table rows={rows} /></div></section>{step === 4 ? <ScoreRadar step={4} scenarioId={selectedScenario.id} /> : null}{step === 5 ? <ScoreRadar step={5} scenarioId={selectedScenario.id} /> : null}<div className="flex justify-between gap-3">{step > 1 ? <Link to={`/decision-flow/step-${step - 1}`} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">Previous step</Link> : <span />}{step < 5 ? <Link to={`/decision-flow/step-${step + 1}`} className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">Continue to Step {step + 1}<ArrowRight className="h-4 w-4" /></Link> : <Link to="/final-report" className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">View Final Report<ArrowRight className="h-4 w-4" /></Link>}</div></div>
}

export function DedicatedStep1Page() { return <DedicatedStepPage step={1} /> }
export function DedicatedStep2Page() { return <DedicatedStepPage step={2} /> }
export function DedicatedStep3Page() { return <DedicatedStepPage step={3} /> }
export function DedicatedStep4Page() { return <DedicatedStepPage step={4} /> }
export function DedicatedStep5Page() { return <DedicatedStepPage step={5} /> }
