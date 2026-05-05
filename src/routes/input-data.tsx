import { createFileRoute } from '@tanstack/react-router'
import { InputDataPage } from '@/components/FiveStepPages'

export const Route = createFileRoute('/input-data')({
  component: InputDataPage,
})
