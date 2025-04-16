import React from "react";
import { Card } from "@/components";

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
}

const fundsInfo: Record<FundType, FundInfo> = {
  khatam: {
    title: "خاتم",
    subtitle: "صندوق سرمایه‌گذاری خاتم",
    color: "blue",
    icon: "📈",
  },
  termeh: {
    title: "ترمه",
    subtitle: "صندوق سرمایه‌گذاری ترمه",
    color: "purple",
    icon: "📊",
  },
  exir: {
    title: "اکسیر",
    subtitle: "صندوق سرمایه‌گذاری اکسیر",
    color: "green",
    icon: "💰",
  },
  mosharkat: {
    title: "مشارکت",
    subtitle: "صندوق سرمایه‌گذاری مشارکت",
    color: "amber",
    icon: "🏦",
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

  const colorClasses = {
    blue: "from-blue-400 to-blue-600",
    purple: "from-purple-400 to-purple-600",
    green: "from-green-400 to-green-600",
    amber: "from-amber-400 to-amber-600",
  };

  const content = (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">{value.toLocaleString()}</span>
        <span className="text-lg">{fundInfo.icon}</span>
      </div>
      <div className="flex items-center mt-2">
        <span
          className={`text-sm ${
            isPositiveChange ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositiveChange ? "+" : ""}
          {change.toLocaleString()} ({isPositiveChange ? "+" : ""}
          {changePercentage}%)
        </span>
      </div>
    </div>
  );

  return (
    <Card
      title={fundInfo.title}
      subtitle={fundInfo.subtitle}
      content={content}
      borderGradient={true}
      className={`${sizeClasses[size]} bg-gradient-to-r ${
        colorClasses[fundInfo.color as keyof typeof colorClasses]
      }`}
      hoverEffect={true}
    />
  );
};

export default FundCard;
