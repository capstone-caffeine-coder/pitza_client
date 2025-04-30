import Header from "@/src/components/common/header";
import { CenterMap } from "@/src/domains/BloodDonationCenter/components/CenterMap";
import DonationCenterList from "@/src/domains/BloodDonationCenter/components/DonationCenterList";
import LocationProvider from "@/src/domains/BloodDonationCenter/components/LocationProvider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/center")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <Header title="주변 헌혈원 찾기" />
      <LocationProvider>
        <CenterMap />
        <DonationCenterList />
      </LocationProvider>
    </main>
  );
}
