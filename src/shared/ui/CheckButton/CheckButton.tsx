import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

type CheckButtonVariant = "default" | "checking" | "checked";

const baseClass =
  "w-20 py-1.5 text-label-03 text-white rounded-lg flex items-center justify-center transition-all duration-200 whitespace-nowrap";

const variantClassMap: Record<CheckButtonVariant, string> = {
  default:
    "bg-primary-800 hover:bg-primary-900 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50",
  checking: "bg-primary-600 cursor-not-allowed",
  checked: "bg-primary-600 cursor-default",
};
const variantContentMap: Record<CheckButtonVariant, string> = {
  default: "중복 확인",
  checking: "확인 중...",
  checked: "확인 완료",
};

export interface CheckButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  variant?: CheckButtonVariant;
}
export const CheckButton = forwardRef<HTMLButtonElement, CheckButtonProps>(
  (
    { className, type = "button", disabled, variant = "default", ...props },
    ref,
  ) => {
    const isButtonDisabled = disabled || variant !== "default";

    return (
      <button
        ref={ref}
        type={type}
        disabled={isButtonDisabled}
        className={cn(baseClass, variantClassMap[variant], className)}
        {...props}
      >
        {variantContentMap[variant]}
      </button>
    );
  },
);

CheckButton.displayName = "CheckButton";
