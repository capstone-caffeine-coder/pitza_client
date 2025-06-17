import { assetMap } from "@/src/assets";
import { Spinner } from "@/src/components/common/spinner";
import { getBloodCardDonates } from "@/src/domains/BloodCard/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

function BloodCardDonates() {
  const {
    error,
    isPending,
    data: bloodCardRequests,
  } = useQuery({
    queryKey: ["bloodCardDonates"],
    queryFn: getBloodCardDonates,
  });
  if (isPending) return <Spinner />;
  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <>
      <div className="mt-6 flex flex-col gap-4">
        {bloodCardRequests.map((card) => (
          <Link
            to={"/bloodcard/donations/detail/$postId"}
            params={{ postId: card.id.toString() }}
            key={card.id}
            className="flex items-center gap-4 rounded-xl border-b p-4"
          >
            <img
              src={card.donor_profile_image ?? assetMap["characterIcon"]}
              alt={`${card.nickname}의 프로필 이미지`}
              className="h-[70px] w-[70px] rounded-full border object-contain"
            />
            <div>
              <p>{card.donor_username}</p>
              <p className="text-subText">나이 : {card.age}세</p>
              <p className="text-subText">{card.region}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        to="/bloodcard/donations/create"
        className="absolute bottom-24 left-0 w-full rounded-xl bg-primary p-4 text-center font-bold text-white"
      >
        헌혈증 기부하기
      </Link>
    </>
  );
}

export default BloodCardDonates;
