import { create } from "zustand";
import { MissionStoreTypes } from "../types";



const useMissionStore = create<MissionStoreTypes>((set) => ({
  startTime: null,
  endTime: null,
  setStartTime: (startTime: Date | null) => set({ startTime }),
  setEndTime: (endTime: Date | null) => set({ endTime }),
  approvedItems: [],
  setApprovedItems: (approvedItems: number[]) => set({ approvedItems }),
}));

export default useMissionStore;
