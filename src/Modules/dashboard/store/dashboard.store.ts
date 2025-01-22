import { create } from "zustand";

interface DashboardStore {
  runTour: boolean;
  setRunTour: (runTour: boolean) => void;
}
const useDashboardStore = create<DashboardStore>((set) => ({
  runTour: !localStorage.getItem("dashboardTourCompleted"),
  setRunTour: (runTour) => set({ runTour }),
}));

export default useDashboardStore;
