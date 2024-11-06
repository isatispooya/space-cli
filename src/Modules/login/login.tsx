import * as React from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { motion } from "framer-motion";
import { fadeIn } from "./animations/fadeIn";
import LoginHead from "./components/login-head";
import TabButton from "./components/tab-button";
import { LoginForm } from "./components";
import SignupForm from "./components/signup.form";

initTWE({ Input, Ripple });

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<"login" | "signup">("login");

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
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
                    <LoginHead />
                    <TabButton
                      activeTab={activeTab}
                      onTabChange={handleTabChange}
                    />
                    {activeTab === "login" && <LoginForm />}
                    {activeTab === "signup" && <SignupForm />}
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
