import { motion } from "framer-motion";
import { formatNumber } from "../../../utils";
import { SymbolsType } from "../../../types";

const CalculationResult = ({
  result,
}: {
  result: SymbolsType["symbolCalculatorRes"];
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="bg-gray-50 rounded-lg p-5 max-w-2xl mx-auto border border-gray-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-4"
        variants={itemVariants}
      >
        <h2 className="text-xl font-medium text-[#5677BC]">نتایج محاسبه</h2>
        <div className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 text-sm">
          {result.symbol}
        </div>
      </motion.div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <motion.div
          className="bg-white rounded-lg p-3 border border-gray-100"
          variants={itemVariants}
        >
          <div className="text-[#5677BC] text-sm mb-1">مبلغ سرمایه‌گذاری</div>
          <div className="text-lg font-medium text-gray-700">
            {formatNumber(result.investment)} ریال
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg p-3 border border-gray-100"
          variants={itemVariants}
        >
          <div className="text-[#5677BC] text-sm mb-1">تاریخ شروع</div>
          <div className="text-lg font-medium text-gray-700">
            {new Date(result.start_date).toLocaleDateString("fa-IR")}
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg p-3 border border-gray-100"
          variants={itemVariants}
        >
          <div className="text-[#5677BC] text-sm mb-1">بازده مرکب</div>
          <div className="text-lg font-medium text-gray-600">
            {result.compound_return.toFixed(2)}%
          </div>
        </motion.div>
      </div>

      {/* Summary Bar */}
      <motion.div
        className="mt-4 bg-gray-100 rounded-lg p-3 text-gray-600"
        variants={itemVariants}
      >
        <div className="text-sm mb-1 text-[#5677BC]">خلاصه نتایج</div>
        <div className="text-base text-green-700">
          سرمایه‌گذاری شما در {result.symbol} با مبلغ{" "}
          {formatNumber(result.investment)} ریال، بازده مرکب{" "}
          <span className="font-bold"> {result.compound_return.toFixed(2)}% </span>
          را به همراه خواهد داشت.
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CalculationResult;
