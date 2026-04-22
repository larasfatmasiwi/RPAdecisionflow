import type { BlendedFinanceToolRef, ExpansionOptionRef } from '@/types'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface ReferenceCardProps {
  tool?: BlendedFinanceToolRef
  expansion?: ExpansionOptionRef
}

export function ReferenceCard({ tool, expansion }: ReferenceCardProps) {
  const [open, setOpen] = useState(false)

  if (tool) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1 pr-4">
            <h3 className="text-sm font-semibold text-gray-900">{tool.tool}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tool.description}</p>
          </div>
          {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />}
        </button>
        {open && (
          <div className="px-6 pb-6 border-t border-gray-50 space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-blue-800 mb-1">Best When</p>
              <p className="text-xs text-blue-700">{tool.bestWhen}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Strengths</p>
                <ul className="space-y-1">
                  {tool.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-600">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>{s}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Weaknesses</p>
                <ul className="space-y-1">
                  {tool.weaknesses.map((w, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-600">
                      <span className="text-red-400 mt-0.5 shrink-0">✗</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">Risk Assessment Methodologies</p>
              <div className="flex flex-wrap gap-2">
                {tool.riskMethodologies.map((m, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">{m}</span>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-400">Sources: {tool.source}</p>
          </div>
        )}
      </div>
    )
  }

  if (expansion) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1 pr-4">
            <h3 className="text-sm font-semibold text-gray-900">{expansion.model}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{expansion.description}</p>
          </div>
          {open ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" /> : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />}
        </button>
        {open && (
          <div className="px-6 pb-6 border-t border-gray-50 space-y-4">
            <div className="bg-emerald-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-emerald-800 mb-1">Best When</p>
              <p className="text-xs text-emerald-700">{expansion.bestWhen}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Pros</p>
                <ul className="space-y-1">
                  {expansion.pros.map((p, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-600">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Cons</p>
                <ul className="space-y-1">
                  {expansion.cons.map((c, i) => (
                    <li key={i} className="flex gap-2 text-xs text-gray-600">
                      <span className="text-red-400 mt-0.5 shrink-0">✗</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs font-semibold text-gray-700 mb-1">Implementation Implications</p>
              <p className="text-xs text-gray-600">{expansion.implementationImplications}</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return null
}
