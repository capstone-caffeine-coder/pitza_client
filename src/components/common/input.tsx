import { cn } from "@/src/utils/cn";
import { HTMLAttributes, useRef } from "react";

export function FileInput({
  className,
  children,
  onChange,
  ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  onChange?: HTMLAttributes<HTMLInputElement>["onChange"];
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div
      className={cn("relative h-96 max-h-96 w-full self-center", className)}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      {children}

      <button
        type="button"
        onClick={handleButtonClick}
        className="absolute left-0 top-0 h-full w-full bg-transparent"
      ></button>
    </div>
  );
}
