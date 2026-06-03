import React, { useRef, useState } from "react";

import { FileCheck, FilePlus, X } from "lucide-react";

type BaseProps = {
  title: string;
};

type InteractiveProps = BaseProps & {
  variant?: "interactive";
  file?: File | null;
  onFileChange?: (file: File | null) => void;
  onFileRemove?: () => void;
};

type ReadonlyProps = BaseProps & {
  variant: "readonly";
  fileName: string;
  fileSize: number;
};

type FileUploadProps = InteractiveProps | ReadonlyProps;

export const FileUploadCard = (props: FileUploadProps) => {
  const { title, variant = "interactive" } = props;
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isReadonly = variant === "readonly";
  const interactiveProps = !isReadonly ? (props as InteractiveProps) : null;
  const readonlyProps = isReadonly ? (props as ReadonlyProps) : null;
  const controlledFile = interactiveProps?.file;
  const file = controlledFile !== undefined ? controlledFile : internalFile;
  const hasFile = isReadonly || file !== null;

  const displayFileName = isReadonly ? readonlyProps?.fileName : file?.name;
  const displayFileSize = isReadonly ? readonlyProps?.fileSize : file?.size;

  const formatBytesToMB = (bytes?: number) => {
    if (!bytes || bytes === 0) return "0 MB";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const updateFile = (nextFile: File | null) => {
    if (interactiveProps?.onFileChange) {
      interactiveProps.onFileChange(nextFile);
      return;
    }

    setInternalFile(nextFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type === "application/pdf") {
      updateFile(selectedFile);
      return;
    }

    alert("PDF 파일만 업로드 가능합니다.");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = () => {
    if (interactiveProps?.onFileRemove) {
      interactiveProps.onFileRemove();
    } else {
      updateFile(null);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 font-sans">
      <span className="text-subtitle-03 text-text-secondary">{title}</span>

      {!hasFile ? (
        <label className="w-full relative flex flex-col items-center justify-center py-10 px-4 border-2 border-dashed border-border-default rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
          <div className="w-14 h-14 bg-background-light border border-border-deactivated rounded-full flex items-center justify-center shadow-sm mb-4">
            <FilePlus className="w-7 h-7 text-primary-900" />
          </div>
          <p className="text-body-01 text-text-primary mb-1.5">
            클릭하고 파일을 업로드하세요
          </p>
          <p className="text-body-02 text-text-deactivated">PDF (최대 20MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf, .pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <div className="w-full relative flex flex-col items-center justify-center py-10 px-4 border border-border-default rounded-xl bg-background-light">
          {!isReadonly && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-4 right-4 p-1 text-text-deactivated hover:text-text-tertiary transition-colors"
              aria-label="파일 삭제"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <FileCheck className="w-7 h-7 text-primary-900" />
          </div>

          <p className="text-subtitle-02 text-text-primary mb-2">
            {displayFileName}
          </p>

          <div className="flex items-center gap-1.5 text-body-02 text-text-deactivated">
            <span>{formatBytesToMB(displayFileSize)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
