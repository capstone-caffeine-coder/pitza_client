import { apiInstance } from "@/src/api";
import { BloodDonationCenter } from "@/src/domains/BloodDonationCenter/types";

type GetBloodDonationCentersResponse = {
  bloodDonationCenter: BloodDonationCenter[];
};
async function getBloodDonationCenters({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const { data } = await apiInstance.get<GetBloodDonationCentersResponse>(
    `/BloodDonationCenter?longitude=${longitude}&latitude=${latitude}`,
  );
  return data.bloodDonationCenter;
}

export { getBloodDonationCenters };
