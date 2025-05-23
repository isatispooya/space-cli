import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { server } from "../../../api/server";
import { useDashboard } from "../hooks";
import Button from "../../../components/common/buttons/button";
import Spinner from "../../../components/loaders/spinner";

// Types
interface TooltipPropsType {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

interface CompanyDataType {
  name: string;
  value: number;
  logo: string;
  shares?: number;
}

interface BarPropsType {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  payload?: CompanyDataType;
}

const CustomTooltip = ({ active, payload, label }: TooltipPropsType) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 font-iranSans">{label}</p>
        <p className="text-lg font-bold text-indigo-600 font-iranSans">
          {payload[0].value} <span className="text-xs">%</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBar = (props: BarPropsType) => {
  const { x = 0, y = 0, width = 0, height = 0, payload, index = 0 } = props;
  const isVertical = window.innerWidth < 1300;

  const minHeight = 5;
  const adjustedHeight = Math.max(height, minHeight);

  const minWidth = 5;
  const adjustedWidth = Math.max(width, minWidth);

  const logoSize = isVertical ? 25 : 30;

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
      transition={{ duration: 0.5, delay: index * 0.1 }}
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
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ fill: payload?.value === 0 ? "#D1D5DB" : "#4f46e5" }}
      />
      {/* Logo */}
      {payload?.logo && (
        <image
          x={logoX}
          y={logoY}
          width={logoSize}
          height={logoSize}
          href={server + payload.logo}
          className="rounded-full"
        />
      )}
    </motion.g>
  );
};

const DashboardChart = () => {
  const { data: statsChart, isLoading } = useDashboard.useGetStats();
  const [isVertical, setIsVertical] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsVertical(window.innerWidth < 1300);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = useMemo(() => {
    if (!statsChart?.companies || !Array.isArray(statsChart.companies)) {
      return [];
    }

    return statsChart.companies
      .sort((a, b) => b.shares - a.shares)
      .map((company) => ({
        name: company.name,
        value: company.shares,
        logo: company.logo,
      }));
  }, [statsChart]);

  const chartMargins = isVertical
    ? { top: 20, right: 70, left: 20, bottom: 15 }
    : { top: 70, right: 30, left: 20, bottom: 15 };

  const renderChart = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner />
        </div>
      );
    }

    return (
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
                tickLine={false}
                tickFormatter={(value) => value.toString()}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="name"
                tick={false}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={false}
                tickFormatter={(value) => value.toString()}
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
    );
  };

  const handleNavigate = () => {
    console.log("Navigation button clicked");
    navigate("/shareholders/table");
  };

  const renderWaveBackground = () => (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none"
      style={{ height: "120px", zIndex: 0 }}
    >
      <svg
        className="absolute bottom-0 left-0 w-full"
        height="60"
        viewBox="0 0 100 18"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,15 C15,0 35,18 50,12 C65,6 85,20 100,6 L100,18 L0,18 Z"
          fill="#1e40af"
          fillOpacity="0.7"
          className="transition-all duration-300"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 w-full"
        height="40"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,6 C20,12 40,3 60,9 C80,15 90,3 100,9 L100,12 L0,12 Z"
          fill="#1e40af"
          fillOpacity="0.9"
          className="transition-all duration-300"
        />
      </svg>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-4 w-full h-[480px] flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl relative overflow-hidden"
    >
      <div>
        <div className="flex items-center mb-4">
          <h3 className="text-sm text-gray-800 font-bold font-iranSans">
            درصد سهام شما در شرکت های گروه مالی و سرمایه گذاری ایساتیس پویا
          </h3>
        </div>

        <div className="h-[340px]">{renderChart()}</div>
      </div>

      <div className="mt-auto pt-2 relative z-10">
        <Button
          onClick={handleNavigate}
          customColors={{
            background: "#02205F",
            hoverBackground: "#5677BC",
            text: "white",
          }}
          variant="custom"
          fullWidth
          animationOnHover="scale"
          animationOnTap="scale"
          className="py-1 px-2 rounded-md font-iranSans text-xs"
          rightIcon={<IoIosArrowBack className="w-3 h-3" />}
        >
          <span>مدیریت سهام</span>
        </Button>
      </div>

      {renderWaveBackground()}
    </motion.div>
  );
};

export default DashboardChart;
