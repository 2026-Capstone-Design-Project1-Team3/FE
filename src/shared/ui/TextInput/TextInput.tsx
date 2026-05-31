import type { InputHTMLAttributes, ReactNode } from "react";

import { cn } from "@/utils/cn";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  required: boolean;
  rightElement?: ReactNode;
  bottomMessage?: string;
  isOk?: boolean;
}

export const TextInput = ({
  label,
  id,
  required = true,
  rightElement,
  className,
  bottomMessage,
  isOk,
  ...props
}: TextInputProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor={id} className="text-label-01 text-text-secondary">
        {label}
        {required && <span className="text-error-03 ml-1">*</span>}
      </label>

      <div className="relative w-full">
        <input
          id={id}
          className={cn(
            "w-full px-4 py-2.5 text-gray-900 text-label-02 disabled:bg-background-dark placeholder-text-placeholder bg-white border border-border-deactivated rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-900 transition-all duration-200",
            className,
          )}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {bottomMessage && (
        <span
          className={cn(
            "text-label-06",
            isOk ? "text-success-02" : "text-error-03",
          )}
        >
          {bottomMessage}
        </span>
      )}
    </div>
  );
};

export default TextInput;
