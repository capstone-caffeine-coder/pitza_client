import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/src/components/common/button";
import { FormError, FormRow } from "@/src/components/common/form";
import Select from "@/src/components/common/select";
import { assetMap } from "@/src/assets";
import { BLOOOD_TYPES } from "@/src/types/donationInfo";
import { useMutation } from "@tanstack/react-query";
import { finishProfileSet } from "@/src/domains/auth/api";
import { useAuthStore } from "@/src/store/authStore";

const profileSchema = z.object({
  sex: z.enum(["M", "F"], {
    required_error: "성별을 선택해주세요",
  }),
  blood_type: z.enum(BLOOOD_TYPES as unknown as [string, ...string[]], {
    required_error: "혈액형을 선택해주세요",
    invalid_type_error: "혈액형을 선택해주세요",
  }),
  birthdate: z
    .string({
      required_error: "생년월일을 입력해주세요",
    })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "올바른 생년월일 형식이 아닙니다"),
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
    formState: { errors },
    watch,
  } = useForm<ProfileSetupForm>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      sex: "M",
      blood_type: "A+",
      birthdate: "",
      nickname: "",
    },
  });
  const navigate = useNavigate();
  const profilePicture = useAuthStore((state) => state.profile_picture);
  const updateUser = useAuthStore((state) => state.updateUser);
  const { mutate: profileSetup, isPending } = useMutation({
    mutationFn: finishProfileSet,
    onSuccess: () => {
      updateUser({
        nickname: watch("nickname"),
        is_profile_complete: true,
      });
      navigate({ to: "/" });
    },
  });

  const onSubmit = async (data: ProfileSetupForm) => {
    profileSetup(data);
  };

  return (
    <main className="container relative mx-auto h-full w-full px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">프로필 설정</h1>

      <div className="flex w-full flex-col items-center justify-center gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full w-full max-w-md flex-col justify-center gap-4"
        >
          <div className="flex h-[150px] w-[150px] items-center justify-center rounded-full bg-primary">
            <div className="flex flex-col items-center justify-center gap-2">
              <img
                src={profilePicture ?? assetMap["characterIcon"]}
                className="h-24 w-24"
              />
            </div>
          </div>

          <FormRow label="닉네임">
            <input
              type="text"
              className="w-full rounded-full bg-primary px-4 py-2 text-white"
              {...register("nickname", { required: true })}
            />
            {errors.nickname?.message && (
              <FormError error={errors.nickname.message} />
            )}
          </FormRow>

          <FormRow label="성별">
            <div className="flex gap-6 pl-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="M"
                  {...register("sex", { required: true })}
                  className="h-4 w-4 appearance-none rounded border border-gray-400 checked:border-transparent checked:bg-primary"
                />
                남성
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="F"
                  {...register("sex", { required: true })}
                  className="h-4 w-4 appearance-none rounded border border-gray-400 checked:border-transparent checked:bg-primary"
                />
                여성
              </label>
            </div>
            {errors.sex?.message && <FormError error={errors.sex.message} />}
          </FormRow>

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
            {errors.blood_type?.message && (
              <FormError error={errors.blood_type.message} />
            )}
          </FormRow>

          <FormRow label="생년월일">
            <input
              type="date"
              className="w-1/2 rounded-full bg-primary px-4 py-2 text-white"
              {...register("birthdate", { required: true })}
            />
            {errors.birthdate?.message && (
              <FormError error={errors.birthdate.message} />
            )}
          </FormRow>

          <Button
            type="submit"
            variant="default"
            className="mt-10 w-full rounded-full p-6"
            disabled={isPending}
          >
            {isPending ? "저장중..." : "저장하기"}
          </Button>
        </form>
      </div>
    </main>
  );
}
