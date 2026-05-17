import { useEffect } from "react";

import { createPortal } from "react-dom";

import { Folder, X } from "lucide-react";

import { cn } from "@/utils/cn";

export interface FolderData {
  id: string;
  title: string;
  date: string;
  videoCount: number;
}

export interface FolderSelectModalProps {
  isOpen: boolean;
  folders: FolderData[];
  selectedFolderId?: string | null;
  onClose: () => void;
  onSelectFolder: (id: string) => void;
}

export const FolderSelectModal = ({
  isOpen,
  folders,
  selectedFolderId,
  onClose,
  onSelectFolder,
}: FolderSelectModalProps) => {
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
        className="w-full max-w-120 flex flex-col bg-background-light rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border-default px-6 py-4">
          <div className="flex items-center gap-3">
            <Folder className="h-5 w-5 text-primary-800" />
            <h2 className="text-subtitle-02 text-text-primary">폴더 선택</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          <div className="flex flex-col gap-3 p-6">
            {folders.map((folder) => {
              const isSelected = folder.id === selectedFolderId;
              return (
                <button
                  key={folder.id}
                  onClick={() => {
                    onSelectFolder(folder.id);
                    onClose();
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl border p-4 transition-all text-left group",
                    isSelected
                      ? "border-secondary-800 hover:bg-secondary-50/30"
                      : "border-border-default bg-background-light hover:bg-background-dark hover:border-border-strong",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-50">
                      <Folder className="h-5 w-5 text-secondary-800" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-subtitle-03 text-text-primary">
                        {folder.title}
                      </span>
                      <div className="flex items-center gap-1 text-caption-01 text-text-tertiary">
                        <span>최근 연습: {folder.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-md bg-gray-100 px-2.5 py-1 text-label-06 text-text-secondary">
                    영상 {folder.videoCount}개
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default FolderSelectModal;
