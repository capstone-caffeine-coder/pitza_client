import { apiServerInstance } from "@/src/api";
import { CreateDonation, MatchRequest } from "@/src/domains/BloodDonate/types";
import { BloodType, Gender } from "@/src/types/donationInfo";
import { createFormData } from "@/src/utils/formdata";

type BloodDontationMatchResponse = {
  id: string;
};
const bloodDontationMatch = async (
  formData: MatchRequest,
): Promise<BloodDontationMatchResponse> => {
  const formDataWithDate = createFormData(formData);
  const { data } = await apiServerInstance.post<BloodDontationMatchResponse>(
    "/donations/match/",
    formDataWithDate,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

interface BloodDonationMatchDetail {
  id: number;
  requester: number;
  name: string;
  age: number;
  sex: Gender;
  blood_type: BloodType;
  content: string;
  image?: string;
  location: string;
  donation_due_date: string;
  donator_registered_id: string;
  created_at: string;
  image_url: string;
}
const getBloodDonationDetail = async (
  donationId: string,
): Promise<BloodDonationMatchDetail> => {
  const { data } = await apiServerInstance.get<BloodDonationMatchDetail>(
    `/donations/${donationId}/`,
  );
  return data;
};

type CreateDonationResponse = {
  id: string;
};
const createBloodDonationRequest = async (formData: CreateDonation) => {
  const formDataWithImage = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined) {
      if (key === "image") {
        formDataWithImage.append(key, value);
      } else if (key === "donation_due_date") {
        // 날짜는 YYYY-MM-DD 형식으로 변환하여 추가
        const date = new Date(value);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        formDataWithImage.append(key, `${yyyy}-${mm}-${dd}`);
      } else {
        formDataWithImage.append(key, String(value));
      }
    }
  });
  const { data } = await apiServerInstance.post<CreateDonationResponse>(
    "/donations/",
    formDataWithImage,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

interface MatchAcceptResponse {
  donator_registered_id: string;
}

const matchAccept = async (user) => {
  const matchData = {
    user: user,
    donation_request: Math.floor(Math.random() * 100),
  };

  const response = await apiServerInstance.post<MatchAcceptResponse>(
    "/donations/match/select/",
    createFormData(matchData),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

type MatchRejectResponse = {
  message: string;
};
const rejectMatch = async (user: number, donation_request: number) => {
  const response = await apiServerInstance.post<MatchRejectResponse>(
    "/donations/match/reject/",
    createFormData({
      user,
      donation_request,
    }),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

const sendMatchEmail = () => {
  return apiServerInstance.post("/services/send-match-email/");
};
export {
  bloodDontationMatch,
  getBloodDonationDetail,
  createBloodDonationRequest,
  matchAccept,
  rejectMatch,
  sendMatchEmail,
};
