import { Button } from "@/components";
import KHatamPic from "../../../../../assets/khatam.png";
import { motion } from "framer-motion";

const KhatamDetails = () => (
  <motion.div
    className="flex-1 flex flex-col items-center justify-center text-center p-6 text-white  min-h-screen"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {/* Logo above the Title */}
    <motion.div
      className="mb-4"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <img
        src={KHatamPic}
        alt="Khatam ETF Logo"
        className="h-20 w-auto transition-transform duration-300 hover:scale-110"
      />
    </motion.div>
    <motion.h1
      className="text-3xl font-bold mb-4 text-[#02205F] tracking-wide"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      صندوق سرمایه‌گذاری خاتم
    </motion.h1>
    <motion.p
      className="text-lg max-w-md leading-relaxed text-[#09193C] font-light"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      صندوق سرمایه‌گذاری خاتم، یک صندوق قابل معامله (ETF) ایرانی است که امکان
      سرمایه‌گذاری در بازارهای مالی ایران را با تنوع و ریسک متعادل فراهم می‌کند.
      این صندوق انتخابی ایده‌آل برای سرمایه‌گذاران است.
    </motion.p>
    <motion.div
      className="mt-6 flex space-x-4 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <Button
        size="xl"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        خرید
      </Button>
      <Button className="border-2 bg-transparent border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 ">
        مشاوره
      </Button>
    </motion.div>
  </motion.div>
);

export default KhatamDetails;
