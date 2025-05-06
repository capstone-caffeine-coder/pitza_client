import { SpinnerPitza } from "@/src/components/common/spinner";

function MatchPending() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <SpinnerPitza />
      <p className="text-xl font-bold">매칭 중입니다...</p>
    </div>
  );
}

export default MatchPending;
