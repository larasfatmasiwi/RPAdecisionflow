import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/decision-flow')({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/decision-flow') {
      throw redirect({ to: '/decision-flow/step-1' })
    }
  },
  component: DecisionFlowLayout,
})

function DecisionFlowLayout() {
  return <Outlet />
}
