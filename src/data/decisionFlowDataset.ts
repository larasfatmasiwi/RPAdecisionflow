import type { BarrierOption, ExpansionOption, ToolOption } from '@/utils/decisionFlowConfig'

export interface CountryProfile {
  country: string
  sdgTarget: string
  challenge: string
  background: string[]
  developmentRationale: string[]
  expectedResults: string[]
  safeguards: string[]
  sources: string[]
}

export interface IntermediaryProfile {
  country: string
  projectContext: string
  intermediary: string
  description: string
  role: string
  sources: string[]
}

export interface ToolScoreRow {
  tool: ToolOption
  barrierFit: number
  mobilizationPotential: number
  financialAdditionality: number
  developmentAdditionality: number
  concessionalityDiscipline: number
  implementationFeasibility: number
  impactMeasurability: number
  averageScore: number
  rank: number
  notes: string
}

export interface ExpansionScoreRow {
  model: ExpansionOption
  speed: number
  cost: number
  localOwnership: number
  scalability: number
  capacityBuilding: number
  regulatoryFeasibility: number
  averageScore: number
  rank: number
  notes: string
}

export interface ProjectScenario {
  id: string
  projectName: string
  country: string
  projectSummary: string
  primaryBarrier: string
  barrierOption: BarrierOption
  secondaryRisks: string[]
  diagnosisNarrative: string
  stageDiagnosis: string
  bestFittingTool: ToolOption
  toolHighestAverage: number
  toolInterpretation: string
  recommendedExpansion: ExpansionOption
  expansionHighestAverage: number
  expansionInterpretation: string
}

export const countryProfiles: CountryProfile[] = [
  {
    country: 'Japan',
    sdgTarget: 'SDG 3 - Good health and well-being',
    challenge: 'Aging population',
    background: [
      'In 2023, 29.1% of the population was aged 65+ while the working-age population was 59.5%.',
      'Total fertility rate was 1.20 (2023) and total population was 123.75 million (2024), with ongoing decline.',
      'By 2040, Japan may need 690,000 additional nursing-care workers according to MHLW.',
      'Health spending is 11.5% of GDP and social security exceeds 36% of national expenditure (FY2023).',
    ],
    developmentRationale: [
      'Community-based integrated care links healthcare, long-term care, prevention, housing, and daily-life support.',
      'Toyota City’s Zutto Genki preventive-care model is relevant for healthier ageing and lowering long-term care costs.',
    ],
    expectedResults: ['Create cost savings for long-term healthcare through preventive care and stronger social participation among older residents. According to the 11-year prospective cohort study of healthy Japanese older adults, compared with non-participants, respondents who took part in hobby groups or sports activities once a week incurred lower costs for LTCI services (approximately US$3.5 and US$6.1 thousand, respectively, per person), even after demographic variables and health status at baseline were controlled.'],
    safeguards: [
      'Government involvement to align elderly-care policy.',
      'Inclusiveness, transparency, accountability, and stakeholder alignment across municipal systems.',
    ],
    sources: [
      'https://www.stat.go.jp/english/data/jinsui/2023np/index.html',
      'https://www.mhlw.go.jp/content/10807000/001303599.pdf',
      'https://www.city.toyota.aichi.jp/_res/projects/default_project/_page_/001/044/582/r0604/01.pdf',
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/07/health-at-a-glance-2023_39bcb58d/japan_0b0de6bb/1b4f5f1d-en.pdf',
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2024/01/oecd-economic-surveys-japan-2024_9289b572/41e807f9-en.pdf',
      'https://www.mhlw.go.jp/content/10500000/000591805.pdf',
      'https://www.city.toyota.aichi.jp/_res/projects/default_project/page/001/058/887/02.pdf',
      'https://www.clair.or.jp/j/library/docs/2021he-toyota.pdf',
    ],
  },
  {
    country: 'Indonesia',
    sdgTarget: 'SDG 7 - Affordable and clean energy',
    challenge: 'Clean energy transition',
    background: [
      'National electrification reached 99.83% in 2024; challenge has shifted to cleaner supply growth.',
      'Electricity sales reached 303.4 TWh in 2024, with demand around 445 TWh by 2030 in current trajectories.',
      'ESDM highlights East Nusa Tenggara, Maluku, and Papua for focused attention.',
      'Small clean-energy projects often remain too small, risky, or weakly structured for normal commercial debt.',
    ],
    developmentRationale: [
      'Catalytic capital is needed to close viability gaps for small renewables.',
      'SDG Indonesia One blends public-private capital and Pandanduri shows a concrete case with measurable implementation progress.',
    ],
    expectedResults: ['Support progress toward clean-energy expansion. Pandanduri able to reach renewable energy capacity of 2 x 290 kW. Indonesia will be able to reach 75 GW of clean energy by 2040.'],
    safeguards: [
      'Project-level ESG due diligence and transparent viability-gap allocation.',
      'Stakeholder alignment between PT SMI, donors, and local sponsors.',
    ],
    sources: [
      'https://www.esdm.go.id/assets/media/content/content-handbook-of-energy-and-economic-statistics-of-indonesia-2024.pdf',
      'https://www.esdm.go.id/en/berita-unit/directorate-general-of-electricity/ruptl-2021-2030-diterbitkan-porsi-ebt-diperbesar',
      'https://web.pln.co.id/statics/uploads/2025/06/b967d-ruptl-pln-2025-2034-pub-.pdf',
      'https://energyandcleanair.org/wp/wp-content/uploads/2025/09/CREA_EN-IDN-Briefing-Indonesias-RUPTL-2025-2034_-Fossils-first-renewables-later.pdf',
      'https://ember-energy.org/latest-insights/indonesias-expansion-of-clean-power-can-spur-growth-and-equality/',
      'https://www.esdm.go.id/en/media-center/news-archives/bigger-share-given-to-renewables-in-2021-2030-electricity-procurement-plan',
      'https://www.ptsmi.co.id/statement-on-climate-change-issue',
      'https://www.ptsmi.co.id/cfind/source/files/sustainable-funding/sustainalytics-second-party-opinion-on-pt-smis-sustainable-funding-framework.pdf',
      'https://www.ptsmi.co.id/uk-climate-minister-reviews-pandanduri-micro-hydroelectric-power-plant-appreciates-collaboration-with-pt-smi',
    ],
  },
]

export const intermediaryProfiles: IntermediaryProfile[] = [
  {
    country: 'Japan',
    projectContext: 'Toyota City long-term care prevention / SIB',
    intermediary: 'Dream Incubator (DI)',
    description: 'Strategy and business-investment firm promoting SIBs in Japan and supporting Toyota City initiative structuring.',
    role: 'Structured Toyota City SIB model to reduce seniors needing nursing care and future care costs.',
    sources: [
      'https://www.dreamincubator.co.jp/wp/wp-content/uploads/2022/05/DIREPORT_SIB_EN.pdf',
      'https://www.dreamincubator.co.jp/wp-content/uploads/2021/01/210105_SIB_DI_Toyotacity_EN01.pdf',
    ],
  },
  {
    country: 'Japan',
    projectContext: 'Toyota City long-term care prevention / SIB',
    intermediary: 'Next Rise Social Impact Action LLC (NRS)',
    description: 'Operating entity contracted by Toyota City (July 2021–June 2026) for social service implementation.',
    role: 'Implementation intermediary running and promoting social-participation services; selected service providers.',
    sources: ['https://www.dreamincubator.co.jp/wp/wp-content/uploads/2022/05/DIREPORT_SIB_EN.pdf'],
  },
  {
    country: 'Indonesia',
    projectContext: 'SDG Indonesia One / Pandanduri',
    intermediary: 'PT Sarana Multi Infrastruktur (PT SMI)',
    description: 'State-owned DFI anchoring SDG Indonesia One blended-finance platform.',
    role: 'Platform intermediary structuring transactions, project development support, and multi-facility management.',
    sources: ['https://www.ptsmi.co.id/cfind/source/files/annual-report/annual-report-pt-smi-2024.pdf'],
  },
  {
    country: 'Indonesia',
    projectContext: 'Pandanduri / hydropower blended-finance package',
    intermediary: 'MENTARI',
    description: 'UK-funded clean-energy support program providing catalytic grants.',
    role: 'Grant/de-risking intermediary to improve viability and unlock PT SMI financing for small hydropower plants.',
    sources: [
      'https://www.eeas.europa.eu/delegations/indonesia/sdg-indonesia-one_en',
      'https://mentari.info/2023/03/29/uk-government-to-provide-idr-21-billion-through-mentari-programme-for-a-blended-finance-vehicle-with-pt-smi-to-three-hydropower-plants-in-indonesia/',
    ],
  },
]

export const projectScenarios: ProjectScenario[] = [
  {
    id: 'toyota-zutto-genki',
    projectName: 'Long-term care prevention (Toyota City / Zutto Genki)',
    country: 'Japan',
    projectSummary:
      'A preventive long-term care initiative in Toyota City using a Social Impact Bond structure to reduce future LTC costs through social participation and measurable outcomes.',
    primaryBarrier:
      'Proving social outcomes + time lag between intervention and fiscal savings; also public-sector implementation capacity and participant acquisition.',
    barrierOption: 'social outcomes hard to monetize',
    secondaryRisks: ['Public-sector implementation capacity constraints', 'Participant acquisition risk'],
    diagnosisNarrative:
      'This is not a classic asset-financing barrier. The constraint is outcome credibility and delayed fiscal benefit realization, making outcomes-based payment logic the best fit.',
    stageDiagnosis: 'financing stage / operationalization for outcome verification',
    bestFittingTool: 'Outcome-based Incentives / SIB',
    toolHighestAverage: 8.4,
    toolInterpretation:
      'Highest scoring instrument is Outcome-based incentives (SIB/DIB/performance grants). TA can support design but is secondary.',
    recommendedExpansion: 'Local Hybrid',
    expansionHighestAverage: 7.3,
    expansionInterpretation:
      'Local Hybrid balances local legitimacy with external operating and evaluation support in a sensitive municipal-care context.',
  },
  {
    id: 'pandanduri-mini-hydro',
    projectName: 'Pandanduri mini-hydro',
    country: 'Indonesia',
    projectSummary:
      'Mini-hydro project with blended structure combining viability-gap support, PT SMI senior debt, and sponsor contribution.',
    primaryBarrier:
      'Viability gap / economics too weak for normal bank lending, combined with residual downside risk at late-construction/pre-operation stage.',
    barrierOption: 'returns too low',
    secondaryRisks: ['Downside risk perception', 'FX mismatch risk if hard-currency exposure emerges'],
    diagnosisNarrative:
      'At 97% construction progress (March 2025), core issue is no longer early-stage investability but risk-adjusted return adequacy and sustainability of operating economics.',
    stageDiagnosis: 'late construction / pre-operation',
    bestFittingTool: 'Concessional Loan',
    toolHighestAverage: 8.3,
    toolInterpretation:
      'Best fit is concessional loan / buy-down logic because catalytic VGF support appears central to closing viability gap and unlocking senior debt.',
    recommendedExpansion: 'Hybrid',
    expansionHighestAverage: 7.2,
    expansionInterpretation:
      'Hybrid is fastest and most resource-efficient for scaling infrastructure pipeline support with added local advisory capacity.',
  },
]

export const toolScoringByProject: Record<string, ToolScoreRow[]> = {
  'toyota-zutto-genki': [
    { tool: 'Outcome-based Incentives / SIB', barrierFit: 10, mobilizationPotential: 7, financialAdditionality: 8, developmentAdditionality: 9, concessionalityDiscipline: 8, implementationFeasibility: 7, impactMeasurability: 10, averageScore: 8.4, rank: 1, notes: 'Best fit for verified social outcomes and results-based payments.' },
    { tool: 'Technical Assistance / Grants', barrierFit: 6, mobilizationPotential: 3, financialAdditionality: 4, developmentAdditionality: 8, concessionalityDiscipline: 7, implementationFeasibility: 8, impactMeasurability: 6, averageScore: 6.0, rank: 2, notes: 'Useful supporting tool for design and evidence strengthening.' },
    { tool: 'Concessional Loan', barrierFit: 3, mobilizationPotential: 4, financialAdditionality: 3, developmentAdditionality: 4, concessionalityDiscipline: 5, implementationFeasibility: 5, impactMeasurability: 4, averageScore: 4.0, rank: 3, notes: 'Not aligned with core outcome-payment logic.' },
    { tool: 'Guarantee / Risk-sharing', barrierFit: 2, mobilizationPotential: 4, financialAdditionality: 2, developmentAdditionality: 2, concessionalityDiscipline: 6, implementationFeasibility: 4, impactMeasurability: 3, averageScore: 3.3, rank: 4, notes: 'Main barrier is not classic downside risk of cash-flow asset.' },
    { tool: 'First-loss / Junior Capital', barrierFit: 2, mobilizationPotential: 5, financialAdditionality: 3, developmentAdditionality: 2, concessionalityDiscipline: 4, implementationFeasibility: 3, impactMeasurability: 3, averageScore: 3.1, rank: 5, notes: 'Too heavy for social prevention model.' },
    { tool: 'Hedging / Local-currency Facility', barrierFit: 1, mobilizationPotential: 1, financialAdditionality: 1, developmentAdditionality: 1, concessionalityDiscipline: 2, implementationFeasibility: 2, impactMeasurability: 1, averageScore: 1.3, rank: 6, notes: 'FX barrier is minimal for this case.' },
  ],
  'pandanduri-mini-hydro': [
    { tool: 'Concessional Loan', barrierFit: 10, mobilizationPotential: 8, financialAdditionality: 9, developmentAdditionality: 8, concessionalityDiscipline: 8, implementationFeasibility: 8, impactMeasurability: 7, averageScore: 8.3, rank: 1, notes: 'Best fit for viability-gap closure and debt unlock.' },
    { tool: 'Guarantee / Risk-sharing', barrierFit: 7, mobilizationPotential: 8, financialAdditionality: 7, developmentAdditionality: 6, concessionalityDiscipline: 6, implementationFeasibility: 6, impactMeasurability: 6, averageScore: 6.6, rank: 2, notes: 'Strong secondary option for residual downside risk.' },
    { tool: 'First-loss / Junior Capital', barrierFit: 5, mobilizationPotential: 8, financialAdditionality: 7, developmentAdditionality: 6, concessionalityDiscipline: 4, implementationFeasibility: 4, impactMeasurability: 6, averageScore: 5.7, rank: 3, notes: 'Could work but adds complexity versus actual case structure.' },
    { tool: 'Technical Assistance / Grants', barrierFit: 5, mobilizationPotential: 2, financialAdditionality: 4, developmentAdditionality: 6, concessionalityDiscipline: 8, implementationFeasibility: 8, impactMeasurability: 5, averageScore: 5.4, rank: 4, notes: 'Useful for prep but not primary for late-stage viability gap.' },
    { tool: 'Hedging / Local-currency Facility', barrierFit: 3, mobilizationPotential: 3, financialAdditionality: 2, developmentAdditionality: 2, concessionalityDiscipline: 6, implementationFeasibility: 5, impactMeasurability: 3, averageScore: 3.4, rank: 5, notes: 'Secondary relevance only if FX mismatch appears.' },
    { tool: 'Outcome-based Incentives / SIB', barrierFit: 2, mobilizationPotential: 2, financialAdditionality: 2, developmentAdditionality: 5, concessionalityDiscipline: 4, implementationFeasibility: 3, impactMeasurability: 5, averageScore: 3.3, rank: 6, notes: 'Not primary for infrastructure bankability challenge.' },
  ],
}

export const expansionScoringByProject: Record<string, ExpansionScoreRow[]> = {
  'toyota-zutto-genki': [
    { model: 'Local Hybrid', speed: 7, cost: 6, localOwnership: 9, scalability: 6, capacityBuilding: 8, regulatoryFeasibility: 8, averageScore: 7.3, rank: 1, notes: 'Best balance for Japan context.' },
    { model: 'Deepen Local', speed: 5, cost: 6, localOwnership: 10, scalability: 4, capacityBuilding: 8, regulatoryFeasibility: 8, averageScore: 6.8, rank: 2, notes: 'High legitimacy, lower scaling speed.' },
    { model: 'Hybrid', speed: 8, cost: 8, localOwnership: 5, scalability: 8, capacityBuilding: 5, regulatoryFeasibility: 6, averageScore: 6.7, rank: 3, notes: 'Fast and efficient but weaker local legitimacy.' },
    { model: 'Local Repurposing', speed: 4, cost: 5, localOwnership: 8, scalability: 5, capacityBuilding: 8, regulatoryFeasibility: 7, averageScore: 6.2, rank: 4, notes: 'Requires adaptation time and governance work.' },
    { model: 'New Build', speed: 2, cost: 2, localOwnership: 7, scalability: 6, capacityBuilding: 9, regulatoryFeasibility: 5, averageScore: 5.2, rank: 5, notes: 'Slow and resource-intensive entry path.' },
  ],
  'pandanduri-mini-hydro': [
    { model: 'Hybrid', speed: 8, cost: 8, localOwnership: 6, scalability: 8, capacityBuilding: 6, regulatoryFeasibility: 7, averageScore: 7.2, rank: 1, notes: 'Best blend of speed, cost efficiency, and scalability.' },
    { model: 'Local Hybrid', speed: 5, cost: 5, localOwnership: 8, scalability: 6, capacityBuilding: 8, regulatoryFeasibility: 6, averageScore: 6.3, rank: 2, notes: 'Credible middle path with stronger local legitimacy.' },
    { model: 'Deepen Local', speed: 4, cost: 5, localOwnership: 9, scalability: 4, capacityBuilding: 8, regulatoryFeasibility: 6, averageScore: 6.0, rank: 3, notes: 'Good legitimacy but slower scale-up.' },
    { model: 'Local Repurposing', speed: 3, cost: 4, localOwnership: 7, scalability: 4, capacityBuilding: 7, regulatoryFeasibility: 5, averageScore: 5.0, rank: 4, notes: 'Slow route for project class needing quick deal support.' },
    { model: 'New Build', speed: 2, cost: 2, localOwnership: 7, scalability: 6, capacityBuilding: 9, regulatoryFeasibility: 4, averageScore: 5.0, rank: 4, notes: 'Long-term capacity upside but too slow/expensive for immediate pipeline.' },
  ],
}
