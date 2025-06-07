import { apiServerInstance } from "@/src/api";
import { Gender } from "@/src/types/donationInfo";
import { UserInfo } from "@/src/types/user";
import { createFormData } from "@/src/utils/formdata";

type ProfileSetupForm = {
  nickname: string;
  birthdate: string;
  sex: Gender;
  blood_type: string;
};

const finishProfileSet = async (data: ProfileSetupForm) => {
  // FormData 생성
  const formData = createFormData(data);

  // Content-Type 헤더를 자동으로 설정하도록 변경
  const response = await apiServerInstance.post("/profile/setup/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

interface GetUserSessionResponse extends UserInfo {
  is_profile_complete: boolean;
}
const getUserSession = async (): Promise<GetUserSessionResponse> => {
  const response = await apiServerInstance.get<GetUserSessionResponse>(
    "/get_user_by_session/",
    {
      withCredentials: true,
    },
  );

  return response.data;
};

export { getUserSession, finishProfileSet };
