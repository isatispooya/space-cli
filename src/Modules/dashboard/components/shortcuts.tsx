import { FC } from "react";
import { motion } from "framer-motion";
import { useDashboard } from "../hooks";
import { LoaderLg } from "../../../components";

interface Shortcut {
  id: number;
  title: string;
  link: string;
  picture: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const Shortcuts: FC = () => {
  const { data, isLoading } = useDashboard.useGetShortcuts();

  if (isLoading) return <LoaderLg />;

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6"
      >
        {data?.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            هیچ لیستی موجود نیست
          </div>
        ) : (
          data?.map((shortcut: Shortcut) => (
            <motion.div
              key={shortcut.id}
              variants={item}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <a href={shortcut.link} target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-xl shadow-md transition-all duration-300 cursor-pointer relative">
                  <div className="flex flex-col sm:flex-row h-auto sm:h-48">
                    <div className="w-full sm:w-48 h-48">
                      <img
                        src={shortcut.picture}
                        alt={shortcut.title}
                        className="w-full h-full object-cover rounded-t-xl sm:rounded-t-none sm:rounded-l-xl"
                      />
                    </div>
                    <div className="flex-grow p-6 flex flex-col justify-between">
                      <h3 className="text-xl text-gray-700 font-medium">
                        {shortcut.title}
                      </h3>
                      <div className="flex justify-end mt-4 sm:mt-0">
                        <button className="bg-[#5677BC] text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
                          اطلاعات بیشتر
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Shortcuts;
