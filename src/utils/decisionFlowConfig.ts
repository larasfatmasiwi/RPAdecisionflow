export type ProjectStageOption = 'early stage' | 'pre-bankable' | 'financing stage' | 'construction' | 'operating'

export type BarrierOption =
  | 'too early / not investable'
  | 'downside risk too high'
  | 'returns too low'
  | 'need to unlock investors'
  | 'FX risk'
  | 'social outcomes hard to monetize'

export type ToolOption =
  | 'Technical Assistance / Grants'
  | 'Guarantee / Risk-sharing'
  | 'Concessional Loan'
  | 'First-loss / Junior Capital'
  | 'Hedging / Local-currency Facility'
  | 'Outcome-based Incentives / SIB'

export type ExpansionOption = 'Deepen Local' | 'Local Repurposing' | 'New Build' | 'Local Hybrid' | 'Hybrid'

export type RecommendationStrength = 'Strong fit' | 'Conditional fit' | 'Reassess project'

export const stepLabels = [
  'Step 1: Development Challenge',
  'Step 2: Ecosystem Mapping',
  'Step 3: Stage + Barrier Diagnosis',
  'Step 4: Tool Scoring',
  'Step 5: Global Expansion',
] as const

export const toolCriteria = [
  'Barrier fit',
  'Mobilization potential',
  'Financial additionality',
  'Development additionality',
  'Concessionality discipline',
  'Implementation feasibility',
  'Results / impact measurability',
] as const

export const expansionCriteria = [
  'Speed',
  'Cost',
  'Local ownership',
  'Scalability',
  'Capacity building',
  'Regulatory feasibility',
] as const

export const stageBarrierToolMap: Record<BarrierOption, ToolOption> = {
  'too early / not investable': 'Technical Assistance / Grants',
  'downside risk too high': 'Guarantee / Risk-sharing',
  'returns too low': 'Concessional Loan',
  'need to unlock investors': 'First-loss / Junior Capital',
  'FX risk': 'Hedging / Local-currency Facility',
  'social outcomes hard to monetize': 'Outcome-based Incentives / SIB',
}

export const expansionOptions: ExpansionOption[] = [
  'Deepen Local',
  'Local Repurposing',
  'New Build',
  'Local Hybrid',
  'Hybrid',
]
