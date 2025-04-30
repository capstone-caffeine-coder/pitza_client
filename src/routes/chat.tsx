import authGuard from "@/src/components/wrapper/AuthGuard";
import { createFileRoute } from "@tanstack/react-router";

const ProtectedChat = authGuard(RouteComponent);
export const Route = createFileRoute("/chat")({
  component: ProtectedChat,
});

function RouteComponent() {
  return <div>Hello "/chat"!</div>;
}
