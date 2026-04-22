import { createFileRoute } from '@tanstack/react-router'
import type { ComponentType } from 'react'
import { useMemo, useState } from 'react'
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
import { mockBarriers, mockCases, mockExpansionRecommendations } from '@/data/mockData'
import { worldCountries } from '@/data/countries'

export const Route = createFileRoute('/')({
  component: OverviewPage,
})

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
  const [country, setCountry] = useState('Kenya')

  const selected = useMemo(() => {
    const countryCase = mockCases.find((c) => c.country === country)
    if (!countryCase) return null

    const barrier = mockBarriers.find((b) => b.linkedCaseId === countryCase.id)
    const expansion = mockExpansionRecommendations.find((e) => e.linkedCaseId === countryCase.id)

    return {
      countryCase,
      barrier,
      expansion,
    }
  }, [country])

  return (
    <div className="space-y-4">
      <section className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-3 items-end">
        <label className="flex flex-col gap-1 min-w-[220px] flex-1">
          <span className="text-xs font-semibold text-slate-500">Country</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 bg-slate-50"
          >
            {worldCountries.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 min-w-[180px] flex-1">
          <span className="text-xs font-semibold text-slate-500">Project</span>
          <input
            readOnly
            value={selected?.countryCase.existingProject ?? 'No project data for this country yet'}
            className="h-10 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 bg-slate-50"
          />
        </label>
        <label className="flex flex-col gap-1 min-w-[180px] flex-1">
          <span className="text-xs font-semibold text-slate-500">Primary Barrier</span>
          <input
            readOnly
            value={selected?.barrier?.primaryBarrier ?? 'No barrier data'}
            className="h-10 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 bg-slate-50"
          />
        </label>
        <label className="flex flex-col gap-1 min-w-[180px] flex-1">
          <span className="text-xs font-semibold text-slate-500">Recommended Tool</span>
          <input
            readOnly
            value={selected?.barrier?.recommendedTool ?? 'No recommendation data'}
            className="h-10 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 bg-slate-50"
          />
        </label>
        <button className="h-10 px-5 rounded-xl bg-[#0b3566] text-white text-sm font-semibold inline-flex items-center gap-2">
          <ArrowDownToLine className="w-4 h-4" />
          Export Report
        </button>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center gap-5">
        <img
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop"
          alt="Project"
          className="w-48 h-28 object-cover rounded-xl"
        />
        <div className="flex-1 min-w-[260px]">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Country / Project Overview</p>
          <h1 className="text-4xl font-bold text-slate-900">{country}</h1>
          <p className="text-lg text-slate-700 mt-1">{selected?.countryCase.existingProject ?? 'No project data available.'}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 flex-[1.4] min-w-[320px]">
          <Meta icon={Leaf} label="SDG Target" value={selected?.countryCase.sdgTarget ?? 'N/A'} />
          <Meta icon={Building2} label="Project Stage" value={selected?.barrier?.projectStage ?? 'N/A'} />
          <Meta icon={CircleDollarSign} label="Recommended Tool" value={selected?.barrier?.recommendedTool ?? 'N/A'} />
          <Meta icon={Landmark} label="Primary Barrier" value={selected?.barrier?.primaryBarrier ?? 'N/A'} />
          <Meta icon={ShieldCheck} label="Expansion Model" value={selected?.expansion?.recommendedModel ?? 'N/A'} />
          <Meta icon={CircleAlert} label="Decision Status" value={selected ? 'Proceed with caution' : 'Awaiting data'} warning />
        </div>
      </section>

      {!selected ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          No case data is available for <span className="font-semibold">{country}</span> yet. Select another country to view country-specific decision data.
        </section>
      ) : null}

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
          <h3 className="text-3xl font-bold text-slate-900 mt-3 leading-tight">{selected?.barrier?.recommendedTool ?? 'No Tool Recommendation'}</h3>
          <p className="text-base text-slate-600 mt-2">with {selected?.expansion?.recommendedModel ?? 'No expansion model'}</p>
          <div className="flex justify-center gap-1 mt-5 text-amber-400">
            {Array.from({ length: selected ? 4 : 2 }).map((_, i) => (
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
      <p className="text-xs font-semibold text-slate-500 leading-5">{label}</p>
      <div className={`mt-1 min-h-10 w-full flex items-start gap-2 rounded-lg px-2 py-2 text-xs font-semibold leading-5 ${warning ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
        <Icon className="w-4 h-4" />
        <span className="break-words">{value}</span>
      </div>
    </div>
  )
}
