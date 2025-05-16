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

interface ReportUserRequest {
  chatroom_id: string;
  reason: string;
}
async function reportChatUser(reportData: ReportUserRequest) {
  const { data } = await apiInstance.post(
    `/chat/rooms/${reportData.chatroom_id}/reports`,
  );
  return data;
}

export { getChats, getChatLogs, reportChatUser };
