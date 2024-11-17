import * as React from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { motion } from "framer-motion";
import { fadeIn } from "./animations/fadeIn";
import LoginHead from "./components/login-head";
import TabButton from "./components/tab-button";
import { LoginForm } from "./components";
import SignupForm from "./components/signup.form";
import ForgetPass from "./components/forgetPass";

initTWE({ Input, Ripple });

const Login: React.FC = () => {
  const [activeComponent, setActiveComponent] = React.useState<
    "login" | "signup" | "forgotPassSms"
  >("login");

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveComponent(tab);
  };

  const forgetPassRender = () => {
    setActiveComponent("forgotPassSms");
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const number : string =  "112345678766554324567897654324567876543224567865433245678976543245678798765432456789765432456789"
  return (
    <section
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-neutral-200 dark:bg-neutral-700"
    >
      <motion.div
        {...fadeIn(0.2, 0, 0.8)}
        className="container mx-auto p-4 md:p-8 max-w-md"
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
                    <TabButton
                      activeTab={
                        activeComponent === "forgotPassSms"
                          ? "login"
                          : activeComponent
                      }
                      onTabChange={handleTabChange}
                    />
                    <LoginHead />
                    {activeComponent === "login" && <LoginForm />}
                    {activeComponent === "signup" && <SignupForm />}
                    {activeComponent === "forgotPassSms" && <ForgetPass />}
                    {activeComponent === "login" && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={forgetPassRender}
                          className=" hover:underline dark:text-blue-400"
                        >
                          فراموشی رمز عبور؟
                        </button>
                      </div>
                    )}
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
