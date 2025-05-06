import { apiInstance } from "@/src/api";
import {
  BloodCard,
  BloodcardDonate,
  BloodcardRequest,
  BloodDonerCard,
} from "@/src/domains/BloodCard/types";

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

async function getBloodCardDonateDetail(id: string): Promise<BloodcardDonate> {
  const { data } = await apiInstance.get<BloodcardDonate>(
    `/bloodcard/donations/detail/${id}`,
  );
  return data;
}

async function getBloodCardRequestDetail(
  id: string,
): Promise<BloodcardRequest> {
  const { data } = await apiInstance.get<BloodcardRequest>(
    `/bloodcard/requests/detail/${id}`,
  );
  return data;
}

export {
  getRecentBloodCard,
  getBloodCardRequests,
  getBloodCardDonates,
  getBloodCardDonateDetail,
  getBloodCardRequestDetail,
};
