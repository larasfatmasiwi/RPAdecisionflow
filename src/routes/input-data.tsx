import { createFileRoute } from '@tanstack/react-router'
import { ExcelLinkedInputDataPage } from '@/components/ExcelLinkedPages'

export const Route = createFileRoute('/input-data')({
  component: ExcelLinkedInputDataPage,
})
