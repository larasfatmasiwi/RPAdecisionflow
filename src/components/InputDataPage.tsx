import { useMemo, useState } from 'react'
import { CheckCircle2, ChevronRight, FilePlus2, Plus, Save, Trash2 } from 'lucide-react'
import { worldCountries } from '@/data/countries'

type ManualRow = Record<string, string>
type StepId = 1 | 2 | 3 | 4 | 5
type StepFourTab = 'financial' | 'tool'
type StepFiveTab = 'regulatory' | 'expansion'

type ManualInputState = {
  projectName: string
  country: string
  activeStep: StepId
  savedSteps: StepId[]
  step4Tab: StepFourTab
  step5Tab: StepFiveTab
  tables: {
    step1: ManualRow[]
    step2: ManualRow[]
    step3: ManualRow[]
    financial: ManualRow[]
    tool: ManualRow[]
    regulatory: ManualRow[]
    expansion: ManualRow[]
  }
}

type ManualProjectData = {
  step1: ManualRow[]
  step2: ManualRow[]
  step3: ManualRow[]
  step4: {
    financial: ManualRow[]
    tool: ManualRow[]
  }
  step5: {
    regulatory: ManualRow[]
    expansion: ManualRow[]
  }
}

type ManualProject = {
  id: string
  name: string
  country: string
  data: ManualProjectData
  savedSteps: StepId[]
  updatedAt: string
}

type ManualProjectStore = {
  currentProjectId: string | null
  projects: ManualProject[]
  draft: ManualInputState
}

const STORAGE_KEY = 'rpaManualInputData'

const stepLabels: Record<StepId, string> = {
  1: 'Step 1',
  2: 'Step 2',
  3: 'Step 3',
  4: 'Step 4',
  5: 'Step 5',
}

const step1Columns = [
  'SDG Goals/NDCs Target',
  'Country Challenges',
  'Background Information',
  'Existing Project',
  'Launch Year',
  'Size',
  'Project Description',
  'Development Rationale',
  'Expected Results',
  'Quality / Safeguards',
  'Sources',
]

const sdgGoalOptions = [
  'SDG 1 - No Poverty',
  'SDG 2 - Zero Hunger',
  'SDG 3 - Good Health and Well-being',
  'SDG 4 - Quality Education',
  'SDG 5 - Gender Equality',
  'SDG 6 - Clean Water and Sanitation',
  'SDG 7 - Affordable and Clean Energy',
  'SDG 8 - Decent Work and Economic Growth',
  'SDG 9 - Industry, Innovation and Infrastructure',
  'SDG 10 - Reduced Inequalities',
  'SDG 11 - Sustainable Cities and Communities',
  'SDG 12 - Responsible Consumption and Production',
  'SDG 13 - Climate Action',
  'SDG 14 - Life Below Water',
  'SDG 15 - Life on Land',
  'SDG 16 - Peace, Justice and Strong Institutions',
  'SDG 17 - Partnerships for the Goals',
]

const step2Columns = [
  'Intermediary',
  'Intermediary Description',
  'Intermediary Role',
  'Sources',
]

const step3Columns = [
  'Project Stage',
  'Barrier category',
  'Description / Progress Evidence',
  'Recommended Solutions / Diagnosis',
  'Sources',
]

const financialColumns = [
  'CAPEX/ Total Project Cost',
  'Committed Capital',
  'Funding Gap',
  'Revenue or Cost-Saving Source',
  'NPV',
  'IRR',
  'Payback Period',
  'DSCR',
  'Grant/Concessional Capital Required',
  'Capital Mobilization Ratio',
  'Financial Evidence Status',
]

const toolIndicators = [
  'Barrier fit',
  'Mobilization',
  'Financial additionality',
  'Development additionality',
  'Concessionality discipline',
  'Implementation feasibility',
  'Result/Impact measurability',
]

const toolColumns = ['Tool', ...toolIndicators, 'Average score', 'Rank', 'Scoring notes']

const regulatoryColumns = [
  'Regulatory assessment area',
  'Relevant regulation / authority',
  'Regulation No. / Year',
  'What RPA needs to check',
  'Why it matters for tool selection',
  'Tool implication',
  'Suggested RPA action',
  'Sources',
]

const expansionIndicators = [
  'Speed',
  'Cost',
  'Local Ownership',
  'Scalability',
  'Capacity Building',
  'Regulatory Feasibility',
]

const expansionColumns = ['Model', ...expansionIndicators, 'Average score', 'Rank', 'Scoring notes']

const financeTools = [
  'Concessional Loan',
  'Guarantee / Risk-sharing',
  'First-loss / Junior Capital',
  'Technical Assistance / Grants',
  'Hedging / Local-currency Facility',
  'Outcome-based Incentives',
]

const expansionModels = ['Hybrid', 'Local Hybrid', 'Deepen Local', 'Local Repurposing', 'New Build']

function emptyRow(columns: readonly string[], locked: Partial<ManualRow> = {}) {
  return columns.reduce<ManualRow>((row, column) => {
    row[column] = locked[column] ?? ''
    return row
  }, {})
}

function initialState(): ManualInputState {
  return {
    projectName: '',
    country: worldCountries[0] ?? '',
    activeStep: 1,
    savedSteps: [],
    step4Tab: 'financial',
    step5Tab: 'regulatory',
    tables: {
      step1: [emptyRow(step1Columns)],
      step2: [emptyRow(step2Columns)],
      step3: [emptyRow(step3Columns)],
      financial: [emptyRow(financialColumns)],
      tool: financeTools.map((tool) => emptyRow(toolColumns, { Tool: tool })),
      regulatory: [emptyRow(regulatoryColumns)],
      expansion: expansionModels.map((model) => emptyRow(expansionColumns, { Model: model })),
    },
  }
}

function newProjectId() {
  return `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function createStoreFromState(state: ManualInputState, currentProjectId: string | null = null): ManualProjectStore {
  return {
    currentProjectId,
    projects: [],
    draft: state,
  }
}

function tablesToProjectData(tables: ManualInputState['tables']): ManualProjectData {
  return {
    step1: tables.step1,
    step2: tables.step2,
    step3: tables.step3,
    step4: {
      financial: tables.financial,
      tool: tables.tool,
    },
    step5: {
      regulatory: tables.regulatory,
      expansion: tables.expansion,
    },
  }
}

function projectDataToTables(data: ManualProjectData | ManualInputState['tables']): ManualInputState['tables'] {
  if ('step4' in data && 'step5' in data) {
    return {
      step1: data.step1,
      step2: data.step2,
      step3: data.step3,
      financial: data.step4.financial,
      tool: data.step4.tool,
      regulatory: data.step5.regulatory,
      expansion: data.step5.expansion,
    }
  }
  return data
}

function stateFromProject(project: ManualProject): ManualInputState {
  return {
    ...initialState(),
    projectName: project.name,
    country: project.country,
    savedSteps: project.savedSteps,
    tables: { ...initialState().tables, ...projectDataToTables(project.data) },
  }
}

function normalizeStore(rawStore: Partial<ManualProjectStore>): ManualProjectStore {
  const base = createStoreFromState(initialState())
  return {
    currentProjectId: rawStore.currentProjectId ?? null,
    projects: rawStore.projects ?? [],
    draft: {
      ...initialState(),
      ...(rawStore.draft ?? {}),
      tables: { ...initialState().tables, ...(rawStore.draft?.tables ?? {}) },
    },
  }
}

function getStoredStore() {
  if (typeof window === 'undefined') return createStoreFromState(initialState())
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return createStoreFromState(initialState())
    const parsed = JSON.parse(raw) as Partial<ManualProjectStore> & Partial<ManualInputState>
    if ('projects' in parsed || 'draft' in parsed) return normalizeStore(parsed)
    const migratedState: ManualInputState = {
      ...initialState(),
      ...parsed,
      tables: { ...initialState().tables, ...(parsed.tables ?? {}) },
    }
    return createStoreFromState(migratedState)
  } catch {
    return createStoreFromState(initialState())
  }
}

function numericValue(value: string) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function averageScore(row: ManualRow, indicators: readonly string[]) {
  const total = indicators.reduce((sum, indicator) => sum + numericValue(row[indicator] ?? ''), 0)
  return total / indicators.length
}

function rankedRows(rows: ManualRow[], indicators: readonly string[]) {
  const rankMap = new Map<number, number>()
  rows
    .map((row, index) => ({ index, average: averageScore(row, indicators) }))
    .sort((a, b) => b.average - a.average)
    .forEach((item, rankIndex) => rankMap.set(item.index, rankIndex + 1))

  return rows.map((row, index) => ({
    ...row,
    'Average score': averageScore(row, indicators).toFixed(2),
    Rank: String(rankMap.get(index) ?? ''),
  }))
}

function isStepId(value: number): value is StepId {
  return value >= 1 && value <= 5
}

export function InputDataPage() {
  const [store, setStore] = useState<ManualProjectStore>(() => getStoredStore())
  const [state, setState] = useState<ManualInputState>(() => getStoredStore().draft)
  const [showSavedModal, setShowSavedModal] = useState(false)

  const projectDetail = state.projectName.trim() ? `${state.country} : ${state.projectName.trim()}` : `${state.country} : Unnamed project`
  const savedSet = useMemo(() => new Set(state.savedSteps), [state.savedSteps])
  const maxUnlockedStep = Math.min(5, state.savedSteps.length + 1)

  const persistStore = (nextStore: ManualProjectStore) => {
    setStore(nextStore)
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextStore))
  }

  const upsertProject = (nextState: ManualInputState, nextStore = store) => {
    if (!nextState.projectName.trim()) return nextStore
    const projectId = nextStore.currentProjectId ?? newProjectId()
    const now = new Date().toISOString()
    const nextProject: ManualProject = {
      id: projectId,
      name: nextState.projectName.trim(),
      country: nextState.country,
      data: tablesToProjectData(nextState.tables),
      savedSteps: nextState.savedSteps,
      updatedAt: now,
    }
    const projectExists = nextStore.projects.some((project) => project.id === projectId)
    return {
      ...nextStore,
      currentProjectId: projectId,
      projects: projectExists
        ? nextStore.projects.map((project) => (project.id === projectId ? nextProject : project))
        : [...nextStore.projects, nextProject],
    }
  }

  const saveState = (nextState: ManualInputState, saveProject = false) => {
    setState(nextState)
    const nextStore = saveProject || store.currentProjectId
      ? upsertProject(nextState, { ...store, draft: nextState })
      : { ...store, draft: nextState }
    persistStore(nextStore)
  }

  const patchState = (patch: Partial<ManualInputState>) => {
    saveState({ ...state, ...patch })
  }

  const updateRows = (table: keyof ManualInputState['tables'], rows: ManualRow[]) => {
    saveState({ ...state, tables: { ...state.tables, [table]: rows } })
  }

  const updateCell = (table: keyof ManualInputState['tables'], rowIndex: number, column: string, value: string) => {
    const rows = state.tables[table].map((row, index) => (index === rowIndex ? { ...row, [column]: value } : row))
    updateRows(table, rows)
  }

  const addRow = (table: keyof ManualInputState['tables'], columns: readonly string[]) => {
    updateRows(table, [...state.tables[table], emptyRow(columns)])
  }

  const removeRow = (table: keyof ManualInputState['tables'], rowIndex: number) => {
    const currentRows = state.tables[table]
    if (currentRows.length === 1) return
    updateRows(table, currentRows.filter((_, index) => index !== rowIndex))
  }

  const saveStepAndContinue = (step: StepId) => {
    const nextSavedSteps = savedSet.has(step) ? state.savedSteps : [...state.savedSteps, step]
    const nextStepNumber = Math.min(5, step + 1)
    saveState({
      ...state,
      savedSteps: nextSavedSteps,
      activeStep: isStepId(nextStepNumber) ? nextStepNumber : step,
    }, true)
    if (step === 5) setShowSavedModal(true)
  }

  const selectStep = (step: StepId) => {
    if (step > maxUnlockedStep) return
    patchState({ activeStep: step })
  }

  const selectProject = (projectId: string) => {
    const project = store.projects.find((item) => item.id === projectId)
    if (!project) return
    const nextState = stateFromProject(project)
    setState(nextState)
    persistStore({ ...store, currentProjectId: project.id, draft: nextState })
  }

  const startNewProject = () => {
    const nextState = initialState()
    setState(nextState)
    persistStore({ ...store, currentProjectId: null, draft: nextState })
  }

  return (
    <div className="space-y-5 pb-8">
      <header className="space-y-2">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">Manual input layer</span>
        <h1 className="text-2xl font-bold text-slate-950">Input Data</h1>
        <p className="max-w-5xl text-sm leading-6 text-slate-600">
          Build a project record through the five-step decision flow.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-slate-900">Saved Projects</h2>
          <button
            type="button"
            onClick={startNewProject}
            className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-100"
          >
            <FilePlus2 className="h-4 w-4" />
            New project
          </button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-100 text-left text-slate-700">
                <th className="px-3 py-2 font-bold">Projects</th>
              </tr>
            </thead>
            <tbody>
              {store.projects.length ? store.projects.map((project) => (
                <tr key={project.id} className="border-t border-slate-200">
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => selectProject(project.id)}
                      className={`w-full rounded-lg px-3 py-2 text-left font-semibold transition-colors ${store.currentProjectId === project.id ? 'bg-blue-50 text-blue-900' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      {project.country} : {project.name}
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td className="px-3 py-6 text-sm text-slate-500">No saved projects yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Project name</span>
            <input
              value={state.projectName}
              onChange={(event) => patchState({ projectName: event.target.value })}
              placeholder="Enter project name"
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-400 focus:bg-white"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Country</span>
            <select
              value={state.country}
              onChange={(event) => patchState({ country: event.target.value })}
              className="h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-400 focus:bg-white"
            >
              {worldCountries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-900">
          Project tab detail: {projectDetail}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-2 md:grid-cols-5">
          {([1, 2, 3, 4, 5] as StepId[]).map((step) => {
            const isActive = state.activeStep === step
            const isSaved = savedSet.has(step)
            const isLocked = step > maxUnlockedStep
            return (
              <button
                key={step}
                type="button"
                disabled={isLocked}
                onClick={() => selectStep(step)}
                className={`min-h-20 rounded-xl border p-3 text-left transition-colors ${isActive ? 'border-blue-300 bg-blue-50 text-blue-900' : isSaved ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-slate-50 text-slate-700'} ${isLocked ? 'cursor-not-allowed opacity-50' : 'hover:bg-white'}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold">{stepLabels[step]}</span>
                  {isSaved ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <ChevronRight className="h-4 w-4" />}
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-5">{projectDetail}</p>
              </button>
            )
          })}
        </div>
      </section>

      {state.activeStep === 1 ? (
        <StepCard title="Step 1" onSave={() => saveStepAndContinue(1)}>
          <EditableTable columns={step1Columns} rows={state.tables.step1} table="step1" onUpdate={updateCell} onAdd={() => addRow('step1', step1Columns)} onRemove={removeRow} selectColumns={{ 'SDG Goals/NDCs Target': sdgGoalOptions }} />
        </StepCard>
      ) : null}

      {state.activeStep === 2 ? (
        <StepCard title="Step 2" onSave={() => saveStepAndContinue(2)}>
          <EditableTable columns={step2Columns} rows={state.tables.step2} table="step2" onUpdate={updateCell} onAdd={() => addRow('step2', step2Columns)} onRemove={removeRow} />
        </StepCard>
      ) : null}

      {state.activeStep === 3 ? (
        <StepCard title="Step 3" onSave={() => saveStepAndContinue(3)}>
          <EditableTable columns={step3Columns} rows={state.tables.step3} table="step3" onUpdate={updateCell} onAdd={() => addRow('step3', step3Columns)} onRemove={removeRow} />
        </StepCard>
      ) : null}

      {state.activeStep === 4 ? (
        <StepCard title="Step 4" onSave={() => saveStepAndContinue(4)}>
          <SegmentedTabs
            tabs={[
              { id: 'financial', label: 'Financial Feasibility Assessment' },
              { id: 'tool', label: 'Blended Finance Tool' },
            ]}
            active={state.step4Tab}
            onChange={(step4Tab) => patchState({ step4Tab })}
          />
          {state.step4Tab === 'financial' ? (
            <EditableTable columns={financialColumns} rows={state.tables.financial} table="financial" onUpdate={updateCell} onAdd={() => addRow('financial', financialColumns)} onRemove={removeRow} />
          ) : (
            <EditableTable columns={toolColumns} rows={rankedRows(state.tables.tool, toolIndicators)} table="tool" onUpdate={updateCell} fixedFirstColumn readOnlyColumns={['Average score', 'Rank']} numericColumns={toolIndicators} onRemove={removeRow} />
          )}
        </StepCard>
      ) : null}

      {state.activeStep === 5 ? (
        <StepCard title="Step 5" onSave={() => saveStepAndContinue(5)}>
          <SegmentedTabs
            tabs={[
              { id: 'regulatory', label: 'Regulatory Assessment' },
              { id: 'expansion', label: 'Global Expansion Model' },
            ]}
            active={state.step5Tab}
            onChange={(step5Tab) => patchState({ step5Tab })}
          />
          {state.step5Tab === 'regulatory' ? (
            <EditableTable columns={regulatoryColumns} rows={state.tables.regulatory} table="regulatory" onUpdate={updateCell} onAdd={() => addRow('regulatory', regulatoryColumns)} onRemove={removeRow} />
          ) : (
            <EditableTable columns={expansionColumns} rows={rankedRows(state.tables.expansion, expansionIndicators)} table="expansion" onUpdate={updateCell} fixedFirstColumn readOnlyColumns={['Average score', 'Rank']} numericColumns={expansionIndicators} onRemove={removeRow} />
          )}
        </StepCard>
      ) : null}

      {showSavedModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-950">Project saved</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {projectDetail} is now listed in the saved project list.
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSavedModal(false)}
                className="rounded-xl bg-[#0b3566] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0f4a88]"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function StepCard({ title, children, onSave }: { title: string; children: React.ReactNode; onSave: () => void }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0b3566] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#0f4a88]"
        >
          <Save className="h-4 w-4" />
          Save and continue
        </button>
      </div>
      {children}
    </section>
  )
}

function SegmentedTabs<T extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: Array<{ id: T; label: string }>
  active: T
  onChange: (value: T) => void
}) {
  return (
    <div className="mb-4 flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`rounded-lg px-3 py-2 text-sm font-bold transition-colors ${active === tab.id ? 'bg-white text-blue-800 shadow-sm' : 'text-slate-600 hover:bg-white/70'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function EditableTable({
  columns,
  rows,
  table,
  onUpdate,
  onAdd,
  onRemove,
  fixedFirstColumn = false,
  readOnlyColumns = [],
  numericColumns = [],
  selectColumns = {},
}: {
  columns: readonly string[]
  rows: ManualRow[]
  table: keyof ManualInputState['tables']
  onUpdate: (table: keyof ManualInputState['tables'], rowIndex: number, column: string, value: string) => void
  onAdd?: () => void
  onRemove: (table: keyof ManualInputState['tables'], rowIndex: number) => void
  fixedFirstColumn?: boolean
  readOnlyColumns?: readonly string[]
  numericColumns?: readonly string[]
  selectColumns?: Record<string, readonly string[]>
}) {
  return (
    <div className="space-y-3">
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[1100px] border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 text-left text-slate-700">
              {columns.map((column) => (
                <th key={column} className="border-r border-slate-200 px-3 py-2 font-bold last:border-r-0">{column}</th>
              ))}
              {onAdd ? <th className="w-12 px-3 py-2 font-bold">Actions</th> : null}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-slate-200 align-top">
                {columns.map((column, columnIndex) => {
                  const isReadOnly = readOnlyColumns.includes(column) || (fixedFirstColumn && columnIndex === 0)
                  const isNumeric = numericColumns.includes(column)
                  const selectOptions = selectColumns[column]
                  return (
                    <td key={`${rowIndex}-${column}`} className="border-r border-slate-100 p-2 last:border-r-0">
                      {isReadOnly ? (
                        <div className="min-h-10 rounded-lg bg-slate-100 px-2 py-2 font-semibold text-slate-700">{row[column]}</div>
                      ) : selectOptions ? (
                        <select
                          value={row[column] ?? ''}
                          onChange={(event) => onUpdate(table, rowIndex, column, event.target.value)}
                          className="min-h-10 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-800 outline-none focus:border-blue-400"
                        >
                          <option value="">Select option</option>
                          {selectOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <textarea
                          value={row[column] ?? ''}
                          onChange={(event) => onUpdate(table, rowIndex, column, event.target.value)}
                          inputMode={isNumeric ? 'decimal' : undefined}
                          placeholder={isNumeric ? '0-10' : 'Input'}
                          className="min-h-20 w-full resize-y rounded-lg border border-slate-200 bg-white px-2 py-2 text-slate-800 outline-none focus:border-blue-400"
                        />
                      )}
                    </td>
                  )
                })}
                {onAdd ? (
                  <td className="p-2">
                    <button
                      type="button"
                      onClick={() => onRemove(table, rowIndex)}
                      disabled={rows.length === 1}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Remove row"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {onAdd ? (
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-100"
        >
          <Plus className="h-4 w-4" />
          Add new line
        </button>
      ) : null}
    </div>
  )
}
