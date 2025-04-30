import { Button, NoContent } from "@/components";
import { motion } from "framer-motion";
import { Symbol } from "../types";
import { useNavigate } from "react-router-dom";
import { server } from "@/api";

const Details = ({ symbol }: { symbol: Symbol | undefined }) => {
  const navigate = useNavigate();

  if (!symbol) {
    return <NoContent label="هیچ صندوقی یافت نشد" />;
  }

  return (
    <motion.div
      key={symbol.id}
      className="flex-1 flex flex-col items-center justify-center text-center p-6 text-white min-h-screen"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="mb-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <img
          src={server + symbol?.photo}
          alt="Khatam ETF Logo"
          className="h-20 w-auto transition-transform duration-300 hover:scale-110"
        />
      </motion.div>
      <motion.h1
        className="text-3xl font-bold mb-4 text-[#02205F] tracking-wide"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {symbol.symbol_detail?.name || "نام صندوق"}
      </motion.h1>
      <motion.p
        className="text-lg max-w-md leading-relaxed text-[#09193C] font-light"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {symbol.description || "توضیحات صندوق"}
      </motion.p>
      <motion.div
        className="mt-6 flex space-x-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Button
          size="xl"
          onClick={() => {
            if (symbol.link) {
              window.open(symbol.link, "_blank");
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          خرید
        </Button>
        <Button
          onClick={() => {
            navigate("/consultation");
          }}
          className="border-2 bg-transparent border-green-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300"
        >
          مشاوره
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default Details;
