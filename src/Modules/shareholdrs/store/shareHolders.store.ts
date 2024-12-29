import { create } from "zustand";

export const useShareHoldersStore = create<{
  id: number;
  setId: (id: number) => void;
}>((set) => ({
  id: 0,
  setId: (id) => set({ id }),
}));
