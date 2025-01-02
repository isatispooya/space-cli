import { motion } from "framer-motion";
import { useProfile } from "../../userManagment";

const Greetings = () => {
  const { data } = useProfile();

  return (
    <div className="flex justify-start items-center h-20 p-4">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col items-end gap-1"
      >
        <div className="flex items-center gap-2">
          <span className="text-md font-medium text-gray-700">
            سلام{" "}
            <motion.span
              initial={{ opacity: 0.8 }}
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#5677BC]"
            >
              {data?.first_name + " " + data?.last_name}
            </motion.span>{" "}
            عزیز
            <span className="text-md font-medium text-gray-700">
              {" "}
              به ایساتیس من خوش آمدید
            </span>
          </span>
          <motion.span
            animate={{
              rotate: [0, 15, 0],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-2xl"
          >
            👋
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default Greetings;
