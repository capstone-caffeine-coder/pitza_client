// import authGuard from "@/src/components/wrapper/AuthGuard";
import Header from "@/src/components/common/header";
import ChatList from "@/src/domains/Chat/components/chatList";
import { createFileRoute } from "@tanstack/react-router";
import React from "react";

// const ProtectedChat = authGuard(RouteComponent);
export const Route = createFileRoute("/chat/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <React.Fragment>
      <Header title="채팅" />
      <ChatList />
    </React.Fragment>
  );
}
