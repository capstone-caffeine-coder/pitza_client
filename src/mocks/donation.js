import { http, HttpResponse } from "msw";

const createDonationResponse = {
  id: "createDonationResponse1",
};

const donationHandlers = [
  http.post(
    "https://mockupserver.com/api/donation/request",
    async (req, res, ctx) => {
      return HttpResponse.json(createDonationResponse);
    },
  ),

  http.delete(
    "https://mockupserver.com/api/donation/match/*",
    async (req, res, ctx) => {
      await delay(3000);
      return HttpResponse.json(donationDetail);
    },
  ),
];

export { donationHandlers };
