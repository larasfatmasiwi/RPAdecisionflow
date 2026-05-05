import { createFileRoute } from '@tanstack/react-router'
import { ExcelLinkedDecisionFlowLandingPage } from '@/components/ExcelLinkedPages'

export const Route = createFileRoute('/decision-flow')({
  component: ExcelLinkedDecisionFlowLandingPage,
})
