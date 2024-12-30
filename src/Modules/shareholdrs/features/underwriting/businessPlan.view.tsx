import { FC } from "react";
import { motion } from "framer-motion";
import typo from "../../../auth/components/گروه مالی@2x.png";

const BusinessPlanView: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl p-8 border border-gray-200 min-h-[800px]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, #f9fafb 2px, transparent 2px)",
          backgroundSize: "100% 2rem",
          boxShadow: "0 0 20px rgba(0,0,0,0.1), 0 0 3px rgba(0,0,0,0.05)",
        }}
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-right text-3xl font-bold text-gray-800 mb-6"
          style={{ fontFamily: "Vazirmatn, sans-serif" }}
        >
          طرح کسب و کار
        </motion.h1>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-8 text-right"
          style={{ fontFamily: "Vazirmatn, sans-serif" }}
        >
          <p className="text-gray-600 leading-relaxed">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است.
          </p>
          <p className="text-gray-600 leading-relaxed">
            برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود
            ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال
            و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
          </p>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-row-reverse items-center justify-between mb-8 mt-10"
        >
          <p
            className="text-right text-gray-600 max-w-md ml-4"
            style={{ fontFamily: "Vazirmatn, sans-serif" }}
          >
            شرکت ما متعهد به ارائه ارزش‌های استثنایی از طریق راه‌حل‌های نوآورانه
            و شیوه‌های پایدار است.
          </p>
          <div className="w-[300px] h-32 relative">
            <img src={typo} alt="لوگوی شرکت" className="w-[300px]" />
          </div>
        </motion.div>
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mx-auto block bg-[#008282] text-white px-8 py-3 rounded-lg 
                     shadow-lg hover:bg-[#008282] transition-colors duration-200"
          style={{ fontFamily: "Vazirmatn, sans-serif" }}
        >
          دانلود طرح کسب و کار
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default BusinessPlanView;
