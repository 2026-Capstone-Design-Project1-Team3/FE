import { useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import type { FolderDetailResponse } from "@/entities/folder/model/types";
import { useUploadPdfFileMutation } from "@/features/file/model/useUploadPdfFileMutation";
import { useCreateFolderMutation } from "@/features/folder/model/useCreateFolderMutation";
import { useFolderDetailQuery } from "@/features/folder/model/useFolderDetailQuery";
import { useFolderListQuery } from "@/features/folder/model/useFolderListQuery";
import { Button } from "@/shared/ui/Button/Button";
import { FileUploadCard } from "@/shared/ui/PrepareSection/FileUploadCard/FileUploadCard";
import {
  FolderSelectModal,
  type FolderData,
} from "@/shared/ui/PrepareSection/FolderSelectModal/FolderSelectModal";
import { SelectPracticeCard } from "@/shared/ui/PrepareSection/SelectPracticeCard/SelectPracticeCard";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

const INTERVIEW_TYPE = 1;
const RESUME_MAX_LENGTH = 4000;

export const InterviewPreparePage = () => {
  const navigate = useNavigate();
  const [selectedPractice, setSelectedPractice] = useState<"new" | "existing">(
    "new",
  );
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [localDetail, setLocalDetail] = useState<FolderDetailResponse | null>(
    null,
  );
  const [interviewTitle, setInterviewTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [portfolioFile, setPortfolioFile] = useState<File | null>(null);

  const { data: folders = [] } = useFolderListQuery({ type: INTERVIEW_TYPE });
  const { data: fetchedDetail } = useFolderDetailQuery(selectedFolderId);
  const uploadPdfMutation = useUploadPdfFileMutation();
  const createFolderMutation = useCreateFolderMutation();

  const folderDetail = localDetail ?? fetchedDetail;

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

  const handleStartExisting = () => {
    if (!selectedFolderId && !localDetail) {
      toast.error("이어갈 면접 폴더를 선택해 주세요.");
      return;
    }

    navigate("/interview/record", {
      state: { folderId: selectedFolderId, type: INTERVIEW_TYPE },
    });
  };

  const handleCreateInterview = async () => {
    if (!interviewTitle.trim()) {
      toast.error("면접 제목을 입력해 주세요.");
      return;
    }

    if (!companyName.trim()) {
      toast.error("지원 회사를 입력해 주세요.");
      return;
    }

    if (!jobRole.trim()) {
      toast.error("지원 직무를 입력해 주세요.");
      return;
    }

    if (!resumeText.trim()) {
      toast.error("자기소개서 내용을 입력해 주세요.");
      return;
    }

    if (!portfolioFile) {
      toast.error("포트폴리오 PDF를 업로드해 주세요.");
      return;
    }

    try {
      const uploadedFile = await uploadPdfMutation.mutateAsync(portfolioFile);
      await createFolderMutation.mutateAsync({
        title: interviewTitle.trim(),
        fileName: uploadedFile.fileName,
        fileKey: uploadedFile.fileKey,
        extraInfo: jobRole.trim(),
        companyName: companyName.trim(),
        inputText: resumeText.trim(),
        type: INTERVIEW_TYPE,
      });

      setLocalDetail({
        title: interviewTitle.trim(),
        fileName: portfolioFile.name,
        extraInfo: jobRole.trim(),
        companyName: companyName.trim(),
        inputText: resumeText.trim(),
      });
      setSelectedFolderId(null);
      setSelectedPractice("existing");
      toast.success("면접 연습이 생성되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error("면접 준비 설정 중 오류가 발생했습니다.");
    }
  };

  const handleSubmit = () => {
    if (selectedPractice === "existing") {
      handleStartExisting();
      return;
    }

    void handleCreateInterview();
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-4 font-sans">
      <header className="flex flex-col items-center text-center mb-12">
        <h1 className="text-head-01 text-text-primary mb-3">면접 연습 준비</h1>
        <p className="text-body-01 text-text-secondary">
          지원 정보와 자기소개서를 바탕으로 맞춤 면접을 준비해 보세요.
        </p>
      </header>

      <section className="flex justify-center gap-6 w-full max-w-225 mb-8">
        <SelectPracticeCard
          variant="new"
          practiceType="interview"
          isSelected={selectedPractice === "new"}
          onClick={() => setSelectedPractice("new")}
        />
        <SelectPracticeCard
          variant="existing"
          practiceType="interview"
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
              {selectedPractice === "new" ? "새 면접 정보" : "기존 면접 정보"}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <TextInput
              id="interviewTitle"
              label="면접 제목"
              placeholder="예: 구글코리아 프론트엔드 면접"
              value={
                selectedPractice === "existing"
                  ? (folderDetail?.title ?? "")
                  : interviewTitle
              }
              disabled={selectedPractice === "existing"}
              required={false}
              onChange={(e) => setInterviewTitle(e.target.value)}
            />
          </div>

          <div className="flex gap-6 mb-8">
            <div className="flex-1">
              <TextInput
                id="companyName"
                label="지원 회사"
                placeholder="예: 구글코리아"
                value={
                  selectedPractice === "existing"
                    ? (folderDetail?.companyName ?? "")
                    : companyName
                }
                disabled={selectedPractice === "existing"}
                required={false}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <TextInput
                id="jobRole"
                label="지원 직무"
                placeholder="예: 프론트엔드 개발자"
                value={
                  selectedPractice === "existing"
                    ? (folderDetail?.extraInfo ?? "")
                    : jobRole
                }
                disabled={selectedPractice === "existing"}
                required={false}
                onChange={(e) => setJobRole(e.target.value)}
              />
            </div>
          </div>

          {selectedPractice === "new" && (
            <>
              <div className="mb-12">
                <FileUploadCard
                  title="포트폴리오"
                  variant="interactive"
                  file={portfolioFile}
                  onFileChange={setPortfolioFile}
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="resumeText"
                  className="text-label-01 text-text-secondary"
                >
                  자기소개서
                </label>
                <textarea
                  id="resumeText"
                  className="mt-2 h-60 w-full resize-none rounded-xl border border-border-deactivated bg-white p-4 text-label-02 text-text-primary outline-none focus:border-primary-900 focus:ring-4 focus:ring-primary-100"
                  placeholder="자기소개서 내용을 붙여넣어 주세요."
                  maxLength={RESUME_MAX_LENGTH}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                />
                <div className="flex justify-end mt-1 px-1">
                  <span className="text-caption-01 text-text-tertiary">
                    {resumeText.length} / {RESUME_MAX_LENGTH}자
                  </span>
                </div>
              </div>
            </>
          )}

          {selectedPractice === "existing" && (
            <>
              <div className="mb-12">
                <FileUploadCard
                  title="포트폴리오"
                  variant="readonly"
                  fileName={folderDetail?.fileName ?? "기존 포트폴리오"}
                  fileSize={0}
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor="existingResumeText"
                  className="text-label-01 text-text-secondary"
                >
                  자기소개서
                </label>
                <textarea
                  id="existingResumeText"
                  className="mt-2 h-60 w-full resize-none rounded-xl border border-border-deactivated bg-background-dark p-4 text-label-02 text-text-secondary outline-none"
                  value={folderDetail?.inputText ?? ""}
                  disabled
                  readOnly
                />
              </div>
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
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {selectedPractice === "existing"
                  ? "연습 시작하기"
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
    </div>
  );
};

export default InterviewPreparePage;
