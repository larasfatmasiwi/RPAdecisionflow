import { createFileRoute } from '@tanstack/react-router'
import { ExcelLinkedDecisionStepPage } from '@/components/ExcelLinkedPages'

export const Route = createFileRoute('/decision-flow/step-5')({
  component: () => <ExcelLinkedDecisionStepPage step={5} />,
})
