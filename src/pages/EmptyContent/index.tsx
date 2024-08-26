import EmptyIcon from "@assets/icons/empty.svg";

interface EmptyContentProps {
  message?: string;
}

export function EmptyContent({
  message = "No content",
}: Readonly<EmptyContentProps>) {
  return (
    <div className="flex items-center justify-center size-full flex-col gap-6">
      <img src={EmptyIcon} alt="No content" />
      <h3 className="text-lg font-semibold text-gray-darker">{message}</h3>
    </div>
  );
}
