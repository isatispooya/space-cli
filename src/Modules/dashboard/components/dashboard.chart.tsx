import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDashboard } from "../hooks";
import { motion } from "framer-motion";
import { server } from "../../../api/server";
import { useEffect, useState } from "react";
import { menuItems } from "../../sidebar/data/menuItems";
import { IoIosArrowBack } from "react-icons/io";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

interface barTypes {
  name: string;
  value: number;
  logo: string;
  shares: number;
}

interface barPropsTypes {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  payload?: barTypes;
  data?: barTypes[];
}

const DashboardChart = () => {
  const { data: statsChart } = useDashboard.useGetStats();
  const [isVertical, setIsVertical] = useState(false);

  const hasShareholdersAccess = menuItems.some(item =>
    item.submenu?.some(subItem => subItem.codename === "view_shareholders")
  );

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 1300);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    ...(statsChart?.companies
      ? statsChart.companies.map((company: barTypes) => ({
          name: company.name,
          value: company.shares,
          logo: company.logo,
        }))
      : []),
  ];

  const chartMargins = isVertical
    ? { top: 20, right: 70, left: 20, bottom: 15 }
    : { top: 70, right: 30, left: 20, bottom: 15 };

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600  font-iranSans">{label}</p>
          <p className="text-lg font-bold text-indigo-600 font-iranSans">
            {payload[0].value} <span className="text-xs">%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomBar = (props: barPropsTypes) => {
    const { x = 0, y = 0, width = 0, height = 0, payload } = props;

    const minHeight = 5;
    const adjustedHeight = Math.max(height, minHeight);

    const minWidth = 5;
    const adjustedWidth = Math.max(width, minWidth);

    const logoSize = isVertical
      ? Math.min(adjustedWidth * 4, 60)
      : Math.min(adjustedHeight * 10, 120);

    const logoX = isVertical
      ? x - logoSize - 10
      : x + (adjustedWidth - logoSize) / 2;
    const logoY = isVertical
      ? y + (adjustedHeight - logoSize) / 2
      : y - logoSize - 10;

    const barFill = payload?.value === 0 ? "#E5E7EB" : "url(#barGradient)";

    return (
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: (props.index ?? 0) * 0.1 }}
        whileHover={{ scale: 1.05 }}
      >
        
        {/* Bar */}
        <motion.rect
          x={x}
          y={y - (adjustedHeight - height)}
          width={adjustedWidth}
          height={adjustedHeight}
          fill={barFill}
          rx={6}
          ry={6}
          initial={{ height: 0 }}
          animate={{ height: adjustedHeight }}
          transition={{ duration: 0.5, delay: (props.index ?? 0) * 0.1 }}
          whileHover={{ fill: payload?.value === 0 ? "#D1D5DB" : "#4f46e5" }}
        />
        {/* Logo */}
        {payload?.logo && (
          <image
            x={logoX}
            y={logoY}
            width={logoSize}
            height={logoSize}
            href={server + payload?.logo}
            className="rounded-full"
          />
          
        )}
        
      </motion.g>
    );
  };

  return (
    
    <div className="w-full h-full bg-white bg-opacity-70 rounded-3xl shadow-xl flex flex-col transition-all duration-300 hover:shadow-2xl">
      <div className="w-full h-[400px] lg:h-[400px] md:h-[300px] xs:h-[500px] xs:h-[600px] p-4 sm:p-2">
        <h3 className="text-base sm:text-[8px] md:text-[14px] lg:text-sm font-bold text-gray-800  text-center font-iranSans">
          درصد سهام شما در شرکت های گروه مالی و سرمایه گذاری ایساتیس پویا
        </h3>
   
        <div className="w-full h-[600px]  md:h-[500px] ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={isVertical ? "vertical" : "horizontal"}
              margin={chartMargins}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal={!isVertical}
                vertical={isVertical}
                stroke="#e0e0e0"
              />
              {isVertical ? (
                <>
                  <XAxis
                    type="number"
                    tick={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                </>
              ) : (
                <>
                  <XAxis
                    dataKey="name"
                    tick={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis tick={false} axisLine={{ stroke: "#e5e7eb" }} />
                </>
              )}
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(236, 238, 241, 0.4)" }}
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <Bar
                dataKey="value"
                name="%"
                fill="#818cf8"
                shape={<CustomBar />}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
       
      </div>
      <div className="flex justify-center mt-20 p-4 z-10">
        {hasShareholdersAccess && (
          <button
            onClick={() => window.location.href = '/shareholders/table'}
            className="px-4 py-2 text-sm font-bold text-white bg-[#1e40af]
            rounded hover:bg-[#1e3a8a] transition-colors flex items-center gap-1"
          >
            مدیریت سهام
            <IoIosArrowBack className="w-3 h-3 inline-block" />
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardChart;
