import type { BarrierType, BlendedFinanceTool, ExpansionModel, ProjectStage } from '@/types'

type BadgeVariant = 'barrier' | 'tool' | 'expansion' | 'stage' | 'status' | 'default'

interface BadgeProps {
  label: string
  variant?: BadgeVariant
}

const barrierColors: Record<BarrierType, string> = {
  'Early-Stage Readiness': 'bg-amber-50 text-amber-700 border-amber-200',
  'Investor Downside Risk': 'bg-red-50 text-red-700 border-red-200',
  'Weak Economics / Long Payback': 'bg-orange-50 text-orange-700 border-orange-200',
  'FX / Currency Risk': 'bg-purple-50 text-purple-700 border-purple-200',
  'Social Outcome Monetization': 'bg-teal-50 text-teal-700 border-teal-200',
  'Regulatory / Policy Barrier': 'bg-blue-50 text-blue-700 border-blue-200',
  'Capacity Gap': 'bg-gray-100 text-gray-700 border-gray-200',
}

const toolColors: Record<BlendedFinanceTool, string> = {
  'Technical Assistance / Grants': 'bg-green-50 text-green-700 border-green-200',
  'Guarantee / Risk-Sharing': 'bg-blue-50 text-blue-700 border-blue-200',
  'First-Loss / Junior Capital': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Concessional Loan': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Hedging / Local Currency Facility': 'bg-violet-50 text-violet-700 border-violet-200',
  'Outcome-Based Incentives': 'bg-pink-50 text-pink-700 border-pink-200',
}

const expansionColors: Record<ExpansionModel, string> = {
  'Deepen Local': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Local Repurposing': 'bg-lime-50 text-lime-700 border-lime-200',
  'New Build': 'bg-sky-50 text-sky-700 border-sky-200',
  'Local Hybrid': 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200',
  Hybrid: 'bg-rose-50 text-rose-700 border-rose-200',
}

const stageColors: Record<ProjectStage, string> = {
  Concept: 'bg-gray-100 text-gray-600 border-gray-200',
  Pipeline: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  Preparation: 'bg-orange-50 text-orange-700 border-orange-200',
  Implementation: 'bg-blue-50 text-blue-700 border-blue-200',
  'Scale-Up': 'bg-green-50 text-green-700 border-green-200',
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  let colorClass = 'bg-gray-100 text-gray-700 border-gray-200'

  if (variant === 'barrier' && label in barrierColors) {
    colorClass = barrierColors[label as BarrierType]
  } else if (variant === 'tool' && label in toolColors) {
    colorClass = toolColors[label as BlendedFinanceTool]
  } else if (variant === 'expansion' && label in expansionColors) {
    colorClass = expansionColors[label as ExpansionModel]
  } else if (variant === 'stage' && label in stageColors) {
    colorClass = stageColors[label as ProjectStage]
  } else if (variant === 'status') {
    colorClass =
      label === 'Existing' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
      label === 'Potential' ? 'bg-amber-50 text-amber-700 border-amber-200' :
      'bg-gray-100 text-gray-600 border-gray-200'
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {label}
    </span>
  )
}
