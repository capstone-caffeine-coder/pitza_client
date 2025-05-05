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

type BloodcardDonateDetail = {
  bloodcardDonateDetail: BloodcardDonate;
};

async function getBloodCardDonateDetail(id: string): Promise<BloodcardDonate> {
  const {
    data: { bloodcardDonateDetail },
  } = await apiInstance.get<BloodcardDonateDetail>(
    `/bloodcard/donations/detail/${id}`,
  );
  return bloodcardDonateDetail;
}

type BloodcardRequestDetail = {
  bloodcardRequestDetail: BloodcardRequest;
};
async function getBloodCardRequestDetail(
  id: string,
): Promise<BloodcardRequest> {
  const {
    data: { bloodcardRequestDetail },
  } = await apiInstance.get<BloodcardRequestDetail>(
    `/bloodcard/requests/detail/${id}`,
  );
  console.log(bloodcardRequestDetail);
  return bloodcardRequestDetail;
}

export {
  getRecentBloodCard,
  getBloodCardRequests,
  getBloodCardDonates,
  getBloodCardDonateDetail,
  getBloodCardRequestDetail,
};
