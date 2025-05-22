import { http, HttpResponse, ws } from "msw";
import { sendIntervalMessage } from "./utils";
import { chatHandlers, chatList, chatLogs } from "./chat";
import { toSocketIo } from "@mswjs/socket.io-binding";
import { matchHandlers } from "./match";
import { donationHandlers } from "./donation";
import { bloodcardHandlers } from "./bloodcard";

const posts = ["게시글1", "게시글2", "게시글3"];

const bloodDonationCenter = [
  {
    id: 1,
    name: "헌혈카페 청량리점",
    location: {
      latitude: 37.581123,
      longitude: 127.045693,
    },
    tel: "02-969-0522",
    address: "서울 동대문구 왕산로 205",
    center_image_url:
      "https://lh3.googleusercontent.com/p/AF1QipNlbwRFYFYiVVzecKRrN3oB9bWGDMgJVsQYxIZ0=w408-h306-k-no",
  },
  {
    id: 2,
    name: "헌혈의집 회기센터",
    location: {
      latitude: 37.590003,
      longitude: 127.056885,
    },
    tel: "02-969-6199",
    address: "서울 동대문구 회기로 188",
    center_image_url: "",
  },
  {
    id: 3,
    name: "헌혈의집 고려대앞센터",
    location: {
      latitude: 37.585832,
      longitude: 127.029502,
    },
    tel: "029673852",
    address: "서울 성북구 고려대로24길 11",
    center_image_url:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211223_263%2F1640244059308LTmts_PNG%2F002.png",
  },
  {
    id: 4,
    name: "헌혈카페 청량리점",
    location: {
      latitude: 37.581123,
      longitude: 127.045693,
    },
    tel: "02-969-0522",
    address: "서울 동대문구 왕산로 205",
    center_image_url:
      "https://lh3.googleusercontent.com/p/AF1QipNlbwRFYFYiVVzecKRrN3oB9bWGDMgJVsQYxIZ0=w408-h306-k-no",
  },
  {
    id: 5,
    name: "헌혈의집 회기센터",
    location: {
      latitude: 37.590003,
      longitude: 127.056885,
    },
    tel: "02-969-6199",
    address: "서울 동대문구 회기로 188",
    center_image_url:
      "https://lh3.googleusercontent.com/p/AF1QipNlbwRFYFYiVVzecKRrN3oB9bWGDMgJVsQYxIZ0=w408-h306-k-no",
  },
  {
    id: 6,
    name: "헌혈의집 고려대앞센터",
    location: {
      latitude: 37.585832,
      longitude: 127.029502,
    },
    tel: "029673852",
    address: "서울 성북구 고려대로24길 11",
    center_image_url:
      "https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211223_263%2F1640244059308LTmts_PNG%2F002.png",
  },
];

const flow = [
  {
    sender: "receiver001",
    message_type: "text",
    content: "안녕하세요",
    sent_at: "2025-05-05T09:00:00Z",
    is_read: true,
  },
  {
    sender: "receiver001",
    message_type: "text",
    content: "테스트 하겠습니다.",
    sent_at: "2025-05-05T09:00:00Z",
    is_read: true,
  },
  {
    sender: "receiver001",
    message_type: "image",
    content: "https://i.imgur.com/9P3QeGo.png",
    sent_at: "2025-05-05T09:00:00Z",
    is_read: true,
  },
];
let chatFlow = 0;

const chat = ws.link("wss://mockupserver.com/*");

export const handlers = [
  // 포스트 목록
  http.get("https://mockupserver.com/posts", (req, res, ctx) => {
    return HttpResponse.json({
      posts,
    });
  }),

  // 포스트 추가
  http.post("/posts", (req, res, ctx) => {
    posts.push(req.body);
    return HttpResponse.STATUS_CODES_WITHOUT_BODY(201);
  }),

  http.get(
    "https://mockupserver.com/api/bloodDonationCenter",
    (req, res, ctx) => {
      return HttpResponse.json({ bloodDonationCenter: bloodDonationCenter });
    },
  ),

  chat.addEventListener("connection", (connection) => {
    const io = toSocketIo(connection);
    let roomState = { open: true };
    let closeInternalMessage;

    io.client.on("message", (event) => {
      console.log("Received message: 메시지받음", event.data);
      setTimeout(
        () => {
          if (chatFlow < flow.length) {
            if (flow[chatFlow].message_type === "text") {
              io.client.emit("message", flow[chatFlow]);
              console.log("message 보냄");
            } else {
              io.client.emit("image", flow[chatFlow]);
              console.log("image 보냄");
            }
            chatFlow++;
            console.log("chatFlow:", chatFlow);
          }
        },
        1000 + chatFlow * 500,
      );
    });

    io.client.on("image", (event) => {
      console.log("Received message:", event.data);
      setTimeout(
        () => {
          if (chatFlow < flow.length) {
            if (flow[chatFlow].message_type === "text") {
              io.client.emit("message", flow[chatFlow]);
              console.log("message 보냄");
            } else {
              io.client.emit("image", flow[chatFlow]);
              console.log("image 보냄");
            }
            chatFlow++;
            console.log("chatFlow:", chatFlow);
          }
        },
        1000 + chatFlow * 500,
      );
    });

    io.client.on("close", () => {
      console.log("Client disconnected");
      if (closeInternalMessage) {
        console.log("Clearing interval");
        closeInternalMessage();
      }
    });

    // closeInternalMessage = sendIntervalMessage({
    //   roomId: "room1",
    //   sender: "server",
    //   content: "Hello from the server!",
    //   client: io.client,
    //   isRoomOpen: () => roomState.open,
    // });

    console.log("WebSocket connection established");
  }),
  ...chatHandlers,
  ...bloodcardHandlers,
  ...matchHandlers,
  ...donationHandlers,
];
