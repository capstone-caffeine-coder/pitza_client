import { delay, http, HttpResponse } from "msw";

const chatList = [
  {
    id: 1,
    roomId: "room1",
    lastMessage: "안녕하세요",
    partner: {
      id: 1,
      name: "랄프가 좋아",
      profileImage:
        "https://pbs.twimg.com/profile_images/724274707365679104/-Txh7FKV_400x400.jpg",
    },
  },
  {
    id: 2,
    roomId: "room1",
    lastMessage: "감사합니다",
    partner: {
      id: "qwrqwrqwrqwr",
      name: "밭으",
      profileImage:
        "https://pbs.twimg.com/profile_images/724274707365679104/-Txh7FKV_400x400.jpg",
    },
  },
  {
    id: 3,
    roomId: "room1",
    lastMessage: "좋은 하루 되세요",
    partner: {
      id: "qr1451qwfqwf",
      name: "편돌이의 꿈",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvjrAr3yw06tj6Ev54sBOyQuTkRtLSR7wQXA&s",
    },
  },
  {
    id: 4,
    roomId: "room1",
    lastMessage: "여기로 보내주시면 돼요",
    partner: {
      id: "357y8joeg",
      name: "미치광이 과학자",
      profileImage:
        "https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2021%2F06%2Fadult-swim-reveals-rick-and-morty-avatar-maker-01.jpg?q=75&w=800&cbr=1&fit=max",
    },
  },
];

const chatLogs = {
  room_id: "blood_donation_room1",
  messages: [
    {
      sender: "donor001",
      message_type: "text",
      content: "안녕하세요",
      sent_at: "2025-05-05T09:00:00Z",
      is_read: true,
    },
    // {
    //   sender: "recipient001",
    //   message_type: "text",
    //   content: "안녕하세요! 정말 감사합니다. 필요한 헌혈증 개수는 2장입니다.",
    //   sent_at: "2025-05-05T09:01:30Z",
    //   is_read: true,
    // },
    // {
    //   sender: "donor001",
    //   message_type: "text",
    //   content: "지금 바로 2장 보내드릴 수 있어요. 어디로 보내면 될까요?",
    //   sent_at: "2025-05-05T09:03:00Z",
    //   is_read: true,
    // },
    // {
    //   sender: "recipient001",
    //   message_type: "text",
    //   content: "서울 ○○병원 혈액관리본부로 보내주시면 됩니다. 수고 많으세요!",
    //   sent_at: "2025-05-05T09:04:30Z",
    //   is_read: false,
    // },
    // {
    //   sender: "donor001",
    //   message_type: "text",
    //   content: "네, 지금 우편 발송하겠습니다. 빠른 회복 기원할게요.",
    //   sent_at: "2025-05-05T09:06:00Z",
    //   is_read: false,
    // },
  ],
};

const chatHandlers = [
  http.post(
    "https://mockupserver.com/api/chat/rooms",
    async (req, res, ctx) => {
      await delay(1000);
      return HttpResponse.json({
        chatroom_id: "room1",
        partner: "recipient001",
        created_at: new Date().toISOString(),
      });
    },
  ),
  http.get("https://mockupserver.com/api/chats", async (req, res, ctx) => {
    await delay(1000);
    return HttpResponse.json(chatList);
  }),

  http.get(
    "https://mockupserver.com/api/chat/rooms/*",
    async (req, res, ctx) => {
      await delay(1000);
      return HttpResponse.json(chatLogs);
    },
  ),
];

export { chatList, chatLogs, chatHandlers };
