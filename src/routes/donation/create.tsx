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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoMdCamera } from "react-icons/io";

// Zod 스키마 정의
const createDonationSchema = z.object({
  blood_type: z.string().min(1, "혈액형을 선택해주세요"),
  age: z
    .number()
    .min(16, "나이는 16세 이상이어야 합니다")
    .max(100, "나이는 100세 이하여야 합니다"),
  sex: z.enum(["M", "F"], {
    errorMap: () => ({ message: "성별을 선택해주세요" }),
  }),
  location: z.string().min(1, "지역을 선택해주세요"),
  content: z.string().min(1, "사연을 입력해주세요"),
  image: z.instanceof(File, { message: "이미지를 업로드해주세요" }), // 필수로 변경
  donator_registered_id: z
    .string()
    .regex(
      /^\d{6}-\d{4}$/,
      "등록번호는 6자리-4자리 숫자 형식이어야 합니다 (예: 123456-7890)",
    ),
  donation_due_date: z.date({
    errorMap: () => ({ message: "수혈 필요 날짜를 선택해주세요" }),
  }),
  name: z.string().min(1, "이름을 입력해주세요"),
  requester: z.number(),
});

export const Route = createFileRoute("/donation/create")({
  component: RouteComponent,
});

// 등록번호 포맷팅 함수
const formatRegisterId = (value: string) => {
  // 숫자만 추출
  const numbers = value.replace(/\D/g, "");

  const limitedNumbers = numbers.slice(0, 10);

  if (limitedNumbers.length <= 6) {
    return limitedNumbers;
  } else {
    return `${limitedNumbers.slice(0, 6)}-${limitedNumbers.slice(6)}`;
  }
};

function RouteComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    trigger,
  } = useForm<CreateDonation>({
    resolver: zodResolver(createDonationSchema),
    mode: "onChange", // 실시간 유효성 검사
    defaultValues: {
      blood_type: "A+",
      age: 16,
      sex: "M",
      location: "서울특별시",
      content: "",
      image: undefined,
      donator_registered_id: "",
      donation_due_date: new Date(),
      name: "민수",
      requester: 1,
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
    // donator_registered_id는 이미 포맷팅된 상태로 전송
    createRequest(data);
  };

  return (
    <>
      <Header title="지정헌혈 등록하기" />
      <main className="p-4">
        <Box withIcon>
          지정헌혈을 등록하고
          <br />
          사용자에게 헌혈을 요청해보세요.
        </Box>

        <div className="w-full animate-fade-up items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="min-w-md mt-6 flex w-full flex-col gap-4"
          >
            {/* 이미지 - 필수 */}
            <div>
              <FileInput
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files?.[0];
                  if (file) {
                    setValue("image", file);
                    clearErrors("image");
                    trigger("image"); // 즉시 유효성 검사
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
                  <div
                    className={`flex h-full w-full items-center justify-center rounded-xl ${
                      errors.image ? "bg-red-500" : "bg-primary"
                    }`}
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <IoMdCamera size={30} className="text-white" />
                      <p className="text-white">
                        {errors.image
                          ? "이미지 업로드 필수!"
                          : "이미지를 업로드 해주세요"}
                      </p>
                    </div>
                  </div>
                )}
              </FileInput>
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.image.message}
                </p>
              )}
            </div>

            {/* 혈액형 */}
            <div>
              <FormRow label="혈액형">
                <Select
                  className="w-1/2 rounded-full bg-primary text-center text-white"
                  options={[...BLOOOD_TYPES]}
                  placeholder="혈액형을 선택하세요"
                  value={watch("blood_type")}
                  {...register("blood_type")}
                />
              </FormRow>
              {errors.blood_type && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.blood_type.message}
                </p>
              )}
            </div>

            {/* 나이 */}
            <div>
              <FormRow label="나이">
                <input
                  type="number"
                  className={`w-1/2 rounded-full bg-primary px-3 py-2 text-center text-white ${
                    errors.age ? "border-2 border-red-500" : ""
                  }`}
                  max={100}
                  min={16}
                  {...register("age", { valueAsNumber: true })}
                />
              </FormRow>
              {errors.age && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.age.message}
                </p>
              )}
            </div>

            {/* 성별 */}
            <div>
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
              {errors.sex && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.sex.message}
                </p>
              )}
            </div>

            {/* 지역 */}
            <div>
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
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* 수혈 필요 날짜 */}
            <div>
              <FormRow label="수혈 필요 날짜">
                <input
                  type="date"
                  className={`w-1/2 rounded-full border bg-primary px-4 py-2 text-white ${
                    errors.donation_due_date ? "border-2 border-red-500" : ""
                  }`}
                  {...register("donation_due_date", { valueAsDate: true })}
                />
              </FormRow>
              {errors.donation_due_date && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.donation_due_date.message}
                </p>
              )}
            </div>

            {/* 사연 */}
            <div>
              <FormRow label="사연">
                <textarea
                  className={`w-full resize-none overflow-hidden rounded-xl border-2 border-primary p-2 ${
                    errors.content ? "border-red-500" : ""
                  }`}
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                  {...register("content")}
                />
              </FormRow>
              {errors.content && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* 등록번호 */}
            <div>
              <FormRow label="등록번호">
                <input
                  className={`w-3/4 resize-none overflow-hidden rounded-xl border-2 border-primary p-2 ${
                    errors.donator_registered_id ? "border-red-500" : ""
                  }`}
                  placeholder="123456-789"
                  onChange={(e) => {
                    const formatted = formatRegisterId(e.target.value);
                    setValue("donator_registered_id", formatted);
                    trigger("donator_registered_id"); // 즉시 유효성 검사
                  }}
                  value={watch("donator_registered_id")}
                />
              </FormRow>
              {errors.donator_registered_id && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.donator_registered_id.message}
                </p>
              )}
            </div>

            <Button type="submit" variant={"default"}>
              등록하기
            </Button>
          </form>
        </div>
        {isPending && <SpinnerModal />}
      </main>
    </>
  );
}
