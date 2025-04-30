import { Spinner } from "@/src/components/common/spinner";
import { getBloodCardRequests } from "@/src/domains/BloodCard/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export default function BloodCardRequests() {
  const {
    error,
    isPending,
    data: bloodCardRequests,
  } = useQuery({
    queryKey: ["bloodCardRequests"],
    queryFn: getBloodCardRequests,
  });
  if (isPending) return <Spinner />;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <div className="mt-6 flex flex-col gap-4">
        {bloodCardRequests.map((card) => (
          <div
            key={card.id}
            className="flex items-center gap-4 rounded-xl border-b p-4"
          >
            <img
              src={card.profile_image}
              alt={`${card.nickname}의 프로필 이미지`}
              className="h-[70px] w-[70px] rounded-full border"
            />
            <div>
              <p>{card.nickname}</p>
              <p className="text-subText">나이 : {card.age}세</p>
              <p className="text-subText">{card.location}</p>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/bloodcard/request/create"
        className="absolute bottom-24 left-0 w-full rounded-xl bg-primary p-4 text-center font-bold text-white"
      >
        헌혈증 요청하기
      </Link>
    </>
  );
}
