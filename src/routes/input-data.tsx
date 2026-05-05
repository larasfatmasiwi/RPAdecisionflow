import { createFileRoute } from '@tanstack/react-router'
import { InputDataPage } from '@/components/InputDataPage'

export const Route = createFileRoute('/input-data')({
  component: InputDataPage,
})
