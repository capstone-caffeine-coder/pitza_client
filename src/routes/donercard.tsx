import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/donercard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/donercard"!</div>
}
