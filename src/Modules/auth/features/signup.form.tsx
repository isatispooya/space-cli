import React, { useState } from "react";
import InputLogin from "../../../components/inputBase";
import CaptchaImg from "../components/captcha";
import { useLoginStore } from "../stores/loginStore";
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
    toast.error("شما قبلا ثبت نام کرده‌اید");
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNationalCode(e.target.value)
          }
        />

        {!showOtpInput && (
          <>
            <InputLogin
              type="text"
              label="کد امنیتی"
              value={captchaInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCaptchaInput(e.target.value)
              }
            />
            <CaptchaImg setEncryptedResponse={setEncryptedResponse} />
            <motion.button
              className="inline-block w-full mt-5 rounded px-4 py-3 text-md font-medium uppercase bg-[#29D2C7] leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-[#25beb4]"
              type="submit"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={handleCaptchaSend}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#25beb4",
              }}
              whileTap={{
                scale: 0.98,
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#1fa39a",
              }}
              {...fadeIn(0.4, 0, 0.4)}
            >
              ثبت نام
            </motion.button>
          </>
        )}

        {showOtpInput && (
          <InputLogin
            type="text"
            label="کد تایید"
            placeholder="کد تایید را وارد کنید"
            value={otp}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setOtp(e.target.value)
            }
          />
        )}

        {showOtpInput && (
          <motion.div {...fadeIn(0.4, 0, 0.4)} className="mb-6 text-center">
            <button
              type="button"
              className="inline-block w-full mt-5 rounded px-4 py-3 text-md font-medium uppercase bg-blue-950 leading-normal text-white shadow-md transition duration-150 ease-in-out"
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
