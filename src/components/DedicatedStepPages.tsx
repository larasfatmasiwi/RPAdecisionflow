import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ClipboardList, Network, ShieldAlert, CircleDollarSign, Globe2 } from 'lucide-react'
import { Radar } from 'react-chartjs-2'
import { ArcElement, CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js'
import { countryProfiles, expansionScoringByProject, projectScenarios, toolScoringByProject } from '@/data/decisionFlowDataset'
import { financialFeasibilityAssessment, regulatoryAssessmentColumns, regulatoryAssessmentRows } from '@/data/assessmentInputs'

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
  const palettes = ['#2563eb', '#16a34a', '#f59e0b', '#ef4444', '#7c3aed']
  const datasets = rows.map((r, idx) => {
    const data = step === 4
      ? [r.barrierFit, r.mobilizationPotential, r.financialAdditionality, r.developmentAdditionality, r.concessionalityDiscipline, r.implementationFeasibility, r.impactMeasurability]
      : [r.speed, r.cost, r.localOwnership, r.scalability, r.capacityBuilding, r.regulatoryFeasibility]
    const color = palettes[idx % palettes.length]
    return { label: step === 4 ? r.tool : r.model, data, borderColor: color, backgroundColor: `${color}33` }
  })
  return <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5"><h3 className="text-sm font-bold text-slate-900">{step === 4 ? 'Tool scoring radar (click legend once to hide/show)' : 'Expansion model scoring radar (click legend once to hide/show)'}</h3><div className="mt-4 h-[460px]"><Radar data={{ labels, datasets }} options={{ responsive: true, maintainAspectRatio: false, scales: { r: { min: 1, max: 10 } } }} /></div></section>
}


function HeatmapTable({ rows, step }: { rows: Array<Record<string, number | string>>; step: 4 | 5 }) {
  const cols = step === 4 ? ['barrierFit','mobilizationPotential','financialAdditionality','developmentAdditionality','concessionalityDiscipline','implementationFeasibility','impactMeasurability'] : ['speed','cost','localOwnership','scalability','capacityBuilding','regulatoryFeasibility']
  const nameKey = step === 4 ? 'tool' : 'model'
  const label = step === 4 ? 'Tool' : 'Model'
  const scoreClass = (v: number) => {
    if (v >= 9) return 'bg-emerald-700 text-white'
    if (v >= 7) return 'bg-emerald-500 text-white'
    if (v >= 5) return 'bg-amber-300 text-amber-950'
    if (v >= 4) return 'bg-orange-300 text-orange-950'
    if (v >= 2) return 'bg-rose-300 text-rose-950'
    return 'bg-rose-500 text-white'
  }
  return <div className="space-y-2"><p className="text-xs text-slate-600">1 = Low, 10 = High, 7+ = Best Fit.</p><div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[900px] text-xs"><thead><tr className="bg-slate-100"><th className="px-2 py-2 text-left">{label}</th>{cols.map((c)=><th key={c} className="px-2 py-2 text-left">{c}</th>)}</tr></thead><tbody>{rows.map((r)=><tr key={String(r[nameKey])} className="border-t"><td className="px-2 py-2 font-semibold">{String(r[nameKey])}</td>{cols.map((c)=>{const v=Number(r[c] ?? 0);return <td key={c} className="px-2 py-2"><span className={`rounded px-2 py-1 ${scoreClass(v)}`}>{v}</span></td>})}</tr>)}</tbody></table></div></div>
}


function assessmentFromWorkbook(sheet: string, fallbackHeaders: readonly string[], fallbackRows: readonly (readonly string[])[]) {
  const rows = uploadedRows(sheet)
  if (!rows || rows.length < 2) return { headers: fallbackHeaders, rows: fallbackRows }
  return { headers: rows[0].map((c) => String(c)) as string[], rows: rows.slice(1).map((r) => r.map((c) => String(c ?? ''))) as string[][] }
}

function AssessmentTable({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly (readonly string[])[] }) {
 return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-bold text-slate-900">{title}</h2><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[1000px] text-xs"><thead><tr className="bg-slate-100">{headers.map((h)=><th key={h} className="px-3 py-2 text-left font-bold">{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i} className="border-t align-top">{r.map((c,j)=><td key={j} className="px-3 py-2 whitespace-pre-wrap">{c}</td>)}</tr>)}</tbody></table></div></section>
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

  const finAssessment = assessmentFromWorkbook('Financial Feasibility Assessment', financialFeasibilityAssessment.columns, financialFeasibilityAssessment.rows)
  const regAssessment = assessmentFromWorkbook('Regulatory Assessment', regulatoryAssessmentColumns, regulatoryAssessmentRows)

  return <div className="space-y-5 pb-8"><header className="rounded-2xl bg-gradient-to-r from-[#06264a] via-[#0b3566] to-[#0f766e] p-5 text-white"><span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase">Excel {meta.sheet}</span><h1 className="mt-2 text-2xl font-bold">{meta.sheet} — {meta.label}</h1><p className="text-sm text-blue-100">Selected country: {selectedScenario.country}</p></header>{step === 4 ? <AssessmentTable title="Financial Feasibility Assessment" headers={finAssessment.headers} rows={finAssessment.rows} /> : null}{step === 5 ? <AssessmentTable title="Regulatory Assessment" headers={regAssessment.headers} rows={regAssessment.rows} /> : null}<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-sm font-bold text-slate-900">Worksheet Content from {meta.sheet}</h2><div className="mt-3">{step === 4 ? <HeatmapTable step={4} rows={toolRows as any} /> : step === 5 ? <HeatmapTable step={5} rows={expansionRows as any} /> : <Table rows={rows} />}</div></section>{step === 4 ? <ScoreRadar step={4} scenarioId={selectedScenario.id} /> : null}{step === 5 ? <ScoreRadar step={5} scenarioId={selectedScenario.id} /> : null}<div className="flex justify-between gap-3">{step > 1 ? <Link to={`/decision-flow/step-${step - 1}`} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">Previous step</Link> : <span />}{step < 5 ? <Link to={`/decision-flow/step-${step + 1}`} className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">Continue to Step {step + 1}<ArrowRight className="h-4 w-4" /></Link> : <Link to="/final-report" className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">View Final Report<ArrowRight className="h-4 w-4" /></Link>}</div></div>
}

export function DedicatedStep1Page() { return <DedicatedStepPage step={1} /> }
export function DedicatedStep2Page() { return <DedicatedStepPage step={2} /> }
export function DedicatedStep3Page() { return <DedicatedStepPage step={3} /> }
export function DedicatedStep4Page() { return <DedicatedStepPage step={4} /> }
export function DedicatedStep5Page() { return <DedicatedStepPage step={5} /> }
