import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggleSidebar: () => void;
}
interface searchStore {
  search: string;
  setSearch: (search: string) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useSearchStore = create<searchStore>((set) => ({
  search: "",
  setSearch: (search: string) =>set({ search }),
}));
