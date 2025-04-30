import { apiInstance } from "@/src/api";
import { BloodCard, BloodDonerCard } from "@/src/domains/BloodCard/types";

type RecentBloodCard = {
  recentBloodCard: BloodCard[];
};
async function getRecentBloodCard(): Promise<BloodCard[]> {
  const { data } = await apiInstance.get<RecentBloodCard>(
    "/bloodCard/requests/recent",
  );
  return data.recentBloodCard;
}

type BloodCardRequests = {
  bloodCardRequests: BloodCard[];
};
async function getBloodCardRequests(): Promise<BloodCard[]> {
  const { data } =
    await apiInstance.get<BloodCardRequests>(`/bloodCard/requests`);
  return data.bloodCardRequests;
}

type BloodCardDonates = {
  bloodCardDonates: BloodDonerCard[];
};
async function getBloodCardDonates(): Promise<BloodDonerCard[]> {
  const { data } =
    await apiInstance.get<BloodCardDonates>(`/bloodCard/donates`);
  return data.bloodCardDonates;
}

export { getRecentBloodCard, getBloodCardRequests, getBloodCardDonates };
