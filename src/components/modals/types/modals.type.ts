import { UseQueryResult } from "@tanstack/react-query";
import { animationVariants, sizeClasses } from "../data/dialogVar";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  // Enhanced props
  size?: keyof typeof sizeClasses;
  position?: "center" | "top" | "bottom";
  animation?: keyof typeof animationVariants;
  customTransition?: {
    duration?: number;
    ease?: string;
  };

  queryResult?: UseQueryResult;

  header?: React.ReactNode;
  footer?: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
  showCloseButton?: boolean;
  // Styling
  overlayClassName?: string;
  contentClassName?: string;
  // Behavior
  closeOnOutsideClick?: boolean;
  preventScroll?: boolean;
}

export type ModalsTypes = {
  DialogProps: DialogProps;
};


