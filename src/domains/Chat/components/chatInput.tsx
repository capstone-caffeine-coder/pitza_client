import { Button } from "@/src/components/common/button";
import { useChatContext } from "@/src/domains/Chat/hooks/useChatContext";
import { FaPaperPlane } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { useRef } from "react";

function ChatInput() {
  const { sendMessage, sendImage } = useChatContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        sendImage({
          sender: "doner1",
          message_type: "image",
          content: imageData,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendMessage = () => {
    if (textInputRef.current?.value) {
      sendMessage({
        sender: "doner1",
        message_type: "text",
        content: textInputRef.current?.value ?? "",
        sent_at: new Date().toISOString(),
      });
      textInputRef.current.value = "";
    }
  };

  return (
    <div className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-5 bg-background p-4">
      <textarea
        className="h-10 flex-1 resize-none rounded-xl border border-primary px-4 py-2 focus:outline-none focus:ring focus:ring-primary"
        ref={textInputRef}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="이미지 업로드"
      />
      <Button
        variant={"default"}
        type="button"
        onClick={handleImageButtonClick}
      >
        <GrGallery size={20} className="text-white" />
      </Button>
      <Button variant={"default"} type="button" onClick={handleSendMessage}>
        <FaPaperPlane size={20} className="text-white" />
      </Button>
    </div>
  );
}

export default ChatInput;
