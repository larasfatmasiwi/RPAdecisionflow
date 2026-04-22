import {
  expansionOptions,
  stageBarrierToolMap,
  type BarrierOption,
  type ExpansionOption,
  type RecommendationStrength,
  type ToolOption,
} from '@/utils/decisionFlowConfig'

export function hasClearDevelopmentChallenge(inputs: {
  challenge: string
  sdgPriority: string
  governmentPriority: string
  marketNeed: string
}) {
  return [inputs.challenge, inputs.sdgPriority, inputs.governmentPriority, inputs.marketNeed].some(
    (value) => value.trim().length > 0
  )
}

export function getEcosystemDecision(inputs: {
  hasLocalIntermediaries: boolean
  canBuildEcosystem: boolean
}) {
  if (inputs.hasLocalIntermediaries) {
    return 'continue'
  }

  return inputs.canBuildEcosystem ? 'proceed_with_caution' : 'avoid_entry'
}

export function recommendToolFromBarrier(barrier: BarrierOption): ToolOption {
  return stageBarrierToolMap[barrier]
}

export function getRecommendationStrength(scores: number[]): RecommendationStrength {
  if (scores.length === 0) return 'Reassess project'

  const highest = Math.max(...scores)

  if (highest > 7) return 'Strong fit'
  if (highest >= 5) return 'Conditional fit'
  return 'Reassess project'
}

export function scoreAverage(scores: number[]) {
  if (!scores.length) return 0
  return scores.reduce((total, value) => total + value, 0) / scores.length
}

export function recommendExpansionOption(optionScores: Record<ExpansionOption, number[]>) {
  const ranked = expansionOptions
    .map((option) => ({
      option,
      average: scoreAverage(optionScores[option] ?? []),
    }))
    .sort((a, b) => b.average - a.average)

  return ranked[0]?.option ?? 'Hybrid'
}
