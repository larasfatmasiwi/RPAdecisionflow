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

const barrierTemplateColumns = [
  'linkedCaseId',
  'primaryBarrier',
  'barrierDescription',
  'observableSigns',
  'projectStage',
  'recommendedTool',
  'source',
]

function buildExcelXmlTemplate() {
  const headers = barrierTemplateColumns.map((value) => `<Cell><Data ss:Type="String">${value}</Data></Cell>`).join('')
  return `<?xml version="1.0"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
  <Worksheet ss:Name="Barrier Assessment">
    <Table>
      <Row>${headers}</Row>
    </Table>
  </Worksheet>
</Workbook>`
}

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
    const xml = buildExcelXmlTemplate()
    const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'barrier-assessment-template.xls'
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
