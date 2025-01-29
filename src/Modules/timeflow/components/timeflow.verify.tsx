import { motion, AnimatePresence } from "framer-motion";
import useVerify from "../hooks/useVerify";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { VerifyType } from "../types/verify.type";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const TimeflowVerify = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { mutate: verify } = useVerify.usePostVerify();
  const { data: verifyData, refetch } = useVerify.useGetVerify();

  console.log(verifyData, "12345678");

  useEffect(() => {
    if (verifyData) {
      const hasUnapprovedData =
        verifyData.login?.some(
          (item: VerifyType) =>
            item.self_status !== "approved" && item.self_status !== "rejected"
        ) ||
        verifyData.logout?.some(
          (item: VerifyType) =>
            item.self_status !== "approved" && item.self_status !== "rejected"
        );

      setIsVisible(hasUnapprovedData);
    }
  }, [verifyData]);

  const handleVerify = (id: number) => {
    if (id) {
      verify(
        { id, data: { self_status: "approved" } },
        {
          onSuccess: (response) => {
            const remainingLogins = verifyData?.login?.filter(
              (item: VerifyType) => item.id !== id
            );
            const remainingLogouts = verifyData?.logout?.filter(
              (item: VerifyType) => item.id !== id
            );

            if (!remainingLogins?.length && !remainingLogouts?.length) {
              setIsVisible(false);
            } else {
              setIsVisible(true);
            }
            toast.success(response.message);
            refetch();
          },
          onError: () => {
            toast.error("خطایی پیش آمده است");
          },
        }
      );
    }
  };

  const handleReject = (id: number) => {
    if (id) {
      verify(
        { id, data: { self_status: "rejected" } },
        {
          onSuccess: () => {
            const remainingLogins = verifyData?.login?.filter(
              (item: VerifyType) => item.id !== id
            );
            const remainingLogouts = verifyData?.logout?.filter(
              (item: VerifyType) => item.id !== id
            );

            if (!remainingLogins?.length && !remainingLogouts?.length) {
              setIsVisible(false);
            } else {
              setIsVisible(true);
            }
            refetch();
          },
        }
      );
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen relative">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 relative">
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-4 sm:p-8 mb-6 relative border border-gray-100">
            <div className="absolute inset-0 overflow-hidden">
              <div className="w-16 h-16 bg-pink-300/30 rounded-full absolute top-24 left-20 blur-xs"></div>
              <div className="w-10 h-10 bg-yellow-200/40 rounded-full absolute top-32 right-24 blur-xs"></div>
              <div className="w-8 h-8 bg-orange-300/25 rounded-full absolute bottom-16 right-32 blur-xs"></div>
              <div className="w-12 h-12 bg-blue-300/35 rounded-full absolute bottom-24 left-36 blur-xs"></div>
              <div className="w-5 h-5 bg-green-300/30 rounded-full absolute top-48 left-1/3 blur-xs"></div>
              <div className="w-18 h-18 bg-purple-300/25 rounded-full absolute bottom-32 right-1/4 blur-xs"></div>
              <div className="w-12 h-12 bg-indigo-300/30 rounded-full absolute top-16 right-1/3 blur-xs"></div>
              <div className="w-5 h-5 bg-red-200/35 rounded-full absolute bottom-48 left-1/4 blur-xs"></div>
              <div className="w-4 h-4 bg-teal-300/25 rounded-full absolute top-96 left-1/2 blur-xs"></div>
              <div className="w-16 h-16 bg-cyan-200/30 rounded-full absolute bottom-40 right-1/5 blur-xs"></div>
              <div className="w-10 h-10 bg-rose-300/35 rounded-full absolute top-56 right-36 blur-xs"></div>
              <div className="w-8 h-8 bg-amber-200/25 rounded-full absolute bottom-56 left-48 blur-xs"></div>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent z-10">
              تایید ورود و خروج
            </h1>
            <p className="text-sm sm:text-base text-center text-gray-600 mb-6 sm:mb-8">
              لطفا ورود و خروج های ثبت شده را تایید یا رد کنید
            </p>

            <div className="grid gap-4 sm:gap-8 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-3 sm:p-6 transition-all duration-300 hover:shadow-2xl border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  ورود های ثبت شده
                </h2>
                <AnimatePresence mode="wait">
                  {verifyData?.login
                    ?.filter(
                      (item: VerifyType) => item.self_status !== "approved"
                    )
                    .map((item: VerifyType, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-4 my-2 sm:my-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex flex-col space-y-1 mb-2 sm:mb-0 w-full sm:w-auto">
                          <h1 className="text-md sm:text-sm text-gray-700">
                            {item.user.first_name + " " + item.user.last_name}
                          </h1>
                          <span className="text-xs sm:text-sm text-gray-500">
                            زمان ورود
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-gray-800 direction-ltr">
                            {item?.time === "نامعتبر" ? (
                              <span className="text-red-500">نامعتبر</span>
                            ) : (
                              moment(item?.time).format("HH:mm - jYYYY/jMM/jDD")
                            )}
                          </span>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto justify-end sm:justify-start">
                          <button
                            className="flex-1 sm:flex-none px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-green-100"
                            onClick={() => handleVerify(item?.id)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            تایید
                          </button>
                          <button
                            className="flex-1 sm:flex-none px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-red-100"
                            onClick={() => handleReject(item?.id)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            رد
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-3 sm:p-6 transition-all duration-300 hover:shadow-2xl border border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                  خروج های ثبت شده
                </h2>
                <AnimatePresence mode="wait">
                  {verifyData?.logout
                    ?.filter(
                      (item: VerifyType) => item.self_status !== "approved"
                    )
                    .map((item: VerifyType, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-2 sm:p-4 my-2 sm:my-3 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex flex-col space-y-1 mb-2 sm:mb-0 w-full sm:w-auto">
                          <h1 className="text-md sm:text-sm text-gray-700">
                            {item.user.first_name + " " + item.user.last_name}
                          </h1>
                          <span className="text-xs sm:text-sm text-gray-500">
                            زمان خروج
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-gray-800 direction-ltr">
                            {item?.time === "نامعتبر" ? (
                              <span className="text-red-500">نامعتبر</span>
                            ) : (
                              moment(item?.time).format("HH:mm - jYYYY/jMM/jDD")
                            )}
                          </span>
                        </div>

                        <div className="flex gap-2 w-full sm:w-auto justify-end sm:justify-start">
                          <button
                            className="flex-1 sm:flex-none px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-green-100"
                            onClick={() => handleVerify(item?.id)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            تایید
                          </button>
                          <button
                            className="flex-1 sm:flex-none px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 hover:shadow-lg hover:shadow-red-100"
                            onClick={() => handleReject(item?.id)}
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            رد
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimeflowVerify;
