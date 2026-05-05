import { createFileRoute } from '@tanstack/react-router'
import { ExcelLinkedDecisionStepPage } from '@/components/ExcelLinkedPages'

export const Route = createFileRoute('/decision-flow/step-2')({
  component: () => <ExcelLinkedDecisionStepPage step={2} />,
})
