import { Button } from "@/src/components/common/button";
import { FormRow } from "@/src/components/common/form";
import Header from "@/src/components/common/header";
import { FileInput } from "@/src/components/common/input";
import Select from "@/src/components/common/select";
import { REGIONS } from "@/src/constants/form";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { IoMdCamera } from "react-icons/io";

export const Route = createFileRoute("/bloodcard/request/create")({
  component: RouteComponent,
});

type CreateDonation = {
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
  location: (typeof REGIONS)[number];
  story: string;
  deadline: Date;
  image?: File;
};
function RouteComponent() {
  const { register, handleSubmit, setValue, watch } = useForm<CreateDonation>({
    defaultValues: {
      bloodType: "Rh+A",
      age: 0,
      gender: "MALE",
      location: "강원특별자치도",
      deadline: new Date(),
      story: "",
      image: undefined,
    },
    mode: "onChange",
  });
  const donateImage = watch("image");

  const onSubmit = (data: CreateDonation) => {
    console.log("🩸 Submitted donation request:", data);
  };

  return (
    <main>
      <Header title="헌혈증 기부글 작성" />
      <div className="flex w-full animate-fade-up items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex w-full flex-col gap-4 p-8"
        >
          {/* 헌혈증 이미지 */}
          <FileInput
            onChange={(e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                setValue("image", file);
              }
            }}
          >
            {donateImage ? (
              <img
                src={URL.createObjectURL(donateImage)}
                alt="헌혈증 이미지"
                className="flex h-full w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-primary">
                <div className="flex flex-col items-center justify-center gap-2">
                  <IoMdCamera size={30} className="text-white" />
                  <p className="text-white">이미지를 업로드 해주세요</p>
                </div>
              </div>
            )}
          </FileInput>
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
          {/* <FormRow label="나이">
            <input
              type="number"
              className="w-1/2 rounded-full bg-primary px-3 py-2"
              max={100}
              min={0}
              {...register("age", { valueAsNumber: true })}
            />
          </FormRow> */}

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
          <FormRow label="헌혈증 사연">
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
