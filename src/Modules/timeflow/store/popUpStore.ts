import { create } from "zustand";
import OwnLog from "../types/ownLogs.type";
import OtherLog from "../types/otherLogs.type";

interface LogStateType {
  ownLogs: OwnLog[];
  otherLogs: OtherLog[];
  isOpenOwn: boolean;
  isOpenOther: boolean;
  selectedOwnTimes: Record<number, Date | null>;
  selectedOtherTimes: Record<number, Date | null>;
  setOwnLogs: (logs: OwnLog[]) => void;
  setOtherLogs: (logs: OtherLog[]) => void;
  setIsOpenOwn: (isOpen: boolean) => void;
  setIsOpenOther: (isOpen: boolean) => void;
  setSelectedOwnTimes: (logId: number, newTime: Date | null) => void;
  setSelectedOtherTimes: (logId: number, newTime: Date | null) => void;
}

const useLogStore = create<LogStateType>((set) => ({
  ownLogs: [] as OwnLog[],
  otherLogs: [] as OtherLog[],
  isOpenOwn: false,
  isOpenOther: false,
  selectedOwnTimes: {} as Record<number, Date | null>,
  selectedOtherTimes: {} as Record<number, Date | null>,
  setOwnLogs: (logs: OwnLog[]) => set({ ownLogs: logs }),
  setOtherLogs: (logs: OtherLog[]) => set({ otherLogs: logs }),
  setIsOpenOwn: (isOpen: boolean) => set({ isOpenOwn: isOpen }),
  setIsOpenOther: (isOpen: boolean) => set({ isOpenOther: isOpen }),
  setSelectedOwnTimes: (logId: number, newTime: Date | null) =>
    set((state) => ({
      selectedOwnTimes: {
        ...state.selectedOwnTimes,
        [logId]: newTime,
      },
    })),
  setSelectedOtherTimes: (logId: number, newTime: Date | null) =>
    set((state) => ({
      selectedOtherTimes: {
        ...state.selectedOtherTimes,
        [logId]: newTime,
      },
    })),
}));

export default useLogStore;
