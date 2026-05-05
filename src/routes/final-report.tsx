import { createFileRoute } from '@tanstack/react-router'
import { FinalReportPage } from '@/components/FinalReportPage'

export const Route = createFileRoute('/final-report')({
  component: FinalReportPage,
})
