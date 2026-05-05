import ExcelJS from 'exceljs'

export type SheetCell = string | number | boolean | null
export type SheetRows = Array<Array<SheetCell>>

function cellToValue(value: ExcelJS.CellValue): SheetCell {
  if (value == null) return ''
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value

  if ('result' in value) return cellToValue(value.result as ExcelJS.CellValue)
  if ('text' in value) return value.text
  if ('richText' in value) return value.richText.map((part) => part.text).join('')

  return String(value)
}

export function normalizeRows(rows: unknown[][]): SheetRows {
  return rows
    .map((row) => row.map((cell) => (cell == null ? '' : typeof cell === 'object' ? String(cell) : (cell as SheetCell))))
    .filter((row) => row.some((cell) => String(cell ?? '').trim() !== ''))
}

function worksheetRows(worksheet: ExcelJS.Worksheet): SheetRows {
  const rows: SheetRows = []
  worksheet.eachRow({ includeEmpty: true }, (row) => {
    const values = (row.values as ExcelJS.CellValue[]).slice(1).map(cellToValue)
    rows.push(values)
  })
  return normalizeRows(rows)
}

export async function readWorkbookSheets(buffer: ArrayBuffer, sheetNames: readonly string[]) {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer)

  const sheets: Record<string, SheetRows> = {}
  sheetNames.forEach((sheet) => {
    const worksheet = workbook.worksheets.find((item) => item.name.trim().toLowerCase() === sheet.toLowerCase())
    if (worksheet) sheets[sheet] = worksheetRows(worksheet)
  })

  return sheets
}

export async function writeWorkbookFile(filename: string, sheets: Record<string, SheetRows>) {
  const workbook = new ExcelJS.Workbook()
  Object.entries(sheets).forEach(([name, rows]) => {
    const worksheet = workbook.addWorksheet(name)
    rows.forEach((row) => worksheet.addRow(row))
  })

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

