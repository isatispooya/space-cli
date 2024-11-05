// src/stores/toastStore.ts
import { create } from "zustand";
import { ReactNode } from "react";

interface ToastState {
  message: string;
  icon?: ReactNode;
  isVisible: boolean;
  showToast: (message: string, icon?: ReactNode, duration?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: "",
  icon: null,
  isVisible: false,
  showToast: (message, icon = null, duration = 3000) => {
    set({ message, icon, isVisible: true });
    setTimeout(() => set({ isVisible: false }), duration);
  },
  hideToast: () => set({ isVisible: false }),
}));
