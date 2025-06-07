import { assetMap } from "@/src/assets";
import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const kakaoLoginRef = useRef<HTMLAnchorElement>(null);
  function handleKakaoLogin() {
    if (kakaoLoginRef.current) {
      kakaoLoginRef.current.click();
    }
  }

  const googleLoginRef = useRef<HTMLAnchorElement>(null);
  function handleGoogleLogin() {
    if (googleLoginRef.current) {
      googleLoginRef.current.click();
    }
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-5 p-4">
      <img
        src={assetMap["characterIcon"]}
        alt="핏자 로고"
        className="mb-4 w-56 animate-fade-up"
      />
      <h1 className="mb-4 text-2xl font-bold">핏자 로그인</h1>
      <img
        src={assetMap["kakao_login"]}
        alt="카카오 로그인"
        className="h-[45px] cursor-pointer"
        onClick={handleKakaoLogin}
      />
      <a
        href="http://localhost:8000/login/kakao"
        className="hidden"
        ref={kakaoLoginRef}
      ></a>
      <img
        src={"/src/assets/google.svg"}
        alt="구글 로그인"
        className="h-[45px] w-[300px] cursor-pointer"
        onClick={handleGoogleLogin}
      />
      <a
        href="http://localhost:8000/login/google"
        className="hidden"
        ref={googleLoginRef}
      ></a>
    </div>
  );
}
