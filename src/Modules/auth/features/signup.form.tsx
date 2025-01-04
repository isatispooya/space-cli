import React, { useState } from "react";
import InputLogin from "../../../components/inputBase";
import CaptchaImg from "../components/captcha";
import { useLoginStore } from "../stores/loginStore";
import { motion } from "framer-motion";
import useRegister from "../hooks/useRegister";
import useApplyNationalCode from "../hooks/useOtp";
import { fadeIn } from "../animations/fadeIn";
import toast from "react-hot-toast";
import Spinner from "../../../components/spinner";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../../types";

const SignupForm = () => {
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);
  const { mutate: signupMutate, isPending: signupPending } =
    useApplyNationalCode();
  const { mutate: register, isPending: registerPending } = useRegister();
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

  const urlParams = new URLSearchParams(window.location.search);
  const referal = urlParams.get('rf') || '';


  const handleRegister = () => {
    register(
      {
        nationalCode,
        otpValue: otp,

      },
      {
        onSuccess: () => {
          setOtp("");
        },
        onError: () => {
          setOtp("");
        },
      }
    );
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
        referal,
      },
      {
        onSuccess: () => {
          setShowOtpInput(true);
          toast.success("کد تایید با موفقیت ارسال شد");
          setCaptchaInput("");
          setEncryptedResponse("");
        },
        onError: (error: AxiosError<unknown>) => {
          const errorMessage = (error.response?.data as ErrorResponse)?.error;
          toast.error(errorMessage || "خطایی رخ داده است");
          setCaptchaInput("");
          setEncryptedResponse("");
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
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
              className="inline-block w-full mt-5 rounded px-4 py-3 text-md font-medium uppercase bg-blue-950 leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-900"
              type="submit"
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={handleCaptchaSend}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#1e3a8a",
              }}
              whileTap={{
                scale: 0.98,
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#1e3a8a",
              }}
              {...fadeIn(0.4, 0, 0.4)}
            >
              {signupPending ? <Spinner /> : "ثبت نام"}
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
              {registerPending ? <Spinner /> : "تایید و ثبت نام"}
            </button>
          </motion.div>
        )}
      </form>
    </>
  );
};

export default SignupForm;
