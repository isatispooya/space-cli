import { motion } from "framer-motion";
import { MissionTypes } from "../types";
import { PiSealCheckDuotone } from "react-icons/pi";
import { LuCoins } from "react-icons/lu";
import { TbSeeding } from "react-icons/tb";
import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { formatNumber } from "../../../utils";

const COLORS = {
  primary: {
    main: "#5677BC",
    light: "#94A3B8",
  },
} as const;

const MissionCard = ({ missions }: { missions: MissionTypes[] }) => {
  const [filterType, setFilterType] = useState<"all" | "coin" | "seed">("all");

  const filteredMissions = missions.filter((item) => {
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
        className=" flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-2xl shadow-lg border border-gray-200"
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
                borderRadius: "12px 0 0 12px",
              },
              "& .MuiButton-root:last-of-type": {
                borderRadius: "0 12px 12px 0",
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
        {filteredMissions.map((item, index) => (
          <motion.div
            className={`relative flex flex-col items-center bg-white border-2 border-gray-300 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 w-full h-auto flex-grow min-h-[300px]`}
            key={index}
          >
            <div className="flex flex-col items-center mb-4">
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
              <p className="text-xs text-gray-600 mb-1">{item.description}</p>
            </div>

            <div className="flex flex-col flex-grow">
              <div className="flex flex-col space-y-3 p-4 bg-white rounded-lg shadow-md hover:shadow-md transition-shadow duration-200 flex-grow">
                {item.point_1 !== 0 && (
                  <div className="flex items-center space-x-3">
                    <LuCoins className="text-yellow-500 text-[25px] font-bold ml-2" />
                    <span className="font-medium text-gray-800 ml-2">
                      {item.point_1} سکه
                    </span>
                    <span className="text-gray-400">|</span>
                    <span className="text-sm text-gray-600">
                      دریافتی: {formatNumber(item.point_1 * item.user_attempts)}
                    </span>
                  </div>
                )}
                {item.point_2 !== 0 && (
                  <div className="flex items-center space-x-3">
                    <TbSeeding className="text-green-500 text-[25px] font-bold ml-2" />
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

              <div className="flex justify-center w-full mt-auto">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <button
                    disabled={item.comming_soon}
                    className={`mt-2 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-300 w-full ${
                      item.comming_soon
                        ? "bg-gray-400 hover:bg-gray-400"
                        : "bg-[#58d68d] hover:bg-[#2ecc71]"
                    }`}
                  >
                    {item.comming_soon ? "به زودی" : "رفتن به ماموریت"}
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default MissionCard;
