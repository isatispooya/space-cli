import { create } from "zustand";

export interface underwritingStoreTypes {
  id: number;
  setId: (id: number) => void;
}

export const useUnderwritingStore = create<underwritingStoreTypes>(
  (set) => ({
    id: 0,
    setId: (id: number) => set({ id }),
  })
);
