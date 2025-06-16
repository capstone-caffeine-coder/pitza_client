import { Button } from "@/src/components/common/button";
import { Modal } from "@/src/components/common/modal";
import { SpinnerModal } from "@/src/components/common/spinner";
import { reportChatUser } from "@/src/domains/Chat/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const REPORT_LIST = [
  { message: "욕설 및 성희롱", description: "욕설, 성희롱, 비하 발언 등" },
  {
    message: "헌혈증 불법거래",
    description: "헌혈증을 불법적으로 거래하는 행위",
  },
  { message: "헌혈증 대가성 거래", description: "헌혈증을 대가로 하는 거래" },
  { message: "부적절한 태도", description: "부적절한 언행이나 태도" },
] as const;
type ReportType = (typeof REPORT_LIST)[number];
function ReportModal({
  messageId,
  setMessageId,
  chatroom_id,
}: {
  messageId: number | null;
  setMessageId: React.Dispatch<React.SetStateAction<number | null>>;

  chatroom_id: string;
}) {
  const [reportType, setReportType] = useState<ReportType>();
  function cancelReport() {
    setReportType(undefined);
    setMessageId(null);
  }

  if (messageId)
    return (
      <Modal>
        <div className="w-full p-4">
          <p className="p-4 text-center text-xl font-bold">신고하기</p>
          <ReportSelect
            reportType={reportType}
            setReportType={setReportType}
            toggle={cancelReport}
          />
          {reportType && (
            <ReportConfirm
              chatroom_id={chatroom_id}
              report={reportType}
              toggle={cancelReport}
              message_id={messageId}
            />
          )}
        </div>
      </Modal>
    );
}

const ReportSelect = ({
  reportType,
  setReportType,
  toggle,
}: {
  reportType: ReportType | undefined;
  setReportType: (report: ReportType) => void;
  toggle: () => void;
}) => {
  if (!reportType)
    return (
      <>
        <div className="mb-10 flex flex-col gap-4">
          {REPORT_LIST.map((report) => (
            <Button
              className="rounded-xl border p-4"
              onClick={() => setReportType(report)}
            >
              {report.message}
            </Button>
          ))}
        </div>
        <Button variant={"destructive"} className="w-full" onClick={toggle}>
          닫기
        </Button>
      </>
    );
};

const ReportConfirm = ({
  report,
  chatroom_id,
  toggle,
  message_id,
}: {
  toggle: () => void;
  chatroom_id: string;
  report: ReportType;
  message_id: number;
}) => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: reportChatUser,
  });

  if (isSuccess) return <ReportResult />;
  return (
    <>
      <p className="p-4 text-center">{report.message}로 상대방을 신고할까요?</p>
      <div className="flex gap-3">
        <Button variant={"outline"} className="w-full" onClick={toggle}>
          취소
        </Button>
        <Button
          variant={"destructive"}
          className="w-full"
          onClick={() =>
            mutate({
              chatroom_id,
              description: report.description,
              message_id,
              reason: report.message,
            })
          }
        >
          신고하기
        </Button>
      </div>
      {isPending && <SpinnerModal />}
    </>
  );
};

const ReportResult = () => {
  const navigate = useNavigate();
  return (
    <>
      <p>신고가 완료되었습니다.</p>
      <p>신고는 익명으로 진행되며, 빠르게 조치될 예정입니다.</p>
      <Button
        variant={"outline"}
        className="w-full"
        onClick={() => navigate({ to: "/" })}
      >
        확인
      </Button>
    </>
  );
};

export default ReportModal;
