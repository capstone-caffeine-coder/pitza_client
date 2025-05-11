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
  message_type: "text";
  chatroom_id: string;
  sender: string;
  content: string;
  sent_at: string;
};

type ImageMessage = {
  message_type: "image";
  chatroom_id: string;
  sender: string;
  content: string;
};

export type ChatLogs = {
  room_id: string;
  messages: Message[];
};

export type { ChatRoom, Message, ImageMessage };
