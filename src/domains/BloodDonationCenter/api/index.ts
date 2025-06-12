import { apiServerInstance } from "@/src/api";
import { BloodDonationCenter } from "@/src/domains/BloodDonationCenter/types";

async function getBloodDonationCenters({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const { data } = await apiServerInstance.get<{
    centers: BloodDonationCenter[];
    count: number;
  }>(`/services/blood-centers-nearby/?lon=${longitude}&lat=${latitude}`);
  return data.centers;
}

export { getBloodDonationCenters };
