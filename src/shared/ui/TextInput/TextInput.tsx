import type { InputHTMLAttributes, ReactNode } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  required: boolean;
  rightElement?: ReactNode;
}

export const TextInput = ({
  label,
  id,
  required,
  rightElement,
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
          className="w-full px-4 py-2.5 text-gray-900 text-label-02 disabled:bg-background-dark placeholder-text-placeholder bg-white border border-border-deactivated rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-100 focus:border-primary-900 transition-all duration-200"
          {...props}
        />
        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
