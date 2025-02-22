import { create } from "zustand";
import OwnLog from "../types/ownLogs.type";
import OtherLog from "../types/otherLogs.type";

// Zustand store definition
const useLogStore = create((set: any) => ({
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
    set((state: any) => ({
      selectedOwnTimes: {
        ...state.selectedOwnTimes,
        [logId]: newTime,
      },
    })),
  setSelectedOtherTimes: (logId: number, newTime: Date | null) =>
    set((state: any) => ({
      selectedOtherTimes: {
        ...state.selectedOtherTimes,
        [logId]: newTime,
      },
    })),
}));

export default useLogStore;
