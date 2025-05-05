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
          onClick={() => changeCenterLocation(center.location)}
        >
          <CenterImage src={center.center_image_url} />
          <div>
            <p>{center.name}</p>
            <p className="text-subText">{center.address}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CenterImage({ src }: { src: string }) {
  if (!src)
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
        <FaLocationDot className="text-white" size={20} />
      </div>
    );
  return (
    <img src={src} alt="헌혈센터 이미지" className="h-12 w-12 rounded-xl" />
  );
}

export default DonationCenterList;
