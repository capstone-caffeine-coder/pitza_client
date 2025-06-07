import { Box } from "@/src/components/common/box";
import { Button } from "@/src/components/common/button";
import { FormRow } from "@/src/components/common/form";
import Header from "@/src/components/common/header";
import Select from "@/src/components/common/select";
import {
  bloodDontationMatch,
  matchAccept,
} from "@/src/domains/BloodDonate/api";
import MatchPending from "@/src/domains/BloodDonate/components/matchPending";
import { MatchRequest } from "@/src/domains/BloodDonate/types";
import { AGE, BLOOOD_TYPES, REGIONS } from "@/src/types/donationInfo";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/donation/match/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { register, handleSubmit, watch } = useForm<MatchRequest>({
    defaultValues: {
      id: Math.floor(Math.random() * 100),
      blood_type: "A+",
      age: "10",
      sex: "M",
      location: "서울특별시",
      next_donation_date: new Date(),
    },
  });
  const { navigate } = useRouter();
  const { isPending, mutate: donationMatch } = useMutation({
    mutationFn: bloodDontationMatch,
    onSuccess: (data, req) => {
      navigate({
        to: "/donation/match/$requestId",
        params: { requestId: data.id },
        state: {
          matchData: req,
        },
      });
    },
  });

  const onSubmit = (data: MatchRequest) => {
    donationMatch(data);
  };

  if (isPending) return <MatchPending />;

  return (
    <main className="p-4">
      <Header title="지정헌혈 매칭하기" />
      <Box withIcon>지정헌혈 하고 싶은 사람만 볼 수 있도록 도와드릴게요</Box>

      <div className="flex w-full animate-fade-up items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex w-full max-w-md flex-col gap-4"
        >
          {/* 혈액형 */}
          <FormRow label="혈액형">
            <Select
              className="w-1/2 rounded-full bg-primary text-center text-white"
              options={[...BLOOOD_TYPES]}
              placeholder="혈액형을 선택하세요"
              {...register("blood_type")}
            />
          </FormRow>

          {/* 나이 */}
          <FormRow label="나이">
            <div className="flex w-full flex-wrap gap-2">
              {AGE.map((age) => (
                <label key={age}>
                  <input
                    type="radio"
                    value={age}
                    {...register("age")}
                    className="peer hidden"
                  />
                  <div className="cursor-pointer rounded border px-4 py-1 text-center peer-checked:bg-primary peer-checked:text-white">
                    {age}
                    {age === "60" ? "대 이상" : "대"}
                  </div>
                </label>
              ))}
            </div>
          </FormRow>

          {/* 성별 */}
          <FormRow label="성별">
            <div className="flex gap-6 pl-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="F"
                  {...register("sex")}
                  className="h-4 w-4 appearance-none rounded border border-gray-400 checked:border-transparent checked:bg-primary"
                />
                여성
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="M"
                  {...register("sex")}
                  className="h-4 w-4 appearance-none rounded border border-gray-400 checked:border-transparent checked:bg-primary"
                />
                남성
              </label>
            </div>
          </FormRow>

          {/* 지역 */}
          <FormRow label="지역">
            <div className="grid w-full grid-cols-3 gap-2">
              {REGIONS.map((region) => (
                <label key={region}>
                  <input
                    type="radio"
                    value={region}
                    {...register("location")}
                    className="peer hidden"
                  />
                  <div className="cursor-pointer rounded border py-1 text-center peer-checked:bg-primary peer-checked:text-white">
                    {region}
                  </div>
                </label>
              ))}
            </div>
          </FormRow>
          {/* 가능 날짜 */}
          <FormRow label="수혈 필요 날짜">
            <input
              type="date"
              className="w-1/2 rounded-full border bg-primary px-4 py-2"
              value={
                watch("next_donation_date")?.toISOString().split("T")[0] ||
                new Date().toISOString().split("T")[0]
              }
              {...register("next_donation_date", { valueAsDate: true })}
            />
          </FormRow>

          <Button type="submit" variant={"default"}>
            매칭하기
          </Button>
        </form>
      </div>
    </main>
  );
}
