import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { SpinnerModal } from "@/src/components/common/spinner";
import { getBloodCardRequestDetail } from "@/src/domains/BloodCard/api";
import { Info } from "@/src/domains/BloodCard/components/info";
import { createFileRoute, getRouteApi, redirect } from "@tanstack/react-router";

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
          <h2 className="text-xl">사연</h2>
          <p className="p-2">{data.story}</p>
        </section>
      </div>
    </>
  );
}
