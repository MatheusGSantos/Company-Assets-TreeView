import EmptyIcon from "@assets/icons/empty.svg";
import { twMerge } from "tailwind-merge";

interface EmptyContentProps {
  message?: string;
  className?: string | undefined;
  svgClassName?: string | undefined;
}

export function EmptyContent({
  message = "No content",
  className,
  svgClassName,
}: Readonly<EmptyContentProps>) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center size-full flex-col gap-3",
        className
      )}
    >
      <EmptyIcon className={twMerge(svgClassName)} />
      <h3 className="text-lg font-semibold text-gray-darker">{message}</h3>
    </div>
  );
}
