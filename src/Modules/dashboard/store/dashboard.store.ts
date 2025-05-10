import { create } from "zustand";

interface DashboardStoreType {
  runTour: boolean;
  setRunTour: (runTour: boolean) => void;
}
const useDashboardStore = create<DashboardStoreType>((set) => ({
  runTour: !localStorage.getItem("dashboardTourCompleted"),
  setRunTour: (runTour) => set({ runTour }),
}));

export default useDashboardStore;
