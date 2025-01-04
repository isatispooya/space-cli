import { ReactNode } from 'react';
import { IoArrowUp , IoArrowDown } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

export interface StatsProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeText?: string;
  changeTimeSpan?: string;
  trend?: 'up' | 'down' | 'neutral';
  bgColor?: string;
  iconColor?: string;
  route?: string;
}

const DashboardStats = ({
  title,
  value,
  icon,
  change,
  changeText,
  changeTimeSpan = "",
  trend = 'neutral',
  bgColor = 'bg-white',
  iconColor = 'text-indigo-600',
  route,
}: StatsProps) => {
  const navigate = useNavigate();

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-50';
      case 'down':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const TrendIcon = trend === "up" ? IoArrowUp : IoArrowDown;

  return (
    <div className={`${bgColor} rounded-lg shadow-lg p-4 h-full`}>
      <div className="flex items-center justify-between">
        <span className={`p-2 rounded-lg ${iconColor} bg-opacity-10`}>
          {icon}
        </span>
        {change !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTrendColor()}`}>
            <TrendIcon className="w-3 h-3" />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-sm text-gray-500 font-iranSans">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 mt-1 font-iranSans">
          {value}
        </p>
      </div>

      {changeText && (
        <div className="mt-4">
          <p 
            className={`text-xs text-gray-500 font-iranSans ${route ? 'cursor-pointer hover:text-indigo-600' : ''}`}
            onClick={() => route && navigate(route)}
          >
            {changeText}
            {changeTimeSpan && (
              <span className="text-gray-400"> - {changeTimeSpan}</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;