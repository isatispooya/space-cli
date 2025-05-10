import { MotionProps } from "framer-motion";

export interface CloseButtonProps extends MotionProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  position?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
  };
  baseColor?: string;
  hoverColor?: string;
  className?: string;
}

export type ButtonTypes = {
  CloseButtonProps: CloseButtonProps;
};

export default ButtonTypes;
