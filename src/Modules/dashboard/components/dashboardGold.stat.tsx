import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";

const DashboardGoldStat = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-xl shadow-md p-4 w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
    >
      <div className="flex items-center mb-3">
        <h3 className="text-base text-amber-900 font-bold font-iranSans tracking-tight">
          طلای آب شده
        </h3>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="relative w-full">
          <svg
            className="absolute w-20 h-12 transform -rotate-12 left-1/2 -translate-x-1/2"
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
            className="absolute w-18 h-11 transform rotate-6 left-1/2 -translate-x-1/2 top-1"
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
      </div>

      <div className="mt-auto pt-4 relative z-10">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-2 px-3 rounded-lg 
                     font-iranSans duration-200 flex items-center justify-center gap-2 text-base"
        >
          <span className="text-white font-bold">به زودی</span>
          <IoIosArrowBack className="w-4 h-4" />
        </motion.button>
      </div>

      <svg
        className="absolute bottom-0 left-0 w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        <path
          fill="#fbbf24"
          fillOpacity="0.2"
          d="M0,160L48,165.3C96,171,192,181,206,181.3C274.3,181.7,343,181,411,165.3C480,150,549,118,617,122.7C685.7,128,754,170,823,186.7C891.4,202,960,192,1029,170.7C1097.1,150,1166,118,1234,106.7C1302.9,96,1371,106,1406,112L1440,117.3L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        />
      </svg>
    </motion.div>
  );
};

export default DashboardGoldStat;
