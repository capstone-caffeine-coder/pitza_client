import { Spinner } from "@/src/components/common/spinner";
import { getRecentBloodCard } from "@/src/domains/BloodCard/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

function RecentBloodCard() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["recentBloodCard"],
    queryFn: getRecentBloodCard,
  });

  // isLoading이 true일 때 로딩중 표시
  if (isLoading) {
    return <Spinner />;
  }

  // 에러 발생했을 때
  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div>
      <h1 className="mb-3 text-xl">최근 헌혈증 요청</h1>
      <div className="flex flex-col gap-2">
        {data?.map((card) => (
          <Link
            to={`/bloodcard/request/detail/$postId`}
            params={{ postId: card.id }}
            key={card.id}
            className="flex gap-2 rounded-xl border-2 border-primary p-4"
          >
            <p>{card.nickname}</p>
            <p>{card.age}세,</p>
            <p>{card.bloodType}, </p>
            <p>{card.location}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentBloodCard;
