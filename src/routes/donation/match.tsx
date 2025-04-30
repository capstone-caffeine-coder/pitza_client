import { Box } from "@/src/components/common/box";
import { Button } from "@/src/components/common/button";
import Header from "@/src/components/common/header";
import Select from "@/src/components/common/select";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/donation/match")({
  component: RouteComponent,
});

interface MatchRequest {
  bloodType:
    | "Rh+A"
    | "Rh-A"
    | "Rh+B"
    | "Rh-B"
    | "Rh+O"
    | "Rh-O"
    | "Rh+AB"
    | "Rh-AB";
  age: (typeof AGE)[number];
  gender: "MALE" | "FEMALE";
  location: (typeof REGIONS)[number];
}

const AGE = ["10", "20", "30", "40", "50", "60"] as const;

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
] as const;

function RouteComponent() {
  const { register, handleSubmit } = useForm<MatchRequest>({
    defaultValues: {
      bloodType: "Rh+A",
      age: "10",
      gender: "MALE",
      location: "서울특별시",
    },
  });

  const onSubmit = (data: MatchRequest) => {
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

          <Button type="submit" variant={"default"}>
            매칭하기
          </Button>
        </form>
      </div>
    </main>
  );
}

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="w-24 text-center font-medium">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
}
