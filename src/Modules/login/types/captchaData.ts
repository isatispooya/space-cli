export interface Captcha {
  encrypted_response: string;
  image: string;
}

export interface CaptchaData {
  captcha: Captcha;
}
