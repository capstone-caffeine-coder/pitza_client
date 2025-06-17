import { Button } from "@/src/components/common/button";
import { ErrorComponent } from "@/src/components/common/error";
import Header from "@/src/components/common/header";
import { Modal } from "@/src/components/common/modal";
import { SpinnerModal } from "@/src/components/common/spinner";
import {
  bloodDontationMatch,
  getBloodDonationDetail,
  matchAccept,
  rejectMatch,
  sendMatchEmail,
} from "@/src/domains/BloodDonate/api";
import { Info } from "@/src/domains/BloodDonate/components/info";
import MatchPending from "@/src/domains/BloodDonate/components/matchPending";
import { MatchRequest } from "@/src/domains/BloodDonate/types";
import { useAuthStore } from "@/src/store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useLocation,
  useNavigate,
  useParams,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";

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
  const [donationIdModal, setDonationIdModal] = useState<string | null>(null);
  const router = useRouter();
  const prevMatchData = router.state.location.state as {
    matchData: MatchRequest;
  };
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.id);

  const { mutate: rematch, isPending: rematchPending } = useMutation({
    mutationFn: async () => {
      await rejectMatch(userId ?? 0, data?.id ?? 0);
      return bloodDontationMatch({
        ...prevMatchData.matchData,
      });
    },
    onSuccess: (rematchData) => {
      if (rematchData) {
        router.navigate({
          to: "/donation/match/$requestId",
          params: { requestId: rematchData.id.toString() },
          state: {
            matchData: prevMatchData.matchData,
          },
          replace: true,
        });
      }
    },
  });

  const { isPending: selectPending, mutate: selectMatch } = useMutation({
    mutationFn: matchAccept,
    onSuccess: (data) => {
      setDonationIdModal(data.donator_registered_id);
    },
  });

  const { mutate: sendEmail, isPending: sendEmailPending } = useMutation({
    mutationFn: sendMatchEmail,
    onSuccess: () => alert("매칭 정보가 이메일로 전송되었습니다."),
    onError: () => alert("이메일 전송에 실패했습니다. 다시 시도해주세요."),
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${donationIdModal}`);
      alert("클립보드에 복사되었습니다!");
    } catch (err) {
      // 클립보드 API가 지원되지 않는 경우 fallback
      const textArea = document.createElement("textarea");
      textArea.value = `${donationIdModal}`;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        alert("클립보드에 복사되었습니다!");
      } catch (fallbackErr) {
        alert("복사에 실패했습니다. 다시 시도해주세요.");
      }
      document.body.removeChild(textArea);
    }
  };

  // const shareRequestId = () => {
  //   Kakao.API.request({
  //     url: "/v2/api/talk/memo/default/send",
  //     data: {
  //       template_object: {
  //         object_type: "feed",
  //         content: {
  //           title: "지정헌혈 매칭 정보 안내",
  //           decription: "저정헌혈 매칭된 상대방의",
  //           image_url: "https://i.imgur.com/OVry6Ru.png",
  //         },
  //         buttons: [
  //           {
  //             title: "헌혈증 기부글 확인하기",
  //             link: {
  //               mobile_web_url: `http://localhost:5173/donation/matched/${requestId}`,
  //               web_url: `http://localhost:5173/donation/matched/${requestId}`,
  //             },
  //           },
  //         ],
  //       },
  //     },
  //   })
  //     .then(() => {
  //       alert("카카오톡으로 헌혈증 기부글이 전송되었습니다.");
  //     })
  //     .catch(() => {
  //       alert("카카오톡 전송에 실패했습니다. 다시 시도해주세요.");
  //     });
  // };

  if (rematchPending || selectPending) return <MatchPending />;
  if (isPending) return <SpinnerModal />;
  if (isError) return <ErrorComponent />;
  return (
    <>
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
      {donationIdModal && (
        <Modal>
          <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
            <h1 className="text-xl">헌혈 매칭 안내</h1>
            <p>헌혈 매칭이 완료되었습니다.</p>
            <p className="rounded-xl bg-primary p-4 text-white">
              수혈자 등록번호 : {donationIdModal}
            </p>
            <Button
              className="w-full bg-blue-500 text-white"
              onClick={copyToClipboard}
            >
              📋 클립보드로 복사하기
            </Button>
            <Button className="w-full" onClick={() => navigate({ to: "/" })}>
              홈으로
            </Button>
          </div>
        </Modal>
      )}
      {sendEmailPending && <SpinnerModal />}
    </>
  );
}
