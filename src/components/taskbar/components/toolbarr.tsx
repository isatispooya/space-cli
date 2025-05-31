import { FC } from "react";
import TaskBarType from "../types/taskbar.type";
import { motion } from "framer-motion";
import { Tooltip } from "@mui/material";
import { buttonStyles } from "../data";

const Toolbar: FC<TaskBarType["taskBarProps"]> = ({
  items,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 p-2 bg-white rounded-lg shadow-md ${className}`}
    >
      {items.map((item, index) => (
        <Tooltip key={index} title={item.label} placement="top" arrow>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={item.onClick}
            className={`
                flex items-center justify-center w-10 h-10 rounded-md transition-colors
                ${
                  item.variant
                    ? buttonStyles[item.variant]
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
          >
            {item.isRefreshing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                {item.icon}
              </motion.div>
            ) : (
              item.icon
            )}
          </motion.button>
        </Tooltip>
      ))}
    </motion.div>
  );
};

export default Toolbar;
