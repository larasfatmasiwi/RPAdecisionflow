import { createFileRoute } from '@tanstack/react-router'
import { ExcelLinkedFinalReportPage } from '@/components/ExcelLinkedPages'

export const Route = createFileRoute('/final-report')({
  component: ExcelLinkedFinalReportPage,
})
