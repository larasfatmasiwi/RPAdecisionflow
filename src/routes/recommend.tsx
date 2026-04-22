import { createFileRoute } from '@tanstack/react-router'
import { RecommendationPanel } from '@/components/ui/RecommendationPanel'
import { Lightbulb, Info } from 'lucide-react'
import { mockBarriers, mockCases, mockExpansionOptions, mockIntermediaries, mockTools } from '@/data/mockData'

export const Route = createFileRoute('/recommend')({
  component: RecommendPage,
})

const fieldGroups = [
  {
    title: 'Step 1',
    fields: ['country', 'sdgTarget', 'countryChallenges', 'backgroundProblem', 'existingProject', 'developmentRationale', 'expectedResults', 'safeguards', 'sources'],
  },
  {
    title: 'Step 2',
    fields: ['intermediary', 'type', 'whyRelevant', 'role', 'geography', 'relationshipStatus', 'linkedCountry', 'linkedBarrier'],
  },
  {
    title: 'Step 3',
    fields: ['primaryBarrier', 'barrierDescription', 'observableSigns', 'projectStage', 'recommendedTool', 'source'],
  },
  {
    title: 'Step 4',
    fields: ['tool', 'description', 'bestWhen', 'strengths', 'weaknesses', 'riskMethodologies', 'source'],
  },
  {
    title: 'Step 5',
    fields: ['model', 'description', 'bestWhen', 'pros', 'cons'],
  },
] as const

const sampleCase = mockCases[0]
const sampleIntermediary = mockIntermediaries.find((item) => item.linkedCaseId === sampleCase.id)
const sampleBarrier = mockBarriers.find((item) => item.linkedCaseId === sampleCase.id)
const sampleTool = mockTools.find((item) => item.tool === sampleBarrier?.recommendedTool) ?? mockTools[0]
const sampleExpansion = mockExpansionOptions[0]


const processSteps = [
  { title: 'Step 1', description: 'Identify and define the development challenge', answer: 'Yes', decision: 'Proceed' },
  { title: 'Step 2', description: 'Map the intermediaries already addressing the issue', answer: 'Yes', decision: 'Proceed' },
  { title: 'Step 3', description: 'Diagnose the project stage and barriers', answer: 'Yes', decision: 'Proceed' },
  { title: 'Step 4', description: 'Recommend a blended finance tool and risk', answer: 'Yes', decision: 'Proceed' },
  { title: 'Step 5', description: 'Recommend a global expansion option for RPA', answer: 'Yes', decision: 'Proceed' },
] as const

const stepData: Record<string, Record<string, string>> = {
  Step1: {
    country: sampleCase.country,
    sdgTarget: sampleCase.sdgTarget,
    countryChallenges: sampleCase.countryChallenges,
    backgroundProblem: sampleCase.backgroundProblem,
    existingProject: sampleCase.existingProject,
    developmentRationale: sampleCase.developmentRationale,
    expectedResults: sampleCase.expectedResults,
    safeguards: sampleCase.safeguards,
    sources: sampleCase.sources,
  },
  Step2: {
    intermediary: sampleIntermediary?.intermediary ?? '',
    type: sampleIntermediary?.type ?? '',
    whyRelevant: sampleIntermediary?.whyRelevant ?? '',
    role: sampleIntermediary?.role ?? '',
    geography: sampleIntermediary?.geography ?? '',
    relationshipStatus: sampleIntermediary?.relationshipStatus ?? '',
    linkedCountry: sampleIntermediary?.linkedCountry ?? '',
    linkedBarrier: sampleIntermediary?.linkedBarrier ?? '',
  },
  Step3: {
    primaryBarrier: sampleBarrier?.primaryBarrier ?? '',
    barrierDescription: sampleBarrier?.barrierDescription ?? '',
    observableSigns: sampleBarrier?.observableSigns ?? '',
    projectStage: sampleBarrier?.projectStage ?? '',
    recommendedTool: sampleBarrier?.recommendedTool ?? '',
    source: sampleBarrier?.source ?? '',
  },
  Step4: {
    tool: sampleTool.tool,
    description: sampleTool.description,
    bestWhen: sampleTool.bestWhen,
    strengths: sampleTool.strengths.join(' | '),
    weaknesses: sampleTool.weaknesses.join(' | '),
    riskMethodologies: sampleTool.riskMethodologies.join(' | '),
    source: sampleTool.source,
  },
  Step5: {
    model: sampleExpansion.model,
    description: sampleExpansion.description,
    bestWhen: sampleExpansion.bestWhen,
    pros: sampleExpansion.pros.join(' | '),
    cons: sampleExpansion.cons.join(' | '),
  },
}

function RecommendPage() {
  return (
    <div className="space-y-6 pb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Decision Flow</h1>
        <p className="text-sm text-gray-500 mt-1">
          Step-by-step decision inputs are shown first, followed by the recommendation engine output.
        </p>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Decision Flow Diagram</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {processSteps.map((step) => (
            <article key={step.title} className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-2">
              <p className="text-xs font-bold text-slate-700">{step.title}</p>
              <p className="text-xs text-slate-600 min-h-[56px]">{step.description}</p>
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold">{step.answer}</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold">{step.decision}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {fieldGroups.map((group) => {
          const key = group.title.replace(' ', '')
          const data = stepData[key]
          return (
            <article key={group.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-bold text-gray-900 mb-3">{group.title} Fields</h3>
              <div className="space-y-2">
                {group.fields.map((field) => (
                  <div key={field} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
                    <p className="text-[11px] uppercase tracking-wide text-gray-500">{field}</p>
                    <p className="text-xs text-gray-700 mt-1 break-words">{data?.[field] || '—'}</p>
                  </div>
                ))}
              </div>
            </article>
          )
        })}
      </section>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-amber-800">Rule-Based Demo</p>
          <p className="text-xs text-amber-700 mt-0.5">
            This recommendation engine uses pre-configured rules mapped from the strategic scorecard logic.
            In production, connect it to the live case data or a model-driven scoring system.
          </p>
        </div>
      </div>

      <RecommendationPanel />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-700">How Recommendations Are Generated</h3>
        </div>
        <div className="space-y-3">
          <RuleRow barrier="Early-Stage Readiness" tool="Technical Assistance / Grants" />
          <RuleRow barrier="Investor Downside Risk" tool="First-Loss / Junior Capital" />
          <RuleRow barrier="Weak Economics / Long Payback" tool="Concessional Loan" />
          <RuleRow barrier="FX / Currency Risk" tool="Hedging / Local Currency Facility" />
          <RuleRow barrier="Social Outcome Monetization" tool="Outcome-Based Incentives" />
          <RuleRow barrier="Regulatory / Policy Barrier" tool="Technical Assistance / Grants" />
          <RuleRow barrier="Capacity Gap" tool="Technical Assistance / Grants" />
        </div>
      </div>
    </div>
  )
}

function RuleRow({ barrier, tool }: { barrier: string; tool: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-gray-600">
      <span className="shrink-0 font-medium text-gray-700 w-64">{barrier}</span>
      <span className="text-gray-300">→</span>
      <span className="text-blue-700">{tool}</span>
    </div>
  )
}
