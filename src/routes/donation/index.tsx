import { Box } from "@/src/components/common/box";
import { Button } from "@/src/components/common/button";
import Header from "@/src/components/common/header";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/donation/")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useNavigate();
  return (
    <main className="flex h-full flex-col">
      <Header title="지정헌혈 매칭하기" />
      <Box withIcon={true} className="text-center">
        원하는 사람에게 헌혈할 수 있도록 핏자가 도와드릴게요
      </Box>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <p className="mb-4 text-xl font-bold">아래 옵션을 선택해주세요.</p>
          <Button
            type="button"
            variant={"default"}
            className="animate-fade-up w-3/4 min-w-[150px] rounded-xl p-8 text-xl"
            onClick={() => router({ to: "/donation/create" })}
          >
            지정헌혈 등록하기
          </Button>
          <Button
            type="button"
            variant={"default"}
            className="animate-fade-up w-3/4 min-w-[150px] rounded-xl p-8 text-xl"
            onClick={() => router({ to: "/donation/match" })}
          >
            지정헌혈 매칭하기
          </Button>
        </div>
      </div>
    </main>
  );
}
