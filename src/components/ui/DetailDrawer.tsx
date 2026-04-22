import type { FullCase } from '@/types'
import { Badge } from './Badge'
import { X, Globe, Building2, AlertTriangle, TrendingUp, FileText, Download } from 'lucide-react'

interface DetailDrawerProps {
  fullCase: FullCase | null
  onClose: () => void
}

export function DetailDrawer({ fullCase, onClose }: DetailDrawerProps) {
  if (!fullCase) return null

  const { case: c, intermediaries, barrier, expansion } = fullCase

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-2xl bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">{c.country}</h2>
              <Badge label={barrier.projectStage} variant="stage" />
            </div>
            <p className="text-xs text-gray-400">{c.sdgTarget}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 flex items-center gap-1.5"
              onClick={() => alert('PDF export coming soon')}
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">

          {/* A. Country & Challenge */}
          <section>
            <SectionHeader icon={<Globe className="w-4 h-4" />} title="Country & Challenge" />
            <div className="space-y-4">
              <Field label="Country Challenges" value={c.countryChallenges} />
              <Field label="Background Problem" value={c.backgroundProblem} />
              <Field label="Existing Projects / Initiatives" value={c.existingProject} />
              <Field label="Development Rationale" value={c.developmentRationale} />
              <Field label="Expected Results" value={c.expectedResults} />
              <Field label="Safeguards" value={c.safeguards} />
              <Field label="Sources" value={c.sources} muted />
            </div>
          </section>

          {/* B. Intermediary Mapping */}
          <section>
            <SectionHeader icon={<Building2 className="w-4 h-4" />} title="Intermediary Mapping" />
            {intermediaries.length === 0 ? (
              <p className="text-xs text-gray-400">No intermediaries mapped for this case.</p>
            ) : (
              <div className="space-y-3">
                {intermediaries.map((int) => (
                  <div key={int.id} className="border border-gray-100 rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900">{int.intermediary}</p>
                      <Badge label={int.relationshipStatus} variant="status" />
                    </div>
                    <p className="text-xs text-gray-500">{int.type} · {int.geography}</p>
                    <Field label="Role" value={int.role} />
                    <Field label="Why Relevant" value={int.whyRelevant} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* C. Barrier Assessment */}
          <section>
            <SectionHeader icon={<AlertTriangle className="w-4 h-4" />} title="Barrier Assessment" />
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge label={barrier.primaryBarrier} variant="barrier" />
              </div>
              <Field label="Barrier Description" value={barrier.barrierDescription} />
              <Field label="Observable Signs" value={barrier.observableSigns} />
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-xs font-semibold text-blue-800 mb-1">Recommended Blended Finance Tool</p>
                <Badge label={barrier.recommendedTool} variant="tool" />
                <p className="text-xs text-blue-700 mt-2">{barrier.toolRationale}</p>
              </div>
              <Field label="Source" value={barrier.source} muted />
            </div>
          </section>

          {/* D. Expansion Recommendation */}
          <section>
            <SectionHeader icon={<TrendingUp className="w-4 h-4" />} title="Expansion Recommendation" />
            <div className="space-y-4">
              <div className="bg-emerald-50 rounded-lg p-4">
                <p className="text-xs font-semibold text-emerald-800 mb-1">Recommended Global Expansion Model</p>
                <Badge label={expansion.recommendedModel} variant="expansion" />
                <p className="text-xs text-emerald-700 mt-2">{expansion.rationale}</p>
              </div>
              <Field label="Feasibility Notes" value={expansion.feasibilityNotes} />
            </div>
          </section>

        </div>
      </div>
    </>
  )
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-blue-600">{icon}</span>
      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{title}</h3>
    </div>
  )
}

function Field({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 mb-0.5">{label}</p>
      <p className={`text-sm ${muted ? 'text-gray-400' : 'text-gray-700'}`}>{value}</p>
    </div>
  )
}
