import { Link } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Workflow,
  ShieldAlert,
  Wrench,
  MoveUpRight,
  FileText,
  Users,
  LineChart,
  FolderKanban,
  CircleDot,
} from 'lucide-react'

const primaryItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, exact: true },
]

const decisionFlowItems = [
  { to: '/recommend', label: 'Decision Flow', icon: Workflow },
  { to: '/cases', label: 'Barrier Assessment', icon: ShieldAlert },
  { to: '/tools', label: 'Financial Tool Recommendation', icon: Wrench },
  { to: '/expansion', label: 'Expansion Option', icon: MoveUpRight },
]

const supportingDataItems = [
  { label: 'Project Profile', icon: FolderKanban },
  { label: 'Stakeholders', icon: Users },
  { label: 'Market Context', icon: LineChart },
  { label: 'Documents', icon: FileText },
]

export function AppNav() {
  return (
    <aside className="w-[280px] bg-[#06264a] text-white flex flex-col h-screen sticky top-0">
      <div className="px-5 py-7 border-b border-white/10">
        <p className="text-xl font-bold leading-tight">Blended Finance</p>
        <p className="text-sm text-blue-100/80">Decision Dashboard</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
        <div className="space-y-2">
          {primaryItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-blue-100 hover:bg-white/10 transition-colors [&.active]:bg-[#0f4a88]"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.08em] text-blue-200/70 px-3 mb-2">DECISION FLOW</p>
          <div className="space-y-2">
            {decisionFlowItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-blue-100 hover:bg-white/10 transition-colors [&.active]:bg-white/15"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-semibold tracking-[0.08em] text-blue-200/70 px-3 mb-2">SUPPORTING DATA</p>
          <div className="space-y-2">
            {supportingDataItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-blue-100/90 hover:bg-white/10 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span className="text-left">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="m-4 rounded-2xl border border-white/20 bg-white/5 p-4 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/20 px-2.5 py-1 text-xs font-semibold text-amber-200">
          <CircleDot className="w-3 h-3 fill-current" />
          Proceed with caution
        </div>
        <p className="text-sm text-blue-100">Owner</p>
        <p className="text-sm font-semibold">Investment Team</p>
        <p className="text-xs text-blue-200">Review Date · 20 Jun 2024</p>
      </div>
    </aside>
  )
}
