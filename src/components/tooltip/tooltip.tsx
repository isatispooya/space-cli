import React, { useState, ReactNode, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type PlacementType = "top" | "right" | "bottom" | "left";

interface TooltipPropsType {
  content: ReactNode;
  placement?: PlacementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipPropsType> = ({
  content,
  placement = "top",
  delay = 0,
  className = "",
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const show = () => {
    timeoutRef.current = window.setTimeout(() => setIsVisible(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const baseClasses =
    "absolute z-50 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap";
  const placementClasses: Record<PlacementType, string> = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  };

  const initialOffset = {
    top: { y: 8 },
    bottom: { y: -8 },
    left: { x: 8 },
    right: { x: -8 },
  }[placement];

  return (
    <div
      className="relative inline-block"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`${baseClasses} ${placementClasses[placement]} ${className}`}
            initial={{ opacity: 0, ...initialOffset }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
