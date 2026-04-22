import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState, useMemo } from 'react'
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
import { Download, Upload } from 'lucide-react'

export const Route = createFileRoute('/cases')({
  component: CasesPage,
})

const fullCases: FullCase[] = mockCases.map((c) => ({
  case: c,
  intermediaries: mockIntermediaries.filter((i) => i.linkedCaseId === c.id),
  barrier: mockBarriers.find((b) => b.linkedCaseId === c.id)!,
  expansion: mockExpansionRecommendations.find((e) => e.linkedCaseId === c.id)!,
}))

const unique = <T,>(arr: T[]) => Array.from(new Set(arr))

const barrierTemplateBase64 =
  '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'

function CasesPage() {
  const [search, setSearch] = useState('')
  const [countryFilter, setCountryFilter] = useState('')
  const [barrierFilter, setBarrierFilter] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [toolFilter, setToolFilter] = useState('')
  const [expansionFilter, setExpansionFilter] = useState('')
  const [selected, setSelected] = useState<FullCase | null>(null)
  const [uploadedFileName, setUploadedFileName] = useState('')
  const uploadInputRef = useRef<HTMLInputElement | null>(null)

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

  const handleDownloadTemplate = () => {
    const binary = atob(barrierTemplateBase64)
    const bytes = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i)
    }

    const blob = new Blob([bytes], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'barrier-assessment-template.xlsx'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Barrier Assessment</h1>
        <p className="text-sm text-gray-500 mt-1">
          Search and filter the blended finance opportunity pipeline. Click a row for full case details.
        </p>
      </div>

      <section className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleDownloadTemplate}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2"
        >
          <Download className="w-4 h-4" />
          Download Template
        </button>

        <button
          type="button"
          onClick={() => uploadInputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </button>

        <input
          ref={uploadInputRef}
          type="file"
          accept=".xlsx,.xls"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            setUploadedFileName(file?.name ?? '')
          }}
        />

        {uploadedFileName ? (
          <p className="text-xs text-slate-500">Uploaded: <span className="font-semibold">{uploadedFileName}</span></p>
        ) : (
          <p className="text-xs text-slate-500">Accepted formats: .xlsx, .xls</p>
        )}
      </section>

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
