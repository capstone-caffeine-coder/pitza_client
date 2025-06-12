import { getBloodDonationCenters } from "@/src/domains/BloodDonationCenter/api";
import { useLocationContext } from "@/src/domains/BloodDonationCenter/hooks/useLocationContext";
import { BloodDonationCenter } from "@/src/domains/BloodDonationCenter/types";
import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect } from "react";

type DonationCenterContextType = {
  centers: BloodDonationCenter[] | null;
  error?: Error | null;
  isPending?: boolean;
};

const DonationCenterContext = createContext<DonationCenterContextType | null>(
  null,
);

function DonationCenterProvider({ children }: { children: React.ReactNode }) {
  const { location } = useLocationContext();
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ["donationCenter", location.latitude, location.longitude],
    queryFn: () =>
      getBloodDonationCenters({
        latitude: location.latitude,
        longitude: location.longitude,
      }),
  });

  useEffect(() => {
    if (location) {
      refetch();
    }
  }, [location.latitude, location.longitude, location, refetch]);
  return (
    <DonationCenterContext.Provider
      value={{ centers: data ?? [], error, isPending }}
    >
      {children}
    </DonationCenterContext.Provider>
  );
}

export { DonationCenterProvider, DonationCenterContext };
