import { ErrorComponent } from "@/src/components/common/error";
import { getChats } from "@/src/domains/Chat/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

const ChatList = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["chatList"],
    queryFn: getChats,
  });

  if (isPending) return <ChatListSkeleton />;
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
const ChatListSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center">
      <ul className="w-full">
        {[1, 2, 3, 4, 5].map((index) => (
          <li key={index} className="flex gap-4 border-b p-4">
            {/* 프로필 이미지 스켈레톤 */}
            <div className="h-14 w-14 animate-pulse rounded-xl bg-gray-200" />

            <div className="flex flex-1 flex-col gap-2">
              {/* 이름 스켈레톤 */}
              <div className="h-6 w-24 animate-pulse rounded-md bg-gray-200" />

              {/* 마지막 메시지 스켈레톤 */}
              <div className="h-4 w-48 animate-pulse rounded-md bg-gray-200" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
