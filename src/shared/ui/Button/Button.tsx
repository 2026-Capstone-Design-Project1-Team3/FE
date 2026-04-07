import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "outline";

const baseClass =
  "flex py-3 w-full items-center justify-center rounded-xl text-label-01 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]",
  outline:
    "bg-white hover:bg-background-dark border border-border-deactivated text-text-primary active:scale-[0.98]",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  label?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type = "button",
      variant = "primary",
      disabled,
      children,
      label,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(baseClass, variantClassMap[variant], className)}
        {...props}
      >
        {label || children}
      </button>
    );
  },
);

Button.displayName = "Button";
