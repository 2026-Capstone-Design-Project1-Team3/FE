import { useEffect, useState } from "react";

import { createPortal } from "react-dom";

import { Sparkles, X } from "lucide-react";

import { Button } from "@/shared/ui/Button/Button";

export interface EditorModalProps {
  isOpen: boolean;
  originalScript: string;
  enhancedScript: string;
  onClose: () => void;
  onSave: (updatedScript: string) => void;
}

const MAX_LENGTH = 4000;

export const EditorModal = ({
  isOpen,
  originalScript,
  enhancedScript,
  onClose,
  onSave,
}: EditorModalProps) => {
  const [editedText, setEditedText] = useState(enhancedScript);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setEditedText(enhancedScript);
    }
  }

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
        className="w-full max-w-7xl flex flex-col bg-background-light rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border-default px-8 py-5 bg-background-light">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
              <Sparkles
                className="h-6 w-6 text-primary-900"
                fill="currentColor"
              />
            </div>
            <h2 className="text-head-03 text-text-primary">
              AI 대본 첨삭 결과
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex gap-6 px-8 py-6 bg-background-light">
          <div className="flex flex-1 flex-col">
            <div className="flex h-12 items-center">
              <span className="text-label-01 text-text-secondary">
                기존 대본
              </span>
            </div>
            <div className="flex w-full h-130 flex-col overflow-hidden rounded-2xl border border-border-default bg-background-light shadow-sm">
              <div className="h-full w-full overflow-y-auto p-8 text-body-01 text-text-secondary leading-relaxed whitespace-pre-wrap select-none">
                {originalScript}
              </div>
            </div>
            <div className="flex justify-end mt-1 px-1">
              <span className="text-caption-01 text-text-tertiary">
                {originalScript.length} / {MAX_LENGTH}자
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex h-12 items-center justify-between">
              <span className="text-label-01 text-primary-900">
                AI 첨삭 대본
              </span>
              <div className="rounded-full bg-primary-100 px-3 py-1">
                <span className="text-caption-01 text-primary-900 font-medium">
                  편집 가능
                </span>
              </div>
            </div>
            <div className="flex w-full h-130 flex-col overflow-hidden rounded-2xl border-2 border-primary-500 focus-within:border-primary-700 bg-background-light shadow-sm transition-colors">
              <textarea
                className="h-full w-full resize-none bg-transparent p-8 text-body-01 text-text-primary leading-relaxed outline-none scrollbar-thin"
                maxLength={MAX_LENGTH}
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                placeholder="첨삭 내용을 수정해주세요."
              />
            </div>
            <div className="flex justify-end mt-1 px-1">
              <span className="text-caption-01 text-text-tertiary">
                {editedText.length} / {MAX_LENGTH}자
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-border-default bg-background-light">
          <div className="w-32">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
          </div>
          <div className="w-48">
            <Button variant="primary" onClick={() => onSave(editedText)}>
              대본 저장하기
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default EditorModal;
