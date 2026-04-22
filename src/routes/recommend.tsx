import { createFileRoute } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { DecisionFlowStepper } from '@/components/DecisionFlowStepper'
import { RecommendationSummary } from '@/components/RecommendationSummary'
import {
  countryProfiles,
  expansionScoringByProject,
  intermediaryProfiles,
  projectScenarios,
  toolScoringByProject,
} from '@/data/decisionFlowDataset'
import { stepLabels } from '@/utils/decisionFlowConfig'
import {
  getEcosystemDecision,
  getRecommendationStrength,
  hasClearDevelopmentChallenge,
} from '@/utils/decisionFlowEngine'

export const Route = createFileRoute('/recommend')({
  component: RecommendPage,
})

function RecommendPage() {
  const [projectId, setProjectId] = useState(projectScenarios[0].id)
  const [hasLocalIntermediaries, setHasLocalIntermediaries] = useState(true)
  const [canBuildEcosystem, setCanBuildEcosystem] = useState(true)

  const scenario = useMemo(() => projectScenarios.find((item) => item.id === projectId) ?? projectScenarios[0], [projectId])
  const profile = useMemo(() => countryProfiles.find((item) => item.country === scenario.country), [scenario.country])
  const intermediaries = useMemo(
    () => intermediaryProfiles.filter((item) => item.country === scenario.country),
    [scenario.country]
  )

  const toolRows = toolScoringByProject[scenario.id] ?? []
  const expansionRows = expansionScoringByProject[scenario.id] ?? []
  const topToolScore = toolRows[0]?.averageScore ?? 0

  const hasChallenge = hasClearDevelopmentChallenge({
    challenge: profile?.challenge ?? '',
    sdgPriority: profile?.sdgTarget ?? '',
    governmentPriority: profile?.safeguards.join(' ') ?? '',
    marketNeed: profile?.background.join(' ') ?? '',
  })

  const ecosystemDecision = getEcosystemDecision({
    hasLocalIntermediaries,
    canBuildEcosystem,
  })

  const recommendationStrength = getRecommendationStrength([topToolScore])

  const currentStep = !hasChallenge ? 1 : ecosystemDecision === 'avoid_entry' ? 2 : 5

  const nextActions =
    ecosystemDecision === 'avoid_entry'
      ? ['Avoid entry until ecosystem conditions improve', 'Reassess local intermediaries and policy landscape in next review cycle']
      : [
          'Validate final structuring assumptions with implementation partners',
          'Launch execution workplan for the recommended tool and expansion model',
        ]

  return (
    <div className="space-y-6 pb-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Decision Flow</h1>
        <p className="text-sm text-gray-500">Interactive 5-step dashboard populated with the Japan and Indonesia/Pandanduri datasets provided.</p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="flex max-w-md flex-col gap-1">
          <span className="text-xs font-semibold text-slate-500">Project scenario</span>
          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700"
          >
            {projectScenarios.map((item) => (
              <option key={item.id} value={item.id}>
                {item.projectName}
              </option>
            ))}
          </select>
        </label>
      </section>

      <DecisionFlowStepper steps={stepLabels} currentStep={currentStep} />

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Step 1 — Identify Development Challenge</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <InfoCard title="Country" content={profile?.country ?? '—'} />
          <InfoCard title="SDG Goals/NDCs Target" content={profile?.sdgTarget ?? '—'} />
          <InfoCard title="Country Challenges" content={profile?.challenge ?? '—'} />
          <ListCard title="Background Information" items={profile?.background ?? []} />
          <ListCard title="Development Rationale" items={profile?.developmentRationale ?? []} />
          <ListCard title="Expected Results" items={profile?.expectedResults ?? []} />
          <ListCard title="Quality / Safeguards" items={profile?.safeguards ?? []} />
          <ListCard title="Sources" items={profile?.sources ?? []} linkify />
        </div>
        <DecisionBanner tone={hasChallenge ? 'success' : 'danger'} text={hasChallenge ? 'Clear development challenge identified. Continue to Step 2.' : 'Stop / Low priority country'} />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Step 2 — Map Existing Ecosystem</h2>
        <div className="grid gap-3 md:grid-cols-2">
          <Input label="Capable local intermediaries exist?">
            <YesNo value={hasLocalIntermediaries} onChange={setHasLocalIntermediaries} />
          </Input>
          <Input label="Can ecosystem be built?">
            <YesNo value={canBuildEcosystem} onChange={setCanBuildEcosystem} disabled={hasLocalIntermediaries} />
          </Input>
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full min-w-[880px] border-collapse text-xs">
            <thead className="bg-slate-100 text-left text-slate-700">
              <tr>
                <Th>Country</Th>
                <Th>Project Context</Th>
                <Th>Intermediary</Th>
                <Th>Description</Th>
                <Th>Role</Th>
              </tr>
            </thead>
            <tbody>
              {intermediaries.map((row) => (
                <tr key={`${row.country}-${row.intermediary}`} className="border-t border-slate-200 bg-white align-top">
                  <Td>{row.country}</Td>
                  <Td>{row.projectContext}</Td>
                  <Td>{row.intermediary}</Td>
                  <Td>{row.description}</Td>
                  <Td>{row.role}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DecisionBanner
          tone={ecosystemDecision === 'avoid_entry' ? 'danger' : ecosystemDecision === 'proceed_with_caution' ? 'warning' : 'success'}
          text={
            ecosystemDecision === 'continue'
              ? 'Capable local intermediaries exist. Continue to Step 3.'
              : ecosystemDecision === 'proceed_with_caution'
                ? 'Can ecosystem be built? Yes → proceed with caution.'
                : 'Can ecosystem be built? No → avoid entry.'
          }
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Step 3 — Diagnose Project Stage and Barrier</h2>
        <InfoCard title="Project Name" content={scenario.projectName} />
        <InfoCard title="Project Summary" content={scenario.projectSummary} />
        <InfoCard title="Current-stage diagnosis" content={scenario.stageDiagnosis} />
        <InfoCard title="Primary barrier" content={scenario.primaryBarrier} />
        <InfoCard title="Decision mapping" content={`${scenario.barrierOption} → ${scenario.bestFittingTool}`} />
        <ListCard title="Secondary risk checks" items={scenario.secondaryRisks} />
        <InfoCard title="Diagnosis narrative" content={scenario.diagnosisNarrative} />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Step 4 — Blended Finance Tool Scoring</h2>
        <InfoCard title="Best-fitting tool" content={`${scenario.bestFittingTool} (highest average ${scenario.toolHighestAverage})`} />
        <InfoCard title="Interpretation note" content={scenario.toolInterpretation} />
        <ScoreTable
          headers={['Tool', 'Barrier fit', 'Mobilization', 'Financial add.', 'Development add.', 'Concessionality', 'Implementation', 'Impact measurability', 'Average', 'Rank']}
          rows={toolRows.map((row) => [
            row.tool,
            row.barrierFit,
            row.mobilizationPotential,
            row.financialAdditionality,
            row.developmentAdditionality,
            row.concessionalityDiscipline,
            row.implementationFeasibility,
            row.impactMeasurability,
            row.averageScore,
            row.rank,
          ])}
        />
        <p className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600">Scoring notes are embedded in dataset for maintainability and can be surfaced in drill-down views if needed.</p>
        <DecisionBanner
          tone={recommendationStrength === 'Strong fit' ? 'success' : recommendationStrength === 'Conditional fit' ? 'warning' : 'danger'}
          text={
            recommendationStrength === 'Strong fit'
              ? 'Top score > 7 → Strong fit'
              : recommendationStrength === 'Conditional fit'
                ? 'Top score 5–7 → Conditional fit'
                : 'All below 5 → Reassess project'
          }
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm space-y-3">
        <h2 className="text-sm font-bold text-slate-900">Step 5 — Global Expansion Option</h2>
        <InfoCard title="Recommended option" content={`${scenario.recommendedExpansion} (highest average ${scenario.expansionHighestAverage})`} />
        <InfoCard title="Interpretation note" content={scenario.expansionInterpretation} />
        <ScoreTable
          headers={['Model', 'Speed', 'Cost', 'Local ownership', 'Scalability', 'Capacity building', 'Regulatory feasibility', 'Average', 'Rank']}
          rows={expansionRows.map((row) => [
            row.model,
            row.speed,
            row.cost,
            row.localOwnership,
            row.scalability,
            row.capacityBuilding,
            row.regulatoryFeasibility,
            row.averageScore,
            row.rank,
          ])}
        />
      </section>

      <RecommendationSummary
        country={scenario.country}
        project={scenario.projectName}
        barrier={scenario.primaryBarrier}
        tool={scenario.bestFittingTool}
        expansionOption={scenario.recommendedExpansion}
        recommendationStrength={recommendationStrength}
        nextActions={nextActions}
      />
    </div>
  )
}

function Input({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-xs font-semibold text-slate-500">{label}</span>
      {children}
    </label>
  )
}

function YesNo({ value, onChange, disabled = false }: { value: boolean; onChange: (value: boolean) => void; disabled?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(true)}
        className={`h-9 rounded-lg border text-xs font-semibold ${
          value ? 'border-emerald-300 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-white text-slate-600'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        Yes
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(false)}
        className={`h-9 rounded-lg border text-xs font-semibold ${
          !value ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-200 bg-white text-slate-600'
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        No
      </button>
    </div>
  )
}

function DecisionBanner({ text, tone }: { text: string; tone: 'success' | 'warning' | 'danger' }) {
  const toneClass =
    tone === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : tone === 'warning'
        ? 'border-amber-200 bg-amber-50 text-amber-700'
        : 'border-rose-200 bg-rose-50 text-rose-700'

  return <p className={`rounded-lg border px-3 py-2 text-xs font-semibold ${toneClass}`}>{text}</p>
}

function InfoCard({ title, content }: { title: string; content: string }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <p className="mt-1 text-xs text-slate-700">{content}</p>
    </article>
  )
}

function ListCard({ title, items, linkify = false }: { title: string; items: string[]; linkify?: boolean }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{title}</p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-xs text-slate-700">
        {items.map((item) => (
          <li key={item}>
            {linkify ? (
              <a href={item} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                {item}
              </a>
            ) : (
              item
            )}
          </li>
        ))}
      </ul>
    </article>
  )
}

function ScoreTable({ headers, rows }: { headers: string[]; rows: Array<Array<string | number>> }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-[1000px] border-collapse text-xs">
        <thead className="bg-slate-100 text-left text-slate-700">
          <tr>
            {headers.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-slate-200 bg-white align-top">
              {row.map((cell, cellIndex) => (
                <Td key={`${index}-${cellIndex}`}>{String(cell)}</Td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 font-semibold">{children}</th>
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-2 text-slate-700">{children}</td>
}
