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
import { useEffect, useState, useMemo } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Spinner from "../../../components/loaders/spinner";
import { Button } from "@/components";
// import { useUserPermissions } from "../../permissions";

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
  const { data: statsChart, isLoading } = useDashboard.useGetStats();
  const [isVertical, setIsVertical] = useState(false);
  // const { data: permissions } = useUserPermissions();

  // const hasPermission =
  //   Array.isArray(permissions) &&
  //   permissions.some((perm) => perm.codename === "shareholder");

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

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
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

  const CustomBar = (props: barPropsTypes) => {
    const { x = 0, y = 0, width = 0, height = 0, payload } = props;

    const minHeight = 5;
    const adjustedHeight = Math.max(height, minHeight);

    const minWidth = 5;
    const adjustedWidth = Math.max(width, minWidth);

    const getLogoSize = () => {
      return isVertical ? 25 : 30;
    };

    const logoSize = getLogoSize();

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-4 w-full h-[480px] overflow-hidden transition-shadow duration-300 hover:shadow-xl relative"
    >
      <div className="flex items-center mb-4">
        <h3 className="text-sm text-gray-800 font-bold font-iranSans">
          درصد سهام شما در شرکت های گروه مالی و سرمایه گذاری ایساتیس پویا
        </h3>
      </div>

      <div className="h-[calc(100%-100px)]">
        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
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
        )}
      </div>

      <Button
        onClick={() => (window.location.href = "/shareholders/table")}
        variant="custom"
        customColors={{
          background: "#02205F",
          hoverBackground: "#5677BC",
          text: "white",
        }}
        fullWidth
        animationOnHover="scale"
        animationOnTap="scale"
        className="w-full py-2 px-3  rounded-lg font-iranSans text-base"
        rightIcon={<IoIosArrowBack className="w-4 h-4" />}
      >
        <span>مدیریت سهام</span>
      </Button>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-[50px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#1e40af"
            fillOpacity="0.3"
            d="M0,160L34.3,165.3C68.6,171,137,181,206,192C274.3,203,343,213,411,197.3C480,181,549,139,617,144C685.7,149,754,203,823,224C891.4,245,960,235,1029,213.3C1097.1,192,1166,160,1234,144C1302.9,128,1371,128,1406,128L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
          ></path>
        </svg>
      </div>
    </motion.div>
  );
};

export default DashboardChart;
