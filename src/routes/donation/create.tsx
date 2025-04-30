import { Box } from "@/src/components/common/box";
import { Button } from "@/src/components/common/button";
import { FormRow } from "@/src/components/common/form";
import Header from "@/src/components/common/header";
import Select from "@/src/components/common/select";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/donation/create")({
  component: RouteComponent,
});

interface CreateDonationRequest {
  bloodType:
    | "Rh+A"
    | "Rh-A"
    | "Rh+B"
    | "Rh-B"
    | "Rh+O"
    | "Rh-O"
    | "Rh+AB"
    | "Rh-AB";
  age: number;
  gender: "MALE" | "FEMALE";
  location: string;
  deadline: Date;
  story: string;
}

const REGIONS = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

function RouteComponent() {
  const { register, handleSubmit } = useForm<CreateDonationRequest>({
    defaultValues: {
      bloodType: "Rh+A",
      age: 0,
      gender: "MALE",
      location: "",
      deadline: new Date(),
      story: "",
    },
  });

  const onSubmit = (data: CreateDonationRequest) => {
    console.log("🩸 Submitted donation request:", data);
  };

  return (
    <main className="p-4">
      <Header title="지정헌혈 등록하기" />
      <Box withIcon>
        지정헌혈을 등록하고
        <br />
        사용자에게 헌혈을 요청해보세요.
      </Box>

      <div className="flex w-full animate-fade-up items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex w-full max-w-md flex-col gap-4"
        >
          {/* 혈액형 */}
          <FormRow label="혈액형">
            <Select
              className="w-1/2 rounded-full bg-primary text-center"
              options={[
                "Rh+A",
                "Rh-A",
                "Rh+B",
                "Rh-B",
                "Rh+O",
                "Rh-O",
                "Rh+AB",
                "Rh-AB",
              ]}
              placeholder="혈액형을 선택하세요"
              {...register("bloodType")}
            />
          </FormRow>

          {/* 나이 */}
          <FormRow label="나이">
            <input
              type="number"
              className="w-1/2 rounded-full bg-primary px-3 py-2"
              max={100}
              min={0}
              {...register("age", { valueAsNumber: true })}
            />
          </FormRow>

          {/* 성별 */}
          <FormRow label="성별">
            <div className="flex gap-6 pl-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="FEMALE"
                  {...register("gender")}
                  className="h-4 w-4 appearance-none rounded border border-gray-400 checked:border-transparent checked:bg-primary"
                />
                여성
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="MALE"
                  {...register("gender")}
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

          {/* 수혈 필요 날짜 */}
          <FormRow label="수혈 필요 날짜">
            <input
              type="date"
              className="w-1/2 rounded-full border bg-primary px-4 py-2"
              {...register("deadline", { valueAsDate: true })}
            />
          </FormRow>
          <FormRow label="사연">
            <textarea
              className="w-full resize-none overflow-hidden rounded-xl border-2 border-primary p-2"
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
              {...register("story")}
            />
          </FormRow>

          <Button type="submit" variant={"default"}>
            등록하기
          </Button>
        </form>
      </div>
    </main>
  );
}
