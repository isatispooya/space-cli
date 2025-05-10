import { PlansType } from "./plans.type";

export interface CrowdPointsStoreType {
  isOpen: boolean;
  data: PlansType[];
  selectedPlan: PlansType | null;
  traceCode: string | null;
  searchQuery: string;
  visibleItems: number;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedPlan: (plan: PlansType | null) => void;
  setTraceCode: (code: string | null) => void;
  setSearchQuery: (query: string) => void;
  setVisibleItems: (count: number) => void;
}
