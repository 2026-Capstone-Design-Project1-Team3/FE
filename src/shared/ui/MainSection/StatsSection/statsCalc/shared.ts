export interface StatsRecord {
  createAt?: string;
  finalScore?: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

export const THIRTY_DAYS = 30;

const DATE_SEPARATOR_REGEXP = /[./-]/;

export const getLatestRecordDate = (records: StatsRecord[]) =>
  records.reduce<Date | null>((latest, record) => {
    const recordDate = parseRecordDate(record.createAt);

    if (!recordDate) {
      return latest;
    }

    return !latest || recordDate > latest ? recordDate : latest;
  }, null);

export const getThirtyDayRange = (baseDate: Date): DateRange => {
  const endDate = startOfDay(baseDate);
  const startDate = addDays(endDate, -(THIRTY_DAYS - 1));

  return { startDate, endDate };
};

export const getPreviousThirtyDayRange = ({
  startDate,
}: DateRange): DateRange => {
  const endDate = addDays(startDate, -1);
  const previousStartDate = addDays(endDate, -(THIRTY_DAYS - 1));

  return { startDate: previousStartDate, endDate };
};

export const getRecordsInRange = (records: StatsRecord[], range: DateRange) =>
  records
    .map((record) => ({
      record,
      date: parseRecordDate(record.createAt),
    }))
    .filter(
      (
        item,
      ): item is {
        record: StatsRecord;
        date: Date;
      } =>
        item.date !== null &&
        item.date >= range.startDate &&
        item.date <= range.endDate,
    );

export const getScoresInRange = (records: StatsRecord[], range: DateRange) =>
  getRecordsInRange(records, range)
    .map(({ record }) => record.finalScore)
    .filter((score): score is number => typeof score === "number");

export const addDays = (date: Date, amount: number) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + amount);

  return nextDate;
};

export const formatDateKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const parseRecordDate = (dateText?: string) => {
  const [year, month, day] = dateText
    ?.split(DATE_SEPARATOR_REGEXP)
    .map(Number) ?? [0, 0, 0];

  if (!year || !month || !day) {
    return null;
  }

  const date = new Date(year, month - 1, day);

  return Number.isNaN(date.getTime()) ? null : startOfDay(date);
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());
