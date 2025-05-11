import { Button } from "@/src/components/common/button";
import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { SpinnerModal } from "@/src/components/common/spinner";
import {
  bloodDontationMatch,
  getBloodDonationDetail,
} from "@/src/domains/BloodDonate/api";
import { Info } from "@/src/domains/BloodDonate/components/info";
import MatchPending from "@/src/domains/BloodDonate/components/matchPending";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useLocation,
  useParams,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/donation/match/$requestId")({
  errorComponent: ErrorComponent,
  component: RouteComponent,
});

function RouteComponent() {
  const { requestId } = useParams({ from: "/donation/match/$requestId" });
  const { data, isPending, isError } = useQuery({
    queryKey: ["donation", requestId],
    queryFn: () => getBloodDonationDetail(requestId),
  });
  const location = useLocation();
  const router = useRouter();
  const { mutate: rematch, isPending: rematchPending } = useMutation({
    mutationFn: bloodDontationMatch,
    onSuccess: (rematchData) => {
      if (rematchData) {
        router.navigate({
          to: "/donation/details/$donationId",
          params: { donationId: rematchData.id },
          replace: true,
        });
      }
    },
  });

  if (rematchPending) return <MatchPending />;
  if (isPending) return <SpinnerModal />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="flex h-full w-full flex-col">
      <Header title="지정헌혈 매칭 정보" />
      <div className="relative flex flex-1 flex-col gap-4 p-4 pb-20">
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
      <div className="absolute bottom-20 left-0 flex w-full gap-3 bg-white p-4">
        <Button
          className="w-1/4 py-6"
          variant={"outline"}
          type="button"
          onClick={() => rematch(location.state.matchData)}
        >
          재매칭
        </Button>
        <Button className="flex-1 py-6">매칭하기</Button>
      </div>
    </div>
  );
}
