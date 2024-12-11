import { ReactNode, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { createPortal } from "react-dom";

interface ModalLayoutProps {
  children: ReactNode;
  open?: boolean;
  show?: boolean;
  onClose: () => void;
  title?: string;
}

const ModalLayout = ({
  children,
  open = false,
  show = false,
  onClose,
  title,
}: ModalLayoutProps) => {
  const isVisible = open || show;

  const modalContent = (
    <Transition appear show={isVisible} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-lg    transition-all">
                {title && (
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900 mb-4">
                    {title}
                  </Dialog.Title>
                )}
                <div className="mt-2">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );

  return createPortal(modalContent, document.body);
};

export default ModalLayout;
