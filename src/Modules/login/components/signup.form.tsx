import React, { useState } from "react";
import InputLogin from "./inputLogin";
import CaptchaImg from "./chaptchaImg";
import { useLoginStore } from "../store/loginStore";
import { motion } from "framer-motion";
import useRegister from "../hooks/useRegister";
import useApplyNationalCode from "../hooks/useOtp";
import { fadeIn } from "../animations/fadeIn";
import toast, { Toaster } from "react-hot-toast";

const SignupForm = () => {
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const { mutate: signupMutate, isError: signupError } = useApplyNationalCode();
  const { mutate: register } = useRegister();
  const {
    nationalCode,
    captchaInput,
    encryptedResponse,
    setNationalCode,
    setCaptchaInput,
    setEncryptedResponse,
    otp,
    setOtp,
  } = useLoginStore();

  const handleRegister = () => {
    register({
      nationalCode,
      otpValue: otp,
    });
  };

  const handleCaptchaSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nationalCode || !captchaInput || !encryptedResponse) {
      toast.error("لطفا همه فیلد ها را پر کنید");
      return;
    }
    signupMutate(
      {
        nationalCode,
        captchaInput,
        encryptedResponse,
      },
      {
        onSuccess: () => {
          setShowOtpInput(true);
          toast.success("کد تایید با موفقیت ارسال شد");
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
  };

  if (signupError) {
    toast.error("خطا در برقراری ارتباط");
  }

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <InputLogin
          type="text"
          label="کدملی"
          placeholder="کدملی"
          value={nationalCode}
          disabled={showOtpInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNationalCode(e.target.value)}
        />

        {!showOtpInput && (
          <>
            <InputLogin
              type="text"
              label="کپچا"
              placeholder="کپچا"
              value={captchaInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaptchaInput(e.target.value)}
             
            />
            <CaptchaImg setEncryptedResponse={setEncryptedResponse} />
            <button
              className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
              type="submit"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={handleCaptchaSend}
            >
              ورود
            </button>
          </>
        )}

        {showOtpInput && (
          <InputLogin
            type="text"
            label="کد تایید"
            placeholder="کد تایید را وارد کنید"
            value={otp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
          />
        )}

        {showOtpInput && (
          <motion.div {...fadeIn(0.4,  0, 0.4)} className="mb-6 text-center">
            <button
              type="button"
              className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
              onClick={handleRegister}
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              تایید و ثبت نام
            </button>
          </motion.div>
        )}
      </form>
    </>
  );
};

export default SignupForm;
