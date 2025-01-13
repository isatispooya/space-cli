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
import Spinner from "../../../components/spinner";

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

  const hasShareholdersAccess = menuItems.some((item) =>
    item.submenu?.some((subItem) =>
      subItem.codename?.includes("view_shareholders")
    )
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
      ? statsChart.companies
          .sort((a: barTypes, b: barTypes) => b.shares - a.shares)
          .map((company: barTypes) => ({
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

  // if (isLoading) {
  //   return <Spinner />;
  // }

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
    <div className="w-full h-full bg-white bg-opacity-70 rounded-3xl shadow-xl flex flex-col transition-all duration-300 hover:shadow-2xl relative">
      {/* SVG Wave Top */}
      <svg
        className="absolute top-0 left-0 w-full h-16 md:h-24 rounded-lg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ zIndex: -1 }}
      >
        <path
          fill="#1e40af"
          fillOpacity="0.3"
          d="M0,160L34.3,165.3C68.6,171,137,181,206,192C274.3,203,343,213,411,197.3C480,181,549,139,617,144C685.7,149,754,203,823,224C891.4,245,960,235,1029,213.3C1097.1,192,1166,160,1234,144C1302.9,128,1371,128,1406,128L1440,128L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>

      <div className="w-full h-[400px] lg:h-[400px] md:h-[300px] xs:h-[500px] xs:h-[600px] p-4 sm:p-2">
        <h3 className="text-base sm:text-[8px] md:text-[14px] lg:text-sm font-bold text-gray-800 text-center font-iranSans">
          درصد سهام شما در شرکت های گروه مالی و سرمایه گذاری ایساتیس پویا
        </h3>

        <div className="w-full h-[600px]  md:h-[500px] ">
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
      </div>
      <div className="flex justify-center mt-20 p-4 z-10">
        {hasShareholdersAccess && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "/shareholders/table")}
            className="w-96 font-bold bg-indigo-900 hover:bg-indigo-700 text-white py-1 px-1 rounded-md 
                       font-iranSans duration-200 flex items-center justify-center gap-1 text-sm"
          >
            مدیریت سهام
            <IoIosArrowBack className="w-3 h-3" />
          </motion.button>
        )}
      </div>

      {/* SVG Wave Bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16 md:h-24 rounded-lg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ zIndex: -1 }}
      >
        <path
          fill="#1e40af"
          fillOpacity="0.3"
          d="M0,160L34.3,165.3C68.6,171,137,181,206,192C274.3,203,343,213,411,197.3C480,181,549,139,617,144C685.7,149,754,203,823,224C891.4,245,960,235,1029,213.3C1097.1,192,1166,160,1234,144C1302.9,128,1371,128,1406,128L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
};

export default DashboardChart;
