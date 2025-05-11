import { Button } from "@/src/components/common/button";
import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { SpinnerModal } from "@/src/components/common/spinner";
import { getChatLogs } from "@/src/domains/Chat/api";
import ChatInput from "@/src/domains/Chat/components/chatInput";
import ChatLogs from "@/src/domains/Chat/components/chatLogs";
import { ChatProvider } from "@/src/domains/Chat/components/chatProvider";
import ReportModal from "@/src/domains/Chat/components/reportModal";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import { GoReport } from "react-icons/go";

export const Route = createFileRoute("/chat/rooms/$roomId")({
  loader: async ({ params: { roomId } }) => getChatLogs(roomId),
  pendingComponent: SpinnerModal,
  component: RouteComponent,
  errorComponent: ErrorComponent,
});

function RouteComponent() {
  const routeApi = getRouteApi("/chat/rooms/$roomId");
  const { messages, room_id } = routeApi.useLoaderData();
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="relative h-full w-full">
        <Header
          title="채팅"
          className="absolute left-0 top-0 w-full bg-white p-4 text-center"
        >
          <div className="absolute right-0 top-0 flex h-full items-center p-4">
            <Button
              variant={"none"}
              type="button"
              onClick={() => setModal(true)}
            >
              <GoReport size={20} />
            </Button>
          </div>
        </Header>
        <ChatProvider roomId={room_id}>
          <ChatLogs messages={messages} />
          <ChatInput />
        </ChatProvider>
      </div>
      <ReportModal visible={modal} toggle={() => setModal((prev) => !prev)} />
    </>
  );
}
