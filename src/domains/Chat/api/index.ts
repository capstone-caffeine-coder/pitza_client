import { apiInstance, apiServerInstance } from "@/src/api";
import { ChatLogs, ChatRoom } from "@/src/domains/Chat/types";

async function getChats(): Promise<ChatRoom[]> {
  const { data } = await apiServerInstance.get<ChatRoom[]>("/chat/rooms/list");
  return data;
}

async function getChatLogs(roomId: string): Promise<ChatLogs> {
  const { data } = await apiServerInstance.get<ChatLogs>(
    `chat/rooms/${roomId}`,
  );
  return data;
}

interface ReportUserRequest {
  chatroom_id: string;
  message_id: number;
  reason: string;
  description: string;
}
async function reportChatUser(reportData: ReportUserRequest) {
  const { data } = await apiServerInstance.post(
    `/chat/rooms/${reportData.chatroom_id}/reports`,
    {
      message_id: [reportData.message_id],
      reason: reportData.reason,
      description: reportData.description,
    },
  );
  return data;
}

export { getChats, getChatLogs, reportChatUser };
