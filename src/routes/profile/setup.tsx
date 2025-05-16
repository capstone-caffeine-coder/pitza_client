import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/src/components/common/button";
import { FormRow } from "@/src/components/common/form";
import { FileInput } from "@/src/components/common/input";
import Select from "@/src/components/common/select";
import { assetMap } from "@/src/assets";
import { BLOOOD_TYPES } from "@/src/types/donationInfo";

const profileSchema = z.object({
  sex: z.enum(["MALE", "FEMALE"], {
    required_error: "성별을 선택해주세요",
  }),
  blood_type: z.enum(BLOOOD_TYPES as unknown as [string, ...string[]], {
    required_error: "혈액형을 선택해주세요",
    invalid_type_error: "혈액형을 선택해주세요",
  }),
  profile_picture: z
    .instanceof(File, {
      message: "프로필 이미지를 업로드해주세요",
    })
    .nullable(),
  nickname: z
    .string()
    .min(2, "닉네임은 2자 이상이어야 합니다")
    .max(20, "닉네임은 20자 이하여야 합니다")
    .regex(
      /^[가-힣a-zA-Z0-9]+$/,
      "닉네임은 한글, 영문, 숫자만 사용 가능합니다",
    ),
});

type ProfileSetupForm = z.infer<typeof profileSchema>;

export const Route = createFileRoute("/profile/setup")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileSetupForm>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      sex: "MALE",
      blood_type: "A+",
      profile_picture: null,
      nickname: "",
    },
  });

  const profileImage = watch("profile_picture");

  const onSubmit = async (data: ProfileSetupForm) => {
    // TODO: API 호출 구현
    console.log("Form submitted:", data);
  };

  return (
    <main className="container relative mx-auto h-full w-full px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">프로필 설정</h1>

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full max-w-md flex-col items-center justify-center gap-4"
        >
          <FileInput
            onChange={(e) => {
              const file = (e.target as HTMLInputElement).files?.[0];
              if (file) {
                setValue("profile_picture", file, { shouldValidate: true });
              }
            }}
            className="h-36 w-36"
          >
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                alt="프로필 이미지"
                className="flex h-full w-full rounded-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary">
                <div className="flex flex-col items-center justify-center gap-2">
                  <img src={assetMap["characterIcon"]} className="h-24 w-24" />
                </div>
              </div>
            )}
          </FileInput>
          {errors.profile_picture && (
            <p className="text-sm text-red-500">
              {errors.profile_picture.message}
            </p>
          )}

          <FormRow label="닉네임">
            <input
              type="text"
              className="w-full rounded-full bg-primary px-4 py-2 text-white"
              {...register("nickname", { required: true })}
            />
          </FormRow>
          {errors.nickname && (
            <p className="text-sm text-red-500">{errors.nickname.message}</p>
          )}

          <FormRow label="성별">
            <div className="flex gap-6 pl-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="MALE"
                  {...register("sex", { required: true })}
                  className="h-4 w-4 appearance-none rounded border border-gray-400 checked:border-transparent checked:bg-primary"
                />
                남성
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="FEMALE"
                  {...register("sex", { required: true })}
                  className="h-4 w-4 appearance-none rounded border border-gray-400 checked:border-transparent checked:bg-primary"
                />
                여성
              </label>
            </div>
          </FormRow>
          {errors.sex && (
            <p className="text-sm text-red-500">{errors.sex.message}</p>
          )}

          <FormRow label="혈액형">
            <Select
              className="w-1/2 rounded-full bg-primary text-center text-white"
              options={[...BLOOOD_TYPES]}
              placeholder="혈액형을 선택하세요"
              {...register("blood_type", {
                required: true,
                onChange: (e) => {
                  if (e.target.value === "") {
                    setValue("blood_type", "A+", { shouldValidate: true });
                  }
                },
              })}
            />
          </FormRow>
          {errors.blood_type && (
            <p className="text-sm text-red-500">{errors.blood_type.message}</p>
          )}

          <Button
            type="submit"
            variant="default"
            className="mt-10 w-full rounded-full p-6"
          >
            저장하기
          </Button>
        </form>
      </div>
    </main>
  );
}
