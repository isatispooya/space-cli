import { ReactNode } from "react";
import { useInvitation } from "../../marketing/hooks";
import { motion } from "framer-motion";
import { useState } from "react";
import { RiMessage2Fill } from "react-icons/ri";

export interface StatsProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeText?: string;
  changeTimeSpan?: string;
  trend?: "up" | "down" | "neutral";
  bgColor?: string;
  iconColor?: string;
  route?: string;
}

const DashboardMarketingStat = () => {
  const [copied, setCopied] = useState(false);
  const { data: invitation } = useInvitation.useGetCodes();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `my.isatispooya.com/login?rf=${invitation?.[0]?.code}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-xl p-6 h-full hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between ">
        <RiMessage2Fill className="w-7 h-7" />
      </div>

      <div className="mb-6">
        <h3 className="text-sm text-gray-500 font-iranSans">
          کاربران دعوت شده
        </h3>
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-gray-900 mt-2 font-iranSans"
        >
          {invitation?.[0]?.invited_users_count || 0}
        </motion.p>
      </div>

      <div className=" flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
        <p className="flex-1 text-sm text-gray-600 font-iranSans truncate">
          {`my.isatispooya.com/login?rf=${invitation?.[0]?.code}`}
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCopy}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${
              copied
                ? "bg-green-100 text-green-600"
                : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }`}
        >
          {copied ? "کپی شد!" : "کپی لینک"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default DashboardMarketingStat;
