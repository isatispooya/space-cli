import { create } from "zustand";

interface TabStore {
  activeTab: 'login' | 'signup';
  setActiveTab: (tab: 'login' | 'signup') => void;
}

export const useTabStore = create<TabStore>((set) => ({
  activeTab: 'login',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

