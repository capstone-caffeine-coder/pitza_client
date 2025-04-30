import { LocationContext } from "@/src/domains/BloodDonationCenter/store/locationContext";
import useGeoLocation from "@/src/hooks/useGeoLocation";

function LocationProvider({ children }: { children: React.ReactNode }) {
  const { location, setLocation } = useGeoLocation();

  const changeCenterLocation = (latitude: number, longitude: number) => {
    setLocation({ latitude, longitude });
  };

  return (
    <LocationContext.Provider value={{ location, changeCenterLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export default LocationProvider;
