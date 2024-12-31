import { FC, useEffect, useState } from "react";
import { FaInstagram, FaTelegram, FaMapMarkerAlt } from "react-icons/fa";
import { IconType } from "react-icons";
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
    description_title: string;
    description: string;
    instagram_link: string;
    telegram_link: string;
    contact_number: string;
    description_location: string;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-2">
      {unusedProcessData?.map((item: UnusedProcessData, index: number) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={index}
          className="relative w-full max-w-2xl p-3 sm:p-6 mx-auto bg-white rounded-xl shadow-xl border-4 border-double border-gray-200"
        >
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#424769] rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#424769] rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#424769] rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#424769] rounded-br-lg" />
          <motion.div className="flex flex-col items-center">
            <motion.div
              className="w-full h-28 sm:h-40 mb-2 sm:mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={item?.description_picture}
                alt={item?.description_title || "Description"}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            <motion.h1
              className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#424769] to-[#2C3333] mb-2 sm:mb-4 font-iransans truncate w-full text-center"
              whileHover={{ scale: 1.02 }}
            >
              {item?.description_title}
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

            <div className="flex gap-6 mb-8">
              <SocialIcon
                Icon={FaInstagram}
                color="from-pink-500 to-purple-500"
                href={item?.instagram_link}
              />
              <SocialIcon
                Icon={FaTelegram}
                color="from-blue-400 to-blue-600"
                href={item?.telegram_link}
              />
            </div>

            <motion.div
              className="w-full max-w-xs backdrop-blur-sm bg-gradient-to-br from-white/90 to-gray-50/90 p-3 sm:p-4 rounded-lg shadow-lg border border-gray-200"
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-base sm:text-lg font-bold text-[#424769] mb-2 sm:mb-3 text-center">
                با ما در تماس باشید
              </h2>
              <motion.a
                href={`tel:${item?.contact_number}`}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-lg font-semibold text-base shadow-md block text-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item?.contact_number}
              </motion.a>

              <motion.div
                className="flex items-center justify-center mt-4 space-x-2 text-gray-600 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <FaMapMarkerAlt className="text-xl text-red-500 group-hover:text-red-600 transition-colors duration-300" />
                <a
                  href={item?.description_location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base group-hover:text-gray-800 transition-colors duration-300 mr-2"
                >
                  مشاهده موقعیت در نقشه
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const SocialIcon: FC<{ Icon: IconType; color: string; href?: string }> = ({
  Icon,
  color,
  href,
}) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r ${color} shadow-lg`}
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9 }}
  >
    <Icon className="text-white text-xl" />
  </motion.a>
);

export default UnderwritingDescForm;
