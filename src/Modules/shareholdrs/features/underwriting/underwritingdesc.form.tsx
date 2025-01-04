import { FC, useEffect, useState } from "react";
import { FaDownload, FaMapMarkerAlt } from "react-icons/fa";

import { motion } from "framer-motion";
import { useUnusedProcess } from "../../hooks";

const UnderwritingDescForm: FC = () => {
  const { data: unusedProcessData } = useUnusedProcess.useGetList();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  interface UnusedProcessData {
    description_picture: string;
    announcement_underwriting_description: string;
    description: string;
    announcement_underwriting: string;
    instagram_link: string;
    telegram_link: string;
    contact_number: string;
    description_location: string;
  }

  return (
    <div className="flex flex-col  min-h-screen py-8">
      {unusedProcessData?.map((item: UnusedProcessData, index: number) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={index}
          className="relative w-full max-w-2xl p-3 sm:p-6 mx-auto bg-white rounded-xl shadow-xl border-4 border-double border-gray-200"
        >
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#5677BC] rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#5677BC] rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#5677BC] rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#5677BC] rounded-br-lg" />
          <motion.div className="flex flex-col items-center">
            <motion.div
              className="w-full h-28 sm:h-40 mb-2 sm:mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={item?.description_picture}
                alt={
                  item?.announcement_underwriting_description || "Description"
                }
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            <motion.h1
              className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#424769] to-[#2C3333] mb-2 sm:mb-4 font-iransans truncate w-full text-center"
              whileHover={{ scale: 1.02 }}
            >
              {item?.announcement_underwriting_description}
            </motion.h1>

            <div className="w-full relative">
              <motion.p
                onClick={() => isMobile && toggleExpand(index)}
                className={`text-gray-700 w-full mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm text-justify px-2 overflow-hidden
                  ${isMobile ? "cursor-pointer" : ""}`}
                style={{
                  display: isMobile ? "-webkit-box" : "block",
                  WebkitLineClamp:
                    isMobile && !expandedItems.includes(index) ? "3" : "unset",
                  WebkitBoxOrient: "vertical",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {item?.description}
              </motion.p>
              <motion.div
                className="flex items-center justify-center mt-4 space-x-2 text-gray-600 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <FaDownload className="text-xl text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                <a
                  href={item?.announcement_underwriting}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base group-hover:text-gray-800 transition-colors duration-300 mr-2"
                >
                  دانلود آگهی پذیره نویسی
                </a>
              </motion.div>
              <motion.div
                className="flex items-center justify-center mt-4 space-x-2 text-gray-600 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <FaMapMarkerAlt className="text-xl text-red-500 group-hover:text-red-600 transition-colors duration-300" />
                <a
                  href={item?.description_location}
                  rel="noopener noreferrer"
                  className="text-base group-hover:text-gray-800 transition-colors duration-300 mr-2"
                >
                  مشاهده موقعیت در نقشه
                </a>
              </motion.div>

              {isMobile && (
                <motion.div
                  onClick={() => toggleExpand(index)}
                  className="flex items-center justify-center w-full mt-1 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2 mb-5 bg-gray-50 px-4 py-1.5 rounded-full shadow-sm border border-gray-200">
                    <span className="text-blue-600 text-xs font-medium ">
                      {expandedItems.includes(index)
                        ? "بستن متن"
                        : "مشاهده متن کامل"}
                    </span>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-600"
                      animate={{
                        rotate: expandedItems.includes(index) ? 180 : 0,
                      }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default UnderwritingDescForm;
