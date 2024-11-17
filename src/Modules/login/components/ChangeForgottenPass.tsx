import React, { useState } from "react";
import { useParams } from "react-router-dom";
import InputLogin from "./InputLogin";
import useChangePass from "../hooks/useChangePass";
import { ResetPassParams } from "../types/forgetPass.type";
import LoginHead from "./login-head";
import { motion } from "framer-motion";
import { fadeIn } from "../animations/fadeIn";

const ChangeForgottenPass: React.FC = () => {
  const [newPass, setNewPass] = useState<string>("");
  const [confirmNewPass, setConfirmNewPass] = useState<string>("");

  const { uuid } = useParams();
  const { mutate: changePassMutate } = useChangePass(uuid);

  const handleChangePass = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resetPassData: ResetPassParams = { newPass, confirmNewPass };
    changePassMutate(resetPassData);
  };

  return (
    <section
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-neutral-200 dark:bg-neutral-700"
    >
      <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 ">
        <div className="w-full ">
          <div className="rounded-lg bg-white shadow-lg dark:bg-neutral-800 ">
            <div className="lg:flex lg:flex-wrap ">
              <div className="px-4 md:px-5 lg:w-full p-8 ">
                <motion.div
                  {...fadeIn(0.4, 20)}
                  className="mx-auto p-4 md:p-8  border-2 border-gray-300 rounded-xl"
                >
                  <LoginHead />
                  <form onSubmit={handleChangePass}>
                    <InputLogin
                      type="password"
                      label="رمز عبور جدید"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                    <InputLogin
                      type="password"
                      label="تکرار رمز عبور جدید"
                      value={confirmNewPass}
                      onChange={(e) => setConfirmNewPass(e.target.value)}
                    />

                    <button
                      className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
                      type="submit"
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                    >
                      تغییر رمز ورود
                    </button>
                  </form>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChangeForgottenPass;
