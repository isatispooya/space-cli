import { useDashboard } from "../hooks";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatNumber } from "../../../utils";
import Spinner from "../../../components/loaders/spinner";
import DashboardCard from "./DashboardCard";
import { bors } from "@/assets";

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

  const chartContent = (
    <div className="flex-grow flex items-center justify-center">
      <div className="w-full h-24">
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
                outerRadius={35}
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
            <p className="text-sm text-gray-500">
              داده‌ای برای نمایش وجود ندارد
            </p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <DashboardCard
      title={title}
      icon={<img src={bors} alt="بورس آیکن" className="w-10 h-10" />}
      iconColor="#1e40af"
      waveColor="blue"
      buttonText="پنل بورس"
      buttonLink="https://online.ipb.ir/Account/Login"
      isExternalLink={true}
      customColors={{
        background: "#1e3a8a",
        hoverBackground: "#1d4ed8",
        text: "white",
      }}
      content={chartContent}
      className="tour-bors"
    />
  );
};

export default DashboardBorsStat;
