import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
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
export const server = setupServer(
  http.get("https://mockupserver.com/api/bloodDonationCenter", () => {
    return HttpResponse.json({ bloodDonationCenter });
  }),
);
