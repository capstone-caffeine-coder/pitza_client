// context/SocketContext.tsx
import { SocketContext } from "@/src/domains/Chat/hooks/useChatContext";
import { Message } from "@/src/domains/Chat/types";
import React, { useEffect, useReducer } from "react";
import { io, Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  messages: Message[];
}

type Action =
  | { type: "CHATLOGS"; payload: Message[] }
  | { type: "CONNECT" }
  | { type: "DISCONNECT" }
  | { type: "RECEIVE_MESSAGE"; payload: Message }
  | { type: "SEND_MESSAGE"; payload: Message };

// 초기 상태
const initialState: SocketState = {
  socket: null,
  isConnected: false,
  messages: [],
};

// Reducer 정의
const socketReducer = (state: SocketState, action: Action): SocketState => {
  switch (action.type) {
    case "CONNECT":
      console.log("Socket connected");
      return { ...state, isConnected: true };
    case "DISCONNECT":
      return { ...state, isConnected: false, socket: null };
    case "RECEIVE_MESSAGE":
      console.log("qwqwr", state.messages);
      return { ...state, messages: [...state.messages, action.payload] };
    case "SEND_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    default:
      return state;
  }
};

// SocketProvider 컴포넌트
export const ChatProvider = ({
  children,
  roomId,
}: {
  children: React.ReactNode;
  roomId: string;
}) => {
  const [state, dispatch] = useReducer(socketReducer, initialState);

  useEffect(() => {
    const socket = io(`wss://mockupserver.com`, {
      transports: ["websocket"],
      path: `/chat/${roomId}/socket.io`,
    });

    socket.on("connect", () => {
      console.log("Socket connected");
      dispatch({ type: "CONNECT" });
    });

    socket.on("disconnect", () => {
      dispatch({ type: "DISCONNECT" });
    });

    socket.on("message", (msg: Message) => {
      console.log("Received message:", msg);
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });

    return () => {
      socket.emit("close");
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ state, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};

export type { SocketState, Action };
