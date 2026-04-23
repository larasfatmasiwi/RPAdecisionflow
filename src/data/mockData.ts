import type {
  CountryCase,
  Intermediary,
  BarrierAssessment,
  BlendedFinanceToolRef,
  ExpansionOptionRef,
  ExpansionRecommendation,
} from '@/types'

// ─── Step 1: Country Cases ───────────────────────────────────────────────────
export const mockCases: CountryCase[] = [
  {
    id: 'case-001',
    country: 'Japan',
    sdgTarget: 'SDG 3 (Good Health and Well-Being)',
    countryChallenges:
      'Aging population, shrinking working-age population, rising healthcare and long-term care costs, and growing pressure on the care workforce.',
    backgroundProblem:
      'Japan is one of the world’s most aged societies. In 2023, 29.1% of the population was aged 65+, while the working-age population fell to 59.5%. The total fertility rate was 1.20 in 2023, and the total population was about 123.75 million in 2024 and continues to decline. This creates pressure on care systems because more older people need care while fewer workers are available to provide it. By 2040, Japan may need 690,000 additional nursing-care workers according to MHLW. Japan also spends 11.5% of GDP on health, above the OECD average, while social security spending exceeded 36% of national expenditure in FY2023.',
    existingProject:
      'Toyota City “Zutto Genki!” Project / long-term care prevention Social Impact Bond (SIB) initiative.',
    developmentRationale:
      'Japan is responding through community-based integrated care that combines healthcare, long-term care, prevention, housing, and daily-life support. Toyota City’s “Zutto Genki!” Project is relevant because it uses a preventive-care model to support healthy ageing, increase social participation, and potentially reduce future long-term care costs.',
    expectedResults:
      'Create cost savings for long-term healthcare through preventive care and stronger social participation among older residents. According to the 11-year prospective cohort study of healthy Japanese older adults, compared with non-participants, respondents who took part in hobby groups or sports activities once a week incurred lower costs for LTCI services (approximately US$3.5 and US$6.1 thousand, respectively, per person), even after demographic variables and health status at baseline were controlled',
    safeguards:
      'Government involvement to support elderly healthcare policy and broader quality considerations around public delivery, accountability, and social inclusion.',
    sources:
      'https://www.stat.go.jp/english/data/jinsui/2023np/index.html\nhttps://www.mhlw.go.jp/content/10807000/001303599.pdf\nhttps://www.city.toyota.aichi.jp/_res/projects/default_project/_page_/001/044/582/r0604/01.pdf\nhttps://www.oecd.org/content/dam/oecd/en/publications/reports/2025/07/health-at-a-glance-2023_39bcb58d/japan_0b0de6bb/1b4f5f1d-en.pdf\nhttps://www.oecd.org/content/dam/oecd/en/publications/reports/2024/01/oecd-economic-surveys-japan-2024_9289b572/41e807f9-en.pdf\nhttps://www.mhlw.go.jp/content/10500000/000591805.pdf\nhttps://www.city.toyota.aichi.jp/_res/projects/default_project/page/001/058/887/02.pdf\nhttps://www.clair.or.jp/j/library/docs/2021he-toyota.pdf',
  },
  {
    id: 'case-002',
    country: 'Indonesia',
    sdgTarget: 'SDG 7 (Affordable and Clean Energy)',
    countryChallenges:
      'Need for cleaner power supply to meet rising demand, financing gaps for small clean-energy projects, and continued difficulty making smaller renewable projects bankable on commercial terms.',
    backgroundProblem:
      'Indonesia’s challenge is no longer mainly basic electricity access, as national electrification had already reached 99.83% in 2024. The larger issue is meeting rising power demand with cleaner supply. Electricity sales reached 303.4 TWh in 2024 and demand is projected to reach around 445 TWh by 2030 under current planning trajectories. Some regions still need special attention, including East Nusa Tenggara, Maluku, and Papua. This creates a financing gap for small clean-energy projects that are developmentally important but often too small, risky, or weakly structured for normal commercial debt.',
    existingProject:
      'SDG Indonesia One blended-finance platform and the Pandanduri Mini-Hydro Power Plant project.',
    developmentRationale:
      'Catalytic capital matters because many clean-energy projects remain commercially difficult even when developmentally valuable. SDG Indonesia One was designed as a blended-finance platform to combine public and private capital and support sustainable infrastructure. Pandanduri is a strong example because it had a clear financing gap, identified catalytic support, named donors and lenders, and measurable implementation progress.',
    expectedResults:
      'Support progress toward clean-energy expansion, including the 75 GW clean-energy ambition referenced in the worksheet.',
    safeguards:
      'Quality considerations center on project bankability, donor and lender coordination, and disciplined use of catalytic support so concessional funding closes real viability gaps without over-subsidizing projects.',
    sources:
      'https://www.esdm.go.id/assets/media/content/content-handbook-of-energy-and-economic-statistics-of-indonesia-2024.pdf\nhttps://www.esdm.go.id/en/berita-unit/directorate-general-of-electricity/ruptl-2021-2030-diterbitkan-porsi-ebt-diperbesar\nhttps://web.pln.co.id/statics/uploads/2025/06/b967d-ruptl-pln-2025-2034-pub-.pdf\nhttps://energyandcleanair.org/wp/wp-content/uploads/2025/09/CREA_EN-IDN-Briefing-Indonesias-RUPTL-2025-2034_-Fossils-first-renewables-later.pdf\nhttps://ember-energy.org/latest-insights/indonesias-expansion-of-clean-power-can-spur-growth-and-equality/\nhttps://www.esdm.go.id/en/media-center/news-archives/bigger-share-given-to-renewables-in-2021-2030-electricity-procurement-plan\nhttps://www.ptsmi.co.id/statement-on-climate-change-issue\nhttps://www.ptsmi.co.id/cfind/source/files/sustainable-funding/sustainalytics-second-party-opinion-on-pt-smis-sustainable-funding-framework.pdf\nhttps://www.ptsmi.co.id/uk-climate-minister-reviews-pandanduri-micro-hydroelectric-power-plant-appreciates-collaboration-with-pt-smi',
  },
]

// ─── Step 2: Intermediaries ───────────────────────────────────────────────────
export const mockIntermediaries: Intermediary[] = [
  {
    id: 'int-001',
    linkedCaseId: 'case-001',
    intermediary: 'Dream Incubator (DI)',
    type: 'Private Sector / SIB Structuring Firm',
    whyRelevant:
      'Japanese strategy and business-investment firm that actively promoted Social Impact Bonds in Japan and worked with Toyota City on the care-prevention SIB initiative.',
    role: 'SIB Structuring and Project Design',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Japan',
    linkedBarrier: 'Outcome is social and hard to monetize',
  },
  {
    id: 'int-002',
    linkedCaseId: 'case-001',
    intermediary: 'Next Rise Social Impact Action LLC (NRS)',
    type: 'Implementation Intermediary / Operating Entity',
    whyRelevant:
      'Operating entity contracted by Toyota City to run and promote the project’s social-participation services from July 1, 2021 to June 30, 2026.',
    role: 'Implementation and Service Delivery Management',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Japan',
    linkedBarrier: 'Weak local implementing capacity',
  },
  {
    id: 'int-003',
    linkedCaseId: 'case-001',
    intermediary: 'JAGES (Japan Gerontological Evaluation Study)',
    type: 'Research and Evaluation Institution',
    whyRelevant:
      'Provides evidence and evaluation support that helps make preventive-care outcomes more credible and measurable in the Toyota City case.',
    role: 'Evidence Generation and Impact Measurement',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Japan',
    linkedBarrier: 'Outcome is social and hard to monetize',
  },
  {
    id: 'int-004',
    linkedCaseId: 'case-001',
    intermediary: 'SIIF (Japan Social Innovation and Investment Foundation)',
    type: 'Foundation / Ecosystem Builder',
    whyRelevant:
      'Strong ecosystem intermediary in Japan’s impact-investing and social-finance landscape, with emphasis on impact measurement and field building.',
    role: 'Ecosystem Building and Impact Finance Support',
    geography: 'National',
    relationshipStatus: 'Potential',
    linkedCountry: 'Japan',
    linkedBarrier: 'Outcome is social and hard to monetize',
  },
  {
    id: 'int-005',
    linkedCaseId: 'case-001',
    intermediary: 'Next Rise Social Impact Fund / DI Social Impact Capital',
    type: 'Impact Fund / Capital Intermediary',
    whyRelevant:
      'Represents the capital intermediation layer behind the SIB ecosystem and shows how institutional capital can support outcome-based projects in Japan.',
    role: 'Capital Intermediation and Fund Deployment',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Japan',
    linkedBarrier: 'Returns too low / payback too long',
  },
  {
    id: 'int-006',
    linkedCaseId: 'case-002',
    intermediary: 'PT Sarana Multi Infrastruktur (PT SMI)',
    type: 'State-Owned Development Finance Institution',
    whyRelevant:
      'Anchor of SDG Indonesia One and the primary platform intermediary for blended-finance transactions in Indonesia.',
    role: 'Platform Structuring, Lending, and Blended Finance Management',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Indonesia',
    linkedBarrier: 'Returns too low / payback too long',
  },
  {
    id: 'int-007',
    linkedCaseId: 'case-002',
    intermediary: 'MENTARI',
    type: 'Donor-Funded Clean Energy Support Programme',
    whyRelevant:
      'Provides targeted catalytic grant support to improve financial viability and unlock PT SMI financing for small renewable-energy projects.',
    role: 'Catalytic Grant Support and De-Risking',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Indonesia',
    linkedBarrier: 'Returns too low / payback too long',
  },
  {
    id: 'int-008',
    linkedCaseId: 'case-002',
    intermediary: 'EU support to SDG Indonesia One',
    type: 'Donor / Technical Assistance Partner',
    whyRelevant:
      'Provides grants and technical assistance to improve project preparation and bankability for small renewable-energy projects.',
    role: 'Project Preparation and Capacity Building',
    geography: 'Regional',
    relationshipStatus: 'Existing',
    linkedCountry: 'Indonesia',
    linkedBarrier: 'Project too early-stage / not investable',
  },
  {
    id: 'int-009',
    linkedCaseId: 'case-002',
    intermediary: 'PT Brantas Energi / PT SMI / MENTARI',
    type: 'Project-Level Blended Finance Consortium',
    whyRelevant:
      'Together they demonstrate how sponsor capital, concessional grant support, and development finance can be combined to move a small hydro project toward completion.',
    role: 'Project Financing, Grant Support, and Demonstration of Blended Finance in Practice',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Indonesia',
    linkedBarrier: 'Private investors fear downside loss',
  },
]

// ─── Step 3: Barrier Assessments ─────────────────────────────────────────────
export const mockBarriers: BarrierAssessment[] = [
  {
    id: 'barrier-001',
    linkedCaseId: 'case-001',
    primaryBarrier: 'Outcome is social and hard to monetize',
    barrierDescription:
      'The Toyota City project creates value mainly as public and social benefit rather than direct commercial revenue. Its financial logic depends on proving that preventive-care interventions can reduce future long-term care expenditure, even though the causal chain is long and benefits accrue over time.',
    observableSigns:
      'Monetization depends on avoided public costs rather than user-paid revenue; long result chain; time lag before savings appear; participant uptake and retention must be actively managed; implementation capacity was strained during COVID-19.',
    projectStage:
      'Social systems / service delivery stage; already in active implementation with midterm evaluation and evidence-building toward scale.',
    recommendedTool: 'Outcome-Based Incentives',
    toolRationale:
      'The Excel score matrix identifies outcome-based incentives as the best-fitting tool because the project is already designed as a SIB and its core strength lies in result-based payment tied to verifiable outcomes. Technical assistance may still matter as a supporting tool, but it is not the core instrument.',
    source:
      'Step 3 worksheet evidence and Step 4 score matrix / interpretation note for Long-term care prevention (Toyota City / Zutto Genki).',
  },
  {
    id: 'barrier-002',
    linkedCaseId: 'case-002',
    primaryBarrier: 'Returns too low / payback too long',
    barrierDescription:
      'Pandanduri is no longer mainly an early-stage investability problem. The main issue at its current stage is whether a small renewable-energy asset with limited scale can generate returns that are attractive enough, and sufficiently protected against downside risks, for private capital without continued concessional support.',
    observableSigns:
      'Project relied on a blended structure including PT SMI financing, a MENTARI-supported viability-gap grant, and sponsor capital; economics appear insufficient on purely ordinary commercial terms; residual concerns remain around operating performance, hydrology, maintenance, offtake reliability, and refinancing conditions.',
    projectStage:
      'Late construction / pre-operation stage; financing / operationalization stage where long payback and risk-adjusted return are the main issues.',
    recommendedTool: 'Concessional Loan',
    toolRationale:
      'The Excel score matrix identifies concessional loan as the best-fitting tool because the catalytic function is to close the viability gap so that PT SMI debt can come in. A guarantee may be a secondary option, but it is not the best-fitting core instrument.',
    source:
      'Step 3 worksheet evidence and Step 4 score matrix / interpretation note for Pandanduri mini-hydro.',
  },
]

// ─── Step 4: Blended Finance Tools Reference ─────────────────────────────────
export const mockTools: BlendedFinanceToolRef[] = [
  {
    tool: 'Technical Assistance / Grants',
    description:
      'Grant or TA support for feasibility, structuring, transaction preparation, sponsor strengthening, and pipeline development.',
    bestWhen:
      'Projects are still early-stage, not yet bankable, or need readiness support.',
    strengths: [
      'Strong fit for early-stage opportunities',
      'Improves project readiness and sponsor capacity',
      'Flexible and adaptable across sectors',
    ],
    weaknesses: [
      'Does not always mobilize capital quickly',
      'Financial impact is indirect at first',
      'Can be too soft if the real barrier is already beyond readiness',
    ],
    riskMethodologies: ['Regulatory risk', 'Expected loss'],
    source:
      'https://www.oecd.org/content/dam/oecd/en/events/2022/5/cefim_blended-finance-guidance-for-clean-energy---2nd-workshop/Guidance-note-OECD-DAC-Principle-2.pdf',
  },
  {
    tool: 'Guarantee / Risk-Sharing',
    description:
      'Instrument that absorbs part of losses or default risk to protect lenders or investors.',
    bestWhen:
      'Investors are interested but remain constrained by downside risk.',
    strengths: [
      'Strong mobilization potential',
      'Can crowd in lenders effectively',
      'Targets risk perception directly',
    ],
    weaknesses: [
      'Poor fit if the project is still immature',
      'Can be over-engineered',
      'Requires clear governance, pricing, and claims discipline',
    ],
    riskMethodologies: ['Expected loss'],
    source:
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2021/06/the-role-of-guarantees-in-blended-finance_cef700a2/730e1498-en.pdf',
  },
  {
    tool: 'First-Loss / Junior Capital',
    description:
      'Capital layer that takes the first losses to protect senior investors.',
    bestWhen:
      'The project is viable but still too risky for commercial capital on its own.',
    strengths: [
      'Strong risk absorption',
      'Can unlock more senior capital',
      'Useful for difficult blended structures',
    ],
    weaknesses: [
      'High risk for catalytic funders',
      'Can over-subsidize if barrier diagnosis is wrong',
      'Structuring can be complex',
    ],
    riskMethodologies: ['Expected loss', 'Value-at-risk'],
    source:
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2021/08/evaluating-blended-finance-instruments-and-mechanisms_c995f112/f1574c10-en.pdf',
  },
  {
    tool: 'Concessional Loan',
    description:
      'Below-market financing that improves economics, tenor, or affordability.',
    bestWhen:
      'Returns are too low, payback is too long, or affordability is the main constraint.',
    strengths: [
      'Helps improve financial viability',
      'Useful for affordability and tenor gaps',
      'Can support scale-up once a project is ready',
    ],
    weaknesses: [
      'Can distort markets if too concessional',
      'Needs strong discipline on subsidy sizing',
      'Not ideal if the real problem is still readiness',
    ],
    riskMethodologies: [
      'Expected loss',
      'Discounted cash flow',
      'Public-private partnership risk allocation',
    ],
    source:
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2021/08/evaluating-blended-finance-instruments-and-mechanisms_c995f112/f1574c10-en.pdf',
  },
  {
    tool: 'Hedging / Local Currency Facility',
    description:
      'Instrument that reduces FX risk or provides local-currency financing.',
    bestWhen:
      'The project has local-currency revenues but hard-currency liabilities.',
    strengths: [
      'Highly targeted to FX barriers',
      'Protects borrowers and investors from volatility',
      'Can make otherwise viable deals financeable',
    ],
    weaknesses: [
      'Technical and potentially costly',
      'Does not solve weak pipeline or poor governance',
      'May be unavailable in some markets',
    ],
    riskMethodologies: ['Political risk'],
    source:
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/02/unlocking-local-currency-financing-in-emerging-markets-and-developing-economies_af15df6a/bc84fde7-en.pdf',
  },
  {
    tool: 'Outcome-Based Incentives',
    description:
      'Payment structure where disbursement is tied to verified results rather than only inputs.',
    bestWhen:
      'Outcomes are highly social and difficult to monetize through normal revenue.',
    strengths: [
      'Strong accountability and measurement logic',
      'Useful for social systems and public-good outcomes',
      'Can align funding with verified results',
    ],
    weaknesses: [
      'Complex to structure',
      'Requires a credible evaluator and clear outcome payer',
      'Often involves long time lags before outcomes are verified',
    ],
    riskMethodologies: ['Rating agency methodologies'],
    source:
      'https://www.oecd.org/content/dam/oecd/en/publications/reports/2021/08/evaluating-blended-finance-instruments-and-mechanisms_c995f112/f1574c10-en.pdf',
  },
]

// ─── Step 5: Global Expansion Options Reference ───────────────────────────────
export const mockExpansionOptions: ExpansionOptionRef[] = [
  {
    model: 'Deepen Local',
    description:
      'Enhance the capacity of existing local fiscal sponsors and help build regional fiscal sponsorship capability.',
    bestWhen:
      'A capable local partner already exists and RPA wants to strengthen legitimacy, ownership, and ecosystem depth in one geography.',
    pros: [
      'Strongest local ownership where capable partners already exist',
      'Builds local legitimacy and ecosystem strength',
      'Good fit for community-based social programs',
    ],
    cons: [
      'Depends on finding capable existing local sponsors',
      'Coverage may stay limited to one or a few jurisdictions',
    ],
    implementationImplications:
      'Best suited to contexts where RPA wants to work through and strengthen existing local institutions rather than build new structures from scratch.',
  },
  {
    model: 'Local Repurposing',
    description:
      'Support local re-granters to add or adapt fiscal sponsorship functions.',
    bestWhen:
      'Existing local institutions have adjacent capabilities that can be adapted into fiscal sponsorship or similar support functions.',
    pros: [
      'Builds local capacity from existing institutions',
      'More local agency than a purely foreign-led model',
      'Can fit places with grantmaking actors but weak sponsorship infrastructure',
    ],
    cons: [
      'Takes time to adapt systems and governance',
      'May require talent development and process redesign',
      'Geographic coverage can remain limited',
    ],
    implementationImplications:
      'Requires adaptation of existing systems, governance, and staffing, with moderate speed and moderate local ownership.',
  },
  {
    model: 'New Build',
    description:
      'Create new fiscal sponsorship capacity from scratch in the target geography.',
    bestWhen:
      'RPA wants maximum control and long-term institution building, and can tolerate the highest setup time and cost.',
    pros: [
      'Maximum control over mission design and local structure',
      'Strong long-term capacity-building potential',
      'Can be tailored to high-priority geographies',
    ],
    cons: [
      'Slowest route to launch',
      'Highest cost and systems burden',
      'Hardest execution risk in legal, operational, and staffing terms',
    ],
    implementationImplications:
      'Most suitable where long-term institution building is the priority and RPA has enough time, budget, and execution capacity.',
  },
  {
    model: 'Local Hybrid',
    description:
      'Set up a local organization with local governance and regranting capability, while using RPA / fiscal-sponsor support contractually to accelerate execution.',
    bestWhen:
      'RPA wants stronger local legitimacy than a pure hybrid while still using its own support model to speed execution.',
    pros: [
      'Balances local legitimacy with faster execution support',
      'Strong for knowledge transfer and institution building',
      'Closer to local communities than a pure external model',
    ],
    cons: [
      'Still requires some local entity-building from scratch',
      'Not as fast or cheap as a pure hybrid',
      'Coverage may remain selective at first',
    ],
    implementationImplications:
      'Useful when RPA needs a balance between local governance, speed, and practical operating support.',
  },
  {
    model: 'Hybrid',
    description:
      "Operate through RPA's existing 501(c)(3) / external platform while adding local advisory and operational capacity in the target geography.",
    bestWhen:
      'RPA wants the fastest and most resource-efficient route to test or support a new geography while retaining some local advisory capacity.',
    pros: [
      'Fastest practical launch route',
      'Lower setup cost and stronger resource efficiency',
      'Easier to scale across multiple places',
      'Useful when testing a new geography first',
    ],
    cons: [
      'Weaker local ownership than locally anchored models',
      'Can create Global North perception risk',
      'Requires deliberate safeguards to keep local leadership meaningful',
    ],
    implementationImplications:
      'Most suitable for rapid market testing or multi-country expansion where speed and cost efficiency matter more than maximum local ownership.',
  },
]

// ─── Expansion Recommendations ────────────────────────────────────────────────
export const mockExpansionRecommendations: ExpansionRecommendation[] = [
  {
    linkedCaseId: 'case-001',
    recommendedModel: 'Local Hybrid',
    rationale:
      'The Step 5 score matrix identifies Local Hybrid as the best fit for Japan. It best balances local governance and legitimacy with RPA support that can accelerate setup, evaluation discipline, and operating design for preventive-care work.',
    feasibilityNotes:
      'Japan scores Local Hybrid highest overall at 7.33. The worksheet notes that it keeps local legitimacy strong while still allowing RPA to support execution in a highly regulated, trust-based social-sector context.',
  },
  {
    linkedCaseId: 'case-002',
    recommendedModel: 'Hybrid',
    rationale:
      'The Step 5 score matrix identifies Hybrid as the best fit for Indonesia. It is the fastest and most resource-efficient way to test and support a broader infrastructure and blended-finance pipeline while still adding local advisory and operational capacity.',
    feasibilityNotes:
      'Indonesia scores Hybrid highest overall at 7.17. The worksheet notes that this route is best for entering a market where practical execution and cross-project scalability matter immediately, even though local ownership is somewhat weaker than more locally anchored options.',
  },
]
