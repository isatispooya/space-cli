import { create } from "zustand";

interface SidebarStoreType {
  isOpen: boolean;
  toggleSidebar: () => void;
}
interface SearchStoreType {
  search: string;
  setSearch: (search: string) => void;
}

export const useSidebarStore = create<SidebarStoreType>((set) => ({
  isOpen: false,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useSearchStore = create<SearchStoreType>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
}));
