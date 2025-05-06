import { motion } from "framer-motion";
import DashboardCard from "../../dashboard/components/DashboardCard";
import type { Symbol } from "../types/symbols.type";
import useSymbols from "../hooks/useSymbols";
import { FaChartLine } from "react-icons/fa";

export const ToolsFeat: React.FC = () => {
  const { data: symbols } = useSymbols.useGetSymbols();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getCardColor = (description: string) => {
    if (description.includes("درآمد ثابت")) return "green";
    if (description.includes("در سهام")) return "blue";
    return "purple";
  };

  const getButtonColors = (waveColor: string) => {
    switch (waveColor) {
      case "green":
        return {
          background: "#16a34a",
          hoverBackground: "#15803d",
          text: "white",
        };
      case "blue":
        return {
          background: "#1e40af",
          hoverBackground: "#1d4ed8",
          text: "white",
        };
      case "purple":
        return {
          background: "#7e22ce",
          hoverBackground: "#9333ea",
          text: "white",
        };
      default:
        return {
          background: "#1e40af",
          hoverBackground: "#1d4ed8",
          text: "white",
        };
    }
  };

  return (
    <div className="min-h-screen w-full p-2 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-10xl mx-auto">
        {symbols?.map((symbol: Symbol, index: number) => {
          const waveColor = getCardColor(symbol.description);
          return (
            <motion.div
              key={symbol.id}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-[26.5vh]"
            >
              <DashboardCard
                title={symbol.description}
                icon={<FaChartLine />}
                iconColor={symbol.last_change >= 0 ? "#16a34a" : "#dc2626"}
                waveColor={waveColor}
                buttonText="مشاهده جزئیات"
                buttonLink={`/symbols/${symbol.id}`}
                isExternalLink={false}
                customColors={getButtonColors(waveColor)}
                content={
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-lg font-bold">{symbol.symbol}</p>
                    <p className="text-2xl font-bold mt-2">
                      {symbol.last_price.toLocaleString()} ریال
                    </p>
                    <div
                      className={`mt-2 px-2 py-1 rounded-md ${
                        symbol.last_change >= 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span>
                        {symbol.last_change >= 0 ? "+" : ""}
                        {symbol.last_change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                }
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ToolsFeat;
