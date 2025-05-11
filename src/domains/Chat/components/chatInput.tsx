import { Button } from "@/src/components/common/button";
import { useChatContext } from "@/src/domains/Chat/hooks/useChatContext";
import { FaPaperPlane } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { useRef } from "react";

function ChatInput() {
  const { dispatch } = useChatContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        dispatch({
          type: "SEND_IMAGE",
          payload: {
            sender: "1",
            message_type: "image",
            content: imageData,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-5 bg-background p-4">
      <textarea className="h-10 flex-1 resize-none rounded-xl border border-primary px-4 py-2 focus:outline-none focus:ring focus:ring-primary" />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <Button
        variant={"default"}
        type="button"
        onClick={handleImageButtonClick}
      >
        <GrGallery size={20} className="text-white" />
      </Button>
      <Button variant={"default"} type="button">
        <FaPaperPlane size={20} className="text-white" />
      </Button>
    </div>
  );
}

export default ChatInput;
