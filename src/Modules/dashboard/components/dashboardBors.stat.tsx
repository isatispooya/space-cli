import { IoIosArrowBack } from "react-icons/io";
import { useDashboard } from "../hooks";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatNumber } from "../../../utils";
import Spinner from "../../../components/loaders/spinner";
import Card from "../../../components/cards/card";
import WaveEffect from "../../../ui/wave";
import "../../../ui/wave.css";
import { Button } from "@/components"; 

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

  const content = (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center ">
        <img
          src="/assets/Artboard 1 copy 16.png"
          alt="بورس آیکن"
          className="w-10 h-10"
        />
        <h3 className="text-base text-[#1e40af] font-bold font-iranSans mr-2">
          {title}
        </h3>
      </div>

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
                    (
                      _entry: { name: string; value: number },
                      index: number
                    ) => (
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

      <div className="mt-auto pt-4 relative z-10 w-full">
        <a
          href="https://online.ipb.ir/Account/Login"
          target="_blank"
          className="block w-full"
        >
          <Button
            variant="custom"
            customColors={{
              background: "#1e3a8a", 
              hoverBackground: "#1d4ed8", 
              text: "white",
            }}
            fullWidth
            animationOnHover="scale"
            animationOnTap="scale"
            className="w-full py-2 px-3 rounded-lg font-iranSans text-base "
            rightIcon={<IoIosArrowBack className="w-4 h-4" />}
          >
            <span >پنل بورس</span>
          </Button>
        </a>
      </div>
    </div>
  );

  return (
    <Card
      disableAnimation={true}
      className="relative bg-white rounded-xl shadow-md p-4 w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl wave-container"
      contentClassName="h-full p-0"
      content={content}
      customStyles={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      padding="0"
      footerSlot={<WaveEffect color="blue" />}
    />
  );
};

export default DashboardBorsStat;
