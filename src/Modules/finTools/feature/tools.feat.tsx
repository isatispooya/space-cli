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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[60vh]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          <FundCard
            type="khatam"
            value={1250000}
            change={15000}
            changePercentage={2.5}
            size="large"
            id={khatamSymbol?.id}
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="w-full h-full"
        >
          <FundCard
            type="exir"
            value={500000}
            change={7500}
            changePercentage={1.8}
            size="large"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="w-full h-full"
        >
          <FundCard
            type="termeh"
            value={750000}
            change={-5000}
            changePercentage={-1.2}
            size="large"
          />
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="w-full h-[35vh]"
      >
        <FundCard
          type="mosharkat"
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
