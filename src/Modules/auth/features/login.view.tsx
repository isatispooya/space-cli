import * as React from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { motion } from "framer-motion";
import { fadeIn } from "../animations/fadeIn";
import LoginHead from "../components/login-head";
import LoginForm from "./login.form";
import SignupForm from "./signup.form";
import ForgetPassSms from "./forget_pass_sms.form";
import ForgetPassForm from "./forget_pass.form";
import rb from "./rb.png";
import { useAnnouncements } from "../hooks";
import { LoaderLg } from "../../../components";

initTWE({ Input, Ripple });

const Login: React.FC = () => {
  const [activeComponent, setActiveComponent] = React.useState<
    "login" | "signup" | "forgetpass"
  >("login");

  const [isSmsVerified, setIsSmsVerified] = React.useState(false);
  const { data, isLoading } = useAnnouncements();
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] =
    React.useState(0);

  React.useEffect(() => {
    if (data && data.length > 1) {
      const timer = setInterval(() => {
        setCurrentAnnouncementIndex((prev) =>
          prev === data.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [data]);

  const currentAnnouncement = data?.[currentAnnouncementIndex];

  const handleComponentChange = (
    component: "login" | "signup" | "forgetpass"
  ) => {
    setActiveComponent(component);
    setIsSmsVerified(false);
  };

  if (isLoading) return <LoaderLg />;

  return (
    <section
      dir="rtl"
      className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-neutral-200 dark:bg-neutral-700"
    >
      <div className=" md:flex md:w-6/12 flex-col items-center justify-center space-y-2 order-1">
        <motion.img
          key={currentAnnouncement?.id}
          {...fadeIn(0.05, 20)}
          src={currentAnnouncement?.picture || rb}
          alt={currentAnnouncement?.title || "Login illustration"}
          className="hidden md:block w-4/5 max-w-lg object-contain"
        />
        <motion.div
          key={`text-${currentAnnouncement?.id}`}
          {...fadeIn(0.05, 40)}
          className="text-center text-neutral-800 dark:text-neutral-200"
        >
          <h2 className="text-3xl font-bold mb-4">
            {currentAnnouncement?.title || "به سامانه ایساتیس پویا آمدید"}
          </h2>
          <p className="text-lg mb-6">
            {currentAnnouncement?.description ||
              "ایساتیس پویا یک سامانه آسان و سریع برای ثبت و مدیریت سهام و سهامداران است."}
          </p>
          {currentAnnouncement?.link && (
            <motion.a
              href={currentAnnouncement.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2.5 bg-blue-500 text-white rounded-full
                        hover:bg-blue-600 transition-all duration-300 transform hover:scale-105
                        shadow-md hover:shadow-lg mb-6"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              مشاهده بیشتر
              <span className="mr-2">→</span>
            </motion.a>
          )}
          {data && data.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {data.map((_ : unknown, index : number) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentAnnouncementIndex
                      ? "bg-blue-500 w-4"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
      <motion.div
        {...fadeIn(0.05, 0, 0.4)}
        className="container mx-auto p-4 md:p-8 max-w-md order-0"
      >
        <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200 ">
          <div className="w-full ">
            <div className="rounded-lg bg-white shadow-lg dark:bg-neutral-800 ">
              <div className="lg:flex lg:flex-wrap ">
                <div className="px-4 md:px-5 lg:w-full p-8 ">
                  <motion.div
                    {...fadeIn(0.05, 10)}
                    className="mx-auto p-4 md:p-8   "
                  >
                    <div className="mb-10">
                      <LoginHead />
                    </div>
                    {activeComponent === "login" && (
                      <>
                        <LoginForm
                          handleComponentChange={handleComponentChange}
                        />
                        <div className=" text-center text-sm mt-4">
                          <span className="text-gray-600">
                            حساب کاربری ندارید؟{" "}
                          </span>
                          <button
                            onClick={() => handleComponentChange("signup")}
                            className="text-blue-600 hover:text-blue-700 hover:underline mr-1 text-md"
                          >
                            ثبت‌نام کنید
                          </button>
                        </div>
                      </>
                    )}
                    {activeComponent === "signup" && (
                      <>
                        <SignupForm />
                        <div className="mt-4 text-center text-sm">
                          <span className="text-gray-600">
                            قبلاً ثبت‌نام کرده‌اید؟{" "}
                          </span>
                          <button
                            onClick={() => handleComponentChange("login")}
                            className="text-blue-600 hover:text-blue-700 hover:underline mr-1 text-md"
                          >
                            وارد شوید
                          </button>
                        </div>
                      </>
                    )}
                    {activeComponent === "forgetpass" && (
                      <>
                        {!isSmsVerified ? (
                          <ForgetPassSms
                            onVerificationSuccess={() => setIsSmsVerified(true)}
                          />
                        ) : (
                          <ForgetPassForm />
                        )}
                        <div className="mt-4 text-center text-sm">
                          <button
                            onClick={() => handleComponentChange("login")}
                            className="text-blue-600 hover:text-blue-700 hover:underline mr-1 text-md"
                          >
                            بازگشت به صفحه ورود
                          </button>
                        </div>
                      </>
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
