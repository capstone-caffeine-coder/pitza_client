import { http, HttpResponse, ws } from "msw";
import { sendIntervalMessage } from "./utils";
import { chatList, chatLogs } from "./chat";
import { toSocketIo } from "@mswjs/socket.io-binding";

const posts = ["게시글1", "게시글2", "게시글3"];

const donateRequests = [
  {
    id: "1",
    age: 23,
    sex: "MALE",
    bloodType: "A+",
    nickname: "JohnDoe",
    location: "서울특별시 영등포구",
    donationDate: "2024-03-15",
    donationLocation: "영등포 헌혈의집",
    profile_image:
      "https://i.namu.wiki/i/QjnMdzJauau5gigMeDYQ5JtCqFADzHTlygU5dl426dAMrJiLhBD0SARL90ks6YAQdqVqZJXi9Z3LoPjk022ALA.webp",
    createdAt: "2024-04-01T10:00:00Z",
    updatedAt: "2024-04-01T10:00:00Z",
  },
  {
    id: "2",
    age: 27,
    sex: "FEMALE",
    nickname: "민수핑",
    bloodType: "O-",
    location: "부산광역시 해운대구",
    donationDate: "2024-02-20",
    profile_image:
      "https://i.namu.wiki/i/QjnMdzJauau5gigMeDYQ5JtCqFADzHTlygU5dl426dAMrJiLhBD0SARL90ks6YAQdqVqZJXi9Z3LoPjk022ALA.webp",
    donationLocation: "해운대 헌혈의집",
    createdAt: "2024-04-01T10:30:00Z",
    updatedAt: "2024-04-01T10:30:00Z",
  },
  {
    id: "3",
    age: 31,
    sex: "MALE",
    nickname: "배고프다육개장",
    bloodType: "B+",
    location: "대구광역시 수성구",
    donationDate: "2024-01-10",
    profile_image:
      "https://i.namu.wiki/i/QjnMdzJauau5gigMeDYQ5JtCqFADzHTlygU5dl426dAMrJiLhBD0SARL90ks6YAQdqVqZJXi9Z3LoPjk022ALA.webp",
    donationLocation: "수성구 헌혈의집",
    createdAt: "2024-04-01T11:00:00Z",
    updatedAt: "2024-04-01T11:00:00Z",
  },
  {
    id: "4",
    age: 25,
    sex: "FEMALE",
    nickname: "하울의음쥑이는성",
    bloodType: "AB-",
    location: "경기도 성남시 분당구",
    donationDate: "2024-03-05",
    profile_image:
      "https://i.namu.wiki/i/QjnMdzJauau5gigMeDYQ5JtCqFADzHTlygU5dl426dAMrJiLhBD0SARL90ks6YAQdqVqZJXi9Z3LoPjk022ALA.webp",
    donationLocation: "분당 헌혈의집",
    createdAt: "2024-04-01T11:30:00Z",
    updatedAt: "2024-04-01T11:30:00Z",
  },
  {
    id: "5",
    age: 29,
    sex: "MALE",
    nickname: "아귀찮타",
    bloodType: "A-",
    location: "인천광역시 연수구",
    donationDate: "2024-02-28",
    donationLocation: "연수구 헌혈의집",
    createdAt: "2024-04-01T12:00:00Z",
    profile_image:
      "https://i.namu.wiki/i/QjnMdzJauau5gigMeDYQ5JtCqFADzHTlygU5dl426dAMrJiLhBD0SARL90ks6YAQdqVqZJXi9Z3LoPjk022ALA.webp",
    updatedAt: "2024-04-01T12:00:00Z",
  },
];

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

const bloodcardDonateDetail = {
  id: "1",
  nickname: "JohnDoe",
  donationDate: "2024-03-15",
  donationLocation: "서울특별시 영등포구",
  profile_image:
    "https://i.namu.wiki/i/QjnMdzJauau5gigMeDYQ5JtCqFADzHTlygU5dl426dAMrJiLhBD0SARL90ks6YAQdqVqZJXi9Z3LoPjk022ALA.webp",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMVDiK_2Mg9t_cJr2y-adBdGLNuXiwSPTLQ&s",
  introduce:
    "헌혈은 생명을 살리는 소중한 기부입니다. 당신의 작은 헌혈이 큰 변화를 만듭니다.",
  createdAt: "2024-04-01T10:00:00Z",
  updatedAt: "2024-04-01T10:00:00Z",
};

const bloodcardRequestDetail = {
  id: "1",
  age: 23,
  sex: "MALE",
  bloodType: "A+",
  nickname: "JohnDoe",
  location: "서울특별시",
  donationDate: "2024-03-15",
  donationLocation: "영등포 헌혈의집",
  profile_image:
    "https://i.namu.wiki/i/QjnMdzJauau5gigMeDYQ5JtCqFADzHTlygU5dl426dAMrJiLhBD0SARL90ks6YAQdqVqZJXi9Z3LoPjk022ALA.webp",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMVDiK_2Mg9t_cJr2y-adBdGLNuXiwSPTLQ&s",
  story:
    "헌혈은 생명을 살리는 소중한 기부입니다. 당신의 작은 헌혈이 큰 변화를 만듭니다.",
  createdAt: "2024-04-01T10:00:00Z",
  updatedAt: "2024-04-01T10:00:00Z",
};

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
    "https://mockupserver.com/api/bloodCard/requests/recent",
    (req, res, ctx) => {
      return HttpResponse.json({ recentBloodCard: donateRequests });
    },
  ),

  http.get(
    "https://mockupserver.com/api/bloodCard/requests",
    (req, res, ctx) => {
      return HttpResponse.json({ bloodCardRequests: donateRequests });
    },
  ),
  http.get(
    "https://mockupserver.com/api/bloodCard/donates",
    (req, res, ctx) => {
      return HttpResponse.json({ bloodCardDonates: donateRequests });
    },
  ),
  http.get(
    "https://mockupserver.com/api/bloodDonationCenter",
    (req, res, ctx) => {
      return HttpResponse.json({ bloodDonationCenter: bloodDonationCenter });
    },
  ),
  http.get(
    "https://mockupserver.com/api/bloodcard/donations/detail/*",
    (req, res, ctx) => {
      return HttpResponse.json({ bloodcardDonateDetail });
    },
  ),
  http.get(
    "https://mockupserver.com/api/bloodcard/requests/detail/*",
    (req, res, ctx) => {
      return HttpResponse.json({ bloodcardRequestDetail });
    },
  ),
  http.get(
    "https://mockupserver.com/api/bloodcard/requests/detail/*",
    (req, res, ctx) => {
      return HttpResponse.json({ bloodcardRequestDetail });
    },
  ),

  http.get("https://mockupserver.com/api/chats", (req, res, ctx) => {
    return HttpResponse.json(chatList);
  }),

  http.get("https://mockupserver.com/api/chat/rooms/*", (req, res, ctx) => {
    return HttpResponse.json(chatLogs);
  }),

  chat.addEventListener("connection", (connection) => {
    const io = toSocketIo(connection);
    let roomState = { open: true };
    let closeInternalMessage;

    io.client.on("message", (event) => {
      console.log("Received message:", event.data);
    });

    io.client.on("close", () => {
      console.log("Client disconnected");
      if (closeInternalMessage) {
        console.log("Clearing interval");
        closeInternalMessage();
      }
    });

    closeInternalMessage = sendIntervalMessage({
      roomId: "room1",
      sender: "server",
      message: "Hello from the server!",
      client: io.client,
      isRoomOpen: () => roomState.open,
    });

    console.log("WebSocket connection established");
  }),
];
