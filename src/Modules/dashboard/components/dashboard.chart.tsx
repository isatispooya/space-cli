import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
  }>;
  label?: string;
}

const DashboardChart = () => {
  const data = [
    { name: "فروردین", value: 65 },
    { name: "اردیبهشت", value: 59 },
    { name: "خرداد", value: 80 },
    { name: "تیر", value: 81 },
    { name: "مرداد", value: 56 },
    { name: "شهریور", value: 55 },
    { name: "مهر", value: 40 },
  ];

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-100">
          <p className="text-sm text-gray-600 mb-1 font-iranSans">{label}</p>
          <p className="text-lg font-bold text-indigo-600 font-iranSans">
            {payload[0].value} <span className="text-xs">عدد</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-lg flex flex-col">
      <div className="w-full h-full p-2 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 text-center font-iranSans">
          آمار ماهانه
        </h3>
        <div className="w-full h-[calc(100%-2rem)]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 15,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                  fontFamily: "IRANSans",
                  fill: "#6b7280",
                }}
                tickMargin={10}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{
                  fontSize: 12,
                  fontFamily: "IRANSans",
                  fill: "#6b7280",
                }}
                tickMargin={10}
                axisLine={{ stroke: "#e5e7eb" }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(236, 238, 241, 0.4)" }}
              />
              <Legend
                wrapperStyle={{
                  fontFamily: "IRANSans",
                  fontSize: "12px",
                  paddingTop: "20px",
                }}
                iconType="circle"
              />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
              <Bar
                dataKey="value"
                name="مقدار"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
                maxBarSize={60}
                animationDuration={1500}
                animationBegin={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
