import { useSymbols } from "../../../hooks";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { PieChart, Pie, Cell } from "recharts";

const BaseReport = () => {
  const { id } = useParams();
  const {
    data: symbol,
    isLoading: symbolLoading,
    error: symbolError,
  } = useSymbols.useGetSymbolsById(Number(id));

  const symbolID = symbol?.[0]?.symbol;
  const {
    data: baseReport,
    isLoading: reportLoading,
    error: reportError,
  } = useSymbols.useGetBaseReport(Number(symbolID));

  console.log(baseReport);

  if (symbolLoading || reportLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"
        />
      </div>
    );
  }

  if (symbolError || reportError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-red-500 text-lg text-center p-8 bg-white rounded-xl shadow-lg">
          خطا در دریافت داده‌ها! لطفا مجددا تلاش کنید
        </div>
      </div>
    );
  }

  if (!baseReport) {
    return null;
  }

  const genderData = [
    {
      name: "مرد",
      value: baseReport?.result?.gender?.male ?? 0,
      color: "#3b82f6",
    },
    {
      name: "زن",
      value: baseReport?.result?.gender?.female ?? 0,
      color: "#ec4899",
    },
    {
      name: "سایر",
      value: baseReport?.result?.gender?.other ?? 0,
      color: "#94a3b8",
    },
  ];

  const financialData = [
    {
      name: "Deposit",
      value: baseReport?.result?.deposit_stock_persentage ?? 0,
      color: "#10b981",
    },
    {
      name: "Non-Deposit",
      value: baseReport?.result?.non_deposit_stock_persentage ?? 0,
      color: "#64748b",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen  p-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* عنوان و توضیحات */}
        <motion.div
          className="md:col-span-2"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 text-center mb-4">
            تحلیل جامع کاربران نماد{" "}
            {symbol?.[0]?.symbol_detail?.name ?? "نامشخص"}
          </h1>
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
              <span className="text-slate-600 text-sm">داده‌های جمعیتی</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
              <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2" />
              <span className="text-slate-600 text-sm">رفتار مالی</span>
            </div>
          </div>
        </motion.div>

        {/* کارت میانگین سنی */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-xl flex flex-col items-center justify-center h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-xl font-semibold mb-6 text-slate-700 text-center">
            توزیع سنی کاربران
          </h2>
          <div className="flex flex-col items-center w-full gap-4">
            {/* Circular Progress for Average Age */}
            <div className="relative flex items-center justify-center w-32 h-32">
              <svg className="w-32 h-32 rotate-[-90deg]" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="10"
                  strokeDasharray="282.6"
                  strokeDashoffset="{282.6 - (baseReport?.result?.age_avg ?? 0) / 100 * 282.6}"
                  style={{ transition: "stroke-dashoffset 1s" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">
                  {baseReport?.result?.age_avg?.toFixed(1) ?? "0.0"}
                </span>
                <span className="text-xs text-slate-500 mt-1">میانگین سن</span>
              </div>
            </div>
            {/* Standard Deviation Bar */}
            <div className="w-full max-w-[220px] mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500">انحراف معیار</span>
                <span className="text-xs font-medium text-slate-700">
                  {baseReport?.result?.std_age?.toFixed(1) ?? "0.0"}
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-400"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${
                      ((baseReport?.result?.std_age ?? 0) / 50) * 100
                    }%`,
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
            {/* Age Range */}
            <div className="mt-2 text-xs text-slate-500 text-center">
              بازه سنی کاربران از
              <span className="font-bold text-slate-700 mx-1">
                {Math.floor(
                  (baseReport?.result?.age_avg ?? 0) -
                    (baseReport?.result?.std_age ?? 0)
                )}
              </span>
              تا
              <span className="font-bold text-slate-700 mx-1">
                {Math.ceil(
                  (baseReport?.result?.age_avg ?? 0) +
                    (baseReport?.result?.std_age ?? 0)
                )}
              </span>
              سال
            </div>
          </div>
        </motion.div>

        {/* نمودار جنسیتی */}
        <motion.div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl h-full flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-slate-700 text-center">
            توزیع جنسیتی
          </h2>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-[160px] h-[160px] mx-auto overflow-hidden flex items-center justify-center">
              <PieChart width={160} height={160}>
                <Pie
                  data={genderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  fill="#8884d8"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-4">
            {genderData.map((item) => (
              <div key={item.name} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-slate-600">
                  {item.name} (
                  {(
                    (item.value /
                      ((baseReport?.result?.gender?.male ?? 0) +
                        (baseReport?.result?.gender?.female ?? 0) +
                        (baseReport?.result?.gender?.other ?? 0))) *
                    100
                  ).toFixed(1)}
                  %)
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* بخش مالی */}
        <motion.div
          className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* سرمایه گذاری */}
          <div className="bg-emerald-50 rounded-2xl p-6 shadow-xl flex flex-col h-full">
            <h3 className="text-lg font-medium text-emerald-800 mb-4">
              ترکیب سرمایه گذاری
            </h3>
            <div className="relative w-full max-w-[160px] h-[160px] mx-auto overflow-hidden flex items-center justify-center">
              <PieChart width={160} height={160}>
                <Pie
                  data={financialData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={70}
                  fill="#8884d8"
                >
                  {financialData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-emerald-600">
                  {baseReport?.result?.deposit_stock_persentage?.toFixed(1) ??
                    "0.0"}
                  %
                </span>
                <span className="text-sm text-emerald-500 mt-1">
                  سپرده‌گذاری
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2" />
                <span className="text-sm text-slate-600">سپرده</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-slate-400 rounded-full mr-2" />
                <span className="text-sm text-slate-600">غیرسپرده</span>
              </div>
            </div>
          </div>

          {/* دارایی قابل معامله */}
          <div className="bg-purple-50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-medium text-purple-800 mb-4">
              دارایی قابل معامله
            </h3>
            <div className="flex items-center justify-center h-40">
              <motion.div
                className="text-4xl font-bold text-purple-600 relative"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {baseReport?.result?.tradable?.toFixed(1) ?? "0.0"}%
                <motion.div
                  className="absolute -right-6 -top-2"
                  animate={{ rotate: [0, 30, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  📈
                </motion.div>
              </motion.div>
            </div>
            <p className="text-center text-sm text-slate-500 mt-4">
              درصد کاربران دارای دارایی قابل معامله
            </p>
          </div>

          {/* کاربران سجام */}
          <div className="bg-amber-50 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-medium text-amber-800 mb-4">
              کاربران سجام
            </h3>
            <div className="relative h-40">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="radial-progress text-amber-500"
                  style={
                    {
                      "--value": baseReport?.result?.is_sejam ?? 0,
                      "--size": "8rem",
                      "--thickness": "12px",
                    } as React.CSSProperties
                  }
                  animate={{ scale: [0.9, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {baseReport?.result?.is_sejam?.toFixed(1) ?? "0.0"}%
                </motion.div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-sm text-slate-500">
                از کل کاربران ثبت‌نام شده در سجام
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BaseReport;
