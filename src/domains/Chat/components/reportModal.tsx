import { Button } from "@/src/components/common/button";
import { Modal } from "@/src/components/common/modal";

const REPORT_LIST = [
  { type: "qwrqwrwr", message: "욕설 및 성희롱" },
  { type: "qwrqwrwr", message: "헌혈증 불법거래" },
  { type: "qwrqwrwr", message: "헌혈증 대가성 거래" },
  { type: "qwrqwrwr", message: "부적절한 태도" },
];
function ReportModal({
  visible,
  toggle,
}: {
  visible: boolean;
  toggle: () => void;
}) {
  if (visible)
    return (
      <Modal>
        <div className="w-full p-4">
          <p className="p-4 text-center text-xl font-bold">신고하기</p>
          <div className="mb-10 flex flex-col gap-4">
            {REPORT_LIST.map((report) => (
              <Button className="rounded-xl border p-4">
                {report.message}
              </Button>
            ))}
          </div>
          <Button variant={"destructive"} className="w-full" onClick={toggle}>
            닫기
          </Button>
        </div>
      </Modal>
    );
}

export default ReportModal;
