import { motion } from "framer-motion";
import { GiftTypes } from "../types";
import Popup from "./popup";
import { useState } from "react";
import { useRemainPoints } from "../hooks";
import { CiLock } from "react-icons/ci";
import { LuCoins } from "react-icons/lu";
import { TbSeeding } from "react-icons/tb";



const GiftCard = ({
  gifts,
  postGift,
}: {
  gifts: GiftTypes[];
  postGift: (data: { id: string; gift: string; description: string; amount: number }) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [selectedGift, setSelectedGift] = useState<{
    id: string;
    description: string;
  } | null>(null);
  const { data: remainPoints } = useRemainPoints();

  console.log(remainPoints);

  

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
        amount: amount
      };
      postGift(data);
      setOpen(false);
    }
  };


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 p-12">
        {gifts
          .filter(item => !(item.point_1 === 0 && item.point_2 === 0))
          .map((item, index) => {
          const isButtonDisabled = remainPoints?.point_1 < item.point_1;

          return (
            <motion.div
              className={`relative flex flex-col items-center bg-white border-2 border-gray-300 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${
                item.point_1 !== 0 ? "bg-gray-200" : ""
              }`}
              style={{ width: "100%", height: "auto" }}
              key={index}
            >
              <h2 className="text-sm font-bold text-gray-800 mb-2 text-center">
                {item.display_name}
              </h2>
              <img
                src={item.image}
                alt="Gift"
                className="w-[130px] h-[130px] rounded-xl object-cover m-2"
              />
              <p className="text-xs text-gray-600 mb-1">{item.description}</p>
              {!(item.point_1 === 0 && item.point_2 === 0) && (
                <div className="flex flex-col space-y-3 p-4 bg-white rounded-lg shadow-md hover:shadow-md transition-shadow duration-200">
                  {item.point_1 !== 0 && (
                    <div className="flex items-center space-x-4 space-y-2">
                      <LuCoins className="text-yellow-500 text-[25px] font-bold  ml-2" />
                      <span className="font-bold text-sm">
                        {item.point_1} سکه
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="text-sm text-gray-600">
                        دریافتی: {item.point_1 * (item.user_attempts || 0)}
                      </span>
                    </div>
                  )}
                  {item.point_2 !== 0 && (
                    <div className="flex items-center space-x-4 space-y-2">
                      <TbSeeding className="text-green-500 text-[25px] font-bold ml-2" />
                      <span className="font-bold text-sm">
                        {item.point_2} بذر
                      </span>
                      <span className="text-gray-400">|</span>
                      <span className="text-sm text-gray-600">
                        دریافتی: {item.point_2 * (item.user_attempts || 0)}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-center w-full">
                <button
                  onClick={() =>
                    handleMutate(item.id.toString(), item.description)
                  }
                  className={`mt-2 py-2 px-4 rounded-lg text-sm w-full ${
                    isButtonDisabled
                      ? "bg-gray-300"
                      : "bg-gray-200 hover:bg-gray-200"
                  }`}
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? (
                    <>
                      <CiLock className="mr-2 text-xl text-gray-900 inline" />
                      <span>امتیاز کافی نیست</span>
                    </>
                  ) : (
                    <span>دریافت هدیه</span>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <Popup
        isOpen={open}
        label="دریافت هدیه "
        text="آیا مطمئن هستید که می‌خواهید این هدیه را دریافت کنید؟"
        onConfirm={confirmMutation}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            مقدار مورد نظر را وارد کنید
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </Popup>
    </>
  );
};

export default GiftCard;
