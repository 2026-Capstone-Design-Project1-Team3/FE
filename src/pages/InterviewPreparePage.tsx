import { useState } from "react";

import { Button } from "@/shared/ui/Button/Button";
import { AIAnalysisCard } from "@/shared/ui/PrepareSection/AIAnalysisCard/AIAnalysisCard";
import { FileUploadCard } from "@/shared/ui/PrepareSection/FileUploadCard/FileUploadCard";
import { SelectPracticeCard } from "@/shared/ui/PrepareSection/SelectPracticeCard/SelectPracticeCard";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

const MOCK_EXISTING_DATA = {
  folderName: "2024년 상반기 신입 공채",
  companyName: "삼성전자",
  jobRole: "소프트웨어 개발 (Backend)",
  resume: {
    fileName: "2024_자기소개서_최종.pdf",
    fileSize: 1.2 * 1024 * 1024,
  },
  portfolio: {
    fileName: "2024_포트폴리오_최종.pdf",
    fileSize: 15.8 * 1024 * 1024,
  },
};

export const InterviewPreparePage = () => {
  const [selectedPractice, setSelectedPractice] = useState<"new" | "existing">(
    "existing",
  );

  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-4 font-sans">
      <header className="flex flex-col items-center text-center mb-12">
        <h1 className="text-head-01 text-text-primary mb-3">면접 연습 준비</h1>
        <p className="text-body-01 text-text-secondary">
          AI 코치와 함께 실전 같은 면접을 준비하세요.
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
          folderName={MOCK_EXISTING_DATA.folderName}
          isSelected={selectedPractice === "existing"}
          onClick={() => setSelectedPractice("existing")}
          onListClick={(e) => {
            e.stopPropagation();
            console.info("목록 보기 클릭");
          }}
        />
      </section>

      <section className="w-full max-w-225 bg-background-light border border-border-deactivated rounded-xl shadow-sm">
        <div className="flex justify-between items-center px-8 py-5 border-b border-border-deactivated">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-info-01"></div>
            <span className="text-subtitle-04 text-text-secondary">
              {selectedPractice === "new"
                ? "새로운 면접 설정"
                : "선택된 면접 설정"}
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="flex gap-6 mb-8">
            <div className="flex-1">
              <TextInput
                id="companyName"
                label="지원 회사"
                placeholder={
                  selectedPractice === "new" ? "예: 구글 코리아" : ""
                }
                value={
                  selectedPractice === "existing"
                    ? MOCK_EXISTING_DATA.companyName
                    : undefined
                }
                disabled={selectedPractice === "existing"}
                required={false}
              />
            </div>
            <div className="flex-1">
              <TextInput
                id="jobRole"
                label="지원 직무"
                placeholder={
                  selectedPractice === "new"
                    ? "예: 시니어 프로덕트 디자이너"
                    : ""
                }
                value={
                  selectedPractice === "existing"
                    ? MOCK_EXISTING_DATA.jobRole
                    : undefined
                }
                disabled={selectedPractice === "existing"}
                required={false}
              />
            </div>
          </div>

          <div className={selectedPractice === "new" ? "mb-10" : "mb-12"}>
            <h3 className="text-subtitle-04 text-text-secondary mb-3">
              {selectedPractice === "new"
                ? "서류 업로드 (자기소개서 & 포트폴리오)"
                : "업로드된 서류"}
            </h3>
            <div className="flex gap-6">
              <div className="flex-1">
                {selectedPractice === "new" ? (
                  <FileUploadCard title="자기소개서" variant="interactive" />
                ) : (
                  <FileUploadCard
                    title="자기소개서"
                    variant="readonly"
                    fileName={MOCK_EXISTING_DATA.resume.fileName}
                    fileSize={MOCK_EXISTING_DATA.resume.fileSize}
                  />
                )}
              </div>
              <div className="flex-1">
                {selectedPractice === "new" ? (
                  <FileUploadCard title="포트폴리오" variant="interactive" />
                ) : (
                  <FileUploadCard
                    title="포트폴리오"
                    variant="readonly"
                    fileName={MOCK_EXISTING_DATA.portfolio.fileName}
                    fileSize={MOCK_EXISTING_DATA.portfolio.fileSize}
                  />
                )}
              </div>
            </div>
          </div>

          {selectedPractice === "new" && (
            <div className="mb-10 flex justify-center">
              <div className="w-full flex justify-center [&>div]:max-w-full">
                <AIAnalysisCard
                  scanStatus="complete"
                  generateStatus="loading"
                  onStartAnalysis={() => console.info("분석 시작!")}
                />
              </div>
            </div>
          )}

          <div
            className={`flex items-center pt-6 border-t border-border-deactivated ${selectedPractice === "new" ? "justify-between" : "justify-end"}`}
          >
            {selectedPractice === "new" && (
              <button
                type="button"
                className="text-label-03 text-text-deactivated hover:text-text-primary transition-colors px-2"
              >
                초기화
              </button>
            )}
            <div className="w-48">
              <Button
                variant="primary"
                onClick={() => console.info("면접 시작!")}
              >
                면접 시작하기
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterviewPreparePage;
