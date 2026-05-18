import type { FC } from "react";

import { FileText } from "lucide-react";

import { Pagination } from "@/shared/ui/Pagination/Pagination";
import { cn } from "@/utils/cn";

export interface FolderSession {
  id: string;
  title: string;
  type: string;
  date: string;
}

export interface FolderSessionListProps {
  sessions: FolderSession[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export const FolderSessionList: FC<FolderSessionListProps> = ({
  sessions,
  currentPage = 1,
  totalPages = 5,
  onPageChange,
  className,
}) => {
  return (
    <section className={cn("w-full", className)}>
      <div className="overflow-hidden rounded-sm border border-border-deactivated bg-background-light">
        <ul className="divide-y divide-border-deactivated">
          {sessions.map((session) => (
            <li
              key={session.id}
              className="flex items-center justify-between gap-5 px-6 py-5"
            >
              <div className="flex min-w-0 items-center gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-md bg-primary-100 text-primary-900">
                  <FileText size={20} strokeWidth={2.2} />
                </span>

                <div className="min-w-0">
                  <h2 className="text-body-01 line-clamp-1 text-text-primary">
                    {session.title}
                  </h2>
                  <p className="text-body-03 mt-1 text-text-secondary">
                    <span className="font-medium text-primary-900">
                      {session.type}
                    </span>
                    <span className="mx-2 text-text-deactivated">•</span>
                    {session.date}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="text-label-06 shrink-0 rounded-md border border-primary-900 px-5 py-2 text-primary-900 transition-colors hover:bg-primary-50"
              >
                리포트 보기
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="mt-16"
      />
    </section>
  );
};
