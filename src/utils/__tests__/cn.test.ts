import { describe, it, expect } from "@jest/globals";
import { cn } from "../cn";

describe("cn 유틸리티 함수", () => {
  it("기본 클래스를 병합할 수 있어야 합니다", () => {
    expect(cn("px-2 py-1", "bg-red-500")).toBe("px-2 py-1 bg-red-500");
  });

  it("중복되는 클래스를 올바르게 처리해야 합니다", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });

  it("조건부 클래스를 처리할 수 있어야 합니다", () => {
    const isActive = true;
    expect(cn("base-class", isActive && "active-class")).toBe(
      "base-class active-class",
    );
    expect(cn("base-class", !isActive && "inactive-class")).toBe("base-class");
  });

  it("객체 형태의 클래스를 처리할 수 있어야 합니다", () => {
    expect(cn({ "bg-red-500": true, "text-white": false })).toBe("bg-red-500");
  });

  it("여러 타입의 인자를 혼합해서 사용할 수 있어야 합니다", () => {
    const isActive = true;
    expect(
      cn(
        "base-class",
        isActive && "active-class",
        { "conditional-class": true },
        "additional-class",
      ),
    ).toBe("base-class active-class conditional-class additional-class");
  });

  it("undefined나 null 값을 무시해야 합니다", () => {
    expect(cn("base-class", undefined, null)).toBe("base-class");
  });
});
