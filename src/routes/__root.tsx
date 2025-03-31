import {
  createRootRoute,
  Link,
  Outlet,
  ValidateToPath,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineBloodtype } from "react-icons/md";
import { BiDonateBlood } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { BsChatLeftDots } from "react-icons/bs";

const navRoutes: {
  to: ValidateToPath;
  title: string;
  icon: React.ReactNode;
}[] = [
  {
    to: "/",
    title: "홈",
    icon: <AiOutlineHome />,
  },
  {
    to: "/donercard",
    title: "헌혈증",
    icon: <MdOutlineBloodtype />,
  },
  {
    to: "/donate",
    title: "지정헌혈",
    icon: <BiDonateBlood />,
  },
  {
    to: "/chat",
    title: "채팅",
    icon: <BsChatLeftDots />,
  },
  {
    to: "/mypage",
    title: "마이",
    icon: <CgProfile />,
  },
];

export const Route = createRootRoute({
  component: () => (
    <main className="relative mx-auto h-screen max-h-screen max-w-screen-sm pb-20">
      <div className="absolute bottom-0 flex h-20 w-full bg-pitza-coral">
        {navRoutes.map((route) => (
          <Link
            key={route.to}
            to={route.to}
            className="flex flex-1 flex-col items-center justify-center text-center text-white hover:bg-pitza-softPink/80 [&_svg]:h-6 [&_svg]:w-6 [&_svg]:text-white"
          >
            {route.icon}
            {route.title}
          </Link>
        ))}
      </div>
      <hr className="my-4" />
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
});
