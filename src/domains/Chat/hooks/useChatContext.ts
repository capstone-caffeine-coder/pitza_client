import {
  Action,
  SocketState,
} from "@/src/domains/Chat/components/chatProvider";
import { ImageMessage, Message } from "@/src/domains/Chat/types";
import { createContext, useContext } from "react";
const SocketContext = createContext<
  | {
      state: SocketState;
      dispatch: React.Dispatch<Action>;
      sendMessage: (message: Omit<Message, "chatroom_id">) => void;
      sendImage: (image: Omit<ImageMessage, "chatroom_id">) => void;
    }
  | undefined
>(undefined);
const useChatContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
export { SocketContext, useChatContext };
