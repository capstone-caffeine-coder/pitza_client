import { useRouter } from "@tanstack/react-router";
import { forwardRef } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";

const Header = forwardRef<
  HTMLHeadingElement,
  React.ComponentProps<"header"> & { title: string }
>(({ title, ...props }, ref) => {
  const { history } = useRouter();

  return (
    <header
      className={twMerge("relative p-4 text-center")}
      {...props}
      ref={ref}
    >
      {history.canGoBack() && (
        <FaChevronLeft
          className="absolute left-4 top-5 cursor-pointer"
          size={20}
          onClick={() => history.back()}
        />
      )}
      <span className="text-bold text-xl">{title}</span>
    </header>
  );
});
Header.displayName = "Header";
export default Header;
