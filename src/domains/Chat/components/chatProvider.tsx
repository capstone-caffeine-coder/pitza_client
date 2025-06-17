import { SocketContext } from "@/src/domains/Chat/hooks/useChatContext";
import { SendMessagePayload, Messages } from "@/src/domains/Chat/types";
import { useAuthStore } from "@/src/store/authStore";
import { getCookie } from "@/src/utils";
import React, { useEffect, useReducer, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface SocketState {
  isConnected: boolean;
  messages: Array<Messages | SendMessagePayload>;
  chatroomId?: number;
}

type Action =
  | { type: "CHATLOGS"; payload: Array<Messages | SendMessagePayload> }
  | { type: "CONNECT"; payload: number }
  | { type: "DISCONNECT" }
  | { type: "RECEIVE_MESSAGE"; payload: Messages }
  | { type: "SEND_MESSAGE"; payload: SendMessagePayload }
  | { type: "SEND_IMAGE"; payload: SendMessagePayload };

// 초기 상태
const initialState: SocketState = {
  isConnected: false,
  messages: [],
};

// Reducer 정의
const socketReducer = (state: SocketState, action: Action): SocketState => {
  switch (action.type) {
    case "CONNECT":
      return {
        ...state,
        isConnected: true,
      };
    case "DISCONNECT":
      return { ...state, isConnected: false };
    case "SEND_MESSAGE":
    case "SEND_IMAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
};

export const ChatProvider = ({
  messages = [],
  children,
  roomId,
}: {
  messages?: Array<Messages | SendMessagePayload>;
  children: React.ReactNode;
  roomId: number;
}) => {
  const [state, dispatch] = useReducer(socketReducer, {
    ...initialState,
    messages: messages,
    chatroomId: roomId,
  });
  const socketRef = useRef<Socket | null>(null);
  const userNickname = useAuthStore((state) => state.nickname);

  useEffect(() => {
    const socket = io(`ws://localhost:3000`, {
      transports: ["websocket"],
      auth: {
        session_key: getCookie("sessionid"),
      },
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected");
      socket.emit("join", roomId);
      dispatch({ type: "CONNECT", payload: roomId });
    });

    socket.on("disconnect", () => {
      dispatch({ type: "DISCONNECT" });
    });

    socket.on("chat message", (msg: Messages) => {
      dispatch({
        type: "RECEIVE_MESSAGE",
        payload: msg,
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
    (payload: Pick<SendMessagePayload, "message">) => {
      const msg: SendMessagePayload = {
        ...payload,
        room_id: roomId,
        message_type: "text",
        sender: userNickname,
        image_url: null,
        is_read: true,
      };
      socketRef.current?.emit("text", msg);
      dispatch({
        type: "SEND_MESSAGE",
        payload: { ...msg, message_type: "text", sender: userNickname },
      });
    },
    [roomId],
  );

  const sendImage = useCallback(
    (payload: Pick<SendMessagePayload, "image_url">) => {
      const msg: SendMessagePayload = {
        ...payload,
        room_id: roomId,
        message_type: "image",
        sender: userNickname,
        message: "",
        is_read: true,
      };
      socketRef.current?.emit("image", msg);
      dispatch({
        type: "SEND_IMAGE",
        payload: msg,
      });
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
