import { SocketContext } from "@/src/domains/Chat/hooks/useChatContext";
import { Message, ImageMessage } from "@/src/domains/Chat/types";
import React, { useEffect, useReducer, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface SocketState {
  isConnected: boolean;
  messages: (Message | ImageMessage)[];
  chatroomId: string;
}

type Action =
  | { type: "CHATLOGS"; payload: Message[] }
  | { type: "CONNECT"; payload: string }
  | { type: "DISCONNECT" }
  | { type: "RECEIVE_MESSAGE"; payload: Message }
  | { type: "RECEIVE_IMAGE"; payload: ImageMessage }
  | { type: "SEND_MESSAGE"; payload: Message }
  | { type: "SEND_IMAGE"; payload: ImageMessage };

// 초기 상태
const initialState: SocketState = {
  isConnected: false,
  messages: [],
  chatroomId: "",
};

// Reducer 정의
const socketReducer = (state: SocketState, action: Action): SocketState => {
  switch (action.type) {
    case "CONNECT":
      return {
        ...state,
        isConnected: true,
        chatroomId: action.payload,
      };
    case "DISCONNECT":
      return { ...state, isConnected: false };
    case "RECEIVE_MESSAGE":
    case "RECEIVE_IMAGE":
    case "SEND_MESSAGE":
    case "SEND_IMAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export const ChatProvider = ({
  children,
  roomId,
}: {
  children: React.ReactNode;
  roomId: string;
}) => {
  const [state, dispatch] = useReducer(socketReducer, initialState);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(`wss://mockupserver.com`, {
      transports: ["websocket"],
      path: `/chat/${roomId}/socket.io`,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected");
      dispatch({ type: "CONNECT", payload: roomId });
    });

    socket.on("disconnect", () => {
      dispatch({ type: "DISCONNECT" });
    });

    socket.on("message", (msg: Omit<Message, "chatroom_id">) => {
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload: {
          ...msg,
          chatroom_id: roomId,
          message_type: "text",
        },
      });
    });

    socket.on("image", (msg: Omit<ImageMessage, "chatroom_id">) => {
      dispatch({
        type: "RECEIVE_IMAGE",
        payload: {
          ...msg,
          chatroom_id: roomId,
          message_type: "image",
        },
      });
    });

    return () => {
      socket.emit("close");
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId]);

  // 메시지 전송 핸들러: socket.emit 분리
  const sendMessage = useCallback(
    (payload: Omit<Message, "chatroom_id">) => {
      const msg: Message = { ...payload, chatroom_id: roomId };
      socketRef.current?.emit("message", payload);
      dispatch({ type: "SEND_MESSAGE", payload: msg });
    },
    [roomId],
  );

  const sendImage = useCallback(
    (payload: Omit<ImageMessage, "chatroom_id">) => {
      const msg: ImageMessage = { ...payload, chatroom_id: roomId };
      socketRef.current?.emit("image", payload);
      dispatch({ type: "SEND_IMAGE", payload: msg });
    },
    [roomId],
  );

  return (
    <SocketContext.Provider
      value={{
        state,
        dispatch,
        sendMessage,
        sendImage,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export type { SocketState, Action };
