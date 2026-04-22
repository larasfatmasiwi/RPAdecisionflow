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
    country: 'Kenya',
    sdgTarget: 'SDG 7 (Affordable and Clean Energy), NDC 2030',
    countryChallenges:
      'Limited rural electrification, high cost of grid extension, low household income constraining ability to pay, dependence on fossil fuels.',
    backgroundProblem:
      'Kenya has over 5 million households without electricity access. The national grid expansion is slow and costly. Off-grid solar and mini-grid solutions exist but face commercial viability barriers.',
    existingProject:
      'Kenya Off-Grid Solar Access Project (KOSAP) backed by World Bank; M-KOPA Solar pay-as-you-go model.',
    developmentRationale:
      'Scaling distributed renewable energy can leapfrog grid limitations, reduce energy poverty, and meet NDC commitments at lower cost.',
    expectedResults:
      'Electrification of 300,000 additional rural households; reduction of 500,000 tCO2e annually; creation of 5,000 green jobs.',
    safeguards:
      'Environmental and social due diligence per IFC Performance Standards; gender inclusion requirements; consumer protection for PAYG models.',
    sources: 'World Bank, GOGLA, Kenya Ministry of Energy 2023 Report',
  },
  {
    id: 'case-002',
    country: 'Nigeria',
    sdgTarget: 'SDG 9 (Industry, Innovation), SDG 8 (Decent Work)',
    countryChallenges:
      'High SME financing gap, weak credit infrastructure, FX volatility, high perceived risk by international investors.',
    backgroundProblem:
      'Nigerian SMEs face a $158B financing gap. Banks require collateral most SMEs cannot provide. International investors are deterred by naira depreciation risk.',
    existingProject:
      'IFC SME Ventures Nigeria; Development Bank of Nigeria (DBN) on-lending facility.',
    developmentRationale:
      'SME growth is the backbone of employment and GDP diversification. Blended finance can de-risk lending to underserved segments.',
    expectedResults:
      '50,000 SMEs financed; $2B in private capital mobilized; 200,000 jobs supported.',
    safeguards:
      'Anti-money laundering compliance; labor standards per ILO conventions; environmental risk screening.',
    sources: 'IFC SME Finance Report 2023, CBN Policy Framework',
  },
  {
    id: 'case-003',
    country: 'Bangladesh',
    sdgTarget: 'SDG 13 (Climate Action), SDG 11 (Sustainable Cities)',
    countryChallenges:
      'Extreme climate vulnerability, frequent flooding, limited municipal finance capacity, high debt levels restricting government investment.',
    backgroundProblem:
      'Bangladesh faces $2.4B annual climate adaptation gap. Municipal governments lack capacity to issue green bonds or access capital markets. Infrastructure projects are long-payback by nature.',
    existingProject:
      'Bangladesh Climate Change Trust Fund; ADB Urban Climate Change Resilience Trust Fund.',
    developmentRationale:
      'Urban climate resilience investments protect 10 million city dwellers from flood risk and reduce long-run fiscal exposure.',
    expectedResults:
      '15 coastal cities with upgraded drainage systems; 2 million people protected from annual flooding; $500M in adaptation infrastructure financed.',
    safeguards:
      'Involuntary resettlement framework per World Bank OP 4.12; climate risk screening; community consultation.',
    sources: 'UNDP Climate Finance Report, Bangladesh NDC 2022',
  },
  {
    id: 'case-004',
    country: 'Colombia',
    sdgTarget: 'SDG 15 (Life on Land), SDG 1 (No Poverty)',
    countryChallenges:
      'Deforestation driven by agricultural expansion, land tenure insecurity in post-conflict zones, limited ability to monetize ecosystem services.',
    backgroundProblem:
      'Colombia loses 170,000 ha of forest annually. Smallholder farmers lack alternatives to slash-and-burn agriculture. Carbon markets are underdeveloped and difficult to access.',
    existingProject:
      'Amazon Conservation Association programs; REDD+ projects in Choco region; GEF Sustainable Landscapes project.',
    developmentRationale:
      'Payments for ecosystem services and sustainable land-use financing can create durable income for farmers while protecting biodiversity.',
    expectedResults:
      '500,000 ha of forest conserved; 10,000 smallholder families with alternative livelihoods; 15M tCO2e sequestered.',
    safeguards:
      'Free, prior and informed consent of indigenous communities; land rights due diligence; biodiversity impact assessment.',
    sources: 'World Bank BioCarbon Fund, Colombia Forest Finance Roadmap 2023',
  },
  {
    id: 'case-005',
    country: 'Vietnam',
    sdgTarget: 'SDG 2 (Zero Hunger), SDG 12 (Responsible Production)',
    countryChallenges:
      'Agriculture sector modernization lagging, fragmented smallholder farms, lack of cold chain infrastructure, post-harvest losses of 20–30%.',
    backgroundProblem:
      "Vietnam's agri-food value chains are poorly integrated. Smallholders have limited market access and face price volatility. Investors see high operational risk in rural areas.",
    existingProject:
      'FAO-IFAD AgriValueChain project; ADB Mekong Agriculture Program.',
    developmentRationale:
      'Strengthening agri-value chains with cold chain investment and digital agriculture platforms can unlock $5B in annual food waste savings.',
    expectedResults:
      '200,000 smallholders integrated in modern value chains; post-harvest losses reduced by 40%; $1.5B private agri-investment mobilized.',
    safeguards:
      'Food safety standards; gender equity targets (50% women beneficiaries); environmental water use standards.',
    sources: 'IFAD Vietnam Country Program, Ministry of Agriculture 2024',
  },
  {
    id: 'case-006',
    country: 'Ghana',
    sdgTarget: 'SDG 3 (Good Health), SDG 10 (Reduced Inequalities)',
    countryChallenges:
      'Healthcare financing gap, underdeveloped health insurance penetration, weak health infrastructure outside urban areas, reliance on out-of-pocket payments.',
    backgroundProblem:
      "Ghana's NHIS covers only 35% of the population. Rural health facilities are understaffed and under-equipped. Private investment is deterred by uncertain revenue streams and weak insurance infrastructure.",
    existingProject:
      'IFC Health in Africa Initiative; Global Fund HIV/TB programs.',
    developmentRationale:
      'Outcome-based financing tied to health insurance enrollment and outcomes metrics can attract social impact investors while improving coverage.',
    expectedResults:
      '2 million additional NHIS enrollees; 50 rural health facilities upgraded; $300M in health sector investment mobilized.',
    safeguards:
      'Equity of access standards; data privacy for patient outcomes; gender sensitivity in health services.',
    sources: 'WHO Ghana Health Account, IFC Health Finance Report 2023',
  },
]

// ─── Step 2: Intermediaries ───────────────────────────────────────────────────
export const mockIntermediaries: Intermediary[] = [
  {
    id: 'int-001',
    linkedCaseId: 'case-001',
    intermediary: 'Kenya Bankers Association (KBA)',
    type: 'Financial Sector Association',
    whyRelevant: 'Aggregates member banks, can drive green lending standards and on-lending programs.',
    role: 'Coordination, Standards Setting',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Kenya',
    linkedBarrier: 'Early-Stage Readiness',
  },
  {
    id: 'int-002',
    linkedCaseId: 'case-001',
    intermediary: 'M-KOPA Solar',
    type: 'Private Sector – PAYG Solar',
    whyRelevant: 'Proven PAYG distribution model with 1M+ customer base; can absorb wholesale capital.',
    role: 'Last-Mile Distribution, Capital Deployment',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Kenya',
    linkedBarrier: 'Weak Economics / Long Payback',
  },
  {
    id: 'int-003',
    linkedCaseId: 'case-002',
    intermediary: 'Development Bank of Nigeria (DBN)',
    type: 'Development Finance Institution',
    whyRelevant: 'Mandated to on-lend to SMEs through commercial banks; trusted intermediary with government backing.',
    role: 'On-Lending Facility, Credit Guarantee',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Nigeria',
    linkedBarrier: 'FX / Currency Risk',
  },
  {
    id: 'int-004',
    linkedCaseId: 'case-003',
    intermediary: 'City Region Climate Finance Alliance (CRCA)',
    type: 'Multi-Lateral Platform',
    whyRelevant: 'Specializes in municipal green finance; can bridge subnational governments with climate funds.',
    role: 'Technical Advisory, Capital Mobilization',
    geography: 'Regional',
    relationshipStatus: 'Potential',
    linkedCountry: 'Bangladesh',
    linkedBarrier: 'Weak Economics / Long Payback',
  },
  {
    id: 'int-005',
    linkedCaseId: 'case-004',
    intermediary: 'Fondo Accion (Colombia)',
    type: 'Environmental NGO / Finance Intermediary',
    whyRelevant: 'Deep relationships with Amazonian communities; experience with REDD+ and carbon projects.',
    role: 'Community Liaison, Carbon Project Developer',
    geography: 'Regional',
    relationshipStatus: 'Existing',
    linkedCountry: 'Colombia',
    linkedBarrier: 'Social Outcome Monetization',
  },
  {
    id: 'int-006',
    linkedCaseId: 'case-005',
    intermediary: 'Vietnam Bank for Agriculture and Rural Development (Agribank)',
    type: 'State Development Bank',
    whyRelevant: 'Largest rural lending network; 50M customers; can deploy agricultural value-chain credit.',
    role: 'Credit Delivery, Rural Banking',
    geography: 'National',
    relationshipStatus: 'Potential',
    linkedCountry: 'Vietnam',
    linkedBarrier: 'Investor Downside Risk',
  },
  {
    id: 'int-007',
    linkedCaseId: 'case-006',
    intermediary: 'National Health Insurance Authority (NHIA Ghana)',
    type: 'Government Agency',
    whyRelevant: 'Controls NHIS enrollment and premium collection; outcomes data holder; outcome payments processor.',
    role: 'Outcome Verification, Payment Agent',
    geography: 'National',
    relationshipStatus: 'Existing',
    linkedCountry: 'Ghana',
    linkedBarrier: 'Social Outcome Monetization',
  },
]

// ─── Step 3: Barrier Assessments ─────────────────────────────────────────────
export const mockBarriers: BarrierAssessment[] = [
  {
    id: 'barrier-001',
    linkedCaseId: 'case-001',
    primaryBarrier: 'Early-Stage Readiness',
    barrierDescription: 'Off-grid solar projects lack bankable project structures, technical studies, and regulatory licenses to attract private capital.',
    observableSigns: 'Pipeline projects not reaching financial close; developers citing due diligence gaps; high transaction costs relative to deal size.',
    projectStage: 'Concept',
    recommendedTool: 'Technical Assistance / Grants',
    toolRationale: 'TA grants fund feasibility studies, project structuring, and regulatory navigation at early stages where commercial capital is unavailable.',
    source: 'GOGLA Barriers Study 2022',
  },
  {
    id: 'barrier-002',
    linkedCaseId: 'case-002',
    primaryBarrier: 'FX / Currency Risk',
    barrierDescription: 'Naira depreciation (40%+ over 3 years) creates mismatch between USD-denominated investment returns and local currency revenues.',
    observableSigns: 'Foreign investors withdrawing from Nigeria; wide spread on naira/dollar hedging instruments; capital flight signals.',
    projectStage: 'Pipeline',
    recommendedTool: 'Hedging / Local Currency Facility',
    toolRationale: 'Currency hedging facilities absorb FX mismatch, allowing investors to take local-currency exposure without bearing full FX risk.',
    source: 'TCX Fund Annual Report, IFC FX Hedging Note 2023',
  },
  {
    id: 'barrier-003',
    linkedCaseId: 'case-003',
    primaryBarrier: 'Weak Economics / Long Payback',
    barrierDescription: 'Urban climate adaptation infrastructure has 20–40 year payback periods, negative commercial IRR, and relies on public or concessional capital.',
    observableSigns: 'No private bids on adaptation tenders; municipalities unable to service market-rate debt; deals stall at financing structure stage.',
    projectStage: 'Preparation',
    recommendedTool: 'Concessional Loan',
    toolRationale: 'Concessional loans reduce the cost of capital to levels compatible with long-payback infrastructure, enabling project viability.',
    source: 'CDKN Climate Finance Gap Report, ADB Infrastructure Note',
  },
  {
    id: 'barrier-004',
    linkedCaseId: 'case-004',
    primaryBarrier: 'Social Outcome Monetization',
    barrierDescription: 'Forest carbon credits are difficult to verify, price, and sell from smallholder settings; ecosystem services markets are nascent.',
    observableSigns: 'Projects generating credits below verification threshold; low price discovery; investors unable to model returns from ecosystem payments.',
    projectStage: 'Concept',
    recommendedTool: 'Outcome-Based Incentives',
    toolRationale: 'Results-based finance ties payments to verified outcomes (tonnes sequestered, deforestation avoided), creating credible revenue streams.',
    source: 'Verra VCS Standard, GEF Outcome-Based Finance Review',
  },
  {
    id: 'barrier-005',
    linkedCaseId: 'case-005',
    primaryBarrier: 'Investor Downside Risk',
    barrierDescription: 'Private investors face high operational risk in rural agri-value chains: weather risk, smallholder default, infrastructure gaps, and market volatility.',
    observableSigns: 'Risk premiums priced above 20%; refusal to fund first-loss tranche; exits from agriculture portfolio in Southeast Asia.',
    projectStage: 'Pipeline',
    recommendedTool: 'First-Loss / Junior Capital',
    toolRationale: 'First-loss capital absorbs initial losses, reducing senior investor risk to levels compatible with commercial return expectations.',
    source: 'CGAP Blended Finance for Agriculture, IFAD Rural Finance Report',
  },
  {
    id: 'barrier-006',
    linkedCaseId: 'case-006',
    primaryBarrier: 'Social Outcome Monetization',
    barrierDescription: 'Health outcome metrics are difficult to attribute, measure, and price. Revenue uncertainty deters private health investors.',
    observableSigns: 'No social impact bonds closed in health sector; outcome payers reluctant to commit; verification costs high relative to deal size.',
    projectStage: 'Preparation',
    recommendedTool: 'Outcome-Based Incentives',
    toolRationale: 'Development Impact Bonds or Social Outcomes Contracts tie investor returns to measured health outcomes, enabling outcome payers to commit capital.',
    source: 'Social Finance UK, Brookings Blended Finance Health Review',
  },
]

// ─── Step 4: Blended Finance Tools Reference ─────────────────────────────────
export const mockTools: BlendedFinanceToolRef[] = [
  {
    tool: 'Technical Assistance / Grants',
    description:
      'Non-reimbursable funding provided to prepare projects for investment, strengthen capacity, and reduce transaction costs at the early stage.',
    bestWhen:
      'Projects are not yet bankable; feasibility studies needed; regulatory barriers require navigation; developer capacity is limited.',
    strengths: [
      'Removes barriers without distorting markets',
      'Catalytic: unlocks larger downstream investment',
      'Flexible use across sectors',
      'Can fund policy reform support',
    ],
    weaknesses: [
      'Does not provide risk capital',
      'High administrative burden for small grants',
      'Impact attribution is difficult',
      'Grant dependency risk if not time-limited',
    ],
    riskMethodologies: [
      'Project Preparation Facility assessment',
      'PIDG EARP (Effective Assistance Review Process)',
      'IFC E&S due diligence framework',
    ],
    source: 'PIDG, GCF Readiness Handbook, World Bank PPCR',
  },
  {
    tool: 'Guarantee / Risk-Sharing',
    description:
      'A guarantee is a contingent liability that covers a portion of investor loss in default scenarios, reducing downside risk and attracting private lenders.',
    bestWhen:
      'Commercial investors are deterred by perceived (but not actual) credit risk; first-time market entry; risk pricing is distorted by information asymmetry.',
    strengths: [
      'High leverage: $1 of guarantee can unlock $5–$10 of private capital',
      'Does not require upfront cash outlay',
      'Builds track record for future unguaranteed transactions',
      'Market-making: normalizes credit assessment',
    ],
    weaknesses: [
      'Contingent liability can crystallize at scale',
      'Complex structuring and legal documentation',
      'May distort credit pricing if not time-limited',
      'Can create moral hazard for lenders',
    ],
    riskMethodologies: [
      'Expected Loss (EL) model',
      'Basel II internal ratings-based approach',
      'USAID DCA portfolio risk modeling',
      'IFC Guarantee Risk Framework',
    ],
    source: 'USAID DCA, IFC Guarantee Products, MIGA Risk Handbook',
  },
  {
    tool: 'First-Loss / Junior Capital',
    description:
      'First-loss tranches absorb initial losses before senior investors are affected, protecting upside for commercial investors and improving risk-adjusted returns.',
    bestWhen:
      'Layered capital structures are needed; investors face high downside uncertainty; projects in early-stage markets with limited credit history.',
    strengths: [
      'Directly improves risk-return for senior investors',
      'Enables participation of risk-averse institutional investors',
      'Structurally transparent and well-understood',
      'Signals credibility of deal sponsor',
    ],
    weaknesses: [
      'First-loss provider bears concentrated risk',
      'Sizing the first-loss tranche requires sophisticated modeling',
      'Can be perceived as subsidizing poor projects',
      'Limited availability of DFI first-loss appetite',
    ],
    riskMethodologies: [
      'Tranche sizing models (Expected Loss / Unexpected Loss)',
      'Cascade waterfall analysis',
      'Convergence Fund structuring approach',
      'TIIP First-Loss Risk Sizing Guide',
    ],
    source: 'Convergence Finance, Tideline, EMPEA Blended Finance Survey',
  },
  {
    tool: 'Concessional Loan',
    description:
      'Below-market-rate loans from DFIs or development banks provided to improve project economics and reduce the weighted average cost of capital.',
    bestWhen:
      'Projects have positive development impact but negative or marginal commercial IRR; infrastructure with long payback periods; countries with high sovereign risk premium.',
    strengths: [
      'Directly improves project economics (lowers WACC)',
      'Compatible with sovereign and municipal borrowers',
      'Can be structured alongside commercial debt',
      'Widely understood and accepted instrument',
    ],
    weaknesses: [
      'Distortion risk if not priced at minimum concessionality',
      'Scarce resource: limited DFI concessional windows',
      'May crowd out market-rate lenders',
      'Complex negotiations around conditionalities',
    ],
    riskMethodologies: [
      'MDB Minimum Concessionality Calculator',
      'Debt sustainability analysis (IMF/World Bank DSA)',
      'OECD DAC ODA concessionality measurement',
      'IDA Grant-Loan blend frameworks',
    ],
    source: 'MDB Minimum Concessionality Framework, OECD DAC Guidance',
  },
  {
    tool: 'Hedging / Local Currency Facility',
    description:
      'Currency risk mitigation instruments (forwards, swaps, guarantees) that allow investors to take local-currency exposure without bearing full FX risk.',
    bestWhen:
      'FX mismatch between investor currency and project revenue currency; high FX volatility; absence of local hedging markets.',
    strengths: [
      'Eliminates a major deterrent for foreign investors',
      'Enables local-currency denominated debt',
      'Reduces refinancing risk for project sponsors',
      'Can be pooled for cost efficiency',
    ],
    weaknesses: [
      'High cost in volatile currency environments',
      'Limited product availability in frontier markets',
      'Requires sophisticated counterparties',
      'Systemic risk if macro environment deteriorates',
    ],
    riskMethodologies: [
      'Value-at-Risk (VaR) for currency exposure',
      'TCX pricing model',
      'MFX Solutions hedge ratio assessment',
      'Cross-currency swap valuation frameworks',
    ],
    source: 'TCX Fund, MFX Solutions, Currency Exchange Fund',
  },
  {
    tool: 'Outcome-Based Incentives',
    description:
      'Payment mechanisms tied to pre-agreed, verified outcomes (social, environmental, developmental), attracting investors who receive returns upon outcome achievement.',
    bestWhen:
      'Outcome metrics are measurable and verifiable; outcome payers (governments, donors) can commit; projects generate social/environmental returns difficult to monetize commercially.',
    strengths: [
      'Directly aligns financial returns with development impact',
      'Builds evidence base for policy reform',
      'Attracts impact investors and philanthropic capital',
      'Reduces payment risk for service providers',
    ],
    weaknesses: [
      'Complex outcome measurement and verification',
      'High transaction costs for small deals',
      'Requires willing and creditworthy outcome payers',
      'Attribution challenges in complex ecosystems',
    ],
    riskMethodologies: [
      'Social Return on Investment (SROI) analysis',
      'Theory of Change verification frameworks',
      'MRL (Monitoring, Reporting, Verification) standards',
      'Development Impact Bond structuring guide',
    ],
    source: 'Social Finance UK, Brookings DIB Report, UNDP SDG Finance',
  },
]

// ─── Step 5: Global Expansion Options Reference ───────────────────────────────
export const mockExpansionOptions: ExpansionOptionRef[] = [
  {
    model: 'Deepen Local',
    description:
      'Expand depth and quality of an existing program within the same country or region, increasing reach, impact, and sustainability without geographic expansion.',
    bestWhen:
      'Strong local foundation exists; untapped demand in same geography; local partnerships are robust; regulatory environment is favorable.',
    pros: [
      'Lower risk and cost than new market entry',
      'Builds on existing relationships and learnings',
      'Faster to scale with proven model',
      'Strengthens local ownership and sustainability',
    ],
    cons: [
      'Geographic concentration risk',
      'Market saturation limit',
      'May require new capital sources to deepen',
      'Political or regulatory change can affect scale',
    ],
    implementationImplications:
      'Requires strengthening existing intermediary relationships, investing in monitoring and evaluation, and potentially restructuring financing to support larger volume.',
  },
  {
    model: 'Local Repurposing',
    description:
      'Adapt and repurpose an existing program or financial structure for a different but related use case within the same country or sector.',
    bestWhen:
      'Existing platform has untapped capability; adjacent needs are unmet; regulatory approvals are transferable; team has relevant expertise.',
    pros: [
      'Leverages existing infrastructure and approvals',
      'Cost-efficient expansion pathway',
      'Diversifies use of existing investment',
      'Can respond to evolving market needs',
    ],
    cons: [
      'Scope creep risk',
      'May dilute core program focus',
      'New risks may be introduced from different use case',
      'Requires stakeholder alignment on scope change',
    ],
    implementationImplications:
      'Requires legal assessment for scope change, new stakeholder mapping, and updated theory of change documentation.',
  },
  {
    model: 'New Build',
    description:
      'Design and deploy a new program or financial structure in a new country or market from the ground up, applying lessons from existing programs.',
    bestWhen:
      'Proven model exists in comparable markets; demand is demonstrated; capable local partners can be identified; adequate preparation time is available.',
    pros: [
      'Full optimization for new context',
      'No legacy constraints',
      'Can incorporate latest learning and technology',
      'Strong developmental signal for new market',
    ],
    cons: [
      'Highest cost and time investment',
      'Full regulatory and partnership setup required',
      'Longer time to impact',
      'Execution risk in unfamiliar environment',
    ],
    implementationImplications:
      'Requires full project development cycle: country assessment, partner identification, regulatory engagement, structure design, and capital raise.',
  },
  {
    model: 'Local Hybrid',
    description:
      'Combine elements of an existing program with new components to create a hybrid approach tailored to the local market, blending replication and innovation.',
    bestWhen:
      'Local market has unique features that prevent direct replication; partial adaptation can preserve efficiencies; local partner has strong domain knowledge.',
    pros: [
      'Balances speed with market fit',
      'Leverages proven components while adapting to context',
      'Can attract both local and international capital',
      'Risk mitigation through proven track record',
    ],
    cons: [
      'Complexity of managing hybrid structure',
      'Higher design cost than pure replication',
      'Potential for incoherence if design is not disciplined',
      'Governance of hybrid structures can be challenging',
    ],
    implementationImplications:
      'Requires clear delineation of which components are replicated and which are locally designed, with explicit governance for each.',
  },
  {
    model: 'Hybrid',
    description:
      'A multi-country or cross-regional structure that combines global capital with local execution, using a platform or fund structure to achieve scale.',
    bestWhen:
      'Multiple markets share similar characteristics; regional capital markets can be accessed; platform economics justify multi-country overhead; systemic change is the goal.',
    pros: [
      'Maximum scale potential',
      'Platform economics reduce per-deal costs',
      'Attracts larger institutional investors',
      'Enables knowledge transfer across markets',
    ],
    cons: [
      'High setup and management cost',
      'Governance complexity across jurisdictions',
      'Risk of weakening local ownership',
      'Long lead time to first deployment',
    ],
    implementationImplications:
      'Requires platform-level governance design, multi-country legal setup, regional hub strategy, and DFI anchor investor commitment.',
  },
]

// ─── Expansion Recommendations ────────────────────────────────────────────────
export const mockExpansionRecommendations: ExpansionRecommendation[] = [
  {
    linkedCaseId: 'case-001',
    recommendedModel: 'Deepen Local',
    rationale: 'Kenya has established PAYG solar market with proven models (M-KOPA). The priority is to deepen reach to underserved counties rather than expand to new geographies prematurely.',
    feasibilityNotes: 'Strong regulatory framework (Energy Act 2019); existing intermediaries; government support through KOSAP. Main risk is political economy of KPLC grid competition.',
  },
  {
    linkedCaseId: 'case-002',
    recommendedModel: 'Local Hybrid',
    rationale: 'Nigeria requires locally adapted FX hedging combined with existing DFI on-lending platforms. A new build would miss existing DBN infrastructure; pure replication ignores FX uniqueness.',
    feasibilityNotes: 'CBN cooperation required for FX facility structuring. DBN willing partner. IFC precedent in similar markets. USD/NGN basis swap market exists but thin.',
  },
  {
    linkedCaseId: 'case-003',
    recommendedModel: 'New Build',
    rationale: 'Bangladesh municipal finance market is nascent. A new specialized municipal green finance facility is required, drawing on ADB and AIIB precedents in comparable Asian markets.',
    feasibilityNotes: 'ADB anchor investor likely. Government committed via NDC. Municipal capacity building required before deployment. 24–36 month development timeline expected.',
  },
  {
    linkedCaseId: 'case-004',
    recommendedModel: 'Local Repurposing',
    rationale: 'Existing REDD+ infrastructure and Fondo Accion relationships can be repurposed to deliver outcomes-based biodiversity credits, adding revenue stream to conservation programs.',
    feasibilityNotes: 'Verra standard applicable. Carbon market pricing volatile. Buyer demand from corporate net-zero commitments growing. Legal clarity on carbon rights needed.',
  },
  {
    linkedCaseId: 'case-005',
    recommendedModel: 'Hybrid',
    rationale: 'Vietnam agri-value chain opportunity is part of broader ASEAN food system transformation. A regional multi-country platform (Vietnam + Thailand + Indonesia) achieves greater institutional investor appeal.',
    feasibilityNotes: 'ADB ASEAN Infrastructure Fund as potential anchor. Agribank partnership in Vietnam confirmed interest. ASEAN regional integration agreements support cross-border structure.',
  },
  {
    linkedCaseId: 'case-006',
    recommendedModel: 'Deepen Local',
    rationale: 'Ghana health sector is best served by deepening the NHIS-linked outcomes model before replicating regionally. Evidence base needs strengthening before expansion.',
    feasibilityNotes: 'NHIA cooperation confirmed. Social Finance UK as technical partner candidate. Global Fund interested as outcome payer. 18-month pilot recommended before full-scale DIB.',
  },
]
