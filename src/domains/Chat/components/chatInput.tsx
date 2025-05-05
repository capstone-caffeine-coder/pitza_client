import { Button } from "@/src/components/common/button";
import { FaPaperPlane } from "react-icons/fa6";

function ChatInput() {
  return (
    <div className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-5 bg-background p-4">
      <textarea className="h-10 flex-1 resize-none rounded-xl border border-primary px-4 py-2 focus:outline-none focus:ring focus:ring-primary" />
      <Button variant={"default"} type="button">
        <FaPaperPlane size={20} className="text-white" />
      </Button>
    </div>
  );
}

export default ChatInput;
