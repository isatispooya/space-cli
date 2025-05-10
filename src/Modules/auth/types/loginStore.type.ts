export interface LoginStoreType {
  nationalCode: string;
  smsCode: string;
  newPass: string;
  confirmNewPass: string;
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
  setSmsCode: (code: string) => void;
  setNewPass: (pass: string) => void;
  setConfirmNewPass: (pass: string) => void;
  setCaptchaInput: (input: string) => void;
  setEncryptedResponse: (response: string | null) => void;
  setOpenOtp: (open: boolean) => void;
}
