import { createFileRoute } from '@tanstack/react-router'
import { DedicatedStep3Page } from '@/components/DedicatedStepPages'

export const Route = createFileRoute('/decision-flow/step-3')({ component: DedicatedStep3Page })
