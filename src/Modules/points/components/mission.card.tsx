import { motion } from "framer-motion";
import { FaStar, FaMedal, FaGem } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";

const MissionCard = ({ missions }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {missions.map((item, index) => (
        <motion.div
          className="flex border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-1/3">
            <img
              src={item.image}
              alt="Mission"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="flex flex-col justify-between p-4 w-2/3">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              {item.display_name}
            </h2>
            <p className="text-gray-700 text-sm mb-4">{item.description}</p>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <GiTwoCoins className="text-yellow-500 text-lg" />
                <span className="text-sm font-bold text-gray-800">
                  {item.point_1} طلا
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaGem className="text-gray-500 text-lg" />
                <span className="text-sm font-bold text-gray-800">
                  {item.point_2} الماس
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-800">
                تکرار ماموریت {item.user_attempts}
              </span>
            </div>
            <a href={item.link} target="_blank">
              <button className="bg-[#5677BC] text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-300 transition-colors duration-300 w-full">
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
