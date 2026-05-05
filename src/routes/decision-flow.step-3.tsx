import { createFileRoute } from '@tanstack/react-router'
import { DecisionStepPage } from '@/components/FiveStepPages'

export const Route = createFileRoute('/decision-flow/step-3')({
  component: () => <DecisionStepPage step={3} />,
})
