import { motion } from "framer-motion";
import { IoIosArrowBack } from "react-icons/io";
import { RiUserReceived2Line } from "react-icons/ri";
import { useDashboard } from "../hooks";

const getMotionDivStyles = () => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  className: "relative bg-white rounded-xl shadow-lg p-6 h-full transition-shadow duration-300 hover:shadow-2xl transform hover:scale-105",
  style: { zIndex: 2 }
});

const DashboardBorsStat = () => {
  const { data } = useDashboard.useGetStats();

  const title = data?.title || "بورس";
  const value = data?.value || 0;

  return (
    <div>
      <div className="background">
        {/* پس‌زمینه */}
      </div>

      <motion.div {...getMotionDivStyles()}>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center mb-8">
            <RiUserReceived2Line className="w-5 h-5  text-[#1e40af]" />
            <h3 className="text-sm  text-[#1e40af] font-bold font-iranSans">
              {title}
            </h3>
          </div>
        </div>

        <div className="mb-4">
          <motion.p
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="text-4xl md:text-6xl lg:text-8xl text-center font-bold text-[#1e40af] mt-4 font-iranSans"
          >
            {value}
            <span className="text-sm text-[#1e40af] font-iranSans">نفر</span>
          </motion.p>
        </div>
        <a href="https://ipb.ir" target="_blank">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-900  hover:bg-blue-700 text-white py-1 px-2 rounded-lg 
                       font-iranSans duration-200 flex items-center justify-center gap-1 text-sm"
          >
            <span className="text-white font-bold">پنل بورس</span>
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
            fill="#1e40af"
            fillOpacity="0.3"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,245.3C672,245,768,203,864,186.7C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </motion.div>
    </div>
  );
};

export default DashboardBorsStat;
