type ChatRoom = {
  id: number;
  chatroom_id: string;
  last_message: string;
  partner: {
    id: string;
    name: string;
    profileImage: string;
  };
};

type Message = {
  messageType: "text";
  message: string;
  timestamp: string;
  userId: number;
  is_read: boolean;
};
type Messages = {
  sender: string;
  message: string;
  timestamp: string;
  message_type: "text" | "image";
  image_url: string | null;
  is_read: boolean;
};

type ImageMessage = {
  message_type: "image";
  sender: string;
  message: string;
  timestamp: string;
  image_url: string;
  is_read: boolean;
};

type SendMessagePayload = {
  sender: string;
  roomId: string;
  message: string;
  message_type: "text" | "image";
  image_url: string | null;
  is_read: boolean;
};

export type ChatLogs = {
  room_id: string;
  messages: Message[];
};

export type { ChatRoom, Message, ImageMessage, SendMessagePayload, Messages };
