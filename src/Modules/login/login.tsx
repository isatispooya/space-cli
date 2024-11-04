import * as React from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { motion } from "framer-motion";
import Logo from "../../components/logo";
import { fadeIn } from "./animations/fadeIn";
import InputLogin from "./components/InputLogin";
import CaptchaImg from "./components/chaptchaImg";
import useApplyNationalCode from "./hooks/useOtp";
import { useLoginStore } from "./store/loginStore";

initTWE({ Input, Ripple });

const Login: React.FC = () => {
  const {
    nationalCode,
    captchaInput,
    encryptedResponse,
    setNationalCode,
    setCaptchaInput,
    setEncryptedResponse,
  } = useLoginStore();

  const { mutate } = useApplyNationalCode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("National Code:", nationalCode);
    console.log("Captcha Input:", captchaInput);
    console.log("Encrypted Response:", encryptedResponse);

    if (!nationalCode || !captchaInput || !encryptedResponse) {
      alert("Please fill all fields and ensure CAPTCHA is loaded.");
      return;
    }

    mutate({
      nationalCode,
      captchaInput,
      encryptedResponse,
    });
  };

  return (
    <section
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-neutral-200 dark:bg-neutral-700"
    >
      <motion.div
        {...fadeIn(0.2, 0, 0.8)}
        className="container mx-auto p-4 md:p-8 max-w-md"
      >
        <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="lg:flex lg:flex-wrap">
                <div className="px-4 md:px-5 lg:w-full">
                  <motion.div
                    {...fadeIn(0.4, 20)}
                    className="mx-auto p-4 md:p-8"
                  >
                    <div className="text-center">
                      <motion.div
                        {...fadeIn(0.6, 0, 0.5)}
                        className="mx-auto w-20 md:w-36"
                      >
                        <Logo positionSize={null} />
                      </motion.div>
                      <motion.h4
                        {...fadeIn(0.8, -20)}
                        className="mb-3 mt-1 text-lg font-semibold"
                      >
                        ایساتیس پویا
                      </motion.h4>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <InputLogin
                        type="text"
                        label="کدملی"
                        placeholder="کدملی"
                        value={nationalCode}
                        onChange={(e) => setNationalCode(e.target.value)}
                      />
                      <InputLogin
                        type="text"
                        label="کپچا"
                        placeholder="کپچا"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                      />

                      <CaptchaImg setEncryptedResponse={setEncryptedResponse} />

                      <motion.div
                        {...fadeIn(1.6, 20)}
                        className="mb-6 text-center"
                      >
                        <button
                          className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
                          type="submit"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          {"ورود"}
                        </button>
                        <a
                          href="#!"
                          className="text-xs text-neutral-500 mt-4 inline-block"
                        >
                          فراموشی رمز عبور
                        </a>
                      </motion.div>

                      <motion.div
                        {...fadeIn(1.8, 20)}
                        className="flex items-center justify-between pb-4"
                      >
                        <p className="mb-0 text-xs">حساب کاربری ندارید؟</p>
                        <button
                          type="button"
                          className="inline-block text-xs text-blue-500"
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          ثبت نام
                        </button>
                      </motion.div>
                    </form>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
