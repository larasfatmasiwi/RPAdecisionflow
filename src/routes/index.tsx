import { createFileRoute } from '@tanstack/react-router'
import type { ComponentType } from 'react'
import {
  Building2,
  Leaf,
  Landmark,
  ShieldCheck,
  CircleDollarSign,
  CircleAlert,
  ChevronRight,
  Star,
  ArrowDownToLine,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: OverviewPage,
})

const scoreCards = [
  { label: 'Barrier Fit Score', score: '4.5 / 5', color: 'bg-emerald-500' },
  { label: 'Mobilization Potential', score: '3.8 / 5', color: 'bg-blue-500' },
  { label: 'Financial Additionality', score: '3.5 / 5', color: 'bg-violet-500' },
  { label: 'Implementation Feasibility', score: '4.2 / 5', color: 'bg-cyan-500' },
  { label: 'Scalability', score: '3.9 / 5', color: 'bg-amber-500' },
  { label: 'Regulatory Feasibility', score: '4.0 / 5', color: 'bg-emerald-500' },
]

const flowColumns = [
  {
    title: 'Identify the Problem',
    tone: 'bg-emerald-50 text-emerald-900 border-emerald-100',
    items: ['Challenge: Limited renewable electrification in rural areas', 'Alignment: SDG 7 and SDG 13', 'Problem: High upfront cost and infrastructure gaps'],
  },
  {
    title: 'Assess the Project Opportunity',
    tone: 'bg-blue-50 text-blue-900 border-blue-100',
    items: ['Development idea: Mini hydro for rural electricity access', 'Existing project: Pandanduri Mini Hydro (97% complete)', 'Stakeholders: Local government and private developers'],
  },
  {
    title: 'Diagnose Barrier and Stage',
    tone: 'bg-amber-50 text-amber-900 border-amber-100',
    items: ['Project stage: Construction / Near Completion', 'Main barrier: Financing structure', 'Risk level: Medium'],
  },
  {
    title: 'Recommend Blended Finance Tool',
    tone: 'bg-violet-50 text-violet-900 border-violet-100',
    items: ['Recommended instrument: Conventional Loan', 'Alternative tools: Guarantee, Subordinated Debt', 'Additionality score: Moderate'],
  },
  {
    title: 'Recommend Global Expansion Option',
    tone: 'bg-cyan-50 text-cyan-900 border-cyan-100',
    items: ['Expansion readiness: Medium', 'Market suitability: Good', 'Recommended model: Partnership-led Expansion'],
  },
]

function OverviewPage() {
  return (
    <div className="space-y-4">
      <section className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-3 items-end">
        {['Country', 'Project', 'Sector', 'Stage', 'Year'].map((label, i) => (
          <label key={label} className="flex flex-col gap-1 min-w-[180px] flex-1">
            <span className="text-xs font-semibold text-slate-500">{label}</span>
            <select className="h-10 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 bg-slate-50">
              <option>{['Indonesia', 'Pandanduri Mini Hydro', 'Renewable Energy', 'Construction / Near Completion', '2024'][i]}</option>
            </select>
          </label>
        ))}
        <button className="h-10 px-5 rounded-xl bg-[#0b3566] text-white text-sm font-semibold inline-flex items-center gap-2">
          <ArrowDownToLine className="w-4 h-4" />
          Export Report
        </button>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center gap-5">
        <img
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop"
          alt="Hydro project"
          className="w-48 h-28 object-cover rounded-xl"
        />
        <div className="flex-1 min-w-[260px]">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Country / Project Overview</p>
          <h1 className="text-4xl font-bold text-slate-900">Indonesia</h1>
          <p className="text-2xl text-slate-700">Pandanduri Mini Hydro</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 flex-[1.4] min-w-[320px]">
          <Meta icon={Leaf} label="Sector" value="Renewable Energy" />
          <Meta icon={Building2} label="Stage" value="Construction / Near Completion" />
          <Meta icon={CircleDollarSign} label="Total Investment" value="USD 12.8 Million" />
          <Meta icon={Landmark} label="Project Completion" value="97%" />
          <Meta icon={ShieldCheck} label="Overall Recommendation" value="Use Conventional Loan" />
          <Meta icon={CircleAlert} label="Decision Status" value="Proceed with caution" warning />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3">
        {scoreCards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-700">{card.label}</p>
            <p className="text-4xl font-bold text-slate-900 mt-2">{card.score}</p>
            <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div className={`h-full rounded-full ${card.color}`} style={{ width: `${Number(card.score[0]) * 20}%` }} />
            </div>
          </article>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {flowColumns.map((column, i) => (
              <div key={column.title} className={`rounded-xl border p-4 ${column.tone}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-white font-bold text-xs">{i + 1}</span>
                  {i < flowColumns.length - 1 ? <ChevronRight className="w-4 h-4" /> : null}
                </div>
                <h3 className="font-bold mt-2 mb-3">{column.title}</h3>
                <ul className="space-y-2 text-xs leading-relaxed">
                  {column.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-sm font-semibold text-slate-500">Final Recommendation</p>
          <h3 className="text-4xl font-bold text-slate-900 mt-3 leading-tight">Use Conventional Loan</h3>
          <p className="text-lg text-slate-600 mt-2">with Partnership-led Expansion Model</p>
          <div className="flex justify-center gap-1 mt-5 text-amber-400">
            {Array.from({ length: 4 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
            <Star className="w-5 h-5 text-slate-300" />
          </div>
          <button className="w-full mt-6 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">Proceed</button>
        </aside>
      </section>
    </div>
  )
}

function Meta({
  icon: Icon,
  label,
  value,
  warning = false,
}: {
  icon: ComponentType<{ className?: string }>
  label: string
  value: string
  warning?: boolean
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <div className={`mt-1 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold ${warning ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
        <Icon className="w-4 h-4" />
        <span className="truncate">{value}</span>
      </div>
    </div>
  )
}
