import { useSymbols } from "../hooks";
import { useState } from "react";
import { InputBase, DateSelector } from "@/components";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { motion } from "framer-motion";

const Calculator = ({ data }) => {
  const { mutate: postSymbolCalculator, isPending } =
    useSymbols.usePostSymbolCalculator();

  const [formData, setFormData] = useState({
    symbol: null,
    investment: null,
    date: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postSymbolCalculator(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "symbol" || name === "investment" ? Number(value) : value,
    }));
  };

  const symbolId = data?.symbol_detail?.id;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-md mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-2xl font-bold mb-8 text-center text-gray-800"
      >
        محاسبه سود سرمایه گذاری
      </motion.h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          className="space-y-4"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <InputBase
            type="text"
            id="symbol"
            label="شماره سهام"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
          />
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <InputBase
            type="text"
            label="مبلغ سرمایه گذاری"
            id="investment"
            name="investment"
            value={formData.investment}
            onChange={handleChange}
          />
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <DateSelector
            format="DD/MM/YYYY"
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            value={formData.date}
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={isPending}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {isPending ? "محاسبه..." : "محاسبه"}
          </motion.span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Calculator;
