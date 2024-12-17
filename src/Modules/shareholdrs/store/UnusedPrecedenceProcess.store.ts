import { create } from "zustand";
import { UnusedPrecedenceProcessStore } from "../types";



export const useUnusedPrecedenceProcessStore = create<UnusedPrecedenceProcessStore>((set) => ({
  id: 0,
  setId: (id: number) => set({ id }),
}));
