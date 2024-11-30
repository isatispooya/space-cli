import { Dialog } from "@headlessui/react";
import { ReactNode } from "react";

interface ModalLayoutProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalLayout = ({ children, isOpen, onClose }: ModalLayoutProps) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg">{children}</Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ModalLayout;
