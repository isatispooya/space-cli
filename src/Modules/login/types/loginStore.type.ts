export interface LoginStore {
  nationalCode: string;
  captchaInput: string;
  encryptedResponse: string | null;
  password: string;
  otp: string;
  openOtp: boolean;
  setOtp: (value: string) => void;
  setPassword: (pass: string) => void;
  setNationalCode: (code: string) => void;
  setCaptchaInput: (input: string) => void;
  setEncryptedResponse: (response: string | null) => void;
  setOpenOtp: (open: boolean) => void;
}
