export interface LoginStore {
  nationalCode: string;
  captchaInput: string;
  encryptedResponse: string | null;
  password: string;
  setPassword: (pass: string) => void;
  setNationalCode: (code: string) => void;
  setCaptchaInput: (input: string) => void;
  setEncryptedResponse: (response: string | null) => void;
}
