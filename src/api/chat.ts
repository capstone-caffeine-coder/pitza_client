import { apiInstance } from "@/src/api";

interface CreateChatRoomResponse {
  chatroom_id: string;
  parter: string;
  created_at: string;
}
interface CreateChatRoomRequest {
  post_id: string;
  receiver_id: string;
}
const createChatRoom = async (
  createChatRoomRequest: CreateChatRoomRequest,
): Promise<CreateChatRoomResponse> => {
  const { data } = await apiInstance.post<CreateChatRoomResponse>(
    "/chat/rooms",
    createChatRoomRequest,
  );
  return data;
};

export { createChatRoom };
