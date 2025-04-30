import { assetMap } from "@/src/assets";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Box({
  withIcon,
  ...props
}: { withIcon: boolean } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="box flex items-center justify-center gap-5 p-4">
      {withIcon && (
        <img
          src={assetMap["characterIcon"]}
          alt="characte"
          className="h-28 w-28"
        />
      )}
      <div className={twMerge("", props.className)}>{props.children}</div>
    </div>
  );
}
