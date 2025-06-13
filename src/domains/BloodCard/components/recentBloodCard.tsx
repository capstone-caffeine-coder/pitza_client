import { getRecentBloodCard } from "@/src/domains/BloodCard/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

// 스켈레톤 컴포넌트
const RecentBloodCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      {/* 헤더 스켈레톤 */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-32 animate-pulse rounded-md bg-gray-200" />
        <div className="h-6 w-20 animate-pulse rounded-md bg-gray-200" />
      </div>

      {/* 최근 헌혈증 리스트 스켈레톤 */}
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-lg border p-4"
          >
            {/* 헌혈증 아이콘 스켈레톤 */}
            <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200" />

            {/* 헌혈증 정보 스켈레톤 */}
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200" />
              <div className="flex gap-2">
                <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200" />
                <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
              </div>
            </div>

            {/* 화살표 아이콘 스켈레톤 */}
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200" />
          </div>
        ))}
      </div>

      {/* 더보기 버튼 스켈레톤 */}
      <div className="flex justify-center">
        <div className="h-10 w-32 animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

const RecentBloodCard = () => {
  const { data, error, isPending } = useQuery({
    queryKey: ["recentBloodCards"],
    queryFn: getRecentBloodCard,
  });

  if (isPending) return <RecentBloodCardSkeleton />;
  if (error) return null;

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">최근 헌혈증</h2>
        <span className="text-sm text-gray-500">최근 {data?.length}개</span>
      </div>

      <div className="flex flex-col gap-4">
        {data?.map((card) => (
          <Link
            to="/bloodcard/donations/detail/$postId"
            params={{ postId: card.id.toString() }}
            key={card.id}
          >
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <span className="text-xl text-white">{card.blood_type}</span>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <h3 className="text-lg font-semibold">{card.donor_username}</h3>
                <div className="flex gap-2 text-sm text-gray-600">
                  <span>{card.age}세</span>
                  <span>{card.region}</span>
                </div>
              </div>

              <div className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          to="/bloodcard"
          className="hover:bg-primary/90 rounded-full bg-primary px-6 py-2 text-white"
        >
          더보기
        </Link>
      </div>
    </div>
  );
};

export default RecentBloodCard;
