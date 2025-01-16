import { motion } from "framer-motion";
import { FaGem } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { MissionTypes } from "../types";

const MissionCard = ({ missions }: { missions: MissionTypes[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-12">
      {missions.map((item, index) => (
        <motion.div
          className="flex flex-col bg-with border rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
          style={{ width: '100%' }}
          key={index}
        >
          <div className="mb-[-40px]">
            <img
              src={item.image}
              alt="Mission"
              className="w-full h-auto rounded-xl object-cover m-2"
            />
          </div>
          <div className="flex flex-col justify-between p-2 w-full text-right">
            <h2 className="text-lg font-bold text-gray-800 mb-1">
              {item.display_name}
            </h2>
            <p className="text-gray-600 text-sm mb-1">{item.description}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GiTwoCoins className="text-yellow-500 text-lg" />
                <span className="font-bold">{item.point_1} طلا</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaGem className="text-gray-500 text-lg" />
                <span className="font-bold">{item.point_2} الماس</span>
              </div>
            </div>
            <div className="flex justify-center">
              <a href={item.link} target="_blank">
                <button className="mt-2 bg-gray-200 text-gray-800 py-2 px-2 rounded-lg text-sm hover:bg-gray-300 transition-colors duration-300 w-full">
                  رفتن به ماموریت
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MissionCard;
