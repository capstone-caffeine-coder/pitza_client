import { setupServer } from "msw/node";
import { http } from "msw";

export const server = setupServer([
  http.get("https://mockupserver.com/api/bloodDonationCenter", (req, res, ctx) => {
    return HttpResponse.json({ bloodDonationCenter: g });
  }),
]);
