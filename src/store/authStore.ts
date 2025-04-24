import { UserInfo } from "@/src/types/user";
import { create } from "zustand";

type AuthState = "LOGGED_IN" | "LOGGED_OUT";
interface AuthStore extends UserInfo {
  status: AuthState;
  login: (userInfo: UserInfo) => void;
  logout: () => void;
  updateUser: (userInfo: UserInfo) => void;
  reIssue: (accessToken: string) => void;
}
const useAuthStore = create<AuthStore>()((set) => ({
  status: "LOGGED_OUT",
  accessToken: "",
  nickname: "",
  login: ({ accessToken }) => set({ accessToken: accessToken }),
  logout: () =>
    set({
      accessToken: "",
      nickname: "",
    }),
  updateUser: ({ nickname }) =>
    set({
      nickname,
    }),
  reIssue: (accessToken) => {
    set({ accessToken });
  },
}));

export { useAuthStore };
export type { AuthStore, AuthState };
