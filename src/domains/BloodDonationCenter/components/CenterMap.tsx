import { useDonationCenter } from "@/src/domains/BloodDonationCenter/hooks/useDonationCenter";
import { useLocationContext } from "@/src/domains/BloodDonationCenter/hooks/useLocationContext";
import useKakaoLoader from "@/src/hooks/useKakaoLoader";
import React from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export function CenterMap() {
  useKakaoLoader();
  const mapRef = React.useRef<kakao.maps.Map>(null);
  const { location, focusOnMyLocation } = useLocationContext();
  const { centers } = useDonationCenter();

  const handleCenterToCurrentLocation = async () => {
    setTimeout(() => {
      if (mapRef.current && location) {
        const latLng = new kakao.maps.LatLng(
          location.latitude,
          location.longitude,
        );
        mapRef.current.panTo(latLng);
      }
    }, 500);
  };

  return (
    <div className="relative h-96 w-full">
      <Map
        ref={mapRef}
        center={{
          lat: location?.latitude ?? 33.450701,
          lng: location?.longitude ?? 126.570667,
        }}
        isPanto={true}
        level={3}
        className="h-full w-full"
      >
        {centers?.map((center) => (
          <MapMarker
            position={{
              lat: center.location.latitude,
              lng: center.location.longitude,
            }}
          />
        ))}
      </Map>
      <div
        className="absolute bottom-4 right-4 z-50 cursor-pointer rounded-full bg-white p-2 shadow hover:bg-pink-200"
        onClick={focusOnMyLocation}
      >
        <FaLocationCrosshairs size={20} />
      </div>
    </div>
  );
}
