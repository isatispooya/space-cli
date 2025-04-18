import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { useDashboard } from "../hooks";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatNumber } from "../../../utils";
import Spinner from "../../../components/loaders/spinner";

interface PortfolioItem {
  Symbol: string;
  VolumeInPrice: string | number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#5677BC"];

const DashboardBorsStat = () => {
  const { data, isLoading } = useDashboard.useGetBours();
  const title = "کارگزاری ایساتیس پویا (بورس)";

  const pieData = data?.bourse.protfolio
    ? data.bourse.protfolio.map((item: PortfolioItem) => ({
        name: item.Symbol,
        value: parseInt(item.VolumeInPrice.toString()),
      }))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-xl shadow-md p-4 w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
    >
      <div className="flex items-center mb-2">
        <img
          src="/assets/Artboard 1 copy 16.png"
          alt="بورس آیکن"
          className="w-8 h-8"
        />
        <h3 className="text-sm text-[#1e40af] font-bold font-iranSans mr-2">
          {title}
        </h3>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full h-20">
          {isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : data?.bourse?.protfolio ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={false}
                  outerRadius={25}
                  dataKey="value"
                >
                  {pieData?.map(
                    (_entry: { name: string; value: number }, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [formatNumber(value), "ارزش"]}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-xs text-gray-500">
                داده‌ای برای نمایش وجود ندارد
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-4 relative z-10">
        <a
          href="https://online.ipb.ir/Account/Login"
          target="_blank"
          className="block w-full"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-900 hover:bg-blue-700 text-white py-1.5 px-2 rounded-lg 
                      font-iranSans duration-200 flex items-center justify-center gap-1 text-sm"
          >
            <span className="text-white font-bold">پنل بورس</span>
            <IoIosArrowBack className="w-3 h-3" />
          </motion.button>
        </a>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        <path
          fill="#1e40af"
          fillOpacity="0.3"
          d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,245.3C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default DashboardBorsStat;
