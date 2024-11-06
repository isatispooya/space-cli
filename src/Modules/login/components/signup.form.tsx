import React, { useState } from "react";
import InputLogin from "./InputLogin";
import CaptchaImg from "./chaptchaImg";
import { useLoginStore } from "../store/loginStore";
import { motion } from "framer-motion";
import useRegister from "../hooks/useRegister";
import useApplyNationalCode from "../hooks/useOtp";
import { fadeIn } from "../animations/fadeIn";
import toast, { Toaster } from "react-hot-toast";

const SignupForm = () => {
  const [showOtpInput, setShowOtpInput] = useState(false); // State to control OTP input visibility
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
      alert("Please fill all fields and ensure CAPTCHA is loaded.");
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
          toast.success("CAPTCHA verified successfully!");
        },
      }
    );
  };

  if (signupError) {
    toast.error("خطا در برقراری ارتباط");
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form>
        <InputLogin
          type="text"
          label="کدملی"
          placeholder="کدملی"
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
        />

        {!showOtpInput && (
          <>
            <InputLogin
              type="text"
              label="کپچا"
              placeholder="کپچا"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
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
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        {showOtpInput && (
          <motion.div {...fadeIn(1.6, 20)} className="mb-6 text-center">
            <button
              type="button"
              className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
              onClick={handleRegister}
              data-twe-ripple-init
              data-twe-ripple-color="light"
            >
              تایید و ثبت نام نهایی
            </button>
          </motion.div>
        )}
      </form>
    </>
  );
};

export default SignupForm;
