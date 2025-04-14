import { motion } from "framer-motion";
import { FaTools, FaCalculator, FaChartLine, FaHeadset } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    id: "consulting",
    icon: FaHeadset,
    title: "مشاوره سرمایه گذاری",
    color: "text-blue-600",
    hoverColor: "hover:bg-blue-100",
    isActive: true,
    link: "/consultation/request",
  },
  {
    id: "calculator",

    icon: FaCalculator,
    title: "صندوق سرمایه گذاری خاتم",
    color: "text-gray-400",
    hoverColor: "",
    isActive: false,
  },
  {
    id: "investment",
    icon: FaChartLine,
    title: "صندوق سرمایه گذاری اکسیر",
    color: "text-gray-400",
    hoverColor: "",
    isActive: false,
  },
  {
    id: "accounting",
    icon: MdAccountBalance,
    title: "صندوق سرمایه گذاری ترمه ",
    color: "text-gray-400",
    hoverColor: "",
    isActive: false,
  },
  {
    id: "report",
    icon: BsFillJournalBookmarkFill,
    title: "صندوق سرمایه گذاری مشترک ",
    color: "text-gray-400",
    hoverColor: "",
    isActive: false,
  },
];

const DashboardToolsStat = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white rounded-xl shadow-md p-4 w-full h-full overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col"
    >
      {/* هدر */}
      <div className="flex items-center mb-2">
        <FaTools className="w-5 h-5 text-gray-700" />
        <h3 className="text-sm text-[#2D3748] font-bold font-iranSans mr-2">
          ابزار های مالی
        </h3>
      </div>

      {/* محتوای اصلی */}
      <div className="flex-grow flex flex-col">
        <p className="text-lg font-bold text-[#2D3748] font-iranSans text-center">
          ابزارهای مدیریت مالی
        </p>
        <p className="text-xs text-gray-600 mt-1 font-iranSans text-center">
          مدیریت هوشمند دارایی‌ها و سرمایه‌گذاری
        </p>
      </div>

      {/* دکمه‌های آیکونی در یک ردیف */}
      <div className="mt-auto pt-4 relative z-10">
        <div className="flex items-center justify-between gap-2 bg-gray-50 p-2 rounded-lg">
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              whileHover={tool.isActive ? { scale: 1.05 } : {}}
              whileTap={tool.isActive ? { scale: 0.95 } : {}}
              data-tooltip-id={tool.id}
              data-tooltip-content={tool.title}
              onClick={
                tool.link && tool.isActive
                  ? () => navigate(tool.link!)
                  : undefined
              }
              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                tool.isActive
                  ? tool.hoverColor
                  : "cursor-not-allowed bg-gray-100"
              } transition-colors duration-200`}
              disabled={!tool.isActive}
            >
              <tool.icon className={`w-4 h-4 ${tool.color}`} />
              <Tooltip
                id={tool.id}
                place="top"
                className="font-iranSans text-[10px] z-50"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* موج پس‌زمینه */}
      <svg
        className="absolute bottom-0 left-0 w-full h-16"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ zIndex: 0 }}
      >
        <path
          fill="#4A5568"
          fillOpacity="0.3"
          d="M0,192L30,192C60,192,120,192,180,197.3C240,202.7,300,213.3,360,213.3C420,213.3,480,202.7,540,197.3C600,192,660,192,720,197.3C780,202.7,840,213.3,900,213.3C960,213.3,1020,202.7,1080,197.3C1140,192,1200,192,1260,197.3C1320,202.7,1380,213.3,1410,218.7L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
        ></path>
      </svg>
    </motion.div>
  );
};

export default DashboardToolsStat;
