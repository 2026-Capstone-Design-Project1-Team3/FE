import type { FC } from "react";

import { cn } from "@/utils/cn";

interface FooterProps {
  className?: string;
}
export const Footer: FC<FooterProps> = (props) => {
  const { className } = props;
  return (
    <footer
      className={cn(
        "text-caption-02 flex h-20 w-full items-center justify-center border-t border-gray-300 text-gray-400",
        className,
      )}
    >
      © 2026 Silent Mentor. All rights reserved.
    </footer>
  );
};
