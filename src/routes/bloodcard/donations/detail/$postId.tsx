import { createChatRoom } from "@/src/api/chat";
import { assetMap } from "@/src/assets";
import { Button } from "@/src/components/common/button";
import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { SpinnerModal } from "@/src/components/common/spinner";
import { getBloodCardDonateDetail } from "@/src/domains/BloodCard/api";
import { Info } from "@/src/domains/BloodCard/components/info";
import { useAuthStore } from "@/src/store/authStore";
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
  const userId = useAuthStore((state) => state.id);
  return (
    <>
      <Header title="헌혈증 기부 상세" />
      <div className="flex flex-col gap-4 p-4">
        <img
          src={data.image ?? assetMap.characterIcon}
          className="h-[300px] w-full rounded-xl object-contain shadow-xl"
        />
        <section>
          <p className="py-2 text-lg">
            {data.donor_username ?? "민수의 겨울방학"}
          </p>
          <hr />
          <Info field="지역" value={data.region} />
          <Info field="나이" value={data.age.toString()} />
          <Info field="성별" value={data.gender === "F" ? "여성" : "남성"} />
        </section>
        <section>
          <h2 className="text-xl">소개</h2>
          <p className="p-2">{data.introduction}</p>
        </section>
        {data.receiver_id !== userId && (
          <Button
            type="button"
            onClick={() =>
              mutate({
                post_id: data.id,
                receiver_id: data.receiver_id.toString(),
              })
            }
          >
            연락하기
          </Button>
        )}
      </div>
      {isPending && <SpinnerModal />}
    </>
  );
}
