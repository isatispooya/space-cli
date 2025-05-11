import { create } from "zustand";
import { CrowdPointsStoreType } from "../types";
import { PlansType } from "../types/plans.type";

const useCrowdPointsStore = create<CrowdPointsStoreType>((set) => ({
  isOpen: false,
  data: [],
  selectedPlan: null,
  traceCode: null,
  searchQuery: "",
  visibleItems: 10,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  setSelectedPlan: (plan: PlansType | null) => set({ selectedPlan: plan }),
  setTraceCode: (code: string | null) => set({ traceCode: code }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setVisibleItems: (count: number) =>
    set((state: CrowdPointsStoreType) => ({ visibleItems: state.visibleItems + count })),
}));

export default useCrowdPointsStore;
