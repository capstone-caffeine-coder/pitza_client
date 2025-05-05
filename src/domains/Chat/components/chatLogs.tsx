import { useChatContext } from "@/src/domains/Chat/hooks/useChatContext";
import { Message } from "@/src/domains/Chat/types";

function ChatLogs({ messages }: { messages: Message[] }) {
  const {
    state: { messages: messagesAfterConnection },
  } = useChatContext();
  const chatLogs = messages.concat(messagesAfterConnection);
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto bg-background p-4 pb-20 pt-24">
      {chatLogs.map((message, idx) => (
        <div className="flex w-full">
          <div
            className={`flex max-w-[80%] rounded-xl bg-white p-2 ${idx % 2 === 0 ? "ml-auto" : "mr-auto"}`}
          >
            {message.message}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatLogs;
