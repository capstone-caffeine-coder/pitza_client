import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { SpinnerModal } from "@/src/components/common/spinner";
import { getChatLogs } from "@/src/domains/Chat/api";
import ChatInput from "@/src/domains/Chat/components/chatInput";
import ChatLogs from "@/src/domains/Chat/components/chatLogs";
import { ChatProvider } from "@/src/domains/Chat/components/chatProvider";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/rooms/$roomId")({
  loader: async ({ params: { roomId } }) => getChatLogs(roomId),
  pendingComponent: SpinnerModal,
  component: RouteComponent,
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  const routeApi = getRouteApi("/chat/rooms/$roomId");
  const { messages, room_id } = routeApi.useLoaderData();

  return (
    <div className="relative h-full w-full">
      <Header
        title="채팅"
        className="absolute left-0 top-0 w-full bg-white p-4 text-center"
      />
      <ChatProvider roomId={room_id}>
        <ChatLogs messages={messages} />
        <ChatInput />
      </ChatProvider>
    </div>
  );
}
