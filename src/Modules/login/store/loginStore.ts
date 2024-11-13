import { create } from "zustand";
import { LoginStore } from "../types/loginStore.type";

export const useLoginStore = create<LoginStore>((set) => ({
  nationalCode: "",
  captchaInput: "",
  encryptedResponse: null,
  password: "",
  otp: "",
  openOtp: false,

  activeTab: "login" as "login" | "signup",
  setPassword: (pass) => set({ password: pass }),
  setNationalCode: (code) => set({ nationalCode: code }),
  setCaptchaInput: (input) => set({ captchaInput: input }),
  setEncryptedResponse: (response) => set({ encryptedResponse: response }),
  setOtp: (value) => set({ otp: value }),
  setOpenOtp: (open) => set({ openOtp: open }),
  setActiveTab: (tab: "login" | "signup") => set({ activeTab: tab }),
}));
