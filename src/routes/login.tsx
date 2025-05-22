import { assetMap } from "@/src/assets";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

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
  const kakaoLoginRef = useRef<HTMLAnchorElement>(null);
  function handleKakaoLogin() {
    if (kakaoLoginRef.current) {
      kakaoLoginRef.current.click();
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-4">
      <img
        src={assetMap["characterIcon"]}
        alt="핏자 로고"
        className="mb-4 w-56 animate-fade-up"
      />
      <h1 className="mb-4 text-2xl font-bold">핏자 로그인</h1>
      <img
        src={assetMap["kakao_login"]}
        alt="카카오 로그인"
        className="h-14 cursor-pointer"
        onClick={handleKakaoLogin}
      />
      <a
        href="http://localhost:8000/login/kakao"
        className="hidden"
        ref={kakaoLoginRef}
      ></a>
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
