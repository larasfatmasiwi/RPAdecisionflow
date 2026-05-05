import { useMemo, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Database,
  Download,
  FileText,
  Globe2,
  Network,
    ShieldAlert,
  Sparkles,
  Upload,
} from 'lucide-react'
import { financialFeasibilityAssessment, regulatoryAssessmentColumns, regulatoryAssessmentRows } from '@/data/assessmentInputs'
import {
  countryProfiles,
  expansionScoringByProject,
  intermediaryProfiles,
  projectScenarios,
  toolScoringByProject,
} from '@/data/decisionFlowDataset'

type SheetRows = Array<Array<string | number | boolean | null>>
type UploadedWorkbook = {
  fileName: string
  uploadedAt: string
  sheets: Record<string, SheetRows>
}

const STORAGE_KEY = 'rpaUploadedWorkbookSheets'
const PROJECT_KEY = 'rpaSelectedProjectId'

const stepMeta = [
  { step: 1, sheet: 'Step 1', label: 'Development Challenge', path: '/decision-flow/step-1', icon: ClipboardList },
  { step: 2, sheet: 'Step 2', label: 'Intermediary Mapping', path: '/decision-flow/step-2', icon: Network },
  { step: 3, sheet: 'Step 3', label: 'Barrier Diagnosis', path: '/decision-flow/step-3', icon: ShieldAlert },
  { step: 4, sheet: 'Step 4', label: 'Blended Finance Tool', path: '/decision-flow/step-4', icon: CircleDollarSign },
  { step: 5, sheet: 'Step 5', label: 'Global Expansion Model', path: '/decision-flow/step-5', icon: Globe2 },
] as const

const defaultStep2Rows: SheetRows = [
  ['Identify the organizations, institutions, and actors already working on the challenge in the target country. This step helps clarify the existing ecosystem, understand who is doing what, and assess which intermediaries may be relevant for partnership, learning, or future engagement by RPA.'],
  [''],
  ['Worksheet for Step 2'],
  ['Country', 'Project Context', 'Intermediary', 'Intermediary Description', 'Intermediary Role', 'Sources'],
  ['Enter the country as in Step 1', 'List any current project, policy, or initiative already responding to the issue referring to Step 1', 'Name the organization, institution, or actor already involved', 'Briefly describe the intermediary and its type, such as NGO, foundation, investor, government agency, incubator, DFI, or service provider', 'Explain what the intermediary is currently doing in relation to the project', 'Provide credible references for all key data, claims, and examples used in the row'],
  ['Japan', 'Toyota City’s “Zutto Genki! Project”', 'Dream Incubator (DI)', 'Japanese strategy and business-investment firm that has actively promoted Social Impact Bonds in Japan. DI states that it has been promoting SIBs as a mechanism to address social challenges and worked with Toyota City on the care-prevention SIB initiative.', 'DI helped structure the Toyota City SIB model. Its materials explain that the Toyota City project aimed to reduce the number of seniors requiring nursing care and to reduce future care costs through social-participation services.', 'https://www.dreamincubator.co.jp/wp/wp-content/uploads/2022/05/DIREPORT_SIB_EN.pdf\nhttps://www.dreamincubator.co.jp/wp-content/uploads/2021/01/210105_SIB_DI_Toyotacity_EN01.pdf'],
  ['Japan', 'Toyota City’s “Zutto Genki! Project”', 'Next Rise Social Impact Action LLC (NRS)', 'The operating entity in the Toyota City case. DI’s SIB materials state that Next Rise Social Impact Action LLC was contracted by Toyota City to operate and promote the social services under the project from July 1, 2021 to June 30, 2026.', 'NRS functions as the implementation intermediary. DI’s materials say Toyota City contracted NRS to run and promote the social-participation services and that service providers were selected by NRS.', 'https://www.dreamincubator.co.jp/wp/wp-content/uploads/2022/05/DIREPORT_SIB_EN.pdf'],
  ['Japan', 'Toyota City’s “Zutto Genki! Project”', 'JAGES (Japan Gerontological Evaluation Study)', 'A research and evaluation body used in the Toyota City case as part of the evidence and impact-measurement system. Toyota City’s materials link the project to academic evaluation and impact assessment.', 'JAGES serves as an evidence and evaluation intermediary. In practice, this kind of actor makes preventive-care projects more credible by helping measure whether participation actually changes care-risk and cost outcomes. Toyota City’s public materials explicitly present the project as a privately led preventive-care initiative using the SIB mechanism.', 'https://www.city.toyota.aichi.jp/_res/projects/default_project/_page_/001/054/238/r0710/01.pdf'],
  ['Indonesia', 'Pandanduri Mini Hydro Power Plant', 'PT Sarana Multi Infrastruktur (PT SMI)', 'Indonesian state-owned development financing institution and the anchor of SDG Indonesia One. PT SMI describes SDG Indonesia One as a blended-finance platform launched in 2018 that combines philanthropic, donor, bilateral, multilateral, banking, insurance, and other investor funds through development, de-risking, financing, and equity facilities. The Pandanduri Micro Hydro Power Plant (PLTMH Pandanduri) in East Lombok, West Nusa Tenggara, is a small-scale renewable energy project supported through a blended finance structure. Official PT SMI disclosures state that financing disbursed for Pandanduri amounted to IDR 9.6 billion, alongside a Viability Gap Fund (VGF) grant of IDR 2.6 billion. PT SMI’s case-study presentation further indicates a project cost of around IDR 17.3 billion, structured approximately as 55% PT SMI financing, 15% UK MENTARI grant, and 30% project sponsor contribution.', 'PT SMI is the primary platform intermediary in Indonesia. It does not just lend; it structures blended-finance transactions, supports project development, and manages different facilities under SDG Indonesia One. Pandanduri serves as a project-level demonstration of how catalytic grant funding can unlock debt financing for small renewable energy projects that face commercial feasibility constraints. PT SMI states that the project had been delayed for several years due to commercial feasibility issues, and that the VGF grant helped the project reach financial close and obtain a PT SMI loan. As of March 2025, construction progress had reached 97%, and the project was expected to generate 0.58 MW when operational. This makes Pandanduri a late-construction / near-operation example of SDG Indonesia One-style blended finance in practice.', 'https://www.ptsmi.co.id/cfind/source/files/annual-report/annual-report-pt-smi-2024.pdf\nhttps://www.ptsmi.co.id/uk-climate-minister-reviews-pandanduri-micro-hydroelectric-power-plant-appreciates-collaboration-with-pt-smi\nhttps://mentari.info/2023/03/29/uk-government-to-provide-idr-21-billion-through-mentari-programme-for-a-blended-finance-vehicle-with-pt-smi-to-three-hydropower-plants-in-indonesia/\nhttps://www.thkforum.org/wp-content/uploads/2025/07/Delano-Delo-250620-Tri-Hita-Kirana-GBFA-PT-SMI_s-Role-in-Supporting-the-Energy-Transition-in-Indonesia-CLEAN.pdf'],
  ['Indonesia', 'Pandanduri Mini Hydro Power Plant', 'MENTARI', 'UK-funded clean-energy support programme in Indonesia. Official materials state that MENTARI provided IDR 21 billion in grants to support three hydropower plants with 7 MW total capacity and IDR 210 billion total investment, specifically to improve financial viability and unlock PT SMI financing.', 'MENTARI functions as a catalytic grant/de-risking intermediary. Its role is not generic donor support; it is targeted at solving bankability barriers in small renewable-energy projects.', 'https://www.eeas.europa.eu/delegations/indonesia/sdg-indonesia-one_en\nhttps://mentari.info/2023/03/29/uk-government-to-provide-idr-21-billion-through-mentari-programme-for-a-blended-finance-vehicle-with-pt-smi-to-three-hydropower-plants-in-indonesia/'],
  ['Indonesia', 'Pandanduri Mini Hydro Power Plant', 'EU support to SDG Indonesia One', 'The EU Delegation states that its support to PT SMI under SDG Indonesia One included €2 million in grants to target project sponsors facing higher financial barriers and €3 million of technical assistance for project preparation and strategic capacity building at PT SMI, especially to increase the bankability of small renewable-energy projects.', 'The EU acts as a project-preparation and bankability intermediary, especially through grants plus TA. This is not the same as being the main lender; it is upstream support that helps projects become financeable.', 'https://www.eeas.europa.eu/delegations/indonesia/sdg-indonesia-one_en'],
]

function normalizeRows(rows: unknown[][]): SheetRows {
  return rows
    .map((row) => row.map((cell) => (cell == null ? '' : typeof cell === 'object' ? String(cell) : (cell as string | number | boolean))))
    .filter((row) => row.some((cell) => String(cell ?? '').trim() !== ''))
}

function getStoredWorkbook(): UploadedWorkbook | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as UploadedWorkbook) : null
  } catch {
    return null
  }
}

function useUploadedWorkbook() {
  const [workbook, setWorkbook] = useState<UploadedWorkbook | null>(() => getStoredWorkbook())
  const saveWorkbook = (nextWorkbook: UploadedWorkbook) => {
    const current = getStoredWorkbook()
    const merged: UploadedWorkbook = {
      fileName: nextWorkbook.fileName,
      uploadedAt: nextWorkbook.uploadedAt,
      sheets: { ...(current?.sheets ?? {}), ...nextWorkbook.sheets },
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    setWorkbook(merged)
  }
  return { workbook, saveWorkbook }
}

function useProjectSelection() {
  const [projectId, setProjectIdState] = useState(() => {
    if (typeof window === 'undefined') return projectScenarios[0]?.id ?? ''
    return localStorage.getItem(PROJECT_KEY) ?? projectScenarios[0]?.id ?? ''
  })
  const scenario = useMemo(() => projectScenarios.find((item) => item.id === projectId) ?? projectScenarios[0], [projectId])
  const profile = useMemo(() => countryProfiles.find((item) => item.country === scenario.country), [scenario.country])
  const intermediaries = useMemo(() => intermediaryProfiles.filter((item) => item.country === scenario.country), [scenario.country])
  const toolRows = toolScoringByProject[scenario.id] ?? []
  const expansionRows = expansionScoringByProject[scenario.id] ?? []
  const setProjectId = (value: string) => {
    setProjectIdState(value)
    if (typeof window !== 'undefined') localStorage.setItem(PROJECT_KEY, value)
  }
  return { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows }
}

function PageHeader({ badge, title, subtitle }: { badge?: string; title: string; subtitle: string }) {
  return (
    <header className="space-y-2">
      {badge ? <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">{badge}</span> : null}
      <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
      <p className="max-w-5xl text-sm leading-6 text-slate-600">{subtitle}</p>
    </header>
  )
}

function Card({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <article className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-slate-700">{children}</div>
    </article>
  )
}

function Field({ label, value, multiline = false }: { label: string; value: ReactNode; multiline?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <div className={`mt-1 text-sm text-slate-800 ${multiline ? 'leading-6 whitespace-pre-line' : 'font-semibold'}`}>{value}</div>
    </div>
  )
}

function ProjectSelector({ projectId, setProjectId }: { projectId: string; setProjectId: (value: string) => void }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="flex max-w-xl flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected project</span>
        <select value={projectId} onChange={(event) => setProjectId(event.target.value)} className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-800">
          {projectScenarios.map((item) => <option key={item.id} value={item.id}>{item.projectName}</option>)}
        </select>
      </label>
    </section>
  )
}


function filterRowsByCountry(rows: SheetRows, country: string): SheetRows {
  if (!rows.length) return rows
  const normalizedCountry = country.trim().toLowerCase()
  const countryHeaderIndex = rows.findIndex((row) => String(row[0] ?? '').trim().toLowerCase() === 'country')
  if (countryHeaderIndex === -1) return rows

  const prefaceRows = rows.slice(0, countryHeaderIndex)
  const headerRow = rows[countryHeaderIndex]
  const dataRows = rows.slice(countryHeaderIndex + 1)
  const filteredDataRows = dataRows.filter((row) => String(row[0] ?? '').trim().toLowerCase() === normalizedCountry)

  return filteredDataRows.length ? [...prefaceRows, headerRow, ...filteredDataRows] : [...prefaceRows, headerRow]
}
function MatrixTable({ rows, fallbackTitle }: { rows: SheetRows; fallbackTitle?: string }) {
  if (!rows.length) return <p className="text-sm text-slate-500">{fallbackTitle ?? 'No rows available yet.'}</p>
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[900px] border-collapse text-xs">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex === 0 || row[0] === 'Country' ? 'bg-slate-100 font-bold text-slate-700' : 'border-t border-slate-200 bg-white align-top'}>
              {row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`} className="px-3 py-2 text-slate-700 whitespace-pre-line">{String(cell ?? '')}</td>)}
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
          const isActive = item.step === activeStep
          const isDone = item.step < activeStep
          return (
            <Link key={item.step} to={item.path} className={`rounded-xl border p-3 transition-colors ${isActive ? 'border-blue-300 bg-blue-50 text-blue-900' : isDone ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'}`}>
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">{isDone ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : item.step}</span>
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-2 text-xs font-semibold">{item.sheet}</p>
              <p className="text-sm font-bold">{item.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function fallbackRowsForStep(step: 1 | 2 | 3 | 4 | 5, data: ReturnType<typeof useProjectSelection>): SheetRows {
  const { scenario, profile, toolRows, expansionRows } = data
  if (step === 1) {
    return [
      ['Country', 'SDG Goals/NDCs Target', 'Country Challenges', 'Background Information', 'Existing Project', 'Development Rationale', 'Expected Results', 'Quality / Safeguards', 'Sources'],
      [scenario.country, profile?.sdgTarget ?? '', profile?.challenge ?? '', profile?.background.join('\n') ?? '', scenario.projectName, profile?.developmentRationale.join('\n') ?? '', profile?.expectedResults.join('\n') ?? '', profile?.safeguards.join('\n') ?? '', profile?.sources.join('\n') ?? ''],
    ]
  }
  if (step === 2) return defaultStep2Rows
  if (step === 3) {
    return [
      ['Project Stage', 'Barrier category', 'Description / Progress Evidence', 'Recommended Solutions / Diagnosis', 'Sources'],
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

function downloadExcelTemplate() {
  const wb = XLSX.utils.book_new()
  stepMeta.forEach((item) => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(fallbackRowsForStep(item.step, useProjectSelectionPlaceholder)), item.sheet))
  XLSX.writeFile(wb, 'rpa-decision-flow-template.xlsx')
}

const useProjectSelectionPlaceholder = {
  scenario: projectScenarios[0],
  profile: countryProfiles.find((item) => item.country === projectScenarios[0].country),
  intermediaries: intermediaryProfiles.filter((item) => item.country === projectScenarios[0].country),
  toolRows: toolScoringByProject[projectScenarios[0].id] ?? [],
  expansionRows: expansionScoringByProject[projectScenarios[0].id] ?? [],
  projectId: projectScenarios[0].id,
  setProjectId: () => undefined,
}

function InputMethodCard({ icon: Icon, title, children, action, onClick }: { icon: ComponentType<{ className?: string }>; title: string; children: ReactNode; action: string; onClick: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon className="h-5 w-5" /></span>
        <div><h3 className="font-bold text-slate-950">{title}</h3><div className="mt-1 text-sm leading-6 text-slate-600">{children}</div></div>
      </div>
      <button onClick={onClick} className="mt-4 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-100">{action}</button>
    </div>
  )
}


function AssessmentPreview({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div><h3 className="mb-2 text-sm font-bold text-slate-900">{title}</h3><div className="overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[1000px] text-xs"><thead><tr className="bg-slate-100">{headers.map((h)=><th key={h} className="px-3 py-2 text-left font-bold">{h}</th>)}</tr></thead><tbody>{rows.map((r,i)=><tr key={i} className="border-t align-top">{r.map((c,j)=><td key={j} className="px-3 py-2 whitespace-pre-wrap">{c}</td>)}</tr>)}</tbody></table></div></div>
}
export function ExcelLinkedInputDataPage() {
  const data = useProjectSelection()
  const { projectId, setProjectId, scenario } = data
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { workbook, saveWorkbook } = useUploadedWorkbook()
  const [status, setStatus] = useState(workbook ? `Loaded ${workbook.fileName}` : 'No workbook uploaded yet.')

  const handleWorkbookUpload = async (file: File | undefined) => {
    if (!file) return
    const buffer = await file.arrayBuffer()
    const parsed = XLSX.read(buffer, { type: 'array' })
    const sheets: Record<string, SheetRows> = {}
    stepMeta.forEach((item) => {
      const sheetName = parsed.SheetNames.find((name) => name.trim().toLowerCase() === item.sheet.toLowerCase())
      if (sheetName) sheets[item.sheet] = normalizeRows(XLSX.utils.sheet_to_json(parsed.Sheets[sheetName], { header: 1, defval: '' }) as unknown[][])
    })
    const nextWorkbook = { fileName: file.name, uploadedAt: new Date().toISOString(), sheets }
    saveWorkbook(nextWorkbook)
    setStatus(`${file.name} linked successfully: ${Object.keys(sheets).join(', ') || 'no Step sheets detected'}`)
  }

  return (
    <div className="space-y-5 pb-8">
      <PageHeader badge="Master input layer" title="Input Data" subtitle="Upload Excel, type manual notes, or download the template. Uploaded Step sheets are now linked to the Step 1–5 dashboard pages through browser local storage." />
      <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
      <input ref={fileInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(event) => handleWorkbookUpload(event.target.files?.[0])} />
      <section className="grid gap-4 xl:grid-cols-3">
        <InputMethodCard icon={Upload} title="Upload Excel Workbook" action="Upload Excel Workbook" onClick={() => fileInputRef.current?.click()}>Upload either the full workbook or an individual Step workbook. The dashboard stores the uploaded Step sheet and updates the corresponding Step page.</InputMethodCard>
        <InputMethodCard icon={Download} title="Download Excel Template" action="Download Excel Template" onClick={downloadExcelTemplate}>Download a workbook template with Step 1–5 sheets that match the dashboard pages.</InputMethodCard>
      </section>
      <section className="grid gap-4 lg:grid-cols-[1fr_360px]"><Card title="Data Status"><div className="grid gap-3 md:grid-cols-4"><Field label="Selected project" value={scenario.projectName} /><Field label="Source type" value={workbook ? 'Uploaded workbook linked' : 'Static dataset'} /><Field label="Linked sheets" value={workbook ? Object.keys(workbook.sheets).join(', ') : 'None yet'} multiline /><Field label="Last action" value={status} multiline /></div></Card><Card title="Missing Data Warning" className="border-amber-200 bg-amber-50"><div className="flex gap-3 text-amber-900"><AlertTriangle className="mt-1 h-5 w-5 shrink-0" /><p>Uploaded sheets are stored locally in this browser. Production should connect this flow to a real backend database.</p></div></Card></section>
      <section className="grid gap-4 xl:grid-cols-2">{stepMeta.map((item) => <Card key={item.step} title={`${item.sheet} Preview — ${item.label}`}><MatrixTable rows={workbook?.sheets[item.sheet] ? filterRowsByCountry(workbook.sheets[item.sheet], scenario.country) : fallbackRowsForStep(item.step, data)} />{item.step === 4 ? <div className="mt-4"><AssessmentPreview title="Financial Feasibility Assessment" headers={financialFeasibilityAssessment.columns} rows={financialFeasibilityAssessment.rows} /></div> : null}{item.step === 5 ? <div className="mt-4"><AssessmentPreview title="Regulatory Assessment" headers={regulatoryAssessmentColumns} rows={regulatoryAssessmentRows} /></div> : null}</Card>)}</section>
    </div>
  )
}

export function ExcelLinkedDecisionStepPage({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  const data = useProjectSelection()
  const { projectId, setProjectId } = data
  const { workbook } = useUploadedWorkbook()
  const meta = stepMeta[step - 1]
  const rows = workbook?.sheets[meta.sheet] ? filterRowsByCountry(workbook.sheets[meta.sheet], data.scenario.country) : fallbackRowsForStep(step, data)
  return (
    <div className="space-y-5 pb-8">
      <PageHeader badge={`Excel ${meta.sheet}`} title={`${meta.sheet} — ${meta.label}`} subtitle={workbook?.sheets[meta.sheet] ? `Showing uploaded data from ${workbook.fileName}.` : 'Showing default dashboard data. Upload the Excel workbook in Input Data to replace this with workbook content.'} />
      <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
      <StepProgress activeStep={step} />
      <Card title={`Worksheet Content from ${meta.sheet}`}><MatrixTable rows={rows} /></Card>
      <div className="flex justify-between gap-3">{step > 1 ? <Link to={`/decision-flow/step-${step - 1}`} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-700">Previous step</Link> : <span />}{step < 5 ? <Link to={`/decision-flow/step-${step + 1}`} className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">Continue to Step {step + 1}<ArrowRight className="h-4 w-4" /></Link> : <Link to="/final-report" className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">View Final Report<ArrowRight className="h-4 w-4" /></Link>}</div>
    </div>
  )
}

function MetricCard({ label, value, icon: Icon }: { label: string; value: ReactNode; icon: ComponentType<{ className?: string }> }) {
  return <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur"><Icon className="h-5 w-5 text-blue-100" /><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-blue-100">{label}</p><p className="mt-1 text-lg font-bold leading-tight">{value}</p></div>
}

export function ExcelLinkedFinalReportPage() {
  const data = useProjectSelection()
  const { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows } = data
  const topTool = toolRows.find((item) => item.rank === 1)
  const topExpansion = expansionRows.find((item) => item.rank === 1)
  const { workbook } = useUploadedWorkbook()

  const downloadPdf = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const margin = 44
    let y = 52
    doc.setFont('helvetica', 'bold'); doc.setFontSize(18); doc.text('RPA Final Report', margin, y)
    y += 28
    doc.setFontSize(12); doc.setFont('helvetica', 'normal')
    const lines = doc.splitTextToSize(`Project: ${scenario.projectName}\nCountry: ${scenario.country}\nStatus: Proceed with caution\n\nDevelopment Challenge: ${profile?.challenge ?? 'N/A'}\n\nPrimary Barrier: ${scenario.primaryBarrier}\n\nRecommended Blended Finance Tool: ${scenario.bestFittingTool}\nRecommended Expansion Model: ${scenario.recommendedExpansion}\n\nExecutive Summary: ${scenario.projectSummary}\n\nTool Interpretation: ${scenario.toolInterpretation}\n\nExpansion Interpretation: ${scenario.expansionInterpretation}`, 500)
    lines.forEach((line: string) => { if (y > 760) { doc.addPage(); y = 52 } doc.text(line, margin, y); y += 16 })
    doc.save(`${scenario.projectName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-final-report.pdf`)
  }

  return (
    <div className="space-y-5 pb-8">
      <PageHeader badge="Client-ready output" title="Final Report" subtitle="A polished decision memo generated from Input Data and the five Excel-linked decision flow steps." />
      <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#06264a] via-[#0b3566] to-[#0f766e] p-6 shadow-lg"><div className="flex flex-wrap items-start justify-between gap-6"><div className="max-w-4xl text-white"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Final recommendation memo</p><h2 className="mt-2 text-3xl font-bold leading-tight">{scenario.projectName}</h2><p className="mt-3 text-sm leading-6 text-blue-50">RPA should proceed with caution by validating the evidence base, partner pathway, and implementation conditions before moving toward execution.</p></div><span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">Proceed with caution</span></div><div className="mt-6 grid gap-3 md:grid-cols-4"><MetricCard label="Country" value={scenario.country} icon={Globe2} /><MetricCard label="Primary barrier" value={scenario.primaryBarrier} icon={ShieldAlert} /><MetricCard label="Finance tool" value={`${scenario.bestFittingTool} — ${topTool?.averageScore ?? scenario.toolHighestAverage}`} icon={CircleDollarSign} /><MetricCard label="Expansion model" value={`${scenario.recommendedExpansion} — ${topExpansion?.averageScore ?? scenario.expansionHighestAverage}`} icon={Sparkles} /></div></section>
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]"><Card title="Executive Summary"><p>{scenario.projectSummary}</p><p className="mt-3">The main barrier identified in the decision flow is <strong>{scenario.primaryBarrier}</strong>. Based on the Step 4 score matrix, the recommended blended finance tool is <strong>{scenario.bestFittingTool}</strong>. Based on the Step 5 expansion assessment, the recommended expansion model is <strong>{scenario.recommendedExpansion}</strong>.</p></Card><Card title="Data Source"><Field label="Workbook source" value={workbook ? `${workbook.fileName} uploaded at ${new Date(workbook.uploadedAt).toLocaleString()}` : 'Static dataset; no Excel upload linked yet'} multiline /><Field label="Linked sheets" value={workbook ? Object.keys(workbook.sheets).join(', ') : 'None'} multiline /></Card></section>
      <Card title="5-Step Summary Timeline"><div className="grid gap-3 lg:grid-cols-5">{stepMeta.map((item) => { const Icon = item.icon; const summaries = [profile?.challenge, `${intermediaries.length} intermediaries mapped`, scenario.primaryBarrier, scenario.bestFittingTool, scenario.recommendedExpansion]; return <div key={item.step} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><Icon className="h-5 w-5 text-blue-700" /><p className="mt-3 text-xs font-bold uppercase text-slate-500">Step {item.step}</p><h3 className="font-bold text-slate-900">{item.label}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{summaries[item.step - 1]}</p></div>})}</div></Card>
      <section className="grid gap-4 xl:grid-cols-2"><Card title="Evidence and Data Quality"><div className="grid gap-3 md:grid-cols-2"><Field label="Evidence completeness" value="Medium to high" /><Field label="Confidence level" value="Medium" /><Field label="Missing data" value="Full financial model may still be required for NPV, IRR, payback period, and DSCR validation." multiline /></div></Card><Card title="Suggested RPA Action"><div className="grid gap-3"><Field label="Immediate next step" value="Validate project evidence and assumptions with local partners." multiline /><Field label="Partner engagement" value={`Use the mapped intermediaries, especially ${intermediaries[0]?.intermediary ?? 'local partners'}, as the starting point for engagement.`} multiline /><Field label="Implementation caution" value="Do not treat the recommendation as final until the missing financial and regulatory evidence is reviewed." multiline /></div></Card></section>
      <div className="flex flex-wrap gap-3"><button onClick={() => window.print()} className="rounded-xl bg-[#0b3566] px-5 py-2.5 text-sm font-bold text-white">Export PDF</button><button onClick={downloadPdf} className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700">Download report PDF</button></div>
    </div>
  )
}

export function ExcelLinkedDecisionFlowLandingPage() {
  return <ExcelLinkedDecisionStepPage step={1} />
}
