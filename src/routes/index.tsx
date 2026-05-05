import { createFileRoute, Link } from '@tanstack/react-router'
import type { ComponentType, ReactNode } from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  Building2,
  CircleDollarSign,
  Globe2,
  Layers3,
  Network,
  ShieldAlert,
  TrendingUp,
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
  ['Concessional Loan', 'Below-market debt that improves affordability, tenor, or repayment profile.'],
  ['Guarantee / Risk-sharing', 'Credit support that reduces lender or investor downside risk.'],
  ['First-loss / Junior Capital', 'Subordinated capital that absorbs early losses and improves senior investor confidence.'],
  ['Technical Assistance / Grants', 'Non-repayable support for project preparation, capacity, studies, or early implementation gaps.'],
  ['Hedging / Local-currency Facility', 'Currency or rate-risk mitigation for projects with mismatched revenues and liabilities.'],
  ['Outcome-based Incentives', 'Payments, rewards, or subsidies tied to verified outputs or outcomes.'],
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
        <div className="grid gap-4 lg:grid-cols-2">
          <InfoGroup icon={Building2} title="Project Stage" items={projectStages} />
          <InfoGroup icon={ShieldAlert} title="Barrier Description" items={barrierDescriptions} />
        </div>
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
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {instruments.map(([title, description]) => (
            <CompactTile key={title} icon={CircleDollarSign} title={title} description={description} />
          ))}
        </div>
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

function InfoGroup({
  icon: Icon,
  title,
  items,
}: {
  icon: ComponentType<{ className?: string }>
  title: string
  items: string[][]
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="text-xl font-bold text-slate-950">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map(([itemTitle, description]) => (
          <div key={itemTitle} className="border-t border-slate-100 pt-3">
            <p className="font-bold text-slate-900">{itemTitle}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
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
