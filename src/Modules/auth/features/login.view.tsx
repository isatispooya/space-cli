import * as React from "react";
import { Input, Ripple, initTWE } from "tw-elements";
import { motion } from "framer-motion";
import { fadeIn } from "../animations/fadeIn";
import LoginHead from "../components/login.logo";
import LoginForm from "./login.form";
import SignupForm from "./signup.form";
import ForgetPassSms from "./forgetPassSms.form";
import ForgetPassForm from "./changePass.form";
import { useAnnouncements } from "../hooks";
import { LoaderLg } from "../../../components/loaders";
import { HiExternalLink } from "react-icons/hi";
import { FaPhone } from "react-icons/fa";
initTWE({ Input, Ripple });

const Login: React.FC = () => {
  const [activeComponent, setActiveComponent] = React.useState<
    "login" | "signup" | "forgetpass"
  >("login");

  const [isSmsVerified, setIsSmsVerified] = React.useState(false);

  const { data: announcements, isLoading } = useAnnouncements();
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] =
    React.useState(0);

  React.useEffect(() => {
    if (announcements && announcements.length > 1) {
      const timer = setInterval(() => {
        setCurrentAnnouncementIndex((prev) =>
          prev === announcements.length - 1 ? 0 : prev + 1
        );
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [announcements]);

  const currentAnnouncement = announcements?.[currentAnnouncementIndex];

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
      className="flex flex-col md:flex-row min-h-screen items-center justify-center bg-white dark:bg-white"
    >
      <div className="hidden md:block md:w-1/2 xl:w-[70%] h-screen fixed left-0">
        <motion.img
          key={currentAnnouncement?.id}
          {...fadeIn(0.05, 20)}
          src={currentAnnouncement?.picture}
          alt={currentAnnouncement?.title || "Login illustration"}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/40" />

        <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent bg-opacity-30">
          <motion.div
            key={`text-${currentAnnouncement?.id}`}
            {...fadeIn(0.05, 40)}
            className="bg-black/30  rounded-lg p-6"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
                  {currentAnnouncement?.title || "به سامانه ایساتیس پویا آمدید"}
                </h2>
                <p className="text-xl text-white/90 drop-shadow-md">
                  {currentAnnouncement?.description ||
                    "ایساتیس پویا یک سامانه آسان و سریع برای ثبت و مدیریت سهام و سهامداران است."}
                </p>
              </div>
              <a
                href={currentAnnouncement?.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 mt-4 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300"
              >
                اطلاعات بیشتر
              </a>
            </div>
          </motion.div>

          {announcements && announcements.length > 1 && (
            <div className="flex gap-3 mt-8">
              {announcements.map((_: unknown, index: number) => (
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
        className="w-full md:w-1/2 xl:w-[30%] md:ml-auto px-4 md:px-8 py-8 relative"
      >
        <div className="w-full max-w-[350px] mx-auto">
          <div className="rounded-lg  p-4 md:p-6">
            <motion.div {...fadeIn(0.05, 10)}>
              <div className="mb-10">
                <LoginHead />
              </div>
              {activeComponent === "login" && (
                <>
                  <LoginForm handleComponentChange={handleComponentChange} />
                  <div className="flex items-center justify-center gap-2 mt-6 py-3 border-t border-gray-100">
                    <span className="text-gray-500 dark:text-gray-600">
                      حساب کاربری ندارید؟
                    </span>
                    <button
                      onClick={() => handleComponentChange("signup")}
                      className="text-blue-600 tour-signup-button hover:text-blue-700 font-medium transition-colors duration-200 relative group"
                    >
                      ثبت‌نام کنید
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                    </button>
                  </div>
                </>
              )}
              {activeComponent === "signup" && (
                <>
                  <SignupForm />
                  <div className="flex items-center justify-center gap-2 mt-6 py-3 border-t border-gray-100">
                    <span className="text-gray-500 dark:text-gray-600">
                      قبلاً ثبت‌نام کرده‌اید؟
                    </span>
                    <button
                      onClick={() => handleComponentChange("login")}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 relative group"
                    >
                      وارد شوید
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                    </button>
                  </div>

                  <div className="flex items-center w-full justify-center lg:mt-[130px] md:mt-[130px] sm:mt-[50px] gap-4">
                    <a
                      href="https://profilesejam.csdiran.ir/"
                      className="tour-sejam-link text-center rounded-lg sm:rounded-none text-blue-600 px-2 py-1.5 transition-all duration-300 text-sm font-medium  flex items-center justify-center gap-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>ثبت نام در سجام</span>
                      <HiExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <div className="flex items-center">
                      <FaPhone className="text-gray-500 text-sm mr-2" />
                      <p className="flex-1">
                        <a
                          href="tel:0353311"
                          className="cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition-all duration-200"
                        >
                          0353311
                        </a>
                      </p>
                    </div>
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
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 relative group"
                    >
                      بازگشت به صفحه ورود
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200"></span>
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
