import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { CardImage } from "./components/card_image";
import { CardBadge } from "./components/card_badge";
import { CardStatus } from "./components/card_status";
import { CardSkeleton } from "./components/card_skeleton";
import { cardVariants } from "./animations/card.animation";
import type {
  CardBaseProps,
  ImageProps,
  StatusProps,
  ActionProps,
  RibbonProps,
} from "./types/card.type";

interface CardProps extends CardBaseProps {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  image?: ImageProps;
  badge?: string;
  status?: StatusProps;
  actions?: ActionProps[];
  ribbon?: RibbonProps;
  loading?: boolean;
  skeleton?: boolean;
  expandable?: boolean;
  glassmorphism?: boolean;
  borderGradient?: boolean;
  backgroundPattern?: boolean;
  width?: string;
  height?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  customStyles?: React.CSSProperties;
  containerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  headerSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
  onClick?: () => void;
  disableAnimation?: boolean;
}

const Card = ({
  title,
  subtitle,
  content,
  image,
  badge,
  status,
  loading = false,
  skeleton = false,
  expandable = false,
  glassmorphism = false,
  borderGradient = false,
  backgroundPattern = false,
  className = "",
  animate = true,
  hoverEffect = true,
  width,
  height,
  padding,
  margin,
  borderRadius = "xl",
  customStyles,
  containerClassName = "",
  contentClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  headerSlot,
  footerSlot,
  onClick,
  disableAnimation = false,
}: CardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (skeleton) {
    return <CardSkeleton />;
  }

  const baseCardClass = `
    relative overflow-hidden rounded-${borderRadius}
    ${
      glassmorphism
        ? "backdrop-blur-md bg-white/30 dark:bg-gray-800/30"
        : "bg-white dark:bg-gray-800"
    }
    ${
      borderGradient
        ? "p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        : ""
    }
    ${
      backgroundPattern
        ? "bg-opacity-90 dark:bg-opacity-90 background-pattern"
        : ""
    }
    ${width ? `w-${width}` : ""}
    ${height ? `h-${height}` : ""}
    ${margin ? `m-${margin}` : ""}
    ${onClick ? "cursor-pointer" : ""}
    ${className}
    ${containerClassName}
  `;

  const cardStyles = {
    ...customStyles,
  };

  const renderMotionCard = () => (
    <motion.div
      initial={animate && !disableAnimation ? "hidden" : "visible"}
      animate="visible"
      whileHover={hoverEffect && !disableAnimation ? "hover" : undefined}
      variants={!disableAnimation ? cardVariants : undefined}
      className={baseCardClass}
      style={cardStyles}
      onClick={onClick}
    >
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 z-50 flex items-center justify-center"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`${
          borderGradient ? "bg-white dark:bg-gray-800 rounded-xl" : ""
        } h-full`}
      >
        {headerSlot}
        {badge && <CardBadge text={badge} />}
        {image && <CardImage {...image} />}

        <div
          className={`${padding ? `p-${padding}` : "p-6"} ${contentClassName}`}
        >
          {title && (
            <h3
              className={`text-xl font-bold text-gray-900 dark:text-white mb-2 ${titleClassName}`}
            >
              {title}
            </h3>
          )}

          {subtitle && (
            <p
              className={`text-sm text-gray-600 dark:text-gray-300 mb-4 ${subtitleClassName}`}
            >
              {subtitle}
            </p>
          )}

          {content && (
            <div className="text-gray-700 dark:text-gray-200">{content}</div>
          )}
        </div>

        {status && <CardStatus {...status} />}

        {expandable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-full px-6 py-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
        {footerSlot}
      </div>
    </motion.div>
  );

  const renderStaticCard = () => (
    <div className={baseCardClass} style={cardStyles} onClick={onClick}>
      {loading && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      )}

      <div
        className={`${
          borderGradient ? "bg-white dark:bg-gray-800 rounded-xl" : ""
        } h-full`}
      >
        {headerSlot}
        {badge && <CardBadge text={badge} />}
        {image && <CardImage {...image} />}

        <div
          className={`${padding ? `p-${padding}` : "p-6"} ${contentClassName}`}
        >
          {title && (
            <h3
              className={`text-xl font-bold text-gray-900 dark:text-white mb-2 ${titleClassName}`}
            >
              {title}
            </h3>
          )}

          {subtitle && (
            <p
              className={`text-sm text-gray-600 dark:text-gray-300 mb-4 ${subtitleClassName}`}
            >
              {subtitle}
            </p>
          )}

          {content && (
            <div className="text-gray-700 dark:text-gray-200">{content}</div>
          )}
        </div>

        {status && <CardStatus {...status} />}

        {expandable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="w-full px-6 py-2 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {isExpanded ? "Show Less" : "Show More"}
          </button>
        )}
        {footerSlot}
      </div>
    </div>
  );

  return disableAnimation ? renderStaticCard() : renderMotionCard();
};

export default Card;
