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
  reason: string;
}
async function reportChatUser(reportData: ReportUserRequest) {
  // const { data } = await apiInstance.post(
  //   `/chat/rooms/${reportData.chatroom_id}/reports`,
  // );
  // return data;
  const r = await delay();
  return r;
}
function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
}
export { getChats, getChatLogs, reportChatUser };
