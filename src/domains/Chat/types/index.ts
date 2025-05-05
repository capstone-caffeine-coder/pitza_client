type ChatRoom = {
  id: number;
  roomId: string;
  lastMessage: string;
  partner: {
    id: string;
    name: string;
    profileImage: string;
  };
};

type Message = {
  type: "message";
  chatroom_id: string;
  sender: string;
  message: string;
  sent_at: string;
};

export type ChatLogs = {
  room_id: string;
  messages: Message[];
};

export type { ChatRoom, Message };
