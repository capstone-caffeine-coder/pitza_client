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
  return <div className="h-auto w-full bg-slate-300 shadow-lg"></div>;
}
