import { motion } from "framer-motion";
import { useEffect } from "react";

import { Step, StepperProps } from "./types";

const getStatusColor = (
  status: Step["status"],
  customColor?: Step["customColor"]
) => {
  switch (status) {
    case "complete":
      return customColor?.completed || "bg-[#5677BC] border-[#5677BC]";
    case "error":
      return customColor?.error || "bg-red-500 border-red-500";
    case "warning":
      return customColor?.warning || "bg-yellow-500 border-yellow-500";
    default:
      return customColor?.active || "bg-[#5677BC] border-[#5677BC]";
  }
};

const getSizeClasses = (size: StepperProps["size"] = "medium") => {
  switch (size) {
    case "small":
      return "w-8 h-8 text-sm";
    case "large":
      return "w-12 h-12 text-lg";
    default:
      return "w-10 h-10 text-base";
  }
};

const Stepper = ({
  steps,
  currentStep,
  orientation = "horizontal",
  className = "",
  onStepClick,
  onStepComplete,
  onStepError,
  showStepNumbers = true,
  allowSkip = false,
  size = "small",
  disableAnimation = false,
  contentWidth,
  contentHeight,
  stepSpacing = "normal",
  contentAlignment = "center",
  completionComponent,
  showCompletionStep = true,
  onComplete,
}: StepperProps) => {
  const isHorizontal = orientation === "horizontal";
  const isCompleted = currentStep >= steps.length;

  useEffect(() => {
    if (isCompleted && onComplete) {
      onComplete();
    }
  }, [isCompleted, onComplete]);

  const getSpacingClasses = () => {
    switch (stepSpacing) {
      case "tight":
        return isHorizontal ? "gap-4" : "gap-2";
      case "loose":
        return isHorizontal ? "gap-12" : "gap-8";
      default:
        return isHorizontal ? "gap-8" : "gap-4";
    }
  };

  const getAlignmentClasses = () => {
    switch (contentAlignment) {
      case "start":
        return "items-start text-left";
      case "end":
        return "items-end text-right";
      default:
        return "items-center text-center";
    }
  };

  const handleStepClick = async (index: number) => {
    if (!onStepClick) return;

    const targetStep = steps[index];

    // Don't proceed if step is locked
    if (targetStep.isLocked) return;

    // Don't allow clicking future steps unless allowSkip is true
    if (!allowSkip && index > currentStep + 1) return;

    if (index > currentStep && steps[currentStep].validationFn) {
      try {
        const isValid = await steps[currentStep].validationFn();
        if (!isValid) {
          onStepError?.(currentStep, new Error("Validation failed"));
          return;
        }
      } catch (error) {
        onStepError?.(currentStep, error);
        return;
      }
    }

    onStepClick(index);
    onStepComplete?.(currentStep);
  };

  if (isCompleted && showCompletionStep && completionComponent) {
    return (
      <motion.div
        initial={disableAnimation ? undefined : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex justify-center items-center ${className}`}
        style={{
          width: contentWidth,
          height: contentHeight,
        }}
      >
        {completionComponent}
      </motion.div>
    );
  }

  return (
    <div
      className={`flex ${
        isHorizontal ? "flex-row" : "flex-col"
      } ${getSpacingClasses()} ${className}`}
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-valuenow={currentStep}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLast = index === steps.length - 1;
        const isLocked = step.isLocked;
        const status = step.status || (isCompleted ? "complete" : "default");

        return (
          <div
            key={index}
            className={`flex ${
              isHorizontal ? "flex-col" : "flex-row"
            } ${getAlignmentClasses()} relative ${
              isHorizontal ? "flex-1" : "w-full"
            } ${isLocked ? "opacity-50" : ""}`}
            style={{
              width: contentWidth,
              height: contentHeight,
            }}
          >
            {/* Step connector line */}
            {!isLast && (
              <motion.div
                className={`${
                  isHorizontal
                    ? "w-full h-[2px] absolute top-5"
                    : "w-[2px] h-full absolute left-5"
                } bg-gray-200`}
              >
                <motion.div
                  initial={disableAnimation ? undefined : { scale: 0 }}
                  animate={{
                    scale: isCompleted ? 1 : 0,
                  }}
                  className={`h-full ${getStatusColor(
                    status,
                    step.customColor
                  )} origin-left`}
                  style={{
                    transformOrigin: isHorizontal ? "left" : "top",
                  }}
                />
              </motion.div>
            )}

            {/* Step circle */}
            <motion.button
              onClick={() => handleStepClick(index)}
              whileHover={
                !isLocked && !disableAnimation ? { scale: 1.1 } : undefined
              }
              whileTap={
                !isLocked && !disableAnimation ? { scale: 0.95 } : undefined
              }
              disabled={isLocked}
              className={`relative z-10 flex items-center justify-center ${getSizeClasses(
                size
              )} rounded-full border-2 transition-colors duration-200 ${
                isCompleted
                  ? getStatusColor(status, step.customColor)
                  : isCurrent
                  ? `border-${getStatusColor(
                      status,
                      step.customColor
                    )} bg-white`
                  : "border-gray-300 bg-white"
              }`}
              title={isLocked ? "This step is locked" : undefined}
            >
              {isLocked ? (
                <motion.svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m0 0v2m0-2h2m-2 0H8m10-6a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </motion.svg>
              ) : isCompleted ? (
                <motion.svg
                  initial={disableAnimation ? undefined : { scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              ) : step.icon ? (
                step.icon
              ) : (
                showStepNumbers && (
                  <span
                    className={`${
                      isCurrent ? "text-blue-500" : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </span>
                )
              )}
            </motion.button>

            {/* Step content */}
            <div
              className={`${
                isHorizontal
                  ? "mt-4 text-center"
                  : "ml-4 flex-1 flex flex-col gap-1"
              }`}
            >
              <div className="flex items-center gap-2">
                <motion.span
                  initial={disableAnimation ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`font-medium ${
                    isCurrent ? "text-[#5677BC]" : "text-gray-900"
                  }`}
                >
                  {step.title}
                </motion.span>
                {step.isOptional && (
                  <span className="text-xs text-gray-500">(Optional)</span>
                )}
              </div>
              {step.description && (
                <motion.p
                  initial={disableAnimation ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-gray-500"
                >
                  {step.description}
                </motion.p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
