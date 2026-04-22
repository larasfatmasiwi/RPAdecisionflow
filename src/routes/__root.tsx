import { HeadContent, Scripts, createRootRoute, Outlet } from '@tanstack/react-router'
import { AppNav } from '@/components/AppNav'
import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Blended Finance Strategic Scorecard' },
    ],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootDocument({ children }: { children: React.ReactNode }) {
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
  return (
    <div className="min-h-screen flex">
      <AppNav />
      <main className="flex-1 px-5 py-4 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  )
}
