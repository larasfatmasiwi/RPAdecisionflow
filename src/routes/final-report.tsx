import { createFileRoute } from '@tanstack/react-router'
import { FinalReportPage } from '@/components/FiveStepPages'

export const Route = createFileRoute('/final-report')({
  component: FinalReportPage,
})
