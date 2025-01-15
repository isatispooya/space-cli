import { FaPhone, FaTelegram, FaInstagram, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaHeadset } from "react-icons/fa6";
import { useState } from "react";

const ContactUsBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBox = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {!isOpen && (
        <motion.div
          className="w-14 h-16 z-10 rounded-l-full flex justify-center bg-[#0f1e47] items-center fixed bottom-5 right-0 shadow-lg cursor-pointer"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
          onClick={toggleBox}
        >
          <FaPhone className="text-white text-2xl" />
        </motion.div>
      )}

      {isOpen && (
        <motion.div
          className="w-64 bg-white rounded-lg flex flex-col fixed bottom-5 right-5 shadow-lg overflow-hidden max-h-96"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            <svg
              className="absolute top-0 left-0 w-full h-64"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              width="100%"
              style={{ zIndex: -1 }}
            >
              <path
                fill="#60a5fa"
                fillOpacity="0.6"
                d="M0,0 L48,20 C96,40 192,80 288,90 C384,100 480,100 576,90 C672,80 768,60 864,60 C960,60 1056,80 1152,90 C1248,100 1344,100 1392,100 L1440,100 L1440,0 L1392,0 C1344,0 1248,0 1152,0 C1056,0 960,0 864,0 C768,0 672,0 576,0 C480,0 384,0 288,0 C192,0 96,0 48,0 L0,0 Z"
              ></path>
            </svg>
            <div
              className="w-full text-white p-3 text-center text-lg font-semibold flex items-center justify-between"
              style={{ zIndex: 1 }}
            >
              <h2 className="flex items-center gap-2 text-[#1e3a8a]">
                <FaHeadset className="text-xl text-[#1e3a8a]" />
                راه های ارتباطی
              </h2>
              <button
                className="bg-none text-[#1e3a8a] border-none rounded-full w-6 h-6 flex justify-center items-center cursor-pointer text-lg hover:bg-blue-500"
                onClick={toggleBox}
              >
                ×
              </button>
            </div>
          </div>
          <div className="p-4 text-base text-gray-700 text-center">
            <div className="flex items-center justify-center border-b border-gray-300 py-2">
              <FaPhone className="text-gray-500 mr-2" />
              <p className="flex-1">
                <a
                  href="tel:123456789"
                  className="cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition-all duration-200"
                >
                  03535220088
                </a>
              </p>
            </div>
            <div className="flex items-center justify-center border-b border-gray-300 py-2">
              <FaPhone className="text-gray-500 mr-2" />
              <p className="flex-1">
                <a
                  href="tel:987654321"
                  className="cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition-all duration-200"
                >
                  02191090088
                </a>
              </p>
            </div>
            <div className="flex items-center justify-center border-b border-gray-300 py-2">
              <FaEnvelope className="text-gray-500 mr-2" />
              <p className="flex-1">
                <a
                  href="mailto:example@example.com"
                  className="cursor-pointer border-b-2 border-transparent hover:border-blue-500 transition-all duration-200"
                >
                  info@isatispooya.com
                </a>
              </p>
            </div>
            <div className="flex justify-center gap-3 my-3">
              <a
                href="https://t.me/isatispooy_info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-transform duration-200 transform hover:scale-110"
              >
                <FaTelegram className="text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/isatispooya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700 transition-transform duration-200 transform hover:scale-110"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
          <div className="w-full bg-[#93c5fd] text-center py-2 text-sm font-bold text-[#1e3a8a]">
            ما همیشه آماده پاسخگویی هستیم!
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ContactUsBox;
