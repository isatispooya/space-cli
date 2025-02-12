import { create } from "zustand";
import { CrowdPointsStore } from "../types";

const useCrowdPointsStore = create<CrowdPointsStore>((set) => ({
  isOpen: false,
  data: [],
  selectedPlan: null,
  traceCode: null,
  searchQuery: "",
  visibleItems: 10,
  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setTraceCode: (code) => set({ traceCode: code }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setVisibleItems: (count) =>
    set((state) => ({ visibleItems: state.visibleItems + count })),
}));

export default useCrowdPointsStore;
