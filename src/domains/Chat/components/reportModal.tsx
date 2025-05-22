import { Button } from "@/src/components/common/button";
import { Modal } from "@/src/components/common/modal";
import { SpinnerModal } from "@/src/components/common/spinner";
import { reportChatUser } from "@/src/domains/Chat/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const REPORT_LIST = [
  { type: "qwrqwrwr", message: "욕설 및 성희롱" },
  { type: "qwrqwrwr", message: "헌혈증 불법거래" },
  { type: "qwrqwrwr", message: "헌혈증 대가성 거래" },
  { type: "qwrqwrwr", message: "부적절한 태도" },
] as const;
type ReportType = (typeof REPORT_LIST)[number];
function ReportModal({
  visible,
  toggle,
  chatroom_id,
}: {
  visible: boolean;
  toggle: () => void;
  chatroom_id: string;
}) {
  const [reportType, setReportType] = useState<ReportType>();
  function cancelReport() {
    setReportType(undefined);
    toggle();
  }
  if (visible)
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
}: {
  toggle: () => void;
  chatroom_id: string;
  report: ReportType;
}) => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: reportChatUser,
  });

  if (isSuccess) return <ReportResult toggle={toggle} />;
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
          onClick={() => mutate({ chatroom_id, reason: report.type })}
        >
          신고하기
        </Button>
      </div>
      {isPending && <SpinnerModal />}
    </>
  );
};

const ReportResult = ({ toggle }: { toggle: () => void }) => {
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
