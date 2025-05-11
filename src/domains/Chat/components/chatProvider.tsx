// context/SocketContext.tsx
import { SocketContext } from "@/src/domains/Chat/hooks/useChatContext";
import { Message, ImageMessage } from "@/src/domains/Chat/types";
import React, { useEffect, useReducer } from "react";
import { io, Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  messages: (Message | ImageMessage)[];
  chatroomId: string;
}

type Action =
  | { type: "CHATLOGS"; payload: Message[] }
  | { type: "CONNECT"; payload: { chatroomId: string } }
  | { type: "DISCONNECT" }
  | { type: "RECEIVE_MESSAGE"; payload: Message }
  | { type: "RECEIVE_IMAGE"; payload: ImageMessage }
  | { type: "SEND_MESSAGE"; payload: Omit<Message, "chatroom_id"> }
  | { type: "SEND_IMAGE"; payload: Omit<ImageMessage, "chatroom_id"> };

// 초기 상태
const initialState: SocketState = {
  socket: null,
  isConnected: false,
  messages: [],
  chatroomId: "",
};

// Reducer 정의
const socketReducer = (state: SocketState, action: Action): SocketState => {
  switch (action.type) {
    case "CONNECT":
      console.log("Socket connected");
      return {
        ...state,
        isConnected: true,
        chatroomId: action.payload.chatroomId,
      };
    case "DISCONNECT":
      return { ...state, isConnected: false, socket: null };
    case "RECEIVE_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "RECEIVE_IMAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { chatroom_id: state.chatroomId, ...action.payload },
        ],
      };
    case "SEND_IMAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { chatroom_id: state.chatroomId, ...action.payload },
        ],
      };
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
      dispatch({ type: "CONNECT", payload: { chatroomId: roomId } });
    });

    socket.on("disconnect", () => {
      dispatch({ type: "DISCONNECT" });
    });

    socket.on("message", (msg: Omit<Message, "chatroom_id">) => {
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload: { ...msg, chatroom_id: state.chatroomId },
      });
    });

    socket.on("image", (msg: Omit<ImageMessage, "chatroom_id">) => {
      dispatch({
        type: "RECEIVE_IMAGE",
        payload: { ...msg, chatroom_id: state.chatroomId },
      });
    });
    return () => {
      socket.emit("close");
      socket.disconnect();
    };
  }, [roomId, state.chatroomId]);

  return (
    <SocketContext.Provider value={{ state, dispatch }}>
      {children}
    </SocketContext.Provider>
  );
};

export type { SocketState, Action };
