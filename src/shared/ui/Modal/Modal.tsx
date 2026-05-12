import { useEffect } from "react";

import { createPortal } from "react-dom";

import { Button } from "@/shared/ui/Button/Button";

export interface ModalProps {
  isOpen: boolean;
  variant?: "single" | "double";
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal = ({
  isOpen,
  variant = "single",
  title,
  description,
  cancelText = "취소",
  confirmText = "확인",
  onClose,
  onConfirm,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-gray-900/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-100 flex flex-col text-center bg-background-light rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-subtitle-01 text-text-primary mb-6">{title}</h2>

        <p className="text-body-01 text-text-secondary whitespace-pre-wrap mb-8">
          {description}
        </p>

        <div className="flex items-center gap-3 w-full">
          {variant === "double" && (
            <div className="flex-1">
              <Button variant="outline" onClick={onClose}>
                {cancelText}
              </Button>
            </div>
          )}

          <div className="flex-1">
            <Button variant="primary" onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
