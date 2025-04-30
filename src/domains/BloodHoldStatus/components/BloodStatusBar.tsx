import { useEffect, useState } from "react";

function BloodStatusBar({
  blood,
  current,
  total,
}: {
  blood: "A" | "B" | "AB" | "O";
  current: number;
  total: number;
}) {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const newPercentage = Math.floor((current / total) * 100);
    setPercentage(newPercentage);
  }, [percentage, current, total]);

  return (
    <div className="relative flex items-center gap-3">
      <span>{blood}</span>
      <div className="relative h-4 flex-1 rounded-xl border">
        <div
          className={`"absolute left-0 top-0 h-4 rounded-xl bg-primary transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export { BloodStatusBar };
