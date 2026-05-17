import { type ChangeEvent } from "react";

import { RefreshCw } from "lucide-react";

import { cn } from "@/utils/cn";

export interface ScriptEditorProps {
  value: string;
  status?: "default" | "loading" | "disabled";
  maxLength?: number;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const ScriptEditor = ({
  value,
  status = "default",
  maxLength = 1000,
  placeholder = "대본을 입력해주세요.",
  onChange,
}: ScriptEditorProps) => {
  const isLoading = status === "loading";
  const isDisabled = status === "disabled";

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <div
        className={cn(
          "relative h-100 w-full overflow-hidden rounded-2xl border transition-colors",
          isDisabled
            ? "border-border-default bg-background-dark"
            : "border-border-default bg-background-light",
          !isDisabled &&
            !isLoading &&
            "focus-within:border-primary-500 shadow-sm",
        )}
      >
        <textarea
          className={cn(
            "h-full w-full resize-none bg-transparent py-8 pl-8 pr-4 text-body-01 text-text-primary leading-relaxed outline-none scrollbar-thin",
            isDisabled && "text-text-secondary",
          )}
          style={{
            filter: isLoading ? "blur(4px)" : "none",
          }}
          value={value}
          onChange={handleChange}
          disabled={isDisabled || isLoading}
          placeholder={placeholder}
        />

        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40">
            <RefreshCw
              className="mb-4 h-8 w-8 animate-spin text-primary-800 [animation-duration:1.5s]"
              strokeWidth={2.5}
            />
            <span className="text-subtitle-02 text-text-primary">
              AI가 대본을 생성하고 있습니다. 잠시만 기다려 주세요 ...
            </span>
          </div>
        )}
      </div>

      <div className="flex justify-end px-1">
        <span className="text-caption-01 text-text-tertiary">
          {value.length} / {maxLength}
        </span>
      </div>
    </div>
  );
};

export default ScriptEditor;
