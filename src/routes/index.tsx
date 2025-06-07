import { Box } from "@/src/components/common/box";
import { Button } from "@/src/components/common/button";
import Header from "@/src/components/common/header";
import RecentBloodCard from "@/src/domains/BloodCard/components/recentBloodCard";
import BloodHoldStatus from "@/src/domains/BloodHoldStatus/components";
import { useAuthStore } from "@/src/store/authStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BiMenu } from "react-icons/bi";
import { FaLock } from "react-icons/fa6";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const status = useAuthStore((state) => state.status);
  const nickname = useAuthStore((state) => state.nickname);
  const logout = useAuthStore((state) => state.logout);
  return (
    <>
      <Header goBack={false} className="h-20">
        <span className="absolute left-4 text-xl font-bold">PITZA</span>
        {status === "LOGGED_IN" ? (
          <div className="absolute right-4 flex items-center gap-2">
            <span>{nickname ? `${nickname}님` : "닉네임을 설정해주세요."}</span>
            <BiMenu size={30} />
          </div>
        ) : (
          <Button
            className="absolute right-4 [&_svg]:size-4"
            onClick={() => navigate({ to: "/login" })}
          >
            로그인
            <FaLock size={20} />
          </Button>
        )}
      </Header>
      <div className="flex flex-col gap-4 p-4">
        <Box withIcon>
          <div>
            <p>
              헌혈할 때가 되셨나요?
              <br />
              지정헌혈 해줄 사람을 찾아드려요!
            </p>
            <Button className="mt-1 w-full">지정헌혈 매칭하기</Button>
          </div>
        </Box>
        <BloodHoldStatus />
        <RecentBloodCard />
      </div>
    </>
  );
}
