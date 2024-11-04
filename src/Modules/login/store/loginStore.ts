// src/stores/useLoginStore.ts
import { create } from "zustand";

interface LoginStore {
  nationalCode: string;
  captchaInput: string;
  encryptedResponse: string | null;
  setNationalCode: (code: string) => void;
  setCaptchaInput: (input: string) => void;
  setEncryptedResponse: (response: string | null) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  nationalCode: "",
  captchaInput: "",
  encryptedResponse: null,
  setNationalCode: (code) => set({ nationalCode: code }),
  setCaptchaInput: (input) => set({ captchaInput: input }),
  setEncryptedResponse: (response) => set({ encryptedResponse: response }),
}));
