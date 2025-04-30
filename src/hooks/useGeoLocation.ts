import { useEffect, useState } from "react";

function useGeoLocation() {
  const [location, setLocation] = useState<{
    longitude: number;
    latitude: number;
  }>({
    latitude: 33.450701,
    longitude: 126.570667,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
        setError(null);
      },
      (err) => {
        setError(err.message);
      },
    );

    console.log(location);
  }, []);

  return { location, error, setLocation };
}

export default useGeoLocation;
