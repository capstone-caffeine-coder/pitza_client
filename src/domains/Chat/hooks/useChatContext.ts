import {
  Action,
  SocketState,
} from "@/src/domains/Chat/components/chatProvider";
import { createContext, useContext } from "react";

const SocketContext = createContext<
  { state: SocketState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);
const useChatContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
export { SocketContext, useChatContext };
