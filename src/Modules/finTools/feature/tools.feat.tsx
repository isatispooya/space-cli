import { motion } from "framer-motion";
import FundCard from "../components/cards";
import { useSymbols } from "../hooks";
import { Symbol } from "../types";

export const ToolsFeat: React.FC = () => {
  const { data: symbols } = useSymbols.useGetSymbols();
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const khatamSymbol = symbols
    ? Object.values(symbols).find(
        (symbol: Symbol) => symbol.symbol_detail?.symbol === "خاتم"
      )
    : null;

  return (
    <div className="min-h-screen w-full p-2 md:p-4 flex flex-col gap-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="w-full h-[35vh]"
      >
        <FundCard
          symbol={khatamSymbol}
          value={950000}
          change={12000}
          changePercentage={1.5}
          size="large"
        />
      </motion.div>
    </div>
  );
};

export default ToolsFeat;
