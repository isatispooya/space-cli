import { FC } from "react";
import { motion } from "framer-motion";
import { useShortcuts } from "../hooks";
import { LoaderLg } from "../../../components";

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
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-4 max-w-[1200px] mx-auto"
    >
      {data?.map((shortcut) => (
        <motion.div
          key={shortcut.id}
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full"
        >
          <a 
            href={shortcut.link} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className={`
              bg-white
              rounded-2xl p-3
              shadow-lg
              transition-all duration-300
              flex flex-col items-center
              text-center
              h-[90px]
              justify-center
              cursor-pointer
              w-full
              max-w-[120px]
              mx-auto
              hover:bg-gray-50
              relative
              overflow-hidden
            `}>
              <div className="mb-2 w-8 h-8">
                <img 
                  src={shortcut.picture} 
                  alt={shortcut.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-[12px] text-gray-700 font-medium leading-tight">
                {shortcut.title}
              </h3>
            </div>
          </a>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Shortcuts;
