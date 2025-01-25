import { motion } from "framer-motion";
import { GiftTypes } from "../types";
import { useState } from "react";
import { useRemainPoints } from "../hooks";
import { LuCoins } from "react-icons/lu";
import { TbSeeding } from "react-icons/tb";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  ButtonGroup,
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

const COLORS = {
  primary: {
    main: "#5677BC",
    light: "#94A3B8",
  },
  success: {
    main: "#58d68d",
    light: "#abebc6",
    dark: "#2ecc71",
  },
  text: {
    primary: "#2c3e50",
    secondary: "#64748b",
  },
} as const;

const GiftCard = ({ gifts, postGift }: GiftCardProps) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [selectedGift, setSelectedGift] = useState<SelectedGift | null>(null);
  const [filterType, setFilterType] = useState<"all" | "coin" | "seed">("all");
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
    setAmount(isRepetitive ? "0" : "");
    setOpen(true);
  };

  const formatNumber = (num: number | undefined) => {
    if (num === undefined) return "";
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
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

  const convertAll = () => {
    if (selectedGift) {
      const totalAmount = selectedGift.is_repetitive
        ? remainPoints?.point_1 || 0
        : remainPoints?.point_2 || 0;

      const gift = gifts.find((g) => g.id.toString() === selectedGift.id);

      const requiredAmount = selectedGift.is_repetitive
        ? gift?.point_1 || 1
        : gift?.point_2 || 1;

      const dividedAmount = Math.floor(totalAmount / requiredAmount);
      setAmount(dividedAmount.toString());
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

  const filteredGifts = gifts.filter((item) => {
    if (item.point_1 === 0 && item.point_2 === 0) return false;
    switch (filterType) {
      case "coin":
        return item.point_1 > 0;
      case "seed":
        return item.point_2 > 0;
      default:
        return true;
    }
  });

  return (
    <>
      <div
        dir="rtl"
        className="mb-8 flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl shadow-lg border border-gray-200"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <ButtonGroup
            variant="contained"
            aria-label="filter buttons"
            size="large"
            fullWidth
            disableElevation
            sx={{
              "& .MuiButton-root": {
                fontSize: "1.25rem",
                padding: "10px 30px",
                fontWeight: "bold",
                border: "none",
                background: COLORS.primary.light,
                minHeight: "60px",
                "&.selected": {
                  background: COLORS.primary.main,
                  boxShadow: "inset 0 3px 6px rgba(0, 0, 0, 0.2)",
                  opacity: 1,
                  transform: "scale(1.02)",
                },
                "&:not(.selected)": {
                  opacity: 0.9,
                },
                "&:hover": {
                  background: COLORS.primary.main,
                  transform: "translateY(-2px) scale(1.01)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                "& svg": {
                  fontSize: "1.75rem",
                },
              },
              "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                borderRight: "1px solid rgba(255, 255, 255, 0.2)",
              },
              "& .MuiButton-root:first-of-type": {
                borderRadius: "0 12px 12px 0",
              },
              "& .MuiButton-root:last-of-type": {
                borderRadius: "12px 0 0 12px",
              },
            }}
          >
            <Button
              onClick={() => setFilterType("seed")}
              className={filterType === "seed" ? "selected" : ""}
            >
              <TbSeeding className="text-xl" />
              بذر
            </Button>
            <Button
              onClick={() => setFilterType("coin")}
              className={filterType === "coin" ? "selected" : ""}
            >
              <LuCoins className="text-xl" />
              سکه
            </Button>
          </ButtonGroup>
        </motion.div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 p-12">
        {filteredGifts.map((item, index) => {
          const isButtonDisabled =
            remainPoints?.point_1 < item.point_1 ||
            remainPoints?.point_2 < item.point_2;

          return (
            <motion.div
              key={index}
              className={`
                relative flex flex-col items-center 
                bg-white border-2 border-gray-300 rounded-2xl 
                shadow-lg hover:shadow-xl transition-shadow duration-300 
                p-6 w-full h-auto
                ${item.point_1 !== 0 ? "bg-gray-200" : ""}
              `}
            >
              <h2 className="text-lg font-bold text-gray-800 mb-2 text-center">
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
                    renderPointsInfo(item.point_1, "coin", item.user_attempts)}
                  {item.point_2 !== 0 &&
                    renderPointsInfo(item.point_2, "seed", item.user_attempts)}
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
                  className={`
                    mt-2 py-2 px-4 rounded-lg text-sm w-full font-bold text-white
                    transition-all duration-200
                    ${
                      isButtonDisabled || !item.status
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600"
                    }
                  `}
                  disabled={isButtonDisabled || !item.status}
                >
                  {isButtonDisabled || !item.status ? (
                    <span>به زودی</span>
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
        dir="rtl"
        PaperProps={{
          sx: {
            borderRadius: "16px",
            width: "90%",
            maxWidth: "400px",
            bgcolor: "#ffffff",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#2c3e50",
            py: 3,
          }}
        >
          دریافت هدیه
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <p className="text-gray-600 text-center mb-6">
            آیا مطمئن هستید که می‌خواهید این هدیه را دریافت کنید؟
          </p>

          <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg">
            <span className="text-gray-700 flex items-center gap-2">
              {selectedGift?.is_repetitive ? (
                <>
                  <LuCoins className="text-yellow-500 text-xl" />
                  تعداد سکه شما:
                </>
              ) : (
                <>
                  <TbSeeding className="text-green-500 text-xl" />
                  تعداد بذر شما:
                </>
              )}
            </span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900">
                {formatNumber(
                  selectedGift?.is_repetitive
                    ? remainPoints?.point_1
                    : remainPoints?.point_2
                )}
              </span>
              {selectedGift?.is_repetitive ? (
                <Button
                  onClick={convertAll}
                  size="small"
                  sx={{
                    bgcolor: "#f8fafc",
                    color: "#5677BC",
                    "&:hover": { bgcolor: "#f1f5f9" },
                  }}
                >
                  تبدیل همه
                </Button>
              ) : null}
            </div>
          </div>

          {selectedGift && selectedGift.is_repetitive === true && (
            <TextField
              autoFocus
              fullWidth
              label="مقدار مورد نظر"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#5677BC",
                  },
                },
              }}
            />
          )}

          <div className="flex justify-end gap-3 mt-8">
            <Button
              onClick={() => setOpen(false)}
              sx={{
                color: "#64748b",
                "&:hover": { bgcolor: "#f1f5f9" },
              }}
            >
              انصراف
            </Button>
            <Button
              onClick={confirmMutation}
              variant="contained"
              sx={{
                bgcolor: "#5677BC",
                "&:hover": { bgcolor: "#4C6AAF" },
                boxShadow: "none",
              }}
            >
              تایید
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GiftCard;
