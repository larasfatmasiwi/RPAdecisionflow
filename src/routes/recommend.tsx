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
          Recreated process diagram for the full decision flow logic.
        </p>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">Decision Flow Diagram</h2>
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-[#efeff7]">
          <FlowChartSvg />
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

function FlowChartSvg() {
  return (
    <svg viewBox="0 0 2350 310" className="w-[2350px] h-[310px] text-[10px] fill-none">
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="#6b7280" />
        </marker>
      </defs>

      <circle cx="35" cy="155" r="20" fill="#97f0be" stroke="#6b7280" />
      <text x="35" y="158" textAnchor="middle" fill="#111827">Start</text>

      <Box x={80} y={140} w={130} h={30} label="Step 1: Context Intake" />
      <Path d="M55 155 L80 155" />
      <Box x={260} y={140} w={180} h={30} label="Country + SDG + challenge details" skew />
      <Path d="M210 155 L260 155" />
      <Diamond x={500} y={155} w={95} h={42} label="Data valid?" />
      <Path d="M440 155 L452 155" />
      <Circle x={595} y={105} r={22} label="No" pink />
      <Path d="M548 136 L577 114" />
      <Box x={630} y={140} w={150} h={30} label="Step 2: Intermediaries" />
      <Path d="M548 174 L630 155" label="Yes" />
      <Box x={820} y={140} w={180} h={30} label="Map actors + roles + linkage" skew />
      <Path d="M780 155 L820 155" />

      <Diamond x={1060} y={155} w={95} h={42} label="Barrier?" />
      <Path d="M1000 155 L1012 155" />
      <Circle x={1155} y={105} r={22} label="No" pink />
      <Path d="M1108 136 L1137 114" />
      <Box x={1190} y={140} w={150} h={30} label="Step 3: Diagnosis" />
      <Path d="M1108 174 L1190 155" label="Yes" />

      <Diamond x={1400} y={155} w={95} h={42} label="Tool fit?" />
      <Path d="M1340 155 L1352 155" />
      <Box x={1540} y={40} w={130} h={30} label="TA / Grants" />
      <Box x={1540} y={85} w={130} h={30} label="Guarantee" />
      <Box x={1540} y={130} w={130} h={30} label="First-loss" />
      <Box x={1540} y={175} w={130} h={30} label="Concessional Loan" />
      <Box x={1540} y={220} w={130} h={30} label="Hedging" />
      <Box x={1540} y={265} w={130} h={30} label="Outcome Incentive" />
      <Path d="M1495 155 L1540 55" label="Barrier A" />
      <Path d="M1495 155 L1540 100" label="Barrier B" />
      <Path d="M1495 155 L1540 145" label="Barrier C" />
      <Path d="M1495 155 L1540 190" label="Barrier D" />
      <Path d="M1495 155 L1540 235" label="Barrier E" />
      <Path d="M1495 155 L1540 280" label="Barrier F" />

      <Box x={1710} y={140} w={160} h={30} label="Step 4: Tool + risk output" />
      <Path d="M1670 145 L1710 155" />
      <Box x={1910} y={140} w={190} h={30} label="Step 5: Global expansion option" skew />
      <Path d="M1870 155 L1910 155" />
      <Diamond x={2145} y={155} w={95} h={42} label="Proceed?" />
      <Path d="M2100 155 L2097 155" />

      <Circle x={2245} y={100} r={22} label="Review" yellow />
      <Path d="M2193 136 L2227 111" label="No" />
      <circle cx="2320" cy="155" r="20" fill="#97f0be" stroke="#6b7280" />
      <text x="2320" y="158" textAnchor="middle" fill="#111827">End</text>
      <Path d="M2193 174 L2300 155" label="Yes" />
    </svg>
  )
}

function Box({ x, y, w, h, label, skew = false }: { x: number; y: number; w: number; h: number; label: string; skew?: boolean }) {
  const points = skew
    ? `${x + 10},${y} ${x + w},${y} ${x + w - 10},${y + h} ${x},${y + h}`
    : undefined

  return (
    <g>
      {skew ? (
        <polygon points={points} fill="#edc49d" stroke="#6b7280" />
      ) : (
        <rect x={x} y={y} width={w} height={h} rx={3} fill="#edc49d" stroke="#6b7280" />
      )}
      <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fill="#111827">{label}</text>
    </g>
  )
}

function Diamond({ x, y, w, h, label }: { x: number; y: number; w: number; h: number; label: string }) {
  const halfW = w / 2
  const halfH = h / 2
  const points = `${x},${y - halfH} ${x + halfW},${y} ${x},${y + halfH} ${x - halfW},${y}`
  return (
    <g>
      <polygon points={points} fill="#f7f0a8" stroke="#6b7280" />
      <text x={x} y={y + 3} textAnchor="middle" fill="#111827">{label}</text>
    </g>
  )
}

function Circle({ x, y, r, label, pink = false, yellow = false }: { x: number; y: number; r: number; label: string; pink?: boolean; yellow?: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={pink ? '#f6c1c7' : yellow ? '#f7ef99' : '#bff4cd'} stroke="#6b7280" />
      <text x={x} y={y + 3} textAnchor="middle" fill="#111827">{label}</text>
    </g>
  )
}

function Path({ d }: { d: string; label?: string }) {
  return (
    <path d={d} stroke="#6b7280" strokeWidth="1.2" markerEnd="url(#arrow)" />
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
