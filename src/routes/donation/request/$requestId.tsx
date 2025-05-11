import { Button } from "@/src/components/common/button";
import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { SpinnerModal } from "@/src/components/common/spinner";
import { getBloodDonationDetail } from "@/src/domains/BloodDonate/api";
import { Info } from "@/src/domains/BloodDonate/components/info";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/donation/request/$requestId")({
  errorComponent: ErrorComponent,
  component: RouteComponent,
});

function RouteComponent() {
  const { requestId } = useParams({ from: "/donation/request/$requestId" });
  const { data, isPending, isError } = useQuery({
    queryKey: ["donation", requestId],
    queryFn: () => getBloodDonationDetail(requestId),
  });

  if (isPending) return <SpinnerModal />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="flex h-full w-full flex-col">
      <Header title="지정헌혈 요청 정보" />
      <div className="relative flex flex-1 flex-col gap-4 p-4 pb-20">
        <div className="flex justify-end">
          <Button className="w-1/2">취소하기</Button>
        </div>
        <img
          src={data.image}
          className="h-[300px] w-full rounded-xl object-cover shadow-xl"
        />
        <section>
          <p className="py-2 text-lg">{data.nickname}</p>
          <hr />
          <Info field="나이" value={data.age.toString()} />
          <Info field="지역" value={data.location} />
          <Info field="혈액형" value={data.bloodType} />
          <Info field="수혈 마감 기한" value={data.donationDueDate} />
        </section>
        <section>
          <h2 className="text-xl">사연</h2>
          <p className="p-2">{data.story}</p>
        </section>
      </div>
    </div>
  );
}
