import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SwitchProps {
  checked?: boolean;
  onChange?: (e: { target: { checked: boolean } }) => void;
  size?: "small" | "medium" | "large";
  color?: "pri" | "sec" | "success" | "danger";
  disabled?: boolean;
  className?: string;
}

const Switch = ({
  checked = false,
  onChange,
  size = "medium",
  color = "pri",
  disabled = false,
  className = "",
}: SwitchProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.({ target: { checked: newValue } });
  };

  const sizeClasses = {
    small: {
      track: "w-10 h-5",
      thumb: "w-4 h-4",
      translate: "translate-x-5",
    },
    medium: {
      track: "w-12 h-6",
      thumb: "w-5 h-5",
      translate: "translate-x-6",
    },
    large: {
      track: "w-16 h-8",
      thumb: "w-7 h-7",
      translate: "translate-x-8",
    },
  };

  const colorClasses = {
    pri: "bg-[#5677BC]",
    sec: "bg-gray-600",
    success: "bg-green-600",
    danger: "bg-red-600",
  };

  const currentSize = sizeClasses[size];
  const currentColor = colorClasses[color];

  return (
    <div
      className={`
        relative inline-flex items-center rounded-full transition-colors
        ${currentSize.track}
        ${isChecked ? currentColor : "bg-gray-200"}
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
        ${className}
      `}
      onClick={handleToggle}
    >
      <motion.div
        className={`
          absolute left-0.5 rounded-full bg-white shadow-sm
          ${currentSize.thumb}
        `}
        initial={false}
        animate={{
          x: isChecked ? currentSize.translate : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
          mass: 0.5,
          duration: 0.2,
        }}
      />
    </div>
  );
};

export default Switch;
