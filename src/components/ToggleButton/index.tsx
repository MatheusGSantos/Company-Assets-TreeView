import { ComponentProps } from "react";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: [
    "py-2 px-1.5 text-white rounded-sm flex items-center justify-center gap-2 font-inter font-semibold",
  ],

  variants: {
    color: {
      primary: "bg-blue-secondary",
      ghost: "bg-transparent text-gray-darker",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
    toggled: {
      false: "",
    },
  },

  compoundVariants: [
    {
      color: "primary",
      toggled: true,
      class: "bg-blue-primary",
    },
    {
      color: "ghost",
      toggled: true,
      class: "bg-blue-primary",
    },
  ],
});

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof button>;

export function ToggleButton({
  color = "primary",
  disabled = false,
  toggled = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={button({
        color,
        disabled,
        toggled,
        className,
      })}
    />
  );
}
