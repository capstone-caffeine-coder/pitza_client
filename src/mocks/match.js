import { delay, http, HttpResponse } from "msw";

const matchResponse = {
  id: "124412",
};

const donationDetail = {
  id: "1",
  age: 23,
  sex: "MALE",
  bloodType: "A+",
  nickname: "민수네 겨울방학",
  location: "서울특별시",
  donationDueDate: "2024-03-15",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlMVDiK_2Mg9t_cJr2y-adBdGLNuXiwSPTLQ&s",
  story:
    "헌혈은 생명을 살리는 소중한 기부입니다. 당신의 작은 헌혈이 큰 변화를 만듭니다.",
  createdAt: "2024-04-01T10:00:00Z",
};

const matchHandlers = [
  http.post(
    "https://mockupserver.com/api/donation/match",
    async (req, res, ctx) => {
      await delay(3000);
      return HttpResponse.json(matchResponse);
    },
  ),

  http.get(
    "https://mockupserver.com/api/donation/match/*",
    async (req, res, ctx) => {
      await delay(3000);
      return HttpResponse.json(donationDetail);
    },
  ),
];

export { matchResponse, donationDetail, matchHandlers };
