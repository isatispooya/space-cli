import { motion } from "framer-motion";
import { FaGem } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { GiftTypes } from "../types";
import Popup from "../../../components/popup";
import { useState } from "react";

const GiftCard = ({
  gifts,
  postGift,
}: {
  gifts: GiftTypes[];
  postGift: (data: { id: string; gift: string; description: string }) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<{
    id: string;
    description: string;
  } | null>(null);

  const handleMutate = (id: string, description: string) => {
    setSelectedGift({ id, description });
    setOpen(true);
  };

  const confirmMutation = () => {
    if (selectedGift) {
      const data = {
        id: selectedGift.id,
        gift: selectedGift.id,
        description: selectedGift.description,
      };
      postGift(data);
      setOpen(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {gifts.map((item, index) => (
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

              <button
                onClick={() =>
                  handleMutate(item.id.toString(), item.description)
                }
                className="bg-[#5677BC] text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-300 transition-colors duration-300 w-full"
              >
                دریافت هدیه
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <Popup
        isOpen={open}
        label="دریافت هدیه "
        text="آیا مطمئن هستید که می‌خواهید این هدیه را دریافت کنید؟"
        onConfirm={confirmMutation}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default GiftCard;
