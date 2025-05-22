import { apiInstance } from "@/src/api";
import { CreateDonation, MatchRequest } from "@/src/domains/BloodDonate/types";
import { BloodType, Gender } from "@/src/types/donationInfo";

type BloodDontationMatchResponse = {
  id: string;
};
const bloodDontationMatch = async (
  formData: MatchRequest,
): Promise<BloodDontationMatchResponse> => {
  const { data } = await apiInstance.post<BloodDontationMatchResponse>(
    "/donation/match",
    formData,
  );
  return data;
};

interface BloodDonationMatchDetail {
  bloodType: BloodType;
  nickname: string;
  age: number;
  sex: Gender;
  id: string;
  location: string;
  donationDueDate: string;
  story: string;
  image: string;
  createdAt: string;
  donationId: string;
}
const getBloodDonationDetail = async (
  donationId: string,
): Promise<BloodDonationMatchDetail> => {
  const { data } = await apiInstance.get<BloodDonationMatchDetail>(
    `/donation/match/${donationId}`,
  );
  return data;
};

type CreateDonationResponse = {
  id: string;
};
const createBloodDonationRequest = async (formData: CreateDonation) => {
  const { data } = await apiInstance.post<CreateDonationResponse>(
    "/donation/request",
    formData,
  );
  return data;
};

export {
  bloodDontationMatch,
  getBloodDonationDetail,
  createBloodDonationRequest,
};
