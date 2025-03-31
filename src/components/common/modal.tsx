import React, { HtmlHTMLAttributes } from "react";

const Modal = ({
  children,
  ...props
}: { children: React.ReactNode } & HtmlHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50">
      <div className="w-[90%]" {...props}>
        {children}
      </div>
    </div>
  );
};
export { Modal };
