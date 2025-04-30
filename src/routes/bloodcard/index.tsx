import Header from "@/src/components/common/header";
import BloodCardDonates from "@/src/domains/BloodCard/components/bloodCardDonates";
import BloodCardRequests from "@/src/domains/BloodCard/components/bloodCardRequests";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/bloodcard/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [category, setCategory] = useState<"donate" | "request">("donate");

  return (
    <main>
      <Header title="헌혈증 기부/요청" />
      <div className="mt-5 flex gap-5 border-b-2 px-4">
        <p
          className={`text-x cursor-pointer pb-3 ${category === "donate" ? "border-b-4 border-primary text-primary" : ""}`}
          onClick={() => setCategory("donate")}
        >
          헌혈증 기부
        </p>
        <p
          className={`text-x cursor-pointer pb-3 ${category === "request" ? "border-b-4 border-primary text-primary" : ""}`}
          onClick={() => setCategory("request")}
        >
          헌혈증 요청
        </p>
      </div>
      <div className="flex flex-col gap-4 px-4">
        {category === "donate" ? <BloodCardDonates /> : <BloodCardRequests />}
      </div>
    </main>
  );
}
