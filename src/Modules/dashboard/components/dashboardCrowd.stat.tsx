import { motion } from "framer-motion";

import { useDashboard } from "../hooks";
import { IoIosArrowBack } from "react-icons/io";

import crowdImg from "../../../../public/assets/crowdlogo.png";

const DashboardCrowdStat = () => {
  const { data: stats } = useDashboard.useGetStats();

  console.log(stats);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-xl p-4 h-full hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex items-center justify-between ">
        <img src={crowdImg} alt="crowd" className="w-10 h-10" />
      </div>

      <div className="mb-6">
        <h3 className="text-sm text-gray-500 font-iranSans">ایساتیس کراد</h3>
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-xl font-bold text-gray-900 mt-2 space-x-2 font-iranSans"
        >
          <span className="text-sm ml-2">مجموع کل سرمایه گذاری</span>
          {stats?.crowd?.["total value"] || 0}
        </motion.p>

        <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <p className="flex-1 text-sm text-gray-600 font-iranSans truncate">
            <span className="text-sm ml-2">سود</span>
            {stats?.crowd?.["all rate of return"] || 0}
          </p>
        </div>
        <a href="https://isatiscrowd.ir" target="_blank">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 bg-[#5677BC] hover:bg-[#5677BC] text-white py-2 px-4 rounded-lg 
                     font-iranSans transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span> پنل کراد</span>
            <IoIosArrowBack className="w-4 h-4" />
          </motion.button>
        </a>
      </div>
    </motion.div>
  );
};

export default DashboardCrowdStat;
