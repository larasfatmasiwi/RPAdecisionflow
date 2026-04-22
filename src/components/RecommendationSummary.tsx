import type { RecommendationStrength } from '@/utils/decisionFlowConfig'

interface RecommendationSummaryProps {
  country: string
  project: string
  barrier: string
  tool: string
  expansionOption: string
  recommendationStrength: RecommendationStrength
  nextActions: string[]
}

export function RecommendationSummary({
  country,
  project,
  barrier,
  tool,
  expansionOption,
  recommendationStrength,
  nextActions,
}: RecommendationSummaryProps) {
  const tone =
    recommendationStrength === 'Strong fit'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : recommendationStrength === 'Conditional fit'
        ? 'bg-amber-50 text-amber-800 border-amber-200'
        : 'bg-rose-50 text-rose-800 border-rose-200'

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-bold text-slate-900">Final Recommendation</h3>
        <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}>
          {recommendationStrength}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        <SummaryItem label="Selected country / project" value={`${country} · ${project || '—'}`} />
        <SummaryItem label="Diagnosed barrier" value={barrier || '—'} />
        <SummaryItem label="Recommended blended finance tool" value={tool || '—'} />
        <SummaryItem label="Recommended global expansion option" value={expansionOption || '—'} />
      </div>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs font-semibold text-slate-700">Next actions</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-slate-600">
          {nextActions.map((action) => (
            <li key={action}>{action}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </article>
  )
}
