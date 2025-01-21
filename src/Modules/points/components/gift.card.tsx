import { motion } from "framer-motion";
import { GiftTypes } from "../types";
import { useState } from "react";
import { useRemainPoints } from "../hooks";
import { CiLock } from "react-icons/ci";
import { LuCoins } from "react-icons/lu";
import { TbSeeding } from "react-icons/tb";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

interface GiftCardProps {
  gifts: GiftTypes[];
  postGift: (data: {
    id: string;
    gift: string;
    description: string;
    amount: number;
  }) => void;
}

interface SelectedGift {
  id: string;
  description: string;
  is_repetitive: boolean;
}

const GiftCard = ({ gifts, postGift }: GiftCardProps) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [selectedGift, setSelectedGift] = useState<SelectedGift | null>(null);
  const { data: remainPoints } = useRemainPoints();

  const handleMutate = (
    id: string,
    description: string,
    isRepetitive: boolean
  ) => {
    setSelectedGift({
      id,
      description,
      is_repetitive: Boolean(isRepetitive),
    });
    setAmount(isRepetitive ? "1" : "");
    setOpen(true);
  };

  const confirmMutation = () => {
    if (selectedGift) {
      postGift({
        id: selectedGift.id,
        gift: selectedGift.id,
        description: selectedGift.description,
        amount: selectedGift.is_repetitive ? 1 : Number(amount),
      });
      setOpen(false);
    }
  };

  const renderPointsInfo = (
    points: number,
    type: "coin" | "seed",
    attempts: number = 0
  ) => {
    const Icon = type === "coin" ? LuCoins : TbSeeding;
    const iconColor = type === "coin" ? "text-yellow-500" : "text-green-500";
    const label = type === "coin" ? "سکه" : "بذر";

    return (
      <div className="flex items-center space-x-4 space-y-2">
        <Icon className={`${iconColor} text-[25px] font-bold ml-2`} />
        <span className="font-bold text-sm">
          {points} {label}
        </span>
        <span className="text-gray-400">|</span>
        <span className="text-sm text-gray-600">
          دریافتی: {points * (attempts || 0)}
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 p-12">
        {gifts
          .filter((item) => !(item.point_1 === 0 && item.point_2 === 0))
          .map((item, index) => {
            const isButtonDisabled =
              remainPoints?.point_1 < item.point_1 ||
              remainPoints?.point_2 < item.point_2;

            return (
              <motion.div
                className={`relative flex flex-col items-center bg-white border-2 border-gray-300 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 ${
                  item.point_1 !== 0 ? "bg-gray-200" : ""
                }`}
                style={{ width: "100%", height: "auto" }}
                key={index}
              >
                <h2 className="text-sm  font-bold text-gray-800 mb-2 text-center">
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
                    {item.point_1 !== 0 &&
                      renderPointsInfo(
                        item.point_1,
                        "coin",
                        item.user_attempts
                      )}
                    {item.point_2 !== 0 &&
                      renderPointsInfo(
                        item.point_2,
                        "seed",
                        item.user_attempts
                      )}
                  </div>
                )}

                <div className="flex justify-center w-full">
                  <button
                    onClick={() =>
                      handleMutate(
                        item.id.toString(),
                        item.description,
                        item.is_repetitive
                      )
                    }
                    className={`mt-2 py-2 font-bold text-white px-4 rounded-lg text-sm w-full ${
                      isButtonDisabled
                        ? "bg-[#abebc6]"
                        : "bg-[#58d68d] hover:bg-[#2ecc71]"
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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="gift-dialog-title"
        dir="rtl"
        PaperProps={{
          style: {
            borderRadius: "16px",
            padding: "8px",
            maxWidth: "500px",
            width: "90%",
            background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          id="gift-dialog-title"
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#2c3e50",
            borderBottom: "1px solid #eee",
            padding: "16px 24px",
          }}
        >
          دریافت هدیه
        </DialogTitle>

        <DialogContent style={{ padding: "24px" }}>
          <p className="text-base text-gray-600 mb-6 text-center leading-relaxed">
            آیا مطمئن هستید که می‌خواهید این هدیه را دریافت کنید؟
          </p>

          {selectedGift && !selectedGift.is_repetitive && (
            <TextField
              autoFocus
              margin="dense"
              label="مقدار مورد نظر را وارد کنید"
              type="number"
              fullWidth
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                inputProps: { min: 0 },
                style: { borderRadius: "8px" },
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": { borderColor: "#3498db" },
                  "&.Mui-focused fieldset": { borderColor: "#2980b9" },
                },
                "& label.Mui-focused": { color: "#2980b9" },
                marginTop: "16px",
              }}
            />
          )}
        </DialogContent>

        <DialogActions
          style={{
            justifyContent: "center",
            padding: "16px 24px",
            gap: "16px",
            borderTop: "1px solid #eee",
          }}
        >
          <Button
            onClick={confirmMutation}
            variant="contained"
            color="primary"
            style={{
              borderRadius: "8px",
              padding: "8px 32px",
              fontSize: "1rem",
              background: "linear-gradient(45deg, #2980b9, #3498db)",
              boxShadow: "0 4px 12px rgba(52, 152, 219, 0.2)",
              transition: "all 0.3s ease",
            }}
            sx={{
              "&:hover": {
                background: "linear-gradient(45deg, #2473a3, #2980b9)",
                boxShadow: "0 6px 16px rgba(52, 152, 219, 0.3)",
                transform: "translateY(-1px)",
              },
            }}
          >
            تایید
          </Button>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            style={{
              borderRadius: "8px",
              padding: "8px 32px",
              fontSize: "1rem",
              borderColor: "#cbd5e1",
              color: "#64748b",
              transition: "all 0.3s ease",
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#f1f5f9",
                borderColor: "#94a3b8",
                transform: "translateY(-1px)",
              },
            }}
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GiftCard;
