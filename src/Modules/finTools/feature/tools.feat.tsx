import { motion } from "framer-motion";
import FundCard from "../components/cards";
import { useSymbols } from "../hooks";
import { Symbol } from "../types/symbols.type";

export const ToolsFeat: React.FC = () => {
  const { data: symbols } = useSymbols.useGetSymbols();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const formatSymbol = (symbolData: Symbol) => ({
    id: symbolData.id,
    symbol: symbolData.symbol,
    symbol_detail: {
      id: symbolData.id,
      symbol: symbolData.description,
      name: symbolData.description,
      type: symbolData.description.includes("درآمد ثابت")
        ? "fixincome"
        : symbolData.description.includes("در سهام")
        ? "equity"
        : "mixed",
    },
    description: symbolData.description,
    photo: symbolData.photo,
    link: symbolData.link,
  });

  return (
    <div className="min-h-screen w-full p-2 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {symbols?.map((symbol: Symbol, index: number) => (
          <motion.div
            key={symbol.id}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="h-[35vh]"
          >
            <FundCard
              symbol={formatSymbol(symbol)}
              value={symbol.last_price}
              change={(symbol.last_change * symbol.last_price) / 100}
              changePercentage={Number(symbol.last_change.toFixed(2))}
              size="large"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolsFeat;
