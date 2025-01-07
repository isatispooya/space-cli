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

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 768);
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

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1 font-iranSans">{label}</p>
          <p className="text-lg font-bold text-indigo-600 font-iranSans">
            {payload[0].value} <span className="text-xs">واحد</span>
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
      <div className="w-full h-[300px] p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-bold text-gray-800 mb-6 text-center font-iranSans">
          تعداد سهام شما در گروه های شرکت های مالی و سرمایه گذاری
        </h3>
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout={isVertical ? "vertical" : "horizontal"}
              margin={{
                top: isVertical ? 20 : 70,
                right: isVertical ? 70 : 30,
                left: isVertical ? 20 : 20,
                bottom: isVertical ? 15 : 15,
              }}
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
                name="واحد"
                fill="#818cf8"
                shape={<CustomBar />}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
