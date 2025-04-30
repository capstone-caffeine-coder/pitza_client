import { Box } from "@/src/components/common/box";
import { Button } from "@/src/components/common/button";
import RecentBloodCard from "@/src/domains/BloodCard/components/recentBloodCard";
import BloodHoldStatus from "@/src/domains/BloodHoldStatus/components";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Box withIcon>
        <div>
          <p>
            헌혈할 때가 되셨네요!
            <br />
            지정헌혈 해줄 사람을 찾아볼까요?
          </p>
          <Button className="mt-1 w-full">지정헌혈 매칭하기</Button>
        </div>
      </Box>
      <BloodHoldStatus />
      <RecentBloodCard />
    </div>
  );
}
