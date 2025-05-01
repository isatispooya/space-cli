import { motion } from "framer-motion";

export const ToolsFeat: React.FC = () => {

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen w-full p-2 md:p-4 flex flex-col gap-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="w-full h-[35vh]"
      >
        {/* <FundCard
            symbol={symbols}
            value={950000}
            change={12000}
            changePercentage={1.5}
            size="large"
          /> */}
      </motion.div>
    </div>
  );
};

export default ToolsFeat;
