import { useDonationCenter } from "@/src/domains/BloodDonationCenter/hooks/useDonationCenter";
import { useLocationContext } from "@/src/domains/BloodDonationCenter/hooks/useLocationContext";
import useKakaoLoader from "@/src/hooks/useKakaoLoader";
import React from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export function CenterMap() {
  useKakaoLoader();
  const mapRef = React.useRef<kakao.maps.Map>(null);
  const { location, focusOnMyLocation, changeCenterLocation } =
    useLocationContext();
  const { centers } = useDonationCenter();

  const handleCenterChange = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      changeCenterLocation({
        latitude: center.getLat(),
        longitude: center.getLng(),
      });
    }
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
        onDragEnd={handleCenterChange}
      >
        {centers?.map((center) => (
          <MapMarker
            position={{
              lat: center.latitude,
              lng: center.longitude,
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
