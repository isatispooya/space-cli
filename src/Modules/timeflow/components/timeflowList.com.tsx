import { motion } from "framer-motion";
import { useState } from "react";

interface TimeFlowItem {
  id: string;
  name: string;
  email: string;
  amount: number;
  image: string;
  time: string;
}

const TimeFlowList = ({ items }: { items: TimeFlowItem[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleAccept = (id: string) => {
    console.log("Accepted:", id);
  };

  const handleReject = (id: string) => {
    console.log("Rejected:", id);
  };

  return (
    <>
      <ul className="max-w-4xl mx-auto space-y-6">
        {items.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center space-x-12 rtl:space-x-reverse">
              <div className="flex-shrink-0 relative group">
                <img
                  className="w-20 h-20 rounded-full cursor-pointer transition-transform group-hover:scale-105"
                  src={item.image}
                  alt={`${item.name} image`}
                  onClick={() => setSelectedImage(item.image)}
                />
                <button
                  onClick={() => setSelectedImage(item.image)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="text-white text-sm">View</span>
                </button>
              </div>
              <div className="flex-1 min-w-0 ml-8">
                <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                  {item.name}
                </p>
                <p className="text-base text-gray-500 truncate dark:text-gray-400 mt-1">
                  {item.email}
                </p>
                <p className="text-sm text-gray-400 mt-1">{item.time}</p>
              </div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white px-6">
                {item.amount}h
              </div>
              <div className="flex space-x-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAccept(item.id)}
                  className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600 min-w-[40px]"
                >
                  ✓
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReject(item.id)}
                  className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600 min-w-[40px]"
                >
                  ✕
                </motion.button>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white dark:bg-gray-800 p-4 rounded-lg max-w-3xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 p-2 bg-gray-800 dark:bg-gray-600 text-white rounded-full hover:bg-gray-700 dark:hover:bg-gray-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TimeFlowList;
