import { Button } from "@/src/components/common/button";
import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { SpinnerModal } from "@/src/components/common/spinner";
import {
  getBloodDonationDetail,
  matchAccept,
  rejectMatch,
} from "@/src/domains/BloodDonate/api";
import { Info } from "@/src/domains/BloodDonate/components/info";
import MatchPending from "@/src/domains/BloodDonate/components/matchPending";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useLocation,
  useNavigate,
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
  const navigate = useNavigate();
  const router = useRouter();

  const { mutate: rematch, isPending: rematchPending } = useMutation({
    mutationFn: async () => {
      await rejectMatch(data?.requester ?? 0, data?.id ?? 0);
      return getBloodDonationDetail(data?.id.toString() ?? "");
    },
    onSuccess: (rematchData) => {
      if (rematchData) {
        router.navigate({
          to: "/donation/details/$donationId",
          params: { donationId: rematchData.id.toString() },
          replace: true,
        });
      }
    },
  });

  const { isPending: selectPending, mutate: selectMatch } = useMutation({
    mutationFn: matchAccept,
    onSuccess: (data) => {
      navigate({
        to: "/donation/match/$requestId",
        params: { requestId: data.donator_registered_id },
      });
    },
  });

  if (rematchPending || selectPending) return <MatchPending />;
  if (isPending) return <SpinnerModal />;
  if (isError) return <ErrorComponent />;
  return (
    <div className="flex h-full w-full flex-col">
      <Header title="지정헌혈 매칭 정보" />
      <div className="relative flex flex-1 flex-col gap-4 p-4 pb-20">
        <img
          src={data.image_url}
          className="h-[300px] w-full rounded-xl object-cover shadow-xl"
        />
        <section>
          <p className="py-2 text-lg">{data.name}</p>
          <hr />
          <Info field="나이" value={data.age.toString()} />
          <Info field="지역" value={data.location} />
          <Info field="혈액형" value={data.blood_type} />
          <Info field="수혈 마감 기한" value={data.donation_due_date} />
        </section>
        <section>
          <h2 className="text-xl">사연</h2>
          <p className="p-2">{data.content}</p>
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
        <Button
          className="flex-1 py-6"
          onClick={() => selectMatch(data.requester.toString())}
        >
          매칭하기
        </Button>
      </div>
    </div>
  );
}
