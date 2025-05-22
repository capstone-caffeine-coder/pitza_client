import { delay, http, HttpResponse } from "msw";

const createDonationResponse = {
  id: "ugii64k7uhuyvt53mkk4",
};

const donationHandlers = [
  http.post(
    "https://mockupserver.com/api/donation/request",
    async (req, res, ctx) => {
      await delay(1000);
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
