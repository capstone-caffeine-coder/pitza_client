import { UserInfo } from "@/src/types/user";
import { create } from "zustand";
import { getUserSession } from "@/src/domains/auth/api";

type AuthState = "LOGGED_IN" | "LOGGED_OUT";

interface AuthStore extends UserInfo {
  status: AuthState;
  isLoading: boolean;
  error: string | null;
  is_profile_complete: boolean;

  // 상태 관리
  login: (userInfo: UserInfo) => void;
  logout: () => void;
  updateUser: (userInfo: UserInfo) => void;

  // 데이터 페칭
  fetchUser: () => Promise<void>;
}

const useAuthStore = create<AuthStore>()((set) => ({
  // 초기 상태
  status: "LOGGED_OUT",
  nickname: "",
  id: null,
  email: "",
  kakao_id: "",
  profile_picture: "",
  is_profile_complete: false,
  isLoading: false,
  error: null,

  // 상태 관리 메서드
  login: (userInfo) => set({ ...userInfo, status: "LOGGED_IN" }),

  logout: () =>
    set({
      nickname: "",
      email: "",
      kakao_id: "",
      profile_picture: "",
      status: "LOGGED_OUT",
      id: null,
    }),

  updateUser: ({ nickname, email, kakao_id, profile_picture }) =>
    set({
      nickname,
      email,
      kakao_id,
      profile_picture,
    }),

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const user = await getUserSession();
      set({
        ...user,
        status: "LOGGED_IN",
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "사용자 정보를 가져오는데 실패했습니다",
        status: "LOGGED_OUT",
        isLoading: false,
      });
    }
  },
}));

export { useAuthStore };
export type { AuthStore, AuthState };
