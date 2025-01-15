import { motion, AnimatePresence } from "framer-motion";
import useVerify from "../hooks/useVerify";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { VerifyType } from "../types/verify.type";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";


const TimeflowVerify = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { mutate: verify } = useVerify.usePostVerify();
  const { data: verifyData, refetch } = useVerify.useGetVerify();

  useEffect(() => {
    if (verifyData && !verifyData.login?.length && !verifyData.logout?.length) {
      setIsVisible(false);
    }
  }, [verifyData]);

  console.log(verifyData);

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
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto"
    >
      <div className="min-h-screen bg-gradient-to-b from-gray-50/95 to-gray-100/95">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 mb-6 relative">
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close"
            >
              <svg
                className="w-5 h-5"
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
            </button>

            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              تایید ورود و خروج
            </h1>
            <p className="text-center text-gray-600 mb-8">
              لطفا ورود و خروج های ثبت شده را تایید یا رد کنید
            </p>

            <div className="grid gap-6 max-w-3xl mx-auto">
              {/* Login Records */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                  ورود های ثبت شده
                </h2>
                <AnimatePresence mode="wait">
                  {verifyData?.login?.map((item: VerifyType, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 my-2 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200"
                    >
                      <div className="flex flex-col space-y-1 mb-3 sm:mb-0">
                        <span className="text-sm text-gray-500">زمان ورود</span>
                        <span className="font-semibold text-gray-800 direction-ltr">
                          {item?.time === "نامعتبر" ? (
                            <span className="text-red-500">نامعتبر</span>
                          ) : (
                            moment(item?.time).format("HH:mm - jYYYY/jMM/jDD")
                          )}
                        </span>
                      </div>

                      <div className="flex space-x-4 rtl:space-x-reverse">
                        <button
                          className="px-4 py-2 text-sm font-medium bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition duration-200 flex items-center gap-1"
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
                          className="px-4 py-2 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-200 flex items-center gap-1"
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

              {/* Logout Records */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-2">
                  خروج های ثبت شده
                </h2>
                <AnimatePresence mode="wait">
                  {verifyData?.logout?.map(
                    (item: VerifyType, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 my-2 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200"
                      >
                        <div className="flex flex-col space-y-1 mb-3 sm:mb-0">
                          <span className="text-sm text-gray-500">
                            زمان خروج
                          </span>
                          <span className="font-semibold text-gray-800 direction-ltr">
                            {item?.time === "نامعتبر" ? (
                              <span className="text-red-500">نامعتبر</span>
                            ) : (
                              moment(item?.time).format("HH:mm - jYYYY/jMM/jDD")
                            )}
                          </span>
                        </div>

                        <div className="flex space-x-4 rtl:space-x-reverse">
                          <button
                            className="px-4 py-2 text-sm font-medium bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition duration-200 flex items-center gap-1"
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
                            className="px-4 py-2 text-sm font-medium bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-200 flex items-center gap-1"
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
                    )
                  )}
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
