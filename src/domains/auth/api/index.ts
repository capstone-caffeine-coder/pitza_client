import { apiServerInstance } from "@/src/api";
import { UserInfo } from "@/src/types/user";

type ProfileSetupForm = {
  nickname: string;
  birthdate: string;
  sex: "MALE" | "FEMALE";
  blood_type: string;
  profile_picture: File | null;
};

const finishProfileSet = async (data: ProfileSetupForm) => {
  // FormData 생성
  const formData = new FormData();

  // 기본 정보 추가
  formData.append("nickname", data.nickname);
  formData.append("birthdate", data.birthdate);
  formData.append("sex", data.sex);
  formData.append("blood_type", data.blood_type);

  // 프로필 이미지가 있는 경우 추가
  if (data.profile_picture) {
    formData.append("profile_picture", data.profile_picture);
  }

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
