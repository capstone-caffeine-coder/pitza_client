import { LocationContext } from "@/src/domains/BloodDonationCenter/hooks/useLocationContext";
import useGeoLocation from "@/src/hooks/useGeoLocation";

function LocationProvider({ children }: { children: React.ReactNode }) {
  const { location, setLocation, focusOnMyLocation } = useGeoLocation();

  const changeCenterLocation = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    setLocation({ latitude, longitude });
  };

  return (
    <LocationContext.Provider
      value={{ location, changeCenterLocation, focusOnMyLocation }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
