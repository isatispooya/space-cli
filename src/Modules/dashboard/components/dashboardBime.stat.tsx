import { motion } from "framer-motion";

import { useDashboard } from "../hooks";
import { IoIosArrowBack } from "react-icons/io";

import bimeImg from "../../../../public/assets/bime.png";

const DashboardBimeStat = () => {
  const { data: stats } = useDashboard.useGetStats();
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-xl shadow-lg p-6 h-full transition-shadow duration-300 hover:shadow-2xl transform hover:scale-105"
      style={{ zIndex: 2 }}
    >
      <div className="flex items-center space-x-4">
        <img src={bimeImg} alt="bime" className="w-10 h-10" />
        <h3 className="text-sm text-[#1a5c35] font-bold font-iranSans">کارگزاری رسمی بیمه</h3>
      </div>

      <div className="mb-4 z-50">
        <motion.p
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-6xl md:text-8xl text-center font-bold text-[#1a5c35] mt-2 font-iranSans"
        >
          {stats?.pishkar?.["count"] || 0}
          <span className="text-sm text-[#1a5c35] font-iranSans">عدد</span>
        </motion.p>
      </div>

  

      <a href="https://bime.isatispooya.com" target="_blank">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-green-800 hover:bg-green-600 text-white py-1 px-2 rounded-lg 
                       font-iranSans duration-200 flex items-center justify-center gap-1 text-sm"
            >
              <span className="text-white font-bold">وبسایت بیمه</span>
              <IoIosArrowBack className="w-3 h-3" />
            </motion.button>
          </a>

      <svg
        className="absolute bottom-0 rounded-xl left-0 w-full h-32 md:h-48"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        width="100%"
        style={{ zIndex: -1 }}
      >
        <path
          fill="#48bb78"
          fillOpacity="0.3"
          d="M0,192L30,192C60,192,120,192,180,197.3C240,202.7,300,213.3,360,213.3C420,213.3,480,202.7,540,197.3C600,192,660,192,720,197.3C780,202.7,840,213.3,900,213.3C960,213.3,1020,202.7,1080,197.3C1140,192,1200,192,1260,197.3C1320,202.7,1380,213.3,1410,218.7L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default DashboardBimeStat;
