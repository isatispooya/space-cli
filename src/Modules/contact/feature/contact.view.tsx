import React from "react";
import { motion } from "framer-motion";
import {
  FaCloud,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaGlobe,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";
import map from "./Screenshot 2025-01-01 113803.png";

const ContactView: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen  p-4 md:p-6"
      dir="rtl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-3 mb-8"
      >
        <div className="bg-white/90  p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow">
          <FaCloud className="text-3xl text-[#02205F]" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#02205F]">
          تماس با ما
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="bg-white/90  rounded-xl p-4 shadow-lg space-y-4">
            {[
              {
                icon: FaMapMarkerAlt,
                title: "مکان",
                content: "یزد, بلوار جمهوری, نبش کوچه شرق",
              },
              { icon: FaPhone, title: "شماره تلفن", content: "035-35220088" },
              {
                icon: FaEnvelope,
                title: "ایمیل",
                content: "isatispooyafinancial@gmail.com",
              },
              {
                icon: FaGlobe,
                title: "وبسایت",
                content: "www.isatispooya.com",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F6D16D]/10 transition-colors"
              >
                <item.icon className="text-base text-[#02205F]" />
                <div>
                  <h3 className="font-semibold text-sm text-[#02205F]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#09193C]">{item.content}</p>
                </div>
              </motion.div>
            ))}

            <div className="pt-3 border-t border-[#CACACA]">
              <h3 className="font-semibold mb-3 text-sm text-[#02205F]">
                شبکه‌های اجتماعی
              </h3>
              <div className="space-y-2">
                {[
                  {
                    icon: FaInstagram,
                    username: "@isatispooyagroup",
                    color: "#FF83A9",
                  },
                  {
                    icon: FaTelegram,
                    username: "https://t.me/isatispooya_info",
                    color: "#29D2C7",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: -3 }}
                    className="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors"
                  >
                    <item.icon
                      className="text-base"
                      style={{ color: item.color }}
                    />
                    <p className="text-sm text-[#09193C]">{item.username}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <motion.div
            variants={itemVariants}
            className="bg-white/90  rounded-xl p-4 shadow-lg"
          >
            <h3 className="text-base font-semibold mb-2 text-[#02205F]">
              توضیحات
            </h3>
            <p className="text-sm text-[#09193C] leading-relaxed">
              ما متعهد به ارائه خدمات عالی به مشتریان خود هستیم. تیم ما در ساعات
              کاری آماده پاسخگویی به سوالات و نیازهای شما می‌باشد.
            </p>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="bg-white/90  rounded-xl p-4 shadow-lg space-y-4 mb-4">
            <h3 className="text-base font-semibold text-[#02205F]">
              سوالات متداول
            </h3>
            <div className="space-y-3">
              {[
                {
                  question: "چگونه می‌توانم پشتیبانی دریافت کنم؟",
                  answer:
                    "شما می‌توانید از طریق ایمیل یا تلفن در ساعات کاری با تیم پشتیبانی ما تماس بگیرید.",
                },
                {
                  question: "ساعات کاری شما چگونه است؟",
                  answer:
                    "ما از شنبه تا پنجشنبه، از ساعت ۹ صبح تا ۶ عصر در خدمت شما هستیم.",
                },
                {
                  question: "آیا خدمات بین‌المللی ارائه می‌دهید؟",
                  answer:
                    "بله، ما خدمات جهانی با پشتیبانی اختصاصی برای مشتریان بین‌المللی ارائه می‌دهیم.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  className="p-3 rounded-lg bg-[#5677BC]/10 cursor-pointer"
                >
                  <h4 className="font-medium text-sm text-[#02205F]">
                    {item.question}
                  </h4>
                  <p className="text-xs text-[#09193C] mt-1">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            variants={itemVariants}
            className="bg-white/90 rounded-xl p-4 shadow-lg"
          >
            <h3 className="text-base font-semibold mb-3 text-[#02205F]">
              مسیریابی
            </h3>
            <div className="w-full h-[200px] rounded-lg overflow-hidden shadow-md">
              <img
                src={map}
                alt="نقشه موقعیت ما"
                className="w-full h-full object-cover rounded-lg"
                style={{ filter: "grayscale(0.1)" }}
              />
            </div>
            <div className="mt-3 text-sm text-[#09193C]">
              <p>یزد, بلوار جمهوری, نبش کوچه شرق</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactView;
