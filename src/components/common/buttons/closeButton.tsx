// CloseButton.tsx
import { motion, MotionProps } from "framer-motion";
import React from "react";
import { ButtonType } from "./types";

type CloseButtonPropsType = ButtonType["CloseButtonProps"] & MotionProps;

const CloseButton: React.FC<CloseButtonPropsType> = ({
  onClick,
  size = "md",
  position,
  baseColor = "bg-[#CACACA]",
  hoverColor = "hover:bg-[#CF003F]",
  className = "",
  ...motionProps
}) => {
  // Size configurations using Tailwind classes
  const sizeStyles = {
    sm: "w-8 h-8 text-lg",
    md: "w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl",
    lg: "w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl",
  };

  // Position styles if provided
  const positionStyles = position
    ? {
        position: "absolute" as const,
        top: position.top,
        right: position.right,
        bottom: position.bottom,
        left: position.left,
      }
    : {};

  // Convert baseColor to Tailwind class if it's not already a class
  const baseBgClass = baseColor.startsWith("bg-")
    ? baseColor
    : `bg-[${baseColor}]`;

  // Convert hoverColor to Tailwind class if it's not already a class
  const hoverBgClass = hoverColor.startsWith("hover:bg-")
    ? hoverColor
    : `hover:bg-[${hoverColor}]`;

  return (
    <motion.button
      onClick={onClick}
      className={`
        group relative rounded-full 
        ${sizeStyles[size]}
        ${baseBgClass}
        ${hoverBgClass}
        transition-colors duration-200 
        shadow-md 
        flex items-center justify-center
        ${position ? "absolute" : "relative"}
        ${className}
      `}
      whileHover={{ scale: 1.1, rotate: 90 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={positionStyles}
      {...motionProps}
    >
      <span
        className="
          text-white 
          font-medium 
          group-hover:text-gray-100 
          transition-colors 
          duration-200
        "
      >
        ×
      </span>
      <motion.div
        className={`
          absolute inset-0 
          rounded-full 
          ${baseBgClass}
          opacity-0 
          group-hover:opacity-20
        `}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default CloseButton;
