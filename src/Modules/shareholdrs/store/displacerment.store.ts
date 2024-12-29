import { create } from "zustand";

export const useDisplacementStore = create<{
  id: number;
  setId: (id: number) => void;
}>((set) => ({
  id: 0,
  setId: (id: number) => set({ id }),
}));
