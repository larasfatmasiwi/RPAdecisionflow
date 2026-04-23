import type { FullCase } from '@/types'
import { Badge } from './Badge'
import { X, Globe, Building2, AlertTriangle, TrendingUp, Download } from 'lucide-react'

interface DetailDrawerProps {
  fullCase: FullCase | null
  onClose: () => void
}

export function DetailDrawer({ fullCase, onClose }: DetailDrawerProps) {
  if (!fullCase) return null

  const { case: c, intermediaries, barrier, expansion } = fullCase

  const handleExport = () => {
    const blob = buildCasePdf(fullCase)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${toFileName(c.country)}-case-details.pdf`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto max-h-[calc(100vh-2rem)] w-full max-w-3xl bg-white flex flex-col rounded-2xl shadow-2xl">
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
                type="button"
                className="text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 flex items-center gap-1.5"
                onClick={handleExport}
              >
                <Download className="w-3.5 h-3.5" />
                Export
              </button>
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close details"
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

type PdfLine = {
  text: string
  font: 'F1' | 'F2'
  size: number
  spacingAfter?: number
}

function buildCasePdf(fullCase: FullCase) {
  const lines = buildCaseExportLines(fullCase)
  const pageWidth = 612
  const pageHeight = 792
  const margin = 54
  const contentWidth = pageWidth - margin * 2
  const bottomMargin = 54
  const pages: string[][] = []
  let pageCommands: string[] = []
  let y = pageHeight - margin

  const startNewPage = () => {
    if (pageCommands.length > 0) {
      pages.push(pageCommands)
    }
    pageCommands = []
    y = pageHeight - margin
  }

  for (const line of lines) {
    if (!line.text) {
      y -= line.spacingAfter ?? 10
      continue
    }

    const wrappedLines = wrapPdfText(line.text, line.size, contentWidth)
    for (const wrappedLine of wrappedLines) {
      if (y < bottomMargin + line.size) {
        startNewPage()
      }

      pageCommands.push(`BT /${line.font} ${line.size} Tf ${margin} ${y} Td (${escapePdfText(wrappedLine)}) Tj ET`)
      y -= line.size * 1.35
    }

    y -= line.spacingAfter ?? 4
  }

  if (pageCommands.length > 0) {
    pages.push(pageCommands)
  }

  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    `<< /Type /Pages /Kids [${pages.map((_, index) => `${5 + index * 2} 0 R`).join(' ')}] /Count ${pages.length} >>`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>',
  ]

  pages.forEach((commands, index) => {
    const pageObjectNumber = 5 + index * 2
    const contentObjectNumber = pageObjectNumber + 1
    const content = commands.join('\n')
    objects.push(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentObjectNumber} 0 R >>`,
      `<< /Length ${content.length} >>\nstream\n${content}\nendstream`
    )
  })

  return new Blob([buildPdfDocument(objects)], { type: 'application/pdf' })
}

function buildCaseExportLines(fullCase: FullCase): PdfLine[] {
  const { case: c, intermediaries, barrier, expansion } = fullCase
  const lines: PdfLine[] = [
    titleLine(`${c.country} Case Details`),
    bodyLine(`SDG Target: ${c.sdgTarget}`),
    bodyLine(`Project Stage: ${barrier.projectStage}`, 12),
    sectionLine('Country & Challenge'),
    bodyLine(fieldLine('Country Challenges', c.countryChallenges)),
    bodyLine(fieldLine('Background Problem', c.backgroundProblem)),
    bodyLine(fieldLine('Existing Projects / Initiatives', c.existingProject)),
    bodyLine(fieldLine('Development Rationale', c.developmentRationale)),
    bodyLine(fieldLine('Expected Results', c.expectedResults)),
    bodyLine(fieldLine('Safeguards', c.safeguards)),
    bodyLine(fieldLine('Sources', c.sources), 12),
    sectionLine('Intermediary Mapping'),
  ]

  if (intermediaries.length === 0) {
    lines.push(bodyLine('No intermediaries mapped for this case.', 12))
  } else {
    intermediaries.forEach((int, index) => {
      lines.push(
        subsectionLine(`${index + 1}. ${int.intermediary}`),
        bodyLine(fieldLine('Type', int.type)),
        bodyLine(fieldLine('Geography', int.geography)),
        bodyLine(fieldLine('Relationship Status', int.relationshipStatus)),
        bodyLine(fieldLine('Role', int.role)),
        bodyLine(fieldLine('Why Relevant', int.whyRelevant), 10)
      )
    })
  }

  lines.push(
    sectionLine('Barrier Assessment'),
    bodyLine(fieldLine('Primary Barrier', barrier.primaryBarrier)),
    bodyLine(fieldLine('Barrier Description', barrier.barrierDescription)),
    bodyLine(fieldLine('Observable Signs', barrier.observableSigns)),
    bodyLine(fieldLine('Recommended Blended Finance Tool', barrier.recommendedTool)),
    bodyLine(fieldLine('Tool Rationale', barrier.toolRationale)),
    bodyLine(fieldLine('Source', barrier.source), 12),
    sectionLine('Expansion Recommendation'),
    bodyLine(fieldLine('Recommended Global Expansion Model', expansion.recommendedModel)),
    bodyLine(fieldLine('Rationale', expansion.rationale)),
    bodyLine(fieldLine('Feasibility Notes', expansion.feasibilityNotes))
  )

  return lines
}

function titleLine(text: string): PdfLine {
  return { text, font: 'F2', size: 18, spacingAfter: 12 }
}

function sectionLine(text: string): PdfLine {
  return { text, font: 'F2', size: 13, spacingAfter: 8 }
}

function subsectionLine(text: string): PdfLine {
  return { text, font: 'F2', size: 11, spacingAfter: 5 }
}

function bodyLine(text: string, spacingAfter = 6): PdfLine {
  return { text, font: 'F1', size: 10, spacingAfter }
}

function fieldLine(label: string, value: string) {
  return `${label}: ${value}`
}

function buildPdfDocument(objects: string[]) {
  const chunks = ['%PDF-1.4\n']
  const offsets: number[] = []
  let length = chunks[0].length

  objects.forEach((object, index) => {
    offsets.push(length)
    const chunk = `${index + 1} 0 obj\n${object}\nendobj\n`
    chunks.push(chunk)
    length += chunk.length
  })

  const xrefOffset = length
  chunks.push(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`)
  offsets.forEach((offset) => {
    chunks.push(`${offset.toString().padStart(10, '0')} 00000 n \n`)
  })
  chunks.push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`)

  return chunks.join('')
}

function wrapPdfText(text: string, fontSize: number, maxWidth: number) {
  const normalizedText = normalizePdfText(text)
  const maxChars = Math.max(24, Math.floor(maxWidth / (fontSize * 0.52)))
  const words = normalizedText.split(/\s+/)
  const lines: string[] = []
  let currentLine = ''

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word
    if (nextLine.length > maxChars && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = nextLine
    }
  })

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

function normalizePdfText(value: string) {
  return value
    .replace(/[–—]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/•/g, '-')
    .replace(/[^\x20-\x7E]/g, '')
}

function escapePdfText(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)')
}

function toFileName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}
