import { createFileRoute } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import type { FullCase } from '@/types'
import {
  mockCases,
  mockBarriers,
  mockIntermediaries,
  mockExpansionRecommendations,
} from '@/data/mockData'
import { FilterBar } from '@/components/ui/FilterBar'
import { CaseTable } from '@/components/ui/CaseTable'
import { DetailDrawer } from '@/components/ui/DetailDrawer'

export const Route = createFileRoute('/cases')({
  component: CasesPage,
})

// Build full cases by joining mock data
const fullCases: FullCase[] = mockCases.map((c) => ({
  case: c,
  intermediaries: mockIntermediaries.filter((i) => i.linkedCaseId === c.id),
  barrier: mockBarriers.find((b) => b.linkedCaseId === c.id)!,
  expansion: mockExpansionRecommendations.find((e) => e.linkedCaseId === c.id)!,
}))

const unique = <T,>(arr: T[]) => Array.from(new Set(arr))

function CasesPage() {
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [barrierFilter, setBarrierFilter] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [toolFilter, setToolFilter] = useState('')
  const [expansionFilter, setExpansionFilter] = useState('')
  const [selected, setSelected] = useState<FullCase | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return fullCases.filter((fc) => {
      const matchSearch =
        !q ||
        fc.case.country.toLowerCase().includes(q) ||
        fc.case.countryChallenges.toLowerCase().includes(q) ||
        fc.case.existingProject.toLowerCase().includes(q) ||
        fc.case.backgroundProblem.toLowerCase().includes(q)

      const matchCountry = !countryFilter || fc.case.country === countryFilter
      const matchBarrier = !barrierFilter || fc.barrier.primaryBarrier === barrierFilter
      const matchStage = !stageFilter || fc.barrier.projectStage === stageFilter
      const matchTool = !toolFilter || fc.barrier.recommendedTool === toolFilter
      const matchExpansion = !expansionFilter || fc.expansion.recommendedModel === expansionFilter

      return matchSearch && matchCountry && matchBarrier && matchStage && matchTool && matchExpansion
    })
  }, [search, countryFilter, barrierFilter, stageFilter, toolFilter, expansionFilter])

  const countries = unique(fullCases.map((f) => f.case.country)).sort()
  const barriers = unique(fullCases.map((f) => f.barrier.primaryBarrier)).sort()
  const stages = unique(fullCases.map((f) => f.barrier.projectStage))
  const tools = unique(fullCases.map((f) => f.barrier.recommendedTool)).sort()
  const expansions = unique(fullCases.map((f) => f.expansion.recommendedModel)).sort()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Case Explorer</h1>
        <p className="text-sm text-gray-500 mt-1">
          Search and filter the blended finance opportunity pipeline. Click a row for full case details.
        </p>
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        resultCount={filtered.length}
        filters={[
          {
            key: 'country',
            label: 'Country',
            value: countryFilter,
            onChange: setCountryFilter,
            options: countries.map((c) => ({ value: c, label: c })),
          },
          {
            key: 'barrier',
            label: 'Barrier',
            value: barrierFilter,
            onChange: setBarrierFilter,
            options: barriers.map((b) => ({ value: b, label: b })),
          },
          {
            key: 'stage',
            label: 'Stage',
            value: stageFilter,
            onChange: setStageFilter,
            options: stages.map((s) => ({ value: s, label: s })),
          },
          {
            key: 'tool',
            label: 'BF Tool',
            value: toolFilter,
            onChange: setToolFilter,
            options: tools.map((t) => ({ value: t, label: t })),
          },
          {
            key: 'expansion',
            label: 'Expansion',
            value: expansionFilter,
            onChange: setExpansionFilter,
            options: expansions.map((e) => ({ value: e, label: e })),
          },
        ]}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <CaseTable cases={filtered} onSelect={setSelected} />
      </div>

      {selected && (
        <DetailDrawer fullCase={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
