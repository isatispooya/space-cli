import { motion } from "framer-motion";

const MissionCard = ({ missions }) => {
  return (
    <>
      {missions.map((item, index) => (
        <motion.div
          className="flex p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          key={item?.pointsType}
        >
          <img src={item?.image} alt="Mission" className="w-1/6 rounded-l-lg" />
          <div className="flex flex-col justify-between p-4 w-2/3">
            <h2 className="text-lg font-bold">{item?.pointsType}</h2>
            <p className="text-gray-700">{item?.description}</p>
            <button
              onClick={item?.onNavigate}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Go to Mission
            </button>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default MissionCard;
