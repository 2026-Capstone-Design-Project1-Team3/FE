import { useState } from "react";

import { Button } from "@/shared/ui/Button/Button";
import { FileUploadCard } from "@/shared/ui/PrepareSection/FileUploadCard/FileUploadCard";
import { SelectPracticeCard } from "@/shared/ui/PrepareSection/SelectPracticeCard/SelectPracticeCard";
import { SelectScriptCard } from "@/shared/ui/PrepareSection/SelectScriptCard/SelectScriptCard";
import { TextInput } from "@/shared/ui/TextInput/TextInput";

const MOCK_EXISTING_PRESENTATION = {
  folderName: "2024년 상반기 신입 공채",
  title: "AI 기술을 활용한 서비스 혁신 전략",
  time: { min: 10, sec: 0 },
  file: {
    fileName: "서비스_혁신_발표자료.pdf",
    fileSize: 20.5 * 1024 * 1024,
  },
};

export const PresentationPreparePage = () => {
  const [selectedPractice, setSelectedPractice] = useState<"new" | "existing">(
    "new",
  );

  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-4 font-sans">
      <header className="flex flex-col items-center text-center mb-12">
        <h1 className="text-head-01 text-text-primary mb-3">발표 연습 준비</h1>
        <p className="text-body-01 text-text-secondary">
          AI 코치와 함께 최고의 발표를 준비하세요.
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
          folderName={MOCK_EXISTING_PRESENTATION.folderName}
          isSelected={selectedPractice === "existing"}
          onClick={() => setSelectedPractice("existing")}
          onListClick={(e) => {
            e.stopPropagation();
            console.info("기존 발표 목록 보기");
          }}
        />
      </section>

      <section className="w-full max-w-225 bg-background-light border border-border-deactivated rounded-xl shadow-sm">
        <div className="flex justify-between items-center px-8 py-5 border-b border-border-deactivated">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-info-01"></div>
            <span className="text-subtitle-04 text-text-secondary">
              새로운 발표 구성
            </span>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <TextInput
              id="presentationTitle"
              label="발표 제목"
              placeholder="예: 2024년 하반기 경영 전략 보고"
              value={
                selectedPractice === "existing"
                  ? MOCK_EXISTING_PRESENTATION.title
                  : undefined
              }
              disabled={selectedPractice === "existing"}
              required={false}
            />
          </div>

          <div className="flex gap-6 mb-8">
            <div className="flex-1">
              {selectedPractice === "new" ? (
                <FileUploadCard title="발표 자료" variant="interactive" />
              ) : (
                <FileUploadCard
                  title="발표 자료"
                  variant="readonly"
                  fileName={MOCK_EXISTING_PRESENTATION.file.fileName}
                  fileSize={MOCK_EXISTING_PRESENTATION.file.fileSize}
                />
              )}
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-label-01 text-text-secondary">
                발표 시간
              </label>
              <div className="flex items-center gap-4 h-full">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-20 px-4 py-2.5 bg-background-light border border-border-deactivated rounded-xl text-center text-text-primary focus:outline-none"
                    placeholder="10"
                    disabled={selectedPractice === "existing"}
                    value={
                      selectedPractice === "existing"
                        ? MOCK_EXISTING_PRESENTATION.time.min
                        : undefined
                    }
                  />
                  <span className="text-label-02 text-text-secondary">분</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    className="w-20 px-4 py-2.5 bg-background-light border border-border-deactivated rounded-xl text-center text-text-primary focus:outline-none"
                    placeholder="0"
                    disabled={selectedPractice === "existing"}
                    value={
                      selectedPractice === "existing"
                        ? MOCK_EXISTING_PRESENTATION.time.sec
                        : undefined
                    }
                  />
                  <span className="text-label-02 text-text-secondary">초</span>
                </div>
              </div>

              <div className="mt-2 p-3 bg-secondary-50 border border-secondary-200 rounded-lg flex items-start gap-2">
                <span className="text-secondary-600 mt-0.5 text-caption-02">
                  ⚠️
                </span>
                <p className="text-caption-02 text-secondary-900 leading-normal">
                  입력하신 시간에 맞춰 각 템플릿 페이스 조절 가이드가
                  제공됩니다.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <SelectScriptCard />
          </div>

          <div className="flex justify-end items-center gap-4 pt-6 border-t border-border-deactivated">
            <div className="w-32">
              <Button variant="outline">취소</Button>
            </div>
            <div className="w-48">
              <Button
                variant="primary"
                onClick={() => console.info("발표 연습 시작!")}
              >
                연습 설정 완료 ▶
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-12 text-text-deactivated text-caption-02">
        © 2026 Silent Mentor. All rights reserved.
      </footer>
    </div>
  );
};

export default PresentationPreparePage;
