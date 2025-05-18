import { useSymbols } from "../../../hooks";
import { useState } from "react";
import { InputBase, DateSelector, Button, Toast } from "@/components";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { motion } from "framer-motion";
import { DateObject } from "react-multi-date-picker";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";
import { SymbolsType } from "../../../types";
import { Check, X } from "lucide-react";
interface CalculatorPropsType {
  data: Array<{
    symbol: number;
    symbol_detail: {
      id: number;
      symbol: string;
      name: string;
    };
    created_at: string;
    updated_at: string;
    description: string;
    id: number;
  }>;
  onCalculationSuccess: (result: SymbolsType["symbolCalculatorRes"]) => void;
}

const Calculator = ({ data, onCalculationSuccess }: CalculatorPropsType) => {
  const { mutate: postSymbolCalculator, isPending } =
    useSymbols.usePostSymbolCalculator();

  const [formData, setFormData] = useState({
    investment: null as number | null,
    date: null as DateObject | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.investment || !data?.[0]) return;

    const gregorianDate = new DateObject({
      date: formData.date,
      calendar: persian,
    })
      .convert(gregorian, gregorian_en)
      .format("YYYY-MM-DD");

    const payload: SymbolsType["symbolCalculatorReq"] = {
      investment: formData.investment,
      date: gregorianDate,
      symbol: data[0].symbol,
    };

    postSymbolCalculator(payload, {
      onSuccess: (response) => {
        Toast(
          "محاسبه با موفقیت انجام شد",
          <Check className="bg-green-500" />,
          "bg-green-500"
        );
        const result = {
          ...response,
          symbol: data[0].symbol_detail.symbol,
          start_date: gregorianDate,
          investment: formData.investment!,
        };
        onCalculationSuccess(result);
      },
      onError: () => {
        Toast(
          "محاسبه با خطا مواجه شد",
          <X className="bg-red-500" />,
          "bg-red-500"
        );
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "investment" ? Number(value) : value,
    }));
  };

  const handleDateChange = (date: DateObject | DateObject[] | null) => {
    setFormData((prev) => ({
      ...prev,
      date: Array.isArray(date) ? date[0] : date,
    }));
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-100"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-2xl font-bold mb-8 text-center text-[#29D2C7]"
        >
          محاسبه سود سرمایه گذاری
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            className="space-y-4"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DateSelector
              format="YYYY-MM-DD"
              calendar={persian}
              label="تاریخ سرمایه گذاری"
              locale={persian_fa}
              calendarPosition="bottom-right"
              value={formData.date}
              onChange={handleDateChange}
              minDate={new DateObject({ calendar: persian }).add(1, "day")}
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

          <Button
            type="submit"
            disabled={isPending || !formData.date || !formData.investment}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-6 bg-[#29D2C7] text-white font-semibold rounded-xl hover:bg-[#008282] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isPending ? "محاسبه..." : "محاسبه"}
            </motion.span>
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default Calculator;
