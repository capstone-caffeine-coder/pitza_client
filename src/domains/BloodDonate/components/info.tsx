import { Badge } from "@/src/components/common/badge";

const Info = ({ field, value }: { field: string; value: string }) => (
  <div className="flex w-full items-center justify-center">
    <p className="w-[100px] text-center">{field}</p>
    <span className="h-5 w-1 border-l-2 border-subText"></span>
    <div className="flex-1 px-4 py-2">
      <Badge>{value}</Badge>
    </div>
  </div>
);

export { Info };
