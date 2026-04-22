import { Check } from 'lucide-react'

interface DecisionFlowStepperProps {
  steps: readonly string[]
  currentStep: number
}

export function DecisionFlowStepper({ steps, currentStep }: DecisionFlowStepperProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
        {steps.map((label, index) => {
          const stepNumber = index + 1
          const isComplete = stepNumber < currentStep
          const isActive = stepNumber === currentStep

          return (
            <article
              key={label}
              className={`rounded-lg border p-3 transition-colors ${
                isActive
                  ? 'border-blue-200 bg-blue-50'
                  : isComplete
                    ? 'border-emerald-200 bg-emerald-50'
                    : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isComplete
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isComplete ? <Check className="h-4 w-4" /> : stepNumber}
                </span>
                <p className="text-xs font-semibold text-slate-700">{label}</p>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
