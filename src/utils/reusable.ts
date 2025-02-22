import dayjs from "dayjs";

export const formatTime = (time: Date | null): string => {
  return time ? dayjs(time).toISOString() : "";
};

export const updateLogs = <T extends { id: number }>(
  logs: T[],
  logId: number,
  updates: Partial<T>
): T[] => {
  return logs.map((log) =>
    log.id === logId ? { ...log, ...updates } : log
  );
};

export const clearSelectedTime = (
  selectedTimes: Record<number, Date | null>,
  logId: number
): Record<number, Date | null> => {
  const newTimes = { ...selectedTimes };
  delete newTimes[logId];
  return newTimes;
};