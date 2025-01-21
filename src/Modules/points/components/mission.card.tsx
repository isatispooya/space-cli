import { motion } from "framer-motion";
import { MissionTypes } from "../types";
import { PiSealCheckDuotone } from "react-icons/pi";
import { LuCoins } from "react-icons/lu";
import { TbSeeding } from "react-icons/tb";

const MissionCard = ({ missions }: { missions: MissionTypes[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 p-12">
      {missions.map((item, index) => (
        <motion.div
          className={`relative flex flex-col items-center bg-white border-2 border-gray-300 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6`}
          style={{ width: "100%", height: "auto" }}
          key={index}
        >
          {item.user_attempts !== 0 ? (
            <div className="flex justify-center items-center w-full mb-2">
              <PiSealCheckDuotone className="text-green-700 text-6xl" />
            </div>
          ) : (
            <div className="h-20" />
          )}

          <h2 className="text-sm font-bold text-gray-800 mb-2 text-center break-words flex-wrap">
            {item.display_name}
          </h2>
          <img
            src={item.image}
            alt="Mission"
            className="w-[130px] h-[130px] rounded-xl object-cover m-2"
          />
          <p className="text-xs text-gray-600 mb-1 ">{item.description}</p>
          <div className="flex flex-col space-y-3 p-4 bg-white rounded-lg shadow-md hover:shadow-md transition-shadow duration-200">
            {item.point_1 !== 0 && (
              <div className="flex items-center space-x-3">
                <LuCoins className="text-yellow-500 text-[25px] font-bold  ml-2" />
                <span className="font-medium text-gray-800 ml-2">
                  {item.point_1} سکه
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600">
                  دریافتی: {item.point_1 * item.user_attempts}
                </span>
              </div>
            )}
            {item.point_2 !== 0 && (
              <div className="flex items-center space-x-3">
                <TbSeeding className="text-green-500 text-[25px] font-bold ml-2" />{" "}
                <span className="font-medium text-gray-800 ml-2">
                  {item.point_2} بذر
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600">
                  دریافتی: {item.point_2 * item.user_attempts}
                </span>
              </div>
            )}
          </div>

          {item.link && (
            <div className="flex justify-center w-full">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="mt-2 bg-[#58d68d] text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-[#2ecc71] transition-colors duration-300 w-full">
                  رفتن به ماموریت
                </button>
              </a>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default MissionCard;
