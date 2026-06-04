import type { StatsRecord } from "@/shared/ui/MainSection/StatsSection/statsCalc";

const createMockRecord = (
  createAt: string,
  finalScore: number,
): StatsRecord => ({
  createAt,
  finalScore,
});

export const mockRecords: StatsRecord[] = [
  createMockRecord("2026/03/28", 88),
  createMockRecord("2026/03/25", 85),
  createMockRecord("2026/03/25", 86),
  createMockRecord("2026/03/22", 84),
  createMockRecord("2026/03/22", 83),
  createMockRecord("2026/03/22", 87),
  createMockRecord("2026/03/20", 82),
  createMockRecord("2026/03/18", 80),
  createMockRecord("2026/03/18", 81),
  createMockRecord("2026/03/15", 78),
  createMockRecord("2026/03/12", 76),
  createMockRecord("2026/03/10", 74),
  createMockRecord("2026/03/10", 77),
  createMockRecord("2026/03/10", 75),
  createMockRecord("2026/03/07", 71),
  createMockRecord("2026/03/04", 68),
  createMockRecord("2026/02/26", 72),
  createMockRecord("2026/02/22", 70),
  createMockRecord("2026/02/18", 69),
  createMockRecord("2026/02/14", 67),
  createMockRecord("2026/02/09", 65),
  createMockRecord("2026/02/04", 63),
];
