import { FC } from "react";
import { motion } from "framer-motion";
import { useShortcuts } from "../hooks";
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
  const { data, isLoading } = useShortcuts();

  if (isLoading) return <LoaderLg />;

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a href={shortcut.link} target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] cursor-pointer">
                  <div className="mb-4 w-16 h-16">
                    <img
                      src={shortcut.picture}
                      alt={shortcut.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="text-lg text-gray-700 font-medium text-center">
                    {shortcut.title}
                  </h3>
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
