import { createChatRoom } from "@/src/api/chat";
import { assetMap } from "@/src/assets";
import { Button } from "@/src/components/common/button";
import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { SpinnerModal } from "@/src/components/common/spinner";
import { getBloodCardRequestDetail } from "@/src/domains/BloodCard/api";
import { Info } from "@/src/domains/BloodCard/components/info";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  getRouteApi,
  redirect,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/bloodcard/request/detail/$postId")({
  loader: async ({ params: { postId } }) => getBloodCardRequestDetail(postId),
  pendingComponent: SpinnerModal,
  component: RouteComponent,
  errorComponent: ErrorComponent,
  onError: () => {
    throw redirect({ to: "/" });
  },
});

function RouteComponent() {
  const routeApi = getRouteApi("/bloodcard/request/detail/$postId");
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
  const date = new Date(data.created_at);

  return (
    <>
      <Header title="헌혈증 요청 상세" />
      <div className="flex flex-col gap-4 p-4">
        <img
          src={data.image ?? assetMap["characterIcon"]}
          className="h-[300px] w-full rounded-xl object-cover shadow-xl"
        />
        <section>
          <p className="py-2 text-lg">{data.requester_username}</p>
          <hr />
          <Info
            field="등록일"
            value={`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}
          />
          <Info field="지역" value={data.region} />
          <Info field="혈액형" value={data.blood_type} />
        </section>
        <section className="mb-10">
          <h2 className="text-xl">사연</h2>
          <p className="p-2">{data.reason}</p>
        </section>
        <Button
          type="button"
          onClick={() =>
            mutate({
              post_id: data.id.toString(),
              receiver_id: data.receiver_id.toString(),
            })
          }
        >
          연락하기
        </Button>
      </div>
      {isPending && <SpinnerModal />}
    </>
  );
}
