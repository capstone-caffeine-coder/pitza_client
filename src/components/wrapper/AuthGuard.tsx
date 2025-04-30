import { useAuthStore } from "@/src/store/authStore";
import React, { useEffect } from "react";

// HOC 정의
export default function authGuard<T extends object>(
  Component: React.ComponentType<T>,
): React.FC<T> {
  return function AuthenticatedComponent(props: T) {
    const status = useAuthStore((state) => state.status);

    useEffect(() => {
      if (status === "LOGGED_OUT") {
        window.location.href = "/login";
      }
    }, [status]);

    return status === "LOGGED_IN" ? <Component {...props} /> : null;
  };
}
