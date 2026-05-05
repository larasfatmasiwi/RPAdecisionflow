import { createFileRoute } from '@tanstack/react-router'
import { DecisionStepPage } from '@/components/FiveStepPages'

export const Route = createFileRoute('/decision-flow/step-4')({
  component: () => <DecisionStepPage step={4} />,
})
