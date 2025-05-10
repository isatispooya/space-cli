import React from "react";
import {
  motion,
  HTMLMotionProps,
  Variants,
  AnimatePresence,
} from "framer-motion";
import { twMerge } from "tailwind-merge";

export type ButtonVariantType =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning"
  | "info"
  | "light"
  | "dark"
  | "link"
  | "custom";

export type ButtonSizeType = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ButtonShapeType = "rounded" | "square" | "pill" | "circle";

export type ButtonAnimationType =
  | "scale"
  | "bounce"
  | "pulse"
  | "rotate"
  | "slide"
  | "none";

export type LoaderTypeType = "spinner" | "dots" | "pulse" | "custom";

export interface ButtonPropsType extends HTMLMotionProps<"button"> {
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  shape?: ButtonShapeType;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  iconOnly?: boolean;
  fullWidth?: boolean;
  animationOnHover?: ButtonAnimationType;
  animationOnTap?: ButtonAnimationType;
  ripple?: boolean;
  rippleColor?: string;
  loaderType?: LoaderTypeType;
  loaderComponent?: React.ReactNode;
  customColors?: {
    background?: string;
    text?: string;
    border?: string;
    hoverBackground?: string;
    hoverText?: string;
    hoverBorder?: string;
    activeBackground?: string;
    activeText?: string;
    activeBorder?: string;
  };
  className?: string;
  elevated?: boolean;
  glassmorphism?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonPropsType> = ({
  variant = "primary",
  size = "md",
  shape = "rounded",
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  fullWidth = false,
  animationOnHover = "scale",
  animationOnTap = "scale",
  ripple = true,
  rippleColor,
  loaderType = "spinner",
  loaderComponent,
  customColors = {},
  className = "",
  elevated = false,
  glassmorphism = false,
  children,
  ...motionProps
}) => {
  // Animation variants for different hover effects
  const getHoverAnimation = (type: ButtonAnimationType) => {
    switch (type) {
      case "scale":
        return { scale: 1.05 };
      case "bounce":
        return { y: -5 };
      case "pulse":
        return { boxShadow: "0 0 0 10px rgba(0, 0, 0, 0)" };
      case "rotate":
        return { rotate: 5 };
      case "slide":
        return { x: 5 };
      case "none":
      default:
        return {};
    }
  };

  const getTapAnimation = (type: ButtonAnimationType) => {
    switch (type) {
      case "scale":
        return { scale: 0.95 };
      case "bounce":
        return { y: 2 };
      case "pulse":
        return { boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.3)" };
      case "rotate":
        return { rotate: -5 };
      case "slide":
        return { x: -2 };
      case "none":
      default:
        return {};
    }
  };

  const buttonVariants: Variants = {
    idle: {},
    hover: getHoverAnimation(animationOnHover),
    tap: getTapAnimation(animationOnTap),
  };

  // Ripple animation
  const [rippleEffect, setRippleEffect] = React.useState<
    { x: number; y: number; size: number; id: number }[]
  >([]);
  const rippleIdRef = React.useRef(0);

  const handleRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ripple || isDisabled || isLoading) return;

    const button = event.currentTarget;
    const buttonRect = button.getBoundingClientRect();
    const size = Math.max(buttonRect.width, buttonRect.height) * 2;
    const id = rippleIdRef.current++;

    setRippleEffect([
      ...rippleEffect,
      {
        x: event.clientX - buttonRect.left,
        y: event.clientY - buttonRect.top,
        size,
        id,
      },
    ]);

    // Clean up ripples after animation completes
    setTimeout(() => {
      setRippleEffect((prev) => prev.filter((effect) => effect.id !== id));
    }, 600);
  };

  // Helper to determine if we're using custom colors
  const isCustomVariant =
    variant === "custom" && Object.keys(customColors).length > 0;

  // Tailwind classes for variants
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white border-transparent",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white border-transparent",
    outline:
      "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-800 border-transparent",
    danger: "bg-red-600 hover:bg-red-700 text-white border-transparent",
    success: "bg-green-600 hover:bg-green-700 text-white border-transparent",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white border-transparent",
    info: "bg-cyan-500 hover:bg-cyan-600 text-white border-transparent",
    light: "bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-200",
    dark: "bg-gray-800 hover:bg-gray-900 text-white border-transparent",
    link: "bg-transparent text-blue-600 hover:text-blue-800 underline hover:no-underline p-0 border-transparent",
    custom: "",
  };

  // Tailwind classes for sizes
  const sizeClasses = {
    xs: iconOnly ? "p-1" : "text-xs py-1 px-2",
    sm: iconOnly ? "p-1.5" : "text-sm py-1.5 px-3",
    md: iconOnly ? "p-2" : "text-base py-2 px-4",
    lg: iconOnly ? "p-2.5" : "text-lg py-2.5 px-5",
    xl: iconOnly ? "p-3" : "text-xl py-3 px-6",
    "2xl": iconOnly ? "p-4" : "text-2xl py-4 px-8",
  };

  // Shape classes
  const shapeClasses = {
    rounded: "rounded-md",
    square: "rounded-none",
    pill: "rounded-full",
    circle: iconOnly ? "rounded-full aspect-square" : "rounded-full",
  };

  // Custom CSS variables for custom colors
  const customColorStyles = isCustomVariant
    ? {
        "--btn-bg": customColors.background || "transparent",
        "--btn-text": customColors.text || "currentColor",
        "--btn-border": customColors.border || "transparent",
        "--btn-hover-bg":
          customColors.hoverBackground ||
          customColors.background ||
          "transparent",
        "--btn-hover-text":
          customColors.hoverText || customColors.text || "currentColor",
        "--btn-hover-border":
          customColors.hoverBorder || customColors.border || "transparent",
        "--btn-active-bg":
          customColors.activeBackground ||
          customColors.hoverBackground ||
          customColors.background ||
          "transparent",
        "--btn-active-text":
          customColors.activeText ||
          customColors.hoverText ||
          customColors.text ||
          "currentColor",
        "--btn-active-border":
          customColors.activeBorder ||
          customColors.hoverBorder ||
          customColors.border ||
          "transparent",
      }
    : {};

  // Custom style for custom variant
  const customVariantStyle = isCustomVariant
    ? "bg-[var(--btn-bg)] text-[var(--btn-text)] border-[var(--btn-border)] hover:bg-[var(--btn-hover-bg)] hover:text-[var(--btn-hover-text)] hover:border-[var(--btn-hover-border)] active:bg-[var(--btn-active-bg)] active:text-[var(--btn-active-text)] active:border-[var(--btn-active-border)]"
    : "";

  // Loader component based on loader type
  const renderLoader = () => {
    if (loaderComponent) return loaderComponent;

    switch (loaderType) {
      case "spinner":
        return (
          <motion.div
            className="h-5 w-5 rounded-full border-2 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            style={{
              borderTopColor: "transparent",
              borderColor: variant.includes("outline") ? "#3b82f6" : "white",
            }}
          />
        );
      case "dots":
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-current"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        );
      case "pulse":
        return (
          <motion.div
            className="h-4 w-4 rounded-full bg-current"
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
            }}
          />
        );
      default:
        return (
          <motion.div
            className="h-5 w-5 rounded-full border-2 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            style={{
              borderTopColor: "transparent",
              borderColor: variant.includes("outline") ? "#3b82f6" : "white",
            }}
          />
        );
    }
  };

  return (
    <motion.button
      className={twMerge(
        "relative font-medium transition-colors duration-200 border flex items-center justify-center gap-2 overflow-hidden",
        shapeClasses[shape],
        sizeClasses[size],
        isCustomVariant ? customVariantStyle : variantClasses[variant],
        isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        fullWidth ? "w-full" : "",
        elevated && !isDisabled ? "shadow-md hover:shadow-lg" : "",
        glassmorphism ? "backdrop-blur-md bg-opacity-20" : "",
        iconOnly ? "aspect-square justify-center" : "",
        className
      )}
      onClick={(e) => {
        handleRipple(e);
        if (motionProps.onClick && !isDisabled && !isLoading) {
          motionProps.onClick(e);
        }
      }}
      initial="idle"
      whileHover={!isDisabled && !isLoading ? "hover" : ""}
      whileTap={!isDisabled && !isLoading ? "tap" : ""}
      variants={buttonVariants}
      disabled={isDisabled || isLoading}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
      }}
      style={isCustomVariant ? (customColorStyles as React.CSSProperties) : {}}
      {...motionProps}
    >
      {/* Loading indicator */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-inherit z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {renderLoader()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button content */}
      <div
        className={`flex items-center justify-center gap-2 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {leftIcon && <span className="flex items-center">{leftIcon}</span>}
        {(!iconOnly || !leftIcon) && children}
        {rightIcon && <span className="flex items-center">{rightIcon}</span>}
      </div>

      {/* Ripple effects */}
      <AnimatePresence>
        {rippleEffect.map((effect) => (
          <motion.span
            key={effect.id}
            className={`absolute rounded-full ${
              rippleColor ? rippleColor : "bg-white/20"
            }`}
            initial={{
              width: 0,
              height: 0,
              opacity: 0.7,
              x: effect.x,
              y: effect.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              width: effect.size,
              height: effect.size,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </motion.button>
  );
};

export default Button;
