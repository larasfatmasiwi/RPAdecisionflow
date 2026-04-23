import { useState, type ReactNode } from 'react'
import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import { AppNav } from '@/components/AppNav'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'RPA Project Decision Flow' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#eef2f7] min-h-screen text-[#10233f]">
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  const [navOpen, setNavOpen] = useState<boolean | null>(null)

  const toggleNav = () => {
    setNavOpen((current) => {
      if (current !== null) {
        return !current
      }

      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      return !isDesktop
    })
  }

  const closeNavOnMobile = () => {
    if (!window.matchMedia('(min-width: 768px)').matches) {
      setNavOpen(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <AppNav isOpen={navOpen} onToggle={toggleNav} onNavigate={closeNavOnMobile} />
      {navOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-slate-950/35 md:hidden"
          aria-label="Close navigation overlay"
          onClick={() => setNavOpen(false)}
        />
      )}
      <main className="flex-1 px-5 py-4 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}
