import { useState } from "react";
import CreateCompanyForm from "./createCompany.form";
import EditCompany from "../components/editCompany";
import ModalLayout from "../../../layouts/modal.layout.";
const CompanyToolBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<"create" | "edit" | null>(
    null
  );

  const tools = (tool: string) => {
    switch (tool) {
      case "create":
        return (
          <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <CreateCompanyForm />
          </ModalLayout>
        );
      case "edit":
        return (
          <ModalLayout isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <EditCompany />
          </ModalLayout>
        );
      default:
        return null;
    }
  };
  return (
    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-200 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                onClick={() => {
                  setSelectedTool("create");
                  setIsOpen(true);
                }}
                className="block py-2 px-3 text-gray-700 bg-gray-200 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white"
              >
                ایجاد
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setSelectedTool("edit");
                  setIsOpen(true);
                }}
                className="block py-2 px-3 mr-10 text-gray-700 bg-gray-200 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white"
              >
                ویرایش
              </button>
            </li>
          </ul>
        </div>
      </div>
      {selectedTool && tools(selectedTool)}
    </nav>
  );
};

export default CompanyToolBar;
