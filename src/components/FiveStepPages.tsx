import { useMemo, useState, type ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Layers,
  ClipboardList,
  Network,
  ShieldAlert,
  CircleDollarSign,
  Globe2,
} from 'lucide-react'
import {
  countryProfiles,
  expansionScoringByProject,
  intermediaryProfiles,
  projectScenarios,
  toolScoringByProject,
  type ProjectScenario,
} from '@/data/decisionFlowDataset'

const stepMeta = [
  { step: 1, label: 'Development Challenge', path: '/decision-flow/step-1', icon: ClipboardList },
  { step: 2, label: 'Intermediary Mapping', path: '/decision-flow/step-2', icon: Network },
  { step: 3, label: 'Barrier Diagnosis', path: '/decision-flow/step-3', icon: ShieldAlert },
  { step: 4, label: 'Blended Finance Tool', path: '/decision-flow/step-4', icon: CircleDollarSign },
  { step: 5, label: 'Global Expansion Model', path: '/decision-flow/step-5', icon: Globe2 },
]

function useProjectSelection() {
  const [projectId, setProjectId] = useState(projectScenarios[0]?.id ?? '')
  const scenario = useMemo(
    () => projectScenarios.find((item) => item.id === projectId) ?? projectScenarios[0],
    [projectId]
  )
  const profile = useMemo(
    () => countryProfiles.find((item) => item.country === scenario.country),
    [scenario.country]
  )
  const intermediaries = useMemo(
    () => intermediaryProfiles.filter((item) => item.country === scenario.country),
    [scenario.country]
  )
  const toolRows = toolScoringByProject[scenario.id] ?? []
  const expansionRows = expansionScoringByProject[scenario.id] ?? []

  return { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows }
}

function ProjectSelector({ projectId, setProjectId }: { projectId: string; setProjectId: (value: string) => void }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="flex max-w-xl flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected project</span>
        <select
          value={projectId}
          onChange={(event) => setProjectId(event.target.value)}
          className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-800"
        >
          {projectScenarios.map((item) => (
            <option key={item.id} value={item.id}>{item.projectName}</option>
          ))}
        </select>
      </label>
    </section>
  )
}

function PageHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="space-y-1">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">RPA 5-Step Decision Flow</p>
      <h1 className="text-2xl font-bold text-slate-950">{title}</h1>
      <p className="max-w-4xl text-sm leading-6 text-slate-600">{subtitle}</p>
    </header>
  )
}

function StepProgress({ activeStep }: { activeStep?: number }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-2 lg:grid-cols-5">
        {stepMeta.map((item) => {
          const Icon = item.icon
          const isActive = item.step === activeStep
          const isDone = activeStep ? item.step < activeStep : false
          return (
            <Link
              key={item.step}
              to={item.path}
              className={`rounded-xl border p-3 transition-colors ${
                isActive
                  ? 'border-blue-300 bg-blue-50 text-blue-900'
                  : isDone
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold shadow-sm">
                  {isDone ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : item.step}
                </span>
                <Icon className="h-4 w-4" />
              </div>
              <p className="mt-2 text-xs font-semibold">Step {item.step}</p>
              <p className="text-sm font-bold">{item.label}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-slate-700">{children}</div>
    </article>
  )
}

function Field({ label, value, multiline = false }: { label: string; value: ReactNode; multiline?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <div className={`mt-1 text-sm text-slate-800 ${multiline ? 'leading-6' : 'font-semibold'}`}>{value}</div>
    </div>
  )
}

function ListField({ label, items }: { label: string; items: string[] }) {
  return (
    <Field
      label={label}
      multiline
      value={
        <ul className="list-disc space-y-1 pl-5">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      }
    />
  )
}

function SourceList({ sources }: { sources: string[] }) {
  return (
    <ul className="space-y-1 break-all text-xs text-blue-700">
      {sources.map((source) => (
        <li key={source}><a href={source} target="_blank" rel="noreferrer" className="hover:underline">{source}</a></li>
      ))}
    </ul>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: Array<Array<ReactNode>> }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead className="bg-slate-100 text-left text-xs uppercase tracking-wide text-slate-600">
          <tr>{headers.map((header) => <th key={header} className="px-3 py-3 font-bold">{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-slate-200 align-top">
              {row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`} className="px-3 py-3 text-slate-700">{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function InputNote() {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
      This page acts as the master input layer. In this prototype, the values are pre-filled from the current static dataset. The five Decision Flow pages and Final Report copy from the same dataset automatically, so the logic is consistent across pages.
    </div>
  )
}

export function InputDataPage() {
  const { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows } = useProjectSelection()

  return (
    <div className="space-y-5 pb-8">
      <PageHeader
        title="Input Data"
        subtitle="Input all project information required for Step 1–5. These fields become the source data for the Decision Flow and Final Report."
      />
      <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
      <InputNote />

      <section className="grid gap-4 xl:grid-cols-2">
        <Card title="Basic Project Information">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Country" value={scenario.country} />
            <Field label="Project name" value={scenario.projectName} />
            <Field label="SDG target" value={profile?.sdgTarget ?? 'N/A'} />
            <Field label="Project stage" value={scenario.stageDiagnosis} />
            <Field label="Project summary" value={scenario.projectSummary} multiline />
            <Field label="Primary barrier" value={scenario.primaryBarrier} multiline />
          </div>
        </Card>

        <Card title="Step 1 Input — Development Challenge">
          <div className="grid gap-3">
            <Field label="Country challenge" value={profile?.challenge ?? 'N/A'} multiline />
            <ListField label="Background information" items={profile?.background ?? []} />
            <ListField label="Development rationale" items={profile?.developmentRationale ?? []} />
            <ListField label="Expected results" items={profile?.expectedResults ?? []} />
            <ListField label="Quality / safeguards" items={profile?.safeguards ?? []} />
          </div>
        </Card>

        <Card title="Step 2 Input — Intermediary Mapping">
          <Table
            headers={['Intermediary', 'Project context', 'Description', 'Role']}
            rows={intermediaries.map((item) => [item.intermediary, item.projectContext, item.description, item.role])}
          />
        </Card>

        <Card title="Step 3 Input — Stage and Barrier Evidence">
          <div className="grid gap-3">
            <Field label="Stage diagnosis" value={scenario.stageDiagnosis} multiline />
            <Field label="Primary barrier" value={scenario.primaryBarrier} multiline />
            <ListField label="Secondary risk checks" items={scenario.secondaryRisks} />
            <Field label="Diagnosis narrative" value={scenario.diagnosisNarrative} multiline />
          </div>
        </Card>

        <Card title="Step 4 Input — Finance Tool Scoring">
          <Table
            headers={['Tool', 'Average score', 'Rank', 'Notes']}
            rows={toolRows.map((item) => [item.tool, item.averageScore, item.rank, item.notes])}
          />
        </Card>

        <Card title="Step 5 Input — Expansion Model Scoring">
          <Table
            headers={['Expansion model', 'Average score', 'Rank', 'Notes']}
            rows={expansionRows.map((item) => [item.model, item.averageScore, item.rank, item.notes])}
          />
        </Card>
      </section>
    </div>
  )
}

export function DecisionStepPage({ step }: { step: 1 | 2 | 3 | 4 | 5 }) {
  const { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows } = useProjectSelection()

  const titles = {
    1: 'Step 1 — Identify Development Challenge',
    2: 'Step 2 — Map Existing Intermediaries',
    3: 'Step 3 — Diagnose Project Stage and Barrier',
    4: 'Step 4 — Recommend Blended Finance Tool',
    5: 'Step 5 — Recommend Global Expansion Model',
  }

  return (
    <div className="space-y-5 pb-8">
      <PageHeader
        title={titles[step]}
        subtitle="This page is automatically populated from Input Data. The purpose is to show the selected step clearly and self-explanatorily."
      />
      <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
      <StepProgress activeStep={step} />
      {step === 1 ? <StepOne scenario={scenario} profile={profile} /> : null}
      {step === 2 ? <StepTwo scenario={scenario} intermediaries={intermediaries} /> : null}
      {step === 3 ? <StepThree scenario={scenario} /> : null}
      {step === 4 ? <StepFour scenario={scenario} toolRows={toolRows} /> : null}
      {step === 5 ? <StepFive scenario={scenario} expansionRows={expansionRows} /> : null}
    </div>
  )
}

function StepOne({ scenario, profile }: { scenario: ProjectScenario; profile: ReturnType<typeof useProjectSelection>['profile'] }) {
  return (
    <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <Card title="Input Used">
        <div className="grid gap-3">
          <Field label="Country" value={scenario.country} />
          <Field label="Project" value={scenario.projectName} />
          <Field label="SDG / policy target" value={profile?.sdgTarget ?? 'N/A'} />
          <ListField label="Background information" items={profile?.background ?? []} />
          <ListField label="Sources" items={profile?.sources ?? []} />
        </div>
      </Card>
      <Card title="Step Output">
        <Field label="Development challenge" value={profile?.challenge ?? 'N/A'} multiline />
        <Field label="Development rationale" value={<ul className="list-disc pl-5">{profile?.developmentRationale.map((item) => <li key={item}>{item}</li>)}</ul>} multiline />
        <Field label="Expected result" value={profile?.expectedResults.join(' ')} multiline />
        <NextButton to="/decision-flow/step-2" label="Continue to Step 2" />
      </Card>
    </section>
  )
}

function StepTwo({ scenario, intermediaries }: { scenario: ProjectScenario; intermediaries: ReturnType<typeof useProjectSelection>['intermediaries'] }) {
  return (
    <section className="space-y-4">
      <Card title="Input Used">
        <Field label="Project context" value={scenario.projectSummary} multiline />
      </Card>
      <Card title="Mapped Intermediaries">
        <Table
          headers={['Intermediary', 'Project context', 'Description', 'Role', 'Sources']}
          rows={intermediaries.map((item) => [
            item.intermediary,
            item.projectContext,
            item.description,
            item.role,
            <SourceList sources={item.sources} />,
          ])}
        />
      </Card>
      <Card title="Step Output">
        <Field
          label="Intermediary conclusion"
          value="Existing local or country-relevant intermediaries are identified and can be used as the basis for RPA engagement design."
          multiline
        />
        <NextButton to="/decision-flow/step-3" label="Continue to Step 3" />
      </Card>
    </section>
  )
}

function StepThree({ scenario }: { scenario: ProjectScenario }) {
  return (
    <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
      <Card title="Input Used">
        <div className="grid gap-3">
          <Field label="Project summary" value={scenario.projectSummary} multiline />
          <Field label="Stage evidence" value={scenario.stageDiagnosis} multiline />
          <ListField label="Secondary risk checks" items={scenario.secondaryRisks} />
          <Field label="Diagnosis narrative" value={scenario.diagnosisNarrative} multiline />
        </div>
      </Card>
      <Card title="Step Output">
        <Field label="Project stage" value={scenario.stageDiagnosis} multiline />
        <Field label="Primary barrier" value={scenario.primaryBarrier} multiline />
        <Field label="Barrier option" value={scenario.barrierOption} />
        <NextButton to="/decision-flow/step-4" label="Continue to Step 4" />
      </Card>
    </section>
  )
}

function StepFour({ scenario, toolRows }: { scenario: ProjectScenario; toolRows: ReturnType<typeof useProjectSelection>['toolRows'] }) {
  return (
    <section className="space-y-4">
      <Card title="Input Used">
        <Field label="Primary barrier from Step 3" value={scenario.primaryBarrier} multiline />
      </Card>
      <Card title="Tool Scoring Matrix">
        <Table
          headers={['Tool', 'Barrier fit', 'Mobilization', 'Financial additionality', 'Development additionality', 'Concessionality discipline', 'Implementation feasibility', 'Impact measurability', 'Average', 'Rank']}
          rows={toolRows.map((item) => [
            item.tool,
            item.barrierFit,
            item.mobilizationPotential,
            item.financialAdditionality,
            item.developmentAdditionality,
            item.concessionalityDiscipline,
            item.implementationFeasibility,
            item.impactMeasurability,
            item.averageScore,
            item.rank,
          ])}
        />
      </Card>
      <Card title="Step Output">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Recommended blended finance tool" value={scenario.bestFittingTool} />
          <Field label="Highest average score" value={scenario.toolHighestAverage} />
          <Field label="Interpretation" value={scenario.toolInterpretation} multiline />
        </div>
        <NextButton to="/decision-flow/step-5" label="Continue to Step 5" />
      </Card>
    </section>
  )
}

function StepFive({ scenario, expansionRows }: { scenario: ProjectScenario; expansionRows: ReturnType<typeof useProjectSelection>['expansionRows'] }) {
  return (
    <section className="space-y-4">
      <Card title="Input Used">
        <Field label="Country and project context" value={`${scenario.country} — ${scenario.projectName}`} />
        <Field label="Project need after Step 4" value={`Scale or implement using ${scenario.bestFittingTool} while managing local execution conditions.`} multiline />
      </Card>
      <Card title="Expansion Model Scoring Matrix">
        <Table
          headers={['Model', 'Speed', 'Cost', 'Local ownership', 'Scalability', 'Capacity building', 'Regulatory feasibility', 'Average', 'Rank']}
          rows={expansionRows.map((item) => [
            item.model,
            item.speed,
            item.cost,
            item.localOwnership,
            item.scalability,
            item.capacityBuilding,
            item.regulatoryFeasibility,
            item.averageScore,
            item.rank,
          ])}
        />
      </Card>
      <Card title="Step Output">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Recommended expansion model" value={scenario.recommendedExpansion} />
          <Field label="Highest average score" value={scenario.expansionHighestAverage} />
          <Field label="Interpretation" value={scenario.expansionInterpretation} multiline />
        </div>
        <NextButton to="/final-report" label="View Final Report" />
      </Card>
    </section>
  )
}

function NextButton({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-semibold text-white hover:bg-[#08294f]"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

export function FinalReportPage() {
  const { projectId, setProjectId, scenario, profile, intermediaries, toolRows, expansionRows } = useProjectSelection()
  const topTool = toolRows.find((item) => item.rank === 1)
  const topExpansion = expansionRows.find((item) => item.rank === 1)

  return (
    <div className="space-y-5 pb-8">
      <PageHeader
        title="Final Report"
        subtitle="Final project summary generated from Input Data and the five Decision Flow steps."
      />
      <ProjectSelector projectId={projectId} setProjectId={setProjectId} />

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">Final Recommendation</p>
            <h2 className="mt-1 text-2xl font-bold text-emerald-950">Proceed with caution</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-emerald-900">
              RPA should proceed if the recommended financing structure and expansion model are validated with local partners, implementation capacity, and evidence availability.
            </p>
          </div>
          <FileText className="h-10 w-10 text-emerald-700" />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card title="1. Project Overview">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Country" value={scenario.country} />
            <Field label="Project" value={scenario.projectName} />
            <Field label="SDG target" value={profile?.sdgTarget ?? 'N/A'} />
            <Field label="Project summary" value={scenario.projectSummary} multiline />
          </div>
        </Card>

        <Card title="2. Development Challenge">
          <div className="grid gap-3">
            <Field label="Main challenge" value={profile?.challenge ?? 'N/A'} multiline />
            <ListField label="Expected results" items={profile?.expectedResults ?? []} />
            <ListField label="Safeguards" items={profile?.safeguards ?? []} />
          </div>
        </Card>

        <Card title="3. Intermediary Landscape">
          <Table
            headers={['Intermediary', 'Role']}
            rows={intermediaries.map((item) => [item.intermediary, item.role])}
          />
        </Card>

        <Card title="4. Barrier Diagnosis">
          <div className="grid gap-3">
            <Field label="Project stage" value={scenario.stageDiagnosis} multiline />
            <Field label="Primary barrier" value={scenario.primaryBarrier} multiline />
            <Field label="Diagnosis narrative" value={scenario.diagnosisNarrative} multiline />
          </div>
        </Card>

        <Card title="5. Recommended Blended Finance Tool">
          <div className="grid gap-3">
            <Field label="Recommended tool" value={scenario.bestFittingTool} />
            <Field label="Average score" value={topTool?.averageScore ?? scenario.toolHighestAverage} />
            <Field label="Rationale" value={scenario.toolInterpretation} multiline />
            <Field label="Key note" value={topTool?.notes ?? 'N/A'} multiline />
          </div>
        </Card>

        <Card title="6. Recommended Expansion Model">
          <div className="grid gap-3">
            <Field label="Recommended model" value={scenario.recommendedExpansion} />
            <Field label="Average score" value={topExpansion?.averageScore ?? scenario.expansionHighestAverage} />
            <Field label="Rationale" value={scenario.expansionInterpretation} multiline />
            <Field label="Key note" value={topExpansion?.notes ?? 'N/A'} multiline />
          </div>
        </Card>
      </section>

      <Card title="Suggested RPA Action">
        <div className="grid gap-3 md:grid-cols-3">
          <Field label="Action 1" value="Validate the project evidence and assumptions with local partners." multiline />
          <Field label="Action 2" value={`Structure support around ${scenario.bestFittingTool}.`} multiline />
          <Field label="Action 3" value={`Use ${scenario.recommendedExpansion} as the initial expansion approach.`} multiline />
        </div>
      </Card>

      <Card title="Source Links">
        <SourceList sources={profile?.sources ?? []} />
      </Card>
    </div>
  )
}

export function DecisionFlowLandingPage() {
  const { projectId, setProjectId, scenario, profile } = useProjectSelection()

  return (
    <div className="space-y-5 pb-8">
      <PageHeader
        title="Decision Flow"
        subtitle="Use the five step pages to move from input data into project diagnosis, financing recommendation, expansion model, and final report."
      />
      <ProjectSelector projectId={projectId} setProjectId={setProjectId} />
      <StepProgress />
      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card title="Selected Project Snapshot">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Project" value={scenario.projectName} />
            <Field label="Country" value={scenario.country} />
            <Field label="SDG target" value={profile?.sdgTarget ?? 'N/A'} />
            <Field label="Primary barrier" value={scenario.primaryBarrier} multiline />
            <Field label="Recommended tool" value={scenario.bestFittingTool} />
            <Field label="Recommended expansion model" value={scenario.recommendedExpansion} />
          </div>
        </Card>
        <Card title="How to Read This Flow">
          <div className="space-y-3">
            <p>The dashboard copies information from Input Data into each step page.</p>
            <p>Each step shows the input used and the output that should feed the next step.</p>
            <Link to="/decision-flow/step-1" className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-semibold text-white">
              Start Step 1 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </section>
      <section className="grid gap-3 md:grid-cols-5">
        {stepMeta.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.step} to={item.path} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-300 hover:bg-blue-50">
              <Icon className="h-5 w-5 text-blue-700" />
              <p className="mt-3 text-xs font-bold uppercase text-slate-500">Step {item.step}</p>
              <h3 className="mt-1 text-sm font-bold text-slate-900">{item.label}</h3>
            </Link>
          )
        })}
      </section>
    </div>
  )
}
