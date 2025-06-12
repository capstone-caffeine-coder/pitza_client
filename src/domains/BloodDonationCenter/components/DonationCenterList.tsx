import { Spinner } from "@/src/components/common/spinner";
import { useDonationCenter } from "@/src/domains/BloodDonationCenter/hooks/useDonationCenter";
import { useLocationContext } from "@/src/domains/BloodDonationCenter/hooks/useLocationContext";
import { FaLocationDot } from "react-icons/fa6";

function DonationCenterList() {
  const { centers, error, isPending } = useDonationCenter();
  const { changeCenterLocation } = useLocationContext();

  if (error) return null;
  if (isPending) return <Spinner />;
  return (
    <div>
      {centers?.map((center) => (
        <div
          key={`center-${center.id}`}
          className="flex cursor-pointer items-center gap-2 p-4"
          onClick={() =>
            changeCenterLocation({
              latitude: center.latitude,
              longitude: center.longitude,
            })
          }
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <FaLocationDot className="text-white" size={20} />
          </div>
          <div>
            <p>{center.name}</p>
            <p className="text-subText">{center.address}</p>
          </div>
        </div>
      ))}
      {centers?.length === 0 && (
        <div className="flex h-[200px] w-full items-center justify-center">
          <p className="text-lg text-subText">근처 헌혈센터가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export default DonationCenterList;
