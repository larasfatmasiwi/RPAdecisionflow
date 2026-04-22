/**
 * Recommendation engine: rule-based logic mapping barriers to blended finance tools
 * and expansion dimensions to expansion models.
 *
 * TODO: Replace with data-driven logic once live Excel data is connected.
 */

import type { BarrierType, BlendedFinanceTool, ExpansionModel } from '@/types'

export function recommendTool(barrier: BarrierType): {
  tool: BlendedFinanceTool
  rationale: string
} {
  const map: Record<BarrierType, { tool: BlendedFinanceTool; rationale: string }> = {
    'Early-Stage Readiness': {
      tool: 'Technical Assistance / Grants',
      rationale:
        'TA/Grants address lack of bankable project structures, feasibility studies, and developer capacity before commercial capital can be deployed.',
    },
    'Investor Downside Risk': {
      tool: 'First-Loss / Junior Capital',
      rationale:
        'First-loss tranches absorb initial losses, protecting senior investors and improving risk-adjusted returns to commercial levels.',
    },
    'Weak Economics / Long Payback': {
      tool: 'Concessional Loan',
      rationale:
        'Concessional financing reduces WACC to levels compatible with long-payback projects where commercial debt would render the project unviable.',
    },
    'FX / Currency Risk': {
      tool: 'Hedging / Local Currency Facility',
      rationale:
        'Currency hedging instruments eliminate FX mismatch between investor currency and local revenue, removing the key deterrent for foreign capital.',
    },
    'Social Outcome Monetization': {
      tool: 'Outcome-Based Incentives',
      rationale:
        'Results-based finance ties payments to verified outcomes, creating credible revenue streams for projects with social or environmental returns.',
    },
    'Regulatory / Policy Barrier': {
      tool: 'Technical Assistance / Grants',
      rationale:
        'TA grants can fund policy reform support, regulatory navigation, and institutional capacity building required to unlock private investment.',
    },
    'Capacity Gap': {
      tool: 'Technical Assistance / Grants',
      rationale:
        'TA grants build institutional capacity of intermediaries, project developers, and governments to prepare and manage blended finance transactions.',
    },
  }
  return map[barrier]
}

export type ExpansionDimensions = {
  needsLocalOwnership: boolean
  speedPriority: boolean
  costConstrained: boolean
  capacityBuildingNeeded: boolean
  scalabilityPriority: boolean
  regulatoryComplexity: boolean
}

export function recommendExpansionModel(dims: ExpansionDimensions): {
  model: ExpansionModel
  rationale: string
} {
  const score: Record<ExpansionModel, number> = {
    'Deepen Local': 0,
    'Local Repurposing': 0,
    'New Build': 0,
    'Local Hybrid': 0,
    Hybrid: 0,
  }

  if (dims.needsLocalOwnership) {
    score['Deepen Local'] += 2
    score['Local Hybrid'] += 1
  }
  if (dims.speedPriority) {
    score['Deepen Local'] += 2
    score['Local Repurposing'] += 1
  }
  if (dims.costConstrained) {
    score['Deepen Local'] += 1
    score['Local Repurposing'] += 2
  }
  if (dims.capacityBuildingNeeded) {
    score['New Build'] += 1
    score['Local Hybrid'] += 1
  }
  if (dims.scalabilityPriority) {
    score['Hybrid'] += 3
    score['New Build'] += 1
  }
  if (dims.regulatoryComplexity) {
    score['Deepen Local'] += 1
    score['Local Hybrid'] += 1
    score['Hybrid'] -= 1
  }

  const best = (Object.entries(score) as [ExpansionModel, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0][0]

  const rationales: Record<ExpansionModel, string> = {
    'Deepen Local': 'Strong local foundations and ownership priorities favor deepening existing programs before geographic expansion.',
    'Local Repurposing': 'Cost constraints and speed priorities favor repurposing existing infrastructure for adjacent use cases.',
    'New Build': 'Scalability priority with capacity building needs suggests a purpose-built structure optimized for the new context.',
    'Local Hybrid': 'Local ownership requirements combined with need for some replication suggests a hybrid approach balancing both.',
    Hybrid: 'Scalability priority points to a multi-country platform structure to attract institutional capital at scale.',
  }

  return { model: best, rationale: rationales[best] }
}
