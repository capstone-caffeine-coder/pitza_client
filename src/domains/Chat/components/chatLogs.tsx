import { useChatContext } from "@/src/domains/Chat/hooks/useChatContext";
import { ImageMessage, Message } from "@/src/domains/Chat/types";

function ChatLogs({ messages }: { messages: (Message | ImageMessage)[] }) {
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
            <MessageLog message={message} />
          </div>
        </div>
      ))}
    </div>
  );
}

const MessageLog = ({ message }: { message: Message | ImageMessage }) => {
  if (message.message_type === "text") {
    return <TextLog message={message} />;
  }
  if (message.message_type === "image") {
    return <ImageLog message={message} />;
  }
};

const TextLog = ({ message }: { message: Message }) => {
  return <p>{message.content}</p>;
};

const ImageLog = ({ message }: { message: ImageMessage }) => {
  return <img src={message.content} alt={"메시지"} />;
};

export default ChatLogs;
