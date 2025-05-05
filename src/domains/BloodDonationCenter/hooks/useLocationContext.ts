import { createContext, useContext } from "react";

type LocationProvider = {
  location: {
    latitude: number;
    longitude: number;
  };
  changeCenterLocation: ({
    longitude,
    latitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
  focusOnMyLocation: () => void;
};
const LocationContext = createContext<LocationProvider | null>(null);

function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider",
    );
  }
  return context;
}

export { useLocationContext, LocationContext };
