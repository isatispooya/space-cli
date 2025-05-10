import { toast } from "react-hot-toast";
import { motion } from "framer-motion";


interface DetailType {
  title: string;
  value: string;
}

interface DataItemType {
  name: string;
  label: string;
  type: string; 
  value: DetailType[]; 
}


interface DetailBoxPropsType {
  data: DataItemType[];
  isCopied: boolean;
  setIsCopied: (isCopied: boolean) => void;
}


const FormDetail: React.FC<DetailBoxPropsType> = ({ data = [], isCopied, setIsCopied }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gray-50 border border-gray-300 rounded-lg p-6 shadow-md"
    >
      {data.map((item, index) => {
        if (item.type === "detail") {
          return (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {item.label}
              </h3>
              <motion.ul
                layout
                className="space-y-4"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                initial="hidden"
                animate="visible"
              >
                {item.value.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    layout
                    className="flex items-center justify-between w-full"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {/* Title */}
                    <p className="text-sm font-semibold text-gray-800 flex-1">
                      {detail.title}:
                    </p>

                    {/* Value */}
                    <p className="text-sm font-medium text-gray-900 bg-white px-4 py-2 rounded-md shadow-inner flex-1 text-center">
                      {detail.value}
                    </p>

                    {/* Copy Button */}
                    <motion.button
                      onClick={() => {
                        navigator.clipboard.writeText(detail.value || "");
                        toast.success(`${detail.title} با موفقیت کپی شد`);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                      }}
                      className={`px-4 py-2 ${
                        isCopied ? "bg-green-500" : "bg-[#29D2C7]"
                      } text-white rounded-md shadow hover:bg-[#25b2a8] transition-colors text-xs flex items-center`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {isCopied ? "کپی شد!" : `کپی ${detail.title}`}
                    </motion.button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          );
        }
        return null; 
      })}
    </motion.div>
  );
};

export default FormDetail;