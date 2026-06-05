import { useState } from "react";

import { Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { getFolderSetting } from "@/entities/folder/api/getFolderSetting";
import type { FolderDetailResponse } from "@/entities/folder/model/types";
import { useUploadPdfFileMutation } from "@/features/file/model/useUploadPdfFileMutation";
import { useCreateFolderMutation } from "@/features/folder/model/useCreateFolderMutation";
import { useFolderDetailQuery } from "@/features/folder/model/useFolderDetailQuery";
import { useFolderListQuery } from "@/features/folder/model/useFolderListQuery";
import { useGenerateScriptMutation } from "@/features/folder/model/useGenerateScriptMutation";
import { Button } from "@/shared/ui/Button/Button";
import { Modal } from "@/shared/ui/Modal/Modal";
import { EditorModal } from "@/shared/ui/PrepareSection/EditorModal/EditorModal";
import { FileUploadCard } from "@/shared/ui/PrepareSection/FileUploadCard/FileUploadCard";
import {
  FolderSelectModal,
  type FolderData,
} from "@/shared/ui/PrepareSection/FolderSelectModal/FolderSelectModal";
import { SelectPracticeCard } from "@/shared/ui/PrepareSection/SelectPracticeCard/SelectPracticeCard";
import {
  SelectScriptCard,
  type ScriptMethodType,
} from "@/shared/ui/PrepareSection/SelectScriptCard/SelectScriptCard";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

const PRESENTATION_TYPE = 0;
const SCRIPT_MAX_LENGTH = 4000;

export const PresentationPreparePage = () => {
  const navigate = useNavigate();
  const [selectedPractice, setSelectedPractice] = useState<"new" | "existing">(
    "new",
  );
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isCalibrationModalOpen, setIsCalibrationModalOpen] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [localDetail, setLocalDetail] = useState<FolderDetailResponse | null>(
    null,
  );
  const [title, setTitle] = useState("");
  const [presentationFile, setPresentationFile] = useState<File | null>(null);
  const [scriptMethod, setScriptMethod] = useState<ScriptMethodType | null>(
    null,
  );
  const [script, setScript] = useState("");
  const [scriptStatus, setScriptStatus] = useState<"default" | "loading">(
    "default",
  );
  const [uploadedFileCache, setUploadedFileCache] = useState<{
    fileKey: string;
    fileName: string;
  } | null>(null);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [enhancedScript, setEnhancedScript] = useState("");
  const [isEnhancing, setIsEnhancing] = useState(false);

  const { data: folders = [] } = useFolderListQuery({
    type: PRESENTATION_TYPE,
  });
  const { data: fetchedDetail } = useFolderDetailQuery(selectedFolderId);
  const folderDetail = localDetail ?? fetchedDetail;
  const uploadPdfMutation = useUploadPdfFileMutation();
  const createFolderMutation = useCreateFolderMutation();
  const generateScriptMutation = useGenerateScriptMutation();

  const isSubmitting =
    uploadPdfMutation.isPending || createFolderMutation.isPending;

  const folderOptions: FolderData[] = folders.map((folder) => ({
    id: folder.folderId,
    title: folder.title,
    date: folder.updatedAt,
    videoCount: folder.totalAnalyses,
  }));

  const handleSelectFolder = (folderId: string) => {
    setLocalDetail(null);
    setSelectedFolderId(folderId);
    setSelectedPractice("existing");
  };

  const handlePresentationFileChange = (file: File | null) => {
    setPresentationFile(file);
    setUploadedFileCache(null);
  };

  const ensureFileUploaded = async (): Promise<{
    fileKey: string;
    fileName: string;
  }> => {
    if (uploadedFileCache) return uploadedFileCache;
    const result = await uploadPdfMutation.mutateAsync(presentationFile!);
    setUploadedFileCache(result);
    return result;
  };

  const handleAutoGenerate = async () => {
    if (!presentationFile) {
      toast.error("발표 자료 PDF를 먼저 업로드해 주세요.");
      return;
    }
    setScript("");
    setScriptStatus("loading");
    try {
      const uploaded = await ensureFileUploaded();
      const result = await generateScriptMutation.mutateAsync({
        fileKey: uploaded.fileKey,
        extraInfo: "",
      });
      setScript(result.extraInfo ?? "");
    } catch {
      toast.error("대본 생성에 실패했습니다.");
    } finally {
      setScriptStatus("default");
    }
  };

  const handleMethodChange = (method: ScriptMethodType) => {
    setScriptMethod(method);
    setScript("");
    if (method === "auto") {
      void handleAutoGenerate();
    }
  };

  const handleAIEnhance = async () => {
    if (!presentationFile) {
      toast.error("발표 자료 PDF를 먼저 업로드해 주세요.");
      return;
    }
    setIsEnhancing(true);
    try {
      const uploaded = await ensureFileUploaded();
      const result = await generateScriptMutation.mutateAsync({
        fileKey: uploaded.fileKey,
        extraInfo: script,
      });
      setEnhancedScript(result.extraInfo ?? "");
      setIsEditorModalOpen(true);
    } catch {
      toast.error("AI 첨삭에 실패했습니다.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleEditorSave = (updatedScript: string) => {
    setScript(updatedScript);
    setIsEditorModalOpen(false);
  };

  const handleStartExisting = async () => {
    if (!selectedFolderId && !localDetail) {
      toast.error("이어갈 발표 폴더를 선택해 주세요.");
      return;
    }

    setIsStarting(true);
    let setting;
    try {
      setting = await getFolderSetting(selectedFolderId!);
      if (!setting.eyeCalibration) {
        setIsCalibrationModalOpen(true);
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error("연습 준비 중 오류가 발생했습니다.");
      return;
    } finally {
      setIsStarting(false);
    }

    navigate("/presentation/record", {
      state: {
        folderId: selectedFolderId,
        type: PRESENTATION_TYPE,
        setting,
        folderDetail,
      },
    });
  };

  const handleCreatePresentation = async () => {
    if (!title.trim()) {
      toast.error("발표 제목을 입력해 주세요.");
      return;
    }

    if (!presentationFile) {
      toast.error("발표 자료 PDF를 업로드해 주세요.");
      return;
    }

    if (!scriptMethod) {
      toast.error("대본 생성 방식을 선택해 주세요.");
      return;
    }

    if (!script.trim()) {
      toast.error("발표 대본을 입력하거나 생성해 주세요.");
      return;
    }

    try {
      const uploaded = await ensureFileUploaded();
      await createFolderMutation.mutateAsync({
        title: title.trim(),
        fileName: uploaded.fileName,
        fileKey: uploaded.fileKey,
        extraInfo: script.trim(),
        companyName: "",
        inputText: "",
        type: PRESENTATION_TYPE,
      });

      setLocalDetail({
        title: title.trim(),
        fileName: presentationFile!.name,
        extraInfo: script.trim(),
        companyName: "",
        inputText: "",
      });
      setSelectedFolderId(null);
      setSelectedPractice("existing");
      toast.success("발표 연습이 생성되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("발표 준비 설정 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = () => {
    if (selectedPractice === "existing") {
      void handleStartExisting();
      return;
    }

    void handleCreatePresentation();
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-4 font-sans">
      <header className="flex flex-col items-center text-center mb-12">
        <h1 className="text-head-01 text-text-primary mb-3">발표 연습 준비</h1>
        <p className="text-body-01 text-text-secondary">
          AI 코치와 함께 발표 자료와 대본을 준비해 보세요.
        </p>
      </header>

      <section className="flex justify-center gap-6 w-full max-w-225 mb-8">
        <SelectPracticeCard
          variant="new"
          practiceType="presentation"
          isSelected={selectedPractice === "new"}
          onClick={() => setSelectedPractice("new")}
        />
        <SelectPracticeCard
          variant="existing"
          practiceType="presentation"
          folderName={folderDetail?.title ?? ""}
          isSelected={selectedPractice === "existing"}
          onClick={() => setSelectedPractice("existing")}
          onListClick={(e) => {
            e.stopPropagation();
            setIsFolderModalOpen(true);
          }}
        />
      </section>

      <section className="w-full max-w-225 bg-background-light border border-border-deactivated rounded-xl shadow-sm">
        <div className="flex justify-between items-center px-8 py-5 border-b border-border-deactivated">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-info-01"></div>
            <span className="text-subtitle-04 text-text-secondary">
              {selectedPractice === "new" ? "새 발표 정보" : "기존 발표 정보"}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <TextInput
              id="presentationTitle"
              label="발표 제목"
              placeholder="예: 2026 상반기 경영 전략 보고"
              value={
                selectedPractice === "existing"
                  ? (folderDetail?.title ?? "")
                  : title
              }
              disabled={selectedPractice === "existing"}
              required={false}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex gap-6 mb-8">
            <div className="flex-1">
              {selectedPractice === "new" ? (
                <FileUploadCard
                  title="발표 자료"
                  variant="interactive"
                  file={presentationFile}
                  onFileChange={handlePresentationFileChange}
                />
              ) : (
                <FileUploadCard
                  title="발표 자료"
                  variant="readonly"
                  fileName={folderDetail?.fileName ?? "기존 발표 자료"}
                  fileSize={0}
                />
              )}
            </div>
          </div>

          {selectedPractice === "existing" && (
            <div className="mb-12">
              <label
                htmlFor="existingPresentationScript"
                className="text-label-01 text-text-secondary"
              >
                발표 대본
              </label>
              <textarea
                id="existingPresentationScript"
                className="mt-2 h-60 w-full resize-none rounded-xl border border-border-deactivated bg-background-dark p-4 text-label-02 text-text-secondary outline-none"
                value={folderDetail?.extraInfo ?? ""}
                disabled
                readOnly
              />
            </div>
          )}

          {selectedPractice === "new" && (
            <>
              <div className="mb-6">
                <SelectScriptCard
                  selectedMethod={scriptMethod}
                  onMethodChange={handleMethodChange}
                />
              </div>

              {scriptMethod !== null && (
                <div className="mb-12">
                  <label
                    htmlFor="presentationScript"
                    className="text-label-01 text-text-secondary"
                  >
                    발표 대본
                  </label>
                  <div className="relative mt-2">
                    <textarea
                      id="presentationScript"
                      className="h-60 w-full resize-none rounded-xl border border-border-deactivated bg-white p-4 text-label-02 text-text-primary outline-none focus:border-primary-900 focus:ring-4 focus:ring-primary-100 disabled:bg-background-dark disabled:text-text-secondary"
                      placeholder={
                        scriptMethod === "auto"
                          ? "AI가 발표 자료를 분석하여 대본을 생성합니다."
                          : "발표 대본을 입력해 주세요."
                      }
                      maxLength={SCRIPT_MAX_LENGTH}
                      value={script}
                      disabled={scriptStatus === "loading"}
                      onChange={(e) => setScript(e.target.value)}
                    />
                    {scriptStatus === "loading" && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70">
                        <span className="text-label-02 text-text-secondary animate-pulse">
                          AI가 대본을 생성하고 있습니다...
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-1 px-1">
                    <span className="text-caption-01 text-text-tertiary">
                      {script.length} / {SCRIPT_MAX_LENGTH}자
                    </span>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      type="button"
                      disabled={
                        script.trim().length === 0 ||
                        scriptStatus === "loading" ||
                        isEnhancing
                      }
                      onClick={() => void handleAIEnhance()}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg border text-label-02 transition-colors enabled:border-primary-900 enabled:text-primary-900 enabled:hover:bg-primary-50 disabled:border-border-deactivated disabled:bg-background-dark disabled:text-text-tertiary disabled:cursor-not-allowed"
                    >
                      <Sparkles className="w-4 h-4" />
                      {isEnhancing ? "첨삭 중..." : "AI 첨삭받기"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex justify-end items-center gap-4 pt-6 border-t border-border-deactivated">
            <div className="w-32">
              <Button variant="outline" onClick={() => navigate("/")}>
                취소
              </Button>
            </div>
            <div className="w-48">
              <Button
                variant="primary"
                disabled={isSubmitting || scriptStatus === "loading"}
                onClick={handleSubmit}
              >
                {selectedPractice === "existing"
                  ? isStarting
                    ? "연습 시작 중..."
                    : "연습 시작하기"
                  : isSubmitting
                    ? "연습 생성 중..."
                    : "연습 생성하기"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FolderSelectModal
        isOpen={isFolderModalOpen}
        folders={folderOptions}
        selectedFolderId={selectedFolderId}
        onClose={() => setIsFolderModalOpen(false)}
        onSelectFolder={handleSelectFolder}
      />

      <EditorModal
        isOpen={isEditorModalOpen}
        originalScript={script}
        enhancedScript={enhancedScript}
        onClose={() => setIsEditorModalOpen(false)}
        onSave={handleEditorSave}
      />

      <Modal
        isOpen={isCalibrationModalOpen}
        variant="double"
        title="캘리브레이션 미설정"
        description="마이페이지에서 먼저 캘리브레이션 설정을 진행해 주세요."
        cancelText="닫기"
        confirmText="마이페이지로"
        onClose={() => setIsCalibrationModalOpen(false)}
        onConfirm={() => navigate("/my")}
      />
    </div>
  );
};

export default PresentationPreparePage;
