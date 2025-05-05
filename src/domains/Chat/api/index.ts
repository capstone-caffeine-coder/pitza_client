import { apiInstance } from "@/src/api";
import { ChatLogs, ChatRoom } from "@/src/domains/Chat/types";

async function getChats(): Promise<ChatRoom[]> {
  const { data } = await apiInstance.get<ChatRoom[]>("/chats");
  return data;
}

async function getChatLogs(roomId: string): Promise<ChatLogs> {
  const { data } = await apiInstance.get<ChatLogs>(`chat/rooms/${roomId}`);
  return data;
}

export { getChats, getChatLogs };
