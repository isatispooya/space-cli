import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

const DashboardGoldStat = () => {
  return (
    <div className="relative w-full mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white rounded-xl shadow-md p-6 h-full 
                   transition-all duration-300 hover:shadow-xl transform hover:scale-105"
        style={{ zIndex: 2 }}
      >
        <div className="flex items-center space-x-4">
          <h3 className="text-sm text-amber-900 font-bold font-iranSans tracking-tight">
            طلای آب شده
          </h3>
        </div>

        <div className="w-full h-28 md:h-56 lg:h-28 flex items-center justify-center relative">
          {/* Gold Bar SVGs */}
          <svg
            className="absolute w-20 h-12 md:w-32 md:h-20 lg:w-20 lg:h-12 transform -rotate-12"
            viewBox="0 0 100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="5"
              width="90"
              height="50"
              rx="5"
              fill="#f59e0b"
              stroke="#d97706"
              strokeWidth="2"
            />
            <path
              d="M5 15L95 10M5 25L95 20M5 35L95 30"
              stroke="#fbbf24"
              strokeWidth="2"
              opacity="0.7"
            />
          </svg>
          <svg
            className="absolute w-16 h-10 md:w-28 md:h-16 lg:w-16 lg:h-10 transform rotate-6"
            viewBox="0 0 100 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="5"
              y="5"
              width="90"
              height="50"
              rx="5"
              fill="#fbbf24"
              stroke="#d97706"
              strokeWidth="2"
            />
            <path
              d="M5 15L95 10M5 25L95 20M5 35L95 30"
              stroke="#f59e0b"
              strokeWidth="2"
              opacity="0.7"
            />
          </svg>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4  bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-1 px-2 rounded-lg 
                       font-iranSans duration-200 flex items-center justify-center gap-1 text-sm"
        >
          <span className="text-white font-bold">به زودی</span>
          <IoIosArrowBack className="w-3 h-3" />
        </motion.button>

        <svg
          className="absolute bottom-0 rounded-lg left-0 w-full h-[80px] md:h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 400" 
          preserveAspectRatio="none"
          width="100%"
          style={{ zIndex: -1 }}
        >
          <path
            fill="#fbbf24"
            fillOpacity="0.2"
            d="M0,280L48,266.7C96,253,192,226,288,240C384,253,480,306,576,306.7C672,306,768,253,864,233.3C960,213,1056,226,1152,233.3C1248,240,1344,240,1392,240L1440,240L1440,400L1392,400C1344,400,1248,400,1152,400C1056,400,960,400,864,400C768,400,672,400,576,400C480,400,384,400,288,400C192,400,96,400,48,400L0,400Z"
          />
        </svg>
      </motion.div>
    </div>
  );
};

export default DashboardGoldStat;
