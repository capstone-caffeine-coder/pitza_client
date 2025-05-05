import { ErrorComponent } from "@/src/components/common/error";
import { Spinner } from "@/src/components/common/spinner";
import { getChats } from "@/src/domains/Chat/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

const ChatList = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["chatList"],
    queryFn: getChats,
  });

  if (isPending) return <Spinner />;
  if (error) return <ErrorComponent />;
  return (
    <div className="flex w-full flex-col items-center">
      <ul className="w-full">
        {data?.map((chat) => (
          <Link
            to="/chat/rooms/$roomId"
            params={{ roomId: chat.roomId }}
            key={chat.roomId}
          >
            <li key={chat.id} className="flex gap-4 border-b p-4">
              <img
                src={chat.partner.profileImage}
                alt={`${chat.partner.name}의 프로필 이미지`}
                className="h-14 w-14 rounded-xl"
              />
              <div>
                <h2 className="text-xl">{chat.partner.name}</h2>
                <p className="text-subText">{chat.lastMessage}</p>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
