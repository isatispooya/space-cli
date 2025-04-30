import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export type FundType = "khatam" | "termeh" | "exir" | "mosharkat";

export interface FundCardProps {
  type: FundType;
  value: number;
  change?: number;
  changePercentage?: number;
  size?: "small" | "medium" | "large";
  id?: number;
}

interface FundInfo {
  title: string;
  subtitle: string;
  color: string;
  icon?: string;
  route?: string;
}

const fundsInfo: Record<FundType, FundInfo> = {
  khatam: {
    title: "خاتم",
    subtitle: "صندوق سرمایه‌گذاری خاتم",
    color: "#3B82F6",
    icon: "📈",
    route: "/khatam/:id",
  },
  termeh: {
    title: "ترمه",
    subtitle: "صندوق سرمایه‌گذاری ترمه",
    color: "#8B5CF6",
    icon: "📊",
    route: "/funds/termeh",
  },
  exir: {
    title: "اکسیر",
    subtitle: "صندوق سرمایه‌گذاری اکسیر",
    color: "#48bb78",
    icon: "💰",
    route: "/funds/exir",
  },
  mosharkat: {
    title: "مشارکت",
    subtitle: "صندوق سرمایه‌گذاری مشارکت",
    color: "#F59E0B",
    icon: "🏦",
    route: "/funds/mosharkat",
  },
};

// ... existing imports ...

const sizeClasses = {
  small: "w-full h-full",
  medium: "w-full h-full",
  large: "w-full h-full",
};

const FundCard: React.FC<FundCardProps> = ({
  type,
  value,
  id,
  change = 0,
  changePercentage = 0,
  size = "medium",
}) => {
  const fundInfo = fundsInfo[type];
  const isPositiveChange = change >= 0;
  const navigate = useNavigate();

  const handleClick = () => {
    if (fundInfo.route) {
      const route = fundInfo.route.replace(":id", id?.toString() || "");
      navigate(route);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-xl shadow-md p-6 ${sizeClasses[size]} overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col`}
    >
      <div className="flex items-center mb-6">
        <span className="text-2xl mr-3">{fundInfo.icon}</span>
        <h3
          className="text-xl font-bold font-iranSans"
          style={{ color: fundInfo.color }}
        >
          {fundInfo.title}
        </h3>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <p
            className="text-5xl md:text-6xl font-bold font-iranSans mb-4"
            style={{ color: fundInfo.color }}
          >
            {value.toLocaleString()}
          </p>
          <span className="text-lg font-iranSans">
            {isPositiveChange ? "+" : ""}
            {change.toLocaleString()} ({isPositiveChange ? "+" : ""}
            {changePercentage}%)
          </span>
        </div>
      </div>

      <div className="mt-auto pt-6 relative z-10">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 rounded-lg font-iranSans duration-200 flex items-center justify-center gap-2 text-lg text-white"
          style={{ backgroundColor: fundInfo.color }}
        >
          <span className="font-bold">{fundInfo.subtitle}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FundCard;
