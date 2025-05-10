import { motion } from "framer-motion";
import { ImagePropsType } from "../types/card.type";
import { imageVariants } from "../animations/card.animation";

export const CardImage = ({
  src,
  alt,
  overlay,
  overlayColor,
}: ImagePropsType) => (
  <motion.div
    className="relative h-48 w-full overflow-hidden"
    whileHover={imageVariants.hover}
  >
    <img src={src} alt={alt} className="h-full w-full object-cover" />
    {overlay && (
      <div
        className="absolute inset-0"
        style={{ backgroundColor: overlayColor || "rgba(0,0,0,0.3)" }}
      />
    )}
  </motion.div>
);
