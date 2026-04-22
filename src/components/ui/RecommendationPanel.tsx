import type { BarrierType } from '@/types'
import { Badge } from './Badge'
import { recommendTool, recommendExpansionModel, type ExpansionDimensions } from '@/utils/recommendations'
import { Lightbulb } from 'lucide-react'
import { useState } from 'react'

const BARRIERS: BarrierType[] = [
  'Early-Stage Readiness',
  'Investor Downside Risk',
  'Weak Economics / Long Payback',
  'FX / Currency Risk',
  'Social Outcome Monetization',
  'Regulatory / Policy Barrier',
  'Capacity Gap',
]

export function RecommendationPanel() {
  const [barrier, setBarrier] = useState<BarrierType | ''>('')
  const [dims, setDims] = useState<ExpansionDimensions>({
    needsLocalOwnership: false,
    speedPriority: false,
    costConstrained: false,
    capacityBuildingNeeded: false,
    scalabilityPriority: false,
    regulatoryComplexity: false,
  })

  const toolRec = barrier ? recommendTool(barrier) : null
  const expansionRec = recommendExpansionModel(dims)

  const dimLabels: { key: keyof ExpansionDimensions; label: string }[] = [
    { key: 'needsLocalOwnership', label: 'Needs local ownership' },
    { key: 'speedPriority', label: 'Speed is priority' },
    { key: 'costConstrained', label: 'Cost constrained' },
    { key: 'capacityBuildingNeeded', label: 'Capacity building needed' },
    { key: 'scalabilityPriority', label: 'Scalability is priority' },
    { key: 'regulatoryComplexity', label: 'High regulatory complexity' },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-sm font-bold text-gray-900">Recommendation Engine</h3>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Rule-based · Demo</span>
      </div>

      {/* Barrier selector */}
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-2">Select Primary Barrier</label>
        <select
          value={barrier}
          onChange={(e) => setBarrier(e.target.value as BarrierType)}
          className="w-full py-2 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose a barrier --</option>
          {BARRIERS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Tool recommendation */}
      {toolRec && (
        <div className="bg-blue-50 rounded-lg p-4 space-y-2">
          <p className="text-xs font-semibold text-blue-800">Recommended Blended Finance Tool</p>
          <Badge label={toolRec.tool} variant="tool" />
          <p className="text-xs text-blue-700">{toolRec.rationale}</p>
        </div>
      )}

      {/* Expansion dimensions */}
      <div>
        <label className="text-xs font-semibold text-gray-500 block mb-3">Expansion Context Dimensions</label>
        <div className="grid grid-cols-2 gap-2">
          {dimLabels.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dims[key]}
                onChange={(e) => setDims((d) => ({ ...d, [key]: e.target.checked }))}
                className="w-4 h-4 accent-blue-600 rounded"
              />
              <span className="text-xs text-gray-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Expansion recommendation */}
      <div className="bg-emerald-50 rounded-lg p-4 space-y-2">
        <p className="text-xs font-semibold text-emerald-800">Recommended Expansion Model</p>
        <Badge label={expansionRec.model} variant="expansion" />
        <p className="text-xs text-emerald-700">{expansionRec.rationale}</p>
      </div>
    </div>
  )
}
