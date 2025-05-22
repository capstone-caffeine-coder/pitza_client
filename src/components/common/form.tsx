const FormRow = ({
  children,
  label,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex w-full items-center gap-2">
      <label className="w-24 text-center font-medium">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
};
FormRow.displayName = "FormRow";

const FormError = ({ error }: { error: string }) => {
  return <p className="mt-2 pl-2 text-sm text-red-500">{error}</p>;
};
FormError.displayName = "FormError";

export { FormRow, FormError };
