import { DonationCenterContext } from "@/src/domains/BloodDonationCenter/components/DonationCenterProvider";
import { useContext } from "react";

function useDonationCenter() {
  const context = useContext(DonationCenterContext);
  if (!context) {
    throw new Error(
      "useDonationCenter must be used within a DonationCenterProvider",
    );
  }
  return context;
}

export { useDonationCenter };
