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
      <div className="hidden md:block md:w-1/2 h-screen fixed left-0">
        <motion.img
          key={currentAnnouncement?.id}
          {...fadeIn(0.05, 20)}
          src={currentAnnouncement?.picture || rb}
          alt={currentAnnouncement?.title || "Login illustration"}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />

        <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <motion.div
            key={`text-${currentAnnouncement?.id}`}
            {...fadeIn(0.05, 40)}
          >
            <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
              {currentAnnouncement?.title || "به سامانه ایساتیس پویا آمدید"}
            </h2>
            <p className="text-xl text-white/90 drop-shadow-md">
              {currentAnnouncement?.description ||
                "ایساتیس پویا یک سامانه آسان و سریع برای ثبت و مدیریت سهام و سهامداران است."}
            </p>
          </motion.div>

          {data && data.length > 1 && (
            <div className="flex gap-3 mt-8">
              {data.map((_: unknown, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentAnnouncementIndex(index)}
                  className={`transition-all duration-300 outline-none focus:outline-none ${
                    index === currentAnnouncementIndex
                      ? "w-8 bg-white shadow-lg shadow-white/50"
                      : "w-2 bg-white/50 hover:bg-white/75"
                  } h-2 rounded-full`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <motion.div
        {...fadeIn(0.05, 0, 0.4)}
        className="container mx-auto p-4 md:p-8 max-w-md order-0 md:ml-auto md:mr-8"
      >
        <div className="flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="rounded-lg bg-white shadow-lg dark:bg-neutral-800 pr-4">
              <div className="lg:flex lg:flex-wrap">
                <div className="px-4 md:px-5 lg:w-full p-8 pr-6">
                  <motion.div
                    {...fadeIn(0.05, 10)}
                    className="mx-auto p-4 md:p-8"
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
