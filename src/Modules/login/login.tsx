import * as React from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { motion } from "framer-motion";
import Logo from "../../components/logo";

initTWE({ Input, Ripple });

const Login = () => {
  return (
    <section
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-neutral-200 dark:bg-neutral-700"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-4 md:p-8 max-w-md"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200"
        >
          <div className="w-full">
            <div className="rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="lg:flex lg:flex-wrap">
                <div className="px-4 md:px-5 lg:w-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mx-auto p-4 md:p-8"
                  >
                    <div className="text-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mx-auto w-20 md:w-36"
                      >
                        <Logo />
                      </motion.div>
                      <motion.h4
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mb-3 mt-1 text-lg font-semibold"
                      >
                        ایساتیس پویا
                      </motion.h4>
                    </div>

                    <form>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="relative mb-3"
                        data-twe-input-wrapper-init
                      >
                        <input
                          type="text"
                          className="peer block w-full  border-b-2 bg-transparent px-2 py-1.5 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          placeholder="نام کاربری"
                        />
                        <label className="pointer-events-none absolute right-3 top-1 mb-0 origin-0 pt-0.5 text-sm text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.8rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400">
                          کدملی
                        </label>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        className="relative mb-3"
                        data-twe-input-wrapper-init
                      >
                        <input
                          type="password"
                          className="peer block  w-full  border-b-2 bg-transparent px-2 py-1.5 leading-6 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 dark:text-white dark:placeholder:text-neutral-300 [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                          placeholder="کلمه عبور"
                        />
                        <label className="pointer-events-none absolute right-3 top-1 mb-0 origin-0 pt-0.5 text-sm text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.8rem] peer-focus:scale-[0.8] peer-focus:text-primary dark:text-neutral-400">
                          کلمه عبور
                        </label>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                        className="mb-6 text-center"
                      >
                        <a href="/dashboard">
                          <button
                            className="inline-block w-full mt-5 rounded px-4 py-2 bg-gradient-to-r from-[#295270] to-[#524175] text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out"
                            type="button"
                            data-twe-ripple-init
                            data-twe-ripple-color="light"
                          >
                            ورود
                          </button>
                        </a>

                        <a
                          href="#!"
                          className="text-xs text-neutral-500 mt-4 inline-block"
                        >
                          فراموشی رمز عبور
                        </a>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.8 }}
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
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Login;
