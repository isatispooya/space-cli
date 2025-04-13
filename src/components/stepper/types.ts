import { ReactNode } from "react";

export interface Step {
  title: string;
  description?: string;
  icon?: ReactNode;
  isLocked?: boolean;
  isOptional?: boolean;
  status?: "default" | "complete" | "error" | "warning";
  validationFn?: () => boolean | Promise<boolean>;
  customColor?: {
    active?: string;
    completed?: string;
    error?: string;
    warning?: string;
  };
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
  onStepClick?: (step: number) => void;
  onStepComplete?: (step: number) => void;
  onStepError?: (step: number, error: unknown) => void;
  showStepNumbers?: boolean;
  allowSkip?: boolean;
  size?: "small" | "medium" | "large";
  disableAnimation?: boolean;
  contentWidth?: string;
  contentHeight?: string;
  stepSpacing?: "tight" | "normal" | "loose";
  contentAlignment?: "start" | "center" | "end";
  // New completion related props
  completionComponent?: ReactNode;
  showCompletionStep?: boolean;
  onComplete?: () => void;
}
