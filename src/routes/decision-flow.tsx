import { createFileRoute } from '@tanstack/react-router'
import { DecisionFlowLandingPage } from '@/components/FiveStepPages'

export const Route = createFileRoute('/decision-flow')({
  component: DecisionFlowLandingPage,
})
