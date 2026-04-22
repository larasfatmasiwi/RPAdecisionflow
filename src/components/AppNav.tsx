import { Link } from '@tanstack/react-router'
import { BarChart3, Globe, BookOpen, Map, Lightbulb, Upload } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Overview', icon: BarChart3, exact: true },
  { to: '/cases', label: 'Case Explorer', icon: Globe, exact: false },
  { to: '/tools', label: 'BF Tools', icon: BookOpen, exact: false },
  { to: '/expansion', label: 'Expansion Options', icon: Map, exact: false },
  { to: '/recommend', label: 'Recommendation Engine', icon: Lightbulb, exact: false },
]

export function AppNav() {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-gray-900 hidden sm:block">Blended Finance Scorecard</span>
              <span className="text-sm font-bold text-gray-900 sm:hidden">BF Scorecard</span>
            </div>
            <span className="hidden md:block text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">
              Decision Support Platform
            </span>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.exact }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors [&.active]:bg-blue-50 [&.active]:text-blue-700"
              >
                <item.icon className="w-3.5 h-3.5" />
                <span className="hidden md:block">{item.label}</span>
              </Link>
            ))}

            {/* Upload placeholder */}
            <button
              onClick={() => alert('Excel upload coming soon — connect xlsx parser here')}
              className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-500 border border-gray-200 hover:border-blue-400 hover:text-blue-600 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:block">Import Excel</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
