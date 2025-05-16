import { createChatRoom } from "@/src/api/chat";
import { Button } from "@/src/components/common/button";
import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { SpinnerModal } from "@/src/components/common/spinner";
import { getBloodCardDonateDetail } from "@/src/domains/BloodCard/api";
import { Info } from "@/src/domains/BloodCard/components/info";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  getRouteApi,
  redirect,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/bloodcard/donations/detail/$postId")({
  loader: async ({ params: { postId } }) => getBloodCardDonateDetail(postId),
  pendingComponent: SpinnerModal,
  component: RouteComponent,
  errorComponent: ErrorComponent,
  onError: () => {
    throw redirect({ to: "/" });
  },
});

function RouteComponent() {
  const routeApi = getRouteApi("/bloodcard/donations/detail/$postId");
  const data = routeApi.useLoaderData();
  const { navigate } = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createChatRoom,
    onSuccess: (data) => {
      navigate({
        to: "/chat/rooms/$roomId",
        params: { roomId: data.chatroom_id },
      });
    },
  });
  return (
    <>
      <Header title="헌혈증 기부 상세" />
      <div className="flex flex-col gap-4 p-4">
        <img
          src={data.image}
          className="h-[300px] w-full rounded-xl object-cover shadow-xl"
        />
        <section>
          <p className="py-2 text-lg">{data.nickname}</p>
          <hr />
          <Info field="지역" value={data.donationLocation} />
        </section>
        <section>
          <h2 className="text-xl">소개</h2>
          <p className="p-2">{data.introduce}</p>
        </section>
        <Button
          type="button"
          onClick={() => mutate({ post_id: data.id, receiver_id: "qwrqwr" })}
        >
          연락하기
        </Button>
      </div>
      {isPending && <SpinnerModal />}
    </>
  );
}
