/**
 * Excel ingestion utility layer.
 * TODO: Replace stub implementations with mapped ExcelJS workbook rows.
 * Workbook parsing helpers live in src/utils/excelWorkbook.ts.
 *
 * Usage pattern:
 *   import { readWorkbookSheets } from '@/utils/excelWorkbook'
 *   const sheets = await readWorkbookSheets(buffer, ['Step 1'])
 *   const rows = sheets['Step 1']
 *   const cases = mapStep1Rows(rows)
 */

import type {
  CountryCase,
  Intermediary,
  BarrierAssessment,
  BlendedFinanceToolRef,
  ExpansionOptionRef,
} from '@/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapStep1Rows(rows: any[]): CountryCase[] {
  // TODO: Map Excel column headers to CountryCase fields
  // Expected headers: Country, SDG/NDC Target, Country Challenges, Background Problem,
  //                   Existing Project, Development Rationale, Expected Results, Safeguards, Sources
  return rows.map((row, i) => ({
    id: `case-${String(i + 1).padStart(3, '0')}`,
    country: row['Country'] ?? '',
    sdgTarget: row['SDG/NDC Target'] ?? '',
    countryChallenges: row['Country Challenges'] ?? '',
    backgroundProblem: row['Background Problem'] ?? '',
    existingProject: row['Existing Project'] ?? '',
    developmentRationale: row['Development Rationale'] ?? '',
    expectedResults: row['Expected Results'] ?? '',
    safeguards: row['Safeguards'] ?? '',
    sources: row['Sources'] ?? '',
  }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapStep2Rows(rows: any[]): Intermediary[] {
  return rows.map((row, i) => ({
    id: `int-${String(i + 1).padStart(3, '0')}`,
    linkedCaseId: row['Linked Case ID'] ?? '',
    intermediary: row['Intermediary'] ?? '',
    type: row['Type'] ?? '',
    whyRelevant: row['Why Relevant'] ?? '',
    role: row['Role'] ?? '',
    geography: row['Geography'] ?? '',
    relationshipStatus: row['Relationship Status'] ?? 'Unknown',
    linkedCountry: row['Linked Country'] ?? '',
    linkedBarrier: row['Linked Barrier'] ?? '',
  }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapStep3Rows(rows: any[]): BarrierAssessment[] {
  return rows.map((row, i) => ({
    id: `barrier-${String(i + 1).padStart(3, '0')}`,
    linkedCaseId: row['Linked Case ID'] ?? '',
    primaryBarrier: row['Primary Barrier'] ?? '',
    barrierDescription: row['Barrier Description'] ?? '',
    observableSigns: row['Observable Signs'] ?? '',
    projectStage: row['Project Stage'] ?? 'Concept',
    recommendedTool: row['Recommended Tool'] ?? '',
    toolRationale: row['Tool Rationale'] ?? '',
    source: row['Source'] ?? '',
  }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapStep4Rows(rows: any[]): BlendedFinanceToolRef[] {
  return rows.map((row) => ({
    tool: row['Tool'] ?? '',
    description: row['Description'] ?? '',
    bestWhen: row['Best When'] ?? '',
    strengths: (row['Strengths'] ?? '').split(';').map((s: string) => s.trim()).filter(Boolean),
    weaknesses: (row['Weaknesses'] ?? '').split(';').map((s: string) => s.trim()).filter(Boolean),
    riskMethodologies: (row['Risk Methodologies'] ?? '').split(';').map((s: string) => s.trim()).filter(Boolean),
    source: row['Source'] ?? '',
  }))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapStep5Rows(rows: any[]): ExpansionOptionRef[] {
  return rows.map((row) => ({
    model: row['Model'] ?? '',
    description: row['Description'] ?? '',
    bestWhen: row['Best When'] ?? '',
    pros: (row['Pros'] ?? '').split(';').map((s: string) => s.trim()).filter(Boolean),
    cons: (row['Cons'] ?? '').split(';').map((s: string) => s.trim()).filter(Boolean),
    implementationImplications: row['Implementation Implications'] ?? '',
  }))
}
