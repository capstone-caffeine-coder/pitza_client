import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useNavigate,
  ValidateToPath,
} from "@tanstack/react-router";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineBloodtype } from "react-icons/md";
import { BiDonateBlood } from "react-icons/bi";
import { BsChatLeftDots } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { AuthState, useAuthStore } from "@/src/store/authStore";
import { initializeApp } from "firebase/app";
import { NotFoundComponent } from "@/src/components/common/error";

import { useEffect } from "react";

const navRoutes: {
  to: ValidateToPath;
  title: string;
  icon: React.ReactNode;
}[] = [
  {
    to: "/bloodcard",
    title: "헌혈증",
    icon: <MdOutlineBloodtype />,
  },
  {
    to: "/donation",
    title: "지정헌혈",
    icon: <BiDonateBlood />,
  },
  {
    to: "/",
    title: "홈",
    icon: <AiOutlineHome />,
  },
  {
    to: "/chat",
    title: "채팅",
    icon: <BsChatLeftDots />,
  },
  {
    to: "/center",
    title: "주변 헌혈원",
    icon: <FaMapLocationDot />,
  },
];

interface RouterContext {
  auth: AuthState;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
initializeApp(firebaseConfig);

const RootRoute = () => {
  const navigate = useNavigate();
  const loginStatus = useAuthStore((state) => state.status);
  const isProfileComplete = useAuthStore((state) => state.is_profile_complete);

  useEffect(() => {
    const fetchUser = async () => {
      await useAuthStore.getState().fetchUser();
      if (loginStatus === "LOGGED_IN" && !isProfileComplete) {
        navigate({ to: "/profile/setup" });
      }
    };
    fetchUser();
  }, [loginStatus, isProfileComplete, navigate]);

  return (
    <main className="relative mx-auto h-screen max-h-screen max-w-screen-sm overflow-y-hidden pb-20">
      <div className="absolute bottom-0 flex h-20 w-full bg-primary">
        {navRoutes.map((route) => (
          <Link
            key={route.to}
            to={route.to}
            className="hover:bg-pitza-softPink/80 flex flex-1 flex-col items-center justify-center text-center text-white [&_svg]:h-6 [&_svg]:w-6 [&_svg]:text-white"
          >
            {route.icon}
            {route.title}
          </Link>
        ))}
      </div>
      <div className="scrollbar h-full overflow-y-auto">
        <Outlet />
      </div>
      {/* <TanStackRouterDevtools /> */}
    </main>
  );
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootRoute,
  notFoundComponent: NotFoundComponent,
});
