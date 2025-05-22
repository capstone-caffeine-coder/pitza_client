import { delay, http, HttpResponse } from "msw";

const matchResponse = {
  id: "124412",
};

const donationDetail = {
  id: "1",
  age: 23,
  sex: "MALE",
  bloodType: "A+",
  nickname: "테스트",
  location: "서울특별시",
  donationDueDate: "2024-05-24",
  image: "https://i.imgur.com/9P3QeGo.png",
  story: `안녕하세요. 가족 중 한 명이 급하게 수혈이 필요한 상황이 되어 이렇게 도움을 요청드립니다.
현재 성모병원에 입원 중인 전성모 환자는 지병으로 인해 수혈이 꾸준히 필요한 상태이며, 병원 내 혈액이 부족해 지정헌혈이 절실한 상황입니다.\n\n

헌혈해주신 소중한 피는 환자에게 큰 희망이 됩니다.
가능하신 분이 계시다면 작은 나눔 부탁드립니다.\n\n

감사합니다.
`,
  donationId: "qwrqwr",
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
