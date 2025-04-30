import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { server } from "@/api";

export interface FundCardProps {
  symbol: {
    id: number;
    symbol: number;
    symbol_detail: {
      id: number;
      symbol: string;
      name: string;
      type: string;
    };
    description: string;
    photo: string;
    link: string;
  };
  value: number;
  change?: number;
  changePercentage?: number;
  size?: "small" | "medium" | "large";
}

const sizeClasses = {
  small: "w-full h-full",
  medium: "w-full h-full",
  large: "w-full h-full",
};

const getFundColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "fixincome":
      return "#3B82F6";
    case "equity":
      return "#48bb78"; 
    case "mixed":
      return "#8B5CF6";
    default:
      return "#F59E0B";
  }
};

const FundCard: React.FC<FundCardProps> = ({
  symbol,
  value,
  change = 0,
  changePercentage = 0,
  size = "medium",
}) => {
  const navigate = useNavigate();
  const isPositiveChange = change >= 0;
  const fundColor = getFundColor(symbol.symbol_detail.type);

  const handleClick = () => {
    navigate(`/symbols/${symbol.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative bg-white rounded-xl shadow-md p-6 ${sizeClasses[size]} overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col`}
    >
      <div className="flex items-center mb-6">
        <img
          src={server + symbol.photo}
          alt={symbol.symbol_detail.name}
          className="h-8 w-8 mr-3 object-contain"
        />
        <h3
          className="text-xl font-bold font-iranSans"
          style={{ color: fundColor }}
        >
          {symbol.symbol_detail.symbol}
        </h3>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <p
            className="text-5xl md:text-6xl font-bold font-iranSans mb-4"
            style={{ color: fundColor }}
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
          style={{ backgroundColor: fundColor }}
        >
          <span className="font-bold">مشاهده</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FundCard;
