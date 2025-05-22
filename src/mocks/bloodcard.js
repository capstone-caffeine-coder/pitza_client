import { delay, http, HttpResponse } from "msw";

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

const bloodcardHandlers = [
  http.get(
    "https://mockupserver.com/api/bloodcard/donations/detail/*",
    (req, res, ctx) => {
      return HttpResponse.json(bloodcardDonateDetail);
    },
  ),
  http.get(
    "https://mockupserver.com/api/bloodcard/requests/detail/*",
    (req, res, ctx) => {
      return HttpResponse.json(bloodcardRequestDetail);
    },
  ),
  http.get(
    "https://mockupserver.com/api/bloodCard/requests/recent",
    async (req, res, ctx) => {
      await delay(1000);
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

  http.delete("https://mockupserver.com/api/bloodcard/requests/*", () => {
    return HttpResponse.json({ message: "삭제되었습니다." });
  }),

  http.delete("https://mockupserver.com/api/bloodcard/donations/*", () => {
    return HttpResponse.json({ message: "삭제되었습니다." });
  }),
];

export { bloodcardHandlers };
