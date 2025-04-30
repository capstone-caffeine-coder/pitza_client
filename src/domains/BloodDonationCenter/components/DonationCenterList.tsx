import { Spinner } from "@/src/components/common/spinner";
import { getBloodDonationCenters } from "@/src/domains/BloodDonationCenter/api";
import { useLocationContext } from "@/src/domains/BloodDonationCenter/store/locationContext";
import { useQuery } from "@tanstack/react-query";
import { FaLocationDot } from "react-icons/fa6";

function DonationCenterList() {
  const { location } = useLocationContext();
  const { data, error, isPending } = useQuery({
    queryKey: ["donationCenter", location.latitude, location.longitude],
    queryFn: () =>
      getBloodDonationCenters({
        latitude: location.latitude,
        longitude: location.longitude,
      }),
  });
  if (error) return null;
  if (isPending) return <Spinner />;
  return (
    <div>
      {data?.map((center) => (
        <div
          key={`center-${center.id}`}
          className="flex items-center gap-2 p-4"
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
