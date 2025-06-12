import { apiServerInstance } from "@/src/api";
import { REGIONS } from "@/src/constants/form";
import {
  BloodCard,
  BloodcardDonate,
  BloodcardRequest,
} from "@/src/domains/BloodCard/types";
import { createFormData } from "@/src/utils/formdata";

async function getRecentBloodCard(): Promise<BloodCard[]> {
  const { data } = await apiServerInstance.get<BloodCard[]>(
    "/donation-cards/donate",
  );
  return data;
}

//헌혈증 요청
async function getBloodCardRequests(): Promise<BloodcardRequest[]> {
  const { data } = await apiServerInstance.get<BloodcardRequest[]>(
    `/donation-cards/request/`,
  );
  return data;
}

//헌혈증 기부 목록
async function getBloodCardDonates(): Promise<BloodCard[]> {
  const { data } = await apiServerInstance.get<BloodCard[]>(
    `/donation-cards/donate/`,
  );
  return data;
}

async function getBloodCardDonateDetail(id: string): Promise<BloodcardDonate> {
  const { data } = await apiServerInstance.get<BloodcardDonate>(
    `/donation-cards/donate/${id}/`,
  );
  return data;
}

async function getBloodCardRequestDetail(
  id: string,
): Promise<BloodcardRequest> {
  const { data } = await apiServerInstance.get<BloodcardRequest>(
    `/donation-cards/request/${id}/`,
  );
  return data;
}

async function createBloodCardDonate(formData: {
  blood_type: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  age: number;
  gender: "M" | "F";
  region: string;
  introduction: string;
  image?: File;
}) {
  const formDataWithImage = createFormData(formData);
  const { data } = await apiServerInstance.post<BloodCard>(
    `/donation-cards/donate/create/`,
    formDataWithImage,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
}

type CreateDonationRequest = {
  blood_type: "A+" | "A-" | "B+" | "B-" | "O+" | "O-" | "AB+" | "AB-";
  region: (typeof REGIONS)[number];
  reason: string;
  image?: File;
};

async function createBloodCardRequest(formData: CreateDonationRequest) {
  const formDataWithImage = createFormData(formData);
  const { data } = await apiServerInstance.post<BloodcardRequest>(
    `/donation-cards/request/create/`,
    formDataWithImage,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
}

export {
  getRecentBloodCard,
  getBloodCardRequests,
  getBloodCardDonates,
  getBloodCardDonateDetail,
  getBloodCardRequestDetail,
  createBloodCardDonate,
  createBloodCardRequest,
};

export type { CreateDonationRequest };
