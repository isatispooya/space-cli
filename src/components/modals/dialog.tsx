import React, { Fragment, createContext } from "react";
import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { UseQueryResult } from "@tanstack/react-query";
import { IoCloseCircleOutline } from "react-icons/io5";

import { ModalsType } from "./types";
import { animationVariants, sizeClasses } from "./data/dialogVar";

// Dialog Context
interface DialogContextType {
  close: () => void;
  isOpen: boolean;
  queryResult?: UseQueryResult;
}

const DialogContext = createContext<DialogContextType | null>(null);

const Dialog = ({
  isOpen,
  onClose,
  children,
  className = "",
  size = "md",
  position = "center",
  animation = "fade",
  customTransition,
  queryResult,
  header,
  footer,
  hideHeader = false,
  hideFooter = false,
  showCloseButton = true,
  onCloseButtonClick,
  overlayClassName = "",
  contentClassName = "",
  closeOnOutsideClick = true,
  preventScroll = true,
}: ModalsType["DialogProps"]) => {
  const positionClasses = {
    center: "items-center",
    top: "items-start pt-16",
    bottom: "items-end pb-16",
  };

  React.useEffect(() => {
    if (preventScroll) {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, preventScroll]);

  const handleClose = () => {
    if (queryResult?.isFetching) return;
    onClose();
  };

  const handleCloseButtonClick = () => {
    if (queryResult?.isFetching) return;
    onCloseButtonClick?.();
    onClose();
  };

  return (
    <DialogContext.Provider value={{ close: handleClose, isOpen, queryResult }}>
      <Transition appear show={isOpen} as={Fragment}>
        <HeadlessDialog
          as="div"
          className="relative z-50"
          onClose={
            closeOnOutsideClick
              ? handleClose
              : (e) => {
                  return e;
                }
          }
        >
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={`fixed inset-0 bg-black/25 backdrop-blur-sm ${overlayClassName}`}
            />
          </Transition.Child>

          {/* Dialog positioning */}
          <div className="fixed inset-0 overflow-y-auto">
            <div
              className={`flex min-h-full justify-center p-4 text-center ${positionClasses[position]}`}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <HeadlessDialog.Panel
                  className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all dark:bg-gray-800 ${contentClassName} ${className}`}
                >
                  <motion.div
                    variants={animationVariants[animation]}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={customTransition || { duration: 0.3 }}
                    className="relative"
                  >
                    {/* Loading Overlay */}
                    {queryResult?.isFetching && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-800/80 z-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      {!hideHeader && (
                        <div className="flex justify-between items-center mb-4">
                          {header && (
                            <HeadlessDialog.Title className="text-lg font-medium text-gray-900 dark:text-white">
                              {header}
                            </HeadlessDialog.Title>
                          )}
                          {showCloseButton && (
                            <button
                              onClick={handleCloseButtonClick}
                              className="text-gray-400 hover:text-gray-500 transition-colors"
                            >
                              <span className="sr-only">Close</span>
                              <IoCloseCircleOutline className="h-6 w-6" />
                            </button>
                          )}
                        </div>
                      )}

                      {/* Main Content */}
                      <div className="relative">
                        {queryResult?.isError ? (
                          <div className="text-red-500 text-center py-4">
                            Error:{" "}
                            {queryResult.error?.message ||
                              "Something went wrong"}
                          </div>
                        ) : (
                          children
                        )}
                      </div>

                      {/* Footer */}
                      {!hideFooter && footer && (
                        <div className="mt-6 flex justify-end space-x-2">
                          {footer}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </HeadlessDialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </HeadlessDialog>
      </Transition>
    </DialogContext.Provider>
  );
};

export default Dialog;
