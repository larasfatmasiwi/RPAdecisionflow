import type { FullCase } from '@/types'
import { Badge } from './Badge'
import { EmptyState } from './EmptyState'
import { ChevronRight, Globe } from 'lucide-react'

interface CaseTableProps {
  cases: FullCase[]
  onSelect: (c: FullCase) => void
}

export function CaseTable({ cases, onSelect }: CaseTableProps) {
  if (cases.length === 0) {
    return (
      <EmptyState
        icon={<Globe className="w-12 h-12" />}
        title="No cases found"
        description="Adjust your filters or search terms to find matching cases."
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Country</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">SDG Target</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Challenge</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Existing Project</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Stage</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Barrier</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">BF Tool</th>
            <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">Expansion</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {cases.map((fc) => (
            <tr
              key={fc.case.id}
              onClick={() => onSelect(fc)}
              className="border-b border-gray-50 hover:bg-blue-50/40 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3 font-medium text-gray-900">{fc.case.country}</td>
              <td className="px-4 py-3 text-gray-500 max-w-[140px] truncate">{fc.case.sdgTarget}</td>
              <td className="px-4 py-3 text-gray-600 max-w-[200px]">
                <span className="line-clamp-2">{fc.case.countryChallenges.substring(0, 80)}…</span>
              </td>
              <td className="px-4 py-3 text-gray-500 hidden lg:table-cell max-w-[180px]">
                <span className="line-clamp-1">{fc.case.existingProject}</span>
              </td>
              <td className="px-4 py-3">
                <Badge label={fc.barrier.projectStage} variant="stage" />
              </td>
              <td className="px-4 py-3">
                <Badge label={fc.barrier.primaryBarrier} variant="barrier" />
              </td>
              <td className="px-4 py-3 hidden xl:table-cell">
                <Badge label={fc.barrier.recommendedTool} variant="tool" />
              </td>
              <td className="px-4 py-3 hidden xl:table-cell">
                <Badge label={fc.expansion.recommendedModel} variant="expansion" />
              </td>
              <td className="px-4 py-3 text-gray-400">
                <ChevronRight className="w-4 h-4" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
