import { assetMap } from "@/src/assets";
import { Link } from "@tanstack/react-router";

const NotFoundComponent = () => (
  <div className="flex h-full w-full flex-col items-center justify-center p-4">
    <img src={assetMap[404]} alt="에러 안내 사진" className="w-full" />
    <Link
      className="w-full rounded-xl bg-primary p-4 text-center text-lg text-white"
      type="button"
      to="/"
    >
      홈으로
    </Link>
  </div>
);

const ErrorComponent = () => (
  <div className="flex h-full w-full flex-col items-center justify-center p-4">
    <img src={assetMap["error"]} alt="에러 안내 사진" className="w-full" />
    <Link
      className="w-full rounded-xl bg-primary p-4 text-center text-lg text-white"
      type="button"
      to="/"
    >
      홈으로
    </Link>
  </div>
);

export { NotFoundComponent, ErrorComponent };
