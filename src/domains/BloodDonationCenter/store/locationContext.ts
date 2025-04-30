import { createContext, useContext } from "react";

type LocationProvider = {
  location: {
    latitude: number;
    longitude: number;
  };
  changeCenterLocation: (latitude: number, longitude: number) => void;
};
const LocationContext = createContext<LocationProvider>({
  location: {
    latitude: 126.570667,
    longitude: 33.450701,
  },
  changeCenterLocation: () => {},
});

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
