import { Link } from '@tanstack/react-router'
import {
  Menu,
  X,
  LayoutDashboard,
  Workflow,
  ShieldAlert,
  Wrench,
  MoveUpRight,
  CircleDot,
} from 'lucide-react'

const primaryItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, exact: true },
]

const decisionFlowItems = [
  { to: '/recommend', label: 'Decision Flow', icon: Workflow },
  { to: '/cases', label: 'Barrier Assessment', icon: ShieldAlert },
  { to: '/tools', label: 'Blended Finance Description', icon: Wrench },
  { to: '/expansion', label: 'Global Expansion Description', icon: MoveUpRight },
]

type AppNavProps = {
  isOpen: boolean | null
  onToggle: () => void
  onNavigate: () => void
}

export function AppNav({ isOpen, onToggle, onNavigate }: AppNavProps) {
  const isDefault = isOpen === null
  const isCollapsed = isOpen === false
  const navWidth = isDefault ? 'w-[76px] md:w-[280px]' : isCollapsed ? 'w-[76px]' : 'w-[280px]'
  const navChrome = isDefault
    ? 'items-center px-3 md:items-start md:px-5'
    : isCollapsed
      ? 'items-center px-3'
      : 'px-5'
  const labelVisibility = isDefault ? 'hidden md:block' : isCollapsed ? 'hidden' : ''
  const collapsedLinkLayout = isDefault ? 'justify-center px-0 md:justify-start md:px-3' : isCollapsed ? 'justify-center px-0' : ''

  return (
    <aside
      className={`sticky top-0 z-40 bg-[#06264a] text-white flex flex-col h-screen shrink-0 shadow-none transition-all duration-300 ease-out ${navWidth}`}
    >
      <div className={`flex items-start justify-between gap-4 px-5 py-7 border-b border-white/10 ${navChrome}`}>
        <div className={labelVisibility}>
          <p className="text-xl font-bold leading-tight">RPA Project</p>
          <p className="text-sm text-blue-100/80">Decision Flow</p>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="rounded-xl border border-white/15 p-2 text-blue-100 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Toggle navigation"
        >
          {isDefault ? (
            <>
              <Menu className="h-5 w-5 md:hidden" />
              <X className="hidden h-5 w-5 md:block" />
            </>
          ) : isCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <X className="h-5 w-5" />
          )}
        </button>
      </div>

      <nav className={`flex-1 overflow-y-auto px-4 py-5 space-y-6 ${isDefault ? 'px-3 md:px-4' : isCollapsed ? 'px-3' : ''}`}>
        <div className="space-y-2">
          {primaryItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              onClick={onNavigate}
              title={item.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-blue-100 hover:bg-white/10 transition-colors [&.active]:bg-[#0f4a88] ${collapsedLinkLayout}`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className={labelVisibility}>{item.label}</span>
            </Link>
          ))}
        </div>

        <div>
          <p className={`text-[11px] font-semibold tracking-[0.08em] text-blue-200/70 px-3 mb-2 ${labelVisibility}`}>DECISION FLOW</p>
          <div className="space-y-2">
            {decisionFlowItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onNavigate}
                title={item.label}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-blue-100 hover:bg-white/10 transition-colors [&.active]:bg-white/15 ${collapsedLinkLayout}`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className={labelVisibility}>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className={`m-4 rounded-2xl border border-white/20 bg-white/5 p-4 space-y-2 ${labelVisibility}`}>
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100/20 px-2.5 py-1 text-xs font-semibold text-amber-200">
          <CircleDot className="w-3 h-3 fill-current" />
          Build by
        </div>
        <p className="text-sm text-blue-100">Jing, Laras, Qiyun, Yanzhi</p>
        <p className="text-sm font-semibold">RPA Team 1</p>
        <p className="text-xs text-blue-200">Columbia University</p>
      </div>
    </aside>
  )
}
