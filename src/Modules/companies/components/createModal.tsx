import { Dialog } from "@headlessui/react";
import CreateCompanyForm from "../feature/createCompany.form";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal = ({ isOpen, onClose }: FormModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg">
          <CreateCompanyForm />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default FormModal;
