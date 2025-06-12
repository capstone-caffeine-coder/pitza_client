import { useChatContext } from "@/src/domains/Chat/hooks/useChatContext";
import { Messages, SendMessagePayload } from "@/src/domains/Chat/types";
import { useAuthStore } from "@/src/store/authStore";

function ChatLogs() {
  const {
    state: { messages: messagesAfterConnection },
  } = useChatContext();
  const nickname = useAuthStore((state) => state.nickname);

  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto bg-background p-4 pb-20 pt-24">
      {messagesAfterConnection.map((message) => (
        <div className="flex w-full" key={message.message}>
          <div
            className={`flex max-w-[80%] rounded-xl bg-white p-2 ${message.sender === nickname ? "ml-auto" : "mr-auto"}`}
          >
            <MessageLog message={message} />
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
  return <p className="break-all">{message.message}</p>;
};

const ImageLog = ({ message }: { message: Messages | SendMessagePayload }) => {
  return <img src={message.image_url as string} alt={"메시지"} />;
};

export default ChatLogs;
