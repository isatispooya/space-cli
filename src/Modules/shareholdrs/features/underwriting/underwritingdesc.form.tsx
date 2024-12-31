import { FC } from "react";
import { FaInstagram, FaTelegram, FaMapMarkerAlt } from "react-icons/fa";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { useUnusedProcess } from "../../hooks";

const UnderwritingDescForm: FC = () => {
  const { data: unusedProcessData } = useUnusedProcess.useGetList();

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      {unusedProcessData?.map((item: UnusedProcessData, index: number) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          key={index}
          className="relative w-full max-w-3xl p-8 mx-auto bg-white rounded-2xl shadow-2xl border-8 border-double border-gray-200"
        >
          {/* Smaller corner elements */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#424769] rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-[#424769] rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-[#424769] rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#424769] rounded-br-lg" />

          <motion.div className="flex flex-col items-center">
            <motion.div
              className="w-full h-52 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={item?.description_picture}
                alt={item?.description_title || "Description"}
                className="w-full h-full object-cover rounded-lg"
              />
            </motion.div>

            <motion.h1
              className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#424769] to-[#2C3333] mb-6 font-iransans"
              whileHover={{ scale: 1.02 }}
            >
              {item?.description_title}
            </motion.h1>

            <motion.p
              className="text-gray-700 max-w-2xl mb-8 leading-relaxed text-base text-justify px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {item?.description}
            </motion.p>

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
              className="w-full max-w-sm backdrop-blur-sm bg-gradient-to-br from-white/90 to-gray-50/90 p-6 rounded-xl shadow-xl border border-gray-200"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-xl font-bold text-[#424769] mb-4 text-center">
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
