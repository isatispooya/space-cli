export interface LoginStore {
  nationalCode: string;
  captchaInput: string;
  encryptedResponse: string | null;
  password: string;
  otp: string;
  openOtp: boolean;
  activeTab: "login" | "signup";
  setActiveTab: (tab: "login" | "signup") => void;
  setOtp: (value: string) => void;
  setPassword: (pass: string) => void;
  setNationalCode: (code: string) => void;
  setCaptchaInput: (input: string) => void;
  setEncryptedResponse: (response: string | null) => void;
  setOpenOtp: (open: boolean) => void;
}
