import { createFileRoute } from '@tanstack/react-router'
import { RecommendationPanel } from '@/components/ui/RecommendationPanel'
import { Lightbulb, Info } from 'lucide-react'

export const Route = createFileRoute('/recommend')({
  component: RecommendPage,
})

function RecommendPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Recommendation Engine</h1>
        <p className="text-sm text-gray-500 mt-1">
          Select a diagnosed barrier and expansion context dimensions to generate a structured recommendation.
        </p>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-amber-800">Rule-Based Demo</p>
          <p className="text-xs text-amber-700 mt-0.5">
            This recommendation engine uses pre-configured rules mapped from the strategic scorecard logic.
            In production, connect it to the live case data or a model-driven scoring system.
          </p>
        </div>
      </div>

      <RecommendationPanel />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-4 h-4 text-gray-400" />
          <h3 className="text-sm font-semibold text-gray-700">How Recommendations Are Generated</h3>
        </div>
        <div className="space-y-3">
          <RuleRow barrier="Early-Stage Readiness" tool="Technical Assistance / Grants" />
          <RuleRow barrier="Investor Downside Risk" tool="First-Loss / Junior Capital" />
          <RuleRow barrier="Weak Economics / Long Payback" tool="Concessional Loan" />
          <RuleRow barrier="FX / Currency Risk" tool="Hedging / Local Currency Facility" />
          <RuleRow barrier="Social Outcome Monetization" tool="Outcome-Based Incentives" />
          <RuleRow barrier="Regulatory / Policy Barrier" tool="Technical Assistance / Grants" />
          <RuleRow barrier="Capacity Gap" tool="Technical Assistance / Grants" />
        </div>
      </div>
    </div>
  )
}

function RuleRow({ barrier, tool }: { barrier: string; tool: string }) {
  return (
    <div className="flex items-center gap-3 text-xs text-gray-600">
      <span className="shrink-0 font-medium text-gray-700 w-64">{barrier}</span>
      <span className="text-gray-300">→</span>
      <span className="text-blue-700">{tool}</span>
    </div>
  )
}
