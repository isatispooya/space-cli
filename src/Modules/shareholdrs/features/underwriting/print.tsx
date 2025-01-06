import { FC } from "react";
import { motion } from "framer-motion";
import { useUnderwriting } from "../../hooks";
import { useUnderwritingStore } from "../../store";

const PrintUnderwriting: FC = () => {
  const handlePrint = () => {
    window.print();
  };

  const { data } = useUnderwriting.useGet();

  const { id } = useUnderwritingStore();

  console.log(data);
  const underwritingPrint = data?.find((item) => item.id === id);

  return (
    <div className="p-8 rtl">
      {underwritingPrint && (
        <>
          {data?.map((item) => (
            <div key={item.id}>
              <h1 className="text-2xl font-bold">{item.price}</h1>
            </div>
          ))}
        </>
      )}
      <motion.button
        className="bg-green-500 text-white px-6 py-3 rounded-md text-base font-medium hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handlePrint}
      >
        پرینت صفحه
      </motion.button>
      <style>{`
            @media print {
              button {
                display: none;
              }
              @page {
                margin: 2cm;
              }
            }
          `}</style>
    </div>
  );
};

export default PrintUnderwriting;
