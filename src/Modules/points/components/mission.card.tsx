import { motion } from "framer-motion";
import { GiTwoCoins } from "react-icons/gi";
import { MissionTypes } from "../types";

const MissionCard = ({ missions }: { missions: MissionTypes[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-12">
      {missions.map((item, index) => (
        <motion.div
          className="flex flex-col items-center bg-with border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
          style={{ width: "100%", height: "auto" }}
          key={index}
        >
          <h2 className="text-sm font-bold text-gray-800 mb-2 text-center">
            {item.display_name}
          </h2>
          <img
            src={item.image}
            alt="Mission"
            className="w-[130px] h-[130px] rounded-xl object-cover m-2"
          />
          <p className="text-xs text-gray-600 mb-1">{item.description}</p>
          <div className="flex flex-col items-center space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm space-x-2">
                {item.user_attempts === 0 ? (
                  <span className="text-red-500">انجام نشده</span>
                ) : (
                  `${item.user_attempts} دریافت ها`
                )}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <GiTwoCoins className="text-yellow-500 text-sm" />
              <span className="font-bold text-sm">
                {item.user_attempts === 0 ? item.point_1 : item.point_1 * item.user_attempts} طلایی
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <GiTwoCoins className="text-gray-500 text-sm" />
              <span className="font-bold text-sm">
                {item.user_attempts === 0 ? item.point_2 : item.point_2 * item.user_attempts} نقره ای 
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <a href={item.link} target="_blank">
              <button className="mt-2 bg-gray-200 text-gray-800 py-2 px-2 rounded-lg text-sm hover:bg-gray-300 transition-colors duration-300 md:w-[330px] sm:w-[100px]">
                رفتن به ماموریت
              </button>
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MissionCard;

