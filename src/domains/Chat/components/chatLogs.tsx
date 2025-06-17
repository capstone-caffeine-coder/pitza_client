import { useChatContext } from "@/src/domains/Chat/hooks/useChatContext";
import { Messages, SendMessagePayload } from "@/src/domains/Chat/types";
import { useAuthStore } from "@/src/store/authStore";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { GoReport } from "react-icons/go";

function ChatLogs({
  setReportMessageId,
}: {
  setReportMessageId: Dispatch<SetStateAction<number | null>>;
}) {
  const {
    state: { messages: messagesAfterConnection },
  } = useChatContext();
  const nickname = useAuthStore((state) => state.nickname);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (chatBoxRef.current) {
        chatBoxRef.current.scrollTo({
          top: chatBoxRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  }, []);

  return (
    <div
      className="flex h-full flex-col gap-4 overflow-y-auto bg-background p-4 pb-20 pt-24"
      ref={chatBoxRef}
    >
      {messagesAfterConnection.map((message) => (
        <div className="flex w-full" key={message.message}>
          <div
            className={`flex max-w-[80%] rounded-xl p-2 ${message.sender === nickname ? "ml-auto" : "mr-auto"} items-center justify-center gap-4`}
          >
            <MessageLog message={message} />
            {message.sender !== nickname && (
              <GoReport
                size={20}
                fill="red"
                className="cursor-pointer opacity-30 hover:opacity-100"
                onClick={() => setReportMessageId(message.id)}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const MessageLog = ({
  message,
}: {
  message: Messages | SendMessagePayload;
}) => {
  console.log(message);
  if (message.message_type === "text") {
    return <TextLog message={message} />;
  }
  if (message.message_type === "image") {
    return <ImageLog message={message} />;
  }
};

const TextLog = ({ message }: { message: Messages | SendMessagePayload }) => {
  return <p className="break-all rounded-xl bg-white p-2">{message.message}</p>;
};

const ImageLog = ({ message }: { message: Messages | SendMessagePayload }) => {
  return (
    <img
      src={message.image_url as string}
      alt={"메시지"}
      className="rounded-xl bg-white p-4"
    />
  );
};

export default ChatLogs;
