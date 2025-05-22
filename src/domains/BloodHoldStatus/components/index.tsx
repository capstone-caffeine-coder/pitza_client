import { getBloodStatus } from "@/src/domains/BloodHoldStatus/api/GetBloodStatus.api";
import { BloodStatusBar } from "@/src/domains/BloodHoldStatus/components/BloodStatusBar";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineBloodtype } from "react-icons/md";

export default function BloodHoldStatus() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["bloodholdStatus"],
    queryFn: getBloodStatus,
  });

  if (isPending) return <BloodHoldStatusSkeleton />;
  if (!data || isError) return null;
  return (
    <div className="w-full rounded-xl border p-6">
      <div className="mb-4 flex items-center gap-5">
        <MdOutlineBloodtype size={50} className="text-primary" />
        <div>
          <h2 className="text-xl">적혈구제제 보유 현황</h2>
          <p>
            <span className="text-xl font-bold">{data?.leftDays}</span>일동안
            버틸 수 있어요
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3 text-xl">
        <BloodStatusBar blood="A" current={data.A} total={data.total} />
        <BloodStatusBar blood="B" current={data.B} total={data.total} />
        <BloodStatusBar blood="O" current={data.O} total={data.total} />
        <BloodStatusBar blood="AB" current={data.AB} total={data.total} />
      </div>
    </div>
  );
}

export function BloodHoldStatusSkeleton() {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      {/* 헤더 스켈레톤 */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200" />
        <div className="h-6 w-20 animate-pulse rounded-md bg-gray-200" />
      </div>

      {/* 혈액형별 상태 스켈레톤 */}
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="flex flex-col gap-2 rounded-lg border p-4"
          >
            {/* 혈액형 라벨 스켈레톤 */}
            <div className="h-5 w-16 animate-pulse rounded-md bg-gray-200" />

            {/* 상태 정보 스켈레톤 */}
            <div className="flex flex-col gap-1">
              <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
              <div className="h-4 w-32 animate-pulse rounded-md bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* 업데이트 시간 스켈레톤 */}
      <div className="flex justify-end">
        <div className="h-4 w-40 animate-pulse rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
