import { assetMap } from "@/src/assets";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

// type LoginForm = {
//   email: string;
//   password: string;
// };

function RouteComponent() {
  // const { register, handleSubmit } = useForm<LoginForm>();

  // const onSubmit = (data: LoginForm) => {
  //   console.log("로그인 시도:", data);
  // };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <img
        src={assetMap["characterIcon"]}
        alt="핏자 로고"
        className="animate-fade-up mb-4 h-56 w-56"
      />
      <h1 className="mb-4 text-2xl font-bold">핏자 로그인</h1>
      <img src={assetMap["kakao_login"]} alt="카카오 로그인" className="h-14" />
      {/* <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <input
          type="email"
          placeholder="이메일"
          {...register("email", { required: true })}
          className="rounded border p-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", { required: true })}
          className="rounded border p-2"
        />
        <Button
          type="submit"
          className="rounded p-2 text-white hover:bg-blue-600"
        >
          로그인
        </Button>
      </form> */}
    </div>
  );
}
