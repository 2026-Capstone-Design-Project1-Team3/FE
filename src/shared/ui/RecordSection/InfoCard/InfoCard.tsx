import { Info } from "lucide-react";

type BaseInfoProps = {
  folderName: string;
  date: string;
};

type InterviewProps = BaseInfoProps & {
  variant: "interview";
  companyName: string;
  role: string;
};

type PresentationProps = BaseInfoProps & {
  variant: "presentation";
  targetTime: string;
};

export type InfoCardProps = InterviewProps | PresentationProps;

export const InfoCard = (props: InfoCardProps) => {
  const { variant, folderName, date } = props;
  return (
    <div className="w-full rounded-2xl border border-border-default hover:bg-background-dark bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-6 flex items-center gap-2.5">
        <Info className="h-6 w-6 text-primary-900" strokeWidth={2.5} />
        <h2 className="text-subtitle-01 text-text-primary">
          {variant === "interview" ? "면접 정보" : "발표 정보"}
        </h2>
      </div>
      <div
        className={`grid w-full gap-6 ${variant === "interview" ? "grid-cols-4" : "grid-cols-3"}`}
      >
        <div className="flex flex-col gap-2">
          <span className="text-label-01 text-text-secondary">
            {variant === "interview" ? "면접명" : "발표명"}
          </span>
          <span className="text-body-01 text-text-primary">{folderName}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-label-01 text-text-secondary">날짜</span>
          <span className="text-body-01 text-text-primary">{date}</span>
        </div>
        {variant === "interview" ? (
          <>
            <div className="flex flex-col gap-2">
              <span className="text-label-01 text-text-secondary">기업명</span>
              <span className="text-body-01 text-text-primary">
                {props.companyName}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-label-01 text-text-secondary">직무</span>
              <span className="text-body-01 text-text-primary">
                {props.role}
              </span>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <span className="text-label-01 text-text-secondary">목표 시간</span>
            <span className="text-body-01 text-text-primary">
              {props.targetTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
