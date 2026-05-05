import { createFileRoute } from '@tanstack/react-router'
import { DedicatedStep1Page } from '@/components/DedicatedStepPages'

export const Route = createFileRoute('/decision-flow/step-1')({ component: DedicatedStep1Page })
