import { useEffect, useRef, useState } from "react";

import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import type {
  FolderDetailResponse,
  FolderSettingResponse,
} from "@/entities/folder/model/types";
import { useAnalysisAlarm } from "@/shared/lib/useAnalysisAlarm";
import { useFullRecording } from "@/shared/lib/useFullRecording";
import { useRecordingSession } from "@/shared/lib/useRecordingSession";
import { Button } from "@/shared/ui/Button/Button";
import CameraComponent, {
  type CameraHandle,
} from "@/shared/ui/CameraComponent/CameraComponent";
import { Modal } from "@/shared/ui/Modal/Modal";
import { InfoCard } from "@/shared/ui/RecordSection/InfoCard/InfoCard";
import { QuestionCard } from "@/shared/ui/RecordSection/QuestionCard/QuestionCard";
import { SpeedCard } from "@/shared/ui/RecordSection/SpeedCard/SpeedCard";
import { TimeCard } from "@/shared/ui/RecordSection/TimeCard/TimeCard";

interface LocationState {
  folderId: string;
  type: number;
  setting: FolderSettingResponse;
  folderDetail: FolderDetailResponse;
}

const InterviewRecordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const cameraRef = useRef<CameraHandle>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const folderId = state?.folderId ?? null;
  const folderDetail = state?.folderDetail;
  const eye = state?.setting.eyeCalibration ?? {
    leftEyeOffset: 0,
    rightEyeOffset: 0,
    ratio: 0,
  };
  const token = localStorage.getItem("accessToken") ?? "";

  const { speedStatus, spsScore } = useRecordingSession({
    videoEl,
    folderId,
    token,
    eye,
  });
  const { stopAndGetBlob } = useFullRecording(videoEl);
  const {
    status: alarmStatus,
    analysisId,
    errorMessage,
    startAlarm,
  } = useAnalysisAlarm({
    folderId,
    type: state?.type ?? 1,
    title: folderDetail?.title ?? "",
    token,
  });

  // 카메라가 준비되면 videoEl 설정
  useEffect(() => {
    const interval = setInterval(() => {
      const el = cameraRef.current?.video;
      if (el && el.srcObject instanceof MediaStream) {
        setVideoEl(el);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // 분석 완료 시 리포트 페이지로 이동
  useEffect(() => {
    if (alarmStatus === "complete" && analysisId) {
      navigate("/interview/report", { state: { analysisId } });
    }
  }, [alarmStatus, analysisId, navigate]);

  const questions =
    state?.setting.set
      .split("<q>")
      .slice(1)
      .map((q) => q.trim())
      .filter(Boolean) ?? [];

  const handleStartAnswer = () => setIsAnswering(true);

  const handleNextQuestion = () => {
    setIsAnswering(false);
    setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  const handleEnd = async () => {
    setIsTimerRunning(false);
    try {
      const blob = await stopAndGetBlob();
      await startAlarm(blob);
    } catch {
      await startAlarm(new Blob());
    }
  };

  const isEnding = alarmStatus === "uploading" || alarmStatus === "analyzing";

  return (
    <div className="min-h-screen w-full bg-background-dark px-8 py-10 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-360 items-stretch gap-8">
        <section className="flex flex-1 flex-col justify-center gap-6">
          <div className="w-full aspect-video overflow-hidden rounded-2xl bg-black shadow-md">
            <CameraComponent ref={cameraRef} audio />
          </div>
          <InfoCard
            variant="interview"
            folderName={folderDetail?.title ?? ""}
            companyName={folderDetail?.companyName ?? ""}
            role={folderDetail?.extraInfo ?? ""}
          />
        </section>

        <aside className="flex w-105 shrink-0 flex-col gap-6">
          <TimeCard isRunning={isTimerRunning} initialSeconds={0} />
          <SpeedCard status={speedStatus} spsScore={spsScore} />

          <QuestionCard
            questions={questions}
            currentIndex={currentQuestionIndex}
            isAnswering={isAnswering}
            onStartAnswer={handleStartAnswer}
            onNextQuestion={handleNextQuestion}
          />

          <Button
            className="mt-auto bg-secondary-900 text-white hover:bg-secondary-800 active:scale-[0.98] py-6 text-subtitle-02 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isEnding}
            onClick={() => void handleEnd()}
          >
            <div className="flex items-center text-white justify-center gap-2">
              <LogOut className="h-5 w-5" strokeWidth={2.5} />
              <span>{isEnding ? "분석 중..." : "면접 종료"}</span>
            </div>
          </Button>
        </aside>
      </div>

      {/* 분석 대기 모달 */}
      <Modal
        isOpen={alarmStatus === "uploading" || alarmStatus === "analyzing"}
        variant="single"
        title={alarmStatus === "uploading" ? "영상 업로드 중" : "AI 분석 중"}
        description={
          alarmStatus === "uploading"
            ? "녹화 영상을 업로드하고 있습니다.\n잠시만 기다려 주세요."
            : "AI가 면접 영상을 분석하고 있습니다.\n완료되면 자동으로 이동합니다."
        }
        confirmText="대기 중..."
        onClose={() => {}}
        onConfirm={() => {}}
      />

      {/* 분석 실패 모달 */}
      <Modal
        isOpen={alarmStatus === "failed"}
        variant="single"
        title="분석 실패"
        description={errorMessage ?? "분석 중 오류가 발생했습니다."}
        confirmText="확인"
        onClose={() => navigate("/")}
        onConfirm={() => navigate("/")}
      />
    </div>
  );
};

export default InterviewRecordPage;
