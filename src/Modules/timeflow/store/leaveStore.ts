import { create } from "zustand";
import { LeaveStoreTypes } from "../types";



const useLeaveStore = create<LeaveStoreTypes>((set) => ({
  startTime: null,
  endTime: null,
  setStartTime: (startTime: Date | null) => set({ startTime }),
  setEndTime: (endTime: Date | null) => set({ endTime }),
  approvedItems: [],
  setApprovedItems: (approvedItems: number[]) => set({ approvedItems }),
}));

export default useLeaveStore;
