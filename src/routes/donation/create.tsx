import { Box } from "@/src/components/common/box";
import { Button } from "@/src/components/common/button";
import { FormRow } from "@/src/components/common/form";
import Header from "@/src/components/common/header";
import { FileInput } from "@/src/components/common/input";
import Select from "@/src/components/common/select";
import { SpinnerModal } from "@/src/components/common/spinner";
import { REGIONS } from "@/src/constants/form";
import { createBloodDonationRequest } from "@/src/domains/BloodDonate/api";
import { CreateDonation } from "@/src/domains/BloodDonate/types";
import { BLOOOD_TYPES } from "@/src/types/donationInfo";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { IoMdCamera } from "react-icons/io";

export const Route = createFileRoute("/donation/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm<CreateDonation>({
    defaultValues: {
      bloodType: "A+",
      age: 0,
      gender: "MALE",
      location: "서울특별시",
      deadline: new Date(),
      story: "",
      image: undefined,
    },
  });
  const { isPending, mutate: createRequest } = useMutation({
    mutationFn: createBloodDonationRequest,
    onSuccess: (data) =>
      navigate({
        to: "/donation/request/$requestId",
        params: { requestId: data.id },
      }),
  });
  const donateImage = watch("image");

  const onSubmit = (data: CreateDonation) => {
    createRequest(data);
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
              className="w-1/2 rounded-full bg-primary text-center text-white"
              options={[...BLOOOD_TYPES]}
              placeholder="혈액형을 선택하세요"
              value={watch("bloodType")}
              {...register("bloodType")}
            />
          </FormRow>

          {/* 나이 */}
          <FormRow label="나이">
            <input
              type="number"
              className="w-1/2 rounded-full bg-primary px-3 py-2 text-center text-white"
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
              className="w-1/2 rounded-full border bg-primary px-4 py-2 text-white"
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
      {isPending && <SpinnerModal />}
    </main>
  );
}
