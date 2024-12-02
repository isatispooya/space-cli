import { useState } from "react";
import { CreateCorrespondenceForm } from "./correnpondence.create.form";
import { useCreateCorrespondence } from "../hooks"; 
import ModalLayout from "../../../layouts/modal.layout.";

const CorrespondenceToolBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<"create" | "import" | null>(
    null
  );
  const { mutate, isPending } = useCreateCorrespondence();

  const tools = (tool: string) => {
    switch (tool) {
      case "create":
        return (
          <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <CreateCorrespondenceForm onSubmit={mutate} loading={isPending} />
          </ModalLayout>
        );
      case "import":
        return null;
      default:
        return null;
    }
  };

  return (
    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-4 space-x-reverse">
          <button
            onClick={() => {
              setSelectedTool("create");
              setIsOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 space-x-2 space-x-reverse"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>ایجاد مکاتبه جدید</span>
          </button>
        </div>

        {/* منوی موبایل */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">باز کردن منو</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      {selectedTool && tools(selectedTool)}
    </nav>
  );
};

export default CorrespondenceToolBar;
