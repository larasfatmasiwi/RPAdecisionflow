import { useMemo, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import * as XLSX from 'xlsx'
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Network,
  ShieldAlert,
  CircleDollarSign,
  Globe2,
  Upload,
  Download,
  PencilLine,
  Database,
  AlertTriangle,
  Sparkles,
  FileText,
} from 'lucide-react'
import {
  countryProfiles,
  expansionScoringByProject,
  intermediaryProfiles,
  projectScenarios,
  toolScoringByProject,
} from '@/data/decisionFlowDataset'

const stepMeta = [
  { step: 1, label: 'Development Challenge', path: '/decision-flow/step-1', icon: ClipboardList, sheet: 'Step 1' },
  { step: 2, label: 'Intermediary Mapping', path: '/decision-flow/step-2', icon: Network, sheet: 'Step 2' },
  { step: 3, label: 'Barrier Diagnosis', path: '/decision-flow/step-3', icon: ShieldAlert, sheet: 'Step 3' },
  { step: 4, label: 'Blended Finance Tool', path: '/decision-flow/step-4', icon: CircleDollarSign, sheet: 'Step 4' },
  { step: 5, label: 'Global Expansion Model', path: '/decision-flow/step-5', icon: Globe2, sheet: 'Step 5' },
]

const barrierFramework = [
  ['Preparing', 'High upfront costs; binary risk that a project will not happen', 'Preparing funding, grants, repayable grants, or flexible loans for feasibility and pre-commissioning costs.'],
  ['Pioneering', 'Early-stage projects with high business model risk; high transaction costs', 'Seed or venture-style capital to test ideas, markets, products, or business models.'],
  ['Facilitating', 'Sectorial or project risks; returns below commercial rates', 'Risk-bearing capital, flexible debt, subordinated debt, junior equity, or concessional support to improve commercial attractiveness.'],
  ['Anchoring', 'Macro or sectorial risks; liquidity, refinancing and exit risks', 'Anchoring capital on similar terms to private investors to reduce perceived macro or sector risk.'],
  ['Transitioning', 'Lack of local market knowledge and deal pipeline; inefficient markets', 'Transitioning funding to connect investors with scalable and sufficiently sizeable deal pipelines.'],
  ['Expansion', 'Difficult to monetize social outcomes', 'Outcome-based incentives that link financing to verified social outcomes and public-value creation.'],
]

const toolIndicators = [
  ['Barrier fit', 'Does the tool directly address the diagnosed primary barrier?'],
  ['Mobilization potential', 'How strongly can this tool unlock additional private or commercial finance?'],
  ['Financial additionality', 'Would the deal likely fail, shrink, or worsen without this tool?'],
  ['Development additionality', 'Does this tool increase development contribution beyond financing alone?'],
  ['Concessionality discipline', 'Is the subsidy proportionate and narrowly targeted to the market failure?'],
  ['Implementation feasibility', 'Can this tool be structured, approved, governed, and implemented in practice?'],
  ['Impact measurability', 'Can outputs, outcomes, and downstream impacts be credibly measured?'],
]

const financialFields = [
  'CAPEX / Total Project Cost',
  'Committed Capital',
  'Funding Gap',
  'Revenue or Cost-Saving Source',
  'NPV',
  'IRR',
  'Payback Period',
  'DSCR',
  'Grant / Concessional Capital Required',
  'Capital Mobilization Ratio',
  'Financial Evidence Status',
]

const expansionIndicators = [
  ['Speed', 'How quickly the model can be launched, staffed, governed, and made operational.'],
  ['Cost', 'Relative setup cost, operating cost, infrastructure burden, and resource efficiency.'],
  ['Local Ownership', 'Extent to which the model embeds local leadership, decision-making, legitimacy, and community agency.'],
  ['Scalability', 'Potential to replicate, expand geographically, and operate across larger volumes or jurisdictions.'],
  ['Capacity Building', 'Ability to strengthen durable local institutional capability, talent, and ecosystem development.'],
  ['Regulatory Feasibility', 'How workable the model is within legal, charitable, fiscal, and governance constraints.'],
]

const regulatoryRows = [
  ['Japan / Toyota City', 'Market exploration vs local operating presence', 'Companies Act / JETRO guidance', 'Start through local intermediary or municipal partner; avoid direct operating commitments until entity pathway is clear.'],
  ['Japan / Toyota City', 'Beneficiary / health / care data', 'Act on the Protection of Personal Information', 'Build data-sharing, consent, anonymization, and evaluator-access clauses into project design.'],
  ['Indonesia / Pandanduri', 'Funding through PT SMI or local intermediary', 'OSS risk-based licensing framework', 'Use PT SMI or similar platform as implementation / intermediation channel.'],
  ['Indonesia / Pandanduri', 'Environmental and operational compliance', 'Government Regulation No. 28 of 2025', 'Require evidence of environmental and operational compliance before disbursement or financial-close support.'],
]

function useProjectSelection() {
  const [projectId, setProjectId] = useState(projectScenarios[0]?.id ?? '')
  const scenario = useMemo(() => projectScenarios.find((item) => item.id === projectId) ?? projectScenarios[0], [projectId])
  const profile = useMemo(() => countryProfiles.find((item) => item.country === scenario.country), [scenario.country])
  const intermediaries = useMemo(() => intermediaryProfiles.filter((item) => item.country === scenario.country), [scenario.country])
  const toolRows = toolScoringByProject[scenario.id] ?? []
  const expansionRows = expansionScoringByProject[scenario.id] ?? []
  return { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows }
}

function PageHeader({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) {
  return (
    <header className="space-y-2">
      {badge ? <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">{badge}</span> : null}
      <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
      <p className="max-w-5xl text-sm leading-6 text-slate-600">{subtitle}</p>
    </header>
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

function Card({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return <article className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}><h2 className="text-sm font-bold text-slate-900">{title}</h2><div className="mt-3 text-sm leading-6 text-slate-700">{children}</div></article>
}

function Field({ label, value, multiline = false }: { label: string; value: ReactNode; multiline?: boolean }) {
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-3"><p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p><div className={`mt-1 text-sm text-slate-800 ${multiline ? 'leading-6 whitespace-pre-line' : 'font-semibold'}`}>{value}</div></div>
}

function ListField({ label, items }: { label: string; items: string[] }) {
  return <Field label={label} multiline value={<ul className="list-disc space-y-1 pl-5">{items.map((item) => <li key={item}>{item}</li>)}</ul>} />
}

function SourceList({ sources }: { sources: string[] }) {
  return <ul className="space-y-1 break-all text-xs text-blue-700">{sources.map((source) => <li key={source}><a href={source} target="_blank" rel="noreferrer" className="hover:underline">{source}</a></li>)}</ul>
}

function Table({ headers, rows }: { headers: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[900px] border-collapse text-sm"><thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600"><tr>{headers.map((header) => <th key={header} className="px-3 py-3 font-bold">{header}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={index} className="border-t border-slate-200 align-top">{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`} className="px-3 py-3 text-slate-700">{cell}</td>)}</tr>)}</tbody></table>
    </div>
  )
}

function downloadBlob(filename: string, content: BlobPart, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function downloadExcelTemplate() {
  const wb = XLSX.utils.book_new()
  const sheets = {
    'Step 1': [['Country', 'SDG Goals/NDCs Target', 'Country Challenges', 'Background Information', 'Existing Project', 'Development Rationale', 'Expected Results', 'Quality / Safeguards', 'Sources']],
    'Step 2': [['Country', 'Project Context', 'Intermediary', 'Intermediary Description', 'Intermediary Role', 'Sources']],
    'Step 3': [['Country', 'Project Context', 'Progress Evidence', 'Project Stage', 'Project Barrier', 'Sources']],
    'Step 4': [['Project Name', 'Primary Barrier', 'Best-fitting Tool', 'Highest Average Score', 'Interpretation Note'], ['Tool', 'Barrier fit', 'Mobilization potential', 'Financial additionality', 'Development additionality', 'Concessionality discipline', 'Implementation feasibility', 'Impact measurability', 'Average score', 'Rank', 'Scoring notes']],
    'Step 5': [['Project Name', 'Primary Barrier', 'Best-fitting Model', 'Highest Average Score', 'Interpretation Note'], ['Model', 'Speed', 'Cost', 'Local Ownership', 'Scalability', 'Capacity Building', 'Regulatory Feasibility', 'Average score', 'Rank', 'Scoring notes']],
  }
  Object.entries(sheets).forEach(([name, rows]) => XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), name))
  XLSX.writeFile(wb, 'rpa-decision-flow-template.xlsx')
}

function InputMethodCard({ icon: Icon, title, children, action, onClick }: { icon: ComponentType<{ className?: string }>; title: string; children: ReactNode; action: string; onClick: () => void }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3"><span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon className="h-5 w-5" /></span><div><h3 className="font-bold text-slate-950">{title}</h3><div className="mt-1 text-sm leading-6 text-slate-600">{children}</div></div></div>
      <button onClick={onClick} className="mt-4 w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-100">{action}</button>
    </div>
  )
}

export function InputDataPage() {
  const { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows } = useProjectSelection()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [uploadStatus, setUploadStatus] = useState('No workbook uploaded in this session.')
  const [manualOpen, setManualOpen] = useState(false)
  const [manualNote, setManualNote] = useState('')

  const handleWorkbookUpload = async (file: File | undefined) => {
    if (!file) return
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'array' })
    const summary = workbook.SheetNames.filter((name) => name.startsWith('Step')).map((name) => {
      const rows = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1 }) as unknown[][]
      return `${name}: ${rows.filter((row) => row.length).length} rows detected`
    })
    localStorage.setItem('rpaUploadedWorkbookSummary', JSON.stringify({ fileName: file.name, summary, uploadedAt: new Date().toISOString() }))
    setUploadStatus(`${file.name} uploaded successfully. ${summary.join(' | ')}`)
  }

  const saveManualInput = () => {
    localStorage.setItem('rpaManualInputNote', manualNote)
    setUploadStatus('Manual input saved locally in this browser.')
  }

  return (
    <div className="space-y-5 pb-8">
      <PageHeader badge="Master input layer" title="Input Data" subtitle="Choose how project data enters the dashboard: upload the Excel workbook, type data manually, or download the Excel template. The Step 1–5 pages are structured to mirror the workbook sheets." />
      <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
      <input ref={fileInputRef} type="file" accept=".xlsx,.xls" className="hidden" onChange={(event) => handleWorkbookUpload(event.target.files?.[0])} />

      <section className="grid gap-4 xl:grid-cols-3">
        <InputMethodCard icon={Upload} title="Option A — Upload Excel Workbook" action="Upload Excel workbook" onClick={() => fileInputRef.current?.click()}>Upload the completed RPA Decision Flow Excel template. The system reads Step 1–5 sheets and stores an upload summary locally.</InputMethodCard>
        <InputMethodCard icon={PencilLine} title="Option B — Manual Input Form" action="Open manual form" onClick={() => setManualOpen((value) => !value)}>Type or revise project data directly in the dashboard. This prototype saves manual notes in browser local storage.</InputMethodCard>
        <InputMethodCard icon={Download} title="Option C — Download Excel Template" action="Download template" onClick={downloadExcelTemplate}>Download an Excel template with Step 1–5 sheets matching the dashboard structure.</InputMethodCard>
      </section>

      {manualOpen ? (
        <Card title="Manual Input Form">
          <textarea value={manualNote} onChange={(event) => setManualNote(event.target.value)} className="min-h-36 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm" placeholder="Type updates, missing data, or project notes here..." />
          <button onClick={saveManualInput} className="mt-3 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white">Save manual input locally</button>
        </Card>
      ) : null}

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <Card title="Data Status"><div className="grid gap-3 md:grid-cols-4"><Field label="Selected project" value={scenario.projectName} /><Field label="Source type" value="Excel upload / manual / static" /><Field label="Storage" value="Local storage in prototype" /><Field label="Last action" value={uploadStatus} multiline /></div></Card>
        <Card title="Missing Data Warning" className="border-amber-200 bg-amber-50"><div className="flex gap-3 text-amber-900"><AlertTriangle className="mt-1 h-5 w-5 shrink-0" /><p>Financial feasibility fields such as NPV, IRR, payback period, and DSCR may still require a full project financial model.</p></div></Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card title="Basic Project Information"><div className="grid gap-3 md:grid-cols-2"><Field label="Country" value={scenario.country} /><Field label="Project name" value={scenario.projectName} /><Field label="SDG target" value={profile?.sdgTarget ?? 'N/A'} /><Field label="Project stage" value={scenario.stageDiagnosis} /><Field label="Project summary" value={scenario.projectSummary} multiline /><Field label="Primary barrier" value={scenario.primaryBarrier} multiline /></div></Card>
        <Card title="Step 1 Input — Development Challenge"><Field label="Country challenge" value={profile?.challenge ?? 'N/A'} multiline /><ListField label="Background information" items={profile?.background ?? []} /><ListField label="Development rationale" items={profile?.developmentRationale ?? []} /></Card>
        <Card title="Step 2 Input — Intermediary Mapping"><Table headers={['Intermediary', 'Project context', 'Role']} rows={intermediaries.map((item) => [item.intermediary, item.projectContext, item.role])} /></Card>
        <Card title="Step 3 Input — Stage and Barrier Evidence"><Field label="Stage diagnosis" value={scenario.stageDiagnosis} multiline /><Field label="Primary barrier" value={scenario.primaryBarrier} multiline /><ListField label="Secondary risk checks" items={scenario.secondaryRisks} /></Card>
        <Card title="Step 4 Input — Finance Tool Scoring"><Table headers={['Tool', 'Average score', 'Rank', 'Notes']} rows={toolRows.map((item) => [item.tool, item.averageScore, item.rank, item.notes])} /></Card>
        <Card title="Step 5 Input — Expansion Model Scoring"><Table headers={['Expansion model', 'Average score', 'Rank', 'Notes']} rows={expansionRows.map((item) => [item.model, item.averageScore, item.rank, item.notes])} /></Card>
      </section>
    </div>
  )
}

export function DecisionStepPage({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  const { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows } = useProjectSelection()
  const titles = { 1: 'Step 1 — Development Challenge', 2: 'Step 2 — Intermediary Mapping', 3: 'Step 3 — Barrier Diagnosis', 4: 'Step 4 — Blended Finance Tool', 5: 'Step 5 — Global Expansion Model' }
  return <div className="space-y-5 pb-8"><PageHeader badge={`Excel ${stepMeta[step - 1].sheet}`} title={titles[step]} subtitle="This page is structured according to the corresponding Excel sheet and focuses only on this step." /><ProjectSelector projectId={projectId} setProjectId={setProjectId} /><StepProgress activeStep={step} />{step === 1 && <StepOne scenario={scenario} profile={profile} />}{step === 2 && <StepTwo scenario={scenario} intermediaries={intermediaries} />}{step === 3 && <StepThree scenario={scenario} />}{step === 4 && <StepFour scenario={scenario} toolRows={toolRows} />}{step === 5 && <StepFive scenario={scenario} expansionRows={expansionRows} />}</div>
}

function StepOne({ scenario, profile }: { scenario: (typeof projectScenarios)[number]; profile: (typeof countryProfiles)[number] | undefined }) {
  return <section className="grid gap-4 xl:grid-cols-[1fr_360px]"><Card title="Worksheet for Step 1"><div className="grid gap-3"><Field label="Country" value={scenario.country} /><Field label="Project name" value={scenario.projectName} /><Field label="SDG / NDC target" value={profile?.sdgTarget ?? 'N/A'} /><ListField label="Background information" items={profile?.background ?? []} /><ListField label="Sources" items={profile?.sources ?? []} /></div></Card><Card title="Step 1 Output"><Field label="Development challenge" value={profile?.challenge ?? 'N/A'} multiline /><ListField label="Development rationale" items={profile?.developmentRationale ?? []} /><ListField label="Expected results" items={profile?.expectedResults ?? []} /><ListField label="Quality / safeguards" items={profile?.safeguards ?? []} /><NextButton to="/decision-flow/step-2" label="Continue to Step 2" /></Card></section>
}

function StepTwo({ scenario, intermediaries }: { scenario: (typeof projectScenarios)[number]; intermediaries: typeof intermediaryProfiles }) {
  return <section className="space-y-4"><Card title="Worksheet for Step 2"><Field label="Purpose" value="Map organizations, institutions, and actors already addressing the issue in the target country." multiline /><Field label="Project context" value={scenario.projectName} /></Card><Card title="Intermediary Mapping Table"><Table headers={['Country', 'Project Context', 'Intermediary', 'Intermediary Description', 'Intermediary Role', 'Sources']} rows={intermediaries.map((item) => [item.country, item.projectContext, item.intermediary, item.description, item.role, <SourceList sources={item.sources} />])} /></Card><Card title="Step 2 Output"><Field label="Intermediary conclusion" value="Existing intermediaries are identified and can be used as the basis for RPA partnership, learning, or future engagement." multiline /><NextButton to="/decision-flow/step-3" label="Continue to Step 3" /></Card></section>
}

function StepThree({ scenario }: { scenario: (typeof projectScenarios)[number] }) {
  return <section className="space-y-4"><Card title="Barrier Description Framework"><Table headers={['Project Stage', 'Barrier Category', 'Recommended Solutions']} rows={barrierFramework} /></Card><section className="grid gap-4 xl:grid-cols-[1fr_360px]"><Card title="Worksheet for Step 3"><Field label="Country" value={scenario.country} /><Field label="Project context" value={scenario.projectName} /><Field label="Progress evidence" value={scenario.projectSummary} multiline /><Field label="Sources / secondary risks" value={scenario.secondaryRisks.join('; ')} multiline /></Card><Card title="Step 3 Output"><Field label="Project stage" value={scenario.stageDiagnosis} multiline /><Field label="Project barrier" value={scenario.primaryBarrier} multiline /><Field label="Barrier option" value={scenario.barrierOption} /><Field label="Diagnosis narrative" value={scenario.diagnosisNarrative} multiline /><NextButton to="/decision-flow/step-4" label="Continue to Step 4" /></Card></section></section>
}

function StepFour({ scenario, toolRows }: { scenario: (typeof projectScenarios)[number]; toolRows: NonNullable<ReturnType<typeof useProjectSelection>['toolRows']> }) {
  return <section className="space-y-4"><Card title="Score Indicators from Step 4"><Table headers={['Indicator', 'Guiding scoring question']} rows={toolIndicators} /></Card><Card title="Project-Level Financial Feasibility Summary"><Table headers={['Financial Feasibility Assessment', 'Project Name']} rows={financialFields.map((field) => [field, 'Fill in here. If not applicable, write N/A'])} /></Card><Card title="Score Matrix"><Table headers={['Tool', 'Barrier fit', 'Mobilization', 'Financial add.', 'Development add.', 'Concessionality', 'Implementation', 'Impact', 'Average', 'Rank', 'Scoring notes']} rows={toolRows.map((item) => [item.tool, item.barrierFit, item.mobilizationPotential, item.financialAdditionality, item.developmentAdditionality, item.concessionalityDiscipline, item.implementationFeasibility, item.impactMeasurability, item.averageScore, item.rank, item.notes])} /></Card><Card title="Step 4 Output"><div className="grid gap-3 md:grid-cols-2"><Field label="Project name" value={scenario.projectName} /><Field label="Primary barrier" value={scenario.primaryBarrier} multiline /><Field label="Best-fitting tool" value={scenario.bestFittingTool} /><Field label="Highest average score" value={scenario.toolHighestAverage} /><Field label="Interpretation note" value={scenario.toolInterpretation} multiline /></div><NextButton to="/decision-flow/step-5" label="Continue to Step 5" /></Card></section>
}

function StepFive({ scenario, expansionRows }: { scenario: (typeof projectScenarios)[number]; expansionRows: NonNullable<ReturnType<typeof useProjectSelection>['expansionRows']> }) {
  return <section className="space-y-4"><Card title="Score Indicators from Step 5"><Table headers={['Indicator', 'Description']} rows={expansionIndicators} /></Card><Card title="Regulatory Assessment"><Table headers={['Country / Project', 'Regulatory assessment area', 'Relevant regulation / authority', 'Suggested RPA action']} rows={regulatoryRows.filter((row) => row[0].includes(scenario.country))} /></Card><Card title="Score Matrix"><Table headers={['Model', 'Speed', 'Cost', 'Local Ownership', 'Scalability', 'Capacity Building', 'Regulatory Feasibility', 'Average score', 'Rank', 'Scoring notes']} rows={expansionRows.map((item) => [item.model, item.speed, item.cost, item.localOwnership, item.scalability, item.capacityBuilding, item.regulatoryFeasibility, item.averageScore, item.rank, item.notes])} /></Card><Card title="Step 5 Output"><div className="grid gap-3 md:grid-cols-2"><Field label="Project name" value={scenario.projectName} /><Field label="Primary barrier" value={scenario.primaryBarrier} multiline /><Field label="Best-fitting model" value={scenario.recommendedExpansion} /><Field label="Highest average score" value={scenario.expansionHighestAverage} /><Field label="Interpretation note" value={scenario.expansionInterpretation} multiline /></div><NextButton to="/final-report" label="View Final Report" /></Card></section>
}

function NextButton({ to, label }: { to: string; label: string }) {
  return <Link to={to} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-semibold text-white hover:bg-[#08294f]">{label}<ArrowRight className="h-4 w-4" /></Link>
}

function MetricCard({ label, value, icon: Icon }: { label: string; value: ReactNode; icon: ComponentType<{ className?: string }> }) {
  return <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white backdrop-blur"><Icon className="h-5 w-5 text-blue-100" /><p className="mt-3 text-xs font-semibold uppercase tracking-wide text-blue-100">{label}</p><p className="mt-1 text-lg font-bold leading-tight">{value}</p></div>
}

function buildReportText(scenario: (typeof projectScenarios)[number], profile: (typeof countryProfiles)[number] | undefined, topTool: unknown, topExpansion: unknown) {
  return `RPA Final Report\n\nProject: ${scenario.projectName}\nCountry: ${scenario.country}\nStatus: Proceed with caution\n\nDevelopment Challenge:\n${profile?.challenge ?? 'N/A'}\n\nPrimary Barrier:\n${scenario.primaryBarrier}\n\nRecommended Blended Finance Tool:\n${scenario.bestFittingTool}\n\nRecommended Expansion Model:\n${scenario.recommendedExpansion}\n\nExecutive Summary:\n${scenario.projectSummary}\n\nTool Interpretation:\n${scenario.toolInterpretation}\n\nExpansion Interpretation:\n${scenario.expansionInterpretation}\n`
}

export function FinalReportPage() {
  const { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows } = useProjectSelection()
  const topTool = toolRows.find((item) => item.rank === 1)
  const topExpansion = expansionRows.find((item) => item.rank === 1)
  const downloadReport = () => downloadBlob(`${scenario.projectName.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-final-report.txt`, buildReportText(scenario, profile, topTool, topExpansion), 'text/plain;charset=utf-8')

  return (
    <div className="space-y-5 pb-8">
      <PageHeader badge="Client-ready output" title="Final Report" subtitle="A polished decision memo generated from Input Data and the five Excel-based decision flow steps." />
      <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#06264a] via-[#0b3566] to-[#0f766e] p-6 shadow-lg"><div className="flex flex-wrap items-start justify-between gap-6"><div className="max-w-4xl text-white"><p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-100">Final recommendation memo</p><h2 className="mt-2 text-3xl font-bold leading-tight">{scenario.projectName}</h2><p className="mt-3 text-sm leading-6 text-blue-50">RPA should proceed with caution by validating the evidence base, partner pathway, and implementation conditions before moving toward execution.</p></div><span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-800">Proceed with caution</span></div><div className="mt-6 grid gap-3 md:grid-cols-4"><MetricCard label="Country" value={scenario.country} icon={Globe2} /><MetricCard label="Primary barrier" value={scenario.primaryBarrier} icon={ShieldAlert} /><MetricCard label="Finance tool" value={scenario.bestFittingTool} icon={CircleDollarSign} /><MetricCard label="Expansion model" value={scenario.recommendedExpansion} icon={Sparkles} /></div></section>
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]"><Card title="Executive Summary"><p>{scenario.projectSummary}</p><p className="mt-3">The main barrier identified in the decision flow is <strong>{scenario.primaryBarrier}</strong>. Based on the Step 4 score matrix, the recommended blended finance tool is <strong>{scenario.bestFittingTool}</strong>. Based on the Step 5 expansion assessment, the recommended expansion model is <strong>{scenario.recommendedExpansion}</strong>.</p></Card><Card title="Recommendation Snapshot"><div className="space-y-3"><Field label="Primary barrier" value={scenario.primaryBarrier} multiline /><Field label="Recommended finance tool" value={`${scenario.bestFittingTool} — score ${topTool?.averageScore ?? scenario.toolHighestAverage}`} /><Field label="Recommended expansion model" value={`${scenario.recommendedExpansion} — score ${topExpansion?.averageScore ?? scenario.expansionHighestAverage}`} /></div></Card></section>
      <Card title="5-Step Summary Timeline"><div className="grid gap-3 lg:grid-cols-5">{stepMeta.map((item) => { const Icon = item.icon; const summaries = [profile?.challenge, `${intermediaries.length} intermediaries mapped`, scenario.primaryBarrier, scenario.bestFittingTool, scenario.recommendedExpansion]; return <div key={item.step} className="rounded-xl border border-slate-200 bg-slate-50 p-4"><Icon className="h-5 w-5 text-blue-700" /><p className="mt-3 text-xs font-bold uppercase text-slate-500">Step {item.step}</p><h3 className="font-bold text-slate-900">{item.label}</h3><p className="mt-2 text-xs leading-5 text-slate-600">{summaries[item.step - 1]}</p></div>})}</div></Card>
      <section className="grid gap-4 xl:grid-cols-2"><Card title="Evidence and Data Quality"><div className="grid gap-3 md:grid-cols-2"><Field label="Evidence completeness" value="Medium to high" /><Field label="Confidence level" value="Medium" /><Field label="Missing data" value="Full financial model may still be required for NPV, IRR, payback period, and DSCR validation." multiline /><Field label="Source links" value={<SourceList sources={profile?.sources ?? []} />} multiline /></div></Card><Card title="Suggested RPA Action"><div className="grid gap-3"><Field label="Immediate next step" value="Validate project evidence and assumptions with local partners." multiline /><Field label="Partner engagement" value={`Use the mapped intermediaries, especially ${intermediaries[0]?.intermediary ?? 'local partners'}, as the starting point for engagement.`} multiline /><Field label="Implementation caution" value="Do not treat the recommendation as final until the missing financial and regulatory evidence is reviewed." multiline /></div></Card></section>
      <div className="flex flex-wrap gap-3"><button onClick={() => window.print()} className="rounded-xl bg-[#0b3566] px-5 py-2.5 text-sm font-bold text-white">Export PDF</button><button onClick={downloadReport} className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-bold text-slate-700">Download report</button></div>
    </div>
  )
}

export function DecisionFlowLandingPage() {
  return <DecisionStepPage step={1} />
}
