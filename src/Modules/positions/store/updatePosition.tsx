import { create } from "zustand";

export const useUpdatePositionStore = create<{
  id: number;
  setId: (id: number) => void;
}>((set) => ({
  id: 0,
  setId: (id) => set({ id }),
}));
