import { createFileRoute } from '@tanstack/react-router'
import { DedicatedStep2Page } from '@/components/DedicatedStepPages'

export const Route = createFileRoute('/decision-flow/step-2')({ component: DedicatedStep2Page })
