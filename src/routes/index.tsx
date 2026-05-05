import { createFileRoute, Link } from '@tanstack/react-router'
import type { ComponentType, ReactNode } from 'react'
import { useState } from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Globe2,
  Layers3,
  Network,
  ShieldCheck,
  ShieldAlert,
  Target,
  TrendingUp,
  XCircle,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: OverviewPage,
})

const projectStages = [
  ['Concept', 'Problem, beneficiaries, and early opportunity are identified but the project is not yet structured.'],
  ['Preparation', 'Feasibility, partners, safeguards, and implementation pathway are being validated.'],
  ['Structuring', 'Capital stack, risk allocation, intermediary role, and legal pathway are being designed.'],
  ['Implementation', 'Project is active or nearing launch, with financing and delivery risks still monitored.'],
]

const barrierDescriptions = [
  ['Commercial viability', 'Returns, revenue certainty, payback, or risk-adjusted economics are insufficient for fully commercial capital.'],
  ['Project readiness', 'Permits, feasibility studies, sponsor capacity, procurement, or implementation evidence are incomplete.'],
  ['Market or regulatory risk', 'Policy uncertainty, licensing, currency exposure, or legal constraints affect tool selection.'],
  ['Impact evidence gap', 'Development outcomes are promising but measurement, attribution, or verification systems are not mature.'],
]

const stageBarrierRows = projectStages.map(([stage, stageDescription], index) => {
  const [barrierCategory, barrierDescription] = barrierDescriptions[index] ?? ['', '']

  return {
    stage,
    stageDescription,
    barrierCategory,
    barrierDescription,
  }
})

const formulas = [
  ['Funding Gap', 'Total Project Cost - Committed Capital'],
  ['Capital Mobilization Ratio', 'Private or third-party capital mobilized / concessional capital deployed'],
  ['Net Present Value', 'Present value of benefits and cash flows - present value of costs'],
  ['Debt Service Coverage Ratio', 'Cash flow available for debt service / required debt service'],
  ['Payback Period', 'Years required for cumulative benefits or savings to recover upfront cost'],
]

const blendedIndicators = [
  ['Barrier fit', 'How directly the instrument solves the diagnosed barrier.'],
  ['Mobilization', 'Ability to attract additional public, private, or philanthropic capital.'],
  ['Financial additionality', 'Whether concessionality changes project viability rather than replacing capital that would already come.'],
  ['Development additionality', 'Strength of incremental SDG, climate, inclusion, or resilience outcomes.'],
  ['Concessionality discipline', 'Whether subsidy is limited, justified, transparent, and not excessive.'],
  ['Implementation feasibility', 'Practicality of deploying the instrument through available partners and legal routes.'],
  ['Result/Impact measurability', 'Ability to verify outputs, outcomes, or performance triggers credibly.'],
]

const instruments = [
  {
    title: 'Technical Assistance / Grants',
    shortDescription: 'Non-repayable support for project preparation, capacity, studies, or early implementation gaps.',
    description:
      'Technical assistance enhances investees’ capacity and reduces transaction costs. Grants can also support early-stage project preparation, feasibility studies, and project development capital where no repayment is expected.',
    bestWhen:
      'High upfront costs, limited project readiness, weak sponsor capacity, or a need for early-stage project preparation before private investors can enter.',
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
    methodologies: ['Regulatory risk', 'Expected loss'],
    accent: 'from-sky-600 to-cyan-500',
  },
  {
    title: 'Guarantee / Risk-sharing',
    shortDescription: 'Credit support that reduces lender or investor downside risk.',
    description:
      'Guarantees provide protection against forms of risk intended to prevent capital losses for investors. Risk-sharing arrangements can cover debt service, regulatory risk, off-taker risk, or losses across a portfolio of investments.',
    bestWhen:
      'Investor hesitation is driven by credit risk, off-taker risk, regulatory risk, currency risk, or other perceived risks that make the project less attractive.',
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
    methodologies: ['Expected loss'],
    accent: 'from-blue-600 to-sky-500',
  },
  {
    title: 'First-loss / Junior Capital',
    shortDescription: 'Subordinated capital that absorbs early losses and improves senior investor confidence.',
    description:
      'First-loss or junior capital absorbs initial losses or ranks lower in repayment than senior investors. It can take the form of first-loss guarantees, subordinated debt, mezzanine finance, or junior equity.',
    bestWhen:
      'Downside protection is needed in high-risk markets, new technologies, early-stage business models, or projects where crowding in senior capital is difficult.',
    strengths: [
      'Strong risk absorption',
      'Can unlock more senior capital',
      'Useful for difficult blended structures',
    ],
    weaknesses: [
      'High risk for catalytic funders',
      'Can over-subsidize if the barrier diagnosis is wrong',
      'Structuring can be complex',
    ],
    methodologies: ['Expected loss', 'Value-at-risk'],
    accent: 'from-indigo-600 to-blue-500',
  },
  {
    title: 'Concessional Loans',
    shortDescription: 'Below-market debt that improves affordability, tenor, or repayment profile.',
    description:
      'Concessional loans provide repayable money with favorable terms relative to market pricing. They may include below-market interest rates, longer tenors, grace periods, reduced collateral requirements, or deferrals.',
    bestWhen:
      'Projects require debt financing where market-rate capital is too expensive, available tenors are too short, or risk-adjusted returns fall below commercial thresholds.',
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
    methodologies: ['Expected loss', 'Discounted cash flow', 'Public-private partnership risk allocation'],
    accent: 'from-slate-700 to-blue-600',
  },
  {
    title: 'FX Risk Mitigation / Local Currency Facility',
    shortDescription: 'Currency or rate-risk mitigation for projects with mismatched revenues and liabilities.',
    description:
      'FX risk mitigation protects investors or borrowers against foreign exchange risk. Instruments such as hedging, local currency financing support, or FX liquidity facilities can reduce exchange-rate volatility and improve access to local or foreign currency.',
    bestWhen:
      'Borrowers earn revenue in local currency while financing is in hard currency, limited or costly hedging instruments exist, or exchange-rate volatility limits private investment.',
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
    methodologies: ['Political risk'],
    accent: 'from-cyan-600 to-blue-500',
  },
  {
    title: 'Outcome-based Incentives',
    shortDescription: 'Payments, rewards, or subsidies tied to verified outputs or outcomes.',
    description:
      'Additional payments are made conditional on achieving key performance indicators. Incentives are paid during a pre-agreed, time-bound period to organizations that achieve predefined targets.',
    bestWhen:
      'Outcomes are clearly measurable and verifiable, especially where incentives are needed to pursue new business lines, reach underserved segments, or deliver social, environmental, or economic impact.',
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
    methodologies: ['Rating agency methodologies'],
    accent: 'from-blue-700 to-indigo-500',
  },
]

const expansionIndicators = [
  ['Speed', 'How quickly the model can enter or scale in a new market.'],
  ['Cost', 'Relative setup, staffing, compliance, and operating cost.'],
  ['Local Ownership', 'Degree of local partner control, legitimacy, and accountability.'],
  ['Scalability', 'Ability to repeat the model across regions, sectors, or project types.'],
  ['Capacity Building', 'Extent to which the model strengthens local institutions and delivery capability.'],
  ['Regulatory Feasibility', 'Ease of operating within licensing, data, investment, and sector rules.'],
]

const expansionOptions = [
  ['Hybrid', 'RPA retains central technical control while working through strong local implementation partners.'],
  ['Local Hybrid', 'Local partner leads delivery with RPA providing methods, capital design, and selective oversight.'],
  ['Deepen Local', 'RPA invests in a durable local platform or institutional partner for repeat projects.'],
  ['Local Repurposing', 'An existing local entity adapts its mandate or operating model to carry the project approach.'],
  ['New Build', 'A new local vehicle or delivery unit is established when no suitable platform exists.'],
]

function OverviewPage() {
  return (
    <div className="space-y-10 pb-12">
      <section className="relative min-h-[620px] overflow-hidden rounded-[28px] bg-slate-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1800&auto=format&fit=crop"
          alt="Infrastructure landscape"
          className="absolute inset-0 h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-slate-950/45" />
        <div className="relative flex min-h-[620px] max-w-5xl flex-col justify-end px-6 pb-12 pt-20 md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">RPA Decision Flow</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-none md:text-7xl">
            Structure better blended-finance decisions.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
            A five-step reference system for diagnosing development barriers, selecting finance instruments, and choosing global expansion pathways.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/input-data" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-950">
              Start input
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/decision-flow/step-1" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-bold text-white">
              View flow
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <ReferenceSection
        eyebrow="Diagnosis"
        title="Project Stage and Barrier Description"
        copy="The first decision is not the instrument. It is the project’s maturity and the constraint that prevents capital or implementation from moving."
      >
        <StageBarrierTable rows={stageBarrierRows} />
      </ReferenceSection>

      <ReferenceSection
        eyebrow="Assessment"
        title="Financial Formula"
        copy="Financial feasibility translates project conditions into testable metrics for funding gap, viability, and concessional capital discipline."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {formulas.map(([title, description]) => (
            <FormulaTile key={title} title={title} description={description} />
          ))}
        </div>
      </ReferenceSection>

      <ReferenceSection
        eyebrow="Instrument Selection"
        title="Blended Finance Indicators"
        copy="Each instrument is scored by its ability to solve the actual barrier without over-subsidizing or weakening accountability."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {blendedIndicators.map(([title, description]) => (
            <CompactTile key={title} icon={BarChart3} title={title} description={description} />
          ))}
        </div>
      </ReferenceSection>

      <ReferenceSection
        eyebrow="Capital Tools"
        title="Blended Finance Instrument"
        copy="The tool set spans repayable capital, risk mitigation, grants, currency support, and performance-linked incentives."
      >
        <BlendedInstrumentExplorer instruments={instruments} />
      </ReferenceSection>

      <ReferenceSection
        eyebrow="Expansion"
        title="Global Expansion Options Indicators"
        copy="Expansion choices should balance speed and scalability with local ownership, compliance, and durable capability building."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {expansionIndicators.map(([title, description]) => (
            <CompactTile key={title} icon={TrendingUp} title={title} description={description} />
          ))}
        </div>
      </ReferenceSection>

      <ReferenceSection
        eyebrow="Operating Models"
        title="Global Expansion Option Description"
        copy="The five models describe how RPA can enter, adapt, or deepen work in a country while managing control, cost, and local legitimacy."
      >
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {expansionOptions.map(([title, description]) => (
            <ModelTile key={title} title={title} description={description} />
          ))}
        </div>
      </ReferenceSection>
    </div>
  )
}

function ReferenceSection({
  eyebrow,
  title,
  copy,
  children,
}: {
  eyebrow: string
  title: string
  copy: string
  children: ReactNode
}) {
  return (
    <section className="mx-auto max-w-7xl space-y-6">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">{eyebrow}</p>
        <h2 className="mt-2 text-4xl font-bold tracking-normal text-slate-950 md:text-5xl">{title}</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">{copy}</p>
      </div>
      {children}
    </section>
  )
}

function StageBarrierTable({
  rows,
}: {
  rows: {
    stage: string
    stageDescription: string
    barrierCategory: string
    barrierDescription: string
  }[]
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="grid gap-4 bg-slate-950 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white md:grid-cols-[1.15fr_0.85fr_1.45fr]">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Project Stage
        </div>
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          Barrier Category
        </div>
        <div>Description</div>
      </div>
      <div className="divide-y divide-slate-100">
        {rows.map((row) => (
          <div key={`${row.stage}-${row.barrierCategory}`} className="grid gap-4 px-5 py-5 md:grid-cols-[1.15fr_0.85fr_1.45fr]">
            <div>
              <p className="text-base font-bold text-slate-950">{row.stage}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{row.stageDescription}</p>
            </div>
            <div>
              <p className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-800">{row.barrierCategory}</p>
            </div>
            <p className="text-sm leading-6 text-slate-600">{row.barrierDescription}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function FormulaTile({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <BadgeDollarSign className="h-5 w-5 text-blue-700" />
      <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}

function CompactTile({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Icon className="h-5 w-5 text-blue-700" />
      <h3 className="mt-3 font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}

function BlendedInstrumentExplorer({
  instruments,
}: {
  instruments: {
    title: string
    shortDescription: string
    description: string
    bestWhen: string
    strengths: string[]
    weaknesses: string[]
    methodologies: string[]
    accent: string
  }[]
}) {
  const [selectedTitle, setSelectedTitle] = useState(instruments[0]?.title ?? '')
  const selected = instruments.find((instrument) => instrument.title === selectedTitle) ?? instruments[0]

  return (
    <div className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
        {instruments.map((instrument) => {
          const isSelected = instrument.title === selected.title

          return (
            <button
              key={instrument.title}
              type="button"
              onClick={() => setSelectedTitle(instrument.title)}
              aria-pressed={isSelected}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-left shadow-sm transition duration-200 ${
                isSelected
                  ? 'border-blue-950 bg-slate-950 text-white shadow-xl shadow-blue-100'
                  : 'border-slate-200 bg-white text-slate-950 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60'
              }`}
            >
              <div className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${instrument.accent}`} />
              <div
                className={`absolute -right-10 -top-14 h-32 w-32 rounded-full bg-gradient-to-br ${instrument.accent} opacity-10 transition group-hover:scale-125`}
              />
              <div className="relative flex items-start gap-4">
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${instrument.accent} text-white shadow-lg`}
                >
                  <CircleDollarSign className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-base font-bold">{instrument.title}</span>
                  <span className={`mt-2 block text-sm leading-6 ${isSelected ? 'text-slate-200' : 'text-slate-600'}`}>
                    {instrument.shortDescription}
                  </span>
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-blue-100/70">
        <div className={`h-2 bg-gradient-to-r ${selected.accent}`} />
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-20 rounded-full bg-slate-100" />
        <div className={`absolute right-10 top-12 h-24 w-24 rounded-full bg-gradient-to-br ${selected.accent} opacity-12`} />
        <div className="relative p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Selected Instrument</p>
              <h3 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">{selected.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">{selected.description}</p>
            </div>
            <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${selected.accent} text-white shadow-lg`}>
              <ShieldCheck className="h-7 w-7" />
            </span>
          </div>

          <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-3">
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${selected.accent} text-white`}>
                <Target className="h-4 w-4" />
              </span>
              <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-900">Best when</h4>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">{selected.bestWhen}</p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <InsightList title="Strengths" icon={CheckCircle2} items={selected.strengths} tone="green" />
            <InsightList title="Weaknesses" icon={XCircle} items={selected.weaknesses} tone="red" />
          </div>

          <div className="mt-5">
            <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-900">Risk Assessment Methodologies</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {selected.methodologies.map((methodology) => (
                <span
                  key={methodology}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-bold text-slate-700 shadow-sm"
                >
                  {methodology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InsightList({
  title,
  icon: Icon,
  items,
  tone,
}: {
  title: string
  icon: ComponentType<{ className?: string }>
  items: string[]
  tone: 'green' | 'red'
}) {
  const toneClasses =
    tone === 'green'
      ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
      : 'border-rose-100 bg-rose-50 text-rose-700'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full border ${toneClasses}`}>
          <Icon className="h-4 w-4" />
        </span>
        <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-slate-900">{title}</h4>
      </div>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
            <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${tone === 'green' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ModelTile({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <Globe2 className="h-5 w-5 text-blue-700" />
        <Network className="h-4 w-4 text-slate-400" />
      </div>
      <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <Layers3 className="mt-5 h-5 w-5 text-slate-300" />
    </div>
  )
}
