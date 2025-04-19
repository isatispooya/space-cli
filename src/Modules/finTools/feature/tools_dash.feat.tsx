import { motion } from "framer-motion";
import FundCard from "../components/funds.card";

export const FundsDashboard: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen w-full p-2 md:p-4 flex flex-col gap-4">
      {/* Top row with 3 cards */}
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

      {/* Bottom row with mosharkat card */}
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

export default FundsDashboard;