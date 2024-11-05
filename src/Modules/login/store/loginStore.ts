import { create } from "zustand";
import { LoginStore } from "../types";

export const useLoginStore = create<LoginStore>((set) => ({
  nationalCode: "",
  captchaInput: "",
  encryptedResponse: null,
  password : "",
  setPassword : (pass) => set({password : pass}),
  setNationalCode: (code) => set({ nationalCode: code }),
  setCaptchaInput: (input) => set({ captchaInput: input }),
  setEncryptedResponse: (response) => set({ encryptedResponse: response }),
  
}));
