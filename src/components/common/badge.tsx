import { cn } from "@/src/utils/cn";
import { forwardRef, HTMLAttributes } from "react";

const Badge = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, children, ...props }, ref) => (
    <span
      className={cn(
        "flex w-[150px] items-center justify-center rounded-full bg-accent p-2 text-sm font-bold text-white",
        className,
      )}
      {...props}
      ref={ref}
    >
      {children}
    </span>
  ),
);
Badge.displayName = "Badge";

export { Badge };
