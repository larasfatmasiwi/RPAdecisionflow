// TypeScript interfaces for the Blended Finance Strategic Scorecard
// Each interface maps to a sheet in the Excel workbook

// Step 1: Country Problem Identification
export interface CountryCase {
  id: string
  country: string
  sdgTarget: string
  countryChallenges: string
  backgroundProblem: string
  existingProject: string
  developmentRationale: string
  expectedResults: string
  safeguards: string
  sources: string
}

// Step 2: Intermediary and Barrier Assessment
export interface Intermediary {
  id: string
  linkedCaseId: string
  intermediary: string
  type: string
  whyRelevant: string
  role: string
  geography: string
  relationshipStatus: 'Existing' | 'Potential' | 'Unknown'
  linkedCountry: string
  linkedBarrier: string
}

// Step 3: Barrier Diagnosis and Recommended Blended Finance Tool
export interface BarrierAssessment {
  id: string
  linkedCaseId: string
  primaryBarrier: BarrierType
  barrierDescription: string
  observableSigns: string
  projectStage: ProjectStage
  recommendedTool: BlendedFinanceTool
  toolRationale: string
  source: string
}

// Step 4: Blended Finance Tool Reference
export interface BlendedFinanceToolRef {
  tool: BlendedFinanceTool
  description: string
  bestWhen: string
  strengths: string[]
  weaknesses: string[]
  riskMethodologies: string[]
  source: string
}

// Step 5: Global Expansion Option Reference
export interface ExpansionOptionRef {
  model: ExpansionModel
  description: string
  bestWhen: string
  pros: string[]
  cons: string[]
  implementationImplications: string
}

// Expansion recommendation for a case
export interface ExpansionRecommendation {
  linkedCaseId: string
  recommendedModel: ExpansionModel
  rationale: string
  feasibilityNotes: string
}

// Enums / union types
export type BarrierType =
  | 'Early-Stage Readiness'
  | 'Investor Downside Risk'
  | 'Weak Economics / Long Payback'
  | 'FX / Currency Risk'
  | 'Social Outcome Monetization'
  | 'Regulatory / Policy Barrier'
  | 'Capacity Gap'

export type BlendedFinanceTool =
  | 'Technical Assistance / Grants'
  | 'Guarantee / Risk-Sharing'
  | 'First-Loss / Junior Capital'
  | 'Concessional Loan'
  | 'Hedging / Local Currency Facility'
  | 'Outcome-Based Incentives'

export type ExpansionModel =
  | 'Deepen Local'
  | 'Local Repurposing'
  | 'New Build'
  | 'Local Hybrid'
  | 'Hybrid'

export type ProjectStage =
  | 'Concept'
  | 'Pipeline'
  | 'Preparation'
  | 'Implementation'
  | 'Scale-Up'

// Composite full case (combines all steps)
export interface FullCase {
  case: CountryCase
  intermediaries: Intermediary[]
  barrier: BarrierAssessment
  expansion: ExpansionRecommendation
}
