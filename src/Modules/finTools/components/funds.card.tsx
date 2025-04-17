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
    route: "/funds/khatam",
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

const sizeClasses = {
  small: "w-full sm:w-1/2 md:w-1/4 h-32",
  medium: "w-full sm:w-1/2 md:w-1/3 h-48",
  large: "w-full md:w-1/2 h-64",
};

const FundCard: React.FC<FundCardProps> = ({
  type,
  value,
  change = 0,
  changePercentage = 0,
  size = "medium",
}) => {
  const fundInfo = fundsInfo[type];
  const isPositiveChange = change >= 0;
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-xl shadow-md p-4 ${sizeClasses[size]} overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col`}
    >
      <div className="flex items-center mb-3">
        <span className="text-lg mr-2">{fundInfo.icon}</span>
        <h3
          className="text-base font-bold font-iranSans"
          style={{ color: fundInfo.color }}
        >
          {fundInfo.title}
        </h3>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <p
          className="text-4xl font-bold font-iranSans"
          style={{ color: fundInfo.color }}
        >
          {value.toLocaleString()}
          <span className="text-sm font-iranSans ml-2">
            {isPositiveChange ? "+" : ""}
            {change.toLocaleString()} ({isPositiveChange ? "+" : ""}
            {changePercentage}%)
          </span>
        </p>
      </div>

      <div className="mt-auto pt-4 relative z-10">
        <motion.button
          onClick={() => fundInfo.route && navigate(fundInfo.route)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2 px-3 rounded-lg font-iranSans duration-200 flex items-center justify-center gap-2 text-base text-white"
          style={{ backgroundColor: fundInfo.color }}
        >
          <span className="font-bold">{fundInfo.subtitle}</span>
        </motion.button>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        <path
          fill={fundInfo.color}
          fillOpacity="0.3"
          d="M0,192L30,192C60,192,120,192,180,197.3C240,202.7,300,213.3,360,213.3C420,213.3,480,202.7,540,197.3C600,192,660,192,720,197.3C780,202.7,840,213.3,900,213.3C960,213.3,1020,202.7,1080,197.3C1140,192,1200,192,1260,197.3C1320,202.7,1380,213.3,1410,218.7L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default FundCard;
